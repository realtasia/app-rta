<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Filter Form Helper (Search Forms).
 *
 * @author Jason Nathan
 * @package realtasia-beta-0.8
 * @subpackage Helper
 * @copyright 2011 Realtasia Pte Ltd
 */
class Filter
{
    public static $location_subtypes = array(
        'estate' => 'Estate', 'hdb' => 'HDB', 'private-apartment' => 'Private Apartment',
        'serviced-apartments' => 'Serviced Apartments', 'private-landed' => 'Private Landed',
        'cluster-housing' => 'Cluster Housing'
    );

    public static $profile_subtypes = array(
        'agent' => 'Realt Agents', 'user' => 'All Public Profiles', 'staff' => 'Realt Staff'
    );

    public static $post_types = array(
        'post' => 'All', 'listings' => 'Listings', 'testimonial' => 'Testimonials'
    );

    public static $listing_subtypes = array(
        'sale' => 'For Sale', 'rent' => 'For Rent'
    );

    public static $testimonial_statuses = array(
        'publish' => 'Approved', 'trash' => 'Rejected', 'pending' => 'Pending'
    );

    public static function child_location()
    {
        $child_subtypes = array_splice(self::$location_subtypes, 1, 6);
        return View::factory('forms/filter/filter.search')
                   ->set('select', $child_subtypes)
                   ->set('form_type', 'location')
                   ->set('filter_type', 'location_subtype');
    }

    public static function location()
    {
        return View::factory('forms/filter/filter.search')
                   ->set('select', self::$location_subtypes)
                   ->set('form_type', 'location')
                   ->set('filter_type', 'location_subtype');
    }

    public static function profile()
    {
        return View::factory('forms/filter/filter.search')
                   ->set('select', self::$profile_subtypes)
                   ->set('form_type', 'member')
                   ->set('filter_type', 'member_subtype');
    }

    public static function post()
    {
        $p_types = array_splice(self::$post_types, 0, 2);
        //die($p_types);
        return View::factory('forms/filter/filter.sort')
                   ->set('select', $p_types)
                   ->set('form_type', 'post')
                   ->set('filter_type', 'post_types');
    }

    public static function feed()
    {
        return View::factory('forms/filter/personFeed')
                   ->set('type', HTTP_Request::GET);
    }

    public static function companyfeed()
    {
        return View::factory('forms/filter/companyFeed')
                   ->set('type', HTTP_Request::GET);
    }

    public static function listing()
    {
        return View::factory('forms/filter/filter.sort.listing-search')
                   ->set('select', self::$listing_subtypes)
                   ->set('form_type', 'listing')
                   ->set('filter_type', 'listing_subtype');
    }

    public static function child_listing()
    {
        return View::factory('forms/filter/filter.sort.child-listing-search')
                   ->set('select', self::$listing_subtypes)
                   ->set('form_type', 'listing')
                   ->set('filter_type', 'listing_subtype');
    }

    public static function testimonial()
    {
        return View::factory('forms/filter/filter.sort')
                   ->set('select', self::$listing_subtypes)
                   ->set('form_type', 'testimonial')
                   ->set('filter_type', 'testimonial_status');
    }
}

?>
