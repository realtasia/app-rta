<?php defined('SYSPATH') or die('No direct script access.'); ?>
<section class="hoverCard">
    <div class="media" style="padding:0 5px">
        <a class="pull-left" href="#">
            <div style="width:90px;height:90px"><i class="hovercards <?php echo Arr::get($cssClass, $subtype, '') ?>"></i></div>
        </a>
        <div class="media-body">
            <h4 class="media-heading" style="font-size:95%">
                <a href="<?php echo $uri ?>" class="locationHoverCard"><strong><?php echo $name ?></strong></a>&nbsp;
                <a href="#">
                    <small class="muted" style="font-variant:small-caps;font-size:0.9em"><?php echo $subtype ?></small>
                </a>
            </h4>
            <ul class="unstyled" style="font-size:90%;border-top:1px solid #ccc;padding:5px">
                <?php if ($type !== 'Estate'): ?>
                <li><strong>Estate</strong> <a href="<?php echo Arr::get($parent, 'uri') ?>" title="<?php echo "View " . Arr::get($parent, 'name') . "'s profile" ?>"><?php echo Arr::get($parent, 'name') ?></a></li>
                <?php endif; ?>
                <?php if (isset($property_type)): ?>
                    <li><strong>Property Type</strong> <a href="#"><?php echo $property_type ?></a></li>
                <?php endif; ?>
                <li><strong>Listings</strong> <a href="<?php echo $uri . '/listings' ?>"><?php echo Arr::get($counts, 'listings', 0) ?></a></li>
                <li><strong>Last Active</strong> <time title="<?php echo date('c', $modified) ?>"><?php echo Date::fuzzy_span($modified) ?></time></li>
            </ul>
        </div>
    </div>
    <!--        <ul class="nav nav-pills" style="margin:5px -5px 0 5px;font-size:80%">
            <li class="active"><a href="#" style="border-radius:0;">Info</a></li>
            <li><a href="#" style="border-radius:0;">Bar Code</a></li>
        </ul>-->
</section>
