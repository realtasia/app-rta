<?php defined('SYSPATH') or die('No direct script access.'); ?>
<div id="contentArea" class="centerContent" data-bind="css:{centerContent: RTApp.isTabletOrLarger, 'container-fluid': RTApp.isSmallerThanTablet}, style:{marginLeft:centerView}">
    <style type="text/css">
        .subscribeBox{font-size: .9em;display:inline-block;margin:3px 1px;}
    </style>
    <?php
    if (isset($introcontent)):
        include $introcontent;
        include APPPATH . 'views/loops/loops.html';
    endif;
    ?>
    <?php if (isset($cl) && !empty($cl)): ?>
        <div style="background-color:#fff;padding:1px" class="row-fluid">
            <!--ko serverForEach:{name:'peopleSubscription', foreach:cl}-->
            <?php foreach ($cl as $i): ?>
                <div class="span6">
                    <section class="outerBox subscribeBox span12">
                        <section class="hoverCard contentArea" style="padding:5px">
                            <div class="media">
                                <div class="pull-left">
                                    <a href="/<?php echo $i['_id'] ?>" title="Go to <?php echo $i['name'] ?>'s profile page">
                                        <img alt="<?php echo $i['name'] ?>" src="<?php echo ($i['avatar'] ? 'http://' . str_replace($i['_id'], "{$i['_id']}/90", $i['avatar']) : 'http://' . RT::API_SERVER . "/avatar/{$i['_id']}" . "/90"); ?>" width="90" height="90">
                                    </a>
                                </div>
                                <div class="media-body">
                                    <h5 class="media-heading smaller">
                                        <a href="<?php echo $i['uri'] ?>" class="personHoverCard"><strong><?php echo $i['name'] ?></strong></a>&nbsp;
                                        <br>
                                        <a href="#">
                                            <small class="muted" style="font-variant:small-caps;font-size:0.9em">Realt <?php echo in_array('admin', $i['roles']) ? 'Staff' : ucfirst($i['roles'][0]) ?></small>
                                        </a>
                                    </h5>
                                </div>
                            </div>
                        </section>
                    </section>
                </div>
            <?php endforeach; ?>
            <!--/ko-->
        <?php endif; ?>
    </div>
    <div class="row-fluid">
        <section class="span12" style="margin-top:10px;padding:10px">
            <section class="hoverCard contentArea" style="padding:5px">
                <div id="nextPage" style="text-align:center;margin:0 auto;">
                    <i class="icon-spinner icon-spin icon-3x" style="display:none" data-bind="visible:isGettingNext"></i>
                    <small data-bind="visible:!hasNextPage()">There is nothing more to show</small>
                    <a href="#" style="display:none" data-bind="visible:hasNextPage() && !isGettingNext(), click:getNextPage">Show More</a>
                </div>
            </section>
        </section>
    </div>
</div>
<script id="peopleSubscription" type="text/html">
    <div class="span6">
        <section class="outerBox subscribeBox span12" data-bind="attr:{id : _id}">
            <section class="hoverCard contentArea" style="padding:5px">
                <div class="media">
                    <div class="pull-left">
                        <a href="#" data-bind="title:name, href:'/' + _id()">
                            <img data-bind="getAvatar : {context:$data, size:90},alt:{title:name}" width="90" height="90">
                        </a>
                    </div>
                    <div class="media-body">
                        <h5 class="media-heading smaller">
                            <a  data-bind="attr:{href : uri}, title:'See ' + name() + '\'s Profile', text:name, qtip:RTApp.getUserHoverCard" class="personHoverCard"></a>&nbsp;
                            <br>
                            <a href="#">
                                <small class="muted" data-bind="text:(roles.indexOf('admin')!==-1) ? 'Realt Staff': 'Realt ' + roles()[0].ucfirst()"></small>
                            </a>
                        </h5>
                        <div class="postActions">
                            <ul class="postActionButtons">
                                <!--ko if:interactable-->
                                <li class="hasActiveState" data-bind="if:isSubscribable, css:{active:subscribing}, hoverClass: 'hovering'">
                                    <a  class="subscribe-link" href="#" data-bind="title:(subscribing() ? 'Stop Subscribing to ' : 'Subscribe to ') + name() + '\'s Activity'"><i class="action16 subscribe"></i></a>
                                </li>
                                <li class="hasActiveState" data-bind="css:{active:liking}, hoverClass: 'hovering'">
                                    <a class="like-link"  data-bind="title:(liking() ? 'Stop Liking ' : 'Like ') + name() + '\'s Profile'" href="#"><i class="action16 likeSmall"></i></a>
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
                    </div>
                </div>
            </section>
        </section>
    </div>
</script>