<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Methods declared here are for static pages that do not require secure actions
 *
 * @author Jason Nathan
 * @package RealtAsia APP
 * @category Controllers
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Controller_Home extends Controller_Auth {

    public function before()
    {
//        if ($this->request->action() !== 'api')
//        {
            parent::before();
//        }

        $static = $this->request->param('static');

        if (!empty($static))
            return $this->{"action_" . str_replace('-', '_', $static)}();
    }

    /**
     * Displays the home page
     *
     * @return View::factory('home')
     */
    public function action_index()
    {
        return $this->content = View::factory('home');
    }

    /**
     * Displays non-ajax login page
     *
     * @return View::factory('forms/login')
     */
    public function action_loginbasic()
    {
        return $this->content = View::factory('forms/login');
    }

    /**
     * Displays access denied pretty page
     *
     * @return View::factory('forms/login')
     */
    public function action_accessDenied()
    {
        $this->content = View::factory('access_denied');
    }

    public function action_test()
    {
        $this->content = View::factory('test');
    }

}
