<link rel="stylesheet" type="text/css" href="css/landing.css">

<style>
	.control-label {
		font-size: 1.5em;
	}
	.outerBox {
		max-width: 450px;
		box-shadow: 2px 2px 15px #999;
		border-radius: 5px;
		margin: 30px auto;
	}

</style>
<div class="centralize outerBox">
    <div class="contentArea" style="background: rgba(255, 255, 255, 0.6);padding:30px;border-radius:5px;">
        <!--ko if : currentState() === 'reg'-->
        <form id="newRegForm" class="form-large text-left">
            <label class="control-label" for="imobile">Mobile<a href="#" class="label label-inverse help-text" data-bind="title:'Please have your mobile with you. We will send you a verification SMS shortly.'">?</a></label>
            <div class="control-group row-fluid" data-bind="RTAValidationEle: mobile">
                <div>
                    <div class="input-prepend input-group">
                        <span class="add-on">+65</span>
                        <div class="cell">
                            <input type="text" name="mobile" id="mobile" placeholder="Your mobile no. e.g. '81234567'" data-bind="value: mobile, valueUpdate: 'afterkeydown'">
                        </div>
                    </div>
                </div>
                <div>
                    <span class="help-inline" tabindex="-1"  title="Number is Valid" data-bind="RTAValidationMsg: mobile"></span>
                </div>
            </div>
            <label class="control-label" for="first_name">First Name<a href="#" class="label label-inverse help-text" data-bind="title:'Please enter your given name.'">?</a></label>
            <div class="control-group row-fluid" data-bind="RTAValidationEle: first_name">
                <div>
                    <input type="text" name="first_name" placeholder="Your first name e.g 'John'" data-bind="value: first_name, valueUpdate: 'afterkeydown'">
                </div>
                <div>
                    <span class="help-inline" tabindex="-1"  title="First Name is Okay" data-bind="RTAValidationMsg: first_name"></span>
                </div>
            </div>
            <label class="control-label" for="last_name">Last Name<a href="#" class="label label-inverse help-text" data-bind="title:'Please enter your surname.'">?</a></label>
            <div class="control-group row-fluid" data-bind="RTAValidationEle: last_name">
                <div>
                    <input type="text" name="last_name" placeholder="Your last name e.g 'Doe'" data-bind="value: last_name, valueUpdate: 'afterkeydown'">
                </div>
                <div>
                    <span class="help-inline" tabindex="-1"  title="Last Name is Okay" data-bind="RTAValidationMsg: last_name"></span>
                </div>
            </div>
            <label class="control-label" for="username">Username<a href="#" class="label label-inverse help-text" data-bind="title:'Your username is also your private URL. Please <strong>refrain</strong> from using your mobile number'">?</a></label>
            <div class="control-group row-fluid" data-bind="RTAValidationEle: username">
                <div>
                    <div class="input-prepend input-group">
                        <span class="add-on">realtasia.com.sg/</span>
                        <div class="cell">
                            <input type="text" name="username" autocomplete="off" data-bind="value: username, valueUpdate: 'afterkeydown'" placeholder="Your personal page e.g. 'john.doe'">
                        </div>
                    </div>
                </div>
                <div>
                    <span class="help-inline" tabindex="-1"  title="Username is valid" data-bind="RTAValidationMsg: username"></span>
                </div>
            </div>
            <label class="control-label" for="email">Email<a href="#" class="label label-inverse help-text" data-bind="title:'We use this email address for all RealtAsia updates. You can set another email address for notifications in your settings page.'">?</a></label>
            <div class="control-group row-fluid" data-bind="RTAValidationEle: email">
                <div>
                    <input type="text" name="email" autocomplete="off" data-bind="value: email, valueUpdate: 'afterkeydown'" placeholder="Your email e.g. 'johndoe@example.com'">
                </div>
                <div>
                    <span class="help-inline" tabindex="-1"  title="Email is valid" data-bind="RTAValidationMsg: email"></span>
                </div>
            </div>
            <label class="control-label" for="password">Password<a href="#" class="label label-inverse help-text" data-bind="title:'Please choose a strong password.'">?</a></label>
            <div class="control-group row-fluid" data-bind="RTAValidationEle: password">
                <div>
                    <input type="password" autocomplete="off" data-bind="value: password, valueUpdate: 'afterkeydown'" name="password" placeholder="Password">
                </div>
                <div>
                    <span class="help-inline" tabindex="-1" title="Password Okay" data-bind="RTAValidationMsg: password"></span>
                </div>
            </div>
            <label class="control-label" for="confirmPassword">Confirm Password</label>
            <div class="control-group row-fluid" data-bind="RTAValidationEle: confirmPassword">
                <div>
                    <input type="password" name="confirmPassword" data-bind="value: confirmPassword, valueUpdate: 'afterkeydown'" placeholder="Re-enter your password">
                </div>
                <div>
                    <span class="help-inline" tabindex="-1"  title="Passwords Match" data-bind="RTAValidationMsg: confirmPassword"></span>
                </div>
            </div>
            <div class="control-group row-fluid" data-bind="RTAValidationEle: gender">
                <div>
                    <label class="radio inline ">
                        <input type="radio" name="gender" id="genderMale" value="male" data-bind="checked: gender">
                        Male </label>
                    <label class="radio inline ">
                        <input type="radio" name="gender" id="genderFemale" value="female" data-bind="checked: gender">
                        Female </label>
                </div>
            </div>
            <div class="control-group row-fluid" data-bind='RTAValidationEle: agreedTerms'>
                <div>
                    <label class="checkbox checkbox-inline inline" style="font-size:1.1em">
                        <input type="checkbox" name="terms" data-bind="checked: agreedTerms">
                        <span class="muted">&nbsp;I agree to Realtasia's <a href="/privacy" target="_blank">privacy policy</a> and <a href="/terms" target="_blank">terms of use</a></span> </label>
                </div>
                <div>
                    <span class="help-inline" title="Okay" data-bind="RTAValidationMsg: agreedTerms"></span>
                </div>
            </div>
            <div class="btn-group">
                <button class="btn btn-inverse btn-large" data-bind="enable:validateRegistration, click:createAccount">
                    <i class="icon-ok" data-bind="css:{'icon-spinner icon-spin':creating}"></i>&nbsp;Create Account
                </button>
            </div>
        </form>
        <!--/ko-->
        <!--ko if : currentState() === 'payment' -->
        <div id="payment" style="display:block;">
            <div class="row-fluid" style='min-height:450px'>
                <div class="span12">
                    <small class="muted"><span data-bind="text:$data.pp.item_name"></span> <strong data-bind="text:$data.pp.amount()"></strong>/yr</small>
                    <form class="form-large" style="margin-top:10px">
                        <div class="control-group row-fluid active" data-bind="RTAValidationEle: company">
                            <input type="text" name="company" autocomplete="off" data-bind="value : companyLabel, autoComplete : { source: getCompany, select: addCompany, change:resetCompany, delay: 500, minLength: 2 }" placeholder="Your company name">
                            <span class="help-block" title="Okay" data-bind="RTAValidationMsg: company"></span>
                        </div>
                        <div class="control-group row-fluid" data-bind="RTAValidationEle: license">
                            <input type="text" name="license" autocomplete="off" data-bind="value: license, valueUpdate: 'afterkeydown'" placeholder="Your CEA Registration No.">
                            <span class="help-inline" title="Okay" data-bind="RTAValidationMsg: license"></span>
                        </div>
                        <input type="hidden" name='code' value="<?php echo Security::token() ?>">

                        <button name="submit" alt="PayPal – The safer, easier way to pay online." class="btn btn-large btn-warning" data-bind="enable: validateAgent, click:$data.pp.submit">
                            <i class="icon-hand-right" style="vertical-align: bottom;font-size:larger"></i>&nbsp;Pay with <span style="color:#14497B">Pay</span><span style="color:#007BC2">Pal</span>
                        </button>
                        <img alt="" border="0" src="https://www.sandbox.paypal.com/en_GB/i/scr/pixel.gif" width="1" height="1">
                        <br>
                        <small class="muted">You don't need a paypal account.</small>
                    </form>
                    <a class="form_footer" href="https://www.paypal.com/webapps/mpp/paypal-popup" title="How PayPal Works" onclick="javascript:window.open('https://www.paypal.com/webapps/mpp/paypal-popup', 'WIPaypal', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700');return false;"> <img class="img-polaroid" src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_SbyPP_mc_vs_dc_ae.jpg" border="0" alt="PayPal Acceptance Mark" width="300" /> </a>
                </div>
            </div>
        </div>
        <!--/ko-->
    </div>
</div>