<?php defined('SYSPATH') or die('No direct script access.'); ?>
<div class="row-fluid">
    <div class="span12">
        <div class="thumbnails">

        </div>
    </div>
</div>
<section class="leftContent" id="mediaLibrary">
    <ul class="nav nav-tabs">
        <li class="active">
            <a class="hovering" href="#"><i class="social26 rta"></i> <span>Realtasia</span></a>
        </li>
        <li class="">
            <a class="" href="#"><i class="social26 facebook"></i> <span>Facebook</span></a>
        </li>
        <li class="">
            <a class="" href="#"><i class="social26 youtube"></i> <span>YouTube</span></a>
        </li>
        <li class="">
            <a class="" href="#"><i class="social26 flickr"></i> <span>Flickr</span></a>
        </li>
        <li class="">
            <a class="" href="#"><i class="social26 picasa"></i> <span>Picasa</span></a>
        </li>
    </ul>
    <section class="RTAWindowContainer" data-bind="with:cp().lib" style="padding:10px">
        <div id="mediaSubMenu">
            <!--ko ifnot:selectedAlbum-->
            <h4>Albums <small><a class="dropdown-toggle" id="filterButton" data-bind="click:createAlbum" href="#">Create New Album</a></small></h4>
            <!--/ko-->
            <!--ko if:selectedAlbum-->
            <h4><a  data-bind="click:showAlbums" href="#">&larr; Back</a></h4>
            <!--/ko-->
        </div>
        <!--ko with:selectedAlbum-->
        <div class="albumMenu"><!--ko template : 'albumNav'--><!--/ko--></div><!--/ko-->
        <section class="RTAWindowContent">
            <ul class="thumbnails" id="thumbnails">
                <!--ko ifnot: selectedAlbum-->
                <!--ko serverForEach : {name : 'album', foreach: albums}--><!--/ko-->
                <!--/ko-->
                <!--ko if: selectedAlbum--><!--ko serverForEach : {name : 'picture', foreach: selectedAlbum().attachments}--><!--/ko--><!--/ko-->
                <li>
                    <label style="text-align: center"><span>Docs</span> (<small class="muted">2</small>)</label>
                    <a class="thumbnail" href="#" style="height:150px;width:150px">
                        <i class="attachment PDF150"></i>
                    </a></li>
            </ul>
        </section>
        <div data-bind="dialog:popupSettings, toggleDialog: editingAlbum, template: { name: 'editAlbum', data: editingAlbum, if:editingAlbum }"></div>
    </section>
</section>
<script type="text/html" id="picture">
    <div></div>
</script>