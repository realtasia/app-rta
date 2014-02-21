<?php defined('SYSPATH') or die('No direct script access.');

ini_set('session.cookie_lifetime', Date::WEEK * 2);
ini_set("session.cache_expire", Date::WEEK * 2);

/**
 * The parent Controller for all other controllers unless otherwise specified.
 *
 * @author Jason Nathan
 * @package RealtAsia APP
 * @category Controllers
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
        $s=ASDK::dynamoSession();
        //Mongosession::init();
        $this->session = Session::instance();
		// echo "<h1 style='margin-top:50px'>".Debug::vars($s->isSessionOpen())."</h1>";
		//die(Debug::vars(session_module_name()));
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
                $this->get_cu();
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
     * @uses Api::logout()
     * @return array|NULL
     */
    public function action_logout()
    {
        \Api::logout();

        $this->destroy();

        if($redirect = $this->request->query('redirect_to'))
            return $this->request->redirect($redirect);

        return $this->request->redirect($this->request->referrer());
    }

    /**
     * Logs in to the api server with user credentials
     *
     * @return array|NULL
     */
    public function action_login()
    {

        $this->auto_render = FALSE;
        $p = $this->request->post();
        if (!$this->cu_id)
        {
            $api = $this->session->get('api');
            if (!$api)
            {
                $this->destroy();
                $this->before();
            }
        }

        $r = Api::auth()->login($p, (bool) \Arr::get($p, 'remember'));

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
     * Proxy method to query the API. Used for ajax calls. Just to solve
     * cross-domain issues and other heap of benefits
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
        // if there is still no url, we cannot continue
        if (!\Arr::get($params, 'url'))
          return parent::json_response([]);


        $url = strpos($params['url'], 'http') === 0 ? $params['url'] : 'http://' . RT::API_SERVER . $params['url'];
        $r   = Request::factory($url);
        unset($params['url']);

        if($type === HTTP_Request::POST)
            $r->post($params)->method($type);
        else
            $r->query($params)->method(HTTP_Request::GET);

        // a little ambiguous but this method returns JSON when given a Kohana_Request object.
        $json= Api::request($r);
        //die($json);
        return parent::json_response($json);
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

    /**
     * An implementation of polling -> for new messages, counts etc. I really I
     * wish I had more time to get a better solution up.
     *
     * @return Response
     */
    public function action_poll()
    {
        $this->auto_render = false;
        $this->response->headers('Content-type', 'application/json');

        if (Api::auth()->fetch_user())
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
            //return parent::json_response($cmp);
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
     * This is called via ajax to re-get the current user data from the API. Normally
     * because a user updated something
     *
     * @uses self::renew()
     */
    public function action_renew()
    {
        $this->auto_render = false;
        $this->renew();
        $this->response->headers('Content-type', 'application/json');
        return $this->response->body(Api::response()->as_json());
    }

    /**
     * This deletes the current user data stored in the session and queries the
     * API for fresh credentials.
     */
    public function renew()
    {
        $this->cu_id = (string) Arr::get((array) $this->cu, '_id');
        $this->cu    = null;
        $this->session->delete('cu');
        $this->get_cu();
    }

    /**
     * This does the same thing as the above except it gets fresh Client
     * credentials instead. (No user)
     *
     * @return \Response
     */
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
                    'url'   => $this->cu->uri . '?ref=home',
                    'icon'   => 'icon-home',
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

    /**
     * Estracts the needed changed info of a given user so the UI can be kept
     * updated. Saves this in a session for continuous comparisons
     * @param array $cu
     * @return type
     */
    protected function set_poll_session(array $cu)
    {
        $cuPoll             = \Arr::extract($cu, ['_id', 'subscribers', 'likers', 'settings', 'counts']);
        $settings           = \Arr::path($cuPoll, 'settings.privacy');
        $cuPoll['settings'] = ['privacy' => $settings];
        ksort($cuPoll);
        $this->session->set('cuPoll', json_encode($cuPoll));
        return $cuPoll;
    }


    /**
     * get rid of these tester functions

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
     *
     */
}