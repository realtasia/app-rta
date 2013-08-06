<?php defined('SYSPATH') or die('No direct script access.');
/**
 * @author jason
 */
echo form::open(Request::current()->detect_uri(), [
    'id'     => 'filterform',
    'method' => $type
]);
?>
<section id="feedActionDiv">
    <div class="dropdown" id="filterButtonDiv">
        <div style="display:none" data-bind="visible:Search, with:Search">
            <a href="#" data-bind="click:showDropdown" id="filterButton" class="dropdown-toggle">Show:&nbsp;
                <span class="dropDownSelected" data-bind="text:filteredBy"></span>&nbsp;<span class="caret"></span>
            </a>
            <ul class="dropdown-menu" data-bind="foreach:filters">
                <li><a href="#" data-bind="click : $parent.updateFilter, text:$data"></a>
            </ul>
        </div>
    </div>
    <noscript>
    <?php echo $pagination; ?>
    </noscript>
    <div id="sortButtonDiv" class="dropdown">
        <div style="display:none" data-bind="visible:Search, with:Search">
            <i class="icon-spinner icon-spin" data-bind="visible:$root.isGettingNew"></i>
            <a data-bind="click:showDropdown" class="btn btn-small dropdown-toggle" id="sortButton" href="#">Sort:&nbsp;
                <span class="sortSelected" data-bind="text:sortedBy"></span>&nbsp;
                <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu" style="font-size:95%" data-bind="foreach:sorters">
                <li role="menuitem">
                    <a href="#" class="selectClose" data-bind="click : $parent.updateSorter, text:$data"></a>
                </li>
            </ul>
        </div>
    </div>
</section> <!--  sort button & result count -->
<?= form::hidden('state', Security::token()); ?>
<?= form::hidden('sec_id', time()); ?>
</form>