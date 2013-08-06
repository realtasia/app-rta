<?php defined('SYSPATH') or die('No direct script access.'); ?>
<?php if(!empty($picture)): ?>
<article class="relative media">
    <div class="pull-left" style="display:<?php echo $picture ? 'block' : 'none' ?>">
        <a href="<?php echo $uri;?>" target="_blank" class="external_link">
            <img src="<?php echo 'http://' . str_replace($user['_id'], $user['_id'] . "/110", $picture) ?>" alt="<?php echo isset($excerpt) ? $excerpt : $name?>" style="width:110px" width="110" />
        </a>
    </div> <!-- listings thumbnail -->
    <div class="contentBottom media-body media-details">
        <p class="thumbPostDesc">

        </p>
    </div> <!-- listings content -->
</article>
<?php endif;?>