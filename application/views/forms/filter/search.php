<?php defined('SYSPATH') or die('No direct script access.');
    /**
    * @author jason
    */?>
<?=form::open(Request::current()->detect_uri(), array( 'id' => 'filterform', 'class' => $form_type, 'method' => 'GET'));?>
  <div class="push_4 grid_9 alpha omega">&nbsp;</div>
  <div class="grid_5">
    <?=form::input('s', Arr::get($_GET, 's'), array('id' => 's'))?>
    <?=form::hidden('token', Security::token());?>
    <?=form::submit('search', 'Search', array('class' => 'submit'))?>
  </div>
</form>
<div class="clear"></div>
