<div class="contentArea" id="adminLocations" data-bind="with:adminLocations, css:{'container-fluid': RTApp.isSmallerThanTablet, opaque:RTC.processing}">
<!--    <ul class="small-block-grid-3 grid-fix rtResponsiveMenu" data-bind="foreach: tabs">
        <li data-bind="css: { active: $parent.selected() === $data }">
            <a class="capitalise" href="#" data-bind="click: $parent.selected, text:$data.name"></a>
        </li>
    </ul>
    <br>-->
    <div class="tab-content outerBox" data-bind="foreach: tabs">
        <div class="tab-pane contentArea contentBox" data-bind="css: { active: $parent.selected() === $data }">
            <div data-bind="template: {name:$data.view, data:$data.vm}"></div>
        </div>
    </div>
</div>


<!--Updater-->
<script type="text/html" id="Updater">
<div class="outerBox contentArea niceBG">
    <ul class="pager noMargTopBtm" style="display:block;margin-top:0;">
        <li class="previous">
            <a href="#" class="shadowMild" data-bind="click:previous"><i class="icon-caret-left" data-bind="css:{'icon-2x':RTApp.isSmallerThanTablet}"></i>&nbsp;<span class="hidden-phone">Previous</span></a>
        </li>
        <li class="centralize" style="display:inline-block">
            <div data-bind="flash:!record(), visible:!record()"><i class="icon-spin icon-spinner icon-2x"></i></div>
            <h6 class="muted" data-bind="if:record">
                <span><input type="text" class="paginator" data-bind="value:changePage, valueUpdate:'afterkeydown'" /></span>
                <span data-bind="text:currentPage, visible:currentPage"></span> of
                <span data-bind="text:total, visible:total"></span>
                <i class="icon-spinner icon-spin" data-bind="visible:!total()"></i>
            </h6>
        </li>
        <li class="next">
            <a href="#" class="shadowMild" data-bind="click:next, css:{'disabled':currentPage() === total()}"><span class="hidden-phone">Next</span>&nbsp;<i class="icon-caret-right" data-bind="css:{'icon-2x':RTApp.isSmallerThanTablet}"></i></a>
        </li>
    </ul>
    <div class="container-fluid" data-bind="with:record" style="min-height:140px;">
        <div class="row-fluid">
            <div class="span12">
                <h2 style="margin-bottom:0;">
                    <span data-bind="text:$data.name"></span>
                    <small class="muted">
                        <span data-bind="text:$data.street"></span> <span data-bind="text:$data.postal ? ', ' + $data.postal : ''"></span>
                    </small>
                </h2>
                <a class="btn btn-link" href="#" data-bind="click:$parent.toggleRecordDetail, visible:$parent.recordHasDetails" style="padding:0">More
                    <i class="icon-caret-down" data-bind="visible:$parent.showRecordDetail"></i>
                    <i class="icon-caret-right" data-bind="visible:!$parent.showRecordDetail()"></i>
                </a>
                <ul class="nav nav-list" style="display:none;margin:10px;" data-bind="visible:$parent.showRecordDetail">
                    <li data-bind="if:$data.top"><strong>TOP (Temporary Occupation Permit):</strong> <span data-bind="text:$data.top"></span></li>
                    <li data-bind="if:$data.type"><strong>Type:</strong> <span data-bind="text:$data.type"></span></li>
                    <li data-bind="if:$data.tenure"><strong>Tenure:</strong> <span data-bind="text:$data.tenure"></span></li>
                    <li data-bind="if:$data.developer"><strong>Developer:</strong> <span data-bind="text:$data.developer"></span></li>
                </ul>
                <div style="margin-top:5px;">
                    <label style="display:inline-block;vertical-align:bottom;">Search:</label><select class="webkitSelect" data-bind="value:$parent.googleQuery, options:$parent.googleOptions()">
                    </select>&nbsp;
                    <label style="display:inline-block;vertical-align:bottom;padding:0 2px;"> In:</label><select data-bind="value:$parent.siteQuery" class="webkitSelect">
                        <option selected="selected" value="site:condo.singaporeexpats.com">Singapore Expats</option>
                        <option value="site:www.propertyguru.com.sg/condo-directory">PropertyGuru</option>
                        <option value="">Google</option>
                    </select>&nbsp;<button class="btn btn-small" data-bind="click:$parent.searchExternal">Go</button>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span12" id="researchMap"></div>
        </div>
    </div>
</div>

