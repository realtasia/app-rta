<?php defined('SYSPATH') or die('No direct script access.'); ?>
<?php if (!empty($cl)) : foreach ($cl as $post) : ?>
<article class="postFeed media relative clearfix" id="<?php echo $post['_id'];?>">
            <div class="pull-left">
                <span style="width:60px">
                    <a href="/<?php echo $post['user']['_id']?>" title="/<?php echo $post['user']['name']?>" class="drop-shadow curved thumbnail">
                        <img class="hidden-phone" style="width:60px; height:60px;" width="60" height="60" alt="<?php echo $post['user']['name']?>" width="50" height="50" src="<?php echo'http://' .$api . "/avatar/{$post['user']['_id']}/90"; ?>" />
                        <img class="visible-phone" style="width:40px; height:40px;" alt="<?php echo $post['user']['name']?>" width="40" height="40" src="<?php echo'http://' .$api . "/avatar/{$post['user']['_id']}/40"; ?>">
                    </a>
                </span>
            </div> <!-- post profile thumb -->
            <div class="media-body">
                <div class="postTitle">
                    <a href="/<?php echo $post['user']['_id']?>" class="personHoverCard"><?php echo $post['user']['name']?></a>
                    <span><?php echo $post['generated_title']?></span><small class="muted">
                        <time title="<?php echo date('c', $post['created'])?>"><?php echo Date::fuzzy_span( $post['created']);?></time></small>
                    <?php if ($post['type'] === 'post' || $post['type'] === 'wallpost' || $post['type'] === 'listing'){$post['type'] = 'post'; echo "<p class='post-content'>".Arr::get($post, 'excerpt')."</p>";}?>
                    <?php if ($post['type'] === 'testimonial'):?>
                        <div class="clearfix" style="margin:10px auto">
                            <blockquote><p><?php echo $post['excerpt']?></p><small><cite><?php echo $post['user']['name']?></cite></small></blockquote>
                    <?php endif;?>
                </div> <!-- post Title -->
                <?php echo View::factory('loops/single/' . $post['type'], (array) $post) ?>
                <?php echo View::factory('loops/comments', $post) ?>
            </div>
        </article> <!-- one_post-->
<?php endforeach; endif; ?>
