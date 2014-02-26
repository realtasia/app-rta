<div class="page-wrap" style="min-height:500px;margin-top:40px">
        <div class="alert-danger">
            <div class="sales-section centralize" id="section-cancelled">
                <h1><i class="icon-exclamation-sign"></i> Transaction Cancelled</h1>
                <p class="lead">Oops... the transaction was cancelled. This page will redirect to RealtAsia's <a href="/">home page</a> in a few seconds.</p>
            </div>
        </div>
        <ul class="spinner">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>        
</div>
<style>
	.sales-section {
		position: relative;
		padding: 2em 0 1em 0;
		/*color:#c09853;
		text-shadow: 1px 0 1px #fff;	*/	
	}
	
	.spinner {
		/* Size and position */
		font-size: 100px; /* 1em */
		width: 2em;
		height: 2em;
		margin: 10px auto;
		position: relative;
		/* Styles */
		list-style: none;
		border-radius: 50%;
	}
	.spinner li {
		width: .2em;
		height: .2em;
		position: absolute;
		border-radius: 50%;
	}
	.spinner li:nth-child(1) {
		background: #00C176; /* Blue */
		top: 0;
		left: 50%;
		margin-left: -.1em; /* Width/2 */
		transform-origin: 50% 250%;
		-webkit-transform-origin: 50% 250%;
		-moz-transform-origin: 50% 250%;
		-webkit-animation: rota 1.13s linear infinite, opa 3.67s ease-in-out infinite alternate;
		-moz-animation: rota 1.13s linear infinite, opa 3.67s ease-in-out infinite alternate;
		animation: rota 1.13s linear infinite, opa 3.67s ease-in-out infinite alternate;
	}
	.spinner li:nth-child(2) {
		background: #FF003C; /* Red */
		top: 50%;
		right: 0;
		margin-top: -.1em; /* Height/2 */
		transform-origin: -150% 50%;
		-webkit-transform-origin: -150% 50%;
		-moz-transform-origin: -150% 50%;
		-webkit-animation: rota 1.86s linear infinite, opa 4.29s ease-in-out infinite alternate;
		-moz-animation: rota 1.86s linear infinite, opa 4.29s ease-in-out infinite alternate;
		animation: rota 1.86s linear infinite, opa 4.29s ease-in-out infinite alternate;
	}
	.spinner li:nth-child(3) {
		background: #FABE28; /* Yellow */
		bottom: 0;
		left: 50%;
		margin-left: -.1em; /* Width/2 */
		transform-origin: 50% -150%;
		-webkit-transform-origin: 50% -150%;
		-moz-transform-origin: 50% -150%;
		-webkit-animation: rota 1.45s linear infinite, opa 5.12s ease-in-out infinite alternate;
		-moz-animation: rota 1.45s linear infinite, opa 5.12s ease-in-out infinite alternate;
		animation: rota 1.45s linear infinite, opa 5.12s ease-in-out infinite alternate;
	}
	.spinner li:nth-child(4) {
		background: #88C100; /* Green */
		top: 50%;left 0;
		margin-top -.1em; /* Height/2 */
		transform-origin: 250% 50%;
		-webkit-transform-origin: 250% 50%;
		-moz-transform-origin: 250% 50%;
		-moz-animation: rota 1.72s linear infinite, opa 5.25s ease-in-out infinite alternate;
		-webkit-animation: rota 1.72s linear infinite, opa 5.25s ease-in-out infinite alternate;
		animation: rota 1.72s linear infinite, opa 5.25s ease-in-out infinite alternate;
	}
	@keyframes rota {
	to {
		transform: rotate(360deg);
	}
	}

	@-webkit-keyframes
	rota {to {
		-webkit-transform: rotate(360deg);
	}
	}
	@-moz-keyframes
	rota {to {
		-moz-transform: rotate(360deg);
	}
	}

	@-webkit-keyframes opa {
	12.0% { opacity: 0.80; }
	19.5% { opacity: 0.88; }
	37.2% { opacity: 0.64; }
	40.5% { opacity: 0.52; }
	52.7% { opacity: 0.69; }
	60.2% { opacity: 0.60; }
	66.6% { opacity: 0.52; }
	70.0% { opacity: 0.63; }
	79.9% { opacity: 0.60; }
	84.2% { opacity: 0.75; }
	91.0% { opacity: 0.87; }
	}

	@-moz-keyframes opa {
	12.0% { opacity: 0.80; }
	19.5% { opacity: 0.88; }
	37.2% { opacity: 0.64; }
	40.5% { opacity: 0.52; }
	52.7% { opacity: 0.69; }
	60.2% { opacity: 0.60; }
	66.6% { opacity: 0.52; }
	70.0% { opacity: 0.63; }
	79.9% { opacity: 0.60; }
	84.2% { opacity: 0.75; }
	91.0% { opacity: 0.87; }
	}

	@keyframes opa {
	12.0% { opacity: 0.80; }
	19.5% { opacity: 0.88; }
	37.2% { opacity: 0.64; }
	40.5% { opacity: 0.52; }
	52.7% { opacity: 0.69; }
	60.2% { opacity: 0.60; }
	66.6% { opacity: 0.52; }
	70.0% { opacity: 0.63; }
	79.9% { opacity: 0.60; }
	84.2% { opacity: 0.75; }
	91.0% { opacity: 0.87; }
	}	
</style>
<script>
	
	setTimeout(function(){
		return window.location.href = "/"
	}, 5000);
	
</script>