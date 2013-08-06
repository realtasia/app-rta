<?php defined('SYSPATH') or die('No direct script access.'); ?>
<script type="text/javascript" src="/assets/$.embedly.min.js"></script>
<?= Form::open(Request::current()->uri(), array('id' => 'post-form')); ?>
<div class="space-for-message" style="margin-left:3px;"><div class="error"><noscript><h4>Please enable Javascript to continue...</h4></noscript></div></div>
<div id="post_box">
    <div id="textarea-tabs">
        <ul id="post-type-selector">
            <li class="li-active"><a href="#status-form" id='status-link' class="tippable" title="Share news" placeholder="<?= Kohana::message('postbox', 'share.whatsnew') ?>"><span class="icon sticky-notes-text"></span>Share</a></li>
            <?if(isset($has_testimonial) AND $has_testimonial):?>
                <li><a href="#testimonial-form" id='testimonial-link' class="tippable" title="Testimonials" placeholder="<?= Kohana::message('postbox', 'share.testimonial') ?>"><span class="icon newspaper-pencil"></span>Testimonial</a></li>
            <?endif;?>
        </ul>
        <ul class="the-post-box" id="status-form-fields">
            <li class="status-box parent-box">
                <span class="post-buttons" id="cancel-post" style="float:right;height:auto;margin:0 5px 0 0 ;">
                    <a href="#" onclick="$('.post-buttons').hide();$('#postPreview').empty().append(RT.ajax64);$('#postPreviewBox').hide().css('height', 'auto');linkExists = false;"><span class="icon-cancel"></span></a>
                </span>
                <textarea name="textareaContent" style="float:left;" id="textarea-status" placeholder="Share some news?" rows="2" onclick="$('.post-buttons').show();$(this).parent().css('height', 'auto')"></textarea>
                <div class="clearfix"></div>
                <div id="postPreviewBox" style="border-top: 1px dashed #ccc; padding:5px;display:none;">
                    <span style="float:right;margin:0;">
                        <a href="#" onclick="$('#postPreviewBox').hide();$('#postPreview').empty().append(RT.ajax64);linkExists = false;"><span class="icon-cancel"></span></a>
                    </span>
                    <div id="postPreview" style="margin-left:40px;height:auto;"><div class="ajax-64"></div></div>
                </div>
            </li>
            <li class="post-buttons" id="postButtonSubmit"><div class="ajax-16"></div><button style="float:right;margin-right:2px;" class="btn">Post</button><div class="clear"></div></li>
        </ul>
        <input type="hidden" name="parent_id" id="parent_id" value="<?= $_id; ?>" />
        <input type="hidden" name="parent_type" id="parent_type" value="<?= $type;?>" />
        <input type="hidden" name="post_type" id="post_type" value="post" />
    </div>
</div>
</form> <!--#post-form -->
<script type="text/javascript">var linkExists = false;$(document).ready(function(a){a("textarea").live("change keyup",function(b){var c=b.keyCode?b.keyCode:b.which,d,e,f,g;if(b.type=="keyup"&&(c==32||c==86||c==17)||b.type=="change"){if(RT.matchURL(a(this).val())&&!linkExists){linkExists=true;a("#postPreviewBox").fadeIn("fast");a(".ajax-64").show();a.getJSON("/parse_url.php",{text:a(this).val()},function(b){b.provider_url_title=b.provider_url.replace("http://","");a("#postPreview").data("fields",b);a("#tmpl-graph").tmpl(b).appendTo("#postPreview");a(".ajax-64").hide()})}}});a("#post-form").on("submit",function(b){b.preventDefault();var c={},d=a(this);if(linkExists){c=a("#postPreview").data("fields")}c.textareaContent=a("#post-form").find("textarea").val();c.parent_id=a("#parent_id").val();c.parent_type=a("#parent_type").val();c.post_type=a("#post_type").val();return RT.submitPost(d,c)});a("textarea, input").BetterGrow();a(".tippable").hover(function(){RT.helpTips(a(this))});a("#cancel-post").bind("click",function(b){b.preventDefault();a("#textarea-status").val("").BetterGrow();a(".post-buttons").hide("fast");if(a("#link-box").is(":visible")){a("#link-box").hide("fast")}});a(".icon-chain").bind("click",function(b){b.preventDefault();a("#link-box").animate({opacity:"toggle"},300)});a(".icon-norm").hover(function(){a(this).stop().animate({opacity:.5},100)},function(){a(this).stop().animate({opacity:1},100)});a("#post-type-selector li a").click(function(b){b.preventDefault();var c="",d=a("#link-button"),e=a("#post_type"),f=a(this);a("#post-type-selector li").removeClass("li-active");f.closest("li").toggleClass("li-active");if(f.is("#testimonial-link")){c="Write a testimonial...";d.hide();e.val("testimonial")}else{c="Share some news...";d.show();e.val("post")}a("#textarea-status").attr("placeholder",c)})})</script>
<div class="clear"></div>