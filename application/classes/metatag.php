<?php defined('SYSPATH') or die('No direct script access.');
/**
 * A utility Class to help with meta tags
 *
 * @author Jason Nathan
 * @category RealtAsia
 * @package RT_Helpers
 * @subpackage Metatag
 * @version 1.0
 * @copyright 2013 Realtasia Pte Ltd
 */
class Metatag {
    /**
     * @var string RTA's FB App id
     */
    public static $fb_id = '291017440941918';

    /**
     * @var array a list of RTA's used open graph namespaces
     */
    public static $namespaces = [
        'realtasia', 'profile', 'article', 'website'
    ];

    /**
     * @var array a list of RTA pages
     */
    public static $page_types = [
        'company', 'location'
    ];

    public static $u;

    public $action;
    public $ns;
    public $document;
    public $head;
    public $title;
    public $meta;

    /**
     * Factory method that returns self
     *
     * @param array $document
     * @param string $ns
     * @return \Metatag
     */
    public static function factory(array $document, $ns = null)
    {
        return new Metatag($document, $ns);
    }

    /**
     * Checks the document type and runs other methods that decide the meta content
     *
     * @param array $document
     * @param string $ns
     * @return \Metatag
     */
    public function __construct(array $document, $ns = null)
    {
        static::$u      = 'http://'.$_SERVER['HTTP_HOST'];
        $this->ns       = $ns;
        $this->action   = ucfirst(strtolower(Request::initial()->action()));
        $this->document = $document;
        $this->title    = $this->title();
        $type = \Arr::get($this->document, 'type');
        if($type)
        {
            if(in_array($type, static::$page_types))
                $this->page();
            else
                $this->post();
        }
        elseif(!\Arr::get($document, '_id'))
        {
            $this->directory();
        }
        else
            $this->user();

        return $this;
    }

    /**
     * Creates meta tags for all various post types in RTA. This method is public
     * because it can be called on it's own. Writes to the $meta property.
     *
     * @return \Metatag
     */
    public function post()
    {
        $post = $this->document;
        $meta = static::defaults($post);
        switch($post['type'])
        {
            case 'album':
                $meta[] = $this->album($post);
                break;
            case 'attachment':
                if(\Arr::get($post['link'], 'type') === 'image')
                {
                    $meta[] = static::og('type', 'image');
                    $meta[] = static::image($post);
                }
                break;
            case 'post':
            case 'wallpost':
                $meta[] = static::og('type', 'article');
                break;
            case 'testimonial':
                $meta[] = $this->testimonial($post);
                break;
            case 'listing':
                $meta[] = $this->listing();
                break;
        }

        array_unshift($meta, static::og('title', $this->title()));
        $des = Arr::get($post, 'excerpt');
        array_unshift($meta, static::regMeta('author', \Arr::get($post['user'], 'name')));
        array_unshift($meta, static::regMeta('description', $des));
        $meta[] = static::og('description', $des);
        $meta[] = static::meta([
                    'property' => "realtasia:profile",
                    'content' => static::$u . '/' . (string) \Arr::get($post['user'], '_id')
        ]);

        $this->meta = implode("", \Arr::flatten($meta));
        return $this;
    }

    /**
     * Formatting for album post types
     *
     * @param array $post
     * @return type
     */
    public function album(array $post)
    {
        $meta = array();
        $meta[] = static::og('type', 'article');
        if(!empty($post['picture']))
            $meta[] = static::image($post);

        if(!empty($post['attachments']))
        {
            foreach($post['attachments'] as $a)
            {
                if(\Arr::get($a['link'], 'type') === 'image')
                    $meta[] = static::image($a);
            }
        }
        return array_filter($meta);
    }

    /**
     * Formatting for testimonial post types
     *
     * @param array $post
     * @return type
     */
    public function testimonial(array $post)
    {
        $meta = array();
        $meta[] = static::og('type', 'article');
        $page_type = \Arr::get($post['page'], 'type');
        if($page_type === 'user')
            $ns = 'profile';

        if($page_type === 'location')
            $ns = 'location';

        $meta[] = static::meta([
            'property' => "realtasia:$ns",
            'content' => static::$u . \Arr::get($post['page'], 'uri')
        ]);
        return array_filter($meta);
    }

    /**
     * Formatting for listing post types
     *
     * @param array $post
     * @return type
     */
    public function listing(array $post)
    {
        $meta = array();
        $meta[] = static::og('type', 'realtasia:listing');
        $meta[] = static::meta([
                'property' => "realtasia:location",
                'content' => static::$u . \Arr::get($post['page'], 'uri')
        ]);
        if(isset($post['geo']))
        {
            $meta[] = static::meta([
                    'property' => "realtasia:location:latitude",
                    'content' => \Arr::get($post['geo'], 'lat')
            ]);
            $meta[] = static::meta([
                    'property' => "realtasia:location:longitude",
                    'content' => \Arr::get($post['geo'], 'lot')
            ]);
        }
        return array_filter($meta);
    }


