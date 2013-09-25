<?php $interact = isset($interactions) ? $interactions : NULL; ?>
<ul class="small-block-grid-4 visible-phone" id="phoneProfileNav" data-bind="with:RTApp.cp" role="menu" aria-labelledby="mInfo mFeed mListings">
    <li data-bind="css : {active : RTApp.ca() === 'info'}"><a href="#" id="mInfo" data-bind="attr : {href : uri() + '/info'}"><i class="sideNavIcon icon-info-sign"></i>&nbsp;Info</a></li>
    <li data-bind="css : {active : RTApp.ca() === 'feed'}"><a href="#" id="mFeed" data-bind="attr : {href : uri() + '/feed'}"><i class="sideNavIcon icon-list-alt"></i>&nbsp;Feed</a></li>
    <li data-bind="css : {active : RTApp.ca() === 'listings'}"><a href="#" id="mListings" data-bind="attr : {href : uri() + '/listings'}"><i class="sideNavIcon icon-list"></i>&nbsp;Listings</a></li>
    <li class="dropdown pull-right">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#" ><i class="sideNavIcon icon-ellipsis-vertical"></i>&nbsp;More</a>
        <ul class="dropdown-menu pull-left" role="menu" aria-labelledby="dLabel">
            <li class="text-left">
                <a data-bind="attr:{href:uri() + '/media'}">
                    <i class="sideNavIcon icon-camera"></i>&nbsp;Photos
                </a>
            </li>
            <li class="dropdown-submenu pull-left text-left" data-bind="visible:RTApp.cpIsCu, hoverClass:'hovering', css : {active : RTApp.ca() === 'testimonials'}">
                <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                    <span class="sideNavIcon"><i class="icon-user"></i><i class="icon-comment-alt superscript"></i></span>&nbsp;Testimonials
                </a>
                <ul data-bind="" class="dropdown-menu">
                    <li class="text-left"><a data-bind="attr:{href:uri() + '/testimonials/received'}">Received <span class="hidden-phone badge" data-bind="text:counts.testimonials.received"></span></a></li>
                    <li class="text-left"><a data-bind="attr:{href:uri() + '/testimonials/written'}">Written <span class="hidden-phone badge" data-bind="text:counts.testimonials.written"></span></a></li>
                </ul>
            </li>
            <li class="dropdown-submenu pull-left text-left" style="display:none" data-bind="visible:RTApp.cpIsCu, hoverClass:'hovering', css : {active : RTApp.ca() === 'subscriptions'}">
                <a href="<#" data-toggle="dropdown" class="dropdown-toggle">
                    <i class="sideNavIcon icon-rss-sign"></i>
                    <span>&nbsp;Subscriptions&nbsp;</span>
                </a>
                <ul data-bind="" class="dropdown-menu">
                    <li class="text-left"><a data-bind="attr:{href:uri() + '/subscriptions/people'}">People</a></li>
                    <li class="text-left"><a data-bind="attr:{href:uri() + '/subscriptions/locations'}">Locations</a></li>
                </ul>
            </li>
        </ul>
    </li>
</ul>
<section id="introContent" data-bind="with:cp" role="main" aria-labelledby="headerTitle headerTitleSmall">
    <div class="hidden-phone">
        <h3 id="headerTitle" style="display:inline-block"><?php echo $name ?></h3> - <span class="pageType"><?php echo ucfirst($subtype) ?></span>
        <?php if ($pid      = Arr::get($parent, '_id')): ?>
            <span class="muted">part of the</span>
            <span class="parentDesc" id="e<?php echo $pid ?>"><a href="<?php echo Arr::get($parent, 'uri') ?>"><?php echo Arr::get($parent, 'name') ?> Estate</a></span>
        <?php endif; ?>
        <?php
        if (isset($property_type))
        {
            echo ucwords($property_type);
        }
        ?>
    </div>
    <div class="media visible-phone">
        <div style="width:90px;height:90px" class="pull-left"><i class="hovercards" data-bind="attr:{'class':RTApp.cpIconClass(90)}"></i></div>
        <div class="media-body">
            <h5 style="display:inline-block" class="noMargTopBtm" id="headerTitleSmall">
                <?php
                echo $name;
                ?> - <small class="pageType"><?php echo ucfirst($subtype) ?></small>
                <?php if ($pid = Arr::get($parent, '_id')): ?>
                    <small class="muted">part of the</small>
                    <small class="parentDesc" id="e<?php echo $pid ?>"><a href="<?php echo Arr::get($parent, 'uri') ?>"><?php echo Arr::get($parent, 'name') ?> Estate</a></small>
                <?php endif; ?>
                <?php
                if (isset($property_type))
                {
                    echo ucwords($property_type);
                }
                ?>
            </h5>
        </div>
    </div>
    <div class="pageInfo">
        <div class="pageActions">
            <div class="btn-toolbar">
                <div class="btn-group pull-left">
                    <!--ko if : $root.ca() === 'testimonials'-->
                    <a class="btn btn-small" style="display:none" data-bind="click:$root.startEditMode, title:'Manage Testimonials', visible:$root.cpuIsCu">
                        <i class="icon-tasks"></i>
                        <span>Manage Approvals</span>
                    </a>
                    <!--/ko-->
                    <!--ko if : $root.cpuIsCu-->
                    <a class="btn btn-small" style="display:none" data-bind="click:editProfile, title:'Edit your profile', visible:$root.cpuIsCu">
                        <i class="icon-pencil"></i> <span>Edit Page</span>
                    </a>
                    <!--/ko-->
                </div>
                <div class="btn-group pull-right">
                    <!--ko if : $data.interactions-->
                    <!--ko if : $data.subtype() !== 'Estate'-->
                    <a class="btn btn-small subscribe-link <?php echo $interact && $interact['subscribe'] ? 'active' : '' ?>" style="display:none"  data-bind="visible:$data.interactions, css:{active:$data.interactions.subscribe, hovering:!$data.interactions.subscribe()}, title:($data.interactions.subscribe() ? 'Stop Subscribing to ' : 'Subscribe to ') + name() + '\'s Profile'">
                        <i class="action16 subscribe"></i>
                        <span data-bind="text:$data.interactions.subscribe() ? 'Unsubscribe' : 'Subscribe'"><?php echo $interact && $interact['subscribe'] ? 'Unsubscribe' : 'Subscribe' ?></span>
                    </a>
                    <!--/ko-->
                    <a class="btn btn-small like-link <?php echo $interact && $interact['like'] ? 'active' : '' ?>" style="display:none"  data-bind="visible:$data.interactions, css:{active:$data.interactions.like, hovering:!$data.interactions.like()}, title:($data.interactions.like() ? 'Stop Liking ' : 'Like ') + name() + '\'s Profile'">
                        <i class="action16 likeSmall"></i>
                        <span data-bind="text:$data.interactions.like() ? 'Unlike' : 'Like'"><?php echo $interact && $interact['like'] ? 'Unlike' : 'Like' ?></span>
                    </a>
                    <!--/ko-->
                </div>
            </div>
        </div>
        <!--ko if : $data.pictures-->
        <ul class="thumbnails latestThumbsContainer" data-bind="serverForEach : {name : 'pictures', foreach:pictures}">

        </ul>
        <!--/ko-->
</section> <!--  introcontent -->