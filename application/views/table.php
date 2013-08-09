<script type="text/javascript" src="/assets/js/adminlocations.js"></script>
<section id="adminlocations">
    <form id="query">
        <div class="row-fluid">
            <div class="span12 well well-small">
                <?php foreach ($sectors as $k => $v): ?>
                    <label class="radio text-info inline" style="margin-left:8px">
                        <input type="radio" data-bind="checked: sector" name="sector" value="<?php echo strlen($v) === 1 ? '0' . $v : $v ?>" /> <?php echo strlen($v) === 1 ? '0' . $v : $v ?>
                    </label>
                <?php endforeach; ?>
                <label class="radio text-info inline" style="margin-left:8px">
                    <input type="radio" data-bind="checked: sector" name="sector" value="" /> NULL
                </label>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span5">
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
                </label><br><br>
                <div class="input-append pull-left">
                    <input type="text" data-bind="value:building, autoComplete : { source: getBuilding, select: addBuilding}" name="building" placeholder="Building" class="span9">
                    <div class="btn-group" style="margin-top:-5px">
                        <label class="radio" style="margin-left:5px">
                            <input data-bind="checked:building" type="radio" name="building" value="NULL"><small>&nbsp;NULL</small>
                        </label>
                        <label class="radio" style="margin-left:5px;margin-top:-10px">
                            <input data-bind="checked:building" type="radio" name="building" value="NOT NULL"><small>&nbsp;NOT NULL</small>
                        </label>
                    </div>
                </div>
            </div>
            <div class="span7">
                <div class="input-append pull-left">
                    <input data-bind="value: estate, autoComplete : { source: getEstates, select: addEstate }" type="text" name="estate" placeholder="Estate" class="span9">
                    <div class="btn-group" style="margin-top:-5px">
                        <label class="radio" style="margin-left:5px">
                            <input data-bind="checked: estate" type="radio" name="estate" value="NULL"><small>&nbsp;NULL</small>
                        </label>
                        <label class="radio" style="margin-left:5px;margin-top:-10px">
                            <input data-bind="checked: estate" type="radio" name="estate" value="NOT NULL"><small>&nbsp;NOT NULL</small>
                        </label>
                    </div>
                </div>
                <div class="input-append pull-right">
                    <input data-bind="value: child, autoComplete : { source: getChildren, select: addChild }" type="text" name="child" placeholder="Child" class="span9">
                    <div class="btn-group" style="margin-top:-5px">
                        <label class="radio" style="margin-left:5px">
                            <input data-bind="checked: child" type="radio" name="child" value="NULL"><small>&nbsp;NULL</small>
                        </label>
                        <label class="radio" style="margin-left:5px;margin-top:-10px">
                            <input data-bind="checked: child" type="radio" name="child" value="NOT NULL"><small>&nbsp;NOT NULL</small>
                        </label>
                    </div>
                </div><br><br>
                <div class="input-append pull-left">
                    <input data-bind="value: locality" type="text" name="locality" placeholder="Locality" class="span9">
                    <div class="btn-group" style="margin-top:-5px">
                        <label class="radio" style="margin-left:5px">
                            <input data-bind="checked: locality" type="radio" name="locality" value="NULL"><small>&nbsp;NULL</small>
                        </label>
                        <label class="radio" style="margin-left:5px;margin-top:-10px">
                            <input data-bind="checked: locality" type="radio" name="locality" value="NOT NULL"><small>&nbsp;NOT NULL</small>
                        </label>
                    </div>
                </div>
                <div class="input-append pull-right">
                    <input data-bind="value: property_type" type="text" name="property_type" placeholder="Property Type" class="span9">
                    <div class="btn-group" style="margin-top:-5px">
                        <label class="radio" style="margin-left:5px">
                            <input data-bind="checked: property_type" type="radio" name="propType" value="NULL"><small>&nbsp;NULL</small>
                        </label>
                        <label class="radio" style="margin-left:5px;margin-top:-10px">
                            <input data-bind="checked: property_type" type="radio" name="propType" value="NOT NULL"><small>&nbsp;NOT NULL</small>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class=" well ">
                <div class="span11">
                    <div class="input-append">
                        <input data-bind="value:s" name="s" type="text">
                        <div class="btn-group">
                            <button type="submit" data-bind="click:search" class="btn">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <label class="label" data-bind="text:results().length + ' Results'"></label>
    <!--ko if:selected-->
    <label class="label" data-bind="text:selectedEntries() + ' Selected'"></label>
    <!--/ko-->
    <div class="btn-toolbar">
        <div class="btn-group">
            <!--<button class="btn" data-bind="click:createEstate">Estates</button>-->
            <button class="btn" data-bind="click:createEstate">Modify Estate</button>
        </div>
    </div>
    <table class="table table-bordered table-hover table-condensed">
        <thead>
            <tr>
                <th><input type="checkbox" data-bind="click:addIds" name="items" /></th>
                <th>SINGPOST TYPE</th>
                <th>PROPERTY TYPE</th>
                <th>BLDG</th>
                <th>ESTATE / CHILD / LOCALITY / ADDRESS</th>
                <th>POSTAL</th>
            </tr>
        </thead>
        <tbody data-bind="foreach:results">
            <tr data-bind="attr:{id:_id}">
                <td><input type="checkbox" data-bind="click:$parent.addId" /></td>
                <td data-bind="text:address">type</td>
                <td data-bind="text:$data.type">ptype</td>
                <td data-bind="text:building">bldg</td>
                <td>
                    <ul class="inline">
                        <li><small><strong>E:</strong> <span data-bind="text:$data.estate"></span></small></li>
                        <!--ko if:isChildLocation-->
                        <li><small><strong>C:</strong> <span data-bind="text:$data.child"></span></small></li>
                        <!--/ko-->
                        <!--ko ifnot:isChildLocation-->
                        <!--ko with:child-->
                        <li>
                            <small>
                                <strong>C:</strong>
                                <a href="#" data-bind="attr:{href:uri, id:_id}">
                                    <span data-bind="text:name"></span>
                                </a>
                            </small>
                        </li>
                        <!--/ko-->
                        <!--/ko-->
                        <li><small><a href="#" data-bind="click:$parent.createLocation">Create Location</a></small></li>
                    </ul>
                    <ul class="inline">
                        <li><small><strong>A:</strong> <span class="text-info" data-bind="text:$data.fullAdd"></span></small></li>
                    </ul>
                </td>
                <td data-bind="text:postal">postal</td>
            </tr>
        </tbody>
    </table>
    <!--<pre data-bind="text:ko.toJSON(selected)"></pre>-->
