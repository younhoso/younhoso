
import modelSlide from "../data/modelSlide.json";
import { PT_STATE, util as _ } from './modules/bs_common';
import { page_tab } from './modules/page_tab';
import { anchor } from './modules/anchor';
import { sticky } from './modules/sticky';
import { promoCoupon } from './modules/coupon';
import { modal } from './modules/modal';
import { tab } from './modules/tab';
import { component_tab } from './modules/component_tab';

page_tab.init();

$(document).ready(function(){

    function tabClickCom() {
        setTimeout(() => {
            const tabCom = document.querySelector('[data-page-tab="com"]');
            if(!tabCom) return;
            tabCom.click();
        }, 0)
    }

    function tabClickSys() {
        setTimeout(() => {
            const tabSys = document.querySelector('[data-page-tab="sys"]');
            if(!tabSys) return;
            tabSys.click();
        }, 0)
    }

    /** 일반제품 주요기능 팝업 닫기 */
    function modalCloseCom() {
        setTimeout(() => {
            const closeBtnCom = document.querySelector('.pt_model_pop--com .btn_close');
            closeBtnCom.click();
        }, 0)
    }

    /** 시스템에어컨 상담신청 CTA 클릭 앵커드 */
    function ePromoterApply() {
        setTimeout(() => {
            const tabSys = document.querySelector('[data-page-tab="sys"]');
            const consultBtn = document.querySelector('.sec_consult .pt_consult__btn');
            if(!tabSys) return;
            tabSys.click();
            consultBtn.click();
        }, 0)
    }
    
    anchor.click([
        {
            el: '[data-role-anchor="sec_consult"]',
            target: '.sec_consult',
            scroll: [-70, -80]
        }, 
        {
            el: '[data-role-anchor="sec_benefit_com"]',
            target: '.sec_benefit--com',
            scroll: [-62, -80]
        },
        {
            el: '[data-role-anchor="sec_benefit_sys"]',
            target: '.sec_benefit--sys',
            scroll: [-62, -80]
        },
        {
            el: '[data-role-anchor="sec_recommend_com"]',
            target: '.sec_recommend--com',
            scroll: [-62, -80]

        },
        {
            el: '[data-role-anchor="sec_recommend_sys"]',
            target: '.sec_recommend--sys',
            scroll: [-62, -80]

        },
        {
            el: '[data-role-anchor="sec_subscribe_com"]',
            target: '.sec_subscribe--com',
            scroll: [-62, -80]

        },
        {
            el: '[data-role-anchor="sec_subscribe_sys"]',
            target: '.sec_subscribe--sys',
            scroll: [-62, -80]

        },        
        {
            el: '[data-role-anchor="sec_component_rooms"]',
            target: '.sec_component--rooms',
            scroll: [-62, -80]
        },
        {
            el: '[data-role-anchor="sec_faq"]',
            target: '.sec_faq',
            scroll: [-62, -80]
        },
        {
            el: '[data-role-anchor="sec_component_wall"]',
            target: '#sec_component_wall',
            scroll: [-62, -48]
        },
        {
            el: '[data-role-anchor="sec_line_model01"]',
            target: '.sec_model',
            scroll: [-62, -48]
        },
        {
            el: '[data-role-anchor="sec_line_model02"]',
            target: '.sec_model',
            scroll: [-62, -48]
        },
        {
            el: '[data-role-anchor="pt_notice_rooms"]',
            target: '.pt_notice_rooms',
            scroll: [-62, -80]
        },
        {
            el: '[data-role-anchor="sec_notice"]',
            target: '.sec_notice',
            scroll: [0, 0]

        },
        //시스템 전문상담배너 유의사항 앵커드
        {
            el: '[data-role-anchor="pt_consult_noti"]',
            target: '.pt_consult_noti',
            scroll: [-75, -110]
        },
        // 모델별 주요기능 제품보러가기 앵커드드
        {
            el: '[data-role-anchor="recomm_gallery"]',
            target: '#sec_recommend_com',
            scroll: [-62, -80],
            tabClick: tabClickCom,
            modalClose: modalCloseCom,
            click: '[data-ty="tab1"]'
        },
        {
            el: '[data-role-anchor="recomm_classic"]',
            target: '#sec_recommend_com',
            scroll: [-62, -80],
            tabClick: tabClickCom,
            modalClose: modalCloseCom,
            click: '[data-ty="tab2"]'
        },
        {
            el: '[data-role-anchor="recomm_q9000"]',
            target: '#sec_recommend_com',
            scroll: [-62, -80],
            tabClick: tabClickCom,
            modalClose: modalCloseCom,
            click: '[data-ty="tab3"]'
        }
    ]);

    anchor.load([
        //일반에어컨
        // 일반> sec_kv
        {
            url: 'kv',
            target: '[data-page-content="com"].sec_kv',
            scroll: [-62, -80],
            tabClick: tabClickCom
        },
        // 일반> sec_nav
        {
            url: 'tab',
            target: '#sec_nav_com',
            scroll: [-62, -80],
            tabClick: tabClickCom
        },
        // 일반> sec_benefit
        {
            url: 'benefit',
            target: '.sec_benefit.sec_benefit--com',
            scroll: [-62, -80],
            tabClick: tabClickCom
        },
        // 일반> 추천제품
        {
            url: 'recommend',
            target: '#sec_recommend_com',
            scroll: [-62, -80],
            tabClick: tabClickCom
        },
        // 일반> 추천제품 - 갤러리탭탭
        {
            url: 'new-gallery',
            target: '#sec_recommend_com',
            scroll: [-62, -80],
            tabClick: tabClickCom,
            click: '[data-ty="tab1"]'
        },
        // 일반> 추천제품 - 갤러리탭탭
        {
            url: 'classic',
            target: '#sec_recommend_com',
            scroll: [-62, -80],
            tabClick: tabClickCom,
            click: '[data-ty="tab2"]'
        },
        // 일반> 추천제품 - 갤러리탭탭
        {
            url: 'q9000',
            target: '#sec_recommend_com',
            scroll: [-62, -80],
            tabClick: tabClickCom,
            click: '[data-ty="tab3"]'
        },
        // 일반> 구독
        {
            url: 'subscribe',
            target: '#sec_subscribe--com',
            scroll: [-62, -80],
            tabClick: tabClickCom
        },
        // 일반> 벽걸이형 에어컨
        {
            url: 'wall-mount',
            target: '#sec_component_wall',
            scroll: [-62, -80],
            tabClick: tabClickCom
        },        

        // 시스템에어컨
        // 시스템> sec_kv
        {
            url: 'system-kv',
            target: '[data-page-content="sys"].sec_kv',
            scroll: [-62, -80],
            tabClick: tabClickSys
        },
        // 시스템> sec_nav
        {
            url: 'system-tab',
            target: '#sec_nav_sys',
            scroll: [-62, -80],
            tabClick: tabClickSys
        },        
        // 시스템> sec_benefit
        {
            url: 'system-benefit',
            target: '.sec_benefit.sec_benefit--sys',
            scroll: [-62, -80],
            tabClick: tabClickSys
        },
        // 시스템> 추천모델
        {
            url: 'system-recommend',
            target: '#sec_recommend_sys',
            scroll: [-62, -80],
            tabClick: tabClickSys
        },
        // 시스템> 추천모델 3실탭
        {
            url: 'indoor-3',
            target: '#sec_recommend_sys',
            scroll: [-62, -80],
            tabClick: tabClickSys,
            click: '#sec_recommend_sys .pt_recomm__btn--sys1 a'
        },
        // 시스템> 추천모델 4실탭
        {
            url: 'indoor-4',
            target: '#sec_recommend_sys',
            scroll: [-62, -80],
            tabClick: tabClickSys,
            click: '#sec_recommend_sys .pt_recomm__btn--sys2 a'
        },
        // 시스템> 추천모델 5실탭
        {
            url: 'indoor-5',
            target: '#sec_recommend_sys',
            scroll: [-62, -80],
            tabClick: tabClickSys,
            click: '#sec_recommend_sys .pt_recomm__btn--sys3 a'
        },
        // 시스템> 방방구매
        {
            url: 'system-pre-purchase-benefit',
            target: '.sec_component--rooms',
            scroll: [-62, -80],
            tabClick: tabClickSys
        },
        // 시스템> 컴포넌트 탭 cta
        {
            url: 'system-pre-purchase-product',
            target: '#pt_component_tab_sys',
            scroll: [-62, -80],
            tabClick: tabClickSys
        },
        // 시스템> 구독
        {
            url: 'system-subscribe',
            target: '.sec_subscribe--sys',
            scroll: [-62, -80],
            tabClick: tabClickSys
        },
        // 시스템-전문상담배너 앵커드
        {
            url: 'e-promoter',
            target: '.sec_consult',
            scroll: [-62, -80],
            tabClick: tabClickSys
        },
        // 시스템에어컨 상담신청 CTA 앵커드 url
        {
            url: 'e-promoterPopup',
            target: '.sec_consult',
            scroll: [-62, -80],
            tabClick: ePromoterApply
        },
        // 시스템> sec_faq
        {
            url: 'faq',
            target: '.sec_faq',
            scroll: [-62, -80],
            tabClick: tabClickSys
        },
    ]);

    tab.click([
        {
            el: '[data-role-tab="model_tab_com"]',
            target: '#tab_model_com',
        },
    ]);

    const air_conditioner = {
        // bg에 lozad 적용
        imgLozad() {
            const observerbg = lozad(".pt_bg-image", {
                loaded: function (el) {
                    el.classList.add("pt_add-bg");
                },
            });
            observerbg.observe();
        },

        navSwiper() {
            //nav swiper시 주석해제
            let navSwiper = new Swiper ('.swiper-container.pt_mo_sys_swiper',{
                slidesPerView: 'auto',
                allowTouchMove: true,
                preloadImages: false,
                observer: true,
                observeParents: true,
                lazy: true,
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
                    }
                },
            });
        },

        /** 혜택 슬라이드 */
        bnfSwiper(){
            let benefitSwiper = new Swiper(".sec_benefit .pt_bnf__container", {
                slidesPerView: "auto",
                allowTouchMove: true,
                observer: true,
                observeParents: true,
                observeSlideChildren: true,
                lazy: true,
                a11y: {
                    prevSlideMessage: '이전 슬라이드',
                    nextSlideMessage: '다음 슬라이드',
                    slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
                },
                pagination: {
                    el: ".pt_bnf__container .pt_bnf__pagination",
                    clickable : true,
                },
                breakpoints: {
                    769: {
                        allowTouchMove: false,
                    },
                },
                on: {
                    breakpoint: function(){
                        let _self = this;
                        setTimeout(function(){
                            _self.slideTo(0, 0);
                        }, 150);
                    },
                }
            });
        },

        /** 체크리스트+faq MO 슬라이드 */
        chkSwiper() {
            var ww = $(window).width();
            var mySwiper = undefined;

            function initSwiper() {

                if (ww < 768 && mySwiper == undefined) {
                    mySwiper = new Swiper(".swiper-container.pt_chk__swiper", {
                        slidesPerView: 'auto',
                        observer:true,
                        observeParents:true,
                        lazy:true,
                        preloadImages:false,
                        pagination: {
                            el: '.swiper-pagination.pt_chk__pagi',
                            clickable : true,
                        },
                        breakpoints: {
                            769: {
                                allowTouchMove: false,                
                            }
                        },
                        a11y: { // 웹접근성 
                            enabled: true,
                            prevSlideMessage: '이전 슬라이드',
                            nextSlideMessage: '다음 슬라이드',   
                            slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
                        },
                        on: {
                            breakpoint: function() {
                                const that = this;
                                setTimeout(function() {
                                    that.slideTo(0, 0);
                                }, 150);
                            },
                            init: function() {
                            }
                        },
                    });
                } else if (ww >= 768 && mySwiper != undefined) {
                    mySwiper.destroy();
                    mySwiper = undefined;
                }
            }

            initSwiper();

            $(window).on('resize', function () {
                ww = $(window).width();
                initSwiper();
            });
        },

        componentBg() {
            let compoLength = 0;        
            const compoList = $('.wrap-component');
        
            compoList.each(function(idx){
                $(compoList[idx]).attr("id",`compo${idx}`);
            })
        
            //컴포넌트 배경 넣기
            compoList.each(function(idx){
                if(compoLength <= idx) {
                    if (idx >= 0 && idx <= 4 || idx >= 7 && idx <= 9) {
                        $(compoList[idx]).css("background","#E7F0FA");
                    }
                    if (idx >= 10 && idx <= 13) {
                        $(compoList[idx]).css("background","#f2f9ff");
                    }
                }
            })
        
        },
        

        init() {
            this.imgLozad();
            this.navSwiper();
            this.bnfSwiper();
            this.chkSwiper();
            this.componentBg();
        }
    }

    //구독클럽 스와이퍼 com
    const subsSwiperCom  = new Swiper('.swiper-container.pt_subscribe_slide--com', {
        slidesPerView: 'auto',
        // slidesPerGroup: 2,
        allowTouchMove: true,
        preloadImages: false,
        lazy: true,
        observer: true,
        observeParents: true,
        pagination: {
            el: ".pt_subscribe_slide__pagination--com",
            clickable : true,
        },
        breakpoints: {
            769: {
                allowTouchMove: false,
            }
        },
        on: {
            init: function() {
                const $el = $(this.$el);

                this.params.navigation.prevEl = $el.siblings('.pt_arrow--prev');
                this.params.navigation.nextEl = $el.siblings('.pt_arrow--next');
            },
            breakpoint: function(){
                let _self = this;
                setTimeout(function(){
                    _self.slideTo(0, 0);
                }, 150);
            },
        }
    });

    //구독클럽 스와이퍼 sys
    const subsSwiperSys  = new Swiper('.swiper-container.pt_subscribe_slide--sys', {
        slidesPerView: 'auto',
        // slidesPerGroup: 2,
        allowTouchMove: true,
        preloadImages: false,
        lazy: true,
        observer: true,
        observeParents: true,
        pagination: {
            el: ".pt_subscribe_slide__pagination--sys",
            clickable : true,
        },
        breakpoints: {
            769: {
                allowTouchMove: false,
            }
        },
        on: {
            init: function() {
                const $el = $(this.$el);

                this.params.navigation.prevEl = $el.siblings('.pt_arrow--prev');
                this.params.navigation.nextEl = $el.siblings('.pt_arrow--next');
            },
            breakpoint: function(){
                let _self = this;
                setTimeout(function(){
                    _self.slideTo(0, 0);
                }, 150);
            },
        }
    });

    // 전문 상담 모듈 API
    function specialCounselAplPop(){
        var options = {
        url  : "/sec/specialCounsel/applyPopup/",
        data : {   spcsTmplNo  : 2 },
        type     : 'POST',
        async    : false,
        dataType : "html",
        done     : function(data)
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
    $(".sec_consult .pt_consult__btn").click(function() {
        specialCounselAplPop();
    });

    modal.init();
    sticky.init();
    promoCoupon.init();
    component_tab.init();

    air_conditioner.init()
    viewportChange(); // fold 해상도 대응
});
