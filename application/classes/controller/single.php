<?php defined('SYSPATH') or die('No direct script access.');
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
        $text = $this->request->query('text');
        $regex = <<<EOD
        /(?i)\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/
EOD;
        if(preg_match($regex, $text, $matches))
        {
            $key = '3ec47f021d4e11e1ae874040d3dc5c07';
            $r = Request::factory('http://api.embed.ly/1/oembed')
                        ->query(array(
                           'key' => $key,
                           'url' => $matches[0],
                           'maxwidth' => 600,
                           'autoplay' => true
                        ));
            $results = json_decode($r->execute(), true);

            if(!isset($results['url']))
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
        $id = $this->request->query('id');
        $par = ['access_token' => $this->token()];
        $req = $this->req('/user/index/' . $id, $par);
        $response = json_decode($req, true);
        //die($req);
        if($this->auto_render)
        {
            $this->template->meta = (array) Metatag::factory($response['data']);
            $this->content = View::factory('loops/single/user', $response['data']);
        }
        $this->response->body(View::factory('loops/single/hoverCard', $response['data']));
    }

    public function action_location()
    {
        $id = $this->request->query('id');
        $par = ['access_token' => $this->token()];
        $req = $this->req('/page/index/' . $id, $par);
        $response = json_decode($req, true);
        //die($req);
        if($this->auto_render)
        {
            $this->template->meta = (array) Metatag::factory($response['data']);
            $this->content = View::factory('loops/single/location', $response['data']);
        }
        $this->response->body(View::factory('loops/single/hoverCard', $response['data']));
    }

    public function action_post()
    {
        $id  = $this->request->query('id');
        $get = $this->request->query('get');
        if($get)
            return $this->$get($id);

        $par = ['access_token' => $this->token()];
        $req = $this->req('/post/index/' . $id, $par);
        //die($req);
        if($this->auto_render)
        {
            $data = \Arr::get(json_decode($req, true), 'data');
            $type = \Arr::get($data, 'type');

            $this->template->meta = (array) Metatag::factory($data);


            return $this->content = View::factory('loops/single')->set('post', $data);
        }
        $this->response->headers('Content-type', 'application/javascript');
        $this->response->body($req);
    }

    public function subscribers($id)
    {
        $this->auto_render = false;
        $ids    = [];
        $return = [];
        $q      = [
            'skip'         => ((int) Arr::get($this->request->query(), 'page', 1) - 1) * 10,
            'access_token' => $this->token()
        ];

        $o_ids = json_decode($this->req("/post/subscribers/$id", $q), true);
        if($o_ids['status'] === 'success')
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
                    $q['include_ids'] = $ids;
                    $req              = $this->req("/user", $q);
                    $return           = json_decode($req, true);
                    if ($return['status'] === 'success')
                    {
                        unset($data);
                        $this->response->headers('Content-type', 'application/javascript');
                        $this->response->body($req);
                    }
                }
            }
        }
    }

    public function likers($id, $type = 'post')
    {
        $this->auto_render = false;
        $ids    = [];
        $return = [];
        $q      = [
            'skip'         => ((int) Arr::get($this->request->query(), 'page', 1) - 1) * 10,
            'access_token' => $this->token()
        ];

        $o_ids = json_decode($this->req("/$type/subscribers/$id", $q), true);
        if($o_ids['status'] === 'success')
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
                    $q['include_ids'] = $ids;
                    $req              = $this->req("/user", $q);
                    $return           = json_decode($req, true);
                    if ($return['status'] === 'success')
                    {
                        unset($data);
                        $this->response->headers('Content-type', 'application/javascript');
                        $this->response->body($req);
                    }
                }
            }
        }
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
