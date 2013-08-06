<article class="media leftContent">
    <div class="pull-left thumbnail">
        <span style="width:50px" class=" ">
            <a href="/<?php $post['user']['_id']?>" title="Go to <?php echo $post['user']['name']?>'s profile page">
                <img alt="<?php echo $post['user']['name']?>" class="img-polaroid" width="50" height="50" src="<?php echo 'http://' .RT::API_SERVER . "/avatar/{$post['user']['_id']}/90"; ?>" alt="<?php echo $post['user']['name'] ?>" />
            </a>
        </span>
    </div> <!-- post profile thumb -->
    <div class="media-body" id="theLoop">
        <div class="postTitle">
            <a href="/<?php echo $post['user']['_id'] ?>" class="personHoverCard"><?php echo $post['user']['name'] ?></a> <?php echo $post['generated_title'] ?>
            <?php
            if ($post['type'] === 'post' || $post['type'] === 'wallpost') {
                $post['type'] = 'post';
                echo "<p>" . Arr::get($post, 'message') . "</p>";
            }
            ?>
            <?php
            if ($post['type'] === 'testimonial') {
                echo "<blockquote><p>{$post['message']}</p><small><cite>{$post['user']['name']}</cite></small></blockquote>";
            }
            ?>
            <small class="muted"><time title="<?php echo date('c', $post['created']) ?>"><?php echo Date::fuzzy_span($post['created']); ?></time></small>
        </div> <!-- post Title -->
        <?php echo View::factory('loops/single/' . $post['type'], (array) $post) ?>
        <?php echo View::factory('loops/comments', $post) ?>
    </div>
</article> <!-- one_post-->
