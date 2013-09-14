<aside id="rightbar" class="visible-desktop">
    <section style="position:fixed;top:0;margin-top: 54px;width:250px">
        <!--ko with : cp-->
        <div class="outerBox">
            <div class="contentArea widgetContentBG">
                <h5 class="sideBarHeader hovering">
                    <a href="/<?php echo Arr::get($links, 'Likers') ?>">
                        <i class="action16 likeSmall"></i>Likes
                    </a>
                    <span class="badge badge-blue" data-bind="text:counts.likers">0</span>

                </h5>
                <!--ko if : likers().length > 0-->
                <ul class="thumbnails thumbnailGallery" style="display:<?php echo isset($cp['likers']) && count($cp['likers']) > 0 ? 'block' : 'none' ?>;"
                    data-bind="visible : likers().length > 0, serverForEach : {name : 'rightbarThumbs', foreach:likers}">
                        <?php if (isset($cp['likers']) && !empty($cp['likers'])): foreach ($cp['likers'] as $l): ?>

                            <li class="smallNail"><div class="thumbnail">
                                    <a href="#" title="<?php echo $l['name'] ?>" style="width:35px;height:35px"><img alt="Thumbnails" src="<?php echo 'http://' .$api . "/avatar/{$l['_id']}" . "/40" ?>" alt="<?php echo $l['name'] ?>" width="35px" height="35px" /></a></div>
                            </li>
                        <?php endforeach;
                    endif; ?>
                </ul>
                <!--/ko-->
                <div class="moreContainer" style="display:<?php echo isset($cp['likers']) && count($cp['likers']) > 5 ? 'block' : 'none' ?>;" data-bind="if : likers().length > 5">
                    <h5><a class="moreLink" href="#">More&hellip;</a></h5>
                </div>
                <hr class="thumbnailGallerySeperator" />
                <h5 class="sideBarHeader">
                    <a href="/<?php echo Arr::get($links, 'Subscribers') ?>">
                        <i class="info16 subscribers"></i>Subscribers
                    </a>
                    <span class="badge badge-blue" data-bind="text:counts.subscribers">0</span>
                </h5>
                <!--ko if : subscribers().length > 0-->
                <ul class="thumbnails thumbnailGallery" style="display:<?php echo isset($cp['subscribers']) && count($cp['subscribers']) > 0 ? 'block' : 'none' ?>;" data-bind="visible : subscribers().length > 0,serverForEach : {name : 'rightbarThumbs', foreach:subscribers}">
<?php foreach ($cp['subscribers'] as $s): ?>
                        <li class="smallNail">
                                <a class="thumbnail" href="#" title="<?php echo $s['name'] ?>" style="width:40px;height:40px">
                                <img alt="Subscribers" src="<?php echo 'http://' .$api . "/avatar/{$s['_id']}" . "/40" ?>" alt="<?php echo $s['name'] ?>" width="40px" height="40px" /></a>
                        </li>
<?php endforeach; ?>
                </ul>
                <!--/ko-->
                <div class="moreContainer" style="display:<?php echo isset($cp['subscribers']) && count($cp['subscribers']) > 5 ? 'block' : 'none' ?>;" data-bind="visible : subscribers().length > 0, if : subscribers().length > 5">
                    <h5><a class="moreLink" href="#">More&hellip;</a></h5>
                </div>
            </div>
        </div>
        <!--/ko-->
    </section>
</aside> <!--  rightbar -->

<script type="text/html" id="rightbarThumbs">
    <li class = "smallNail" ><div class = "thumbnail">
            <a href="#" data-bind="title:'View ' + name() + '\'s Profile', href : '/' + _id()"  style="width:35px;height:35px"><img alt="Thumbnails" data-bind="getAvatar : {context : $data, size : 40}, attr : {alt : name}" width="35px" height="35px" /></a></div>
    </li>
</script>
<script type="text/html" id="adminCounts">
    <div class="outerBox" data-bind="with : $root.admin" id="adminCountWidget">
        <div class="contentArea widgetContentBG" data-bind="slideToggle : countPreferences">
            <h5 class="sideBarHeader hovering">
                <a href="#" data-bind="click: getAll">
                    All Users
                    <span class="badge badge-inverse" data-bind="text:counts().all.count">0</span>
                </a>

            </h5>
            <hr class="thumbnailGallerySeperator" />
            <ul class="nav">
                <li style="margin-bottom:5px">
                    <a href="#" data-bind="click: getPresentations">Presentations<span class="badge" data-bind="text:counts().presentation.count">0</span></a>
                </li>
                <li>
                    <a href="#" data-bind="click: getSignups">SignUps<span class="badge" data-bind="text:counts().signup.count">0</span></a>
                </li>
            </ul>
            <h5 class="sideBarHeader hovering">
                <a href="#" data-bind="click: getActivity">
                    Your Activity
                    <span class="badge badge-inverse" data-bind="text:counts().activity.count">0</span>
                </a>

            </h5>
            <hr class="thumbnailGallerySeperator" />
            <ul class="nav">
                <li style="margin-bottom:5px">
                    <a href="#" data-bind="click: getActivations">Activations<span class="badge" data-bind="text:counts().activations.count">0</span></a>
                </li>
                <li>
                    <a href="#" data-bind="click: getPending">Still Pending<span class="badge" data-bind="text:counts().pending.count">0</span></a>
                </li>
            </ul>
        </div>
        <div class="moreContainer">
            <h6 style="margin-right:10px"><a class="moreLink" href="#" data-bind="click:hideCounts, text : countPreferences() ? 'HIDE COUNTS' : 'SHOW COUNTS'"><span>
                        <i class="icon-spinner icon-spin" id="rtAdminCountLoader"></i>
                    </span>SHOW COUNTS</a></h6>
        </div>
    </div>
</script>
