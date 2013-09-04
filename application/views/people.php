<?php defined('SYSPATH') or die('No direct script access.'); ?>
<?php if (isset($introcontent)): ?>
    <div class="contentArea" data-bind="css:{centerContent: RTApp.isLargerThanDefault, 'container-fluid': RTApp.isSmallerThanTablet}, style:{marginLeft:centerView}">
        <?php include $introcontent; ?>
    <?php else: ?>
        <div class="container-fluid relative" data-bind="style:{marginLeft:centerView}" style="margin-top:50px;">
            <div class="outerBox centerWidth relative">
                <section class="contentArea introBox widgetContentBG relative">
                    <div class="hidden-phone">
                        <h2 id="introHeader" ><i class="icon-group"></i> People Directory</h2>
                        <p><?php echo Kohana::message('pages', 'people.description') ?></p>
                    </div>
                    <h3 class="noMargTopBtm visible-phone"><i class="icon-group"></i> People Directory</h3>
                </section>
            </div> <!-- intro content -->
        <?php endif; ?>
        <div class="outerBox centerWidth" style="margin-top:10px">
            <input type="search" class="span12 visible-phone" style="padding:10px;height:auto;border:0 none;border-bottom:1px solid #ccc;font-size:110%;" placeholder="Search People ..." data-bind="value:Search().formFields.s, valueUpdate:'afterkeydown'">
            <div class="contentArea contentBox">
                <form class="listingsSearch RTASearch hidden-phone" accept-charset="utf-8" method="GET" action="/<?php echo Request::initial()->detect_uri() ?>">
                    <div id="wraparound" class="outerBox relative">
                        <div id="search-wrap" class="filterContentBG contentArea contentNoBottom">
                            <div class="input-append input-large" style="width:88%">
                                <input type="text" class="search-query" name="s" id="s" placeholder="Search People ..." data-bind="value:Search().formFields.s, valueUpdate:'afterkeydown'">
                                <button type="submit" class="btn btn-inverse" data-bind="click:resetNewResults">Search</button>
                            </div>
                        </div>
                    </div> <!-- SEARCH BOX -->
                    <input type="hidden" value="<?php echo Security::token(); ?>" name="state" data-bind="value:Search().formFields.state">
                </form> <!-- SEARCH AREA -->
                <!--ko if:cl-->
                <ul class="media-list" id="theLoop" data-bind="css:{opaque : isGettingNew}">
                    <li><?php echo Filter::feed(); ?></li>
                    <!--ko serverForEach:{name:'userTemplate', foreach:cl}-->
                    <?php
                    if (isset($cl) && !empty($cl))
                    {
                        foreach ($cl as $user)
                        {
                            echo View::factory('loops/single/user', (array) $user);
                        }
                    }
                    ?>
                    <!--/ko-->
                    <li>
                        <div id="nextPage" style="text-align:center;margin:0 auto;padding:10px">
                            <i class="icon-spinner icon-spin icon-3x" style="display:none" data-bind="visible:isGettingNext"></i>
                            <small data-bind="visible:!hasNextPage()">There is nothing more to show</small>
                            <a href="#" style="display:none" data-bind="visible:hasNextPage() && !isGettingNext(), click:getNextPage">Show More</a>
                        </div>
                    </li>
                </ul>
                <!--/ko-->
            </div>
        </div>
    </div>
    <script type="text/html" id="userTemplate">
    <li class="widgetOuterBox" data-bind="attr:{id : _id}">
        <article class="contentArea widgetContentBG relative person">
            <section class="media">
                <a class="pull-left hidden-phone" href="#" style="width:85px;height:auto;margin-right:20px" data-bind="attr:{title:name, href : uri}">
                    <img class="img-polaroid" data-bind="getAvatar : {context:$data, size:90},alt:{title:name}" width="90" height="90">
                </a>
                <a class="visible-phone clearfix" href="#" style="width:auto;height:40px;margin-right:5px;margin-bottom:10px;float:left" data-bind="attr:{title:name, href : uri}">
                    <img class="img-polaroid" data-bind="getAvatar : {context:$data, size:40},alt:{title:name}" width="40" height="40">
                </a>
                <div class="media-body media-details">
                    <h3 class="media-heading clearfix">
                        <a  data-bind="attr:{href : uri}, title:'See ' + name() + '\'s Profile', text:name, qtip: RTApp.getUserHoverCard" class="personHoverCard tipsRight" style="display:inline-block"></a>&nbsp;
                        <a href="#">
                            <small class="muted" data-bind="text:(roles.indexOf('admin')!==-1) ? 'Realt Staff': 'Realt ' + roles()[0].ucfirst()"></small>
                        </a>
                    </h3>
                    <ul class="unstyled" style="font-size:90%;">
                        <!--ko if : hasCompany()-->
                        <li><strong>Works at</strong> <a data-bind="text:company.name, attr:{href:company.uri}, title:'See ' + company.name() + '\'s Profile'"></a></li>
                        <!--/ko-->
                        <!--ko if : roles.indexOf('agent')!==-1-->
                        <li><strong>Listings</strong> <a data-bind="text:counts.listings, attr:{href : uri() + '/listings'}"></a></li>
                        <!--/ko-->
                        <li><strong>Joined</strong> <time data-bind="dateText:created, datePattern:'dS mmm yyyy'"></time></li>
                        <li><strong>Last Active</strong> <time data-bind="timeago:modified"></time></li>
                    </ul>
                </div>
            </section>
            <div class="postActions">
                <ul class="postActionButtons">
                    <!--ko if:interactable-->
                    <li class="hasActiveState" data-bind="if:isSubscribable, css:{active:subscribing}, hoverClass: 'hovering'">
                        <a  class="subscribe-link" href="#" data-bind="title:(subscribing() ? 'Stop Subscribing to ' : 'Subscribe to ') + name() + '\'s Activity'"><i class="action20 subscribe"></i></a>
                    </li>
                    <li class="hasActiveState" data-bind="css:{active:liking}, hoverClass: 'hovering'">
                        <a class="like-link"  data-bind="title:(liking() ? 'Stop Liking ' : 'Like ') + name() + '\'s Profile'" href="#"><i class="action20 like"></i></a>
                    </li>
                    <!--/ko-->
                </ul>
                <ul class="postActionInfo" data-bind="if:$data.connections">
                    <li data-bind="hoverClass: 'hovering'">
                        <a  data-bind="attr:{href : uri() + '/subscribers'}, title: 'View ' + name() + '\'s Subscribers'" class="subscriberHoverCard"><i class="info16 people"></i><span data-bind="text:counts.subscribers"></span>
                        </a></li>
                    <li data-bind="hoverClass: 'hovering'">
                        <a  data-bind="attr:{href : uri() + '/subscribers'}, title: 'View ' + name() + '\'s Likes'" data-bind="attr:{href : uri() + '/likers'}" class="likerHoverCard"><i class="action16 likeSmall"></i><span data-bind="text:counts.likers"></span>
                        </a></li>
                </ul>
            </div> <!-- postActions -->
        </article>
    </li>
    </script>