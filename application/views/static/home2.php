<link rel="stylesheet" type="text/css" href="css/landing.css">

<div class="page-wrap" style="min-height:500px;">
    <div class="image-overlay">
        <div class="sales-section" id="section-one">
            <div class="container-fluid clearfix" style="max-width:1000px;text-align: center;margin:0 auto">
                <div class="row-fluid">
                    <div class="span3" style="position:relative;padding-top:4em">
                        <img src="img/transparentLogo.png" class="logo-img"  style="display:none;">
                        
                    </div>
                    <div class="span9 wordHolder">
                        <img src="img/RealTAsiaLogoWords.png" class="words-img"  style="display:none;">
                        <small class="badge badge-warning" style="position:absolute;top:0;right:0">BETA 1.0</small>
                        <h1 class="slogan" style="display:none;">The Right Now Real Estate </h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="color-overlay">
            <div class="sales-section" id="section-orange">
                <div class="container clearfix" style="margin:0 auto;height:100%">
                    <div class="row-fluid">
                        <div class="span2 centerOnSmall">
                            <i class="hoverEffect text-right icon-group white"></i>
                        </div>
                        <div class="span10">
                            <h1 class="white noMrgTop">A Real Estate Portal designed to focus on you.</h1>
                            <p class="lead white">
                                It's a property portal. It's a social network.
                                <br>
                                Mostly, it's really all about you.
                                RealtAsia showcases you and your services as well as we do your property listings.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="white-overlay">
            <div class="sales-section">

                <div class="container-fluid" style="height:100%">
                    <div class="row-fluid">
                        <div class="span4 text-center">
                            <div class="hoverEffect centralize">
                                <i class="icon-comments-alt"></i>
                            </div>
                            <h1 class="noMrgTop">Conversations matter.</h1>
                            <p class="lead">
                                Exchange ideas in a public or private setting. Create opportunities for people to write testimonials on your services. You can even write one for co-workers or co-brokers.
                            </p>
                        </div>
                        <div class="span4 text-center">
                            <div class="hoverEffect centralize">
                                <i class="icon-hand-up"></i>
                            </div>
                            <h1 class="noMrgTop">Instant interactivity.</h1>

                            <p class="lead">
                                Users can comment on, like or subscribe to each individual <strong>property listing</strong>. They get to see attached brochures, pictures or videos without ever leaving the page.
                                <br>
                                Answer queries once in comments and have everyone else read it.
                            </p>
                        </div>
                        <div class="span4 text-center">
                            <div class="hoverEffect centralize">
                                <i class="icon-dashboard"></i>
                            </div>
                            <h1 class="noMrgTop">Real time updates.</h1>
                            <p class="lead">
                                Access the latest developments and events in any location. Never miss out on up-to-date information while you are viewing a property.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="head-banner centralize">
        <h1 class="white noMrgTop">Registrations Now Open for our Private Preview!</h1>
        <p class="lead white">
            Membership is currently limited, so hurry, subscribe now or read through our FAQ.
        </p>
        <div class="btn-toolbar">
            <div class="btn-group">
                <button class="btn btn-danger btn-large">
                    Subscribe
                </button>
            </div>
            <div class="btn-group">
                <button class="btn btn-large">
                    FAQ
                </button>
            </div>
        </div>
    </div>
</div>
<div id="container" style="padding-bottom:100px;">
    <section class="clearfix" id="prices">
        <header class="title">
            <h1 class="text-center">Choose your package</h1>
        </header>

        <div class="row-fluid animate fadeIn-onload fadeIn">
            <!-- Pricing Item 1 -->

            <div class="span4 pricing-item" >
                <div class="pricing-title">
                    Basic
                </div>

                <div class="pricer">
                    <span>$99.99<span>/yr</span></span>
                </div>

                <ul>
                    <li>
                        <span class="number">10</span> Property Listings
                    </li>
                    <li>
                        Email / Phone Support
                    </li>
                    <li>
                        1GB Storage
                    </li>
                    <li>
                        Lifetime Subscription Lock In
                    </li>
                    <li>
                        Free upgrades to new features*
                    </li>
                </ul><a class="btn btn-danger btn-large" href="#">Subscribe</a>
            </div><!-- Pricing Item 2 -->

            <div class="span4 pricing-item best">
                <div class="pricing-title">
                    Plus
                </div>

                <div class="pricer">
                    <span>$149.99<span>/yr</span></span>
                </div>

                <ul>
                    <li>
                        <span class="number">20</span> Property Listings
                    </li>
                    <li>
                        Email / Phone Support
                    </li>
                    <li>
                        5GB Storage
                    </li>
                    <li>
                        Lifetime Subscription Lock In
                    </li>
                    <li>
                        Free upgrades to new features*
                    </li>
                </ul><a class="btn btn-danger btn-large" href="#">Subscribe</a>
            </div><!-- Pricing Item 3 -->

            <div class="span4 pricing-item">
                <div class="pricing-title">
                    Enhanced
                </div>

                <div class="pricer">
                    <span>$199.98<span>/yr</span></span>
                </div>

                <ul>
                    <li>
                        <span class="number">50</span> Property Listings
                    </li>
                    <li>
                        Email / Phone Support
                    </li>
                    <li>
                        Unlimited Storage
                    </li>
                    <li>
                        Lifetime Subscription Lock In
                    </li>
                    <li>
                        Free upgrades to new features*
                    </li>
                </ul><a class="btn btn-danger btn-large" href="#">Subscribe</a>
            </div>
        </div><!-- /row -->
        <p class="muted contentArea">* Plan terms are subject to our conditions of use and privacy policy. Please read the FAQ for more information</p>
    </section>
</div>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.11.1/TweenMax.min.js"></script>
<script>
	$(document).ready(function() {
		var l = $(".logo-img"), w = $(".words-img"), slogan = $(".slogan");
		setTimeout(function() {
			l.fadeIn("slow", function() {
				l.addClass('flip');
				setTimeout(function() {
					w.fadeIn(function(){
						setTimeout(function() {
							slogan.slideDown();
						}, 500);						
					});
				}, 500);
			})
		}, 500);

	})
</script>
