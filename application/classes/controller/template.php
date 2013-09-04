<?php defined('SYSPATH') or die('No direct script access.');

/**
 *
 * Copied from Kohana template Controller. Adds profiling to this controller
 *
 * @author Jason Nathan
 * @package RealtAsia APP
 * @category Controllers
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Controller_Template extends Controller {

    public $template    = 'templater';
    public $auto_render = TRUE;
    public static $cacheable   = FALSE;

    public function before()
    {
        /* Profiling******************************************************** */
        //$ba = Profiler::start('Controller', 'Template ' . __function__);
        /*         * **************************************************************** */
        $this->auto_render = !$this->request->is_ajax();
        if ($this->auto_render === TRUE)
        {
            // Load the template
            $this->template = View::factory($this->template);
        }

        return parent::before();
    }

    /**
     * utility method that returns JSON data immediately by executing the
     * relevant Request Objects populated above
     *
     * @return array of arguments
     */
    protected function ajax_loop()
    {
        if (isset($this->_posts_loop) AND $this->_posts_loop instanceof Request)
            $res = $this->_posts_loop;

        if (isset($this->_pages_loop) AND $this->_pages_loop instanceof Request)
            $res = $this->_pages_loop;

        $this->response->headers('Content-type', 'application/json')->body($res->execute());
    }

    /**
     * Simple method to create a cache key for the current request so that it
     *
     * @return string
     */
    protected function build_cache_key()
    {
        $query  = $this->request->query();
        $method = $this->request->method();
        $uri    = $method . ': ' . $this->request->uri();

        $query["access_token"] = Api::response()->get_token();

        if (!empty($query))
            return $uri . '?' . http_build_query($query);

        return $uri;
    }

    /**
     * While this method works, the request is still processed before returning
     * the cached HTML - kinda defeats the purpose. However, since it still
     * compresses the output, it will work so long as $cacheable is false
     *
     * @param mixed Response|string $html to render
     * @param string $key
     * @return string
     */
    public static function min_lite($html, $key = NULL)
    {
        if ($key)
        {
            if (self::$cacheable and $cached_html = Cache::instance('apc')->get($key, FALSE))
            {
                return gzuncompress($cached_html);
            }
        }
        //echo "<br><br><br><br><h1>NOT Cached: $key</h1>";
        if (is_object($html))
            $html = static::sanitize($html->render());
        //$html = $html->render();


        if (self::$cacheable)
            Cache::instance('apc')->set($key, gzcompress($html), 60);

        return $html;
    }

    /**
     * This method compresses HTML output and sets no0cache for JSON responses
     *
     * @return parent::after()
     */
    public function after()
    {
        /* Profiling******************************************************** */
        //$ba = Profiler::start('Controller', 'Template ' . __function__);
        /*         * **************************************************************** */
        $this->auto_render = !$this->request->is_ajax();
        if ($this->auto_render)
        {
            $this->response->body(static::min_lite($this->template, $this->build_cache_key()));
            return parent::after();
            //$this->response->body($this->template->render());
        }
        $this->request->headers('Cache-Control', 'no-cache');
        $this->request->headers('Expires', time() - Date::WEEK);
        return parent::after();
        //Profiler::stop($ba);
    }

    /**
     * Removes whitespaces. I am aware of the computation cost of regex but HTML
     * responses are heavy in RTA, and this does significantly reduce response
     * size
     *
     * @param string $o
     * @return string
     */
    public static function sanitize($o)
    {
        $search  = [
            '/\>[^\S ]+/s', //strip whitespaces after tags, except space
            '/[^\S ]+\</s', //strip whitespaces before tags, except space
            '/(\s)+/s'  // shorten multiple whitespace sequences
        ];
        $replace = [
            '>',
            '<',
            '\\1'
        ];
        return preg_replace($search, $replace, $o);
    }

    /**
     * Utility methods used in various Controllers to perform respective searches
     */

    /**
     * This method extracts '_ids' or 'object_ids' for a standard interaction
     * request. Normally complemented with the latter method of retrieving
     * people objects.
     *
     * @param string $url
     * @param array $query
     * @param boolean $object_ids
     * @return array
     */
    protected function get_interactor_ids($url, array $query = array(), $object_ids = false)
    {
        $ids = [];

        $o_ids = Api::request($url, \Arr::merge([
                'skip'         => ((int) Arr::get($this->request->query(), 'page', 1) - 1) * 10,
                'access_token' => $this->token()
              ], $query));

        if ($o_ids::success())
        {
            $data = $o_ids->get_data();
            if (!empty($data))
            {
                foreach ($data as $v)
                    $ids[] = $v[$object_ids ? 'object_id' : '_id'];
            }
        }
        return (array) $ids;
    }

    /**
     * Extracts people with an API call using the given ids.
     *
     * @param array $ids
     * @return string JSON
     */
    protected function get_people_by_ids(array $ids = array())
    {
        $data = [];

        if (!empty($ids))
        {
//            return $this->json_response(\Arr::merge($this->people_query(), [
//                    'include_ids' => $ids
//            ]));
            $req = Api::request("/user", \Arr::merge($this->people_query(), [
                    'include_ids' => $ids
            ]));
            if ($req::success())
            {
                if ($this->auto_render) // grab the data from the response
                    $data = $req->get_data();
                else // just return the response if ajax
                    return self::json_response($req);
            }
        }

//        if ($this->auto_render)
//        {
//            $this->pagination = Pagination::factory($data);
//            $this->template->set('cl', $data);
//            $this->template->set('clt', 'people');
//            $this->content    = View::factory('people')->set('cl', $data);
//            return $this->content->set('introcontent', Kohana::find_file('views', "introcontent/location"));
//        }

        return self::json_response([]);
    }

    /**
     * This method sets the default values for any given search query.
     *
     * @return array the processed $parameters
     */
    protected function search_defaults()
    {
        $query         = $this->request->query();
        //$query['sort'] = \Arr::get($query, 'sort', '') === 'Newest' ? 'popular' : 'active';

        $state = \Arr::get($query, 'state');

        $defaults = [
            'skip'         => ((int) Arr::get($query, 'page', 1) - 1) * 10,
            'filter'       => \Arr::get($query, 'filter', 'All'),
            'sort'         => 'active',
            'state'        => $state,
            'access_token' => $this->token()
        ];

        return Arr::merge($defaults, $query);
    }

    /**
     * Parses request & sets query parameters for people searches. Used in
     * multiple controllers where there is a need to paginate & serve people
     * objects.
     *
     * @return array
     */
    protected function people_search()
    {
        $query  = $this->request->query();
        $filter = \Arr::get($query, 'filter');
        $roles  = [];
        switch ($filter)
        {
            case 'Users': $roles = ['user'];
                break;
            case 'Staff': $roles = ['admin'];
                break;
            case 'Agents': $roles = ['agent'];
                break;
        }

        $query['sort'] = \Arr::get($query, 'sort', 'active');

        switch ($query['sort'])
        {
            case 'Last Active': $query['sort'] = 'active';
                break;
            case 'Newest': $query['sort'] = 'newest';
                break;
            case 'Alphabetical': $query['sort'] = 'alpha';
                break;
        }

        $defaults = [
            'limit'        => 11,
            'skip'         => ((int) Arr::get($query, 'page', 1) - 1) * 10,
            'roles'        => $roles,
            'sort'         => '',
            'access_token' => $this->token(),
            's'            => null,
            'include_ids'  => [],
            'status'       => 'active',
            'privacy'      => 'PUBLIC',
        ];

        return Arr::overwrite($defaults, $query);
    }

    /**
     * Parses request & sets query parameters for location searches. Used in
     * multiple controllers where there is a need to paginate & serve location
     * objects.
     *
     * @return array
     */
    protected function locations_search()
    {
        $query         = $this->search_defaults();
        $sort = \Arr::get($query, 'sort', 'active');
        //die(json_encode($sort));
        switch ($sort)
        {
            case 'Last Active': $query['sort'] = 'active';
                break;
            case 'Newest': $query['sort'] = 'newest';
                break;
            case 'Alphabetical': $query['sort'] = 'alpha';
                break;
        }

        $filter = \Arr::get($query, 'filter');
        if (in_array($filter, ['Private Apartments', 'Serviced Apartments', 'Private Landed', 'HDB']))
        {
            $query['subtypes'] = $filter;
        }

        $query['type'] = 'location';

        $defaults = [
            'limit'        => 11,
            'skip'         => ((int) Arr::get($query, 'page', 1) - 1) * 10,
            'sort'         => '',
            'access_token' => $this->token(),
            's'            => null,
            'include_ids'  => [],
            'privacy'      => 'PUBLIC',
            'type'         => 'location',
            'subtypes'     => null
        ];

        return Arr::overwrite($defaults, $query);
    }

    /**
     * Parses request & sets query parameters for listing searches. Used in
     * multiple controllers where there is a need to paginate & serve listing
     * objects.
     *
     * @return array
     */
    protected function listings_search()
    {
        $query = $this->search_defaults();
        switch ($query['sort'])
        {
            case 'Last Active': $query['sort'] = 'active';
                break;
            case 'Newest': $query['sort'] = 'newest';
                break;
        }

        $filter = \Arr::get($query, 'filter');
        if (in_array($filter, ['Private Apartments', 'Serviced Apartments', 'Private Landed', 'HDB']))
        {
            $query['filter'] = $filter;
        }

        $params = [
            'type'      => ucfirst(strtolower(\Arr::get($query, 'type', 'sale'))),
            'builtLow'  => static::checkNumberField(\Arr::get($query, 'builtLow', 0)),
            'builtHigh' => static::checkNumberField(\Arr::get($query, 'builtHigh')),
            'priceHigh' => static::checkNumberField(\Arr::get($query, 'priceHigh')),
            'priceLow'  => static::checkNumberField(\Arr::get($query, 'priceLow', 0)),
            'roomsHigh' => static::checkNumberField(\Arr::get($query, 'roomsHigh')),
            'roomsLow'  => static::checkNumberField(\Arr::get($query, 'roomsLow', 0)),
            's'         => Security::xss_clean(\Arr::get($query, 's', ''))
        ];

        return \Arr::merge($query, ['listing' => array_filter($params)]);
    }

    /**
     * Utility mehtod that parses/validates a string and returns a number. Used
     * in listing searches/creations.
     *
     * @param type $v
     * @return int
     */
    protected static function checkNumberField($v)
    {
        switch (true)
        {
            case $v === 'STUDIO':
            case strtolower($v) === '1 room':
                return 1;
            case $v === '0 sqft':
            case $v === '0':
            case $v === '0 rooms':
                return 0;
        }

        return floatval(str_replace(',', '', $v));
    }

    /**
     * These three lines were repeated over and over. This utility mehthod
     * condenses that
     *
     * @param string $url
     * @param array $query
     * @return Response
     */
    protected function _keyword($url, $query)
    {
        $this->auto_render = false;
        $this->response->headers('Content-type', 'application/json');
        return $this->response->body(Api::request($url, $query)->as_json());
    }

    /**
     t* Similarly, These lines were repeated over and over. This utility method
     * condenses that.
     *
     * @param mixed String|Api_Response|Array $json
     * @return Response
     */
    protected function json_response($json)
    {
        if ($json instanceof Api_Response)
            $json = $json->as_json();

        if (is_array($json))
            $json = json_encode($json);

        $this->response->headers('Content-type', 'application/json');
        return $this->response->body($json);
    }
}