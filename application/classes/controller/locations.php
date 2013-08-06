<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Description of locations
 *
 * @author Jason Nathan
 * @package RealtAsia API
 * @subpackage
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Controller_Locations extends Controller_Auth {

    public function before()
    {
        parent::before();
        $this->content = View::factory('people');
        $this->title   = 'Location Directory';
    }

    public function action_index()
    {
        $req  = $this->req('/page/search/', $this->query());
        $data = json_decode($req, true);
        //die($req);
        if ($this->auto_render)
        {
            $this->pagination = Pagination::factory($data['data']);
            $this->template->set('cl', $data['data']);
            $this->template->set('clt', 'locations');
            return $this->content = View::factory('locations')->set('cl', $data['data']);
        }

        $this->response->headers('Content-type', 'application/json');
        $this->response->body($req);
    }

    public function action_keyword()
    {
        return parent::_keyword('/page/locationkeyword/', $this->query());
    }

    public function query()
    {
        return $this->locations_search();
    }


    public function after()
    {
        if($this->auto_render)
        {
            $this->template->meta = (array) Metatag::factory([
                'name' => 'Locations Directory',
                'excerpt' => Kohana::message('pages', 'locations.description'),
                'uri' => '/people/index',
                'description' => Kohana::message('pages', 'locations.description'),
            ]);
        }

        return parent::after();
    }
}
