import modelData from "../data/modelData.json";
import premium from "../data/premiumData.json";
import { modal } from './modules/modal';
// import { page_tab } from './modules/page_tab';
import { PT_STATE, util as _ } from './modules/bs_common';
import { anchor } from './modules/anchor';
import { accordian } from './modules/accordian';
import { sticky } from './modules/sticky';

// page_tab.init();

$(document).ready(function(){
    anchor.click([
        {
            el: '[data-role-anchor="benefit_month"]',
            target: '.sec_nongsim',
            scroll: [-70, -95],
        },
        {
            el: '[data-role-anchor="membership_points"]',
            target: '.sec_point',
            scroll: [-70, -95],
        },
        {
            el: '[data-role-anchor="exclusive_service"]',
            target: '.sec_special_benefit',
            scroll: [-70, 45]
        },
        {
            el: '[data-role-anchor="benefit_month_notice"]',
            target: '.sec_benefit_month_notice',
        },
        {
            el: '[data-role-anchor="month_notice"]',
            target: '.sec_month_notice',
        },
        {
            el: '[data-role-anchor="membership_notice"]',
            target: '.sec_membership_notice',
        },
        {
            el: '[data-role-anchor="nongsim_notice"]',
            target: '.sec_nongsim_notice',
        },
    ]);
    
    anchor.load([
        // kv
        {
            url: 'kv',
            target: '.sec_kv'
        },

        // 이달의 혜택
        {
            url: 'monthlybenefit',
            target: '.sec_chilsung',
            scroll: [ -70, -95],
        },

        //  동시구매 패키지
        {
            url: 'monthly-benefit',
            target: '.sec_month',
            scroll: [ -70, -95],
        },

        // 카드사 혜택
        {
            url: 'paydiscount',
            target: '.sec_card',
            scroll: [ -70, -95],
        },

        // 카드 혜택을 확인하고 합리적으로 구매해요 영역
        {
            url: 'nointerest',
            target: '.sec_card_benefit',
            scroll: [ -70, -95],
        },

        // 함께 살수록 커지는 포인트 혜택을 드려요 영역
        {
            url: 'point',
            target: '.sec_point',
            scroll: [ -70, -95],
        },

        //  삼성닷컴에서 만날 수 있는 풍성한 혜택 영역
        {
            url: 'service',
            target: '.sec_special_benefit',
            scroll: [ -70, -95],
        },

        // 삼성닷컴 회원가입 영역
        {
            url: 'end',
            target: '.pt_end',
            scroll: [ -70, -95],
        },
        {
            url: 'nongshim',
            target: '.sec_nongsim',
            scroll: [ -70, -95],
        },
        // 덴티스테
        // {
        //     url: 'dentiste-benefit',
        //     target: '.sec_dentiste',
        //     scroll: [-70, -95],
        // },
        // 동원몰
        // {
        //     url: 'dongwonmall',
        //     target: '.sec_dongwon',
        //     scroll: [-10, 0],
        // },
        //라이필
        // {
        //     url: 'lifill',
        //     target: '.sec_lifill',
        //     scroll: [-50, -100],
        // },
        //KB PAY
        // {
        //     url: 'kb-pay',
        //     target: '.sec_kbcard',
        //     scroll: [-40, -100],
        // },
        // {
        //     url: 'npay',
        //     target: '.sec_event'
        // },
        // {
        //     url: 'lottecinema',
        //     target: '.sec_event'
        // },
        // {
        //     url: 'paydiscount',
        //     target: '.sec_samsung_card',
        // },
        // {
        //     url: 'togetherbuy',
        //     target: '.sec_special_banner',
        //     scroll: [-180, -110],
        // },
    ]);
    
    accordian.toggle([
        {
            el: '[data-role-accordian="pt_kbcard__notice"]',
            target: '#pt_kbcard__notice',
            speed: 300
        },
    ]);

    sticky.init();
})


;(function(){
    'use strict';

    var benefitzone = {
        slideEvt: function() {

            let eventSwiper = new Swiper(".pt_event-slide", {
                slidesPerView: 'auto',
                // effect: "fade",
                observer:true,
                observeParents:true,
                lazy:true,
                preloadImages:false,
                loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.pt_page--event',
                    clickable: true,
                    bulletElement: 'button'
                },
                navigation: {
                    nextEl: ".pt_nav-btn--next",
                    prevEl: ".pt_nav-btn--prev",
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
                        $('.pt_control--event .swiper-control').on('click', function(){
                            $(this).toggleClass("pt_pause pt_play");
                            if($(this).hasClass("pt_pause")) {
                                eventSwiper.autoplay.start();
                                $('.swiper-control').html('일시정지');
                                $(this).attr('data-omni', '');
                            } else {
                                eventSwiper.autoplay.stop();
                                $('.swiper-control').html('시작');
                                $(this).attr('data-omni', '');
                            }
                        })
                    },
                    transitionEnd: function() {
                        $(".pt_event__item").find('a').attr("tabindex","-1");
                        $(".pt_event__item.swiper-slide-active").find('a').attr("tabindex","0");
                    }
                },
                breakpoints: {
                    769: {
                        loop: true
                    },
                },
            });

            var specialSwiper = new Swiper('.swiper-container.pt_special_container', {
				// freeMode: true,
				allowTouchMove: true,
				slidesPerView: 'auto',
				observer: true,
				observeParents: true,
				loop: false,
                preloadImages: false,
                lazy: true,
				navigation : {
					nextEl : '.pt_special_benefit_wrap .pt_next_btn',
					prevEl : '.pt_special_benefit_wrap .pt_prev_btn',
				},
				on: {
					breakpoint: function () {
						var that = this;
						setTimeout(function () {
							that.slideTo(0, 0);
						}, 150);
					}
				}
			});
        },
        modelPopup: function(){
            const modelList = modelData.result;
            const modelTable = $("#pt_popup_model");
            let _html = ``;
            modelList.forEach((item)=>{
                _html += `
                    <tr>
                        <td>${item.category}</td>
                        <td>${item.group}</td>
                        <td>${item.name}</td>
                        <td>${item.seg}</td>
                        <td>${item.benefitPrice}</td>
                    </tr>
                `
            })
            modelTable.html(_html);
            
        },

        modelPopup1: function(){
            const list1 = premium.result;
            const listTable = $("#pt_popup_model1");
            let _html = ``;
            list1.forEach((item)=>{
                _html += `
                    <tr>
                        <td>${item.category}</td>
                        <td>${item.name}</td>
                    </tr>
                `
            })
            listTable.html(_html);
            
        },    

        init: function() {
            // this.stickyEvt();
            this.slideEvt();
            this.modelPopup();
            this.modelPopup1();
            viewportChange(); // fold 해상도 대응
            
        }
    };
    
    modal.init();
    benefitzone.init();
})();
