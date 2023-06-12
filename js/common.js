// common.js
$(document).ready(function () {

	// 스크롤제어 막기
	function scrollDisable(){
		var docu_h = $(document).height();
			window_h = $(window).height();
			html_s = $('html').scrollTop();
			body_s = $('body').scrollTop();

		if (docu_h > window_h) {
			var scrollTop = (html_s) ? html_s : body_s; // Works for Chrome, Firefox, IE...
			$('html').addClass('noscroll').css('top', -scrollTop);
		}
	}
	// 스크롤제어 풀기
	function scrollAble(){
		var scrollTop = parseInt($('html').css('top'));
		$('html').removeClass('noscroll');
		$('html,body').scrollTop(-scrollTop);
	}
	

	// 전화연결
	mobile_tel();
	function mobile_tel() {
		var window_w = $(window).width();
		if (window_w > 1366) { // PC일때
			$('a.mobile_telNo').each(function () {
				$(this).attr('href', '#n');
			});	
		} else {
			$('a.mobile_telNo').each(function () {
				var this_tel = $(this).data('tel');
				$(this).attr('href', this_tel);
			});			
		}
	}

	// 관련(공공기관)사이트
	$('.famliysite>button').on('click', function(){
		$('.shadow2').show();
		$('.family_site').slideDown(400);
		setTimeout(function (){
			$('.family_pop .close_btn').addClass('on');
		}, 400);
	});
	$('.famliysite .close_btn').on('click', function(){
		$('.shadow2').hide();
		$('.family_pop .close_btn').removeClass('on');
		$('.family_site').slideUp(400);
	});

	// 언어선택
	$('.lang>button').on('click', function(){
		if($(this).parent().hasClass('close')){
			$(this).parent().removeClass('close');
			$('.lang ul').slideUp();
			$(this).attr('title','언어선택 열기')
		}else{
			$(this).parent().addClass('close');
			$('.lang ul').slideDown();
			$(this).attr('title','언어선택 닫기')
		}
	});

	$(document).click(function(e){ 

		if (!$(e.target).is('.lang>button')) { 
			$('.lang').removeClass('close');
			$('.lang ul').slideUp();
			$('.lang>button').attr('title','언어선택 열기')
		} 

	});


	// 알립니다 팝업
	$('.popup_zone>button').on('click', function(){
		$('.shadow2').show();
		$('.popup_list').slideDown(400);
		setTimeout(function (){
			$('.family_pop .close_btn').addClass('on');
		}, 400);
		$('.pop_slide ul').slick('setPosition');
	});
	$('.popup_zone .close_btn').on('click', function(){
		$('.shadow2').hide();
		$('.popup_list').slideUp(400);
		$('.family_pop .close_btn').removeClass('on');
	});

	var pop_slide = $('.pop_slide ul').slick({
		infinite: true,
		speed: 600,
		autoplaySpeed: 3000,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: false,
		dots: true,
		draggable: false,
		pauseOnHover:true,
		pauseOnFocus: false,
		// prevArrow: $('.pop_slide .prev_btn'),
        // nextArrow: $('.pop_slide .next_btn'),
		responsive: [
            {  
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                } 
            },
			{  
                breakpoint: 600,
                settings: {
                    slidesToShow: 1
                } 
            }
        ]
	});

	// 검색버튼 열고닫기
	$('.hd_search .top_search_btn').on('click', function(){
		var window_w = $(window).width();

		if(window_w <= 1366){
			$('.shadow2').show();
			$('.util_Box .top_searchBox').stop().slideDown(400);
			setTimeout(function (){
				$('.util_Box .top_searchBox .close_btn').addClass('on');
			}, 400);
		}else{
			// 절대경로 수정후 개발팀에게 따로 전달 230223 /fr/search/search.do
			location.href="../../con06/con06_01/search.html";
		}
	});
	$('.top_searchBox .close_btn').on('click', function(){
		$('.shadow2').hide();
		$('.util_Box .top_searchBox').stop().slideUp(400);
		$('.util_Box .top_searchBox .close_btn').removeClass('on');
	});


	pc_set();
	pc_menu();
	mobile_menu();

	//depth3있는 경우 구분
	$('.depth2>ul>li').each(function(){
		var more = $(this).children().length;
		if(more > 1){
			$(this).addClass('more');
		}
	});

	// pc_set
	function pc_set(){
		var window_w = $(window).width();
		if(window_w > 1366){//pc일때
			$('#header').removeClass('mobile');
			$('#header').addClass('pc');
			$('.depth1>.more_depth>a').unbind('click', false);
			$('.depth2 .more>a').unbind('click', false);
			$('.depth1>.more_depth').removeClass('hover');
			$('.depth2').hide();
			$('.depth3').show();
		}else{//mobile일때
			$('#header').removeClass('pc');
			$('#header').addClass('mobile');
			$('.depth1>.more_depth>a').bind('click', false);
			$('.depth2 .more>a').bind('click', false);

		}
	}

	//PC메뉴
	function pc_menu() {
		// 열기
		$('.pc .more_depth').on('mouseenter focusin', function () {
			var device = $('header').hasClass('pc');
			if(device == true){
				$('.pc .more_depth').removeClass('hover');
				$('.pc .depth2').stop().hide();
				$('.pc .nav_bg').stop().show();
				$('.pc .depth2').css({'display':'none'});
				$(this).addClass('hover');
				$(this).children('.depth2').stop().show();
				$(this).children('.depth2').css('display','flex');
				$('.shadow').show();

				// $('.pc #header').addClass('on');
			}	
		});
		// 닫기
		$('.pc .nav_bg').on('mouseleave blur', function () {
			var srch_status = $('.util_srch').hasClass('close');
			var header_scroll = $('html').scrollTop();

			if (srch_status == false && header_scroll < 170) {
				$('.pc .more_depth').removeClass('hover');
				$('.pc .depth2').stop().hide();
				$('.pc .nav_bg').stop().hide();
				$('.shadow').hide();
				$('.pc #header').removeClass('on');
			}
		});

		$('.pc .header_btm, .pc .gnbmenu, .pc .more_depth').on('mouseleave blur', function () {
			var header_scroll = $('html').scrollTop();
			$('.pc .more_depth').removeClass('hover');
			$('.pc .depth2').stop().hide();
			$('.pc .nav_bg').stop().hide();
			$('.shadow').hide();
			if (header_scroll < 170) {
				$('.pc #header').removeClass('on');
			}
		});

		//접근성
		$('.pc .util_Box .util_sitemap').on('focusout', function () {
			$('.pc .more_depth').removeClass('hover');
			$('.pc .depth2').stop().hide();
			$('.pc .nav_bg').stop().hide();
			$('.shadow').hide();
		});
	}

	$(window).resize(function () {
		var window_w = $(window).width();
			mobile_status = $('.nav_open').hasClass('close');
			
		$('.pc .depth2').stop().hide();
		$('.pc .nav_bg').stop().hide();

		pc_menu();
		mobile_menu();
		mobile_tel();
		lnb_lock();
		if (window_w > 1366) {//PC일때
			$('#header').removeClass('mobile');
			$('#header').addClass('pc');
			$('.depth1>.more_depth>a').unbind('click', false);
			$('.depth2 .more>a').unbind('click', false);
			$('.shadow2').hide();
			$('.open_btn').removeClass('close');
			$('.open_btn').attr('title', '메뉴열기');
			$('.pc .depth2').hide();
			$('.depth2').css('display','none');
			$('.depth3').show();
			$('.depth3').css('display','flex');
			$('.tab_wrap .tab').css('display','flex');

		}else if(window_w > 768){//mobile일때
			$('#header').addClass('mobile');
			$('#header').removeClass('pc');
			$('.nav_bg').hide();
			$('.depth1>.more_depth>a').bind('click', false);
			$('.depth2 .more>a').bind('click', false);
			if (mobile_status == false) {
				$('.gnbmenu, .header_top').css('right', '-200%');
			}
			$('.depth3').hide();			

			$('.tab_wrap .tab').css('display','flex');

		}else {//mobile일때
			$('#header').addClass('mobile');
			$('#header').removeClass('pc');
			$('.nav_bg').hide();
			$('.depth1>.more_depth>a').bind('click', false);
			$('.depth2 .more>a').bind('click', false);
			if (mobile_status == false) {
				$('.gnbmenu, .header_top').css('right', '-200%');
			}
			$('.depth3').hide();

			$('.tab_wrap .tab').css('display','block');
      		$('.tab_wrap .tab').hide();
      		$('.now_tab').removeClass('click');
			// 탭 속 탭 .tab는 예외
			$('.tab_wrap .tab.tabB').css('display','flex');
      		$('.tab_wrap .tab.tabB').show();
			$('.tab.depth_box').css('display','flex');
			$('.tab.depth_box').show();
		}

		// lnb 우측공유 닫기
		$('.share_btn').attr("title", "공유 목록 열기");
		$('.share_btn').removeClass('close');
		$('.share_list').slideUp();
		
	});

	// mobile 메뉴
	// 메뉴열기/닫기
	$('.open_btn').on('click', function () {
		var nav_status = $(this).hasClass('close');

		if (nav_status == false) { //열기
			$(this).addClass('close');
			$(this).attr('title', '메뉴닫기');

			//스크롤제어
			scrollDisable();

			// $('.shadow2').stop().fadeIn();
			$('.mobile .depth1>.more_depth>a').removeClass('hover');
			$('.mobile .depth2').hide();
			$('.mobile .depth1>.more_depth>a.now').next('.depth2').show();
			$('.mobile .depth1>.more_depth>a.now').next('.depth2').css({'display':'flex'});
			$('.mobile .depth1>.more_depth>a.now').removeClass('hidden');
			$('.depth3>li.now').parents('.depth3').show();

			$('.mobile .header_top').stop().animate({
				right: '0'
			}, 400);
			$('.mobile .gnbmenu').stop().animate({
				right: '0'
			}, 400);

			$('.util_Box').css('z-index','400');

			// 모바일 활성화 메뉴 상단에 위치하도록
			let $mobile_menuTop = $('.depth2>ul>li.now').position().top;
			let $depth2_menu = $('.depth2');
			$depth2_menu.scrollTop($mobile_menuTop);


		} else { //닫기
			$(this).removeClass('close');
			$(this).attr('title', '메뉴열기');
			$('.mobile .depth1>li>a').removeClass('open');
			$('.mobile .depth2').css({'display':'none'});
			$('.mobile .depth3').stop().slideUp();

			//스크롤제어
			scrollAble();

			// $('.shadow2').stop().fadeOut();
			$('.mobile .gnbmenu').stop().animate({
				right: '-200%'
			}, 400);
			$('.mobile .header_top').stop().animate({
				right: '-200%'
			}, 400);

			setTimeout(function () {
				$('.util_Box').css('z-index', '450');
			}, 100);
		}

	});

	function mobile_menu() {
		//뎁스열기/닫기
		$('.mobile .depth1>.more_depth>a').on('click', function () {
			//console.log('click');
			var toggle = $(this).hasClass('open');
			if (toggle == false) {
				$('.mobile .depth1>li>a').removeClass('open');
				$('.mobile .depth1>li>a').removeClass('now');
				$('.mobile .depth2').stop().hide();
				$(this).addClass('open');
				$(this).addClass('now');
				$(this).next('.depth2').stop().show();
			}
		});

		// 2dpeth 링크 이동 안하려면 a태그를 p태그로 수정
		$('.mobile .depth2>ul>.more>a').on('click', function () {
			var toggle = $(this).closest('li').hasClass('now');
			if (toggle == true) { //현재뎁스 클릭
				// console.log('현재?');
				$(this).closest('li').removeClass('now');
				$(this).next('.depth3').stop().slideUp();
			}else { //다른뎁스 클릭
				// console.log('아닐때?');
				$('.mobile .depth2>ul>li').removeClass('now');
				$(this).closest("li").addClass("now");
				$('.mobile .depth3').stop().slideUp();
				$(this).next('.depth3').stop().slideDown();				
				$(this).next('.depth3').css('display', 'flex');	

			}
		});
	}

	// 팝업 포커스 트랩
	const trapFocus = (element, prevFocusableElement = document.activeElement) => {
		const focusableEls = Array.from(
		  element.querySelectorAll(
			'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), div.scroll'
		  )
		);

		const firstFocusableEl = focusableEls[0];
		const lastFocusableEl = focusableEls[focusableEls.length - 1];
		let currentFocus = null;
	
		firstFocusableEl.focus();
		currentFocus = firstFocusableEl;
	
		const handleFocus = e => {
		  e.preventDefault();
		  // 모달 컨테이너 내 포커스 요소가 일치하는 요소에 초점 맞춤
		  if (focusableEls.includes(e.target)) {
			currentFocus = e.target;
		  } else {
			// 첫번째 요소에서 shift+tab 키로 뒤로 이동하면 마지막 요소로 포커스 이동
			if (currentFocus === firstFocusableEl) {
			  lastFocusableEl.focus();
			} else {
			  // 마지막 요소 포커스 후 첫번째 요소로 포커스 이동
			  firstFocusableEl.focus();
			}
			// 현재 포커스 변수 저장
			currentFocus = document.activeElement;
		  }
		};
	
		document.addEventListener("focus", handleFocus, true);
	
		return {
		  onClose: () => {
			document.removeEventListener("focus", handleFocus, true);
			prevFocusableElement.focus();
		  }
		};
	  };

	pop_align();
	function pop_align() {
		$('.pop_layer').each(function (index, item) {
			$(item).addClass('pop_0' + index);

			// var pop_width = $('.pop_0' + index).width();
			var pop_height = $('.pop_0' + index).height();

			$('.pop_0' + index).css({
				'margin-top': -(pop_height / '2')
			});
		});
	}
	
	$('.pop_open').on('click', function () { // 팝업열기
		var this_pop_name = $(this).attr('data-button');
		focus_el = $(this);
		$firstTab = $('.first_Tab');
		$lastTab = $('.last_Tab');
		scrollDisable();

		const modal = document.getElementById(this_pop_name);
		modal.style.display = "block";
		$('.shadow').css('z-index', '510');
		$('.shadow').fadeIn();
		trapped = trapFocus(modal);

		focus_el.attr('data-focus', 'on'); // 현재 포커스저장

		document.addEventListener('keydown', function (e) {
			var scrollChk = $('html').hasClass('noscroll');
			keycode = e.keycode;
			$target = e.target;
			// console.log($target);

			// ESC키 클릭시 팝업닫기
			if (e.key === 'Escape' && scrollChk) {
				$('html').removeClass('noscroll');
				$('#' + this_pop_name).fadeOut();
				$('.shadow').fadeOut();
				$("a[data-focus~=on]").focus();
				document.setTimeout(function () {
					$("a[data-focus~=on]").removeAttr("data-focus");
				}, 500); // 저장한 포커스 삭제
			}
		});
		$lastTab.on('keydown', function (e) {
			if (e.key === '13') {
				$('html').removeClass('noscroll');
				$('#' + this_pop_name).fadeOut();
				$('.shadow').fadeOut();
				$("a[data-focus~=on]").focus();
				document.setTimeout(function () {
					$("a[data-focus~=on]").removeAttr("data-focus");
				}, 500); // 저장한 포커스 삭제
			} else if (e.key === '9') {
				$firstTab.focus();
			}

		});
	});

	// 팝업닫기
	$('.pop_close, .close_pop').on('click', function () {
		var this_pop_name = $(this).attr('data-button');
		scrollAble();

		const modal = document.getElementById(this_pop_name);

		modal.style.display = "none";
		$('.shadow').fadeOut();
		setTimeout(function () {
			$('.shadow').css('z-index', '200');
		}, 400);
		trapped.onClose();

		$("a[data-focus~=on]").focus();
		document.setTimeout(function () {
			$("a[data-focus~=on]").removeAttr("data-focus");
		}, 500); // 저장한 포커스 삭제
	});
	

	// 커스텀체크박스 엔터키로 선택
	$('input[type="checkbox"]').on('keypress', function (event) {
		if (event.which === 13) {
			this.checked = !this.checked;
		}
	});
	

	//탑으로이동버튼
	$('.top_move').on('click', function () {
		$('html, body').animate({ scrollTop: '0px' }, 800);
		return false;
	});

	// top버튼 
	var $window = $(window);
	var $topbutton = $('.footer .top_move');
	var footerTop = 0,
		windowTop = 0,
		windowArea = 0;
		contentArea = 0;
	setTimeout(function(){
		footerTop = $('.footer').offset().top;
		windowTop = $('html, body').scrollTop() || $window.scrollTop();
		windowArea = windowTop + $window.height() - $topbutton.height();
		contentArea = $('#content').offset().top;
	},1);

	$window.on('scroll', function(){
		footerTop = $('.footer').offset().top;
		windowTop = $('html, body').scrollTop() || $window.scrollTop();
		windowArea = windowTop + $window.height() - $topbutton.height();
		$topbutton.removeAttr('style');
		if(footerTop < windowArea){ // 하단
			$topbutton.addClass('fixed');
		}else if(windowTop >= contentArea){ //중간
			$topbutton.removeClass('fixed');
			$topbutton.addClass('show');
		}else { //상단
			$topbutton.removeClass('fixed');
			$topbutton.removeClass('show');
		}
	});
	if(footerTop < windowArea){
		$topbutton.addClass('fixed');
	} else {
		$topbutton.removeClass('fixed');
		$topbutton.removeAttr('style');
	}

	// 통합검색 탭박스
	$('#search_M li').on('click', function () {
		var searchId = $(this).attr('id');
		$('.search_M').css({ 'display': 'none' });
		$('.search_M[data-name="' + searchId + '"]').css({ 'display': 'block' });
		$('.search_M .top_detail').css({ 'display': 'none' });
		$('.search_M .paging').css({ 'display': 'flex' });
	});
	$('#search_AllMenu').on('click', function () {
		$('.search_M').css({ 'display': 'block' });
		$('.search_M .top_detail').css({ 'display': 'block' });
		$('.search_M .paging').css({ 'display': 'none' });
	});
	// 통합검색 더보기버튼
	$('.search_M .navy_btn').on('click', function () {
		var searchId2 = $(this).parents().parents().parents().attr('data-name');
		$('.tab_box li').removeClass('current');
		$('#' + searchId2).addClass('current');
		$('.search_M').css({ 'display': 'none' });
		$(this).parents().parents().parents().css({ 'display': 'block' });
		$('.search_M .top_detail').css({ 'display': 'none' });
		$('.search_M .paging').css({ 'display': 'flex' });
	});

	$(window).scroll(function(){
		lnb_lock();
	});

	// 스크롤시 lnb fixed & header_top 올라감
	function lnb_lock() {
		var window_w = $(window).width();
		var header_top = $(window).scrollTop();

		// 스크롤 존재유무
		$.fn.hasScrollBar = function () {
			return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0) || (this.prop("scrollHeight") > this.prop("clientHeight"));
		};
		
		if($('html').hasScrollBar()){ // 스크롤 존재
			if (window_w > 1349) { //1366-17(스크롤너비)
				if (header_top > 180 ) { 
					$(".lnb").css({ 'position': 'fixed', 'top': '100px' })
					$("#header").css({ 'top': '-50px', 'transition': 'all .4s' })
				} else {
					$(".lnb").css({ 'position': 'absolute', 'top': '300px' })
					$("#header").css({ 'top': '0' })
				}
			} else if (window_w > 750) { //767-17(스크롤너비)
				if (header_top > 180) {
					$(".lnb").css({ 'position': 'fixed', 'top': '80px' })
				} else {
					$(".lnb").css({ 'position': 'absolute', 'top': '230px' })
				}
				$("#header").css({ 'top': '0' })
			} else {
				if (header_top > 180) {
					$(".lnb").css({ 'position': 'fixed', 'top': '60px' })
				} else {
					$(".lnb").css({ 'position': 'absolute', 'top': '180px' })
				}
				$("#header").css({ 'top': '0' })
			}

		}else{ // 스크롤 없을 때
			if (window_w > 1366) {
				if (header_top > 180) {
					$(".lnb").css({ 'position': 'fixed', 'top': '100px' })
					$("#header").css({ 'top': '-50px', 'transition': 'all .4s' })
				} else {
					$(".lnb").css({ 'position': 'absolute', 'top': '300px' })
					$("#header").css({ 'top': '0' })
				}
			} else if (window_w > 767) {
				if (header_top > 180) {
					$(".lnb").css({ 'position': 'fixed', 'top': '80px' })
				} else {
					$(".lnb").css({ 'position': 'absolute', 'top': '230px' })
				}
				$("#header").css({ 'top': '0' })
			} else {
				if (header_top > 180) {
					$(".lnb").css({ 'position': 'fixed', 'top': '60px' })
				} else {
					$(".lnb").css({ 'position': 'absolute', 'top': '180px' })
				}
				$("#header").css({ 'top': '0' })
			}
		}

	}


	// 배너 슬라이드
	var banner_slide = $('.banner_slide').slick({
        draggable: false,
		infinite: true,
		speed: 600,
		autoplaySpeed: 3000,
		slidesToShow: 8,
		slidesToScroll: 1,
		autoplay: true,
		dots: false,
		pauseOnHover:true,
		pauseOnFocus: false,
		prevArrow: $('.footer_banner .prev_btn'),
        nextArrow: $('.footer_banner .next_btn'),
		useAutoplayToggleButton:false,
		responsive: [
            {  
                breakpoint: 1600,
                settings: {
                    slidesToShow: 7,
					draggable: false,
                } 
            },{  
                breakpoint: 1400,
                settings: {
                    slidesToShow: 6,
					draggable: false,
                } 
            },{  
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
					draggable: false,
                } 
            },{  
                breakpoint: 980,
                settings: {
                    slidesToShow: 4,
					draggable: false,
                } 
            },{  
                breakpoint: 767,
                settings: {
                    slidesToShow: 4,
					draggable: false,
					autoplay: false,
                } 
            },{  
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
					draggable: false,
					autoplay: false,
                } 
            }
        ]
	});

	// 배너 컨트롤러
	$('.banner .ctr_btn').on('click', function() {
		var status = $(this).hasClass('pause');
		if(status == true){
			$(this).removeClass('pause');
			$(this).addClass('play');
			$(this).text('재생');
			banner_slide.slick('slickPause');
		}else{
			$(this).removeClass('play');
			$(this).addClass('pause');
			$(this).text('일시정지');
			banner_slide.slick('slickPlay');
		}
	});

	// 하단 만족도 없을 시 높이조절
	var satis_true = document.querySelector('.satisfaction');
	if (satis_true != null){
		$('.contents>.inner').removeClass("satis_none");
	}else{
		$('.contents>.inner').addClass("satis_none");
	}

});
