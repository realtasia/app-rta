<aside id="leftbar" class="relative hidden-phone" style="display:none" data-bind="visible:cp">
    <section style="position:fixed;top:0;margin-top: 54px;width:180px">
        <div class="outerBox hidden-phone">
            <div class="contentArea newWidgetContentBG">
                <i class="hovercards" data-bind="attr:{class:cpIconClass()}"></i>
            </div>
        </div>
        <div class="visible-desktop">
            <!--ko with : user-->
            <div class="createListing" style="display:none" data-bind="flash:canPostListings">
                <a href="#" data-bind="click:$parent.initListings.bind($parent)" class="responsiveIconLink"><i class="icon-list"></i><span style="text-transform: capitalize;font-variant: small-caps">&nbsp;New Listing</span></a>
            </div>
            <!--/ko-->
        </div>
        <div class="outerBox">
            <div class="contentArea newWidgetContentBG">
                <nav class="tabbable tabs-left">
                    <ul class="nav nav-tabs">
                        <?php if (isset($links['Feed'])): ?>
                            <li data-bind="css : {active : ca() === 'feed'}, hoverClass: 'hovering'">
                                <a id="sidenavFeed" href="<?php echo Arr::get($links, "Feed"); ?>">
                                    <i class="sideNavIcon icon-list-alt"></i><span class="hidden-phone">&nbsp;Feed</span>
                                </a>
                            </li>
                        <?php endif; ?>
                        <?php if (isset($links['Info'])): ?>
                            <li data-bind="css : {active : ca() === 'info'}, hoverClass: 'hovering'">
                                <a id="sidenavInfo" href="<?php echo Arr::get($links, "Info"); ?>">
                                    <i class="sideNavIcon icon-info-sign"></i><span class="hidden-phone">&nbsp;Info</span>
                                </a>
                            </li>
                        <?php endif; ?>
                        <?php if (isset($links['Locations'])): ?>
                            <li data-bind="css : {active : ca() === 'locations'}, hoverClass: 'hovering'">
                                <a id="sidenavLocations" href="<?php echo Arr::get($links, 'Locations'); ?>">
                                    <i class="sideNavIcon icon-compass"></i><span class="hidden-phone">&nbsp;Locations</span><span data-bind="text:cp().counts.locations" class="badge hidden-phone"><?php echo Arr::path($cp, 'counts.locations')?></span>
                                </a>
                            </li>
                        <?php endif; ?>
                        <li class="dropdown" style="display:none" data-bind="visible:$root.cpuIsCu, css : {active : ca() === 'testimonials'}, hoverClass: 'hovering'">
                            <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                <i class="info16 itestimonial"></i>&nbsp;
                                <span class="hidden-phone">Reviews</span>&nbsp;
                                <i class="icon-caret-down"></i>
                            </a>
                            <ul data-bind="" class="dropdown-menu">
                                <li><a data-bind="attr:{href:cp().uri() + '/reviews/received'}">Received <span class="badge hidden-phone" data-bind="text:cp().counts.testimonials.received"></span></a></li>
                                <li><a data-bind="attr:{href:cp().uri() + '/reviews/written'}">Written <span class="badge hidden-phone" data-bind="text:cp().counts.testimonials.written"></span></a></li>
                            </ul>
                        </li>
                        <?php //if(isset($links['Media'])):?>
                        <!--                    <li data-bind="hoverClass: 'hovering'">
                                                <a id="sidenavMedia" href="<?php //echo $links['Media']; ?>"><i class="info16 images"></i>&nbsp;Media</a>
                                            </li>-->
                        <?php //endif;?>
                        <?php if (isset($links['Reviews'])): ?>
                            <li data-bind="css : {active : ca() === 'reviews'}, hoverClass: 'hovering'">
                                <a id="sidenavTestimonials" href="<?php echo $links['Reviews']; ?>">
                                    <span class="sideNavIcon"><i class="icon-user"></i><i class="icon-comment-alt superscript"></i></span><span>&nbsp;Reviews</span></a>
                                </a>
                            </li>
                        <?php endif; ?>
                        <?php if (isset($links['Listings'])): ?>
                            <li data-bind="hoverClass: 'hovering'">
                                <a id="sidenavListings" href="<?php echo $links['Listings']; ?>"><i class="sideNavIcon icon-list"></i>
                                    <span class="hidden-phone">Listings</span>&nbsp;
                                    <span data-bind="text:cp().counts.listings" class="badge hidden-phone"><?php echo $cp['counts']['listings'] ?></span></a>
                            </li>
                        <?php endif; ?>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
</aside>   <!--  leftbar -->
<script type="text/javascript">

</script>