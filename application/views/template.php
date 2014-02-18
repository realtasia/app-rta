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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <?php
        echo Assets::factory('all')
          ->merge(TRUE)
          ->css('jquery-boostrap.css')
          ->css('RTA.css')
          ->css('style.css')
          ->css('font-awesome.min.css')
          ->css('icons.css');
        echo Assets::factory('init')
          ->merge(TRUE)
          ->js("http://" . RT::COM_SERVER . "/js/jquery.min.js")
          ->js("http://html5shiv.googlecode.com/svn/trunk/html5.js", ['condition' => 'IE'])
          ->js("http://" . RT::COM_SERVER . "/js/placeholder.min.js", ['condition' => 'lte IE 9'])
          ->js("http://" . RT::COM_SERVER . "/js/respond.min.js", ['condition' => 'lte IE 8'])
          ->js("http://" . RT::COM_SERVER . "/js/json.js", ['condition' => 'lte IE 7'])
          ->js("lte-ie7.js", ['condition' => 'lte IE 7'])
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
    <body class="no-js relative" style="display:none;">
        <div class="page-wrap">
            <?php
            include_once(Kohana::find_file('views', 'header'));
            $r = Request::initial();
            if ($r->controller() === 'home' && $r->action() === 'index'):
                echo $content;
            else:
                ?>
                <section id="container" class="container-fluid fill" style="padding-bottom:100px;">
                    <?php echo $leftbar ?>
                    <?php echo $content ?>
                    <?php echo $rightbar ?>
                </section>
            <?php endif; ?>
            <div id="feedbackProfileContent"></div>
        <!--<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&key=[REDACTED]"></script>-->
            <script type="text/javascript">window["RT"] = {version: "0.2.1", API_SERVER: '<?php echo RT::API_SERVER ?>', APP_SERVER: '<?php echo RT::APP_SERVER ?>', COM_SERVER: '<?php echo RT::COM_SERVER ?>', BUCKET: '<?php echo RT::BUCKET ?>', cu: null, at: "<?php echo @base64_encode($at) ?>", st: "<?php echo @base64_encode($st) ?>", cp: null, cl: null, ca: "<?php echo @$ca ?>", clt: "<?php echo @$clt ?>", autoLogin:"<?php echo @$autoLogin ?>"};<?php
            echo $cu ? 'RT.cu="' . base64_encode(json_encode($cu)) . '";' : '';
            echo isset($cp) ? 'RT.cp="' . base64_encode(json_encode($cp)) . '";' : '';
            echo isset($cl) ? 'RT.cl="' . base64_encode(json_encode($cl)) . '";' : '';
            ?></script>
        <!-- <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyC6-y0MkWb9eaFLz_HWMQlWhtgo-HAtDEE&sensor=true"></script> -->


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
            <?php
            //if ( ! Fragment::load('assets', Date::YEAR, true)):
            echo Assets::factory('deps')
              ->merge(TRUE)
              ->process(TRUE)
              ->js("compiledjq.js")
              ->js("kodebug.js");
            echo Assets::factory('dep2')
              ->process(TRUE)
              ->js("http://" . RT::COM_SERVER . "/js/plupload/plupload.full.min.js")
              ->js("http://" . RT::SOCK_SERVER . "/socket.io/socket.io.js");
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
        <script type="text/javascript">
			var analytics = analytics || [];
			analytics.load = function(e) {
				var t = document.createElement("script");
				t.type = "text/javascript", t.async = !0, t.src = ("https:" === document.location.protocol ? "https://" : "http://") + "d2dq2ahtl5zl1z.cloudfront.net/analytics.js/v1/" + e + "/analytics.js";
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
			analytics.load(RT.APP_SERVER === "realtasia.com.sg" ? "9pmcbdqqhz" : "ajjkg6zgwa");
        </script>
    </body>
</html>