    /**
     * Creates meta tags for all various page types in RTA. This method is public
     * because it can be called on it's own. Writes to the $meta property.
     *
     * @return \Metatag
     */
    public function page()
    {
        $page = $this->document;
        $meta = static::defaults($page);
        switch($page['type'])
        {
            case 'location':
                $meta[] = static::meta([
                        'property' => "realtasia:location",
                        'content' => static::$u . \Arr::get($page, 'uri')
                    ]);
                break;
            case 'company':
                $meta[] = static::meta([
                        'property' => "realtasia:profile",
                        'content' => static::$u . \Arr::get($page, 'uri')
                ]);
                break;
        }
        array_unshift($meta, static::og('title', $this->title()));
        $des = ucfirst($page['type']) . ": " . $page['name'] . " (" . $page['subtype'] . ")";
        array_unshift($meta, static::regMeta('author', \Arr::get($page['user'], 'name')));
        array_unshift($meta, static::regMeta('description', $des));
        $meta[] = static::og('description', $des);
        $meta[] = static::og('keywords', implode(",", \Arr::get($page, 'keywords', [])));
        $this->meta = implode("", \Arr::flatten($meta));
        return $this;
    }

    /**
     * Creates meta tags for a user (profile). This method is public
     * because it can be called on it's own. Writes to the $meta property.
     *
     * @return \Metatag
     */
    public function user()
    {
        $page = $this->document;
        $meta = static::defaults($page);
        if(!isset($page['avatar']))
        {
            $d = Document::factory('user', $this->document['_id']);
            $d->load(null, ['avatar' => 1]);
            if($d->avatar)
            {
                $page['avatar'] = $d->avatar;
            }
        }
        $pic = \Arr::get($page, 'avatar');
        array_unshift($meta, static::og('type', 'profile'));
        array_unshift($meta, static::og('title', $this->title()));
        array_unshift($meta, static::og('image', $pic ? $pic : ""));
        $des = ucwords(\Arr::get($page, 'message', ''));
        array_unshift($meta, static::regMeta('author', \Arr::get($page, 'name')));
        array_unshift($meta, static::regMeta('description', $des));
        $meta[] = static::og('description', $des);
        $this->meta = implode("", \Arr::flatten($meta));
        return $this;
    }

    public function directory()
    {
        $page = $this->document;
        $meta = static::defaults($page);
        $meta[] = static::og('type', 'website');
        array_unshift($meta, static::og('title', $this->title()));
        $des = Arr::get($page, 'description');
        array_unshift($meta, static::regMeta('description', $des));
        $meta[] = static::og('description', $des);
        return $this;
    }

    /**
     * Creates meta tags for images, includes size if aval. This method is public
     * because it can be called on it's own. Writes to the $meta property.
     *
     * @return \Metatag
     */
    public static function image($a)
    {
        $info = \Arr::get($a, 'mediainfo', []);

        if(!empty($info))
        {
            return [
                static::og('image', 'http://' . $a['picture']),
                static::og('image:type', \Arr::get($info, 'mime')),
                static::og('image:width', \Arr::get($info, 'width')),
                static::og('image:height', \Arr::get($info, 'height')),
            ];
        }
        return [
            static::og('image', 'http://' . $a['picture'])
        ];
    }

    /**
     * <title> tag helper. Extracts title from the document.
     * @param array $doc
     * @return string
     */
    public function title()
    {
        $doc = $this->document;
        $a = $this->action;
        $name = \Arr::get($doc, 'name');
        $type = ucfirst(\Arr::get($doc, 'type', ""));
        return isset($name) ? $name . ' - ' . $a : \Arr::get($doc, 'excerpt', $type . " - " . Arr::get($doc, '_id'));
    }

    /**
     * Retrieves an array of standard meta tags used globally
     *
     * @param array $doc
     * @return array
     */
    public static function defaults($doc)
    {
        return [
            static::meta(['property' => "fb:app_id", 'content' => static::$fb_id]),
            static::og('url', static::$u . Arr::get($doc, 'uri'))
        ];
    }

    /**
     * <HEAD> tag helper for open graph
     *
     * @param string $ns the name space
     * @see Metatag::$ns
     * @return string
     */
    public static function head($ns)
    {
        switch($ns)
        {
            case 'realtasia':
            case 'profile':
            case 'article':
            case 'website':
                return HTML::attributes([
                    'prefix' => "og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# $ns: http://ogp.me/ns/fb/$ns#"
                ]);
            default:
                return HTML::attributes([
                    'prefix' => "og: http://ogp.me/ns#"
                ]);
        }
    }

    /**
     * returns OG meta tag.
     * <code>
     *  Metatag::og('type', 'realtasia:listing')
     * // returns <meta property="og:type" content="realtasia:listing">
     * </code>
     *
     * @param string $p the og property value
     * @param string $c the content value
     * @uses Meta::meta
     * @return string HTML meta tag
     */
    public static function og($p, $c)
    {
        return static::meta(['property' => "og:$p",'content' => $c]);
    }

    /**
     * returns meta tag with the given attributes.
     * <code>
     *  Metatag::meta(['name' => 'description', 'content' => 'content'])
     * // returns <meta name="description" content="content" />
     * </code>
     *
     * @param array $atts an array of meta attributes
     * @uses HTML::attributes
     * @return string HTML meta tag
     */
    public static function meta(array $atts)
    {
        return "<meta".HTML::attributes($atts)." />";
    }

    /**
     * Shortcut for the above method that does exactly this.
     * <code>
     *  Metatag::meta(['name' => 'description', 'content' => 'content'])
     * // returns <meta name="description" content="content">
     * </code>
     *
     * @param string $n the name property
     * @param string $p the content property
     * @uses Metatag::meta
     * @return string HTML meta tag
     */
    public static function regMeta($n, $c)
    {
        return static::meta(['name' => $n, 'content' => $c]);
    }

    /**
     * ensures an array"ed" document
     *
     * @param mixed $d
     * @return array
     */
    public static function arr($d)
    {
        return is_array($d) ? $d : json_decode($d, TRUE);
    }
}