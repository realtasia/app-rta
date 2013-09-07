<div class="contentArea" data-bind="css:{centerContent: RTApp.isLargerThanDefault, 'container-fluid': RTApp.isSmallerThanTablet, opaque:RTC.processing}, style:{marginLeft: RTApp.centerView}">
    <div class="media" data-bind="with:RTApp.cp">
        <div class="pull-left">
            <img alt="User Profile Photo" id="mobileProfilePhoto" data-bind="title:name, getAvatar : {context:$data, size:'90'}">
        </div>
        <div class="media-body">
            <h5 style="display:inline-block" class="noMargTopBtm">Hi there <span data-bind="text:name"></span>, </h5>
            <p style="font-size: 13px">This is you account details page.
                <span class="hidden-phone"></span>
            </p>
        </div>
    </div>
    <hr>
    <div class="alert RTHelpBox">
        <button class="close" onclick="return $(this).parent().fadeOut(), !1;"><i class="icon-remove"></i></button>
        <h5 class="noMrgTop"><i class="icon-info-sign" style="font-size:18px"></i> Important Notes.</h5>
        <p>
            Your current package is on an "Extended Preview Scheme".<br> <small><em>For more information, please have a look at your package terms by clicking on the package id below.</em></small>
        </p>
    </div>
    <h4>Membership details:</h4>
    <table class="table table-condensed table-bordered table-striped">
        <thead>
            <tr>
                <th>Package</th>
                <th>Paid</th>
                <th>Method</th>
                <th>Period</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>RTSG-<a href="#" data-bind="title:'View package terms in new window'">1.RC2</a></td>
                <td>SGD 99.90 <br> <small class="muted">(1-Sep-2013)</small></td>
                <td>Paypal</td>
                <td>01-Sep-2013 <span class="muted">&mdash;</span> 31-Aug-2014</td>
            </tr>
        </tbody>
    </table>
</div>