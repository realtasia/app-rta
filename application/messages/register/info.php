<?php
return array(
   'instructions' => array(
      'betakey'    => 'Please enter the beta key from the welcome email to continue.',
      'betasignup' => 'Please tell us if you are an agent and how you found out about us!',
      'login'      => 'If you did not register with your facebook profile, please enter your Realtasia credentials.',
      'reset'      => 'Please enter the email address you used to register with us.',
      'register'   => 'Please fill in all fields.',
   )
   ,'spam_mail' => <<<EOD
   <br/>However, we are limiting it to 100 registrants with each cycle (Normally each week!).<br/>
   Please navigate to http://beta.realtasia.com.sg and hit the <strong>Join Beta Program</strong> button to register your interest now!<br />
EOD
    ,'thank_you_beta' => <<<EOD
    Thanks! We have recieved your request to join the beta program.
    <br />Please be sure to check your email for your beta key!
EOD
   ,'thank_you_beta_email' => <<<EOD
    We are honoured for your interest to participate in Realtasia Beta Program.
    <br />Forgive us that we don't open this to all users as it is a Private Beta Program.
    <br />For those of you who have not been chosen to be part of Beta, please don't be disappointed as we will periodically enlist new Beta Testers.<br />
    <br />Be sure to look out for our "Welcome Email" with your Beta Key to enroll.
    <br /><br />Stay tuned for our official release! You will like it.
EOD
   ,'betamessage' => <<<EOD
Haven't received your welcome email? Interested in joining the Beta program?
<a href="#" onclick="javascript:jQuery('#sidebar-beta-link').click();return false;">Join the Beta Program</a>
and we'll invite you on the next beta cycle. <br /><br /> If you've already sent your interest via 'Join Beta Program', please be patient as
we are still testing the system with a 100 randomly selected users at a time. We extend this to another 100 each week.
EOD
   ,'fbregistration' => <<<EOD
Hey there Beta User! We're really happy to see you! <br />
Realtasia uses <strong>Facebook</strong> to aid in our registration process.
You don't have to link up your facebook account but doing so will mean you don't have to remember your
Realtasia credentials.
EOD
   ,'resetpass' => <<<EOD
Forgot your Realtasia password? Just send us your email address and we'll tell you how to reset it.
If you registered with your facebook profile, you only have to log in using Facebook!
EOD
   ,'login' => <<<EOD
Please log in to continue. If you haven't done so already, please
<a href="#beta-registration" id="register-link" onclick="javascript:jQuery('#sidebar-reg-link').click();return false;">register here</a>.
<br />Forgotten your Realtasia password?
<a href="/user/reset_password" onclick="javascript:jQuery('#sidebar-forgot-link').click();return false;">Click here</a> to reset it.
EOD
   ,'betasignup' => <<<EOD
The beta program is currently available for registered Realtors in Singapore.
However, you can still send us your interest if you are not an agent. We will send you an invite on our next beta cycle.
We need a valid mobile phone number to send you account details. Please fill in all fields & have your mobile phone with you.
EOD
);

