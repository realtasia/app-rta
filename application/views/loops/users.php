<div class="grid_10" id="inline-pagination"><noscript><?= $pagination ?></noscript></div>
<div class="loop_block grid_10">
    <?php $current_count = 1; ?>
    <? foreach($pages->as_object() as $page): ?>
        <?php if ($current_count <= 10): ?>
            <? echo View::factory('loops/single/user', (array) $page) ?>
        <?php endif; ?>
        <?php $current_count++; ?>
    <? endforeach; ?>
</div> <!--loop_block-->
<? if (isset($pagination)): ?><div class="hide-if-no-js" id="js-pagination"><?= $pagination->ajax() ?></div><? endif; ?>
