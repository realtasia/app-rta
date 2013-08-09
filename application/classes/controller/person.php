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
class Controller_Person extends Controller_Auth {

    public $cp = null;

    public function before()
    {
        parent::before();

        $username = $this->request->param('username');
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

        $req  = Api::request('/listing/search/', $this->listings_query());
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
            return parent::json_response($req);
        }
    }

    public function action_subscriptions()
    {
        if ($u = $this->get_cu())
        {
            $q = array();
            $u = json_decode(json_encode($u), true);
            switch (strtolower($this->request->param('id')))
            {
                case 'people' :
                    $q['object_type'] = 'user';
                    $q['api']         = 'user';
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


            $ids = parent::get_interactor_ids(\Arr::path($u, 'connections.subscriptions'), $q);

            //echo "<pre>". Debug::Vars($o_ids);
            //die();
            if (!empty($ids))
            {
                $req = Api::request("/{$q['api']}", [
                      'access_token' => $this->token(),
                      'include_ids'  => $ids,
                ]);
                if ($req::success())
                {
                    if ($this->auto_render)
                    {
                        $data             = $req::get_data();
                        $this->pagination = Pagination::factory($data);
                        $this->template->set('cl', $data);
                        $this->template->set('clt', $ot);
                        $this->content    = View::factory('subscriptions' . ucfirst($ot))->set('cl', $data);

                        $this->content->set('introcontent', View::factory("introcontent/person"));
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
        $id = $this->request->param('id');
        $f  = ['name', 'info', 'email', 'settings.privacy', 'avatar'];
        $u  = Document::factory('user', $id);
        if ($u->load(null, array_fill_keys(array_reverse($f), 1)))
        {

        }
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
        return Arr::merge(['user_id' => $this->cp['_id']], parent::listings_search());
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
