<section class="container-fluid" id="mediaLibrary" style="padding-top:10px">
    <div data-bind="css:{dropdown:RTApp.isSmallerThanTablet}">
        <h5 style="display:inline-block;margin-bottom:0;font-variant: small-caps" data-bind="visible:RTApp.isSmallerThanTablet" class="dropdown-toggle alert alert-info shadow" data-toggle="dropdown" href="#"><span>Realtasia</span><b class="caret"></b></h5>
        <ul class="responsiveMenu" role="menu" aria-labelledby="librarySource" data-bind="css:{'dropdown-menu':RTApp.isSmallerThanTablet, 'nav nav-tabs':RTApp.isTabletOrLarger}" style="margin-top:-1px;">
            <li class="active">
                <a class="hovering" href="#" data-bind="click:RTApp.initMediaLibrary"><i class="social26 rta"></i> <span>Realtasia</span></a>
            </li>
            <li class="opaque disabled" data-bind="title:'Feature not yet available'">
                <a class="" href="#"><i class="social26 facebook"></i> <span>Facebook</span></a>
            </li>
            <li class="opaque disabled" data-bind="title:'Feature not yet available'">
                <a class="" href="#"><i class="social26 youtube"></i> <span>YouTube</span></a>
            </li>
            <li class="opaque disabled" data-bind="title:'Feature not yet available'">
                <a class="" href="#"><i class="social26 flickr"></i> <span>Flickr</span></a>
            </li>
            <li class="opaque disabled" data-bind="title:'Feature not yet available'">
                <a class="" href="#"><i class="social26 picasa"></i> <span>Picasa</span></a>
            </li>
        </ul>
    </div>
    <section class="RTAWindowContainer" data-bind="with:cplib" style="padding:10px;background-color:#fff;border:1px solid #ddd;border-top:0 none">
        <div id="mediaSubMenu">
            <!--ko ifnot:selectedAlbum-->
            <h4>Albums <small><a class="dropdown-toggle" id="filterButton" data-bind="click:createAlbum" href="#">Create New Album</a></small></h4>
            <!--/ko-->
            <!--ko if:selectedAlbum-->
            <h4><a  data-bind="click:showAlbums" href="#">&larr; Back</a></h4>
            <!--/ko-->
        </div>
        <!--ko with:selectedAlbum--><div class="albumMenu"><!--ko template : 'albumNav'--><!--/ko--></div><!--/ko-->
        <section class="RTAWindowContent">
            <ul class="thumbnails" style="max-height: none">
                <!--ko serverForEach : {name : 'albums', foreach: albums, if:!selectedAlbum()}--><!--/ko-->
                <!--ko if:selectedAlbum-->
                <!--ko serverForEach : {name : 'picture', foreach: selectedAlbum().attachments}--><!--/ko-->
                <li data-bind="RTModal:selectedAlbum().slideShow"></li>
                <!--ko if:selectedAlbum().hasNextPage-->
                <li class="hasHoverButtons clearfix" style="width:160px">
                    <div class="thumbnail relative clearfix" style="cursor: pointer;">
                        <a href="#" id="loadAttachments" style="width:150px;height:85px;text-align: center;font-size: 2em;display:block;margin-top:65px">Load More</a>
                    </div>
                </li>
                <!--/ko-->
                <!--/ko-->
            </ul>
        </section>
        <div id="editAlbum" data-bind="with:editingAlbum">
            <section class="RTAWindow" data-bind="visible:$data" style="display:none;">
                <header class="titleBar">
                    <div class="contentArea titleBarBG">
                        <button type="button" class="close" aria-hidden="true" data-bind="click:$parent.stopEditingAlbum"><i class="icon-remove"></i></button>
                        <h4>Upload</h4>
                    </div>
                </header>
                <section class="RTAWindowContainer">
                    <section id="uploadArea" class="RTAWindowContent noSidebar">
                        <div class="contentArea introBox relative">
                            <form class="form-horizontal">
                                <!--ko template : 'albumPopupNav'--><!--/ko-->
                                <!--ko ifnot:isDefaultAlbum-->
                                <div class="row-fluid">
                                    <div class="span6">
                                        <div class="control-group">
                                            <label for="albumname" class="control-label" style="width:90px">Album Name: </label>
                                            <div class="controls" style="margin-left:100px">
                                                <label class="muted inplaceLabel" data-bind="visible:!isEditingName(),click:editName, hoverClass:'text-success', text:name()||'Click to Change'"></label>
                                                <!--ko if:isEditingName-->
                                                <input type="text" autocomplete="off" id="name" data-bind="value:name, valueUpdate: 'afterkeydown', disable:isDefaultAlbum, hasfocus:isEditingName" placeholder="Enter an Album name">
                                                <!--/ko-->
                                                <span class="help-block"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span6">
                                        <div class="control-group">
                                            <label for="Descriptions" class="control-label" style="width:80px">Description: </label>
                                            <div class="controls" style="margin-left:90px">
                                                <label class="muted inplaceLabel" data-bind="visible:!isEditingExcerpt(),click:editExcerpt, hoverClass:'text-success', text:excerpt()||'Click to Change'"></label>
                                                <!--ko if:isEditingExcerpt-->
                                                <input type="text" autocomplete="off" data-bind="value:excerpt, valueUpdate: 'afterkeydown', disable:isDefaultAlbum, hasfocus:isEditingExcerpt" id="excerpt" placeholder="Enter a description">
                                                <!--/ko-->
                                                <span class="help-block"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--/ko-->
                            </form>
                        </div>
                        <!--ko if:showAddFiles-->
                        <hr/>
                        <ul class="thumbnails" data-bind="foreach:attachments">
                            <li class="span6">
                                <div class="thumbnail">
                                    <div class="media">
                                        <div class="pull-left" style="text-align: center">
                                            <img alt="Uploaded File" onLoad="$(this).fadeTo('slow', 1)" class="media-object img-rounded" src="/images/nothumb110.png" width="110" height="110" data-bind="attr:{src:getThumbnail}">
                                        </div>
                                        <div class="media-body">
                                            <!--ko if:isUploading-->
                                            <label class="muted" data-bind="text:uploadingText"></label>
                                            <div class="progress progress-striped active" style="height:15px;border-radius: 2px">
                                                <div class="bar" data-bind="style:{width:percent() + '%'}"></div>
                                            </div>
                                            <!--/ko-->
                                            <!--ko ifnot:isUploading-->
                                            <button type="button" class="close" aria-hidden="true" data-bind="click:$parents[1].deleteFile"><i class="icon-remove"></i></button>
                                            <label>
                                                <span data-bind="text:name"></span>
                                            </label>
                                            <!--ko if:editing-->
                                            <input type="text" data-bind="value:message, hasfocus:editing" placeholder="Describe this item" style="padding:2px" />
                                            <!--/ko-->
                                            <label class="muted inplaceLabel" data-bind="visible:!editing(),click:edit, hoverClass:'text-success', text:message()||'Add Description'"></label>
                                            <!--/ko-->
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <!--/ko-->
                    </section>
                </section>
            </section>
        </div>
    </section>
