<!DOCTYPE html>
<html>
    <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# realtasia: http://ogp.me/ns/fb/realtasia#">
        <title><?php echo $title . ' - '; ?>Realtasia Singapore</title>
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <meta name="viewport" content="initial-scale=1">
        <link rel="stylesheet" type="text/css" href="http://<?php echo RT::COM_SERVER ?>/css/final/css/jquery-ui-boostrap.css" />
        <?php
        echo Assets::factory('all')
          ->merge(TRUE)->process(TRUE)
          ->css('font-awesome.min.css')
          ->css('icons.css')
          ->css('RTA.css')
          ->css('style.css');
        ?>
        <style type="text/css">

        </style>
    </head>
    <body>
        <div class="container" style="margin-top:25px">
            <div class="centralize outerBox">
                <div class="contentArea newWidgetContentBG">
                    <h2>Oops! <?php echo $title ?></h2>
                    <?php if ($page): ?><h3><?php echo $message ?></h3><?php endif; ?>
                    <?php if ($message): ?><p><?php echo $message ?></p><?php endif; ?>
                </div>
            </div>
        </div>

    </body>
</html>