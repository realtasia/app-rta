<?php defined('SYSPATH') or die('No direct script access.'); include APPPATH . 'views/loops/loops.html'?>
<div id="contentArea" class="centerContent" data-bind="css:{centerContent: RTApp.isDefault() || RTApp.isLarge(), 'container-fluid': RTApp.isSmallerThanTablet}, style:{marginLeft:centerView}">
    <?php include Kohana::find_file('views', 'introcontent/location') ?>
    <!--ko if : $root.postForm().canPost-->
    <div class="outerBox rounded" style="display:none;" data-bind="visible:user() && (ca() === 'feed' || ca() === 'testimonials'), with:$root.postForm">
        <section class="contentArea widgetContentBG rounded" id="newPostArea">
            <ul class="newPostButtons" data-bind="visible:!$root.cpIsCu()">
                <li data-bind="css:{hovering:postType() === 'postStatus'}">
                    <a href="#"  data-bind="click:createStatus, title:'Create a Post'"><i class="action16 postStatus"></i>Post</a></li>
                <li data-bind="css:{hovering:postType() === 'postTestimonial'}">
                    <a href="#"   data-bind="click:createTestimonial, title:'Write a Review'"><i class="action16 postTestimonial"></i>Review</a></li>
            </ul>
            <div class="statusFormTA" style="position:relative;padding-right:10px">
                <button class="close" data-bind="click:destroy, visible:postAreaButton" style="position:absolute;top:0;right:0">&times;</button>
                <textarea id="statusFormTextarea" placeholder="" data-bind="attr:{placeholder:prompt}, click:init, value:message, valueUpdate:'afterkeydown', expand : true"></textarea>
            </div>
            <div class="statusFormTA contentArea" style="display:none" data-bind="visible:hasLink">
                <button class="close" type="button" data-bind="click:closePreview">&times;</button>
                <p class="contentArea" data-bind="text:message"></p>
                <div style="text-align:center;margin:0 auto" data-bind="visible:loading"><i class="icon-spinner icon-spin icon-3x"></i>
