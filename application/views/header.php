<header class="largeNav navbar navbar-fixed-top navbar-inverse">
    <div class="navbar-inner inner">
        <div class="">
            <a data-target=".navbar-responsive-collapse" data-toggle="collapse" class="btn btn-navbar collapsed hidden-desktop"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </a>
            <span id="realtLogo"> <a href="/?ref=logo" class="brand" > <img alt="Realtasia Logo" src="http://static.realtasia.com.sg/realtlogo6.png" width="160" height="34"> </a> </span>
            <ul class="nav mainNavPhone hidden-desktop" style="font-size:110%">
                <li style="display:none;margin-right:20px" data-bind="visible:RTApp.user">
                    <a href="#" data-bind="attr:{href:RTApp.user() && RTApp.user().uri}, title:'Go to your Profile Page'"><i class="icon-home"></i></a>
                </li>
                <li style="display:none;margin-right:20px" data-bind="visible:RTApp.user">
                    <a href="/logout" data-bind="title:'Log Out'"><i class="icon-signout"></i></a>
                </li>
                <li style="display:none;margin-right:20px" data-bind="visible:!RTApp.user()">
                    <a href="/loginbasic" data-bind="title:'Log In', href:RTApp.loginRedirect"><i class="icon-signin"></i></a>
                </li>
            </ul>
            <div class="nav-collapse navbar-responsive-collapse collapse" style="height:0;">
                <ul class="nav" style="margin-bottom:-2px;">
                    <?php echo $main_menu->render() ?>
                </ul>
                <ul class="nav pull-right" style="padding-bottom:0;">
                    <li class="hidden-desktop nav-divider"></li>
                    <!--ko if: user-->
                    <li style="display:none;margin-right:0" class="dropdown"  data-bind="visible:user, with:user">
                        <span class="badge badge-important" style="position:absolute;top:1px;right:0;z-index:1" data-bind="alertminate:showNotifications, text:showNotifications, visible:showNotifications"> </span>
                        <a href="#" class="dropdown-toggle visible-desktop clearfix RTNotify" data-toggle="dropdown"><i class="icon-bell-alt"></i></a>
                        <ul class="dropdown-menu" style="padding:10px 0 0 0" >
                            <li>
                                <div style="position:relative">
                                    <ul class="dropdown-notifications" style="padding:0;max-height:300px;overflow-y: scroll;" data-bind="scroll:true, foreach: newNotifications">
                                        <li>
											<a href="/post/?id=52fa260a2901994a0f8b4571" class="media" data-bind="href:post_uri"> 
											  <span class="pull-left" data-bind="css:{hovering:isActiveClass}">
											  	<i data-bind="attr:{'class':iconClass}"></i> 
											  </span>
											  <span class="media-body" style="display: block;">
											  <span data-bind="html:summary"></span> <small class="text-muted"> <em data-bind="timeago:timestamp"></em> </small>
											  </span>
											
											</a>                                        	
                                        </li>
                                        <li class="divider"></li>
                                    </ul>
			                        <!-- ko ifnot: showNotifications -->
			                        <div style="padding:5px" class="centralize">
			                            <h4>No Notifications</h4>
			                        </div>
			                        <!-- /ko -->                                    
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li style="display:none;margin-right:10px" class="dropdown" data-bind="visible:user, with:user">
                        <span class="badge badge-important" style="position:absolute;top:1px;right:0;z-index:1" data-bind="alertminate:counts.newMessages, text:counts.newMessages, visible:!!counts.newMessages()"></span>                        
                        <a href="#" class="hidden-desktop" data-bind="href:uri() + '#conversations', title:'View Messages', click:function(){return $('.collapse').collapse('toggle'), true;}">
                        	<span><i class="icon-envelope hidden-desktop"></i></span> Messages 
                        	<span class="badge badge-important pull-right" data-bind="alertminate:counts.newMessages, text:counts.newMessages, visible:!!counts.newMessages()"></span>
                        </a>
                        <a href="#" id="messagesLink" class="dropdown-toggle visible-desktop RTNotify clearfix" data-toggle="dropdown" data-bind="click:clearMessageCount"> 
                        	<i class="icon-envelope" style="font-size:90%;vertical-align: bottom;"></i> 
                        </a>
                        <ul class="dropdown-menu" style="padding:10px 0 0 0" >
                            <li>
                            	<div style="position:relative">
	                                <ul class="dropdown-messages" style="padding:0;max-height:300px;overflow-y: scroll;" data-bind="scroll:true, foreach: unreadMessages">
	                                    <li>
	                                        <a href="#" class="clearfix" data-bind="href:post_uri"> 
	                                        	<img data-bind="attr:{src:avatar}" class="pull-left dropdown-messages-profile">
	                                        <div>
	                                            <strong data-bind="text:interactor_name"></strong>
	                                            <span class="pull-right dropdown-messages-date text-muted"> <em data-bind="timeago:timestamp"></em> </span>
	                                        </div>
	                                        <div class="dropdown-messages-message">
	                                            <p class="truncate" data-bind="text:excerpt">
	                                            </p>
	                                        </div> </a>
	                                    </li>
	                                    <li class="divider"></li>
	                                </ul>
	                                <!-- ko if: !unreadMessages().length -->
	                                <div style="padding:5px" class="centralize"><h4>No New Messages</h4></div>
	                                <!-- /ko -->
	                                <div class="dropdown-footer">
	                                    <a class="text-center btn btn-primary btn-block" data-bind="href:uri() + '#conversations'" id="inboxLink"> <span class="icon-envelope"></span>  Go to Inbox </a>
	                                </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li style="display:none;" data-bind="visible:user, with:user" style="padding:0" class="visible-desktop">
                        <div class="dropdown" id="accountDiv" class="media">
                            <span class="pull-left"> <img alt="LoginThumb" width="40" height="40" src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" id="navBarProfilePhoto" data-bind="getAvatar : {context : $data, size : 40}"> </span>
                            <a id="accountLink" class="media-body" data-bind="href : uri() + '/?ref=accountLink'"> Hello <span data-bind="text:name"></span> </a>
                        </div>
                    </li>
                    <li style="display:none;" class="visible-desktop" data-bind="visible:user, with:user">
                        <a class="dropdown-toggle visible-desktop" id="desktop-more-link" data-toggle="dropdown" style="margin-top:1px; cursor:pointer">More <i class="icon-caret-down"></i></a>
                        <ul class="dropdown-menu" id="mainMoreNav">
                            <li>
                                <a href="#settings" data-bind="title:'Change your personal settings', href: $data.uri() + '#settings'" class="navSettings" style="padding-left:7px"><i class="icon-wrench"></i> Settings</a>
                            </li>
                            <li>
                                <a href="/billing" data-bind="title:'View account details', href: $data.uri() + '/billing'" class="navSettings" style="padding-left:7px"><i class="icon-cog"></i> Account / Billing</a>
                            </li>
                            <!--ko if:isAdmin-->
                            <li class="dropdown-submenu">
                                <a href="#" data-bind="title:'Administrative Options'" class="navSettings" style="padding-left:7px"><i class="icon-user"></i> Admin</a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="#" data-bind="attr:{href : uri() + '/leads'}"><i class="icon-dollar"></i> Sales</a>
                                    </li>
                                    <li>
                                        <a data-bind="attr:{href:uri() + '/adminlocations'}"><i class="icon-compass"></i> Locations</a>
                                    </li>
                                    <!--                                                <li><a href="#"><i class="icon-list-alt"></i> Posts</a></li>
                                    <li><a href="#"><i class="icon-comments-alt"></i> Feedback</a></li>-->
                                </ul>
                            </li>
                            <!--/ko-->
                            <li class="divider"></li>
                            <li>
                                <a href="/logout?ref=desktop" id="navLogOut" style="padding-left:7px" data-bind="title:'Log Out'"><i class="icon-signout"></i> Log Out</a>
                            </li>
                        </ul>
                    </li>
                    <li class="hidden-desktop" data-bind="if:user">
                        <a href="#" data-bind="attr:{href : user().uri() + '#settings'}"><i class="icon-wrench hidden-desktop"></i> Settings</a>
                    </li>
                    <li class="hidden-desktop" data-bind="if:user">
                        <a href="#" data-bind="attr:{href : user().uri() + '/billing'}"><i class="icon-cog hidden-desktop"></i> Account / Billing</a>
                    </li>
                    <li class="nav-divider"></li>
                    <li class="hidden-desktop" data-bind="if:user() && user().isAdmin()">
                        <a href="#" data-bind="attr:{href : user().uri() + '/leads'}"><i class="icon-dollar hidden-desktop"></i> Admin Sales</a>
                    </li>
                    <li class="hidden-desktop" data-bind="if:user() && user().isAdmin()">
                        <a data-bind="attr:{href:user().uri() + '/adminlocations'}"><i class="icon-compass hidden-desktop"></i> Admin Locations</a>
                    </li>
                    <!--<li class="hidden-desktop"><a href="#"><i class="icon-list-alt"></i> Admin Posts</a></li>-->
                    <!--<li class="hidden-desktop"><a href="#"><i class="icon-comments-alt"></i> Admin Feedback</a></li>-->
                    <!--/ko-->
                    <!--ko ifnot: user-->
                    <li>
                        <a href="/#Register"><i class="icon-hand-right"></i> Register</a>
                    </li>
                    <li class="verticle-divider"></li>
                    <li>
                        <a href="/loginbasic" data-bind="click: initLoginForm"><i class="icon-signin"></i> Log In</a>
                    </li>
                    <!--/ko-->
                </ul>
            </div><!-- /.nav-collapse -->

        </div>
    </div><!-- /navbar-inner -->
</header>
