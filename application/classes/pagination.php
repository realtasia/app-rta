<?php defined('SYSPATH') or die('No direct script access.');

/**
 * A simple pagination helper
 *
 * @author Jason Nathan
 * @package RealtAsia APP
 * @category Helpers
 * @version 1.0
 * @copyright 2013 Realtasia Pte Ltd
 */
class Pagination
{

    public static function factory($items = 0)
    {
        return new Pagination($items);
    }

    public function __construct($items = 0)
    {
        $this->items = is_numeric($items) ? $items : count($items);
        $this->items_per_page = 10;
        $this->current_page = Arr::get($_GET, 'page', 1);
        $this->previous_page = ($this->current_page > 1) ? $this->current_page - 1 : FALSE;
        $this->next_page = ($this->items > 10) ? $this->current_page + 1 : FALSE;
        $this->offset = (int) (($this->current_page - 1) * $this->items_per_page);
    }

    public function url($page = 1, $uri = false)
    {
        // Clean the page number
        $page = max(1, (int) $page);

        // No page number in URLs to first page
        if ($page === 1)
        {
            $page = NULL;
        }

        if ($uri)
        {
            return URL::site($uri) . URL::query(array('page' => $page));
        }

        //return URL::site(Request::current()->uri(array('page' => $page))).URL::query();
        return URL::site(Request::current()->detect_uri()) . URL::query(array('page' => $page));
    }

    public function setup($items)
    {
        $this->__construct($items);
        return $this;
    }

    public function previous()
    {
        $previous = '<small>&nbsp;</small>';
        if($this->previous_page)
        {
            $previous = HTML::anchor($this->url($this->previous_page), "&laquo; Page {$this->previous_page}");
        }

        return $previous;
    }

    public function next()
    {
        $next = '<small>&nbsp;</small>';
        if($this->next_page)
        {
            $next = HTML::anchor($this->url($this->next_page), "Page {$this->next_page} &raquo;");
        }

        return $next;
    }

    /**
     * Renders the pagination links.
     *
     * @param  mixed  string of the view to use, or a Kohana_View object
     * @return string pagination output (HTML)
     */
    public function render($file)
    {
        $view = View::factory($file);

        // Pass on the whole Pagination object
        return $view->set(get_object_vars($this))->set('page', $this)->render();
    }

    public function ajax()
    {
        return $this->render('menu/pagination_ajax');
    }

    /**
     * Renders the pagination links.
     *
     * @return string pagination output (HTML)
     */
    public function __toString()
    {
        return "<ul class='pager'><li>{$this->previous()}</li><li>{$this->next()}</li></ul>";
    }

    public function as_object()
    {
        $return = array();
        if ($this->previous_page)
        {
            $return['previous'] = HTML::chars($this->url($this->previous_page));
            $return['prev_num'] = (int) $this->previous_page;
        }
        if ($this->next_page)
        {
            $return['next'] = HTML::chars($this->url($this->next_page));
            $return['next_num'] = (int) $this->next_page;
        }

        return (object) $return;
    }

}

?>
