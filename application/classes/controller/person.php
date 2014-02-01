<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Okay. these controllers are for UI and are in major need of comments
 *
 * @author Jason Nathan
 * @package RealtAsia APP
 * @category Controllers
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Controller_Person extends Controller_Auth {

    public $cp = null;

    public function before()
    {
        parent::before();

        $username = strtolower($this->request->param('username'));
        //echo Session::instance()->get('session');
        // this is the last possible route, the member username. If not specified,
        // then this might be a bit of a problem
        if (!$username || trim($username) === '')
        {
            Debug::error('Member route failed, no $username specified. Request :uri', array(
                ':uri' => Debug::vars($this->request)
            ));

            throw new HTTP_Exception_404('The requested URL :file does not exist', array(':file' => $this->request->uri()));
        }
        if ($this->cu)
        {
            if (!$this->cu_id)
            {
                $this->cu_id = (string) $this->cu->_id;
            }
            if ($this->cu->username === $username)
            {
                $this->cp = json_decode(json_encode($this->cu), true);
            }
            if ($this->cu_id === $username)
            {
                $uri = str_replace($username, $this->cu->username, $this->request->url());
                $this->request->redirect($uri);
            }
        }

        if (!$this->cp)
        {
            $par      = ['access_token' => $this->token()];
            $response = Api::request('/user/index/' . $username, $par);

            $id = \Arr::get($response::get_data(), '_id');

            if (!$id)
            {
            	die(Debug::vars($response::get_data()));
                throw new HTTP_Exception_404('The requested URL :file does not exist', array(':file' => $this->request->uri()));
            }

            if ((string) $id === $username)
            {
                //die(Debug::vars(str_replace($username, \Arr::get($response['data'],'username'), $this->request->url())));
                $uri = str_replace($username, \Arr::get($response->get_data(), 'username'), $this->request->url());
                $this->request->redirect($uri);
            }

            if (!$response::success())
            {
                //echo "<pre>";
                //print_r(Session::instance()->get('session'));
                throw new HTTP_Exception_500('Sorry, the server experienced an internal error');
            }


            $this->cp = $response::get_data();
        }

        if ($this->request->action() !== 'edit')
        {
            $this->content = View::factory('person');
        }
    }

    public function action_feed()
    {
        $req              = Api::request($this->cp['connections']['feed'], $this->query());
        $data             = $req::get_data();
        $this->pagination = Pagination::factory($data);

        if ($this->auto_render)
        {
            $this->template->set('cl', $data);
            $this->template->set('clt', 'posts');
            return $this->content->set('cl', $data);
        }

        return parent::json_response($req);
    }

    public function action_info()
    {

    }

    public function action_edit()
    {
        if (!parent::logged_in() || (string) $this->cp['_id'] !== $this->cu->_id)
        {
            $this->request->redirect();
        }

        $this->content = View::factory('personEdit');
    }

    public function action_billing()
    {
        if (!parent::logged_in() || (string) $this->cp['_id'] !== $this->cu->_id)
        {
            $this->request->redirect();
        }

        $this->content = View::factory('billing');
    }

    public function action_media()
    {
        if ($this->auto_render === TRUE)
        {
            return $this->content = View::factory('mediaLibrary');
        }

        $url = \Arr::get($this->cp['connections'], 'library');
        $par = ['access_token' => $this->token()];
        $this->response->headers('Content-type', 'application/json');
        if ($url)
        {
            return parent::json_response(Api::request($url, $par));
        }

        return $this->response->body(json_encode(['error' => 1]));
    }

    public function action_wizard()
    {
        if ($this->auto_render === TRUE)
        {
            //die("<pre>".print_r(realpath($_SERVER['DOCUMENT_ROOT'].'/assets/listingWizard.html'), true)."</pre>");
            return $this->content = "";
        }

//        $url = $this->cp['connections']['library'];
//        $par = ['access_token' => $this->token()];
//        $this->response->headers('Content-type', 'application/json');
    }

    public function action_settings()
    {
        return $this->action_edit();
    }

    public function action_testimonials()
    {
        $q           = $this->query();
        $rq          = $this->request->param('id');
        $q['status'] = 'active';

        if (!$this->get_cu() || (string) $this->cp['_id'] !== (string) Arr::get((array) $this->cu, '_id'))
        {
            $rq = 'received';
        }
        else
        {
            $q['user_id'] = $rq === 'received' ? null : \Arr::get($q, 'user_id');
            $q['page_id'] = $rq === 'written' ? null : \Arr::get($q, 'page_id');
            $q['status']  = null;
        }
        $q['request_type'] = $rq;
        $req               = Api::request($this->cp['connections']['testimonials'], $q);
        $data              = $req::get_data();
        $this->pagination  = Pagination::factory($data);
        //echo "<pre>";
        //die($req);
        if ($this->auto_render)
        {
            $this->template->set('cl', $data);
            $this->template->set('clt', 'testimonials');
            return $this->content->set('cl', empty($data) ? null : $data);
        }

        return parent::json_response($req);
    }

    public function action_keyword()
    {
        return parent::_keyword('/page/locationkeyword/', $this->location_query());
    }

    public function action_listings()
    {
        if ($this->request->param('id') === 'keyword')
            return $this->action_keyword();

        $req  = Api::request('/post/listings/', $this->listings_query());

        //die($req);
        $data = $req::get_data();
        if ($req::success())
        {
            if ($this->auto_render)
            {
                $this->pagination = Pagination::factory($data);
                $this->template->set('cl', $data);
                $this->template->set('clt', 'listings');
                $this->content    = View::factory('listings')->set('cl', $data);
                return $this->content->set('introcontent', Kohana::find_file('views', 'introcontent/person'));
            }
            //return parent::json_response($this->listings_query());
            return parent::json_response($req);
        }
    }

    public function action_subscriptions()
    {
        if ($u = $this->get_cu())
        {
            $q = array();
            $u = json_decode(json_encode($u), true);
            $ot = strtolower($this->request->param('id'));
            switch ($ot)
            {
                case 'people' :
                    $q['object_type'] = 'user';
                    $q['api']         = 'user/';
                    break;
                case 'locations' :
                    $q['object_type'] = 'page';
                    $q['api']         = 'page/search';
                    break;
                case 'listings' :
                    $q['object_type'] = 'listing';
                    $q['api']         = 'listing/search';
                    break;
            }
            //die(Debug::Vars($u));


            $ids = parent::get_interactor_ids(\Arr::path($u, 'connections.subscriptions'), $q, true);

            //echo Debug::Vars($ids);
            if (!empty($ids))
            {
                $req = Api::request("/{$q['api']}", [
                      'access_token' => $this->token(),
                      'include_ids'  => $ids,
                ]);
//            echo Debug::Vars($req->get_data());
//            die();
                if ($req::success())
                {
                    if ($this->auto_render)
                    {
                        $data             = $req::get_data();
                        $this->pagination = Pagination::factory($data);
                        $this->template->set('cl', $data);
                        $this->template->set('clt', $ot);
                        $this->content    = View::factory('subscriptions' . ucfirst($ot))->set('cl', $data);

                        $this->content->set('introcontent',Kohana::find_file('views', "introcontent/person"));
                        return;
                    }

                    return parent::json_response($req);
                }
            }
        }
        /**
         * @todo handle this properly!
         */
        return $this->request->redirect($this->cp['uri']);
    }

    public function action_likers()
    {
        $ids = parent::get_interactor_ids(\Arr::path($this->cp, 'connections.likers'));
        if (!empty($ids))
            return parent::get_people_by_ids($ids);
    }

    public function action_subscribers()
    {
        $ids = parent::get_interactor_ids(\Arr::path($this->cp, 'connections.subscribers'));
        if (!empty($ids))
            return parent::get_people_by_ids($ids);
    }

    public function action_qrcode()
    {
        $this->auto_render = false;
        $cp = (array) $this->cp;
        if(!$this->logged_in())
        {
            $msg = 'novcard.unauthorised';
        }
        elseif((string) \Arr::get((array)$this->get_cu(), '_id') === (string) \Arr::get($cp, "_id"))
        {
            $msg = 'novcard.self';
        }
        else
        {
            $msg = 'novcard.other';
        }

        $vcard = \Arr::get($cp, "vcard");

        if(!$vcard)
            return parent::json_response([
                'status' => 'fail',
                'data'  => [
                    'message' => Kohana::message('user', $msg)
                ]
            ]);
        return $this->response->headers('Content-type', 'image/png')
             ->body(QRcode::instance()->png("http://" . RT::APP_SERVER . \Arr::get($this->cp, 'uri') . '/vcard'));

    }

    public function action_vcard()
    {
        $this->auto_render = false;
        $cp = (array) $this->cp;
        $msg = $this->logged_in() && (string) \Arr::get((array)$this->get_cu(), '_id') === (string) \Arr::get($cp, "_id")
          ? 'novcard.self' : 'novcard.other';
        $vcard = \Arr::get($cp, "vcard");

        if(!$vcard)
            return parent::json_response([
                'status' => 'fail',
                'data'  => [
                    'message' => Kohana::message('user', $msg)
                ]
            ]);

        $return = [
            'BEGIN:VCARD','VERSION:2.1'
        ];
        $return[] = "N:" . \Arr::get($cp, 'last_name') .';'. \Arr::get($cp, 'first_name');
        $return[] = "GENDER:" . strtoupper(substr(\Arr::path($cp, 'info.gender'), 0, 1));
        $return[] = "REV:" . date("Ymd", Arr::get($cp, 'modified', 0));

        foreach ($vcard as $field)
        {
            switch ($field)
            {
                case 'mobile':
                    $return[] = 'TEL;CELL:' . Arr::path($cp, 'info.telephone.mobile');
                    break;
                case 'birthday':
                    $return[] = 'BDAY:' . date("Ymd", Arr::path($cp, 'info.birthday', 0));
                    break;
                case 'email':
                    $return[] = 'EMAIL:' . Arr::get($cp, 'email');
                    break;
                case 'company':
                    $return[] = 'ORG:' . Arr::path($cp, 'company.name');
                    break;
                case 'designation':
                    $return[] = 'TITLE:' . Arr::get($cp, 'designation');
                    break;
                case 'uri':
                    $return[] = 'URL:http://' . RT::APP_SERVER . Arr::get($cp, 'uri');
                    break;
                case 'about':
                    $return[] = 'NOTE:' . Arr::get($cp, 'message');
                    break;
            }
        }
        $return[] = "PHOTO;JPEG:" . 'http://' . \Arr::get($cp, 'avatar');
        $return[] = "END:VCARD";

        $return = implode("\n", $return);

        return $this->response->headers([
            'Content-Type' => 'text/x-vcard',
            'Content-Disposition' => 'attachment; filename=' . strtolower(\Arr::get($cp, 'name')) . '.vcf',
            'Content-length' => strlen($return)
        ])->body($return);
    }

    public function action_conversations()
    {
        return $this->content = View::factory('conversations');
    }

    protected function query()
    {
        $query         = $this->request->query();
        $query['sort'] = \Arr::get($query, 'sort', '') === 'Newest' ? 'newest' : 'popular';
        $filter        = \Arr::get($query, 'filter', "All Activity");
        $only_cp       = $filter !== "All Activity";

        $defaults = [
            'skip'         => 0,
            'sort'         => 'popular',
            'user_id'      => (string) $this->cp['_id'],
            'owner_id'     => $only_cp ? (string) $this->cp['_id'] : null,
            'access_token' => $this->token(),
        ];
        return Arr::overwrite($defaults, $query);
    }

    protected function people_query()
    {
        return parent::people_search();
    }

    protected function locations_query()
    {
        return $this->locations_search();
    }

    protected function listings_query()
    {
        return array_merge(parent::listings_search(), ['user_id' => (string) $this->cp['_id']]);
    }

    protected function leftbar_links()
    {
        $items   = ['feed', 'info', 'media', 'testimonials', 'listings', 'subscriptions'];
        $route   = Route::name($this->request->route());
        $methods = get_class_methods($this);
        $uri     = $uri     = $this->request->param('username');
        $links   = [];

        foreach ($methods as $method)
        {
            if (strpos($method, 'action_') === 0)
            {
                $meth = substr($method, strlen('action_'));
                if (in_array($meth, $items))
                {
                    $links[ucfirst($meth)] = URL::site("$uri/$meth", 'http');
                    if ($meth === 'media')
                    {
                        $links[ucfirst($meth)] = URL::site("$uri#$meth", 'http');
                    }
                }
            }
        }
        return $links;
    }

    /* ***************************************
     * ADMINS STUFF
     * ***************************************/

    public function action_leads()
    {
        $this->template->set('clt', 'people');
        return true;
    }

    public function action_feedback()
    {

    }

    public function action_adminlocations()
    {
        $sectors       = array_combine(range(1, 82), range(1, 82));
        $this->content = View::factory('table')->set('sectors', $sectors);
    }

    public function after()
    {
        if ($this->auto_render)
        {
            $this->template->meta = (array) Metatag::factory($this->cp);
            switch (true)
            {
                case strpos($this->request->action(), 'admin') === 0:
                case strpos($this->request->action(), 'media') === 0:
                case strpos($this->request->action(), 'conversations') === 0:
                    $this->leftbar  = null;
                    $this->rightbar = null;
                    break;
                default:
                    if (strpos($this->request->action(), 'subscriptions') === 0)
                    {
                        $this->leftbar  = View::factory('leftbar')
                          ->set('cp', $this->cp)
                          ->set('links', $this->leftbar_links());
                        $this->rightbar = null;
                    }
                    else
                    {
                        $this->leftbar  = View::factory('leftbar')
                          ->set('cp', $this->cp)
                          ->set('links', $this->leftbar_links());
                        $this->rightbar = View::factory('rightbarMember')
                          ->set('cp', $this->cp)
                          ->set('links', $this->rightbar_links());
                    }
                    break;
            }

            $this->template->set('cp', $this->cp);
            if ($this->content instanceof View)
            {
                $this->content->set(Arr::merge((array) $this->cp, ['ca' => $this->request->action()]));
            }
            return parent::after();
        }
    }

}



/*
{ "skip": 0,
 * "filter": "All",
 * "sort": "active",
 * "state": null,
 * "access_token": "[REDACTED]",
 * "listing": { "type": "Sale" },
 * "user_id": "513db6386c0199680c00005b"
 *
 *
{"skip":0,
 * "filter":"All",
 * "sort":"active",
 * "state":"7c3674e5ceb644519814cab2fb87774d92cc8660",
 * "access_token":"[REDACTED]",
 * "type":"Sale",
 * "s":"",
 * "url":"\/listings",
 * "user_id":"513db6386c0199680c00005b",
 * "page":"1",
 * "listing":{"type":"Sale"}
}
 */