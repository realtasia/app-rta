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
class Controller_Company extends Controller_Auth {

    public $cp, $subtype;

    public function before()
    {
        parent::before();
        $slug = trim($this->request->param('slug'));
        $this->subtype = trim($this->request->param('subtype'));
        if(!$slug || empty($slug))
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

        if((string)\Arr::get($data, '_id') === $slug)
        {
            $this->request->redirect(\Arr::get($data, 'uri'), 301);
        }

        /**
         * @todo need to catch and handle this error properly
         */
        if($response::error())
        {
            print_r(Session::instance()->get('session'));
            die(print_r($response, true));
        }

        $this->cp = $data;
        $this->title = \Arr::get($data, 'name');

        if($this->request->action() !== 'edit')
        {
            $this->content = View::factory('company');
        }
    }

    public function action_feed()
    {
        $req  = Api::request($this->cp['connections']['feed'], $this->query());
        $data = $req->get_data();
        $this->pagination = Pagination::factory($data);
        //echo $skip;
        //die($req);
        if ($this->auto_render)
        {
            $this->template->set('cl', $data);
            $this->template->set('clt', 'posts');
            return $this->content->set('cl', $data ? [] : $data);
        }

        return parent::json_response($req);
    }

    public function action_info()
    {
    }
    public function action_media(){}
    public function action_testimonials(){}
    public function action_listings()
    {
        if($this->request->param('id') === 'keyword')
            return $this->action_keyword();

            $req  = Api::request('/listing/search/', $this->listings_query());
            //die($req);
            $data = $req->get_data();
            if ($data::success())
            {
                if ($this->auto_render)
                {
                    $this->pagination = Pagination::factory($data);
                    $this->template->set('cl', $data);
                    $this->template->set('clt', 'listings');
                    $this->content    = View::factory('listings')->set('cl', $data);
                    return $this->content->set('introcontent', Kohana::find_file('views', 'introcontent/company'));
                }
                return parent::json_response($req);
            }
    }

    protected function listings_query()
    {
        return Arr::merge(['company_id' => $this->cp['_id']], parent::listings_search());
    }

    /****************************************
     * ADMINS STUFF
     ****************************************/

    public function action_leads()
    {
        $this->content = View::factory('beta_users');
    }

    public function action_likers()
    {
        return true;
    }

    public function action_subscribers()
    {
        return true;
    }

    public function action_members()
    {
        $req  = Api::request('/user/', $this->people_query(['company_id' => $this->cp['_id']]));
        $data = $req->get_data();
        //echo "<pre>";
        //print_r($this->people_query(['company_id' => $this->cp['_id']]));
        //die($req);
        if ($this->auto_render)
        {
            $this->pagination = Pagination::factory($data);
            $this->template->set('cl', $data);
            $this->template->set('clt', 'people');
            $this->content    = View::factory('people')->set('cl', $data);
            return $this->content->set('introcontent', View::factory("introcontent/company"));
        }

        return parent::json_response($req);
    }

    protected function query()
    {
        $query = $this->request->query();
        $onlyCU = (\Arr::get($query, 'filter') === "Only Your Posts") && !is_null($this->cu);

        $defaults = [
            'status'       => 'active',
            'skip'         => ((int) Arr::get($query, 'page', 1) - 1) * 10,
            'sort'         => 'active',
            'access_token' => $this->token(),
            'user_id'      => $onlyCU ? (string) $this->cu->_id : null,
            'page_id'      => null,
            'company_id'   => (string) $this->cp['_id']
        ];

        return Arr::overwrite($defaults, $query);
    }

    protected function people_query(array $params = [])
    {
        $query = $this->request->query();
        $filter = \Arr::get($query, 'filter');
        $roles = [];
        switch($filter)
        {
            case 'Users': $roles = ['user'];break;
            case 'Staff': $roles = ['admin'];break;
            case 'Agents': $roles = ['agent'];break;
        }

        $defaults = [
            'skip'         => ((int) Arr::get($query, 'page', 1) - 1) * 10,
            'roles'        => $roles,
            'sort'         => 'alpha',
            'access_token' => $this->token(),
            's'            => null,
            'include_ids'  => [],
            'status'       => ['$ne' => 'terminated'],
            'company_id'   => (string) $this->cp['_id']
        ];

        return Arr::overwrite($defaults, $query, $params);
    }

    protected function leftbar_links()
    {
        $items = ['feed', 'info', 'media', 'reviews', 'listings', 'members'];

        $route   = Route::name($this->request->route());
        $methods = get_class_methods($this);
        $uri     = [
            'controller' => $route,
            'subtype'    => $this->cp['subtype'],
            'slug'       => $this->cp['slug']
        ];

        $links   = [];

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
            $this->leftbar = View::factory('leftbarCompany')
                    ->set('cp', $this->cp)
                    ->set('links', $this->leftbar_links());
            $this->rightbar = View::factory('rightbarCompany')
                    ->set('cp', $this->cp)
                    ->set('links', $this->rightbar_links());
            //$this->leftbar = null;
            //$this->rightbar = null;
            $this->template->set('cp', $this->cp);
            if($this->content instanceof View)
            {
                $this->content->set(Arr::merge((array)$this->cp, ['ca' => $this->request->action()]));
            }

        }
        return parent::after();
    }

}