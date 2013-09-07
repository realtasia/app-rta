<!DOCTYPE html>
<html>
    <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# realtasia: http://ogp.me/ns/fb/realtasia#">
        <?php if (isset($meta) && is_array($meta)): ?>
            <title><?php echo \Arr::get($meta, 'title') . ' - '; ?>Realtasia Singapore</title>
            <?php echo \Arr::get($meta, 'meta'); ?>
        <?php else: ?>
            <title>Realtasia Singapore</title>
        <?php endif; ?>
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <!--<meta name="viewport" content="initial-scale=1">-->
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" type="text/css" href="http://<?php echo RT::COM_SERVER ?>/css/final/css/jquery-ui-boostrap.css" />
        <?php
        echo Assets::factory('all')
          ->merge(TRUE)->process(TRUE)
          ->css('font-awesome.min.css')
          ->css('icons.css')
          ->css('RTA.css')
          ->css('style.css');
        echo Assets::factory('init')
          ->merge(TRUE)->process(TRUE)
          ->js("http://" . RT::COM_SERVER . "/js/jquery.min.js")
          ->js("http://html5shiv.googlecode.com/svn/trunk/html5.js", ['condition' => 'IE'])
          ->js("http://" . RT::COM_SERVER . "/js/placeholder.min.js", ['condition' => 'lte IE 9'])
          ->js("http://" . RT::COM_SERVER . "/js/respond.min.js", ['condition' => 'lte IE 8'])
          ->js("http://" . RT::COM_SERVER . "/js/json.js", ['condition' => 'lte IE 7'])
        ?>
        <!--[if lte IE 9]>
        <script type="text/javascript">
            jQuery && jQuery(document).ready(function($){
                Placeholders=window.Placeholders||{}; Placeholders.init({live:true, hideOnFocus: true});
            })
        </script>
        <![endif]-->
        <style type="text/css">
            a.messageContent{
                margin-bottom: -1px;
                padding: 4px !important;
                cursor:pointer;
            }
            a.messageContent h6{
                margin:0;
                padding:0;
            }
            a.messageContent small{
                width:250px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            a#inboxHeader{
                padding:2px;
                color:#0480be !important;
                text-decoration: underline;
                text-align: center;
            }
        </style>
    </head>
    <body class="no-js relative">
        <div style="min-height:100%">
            <div class="frame">
                <div id="sliderMenu" class="sliderMenu nav-collapse collapse width">
                    <header class="navbar navbar-fixed-top navbar-inverse">
                        <div class="navbar-inner inner">
                            <div class="collapse-inner">
                                <span id="realtLogo">
                                    <a href="/" class="brand" >
                                        <img alt="Realtasia Logo" src="http://static2.realtasia.com.sg/realtlogo6.png" width="160" height="34">
                                    </a>
                                </span>
                                <ul class="nav mainNavPhone hidden-desktop" style="font-size:110%">
                                    <li style="display:none;" data-bind="visible:RTApp.user"><a href="#" data-bind="attr:{href:RTApp.user() && RTApp.user().uri}, title:'Go to your Profile Page'"><i class="icon-home"></i></a></li>
                                    <li style="display:none;" data-bind="visible:RTApp.user"><a href="/logout" data-bind="title:'Log Out'"><i class="icon-signout"></i></a></li>
                                    <li style="display:none;" data-bind="visible:!RTApp.user()"><a href="/loginbasic" data-bind="title:'Log In'"><i class="icon-signin"></i></a></li>
                                </ul>
                                <div class="nav-collapse navbar-responsive-collapse collapse" style="height:0;z-index:1">
                                    <ul class="nav" style="background:#484747;margin-bottom:-2px">
                                        <?php echo $main_menu->render() ?>
                                    </ul>
                                    <ul class="nav pull-right" style="padding-bottom:0;background:#484747;z-index:1">
                                        <li class="hidden-desktop nav-divider"></li>
                                        <!--ko if: user-->
                                        <li style="display:none;margin-right:20px" data-bind="visible:user, title:'This feature is not enabled yet'">
                                            <a href="#" class="visible-desktop clearfix RTNotify"><i class="icon-exclamation"></i></a></li>
                                        <li style="display:none;margin-right:10px" class="dropdown" data-bind="visible:user, with:user">
                                            <a href="#" class="hidden-desktop" data-bind="attr:{href:uri()+'/conversations'}, title:'View Messages'"><span><i class="icon-envelope hidden-desktop"></i></span> Messages <span class="badge badge-important pull-right" data-bind="alertminate:counts.newMessages, text:counts.newMessages, visible:!!counts.newMessages()"></span></a>
                                            <a href="#" id="messagesLink" class="dropdown-toggle visible-desktop RTNotify clearfix" data-toggle="dropdown" data-bind="click:clearMessageCount">
                                                <span class="badge badge-important" style="position:absolute;top:1px;right:0" data-bind="alertminate:counts.newMessages, text:counts.newMessages, visible:!!counts.newMessages()"></span>
                                                <i class="icon-envelope" style="font-size:90%;vertical-align: bottom;"></i>
                                            </a>
                                            <ul class="dropdown-menu span4 clearfix" style="padding:0">
                                                <li><a href="#" id="inboxHeader" class="clearfix" data-bind="attr:{href:uri() + '/conversations'}"><small class="pull-right"><b>Go to Inbox</b></small></a></li>
                                            </ul>
                                        </li>
                                        <li style="display:none;" data-bind="visible:user, with:user" style="padding:0" class="visible-desktop">
                                            <div class="dropdown" id="accountDiv" class="media">
                                                <span class="pull-left">
                                                    <img alt="LoginThumb" width="40" height="40" src="" id="navBarProfilePhoto" data-bind="getAvatar : {context : $data, size : 40}">
                                                </span>
                                                <a id="accountLink" class="media-body" data-bind="attr : {href : uri}">
                                                    Hello <span data-bind="text:name"></span>
                                                </a>
                                            </div>
                                        </li>
                                        <li style="display:none;" class="visible-desktop" data-bind="visible:user, with:user">
                                            <a class="dropdown-toggle visible-desktop" id="desktop-more-link" data-toggle="dropdown" style="margin-top:3px; cursor:pointer">More <b class="caret"></b></a>
                                            <ul class="dropdown-menu" id="mainMoreNav">
                                                <li><a href="#settings" data-bind="title:'Change your personal settings', href: $data.uri() + '#settings'" class="navSettings" style="padding-left:7px"><i class="icon-wrench"></i> Settings</a></li>
                                                <li><a href="/billing" data-bind="title:'View account details', href: $data.uri() + '/billing'" class="navSettings" style="padding-left:7px"><i class="icon-cog"></i> Account / Billing</a></li>
                                                <!--ko if:isAdmin-->
                                                <li class="dropdown-submenu"><a href="#" data-bind="title:'Administrative Options'" class="navSettings" style="padding-left:7px"><i class="icon-user"></i> Admin</a>
                                                    <ul class="dropdown-menu">
                                                        <li><a href="#" data-bind="attr:{href : uri() + '/leads'}"><i class="icon-dollar"></i> Sales</a></li>
                                                        <li><a data-bind="attr:{href:uri() + '/adminlocations'}"><i class="icon-compass"></i> Locations</a></li>
        <!--                                                <li><a href="#"><i class="icon-list-alt"></i> Posts</a></li>
                                                        <li><a href="#"><i class="icon-comments-alt"></i> Feedback</a></li>-->
                                                    </ul>
                                                </li>
                                                <!--/ko-->
                                                <li class="divider"></li>
                                                <li><a href="/logout" id="navLogOut" style="padding-left:7px" data-bind="title:'Log Out'"><i class="icon-signout"></i> Log Out</a></li>
                                            </ul>
                                        </li>
                                        <li class="hidden-desktop" data-bind="if:user"><a href="#" data-bind="attr:{href : user().uri() + '#settings'}"><i class="icon-wrench hidden-desktop"></i> Settings</a></li>
                                        <li class="hidden-desktop" data-bind="if:user"><a href="#" data-bind="attr:{href : user().uri() + '/billing'}"><i class="icon-cog hidden-desktop"></i> Account / Billing</a></li>
                                        <li class="nav-divider"></li>
                                        <li class="hidden-desktop" data-bind="if:user() && user().isAdmin()"><a href="#" data-bind="attr:{href : user().uri() + '/leads'}"><i class="icon-dollar hidden-desktop"></i> Admin Sales</a></li>
                                        <li class="hidden-desktop" data-bind="if:user() && user().isAdmin()"><a data-bind="attr:{href:user().uri() + '/adminlocations'}"><i class="icon-compass hidden-desktop"></i> Admin Locations</a></li>
                                        <!--<li class="hidden-desktop"><a href="#"><i class="icon-list-alt"></i> Admin Posts</a></li>-->
                                        <!--<li class="hidden-desktop"><a href="#"><i class="icon-comments-alt"></i> Admin Feedback</a></li>-->
                                        <!--/ko-->
                                        <!--ko ifnot: user-->
                                        <li><a href="/#Register"><i class="icon-hand-right"></i> Register</a></li>
                                        <li class="verticle-divider"></li>
                                        <li><a href="/loginbasic" data-bind="click: initLoginForm"><i class="icon-signin"></i> Log In</a></li>
                                        <!--/ko-->
                                    </ul>
                                </div><!-- /.nav-collapse -->
                            </div>
                        </div><!-- /navbar-inner -->
                    </header>
                </div>
            </div>
            <div class="view">
                <div class="navbar navbar-inverse">
                    <div class="navbar-inner">
                        <a data-target="#sliderMenu" data-toggle="collapse" class="btn btn-navbar">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </a>
                    </div>
                </div>
            </div>
            <?php
            $r = Request::initial();
            if ($r->controller() === 'home' && $r->action() === 'index'):
                echo $content;
            else:
                ?>
                <section id="container" class="fill" style="padding-bottom:100px;margin-top:40px">
                    <?php echo $leftbar ?>
                    <?php echo $content ?>
                    <?php echo $rightbar ?>
                </section>
            <?php endif; ?>
            <div id="feedbackProfileContent"></div>
        <!--<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&key=[REDACTED]"></script>-->
            <script type="text/javascript">window["RT"] = {version: "1.1.1", API_SERVER: '<?php echo RT::API_SERVER ?>', APP_SERVER: '<?php echo RT::APP_SERVER ?>', COM_SERVER: '<?php echo RT::COM_SERVER ?>', BUCKET: '<?php echo RT::BUCKET ?>', cu: null, at: "<?php echo @base64_encode($at) ?>", st: "<?php echo @base64_encode($st) ?>", cp: null, cl: null, ca: "<?php echo @$ca ?>", clt: "<?php echo @$clt ?>", autoLogin: "<?php echo @$autoLogin ?>"};<?php
            echo $cu ? 'RT.cu="' . base64_encode(json_encode($cu)) . '";' : '';
            echo isset($cp) ? 'RT.cp="' . base64_encode(json_encode($cp)) . '";' : '';
            echo isset($cl) ? 'RT.cl="' . base64_encode(json_encode($cl)) . '";' : '';
            ?></script>
            <!--<script src="http://www.mapquestapi.com/sdk/js/v7.0.s/mqa.toolkit.js?key=Fmjtd%7Cluub256121%2C8a%3Do5-9u8l5u "></script>-->
            <?php
            //if ( ! Fragment::load('assets', Date::YEAR, true)):
            echo Assets::factory('deps')
              //->merge(TRUE)
              //->process(TRUE)
              ->js("compiledjq.js")
              ->js("kodebug.js");
            echo Assets::factory('dep2')
              ->process(TRUE)
              ->js("http://" . RT::COM_SERVER . "/js/plupload/plupload.full.js");
            //Fragment::save();
            //endif;
            echo Assets::factory('finaljs')
              ->merge(TRUE)
              //->process(TRUE)
              //->js("dependancies.min.js")
              ->js("dependancies.js")
              ->js("app.js");
            //->render();
            ?>

            <section id="rttm"><div id="lgf"></div><div id="rgf"></div><div id="admtbl"></div><div id="admsess"></div></section>
            <div style="float:left;min-height:100%;clear:both;"></div>
        </div>
        <footer class="clearfix" id="mainFooter">
            <div class="container-fluid" style="border-top:1px solid #aaa;">
                <div class="centralize">
                    <h4 style="margin:0 auto"><a href="#"><i class="icon-legal"></i>&nbsp;Terms of Use</a></h4><span class="middot">&middot;</span>
                    <h4 style="margin:0 auto"><a href="#"><i class="icon-key"></i>&nbsp;Privacy</a></h4><span class="middot">&middot;</span>
                    <h4 style="margin:0 auto"><a href="#"><i class="icon-phone"></i>&nbsp;Contact Us</a></h4>
                </div>
                <div class="centralize">
                    <h4 style="margin:0 auto"><a target="_blank" href="http://www.facebook.com/realtasia"><i class="icon-facebook icon-2x"></i></a></h4>
                    <h4 style="margin:0 auto"><a target="_blank" href="http://www.twitter.com/realtasia"><i class="icon-twitter icon-2x"></i></a></h4>
                    <h4 style="margin:0 auto"><a target="_blank" href="https://plus.google.com/u/0/b/115564044398517531473/"><i class="icon-google-plus icon-2x"></i></a></h4>
                    <small style="display:block; color:#222">&COPY; 2011 - <?php echo date("Y") ?> RealtAsia Pte Ltd <span class="middot">&middot;</span> 10 Anson Road, International Plaza, #10-11, S(077490) <span class="middot">&middot;</span> Reg: 201025666K</small>
                </div>
            </div>
        </footer>
        <script type="text/javascript">
                var analytics = analytics || [];
                analytics.load = function(e) {
                    var t = document.createElement("script");
                    t.type = "text/javascript", t.async = !0, t.src = ("https:" === document.location.protocol ? "https://" : "http://") + "d2dq2ahtl5zl1z.cloudfront.net/analytics.js/v1/" + e + "/analytics.min.js";
                    var n = document.getElementsByTagName("script")[0];
                    n.parentNode.insertBefore(t, n);
                    var r = function(e) {
                        return function() {
                            analytics.push([e].concat(Array.prototype.slice.call(arguments, 0)))
                        }
                    }, i = ["identify", "track", "trackLink", "trackForm", "trackClick", "trackSubmit", "pageview", "ab", "alias", "ready"];
                    for (var s = 0; s < i.length; s++)
                        analytics[i[s]] = r(i[s])
                };
                analytics.load("ajjkg6zgwa");
                window.Muscula = {settings: {
                        logId: "281c77d5-5402-4739-b4a0-33893b9f1678", suppressErrors: false, branding: 'none'
                    }};
                (function() {
                    var m = document.createElement('script');
                    m.type = 'text/javascript';
                    m.async = true;
                    m.src = window.location.protocol + '//musculahq.appspot.com/Muscula.js';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(m, s);
                    window.Muscula.run = function(c) {
                        eval(c);
                        window.Muscula.run = function() {
                        };
                    };
                    window.Muscula.errors = [];
                    window.onerror = function() {
                        window.Muscula.errors.push(arguments);
                        return window.Muscula.settings.suppressErrors === undefined;
                    }
                })();
        </script>
    </body>
</html>