<?php defined('SYSPATH') or die('No direct script access.');
if(!empty($link)): ?>
<article class="relative media" style="padding-top:10px;">
    <div class="pull-left" style="display:<?php echo ($picture && $link['type'] !=='video') ? 'block' : 'none' ?>">
        <a href="<?php echo $link['src'];?>" target="_blank" class="external_link" style="display:<?php echo $link['type'] !=='video' ? 'block' : 'none' ?>">
            <img src="<?php echo $picture ?>" style="width:110px" />
        </a>
    </div> <!-- listings thumbnail -->
    <div class="contentBottom media-body media-details">
        <?php if($link['type'] ==='video'): ?>
        <div class="thumbnail videoPreview">
            <a href="<?php echo $link['src'];?>" target="_blank" class="external_link">
                <img src="/img/play_button.png" style="background:URL(<?php echo $picture ?>) center center black; background-size: 440px 300px; height:247px;width:440px"/>
            </a>
        </div>
        <?php endif;?>
        <p class="thumbPostDesc">
            <a href="<?php echo $link['src'];?>" target="_blank" class="external_link"><?php echo Arr::get($link, 'name');?></a><br>
            <span><?php echo Arr::get($link, 'description');?></span>
        </p>
    </div> <!-- listings content -->
</article>
<?php endif;?>