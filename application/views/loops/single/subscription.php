<? defined('SYSPATH') or die('No direct script access.'); ?>
<div class="grid_1" style="margin:0 15px 0 26px"><span class="bordered ui-icon ui-icon-signal-diag"></span></div>
<div class="grid_7 alpha"><span class="post-author"><?= html::anchor($user_uri, $user_full_name); ?></span>
    <div class="post_meta" style="display:inline"> <?= $info?>&nbsp;<time class="post_time timeago" title="<?= $modified ?>"> <?= Date::fuzzy_span($modified); ?> ago</time> </div>
</div>
<div class="clear"></div>