<?php $interact = isset($interactions) ? $interactions : NULL; ?>
<ul class="small-block-grid-4 visible-phone" id="phoneProfileNav" role="menu" aria-labelledby="mFeed mMembers mListings" >
    <li data-bind="css : {active : RTApp.ca() === 'feed'}"><a href="#" id="mFeed" data-bind="attr : {href : RTApp.cp().uri() + '/feed'}"><i class="sideNavIcon icon-list-alt"></i>&nbsp;Feed</a></li>
    <li data-bind="css : {active : RTApp.ca() === 'info'}"><a href="#" id="mMembers" data-bind="attr : {href : RTApp.cp().uri() + '/members'}"><i class="sideNavIcon icon-group"></i>&nbsp;Users</a></li>
    <li data-bind="css : {active : RTApp.ca() === 'listings'}"><a href="#" id="mListings" data-bind="attr : {href : RTApp.cp().uri() + '/listings'}"><i class="sideNavIcon icon-list"></i>&nbsp;Listings</a></li>
    <li><a href="#"><i class="sideNavIcon icon-ellipsis-vertical"></i>&nbsp;More</a></li>
</ul>
<section id="introContent" data-bind="with:cp" role="main" aria-labelledby="headerTitle headerTitleSmall">
    <h3 id="headerTitle" style="display:inline-block" class="hidden-phone"><?php echo $name ?></h3>
    <span class="pageType hidden-phone"> -<?php echo $content ?></span>
    <span class="parentDesc hidden-phone"></span>
    <h5 style="display:inline-block" class="visible-phone" id="headerTitleSmall">
        <?php echo $name;
        echo $content ? '&nbsp;&nbsp;-&nbsp;&nbsp;' . $content : ''; ?>
    </h5>
    <div class="pageInfo">
        <div class="pageActions">
            <a data-bind="hoverClass: 'hovering'" class="pageActionsButton btn btn-mini hasActiveState like-link <?php echo $interact && $interact['like'] ? 'active' : '' ?>" style="display:none"  data-bind="visible:$data.interactions, css:{active:$data.interactions.like, hovering:!$data.interactions.like()}, title:($data.interactions.like() ? 'Stop Liking ' : 'Like ') + name() + '\'s Profile'">
                <i class="action16 likeSmall"></i>
                <span data-bind="text:$data.interactions.like() ? 'Unlike' : 'Like'"><?php echo $interact && $interact['like'] ? 'Unlike' : 'Like' ?></span>
            </a>
            <!--/ko-->
            <!--ko if : $root.ca() === 'testimonials'-->
            <a data-bind="hoverClass: 'hovering'" class="pageActionsButton btn btn-mini hasActiveState" style="display:none" data-bind="click:$root.startEditMode, title:'Manage Testimonials', visible:$root.cpuIsCu">
                <i class="action16 edit"></i>
                <span>Manage Approvals</span>
            </a>
            <!--/ko-->
            <!--ko if : $root.cpuIsCu-->
            <a data-bind="hoverClass: 'hovering'" class="pageActionsButton btn btn-mini hasActiveState" style="display:none" data-bind="click:editProfile, title:'Edit your profile', visible:$root.cpuIsCu">
                <i class="action16 edit"></i>
                <span>Edit Page</span>
            </a>
            <!--/ko-->
        </div>
    </div>
    <!--ko if : members-->
    <h6>Newest Members</h6>
    <ul class="thumbnails latestThumbsContainer visible-phone" data-bind="serverForEach : {name : 'membersSmall', foreach:members}"></ul>
    <ul class="thumbnails latestThumbsContainer hidden-phone" data-bind="serverForEach : {name : 'membersLarge', foreach:members}"></ul>
    <!--/ko-->
</section> <!--  introcontent -->
<script type="text/html" id="membersLarge">
    <li class="latestThumbs" >
    <div class="thumbnail">
    <a href="#" data-bind="title:'View ' + name() + '\'s Profile', attr:{href : '/' + _id()}"  style="width:80px;height:80px">
    <img alt="latest pictures" class="img-polaroid" data-bind="
    getAvatar : {context : $data, size : 90},
    attr : {alt : name}" width="80px" height="80px" />
    </a>
    </div>
    </li>
</script>
<script type="text/html" id="membersSmall">
    <li class="latestThumbs" >
    <div class="thumbnail">
    <a href="#" data-bind="title:'View ' + name() + '\'s Profile', attr:{href : '/' + _id()}"  style="width:80px;height:80px">
    <img alt="latest pictures" class="img-polaroid" data-bind="
    getAvatar : {context : $data, size : 60},
    attr : {alt : name}" width="60px" height="60px" />
    </a>
    </div>
    </li>
</script>