<?php if (isset($comments) and count($comments) > 0): ?>
    <?php $counter = 0 ?>
    <?php foreach ($comments as $comment): ?>
        <li class="commentContentArea commentBG">
            <div class="commentInline">
                <button class="close" type="button" style="display:none">&times;</button>
                <div class="media">
                    <div class="commentThumb pull-left">
                        <img alt="<?php echo $comment['user']['name']?>" width="40" height="40" src="<?php echo 'http://' .$api . "/avatar/{$comment['user']['_id']}/40"; ?>" />
                    </div>
                    <div class="commentBody media-body">
                        <a href="/<?php echo $comment['user']['_id'] ?>" class="commentAuthor personHoverCard"><?php echo $comment['user']['name'] ?></a>
                        <p><?php echo $comment['excerpt']; ?></p>
                        <div class="commentInfo">
                            <time class="timeAgo" title="<?php echo date('c', $comment['created'])?>"><?php echo Date::fuzzy_span($comment['created']) ?></time>&middot;
                            <span class="commentActions"><i class="action16 likeSmall"></i><a href="#"><?php echo $comment['counts']['likers'] ?></a></span>
                        </div>
                    </div>
                </div>
            </div> <!-- comment inline -->
        </li> <!-- comment -->
        <?php $counter++; ?>
    <?php endforeach; ?>
<?php endif; ?>