</section>

<script type="text/html" id="picture">
    <li class="hasHoverButtons clearfix">
        <div class="thumbnail relative clearfix" style="cursor: pointer;">
            <a href="#" data-bind="attr:{href:'//' + picture(), title:excerpt,rel:$parent._id}, click:$parent.setCurrentItem">
                <span data-bind="html:getAttachmentThumb(150)"></span>
            </a>
            <ul class="imageBar" style="display: none;">
                <li>
                    <a href="#" class="hasActiveState" data-bind="click:$parents[1].deleteFile || $parent.deleteFile">
                        <i class="action16 xCircleBG"></i>
                    </a>
                </li>
                <li>
                    <a href="#"  class="editFile hasActiveState">
                        <i class="action16 edit"></i>
                    </a>
                </li>
                <li>
                    <a href="#" style="margin-right: 1px;" class="like-link"  data-bind="css:{hovering:!$data.interactions.like(),active:$data.interactions.like,text:$data.interactions.like}, title:likeTitle">
                        <i class="action16 likeSmall"></i>
                    </a>
                </li>
                <li>
                    <a href="#" style="margin-right: 1px;" class="subscribe-link"  data-bind="css:{hovering:!$data.interactions.subscribe(),active:$data.interactions.subscribe,text:$data.interactions.subscribe}, title:subscribeTitle">
                        <i class="action16 subscribe"></i>
                    </a>
                </li>
            </ul>
        </div>
    </li>
