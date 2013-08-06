<article class="contentArea relative media listing" style="margin-top:0">
    <div class="pull-left">
        <a class="thumbnail" href="">
            <img alt="<?php echo $user['name']?>" src="//<?php echo str_replace($user['_id'], $user['_id'] . "/110", $picture) ?>" width="110" />
        </a>
        <div class="mediaThumbLinks">
            <span class="thumbInfo">
                <a style="display: block"class="text-center" href="#"><?php echo $counts['attachments'] ?> attachments</a>
            </span>
        </div> <!-- mediaThumbLinks -->
    </div> <!-- listings thumbnail -->
    <div class="contentBottom media-body media-details">
        <h3 class="media-heading">
            <a href="#"><?php echo $page['name'] ?></a>
            <a href="#"><?php echo $page['subtype'] . ' - ' . $listing['property_type'] ?></a>
        </h3>
        <span class="price relative">
            <span class="listingType">FOR<br /><?php echo strtoupper($listing['type']) ?></span>
            <span>$<?php echo number_format($listing['price']) ?></span>
        </span>
        <ul class="nav">
            <li><i class="info16 sqft"></i> <span style="color: #2691D4;"><?php echo number_format($listing['built_size']) ?> sqft</span></li>
            <li><i class="info16 bathrooms"></i> <span style="color: #2691D4;"><?php echo $listing['rooms'] ?> bedrooms</span></li>
            <li><i class="info16 bedrooms"></i> <span style="color: #2691D4;"><?php echo $listing['baths'] ?>3 bathrooms</span></li>
        </ul>
        <p><?php echo $excerpt ?></p>
    </div> <!-- listings content -->
</article>
