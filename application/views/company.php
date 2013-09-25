<?php defined('SYSPATH') or die('No direct script access.');
include APPPATH . 'views/loops/loops.html'; ?>
<section class="contentArea centerContent" data-bind="css:{'container-fluid': RTApp.isSmallerThanTablet, opaque:RTC.processing}">
    <?php include Kohana::find_file('views', 'introcontent/company') ?>
    <?php if ($ca === 'info'){include Kohana::find_file('views', 'companyInfo');} ?>
    <section id="theLoop" class="profile" data-bind="visible:cl()" style="<?php if (!isset($cl)){echo 'display:none';}?>">
        <!--ko if:ca() !== 'leads' && ca() !== 'feedback'-->
        <?php echo $ca === 'feed' ? Filter::feed() : '' ?>
        <!--ko serverForEach:{name:'onePost', foreach:cl}-->
        <?php if (isset($cl) && !empty($cl)){echo View::factory('loops/posts-comments')->set('cl', $cl);}?>
        <!--/ko-->
        <div id="nextPage" style="text-align:center;margin:0 auto;padding:10px">
            <i class="icon-spinner icon-spin icon-3x" style="display:none" data-bind="visible:isGettingNext"></i>
            <small data-bind="visible:!hasNextPage()">There is nothing more to show</small>
            <a href="#" data-bind="visible:hasNextPage() && !isGettingNext(), click:getNextPage">Show More</a>
        </div>
        <!--/ko-->
    </section> <!--  theLoop -->
</section>