$(function() {
	// Get Browser Height and Width to position stuff
	var alturaBrowser = $(window).height();
	var anchoBrowser  = $(window).width();


	if(anchoBrowser > 990) {
		// Position stuff if...
		if(alturaBrowser < 832 && anchoBrowser >= 992) {
			$('.producto > p > img').css('marginTop', '10%');
			$('.entrada').css('marginTop', '10%');
		} 
		// Animate product on load
		TweenLite.from(".producto", 1, {opacity:"0"});

		TweenLite.from(".animRevolotea", 1, {opacity:"0", rotation:90});

		TweenLite.from(".entrada", 1, {opacity:"0", marginLeft:-190});

		// Animate video image on hover
		$('.videos').hover(function() {
			/* Stuff to do when the mouse enters the element */
			TweenLite.to(this, 0.5, {opacity:"0.5"});
		}, function() {
			/* Stuff to do when the mouse leaves the element */
			TweenLite.to(this, 0.5, {opacity:"1"});
		});
		// Animate mariposa
		$('.animRevolotea').hover(function() {
			/* Stuff to do when the mouse enters the element */
			var tweenRevolotea = TweenMax.to(".animRevolotea", 0.5, {scaleX:0.5, repeat:1, yoyo:true});		
		}, function() {
			/* Stuff to do when the mouse leaves the element */
		});
	}
});