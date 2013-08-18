<script type="text/javascript" src="/assets/js/adminlocations.js"></script>
<div class="contentArea" id="adminLocations" data-bind="with:adminLocations, css:{'container-fluid': RTApp.isSmallerThanTablet, opaque:RTC.processing}">
    <ul class="small-block-grid-3 grid-fix rtResponsiveMenu" data-bind="foreach: tabs">
        <li data-bind="css: { active: $parent.selected() === $data }">
            <a class="capitalise" href="#" data-bind="click: $parent.selected, text:$data.name"></a>
        </li>
    </ul>
    <div class="tab-content outerBox" style="border-top: 0 none;" data-bind="foreach: tabs">
        <div class="tab-pane contentArea contentBox" data-bind="css: { active: $parent.selected() === $data }">
            <!--<div data-bind="template: {name:$data.view, data:$data.vm}"></div>-->
            <div class="relative" style="height:100%;bottom:0">
                <ul class="pager" style="display:block;margin-top:0;">
                    <li class="previous">
                        <a href="#" class="shadowMild"><i class="icon-caret-left" data-bind="css:{'icon-3x':RTApp.isSmallerThanTablet}"></i>&nbsp;<span class="hidden-phone">Previous</span></a>
                    </li>
                    <li class="centralize" style="display:inline-block">
                        <h6 class="muted"> 1 of 2,375 </h6>
                    </li>
                    <li class="next">
                        <a href="#" class="shadowMild"><span class="hidden-phone">Next</span>&nbsp;<i class="icon-caret-right" data-bind="css:{'icon-3x':RTApp.isSmallerThanTablet}"></i></a>
                    </li>
                </ul>

                <div class="outerBox contentArea" data-bind="template:{name:'editTemplate', data:$parent.locationNameEditor}"></div>
                <div class="outerBox contentArea" data-bind="template:{name:'editTemplate', data:$parent.locationSubtypeEditor}"></div>

<!--                <div class="outerBox contentArea">
                    <a href="#" style="display:block" class="text-success" data-bind="click:$parent.editName, flash:!$parent.isEditingName()"><i class="icon-ok"></i> <span data-bind="text:$parent.locationName"></span></a>
                    <div data-bind="slideToggle:$parent.isEditingSubtype">
                        <select data-bind="options:">
                    </div>
                </div>-->


                <ul class="small-block-grid-2 grid-fix" style="position:relative;bottom:-10px;border:0 none;">
                    <li>Today: <span class="number">15</span></li>
                    <li>Total: <span class="number">115</span></li>
                </ul>
            </div>
        </div>
    </div>
</div>



<script type="text/html" id="Updater">
    <h2 class="centralize muted"><i class="icon-spin icon-spinner"></i> Loading</h2>
</script>

<script type="text/html" id="History">
</script>

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

<script type="text/html" id="editTemplate">
    <a href="#" style="display:block" class="text-success capitalise" data-bind="click:toggleEditing, flash:!isEditing()"><i class="icon-ok"></i> <span data-bind="text:text"></span></a>
    <div data-bind="slideToggle:isEditing, template:{name:fieldsTemplate, data:content}"></div>
</script>

<script type="text/html" id="locationName">
    <input class="fullscap" type="text" data-bind="value:editableValue" placeholder="Choose a name or type one in...">
    <ul>
        <li><a style="display:block;padding:5px" class="capitalise" href="#" data-bind="value:name1, text:name1, radioButton:editableValue"></a></li>
        <li><a style="display:block;padding:5px" class="capitalise" href="#" data-bind="value:name2, text:name2, radioButton:editableValue"></a></li>
    </ul>
</script>

<script type="text/html" id="locationSubtype">
    <select data-bind="options: subtypes, value:editableValue, optionsCaption: 'Choose a Location Type'" name="subtype"></select>
</script>

