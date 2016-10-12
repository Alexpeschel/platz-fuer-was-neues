$(document).ready(function() {

	// load all images in 2 Arrays
	//first array
	var images = [];
	for(var i = 0; i < 32; i++) {
		if(i < 10) {
			images.push('#0'+i);
		} else {
			images.push('#'+i);
		}
	}
	//second array
	var images2 = [];
	for(i = 32; i < 51; i++) {
		images2.push('#'+i);
	}
	//third array
	var images3 = [];
	for(i = 51; i < 72; i++) {
		images3.push('#'+i);
	}

	// init Scroll Magic
	var ctrl = new ScrollMagic.Controller();

	// images animation No.1
	var obj = {curImg: 0};
	var obj2 = {curImg2: 0};
	var obj3 = {curImg3: 0};
	//get window height
	var height = $(window).height();

	// create tween
	var tween1 = new TimelineMax()
		.to(obj, 2,
		{
			curImg: images.length - 1,						// stop at image 30
			roundProps: "curImg",			// only integers so it can be used as an array index
			repeat: 0,						// no repeat
			immediateRender: true,			// load first image automatically
			// ease: Linear.easeNone,			// show every image the same ammount of time
			ease: SteppedEase.config(images.length - 1),
			// force3D:true,
			onUpdate: function () {

				$("#boxImg").attr("xlink:href", images[obj.curImg]);

			}
		})
		.staggerFrom('.ballons__item', 1.5,
		{
			opacity: 0,
			y: ((height / 2) - ((height / 100) * 30)),
			ease: Power2.easeInOut,
			// force3D:true
		}, 0.3);

	var tween2	= new TimelineMax()
		.to(obj2, 2,
		{
			curImg2: images2.length - 1,						// stop  at image 50
			roundProps: "curImg2",			// only integers so it can be used as an array index
			repeat: 0,						// no repeat
			immediateRender: false,			// load first image automatically
			// ease: Linear.easeNone,			// show every image the same ammount of time
			ease: SteppedEase.config(images2.length - 1),
			// force3D:true,
			onUpdate: function () {

				$("#boxImg").attr("xlink:href", images2[obj2.curImg2]);

			}
		})
		.fromTo('.video-poster', 1.6,
		{
			css: {
				display: "none",
				opacity: 0,
				scale: 0.1
			}
		},
		{
			css:{
				display: "",
				opacity: 1,
				scale: 1
			}
			, force3D:true
		});


	var tween3	= new TimelineMax()
			.to('.video-poster', 1,
			{
					display: "none",
					opacity: 0,
					scale: 0.1,
					// force3D:true
			})
			.to(obj3, 2,
			{
				curImg3: images3.length - 1,						// stop at image 71
				roundProps: "curImg3",			// only integers so it can be used as an array index
				repeat: 0,						// no repeat
				immediateRender: false,			// load first image automatically
				// ease: Linear.easeNone,			// show every image the same ammount of time
				ease: SteppedEase.config(images3.length - 1),
				// force3D:true,
				onUpdate: function () {

					$("#boxImg").attr("xlink:href", images3[obj3.curImg3]);

				}
			})
			.staggerFromTo('.button', 2.6,
				{
					css: {
						display: "none",
						opacity: 0,
						y: (0 - (height / 2))
					}
				},
				{
					css: {
						display: "",
						opacity: 1,
						y: 0
					},
					// force3D:true,
					ease:Bounce.easeOut
				}, 0.1);

	// build scene

	var scene1 = new ScrollMagic.Scene({triggerElement: "#one", duration: "100%", offset: 30})
					.setTween(tween1)
					.on("progress", function(e) {
						var tween1Progress = tween1.progress() * 33;
						$("#progress-now").css(
							"height", tween1Progress + "%"
						);
					})
					.on("end", function(e) {
						if(e.scrollDirection == "REVERSE") {
							$("#socialLink").removeClass("highlight");
						} else {
							$("#socialLink").addClass("highlight");
						}
					})
					.addTo(ctrl);

	var scene2 = new ScrollMagic.Scene({triggerElement: "#two", duration: "100%", offset: 30})
					.setTween(tween2)
					.on("progress", function(e) {
						var tween2Progress = (tween2.progress() * 33) + 33;
						$("#progress-now").css(
							"height", tween2Progress + "%"
						);
					})
					.on("end", function(e) {
						if(e.scrollDirection == "REVERSE") {
							$("#videoLink").removeClass("highlight");
						} else {
							$("#videoLink").addClass("highlight");
						}
					})
					.addTo(ctrl);

	var scene3 = new ScrollMagic.Scene({triggerElement: "#three", duration: "100%", offset: 30})
					.setTween(tween3)
					.on("progress", function(e) {
						var tween3Progress = (tween3.progress() * 33) + 66;
						$("#progress-now").css(
							"height", tween3Progress + "%"
						);
					})
					.on("end", function(e) {
						if(e.scrollDirection == "REVERSE") {
							$("#downloadLink").removeClass("highlight");
						} else {
							$("#downloadLink").addClass("highlight");
						}
					})
					.addTo(ctrl);


	// trigger hook position
	scene1.triggerHook(0);
	scene2.triggerHook(0);
	scene3.triggerHook(0);

	// modal windows
	$("#impressum").click(function(e) {
			e.preventDefault();
			$.scrollify.disable();
			$("#modal").show().attr("aria-hidden", "false");
			TweenMax.from("#modal .modal__dialog", 0.6, {y: -200});

	});
	$("#contact").click(function(e) {
			e.preventDefault();
			$.scrollify.disable();
			$("#modal2").show().attr("aria-hidden", "false");
			TweenMax.from("#modal2 .modal__dialog", 0.6, {y: -200});
	});
	$(".video-poster").click(function() {
			$.scrollify.disable();
			$("#videoModal").show().attr("aria-hidden", "false");
			TweenMax.from("#videoplayer", 0.6, {scale: 0.7});
			player.playVideo();
	});

	$(".js-video-close").click(function(e) {
			e.preventDefault();
			$.scrollify.enable();
			// $.scrollify.update();
    	player.pauseVideo();
			$(".modal").hide().attr("aria-hidden", "true");
	});

	$(".js-modal-close").click(function(e) {
			e.preventDefault();
			$.scrollify.enable();
			$.scrollify.update();
			$(".modal").hide().attr("aria-hidden", "true");
	});

	//AJAX FORM

$('#submit').click(function(){

	$.post("contactengine.php", $("#contactform").serialize(), function(response) {

	if(response) {
 	$('#status').show().html(response);

 	$('#name').val('');
 	$('#email').val('');
 	$('#message').val('');
	}
	});
 return false;

 });

	 // init scrollify
	 $.scrollify({
		 section : ".scene",
		 easing: "",
		 scrollbars: false,
		 scrollSpeed: 4200,
		 offset : 2
	 });

	// pagination
 	$(".pagination a").on("click",$.scrollify.move);


	$(window).load( function() {
		//Vorhang auf
		$.scrollify.instantMove('#zuhause');
			setTimeout(function() {
				$('body').addClass('loaded');
			},600);
			setTimeout(function() {
				$.scrollify.move("#soziales");
			},1600);

		});

});

// https://developers.google.com/youtube/iframe_api_reference
// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// global variable for the player
var player;

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady() {
  // create the global player from the specific iframe (#player)
  player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'kP0wuKnXVKk',
      playerVars: { 'autoplay': 0, 'rel': 0, 'showinfo': 0, 'egm': 0, 'showsearch': 0, }
  });
}
