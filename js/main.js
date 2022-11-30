AOS.init({
 	duration: 800,
 	easing: 'slide'
 });
(function ($) {
	$.fn.floatingWhatsApp = function (options) {
		var settings = $.extend({
			phone: '',
			message: '',
			size: '72px',
			backgroundColor: '#25D366',
			position: 'left',
			popupMessage: '',
			showPopup: false,
			showOnIE: true,
			autoOpenTimeout: 0,
			headerColor: '#128C7E',
			headerTitle: 'WhatsApp Chat',
			zIndex: 0,
			buttonImage: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 800 800" width="800" height="800"><defs><clipPath id="_clipPath_A3g8G5hPEGG2L0B6hFCxamU4cc8rfqzQ"><rect width="800" height="800"/></clipPath></defs><g clip-path="url(#_clipPath_A3g8G5hPEGG2L0B6hFCxamU4cc8rfqzQ)"><g><path d=" M 787.59 800 L 12.41 800 C 5.556 800 0 793.332 0 785.108 L 0 14.892 C 0 6.667 5.556 0 12.41 0 L 787.59 0 C 794.444 0 800 6.667 800 14.892 L 800 785.108 C 800 793.332 794.444 800 787.59 800 Z " fill="rgb(37,211,102)"/></g><g><path d=" M 508.558 450.429 C 502.67 447.483 473.723 433.24 468.325 431.273 C 462.929 429.308 459.003 428.328 455.078 434.22 C 451.153 440.114 439.869 453.377 436.434 457.307 C 433 461.236 429.565 461.729 423.677 458.78 C 417.79 455.834 398.818 449.617 376.328 429.556 C 358.825 413.943 347.008 394.663 343.574 388.768 C 340.139 382.873 343.207 379.687 346.155 376.752 C 348.804 374.113 352.044 369.874 354.987 366.436 C 357.931 362.999 358.912 360.541 360.875 356.614 C 362.837 352.683 361.857 349.246 360.383 346.299 C 358.912 343.352 347.136 314.369 342.231 302.579 C 337.451 291.099 332.597 292.654 328.983 292.472 C 325.552 292.301 321.622 292.265 317.698 292.265 C 313.773 292.265 307.394 293.739 301.996 299.632 C 296.6 305.527 281.389 319.772 281.389 348.752 C 281.389 377.735 302.487 405.731 305.431 409.661 C 308.376 413.592 346.949 473.062 406.015 498.566 C 420.062 504.634 431.03 508.256 439.581 510.969 C 453.685 515.451 466.521 514.818 476.666 513.302 C 487.978 511.613 511.502 499.06 516.409 485.307 C 521.315 471.55 521.315 459.762 519.842 457.307 C 518.371 454.851 514.446 453.377 508.558 450.429 Z  M 401.126 597.117 L 401.047 597.117 C 365.902 597.104 331.431 587.661 301.36 569.817 L 294.208 565.572 L 220.08 585.017 L 239.866 512.743 L 235.21 505.332 C 215.604 474.149 205.248 438.108 205.264 401.1 C 205.307 293.113 293.17 205.257 401.204 205.257 C 453.518 205.275 502.693 225.674 539.673 262.696 C 576.651 299.716 597.004 348.925 596.983 401.258 C 596.939 509.254 509.078 597.117 401.126 597.117 Z  M 567.816 234.565 C 523.327 190.024 464.161 165.484 401.124 165.458 C 271.24 165.458 165.529 271.161 165.477 401.085 C 165.46 442.617 176.311 483.154 196.932 518.892 L 163.502 641 L 288.421 608.232 C 322.839 627.005 361.591 636.901 401.03 636.913 L 401.126 636.913 L 401.127 636.913 C 530.998 636.913 636.717 531.2 636.77 401.274 C 636.794 338.309 612.306 279.105 567.816 234.565" fill-rule="evenodd" fill="rgb(255,255,255)"/></g></g></svg>',
		}, options);

		var isMobile = mobilecheck();

		//set the .floating-wpp default class
		this.addClass('floating-wpp');

		//#region jQuery Elements
		var $button = $(document.createElement('div'));
		var $buttonImageContainer = $(document.createElement('div'));
		var $popup = $(document.createElement('div'));
		var $header = $(document.createElement('div'));
		var $popupMessage = $(document.createElement('div'));
		var $btnSend = $(document.createElement('div'));
		var $inputMessage = $(document.createElement('div'));
		//#endregion

		//#region Main Button
		$buttonImageContainer.addClass('floating-wpp-button-image');

		$button.addClass('floating-wpp-button')
			.append($(settings.buttonImage))
			.css({
				'width': settings.size,
				'height': settings.size,
				'background-color': settings.backgroundColor
			});

		if (!isInternetExplorer() || settings.showOnIE) {
			$button.append($buttonImageContainer).appendTo(this);
		}

		$button.on('click', function () {
			if (isMobile && settings.showPopup) {
				openPopup();
			}
			else {
				sendWhatsappMessage();
			}
		});
		//#endregion

		//#region Fake Chat Pop-up
		if (settings.showPopup) {
			var $textarea = $(document.createElement('textarea'));
			var $closeBtn = $(document.createElement('strong'));
			var $sendIcon = $('<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 20 18" width="20" height="18"><defs><clipPath id="_clipPath_fgX00hLzP9PnAfCkGQoSPsYB7aEGkj1G"><rect width="20" height="18"/></clipPath></defs><g clip-path="url(#_clipPath_fgX00hLzP9PnAfCkGQoSPsYB7aEGkj1G)"><path d=" M 0 0 L 0 7.813 L 16 9 L 0 10.188 L 0 18 L 20 9 L 0 0 Z " fill="rgb(46,46,46)"/></g></svg>')

			$popup.addClass('floating-wpp-popup');
			$header.addClass('floating-wpp-head');
			$popupMessage.addClass('floating-wpp-message');
			$inputMessage.addClass('floating-wpp-input-message');
			$btnSend.addClass('floating-wpp-btn-send');

			$popupMessage.text(settings.popupMessage);
			$textarea.val(settings.message);

			if (!settings.popupMessage) {
				$popupMessage.hide();
			}

			$header.append('<span>' + settings.headerTitle + '</span>', $closeBtn)
				.css('background-color', settings.headerColor);

			$btnSend.append($sendIcon);
			$inputMessage.append($textarea, $btnSend);

			$closeBtn.addClass('close').html('&times;');

			$popup.append(
				$header,
				$popupMessage,
				$inputMessage)
				.appendTo(this);

			$popupMessage.click(function () {
				//sendWhatsappMessage();
			});

			$closeBtn.click(function () {
				//popup.removeClass('active');
			});

			$header.click(function () {
				$popup.removeClass('active');
			});

			$textarea.keypress(function (event) {
				settings.message = $(this).val();

				if (event.keyCode == 13 && !event.shiftKey && !isMobile) {
					event.preventDefault();
					$btnSend.click();
				}
			});

			$btnSend.click(function () {
				settings.message = $textarea.val();
				sendWhatsappMessage();
			});

			this.mouseenter(function () {
				openPopup();
			});

			if (settings.autoOpenTimeout > 0) {
				setTimeout(function () {
					openPopup();
				}, settings.autoOpenTimeout);
			}

			function openPopup() {
				if (!$popup.hasClass('active')) {
					$popup.addClass('active');
					$textarea.focus();
				}
			}
		}

		if (settings.zIndex) {
			$(this).css('z-index', settings.zIndex);
		}

		if (settings.position === 'right') {
			this.css({
				left: 'auto',
				right: '15px'
			});
			$popup.css('right', '0');
		}
		//#endregion

		function sendWhatsappMessage() {
			var apilink = 'http://';

			apilink += isMobile ? 'api' : 'web';
			apilink += '.whatsapp.com/send?phone=' + settings.phone + '&text=' + encodeURI(settings.message);

			window.open(apilink);
		}
	}

	function isInternetExplorer() {
		var userAgent = window.navigator.userAgent;
		return userAgent.indexOf("MSIE") >= 0 || userAgent.match(/Trident.*rv\:11\./);
	}

	function mobilecheck() {
		var check = false;
		(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
		return check;
	}
}(jQuery));

$(function () {
	$('#myButton').floatingWhatsApp({
		phone: '+971588126926',
		popupMessage: 'Hello, We would love to hear your suggestions',
		message: "The Biryani was Awesome!",
		showPopup: true,
		showOnIE: false,
		headerTitle: 'Biryani Overdose',
		headerColor: 'black',
		backgroundColor: 'green',
		position: 'right',
		buttonImage: '<img src="images/whps.png" />'
		
	});
});

$(function () {
	"use strict";
	var a = 0;
	$('#tv').hide();
	for (; a < 25; a += 1) {
		setTimeout(function b() {
			var a = Math.random() * 1e3 + 5e3,
				c = $("<div />", {
					"class": "smoke",
					css: {
						left: Math.random() * 800,
						backgroundSize: "contain",
						width: Math.random() * 800,
						height: Math.random() * 600
					}
				});
			$(c).addClass("animated");
			$(c).addClass("zoomIn");
			$(c).addClass("rollOut");
			$(c).appendTo("#viewport");
			$.when($(c).animate({}, {
				duration: a / 4,
				easing: "linear",
				queue: false,
				complete: function () {
					$(c).animate({}, {
						duration: a / 3,
						easing: "linear",
						queue: false
					})
				}
			}),
				$(c).animate({
					bottom: $("#viewport").height()
				}, {
					duration: a,
					easing: "linear",
					queue: false
				})).then(
					function () {
						$(c).remove();
						b()
					})
		}, Math.random() * 3e3)
	}
	$("body").keypress(function () {
		$('body').addClass("fadeOut");
		setTimeout(function () {
			$('#tv').show();
		}, 1000);

		console.log("Handler for .keypress() called.");
	});
}())
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
	playerDefaults = {
		autoplay: 0,
		autohide: 1,
		modestbranding: 0,
		rel: 0,
		showinfo: 0,
		controls: 0,
		disablekb: 1,
		enablejsapi: 0,
		iv_load_policy: 3
	};
var vid = [{
	'videoId': '2b5QNj-BVhs',
	'startSeconds': 515,
	'endSeconds': 690,
	'suggestedQuality': 'hd720'
}, {
	'videoId': '9ge5PzHSS0Y',
	'startSeconds': 465,
	'endSeconds': 657,
	'suggestedQuality': 'hd720'
}, {
	'videoId': 'OWsCt7B-KWs',
	'startSeconds': 0,
	'endSeconds': 240,
	'suggestedQuality': 'hd720'
}, {
	'videoId': 'qMR-mPlyduE',
	'startSeconds': 19,
	'endSeconds': 241,
	'suggestedQuality': 'hd720'
}],
	randomvid = Math.floor(Math.random() * (vid.length - 1 + 1));

function onYouTubePlayerAPIReady() {
	tv = new YT.Player('tv', {
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		},
		playerVars: playerDefaults
	});
}

function onPlayerReady() {
	tv.loadVideoById(vid[randomvid]);
	tv.mute();
}

function onPlayerStateChange(e) {
	if (e.data === 1) {
		$('#tv').addClass('active');
	} else if (e.data === 0) {
		tv.seekTo(vid[randomvid].startSeconds)
	}
}

function vidRescale() {

	var w = $(window).width() + 200,
		h = $(window).height() + 200;

	if (w / h > 16 / 9) {
		tv.setSize(w, w / 16 * 9);
		$('.tv .screen').css({
			'left': '0px'
		});
	} else {
		tv.setSize(h / 9 * 16, h);
		$('.tv .screen').css({
			'left': -($('.tv .screen').outerWidth() - w) / 2
		});
	}
}

$(window).on('load resize', function () {
	vidRescale();
});

$('.hi span').on('click', function () {
	$('#tv').toggleClass('mute');
	if ($('#tv').hasClass('mute')) {
		tv.mute();
	} else {
		tv.unMute();
	}
});

(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll',
    horizontalOffset: 0,
	  verticalOffset: 0
  });

  // Scrollax
  $.Scrollax();


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1,
	        nav:false
	      },
	      600:{
	        items:1,
	        nav:false
	      },
	      1000:{
	        items:1,
	        nav:false
	      }
	    }
		});
		$('.carousel-work').owlCarousel({
			autoplay: true,
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding:0,
			nav: true,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1,
					stagePadding: 0
				},
				600:{
					items: 2,
					stagePadding: 50
				},
				1000:{
					items: 3,
					stagePadding: 100
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	
	var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


	// navigation
	var OnePageNav = function() {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();

		 	var hash = this.hash,
		 			navToggler = $('.navbar-toggler');
		 	$('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });


		  if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});
		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();


	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: true,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  $('#appointment_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});

	$('#appointment_time').timepicker();




})(jQuery);

