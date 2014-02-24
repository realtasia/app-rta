<!DOCTYPE html>
<html>
    <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# realtasia: http://ogp.me/ns/fb/realtasia#">
        <title><?php echo $title . ' - '; ?>Realtasia Singapore</title>
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <meta name="viewport" content="initial-scale=1">
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
          ->js("http://" . RT::APP_SERVER . "/js/json2.js", ['condition' => 'lte IE 9'])
          ->js("http://" . RT::COM_SERVER . "/js/respond.min.js", ['condition' => 'lte IE 8'])
          ->js("lte-ie7.js", ['condition' => 'lte IE 7'])?>
    </head>
    <body>
        <div class="container" style="margin-top:25px;height:auto;">
	        <div class="centralize contentArea">
<img src="/img/RealTAsiaLogoFull.png" style="width:auto;max-height:150px;margin-bottom:1em">	        	
	        	<h1><?php echo $title ?></h1>       
	        </div>
        </div>
        <div class="outerBox">        
            <div class="contentArea text-center" style="background:rgba(250, 248, 221, 0.91);width:auto">
                
                <?php if ($page): ?><h3><?php echo $message ?></h3><?php endif; ?>
                <p class="lead" style="padding:0 10px;">Click <a href="/">here</a> to go back to the home page.
                <?php

				$r = Request::initial() -> referrer();
				if (!empty($r)) {
					echo "<br> or click <a href='$r'>here</a> to go back to the previous page.";
				}
                ?>
                </p>
            </div>
        </div>
    </body>
</html>