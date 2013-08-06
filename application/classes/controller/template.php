<?php

defined('SYSPATH') or die('No direct script access.');

/**
 *
 * Copied from Kohana template Controller. Adds profiling to this controller
 *
 * @author Jason Nathan
 * @package Realtasia
 * @subpackage Controller
 * @version 0.8
 * @copyright 2011 Realtasia Pte Ltd
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

    public static function sanitize($o)
    {
        $search  = array(
            '/\>[^\S ]+/s', //strip whitespaces after tags, except space
            '/[^\S ]+\</s', //strip whitespaces before tags, except space
            '/(\s)+/s'  // shorten multiple whitespace sequences
        );
        $replace = array(
            '>',
            '<',
            '\\1'
        );
        return preg_replace($search, $replace, $o);
    }

}
