<?php

defined('SYSPATH') or die('No direct script access.');

/**
 * Description of client
 *
 * @author Jason Nathan
 * @package RealtAsia API
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

        $response = $this->req('/page/index/' . $slug, $par);

        $response = json_decode($response, true);

        if (empty($response['data']) || !isset($response['data']['_id']))
        {
            $this->request->redirect();
        }

        if ((string) $response['data']['_id'] === $slug)
        {
            $this->request->redirect($response['data']['uri'], 301);
        }

        if ($response['status'] === 'error')
        {
            //echo "<pre>";
            print_r(Session::instance()->get('session'));
            die(print_r($response, true));
        }

        $this->cp    = $response['data'];
        $this->title = $this->cp['name'];

        if ($this->request->action() !== 'edit')
        {
            $this->content = View::factory('location');
        }
    }

    public function action_feed()
    {
        $req              = $this->req($this->cp['connections']['feed'], $this->query());
        $data             = json_decode($req, true);
        $this->pagination = Pagination::factory($data['data']);
        //echo $skip;
        //die($req);
        if ($this->auto_render)
        {
            $this->template->set('cl', $data['data']);
            $this->template->set('clt', 'posts');
            return $this->content->set('cl', empty($data['data']) ? [] : $data['data']);
        }

        $this->response->headers('Content-type', 'application/javascript');
        $this->response->body($req);
    }

    public function action_locations()
    {
        if ($this->request->param('id') === 'keyword')
            return $this->action_keyword();

        if ($this->cp['subtype'] === 'Estate')
        {
            $req = $this->req('/page/search/', $this->location_query());
            //echo "<pre>";
            //die($req);
            if ($this->auto_render)
            {
                $data             = json_decode($req, true);
                $this->pagination = Pagination::factory($data['data']);
                $this->template->set('cl', $data['data']);
                $this->template->set('clt', 'locations');
                $this->content    = View::factory('locations')->set('cl', $data['data']);
                return $this->content->set('introcontent', Kohana::find_file('views', 'introcontent/location'));
            }
            $this->response->headers('Content-type', 'application/javascript');
            $this->response->body($req);
        }
    }

    public function action_likers()
    {
        $q      = [
            'skip'         => ((int) Arr::get($this->request->query(), 'page', 1) - 1) * 10,
            'access_token' => $this->token()
        ];
        $u      = $this->cp;
        $ids    = [];
        $return = [];

        $o_ids = json_decode($this->req($u['connections']['likers'], $q), true);
        if ($o_ids['status'] === 'success')
        {
            $data = Arr::get($o_ids, 'data');
            if (!empty($data))
            {
                foreach ($data as $v)
                {
                    $ids[] = $v['_id'];
                }

                if (!empty($ids))
                {
                    $q                = $this->people_query();
                    $q['include_ids'] = $ids;
                    $req              = $this->req("/user", $q);
                    $return           = json_decode($req, true);
                    if ($return['status'] === 'success')
                    {
                        unset($data);
                        if ($this->auto_render)
                        {
                            $data             = Arr::get($return, 'data');
                            $this->pagination = Pagination::factory($data);
                            $this->template->set('cl', $data);
                            $this->template->set('clt', 'people');
                            $this->content    = View::factory('people')->set('cl', $data);
                            return $this->content->set('introcontent', Kohana::find_file('views', "introcontent/location"));
                        }
                        $this->response->headers('Content-type', 'application/javascript');
                        $this->response->body($req);
                    }
                }
            }
        }
    }

    public function action_subscribers()
    {
        $q      = [
            'skip'         => ((int) Arr::get($this->request->query(), 'page', 1) - 1) * 10,
            'access_token' => $this->token()
        ];
        $u      = $this->cp;
        $ids    = [];
        $return = [];
        //die($this->req($u['connections']['subscribers'], $q));
        $o_ids = json_decode($this->req($u['connections']['subscribers'], $q), true);
        if ($o_ids['status'] === 'success')
        {
            $data = Arr::get($o_ids, 'data');
            if (!empty($data))
            {
                foreach ($data as $v)
                {
                    $ids[] = $v['_id'];
                }

                if (!empty($ids))
                {
                    $q                = $this->people_query();
                    $q['include_ids'] = $ids;
                    $req              = $this->req("/user", $q);
                    $return           = json_decode($req, true);
                    if ($return['status'] === 'success')
                    {
                        unset($data);
                        if ($this->auto_render)
                        {
                            $data             = Arr::get($return, 'data');
                            $this->pagination = Pagination::factory($data);
                            $this->template->set('cl', $data);
                            $this->template->set('clt', 'people');
                            $this->content    = View::factory('people')->set('cl', $data);
                            return $this->content->set('introcontent', Kohana::find_file('views', "introcontent/location"));
                        }
                        $this->response->headers('Content-type', 'application/javascript');
                        $this->response->body($req);
                    }
                }
            }
        }
    }

    public function action_listings()
    {
        if($this->request->param('id') === 'keyword')
            return $this->action_keyword();

            $req  = $this->req('/listing/search/', $this->listings_query());
            //die($req);
            $data = json_decode($req, true);
            if ($data['status'] === 'success')
            {
                if ($this->auto_render)
                {
                    $this->pagination = Pagination::factory($data['data']);
                    $this->template->set('cl', $data['data']);
                    $this->template->set('clt', 'listings');
                    $this->content    = View::factory('listings')->set('cl', $data['data']);
                    return $this->content->set('introcontent', Kohana::find_file('views', 'introcontent/location'));
                }
                $this->response->headers('Content-type', 'application/javascript');
                $this->response->body($req);
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
                    'object_id' => (string) $this->cp['_id']
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
