<article class="contentArea relative media listing" style="margin-top:0">
    <div class="pull-left">
        <a class="thumbnail" href="/<?php echo $user['_id']?>">
            <img alt="<?php echo $user['name']?>" src="//<?php echo str_replace($user['_id'], $user['_id'] . "/110", $picture) ?>" width="110" />
        </a>
        <div class="mediaThumbLinks">
            <span class="thumbInfo">
                <a style="display: block"class="text-center" href="#"><?php echo $counts['attachments'] ?> attachments</a>
            </span>
        </div> <!-- mediaThumbLinks -->
    </div> <!-- listings thumbnail -->
    <div class="contentBottom media-body media-details">
        <h3 class="media-heading" style="display:inline-block;width:100%;">
            <a href="<?php echo $page['uri'] ?>"><?php echo $page['name'] ?></a>
            <a href="#"><small class="muted"><?php echo $page['subtype'] . ' - ' . $listing['property_type'] ?></small></a>
                <span class="visible-phone text-right">
                    <small style="font-weight:bold;color:#555"><?php echo strtoupper($listing['type']) ?></small>
                    <span style="font-weight:bold;color:#555;font-size:85%">$<?php echo number_format($listing['price']) ?></span>
                </span>
        </h3>
        <span class="price relative hidden-phone">
            <span class="listingType">FOR<br /><?php echo strtoupper($listing['type']) ?></span>
            <span>$<?php echo number_format($listing['price']) ?></span>
        </span>
        <ul class="nav">
            <li><i class="info16 sqft"></i> <span style="color: #878888;"><?php echo number_format(\Arr::get($listing, 'built_size', 0)) ?> sqft</span></li>
            <li><i class="info16 bathrooms"></i> <span style="color: #878888;"><?php echo $listing['rooms'] ?> bedrooms</span></li>
            <li><i class="info16 bedrooms"></i> <span style="color: #878888;"><?php echo $listing['baths'] ?> bathrooms</span></li>
        </ul>
    </div> <!-- listings content -->
</article>
