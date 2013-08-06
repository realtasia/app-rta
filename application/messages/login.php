<?php defined('SYSPATH') or die('No direct script access.');
    /**
    * @author jason
    */

// see /system/mesages/validation.php for the defaults for each rule. These can be overridden on a per-field basis.
return array(
   'username' => array(
     'not_empty' => 'Email must not be empty.',
     'unique_key_exists' => 'Password or email is incorrect.',
   ),
   'password' => array(
     'not_empty'   => 'Password must not be empty.',
     'invalid' => 'Password or email is incorrect.',
   ),
);

