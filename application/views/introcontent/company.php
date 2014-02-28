<?php $interact = isset($interactions) ? $interactions : NULL; ?>
<ul class="small-block-grid-4 visible-phone grid-fix rtResponsiveMenu" id="phoneProfileNav" role="menu" aria-labelledby="mFeed mMembers mListings" >
    <li data-bind="css : {active : RTApp.ca() === 'feed'}"><a href="#" id="mFeed" data-bind="attr : {href : RTApp.cp().uri() + '/feed'}"><i class="sideNavIcon icon-list-alt"></i>&nbsp;Feed</a></li>
    <li data-bind="css : {active : RTApp.ca() === 'info'}"><a href="#" id="mMembers" data-bind="attr : {href : RTApp.cp().uri() + '/members'}"><i class="sideNavIcon icon-group"></i>&nbsp;Users</a></li>
    <li data-bind="css : {active : RTApp.ca() === 'listings'}"><a href="#" id="mListings" data-bind="attr : {href : RTApp.cp().uri() + '/listings'}"><i class="sideNavIcon icon-list"></i>&nbsp;Listings</a></li>
    <li><a href="#"><i class="sideNavIcon icon-ellipsis-vertical"></i>&nbsp;More</a></li>
</ul>
<section id="introContent" data-bind="with:cp" role="main" aria-labelledby="headerTitle headerTitleSmall">
   <div class="hidden-phone">
        <h3 id="headerTitle" style="display:inline-block"><?php echo $name ?></h3> - <span class="pageType"><?php echo ucfirst($subtype) ?></span>
    	<span> <?php echo "<br>$content" ?></span>        
    </div>       
    <div class="visible-phone">
            <h5 style="display:inline-block" class="noMargTopBtm" id="headerTitleSmall">
                <?php
				echo $name;
                ?> - <small class="pageType"><?php echo ucfirst($subtype) ?></small>
            </h5>
            <?php echo $content ? "<br>$content " : ''; ?>
    </div>

    <div class="pageInfo">
        <div class="pageActions">
            <div class="btn-toolbar">
                <div class="btn-group pull-left">
                    <!--ko if : $root.ca() === 'testimonials'-->
                    <a class="btn btn-small" style="display:none" data-bind="click:$root.startEditMode, title:'Manage Testimonials', visible:$root.cpuIsCu">
                        <i class="icon-tasks"></i>
                        <span>Manage Approvals</span>
                    </a>
                    <!--/ko-->
                    <!--ko if : $root.cpuIsCu-->
                    <a class="btn btn-small" style="display:none" data-bind="click:editProfile, title:'Edit your profile', visible:$root.cpuIsCu">
                        <i class="icon-pencil"></i> <span>Edit Page</span>
                    </a>
                    <!--/ko-->
                </div>
                <div class="btn-group pull-right">
                    <!--ko if : $data.interactions-->
                    <a class="btn btn-small subscribe-link <?php echo $interact && $interact['subscribe'] ? 'active' : '' ?>" style="display:none"  data-bind="visible:$data.interactions, css:{active:$data.interactions.subscribe, hovering:!$data.interactions.subscribe()}, title:($data.interactions.subscribe() ? 'Stop Subscribing to ' : 'Subscribe to ') + name() + '\'s Profile'">
                        <i class="action16 subscribe"></i>
                        <span data-bind="text:$data.interactions.subscribe() ? 'Unsubscribe' : 'Subscribe'"><?php echo $interact && $interact['subscribe'] ? 'Unsubscribe' : 'Subscribe' ?></span>
                    </a>
                    <a class="btn btn-small like-link <?php echo $interact && $interact['like'] ? 'active' : '' ?>" style="display:none"  data-bind="visible:$data.interactions, css:{active:$data.interactions.like, hovering:!$data.interactions.like()}, title:($data.interactions.like() ? 'Stop Liking ' : 'Like ') + name() + '\'s Profile'">
                        <i class="action16 likeSmall"></i>
                        <span data-bind="text:$data.interactions.like() ? 'Unlike' : 'Like'"><?php echo $interact && $interact['like'] ? 'Unlike' : 'Like' ?></span>
                    </a>
                    <!--/ko-->
                </div>
            </div>        
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