</div>
                <article class="media contentArea" style="min-height:100px;display:none" data-bind="visible:externalFields, with:externalFields">
                    <!--ko if : $data.picture-->
                    <div class="pull-left">
                        <!--ko ifnot:$parent.hasVideo-->
                        <a href="#" data-bind="attr:{href:link.src}" target="_blank" class="external_link">
                            <img alt="Video Preview" src="" style="width:110px" data-bind="attr:{src:picture}"/>
                        </a>
                        <!--/ko-->
                    </div>
                    <!--/ko-->
                    <!--ko if:$parent.hasLink-->
                    <div class="contentBottom media-body media-details">
                        <!--ko if:$parent.hasVideo-->
                        <div class="thumbnail" style="margin-bottom: 5px;">
                            <a data-bind="html:$parent.videoThumb()" target="_blank" class="external_link"></a>
                            <span class="thumbLinks" data-bind="if : $data.link.provider">
                                <a href="#" target="_blank" data-bind="attr:{href:link.provider.url}, text:link.provider.name" class="external_link"></a>
                            </span>
                        </div>
                        <!--/ko-->
                        <div data-bind="visible:$parent.hasRich,html:$parent.richFrame"></div>
                        <p class="thumbPostDesc">
                            <a href="#" data-bind="attr:{href:link.src}, text:link.name" target="_blank" class="external_link"></a><br>
                            <span data-bind="text:link.description"></span>
                        </p>
                    </div>
                    <!--/ko-->
                </article>
            </div>
            <div class="statusBoxExpand" style="display:none" data-bind="visible:showButtons">
                <ul class="newPostMediaButtons">
                    <li data-bind="hoverClass: 'hovering'" style="position:relative">
                        <a href="#" data-toggle="dropdown"  data-bind="title:'Change visibility'"><i class="icon" data-bind="css:{'icon-eye-open' : privacy() === 'PUBLIC', 'icon-eye-close' : privacy() === 'PRIVATE' }"></i></a>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="Privacy Menu">
                            <li style="display:block;"><small class="muted">Choose this Post's Privacy</small></li>
                            <li style="display:block;"><a href="#" data-bind="click:setPublic"><i class="icon icon-eye-open"></i> Public</a></li>
                            <li style="display:block;"><a href="#" data-bind="click:setPrivate"><i class="icon icon-eye-close"></i> Private</a></li>
                        </ul>
                    </li>
                    <li data-bind="visible:postType() === 'postStatus', hoverClass: 'hovering'"><a href="#"  data-bind="title:'Upload media'"><i class="action16 upload"></i></a></li>
                    <li data-bind="hoverClass: 'hovering'">
                        <i class="icon-spinner icon-spin" style="display:none" data-bind="visible:isCreating" id="postCreateLoader"></i>
                    </li>
                </ul>
                <button class="btn btn-info relative btn-small" data-bind="enable:canSubmit,click:createNew">Share </button>
            </div>
        </section>
    </div> <!--  status form -->
    <div class="navbar">
        <div class="navbar-inner relative clearfix" style="border-radius:0;display:none;padding:5px;min-height:33px" data-bind="visible:user() && (ca() === 'feed' || ca() === 'testimonials'), with:$root.postForm">
            <ul class="newPostButtons" data-bind="visible:!$root.cpIsCu()">
                <li data-bind="css:{hovering:postType() === 'postStatus'}">
                    <a href="#"  data-bind="click:createStatus, title:'Create a Post'"><i class="action16 postStatus"></i>Post</a></li>
                <li data-bind="css:{hovering:postType() === 'postTestimonial'}">
                    <a href="#"   data-bind="click:createTestimonial, title:'Write a Review'"><i class="action16 postTestimonial"></i>Review</a></li>
            </ul>
            <form style="margin:0;padding:0" class=" relative clearfix">
                <div class="container-fluid" style="padding:0 2px">
                    <div class="row-fluid">
                        <div class="statusFormTA relative clearfix span10" data-bind="style:{'min-height':postBoxHeight}">
                            <button class="close" type="button" data-bind="click:destroy, visible:showButtons">&times;</button>
                            <textarea id="statusFormTextarea" placeholder="" data-bind="attr:{placeholder:prompt}, click:init, value:message, valueUpdate:'afterkeydown', expand : true"></textarea>
                        </div>
                        <div class="span2" style='margin-left:5px'>
                            <div class="btn-group" id="postButtonContainer" style="margin-top:4px">
                                <a class="btn-mini" href="#" data-toggle="dropdown"  data-bind="title:'Change visibility'"><i class="icon" data-bind="css:{'icon-eye-open' : privacy() === 'PUBLIC', 'icon-eye-close' : privacy() === 'PRIVATE' }"></i></a>
                                <ul class="dropdown-menu" role="menu" aria-labelledby="Privacy Menu">
                                    <li style="display:block;"><small class="muted" style="padding-left:3px;">Choose this Post's Privacy</small></li>
                                    <li style="display:block;"><a href="#" data-bind="click:setPublic"><i class="icon icon-eye-open"></i> Public</a></li>
                                    <li style="display:block;"><a href="#" data-bind="click:setPrivate"><i class="icon icon-eye-close"></i> Private</a></li>
                                </ul>
                                <a class="btn-mini" href="#"><i class="icon-arrow-up"></i></a>
                                <a class="btn-mini" href="#" data-bind="enable:canSubmit,click:createNew"><i class="icon-play"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="outerBox contentArea statusFormTA" style="display:none;margin-top:5px;" data-bind="visible:hasLink">
                <button class="close" type="button" data-bind="click:closePreview">&times;</button>
                <p class="contentArea" data-bind="html:RT.Com.nl2br(message())"></p>
                <div style="text-align:center;margin:0 auto" data-bind="visible:loading"><i class="icon-spinner icon-spin icon-3x"></i></div>
                <article class="media contentArea" style="min-height:100px;display:none" data-bind="visible:externalFields, with:externalFields">
                    <!--ko if : $data.picture-->
                    <div class="pull-left">
                        <!--ko ifnot:$parent.hasVideo-->
                        <a href="#" data-bind="attr:{href:link.src}" target="_blank" class="external_link">
                            <img alt="Link Preview Image" src="" style="width:110px" data-bind="attr:{src:picture}"/>
                        </a>
                        <!--/ko-->
                    </div>
                    <!--/ko-->
                    <!--ko if:$parent.hasLink-->
                    <div class="contentBottom media-body media-details">
                        <!--ko if:$parent.hasVideo-->
                        <div class="thumbnail" style="margin-bottom: 5px;">
                            <a data-bind="html:$parent.videoThumb()" target="_blank" class="external_link"></a>
                            <span class="thumbLinks" data-bind="if : $data.link.provider">
                                <a href="#" target="_blank" data-bind="attr:{href:link.provider.url}, text:link.provider.name" class="external_link"></a>
                            </span>
                        </div>
                        <!--/ko-->
                        <div data-bind="visible:$parent.hasRich,html:$parent.richFrame"></div>
                        <p class="thumbPostDesc">
                            <a href="#" data-bind="attr:{href:link.src}, text:link.name" target="_blank" class="external_link"></a><br>
                            <span data-bind="text:link.description"></span>
                        </p>
                    </div>
                    <!--/ko-->
                </article>
            </div>
        </div>
    </div>  <!--  status form -->
    <!--/ko-->
    <?php if ($ca === 'info'){include Kohana::find_file('views', 'locationInfo');} ?>
    <section id="theLoop" class="profile" data-bind="visible:cl()" style="<?php if (!isset($cl)){echo 'display:none';}?>">
        <!--ko if:ca() !== 'leads' && ca() !== 'feedback'-->
        <?php echo $ca === 'feed' ? Filter::feed() : '' ?>
        <!--ko serverForEach:{name:'onePost', foreach:cl}-->
        <?php if (isset($cl) && !empty($cl)){echo View::factory('loops/posts-comments')->set('cl', $cl);}?>
        <!--/ko-->
                <div id="nextPage" style="text-align:center;margin:0 auto;padding:10px">
            <i class="icon-spinner icon-spin icon-3x" style="display:none" data-bind="visible:isGettingNext"></i>
            <small data-bind="visible:!hasNextPage()">There is nothing more to show</small>
            <a href="#" data-bind="visible:hasNextPage() && !isGettingNext(), click:getNextPage">Show More</a>
        </div>
        <!--/ko-->
    </section> <!--  theLoop -->
</div>
<script type="text/html" id="pictures">
    <li class="latestThumbs" ><div class = "thumbnail">
            <a href="#" data-bind=""  style="width:80px;height:80px"><img alt="Latest Pictures" data-bind="" width="80px" height="80px" /></a></div>
    </li>
</script>