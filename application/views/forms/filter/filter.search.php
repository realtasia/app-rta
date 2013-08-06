<?php defined('SYSPATH') or die('No direct script access.');
    /**
    * @author jason
    */?>
<?= form::open(Request::current()->detect_uri(), array('id' => 'filterform', 'class' => $form_type, 'method' => 'GET')); ?>
<div id="wraparound" >
    <div id="search-wrap">
        <p>
            <?= form::input('s', Arr::get($_GET, 's'),
                  array(
                     'id' => 's', 'tabindex' => '', 'autocomplete' => 'off',
                     'placeholder' => 'Search ' . Inflector::plural(ucfirst($form_type)),
                  )) ?>
            <input id="sb_search" type="submit" value="Search" class="submit"/>
        </p>
    </div>
    <div class="clear"></div>
</div>
<div id="drop-down-filter" style="display:none;">
    <a href="#" id="clear-filter" style="font-size:90%;display:inline;margin-right: 5px;"><span class="icon-norm icon-arrow-circle-135-left"></span></a><span id="sb_filter">FILTER YOUR SEARCH</span>
    <a href="#" id="cancel-filter" style="float:right"><span class="icon-cancel"></span></a>
    <ul id="sb_dropdown" class="inputs-list">
        <?foreach($select as $key => $name):?>
            <li><label><?=Form::checkbox($filter_type . '[]', $key)?><span><?=$name?></span></label></li>
        <?endforeach;?>
    </ul>
    <div class="clear"></div>
</div>
<?= form::hidden('token', Security::token()); ?>
</form>