</section>
<div id="locationForm" style="display:none" title="Create Location" data-bind="with:locationForm">
    <form class="form-horizontal">
        <p class="text-error" data-bind="visible: $root.isError">
            <strong data-bind="text: $root.ajaxMessage"> </strong>
        </p>
        <div class="control-group">
            <label class="control-label">Name</label>
            <div class="controls">
                <input type="text" data-bind="value:name" name="name" placeholder="Name">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label">Estate</label>
            <div class="controls">
                <input type="text" data-bind="value:estate" name="estate" placeholder="Estate">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label">Type</label>
            <div class="controls">
                <input type="text" data-bind="value:type" name="type" placeholder="Type">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label">Sub Type</label>
            <div class="controls">
                <input type="text" data-bind="value:subtype" name="subtype" placeholder="Sub Type">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label">Property Type</label>
            <div class="controls">
                <input type="text" data-bind="value:property_type" name="property_type" placeholder="Sub Type">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label">Content</label>
            <div class="controls">
                <textarea type="text" data-bind="value:content" name="content" placeholder="Content"></textarea>
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <button type="submit" data-bind="click:$root.saveLocation" class="btn">Save</button>
            </div>
        </div>
    </form>
</div>
<div id="estateForm" style="display:none" title="Modify Estates">
    <form class="form-horizontal">
        <h4>Modifying Estate in <span class="text-info" data-bind="text:selectedEntries"></span> selected entries</h4>
        <div class="control-group">
            <label class="control-label">Estate</label>
            <div class="controls">
                <input data-bind="value: estate, autoComplete : { source: getEstates, select: addEstate }" type="text" name="estate" placeholder="Estate">
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <button type="submit" data-bind="click:modifyEstate" class="btn">Save</button>
            </div>
        </div>
    </form>
</div>