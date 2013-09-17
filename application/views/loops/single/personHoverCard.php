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
            <a href="#" style="display:block;margin:0;"><small class="muted" style="font-variant:small-caps;font-size:11px">Realt <?php echo in_array('admin', $roles) ? 'Staff' : ucfirst($roles[0]) ?></small></a>
        </div>
        <?php if (!empty($company)): ?>
            <div class="desc"><strong>Works at</strong> <a  href="<?php echo Arr::get($company, 'uri') ?>" title="<?php echo "View " . Arr::get($company, 'name') . "'s profile" ?>"><?php echo Arr::get($company, 'name') ?></a></div>
        <?php endif; ?>
        <?php if (Arr::get($roles, 'agent')): ?>
            <div class="desc"><strong>CEA</strong> <?php echo @$license ?></div>
            <div class="desc"><strong>Listings</strong> <a href="<?php echo $uri ?>/listings"><?php echo Arr::get($counts, 'listings', 0) ?></a></div>
        <?php endif; ?>
        <div class="desc"><strong>Joined</strong> <time title="<?php echo date('c', $created) ?>"><?php echo date('dS M Y', $created) ?></time></div>
        <div class="desc"><strong>Mobile</strong> <span><a href="tel:<?php echo \Arr::get($info['telephone'], 'mobile', 'Private') ?>"><?php echo \Arr::get($info['telephone'], 'mobile', 'Private') ?></a></span></div>
        <div class="desc"><span><?php echo $email ? HTML::mailto($email) : 'Private' ?></span></div>
    </div>
    <div class="bottom">
        <div class="bottom">
            <span class="add-on">
                <i class="info16 people"></i><span><?php echo Arr::get($counts, 'subscribers', 0) ?></span>
            </span>
            <span class="add-on">
                <i class="info16 likeSmall"></i><?php echo Arr::get($counts, 'likers', 0) ?>
            </span>
        </div>
    </div>
</div>
