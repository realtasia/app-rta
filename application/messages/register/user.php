<?php defined('SYSPATH') or die('No direct script access.');
    /**
    * @author jason
    */

// see /system/messages/validation.php for the defaults for each rule. These can be overridden on a per-field basis.
return array(
   'forbidden' => 'Sorry, this page has forbidden access. Did you make a mistake? '.html::anchor('/', 'Go back').' to Realtasia',
    'beta_interest' => 'Please complete all fields',
   'username' => array(
     'username_not_valid' => 'We need a username to set up your profile page!',
     'username_not_available' => 'This username is already registered, please choose another one.',
     'email_not_valid' => 'Please enter a valid email address.',
     'email_not_available' => 'This email is already registered, please choose another one.',
   ),
    'no_beta_key' => 'This beta key does not exist or is invalid.'
    ,'login' => array(
       'wrong_credentials' => 'Oops, there is an error with your email or password. Please try again.'
    )
   ,'reset' => array(
     'no_password' => 'We found your account but there is no Realtasia password. In any case, we sent you an email with instructions.',
     'success' => 'Email found. Please check your email in a few minutes for instructions.',
     'email_not_found' => 'Sorry, we can\'t find a registered account with this email address.',
   )
   ,'loggedin'    => <<<EOD
        You are already registered. Please <a href="#login-master" onclick="jQuery('#sidebar-login-link').click();return false;">login</a> to access your account.
EOD
);

