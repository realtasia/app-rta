<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Description of client
 *
 * @author Jason Nathan
 * @package RealtAsia APP
 * @subpackage
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Controller_Location extends Controller_Auth {

    public function before()
    {
        parent::before();
        $slug          = trim($this->request->param('slug'));
        $this->subtype = trim($this->request->param('subtype'));
        if (!$slug || empty($slug))
        {
            $this->request->redirect($this->request->referrer());
        }

        $par = ['access_token' => $this->token()];

        $response = Api::request('/page/index/' . $slug, $par);

        $data = $response->get_data();

        if (empty($data) || !\Arr::get($data, '_id'))
        {
            $this->request->redirect();
        }

        if ((string) \Arr::get($data, '_id') === $slug)
        {
            $this->request->redirect(!\Arr::get($data, 'uri'), 301);
        }

        /**
         * @todo need to catch and handle this error properly
         */
        if ($response::error())
        {
            //echo "<pre>";
            print_r(Session::instance()->get('session'));
            die(print_r($response, true));
        }
        //echo "<pre>";
        //die(print_r($data));
        $this->cp    = $data;
        $this->title = \Arr::get($data, 'name');

        if ($this->request->action() !== 'edit')
        {
            $this->content = View::factory('location');
        }
    }

    public function action_feed()
    {
        $req              = Api::request($this->cp['connections']['feed'], $this->query());
        $data             = $req->get_data();
        $this->pagination = Pagination::factory($data);
        //echo $skip;
        //die($req);
        if ($this->auto_render)
        {
            $this->template->set('cl', $data);
            $this->template->set('clt', 'posts');
            return $this->content->set('cl', empty($data) ? [] : $data);
        }

        return parent::json_response($req);
    }

    public function action_locations()
    {
        if ($this->request->param('id') === 'keyword')
            return $this->action_keyword();

        if ($this->cp['subtype'] === 'Estate')
        {
            $req = Api::request('/page/search/', $this->location_query());
            //echo "<pre>";
            //die($req);
            if ($this->auto_render)
            {
                $data             = $req->get_data();
                $this->pagination = Pagination::factory($data);
                $this->template->set('cl', $data);
                $this->template->set('clt', 'locations');
                $this->content    = View::factory('locations')->set('cl', $data);
                return $this->content->set('introcontent', Kohana::find_file('views', 'introcontent/location'));
            }
            return parent::json_response($req);
        }
    }

    public function action_likers()
    {
        $ids = parent::get_interactor_ids(\Arr::path($this->cp, 'connections.likers'));
        return parent::get_people_by_ids($ids);
    }

    public function action_subscribers()
    {
        $ids = parent::get_interactor_ids(\Arr::path($this->cp, 'connections.subscribers'));
        if (!empty($ids))
            return parent::get_people_by_ids($ids);
    }

    public function action_listings()
    {
        if ($this->request->param('id') === 'keyword')
            return $this->action_keyword();

        $req  = Api::request('/listing/search/', $this->listings_query());
        //die($req);
        $data = $req->get_data();
        if ($req::success())
        {
            if ($this->auto_render)
            {
                $this->pagination = Pagination::factory($data);
                $this->template->set('cl', $data);
                $this->template->set('clt', 'listings');
                $this->content    = View::factory('listings')->set('cl', $data);
                return $this->content->set('introcontent', Kohana::find_file('views', 'introcontent/location'));
            }

            return parent::json_response($req);
        }
    }

    public function action_keyword()
    {
        return parent::_keyword('/page/locationkeyword/', $this->location_query());
    }

    protected function people_query()
    {
        return parent::people_search();
    }

    protected function location_query()
    {
        return Arr::merge($this->locations_search(), [
              'object_id' => (string) $this->cp['_id'],
              'object_name' => (string) urlencode($this->cp['name'])
        ]);
    }

    protected function listings_query()
    {
        $query = ['page_id' => $this->cp['_id']];
        if ($this->cp['subtype'] === 'Estate')
        {
            $query = ['page_parent' => $this->cp['_id']];
        }

        return Arr::merge($query, parent::listings_search());
    }

    protected function query()
    {
        $query  = $this->request->query();
        $onlyCU = (\Arr::get($query, 'filter') === "Only Your Posts") && !is_null($this->cu);

        $page = ['page_id' => (string) $this->cp['_id']];
        if ($this->cp['subtype'] === 'Estate')
        {
            $page = ['parent_id' => (string) $this->cp['_id']];
        }

        $defaults = \Arr::merge($page, [
              'status'       => 'active',
              'skip'         => ((int) Arr::get($query, 'page', 1) - 1) * 10,
              'sort'         => 'active',
              'access_token' => $this->token(),
              'user_id'      => $onlyCU ? (string) $this->cu->_id : null,
        ]);

        return Arr::overwrite($defaults, $query);
    }

    protected function leftbar_links()
    {
        $items = ['feed', 'info', 'media', 'reviews', 'listings'];

        if (strtolower($this->cp['subtype']) === 'estate')
        {
            $items[] = 'locations';
        }

        $route   = Route::name($this->request->route());
        $methods = get_class_methods($this);
        $uri     = [
            'controller' => $route,
            'subtype'    => URL::title($this->cp['subtype']),
            'slug'       => $this->cp['slug']
        ];

        $links = [];

        foreach ($methods as $method)
        {
            if (strpos($method, 'action_') === 0)
            {
                $meth = substr($method, strlen('action_'));
                if (in_array($meth, $items))
                {
                    $uri['action']         = $meth;
                    $links[ucwords($meth)] = URL::site(Route::get($route)->uri($uri));
                }
            }
        }
        return $links;
    }

    public function after()
    {
        if ($this->auto_render)
        {
            $this->template->meta = (array) Metatag::factory($this->cp);
            $this->leftbar        = View::factory('leftbarLocation')
              ->set('cp', $this->cp)
              ->set('links', $this->leftbar_links());
            $this->rightbar       = View::factory('rightbarCompany')
              ->set('cp', $this->cp)
              ->set('links', $this->rightbar_links());
            //$this->leftbar = null;
            //$this->rightbar = null;
            $this->template->set('cp', $this->cp);
            if ($this->content instanceof View)
            {
                $this->content->set(Arr::merge((array) $this->cp, ['ca' => $this->request->action()]));
            }
        }
        return parent::after();
    }

}
