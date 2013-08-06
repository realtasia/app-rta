<?php $cssClass = ['Private Apartments'  => 'APT90', 'Serviced Apartments' => 'SVCAPT90', 'Private Landed'      => 'LND90', 'HDB'                 => 'HDB90', 'estate'              => 'EST90'] ?>
<li class="widgetOuterBox" id="<?php echo $_id ?>">
    <article class="contentArea widgetContentBG relative media location">
        <a class="pull-left" href="#">
            <div style="width:90px;height:90px"><i class="hovercards <?php echo Arr::get($cssClass, $subtype, '') ?>"></i></div>
        </a>
        <div class="contentBottom media-body media-details">
            <h3 class="media-heading">
                <a href="<?php echo $uri ?>" class="locationHoverCard"><?php echo $name ?></a>&nbsp;
                <a href="#"><small class="muted"><?php echo $subtype ?></small></a></h3>
            <ul class="unstyled" style="font-size:90%;">
                <li><strong>Estate</strong> <a href="<?php echo Arr::get($parent, 'uri') ?>" title="<?php echo "View " . Arr::get($parent, 'name') . "'s profile" ?>"><?php echo Arr::get($parent, 'name') ?></a></li>
                <?php if (isset($property_type)): ?>
                    <li><strong>Property Type</strong> <a href="#"><?php echo $property_type ?></a></li>
                <?php endif; ?>
                <li><strong>Listings</strong> <a href="<?php echo $uri . '/listings' ?>"><?php echo Arr::get($counts, 'listings', 0) ?></a></li>
                <li><strong>Last Active</strong> <time title="<?php echo date('c', $modified) ?>"><?php echo Date::fuzzy_span($modified) ?></time></li>
            </ul>
        </div>
        <div class="postActions">
            <ul class="postActionButtons"></ul>
            <ul class="postActionInfo">
                <li data-bind="hoverClass: 'hovering'">
                    <a   title="See subscribers" href="<?php echo $uri . '/subscribers' ?>" class="subscriberHoverCard"><i class="info16 people"></i>
                        <span><?php echo Arr::get($counts, 'subscribers', 0) ?></span>
                    </a></li>
                <li data-bind="hoverClass: 'hovering'">
                    <a   title="See likes" href="<?php echo $uri . '/likers' ?>" class="likerHoverCard"><i class="action16 likeSmall"></i>
                        <span><?php echo Arr::get($counts, 'likers', 0) ?></span>
                    </a></li>
            </ul>
        </div> <!-- postActions -->
    </article>
</li> <!-- location -->