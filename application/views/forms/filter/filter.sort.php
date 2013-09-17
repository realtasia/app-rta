<?php
defined('SYSPATH') or die('No direct script access.');
/**
 * @author jason
 */
echo form::open(Request::current()->detect_uri(), [
    'id'     => 'filterform',
    'class'  => $form_type,
    'method' => 'GET'
]);
?>
<section id="feedActionDiv">
    <div id="filterButtonDiv" class="dropdown hasActiveState" data-bind="hoverClass: 'hovering'">
        <a data-toggle="dropdown" class="dropdown-toggle" id="filterButton" href="#">Show:&nbsp;<span class="dropDownSelected">All</span>&nbsp;<i class="icon-caret-down"></i></a>
        <ul class="dropdown-menu">
            <li><a href="#" id="filterAll">All</a></li>
            <li><a href="#" id="filterPopular">Published</a></li>
            <li><a href="#" id="filterDraft">Draft</a></li>
        </ul>
    </div>
    <noscript>
    <div id="sortButtonDiv" class="dropdown hasActiveState" data-bind="hoverClass: 'hovering'">
        <a data-toggle="dropdown" class="btn btn-small dropdown-toggle" id="sortButton" href="#">Sort:&nbsp;<span class="sortSelected">Popular</span>&nbsp;<i class="icon-caret-down"></i></a>
        <ul class="dropdown-menu">
            <li><a href="#" id="sortNewest">Newest</a></li>
            <li><a href="#" id="sortPopular">Popular</a></li>
        </ul>
    </div>
    </noscript>
</section> <!--  sort button & result count -->
<?= form::hidden('state', Security::token()); ?>
<?= form::hidden('sec_id', time()); ?>
</form>