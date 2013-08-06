<?php defined('SYSPATH') or die('No direct script access.'); ?>
<?php if (isset($introcontent)): ?>
    <div class="contentArea" data-bind="css:{centerContent: RTApp.isLargerThanDefault, 'container-fluid': RTApp.isSmallerThanTablet}, style:{marginLeft:centerView}">
        <?php include $introcontent; ?>
    <?php else: ?>
        <div class="container-fluid relative" data-bind="style:{marginLeft:centerView}" style="margin-top:50px;">
        <div class="outerBox centerWidth relative">
            <section class="contentArea introBox widgetContentBG relative">
                <div class="hidden-phone">
                    <h2 id="introHeader" ><i class="icon-compass"></i> Locations Directory</h2>
                    <p><?php echo Kohana::message('pages', 'locations.description') ?></p>
                </div>
                <h3 class="noMargTopBtm visible-phone"><i class="icon-compass"></i> Locations Directory</h3>
            </section>
        </div> <!-- intro content -->
    <?php endif; ?>
    <div class="outerBox centerWidth" style="margin-top:10px;">
        <input type="search" class="span12 visible-phone" style="padding:10px;height:auto;border:0 none;border-bottom:1px solid #ccc;font-size:110%;" placeholder="Search People ..." data-bind="value:Search().formFields.s, valueUpdate:'afterkeydown'">
        <div class="contentArea contentBox">
            <form class="listingsSearch RTASearch hidden-phone" accept-charset="utf-8" method="GET" action="/<?php echo Request::initial()->detect_uri() ?>">
                <div id="wraparound" class="outerBox relative">
                    <div id="search-wrap" class="filterContentBG contentArea contentNoBottom">
                        <div class="input-append input-large" style="width:88%">
                            <input type="text" class="search-query" name="s" id="s" placeholder="Search Locations ..." data-bind="autoComplete : { source: getKeyword, delay: 500, minLength:2}, event:{autocompleteselect:resetNewResults}, value:Search().formFields.s, valueUpdate:'afterkeydown'">
                            <button type="submit" class="btn btn-inverse" data-bind="click:resetNewResults">Search</button>
                        </div>
                    </div>
                </div> <!-- SEARCH BOX -->
                <input type="hidden" value="<?php echo Security::token(); ?>" name="state" data-bind="value:Search().formFields.state">
            </form> <!-- SEARCH AREA -->
            <!--ko if:cl-->
            <ul class="media-list" id="theLoop" data-bind="css:{opaque : isGettingNew}">
                <li><?php echo Filter::feed() ?></li>
                <!--ko serverForEach:{name:'locationTemplate', foreach:cl}-->
                <?php
                if (isset($cl))
                {
                    foreach ($cl as $page)
                    {
                        echo View::factory('loops/single/location', (array) $page);
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
<script type="text/html" id="locationTemplate">
    <li class="widgetOuterBox" data-bind="attr:{id : _id}">
    <article class="contentArea widgetContentBG relative location" data-bind="event: {mouseover: showPostSettings, mouseleave: hidePostSettings}">
    <!--ko if:$root.cuIsAdmin-->
    <div class="postSettings" data-bind="visible:postSettings">
    <div style="margin-right:10px"><a href="#">edit location</a> | <a href="#">edit estate</a></div>
    </div> <!-- post settings -->
    <!--/ko-->
    <section class="media">
    <a class="pull-left" href="#" data-bind="attr:{title:name}">
    <div style="width:90px;height:90px" class="img-"><i class="hovercards" data-bind="attr:{'class':iconClass}"></i></div>
    </a>
    <div class="contentBottom media-body media-details">
    <h3 class="media-heading hidden-phone">
    <a href="#"  data-bind="attr:{href : uri}, title:'Go to ' + name() + '\'s Profile', text:name"></a>&nbsp;
    <a href="#"><small class="muted" data-bind="text:subtype"></small></a>
    </h3>
    <h4 class="noMargTopBtm visible-phone">
    <a href="#"  data-bind="attr:{href : uri}, title:'Go to ' + name() + '\'s Profile', text:name"></a>&nbsp;
    <a href="#" style="font-size:50%"><small class="muted" data-bind="text:subtype"></small></a>
    </h4>
    <ul class="unstyled" style="font-size:90%;">
    <li><strong>Estate</strong><a href="#" data-bind="attr:{href:$data.parent.uri}, text:$data.parent.name"></a></li>
    <!--ko if:$data.property_type-->
    <li><strong>Property Type</strong></dt><dd><a href="#" data-bind="text:property_type"></a></li>
    <!--/ko-->
    <li><strong>Listings</strong><a data-bind="text:counts.listings, attr:{href : uri() + '/listings'}"></a></li>
    <li><strong>Last Active</strong><time data-bind="timeago:$data.modified || $data.created"></time></li>
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
    </li> <!-- location -->
</script>
<!--ko if:locationEdit-->
<section class="RTAWindowContainer" id="locationEdit" style="padding:10px;display:none">
    <form class="form-horizontal">
        <h4>Edit Location</h4>
        <hr>
        <div class="control-group">
            <label class="control-label" for="locationName" style="width:90px">Name</label>
            <div class="controls" style="margin-left:100px">
                <input type="text" id="locationName" placeholder="Location Name">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="locationType" style="width:90px">Type</label>
            <div class="controls" style="margin-left:100px">
                <select style="width:390px" id="locationType">
                    <option>Private Apartments</option>
                    <option>Serviced Apartments</option>
                    <option>Private Landed</option>
                    <option>HDB</option>
                </select>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="propType" style="width:90px">Prop Type</label>
            <div class="controls" style="margin-left:100px">
                <select style="width:390px" id="propType">
                    <option>Private Apartments</option>
                    <option>Serviced Apartments</option>
                    <option>Private Landed</option>
                    <option>HDB</option>
                </select>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="locationKeywords" style="width:90px">Keywords</label>
            <div class="controls" style="margin-left:100px">
                <textarea id="locationKeywords" placeholder="Keywords"></textarea>
            </div>
        </div>
    </form>
</section>
<!--/ko-->
<?php
if (isset($introcontent))
{
    include APPPATH . 'views/loops/loops.html';
}
?>
