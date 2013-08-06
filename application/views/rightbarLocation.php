<aside id="rightbar" class="visible-desktop">
    <div class="outerBox">
        <div class="contentArea widgetContentBG">
            <h5 class="sideBarHeader">
                <a href="#"><i class="icon icon-user"></i>Checked-In Members&nbsp;</a><span class="badge badge-blue">4</span>
            </h5>
            <ul class="thumbnails thumbnailGallery">
                <li class="smallNail"><div class="thumbnail checkIns"><a href="#"><img alt="Checked In Members" src="http://placehold.it/45" alt="image" /></a><i class="offline"></i></div></li>
                <li class="smallNail"><div class="thumbnail checkIns"><a href="#"><img alt="Checked In Members" src="http://placehold.it/45" alt="image" /></a><i class="online"></i></div></li>
                <li class="smallNail"><div class="thumbnail checkIns"><a href="#"><img alt="Checked In Members" src="http://placehold.it/45" alt="image" /></a><i class="online"></i></div></li>
                <li class="smallNail"><div class="thumbnail checkIns"><a href="#"><img alt="Checked In Members" src="http://placehold.it/45" alt="image" /></a><i class="offline"></i></div></li>
            </ul>
            <div class="moreContainer">
                <h5><a class="moreLink" href="#">More&hellip;</a></h5>
            </div>
            <hr class="thumbnailGallerySeperator" />
            <h5 class="sideBarHeader hovering">
                <a href="#"><i class="action16 likeSmall"></i>Likes&nbsp;</a><span class="badge badge-blue">54</span>
            </h5>
            <ul class="thumbnails thumbnailGallery">
                <?php
                $a_rand = array('00', 'ff', '00', 'ff');
                for ($i = 0; $i <= 3; $i++)
                {
                    $r    = array_rand($a_rand);
                    $g    = array_rand($a_rand);
                    $b    = array_rand($a_rand);
                    $rand = $a_rand[$r] . $a_rand[$g] . $a_rand[$b];
                    $font = ($rand == 'ffffff') ? '000' : 'fff';
                    ?>
                    <li class="smallNail"><div class="thumbnail"><a href="#"><img alt="Thumbnails" src="http://placehold.it/45" alt="image" /></a></div></li>
                    <?
                }
                ?>
            </ul>
            <div class="moreContainer">
                <h5><a class="moreLink" href="#">More&hellip;</a></h5>
            </div>
            <hr class="thumbnailGallerySeperator" />
            <h5 class="sideBarHeader">
                <a href="#"><i class="info16 subscribers"></i>Subscribers&nbsp;</a>&nbsp;<span class="badge badge-blue">14</span>
            </h5>
            <ul class="thumbnails thumbnailGallery">
                <?php
                for ($i    = 0; $i <= 3; $i++)
                {
                    $r    = array_rand($a_rand);
                    $g    = array_rand($a_rand);
                    $b    = array_rand($a_rand);
                    $rand = $a_rand[$r] . $a_rand[$g] . $a_rand[$b];
                    $font = ($rand == 'ffffff') ? '000' : 'fff';
                    ?>
                    <li class="smallNail"><div class="thumbnail"><a href="#"><img  alt="Thumbnails"src="http://placehold.it/45" alt="image" /></a></div></li>
                    <?
                }
                ?>
            </ul>
            <div class="moreContainer">
                <h5><a class="moreLink" href="#">More&hellip;</a></h5>
            </div>
        </div>
    </div>
    <div class="outerBox">
        <div class="contentArea widgetContentBG">
            <h5 class="sideBarHeader">
                <a href="#"><i class="info16 event"></i>Current Events&nbsp;</a><span class="badge badge-blue">4</span>
            </h5>
            <ul class="thumbnails eventContainer">
                <li>
                    <div class="eventDate"><div class="month">Jun</div><div class="day">30</div></div>
                    <h6><a>Open House @ CairnHill</a></h6>
                    <span class="eventTime">8.00 AM - 8.00 PM</span>
                </li>
                <li>
                    <div class="eventDate"><div class="month">Sep</div><div class="day">27</div></div>
                    <h6><a>Open House @ Jln Loyang Besar</a></h6>
                    <span class="eventTime">8.00 AM - 8.00 PM</span>
                </li>
            </ul>
            <div class="moreContainer">
                <h5><a class="moreLink" href="#">More&hellip;</a></h5>
            </div>
        </div>
    </div>
</aside> <!--  rightbar -->