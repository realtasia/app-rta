<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Menu Builder
 *
 * This class can be used to easily build out a menu in the form
 * of an unordered list. You can add any attributes you'd like to
 * the main list, and each list item has special classes to help
 * you style it.
 *
 * @author   Corey Worrell
 * @author   Jason Nathan
 * @package  RealtAsia APP
 * @category Helpers
 * @homepage http://coreyworrell.com
 * @version  1.1
 */
class Menu {

    // Associative array of list items
    public $items = array();
    // Associative array of attributes for list
    public $attrs = array();
    // Current URI
    protected $current;

    /**
     * Creates and returns a new menu object
     *
     * @chainable
     * @param   array   Array of list items (instead of using add() method)
     * @return  Menu
     */
    public static function factory(array $items = NULL)
    {
        return new Menu($items);
    }

    /**
     * Constructor, globally sets $items array
     *
     * @param   array   Array of list items (instead of using add() method)
     * @return  void
     */
    public function __construct(array $items = NULL)
    {
        $this->items   = $items;
        $this->current = URL::site(Request::initial()->uri(), '/');
    }

    /**
     * Add's a new list item to the menu
     *
     * @chainable
     * @param   string   Title of link
     * @param   string   URL (address) of link
     * @param   Menu     Instance of class that contain children
     * @return  Menu
     */
    public function add( array $params, Menu $children = NULL)
    {
        $this->items[] = [
            'title'    => \Arr::get($params, 'title'),
            'url'      => \Arr::get($params, 'url'),
            'icon'      => \Arr::get($params, 'icon'),
            'attrs'    => \Arr::get($params, 'attrs'),
            'children' => ($children instanceof Menu) ? $children->items : NULL
        ];

        return $this;
    }

    /**
     * Renders the HTML output for the menu
     *
     * @param   array   Associative array of html attributes
     * @param   array   The parent item's array, only used internally
     * @return  string  HTML unordered list
     */
    public function render(array $items = NULL)
    {
        static $i;
        $menu = $icon = '';

        $items = empty($items) ? $this->items : $items;

        $i++;

        foreach ($items as $item)
        {
            $children = \Arr::get($item, 'children');
            $icon = \Arr::get($item, 'icon');

            $classes = array();

            if ($children)
            {
                $classes[] = 'parent';
            }
            if ($active  = $this->active($item))
            {
                $classes[] = $active;
            }
            if (!empty($classes))
            {
                $classes = ['class' => implode(' ', $classes)];
            }

            $attrs = HTML::attributes(Arr::merge((array) $item['attrs'], (array) $classes));

            if($icon)
            {
                $icon = '<span><i class="' . $icon . ' hidden-desktop"></i><span>&nbsp;';
            }

            $menu .= '<li' . $attrs . '>' . HTML::anchor($item['url'], $icon . $item['title']);

            if ($children)
            {
                $menu .= $this->render(NULL, $children);
            }
            $menu .= '</li>';
        }

        return $menu;
    }

    /**
     * Determines if the menu item is part of the current URI
     *
     * @param   array   The item to check against
     * @return  mixed   Returns active class or null
     */
    private function active(array $item)
    {
        $link = trim(URL::site($item['url']), '/');

        $item_classes = Arr::get($item['attrs'], 'class');
        $classes = explode(' ', $item_classes);

        // Exact match (removes default 'index' action)
        if ($this->current === $link OR preg_replace('~/?index/?$~', '', $this->current) === $link)
        {
            $classes[] = 'active';
        }

        return implode(' ', $classes);
        // Checks if it is part of the active path
//        else
//        {
//            $current_pieces = explode('/', $this->current);
//            array_shift($current_pieces);
//            $link_pieces    = explode('/', $link);
//            array_shift($link_pieces);
//            $l = count($link_pieces);
//
//            for ($i = 0; $i < $l; $i++)
//            {
//                if ((isset($current_pieces[$i]) AND $current_pieces[$i] !== $link_pieces[$i]) OR empty($current_pieces[$i]))
//                {
//                    return;
//                }
//            }
//
//            return 'active';
//        }
    }

    /**
     * Renders the HTML output for menu without any attributes or active item
     *
     * @return   string
     */
    public function __toString()
    {
        return $this->render();
    }

    /**
     * Nicely outputs contents of $this->items for debugging info
     *
     * @return   string
     */
    public function debug()
    {
        return Debug::vars($this->items);
    }

}