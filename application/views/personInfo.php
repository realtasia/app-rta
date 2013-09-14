<section>
    <section class="infoContent">
        <h4 class="contentArea noMargTopBtm widgetContentBG"><i class="icon-phone-sign"></i> Personal & Contact Details</h4>
        <div class="leftPadding">
            <ul class="infoLists">
                <li style="display:<?php echo empty($info['telephone']['mobile']) ? 'none' : 'block' ?>">
                    <label class="infoYear">&nbsp;Mobile&nbsp;</label>
                    <span class="infoDetail"><?php echo \Arr::get($info['telephone'], 'mobile', 'Private') ?></span>
                </li>
                <li style="display:<?php echo empty($email) ? 'none' : 'block' ?>">
                    <label class="infoYear">&nbsp;Email&nbsp;</label>
                    <span class="infoDetail"><?php echo $email ? HTML::mailto($email) : 'Private' ?></span>
                </li>
                <li style="display:<?php echo empty($info['birthday']) ? 'none' : 'block' ?>">
                    <label class="infoYear">&nbsp;Birthday&nbsp;</label>
                    <span class="infoDetail"><?php echo empty($info['birthday']) ? 'Private' : date('dS F Y', (int) $info['birthday']) ?></span>
                </li>
                <li style="display:<?php echo \Arr::get($info, 'languages') ? 'block' : 'none' ?>">
                    <label class="infoYear">&nbsp;Languages&nbsp;</label>
                    <span class="infoDetail"><?php echo htmlentities(implode(', ', \Arr::get($info, 'languages', []))) ?></span>
                </li>
            </ul>
        </div>
    </section>
    <section class="infoContent" style="display:<?php echo \Arr::get($info, 'education') ? 'block' : 'none' ?>">
        <h4 class="contentArea noMargTopBtm widgetContentBG"><i class="icon-certificate"></i> Education & Certification</h4>
        <div class="leftPadding">
            <ul class="infoLists">
                <?php foreach (\Arr::get($info, 'education', []) as $item): ?>
                    <li>
                        <span class="infoYear">&nbsp;<?php echo (string) $item['date'] ?>&nbsp;</span>
                        <span class="infoDetail"><?php echo htmlentities($item['value'], ENT_COMPAT, 'UTF-8') ?></span>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </section>
    <section class="infoContent outerBox" style="display:<?php echo \Arr::get($info, 'achievements') ? 'block' : 'none' ?>">
        <h4 class="contentArea noMargTopBtm widgetContentBG"><i class="icon-trophy"></i> Awards & Achievements</p></h4>
        <div class="leftPadding">
            <ul class="infoLists">
                <ul class="infoLists">
                    <?php foreach (\Arr::get($info, 'achievements', []) as $item): ?>
                        <li>
                            <span class="infoYear">&nbsp;<?php echo $item['date'] ?>&nbsp;</span>
                            <span class="infoDetail"><?php echo $item['value'] ?></span>
                        </li>
                    <?php endforeach; ?>
                </ul>
        </div>
    </section>
    <!--<section class="infoContent" style="display:<?php //echo empty($info['social']) ? 'none' : 'block'  ?>">
        <h6 class="wrapperHeader"><img alt="Social" src="/img/png/glyphicons_043_group.png" /><p>Social Connections</p></h6>
        <div class="leftPadding">
            <ul class="infoLists">
                <li id="socialImgs">
    <?php //foreach (\Arr::get($info,'social',[]) as $k => $item): ?>
                        <a href="<?php //echo $item['link']  ?>" data-bind="hoverClass: 'hovering'"><i class="social26 <?php //echo strtolower($item['name'])  ?>"></i><?php //$item['name']  ?></a>
    <?php //endforeach; ?>
                </li>
            </ul>
        </div>
    </section>-->
    <div data-bind="if:cpIsCu" class="alert RTHelpBox" style="margin:20px auto;">
        <button class="close" aria-hidden="true" onclick="return $(this).parent().fadeOut(), !1;"><i class="icon-remove"></i></button>
        <h5 class="noMrgTop"><i class="icon-info-sign" style="font-size:18px"></i> Change what is shown here</h5>
        <p><a href="#edit" style="text-decoration: underline;">Edit</a> your profile to add information to your about page. You can also change your <a href="#settings" style="text-decoration: underline">privacy settings</a> to show/hide sensitive information.</p>
    </div>
</section>