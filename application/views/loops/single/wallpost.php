<?php defined('SYSPATH') or die('No direct script access.'); ?>
<article class="relative media">
    <div class="pull-left" style="display:<?php echo ($picture && $link['type'] !=='video') ? 'block' : 'none' ?>">
        <div class="thumbnail" style="margin-bottom: 5px;display:<?php echo $link['type'] !=='video' ? 'none' : 'block' ?>">
            <a href="<?php echo $link['src'];?>" target="_blank" class="external_link">
                <img src="/img/play_button.png" style="background:URL(<?php echo $picture ?>) center center black; background-size: 130px 100px; height:100px;width:130px"/>
            </a>
            <span class="thumbLinks"><a href="<?php echo Arr::get($link['provider'], 'url'); ?>"><?php echo Arr::get($link['provider'], 'name'); ?></a></span>
        </div>
        <a href="<?php echo $link['src'];?>" target="_blank" class="external_link" display:<?php echo $link['type'] !=='video' ? 'block' : 'none' ?>">
            <img src="<?php echo $picture ?>" style="width:110px" />
        </a>
    </div> <!-- listings thumbnail -->
    <div class="contentBottom media-body media-details">
        <p class="thumbPostDesc">
            <a href="<?php echo $link['src'];?>" target="_blank" class="external_link"></a><br>
            <span><?php echo $link['description'];?></span>
        </p>
    </div> <!-- listings content -->
</article>