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
        $req  = Api::request('/post/listings/', parent::listings_search());
        $data = $req->get_data();
        //echo "<pre>";
        //print_r(parent::listings_search());
        //die($req);
        if ($this->auto_render)
        {
            $this->pagination = Pagination::factory($data);
            $this->template->set('cl', $data);
            $this->template->set('clt', 'listings');
            return $this->content = View::factory('listings')->set('cl', $data);
        }

        return parent::json_response($req);
    }

    public function action_keyword()
    {
        $this->auto_render = false;
        return parent::json_response(Api::request('/page/listingkeyword/', $this->query()));
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
