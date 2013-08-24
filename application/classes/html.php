<?php defined('SYSPATH') or die('No direct script access.');
/**
 * HTML helper class. Provides generic methods for generating various HTML
 * tags and making output HTML safe.
 *
 * @author Jason Nathan
 * @package RealtAsia APP
 * @category Helpers
 * @version 1.0
 * @copyright 2013 Realtasia Pte Ltd
 */
class HTML extends Kohana_HTML {
    public static function javascript($vars)
    {
        $attributes['type'] = 'text/javascript';
        return '<script'.HTML::attributes($attributes).'>'.$vars.'</script>';
    }
}