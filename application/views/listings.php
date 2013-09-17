<?php defined('SYSPATH') or die('No direct script access.'); ?>
<!--ko ifnot:Search().showingMobileSearch-->
<?php if (isset($introcontent)): ?>
    <div class="contentArea" data-bind="css:{centerContent: RTApp.isLargerThanDefault, 'container-fluid': RTApp.isSmallerThanTablet}, style:{marginLeft:centerView}">
        <?php include $introcontent; ?>
    <?php else: ?>
        <div class="container-fluid relative" data-bind="style:{marginLeft:centerView}" style="margin-top:50px;">
            <div class="outerBox centerWidth relative">
                <section class="contentArea introBox widgetContentBG relative">
                    <div class="hidden-phone">
                        <h2 id="introHeader" ><i class="icon-map-marker"></i> Listings Directory</h2>
                        <p><?php echo Kohana::message('pages', 'listings.description') ?></p>
                    </div>
                    <h3 class="noMargTopBtm visible-phone"><i class="icon-map-marker"></i> Listings Directory</h3>
                </section>
            </div> <!-- intro content -->
        <?php
        endif;
        include_once APPPATH . 'views/loops/loops.html';
        ?>
        <div class="outerBox centerWidth relative" style="margin-top:10px;">
            <div class="visible-phone centralize" data-bind="with:Search">
                <button class="btn btn-large" style="box-shadow:1px 1px 3px #ccc;width:100%;font-weight:bold;font-size:1.2em;color:#777" data-bind="click:toggleMobileListingSearch"><i class="icon-search"></i> Search</button>
            </div>
            <div class="contentArea contentBox">
                <form class="listingsSearch RTASearch hidden-phone" accept-charset="utf-8" id="filterform" method="GET" action="/listings">
                    <div id="wraparound" class="outerBox relative">
                        <section id="search" class="filterContentBG contentArea contentNoBottom">
                            <div class="input-append input-large input-prepend" style="width:82%" data-bind="with:Search().formFields">
                                <span class="add-on" style="cursor:help" data-bind="
                                      title: 'Search by name, address or postal code. All number fields below allow special search syntax, examples: \'5.5k\' or \'1.2m\'. \'k\' represents thousands and \'m\' represents millions'
                                      ">?</span>
                                <input id="s" name="s" type="text" data-bind="autoComplete : { source: $parent.getKeyword.bind($parent), delay: 500, minLength:2}, event:{autocompleteselect:$parent.resetNewResults.bind($parent)}, click:$parent.showListingsSearch.bind($parent),value:s" placeholder="Search Listings...">
                                <div class="btn-group">
                                    <button tabindex="-1" class="btn btn-inverse" data-bind="text:type,value:type,click:$parent.resetNewResults.bind($parent)"></button>
                                    <button tabindex="-1" data-toggle="dropdown" class="btn dropdown-toggle btn-inverse">
                                        <i class="icon-caret-down"></i>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a href="#" data-bind="click:updateType">Rent</a></li>
                                        <li><a href="#" data-bind="click:updateType">Sale</a></li>
                                    </ul>
                                </div>
                            </div>
                            <!--<button class="btnReset directoryIcons i-map" id="mapBtn"></button>-->
                        </section>
                    </div> <!-- SEARCH BOX -->
                    <div id="drop-down-filter" class="centerWidth outerBox relative shadow" data-bind="slideToggle:displayListingsSearch" style="height:auto;display:none">
                        <section class="filterBox filterContentBG contentArea contentNoTop" style="padding-top:5px;">
                            <div class="row-fluid">
                                <div class="span6">
                                    <label class="listingSearchLabel"><i style="font-weight: bolder; color: rgb(153, 153, 153); font-style: normal; padding-right: 5px;">&#36;</i>Asking Price</label>
                                    <div class="row-fluid">
                                        <div class="span5">
                                            <input type="text" placeholder="1,500" data-bind="value:Search().formFields.priceLow, valueUpdate:'afterkeydown'"/>
                                        </div>
                                        <div class="span1" style="margin-left:10px"><label class="text-center">&mdash;</label></div>
                                        <div class="span5 pull-right" style="margin-right: 10px">
                                            <input type="text" placeholder="2m" data-bind="value:Search().formFields.priceHigh, valueUpdate:'afterkeydown'"/>
                                        </div>
                                    </div>
                                    <label class="listingSearchLabel"><i class="info16 bedrooms"></i>Rooms</label>
                                    <div class="row-fluid">
                                        <div class="span5">
                                            <div class="input-append dropdown combobox" data-bind="with:Search().formFields">
                                                <input type="text" class="listingTextHalfling" placeholder="STUDIO" data-bind="value:roomsLow, valueUpdate:'afterkeydown'">
                                                <button data-toggle="dropdown" class="btn" style="padding:4px;margin-left:-1px"><i class="icon-caret-down"></i></button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="#" data-bind="click:updateRoomsLow">STUDIO</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsLow">1 Room</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsLow">2 Rooms</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsLow">3 Rooms</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsLow">4 Rooms</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsLow">5 Rooms</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsLow">6 Rooms</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsLow">7 Rooms</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsLow">8 Rooms</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsLow">9 Rooms</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="span1" style="margin-left:10px"><label class="text-center">&mdash;</label></div>
                                        <div class="span5 pull-right" style="margin-right: 10px">
                                            <div class="input-append dropdown combobox" data-bind="with:Search().formFields">
                                                <input type="text" class="listingTextHalfling" placeholder="9+ Rooms" data-bind="value:roomsHigh, valueUpdate:'afterkeydown'">
                                                <button data-toggle="dropdown" class="btn" style="padding:4px;margin-left:-1px"><i class="icon-caret-down"></i></button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="#" data-bind="click:updateRoomsHigh">STUDIO</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsHigh">1 Room</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsHigh">2 Rooms</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsHigh">3 Rooms</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsHigh">4 Rooms</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsHigh">5 Rooms</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsHigh">6 Rooms</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsHigh">7 Rooms</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsHigh">8 Rooms</a></li>
                                                    <li><a href="#" data-bind="click:updateRoomsHigh">9+ Rooms</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="span6">
                                    <label class="listingSearchLabel"><i class="info16 sqft"></i>Built-Up Size<button data-bind="click:hideListingsSearch" class="close pull-right" aria-hidden="true" style="padding:0;margin:-5px 0 0 0"><i class="icon-remove"></i></button></label>
                                    <div class="row-fluid">
                                        <div class="span5">
                                            <div class="input-append dropdown combobox input-prepend" data-bind="with:Search().formFields">
                                                <input type="text" class="listingTextHalfling" placeholder="0 sqft" data-bind="value:builtLow, valueUpdate:'afterkeydown'">
                                                <button  tabindex="-1" data-toggle="dropdown" class="btn" style="padding:4px;margin-left:-1px"><i class="icon-caret-down"></i></button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="#" data-bind="click:updateBuiltLow">0 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltLow">500 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltLow">1,000 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltLow">2,000 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltLow">3,000 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltLow">4,000 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltLow">5,000 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltLow">6,000 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltLow">7,000 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltLow">8,000 sqft</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="span1" style="margin-left:10px"><label class="text-center">&mdash;</label></div>
                                        <div class="span5 pull-right" style="margin-right: 10px">
                                            <div class="input-append dropdown combobox" data-bind="with:Search().formFields">
                                                <input type="text" class="listingTextHalfling" placeholder="9,000+ sqft" data-bind="value:builtHigh, valueUpdate:'afterkeydown'">
                                                <button data-toggle="dropdown" class="btn" style="padding:4px;margin-left:-1px"><i class="icon-caret-down"></i></button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="#" data-bind="click:updateBuiltHigh">500 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltHigh">1,000 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltHigh">2,000 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltHigh">3,000 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltHigh">4,000 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltHigh">5,000 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltHigh">6,000 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltHigh">7,000 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltHigh">8,000 sqft</a></li>
                                                    <li><a href="#" data-bind="click:updateBuiltHigh">9,000+ sqft</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <div style="margin:30px auto 0 auto; text-align: center">
                                                <a href="#" class="text-center" data-bind="title:'Reset the search form.', click:setDefaults.bind($data, 'listings')">Reset</a> |
                                                <a href="#" class="text-center opaque" data-bind="title:'This feature is not enabled yet.'">Advanced Search</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <input type="hidden" value="<?php echo Security::token(); ?>" name="state" data-bind="value:Search().formFields.state">
                </form> <!-- SEARCH AREA -->
                <div class="clear"><br></div>
                <ul class="media-list" id="theLoop" style="margin-top:0">
                    <li><?php echo Filter::feed() ?></li>
                    <!--ko serverForEach:{name:'onePost', foreach:cl}-->
                    <?php
                    if (isset($cl) && !empty($cl))
                    {
                        echo View::factory('loops/posts-comments')->set('cl', $cl);
                    }
                    ?>
                    <!--/ko-->
                    <li>
                        <div id="nextPage" style="text-align:center;margin:0 auto;padding:10px">
                            <i class="icon-spinner icon-spin icon-3x" style="display:none" data-bind="visible:isGettingNext"></i>
                            <small data-bind="visible:!hasNextPage()">There is nothing more to show</small>
                            <a href="#" style="display:none" data-bind="visible:hasNextPage() && !isGettingNext(), click:getNextPage">Show More</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!--/ko-->
    <!--ko if:Search().showingMobileSearch-->
        <!--ko with:Search().formFields-->
        <section id="listingsSearchMobile" style="display:none" data-bind="flash:$parent.Search().showingMobileSearch">
            <div class="navbar navbar-inverse">
                <div class="navbar-inner" style="border-radius: 0">
                    <ul class="nav pull-left">
                        <li><a href="#" data-bind="click:$parent.Search().toggleMobileListingSearch"><i class="icon-ok icon-2x"></i></a></li>
                    </ul>
                </div>
            </div>
            <form class="contentArea mobileForm" style="margin-bottom: 0;font-size:110%" data-bind="submit:$parent.Search().toggleMobileListingSearch">
                <label class="listingSearchLabel bold"><i style="font-weight: bolder; color: rgb(153, 153, 153); font-style: normal; padding-right: 5px;">&#36;</i>Asking Price</label>
                <input class="span12" type="text" placeholder="1,500" data-bind="value:priceLow, valueUpdate:'afterkeydown'"/>
                <input class="span12" type="text" placeholder="2m" data-bind="value:priceHigh, valueUpdate:'afterkeydown'"/>
                <label class="listingSearchLabel bold"><i class="info16 bedrooms"></i>Rooms</label>
                <select data-bind="value:roomsLow" class="span12">
                    <option href="#" data-bind="click:updateRoomsHigh">STUDIO</option>
                    <option href="#" data-bind="click:updateRoomsHigh">1 Room</option>
                    <option href="#" data-bind="click:updateRoomsHigh">2 Rooms</option>
                    <option href="#" data-bind="click:updateRoomsHigh">3 Rooms</option>
                    <option href="#" data-bind="click:updateRoomsHigh">4 Rooms</option>
                    <option href="#" data-bind="click:updateRoomsHigh">5 Rooms</option>
                    <option href="#" data-bind="click:updateRoomsHigh">6 Rooms</option>
                    <option href="#" data-bind="click:updateRoomsHigh">7 Rooms</option>
                    <option href="#" data-bind="click:updateRoomsHigh">8 Rooms</option>
                    <option href="#" data-bind="click:updateRoomsHigh">9+ Rooms</option>
                </select>
                <select data-bind="value:roomsHigh, optionsCaption:'9+ Rooms'" class="span12">
                    <option href="#" data-bind="click:updateRoomsHigh">STUDIO</option>
                    <option href="#" data-bind="click:updateRoomsHigh">1 Room</option>
                    <option href="#" data-bind="click:updateRoomsHigh">2 Rooms</option>
                    <option href="#" data-bind="click:updateRoomsHigh">3 Rooms</option>
                    <option href="#" data-bind="click:updateRoomsHigh">4 Rooms</option>
                    <option href="#" data-bind="click:updateRoomsHigh">5 Rooms</option>
                    <option href="#" data-bind="click:updateRoomsHigh">6 Rooms</option>
                    <option href="#" data-bind="click:updateRoomsHigh">7 Rooms</option>
                    <option href="#" data-bind="click:updateRoomsHigh">8 Rooms</option>
                    <option href="#" data-bind="click:updateRoomsHigh">9+ Rooms</option>
                </select>
                <label class="listingSearchLabel bold"><i class="info16 sqft"></i>Built-Up Size</label>
                <select data-bind="value:builtLow, optionsCaption: 'From Size'" class="span12">
                    <option href="#" data-bind="click:updateBuiltLow">0 sqft</option>
                    <option href="#" data-bind="click:updateBuiltLow">500 sqft</option>
                    <option href="#" data-bind="click:updateBuiltLow">1,000 sqft</option>
                    <option href="#" data-bind="click:updateBuiltLow">2,000 sqft</option>
                    <option href="#" data-bind="click:updateBuiltLow">3,000 sqft</option>
                    <option href="#" data-bind="click:updateBuiltLow">4,000 sqft</option>
                    <option href="#" data-bind="click:updateBuiltLow">5,000 sqft</option>
                    <option href="#" data-bind="click:updateBuiltLow">6,000 sqft</option>
                    <option href="#" data-bind="click:updateBuiltLow">7,000 sqft</option>
                    <option href="#" data-bind="click:updateBuiltLow">8,000 sqft</option>
                </select>
                <select data-bind="value:builtHigh" class="span12">
                    <option href="#" data-bind="click:updateBuiltHigh">500 sqft</option>
                    <option href="#" data-bind="click:updateBuiltHigh">1,000 sqft</option>
                    <option href="#" data-bind="click:updateBuiltHigh">2,000 sqft</option>
                    <option href="#" data-bind="click:updateBuiltHigh">3,000 sqft</option>
                    <option href="#" data-bind="click:updateBuiltHigh">4,000 sqft</option>
                    <option href="#" data-bind="click:updateBuiltHigh">5,000 sqft</option>
                    <option href="#" data-bind="click:updateBuiltHigh">6,000 sqft</option>
                    <option href="#" data-bind="click:updateBuiltHigh">7,000 sqft</option>
                    <option href="#" data-bind="click:updateBuiltHigh">8,000 sqft</option>
                    <option href="#" data-bind="click:updateBuiltHigh">9,000+ sqft</option>
                </select>
            </form>
        </section>
        <style type="text/css">
            form.mobileForm{margin:auto 5px;background:#fff;}
            .mobileForm input[type="text"], .mobileForm select{
                -webkit-appearance: none;
                font-size:110% !important;
                padding:10px;
                border-color:#aaa;
                box-shadow:1px 1px 3px #ddd inset !important;
                height:auto;
                border-radius: 0;
                cursor:default;
                line-height: 1;
                white-space:pre;
                -webkit-box-align:center;
                -webkit-rtl-ordering: logical;
            }
        </style>
        <!--/ko-->
    <!--/ko-->