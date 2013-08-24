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
            'attrs' => [
                'class' => Request::current()->controller() === 'people' ? 'active' : '',
                'id'    => 'mainNavPeople'
            ]
        ],
        [
            'title' => 'Locations',
            'url'   => Route::url('locations'),
            'attrs' => [
                'class' => Request::current()->controller() === 'locations' ? 'active' : '',
                'id'    => 'mainNavLocations',
            ]
        ],
        [

            'title' => 'Listings',
            'url'   => Route::url('listings'),
            'attrs' => [
                'class' => Request::current()->controller() === 'listings' ? 'active' : '',
                'id'    => 'mainNavListings'
            ]
        ]
    ],
//    'profile'  => [
//        '&nbsp;Feed'         => [
//            'uri'  => URL::site(Route::get(Request::current()->controller())->uri(['action' => 'feed']), 'HTTP'),
//            'icon' => 'feed',
//            'id'   => 'sidenavFeed'
//        ],
//        '&nbsp;Info'         => [
//            'uri'  => URL::site(Route::get(Request::current()->controller())->uri(['action' => 'info'])),
//            'icon' => 'infoCircle',
//            'id'   => 'sidenavInfo'
//        ],
//        '&nbsp;Media'        => [
//            'uri'  => URL::site(Route::get(Request::current()->controller())->uri(['action' => 'media'])),
//            'icon' => 'images',
//            'id'   => 'sidenavMedia'
//        ],
//        '&nbsp;Testimonials' => [
//            'uri'  => URL::site(Route::get(Request::current()->controller())->uri(['action' => 'testimonials'])),
//            'icon' => 'itestimonial',
//            'id'   => 'sidenavTestimonials'
//        ]
//    ],
//    'activity' => [
//        '&nbsp;Listings' => [
//            'uri'  => URL::site(Route::get(Request::current()->controller())->uri(['action' => 'listings'])),
//            'icon' => 'listings',
//            'id'   => 'sidenavListings'
//        ],
//    ]
];
