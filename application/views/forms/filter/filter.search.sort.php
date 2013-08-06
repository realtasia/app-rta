<?php defined('SYSPATH') or die('No direct script access.');
/**
 * @author jason
 */ ?>
<?php echo form::open(Request::current()->detect_uri(), array('id' => 'filterform', 'class' => $form_type, 'method' => 'GET')); ?>
<div id="filter-holder">
    <div id="filter-inner" class="grid_10 omega">
        <?php echo form::input('s', Arr::get($_GET, 's'), array('id' => 'search_box', 'placeholder' => 'Search ' . Inflector::plural(ucfirst($form_type)))) ?>
        <a id="update-filter" class="submit" onclick="return false;"><span class="ui-icon ui-icon-arrowthick-1-s"></span>More Options</a>
        <div id="filter-drop">
            <div class="grid_2 alpha ">
                <label class="filter-label">Filter:</label>
            </div>
            <div class="grid_2">
                <?php echo form::select($filter_type . "[]", $select, ARR::get($_GET, $filter_type), array('id' => $filter_type, 'multiple' => 'multiple')) ?>
            </div>
            <div class="grid_4 omega">
                <noscript>
                <?php echo form::select('sort', array('newest' => 'Newest', 'popular' => 'Popular'), Arr::get($_GET, 'sort', array())) ?>
                </noscript>
                <div class="hide-if-no-js" id="sorter">
                    <label class="filter-label">Sort by:</label>
                    <input type="radio" id="newest" name="sort" value="newest" checked="checked" /><label for="newest">Newest</label>
                    <input type="radio" id="popular" name="sort" value="popular" /><label for="popular">Popular</label>
                </div>
            </div>
        </div>
        <button class="submit"><span class="ui-icon ui-icon-search"></span>Update</button>
        <?//= form::submit('search', 'Update Results', array('class' => 'submit')) ?>
        <?php echo form::hidden('token', Security::token()); ?>
    </div>
</div>
</form>
