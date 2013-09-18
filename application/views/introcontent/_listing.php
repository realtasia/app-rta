<?php $interact = isset($interactions) ? $interactions : NULL; ?>
<section id="introContent" data-bind="with:cp">
    <h3 style="display:inline-block"><?php echo $name ?></h3> - <span class="pageType"><?php echo ucfirst($subtype) ?></span>
    <?php if ($pid = Arr::get($parent, '_id')): ?>
        <span class="muted">part of the</span>
        <span class="parentDesc" id="e<?php echo $pid ?>"><a href="<?php echo Arr::get($parent, 'uri') ?>"><?php echo Arr::get($parent, 'name') ?> Estate</a></span>
    <?php endif; ?>
    <?php
    if (isset($property_type)) {
        echo ucwords($property_type);
    }
    ?>
    <div class="pageInfo">
        <div class="pageActions">
            <!--ko if : $data.interactions-->
            <!--ko if : $data.subtype() !== 'Estate'-->
            <a data-bind="hoverClass: 'hovering'" class="pageActionsButton btn btn-mini hasActiveState subscribe-link <?php echo $interact && $interact['subscribe'] ? 'active' : '' ?>" style="display:none"  data-bind="visible:$data.interactions, css:{active:$data.interactions.subscribe, hovering:!$data.interactions.subscribe()}, title:($data.interactions.subscribe() ? 'Stop Subscribing to ' : 'Subscribe to ') + name() + '\'s Profile'">
                <i class="action16 subscribe"></i>
                <span data-bind="text:$data.interactions.subscribe() ? 'Unsubscribe' : 'Subscribe'"><?php echo $interact && $interact['subscribe'] ? 'Unsubscribe' : 'Subscribe' ?></span>
            </a>
            <!--/ko-->
            <a data-bind="hoverClass: 'hovering'" class="pageActionsButton btn btn-mini hasActiveState like-link <?php echo $interact && $interact['like'] ? 'active' : '' ?>" style="display:none"  data-bind="visible:$data.interactions, css:{active:$data.interactions.like, hovering:!$data.interactions.like()}, title:($data.interactions.like() ? 'Stop Liking ' : 'Like ') + name() + '\'s Profile'">
                <i class="action16 likeSmall"></i>
                <span data-bind="text:$data.interactions.like() ? 'Unlike' : 'Like'"><?php echo $interact && $interact['like'] ? 'Unlike' : 'Like' ?></span>
            </a>
            <!--/ko-->
            <!--ko if : $root.ca() === 'listings'-->
            <a data-bind="hoverClass: 'hovering'" class="pageActionsButton btn btn-mini hasActiveState" style="display:none" data-bind="click:$root.startEditMode, title:'Manage Listings', visible:$root.cpuIsCu">
                <i class="action16 edit"></i>
                <span>Manage Listings</span>
            </a>
            <!--/ko-->
            <!--ko if : $root.cpuIsCu-->
            <a data-bind="hoverClass: 'hovering'" class="pageActionsButton btn btn-mini hasActiveState" style="display:none" data-bind="click:editProfile, title:'Edit your profile', visible:$root.cpuIsCu">
                <i class="action16 edit"></i>
                <span>Edit Page</span>
            </a>
            <!--/ko-->
        </div>
    </div>
    <!--ko if : $data.pictures-->
    <ul class="thumbnails latestThumbsContainer" data-bind="serverForEach : {name : 'pictures', foreach:pictures}">

    </ul>
    <!--/ko-->
</section> <!--  introcontent -->