<?php defined('SYSPATH') or die('No direct script access.');
ini_set("max_execution_time", 0);
ini_set('memory_limit', '512M');

/**
 * Media Controller for media file uploads management
 *
 * @author Jason Nathan
 * @package RealtAsia APP
 * @category Controllers
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
use Aws\S3\Exception\S3Exception;

class Controller_Media extends Controller_Auth {

    public $params;
    public $auto_render = false;
    public $temp_dir = 'uploads';
    protected $uploaded_file = null;

    /* the different image sizes that realtasia uses */
    protected static $_sizes = [150, 110, 90, 60, 40, 16];

    /**
     * Create temp directory if it does not exist!
     */
    public function before()
    {
        $this->auto_render = false;
        $this->temp_dir = $this->temp_dir;
        if (!file_exists($this->temp_dir))
        {
            @mkdir($this->temp_dir);
        }
        parent::before();
    }

    /**
     * This action is called for regular uploads, engages the _upload method in
     * a loop, then calls the respective process/save methods thereafter
     */
    public function action_upload()
    {
        $this->auto_render = false;
        $user_id = Arr::get((array) $this->cu, '_id');
        $this->parse_request();

        if (!$user_id)
            return false;

        while ($this->uploaded_file === null)
        {
            $this->_upload();
            if (is_array($this->uploaded_file))
            {
                $type = Arr::get($this->uploaded_file, 'type', '');
                return strpos($type, 'image') !== false
                        ? $this->_process_image($user_id)
                        : $this->_process_file($user_id);
            }
        }

        //die('did not happen');
    }

    /**
     * This action is called for avatar uploads. Calls the saves it locally and
     * returns the result
     *
     * @return boolean
     */
    public function action_avatar()
    {
        $user_id = Arr::get((array) $this->cu, '_id');

        if (!$user_id)
            return false;

        while ($this->uploaded_file === null)
        {
            $this->_upload();

            if (is_array($this->uploaded_file))
            {
                $i = Image::factory($this->uploaded_file['location']);
                $f = $this->uploaded_file['new_name'];
                return $this->ajax_response(200, [
                            'url' => URL::site('/uploads/' . $f, 'http'),
                            'width' => $i->width,
                            'height' => $i->height,
                            'type' => $this->uploaded_file['type'],
                        ]);
            }
        }

        //die('did not happen');
    }

    /**
     * Deletes an uploaded file before it is sent to S3 or to api.
     *
     * @return string JSON encoded array
     */
    public function action_delete()
    {
        $file = basename($this->request->post('file'));
        @unlink($this->temp_dir . DIRECTORY_SEPARATOR . $file);
        return $this->ajax_response(200, [$file]);
    }

    /**
     * utility to destroy currently editing album id
     *
     * @return string JSON encoded array
     */
    public function action_deleteAlbumId()
    {
        $this->session->delete('albumId');
        return $this->ajax_response(200, ['success' => 1]);
    }

    /**
     * Utility to store currently editing album id in session.
     *
     * @return string JSON encoded array
     */
    public function action_updateAlbumId()
    {
        $this->session->delete('albumId');
        $this->session->set('albumId', $this->request->post('album_id'));

        return $this->ajax_response(200, ['success' => 1]);
    }

    /**
     * Crops the avatar, then resizes it to the respective sizes used throughout
     * RTA.
     *
     * @return boolean
     */
    public function action_crop()
    {
        $this->auto_render = false;
        $return = $objects = [];
        $post = $this->request->post();
        $file = basename(Arr::get($post, 'file'));
        $path = $this->temp_dir . DIRECTORY_SEPARATOR . $file;
        $type = @array_shift(explode(' ', exec("file -bi " . escapeshellarg($path))));
        if($type)
        {
            $type = str_replace(';', '', $type);
        }
        $user_id = (string) Arr::get((array) $this->get_cu(), '_id');
        $args = [
            'Bucket' => RT::BUCKET,
            'CacheControl' => "max-age=" . Date::YEAR . ", public",
            'ContentType' => $type,
            'ACL' => 'public-read'
        ];

        if (!$user_id)
            return false;

        $original = Image::factory($path);
        $image    = Image::factory($path);

        // this will be overwritten each time for each image size
        $args['Body'] = $image->render();
        $args['Key']  = $user_id . DIRECTORY_SEPARATOR . $file;

        // add to the objects array for S3 saving later
        $objects[] = $args;
        // if save is successful, these are the urls that will be returned
        $return['uncropped'] = RT::BUCKET . DIRECTORY_SEPARATOR . $args['Key'];

        // now crop the file and save it.
        $image->crop($post['w'], $post['h'], $post['x'], $post['y']);
        $image->save();

        // now for resizing to default RTA sizes
        foreach (static::$_sizes as $size)
        {
            $t = Image::factory($path);
            $t->resize($size, $size);
            $t->sharpen(30);

            $args['Body'] = $t->render(null, 85);
            $args['Key'] = "$user_id/$size/" . $file;

            // add to the objects array for S3 saving later
            $objects[] = $args;
            // if save is successful, these are the urls that will be returned
            $return[$size] = RT::BUCKET . DIRECTORY_SEPARATOR . $args['Key'];
        }

        //$res = static::saveS3(static::makeS3($objects));
        //Debug::log(Debug::vars($res));
        if (static::saveS3(static::makeS3($objects)))
        {
            //print_r('save');
            $this->save_avatar($file, $return['uncropped'], $original);
            @unlink($this->temp_dir . DIRECTORY_SEPARATOR . $file);
            return $this->ajax_response(200, $return);
        }

        // ideally an error.
        return $this->ajax_response(200, []);
    }

    /**
     * The actual method that performs a local upload. Normally called in a
     * do-while loop. This is to ensure multipart uploads are taken care of.
     * Once file is uploaded, the public $uploaded_file property is populated
     * That's when the loop stops and we can safely continue processing, i.e,
     * resize, save to perm store (s3) etc,
     *
     * @return boolean
     */
    protected function _upload()
    {
        $chunk = (int) Arr::get($_REQUEST, 'chunk', 0);
        $chunks = (int) Arr::get($_REQUEST, 'chunks', 0);
        $filename = Arr::get($_REQUEST, 'name', '');
        $file = Arr::get($_FILES, 'file');
        $content = Arr::get($_SERVER, 'HTTP_CONTENT_TYPE', Arr::get($_SERVER, 'CONTENT_TYPE'));
        $names = static::rename($filename);
        $path = $this->temp_dir . DIRECTORY_SEPARATOR . $names['new_name'];

        $this->_clean_temp($path);

        if (strpos($content, "multipart") !== false)
        {
            if (isset($file['tmp_name']) && is_uploaded_file($file['tmp_name']))
            {
                // Open temp file
                $out = fopen("$path.part", $chunk === 0 ? "wb" : "ab");
                if ($out)
                {
                    // Read binary input stream and append it to temp file
                    $in = fopen($file['tmp_name'], "rb");

                    if ($in)
                    {
                        while ($buff = fread($in, 4096))
                        {
                            fwrite($out, $buff);
                        }

                        fclose($in);
                    }
                    fclose($out);
                    @unlink($file['tmp_name']);
                }
            }
        }
        else
        {
            // Open temp file
            $out = fopen("$path.part", $chunk === 0 ? "wb" : "ab");
            if ($out)
            {
                // Read binary input stream and append it to temp file
                $in = fopen("php://input", "rb");

                if ($in)
                {
                    while ($buff = fread($in, 4096))
                        fwrite($out, $buff);
                }

                fclose($in);
                fclose($out);
            }
        }

        // Check if file has been uploaded
        if (!$chunks || $chunk === $chunks - 1)
        {
            // Strip the temp .part suffix off
            rename("{$path}.part", $path);
        }

        if (file_exists($path))
        {
            $shellpath = escapeshellarg($path);
            $type = exec("mimetype -b $shellpath");

            if (strpos($type, 'image') !== false)
            {
                $i = Image::factory($path);
                if ($i->width > 2048)
                {
                    $i->resize(2048, NULL);
                    $i->save($path);
                }
                elseif ($i->height > 2048)
                {
                    $i->resize(NULL, 2048);
                    $i->save($path);
                }
                $out = shell_exec("./imgopt/imgopt $shellpath");
                file_put_contents("debug.html", $out);
            }
            return $this->uploaded_file = Arr::merge($names, [
                        'location' => $path, 'type' => $type
            ]);
        }

        return false;
    }

    /**
     * This processes normal image uploads. Resizes orginal to something more
     * managable, creates a new thumbnail version and then saves images to s3
     * Returns an array if successful, false if not.
     * Requires the user id to continue.
     *
     * @param array $file
     * @param string|MongoID $user_id
     * @return boolean|Array
     */
    protected function _process_image($user_id)
    {
        $this->auto_render = false;
        $time = Date::YEAR;
        $return = $objects = [];
        $args = [
            'Bucket' => RT::BUCKET,
            'CacheControl' => "max-age=" . $time . ", public",
            'Expires' => gmdate('D, d M Y H:i:s \G\M\T', time() + $time),
            'ContentType' => Arr::get($this->uploaded_file, 'type'),
            'ValidateMD5' => false,
            'ACL' => 'public-read'
        ];

        if (!$user_id)
            return false;

        $file = basename($this->uploaded_file['location']);

        $original = Image::factory($this->temp_dir . DIRECTORY_SEPARATOR . $file);
        $this->smart_crop($file);

        // this will be overwritten each time for each image size
        $args['Body'] = $original->render(null, 85);
        $args['Key'] = $user_id . DIRECTORY_SEPARATOR . $file;

        // add to the objects array for S3 saving later
        $objects[] = $args;
        // if save is successful, these are the urls that will be returned
        $return['uncropped'] = RT::BUCKET. DIRECTORY_SEPARATOR . $args['Key'];

        // now for resizing to default RTA sizes
        foreach (static::$_sizes as $size)
        {
            $t = Image::factory($this->temp_dir . DIRECTORY_SEPARATOR . $file);
            ;
            $t->resize($size, $size, Image::NONE);
            $t->sharpen(20);
            $args['Body'] = $t->render(null, 85);
            $args['Key'] = "$user_id/$size/" . $file;

            // add to the objects array for S3 saving later
            $objects[] = $args;
            // if save is successful, these are the urls that will be returned
            $return[$size] = RT::BUCKET . DIRECTORY_SEPARATOR . $args['Key'];
        }

        if (static::saveS3(static::makeS3($objects)))
        {
            //print_r('save');
            @unlink($this->temp_dir . DIRECTORY_SEPARATOR . $file);
            return $this->save($return['uncropped'], $original);
        }

        // ideally an error.
        return $this->ajax_response(200, []);
    }

    /**
     * Similar to the above, minus the resizing
     *
     * @param string|MongoID $user_id
     * @return boolean
     */
    protected function _process_file($user_id)
    {
        $this->auto_render = false;
        $time = Date::YEAR;
        $mime = \Arr::get($this->uploaded_file, 'type');
        $file = basename($this->uploaded_file['location']);
        $body = $this->temp_dir . DIRECTORY_SEPARATOR . $file;
        $args = [
            'Bucket'       => RT::BUCKET,
            'CacheControl' => "max-age=" . $time . ", public",
            'Expires'      => gmdate('D, d M Y H:i:s \G\M\T', time() + $time),
            'ContentType'  => $mime,
            'ValidateMD5' => false,
            'ACL'          => 'public-read',
            'Body'         => fopen($body, "r"),
            'Key'          => $user_id . DIRECTORY_SEPARATOR . $file,
        ];

        $objects = [$args];

        if (static::saveS3(static::makeS3($objects)))
        {
            $s3url = 'http://' . RT::BUCKET . DIRECTORY_SEPARATOR . $args['Key'];
            $mediainfo = [
                'src'    => static::build_iframe_link($s3url, $mime),
                'width'  => 440,
                'height' => 250,
                'type'   => $mime
            ];
            $link = ['type' => 'rich', 'src' => $s3url];
            @unlink($this->temp_dir . DIRECTORY_SEPARATOR . $file);
            return $this->save_document($mediainfo, $link);
        }

        // ideally an error.
        return $this->ajax_response(200, []);
    }

    /**
     * Utility method to clean out the temp directory
     *
     * @param string $path
     */
    protected function _clean_temp($path)
    {
        if (is_dir($this->temp_dir) && ($dir = opendir($this->temp_dir)))
        {
            while (($file = readdir($dir)) !== false)
            {
                $tmpfilePath = $this->temp_dir . DIRECTORY_SEPARATOR . $file;

                // Remove temp file if it is older than the max age and is not the current file
                if (preg_match('/\.part$/', $file) && ($tmpfilePath !== "{$path}.part"))
                {
                    @unlink($tmpfilePath);
                }
            }
            closedir($dir);
        }
    }

    /**
     * Creates a unique name for the file
     *
     * @param string $file
     * @param string $type
     * @return array with old name and new name
     */
    protected static function rename($file)
    {
        $actual_name = substr($file, 0, strpos($file, '.'));
        $new_name = md5($actual_name . uniqid());
        $ext = pathinfo($file, PATHINFO_EXTENSION);

        return [
            'old_name' => "$actual_name.$ext",
            'new_name' => "$new_name.$ext"
        ];
    }

    /**
     * Utility method that validates upload
     *
     * @param array $files_array the $_FILES array
     * @return instance of the Validation object
     */
    protected static function verify_upload($files_array, $fieldname)
    {
        return Validation::factory($files_array)
                        ->rules($fieldname, [
                            ['Upload::not_empty'],
                            ['Upload::valid'],
                            ['Upload::size', ':value', '20M'],
                            ['Upload::type', [':value', ['jpg', 'png', 'gif', 'jpeg', 'pdf']]]
                        ]);
    }

    /**
     * Helper method that helps create a batch request to amazon
     *
     * @param array $objects an array of $arguments to create the putObject command
     * @return array $commands an array of SDK constructed commands
     */
    protected static function makeS3($objects)
    {
        $s3 = ASDK::s3();
        $commands = [];
        foreach ($objects as $object)
        {
            $commands[] = $s3->getCommand('PutObject', $object);
        }

        return $commands;
    }

    /**
     * The actual method that saves processed images to S3. Sets cache control
     * headers and other required defaults for S3
     *
     * @param array $commands an array of SDK constructed commands
     * @return boolean
     */
    protected static function saveS3($commands)
    {
        try
        {
            return ASDK::s3()->execute($commands);
        }
        catch (S3Exception $e)
        {
            Debug::error($e->getResponse() . ' : ' . $e->getStatusCode());
        }

        return false;
    }

    /**
     * Calls the API to save the picture in the DB and returns json data to
     * the client
     *
     * @param string $picture the saved s3 url
     * @param Image $image the Image instance of the file.
     * @return boolean|array
     */
    public function save($picture, Image $image)
    {
        $params = \Arr::merge($this->params, [
            'data' => [
                'mediainfo' => [
                    'width' => $image->width,
                    'height' => $image->height,
                    'mime' => $image->mime
                ],
                'link' => [
                    'type' => 'image'
                ],
                'name' => \Arr::get($this->uploaded_file, 'old_name'),
                'picture' => $picture,
                'subtype' => $image->mime
            ],
            'request_type' => 'create_attachment',
            'access_token' => $this->token(),
        ]);

        $url = '/post/update/';
        $req = Api::request($url, $params, HTTP_Request::POST);
        $this->extract_album($req);
        return parent::json_response($req);
    }

    /**
     * Calls the API to save the attachment in the DB and returns json data to
     * the client
     *
     * @param array $file
     * @return boolean|array
     */
    public function save_document($mediainfo, $link)
    {
        //return json_encode($this->request->post());
        $params = \Arr::merge($this->params, [
            'data' => [
                'link'      => $link,
                'mediainfo' => $mediainfo,
                'name' => \Arr::get($this->uploaded_file, 'old_name'),
                'picture' => null,
                'subtype' => \Arr::get($this->uploaded_file, 'type')
            ],
            'request_type' => 'create_attachment',
            'access_token' => $this->token(),
        ]);

        $url = '/post/update/';
        $req = Api::request($url, $params, HTTP_Request::POST);
        $this->extract_album($req);
        //file_put_contents('debug.html', var_export($req, true));
        return parent::json_response($req);
    }

    /**
     * Calls the API to save the avatar in the DB and makes a new request to
     * get the "updated" current user (since his picture is changed)
     *
     * @param array $file
     * @return boolean|array
     */
    public function save_avatar($name, $picture, Image $image)
    {
        $params = [
            'mediainfo' => [
                'width' => $image->width,
                'height' => $image->height,
                'mime' => $image->mime
            ],
            'name' => $name,
            'picture' => $picture,
            'request_type' => 'update_avatar',
            'access_token' => $this->token(),
        ];

        $this->cu_id = (string) Arr::get((array) $this->cu, '_id');
        Api::request('/user/update/' . $this->cu_id, $params, HTTP_Request::POST);
        $this->cu = null;
        $this->session->set('cu', null);
        return $this->get_cu();
    }

    /**
     * This retrieves the album id from the uploading request. if it finds one,
     * it sets the session, if not, it issues an API request to create a new
     * album.
     */
    protected function parse_request()
    {
        $a_id = $this->session->get('albumId');
        $r_id = \Arr::get($_REQUEST, 'album_id');

        if ($a_id)
        {
            return $this->params = [
                'album_id' => $a_id
            ];
        }
        elseif ($r_id)
        {
            return $this->params = [
                'album_id' => $r_id
            ];
        }
        else
        {
            $params = [
                'name' => \Arr::get($_REQUEST, 'name'),
                'create_album' => @json_decode(\Arr::get($_REQUEST, 'create_album', []))
            ];

            return $this->params = array_filter($params);
        }
    }

    /**
     * For multiple uploads of the same album, extract the album id from the
     * returned api request to use for the next file. this is stored in the
     * session
     *
     * @param \Api_Response $api
     */
    protected function extract_album(\Api_Response $api)
    {
        $a_id = $this->session->get('albumId');
        if (!$a_id)
        {
            $data = $api->get_data();

            if ($api::success() && $data)
            {
                $page = \Arr::get($data, 'page');
                $this->session->set('albumId', $page['_id']);
            }
        }
    }

    /**
     * This crops an image into a more squarish size so we can create the
     * various thumbnails.
     *
     * @param string $file the name of the file
     */
    protected function smart_crop($file)
    {
        $image = Image::factory($this->temp_dir . DIRECTORY_SEPARATOR . $file);
        $width = $image->width;
        $height = $image->height;

        if ($width > $height)
        {
            $image->crop($height, $height);
        }

        if ($height > $width)
        {
            $image->crop($width, $width);
        }

        $image->save();
    }

    /**
     * Utility that creates a google embed link
     *
     * @param string $file_url
     * @return string
     */
    protected static function build_iframe_link($file_url)
    {
        $data = ['url' => $file_url, 'embedded' => 'true'];

        return "http://docs.google.com/viewer?" . http_build_query($data);
    }

     /* Utility that builds an RTA styled link
     *
     * @param string $file_url
     * @return string
     */
    protected static function build_rta_link($file_url)
    {
        return "/external?" . http_build_query(['uri' => $file_url]);
    }


    public function after()
    {
        $this->auto_render = false;
    }
}
