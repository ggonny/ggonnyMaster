$(document).ready(function(){
    //메인 모바일 첫번째메뉴 활성화
    $('.menu01>a').addClass('now');
    $('.depth1>.more_depth>a.now').next('depth2').show();

    // 탭메뉴
    $('.tabM li>a').on('click focusin', function () {
        var tab_id = $(this).parent().attr('data-tab');
        // $('.tabM li').removeClass('on');
        // $('.tabM .tab_content').removeClass('current');
        // 한페이지에 여러탭을 쓸 경우 중복방지
        $(this).parent().parent().children('li').removeClass('on');
        $(this).parent().parent().children().children('.tab_content').removeClass('current');
        $(this).parent().addClass('on');
        $(".tabM #" + tab_id).addClass('current');

        // 슬라이드재실행
        $('.board .tab_slide').slick('setPosition');

        // 소식게시판 높이조절
        $('.board').addClass('mob');
        var board_name = $(this).parent().attr('data-tab');
        if(board_name == 'fullnews'){
            $('.board').removeClass('mob');
        }
    })

    // 소식 게시판 셀렉트 박스
    $('.board_mobile').on('change', function () {
        var tab_name = $(this).val();

        $(".board li").removeClass('on');
        $('.board .tab_content').removeClass('current');
        $('.board #' + tab_name).parent('li').addClass('on');
        $('.board #' + tab_name).addClass('current');
        // 슬라이드재실행
        $('.board .tab_slide').slick('setPosition');

        // 높이조절
        $('.board').addClass('mob');
        if(tab_name == 'fullnews'){
            $('.board').removeClass('mob');
        }
    });

    // 고객별 맞춤 컨텐츠 셀렉트 박스
    $('.customer_mobile').on('change', function () {
        var tab_name = $(this).val();

        $(".customer_menu>ul>li").removeClass('on');
        $('.customer_menu .tab_content').removeClass('current');
        $('.customer_menu #' + tab_name).parent('li').addClass('on');
        $('.customer_menu #' + tab_name).addClass('current');
    });

    

    //메인비주얼슬라이드
    var visual = $('.visual_banner ul').slick({
        infinite: true,
        speed: 600,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        autoplay: true,
        dots: true,
        draggable: false,
        pauseOnHover:false,
        pauseOnFocus: false,
        fade: true,
        arrows:true,
        // prevArrow: $('.prev_btn'),
        // nextArrow: $('.next_btn'),
        useAutoplayToggleButton:false
    });
    //메인비주얼 컨트롤러
    $('.visual_banner .ctr_btn').on('click', function() {
        var status = $(this).hasClass('pause');
        if(status == true){
            $(this).removeClass('pause');
            $(this).addClass('play');
            $(this).text('재생');
            visual.slick('slickPause');
        }else{
            $(this).removeClass('play');
            $(this).addClass('pause');
            $(this).text('일시정지');
            visual.slick('slickPlay');
        }
    });

    // 소식 게시판
    var board = $('.board .tab_slide').slick({
        infinite: true,
        speed: 600,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slideToScroll: 1,
        autoplay: true,
        draggable: false,
        pauseOnHover:true,
        useAutoplayToggleButton:false,
        arrows: true,
        responsive: [
            {  
                breakpoint: 820,
                settings: {
                    slidesToShow: 2,
                } 
            },{  
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '30%',
                } 
            },{  
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '30%',
                    autoplay: false,
                    draggable: true,
                    arrows: false,
                } 
            }
        ]
    });    
    // 소식 게시판 컨트롤러
    $('.board .ctr_btn').on('click', function() {
        var status = $(this).hasClass('pause');
        if(status == true){
            $(this).removeClass('pause');
            $(this).addClass('play');
            $(this).text('재생');
            board.slick('slickPause');
        }else{
            $(this).removeClass('play');
            $(this).addClass('pause');
            $(this).text('일시정지');
            board.slick('slickPlay');
        }
    });

    // 고객별 맞춤 컨텐츠
    $(".customer_menu .menu_title").on('click focusin', function(){
        $('.customer_menu>ul>li').removeClass('on');
        $('.customer_menu .tab_content').removeClass('current');
        $('.customer_menu .menu_title').attr('title', '');
        $(this).parent('li').addClass('on');
        $(this).siblings('.tab_content').addClass('current');
        $(this).attr('title', '선택됨');
    });

    // 국내사업, 해외사업
    var $business = $('.business_slide');
    var $nav = $('.business_paging').find('li');
    var enableNav = true; //클릭하여 내비게이션 이동 허용 여부(슬라이드 동작 중 클릭되는 것을 방지)
    var speed = 0;//슬라이드 속도

    $business.on('init reInit', function (event, slick) {//페이징이니셜
        if (!slick.$dots) return;
    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) { //슬라이드 변경 시 내비 및 페이징 변경
        //내비 변경
        if (enableNav) {
            $nav.removeClass("on");
            $nav.eq(nextSlide).addClass("on");
            navStatus();
        }
    });

    function navStatus() { //슬라이드 동작 중 내비클릭 방지
        enableNav = false;
        setTimeout(function () {
            enableNav = true;
        }, speed);
    }

    $nav.on("click", function () { //내비 클릭시 해당 인덱스로 이동
        if (enableNav) {
            var slideNo = $(this).index();
            $business.slick('slickGoTo', slideNo);
            $nav.removeClass("on");
            $(this).addClass("on")
            navStatus();
        };
        var window_w = $(window).width();
        if(window_w < 768){
            var tab_id = $(this).attr('data-tab');
            // $('.business_paging li').removeClass('on');
            // $(this).addClass('on');
            $('.business_slide .current').removeClass('current');
            $(".business_slide #" + tab_id).addClass('current');

            // 해외사업 클릭시 높이 조절
            $('.btm_cts').addClass('mob');
            if(tab_id == 'domestic'){
                $('.btm_cts').removeClass('mob');
            }
        };
    });

    $business.slick({
        draggable: false,
        infinite: true,
        speed: 600,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        fade: true,
        autoplay: true,
        dots: false,
        pauseOnHover:true,
        pauseOnFocus: true,
        prevArrow: $('.business_wrap .prev_btn'),
        nextArrow: $('.business_wrap .next_btn'),
        useAutoplayToggleButton:false,
        responsive: [
            {  
                breakpoint: 767,
                settings: {
                    autoplay: false,
                    arrows: false,
                    infinite: false,
                    speed: 0,
                    autoplaySpeed: 0,
                } 
            }
        ]
    });

    // 국내사업, 해외사업 컨트롤러
    $('.business_wrap .ctr_btn').on('click', function () {
        var status = $(this).hasClass('pause');
        if (status == true) {
            $(this).removeClass('pause');
            $(this).addClass('play');
            $(this).text('재생');
            $business.slick('slickPause');
        } else {
            $(this).removeClass('play');
            $(this).addClass('pause');
            $(this).text('일시정지');
            $business.slick('slickPlay');
        }
    });

    // slick 빼기
    // $(window).on('load resize', function() { 		
    //     if($(window).width() < 767) { 			
    //         $business.slick('unslick'); 	
    //     }else{ 			
    //         $business.not('.slick-initialized').slick(slickOptions); 		
    //     } 
    // });

    // 767에서 slick빼고 탭버튼으로 변경
    // businessTab();
    // function businessTab (){
    //     var window_w = $(window).width();
    //     if(window_w < 768){
    //         $(".business_paging li").on('click', function(){
    //             var tab_id = $(this).attr('data-tab');
    //             // $('.business_paging li').removeClass('on');
    //             // $(this).addClass('on');
    //             $('.business_slide .current').removeClass('current');
    //             $(".business_slide #" + tab_id).addClass('current');

    //             // 해외사업 클릭시 높이 조절
    //             $('.btm_cts').addClass('mob');
    //             if(tab_id == 'domestic'){
    //                 $('.btm_cts').removeClass('mob');
    //             }
    //         });
    //     }
    // };



});