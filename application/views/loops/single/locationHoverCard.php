<?php defined('SYSPATH') or die('No direct script access.'); ?>
<div class="card hovercard">
    <div class="avatar" style="margin:5px auto;top:5px">
        <a href="/<?php echo $_id ?>" title="Go to <?php echo $name ?>'s profile page">
            <img class="hidden-phone" alt="<?php echo $name ?>" src="<?php echo ($avatar ? 'http://' . str_replace($_id, "$_id/90", $avatar) : 'http://' . RT::API_SERVER . "/avatar/$_id" . "/90"); ?>" width="90" height="90">
            <img class="visible-phone" alt="<?php echo $name ?>" src="<?php echo ($avatar ? 'http://' . str_replace($_id, "$_id/60", $avatar) : 'http://' . RT::API_SERVER . "/avatar/$_id" . "/60"); ?>" width="60" height="60">
        </a>
    </div>
    <div class="info">
        <div class="title">
            <a href="<?php echo $uri ?>"><?php echo $name ?></a>
            <a href="#" style="display:block;margin:0;"><small class="muted" style="font-variant:small-caps;font-size:11px"><?php echo $subtype ?></small></a>
        </div>
        <div class="desc"><strong>Estate</strong> <a href="<?php echo Arr::get($parent, 'uri') ?>" title="<?php echo "View " . Arr::get($parent, 'name') . "'s profile" ?>"><?php echo Arr::get($parent, 'name') ?></a></div>
        <?php if (!empty($property_type)): ?>
            <div class="desc"><strong>Property Type</strong> <a href="#"><?php echo $property_type ?></a></div>
        <?php endif; ?>
        <div class="desc"><strong>Listings</strong> <a href="<?php echo $uri ?>/listings"><?php echo Arr::get($counts, 'listings', 0) ?></a></div>
        <div class="desc"><strong>Last Active</strong> <time title="<?php echo date('c', $modified) ?>"><?php echo Date::fuzzy_span($modified) ?></time></div>
    </div>
    <div class="bottom">
        <span class="add-on">
            <i class="info16 people"></i>&nbsp;<?php echo Arr::get($counts, 'subscribers', 0) ?>
        </span>

        <a title="See likes" href="<?php echo $uri . '/likers' ?>" class="likerHoverCard btn btn-small"><i class="action16 likeSmall btn-link"></i>
            <span><?php echo Arr::get($counts, 'likers', 0) ?></span>
        </a>
    </div>
</div>
