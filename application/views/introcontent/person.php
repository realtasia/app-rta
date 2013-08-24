<?php $interact = isset($interactions) ? $interactions : NULL; ?>
<ul class="small-block-grid-4 visible-phone grid-fix rtResponsiveMenu" data-bind="with:RTApp.cp">
    <li data-bind="css : {active : RTApp.ca() === 'info'}"><a href="#" data-bind="attr : {href : uri() + '/info'}"><i class="sideNavIcon icon-info-sign"></i>&nbsp;About</a></li>
    <li data-bind="css : {active : RTApp.ca() === 'feed'}"><a href="#" data-bind="attr : {href : uri() + '/feed'}"><i class="sideNavIcon icon-list-alt"></i>&nbsp;Feed</a></li>
    <li data-bind="css : {active : RTApp.ca() === 'listings'}"><a href="#" data-bind="attr : {href : uri() + '/listings'}"><i class="sideNavIcon icon-list"></i>&nbsp;Listings</a></li>
    <li class="dropdown pull-right">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#" ><i class="sideNavIcon icon-ellipsis-vertical"></i>&nbsp;More</a>
        <ul class="dropdown-menu pull-left" role="menu" aria-labelledby="dLabel">
            <li class="text-left">
                <a href="#media">
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
<section id="introContent" data-bind="with:cp" class="relative">
    <div class="media hidden-phone">
        <h3 style="display:inline-block;"><?php echo $name ?></h3>
        <span class="pageType"><?php echo $designation ? '&nbsp;&nbsp;-&nbsp;&nbsp;' . $designation . ', ' : ''; ?></span>
        <span class="parentDesc">
            <a class="smallCaps" href="<?php echo!empty($company) ? $company['uri'] : '' ?>"><?php echo!empty($company) ? ucwords(strtolower($company['name'])) : '' ?></a>
        </span>
        <?php if(isset($message)):?><blockquote><?php echo $message ?></blockquote><?php endif;?>
    </div>
    <div class="media visible-phone">
        <div class="pull-left">
            <img alt="User Profile Photo" id="mobileProfilePhoto" src="<?php echo ($avatar ? 'http://' . str_replace($_id, $_id . "/90", $avatar) : 'http://' . $api . "/avatar/{$_id}" . "/90"); ?>" title="<?php echo $name ?>">
        </div>
        <div class="media-body">
            <h5 style="display:inline-block" class="noMargTopBtm">
                <?php
                echo $name;
                echo $designation ? '&nbsp;&nbsp;-&nbsp;&nbsp;' . $designation . ', ' : '';
                ?>
                <a class="smallCaps" href="<?php echo!empty($company) ? $company['uri'] : '' ?>"><?php echo!empty($company) ? ucwords(strtolower($company['name'])) : '' ?></a>
            </h5>
            <?php if(isset($message)):?><blockquote style="display:none;" data-bind="visible:RTApp.ca() === 'info'"><?php echo $message ?></blockquote><?php endif;?>
        </div>
    </div>
    <div class="pageInfo clearfix" style="display:none;" data-bind="visible:$root.cpIsCu() ||$data.interactions">
        <div class="btn-toolbar noMargTopBtm">
            <div class="btn-group pull-left">
                <span style="display:inline-block">
                    <!--ko if : $root.ca() === 'testimonials'-->
                    <a class="btn btn-small" style="display:none" data-bind="click:$root.startEditMode.bind($root), title:'Manage Testimonials', visible:$root.cpIsCu">
                        <i class="icon-tasks"></i> <span>Manage Approvals</span>
                    </a>
                    <!--/ko-->
                    <!--ko if : $root.cpIsCu-->
                    <a href="#edit" class="btn btn-small" style="display:none" data-bind="title:'Edit your profile', visible:$root.cpIsCu">
                        <i class="icon-pencil"></i> <span>Edit Profile</span>
                    </a>
                    <span class="visible-phone" data-bind="with:$root.user">
                        <a class="btn btn-small btn-rta" style="display:none" data-bind="click:$root.initListings.bind($root), title:'Create a Listing', visible:isAdmin() || isAgent()">
                            <i class="icon-plus-sign"></i> <span>New Listing</span>
                        </a>
                    </span>
                    <!--/ko-->
                </span>
            </div>
            <div class="btn-group pull-right">
                <!--ko if : $data.interactions-->
                <a class="btn btn-small subscribe-link <?php echo $interact && $interact['subscribe'] ? 'active' : '' ?>" style="display:none"  data-bind="visible:$data.interactions, css:{active:$data.interactions.subscribe, hovering:!$data.interactions.subscribe(), 'btn-medium':RTApp.isSmallerThanTablet, 'btn-small':RTApp.isTabletOrLarger}, title:($data.interactions.subscribe() ? 'Stop Subscribing to ' : 'Subscribe to ') + name() + '\'s Profile'">
                    <i class="action16 subscribe"></i>
                    <span class="hidden-phone" data-bind="text:$data.interactions.subscribe() ? 'Unsubscribe' : 'Subscribe'"><?php echo $interact && $interact['subscribe'] ? 'Unsubscribe' : 'Subscribe' ?></span>
                    <span class="badge badge-blue visible-phone visible-tablet" data-bind="text:counts.subscribers"></span>
                </a>
                <a class="btn btn-small like-link <?php echo $interact && $interact['like'] ? 'active' : '' ?>" style="display:none"  data-bind="visible:$data.interactions, css:{active:$data.interactions.like, hovering:!$data.interactions.like(), 'btn-medium':RTApp.isSmallerThanTablet, 'btn-small':RTApp.isTabletOrLarger}, title:($data.interactions.like() ? 'Stop Liking ' : 'Like ') + name() + '\'s Profile'">
                    <i class="action16 likeSmall"></i>
                    <span class="hidden-phone" data-bind="text:$data.interactions.like() ? 'Unlike' : 'Like'"><?php echo $interact && $interact['like'] ? 'Unlike' : 'Like' ?></span>
                    <span class="badge badge-blue visible-phone visible-tablet" data-bind="text:counts.likers"></span>
                </a>
                <!--/ko-->
            </div>
        </div>
    </div>
</section> <!--  introcontent -->