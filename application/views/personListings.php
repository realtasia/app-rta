<div id="contentArea" class="centerContent">
    <?php $interact = isset($cp['interactions']) ? $cp['interactions'] : NULL;?>
    <section id="introContent" data-bind="with:cp">
        <h3 data-bind="text:name"><?php echo $cp['name'] ?></h3>
        <div class="pageInfo">
            <span class="pageType" data-bind="text:designation() + ','"><?php if($d=Arr::get($cp, 'designation')){echo $d . ',';} ?></span> <span class="parentDesc">
                <a href="#" data-bind="text:company.name"><?php echo Arr::path($cp, 'company.name')?></a>
            </span>
            <div class="pageActions">
                <!--ko if : $data.interactions-->
                    <a data-bind="hoverClass: 'hovering'" class="pageActionsButton btn btn-mini hasActiveState subscribe-link <?php echo $interact&&$interact['subscribe'] ? 'active' : '' ?>">
                        <i class="action16 subscribe"></i>
                        <span><?php echo $interact&&$interact['subscribe'] ? 'Unsubscribe' : 'Subscribe' ?></span>
                    </a>
                    <a data-bind="hoverClass: 'hovering'" class="pageActionsButton btn btn-mini hasActiveState like-link <?php echo $interact&&$interact['like'] ? 'active' : '' ?>">
                        <i class="action16 likeSmall"></i>
                        <span><?php echo $interact&&$interact['subscribe'] ? 'Unlike' : 'Like' ?></span>
                    </a>
                <!--/ko-->
                <a class="moreLink">View More<i class="Action16 infoCircleBG"></i></a>
            </div>
        </div>
    </section> <!--  introcontent -->
        <form class="profileListings listingsSearch" accept-charset="utf-8" id="filterform" method="GET" action="/members">
            <div id="wraparound" class="outerBox relative">
                <div id="search-wrap" class="filterContentBG contentArea contentNoBottom">
                    <div class="inputFill" style="height:29px;width:312px;">
                        <div class="inputFill" style="height:29px;width:220px;float:left">
                            <input type="text" id="searchInput" style="width:218px;" placeholder="Search Listings" />
                            <div class="btn-group">
                                <button class="btn btn-small ">Rent & Sale</button>
                                <button class="btn btn-small dropdown-toggle" data-toggle="dropdown">
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a>Rent & Sale</a></li>
                                    <li><a>Rent</a></li>
                                    <li><a>Sale</a></li>
                                </ul>
                            </div>
                        </div>
                        <!--                                <button type="submit" class="btn" style="width:70px;margin:0;height:28px;">Search</button>-->
                    </div>
                    <button class="btnReset directoryIcons i-map" id="mapBtn"></button>
                </div>
            </div> <!-- SEARCH BOX -->
            <div style="display:none;" id="drop-down-filter" class="centerWidth outerBox relative shadow">
                <div class="filterBox filterContentBG contentArea contentNoTop">
                    <div class="formContainer">
                        <div class="containerLeft">
                            <div class="btn-toolbar">
                                <div class="btn-group">
                                    <button class="btn btn-mini ">Residential Apartments</button>
                                    <button class="btn btn-mini dropdown-toggle" data-toggle="dropdown">
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a>All Residential</a></li>
                                        <li><a>HDB</a></li>
                                        <li><a>Residential Apartments</a></li>
                                        <li><a>Residential Landed</a></li>
                                        <li><a>Residential Serviced</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="containerRight">
                            <div class="btn-toolbar">
                                <div class="btn-group">
                                    <button class="btn btn-mini half">500 sqft</button>
                                    <button class="btn btn-mini dropdown-toggle" data-toggle="dropdown">
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a>500 sqft</a></li>
                                        <li><a>1000 sqft</a></li>
                                        <li><a>2000 sqft</a></li>
                                        <li><a>3000 sqft</a></li>
                                        <li><a>4000 sqft</a></li>
                                        <li><a>5000 sqft</a></li>
                                        <li><a>6000 sqft</a></li>
                                        <li><a>7000 sqft</a></li>
                                        <li><a>8000 sqft</a></li>
                                        <li><a>9000 sqft</a></li>
                                    </ul>
                                    <label>&mdash;</label>
                                    <button class="btn btn-mini half">> 9000 sqft</button>
                                    <button class="btn btn-mini dropdown-toggle" data-toggle="dropdown">
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a>500 sqft</a></li>
                                        <li><a>1000 sqft</a></li>
                                        <li><a>2000 sqft</a></li>
                                        <li><a>3000 sqft</a></li>
                                        <li><a>4000 sqft</a></li>
                                        <li><a>5000 sqft</a></li>
                                        <li><a>6000 sqft</a></li>
                                        <li><a>7000 sqft</a></li>
                                        <li><a>8000 sqft</a></li>
                                        <li><a>> 9000 sqft</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="containerLeft">
                            <div class="btn-toolbar">
                                <div class="btn-group leftNudge">
                                    <input placeholder="S$1,500"/>
                                    <label>&mdash;</label>
                                    <input placeholder="S$2 million"/>
                                </div>
                            </div>
                        </div>
                        <div class="containerRight">
                            <div class="btn-toolbar">
                                <div class="btn-group">
                                    <button class="btn btn-mini half">STUDIO</button>
                                    <button class="btn btn-mini dropdown-toggle" data-toggle="dropdown">
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a>STUDIO</a></li>
                                        <li><a>1 Room</a></li>
                                        <li><a>2 Rooms</a></li>
                                        <li><a>3 Rooms</a></li>
                                        <li><a>4 Rooms</a></li>
                                        <li><a>5 Rooms</a></li>
                                        <li><a>6 Rooms</a></li>
                                        <li><a>7 Rooms</a></li>
                                        <li><a>8 Rooms</a></li>
                                        <li><a>9 Rooms</a></li>
                                    </ul>
                                    <label>&mdash;</label>
                                    <button class="btn btn-mini half">9 Rooms</button>
                                    <button class="btn btn-mini dropdown-toggle" data-toggle="dropdown">
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a>STUDIO</a></li>
                                        <li><a>1 Room</a></li>
                                        <li><a>2 Rooms</a></li>
                                        <li><a>3 Rooms</a></li>
                                        <li><a>4 Rooms</a></li>
                                        <li><a>5 Rooms</a></li>
                                        <li><a>6 Rooms</a></li>
                                        <li><a>7 Rooms</a></li>
                                        <li><a>8 Rooms</a></li>
                                        <li><a>9 Rooms</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="containerLeft"></div>
                        <div class="containerRight">
                            <div class="formButtons">
                                <a class="btn" data-bind="hoverClass: 'hovering'" id="cancelSearch"><i class="action20 xCircleBG"></i></a>
                                <a class="btn" data-bind="hoverClass: 'hovering'" id="doSearch"><i class="action20 search"></i></a>
                            </div> <!-- SEARCH FORM BUTTONS -->
                        </div>
                    </div>
                </div>
            </div>
            <input type="hidden" value="c6d6581afc6dda3ec151f8353a96a8d1ca3d865e" name="token">
        </form> <!-- SEARCH AREA -->
        <section id="theLoop" data-bind="if:cl">
            <section id="feedActionDiv">
                <div id="filterButtonDiv" class="dropdown hasActiveState" data-bind="hoverClass: 'hovering'">
                    <a data-toggle="dropdown" class="dropdown-toggle" id="filterButton" href="#">Show:&nbsp;<span class="dropDownSelected">All</span>&nbsp;<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#" id="filterAll">All</a></li>
                        <li><a href="#" id="filterPopular">Published</a></li>
                        <li><a href="#" id="filterDraft">Draft</a></li>
                    </ul>
                </div>
                <div id="sortButtonDiv" class="dropdown hasActiveState" data-bind="hoverClass: 'hovering'">
                    <a data-toggle="dropdown" class="btn btn-small dropdown-toggle" id="sortButton" href="#">Sort:&nbsp;<span class="sortSelected">Popular</span>&nbsp;<span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#" id="sortNewest">Newest</a></li>
                        <li><a href="#" id="sortPopular">Popular</a></li>
                    </ul>
                </div>
            </section> <!--  sort button & result count -->
        <article class="postFeed">
            <div class="dropdown postSettings">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown"></a>
                <ul class="dropdown-menu">
                    <li><a href="#">Hide Post</a></li>
                    <li><a href="#">UnSubscribe</a></li>
                    <li class="divider"></li>
                    <li><a href="#">Report Post</a></li>
                </ul>
            </div> <!-- post settings -->
            <div class="feedProfileThumbs thumbnails">
                <span class="mediumNail">
                    <a href="#" class="thumbnail">
                        <img alt="Author" src="/img/thumbs/1.jpg" alt="">
                    </a>
                </span>
            </div> <!-- post profile thumb -->
            <div class="postTitle">
                <a href="#">Pretty Gal</a> posted a listing for <b>Sale</b> in <a href="#">Lakepoint Condominium</a>
            </div> <!-- post Title -->
            <div class="widgetOuterBox relative isListing">
                <article class="contentArea widgetContentBG media listing relative">
                    <div class="mainListingContent">
                        <div class="pull-left">
                            <a class="thumbnail" href="">
                                <img alt="Author Small" src="/images/imphoto.jpg">
                            </a>
                            <ul class="mediaThumbLinks">
                                <li><span class="thumbInfo"><a href="#"><i class="info16 images"></i>15 Photos</a></span></li>
                                <li><span class="thumbInfo"><a href="#"><i class="info16 videos"></i>1 Videos</a></span></li>
                            </ul>
                        </div> <!-- listings thumbnail -->
                        <div class="media-body media-details">
                            <h3 class="media-heading"><a href="#">Carribean @ Keppel Bay</a></h3>
                            <span class="price relative">
                                <span class="listingType">FOR<br />SALE</span>
                                $200,000,000
                            </span>
                            <dl class="dl-horizontal">
                                <dt><i class="info16 sqft"></i></dt><dd>8,000 sqft</dd>
                                <dt><i class="info16 bathrooms"></i></dt><dd>3 toilets</dd>
                                <dt><i class="info16 bedrooms"></i></dt><dd>3 bedrooms</dd>
                            </dl>
                            <p>
                                Need 1 Billion to vote for Palestine Google is having a vote on whether to name Israel or Palestine on its map on Google earth please vote for Palestine and share.
                            </p>
                        </div> <!-- listings content -->
                    </div>
                </article>
            </div> <!-- post content -->
            <div class="postActions">
                <ul class="postActionButtons">
                    <li class="hasActiveState" data-bind="hoverClass: 'hovering'"><a href="#"><i class="action20 share"></i></a></li>
                    <li class="hasActiveState" data-bind="hoverClass: 'hovering'"><a href="#"><i class="action20 subscribe"></i></a></li>
                    <li class="hasActiveState" data-bind="hoverClass: 'hovering'"><a href="#"><i class="action20 like"></i></a></li>
                </ul>
                <ul class="postActionInfo">
                    <li data-bind="hoverClass: 'hovering'"><a href="#"><i class="action16 comments"></i>51</a></li>
                    <li data-bind="hoverClass: 'hovering'"><a href="#"><i class="info16 people"></i>215</a></li>
                    <li data-bind="hoverClass: 'hovering'"><a href="#"><i class="action16 likeSmall"></i>167</a></li>
                </ul>
            </div> <!-- post action links -->
            <!-- comment OuterBox-->
        </article> <!--  listing -->
        </section> <!--  theLoop -->
</div>