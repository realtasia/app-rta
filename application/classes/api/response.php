<?php

defined('SYSPATH') or die('No direct script access.');

/**
 * API Parser Utility Helper.
 *
 * @author Jason Nathan
 * @package RealtAsia App
 * @subpackage Helper
 * @version 1.0
 * @copyright 2013 Realtasia Pte Ltd
 *
 */
class Api_Response extends Api {

    /**
     * Factory method
     *
     * @return Auth
     */
    public static function factory($json)
    {
        return new Api_Response($json);
    }

    /**
     * The current session extracted from the given response's json string
     *
     * @var array
     */
    protected static $session;

    /**
     * Data extracted from the given response's json string
     *
     * @var array
     */
    protected static $data;

    /**
     * The status of this request (success, error etc)
     *
     * @var array
     */
    protected static $status;

    /**
     * Sets the session variable after some checks
     *
     * @param string $json
     */
    public function __construct($json)
    {
        try
        {
            if (is_object($json))
                $json = json_decode(json_encode($json), true);

            if (is_string($json))
                $json = json_decode($json, true);

            if ($json)
            {
                static::$data = \Arr::get($json, 'data');
                static::$status = \Arr::get($json, 'status');
                static::$session = \Arr::get($json, 'session');

                if (static::success())
                {
                    $this->store_session();
                }
            }
        }
        catch (Exception $exc)
        {
            return $exc->getTraceAsString();
        }
    }

    /**
     * Utility method that checks a session's authenticity. Making it public so it
     * can be used everywhere.
     *
     * @return boolean
     */
    public static function authenticated()
    {
//        $trace  = debug_backtrace();
//        $caller = array_shift($trace);
//
//        echo "Called by {$caller['function']}";
//        if (isset($caller['class']))
//            echo " in {$caller['class']}";

        if (!static::$session)
            return false;

        $d = static::get(['expires_in', 'modified', 'state']);
        switch (true)
        {
            case (int) $d["expires_in"] + (int) $d["modified"] < time():
            case $d["state"] && !Security::check($d["state"]):
                return false;
        }

        return true;
    }

    /**
     * Retrieves the access_token from this session
     *
     * @return mixed the access_token or null
     */
    public static function get_token()
    {
        return static::get('access_token');
    }

    /**
     * Retrieves the user id from this session
     *
     * @return mixed the user_id or null
     */
    public static function get_user_id()
    {
        return static::get('user_id');
    }

    /**
     * Retrieves the security_token from this session
     *
     * @return mixed the security_token or null
     */
    public static function get_state()
    {
        return static::get('state');
    }

    /**
     * Retrieves the grant_type from this session
     *
     * @return mixed the grant_type or null
     */
    public static function get_grant_type()
    {
        return static::get('grant_type');
    }

    /**
     * Retrieves the data portion of the request
     *
     * @return array
     */
    public static function get_data()
    {
        return static::$data;
    }

    /**
     * Simple method to check if current session has no user
     *
     * @return boolean
     */
    public static function is_client()
    {
        return static::get_grant_type() === self::CLIENT;
    }

    /**
     * Returns the extracted array (to store in PHP $_SESSION)
     *
     * @return array the extracted session information
     */
    public static function get_session()
    {
        return static::$session;
    }

    /**
     * Utility to check status of response is successful
     *
     * @return boolean
     */
    public static function success()
    {
        return static::$status === 'success';
    }

    /**
     * Utility to check status of response is error
     *
     * @return boolean
     */
    public static function error()
    {
        return static::$status === 'error';
    }

    /**
     * Utility to check status of response is fail
     *
     * @return boolean
     */
    public static function fail()
    {
        return static::$status === 'fail';
    }

    /**
     * Returns current response data as json
     *
     * @return string json
     */
    public static function as_json()
    {
        return json_encode(static::as_array());
    }

    /**
     * Returns current response data as array
     *
     * @return string json
     */
    public static function as_array()
    {
        return [
            'status'  => static::$status,
            'session' => static::get_session(),
            'data'    => static::get_data()
        ];
    }

    /**
     * Returns current response data as object
     *
     * @return string json
     */
    public static function as_object()
    {
        return json_decode(static::as_json());
    }

    /**
     * Utility to retrieve keys from arrays
     *
     * @param mixed $val
     * @return mixed
     */
    protected static function get($val)
    {
        if (is_array($val))
            return \Arr::extract(static::$session, $val);

        return \Arr::get(static::$session, $val);
    }

    /**
     * Storing the session from the response directly, don't know if this is wise
     * thing, but helps to update the access_token each time.
     *
     * @return boolean
     */
    protected static function store_session()
    {
        // not authenticated, no need to set session
        if (!static::authenticated())
            return false;

        $s = Session::instance();

        $api = $s->get('api');

        // if there is something stored and we can retrieve the access token
        if ($api && $token = \Arr::get($api, 'access_token'))
        {
            // if tokens are the same, no need to do anything.
            if ($token === static::get_token())
            {
                return true;
            }
        }

        // update the stored session.
        $s->set("api", ['session' => static::get_session()]);
    }

}