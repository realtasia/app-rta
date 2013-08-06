<?php defined('SYSPATH') or die('No direct script access.'); ?>
<div id="contentArea" class="centerContent" data-bind="css:{centerContent: RTApp.isTabletOrLarger, 'container-fluid': RTApp.isSmallerThanTablet}, style:{marginLeft:centerView}">
    <style type="text/css">
        .subscribeBox{font-size: .9em;width:255px;display:inline-block;margin:3px 1px;}
    </style>
    <?php
    if (isset($introcontent)):
        include $introcontent;
        include APPPATH . 'views/loops/loops.html';
    endif;
    ?>
    <?php if (isset($cl) && !empty($cl)): ?>
        <div style="background-color:#fff;padding:1px">
            <!--ko serverForEach:{name:'locationSubscription', foreach:cl}-->
            <!--/ko-->
        <?php endif; ?>
        <section class="" style="margin-top:10px;padding:10px">
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
<script id="locationSubscription" type="text/html">
    <section class="outerBox subscribeBox" data-bind="attr:{id : _id}">
        <section class="hoverCard contentArea" style="padding:5px">
            <div class="media">
                <div class="pull-left">
                    <a href="#" data-bind="attr:{title:name}">
                        <div  style="width:90px;height:85px"><i class="hovercards" data-bind="attr:{'class':iconClass}"></i></div>
                    </a>
                </div>
                <div class="media-body">
                    <h5 class="media-heading smaller">
                        <a href="#"  data-bind="attr:{href : uri}, title:'Go to ' + name() + '\'s Profile', text:name">Lakeside Grove</a>&nbsp;
                        <a href="#"><small class="muted" data-bind="text:subtype"></small></a></h3>
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
</script>