<?php defined('SYSPATH') or die('No direct script access.');
    /**
    * @author jason
    */?>
<?= Form::open(Request::current()->uri(), array('id'=>'post-form'));?>
<div id="post_box">
<textarea id="post_textarea" name="post_textarea" rows="2" title="Write a testimonial?"></textarea>
  <div id="post-box-options">
    <div id="post-box-submit">
      <input type="hidden" name="post_parent" id="parent_id" value="<?=$_id?>" />
      <span class="ajax-loader"></span>
      <input type="submit" name="submit" id="post-submit" value="Write Testimonial" />
      </p>
    </div>
  </div><!-- #post-box-options -->
</div><!-- #post_box -->
</form> <!--#post-form -->
<div class="clear"></div>