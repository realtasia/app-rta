<section>
    <section class="infoContent">
        <h6 class="wrapperHeader">
            <img alt="Personal & Contact Details" src="/img/png/glyphicons_352_nameplate.png" />
            <p>Personal & Contact Details&nbsp;</p>
        </h6>
        <div data-bind="with:RTApp.cp().info">
            <pre data-bind="text:ko.toJSON(new Date($data.birthday()* 1e3).toString(), null, 2)"></pre>
        </div>
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
                    <span class="infoDetail"><?php echo empty($info['birthday']) ? 'Private' : gmdate('dS F Y', (int) $info['birthday']) ?></span>
                </li>
                <li style="display:<?php echo \Arr::get($info, 'languages') ? 'block' : 'none' ?>">
                    <label class="infoYear">&nbsp;Languages&nbsp;</label>
                    <span class="infoDetail"><?php echo implode(', ', \Arr::get($info, 'languages', [])) ?></span>
                </li>
            </ul>
        </div>
    </section>
    <section class="infoContent" style="display:<?php echo \Arr::get($info, 'education') ? 'block' : 'none' ?>">
        <h6 class="wrapperHeader"><img alt="Education & Certification" src="/img/png/glyphicons_332_certificate.png" /><p>Education & Certification</p></h6>
        <div class="leftPadding">
            <ul class="infoLists">
                <?php foreach (\Arr::get($info, 'education', []) as $item): ?>
                    <li>
                        <span class="infoYear">&nbsp;<?php echo $item['date'] ?>&nbsp;</span>
                        <span class="infoDetail"><?php echo $item['value'] ?></span>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </section>
    <section class="infoContent" style="display:<?php echo \Arr::get($info, 'achievements') ? 'block' : 'none' ?>">
        <h6 class="wrapperHeader"><img alt="Awards & Achievements" src="/img/png/glyphicons_074_cup.png" /><p>Awards & Achievements</p></h6>
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
        <h6 class="wrapperHeader"><img alt="Social src="/img/png/glyphicons_043_group.png" /><p>Social Connections</p></h6>
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
</section>