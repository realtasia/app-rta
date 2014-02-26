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
        <button class="close" aria-hidden="true" onclick="return $(this).parent().fadeOut(), !1;"><i class="icon-remove"></i></button>
        <h5 class="noMrgTop"><i class="icon-info-sign" style="font-size:18px"></i> Important Notes.</h5>
        <p>
            You cannot make changes to your package at the moment. If you would like to upgrade your plan, please send an email to <a href="mailto:support@realtasia.com">support@realtasia.com</a></em></small>
        </p>
    </div>
    <pre><?php $billing = \Arr::get($settings, 'billing')?></pre>
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
        	<?php if(\Arr::get($billing, 'transaction_id')):?>
            <tr>
                <td><?php echo \Arr::path($billing, 'plan.name')?></td>
                <?php 
                	$date = new DateTime(\Arr::get($billing, 'transaction_date'), new DateTimeZone("PST"));
                	$date->setTimezone(new DateTimeZone("Asia/Singapore"));
					$paid_to = date('j-M-y', \Arr::get($billing, 'paid_to'));
					$actual_paid_to = date('j-M-y', strtotime($paid_to . "-1 days"));
                ?>
                <td>SGD <?php echo \Arr::get($billing, 'amount')?> <br> <small class="muted">(<?php echo $date->format('j-m-y, g:iA')?>)</small></td>
                <td>Paypal</td>
                <td><?php echo date('j-M-y', \Arr::get($billing, 'paid_from'))?> <span class="muted">&mdash;</span> <?php echo $actual_paid_to ?></td>
            </tr>
            <?php else:?>
            <tr>
                <td>Realt User</td>
                <td>N.A.</td>
                <td>N.A.</td>
                <td>N.A.</td>
            </tr>            	
            <?php endif;?>
        </tbody>
    </table>
</div>