</script>
<script type="text/html" id="albumPopupNav">
    <div class="row-fluid" style="margin-bottom:10px">
    <div class="span5">
    <h3 data-bind="text:name() && name() || 'Create New Album'"></h3>
    <span class="muted" data-bind="text:excerpt"></span>
    </div>
    <div class="span7">
    <div class="btn-toolbar pull-right">
    <div class="btn-group">
    <button class="btn btn-small btn-rta" id="browseButton" data-bind="click:checkAlbum">
    <i class="icon-upload"></i> Add Files
    </button>
    </div>
    <!--ko ifnot:isDefaultAlbum-->
    <div class="btn-group" data-toggle="buttons-radio" style="z-index:10">
    <button type="button"  class="btn btn-small" data-bind="title:'Make album Public', placement:'bottom', css:{active:privacy.is() === 'PUBLIC'}, click:setPublic">
    <i class="icon-eye-open"></i></button>
    <button type="button"  class="btn btn-small" data-bind="title:'Make album Private', placement:'bottom', css:{active:privacy.is() === 'PRIVATE'}, click:setPrivate">
    <i class="icon-eye-close"></i></button>
    </div>
    <div class="btn-group">
    <button class="btn btn-small" data-bind="click:$parent.deleteAlbum.bind($parent)"><i class="icon-remove-sign"></i> Delete Album</button>
    </div>
    <!--/ko-->
    <div class="btn-group">
    <button class="btn btn-small btn-info" data-bind="click:saveAlbum, enable:isSavable"><i class="icon-ok-sign"></i> <span data-bind="text:autoSaveMessage() || 'Save'"></span></button>
    </div>
    </div>
    </div>
    </div>
    </div>
</script>
<script type="text/html" id="albumNav">
    <div class="row-fluid" style="margin-bottom:10px">
    <div class="span5">
    <h3 data-bind="text:name && name() || 'Create New Album'"></h3>
    <span class="muted" data-bind="text:excerpt"></span>
    </div>
    <div class="span7">
    <div class="btn-toolbar pull-right">
    <div class="btn-group" data-bind="ifnot:$data.isDefaultAlbum && $data.isDefaultAlbum()">
    <button class="btn btn-small" data-bind="click:$parent.editAlbum"><i class="icon-pencil"></i> <span data-bind="text: 'Edit Album / Add Files'"></span></button>
    </div>
    <div class="btn-group">
    <button class="btn btn-small" data-bind="enable:$data.hasNextPage,click:$parent.getAttachments.bind($data,1)">Load More</button>
    </div>
    </div>
    </div>
    </div>
    </div>
</script>
<script type="text/html" id="albums">
    <li class="hasHoverButtons">
    <label style="text-align: center"><span data-bind="text:name"></span> (<small class="muted" data-bind="text:counts.attachments"></small>)</label>
    <a href="#" class="thumbnail relative" data-bind="click:$parent.setSelected" style="border-style:dashed">
    <span data-bind="html:getThumbnail(150)"></span>

    <p class="label label-inverse" style="display: none;" data-bind=""></p>
    </a>
    </li>
</script>
<?php include APPPATH . 'views/loops/loops.html' ?>