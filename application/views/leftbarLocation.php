<aside id="leftbar" class="relative hidden-phone" style="display:none" data-bind="visible:cp">
    <section style="position:fixed;top:0;margin-top: 54px;width:180px">
        <div class="outerBox hidden-phone">
            <div class="contentArea newWidgetContentBG">
                <i class="hovercards" data-bind="attr:{class:cpIconClass()}"></i>
            </div>
        </div>
        <!--ko if : user-->
        <div class="createListing" style="display:none" data-bind="visible:user().isAdmin || user().isAgent">
            <a href="#"><i class="action16 plusCircleBG"></i><span class="hidden-phone">&nbsp;Create Listing</span></a>
        </div>
        <!--/ko-->
        <div class="outerBox">
            <div class="contentArea newWidgetContentBG">
                <nav class="tabbable tabs-left">
                    <ul class="nav nav-tabs">
                        <?php if (isset($links['Feed'])): ?>
                            <li data-bind="css : {active : ca() === 'feed'}, hoverClass: 'hovering'">
                                <a id="sidenavFeed" href="<?php echo $links['Feed']; ?>">
                                    <i class="info16 feed"></i><span class="hidden-phone">&nbsp;Feed</span>
                                </a>
                            </li>
                        <?php endif; ?>
                        <?php if (isset($links['Info'])): ?>
                            <li data-bind="css : {active : ca() === 'info'}, hoverClass: 'hovering'">
                                <a id="sidenavInfo" href="<?php echo $links['Info']; ?>">
                                    <i class="sideNavIcon icon-info-sign"></i><span class="hidden-phone">&nbsp;Info</span>
                                </a>
                            </li>
                        <?php endif; ?>
                        <?php if (isset($links['Locations'])): ?>
                            <li data-bind="css : {active : ca() === 'locations'}, hoverClass: 'hovering'">
                                <a id="sidenavLocations" href="<?php echo $links['Locations']; ?>">
                                    <i class="sideNavIcon icon-compass"></i><span class="hidden-phone">&nbsp;Locations</span><span data-bind="text:cp().counts.locations" class="badge hidden-phone"><?php echo $cp['counts']['locations'] ?></span>
                                </a>
                            </li>
                        <?php endif; ?>
                        <li class="dropdown" style="display:none" data-bind="visible:$root.cpuIsCu, css : {active : ca() === 'testimonials'}, hoverClass: 'hovering'">
                            <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                <i class="info16 itestimonial"></i>&nbsp;
                                <span class="hidden-phone">Reviews</span>&nbsp;
                                <b class="caret"></b>
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
                                    <i class="info16 itestimonial"></i>&nbsp;Reviews</a>
                                </a>
                            </li>
                        <?php endif; ?>
                        <?php if (isset($links['Listings'])): ?>
                            <li data-bind="hoverClass: 'hovering'">
                                <a id="sidenavListings" href="<?php echo $links['Listings']; ?>"><i class="info16 listings"></i>&nbsp;
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