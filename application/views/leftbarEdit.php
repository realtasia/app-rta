<!--data-bind="visible:viewport.width() > 600"-->
<aside id="leftbar" class="relative hidden-phone" style="display:none" data-bind="visible:cp">
    <section style="position:fixed;top:0;margin-top: 54px;width:180px" data-bind="style:{width:isSmallerThanTablet() ? '60px' : '180px'}">
        <img alt="User Profile Photo" class="visible-phone img-polaroid" width="50" height="50" src="<?php echo (Arr::get($cp, 'avatar') ? 'http://' . str_replace($cp['_id'], $cp['_id'] . "/90", $cp['avatar']) : 'http://' . $api . "/avatar/{$cp['_id']}" . "/90"); ?>" title="<?php echo $cp['name'] ?>" style="margin-bottom:10px">
        <div class="outerBox hidden-phone">
            <div class="contentArea newWidgetContentBG">
                <img alt="User Profile Photo" id="bigProfilePhoto" data-bind="getAvatar : {context : user, size : 150}">
                <p id="barcodeProfile"><i class="icon-qrcode"></i>&nbsp;&nbsp;Scan <a href="#">eContact Card</a>.</p>
            </div>
        </div>
        <div class="outerBox clearfix">
            <div class="contentArea newWidgetContentBG" style="display:none" data-bind="visible:ca() === 'edit'">
                <nav class="tabbable tabs-left" data-bind="with:cp">
                    <ul class="nav nav-tabs">
                        <li data-bind="css:{active:currentEdit() === 'picture'}, hoverClass: 'hovering'">
                            <a href="#" data-bind="click:changeEdit.bind($data, 'picture')">
                             <i class="sideNavIcon icon-camera-retro" data-bind="css:{'icon-2x':RTApp.isSmallerThanTablet}"></i><span class="hidden-phone">&nbsp;Picture</span>
                            </a>
                        </li>
                        <li data-bind="css : {active : currentEdit() === 'account'}, hoverClass: 'hovering'">
                            <a href="#" data-bind="click:changeEdit.bind($data, 'account')">
                             <i class="sideNavIcon icon-cogs" data-bind="css:{'icon-2x':RTApp.isSmallerThanTablet}"></i><span class="hidden-phone">&nbsp;Account</span>

                            </a>
                        </li>
                        <li data-bind="css : {active : currentEdit() === 'bio'}, hoverClass: 'hovering'">
                            <a href="#" data-bind="click:changeEdit.bind($data, 'bio')">
                                <i class="sideNavIcon icon-phone" data-bind="css:{'icon-2x':RTApp.isSmallerThanTablet}"></i><span class="hidden-phone">&nbsp;Contact</span>
                            </a>
                        </li>
                        <li data-bind="css : {active : currentEdit() === 'company'}, hoverClass: 'hovering'">
                            <a href="#" data-bind="click: changeEdit.bind($data, 'company')">
                                <i class="sideNavIcon icon-briefcase" data-bind="css:{'icon-2x':RTApp.isSmallerThanTablet}"></i><span class="hidden-phone">&nbsp;Work</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            <div class="contentArea newWidgetContentBG" style="display:none" data-bind="visible:ca() === 'settings'">
                <nav class="tabbable tabs-left" data-bind="with:cp">
                    <ul class="nav nav-tabs">
                        <li class="nav-header hidden-phone">Settings</li>
                        <li data-bind="css:{active:currentEdit() === 'notifications'}, hoverClass: 'hovering'">
                            <a href="#" data-bind="click:changeEdit.bind($data, 'notifications')">
                                <i class="sideNavIcon icon-bell" data-bind="css:{'icon-2x':RTApp.isSmallerThanTablet}"></i><span class="hidden-phone">&nbsp;Notifications</span>
                            </a>
                        </li>
                        <li data-bind="css : {active : currentEdit() === 'privacy'}, hoverClass: 'hovering'">
                            <a href="#" data-bind="click:changeEdit.bind($data, 'privacy')">
                                <i class="sideNavIcon icon-lock" data-bind="css:{'icon-2x':RTApp.isSmallerThanTablet}"></i><span class="hidden-phone">&nbsp;Privacy</span>
                            </a>
                        </li>
                        <!--                    <li data-bind="css : {active : currentEdit() === 'billing'}, hoverClass: 'hovering'">
                                                <a href="#" data-bind="click:changeEdit.bind($data, 'billing')">
                                                    Billing
                                                </a>
                                            </li>-->
                    </ul>
                </nav>
            </div>
        </div>
    </section>
</aside>   <!--  leftbar -->
<script type="text/javascript">
    $(document).ready(function($) {
        $('#leftbar li a').each(function() {
            $(this).effect("highlight", {color: '#d9edf6'}, 2000)
        });
    });
</script>