<article class="contentArea relative media listing" style="margin-top:0">
    <div style="display:block;clear:both;">
        <a class="thumbnail" href="/<?php echo $user['_id']?>">
            <div class="an-image" role="img" aria-label="<?php echo isset($name) ? $name : $excerpt?>" style="background-image:url(http://<?php echo $picture ?>)"></div>
        </a>
        <div class="mediaThumbLinks">
            <span class="thumbInfo">
                <a style="display: block;clear:both" class="text-center" href="#"><?php echo $counts['attachments'] ?> attachments</a>
            </span>
        </div> <!-- mediaThumbLinks -->
    </div> <!-- listings thumbnail -->
    <div class="contentBottom media-details">
        <h3 class="media-heading" style="display:inline-block;width:100%;">
            <a href="<?php echo $page['uri'] ?>"><?php echo $page['name'] ?></a>
            <a href="#"><small class="muted"><?php echo $page['subtype'] . ' - ' . $listing['property_type'] ?></small></a>
        </h3>
        <ul class="nav">
            <li><i class="info16 sqft"></i> <span style="color: #878888;"><?php echo number_format(\Arr::get($listing, 'built_size', 0)) ?> sqft</span></li>
            <li><i class="info16 bathrooms"></i> <span style="color: #878888;"><?php echo $listing['rooms'] ?> bedrooms</span></li>
            <li><i class="info16 bedrooms"></i> <span style="color: #878888;"><?php echo $listing['baths'] ?> bathrooms</span></li>
        </ul>
    </div> <!-- listings content -->
</article>
