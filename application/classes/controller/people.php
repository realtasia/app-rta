<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Description of client
 *
 * @author Jason Nathan
 * @package RealtAsia API
 * @subpackage
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Controller_People extends Controller_Auth {

    public function before()
    {
        parent::before();
        $this->content = View::factory('people');
        $this->title   = 'People Directory';
    }

    public function action_index()
    {
        $req  = Api::request('/user/', $this->query());
        $data = $req->get_data();
        //echo "<pre>";
        //die($req);
        //die(Debug::vars($this->query()));
        if ($this->auto_render)
        {
            $this->pagination = Pagination::factory($data);
            $this->template->set('cl', $data);
            $this->template->set('clt', 'people');
            return $this->content = View::factory('people')->set('cl', $data);
        }
        return parent::json_response($req);
    }

    public function query()
    {
        return parent::people_search();
    }

    public function after()
    {
        if($this->auto_render)
        {
            $this->template->meta = (array) Metatag::factory([
                'name' => 'People Directory',
                'excerpt' => Kohana::message('pages', 'member.description'),
                'uri' => '/people/index',
                'description' => Kohana::message('pages', 'member.description'),
            ]);
        }

        return parent::after();
    }
}