<div data-bind="template:'adminAlertBox'"></div>
<div style="margin-bottom:10px" data-bind="visible:singpost">
    <a class="btn btn-link" href="#" data-bind="click:toggleSingpost" style="padding:0">Show Singpost result
        <i class="icon-caret-down" data-bind="visible:showSingpost"></i>
        <i class="icon-caret-right" data-bind="visible:!showSingpost()"></i>
    </a>
</div>


<div data-bind="template:{name:'singpostData', data:singpost, if:singpost}"></div>
<div data-bind="visible:!processing(), flash:!processing()">
    <div class="outerBox contentArea" data-bind="template:{name:'editTemplate', data:locationNameEditor}"></div>
    <div class="outerBox contentArea" data-bind="template:{name:'editTemplate', data:locationSubtypeEditor}"></div>
</div>

<div class="well well-small" data-bind="visible:!processing(), flash:!processing()">
    <div style="margin-top:10px;" class=clearfix;>
        <textarea style="background-color:#fff !important;" placeholder="Type in additional info/comments" data-bind="expand:true"></textarea>
    </div>
    <div class="btn-toolbar clearfix">
        <div class="btn-group">
            <button class="btn btn-primary btn-medium" data-bind="click:createLocation">Create New Location</button>
        </div>
        <div class="btn-group">
            <button class="btn btn-danger btn-medium" data-bind="click:invalidateLocation">Invalid/Not Enough Info</button>
        </div>
    </div>
</div>
<hr>
<button class="btn btn-mini" data-bind="click:toggleDebug">Debug</button>
<div class="well" data-bind="visible:debug">
    <h3>Debug Data:</h3>
    <pre data-bind="text:debugData"></pre>
</div>

</script>

