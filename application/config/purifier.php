<?php defined('SYSPATH') or die('No direct script access.');
    /**
    * @author jason
    */

return array(
  'preload'  => false,
  'settings' => array
  (
    'Attr'   => array
    (
      'AllowedRel'    => array('nofollow'),
      'DefaultImageAlt'  => NULL,
    ),
    'Cache'   => array
    (
      'SerializerPath'  => Kohana::$cache_dir,
    ),
    'Core'   => array
    (
      'ColorKeywords'   => array
      (
        'maroon'  => '#800000',
        'red'    => '#FF0000',
        'orange'  => '#FFA500',
        'yellow'  => '#FFFF00',
        'olive'   => '#808000',
        'purple'  => '#800080',
        'fuchsia'  => '#FF00FF',
        'white'   => '#FFFFFF',
        'lime'   => '#00FF00',
        'green'   => '#008000',
        'navy'   => '#000080',
        'blue'   => '#0000FF',
        'aqua'   => '#00FFFF',
        'teal'   => '#008080',
        'black'   => '#000000',
        'silver'  => '#C0C0C0',
        'gray'   => '#808080',
      ),
      'Encoding'     => Kohana::$charset,
      'EscapeInvalidTags' => FALSE,
    ),
    'HTML'   => array
    (
      'AllowedElements'  => array
      (
        'a',
        'b',
        'em',
        'small',
        'strong',
        'del',
        'q',
      ),
      'AllowedAttributes' => array
      (
        'href',
        'rel',
        'target',
      ),
      /**
       * Document doctype
       * Options :
       * "HTML 4.01 Transitional"
       * "HTML 4.01 Strict"
       * "XHTML 1.0 Transitional"
       * "XHTML 1.0 Strict"
       * "XHTML 1.1"
       */
      'Doctype'      => NULL,
    ),
    'URI'    => array
    (
      'AllowedSchemes'  => array
      (
        'http'   => true,
        'https'   => true,
        'mailto'  => true,
        'ftp'    => true,
        'nntp'   => true,
        'news'   => true,
      ),
      'Base'       => NULL,
    ),
  ),
);