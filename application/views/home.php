<!--<h2 class="bold">Welcome to Realtasia. <small class="normal">The Right Now Real Estate.</small></h2>-->
<div id="myCarousel" class="carousel slide" style="margin:60px 0 0 0;">
    <ol class="carousel-indicators" style="top:0">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>
    <!--<h2 class="bold" style="padding:0;">Welcome to Realtasia. <small class="normal">The Right Now Real Estate.</small></h2>-->
    <!-- Carousel items -->
    <div class="carousel-inner clearfix" style="height:100%;clear:both">
        <div class="active item">
            <div class="centralize">
                <img src="/img/shadow/multidevice.png" style="max-height:500px;" />
                <h3 class="smallH3">A Real Estate Portal designed to focus on <em>you</em>&hellip;</h3>
            </div>
        </div>
        <div class="item">
            <div class="centralize" style="background-image: ">
                <img src="http://placehold.it/500X505" class="shadow" />
                <h3 class="smallH3">A dedicated page for every <em>place</em> in Singapore&hellip;</h3>
            </div>
        </div>
        <div class="item">
            <div class="centralize">
                <img src="http://placehold.it/500X505" />
                <h3 class="smallH3">Be engaged with our <em>interactive</em> property listings&hellip;</h3>
            </div>
        </div>
    </div>
    <!-- Carousel nav -->
    <a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
    <a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
