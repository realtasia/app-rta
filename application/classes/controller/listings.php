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
class Controller_Listings extends Controller_Auth {

    public function before()
    {
        parent::before();
        $this->content = View::factory('people');
        $this->title   = 'Listings Directory';
    }

    public function action_index()
    {
        $req  = $this->req('/post/listings/', parent::listings_search());
        $data = json_decode($req, true);
        //echo "<pre>";
        //print_r(parent::listings_search());
        //die($req);
        if ($this->auto_render)
        {
            $this->pagination = Pagination::factory($data['data']);
            $this->template->set('cl', $data['data']);
            $this->template->set('clt', 'listings');
            return $this->content = View::factory('listings')->set('cl', $data['data']);
        }

        $this->response->headers('Content-type', 'application/json');
        $this->response->body($req);
    }

    public function action_keyword()
    {
        $this->auto_render = false;
        $this->response->headers('Content-type', 'application/javascript');
        $this->response->body($this->req('/page/listingkeyword/', $this->query()));
    }

    public function after()
    {
        if($this->auto_render)
        {
            $this->template->meta = (array) Metatag::factory([
                'name' => 'Listings Directory',
                'excerpt' => Kohana::message('pages', 'listings.description'),
                'uri' => '/listings/index',
                'description' => Kohana::message('pages', 'listings.description'),
            ]);
        }

        return parent::after();
    }

}
