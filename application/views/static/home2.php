<link rel="stylesheet" type="text/css" href="css/landing.css">

<div class="page-wrap" style="min-height:500px;">
    <div class="image-overlay">
        <div class="sales-section" id="section-one">
            <div class="container-fluid clearfix" style="max-width:1000px;text-align: center;margin:0 auto">
                <div class="row-fluid">
                    <div class="span3 hidden-phone" style="position:relative;padding-top:4em">
                        <img src="img/transparentLogo.png" class="logo-img">

                    </div>
                    <div class="span9 wordHolder">
                        <img src="img/RealTAsiaLogoWords.png" class="words-img hidden-phone">
                        <div class="visible-phone"><img src="img/RealTAsiaLogoFull.png" class="words-img">
                        </div>
                        <small class="label label-info" style="position:absolute;top:0;right:10px;">BETA</small>
                        <h1 class="slogan">The Right Now Real Estate </h1>
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
            <header class="title centralize">
                <div class="circle"></div>
                <h2 class="noMrgTop">Features</h2>
                <div class="line"></div>
            </header>
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
                                RealtAsia provides a way for people to subscribe to your updates so you can send that important message to those who matter.
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
                                Instant notifications of a person or place you are subscribed to keeps you in the know.
                                <br>
                                Everytime.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <div class="centralize">
                <h3>Just the tip of the iceberg.</h3>
                <p>
                    We'll share the details of our roadmap and a list of features with you when you join our community
                </p>
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
                <a href="#prices" class="btn btn-warning btn-large"> See Packages </a>
            </div>
            <div class="btn-group">
                <a href="/faq" class="btn btn-large"> FAQ </a>
            </div>
        </div>
    </div>
</div>
<div id="container" style="padding-bottom:100px;">
    <div class="container-fluid homeMenu" data-bind="with:$root.regForm">
        <div id="contentCarousel" data-interval="false" class="relative carousel slide">
            <div class="carousel-inner" style="margin-top:10px;">
                <div class="active item relative" id="Packages">
                    <section class="compact row-fluid" id="prices">
                        <header class="title centralize">
                            <div class="circle"></div>
                            <h2 class="noMrgTop">Packages</h2>
                            <div class="line"></div>
                        </header>
                        <ul class="pricing-table dark">
                            <li class="hidden-phone" style="width:2.2%;display:inline-block;float:left;background:transparent">
                                &nbsp;
                            </li>
                            <!-- ko foreach:$data.package.plans -->
                            <li class="span4" data-bind="css:{active:featured, primary:featured}">
                                <h3><span data-bind="text:name"></span>
                                <br>
                                <small class="white"><i class="red">*</i> Limited to 50 Sign-Ups.</small></h3>
                                <div class="price-body">
                                    <div class="aprice">
                                        <span class="price-figure"><sup>$</sup><span data-bind="text:dollars"></span><small data-bind="text:cents.toString().slice(1)"></small> </span>
                                        <span class="price-term">per year</span>
                                    </div>
                                </div>
                                <div class="features">
                                    <ul>
                                        <li>
                                            <h4 style="display:inline-block;font-weight:bolder" data-bind="text:listings"></h4> Property Listings
                                        </li>
                                        <li>
                                            Personalised Profile Page
                                        </li>
                                        <li>
                                            Email / Phone Support
                                        </li>
                                        <li>
                                            <span data-bind="text: $data.storage || 'unlimited'"></span> GB Storage
                                        </li>
                                        <li>
                                            Subscription Price Lock-In
                                        </li>
                                    </ul>
                                </div>
                                <div class="footer">
                                    <a href="#" class="btn btn-primary btn-large">Get Started</a>
                                </div>
                            </li>
                            <!-- /ko -->
                        </ul>
                    </section>
                </div>
                <div class="item relative" id="Register">
                    <header class="title centralize">
                        <div class="circle"></div>
                        <h2 class="noMrgTop">Create your Account</h2>
                        <div class="line"></div>
                    </header>
                    <?php
					include Kohana::find_file('views/forms', 'register');
                    ?>
                </div>
            </div>
        </div>
    </div>
    

</div>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenLite.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TimelineLite.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/easing/EasePack.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/jquery.gsap.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/CSSPlugin.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/TextPlugin.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/ScrollToPlugin.min.js"></script>
<script>
	$(document).ready(function() {
		RTApp.initRegForm();		
		var logo = $(".logo-img"), words = $(".words-img"), slogan = $(".slogan"), menu = $('.navbar-inverse'), tl = new TimelineLite({
			paused : true
		}), carousel = $('#contentCarousel'), carouselRight = function() {
			var idx = $('#contentCarousel .active').index('#contentCarousel .item');
			if (idx === 0) {
				carousel.carousel('next');
				TweenLite.to(window, 1, {
					scrollTo : {
						y : $("#prices").offset().top - 20,
						autoKill : false
					},
					ease : Back.easeOut
				});
			}

		}, carouselLeft = function() {
			var idx = $('#contentCarousel .active').index('#contentCarousel .item');
			if (idx !== 0) {
				carousel.carousel('prev');
			}
		};
		carousel.carousel({
			interval : false
		});

		tl.from(logo, 2, {
			opacity : .1,
			scale : 2,
			rotationY : 360,
			ease : Quad.easeInOut
		}).from(words, .8, {
			opacity : 0,
			scale : 2,
			ease : Quad.easeOut
		}, "-=.8").from(slogan, .6, {
			rotation : "-40deg",
			alpha : 0,
			ease : Back.easeOut
		}, "-=.3").to(menu, .8, {
			opacity : 1,
			ease : Back.easeOut
		}, "-=.3").resume();

		carousel.on('swipeleft', carouselLeft);
		carousel.on('swiperight', carouselRight);

		$('#goPrev').click(carouselLeft);
		$('#goNext').click(carouselRight);
		$('.homeMenu').on('click', '.pricing-table a.btn', function(){
			console.log('click');
			var data = ko.dataFor(this), vm = ko.contextFor(this);
			vm.$parent.package.selectedPlan(data);
			carouselRight();
		});
	});

</script>
