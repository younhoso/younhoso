import { PT_STATE, util as _ } from './modules/bs_common'; // 필요한 기능만 추가해서 사용
import { anchor } from './modules/anchor';
import { accordian } from './modules/accordian';
import { promoCoupon } from './modules/coupon_evt';
import { category_tab } from './modules/category_tab';
import { page_tab } from './modules/page_tab';
import { sticky } from './modules/sticky';
import { modal } from './modules/modal';
import { modalRolling } from "./modules/modalRolling";
// import { benefitSlide } from './modules/benefitSlide';
import { tab } from './modules/tab';
import { copy } from './modules/copy';
import { component_tab } from './modules/component_tab';

$(document).ready(function(){
    
    //최상단 네비
    let navSwiper = new Swiper ('.swiper-container.pt_mo_swiper',{
        slidesPerView: 'auto',
        allowTouchMove: false,
        preloadImages: false,
        observer: true,
        observeParents: true,
        lazy: true,
        // navigation: {
        //     nextEl: '.pt_bnf_swiper .swiper-button-next.pt_bnf_next',
        //     prevEl: '.pt_bnf_swiper .swiper-button-prev.pt_bnf_prev',
        // },
        breakpoints: {
            769: {
                slidesPerView: 'auto',
                allowTouchMove: false,
                preloadImages: false,
                lazy: true
            }
        },
        on: {
            breakpoint: function () {
                var that = this;
                setTimeout(function () {
                    that.slideTo(0, 0);
                }, 150);
            },
        },
    });

    //ai 구독 배너 스와이퍼
    let aiBuyingSwiper = new Swiper ('.swiper-container.pt_ai-buying',{
        slidesPerView: 'auto',
        allowTouchMove: true,
        preloadImages: false,
        observer: true,
        observeParents: true,
        lazy: true,
        pagination: {
            el: ".pt_ai-paging",
            clickable : true,
        },
        breakpoints: {
            769: {
                slidesPerView: 'auto',
                allowTouchMove: false,
                preloadImages: false,
                lazy: true,
                pagination: false
            }
        },
        on: {
            breakpoint: function () {
                var that = this;
                setTimeout(function () {
                    that.slideTo(0, 0);
                }, 150);
            },
        },
    });

    // buying_list 영역 swiper
    new Swiper ('.swiper-container.pt_buying', {
        slidesPerView: 'auto',
        preloadImages: false,
        observer: true,
        observeParents: true,
        lazy: true,
        breakpoints: {
            769: {
                allowTouchMove: false,
            }
        },
        on: {
            breakpoint: function () {
                var that = this;
                setTimeout(function () {
                    that.slideTo(0, 0);
                }, 150);
            },
        },
        navigation: {
            nextEl: ".swiper-container.pt_buying .swiper-button-next.pt_buying_p_next",
            prevEl: ".swiper-container.pt_buying .swiper-button-prev.pt_buying_p_prev",
        },
    });

    function buyinglistMoreBtnEvt () {
        let buyinglistBtn = $(".sec_buying_list--tv .pt_buying_list__cont--btn");
        let buyinglistCont = $(".sec_buying_list--tv .pt_buying_list__cont");

        buyinglistBtn.on("click", function(){
            buyinglistCont.toggleClass("open");
            $(this).toggleClass("active");
        });
    }
    buyinglistMoreBtnEvt();

    function setPageTab() {
        const dataPageTab = document.querySelectorAll('[data-page-tab]');
        dataPageTab[1].click();
    }


    function handleLoadAncTarget() {
        setTimeout(() => {
            const ele = document.querySelector('.santo_target')
            if(!ele) return;
            ele.click();
        }, 0)
    }

    // 혜택 ui 가로 스크롤
    function benefitScrollSwiper () {
        let bnfscrollSwiper = new Swiper(".pt_scroll_container .pt_scroll_swiper", {
            slidesPerView: "auto",
            mousewheel: true,
            nasted:true,
            scrollbar: {
                el: ".swiper-scrollbar",
                draggable: true,
            },
            on: {
                breakpoint: function() {
                    const that = this;
                    setTimeout(function() {
                        that.slideTo(0, 0);
                    }, 150);
                },
            }
        });
    }
    benefitScrollSwiper();

    // 혜택 ui 가로 스크롤
    function benefitScrollSwiper_vertical () {
        let bnfscrollSwiper_vertical = new Swiper(".pt_scroll_v_container .pt_scroll_swiper", {
            direction: "vetical",
            slidesPerView: "auto",
            mousewheel: true,
            nasted:true,
            scrollbar: {
                el: ".swiper-scrollbar",
                draggable: true,
            },
            on: {
                breakpoint: function() {
                    const that = this;
                    setTimeout(function() {
                        that.slideTo(0, 0);
                    }, 150);
                },
            }
        });
    }
    benefitScrollSwiper_vertical();

    // S: 혜택 슬라이드
    function benefitSlide(){
        let benefitSwiper = new Swiper(".pt_conts__swiper", {
            slidesPerView: 'auto',
            allowTouchMove: true,
            observer : true,
            observeParents : true,
            lazy: true,
            pagination: {
                el: ".pt_pagination--bnf",
                clickable : true,
            },
            on: {
                init: function() {
                    const $el = $(this.$el);

                    this.params.navigation.prevEl = $el.siblings('.pt_conts__navi').find('.pt_conts__navi--prev');
                    this.params.navigation.nextEl = $el.siblings('.pt_conts__navi').find('.pt_conts__navi--next');
                },
                breakpoint: function () {
                    var that = this;
                    setTimeout(function () {
                        that.slideTo(0, 0);
                    }, 150);
                },
            },
            breakpoints: {
                769: {
                    slidesPerView: 'auto',
                    allowTouchMove: false,
                    preloadImages: false,
                    lazy: true
                }
            },
        })
    }
    benefitSlide();

    let rollingSwiper1 = new Swiper(".pt_rolling.pt_rolling_tv", {
        slidesPerView: 'auto',
        // effect: "fade",
        direction: 'vertical',
        observer:true,
        observeParents:true,
        lazy:true,
        preloadImages:false,
        touchRatio: 0,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        autoplay: true,
        pagination: {
            el: '.pt_rolling__page',
            type: 'fraction',
        },
        navigation: {
            nextEl: ".pt_rolling__next",
            prevEl: ".pt_rolling__prev",
        },
        loop: true,
        on: {
            breakpoint: function() {
                const that = this;
                setTimeout(function() {
                    that.slideTo(0, 0);
                }, 150);
            },
            init: function() {
                let control = this.$el.find('.swiper-control');
                control.on('click', function(){
                    $(this).toggleClass("pt_pause pt_play");
                    if($(this).hasClass("pt_pause")) {
                        rollingSwiper1.autoplay.start();
                        control.html('일시정지');
                    } else {
                        rollingSwiper1.autoplay.stop();
                        control.html('시작');

                    }
                })
            }
        },
        // breakpoints: {
        //     769: {
        //         loop: true
        //     },
        // },
    });

    let rollingSwiper2 = new Swiper(".pt_rolling.pt_rolling_music", {
        slidesPerView: 'auto',
        // effect: "fade",
        direction: 'vertical',
        observer:true,
        observeParents:true,
        lazy:true,
        preloadImages:false,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.pt_rolling__page',
            type: 'fraction',
        },
        navigation: {
            nextEl: ".pt_rolling__next",
            prevEl: ".pt_rolling__prev",
        },
        loop: true,
        on: {
            breakpoint: function() {
                const that = this;
                setTimeout(function() {
                    that.slideTo(0, 0);
                }, 150);
            },
            init: function() {
                let control = this.$el.find('.swiper-control');
                control.on('click', function(){
                    $(this).toggleClass("pt_pause pt_play");
                    if($(this).hasClass("pt_pause")) {
                        rollingSwiper2.autoplay.start();
                        control.html('일시정지');
                    } else {
                        rollingSwiper2.autoplay.stop();
                        control.html('시작');

                    }
                })
            }
        },
        // breakpoints: {
        //     769: {
        //         loop: true
        //     },
        // },
    });

     // 리뷰존 
    let reviewSwiper = new Swiper ('.pt_blog__swiper',{
        slidesPerView: 'auto',
        allowTouchMove: true,
        preloadImages: false,
        observer: true,
        observeParents: true,
        lazy: true,
        pagination: {
            el: ".pt_blog__pagination",
            clickable : true,
        },
        navigation: {
            nextEl: '.pt_blog__next',
            prevEl: '.pt_blog__prev',
        },
        breakpoints: {
            769: {
                slidesPerView: 'auto',
                allowTouchMove: false,
                preloadImages: false,
                lazy: true
            }
        },
        on: {
            breakpoint: function () {
                var that = this;
                setTimeout(function () {
                    that.slideTo(0, 0);
                }, 150);
            },
        },
    });

    //TV 구매 전 알아두면 좋을 꿀팁!
    function tispBannerSwiper(){
        var tispBannerSwiper = new Swiper('.pt_tips__swiper', {
            slidesPerView: 'auto',
            allowTouchMove: true,
            breakpoints: {
                769: {
                    allowTouchMove: false,
                },
            },
            on: {
                breakpoint: function () {
                    var that = this;
                    setTimeout(function () {
                        that.slideTo(0, 0);
                    }, 150);
                },
            },
        });
    }

    tispBannerSwiper(); // TV 구매 전 알아두면 좋을 꿀팁!

    // S: POD 슬라이드
    function podSlide(){
        const podSwiper = new Swiper('.swiper-container.pt_feature__swiper', {
            slidesPerView: 'auto',
            autoplay:false,
            allowTouchMove: true,
            observer : true,
            observeParents : true,
            lazy: true,
            pagination: {
                el: '.swiper-pagination.pt_feature__bullet',
                type: 'bullets',
                clickable: true
            },
            navigation: {
                nextEl: ".swiper-button-next.pt_feature__btn-next",
                prevEl: ".swiper-button-prev.pt_feature__btn-prev",
            },
            on: {
                // init : function(){
                //     const btnPlay = $('.pt_feature__btn-play')
                //     btnPlay.on('click', function(){
                //         if(btnPlay.hasClass('pause')){
                //             btnPlay.removeClass('pause');
                //             btnPlay.attr("title","슬라이드 멈춤");
                //             podSwiper.autoplay.start();
                //         }else{
                //             btnPlay.addClass('pause');
                //             btnPlay.attr("title","슬라이드 재생");
                //             podSwiper.autoplay.stop();
                //         }
                //     });
                // },
                breakpoint: function () {
                    var that = this;
                    setTimeout(function () {
                        that.slideTo(0, 0);
                    }, 150);
                },
                // slideChangeTransitionEnd : function() {
                //     $('.swiper-container.pt_feature__swiper .swiper-slide').find("#pod_vod video")?.each(function(idx, item) {
                //         item.pause();
                //     })
                //     $('.swiper-container.pt_feature__swiper .swiper-slide.swiper-slide-active').find("#pod_vod video")?.each(function(idx, item) {
                //         item.play()
                //     });
                // },
            }
        });

        const navData = [
            {
                desc : "<span class='en'>Neo QLED<br>8K</span>",
                title : "Neo QLED 8K",
                omni : "sec:event:2024-tv-launching:tab_pod_Neo8K",
                alt: "Neo QLED 8K"
            },
            {
                desc : "<span class='en'>Neo QLED</span>",
                title : "Neo QLED",
                omni : "sec:event:2024-tv-launching:tab_pod_Neo",
                alt: "Neo QLED"
            },
            {
                // iconMoOn : "rg_feature_icon07_on_mo.png",
                desc : "<span class='en'>OLED</span>",
                title : "OLED",
                omni : "sec:event:2024-tv-launching:tab_pod_OLED",
                alt: "OLED"
            },
        ]
        
        const podSwiperNav = new Swiper('.swiper-container.pt_feature__swiper', {
            slidesPerView: 'auto',
            allowTouchMove: false,
            observer : true,
            observeParents : true,
            lazy: true,
            pagination: {
                el: ".pt_feature__bullet2",
                clickable: true,
                renderBullet: function (index, className) {
                return `
                    <a href="javascript:;" class="pt_feature__btn-nav pt_feature__btn-nav--${index+1} ${className}" title="${navData[index].title} 내용 보기" omni="${navData[index].omni}" data-omni-type="microsite">
                        <div class="blind">${navData[index].alt}</div>
                        <p class="pt_feature__desc">${navData[index].desc}</p>
                    </a>
                `;
                },
            },
            on: {
                breakpoint: function () {
                    var that = this;
                    setTimeout(function () {
                        that.slideTo(0, 0);
                    }, 150);
                },
            }
        });

        podSwiper.controller.control = podSwiperNav;
        podSwiperNav.controller.control = podSwiper;
    }
    // podSlide();
    // e: POD 슬라이드


    anchor.load([
        { // 컴포1
            url: 'counselling',
            target: '.sec_ai-tv_banner',
        },
        { // 컴포1
            url: 'component-ltv',
            target: '#pt_buying_compo03',
        },
        { // 컴포1
            url: 'component-tv',
            target: '#pt_buying_compo02',
        },
        { // 컴포1
            url: 'component',
            target: '#pt_buying_compo01',
        },
        { // ai 구독 클럽
            url: 'ai-sub',
            target: '#sec_buying_subscribe',
        },
        { // kv
            url: 'kv',
            target: '.sec_kv',
        },
        { // [TV] tab
            url: 'tv-tab',
            target: '#sec_nav_tv',
        },
        { // [TV] 2024-best
            url: '2024-best',
            target: '.sec_buying_list',
            scroll: [-73, -94],
        },
        { // [TV] benefit
            url: 'benefit',
            target: '.sec_benefit__tv',
            scroll: [-33, -94],
        },
        { // [TV] buying
            url: 'buying',
            target: '.sec_buying__tv',
            scroll: [-73, -94],
        },
        { // [TV] reviewzone
            url: 'reviewzone',
            target: '.sec_review',
            scroll: [-73, -94],
        },
        { // [TV] reviewzone
            url: 'component',
            target: '.sec_together',
            scroll: [-0, -0],
        },
        { // [TV] tv-event
            url: 'tv-event',
            target: '#sec_event_banner',
            scroll: [-73, -94],
        },
        { // [TV] reviewer-match
            url: 'reviewer-match',
            target: '.sec_event.event-reviewr',
            scroll: [-55, -94],
        },
        { // [TV] reviewer-match
            url: 'superbig',
            target: '.sec_premiere',
            scroll: [-55, -94],
        },
        { // [TV] 바잉툴 neo-qled-8k
            url: 'neo-qled-8k',
            target: '#pt_buying_compo02',
            scroll: [-59, -94],
        },
        { // [TV] 바잉툴 neo-qled
            url: 'neo-qled',
            target: '#pt_buying_compo02',
            scroll: [-59, -94],
        },
        { // [TV] 바잉툴 oled
            url: 'oled',
            target: '#pt_buying_compo02',
            scroll: [-59, -94],
        },
        { // [TV] 바잉툴 qled
            url: 'qled',
            target: '#pt_buying_compo02',
            scroll: [-59, -94],
        },
        { // [TV] 바잉툴 uhd
            url: 'uhd',
            target: '#pt_buying_compo02',
            scroll: [-59, -94],
        },
        { // [TV] 바잉툴 the-frame
            url: 'the-frame',
            target: '#pt_buying_compo03',
            // beforeScrollStart: setPageTab,
            scroll: [-59, -94],
        },
        { // [TV] 바잉툴 the-serif
            url: 'the-serif',
            target: '#pt_buying_compo03',
            // beforeScrollStart: setPageTab,
            scroll: [-59, -94],
        },
        { // [TV] 닷컴 동시구매 배너
            url: 'banner_multibuy',
            target: '.sec_banner_groupbuying',
            // beforeScrollStart: setPageTab,
            scroll: [-69, -104],
        },
        { // [TV] 닷컴 동시구매 배너
            url: 'ai-tv',
            target: '.sec_ai-tv_banner',
            // beforeScrollStart: setPageTab,
            scroll: [-200, -120],
        },
        //삼성 AI TV 체험단 탭 anchor
        // { // [체험단] tab
        //     url: 'ai',
        //     beforeScrollStart: setPageTab,
        // },
        // { // [체험단] tab
        //     url: 'ai-tab',
        //     target: '#sec_nav_hybrid',
        //     beforeScrollStart: setPageTab,
        // },
        // { // [체험단] 참여방법
        //     url: 'ai-event',
        //     target: '.sec_howto',
        //     scroll: [-73, -94],
        //     beforeScrollStart: setPageTab,
        // },
        // { // [체험단] ai-pod
        //     url: 'ai-pod',
        //     target: '.sec_feature',
        //     scroll: [-59, -94],
        //     beforeScrollStart: setPageTab,
        // },
        // { // [체험단] ai-buying
        //     url: 'ai-buying',
        //     target: '.sec_buying_hybrid',
        //     scroll: [-59, -94],
        //     beforeScrollStart: setPageTab,
        // },
        // { // [체험단] ai-benefit
        //     url: 'ai-benefit',
        //     target: '.sec_benefit__hybrid',
        //     scroll: [-59, -94],
        //     beforeScrollStart: setPageTab,
        // },
    ]);
    
    anchor.click([
        {
            el: '[data-role-anchor="sec_notice__subscribe"]',
            target: '#sec_notice__subscribe',
            scroll: [-120, -84]
        },
        {
            el: '[data-role-anchor="sec_ai__tv"]',
            target: '#sec_buying_subscribe',
            scroll: [0, 0]
        },
        {
            el: '[data-role-anchor="sec_buying__list"]',
            target: '#sec_buying_list',
            scroll: [-59, -94]
        },
        {
            el: '[data-role-anchor="sec_buying__tv"]',
            target: '#pt_buying_compo01',
            scroll: [-26, -24]
        },
        {
            el: '[data-role-anchor="sec_benefit__tv"]',
            target: '.sec_benefit__tv',
            scroll: [-0, -24]
        },
        {
            el: '[data-role-anchor="sec_review"]',
            target: '.sec_review',
            scroll: [-58, -94]
        },
        {
            el: '[data-role-anchor="sec_notice__tv_v1"]',
            target: '.sec_notice__tv_v1',
        },
        {
            el: '[data-role-anchor="sec_notice__tv_v2"]',
            target: '.sec_notice__tv_v2',
            scroll: [0, -94]
        },
        {
            el: '[data-role-anchor="sec_notice__tv_v3"]',
            target: '.sec_notice__tv_v3',
        },

        // {
        //     el: '[data-role-anchor="pt_benefit__banner--tv"]',
        //     target: '.pt_benefit__banner--tv',
        //     scroll: [-59, -94]
        // },
        // {
        //     el: '[data-role-anchor="pt_benefit__banner--music"]',
        //     target: '.pt_benefit__banner--music',
        //     scroll: [-59, -94]
        // },
        {
            el: '[data-role-anchor="sec_notice__tv"]',
            target: '#sec_notice__tv',
            scroll: [-73, -94]
        },
        {
            el: '[data-role-anchor="sec_notice__tv_v1"]',
            target: '#sec_notice__tv',
            scroll: [-73, -94]
        },
        {
            el: '[data-role-anchor="event-reviewr"]',
            target: '.event-reviewr',
            scroll: [-73, -94]
        },
        {
            el: '[data-role-anchor="pt_notice_match"]',
            target: '.pt_notice_match',
        },
        //삼성 AI TV 체험단 탭 anchor
        // {
        //     el: '[data-role-anchor="sec_howto"]',
        //     target: '.sec_howto',
        //     scroll: [-73, -94]
        // },
        // {
        //     el: '[data-role-anchor="sec_howto_noti"]',
        //     target: '.pt_notice__list--howto',
        // },
        // {
        //     el: '[data-role-anchor="sec_feature"]',
        //     target: '.sec_feature',
        //     scroll: [-59, -94]
        // },
        // {
        //     el: '[data-role-anchor="notice_pod"]',
        //     target: '.pt_notice__cont--pod',
        //     scroll: [-59, -94]
        // },
        // {
        //     el: '[data-role-anchor="sec_buying_hybrid"]',
        //     target: '.sec_buying_hybrid',
        //     scroll: [-59, -94]
        // },
        // {
        //     el: '[data-role-anchor="sec_benefit_hybrid--noti"]',
        //     target: '.pt_notice--hybrid-benefit',
        // },
    ]);

    accordian.toggle([
        {
            el: '[data-role-accordian="pt_banner_benefit__list--m"]',
            target:'#pt_banner_benefit__list--m',
            scroll: [-72, -93]
        },
    ]);

    tab.click([
        {
            el: '[data-role-tab="benefit_tab"]',
            target: '#benefit_tab_conts',
            // default: 1
        },
    ]);

    function imgLozad() { // bg에 lozad 적용
        const observerbg = lozad(".pt_bg-image", {
            loaded: function (el) {
                el.classList.add("pt_add-bg");
            },
        });
        observerbg.observe();
    }
    
    // $(window).on("load",function() {
    //     var goodsObjArr = $("[id^=gdPrc_1185456]");
    //     if (goodsObjArr == null || goodsObjArr.length == 0) return;
    //     fnGetAllPrdCouponPrice(goodsObjArr, '/sec/', '1', '10');
    // });

    
    function specialCounselAplPop(){
        var options = {
            url  : "/sec/specialCounsel/applyPopup/",
            data : {   spcsTmplNo  : 1 },
            type     : 'POST',
            async    : false,
            dataType : "html",
            done : function(data)
            {
                $('#popupCounsel').remove();
                $('#addHtmlPopupCounsel').after(data);
                $('input[name="addHtmlPopupCounsel"]').eq(0).remove();
                var minDate = new Date();
                var maxDate = new Date().addDay(30);
            
                $('#inpCusDate').datepicker({
                    "minDate": minDate,
                    "maxDate": maxDate,
                    "changeMonth": true,
                    "changeYear": true,
                    "onClose": function(input, inst) {
                    },
                    "ON-SELECT": function(input, inst){
                    setCounselDt();
                    }
                });
        
                const holidayWeek = $('#holidayWeekList').val(); //[1, 2, 3, 4, 5]
                const holidayList = $('#holidayList').val(); //[20250101, 20250102]
                var activeDays = [];
                var today = new Date();
                var datepickerOption = {
                    disabledType : '30'
                    , beforeShow : function(){
                        setTimeout(function(){
                    },0);
                    }
                };
        
                for(var i=0; i<30; i+=1) {
                    if(holidayWeek != 'undefiend' && holidayWeek.indexOf(today.getDay()) != -1){
                        if(holidayList != 'undefiend' && holidayList.indexOf(dateToStringFormat(today,"yyyyMMdd")) == -1){
                            activeDays.push(dateToStringFormat(today,"yyyyMMdd"));
                        }
                    }
                    today.setDate(today.getDate()+1);
                }
        
                datepickerOption = $.extend({}, datepickerOption, {activeDays : activeDays});
        
                setDatePicker(datepickerOption);
        
                var content;
                $("#inpApplyText").on('propertychange keyup paste input',function(e){
                    content = $("#inpApplyText").val();
                    $(".txt-count").html("<span><em class=\"strong\">"+content.length+"</em> / 1000자</span>");
        
                    if(content.length > 1000){
                        $("#inpApplyText").val(content.substr(0, 1000));
                        content = $("#inpApplyText").val();
                        $(".txt-count").attr("tabindex","0").html("<span><em class=\"strong\">"+content.length+"</em> / 1000자</span>");
                    }
                });
        
                if (!$("#popupCounsel").hasClass('active')) {
                    openLayer('popupCounsel');
                }
            }
        };
        ajax.call(options);
    }

    $('.sec_project_wrap .pt_consult-btn').on('click', function() {
        specialCounselAplPop();
    })  
  

    // page_tab.init();
    modal.init();
    // modal2.init();
    modalRolling.init();
    // benefitSlide.init();
    imgLozad();

    category_tab.init();
    copy.click();
    sticky.init();
    promoCoupon.init();

    component_tab.init();

    viewportChange();
});
