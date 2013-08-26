<div class="postActions" style="display:none">
    <ul class="postActionButtons">
        <li data-bind="hoverClass: 'hovering'" style="<?php if (!isset($actions['share'])) echo 'display:none'; ?>">
            <a href="#"><i class="action20 share"></i></a></li>
        <li data-bind="hoverClass: 'hovering'" style="<?php if (!isset($actions['subscribe'])) echo 'display:none'; ?>">
            <a href="#" class="subscribe-link"><i class="action20 subscribe"></i></a></li>
        <li data-bind="hoverClass: 'hovering'" style="<?php if (!isset($actions['like'])) echo 'display:none'; ?>">
            <a href="#" class="like-link"><i class="action20 like"></i></a></li>
    </ul>
    <ul class="postActionInfo">
        <li data-bind="hoverClass: 'hovering'" style="<?php if (!isset($connections['comments'])) echo 'display:none'; ?>">
            <a href="#"><i class="action16 comments"></i><small class="muted"><?php echo count($comments) ?> of </small><small class="muted"><?php echo $counts['comments'] ?></small></a></li>
        <li data-bind="hoverClass: 'hovering'"  style="<?php if (!isset($connections['subscribers'])) echo 'display:none'; ?>">
            <a href="#"><i class="info16 people"></i><small class="muted"><?php echo $counts['subscribers'] ?></small></a></li>
        <li data-bind="hoverClass: 'hovering'" style="<?php if (!isset($connections['likers'])) echo 'display:none'; ?>">
            <a href="#"><i class="action16 likeSmall"></i><small class="muted"><?php echo $counts['likers'] ?></small></a></li>
    </ul>
</div> <!-- post action links -->
<?php if ($counts['comments'] > 0): ?>
    <div class="indentedComment">
        <ul class="commentList contentArea commentBG" id="forPost<?php echo $_id ?>">
            <?php echo View::factory('loops/single/comment')->set('comments', $comments); ?>
        </ul> <!-- comments -->
    </div> <!-- comment OuterBox-->
<?php endif; ?>