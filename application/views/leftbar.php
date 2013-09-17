<aside id="leftbar" class="relative hidden-phone" data-bind="visible:cp">
    <section style="position:fixed;top:0;margin-top: 54px;width:180px">
        <div class="media visible-tablet">
            <div class="pull-left">
                <img alt="User Profile Photo" class="img-polaroid" width="60" height="60" src="<?php echo (Arr::get($cp, 'avatar') ? 'http://' . str_replace($cp['_id'], $cp['_id'] . "/60", $cp['avatar']) : 'http://' . $api . "/avatar/{$cp['_id']}" . "/60"); ?>" title="<?php echo $cp['name'] ?>" style="margin-bottom:10px">
            </div>
            <div class="media-body">
                <!--ko if : user-->
                <div class="row-fluid" style="display:none" data-bind="visible:user().isAdmin || user().isAgent">
                    <a href="#" data-bind="click:initListings" class="span12 btn btn-mini btn-rta"><i class="icon-plus-sign"></i>&nbsp;New Listing</a>
                </div>
                <!--/ko-->
                <div class="row-fluid" style="margin-top:10px">
                    <a target="_blank" href="<?php echo (Arr::get($cp, 'uri')) . '/vcard'; ?>" class="span12 btn btn-mini" style="text-align: left"><i class="icon-phone"></i>&nbsp;Get VCARD</a>
                </div>
            </div>
        </div>
        <div class="outerBox visible-desktop">
            <div class="contentArea newWidgetContentBG">
                <img alt="User Profile Photo"  src="<?php echo (Arr::get($cp, 'avatar') ? 'http://' . str_replace($cp['_id'], $cp['_id'] . "/150", $cp['avatar']) : 'http://' . $api . "/avatar/{$cp['_id']}" . "/150"); ?>" id="bigProfilePhoto" title="<?php echo $cp['name'] ?>" data-bind="title:cp().name">
                <p id="barcodeProfile"><a href="#" data-bind="click:scanBarCode" class="responsiveIconLink" style="color:#000"><i class="icon-qrcode"></i></a><span>&nbsp;&nbsp;Scan <a href="#" data-bind="click:scanBarCode">eContact Card</a></span>.</p>
            </div>
        </div>
        <div class="visible-desktop">
            <!--ko with : user-->
            <div class="createListing" style="display:none" data-bind="flash:isAdmin() || isAgent()">
                <a href="#" data-bind="click:$parent.initListings.bind($parent)" class="responsiveIconLink"><i class="icon-list"></i><span style="text-transform: capitalize;font-variant: small-caps">&nbsp;New Listing</span></a>
            </div>
            <!--/ko-->
        </div>
        <div class="outerBox">
            <div class="contentArea newWidgetContentBG">
                <nav class="tabbable tabs-left">
                    <ul class="nav nav-tabs">
                        <?php if (isset($links['Feed'])): ?>
                            <li data-bind="css : {active : ca() === 'feed'}, hoverClass:'hovering'">
                                <a id="sidenavFeed" href="<?php echo $links['Feed']; ?>">
                                    <i class="sideNavIcon icon-list-alt"></i><span>&nbsp;Feed</span>
                                </a>
                            </li>
                        <?php endif; ?>
                        <?php if (isset($links['Info'])): ?>
                            <li data-bind="css : {active : ca() === 'info'}, hoverClass:'hovering'">
                                <a id="sidenavInfo" href="<?php echo $links['Info']; ?>">
                                    <i class="sideNavIcon icon-info-sign"></i><span>&nbsp;About</span>
                                </a>
                            </li>
                        <?php endif; ?>
                        <!--ko if: cpIsCu-->
                        <?php if (isset($links['Media'])): ?>
                            <li data-bind="css : {active : ca() === 'media'}, hoverClass:'hovering'">
                                <a id="sidenavMedia" href="<?php echo $links['Media']; ?>">
                                    <i class="sideNavIcon icon-camera"></i><span>&nbsp;Photos</span>
                                </a>
                            </li>
                        <?php endif; ?>
                        <li class="dropdown" style="display:none" data-bind="visible:$root.cpIsCu, hoverClass:'hovering', css : {active : ca() === 'testimonials'}">
                            <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                <span class="sideNavIcon"><i class="icon-user"></i><i class="icon-comment-alt superscript"></i></span><span>&nbsp;Testimonials</span>
                                <b class="caret"></b>
                            </a>
                            <ul data-bind="" class="dropdown-menu">
                                <li><a data-bind="attr:{href:'/' + cp().username() + '/testimonials/received'}">Received <span class="badge" data-bind="text:cp().counts.testimonials.received"></span></a></li>
                                <li><a data-bind="attr:{href:'/' + cp().username() + '/testimonials/written'}">Written <span class="badge" data-bind="text:cp().counts.testimonials.written"></span></a></li>
                            </ul>
                        </li>
                        <!--/ko-->
                        <!--ko ifnot: cpIsCu-->
                        <?php //if(isset($links['Media'])):?>
                        <!--                    <li data-bind="hoverClass: 'hovering'">
                                                <a id="sidenavMedia" href="<?php //echo $links['Media'];   ?>"><i class="info16 images"></i>&nbsp;Media</a>
                                            </li>-->
                        <?php //endif;?>
                        <?php if (isset($links['Testimonials'])): ?>
                            <li data-bind="css : {active : ca() === 'testimonials'}, hoverClass:'hovering'">
                                <a id="sidenavTestimonials" href="<?php echo $links['Testimonials']; ?>">
                                    <span class="sideNavIcon"><i class="icon-user"></i><i class="icon-comment-alt superscript"></i></span><span>&nbsp;Testimonials</span></a>
                                </a>
                            </li>
                        <?php endif; ?>
                        <!--/ko-->
                        <?php if (isset($links['Listings'])): ?>
                            <li style="display:<? echo in_array($cp['roles'], ['agent']) ? 'block' : 'none' ?>" data-bind="visible:cp().isAdmin || cp().isAgent, hoverClass:'hovering'">
                                <a id="sidenavListings" href="<?php echo $links['Listings']; ?>"><i class="sideNavIcon icon-list"></i>
                                    <span>&nbsp;Listings&nbsp;</span>
                                    <span data-bind="text:cp().counts.listings" class="badge hidden-phone"><?php echo Arr::path($cp, 'counts.listings') ?></span></a>
                            </li>
                        <?php endif; ?>
                        <?php if (isset($links['Subscriptions'])): ?>
                            <li class="dropdown" style="display:none" data-bind="visible:$root.cpIsCu, hoverClass:'hovering', css : {active : ca() === 'subscriptions'}">
                                <a href="<?php echo $links['Subscriptions']; ?>" data-toggle="dropdown" class="dropdown-toggle">
                                    <i class="sideNavIcon icon-rss-sign"></i>
                                    <span>&nbsp;Subscriptions&nbsp;</span>
                                    <b class="caret"></b>
                                </a>
                                <ul data-bind="" class="dropdown-menu">
                                    <li><a data-bind="" href="<?php echo $links['Subscriptions']; ?>/people">People</a></li>
                                    <li><a data-bind="" href="<?php echo $links['Subscriptions']; ?>/locations">Locations</a></li>
                                </ul>
                            </li>
                        <?php endif; ?>
                    </ul>
                </nav>
            </div>
        </div>
        <!--    <div class="outerBox">
                <div class="contentArea widgetContentBG sidebarActionButtons">
                    <a data-bind="hoverClass: 'hovering'"><i class="action16 subscribe"></i>Subscribe</a>
                    <a data-bind="hoverClass: 'hovering'"><i class="action16 likeSmall"></i>Like</a>
                </div>
            </div>-->
    </section>
</aside>