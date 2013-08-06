<div class="grid_10" id="inline-pagination"><noscript><?if(isset($pagination)) echo $pagination; ?></noscript></div>
<div class="loop_block grid_10">
    <?php $current_count = 1; ?>
    <?= View::factory('loops/posts-comments')->set('posts', $posts) ?>
</div> <!--loop_block-->
<? if (isset($pagination)): ?><div class="hide-if-no-js" id="js-pagination"><?= $pagination->ajax() ?></div><? endif; ?>