</div>
<div id="container" style="padding-bottom:100px;">
    <div class="container-fluid homeMenu">
        <div id="contentCarousel" data-interval="false" class="relative carousel">
            <span id="main-content" class="placehash"></span>
            <ul class="nav centralize" id="mainSubMenu">
                <li><a class="btn btn-link" href="#Features" data-target="#contentCarousel" data-slide-to="0">Features</a></li>
                <li><a class="btn btn-link" data-target="#contentCarousel" href="#FAQContent" data-slide-to="1" id="FAQTab">FAQ</a></li>
                <li data-bind="visible:!RTApp.user()"><a class="btn btn-link" data-target="#contentCarousel" href="#Register" id="registerTab" data-slide-to="2" data-bind="click:initRegForm">Register</a></li>
            </ul>
            <div class="carousel-inner">
                <div class="active item relative" id="Features" style="margin-top:10px;">
                    <div class="row-fluid">
                        <div class="span4" data-bind="hoverClass:'hovering'">
                            <h4 class="bold textShadow"><i class="icon-pushpin icon-2x" style="vertical-align: middle"></i>&nbsp;Your very own Personal Page.</h4>
                            <p class="muted textShadow" style="font-size:110%;line-height:1.7">Access all your contact information on your private page. Users can even scan a barcode & save your details directly, or subscribe to you for daily updates.
                            </p>
                        </div>
                        <div class="span4" data-bind="hoverClass:'hovering'">
                            <h4 class="bold textShadow"><i class="icon-comments-alt icon-2x" style="vertical-align: middle"></i>&nbsp;Conversations that matter.</h4>
                            <p class="muted textShadow" style="font-size:110%;line-height:1.7">Exchange ideas in a public or private setting.
                                Create opportunities for people to write testimonials on your services. You can even write one for co-workers or co-brokers.
                            </p>
                        </div>
                        <!--people-->
                        <div class="span4" data-bind="hoverClass:'hovering'">
                            <div>
                                <h4 class="bold textShadow"><i class="icon-dashboard icon-2x" style="vertical-align: middle"></i>&nbsp;Real time updates.</h4>
                                <p class="muted textShadow" style="font-size:110%;line-height:1.7">Access the latest developments and events in any location. Never miss out on up-to-date information while you are viewing a property.
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr style="margin:20px auto;">
                    <div class="row-fluid">
                        <div class="span4" data-bind="hoverClass:'hovering'">
                            <h4 class="bold textShadow"><i class="icon-hand-up icon-2x" style="vertical-align: middle"></i>&nbsp;Instant interactivity.</h4>
                            <p class="muted textShadow" style="font-size:110%;line-height:1.7">Users can comment on, like or subscribe to each individual <strong>property listing</strong>. They get to see attached brochures, pictures or videos without ever leaving the page.
                                <br>Answer queries once in comments and have everyone else read it.</p>
                        </div>
                        <div class="span4" data-bind="hoverClass:'hovering'">
                            <h4 class="bold textShadow"><i class="icon-search icon-2x" style="vertical-align: middle"></i>&nbsp;Search it. Find it.</h4>
                            <p class="muted textShadow" style="font-size:110%;line-height:1.7">In Realtasia, search results are directly relevant to what you searched for.
                                <br>No <em>sponsored results</em>, <em>featured listings</em> or distracting ads. You can also sort results by popularity or date.</p>
                        </div>
                        <div class="span4" data-bind="hoverClass:'hovering'">
                            <h4 class="bold textShadow"><i class="icon-globe icon-2x" style="vertical-align: middle"></i>&nbsp;Shorter URLs for marketing.</h4>
                            <p class="muted textShadow" style="font-size:110%;line-height:1.7">It is now more cost-effective to include your personal URL for advertising in print media. e.g. <a href="http://<?php echo RT::API_SERVER ?>/jason-nathan">ra.sg/j31x</a>
            <!--                        <br>(e.g. <a href="http://<?php echo RT::API_SERVER ?>/jason-nathan">www.realtasia.com/jason-nathan</a> = <a href="http://<?php echo RT::API_SERVER ?>/jason-nathan">ra.sg/j31x</a>!)-->
                                <br>Now people can see more than just a newspaper ad.</p>
                        </div>
                    </div>
                    <hr>
                    <h3>Still to come &hellip;</h3>
                    <hr>
                    <div class="row-fluid">
                        <div class="span4" data-bind="hoverClass:'hovering'">
                            <h4 class="bold textShadow"><i class="icon-mobile-phone" style="font-size:2.3em;vertical-align: middle"></i>&nbsp;Check-ins with our mobile app.</h4>
                            <p class="muted textShadow" style="font-size:110%;line-height:1.7">Instantly let people see you whether you are on-site or had just left a location.
                                <br>Users visiting that location page can narrow down the most recently active agents in the area.</p>
                        </div>
                        <div class="span4" data-bind="hoverClass:'hovering'">
                            <h4 class="bold textShadow"><i class="icon-share-alt icon-2x" style="vertical-align: middle"></i>&nbsp;Integrate social networks.</h4>
                            <p class="muted textShadow" style="font-size:110%;line-height:1.7">Add your uploaded YouTube videos or Facebook pictures to your listings easily.
                                <br>Your activity in Realtasia can automatically be synced to other networks instantly.</p>
                        </div>
                    </div>
                    <div class="alert alert-info" style="margin-top:30px;">
                        <h3 class="hidden-phone" style="margin-top:0;"><i class="icon-lightbulb"></i>&nbsp;Registrations are now open!</h3>
                        <h4 class="visible-phone" style="margin-top:0;"><i class="icon-lightbulb"></i>&nbsp;Registrations are now open!</h4>
                        <p style="display:inline">Membership is limited to the <strong>first 100 users</strong>, so hurry&hellip;</p>
                        <button onclick="javascript:window.scrollTo(0, 450);
                                jQuery('#registerTab').click();" class="btn btn-primary" style="display:inline-block"><i class="icon-magic"></i>&nbsp;Register Now!</button>&nbsp;
                        <small>or read through our <a class="btn btn-link" data-target="#contentCarousel" href="#main-content" data-slide-to="1" onclick="window.scrollTo(0, 500);
                                jQuery('#FAQTab').click();">FAQ.</a></small>
                    </div>
                </div>
                <div class="item relative" id="faqContent">
                    <div class="row-fluid">
                        <div class="span12">
                            <h3><i class="icon-paper-clip"></i>&nbsp;Frequently Asked Questions</h3>
                            <div class="row-fluid">
                                <div class="span5">
                                    <ul>
                                        <li><h5 class="bold textShadow"><a href="#who-is-this-for">Who is this for?</a></h5></li>
                                        <li><h5 class="bold textShadow"><a href="#what-is-the-preview-period">What is the preview period?</a></h5></li>
                                        <li><h5 class="bold textShadow"><a href="#will-my-membership-fees-remain-the-same">Will my membership fees remain the same?</a></h5></li>
                                        <li><h5 class="bold textShadow"><a href="#do-i-pay-more-as-new-features-are-introduced">Do I pay more as new features are introduced?</a></h5></li>
                                    </ul>
                                </div>
                                <div class="span5">
                                    <ul>
                                        <li><h5 class="bold textShadow"><a href="#why-should-i-sign-up-now">Why should I sign up now?</a></h5></li>
                                        <li><h5 class="bold textShadow"><a href="#what-payment-methods-are-there">What payment methods are there?</a></h5></li>
                                        <li><h5 class="bold textShadow"><a href="#are-there-tutorials-videos">Are there tutorials / videos?</a></h5></li>
                                    </ul>
                                </div>
                            </div>
                            <hr>
                            <div class="contentArea">
                                <h4 class="bold textShadow relative"><span id="who-is-this-for" class="placehash"></span>Who is this for?</h4>
                                <p class="muted textShadow" style="font-size:110%;line-height:1.7">
                                    Paid membership is currently exclusive to licensed Real Estate Agents, but Realtasia is built for both agents and regular users alike. During the preview period,
                                    we limit the total number of registrations and adjust it upwards periodically.
                                </p>
                                <a href="#main-content">Back to questions&nbsp;<i class="icon-arrow-up"></i></a>
                            </div>
                            <hr>
                            <div class="contentArea">
                                <h4 class="bold textShadow relative"><span id="what-is-the-preview-period" class="placehash"></span>What is the preview period?</h4>
                                <p class="muted textShadow" style="font-size:110%;line-height:1.7">
                                    The preview period is simply a time we test usability & performance with a finite number of users. We do this to ensure our infrastructure can handle
                                    different scenarios.<br>
                                    During this time, we collect feedback from you as we test and improve on the application and add proposed features (including our mobile application)
                                </p>
                                <a href="#main-content">Back to questions&nbsp;<i class="icon-arrow-up"></i></a>
                            </div>
                            <hr>
                            <div class="contentArea">
                                <h4 class="bold textShadow relative"><span id="will-my-membership-fees-remain-the-same" class="placehash"></span>Will my membership fees remain the same?</h4>
                                <p class="muted textShadow" style="font-size:110%;line-height:1.7">
                                    Yes. Existing members maintain their original package fees. New users will subscribe at listed rates.                                </p>
                                <a href="#main-content">Back to questions&nbsp;<i class="icon-arrow-up"></i></a>
                            </div>
                            <hr>
                            <div class="contentArea">
                                <h4 class="bold textShadow relative"><span id="do-i-pay-more-as-new-features-are-introduced" class="placehash"></span>Do I pay more as new features are introduced?</h4>
                                <p class="muted textShadow" style="font-size:110%;line-height:1.7">
                                    Your package price remains the same for all future updates and upgrades except if we integrate services from external vendors/providers (e.g. SMS Marketing, online advertising etc)</p>
                                <a href="#main-content">Back to questions&nbsp;<i class="icon-arrow-up"></i></a>
                            </div>
                            <hr>
                            <div class="contentArea">
                                <h4 class="bold textShadow relative"><span id="why-should-i-sign-up-now" class="placehash"></span>Why should I sign up now?</h4>
                                <p class="muted textShadow" style="font-size:110%;line-height:1.7">
                                    Your subscription plan never changes; so long as you maintain an account with us.
                                    You get a chance to contribute to and help shape Realtasia as it moves forward.
                                    The preview period is <strong>limited to the first 100</strong> users, and you get more than <strong><em>60%</em></strong> off the proposed subscription fees!
                                </p>
                                <a href="#main-content">Back to questions&nbsp;<i class="icon-arrow-up"></i></a>
                            </div>
                            <hr>
                            <div class="contentArea">
                                <h4 class="bold textShadow relative"><span id="what-payment-methods-are-there" class="placehash"></span>What payment methods are there?</h4>
                                <p class="muted textShadow" style="font-size:110%;line-height:1.7">
                                    You can pay using all major credit cards, your paypal account or via inter-bank transfers. (Cheque payments are not applicable during the private preview stage.)
                                </p>
                                <a href="#main-content">Back to questions&nbsp;<i class="icon-arrow-up"></i></a>
                            </div>
                            <hr>
                        </div>
                    </div>
                    <div class="alert alert-info" style="margin-top:30px;">
                        <h3 class="hidden-phone" style="margin-top:0;"><i class="icon-lightbulb"></i>&nbsp;Registrations are now open!</h3>
                        <h4 class="visible-phone" style="margin-top:0;"><i class="icon-lightbulb"></i>&nbsp;Registrations are now open!</h4>
                        <p  style="display:inline">Membership is limited to the first <strong>first 100 users</strong>, so hurry&hellip;</p>
                        <button onclick="javascript:window.scrollTo(0, 450);
                                jQuery('#registerTab').click()" class="btn btn-primary" style="display:inline-block"><i class="icon-magic"></i>&nbsp;Register Now!</button>
                    </div>
                </div>
                <div class="item relative" id="Register" data-bind="ifnot:user">
                    <div class="container-fluid" data-bind="with:$root.regForm">
                        <!--ko if : currentState() === 'reg'-->
                        <div id="regBlock" style="display:block;">
                            <h3 class="textShadow"><i class="icon-magic"></i>&nbsp;Registration <small style="font-size:small">All fields are required</small></h3>
                            <hr>
                            <div class="row-fluid">
                                <div class="span12">
                                    <form id="newRegForm" class="form-large">
                                        <label class="control-label" for="imobile">Mobile<a href="#" class="label label-inverse help-text" data-bind="title:'Please have your mobile with you. We will send you a verification SMS shortly.'">?</a></label>
                                        <div class="control-group row-fluid" data-bind="RTAValidationEle: mobile">
                                            <div class="span6">
                                                <div class="input-prepend input-group">
                                                    <span class="add-on">+65</span>
                                                    <div class="cell"><input type="text" name="mobile" id="mobile" placeholder="Your mobile no. e.g. '81234567'" data-bind="value: mobile, valueUpdate: 'afterkeydown'"></div>
                                                </div>
                                            </div>
                                            <div class="span6"><span class="help-inline" title="Number is Valid" data-bind="RTAValidationMsg: mobile"></span></div>
                                        </div>
                                        <label class="control-label" for="first_name">First Name<a href="#" class="label label-inverse help-text" data-bind="title:'Please enter your given name.'">?</a></label>
                                        <div class="control-group row-fluid" data-bind="RTAValidationEle: first_name">
                                            <div class="span6"><input type="text" name="first_name" placeholder="Your first name e.g 'John'" data-bind="value: first_name, valueUpdate: 'afterkeydown'"></div>
                                            <div class="span6"><span class="help-inline" title="First Name is Okay" data-bind="RTAValidationMsg: first_name"></span></div>
                                        </div>
                                        <label class="control-label" for="last_name">Last Name<a href="#" class="label label-inverse help-text" data-bind="title:'Please enter your surname.'">?</a></label>
                                        <div class="control-group row-fluid" data-bind="RTAValidationEle: last_name">
                                            <div class="span6"><input type="text" name="last_name" placeholder="Your last name e.g 'Doe'" data-bind="value: last_name, valueUpdate: 'afterkeydown'"></div>
                                            <div class="span6"><span class="help-inline" title="Last Name is Okay" data-bind="RTAValidationMsg: last_name"></span></div>
                                        </div>
                                        <label class="control-label" for="username">Username<a href="#" class="label label-inverse help-text" data-bind="title:'Your username is also your private URL. Please <strong>refrain</strong> from using your mobile number'">?</a></label>
                                        <div class="control-group row-fluid" data-bind="RTAValidationEle: username">
                                            <div class="span6">
                                                <div class="input-prepend input-group">
                                                    <span class="add-on">realtasia.com.sg/</span>
                                                    <div class="cell"><input type="text" name="username" autocomplete="off" data-bind="value: username, valueUpdate: 'afterkeydown'" placeholder="Your personal page e.g. 'john.doe'"></div>
                                                </div>
                                            </div>
                                            <div class="span6"><span class="help-inline" title="Username is valid" data-bind="RTAValidationMsg: username"></span></div>
                                        </div>
                                        <label class="control-label" for="email">Email<a href="#" class="label label-inverse help-text" data-bind="title:'We use this email address for all RealtAsia updates. You can set another email address for notifications in your settings page.'">?</a></label>
                                        <div class="control-group row-fluid" data-bind="RTAValidationEle: email">
                                            <div class="span6"><input type="text" name="email" autocomplete="off" data-bind="value: email, valueUpdate: 'afterkeydown'" placeholder="Your email e.g. 'johndoe@example.com'"></div>
                                            <div class="span6"><span class="help-inline" title="Email is valid" data-bind="RTAValidationMsg: email"></span></div>
                                        </div>
                                        <label class="control-label" for="password">New Password<a href="#" class="label label-inverse help-text" data-bind="title:'Please choose a strong password.'">?</a></label>
                                        <div class="control-group row-fluid" data-bind="RTAValidationEle: password">
                                            <div class="span6"><input type="password" autocomplete="off" data-bind="value: password, valueUpdate: 'afterkeydown'" name="password" placeholder="Password"></div>
                                            <div class="span6"><span class="help-inline" title="Password Okay" data-bind="RTAValidationMsg: password"></span></div>
                                        </div>
                                        <label class="control-label" for="confirmPassword">Confirm Password</label>
                                        <div class="control-group row-fluid" data-bind="RTAValidationEle: confirmPassword">
                                            <div class="span6"><input type="password" name="confirmPassword" data-bind="value: confirmPassword, valueUpdate: 'afterkeydown'" placeholder="Re-enter your password"></div>
                                            <div class="span6"><span class="help-inline" title="Passwords Match" data-bind="RTAValidationMsg: confirmPassword"></span></div>
                                        </div>
                                        <div class="control-group row-fluid" data-bind="RTAValidationEle: gender">
                                            <div class="span6">
                                                <label class="radio inline ">
                                                    <input type="radio" name="gender" id="genderMale" value="male" data-bind="checked: gender"> Male
                                                </label>
                                                <label class="radio inline ">
                                                    <input type="radio" name="gender" id="genderFemale" value="female" data-bind="checked: gender"> Female
                                                </label>
                                            </div>
                                        </div>
                                        <div class="control-group row-fluid" data-bind='RTAValidationEle: agreedTerms'>
                                            <div class="span6">
                                                <label class="checkbox checkbox-inline inline">
                                                    <input type="checkbox" name="terms" data-bind="checked: agreedTerms"><small class="muted">&nbsp;I agree to Realtasia's <a href="#">privacy policy</a> and <a href="#">terms of use</a></small>
                                                </label>
                                            </div>
                                            <div class="span6"><span class="help-inline" title="Okay" data-bind="RTAValidationMsg: agreedTerms"></span></div>
                                        </div>
                                        <div class="btn-group">
                                            <button class="btn btn-inverse" data-bind="enable:validateRegistration, click:createAccount"><i class="icon-ok" data-bind="css:{'icon-spinner icon-spin':creating}"></i>&nbsp;Create Account</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!--/ko-->
                        <!--ko if : currentState() === 'payment' -->
                        <div id="payment" style="display:block;">
                            <h3 class="textShadow"><i class="icon-user"></i>&nbsp;Please select your account type</h3>
                            <hr>
                            <div class="row-fluid" style='min-height:450px'>
                                <div class="span6">
                                    <a class="btn-large thumbnail choice" data-bind="css:{active:isAgent}, click:toggleIsAgent">I am a Real Estate Agent<br><small class="muted">Private Preview Subscription: <span class="relative" style="text-decoration: line-through;vertical-align:middle">$239*</span>&nbsp;<strong>$99/yr</strong></small></a>
                                    <div class="well" style="border-radius:0 2px 2px 0;margin-top:-1px" data-bind="animateActive:isAgent">
                                        <form class="form-large" style="margin-top:10px">
                                            <div class="control-group row-fluid" data-bind="RTAValidationEle: company">
                                                <div class="span6"><input type="text" name="company" autocomplete="off" data-bind="value : companyLabel, autoComplete : { source: getCompany, select: addCompany, change:resetCompany, delay: 500, minLength: 2 }" placeholder="Your company name"></div>
                                                <div class="span6"><span class="help-inline" title="Okay" data-bind="RTAValidationMsg: company"></span></div>
                                            </div>
                                            <div class="control-group row-fluid" data-bind="RTAValidationEle: license">
                                                <div class="span6"><input type="text" name="license" autocomplete="off" data-bind="value: license, valueUpdate: 'afterkeydown'" placeholder="Your CEA Registration No."></div>
                                                <div class="span6"><span class="help-inline" title="Okay" data-bind="RTAValidationMsg: license"></span></div>
                                            </div>
                                            <input type="hidden" name='code' value="<?php echo Security::token() ?>">
                                        </form>
                                        <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                            <input type="hidden" name="cmd" value="_s-xclick">
                                            <input type="hidden" name="hosted_button_id" value="EDFQQ4HYU3RU2">
                                            <button name="submit" alt="PayPal – The safer, easier way to pay online." class="btn btn-large btn-warning" data-bind="enable:validateAgent"><i class="icon-hand-right" style="vertical-align: bottom;font-size:larger"></i>&nbsp;Pay with <span style="color:#14497B">Pay</span><span style="color:#007BC2">Pal</span></button>
                                            <img alt="" border="0" src="https://www.sandbox.paypal.com/en_GB/i/scr/pixel.gif" width="1" height="1">
                                        </form>
                                        <!--                                        <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_top" style="display:inline-block" data-bind="submit:saveExtras">
                                                                                    <input type="hidden" name="cmd" value="_xclick">
                                                                                    <input type="hidden" name="business" value="TTT8JAWADWV7L">
                                                                                    <input type="hidden" name="lc" value="SG">
                                                                                    <input type="hidden" name="item_name" value="RTA-OneTimePayment">
                                                                                    <input type="hidden" name="item_number" value="1234">
                                                                                    <input type="hidden" name="amount" value="99.90">
                                                                                    <input type="hidden" name="currency_code" value="SGD">
                                                                                    <input type="hidden" name="button_subtype" value="services">
                                                                                    <input type="hidden" name="no_note" value="0">
                                                                                    <input type="hidden" name="cn" value="Add special instructions to the seller:">
                                                                                    <input type="hidden" name="no_shipping" value="2">
                                                                                    <input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted">
                                                                                    <button name="submit" alt="PayPal – The safer, easier way to pay online." class="btn btn-large btn-warning" data-bind="enable:validateAgent"><i class="icon-hand-right" style="vertical-align: bottom;font-size:larger"></i>&nbsp;Pay with <span style="color:#14497B">Pay</span><span style="color:#007BC2">Pal</span></button>
                                                                                    <img alt="" border="0" src="https://www.sandbox.paypal.com/en_GB/i/scr/pixel.gif" width="1" height="1">
                                                                                </form>-->
                                        <small class="muted">You don't need a paypal account.</small>

                                        <a onclick="return false;" href="#" style="text-align: left;text-decoration: underline;display:block;" data-bind="qtip:function(){return 'Please check your email for other payment options.'}">Other payment options</a><br>
                                        <a href="https://www.paypal.com/webapps/mpp/paypal-popup" title="How PayPal Works" onclick="javascript:window.open('https://www.paypal.com/webapps/mpp/paypal-popup', 'WIPaypal', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700');
                                return false;">
                                            <img class="img-polaroid" src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_SbyPP_mc_vs_dc_ae.jpg" border="0" alt="PayPal Acceptance Mark" width="300" />
                                        </a>
                                    </div>
                                </div>
                                <div class="span6">
                                    <a class="btn-large thumbnail choice" data-bind="css:{active:isUser}, click:toggleIsUser">I am <strong>Not</strong> a Real Estate Agent<br><small class="muted">Free Account</small></a>
                                    <div class="well" style="border-radius:0 2px 2px 0;margin-top:-1px" data-bind="animateActive:isUser">
                                        <div class="alert alert-warning media">
                                            <p class="pull-left icon-info-sign" style="font-size:large"></p>

                                            <div class="media-body" >
                                                <h4>Your Account has been created!</h4>
                                                <p style="margin-top:5px">
                                                    However, at this time, we're limiting account activation to licensed real estate agents. </p>
                                                <p style="margin-top:5px"> Your account will be activated soon and we'll inform you via email/SMS using details you provided.
                                                </p>
                                                <p style="margin-top:5px">
                                                    If you have an enquiry, please navigate to the bottom of this page to see how you can get in touch with us.
                                                    <strong style="display:block;margin-top:5px">Thank you for your interest.</strong>
                                                </p>
                                                <small style="margin-top:10px" class="muted" data-bind="click:toggleIsAgent">Agent? Click <a href='#'>here.</a></small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--/ko-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>