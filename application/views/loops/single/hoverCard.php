<?php defined('SYSPATH') or die('No direct script access.'); ?>

<section class="hoverCard">
    <div class="media" style="padding:0 5px">
        <div class="pull-left">
            <a href="/<?php echo $_id?>" title="Go to <?php echo $name?>'s profile page">
                <img class="hidden-phone" alt="<?php echo $name?>" src="<?php echo ($avatar ? 'http://' . str_replace($_id, "$_id/90", $avatar) : 'http://' .RT::API_SERVER . "/avatar/$_id" . "/90"); ?>" width="90" height="90">
                <img class="visible-phone" alt="<?php echo $name?>" src="<?php echo ($avatar ? 'http://' . str_replace($_id, "$_id/60", $avatar) : 'http://' .RT::API_SERVER . "/avatar/$_id" . "/60"); ?>" width="60" height="60">
            </a>
        </div>
        <div class="media-body">
            <h4 class="media-heading" style="font-size:95%">
                <a href="<?php echo $uri ?>" class="personHoverCard"><strong><?php echo $name ?></strong></a>&nbsp;
                <a href="#">
                    <small class="muted" style="font-variant:small-caps;font-size:0.9em">Realt <?php echo in_array('admin', $roles) ? 'Staff' : ucfirst($roles[0]) ?></small>
                </a>
            </h4>
            <ul class="unstyled" style="font-size:90%;border-top:1px solid #ccc;padding:5px">
                <?php if (!empty($company)): ?>
                    <li><strong>Works at</strong> <a  href="<?php echo Arr::get($company, 'uri') ?>" title="<?php echo "View " . Arr::get($company, 'name') . "'s profile" ?>"><?php echo Arr::get($company, 'name') ?></a></li>
                <?php endif; ?>
                <?php if (Arr::get($roles, 'agent')): ?>
                    <li><strong>CEA</strong> <?php echo @$license ?></li>
                    <li><strong>Listings</strong> <a href="<?php echo $uri ?>/listings"><?php echo Arr::get($counts, 'listings', 0) ?></a></li>
                <?php endif; ?>
                <li><strong>Joined</strong> <time title="<?php echo date('c', $created) ?>"><?php echo date('dS M Y', $created) ?></time></li>
                <li><strong>Last Active</strong> <time title="<?php echo date('c', $modified) ?>"><?php echo Date::fuzzy_span($modified) ?></time></li>
                <li><strong>Mobile</strong> <span><a href="tel:<?php echo \Arr::get($info['telephone'],'mobile', 'Private')?>"><?php echo \Arr::get($info['telephone'],'mobile', 'Private')?></a></span></li>
                <li><strong>Email</strong> <span><?php echo $email ? HTML::mailto($email) : 'Private'?></span></li>
            </ul>
        </div>
    </div>
    <!--        <ul class="nav nav-pills" style="margin:5px -5px 0 5px;font-size:80%">
            <li class="active"><a href="#" style="border-radius:0;">Info</a></li>
            <li><a href="#" style="border-radius:0;">Bar Code</a></li>
        </ul>-->
</section>
