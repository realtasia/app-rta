<?php

defined('SYSPATH') or die('No direct script access.');

/**
 * Description of single
 *
 * @author Jason Nathan
 * @package RealtAsia API
 * @subpackage
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Controller_Single extends Controller_Auth {

    public function before()
    {
        return parent::before();
    }

    public function action_parseurl()
    {
        $this->auto_render = false;
        $text              = $this->request->query('text');
        $regex             = <<<EOD
        /(?i)\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/
EOD;
        if (preg_match($regex, $text, $matches))
        {
            $key     = '3ec47f021d4e11e1ae874040d3dc5c07';
            $r       = Request::factory('http://api.embed.ly/1/oembed')
              ->query(array(
                'key'      => $key,
                'url'      => $matches[0],
                'maxwidth' => 600,
                'autoplay' => true
            ));
            $results = json_decode($r->execute(), true);

            if (!isset($results['url']))
                $results['url'] = $matches[0];

            $results['uid'] = uniqid();
            return $this->response
                ->headers('Content-type', 'application/json')
                ->body(json_encode($results, JSON_PRETTY_PRINT));
        }
    }

    public function action_external()
    {
        return Request::factory()->redirect($this->request->query('uri'));
    }

    public function action_user()
    {
        $par  = ['access_token' => $this->token()];
        $req  = Api::request('/user/index/' . $this->request->query('id'), $par);
        $data = $req->get_data();
        //die($req);
        if ($this->auto_render)
        {
            $this->template->meta = (array) Metatag::factory($data);
            $this->content        = View::factory('loops/single/user', $data);
        }
        $this->response->body(View::factory('loops/single/hoverCard', $data));
    }

    public function action_location()
    {
        $par  = ['access_token' => $this->token()];
        $req  = Api::request('/page/index/' . $this->request->query('id'), $par);
        $data = $req->get_data();
        //die($req);
        if ($this->auto_render)
        {
            $this->template->meta = (array) Metatag::factory($data);
            $this->content        = View::factory('loops/single/location', $data);
        }
        $this->response->body(View::factory('loops/single/hoverCard', $data));
    }

    public function action_post()
    {
        $get = $this->request->query('get');
        if ($get)
            return $this->$get($this->request->query('id'));

        $par = ['access_token' => $this->token()];
        $req = Api::request('/post/index/' . $this->request->query('id'), $par);
        //die($req);
        if ($this->auto_render)
        {
            $data                 = $req->get_data();
            $this->template->meta = (array) Metatag::factory($data);
            return $this->content        = View::factory('loops/single')->set('post', $data);
        }

        return parent::json_response($req);
    }

    public function subscribers($id)
    {
        $ids = parent::get_interactor_ids("/post/subscribers/$id");
        if (!empty($ids))
            return parent::get_people_by_ids($ids);
    }

    public function likers($id, $type = 'post')
    {
        $ids = parent::get_interactor_ids("/$type/likers/$id");
        if (!empty($ids))
            return parent::get_people_by_ids($ids);
    }

    protected function people_query()
    {
        return parent::people_search();
    }

    public function after()
    {
        if ($this->auto_render)
        {
            $this->leftbar  = "";
            $this->rightbar = "";
            //$this->leftbar = null;
            //$this->rightbar = null;
            if ($this->content instanceof View)
            {
                $this->content->set(['ca' => $this->request->action()]);
            }
        }
        return parent::after();
    }

}