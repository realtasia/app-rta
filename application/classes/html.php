<?php defined('SYSPATH') or die('No direct script access.');
/**
 * HTML helper class. Provides generic methods for generating various HTML
 * tags and making output HTML safe.
 *
 * @package    Kohana
 * @category   Helpers
 * @author     Kohana Team
 * @copyright  (c) 2007-2011 Kohana Team
 * @license    http://kohanaframework.org/license
 */
class HTML extends Kohana_HTML {
    public static function javascript($vars)
    {
        $attributes['type'] = 'text/javascript';
        return '<script'.HTML::attributes($attributes).'>'.$vars.'</script>';
    }
}