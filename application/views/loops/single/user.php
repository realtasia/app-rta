<li class="widgetOuterBox" id="<?php echo $_id ?>">
    <article class="contentArea widgetContentBG relative person">
        <section class="media">
            <a class="pull-left hidden-phone thumbnail" href="synthetic-redacted" style="width:85px;height:auto;margin-right:20px">
                <img alt="<?php echo $name?>" src="<?php echo ($avatar ? 'http://' . str_replace($_id, "$_id/90", $avatar) : 'http://' .$api . "/avatar/$_id" . "/90"); ?>" width="90" height="90">
            </a>
            <a class="visible-phone clearfix" href="synthetic-redacted" style="width:auto;height:40px;margin-right:5px;margin-bottom:10px;float:left" data-bind="title:name, href : uri">
                <img class="img-polaroid" src="<?php echo ($avatar ? 'http://' . str_replace($_id, "$_id/40", $avatar) : 'http://' .$api . "/avatar/$_id" . "/40"); ?>" width="40" height="40">
            </a>
            <div class="contentBottom media-body media-details">
                <h3 class="media-heading">
                    <a href="<?php echo $uri ?>" class="personHoverCard"><?php echo $name ?></a>&nbsp;
                    <a href="#">
                        <small class="muted">Realt <?php echo in_array('admin', $roles) ? 'Staff' : ucfirst($roles[0]) ?></small>
                    </a>
                </h3>
                <ul class="unstyled" style="font-size:90%;">
                    <?php if (!empty($company)): ?>
                        <li><strong>Works at</strong> <a  href="<?php echo ucfirst(Arr::get($company, 'uri', '')) ?>" title="<?php echo "View " . Arr::get($company, 'name') . "'s profile"?>"><?php echo Arr::get($company, 'name') ?></a></li>
                    <?php endif; ?>
                    <?php if (Arr::get($roles, 'agent')): ?>
                        <li><strong>Listings</strong> <a href="<?php echo $uri ?>/listings"><?php echo Arr::get($counts, 'listings', 0)?></a></li>
                    <?php endif; ?>
                        <li><strong>Joined</strong> <time title="<?php echo date('c', $created)?>"><?php echo date('dS M Y', $created) ?></time></li>
                        <li><strong>Last Active</strong> <time title="<?php echo date('c', $modified)?>"><?php echo Date::fuzzy_span($modified) ?></time></li>
                </ul>
            </div>
        </section>
        <div class="postActions">
            <ul class="postActionButtons"></ul>
            <ul class="postActionInfo">
                <li data-bind="hoverClass: 'hovering'">
                    <a title="See subscribers" href="<?php echo $uri . '/subscribers' ?>" class="subscriberHoverCard"><i class="info16 people"></i>
                        <span><?php echo Arr::get($counts, 'subscribers', 0) ?></span>
                    </a></li>
                <li data-bind="hoverClass: 'hovering'">
                    <a title="See likes" href="<?php echo $uri . '/likers' ?>" class="likerHoverCard"><i class="action16 likeSmall"></i>
                        <span><?php echo Arr::get($counts, 'likers', 0) ?></span>
                    </a></li>
            </ul>
        </div> <!-- postActions -->
    </article>
</li>
