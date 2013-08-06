<aside id="leftbar" class="relative hidden-phone" style="display:none" data-bind="visible:cp">
    <section style="position:fixed;top:0;margin-top: 54px;width:180px">
        <div class="outerBox hidden-phone">
            <div class="contentArea newWidgetContentBG">
                <i class="hovercards CO150"></i>
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
                                    <i class="sideNavIcon icon-list-alt"></i><span class="hidden-phone">&nbsp;Feed</span>
                                </a>
                            </li>
                        <?php endif; ?>
                        <?php if (isset($links['Members'])): ?>
                            <li data-bind="css : {active : ca() === 'members'}, hoverClass: 'hovering'">
                                <a id="sidenavMembers" href="<?php echo $links['Members']; ?>">
                                    <i class="sideNavIcon icon-group"></i><span class="hidden-phone">&nbsp;Members</span>
                                </a>
                            </li>
                        <?php endif; ?>
                        <?php //if(isset($links['Media'])):?>
                        <!--                    <li data-bind="hoverClass: 'hovering'">
                                                <a id="sidenavMedia" href="<?php //echo $links['Media']; ?>"><i class="info16 images"></i>&nbsp;Media</a>
                                            </li>-->
                        <?php //endif;?>
                        <?php if (isset($links['Listings'])): ?>
                            <li data-bind="hoverClass: 'hovering'">
                                <a id="sidenavListings" href="<?php echo $links['Listings']; ?>"><i class="sideNavIcon icon-list"></i>
                                    <span class="hidden-phone">&nbsp;Listings&nbsp;</span>
                                    <span data-bind="text:cp().counts.listings" class="badge"><?php echo $cp['counts']['listings'] ?></span></a>
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