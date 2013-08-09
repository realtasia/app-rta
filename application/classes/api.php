<?php

defined('SYSPATH') or die('No direct script access.');

/**
 * API Utility Helper.
 *
 * @author Jason Nathan
 * @package RealtAsia App
 * @subpackage Helper
 * @version 1.0
 * @copyright 2013 Realtasia Pte Ltd
 *
 */
class Api {
    /**
     * All client requests use this grant type
     */

    const CLIENT   = 'client_credentials';
    /**
     * All logged in requests use this grant type
     */
    const PASSWORD = 'password';

    public static function auth()
    {
        return new Api_Auth;
    }

    /**
     * Static Response method
     *
     * @return \Api_Response
     */
    public static function response($json = null)
    {
        if (!$json)
            $json = Session::instance()->get('api');

        return Api_Response::factory($json);
    }

    /**
     * Static Request method
     *
     * @return \Api_Request
     */
    public static function request($url = null, $p = null, $type = null)
    {
        $r = new Api_Request;

        if ($url instanceof Request)
            return $r->executeDirect($url);

        if ($url)
            return $r->execute($url, $p, $type);

        return $r;
    }

    /**
     * Gets the user form the session or from a response object
     *
     * @param Api_Response $response
     * @return mixed
     */
    public function get_user(\Api_Response $response = null)
    {
        $s  = Session::instance();
        $cu = $s->get("cu");

        if (!$cu)
        {
            $api = $response ? $response : self::response();

            if ($api::get_user_id())
            {
                $r = self::request('/user/index/' . $api::get_user_id(), [
                      'access_token' => $api::get_token()
                ]);

                if($r::success())
                {
                    $cu = $r->get_data();
                    $r::get_grant_type() === self::PASSWORD ? $s->set('cu', $cu) : $s->delete("cu");
                }
            }
        }
        return $cu;
    }

    /**
     * Destroys session & removes cookie
     */
    public static function logout()
    {
        static::request('/user/logout', [
            'access_token' => static::response()->get_token()
          ], HTTP_Request::POST);

        if (Cookie::get('authautologin'))
            Cookie::delete('authautologin');
    }

    /**
     * Gets client credentials authentication
     *
     * @return Api_Response
     */
    public static function auth_client()
    {
        $creds = [
            'client_id'    => RT::CLIENT_ID,
            'redirect_uri' => 'http://' . RT::BASE_URL,
            'user_agent'   => urlencode(Request::$user_agent),
            'grant_type'   => static::CLIENT
        ];
        return self::request('/auth/credentials', $creds, HTTP_Request::POST);
    }

}