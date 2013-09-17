<section class="contentArea centerContent" id="libraryMobile" data-bind="css:{'container-fluid': RTApp.isSmallerThanTablet}, with:cplib">
    <div data-bind="slideTemplate:{name:'page', data:currentPage, if: currentPage}"></div>
    <a href="#" data-bind="visible:!currentPage(), click:function(){return currentIndex(1);}">Show Library</a>
</section>


<script type="text/html" id="page">
<div class="navbar navbar-subcontrol">
    <div class="navbar-inner">
        <ul class="nav pull-left" data-bind="foreach:leftLinks">
            <li>
                <a href="#" data-bind="click: $data.action, title:$data.title, position:'bottom'">
                    <i data-bind="attr:{ 'class': $data.icon}"></i>
                </a>
            </li>
            <li class="divider-vertical"></li>
        </ul>
        <h4 style="margin:7px auto 0 auto;display:inline-block" data-bind="text:name"></h4>
        <ul class="nav pull-right" data-bind="foreach:rightLinks">
            <li class="divider-vertical"></li>
            <li>
                <a href="#" data-bind="click: $data.action, title:$data.title, position:'bottom'">
                    <i data-bind="attr:{ 'class': $data.icon}"></i>
                </a>
            </li>
        </ul>
    </div>
</div>
<form action="/jason-nathan" method="GET" id="filterform" accept-charset="utf-8" style="margin-bottom:5px;" data-bind="if:Search">
<section id="feedActionDiv">
    <div class="dropdown" id="filterButtonDiv">
        <div style="">
            <a href="#" id="filterButton" class="dropdown-toggle">Show:&nbsp;
                <span class="dropDownSelected">RealtAsia</span>&nbsp;<i class="icon-caret-down"></i>
            </a>
            <ul class="dropdown-menu">
                <li>
                    <a href="#">RealtAsia</a>
                </li>
                <li>
                    <a class="disabled">Facebook</a>
                </li>
                <li>
                    <a class="disabled">Picasa</a>
                </li>
                <li>
                    <a class="disabled">Flickr</a>
                </li>
            </ul>
        </div>
    </div>
    <div id="sortButtonDiv" class="dropdown">
        <div style="">
            <i class="icon-spinner icon-spin" style="display: none;"></i>
            <a class="btn btn-small dropdown-toggle" id="sortButton" href="#">Sort:&nbsp;
                <span class="sortSelected">Newest</span>&nbsp;
                <i class="icon-caret-down"></i>
            </a>
            <ul class="dropdown-menu" role="menu" style="font-size:95%">
                <li role="menuitem">
                    <a href="#" class="selectClose">Popular</a>
                </li>

                <li role="menuitem">
                    <a href="#" class="selectClose">Newest</a>
                </li>
            </ul>
        </div>
    </div>
</section> <!--  sort button & result count -->
<input type="hidden" name="state" value="e1857a43b3a7688c3e6887d943f262c4aa824be7"><input type="hidden" name="sec_id" value="1373238553"></form>
<div data-bind="template:content" style="border-top:1px solid #eee;padding:10px 10px 0 10px"></div>
</script>

<script type="text/html" id="albumsList">
<ul class="media-list" id="albumView" data-bind="foreach:$data">
    <li class="media">
        <a class="clearfix" href="#" data-bind="click:seeAlbum">
            <div class="pull-left">
                <img style="display:none" onload="$(this).fadeIn()" class="img-polaroid" src="http://dummyimage.com/90x90" />
            </div>
            <div class="media-body">
                <p data-bind="text:name"></p>
                <small class="muted" data-bind="text:description"></small>
            </div>
        </a>
    </li>
</ul>
</script>


<script type="text/html" id="pictureList">
<div data-bind="foreach:$data">
    <a class="thumbnail grid" data-bind="click:seeAttachment">
        <img style="display:none;width:150px;height:150px" onload="$(this).fadeIn()" src="http://dummyimage.com/150x150" width="150" height="150" />
    </a>
</div>
</script>


<script type="text/html" id="editForm">
<div class="btn-toolbar" style="margin-top:0">
    <div class="btn-group">
        <button class="btn"><i class="icon-save"></i> Save</button>
    </div>
    <div class="btn-group">
        <button class="btn active"><i class="icon-eye-open"></i> Public</button>
        <button class="btn"><i class="icon-eye-close"></i> Private</button>
    </div>
</div>
<div style="margin:0 -5px;min-height:32px;">
    <div class="alert" style="margin-bottom:0;display:non;padding:5px 10px;">
        <span style="font-variant:small-caps;font-size:90%">Saved &middot;
            <a href="#"><i class="icon-undo"></i> Undo Changes</a>
        </span>
    </div>
</div>
<form class="RTForm">
    <label>Name</label>
    <input type="text" class="input-large" data-bind="value:name, valueUpdate: 'afterkeydown'" />
    <label>Description</label>
    <textarea type="text" class="input-large" data-bind="value:description, valueUpdate: 'afterkeydown', expand:35" />
    <input type="hidden" name="state" data-bind="value:RTApp.st" />
</form>
</script>