<script type="text/html" id="History">
</script>
<!--Searcher-->
<script type="text/html" id="Searcher">
<h2 class="visible-phone">This does not work properly on small screens</h2>
<section id="adminlocations" class="container-fluid hidden-phone">
    <a href="#" style="padding:10px 0;display:block" data-bind="click:toggleAdvancedSearch"><i class="icon-search"></i> <span data-bind="text:showAdvanced() ? 'Hide' : 'Show'"></span> Advanced Search</a>
    <form id="query" style="display:none" data-bind="visible:showAdvanced">
        <fieldset>
            <legend class="widgetContentBG"><h6 style="margin-left:10px">SingPost Postal Sectors</h6></legend>
            <div class="row-fluid">
                <div class="span12" style="padding-bottom: 10px">
                    <?php foreach ($sectors as $k => $v): ?>
                        <label class="radio text-info inline" style="margin-left:8px">
                            <input type="radio" data-bind="checked: sector" name="sector" value="<?php echo strlen($v) === 1 ? '0' . $v : $v ?>" /> <?php echo strlen($v) === 1 ? '0' . $v : $v ?>
                        </label>
                    <?php endforeach; ?>
                    <label class="radio text-info inline" style="margin-left:8px">
                        <input type="radio" data-bind="checked: sector" name="sector" value="" /> All
                    </label>
                </div>
            </div>
        </fieldset>
        <fieldset>
            <legend class="widgetContentBG"><h6 style="margin-left:10px">SingPost Address Types</h6></legend>
            <div class="row-fluid">
                <div class="span12" style="padding-bottom: 10px">
                    <label class="checkbox inline">
                        <input data-bind="checked:singpostType" type="checkbox" name="singpostType" value="HDB"> HDB
                    </label>
                    <label class="checkbox inline">
                        <input data-bind="checked:singpostType" type="checkbox" name="singpostType" value="Block"> Blk
                    </label>
                    <label class="checkbox inline">
                        <input data-bind="checked:singpostType" type="checkbox" name="singpostType" value="Condominium"> Condo
                    </label>
                    <label class="checkbox inline">
                        <input data-bind="checked:singpostType" type="checkbox" name="singpostType" value="Standard"> Stnd
                    </label>
                    <label class="checkbox inline">
                        <input data-bind="checked:singpostType" type="checkbox" name="singpostType" value="Walkup"> Wlkup
                    </label>
                    <label class="checkbox inline">
                        <input data-bind="checked:singpostType" type="checkbox" name="singpostType" value="Apartment"> Apt
                    </label>
                </div>
            </div>
        </fieldset>
    </form>
    <fieldset>
        <legend class="widgetContentBG"><h6 style="margin-left:10px">SingPost Fields Search</h6></legend>
        <div class="row-fluid">
            <div class="span3">
                <div class="btn-toolbar noMargTopBtm">
                    <label class="radio inline muted">
                        <input data-bind="checked:building" type="radio" name="building" value="NULL"><small>&nbsp;Is Empty</small>
                    </label>
                    <label class="radio inline muted">
                        <input data-bind="checked:building" type="radio" name="building" value="NOT NULL"><small>&nbsp;Is Not Empty</small>
                    </label>
                </div>
                <input type="text" data-bind="value:building, autoComplete : { source: getBuilding, select: addBuilding}" name="building" placeholder="Building Name">
            </div>
            <div class="span3">
                <div class="btn-toolbar noMargTopBtm">
                    <label class="radio inline muted">
                        <input data-bind="checked: estate" type="radio" name="estate" value="NULL"><small>&nbsp;Is Empty</small>
                    </label>
                    <label class="radio inline muted">
                        <input data-bind="checked: estate" type="radio" name="estate" value="NOT NULL"><small>&nbsp;Is Not Empty</small>
                    </label>
                </div>
                <input data-bind="value: estate, autoComplete : { source: getEstates, select: addEstate }" type="text" name="estate" placeholder="Estate Name">
            </div>
            <div class="span3">
                <div class="btn-toolbar noMargTopBtm">
                    <label class="radio inline muted">
                        <input data-bind="checked: child" type="radio" name="child" value="NULL"><small>&nbsp;Is Empty</small>
                    </label>
                    <label class="radio inline muted">
                        <input data-bind="checked: child" type="radio" name="child" value="NOT NULL"><small>&nbsp;Is Not Empty</small>
                    </label>
                </div>
                <input data-bind="value: child, autoComplete : { source: getChildren, select: addChild }" type="text" name="child" placeholder="Child Location Name">
            </div>
            <div class="span3">
                <div class="btn-toolbar noMargTopBtm">
                    <label class="radio inline muted" style="margin-left:5px">
                        <input data-bind="checked: property_type" type="radio" name="propType" value="NULL"><small>&nbsp;Is Empty</small>
                    </label>
                    <label class="radio inline muted" style="margin-left:5px;">
                        <input data-bind="checked: property_type" type="radio" name="propType" value="NOT NULL"><small>&nbsp;Is Not Empty</small>
                    </label>
                </div>
                <input data-bind="value: property_type" type="text" name="property_type" placeholder="Property Type">
            </div>
        </div>
        <br>
        <div class="row-fluid">
            <div class="span12 centralize">
                <div class="input-append" class="span12">
                    <input type="text" name="s" data-bind="value:s" placeholder="type in an address or postal code...">
                    <div class="btn-group">
                        <button class="btn btn-small" data-bind="click:search" type="submit"><i class="icon-search"></i> Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </fieldset>
    <div data-bind="visible:!!$data.results().length">
        <label class="label" data-bind="text:results().length + ' Results'"></label>
        <label class="label" data-bind="text:selectedEntries() + ' Selected'"></label>
    </div>
    <div class="btn-toolbar">
        <div class="btn-group" data-bind="visible:!!$data.results().length">
            <button class="btn" data-bind="click:createEstate">Modify Estate</button>
        </div>
    </div>
    <table class="table table-bordered table-hover table-condensed" data-bind="visible:!!$data.results().length">
        <thead>
            <tr>
                <th><input type="checkbox" data-bind="click:addIds" name="items" /></th>
                <th><small class="capitalise">SINGPOST TYPE</small></th>
                <th><small class="capitalise">PROPERTY TYPE</small></th>
                <th><small class="capitalise">BLDG</small></th>
                <th><small class="capitalise">ESTATE / CHILD / ADDRESS</small></th>
                <th><small class="capitalise">POSTAL</small></th>
            </tr>
        </thead>
        <tbody data-bind="template:{name:'tableRow', foreach:results}"></tbody>
    </table>
</section>
</script>

