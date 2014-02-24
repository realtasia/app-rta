<?php

defined('SYSPATH') or die('No direct script access.');

// -- Environment setup --------------------------------------------------------
// Load the core Kohana class
require SYSPATH . 'classes/kohana/core' . EXT;

if (is_file(APPPATH . 'classes/kohana' . EXT))
{
    // Application extends the core
    require APPPATH . 'classes/kohana' . EXT;
}
else
{
    // Load empty core extension
    require SYSPATH . 'classes/kohana' . EXT;
}

/**
 * Set the default time zone.
 *
 * @see  http://kohanaframework.org/guide/using.configuration
 * @see  http://php.net/timezones
 */
date_default_timezone_set('Asia/Singapore');

/**
 * Set the default locale.
 *
 * @see  http://kohanaframework.org/guide/using.configuration
 * @see  http://php.net/setlocale
 */
setlocale(LC_ALL, 'en_GB.utf-8');

/**
 * Enable the Kohana auto-loader.
 *
 * @see  http://kohanaframework.org/guide/using.autoloading
 * @see  http://php.net/spl_autoload_register
 */
spl_autoload_register(array('Kohana', 'auto_load'));

/**
 * Enable the Kohana auto-loader for unserialization.
 *
 * @see  http://php.net/spl_autoload_call
 * @see  http://php.net/manual/var.configuration.php#unserialize-callback-func
 */
ini_set('unserialize_callback_func', 'spl_autoload_call');

// -- Configuration and initialization -----------------------------------------

/**
 * Set the default language
 */
I18n::lang('en-us');

Kohana::$environment = ($_SERVER['SERVER_NAME'] === 'realtasia.com.sg') ? Kohana::PRODUCTION : Kohana::DEVELOPMENT;
//Kohana::$environment = Kohana::PRODUCTION;

/**
 * Initialize Kohana, setting the default options.
 *
 * The following options are available:
 *
 * - string   base_url    path, and optionally domain, of your application   NULL
 * - string   index_file  name of your index file, usually "index.php"       index.php
 * - string   charset     internal character set used for input and output   utf-8
 * - string   cache_dir   set the internal cache directory                   APPPATH/cache
 * - boolean  errors      enable or disable error handling                   TRUE
 * - boolean  profile     enable or disable internal profiling               TRUE
 * - boolean  caching     enable or disable internal caching                 FALSE
 */
Kohana::init(array(
    'base_url'   => '/',
    'index_file' => '',
    'profile'    => Kohana::$environment === Kohana::PRODUCTION,
    'caching'    => Kohana::$environment === Kohana::PRODUCTION
));



/**
 * Attach a file reader to config. Multiple readers are supported.
 */
Kohana::$config->attach(new Config_File);

/**
 * Enable modules. Modules are referenced by a relative or absolute path.
 */
Kohana::modules([
	'deploy'	   => MODPATH . 'deploy',
    'Mongo'        => MODPATH . 'mongodb', // RTA Core
    'RT'           => MODPATH . 'RT', // RTA Core
    'cache'        => MODPATH . 'cache', // Caching with multiple backends
    'image'        => MODPATH . 'image', // Image manipulation
    'purifier'     => MODPATH . 'purifier', // HTML purifier
    'asset-merger' => MODPATH . 'asset-merger', // Asset Management
    'SMS' 		   => MODPATH . 'sms', // Asset Management
    'qrcode'       => MODPATH . 'qr',        // QRCode generator
]);

/**
 * Attach the file write to logging. Multiple writers are supported.
 */
Kohana::$log->attach( Kohana::$environment === Kohana::PRODUCTION 
	? new Log_Mongo() 
	: new Log_File(APPPATH . 'logs')
	, array(), new Log_Mongo(), [], Log::DEBUG );

Cookie::$domain = FALSE;
Cookie::$httponly = TRUE;
Cookie::$salt = "realtasia-singapore";

require(APPPATH . 'config/rt_routes.php');
