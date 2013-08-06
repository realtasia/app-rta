<?php

defined('SYSPATH') or die('No direct script access.');
/**
 * @author jason
 */
return array(
    'native'   => array(
        'name'     => '_session',
        'lifetime' => Date::WEEK,
    ),
    'cookie'   => array(
        'name'      => '_c_session',
        'encrypted' => TRUE,
        'lifetime'  => Date::WEEK,
    ),
    'database' => array(
        /**
         * Database settings for session storage.
         *
         * string   group  configuation group name
         * string   table  session table name
         * integer  gc     number of requests before gc is invoked
         * columns  array  custom column names
         */
        'group'   => 'default',
        'table'   => 'sessions',
        'gc'      => 500,
        'lifetime'  => Date::HOUR,
        'columns' => array(
            /**
             * session_id:  session identifier
             * last_active: timestamp of the last activity
             * contents:    serialized session data
             */
            'session_id'  => 'session_id',
            'last_active' => 'last_active',
            'contents'    => 'contents'
        ),
    ),
);
