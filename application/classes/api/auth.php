<?php defined('SYSPATH') or die('No direct script access.');

/**
 * API Parser Utility Helper.
 *
 * @author Jason Nathan
 * @package RealtAsia App
 * @category Helpers
 * @version 1.0
 * @copyright 2013 Realtasia Pte Ltd
 *
 */
class Api_Auth extends Api {

    /**
     * Logs in a user
     *
     * @param string $username
     * @param string $password
     * @param boolean $remember
     * @return Api_Response $response
     */
    public function login($post, $remember = FALSE)
    {
        $r = parent::request('/auth/login', [
              'client_id'    => RT::CLIENT_ID,
              'user_agent'   => urlencode(Request::$user_agent),
              'username'     => \Arr::get($post, 'username'),
              'password'     => \Arr::get($post, 'password'),
              'state'        => \Arr::get($post, 'state'),
              'redirect_uri' => 'http://' . RT::CLIENT_REDIRECT,
              'grant_type'   => parent::PASSWORD
            ], HTTP_Request::POST);

        file_put_contents('debug.html', var_export($remember === TRUE, true));
        if ($remember === TRUE && $r::success())
        {
            //file_put_contents('debug.html', print_r($cookie, true));
            $cookie = $r::get_user_id() . '_' . $r::get_token();
            // Set the autologin cookie
            Cookie::set('authautologin', $cookie, Date::WEEK);
        }

        return $r;
    }

    /**
     * Logs a user in, based on the authautologin cookie.
     *
     * @return  mixed
     */
    public function auto_login()
    {
        if ($token = Cookie::get('authautologin'))
        {
            $s     = Session::instance();
            // Load the token and user
            $token = explode("_", $token);

            $r = parent::request('/user/index/' . $token[0], [
                  'access_token' => $token[1]
            ]);

            if ($r::success())
            {
                $s->set('cu', $r::get_data());
                $cookie = $r::get_user_id() . '_' . $r::get_token();
                Cookie::set('authautologin', $cookie, Date::WEEK);
                return $r::get_data();
            }
            else
            {
                //file_put_contents('debug.html', print_r($r::get_session(), true));
                //file_put_contents('debug.html', print_r($r::data(), true));
            }
        }

        return null;
    }

    /**
     * Tries to get user from session or auto login
     *
     * @param Api_Response $response
     * @return mixed
     */
    public function get_user(\Api_Response $response = null)
    {
        $cu = parent::get_user($response);

        // no user in session, try the auto_login cookie
        if (!$cu)
            return $this->auto_login();

        return $cu;
    }

}