<?php

defined('SYSPATH') or die('No direct script access.');

/**
 * API Request Utility Helper.
 *
 * @author Jason Nathan
 * @package RealtAsia App
 * @subpackage Helper
 * @version 1.0
 * @copyright 2013 Realtasia Pte Ltd
 *
 */
class Api_Request extends Api {

    /**
     * Makes a request to the API server with given params.
     *
     * @uses self::executeDirect
     *
     * @param string $uri
     * @param array $params post or get params. state included automatically
     * @param string $type the request type
     * @return \Api_Response
     */
    public function execute($uri, array $params, $type = NULL)
    {
        if (strpos('//', $uri) === 0)
            $uri = 'http:' . $uri;

        if (strpos($uri, 'http') !== 0)
            $uri = 'http://' . RT::API_SERVER . $uri;

        // yes this is ridiculous, but will leave it in for now.
        if (!\Arr::get($params, 'state'))
            $params['state'] = Security::token();

        $r = Request::factory($uri);

        if($type === HTTP_Request::POST)
            $r->post($params)->method($type);
        else
            $r->query($params)->method(HTTP_Request::GET);

        return parent::response(static::executeDirect($r));
    }

    /**
     * Sets the headers and sends the request. Uncompresses response
     *
     * @param \Request $request
     * @return \Response body json string
     */
    public static function executeDirect(\Request $request)
    {
        $request->headers('Accept-Encoding', 'gzip, deflate');
        $r = $request->execute();
        try
        {
            return gzdecode($r);
        }
        catch (Exception $exc)
        {
            return $r;
        }
    }

}