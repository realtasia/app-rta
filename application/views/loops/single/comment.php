<?php if (isset($comments) and count($comments) > 0): ?>
    <?php $counter = 0 ?>
    <?php foreach ($comments as $comment): ?>
        <li class="commentContentArea commentBG">
            <div class="commentInline media-list">
                <button class="close" type="button" style="display:none"><i class="icon-remove"></i></button>
                <div class="media">
                    <div class="commentThumb visible-desktop pull-left">
                        <img alt="<?php echo $comment['user']['name']?>" width="40" height="40" src="<?php echo 'http://' .$api . "/avatar/{$comment['user']['_id']}/40"; ?>" />
                    </div>
                    <div class="commentBody media-body">
                        <div class="commentThumb hidden-desktop" style="float:left;margin-right:2%">
                            <img alt="<?php echo $comment['user']['name']?>" width="40" height="40" src="<?php echo 'http://' .$api . "/avatar/{$comment['user']['_id']}/40"; ?>" />
                        </div>
                        <a href="/<?php echo $comment['user']['_id'] ?>" class="commentAuthor personHoverCard"><?php echo $comment['user']['name'] ?></a>
                        <p><?php echo $comment['excerpt']; ?></p>
                        <span class="commentInfo" style="display: inline-block">
                            <small class="muted"><time class="timeAgo" title="<?php echo date('c', $comment['created'])?>"><?php echo Date::fuzzy_span($comment['created']) ?></time></small>
                            <span class="commentActions">
                                <a href="#" class="likerHoverCard"><i class="action16 likeSmall"></i><?php echo $comment['counts']['likers'] ?></a>
                            </span>
                        </span>
                    </div>
                </div>
            </div> <!-- comment inline -->
        </li> <!-- comment -->
        <?php $counter++; ?>
    <?php endforeach; ?>
<?php endif; ?>