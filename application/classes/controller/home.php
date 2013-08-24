<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Description of client
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

    public function action_index()
    {
        return $this->content = View::factory('home');
    }

    public function action_loginbasic()
    {
        return $this->content = View::factory('forms/login');
    }

    public function action_lightbox()
    {
        $this->content = View::factory('lightbox');
    }

    public function action_accessDenied()
    {
        $this->content = View::factory('access_denied');
    }

    public function after()
    {
//        if ($this->request->action() !== 'api')
//        {
            return parent::after();
//        }
    }

    public function action_test()
    {
        //$this->content = View::factory('table');
        $this->content = View::factory('test');
    }

}
