<section>
    <section>
        <div class="contentArea popin">
            <!--ko if: !!$root.cp().geo-->
            <div data-bind="map:$root.cp().geo" style="width:100%;min-height:350px;">

            </div>
            <!--/ko-->
        </div>
    </section>
    <?php if(!empty($cu)):?>
    <!--ko if: $root.user() && $root.cpIsCu()-->
    <div class="alert RTHelpBox" style="margin:20px auto;">
        <button class="close" aria-hidden="true" onclick="return $(this).parent().fadeOut(), !1;"><i class="icon-remove"></i></button>
        <h5 class="noMrgTop"><i class="icon-info-sign" style="font-size:18px"></i> More information to come</h5>
        <p>One of RealtAsia's features include in-depth information about a location. Watch this space for more!</p>
    </div>
    <!--/ko-->
    <?php endif; ?>

</section>