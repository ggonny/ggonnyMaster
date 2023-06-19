// sub.js
$(document).ready(function(){

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

	// 공유버튼 열고닫기
	$('.share_btn').on('click', function(){
		var share_open = $(this).hasClass('close');
		// console.log(share_open);
		if(share_open == false){ // 닫힌상태에서 클릭
			$(this).attr("title", "공유 목록 닫기");
			$(this).addClass('close');
			$('.share_list').slideDown();
			$('.share_list').css('display','flex');
		}else{
			$(this).attr("title", "공유 목록 열기");
			$(this).removeClass('close');
			$('.share_list').slideUp();
		}
	});

	// leftMenu 열고닫기
	leftMenuControl()
	function leftMenuControl(){
		$('.depth_01>li>a').on('click', function(){
			var left_status = $(this).parent().hasClass('open');
			var left_status_m = $('.depth_01>li').hasClass('open');
			// console.log(left_status);
			// console.log(left_status_m);
			if(left_status == false && left_status_m == false){ // 닫힌 뎁스 선택
				$(".depth_01>li").removeClass('open');
				$(".depth_01>li>a").removeClass('now');
				$(".depth_02").stop().hide();
				$(this).parent('li').addClass('open');
				$(this).addClass('now');
				$(this).siblings('div').stop().show();
			}else if(left_status == true && left_status_m == true){ // 열린 뎁스 선택
				$(this).parent('li').removeClass('open');
				$(this).removeClass('now');
				$(this).siblings('div').stop().hide();
			}else if(left_status == false && left_status_m == true){ // 열린 상태에서 다른 뎁스 선택
				$(".depth_01>li").removeClass('open');
				$(".depth_01>li>a").removeClass('now');
				$(".depth_02").stop().hide();
				$(this).parent('li').addClass('open');
				$(this).addClass('now');
				$(this).siblings('div').stop().show();
			}
		});
	}

	// 토클 클릭으로 열고닫기
	lnb_mobile()
	function lnb_mobile(){
		$('.lnb_inner>li').on('click', function(){
			var lnb_status = $(this).hasClass('open');
			var lnb_status_m = $('.lnb_inner>li').hasClass('open');
			// console.log(lnb_status);
			// console.log(lnb_status_m);
			if(lnb_status == false && lnb_status_m == false){
				$(".lnb_inner>li").removeClass('open');
				$(".lnb_more").stop().hide();
				$(this).addClass('open');
				$(this).children('ul').stop().show();
			}else if(lnb_status == true && lnb_status_m == true){
				$(this).removeClass('open');
				$(this).children('ul').stop().hide();
			}else if(lnb_status == false && lnb_status_m == true){
				$(".lnb_inner>li").removeClass('open');
				$(".lnb_more").stop().hide();
				$(this).addClass('open');
				$(this).children('ul').stop().show();
			}
		});
		$('.lnb_more>li:last-child').on('focusout', function(){
			$(this).removeClass('open');
			$('.lnb_more').stop().hide();
		});
		$("#content, .sub_visual").on('click', function(){
			$(".lnb_inner>li").removeClass('open');
			$(".lnb_more").stop().hide();
		});
	}

	//달력
	$(".calendar").datepicker({
		inline: true,
		showOtherMonths: true,
		showMonthAfterYear: true,
		monthNames: [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		dateFormat: "yy-mm-dd" ,
		container: ".popup",
		beforeShow: function(i) { if ($(i).attr('readonly')) { return false; } }
	});

	//탭버튼
	$('.tab a').on('click', function () {
		var tab_id = $(this).attr('data-tab');
		$(this).parent().parent().children().removeClass('current');  // .tab a
		$(this).parent('li').addClass('current');
		$(this).parent().parent().siblings('div').removeClass('current');
		$("#" + tab_id).addClass('current');

		$(this).parent('li').parent('ul').children('li').children('a').attr("title", "비활성 탭메뉴");
		$(this).attr("title", "선택된 탭메뉴");

		var tab_name = $(this).attr('data-name');
		$(this).parent().parent().siblings('.now_tab').text(tab_name);
		$('.now_tab').toggleClass('click');

		var window_w = $(window).width();
		if (window_w < 768) {//PC
			$('.tab_wrap .now_tab').removeClass('click');
			$('.tab').stop().hide();

			// 탭 속 탭 .tabB는 예외
			$('.tab_wrap .tab.tabB').css('display','flex');
			$('.tab_wrap .tab.tabB').show();
			$('.tab.depth_box').css('display','flex');
			$('.tab.depth_box').show();
		}
	})

	$('.tab_wrap .now_tab').on('click', function () {
		var nowTabStatue = $(this).hasClass('click');
		if(nowTabStatue == false){ // 열기
			$(this).addClass('click');
			$(this).next('.tab').stop().show().css('display','flex');
			$(this).next('.tab_link').stop().show().css('display','flex');
		}else{ // 닫기
			$(this).removeClass('click');
			$(this).next('.tab').stop().hide();
			$(this).next('.tab_link').stop().hide();
		}
	});

	// 현재 활성화 메뉴 스크롤 좌측에 위치하도록
	var $tabB = $('.tabB');
	if($tabB.length){
		$tabBleft = $tabB.find('.current').position().left;
		$('.tabB').scrollLeft($tabBleft);
	}

	

	// 이미지 확대보기 팝업 열고 닫기
	$('.view_btn').on('click', function(){
		var this_img = $(this).data('button');
		scrollDisable()
		$('#' + this_img).show();
	});
	$('.img_close').on('click', function(){
		var this_img = $(this).data('button');
		scrollAble()
		$('#' + this_img).hide();
	});

	// 경영공시 열고닫기
	$('.site_box .more').on('click', function(){
		var open_state = $(this).hasClass('close');
		var open_state_m = $('.site_box .more').hasClass('close');
		if(open_state == false && open_state_m == false){
			$('.site_box .more').removeClass('close');
			$('.site_box .depth03').stop().slideUp();
			$(this).addClass('close');
			$(this).children('.depth03').stop().slideDown();
		}else if(open_state == true && open_state_m == true){
			$(this).removeClass('close');
			$(this).children('.depth03').stop().slideUp();
		}else if(open_state == false && open_state_m == true){
			$('.site_box .more').removeClass('close');
			$('.site_box .depth03').stop().slideUp();
			$(this).addClass('close');
			$(this).children('.depth03').stop().slideDown();
		}
	});

	// 사이트맵 열고닫기
	$('.site_map .more').on('click', function () {
		var open_state = $(this).hasClass('close');
		var open_state_m = $('.site_map .more').hasClass('close');
		if (open_state == false && open_state_m == false) {
			$('.site_map .more').removeClass('close');
			$('.site_map .depth03').stop().slideUp();
			$(this).addClass('close');
			$(this).children('.depth03').stop().slideDown();
		} else if (open_state == true && open_state_m == true) {
			$(this).removeClass('close');
			$(this).children('.depth03').stop().slideUp();
		} else if (open_state == false && open_state_m == true) {
			$('.site_map .more').removeClass('close');
			$('.site_map .depth03').stop().slideUp();
			$(this).addClass('close');
			$(this).children('.depth03').stop().slideDown();
		}
	});
	
	$(".site_map_sort button").on('click', function(){
		$(".site_map_sort button").removeClass("active");
		$(this).addClass("active");
	});

	//해외사업개요 이미지 탭
	$('.img_tab a').on('click focusin', function () {
		var tab_id = $(this).attr('data-tab');
		$(this).parent().parent().children().removeClass('current');  // .tab a
		$(this).parent('li').addClass('current');
		$(this).parent().parent().siblings('div').removeClass('current');
		$("#" + tab_id).addClass('current');

		$(this).parent('li').parent('ul').children('li').children('a').attr("title", "비활성 탭메뉴");
		$(this).attr("title", "선택된 탭메뉴");
	})


	// 모바일 터치스와이프 아이콘
	$(".touchSwipe,.touchSwipe1200,.touchSwipe1024,.touchSwipe900,.touchSwipe767").on("scroll click", function() {
		$(this).find(".touchSwipe_icon").hide();
	});
	$(".scroll_down>div").on("scroll click", function() {
		$(this).find(".scroll_down_icon").hide();
	});

	// 탭리스트
	$('.tab_list li').on('click', function(){
		$(this).parent().children('li').removeClass('now');
		$(this).addClass('now');
	});

	// 클릭시 해당 이미지 변경
	var bigPic = document.querySelector(".big_img img");
	var smallPics = document.querySelectorAll(".small_img img");
	
	for(var i = 0 ; i < smallPics.length ; i++) {
		smallPics[i].addEventListener("click", changepic);
	}

	function changepic(){
		var smallPicAttribute = this.getAttribute("src");
		bigPic.setAttribute("src", smallPicAttribute);
		bigPic.fadeIn(slow);
	}

	$('.small_img img').on('click', function(){
		$('.small_img img').parent('li').removeClass('on');
		$(this).parent('li').addClass('on');
		changepic();
	});

	// 토글게시판 열고닫기
	$('.qna_table .title_btn, .qna_board .title_btn').on('click', function(){
		$('.qna_table .title_btn,.qna_board .title_btn').removeClass('on');
		$('.qna_table .answer_view,.qna_board .answer_view').stop().slideUp();
		$(this).siblings('.answer_view').stop().slideDown();
		$(this).addClass('on');
	});
	$('.qna_table .answer_view .close,.qna_board .answer_view .close').on('click', function(){
		$(this).parent('.answer_view').stop().slideUp();
		$(this).parent().siblings('.title_btn').removeClass('on');
	});

	// 회원구분 셀렉트 선택
	$(".select_func").change(function () {
		var select_name = $('.select_func option:selected').val();
		$('.select_funcDiv').removeClass('on');
		$('.select_funcDiv[data-name="' + select_name + '"]').addClass('on');
	});

	// 체크박스 전체 선택
	var chkList = $("input[name=chkbox_list]");

	$("#chkbox_All").click(function () {
		if ($(this).is(":checked")) {
			chkList.prop("checked", true);
		} else
			chkList.prop("checked", false);
	});

	//첨부파일
	var $fileBox = null;
	
	$(function() {
		init();
	})
	
	function init() {
		$fileBox = $('.attach_td');
		fileLoad();
	}
	
	function fileLoad() {
		$.each($fileBox, function(idx){
		var $this = $fileBox.eq(idx),
			$btnUpload = $this.find('[type="file"]'),
			$label = $this.find('.file-label');
		
		$btnUpload.on('change', function() {
			var $target = $(this),
				fileName = $target.val(),
				$fileText = $target.siblings('.file-name');
			$fileText.val(fileName);
		})
		
		$btnUpload.on('focusin focusout', function(e) {
			e.type == 'focusin' ?
			$label.addClass('file-focus') : $label.removeClass('file-focus');
		})
		
      })
	}

});