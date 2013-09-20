<?php defined('SYSPATH') or die('No direct script access.'); ?>
<div id="contentArea" class="centerContent" data-bind="css:{centerContent: RTApp.isTabletOrLarger, 'container-fluid': RTApp.isSmallerThanTablet}, style:{marginLeft:centerView}">
    <style type="text/css">
        .card.people {width:150px;margin-left:20px;border-bottom-width: 1px;box-shadow: 2px 2px 2px #EEEEEE;}
        .card.people .desc-title{margin: 0 auto !important; text-align: center;}
        .card.people .card-top{width:150px;}
        .card.people .card-bottom{padding:0;}
        .card.people .card-info .title{margin:8px auto; text-align:center;}
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
                <div class="card people">
                    <div class="card-top">
                        <a href="/<?php echo $i['_id'] ?>" title="Go to <?php echo $i['name'] ?>'s profile page">
                            <img alt="<?php echo $i['name'] ?>" src="<?php echo ($i['avatar'] ? 'http://' . str_replace($i['_id'], "{$i['_id']}/150", $i['avatar']) : 'http://' . RT::API_SERVER . "/avatar/{$i['_id']}" . "/150"); ?>" width="150" height="150">
                        </a>
                    </div>
                    <div class="card-info">
                        <a class="title personHoverCard" href="/<?php echo $i['_id'] ?>"><?php echo $i['name'] ?></a>
                        <div class="desc desc-title">Realt <?php echo in_array('admin', $i['roles']) ? 'Staff' : ucfirst($i['roles'][0]) ?></div>
                    </div>
                    <div class="card-bottom">
                        <i class="icon-spin icon-spinner icon-2x"></i>
                    </div>
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
    <div class="card people">
        <div class="card-top">
            <div class="pull-left">
                <a href="#" data-bind="title:name, href:'/' + _id()">
                    <img data-bind="getAvatar : {context:$data, size:150},alt:{title:name}" width="150" height="150">
                </a>
            </div>
        </div>
        <div class="card-info">
            <a class="title personHoverCard" data-bind="attr:{href : uri}, title:'See ' + name() + '\'s Profile', text:name, qtip:RTApp.getUserHoverCard"></a>
            <div class="desc desc-title" data-bind="text:(roles.indexOf('admin')!==-1) ? 'Realt Staff': 'Realt ' + roles()[0].ucfirst()"></div>
        </div>
        <div class="card-bottom">
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
</script>