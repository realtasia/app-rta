<?php defined('SYSPATH') or die('No direct script access.');

ini_set('session.cookie_lifetime', 0);
ini_set("session.cache_expire", 0);

/**
 * The parent Controller for all other controllers unless otherwise specified.
 *
 * @author Jason Nathan
 * @package RealtAsia API
 * @subpackage
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
abstract class Controller_Auth extends Controller_Template {

    /**
     * @var string the current user
     */
    public $cu         = NULL;
    public $cu_id      = NULL;
    public $errors     = NULL;
    public $fails      = NULL;
    public $template   = 'template';
    public $main_menu  = NULL;
    public $leftbar    = NULL;
    public $rightbar   = NULL;
    public $content    = NULL;
    public $title      = NULL;
    public $autoLogin  = NULL;
    public $pagination = '';

    /**
     * Set the default cookie salt and session type
     *
     * @param \Request $request
     * @param \Response $response
     * @return \Controller_Template
     */
    public function __construct(\Request $request, \Response $response)
    {
        parent::__construct($request, $response);

        /* Profiling******************************************************** */
        //$ba = Profiler::start('Controller', 'Auth ' . 'Session Setup');
        /*         * **************************************************************** */
        ASDK::dynamoSession();
        //ASDK::dynamoGC();
        $this->session = Session::instance();
        //Profiler::stop($ba);
    }

    /**
     * Checks if there is a current session, if not fetches one and sets the
     * defaults
     *
     * @return boolean|\Controller_Auth
     */
    public function before()
    {

        if (!$this->get_cu())
            $this->client();

        parent::before();

        if ($this->auto_render === TRUE)
        {
            $this->template->bind('title', $this->title);
            // the active controller. used to set what main menu nav is active
            $this->template->bind('main_menu', $this->main_menu);
            // leftbar should be decided upon by individual controllers
            $this->template->bind('leftbar', $this->leftbar);
            // rightbar should be decided upon by individual controllers
            $this->template->bind('rightbar', $this->rightbar);
            // content, obviously by individual controllers
            $this->template->bind('content', $this->content);
            // cerrored requests
            $this->template->bind('errors', $this->errors);
            // failed requests
            $this->template->bind('fail', $this->fails);
            // an empty variable until used, no harm done
            $this->template->bind_global('pagination', $this->pagination);
            $this->template->bind_global('autoLogin', $this->autoLogin);

            $this->template->set_global('api', RT::API_SERVER);
        }

        // see if we can retrieve the user..
        //$this->cu = $this->get_cu();
        // we give the post params a shot, sometimes cookie not sent by flash
        if (!$this->cu)
        {
            $uid = $this->request->post('user_id');
            if ($uid)
            {
                $this->cu_id = $uid;
            }
        }

        // see if we can retrieve the user..
        //Profiler::stop($ba);
        //die(Debug::vars($_COOKIE));
        return $this;
    }

    /**
     * Logs out via the api server and destroys the session.
     *
     * @uses self::req()
     * @return array|NULL
     */
    public function action_logout()
    {
        \Api::logout();

        $this->destroy();

        $this->request->redirect($this->request->referrer());
    }

    /**
     * Logs in to the api server with user credentials
     *
     * @return array|NULL
     */
    public function action_login()
    {

        $this->auto_render = FALSE;
        $remember          = $this->request->post('remember');

        if (!$this->cu_id)
        {
            $api = $this->session->get('api');
            if (!$api)
            {
                $this->destroy();
                $this->before();
            }
        }

        $r = Api::auth()->login($this->request->post(), $remember);

        if (!$r::success())
        {
            $this->destroy();
            return $this->ajax_response('error', ['message' => 'Cannot find user with those credentials']);
        }

        $this->cu_id = $r::get_user_id();

        if ($this->get_cu($r))
        {
            $this->autoLogin = false;
            return $this->ajax_response('success', json_decode(json_encode($this->cu), true));
        }

        return $this->ajax_response('error', ['message' => 'Cannot find user with those credentials']);
    }

    /**
     * Proxy method to API
     */
    public function action_api()
    {
        $this->auto_render = false;
        $params            = $this->request->query();
        $type              = HTTP_Request::GET;
        if (!\Arr::get($params, 'url'))
        {
            $params = $this->request->post();
            $type   = HTTP_Request::POST;
        }

        $url = strpos($params['url'], 'http') === 0 ? $params['url'] : 'http://' . RT::API_SERVER . $params['url'];
        $r   = Request::factory($url);
        unset($params['url']);

        switch ($type)
        {
            case HTTP_Request::POST:
                $r->post($params);
                $r->method($type);
                break;
            default:
                $r->query($params);
                $r->method($type);
                break;
        }
        $this->response->headers('Content-type', 'application/json');
        return $this->response->body(Api::request($r));
    }

    /**
     * In case client gets a new token, we make sure backend is aware of it.
     *
     * @return type
     */
    public function action_checkAuth()
    {
        $this->auto_render = false;
        $params            = $this->request->query();
        if (count($params) < 2)
        {
            $params = $this->request->post();
        }

        $token = Arr::get($params, 'access_token');

        if (is_array($token))
            $token = current($token);

        if (strlen($token) > 10 && $token !== $this->token())
        {
            $api = $this->session->get('api');
            $this->session->delete('api');

            $api['session']['access_token'] = $token;
            $this->session->set('api', $api);
        }
        $this->response->headers('Content-type', 'application/json');
        return $this->response->body(Api::response()->as_json());
    }

    public function action_poll()
    {
        $this->auto_render = false;
        $this->response->headers('Content-type', 'application/json');

        if ($this->get_cu())
        {
            $cu = json_decode(json_encode($this->cu), true);
            ksort($cu);

            $cuPoll = @json_decode($this->session->get('cuPoll'), true);

            if (!$cuPoll)
            {
                $cuPoll = self::set_poll_session($cu);
            }

            $ncu = Api::request('/user/index/' . (string) \Arr::get($cu, '_id'), [
                'access_token' => $this->token(),
                'request_type' => 'get_user_updates'
            ]);

            $cmp  = $cuPoll;
            $data = $ncu->get_data();
            ksort($data);
            //return $this->response->body($ncu);
            if ($cmp !== $data)
            {
                $cuArr    = array_merge($cu, $data);
                $this->session->delete('cuPoll');
                $this->session->delete('cu');
                $this->session->set('cu', $cu);
                self::set_poll_session($cuArr);
                $this->cu = (object) $cuArr;
                return $this->response->body(json_encode(['status' => 'success', 'data'   => $cuArr]));
            }

            return $this->response->body(json_encode(['status' => 'fail']));
        }
    }

    /**
     * renew user session
     */
    public function action_renew()
    {
        $this->auto_render = false;
        $this->renew();
        $this->response->headers('Content-type', 'application/json');
        return $this->response->body(Api::response()->as_json());
    }

    public function renew()
    {
        $this->cu_id = (string) Arr::get((array) $this->cu, '_id');
        $this->cu    = null;
        $this->session->delete('cu');
        $this->get_cu();
    }

    public function action_renew_client()
    {
        $this->client();
        $this->response->headers('Content-type', 'application/json');
        return $this->response->body(Api::response()->as_json());
    }

    /**
     * Utility that logs in to the api server with client credentials
     *
     * @uses Api::auth_client()
     * @return Api_Response
     */
    public function client()
    {
        return Api::auth_client();
    }

    /**
     * Utility that validates a request session
     *
     * @param array|json string $api
     * @todo status type fail and error not handled.
     * @return boolean
     */
    public function check($api)
    {
        $data = Api_Response::factory($api);

        $message = $data->get_data();

        if ($data::error() && $this->get_cu())
        {
            if (\Arr::get($message, 'title') === 'access_denied')
            {
                $this->destroy();
                header("HTTP/1.0 401 Access Denied");
                exit;
                //$this->request->redirect('/accessdenied');
            }
        }
        //print_r($api);

        if (!$state = $data::get_state())
            return false;

        if (Security::check($state))
        {
            if ($data::error())
                $this->errors = $message;

            if ($data::fail())
                $this->fails = $message;
        }

        //return false;
    }

    /**
     * Fetches an access token from the set property or session if there is one
     *
     * @return string|NULL
     */
    public function token()
    {
        if ($api = Api::response())
        {
            return $api->get_token();
        }

        return NULL;
    }

    /**
     * Utility that retrieves the current user information from the api server.
     * Requires that the $cu_id is set
     *
     * @return array|null
     */
    public function get_cu($r = null)
    {
        if (!$this->cu)
        {
            $response = Api::auth()->get_user($r);

            if ($response)
            {
                $this->cu = (object) $response;
            }

        }

        return $this->cu;
    }

    /**
     * Destroys the current session cookies and state
     *
     * @return \Controller_Auth
     */
    public function destroy()
    {
        $this->session->delete("api");
        $this->session->delete("cu");
        $this->session->destroy();

        return $this;
    }

    /**
     * Makes a request to the API server with given params. Checks the response
     * and sets new tokens.
     *
     * @uses self::check()
     * @uses self::new_token()
     *
     * @param string $uri
     * @param array $params post or query params. state included automatically
     * @param string $type the request type
     * @return NULL|json string
     */
    public function req($uri, $params, $type = NULL)
    {
        if (strpos('//', $uri) === 0)
        {
            $uri = 'http:' . $uri;
        }
        if (strpos($uri, 'http') !== 0)
        {
            $uri = 'http://' . RT::API_SERVER . $uri;
        }
        $response = NULL;

        $params['state'] = Security::token(true);

        $r = Request::factory($uri);
        $r->headers('Accept-Encoding', 'gzip, deflate');

        switch ($type)
        {
            case HTTP_Request::POST:
                $r->post($params);
                $r->method($type);
                break;
            default:
                $r->query($params);
                $r->method(HTTP_Request::GET);
                break;
        }

        $response = $r->execute()->body();
        $response = gzdecode($response);
        //die($response);
        //$this->check($response);

        //$this->new_token($response);

        return $response;
    }

    /**
     * Checks if there is a user logged in an optionally his role.
     *
     * @param string $role
     * @return boolean
     */
    public function logged_in($role = NULL)
    {
        $user = $this->get_cu();
        if (!$user)
            return false;
        else
        {
            if (!$role)
                return true;

            if (in_array($role, $user->roles))
                return true;
        }
        return false;
    }

    public function ajax_response($status, $data)
    {
        $this->auto_render = false;

        $body = [
            'session' => Session::instance()->get("api"),
            'status'  => $status,
            'data'    => $data
        ];
        //if(!ob_start("ob_gzhandler")) ob_start();
        $this->response->headers('Content-type', 'application/json');
        $this->response->body(json_encode($body));
    }

    /**
     * Placeholder
     */
    public function after()
    {
        unset($_GET['kohana_uri']);
        /* Profiling******************************************************** */
        //$ba = Profiler::start('Controller', 'Main ' . __function__);
        /*         * **************************************************************** */
        if ($this->auto_render === TRUE)
        {
            $menus = Kohana::$config->load('menu')->get('main');
            $this->get_cu();
            if ($this->cu)
            {
                array_unshift($menus, [
                    'title' => 'Home',
                    'url'   => $this->cu->uri,
                    'attrs' => [
                        'class' => strpos(Request::initial()->url(), $this->cu->uri) !== false ? 'active' : '',
                        'id'    => 'mainNavHome'
                    ]
                ]);
            }

            $this->main_menu = Menu::factory();
            foreach ($menus as $menu)
            {
                $this->main_menu->add($menu);
            }
            $this->template->set_global([
                'cu' => (array) $this->cu, // in case current user gets set, we bind it to the template.
                'ca' => Request::initial()->action(), // add the current action to the template
                'at' => $this->token(), // set the access_token for ajax requests.
                'st' => Security::token() // set the state param for ajax requests to use.
            ]);
        }
        return parent::after();
        /* Profiling******************************************************** */
        //Profiler::stop($ba);
        /*         * **************************************************************** */

        //var_dump($this->cu);
    }

    protected function leftbar_links()
    {
        $items   = ['feed', 'info', 'media', 'testimonials', 'listings', 'subscriptions'];
        $route   = Route::name($this->request->route());
        $methods = get_class_methods($this);
        $uri     = $uri     = $this->request->param('username');
        $links   = [];

        foreach ($methods as $method)
        {
            if (strpos($method, 'action_') === 0)
            {
                $meth = substr($method, strlen('action_'));
                if (in_array($meth, $items))
                {
                    $links[ucfirst($meth)] = URL::site("$uri/$meth", 'http');
                    if ($meth === 'media')
                    {
                        $links[ucfirst($meth)] = URL::site("$uri#$meth", 'http');
                    }
                }
            }
        }
        return $links;
    }

    protected function rightbar_links()
    {
        $items   = ['likers', 'subscribers'];
        $route   = Route::name($this->request->route());
        $methods = get_class_methods($this);
        $uri     = '';
        $links   = [];

        switch ($route)
        {
            case 'location':
                $uri = [
                    'controller' => $route,
                    'subtype'    => $this->request->param('subtype'),
                    'slug'       => $this->request->param('slug')
                ];
                break;
            default:
                $uri = $this->request->param('username');
                break;
        }
        foreach ($methods as $method)
        {
            if (strpos($method, 'action_') === 0)
            {
                $meth = substr($method, strlen('action_'));
                if (in_array($meth, $items))
                {
                    if (is_array($uri))
                    {
                        $uri['action']         = $meth;
                        $links[ucfirst($meth)] = Route::get($route)->uri($uri);
                    }
                    else
                    {
                        $links[ucfirst($meth)] = URL::site("$uri/$meth", 'http');
                    }
                }
            }
        }
        return $links;
    }

    protected function search_defaults()
    {
        $query         = $this->request->query();
        $query['sort'] = \Arr::get($query, 'sort', '') === 'Newest' ? 'popular' : 'active';

        $state    = \Arr::get($query, 'state');
//        if($state && !Security::check($state))
//        {
//            return [];
//        }
        $defaults = [
            'skip'         => ((int) Arr::get($query, 'page', 1) - 1) * 10,
            'filter'       => \Arr::get($query, 'filter', 'All'),
            'sort'         => 'active',
            'access_token' => $this->token()
        ];

        return Arr::merge($defaults, $query);
    }

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

    protected function locations_search()
    {
        $query         = $this->search_defaults();
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

    protected function _keyword($url, $query)
    {
        $this->auto_render = false;
        $this->response->headers('Content-type', 'application/javascript');
        return $this->response->body($this->req($url, $query));
    }

    protected function set_poll_session(array $cu)
    {
        $cuPoll             = \Arr::extract($cu, ['_id', 'subscribers', 'likers', 'settings', 'counts']);
        $settings           = \Arr::path($cuPoll, 'settings.privacy');
        $cuPoll['settings'] = ['privacy' => $settings];
        ksort($cuPoll);
        $this->session->set('cuPoll', json_encode($cuPoll));
        return $cuPoll;
    }


    public function action_sessionapi()
    {
        print_r(Session::instance()->get("api"));
        die();
    }

    public function action_sessioncu()
    {
        print_r(Session::instance()->get("cu"));
        die();
    }


}
