<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Description of error
 *
 * @author Jason Nathan
 * @package RealtAsia APP
 * @category Controllers
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
class Controller_Error extends Controller_Template {

    public $template = 'error/template';

    public function before()
    {
        parent::before();

        $this->template->page = URL::site(rawurldecode(Request::initial()->url()));

        // Internal request only!
        if (!Request::current()->is_initial())
        {
            if ($message = rawurldecode($this->request->param('message')))
            {
                $this->template->message = $message;
            }
        }
        else
        {
            $this->request->action(404);
        }

        $this->response->status((int) $this->request->action());
    }

    public function action_404()
    {
        $this->template->title = '404 - Page Not Found';

        // Here we check to see if a 404 came from our website. This allows the
        // webmaster to find broken links and update them in a shorter amount of time.
        if (isset($_SERVER['HTTP_REFERER']) AND strstr($_SERVER['HTTP_REFERER'], $_SERVER['SERVER_NAME']) !== FALSE)
        {
            // Set a local flag so we can display different messages in our template.
            $this->template->local = TRUE;
        }
		
		$this->template->message = "We just went through about a zillion pages and couldn't find this one :( Sorry...";

        // HTTP Status code.
        $this->response->status(404);
    }

    public function action_503()
    {
        $this->template->title = '503 - Maintenance Mode';
		$this->template->message = "Sorry, we are down for maintanence. We'll be back up in a moment<br> Please email us at <a href='mailto:support@realtasia.com'>support@realtasia.com</a> if you think this is an error";		
		$this->response->status(503);
    }

    public function action_500()
    {
        $this->template->title = '500 - Internal Server Error';
		$this->template->message = "Sorry, a bug probably crawled up our servers and fried up a circuit or two :(<br> Not to worry, we got a super pest-buster team on the job!";				
		$this->response->status(500);
    }
	
	public function action_403()
	{
		$this->template->title = '403 - Forbidden';
		$this->template->message = "Did you get here by accident?<br> If you think something bizzare is happening, email us at <a href='malto:support@realtasia.com'>support@realtasia.com</a> and we'll look into it right away!";						
		$this->response->status(403);
	}

}
