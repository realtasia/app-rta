<section>
    <section class="infoContent" data-bind="with:cp">
        <div class="wrapperHeader">
            <img src="/img/png/glyphicons_352_nameplate.png" alt="Personal & Contact Details" />
            <p>Personal & Contact Details&nbsp;</p>
        </div>
        <div class="leftPadding">
            <ul class="infoLists">
                <li style="display:<?php echo empty($info['telephone']['mobile']) ? 'none' : 'block' ?>">
                    <p>
                        <label class="infoYear">&nbsp;Mobile&nbsp;</label>
                        <span class="infoDetail" data-bind="text:info.telephone.mobile"><?php echo $info['telephone']['mobile'] ?></span>
                    </p>
                </li>
                <li style="display:<?php echo empty($email) ? 'none' : 'block' ?>">
                    <p>
                        <span class="infoYear">&nbsp;Email&nbsp;</span>
                        <span class="infoDetail">
                            <?php echo HTML::mailto($email, $email, ['data-bind' => "attr:{href: 'mailto:' + email()}, text:email"]) ?>
                        </span>
                    </p>
                </li>
                <li style="display:<?php echo empty($info['birthday']) ? 'none' : 'block' ?>">
                    <p>
                        <span class="infoYear">&nbsp;Birthday&nbsp;</span>
                        <span class="infoDetail"><?php echo date('dS F Y', (int) $info['birthday']) ?></span>
                    </p>
                </li>
            </ul>
        </div>
    </section>
    <section class="infoContent" style="display:<?php echo empty($info['education']) ? 'none' : 'block' ?>">
        <h6 class="wrapperHeader"><img alt="Education & Certification" src="/img/png/glyphicons_332_certificate.png" /><p>Education & Certification</p></h6>
        <div class="leftPadding">
            <ul class="infoLists">
                <?php foreach ($info['education'] as $item): ?>
                    <li>
                        <p>
                            <span class="infoYear">&nbsp;<?php echo $item['date'] ?>&nbsp;</span>
                            <span class="infoDetail"><?php echo $item['value'] ?></span>
                        </p>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </section>
    <section class="infoContent" style="display:<?php echo empty($info['achievements']) ? 'none' : 'block' ?>">
        <h6 class="wrapperHeader"><img alt="Awards & Achievements" src="/img/png/glyphicons_074_cup.png" /><p>Awards & Achievements</p></h6>
        <div class="leftPadding">
            <ul class="infoLists">
                <ul class="infoLists">
                    <?php foreach ($info['achievements'] as $item): ?>
                        <li>
                            <p>
                                <span class="infoYear">&nbsp;<?php echo $item['date'] ?>&nbsp;</span>
                                <span class="infoDetail"><?php echo $item['value'] ?></span>
                            </p>
                        </li>
                    <?php endforeach; ?>
                </ul>
        </div>
    </section>
    <!--<section class="infoContent" style="display:<?php echo empty($info['social']) ? 'none' : 'block' ?>">
        <h6 class="wrapperHeader"><img alt="Social Connections" src="/img/png/glyphicons_043_group.png" /><p>Social Connections</p></h6>
        <div class="leftPadding">
            <ul class="infoLists">
                <li id="socialImgs">
    <?php foreach ($info['social'] as $k => $item): ?>
                        <a href="<?php echo $item['link'] ?>" data-bind="hoverClass: 'hovering'"><i class="social26 <?php echo strtolower($item['name']) ?>"></i><?php $item['name'] ?></a>
    <?php endforeach; ?>
                </li>
            </ul>
        </div>
    </section>-->
</section>