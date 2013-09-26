<?php defined('SYSPATH') or die('No direct script access.');

Route::set('ipn', 'ipn(/<action>)')
  ->defaults([
      'controller' => 'ipn',
      'action'     => 'index'
  ]);


Route::set('listings', 'listings(/<action>(/<id>(?page=<page>)))', ['page' => '[0-9]+'])
  ->defaults([
      'controller' => 'listings',
      'action'     => 'index',
      'page'       => 1
  ]);

Route::set('locations', 'locations(/<action>(/<id>(?page=<page>)))', ['page' => '[0-9]+'])
  ->defaults([
      'controller' => 'locations',
      'action'     => 'index',
      'page'       => 1
  ]);

Route::set('location', 'location(/<subtype>(/<slug>(/<action>(/<id>(?page=<page>)))))', [
      'subtype' => 'hdb|estate|private-apartments|private-landed|serviced-apartments|cluster-housing|lid',
      'page'    => '[0-9]+'
  ])
  ->defaults([
      'controller' => 'location',
      'action'     => 'feed',
      'page'       => 1
  ]);

Route::set('people', 'people(/<action>(/<id>(?page=<page>)))', ['page' => '[0-9]+'])
  ->defaults([
      'controller' => 'people',
      'action'     => 'index',
      'page'       => 1
  ]);

Route::set('company', 'company(/<subtype>(/<slug>(/<action>(/<id>(?page=<page>)))))', [
      'subtype' => 'commercial|developer|agency|',
      'page'    => '[0-9]+'
  ])
  ->defaults([
      'controller' => 'company',
      'action'     => 'feed',
      'page'       => 1
  ]);


Route::set('media', 'media(/<action>(/<id>))')
  ->defaults([
      'controller' => 'media',
      'action'     => 'index',
      'page'       => 1
  ]);

Route::set('error', 'error/<action>(/<message>)', ['action'  => '[0-9]++', 'message' => '.+'])
  ->defaults(['controller' => 'error']);

Route::set('default', function($uri) {
      // no params, default to landing page
      if ($uri == '')
          return [
              'controller' => 'home',
              'static'     => 'index'
          ];
      // Check if this is the single controller. A finite set of actions.
      if (in_array(trim($uri, '/'), ['parseurl', 'post', 'external', 'user', 'page']))
          return [
              'controller' => 'single',
              'action'     => $uri
          ];
      // at least something was given, check if static page.
      if (in_array(trim($uri, '/'), ['index', 'faq', 'terms', 'help', 'about', 'contact']))
          return [
              'controller' => 'home',
              'static'     => trim($uri, '/')
          ];

      if (in_array(trim($uri, '/'), ['login', 'logout', 'api', 'verify_sms', 'get_verification', 'checkAuth', 'renew', 'accessdenied', 'poll', 'loginbasic']))
          return [
              'controller' => 'home',
              'action'     => trim($uri, '/')
          ];
      // not static, have to explode and check to route params for person
      // controller
      $parts = explode('/', trim($uri, '/'));

      // this is the default
      $return = [
          'controller' => 'person',
          'username'   => trim($uri, '/'),
          'action'     => 'feed'
      ];

      // just a username given
      if (count($parts) <= 1)
          return $return;
      else
      {
          // there is more stuff
          $return['username'] = $parts[0];

          // check for action
          if (isset($parts[1]))
          {
              $return['action'] = $parts[1];
          }

          // check for id
          if (isset($parts[2]))
          {
              $return['id'] = $parts[2];
          }

          return $return;
      }

      return false;
  });