<? defined('SYSPATH') or die('No direct script access.'); ?>
<script type="text/javascript">
    var status = '<?=$status?>';
    $(document).ready(function($){if(status=='trash'){$('#approveTest').button('loading');}});
    function doApprove(element){
        var a = $(element), state;
        $.post("<?="/post/testimonial/$_id"?>", {'approve' : status}, function(data){
            console.log(data);
            if(status == 'pending'){
                status = 'publish';
                a.removeClass('primary').addClass('success');
                a.text('Undo Approve');
            }else{
                status = 'pending';
                a.removeClass('success').addClass('primary');
                a.text('Approve');
            }
            a.button(state);
        });
    }

    function doDelete(element){
        var a = $(element), state, del;
        if(status == 'trash'){
            del = 0;
        } else {
            del = 1;
        }

        $.post("<?="/post/testimonial/$_id"?>", {'delete' : del}, function(data){
            console.log(data);
            if(status == 'pending'){
                status = 'trash';
                $('#approveTest').button('loading')
                a.addClass('info');
                a.text('Undo Trash');
            }else{
                status = 'pending';
                $('#approveTest').button('reset')
                a.removeClass('info');
                a.text('Trash');
            }
            a.button(state);
        });
    }
</script>
<ul style ="display:inline-block;list-style: none; margin:0;padding:0;">
    <li style="display:inline-block;float:left;margin-right:10px;">
        <button class="btn <?=$status == 'publish' ? 'success' : 'primary'?>" id="approveTest" onclick="javascript:doApprove(this);return false;" data-loading-text="disabled"><?=$status == 'publish' ? 'Undo Approve' : 'Approve'?></button>
    </li>
    <li style="display:inline-block;float:left;margin-right:10px;">
        <button class="btn <?=$status == 'trash' ? 'info' : ''?>" onclick="javascript:doDelete(this);return false;"><?=$status == 'trash' ? 'Undo Trash' : 'Trash'?></button>
    </li>

</ul>
<table border="none" style="width:250px;border:0 none;margin:0;padding:0;">
    <tr style="border:0 none;margin:0;padding:0;">
        <td style="border:0 none;margin:0;padding:0;"></td>
    </tr>
</table>