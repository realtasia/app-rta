<?php defined('SYSPATH') or die('No direct script access.');
/**
 * @author jason
 */ ?>
<?= form::open(Request::current()->uri(), array('id' => 'crop-block')) ?>
<div class="grid_7 alpha omega">
    <?= html::image($file, array('width' => 400, 'id' => 'cropbox')); ?>
</div>
<div class="grid_3 alpha omega" style="margin-left: 5px;">
    <div style="padding-left: 5px;">
        <div style="width:150px;height: 150px;margin: 0;padding: 0;border: 1px solid #DDD;overflow: hidden;">
            <?= html::image($file, array('id' => 'avatar-preview')); ?>
        </div>
        <?= form::button('crop-save', '<span class="ui-icon ui-icon-check"></span>Save', array('id' => 'crop-save', 'class' => 'submit')) ?>
        <?= form::button('crop-cancel', '<span class="ui-icon ui-icon-cancel"></span>Cancel', array('id' => 'crop-cancel', 'class' => 'submit')) ?>
    </div>
</div>
<div class="clear"></div>
<input type="hidden" id="x" name="x" />
<input type="hidden" id="y" name="y" />
<input type="hidden" id="w" name="w" />
<input type="hidden" id="h" name="h" />
<input type="hidden" id="id" name="id" value="<?= $id ?>" />
<input type="hidden" id="user_id" name="user_id" value="<?= $user_id ?>" />
<input type="hidden" id="file" name="file" value="<?=$file?>" />
</form>
<div class="clear"></div>
<script language="Javascript">
    $(document).ready(function($)
    {
        var crop_form = $('form#crop-block');
        var crop_url  = crop_form.attr('action').replace('crop', 'savepic');
        var crop_cont = $('#success');
        var response;
        var profile_edit_form = $('#profile-edit-form');

        $('#cropbox').Jcrop({
            onChange: showPreview,
            onSelect: showPreview,
            setSelect: [ 10, 10, 10, 10 ],
            minSize: [ 150, 150],
            trueSize: [<?= $img->width ?>,<?= $img->height ?>],
            aspectRatio: 1
        });
        $('#crop-save').click(function(e)
        {
            var data = crop_form.serialize();
            var sidebar_avatar = $('#profile-avatar-wrapper');
            var s_img = sidebar_avatar.find('img');
            $.post(crop_url, data, function(data)
            {
                crop_form.fadeOut();
                crop_cont.hide();
                s_img.attr('src', "/"+data).fadeIn();
                $('#change-avatar').hide().html(original_upload_form).fadeIn('fast');
                e.preventDefault();
                window.location.reload();
                //return swf_avatar(profile_edit_form, response);
            });
            e.preventDefault();
        });
        $('#crop-cancel').click(function(e)
        {
            crop_form.fadeOut().remove();
            crop_cont.hide();
            $('#change-avatar').hide().html(original_upload_form).fadeIn('fast');
            e.preventDefault();
            return swf_avatar(profile_edit_form, response);
        });
    });

    // Our simple event handler, called from onChange and onSelect
    // event handlers, as per the Jcrop invocation above
    function showPreview(coords)
    {
        if (parseInt(coords.w) > 0)
        {
            var rx = 150 / coords.w;
            var ry = 150 / coords.h;

            $('#avatar-preview').css({
                width: Math.round(rx * <?= $img->width ?>) + 'px',
                height: Math.round(ry * <?= $img->height ?>) + 'px',
                marginLeft: '-' + Math.round(rx * coords.x) + 'px',
                marginTop: '-' + Math.round(ry * coords.y) + 'px'
            });
            $('#x').val(coords.x);
            $('#y').val(coords.y);
            $('#w').val(coords.w);
            $('#h').val(coords.h);
        }
    }

</script>