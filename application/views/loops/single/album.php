<?php defined('SYSPATH') or die('No direct script access.'); ?>
<article class="relative">
    <?php if(!empty($attachments)): ?>
    <div class="" style="margin-left:0" id="thumb<?php echo $_id?>">
        <?php foreach($attachments as $a): ?>
            <a href="//<?php echo $a['picture'];?>" target="_blank" class="thumbnail grid slideShow" rel="<?echo $_id?>" title="<?php echo isset($a['excerpt']) ? $a['excerpt'] : $a['name']?>">
                <img alt="<?php echo isset($a['excerpt']) ? $a['excerpt'] : $a['name']?>" src="//<?php echo str_replace($user['_id'], $user['_id'] . "/110", $a['picture']) ?>" width="110" />
            </a>
        <?php endforeach;?>
    </div> <!-- listings thumbnail -->
    <?php endif;?>
    <div class="contentBottom media-body media-details">
        <p class="thumbPostDesc"></p>
    </div> <!-- listings content -->
</article>
