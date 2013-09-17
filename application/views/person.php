<?php defined('SYSPATH') or die('No direct script access.'); ?>
<!--ko ifnot:RTApp.isJSAction-->
<div class="contentArea centerContent" data-bind="css:{'container-fluid': RTApp.isSmallerThanTablet, opaque:RTC.processing}">
    <?php include Kohana::find_file('views', 'introcontent/person') ?>
    <!--ko template: {name:'jsPostBox', if:postForm().canPost() && (ca() === 'feed' || ca() === 'testimonials')}--><!--/ko-->
    <?php if($ca === 'info'):include Kohana::find_file('views', 'personInfo');endif; ?>
    <section id="theLoop" class="profile" data-bind="visible:clNotEmpty, css:{opaque : isGettingNew}" style="min-height:100%;overflow:auto;<?php echo isset($cl) ? '' : 'display:none'; ?>">
        <!--ko if:ca() !== 'leads' && ca() !== 'feedback'-->
        <?php echo $ca === 'feed' ? Filter::feed() : '' ?>
        <!--ko serverForEach:{name:'onePost', foreach:cl}-->
        <?php
        if (isset($cl) && !empty($cl))
        {
            echo View::factory('loops/posts-comments')->set('cl', $cl);
        }
        ?>
        <!--/ko-->
        <div id="nextPage" style="text-align:center;margin:0 auto;padding:10px">
            <i class="icon-spinner icon-spin icon-3x" style="display:none" data-bind="visible:isGettingNext"></i>
            <small style="display:none" data-bind="visible:!hasNextPage()">There is nothing more to show</small>
            <a href="#" style="display:none" data-bind="visible:hasNextPage() && !isGettingNext(), click:getNextPage">Show More</a>
        </div>
        <!--/ko-->
    </section> <!--  theLoop -->
</div>
<!--/ko-->
<script type="text/html" id="jsPostBox">
    <div class="navbar navbar-responsive" style="border:1px solid #ddd">
        <div class="navbar-inner relative clearfix" style="border-radius:0;padding:5px;min-height:33px" data-bind="with:$root.postForm">
            <form style="margin:0;padding:0" class=" relative clearfix">
                <div style="position:absolute;width:35px;left:0;height:100%;margin-right: -6px;padding-bottom: 4px;" data-bind="visible:!RTApp.cpIsCu()">
                    <a class="btn centralize btnPostType" data-bind="click:togglePostType, title:'Click to choose between sharing an update & writing a testimonial'">
                        <span data-bind="flash:postType() === 'postTestimonial'"><i class="icon-user"></i><i class="icon-comment-alt superscript"></i></span>
                        <i data-bind="flash:postType() === 'postStatus'" class="icon-bullhorn"></i>
                    </a>
                </div>
                <div class="container-fluid" style="padding:0 2px;" data-bind="style:{marginLeft:RTApp.cpIsCu() ? '-1px' : '38px'}">
                    <div class="row-fluid">
                        <div class="statusFormTA relative clearfix span9" data-bind="style:{minHeight:postBoxHeight}">
                            <button class="close pull-right" aria-hidden="true" style="margin-left:-1px;" type="button" data-bind="click:destroy, visible:showButtons"><i class="icon-remove"></i></button>
                            <textarea class="pull-left statusFormTextarea" placeholder="" data-bind="attr:{placeholder:prompt}, click:init, value:message, valueUpdate:'afterkeydown', expand : true"></textarea>
                        </div>
                        <div class="span3" style='margin-left:5px'>
                            <div class="btn-group pull-right" id="postButtonContainer" style="margin:4px 5px 0 0">
                                <a class="btn btn-small" href="#" data-bind="enable:canSubmit,click:createNew, title:'Submit'"><i class="icon-share-alt"></i>  <span class="visible-phone">Submit</span></a>
                                <a class="btn btn-small" style="border-right:0 none;" href="#" data-toggle="dropdown"  data-bind="title:'Change visibility'"><i class="icon" data-bind="css:{'icon-eye-open' : privacy() === 'PUBLIC', 'icon-eye-close' : privacy() === 'PRIVATE' }"></i> <span class="visible-phone">Privacy</span></a>
                                <ul class="dropdown-menu" role="menu" aria-labelledby="Privacy Menu">
                                    <li style="display:block;"><small class="muted" style="padding-left:3px;">Choose this Post's Privacy</small></li>
                                    <li style="display:block;"><a href="#" data-bind="click:setPublic"><i class="icon icon-eye-open"></i> Public</a></li>
                                    <li style="display:block;"><a href="#" data-bind="click:setPrivate"><i class="icon icon-eye-close"></i> Private</a></li>
                                </ul>
                                <a class="btn btn-small disabled"><i class="icon-upload-alt" data-bind="title:'Feature not yet enabled'"></i> <span class="visible-phone">Add Photo</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="outerBox contentArea statusFormTA" style="display:none;margin-top:5px;" data-bind="visible:hasLink">
                <button class="close" aria-hidden="true" type="button" data-bind="click:closePreview"><i class="icon-remove"></i></button>
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
                        <div class="thumbnail videoPreview" style="margin-bottom: 5px;">
                            <a data-bind="html:$parent.videoThumb()" target="_blank" class="external_link"></a>
                            <span class="thumbLinks" data-bind="if : $data.link.provider">
                                <a href="#" target="_blank" data-bind="attr:{href:link.provider.url}, html:$parent.providerInfo" class="external_link"></a>
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
</script>
<section id="mediaProfileContent" style="display:none" data-bind="visible:RTApp.ca() === 'media', flash:RTApp.ca() === 'media'">
    <!--ko if:RTApp.isJSAction-->
    <div class="centralize" style="margin:15% auto; color:#999;">
        <i class="icon-spin icon-spinner icon-5x"></i>
    </div>
    <!--/ko-->
</section>
<section id="infoProfileContent" style="display:none" data-bind="visible:RTApp.ca() === 'edit', flash:RTApp.ca() === 'edit'">
    <!--ko if:RTApp.isJSAction-->
    <div class="centralize" style="margin:15% auto; color:#999;">
        <i class="icon-spin icon-spinner icon-5x"></i>
    </div>
    <!--/ko-->
</section>
<section id="infoSettingsContent" style="display:none" data-bind="visible:RTApp.ca() === 'settings', flash:RTApp.ca() === 'settings'">
    <!--ko if:RTApp.isJSAction-->
    <div class="centralize" style="margin:15% auto; color:#999;">
        <i class="icon-spin icon-spinner icon-5x"></i>
    </div>
    <!--/ko-->
</section>
<section id="conversationContent" style="display:none" data-bind="visible:RTApp.ca() === 'conversations', flash:RTApp.ca() === 'conversations'">
    <!--ko if:RTApp.isJSAction-->
    <div class="centralize" style="margin:15% auto; color:#999;">
        <i class="icon-spin icon-spinner icon-5x"></i>
    </div>
    <!--/ko-->
</section>
<section id="adminContent" style="display:none" data-bind="visible:RTApp.cuIsAdmin() && RTApp.ca() === 'leads', flash:RTApp.ca() === 'leads'">
    <!--ko if:RTApp.isJSAction-->
    <div class="centralize" style="margin:15% auto; color:#999;">
        <i class="icon-spin icon-spinner icon-5x"></i>
    </div>
    <!--/ko-->
</section>

<?php include_once APPPATH . 'views/loops/loops.html'; ?>