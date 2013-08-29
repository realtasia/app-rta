<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Description of menu.php
 *
 * @author Jason Nathan
 * @package RealtAsia APP
 * @subpackage
 * @version 1.0
 * @copyright 2012 Realtasia Pte Ltd
 */
return [
    'main'     => [
        [
            'title' => 'People',
            'url'   => Route::url('people'),
            'icon'   => 'icon-group',
            'attrs' => [
                'class' => Request::current()->controller() === 'people' ? 'active' : '',
                'id'    => 'mainNavPeople'
            ]
        ],
        [
            'title' => 'Locations',
            'url'   => Route::url('locations'),
            'icon'   => 'icon-compass',
            'attrs' => [
                'class' => Request::current()->controller() === 'locations' ? 'active' : '',
                'id'    => 'mainNavLocations',
            ]
        ],
        [

            'title' => 'Listings',
            'url'   => Route::url('listings'),
            'icon'   => 'icon-map-marker',
            'attrs' => [
                'class' => Request::current()->controller() === 'listings' ? 'active' : '',
                'id'    => 'mainNavListings'
            ]
        ]
    ]
];