<!--Searcher Result Row-->
<script type="text/html" id="tableRow">
<tr data-bind="attr:{id:_id}">
    <td><input type="checkbox" data-bind="click:$parent.addId" /></td>
    <td data-bind="text:address">type</td>
    <td data-bind="text:$data.type">ptype</td>
    <td data-bind="text:building">bldg</td>
    <td>
        <ul class="inline">
            <li><small><strong>E:</strong> <span data-bind="text:$data.estate"></span></small></li>
            <!--ko if:isChildLocation-->
            <li><small><strong>C:</strong> <a href="#" data-bind="click:$parent.createLocation">Create Location</a></small></li>
            <!--/ko-->
            <!--ko ifnot:isChildLocation-->
            <!--ko with:child-->
            <li>
                <small>
                    <strong>C:</strong>
                    <a href="#" data-bind="attr:{href:$data.uri, id:$data._id}">
                        <span data-bind="text:name"></span>
                    </a>
                </small>
            </li>
            <!--/ko-->
            <!--/ko-->
        </ul>
        <ul class="inline">
            <li><small><strong>A:</strong> <span data-bind="text:$data.fullAdd"></span></small></li>
        </ul>
    </td>
    <td data-bind="text:postal">postal</td>
</tr>
</script>

<!--edit template-->
<script type="text/html" id="editTemplate">
<a href="#" style="display:block" class="text-success capitalise" data-bind="click:toggleEditing, flash:!isEditing()"><i class="icon-ok"></i> <span data-bind="text:text"></span></a>
<div data-bind="flash:isEditing, template:{name:fieldsTemplate, data:content}"></div>
</script>

<!--location name-->
<script type="text/html" id="locationName">
<input class="fullscap" type="text" data-bind="value:editableValue" placeholder="Choose a name or type one in...">
<ul data-bind="visible:strayName() || postalName()">
    <li data-bind="visible:strayName"><a style="display:block;padding:5px" class="capitalise" href="#" data-bind="value:strayName, text:strayName, radioButton:editableValue, click:$parent.stopEditing"></a></li>
    <li data-bind="visible:postalName"><a style="display:block;padding:5px" class="capitalise" href="#" data-bind="value:postalName, text:postalName, radioButton:editableValue, click:$parent.stopEditing"></a></li>
</ul>
</script>

<!--location subtype-->
<script type="text/html" id="locationSubtype">
<select style="-webkit-appearance:menulist" data-bind="options: subtypes, value:editableValue, optionsCaption: 'Choose a Location Type'" name="subtype"></select>
</script>

<!--alert box-->
<script type="text/html" id="adminAlertBox">
<div class="alert" data-bind="css:{'alert-info':hasSingpost}">
    <i class="icon-spin icon-spinner" data-bind="visible:processing"></i>
    <span data-bind="html:currentMessage"></span>
</div>
</script>



<script type="text/javascript">
jQuery(document).ready(function($) {
    $.getScript("https://maps.googleapis.com/maps/api/js?key=[REDACTED]&sensor=false");
    return $.getScript("/assets/js/adminlocations.js", function() {
        if (!RTApp.user() || (RTApp.user() && !RTApp.user().isAdmin())) {
            window.location = "/";
        }
        return RTApp['adminLocations'](new AdminLocations);
    });
});
</script>

<style type='text/css'>
    .niceBG{
        background-image: url("http://bradjasper.com/subtle-patterns-bookmarklet/patterns/triangles_pattern.png");
        background-repeat: repeat;
        background-size: auto auto;
        text-shadow: 1px 1px 1px #eee;
    }
    .externalFavicon{
        border:1px solid #eee
    }
    .webkitSelect{
        display:inline-block;width:auto;height:27px;padding: 1px;margin:0;-webkit-appearance:menulist;
    }
    input.paginator{
        display: inline !important;
        height: 20px;
        padding: 1px;
        vertical-align: top;
        width: 50px;
    }
</style>

<script type="text/html" id="singpostData">
    <table class="table table-condensed table-bordered" data-bind="with:data, flash:$parent.showSingpost">
        <tr>
            <th>Name:</th>
            <td data-bind="text:typeof $data.child === 'string' ? $data.child : $data.building"></td>
        </tr>
        <tr>
            <th>Estate:</th>
            <td><a target="_blank" data-bind="href:$data.estateUrl, text:$data.estate">Tanglin</td>
        </tr>
        <tr>
            <th>Address:</th>
            <td data-bind="text:$data.number + ' ' + $data.street + ', ' + $data.postal"></td>
        </tr>
        <tr data-bind="if:$data.other_name">
            <th>AKA:</th>
            <td data-bind="text:other_name"></td>
        </tr>
        <tr data-bind="if:$data.source">
            <th>Source:</th>
            <td><a target="_blank" data-bind="href:$data.source, colorbox:colorbox">Website</a></td>
        </tr>
        <tr data-bind="if:$data.type">
            <th>Type:</th>
            <td data-bind="text:$data.type"></td>
        </tr>
    </table>
</script>
