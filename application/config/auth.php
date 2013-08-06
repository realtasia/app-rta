<?php defined('SYSPATH') or die('No direct access allowed.');

/*return array(

	'driver'    => 'ORM',
	'hash_method' => 'sha256',
	'hash_key'   => 'pS3*Z2f9Ow<}^H6L,{<dS<><ld; 6|xAkwg3MgakYd}>t:KZgjjDx4U@/}#XO+]*',
	'lifetime'   => 1209600,
	'session_key' => 'rta_user',

	// Username/password combinations for the Auth File driver
	'users' => array(
		// 'admin' => 'b3154acf3a344170077d11bdb5fff31532f679a1919e716a02',
	),
);*/

return array(
	'driver'       => 'mongo',
	'hash_method'  => 'sha256',
	'hash_key'     => 'pS3*Z2f9Ow<}^H6L,{<dS<><ld; 6|xAkwg3MgakYd}>t:KZgjjDx4U@/}#XO+]*',
	'lifetime'     => 1209600,
	'session_key'  => 'rta_user',

	// Username/password combinations for the Auth File driver
	'users' => array(
		// 'admin' => 'b3154acf3a344170077d11bdb5fff31532f679a1919e716a02',
	),
);
