import { PT_STATE, util as _ } from './modules/bs_common';
import { anchor } from './modules/anchor';
import { accordian } from './modules/accordian';
import pickupData from "../data/pickupStore.json";
// import { copy } from './modules/copy';
import { tab } from './modules/tab';
import { modal } from './modules/modal';
import { modalOrigin } from "./modules/modalOrigin";
import { count } from './modules/countdown';
import { coupon, promoCoupon } from './modules/coupon';
// import { sns } from './modules/sns';
// import { video, videoKv } from './modules/video';
// import { sticky } from './modules/sticky';
// import { category_tab } from './modules/category_tab';

const galaxy_book4_ultra = {
    hubSwiperEvt(){ // 허브 텝 스와이퍼
        var hubSlide = new Swiper('.sec_hub .pt_swiper', {
            slidesPerView: 'auto',
            breakpoints: {
                769: {
                    allowTouchMove: false,
                },
            },
            on: {
                breakpoint: function(){
                    let _self = this;
                    setTimeout(function(){
                        _self.slideTo(0, 1);
                    }, 150);
                },
                // breakpoint: function() {
                //     let stickyMove = function(){
                //         let navTab = $(".sec_nav");
                //         let _navHeight = navTab.outerHeight();
                //         let scrollTop = $(this).scrollTop();
                //         let scrollClass =  _.pxToVw(-142, -167);
                //         let setNavFixed = ['.sec_buying', '.sec_spec', '.sec_benefit', '.sec_tradein', '.pt_bnf__item-mygalaxyclub'];
    
                //         setNavFixed.forEach((fixedClass, index)=>{
                //             if(($(fixedClass).offset().top - _navHeight + scrollClass) <= scrollTop){
                //                 navSlide.slideTo(index);
                //                 return;
                //             }
                //         });
    
                //     }
    
                //     $(window).on('scroll.sticky', stickyMove);
                // }
            }
        });
    },
    rollingSwiperEvt(){ // 바잉툴 롤링 배너
        let rollingSwiper = new Swiper(".pt_rolling", {
            slidesPerView: 'auto',
            // effect: "fade",
            direction: 'vertical',
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
                el: '.pt_rolling__page',
                type: 'fraction',
            },
            navigation: {
                nextEl: ".pt_rolling__next",
                prevEl: ".pt_rolling__prev",
            },
            on: {
                breakpoint: function() {
                    const that = this;
                    setTimeout(function() {
                        that.slideTo(0, 0);
                    }, 150);
                },
                init: function() {
                    $('.swiper-control').on('click', function(){
                        $(this).toggleClass("pt_pause pt_play");
                        if($(this).hasClass("pt_pause")) {
                            rollingSwiper.autoplay.start();
                            $('.swiper-control').html('일시정지');
                            $(this).attr('data-omni', 'sec:event:galaxy-book4:series:viewmore_rolling_banner_stop');
                        } else {
                            rollingSwiper.autoplay.stop();
                            $('.swiper-control').html('시작');
                            $(this).attr('data-omni', 'sec:event:galaxy-book4:series:viewmore_rolling_banner_play');
                        }
                    })
                }
            },
            breakpoints: {
                769: {
                    loop: true
                },
            },
        });
    },

    
    
    podSwiperEvt(){
        const podSwiper = new Swiper('.swiper-container.pt_feature__swiper', {
            slidesPerView: 'auto',
            autoplay:false,
            breakpoints: {
                769: {
                    slidesPerView: '1',
                    autoplay:false,
                    
                },
            },
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
                init : function(){
                    const btnPlay = $('.pt_feature__btn-play')
                    btnPlay.on('click', function(){
                        if(btnPlay.hasClass('pause')){
                            btnPlay.removeClass('pause');
                            btnPlay.attr("title","슬라이드 멈춤");
                            podSwiper.autoplay.start();
                        }else{
                            btnPlay.addClass('pause');
                            btnPlay.attr("title","슬라이드 재생");
                            podSwiper.autoplay.stop();
                        }
                    });
                },
                breakpoint: function() {
                    // 자동재생 삭제 alex 2024.03.07
                    // let ww = $(window).outerWidth();
                    // ww <= 768 ? this.autoplay.start() : this.autoplay.stop();
                    
                }
            }
        });

        
        const navData = [
            {
                icon : "gbu_feature_icon01_v1.png",
                desc : "터치 스크린",
                omni : "sec:event:galaxy-book4-ultra:preorder:button_touchscreen",
            },
            {
                icon : "gbu_feature_icon02.png",
                desc : "프로세서",
                omni : "sec:event:galaxy-book4-ultra:preorder:button_processor",
            },
            {
                icon : "gbu_feature_icon03.png",
                desc : "그래픽",
                omni : "sec:event:galaxy-book4-ultra:preorder:button_graphic",
            },
            {
                icon : "gbu_feature_icon04.png",
                desc : "에코시스템",
                omni : "sec:event:galaxy-book4-ultra:preorder:button_ecosystem",
            }
        ]
            
        
        const podSwiperNav = new Swiper('.swiper-container.pt_feature__swiper', {
            pagination: {
                el: ".pt_feature__bullet2",
                clickable: true,
                renderBullet: function (index, className) {
                return `
                    <a href="javascript:;" class="pt_feature__btn-nav ${className}" title="${navData[index].desc} 내용 보기" omni="${navData[index].omni}" data-omni-type="microsite">
                        <div class="pt_feature__icon">
                            <img src="../../../is/images/feature/preorder/${navData[index].icon}" alt="${navData[index].desc} 아이콘"  loading=lazy> 
                        </div>
                        <p class="pt_feature__desc">${navData[index].desc}</p>
                    </a>
                `;
                },
            },
        });

        podSwiper.controller.control = podSwiperNav;
        podSwiperNav.controller.control = podSwiper;


    },
    imgLozad() { // bg에 lozad 적용
        const observerbg = lozad(".pt_bg-image", {
            loaded: function (el) {
                el.classList.add("pt_add-bg");
            },
        });
        observerbg.observe();
    },
    pickupPopupEvt(){ // 매장픽업 팝업
        const pickupList = $('.pt_popup_pickup').find('[data-popup-pickup]');
        const pickupStore = pickupData.result;
        let pickupHtml = [];

        $.each(pickupStore, function(i, item){
            pickupHtml.push(`
            <li class="pt_pickup__item">
                <i class="pt_num">${i + 1}</i>${item.storeNm}
            </li>
            `);
        });

        pickupList.append(pickupHtml);
    },
    init(){
        // this.hubSwiperEvt(); // 허브 텝 스와이퍼
        // this.rollingSwiperEvt(); // 바잉툴 롤링 배너
        // this.podSwiperEvt(); // POD swiper
        this.pickupPopupEvt(); // 매장픽업 팝업
        this.imgLozad();
    }
}

function setSwiper() {
    // modal pod swiper
    $(".pt_pod_modal__swiper").each(function(){
        let $this = $(this)
        const podSwiper = new Swiper($this, {
            slidesPerView: 'auto',
            observer:true,
            observeParents:true,
            loop:true,
            lazy:true,
            preloadImages:false,
            on: {
                breakpoint: function(){
                    let _self = this;
                    setTimeout(function(){
                        _self.slideTo(0, 0);
                    }, 150);
                },
                init:function(){
                    $(".pt_pod [data-role='btnModalOrigin']").on("click",function(){
                        let slideId = $(this).attr("data-slide-id");
                        podSwiper.slideTo(slideId,0);
                    })
                }

            },
            navigation: {
                prevEl: $this.siblings(".pt_pod_prev"),
                nextEl: $this.siblings(".pt_pod_next"),
            },
        });
    });

    
     // hub swiper
     var hubSlide = new Swiper('.sec_hub .pt_swiper', {
        slidesPerView: 'auto',
        breakpoints: {
            769: {
                allowTouchMove: false,
            },
        },
        on: {
            breakpoint: function(){
                let _self = this;
                setTimeout(function(){
                    _self.slideTo(0, 2);
                }, 150);
            },
            // breakpoint: function() {
            //     let stickyMove = function(){
            //         let navTab = $(".sec_nav");
            //         let _navHeight = navTab.outerHeight();
            //         let scrollTop = $(this).scrollTop();
            //         let scrollClass =  _.pxToVw(-142, -167);
            //         let setNavFixed = ['.sec_buying', '.sec_spec', '.sec_benefit', '.sec_tradein', '.pt_bnf__item-mygalaxyclub'];

            //         setNavFixed.forEach((fixedClass, index)=>{
            //             if(($(fixedClass).offset().top - _navHeight + scrollClass) <= scrollTop){
            //                 navSlide.slideTo(index);
            //                 return;
            //             }
            //         });

            //     }

            //     $(window).on('scroll.sticky', stickyMove);
            // }
        }
    });

  
    var commonBnfSwiper = new Swiper('.swiper-container.pt_benefit__common-swiper', {
        slidesPerView: 'auto',
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        breakpoints: {
            769: {
                slidesPerView: 'auto',
            },
        },
        navigation: {
            nextEl: ".pt_benefit__common-next",
            prevEl: ".pt_benefit__common-prev",
        },
        pagination: {
            el: '.swiper-pagination.pt_common_bnf_pagination',
            type: 'bullets',
            clickable: true
        },
        on: {
            init : function(){
                const btnPlay = $('.pt_common_bnf_btn--play')
                btnPlay.on('click', function(){
                    if(btnPlay.hasClass('pt_paused')){
                        btnPlay.removeClass('pt_paused');
                        btnPlay.attr("title","슬라이드 멈춤");
                        btnPlay.attr("data-omni","sec:event:galaxy-book4:series:viewmore_PC_stop");
                        commonBnfSwiper.autoplay.start();
                    }else{
                        btnPlay.addClass('pt_paused');
                        btnPlay.attr("title","슬라이드 재생");
                        btnPlay.attr("data-omni","sec:event:galaxy-book4:series:viewmore_PC_play");
                        commonBnfSwiper.autoplay.stop();
                    }
                });
            },
        }
    });
    

}

// function initializeSwiper() {
//     const benefitSwiper = new Swiper(".pt_benefit__mobile", {
//         slidesPerView: 'auto',
//         loop: true,
//         lazy: true,
//         disableOnInteraction: false,
//         observer: true,
//         observeParents: true,
//         autoplay: {
//             delay: 3500,
//             disableOnInteraction: false,
//         },
//         pagination: {
//             el: '.swiper-pagination',
//             clickable: true,
//         },
//         navigation: {
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//         },
//         // breakpoints: {
//         //     769: {
//         //         allowTouchMove: false,
//         //         loop: false,
//         //         autoplay: false,
//         //         pagination: false,
//         //         navigation: false,
//         //     },
//         // },
//
//     });
//
//     // slider stop/play 관련
//     let isAutoplay = true;
//     const btnOmnis = [
//         { btnOmni: 'sec:event:galaxy-book4:series:viewmore_mo_stop' },
//         { btnOmni: 'sec:event:galaxy-book4:series:viewmore_mo_play' }
//     ];
//
//     // $('.pt_btn__stop').on('click', function() {
//     //     if (isAutoplay) {
//     //         benefitSwiper.autoplay.stop();
//     //         benefitSwiperBtns.autoplay.stop();
//     //         $('.pt_btn__stop').attr('data-omni', btnOmnis[1].btnOmni);
//     //         $(this).addClass('pt_play');
//     //     } else {
//     //         benefitSwiper.autoplay.start();
//     //         benefitSwiperBtns.autoplay.start();
//     //         $('.pt_btn__stop').attr('data-omni', btnOmnis[0].btnOmni);
//     //         $(this).removeClass('pt_play');
//     //     }
//     //     isAutoplay = !isAutoplay;
//     // });
//
//     $('.pt_btn__stop').on('click', function() {
//         toggleAutoplay();
//     });
//
//     function toggleAutoplay() {
//         if (isAutoplay) {
//             stopAutoplay();
//             $('#sec_benefit .pt_btn__stop').text('시작');
//         } else {
//             startAutoplay();
//             $('#sec_benefit .pt_btn__stop').text('일시정지');
//         }
//         updateButtonState();
//         isAutoplay = !isAutoplay;
//     }
//
//     function stopAutoplay() {
//         benefitSwiper.autoplay.stop();
//         benefitSwiperBtns.autoplay.stop();
//         $('.pt_btn__stop').attr('data-omni', btnOmnis[1].btnOmni);
//         $(this).addClass('pt_play');
//     }
//
//     function startAutoplay() {
//         benefitSwiper.autoplay.start();
//         benefitSwiperBtns.autoplay.start();
//         $('.pt_btn__stop').attr('data-omni', btnOmnis[0].btnOmni);
//         $(this).removeClass('pt_play');
//     }
//
//     function updateButtonState() {
//         $('.pt_btn__stop').toggleClass('pt_play');
//     }
//
//     // Pagination 버튼 커스텀 속성들
//     const btnContents = [
//         { btnTxt: '삼성닷컴 단독', omni: 'sec:event:galaxy-book4:series:viewmore_left' },
//         { btnTxt: '공통 혜택', omni: 'sec:event:galaxy-book4:series:viewmore_right' }
//     ];
//
//     const benefitSwiperBtns = new Swiper(".pt_benefit__mobile", {
//         slidesPerView: 'auto',
//         loop: true,
//         lazy: true,
//         disableOnInteraction: false,
//         observer: true,
//         observeParents: true,
//         autoplay: {
//             delay: 3500,
//             disableOnInteraction: false,
//         },
//         pagination: {
//             el: '.swiper-pagination',
//             clickable: true,
//             renderBullet: function (i, className) {
//                 let customText = btnContents[i].btnTxt;
//                 let customOmni = btnContents[i].omni;
//
//                 return '<button class="' + className + '"data-omni-type="microsite" data-omni="' + customOmni + '">' + customText + '</button>';
//             },
//         },
//         // breakpoints: {
//         //     769: {
//         //         allowTouchMove: false,
//         //         loop: false,
//         //         autoplay: false,
//         //         pagination: false,
//         //         navigation: false,
//         //     },
//         // },
//     });
//     benefitSwiper.controller.control = benefitSwiperBtns;
//
//     // 현재 Swiper 객체를 반환하여 전역 변수에 저장
//     return benefitSwiper;
// }

// Swiper 파괴 함수
function destroySwiper(swiper) {
    // Swiper 파괴
    if (swiper) {
        swiper.destroy();
    }
}

// window 크기에 따라 Swiper를 초기화 또는 파괴
function checkWindowWidth() {

    // 현재 Swiper 객체를 저장하는 변수
    let benefitSwiper = window.benefitSwiper;

    // window width가 768px 이하인 경우
    if (_.isMobile()) {
      // Swiper 초기화
        if (!benefitSwiper) {
        // Swiper 객체가 없는 경우에만 초기화
        window.benefitSwiper = initializeSwiper();
        }
    } else {
      // 769px 이상인 경우 Swiper 파괴
        destroySwiper(benefitSwiper);
      // 저장된 Swiper 객체 제거
        window.benefitSwiper = null;
    }
}


$(document).ready(function(){

    setSwiper();
    // initializeSwiper();

    modal.init();
    modalOrigin.init();

    modal.toggle([
        // pt_modal의 id와 동일한 값을 부여
        {
            el: '[data-role-anchor-modal="modal_tradein01"]',
            target: "#modal_tradein01",
            group: "pt_modal_tradein",
        },
        {
            el: '[data-role-anchor-modal="modal_tradein02"]',
            target: "#modal_tradein02",
            group: "pt_modal_tradein",
        },
    ]);
    
    anchor.click([
        {
            el: '[data-role-anchor="pt_notice__bnfonly"]',
            target: '#pt_notice__bnfonly'
        },
        {
            el: '[data-role-anchor="sec_buying"]',
            target: '.sec_buying',
            scroll: [-60, 0]

        },
        {
            el: '[data-role-anchor="sec_benefit"]',
            target: '.sec_benefit',
            scroll: [-60, -100]

        },
        {
            el: '[data-role-anchor="sec_spec"]',
            target: '.sec_spec',
            scroll: [-60, -100]

        },
        // {
        //     el: '[data-role-anchor="sec_feature"]',
        //     target: '.sec_feature',
        //     scroll: [-60, -100]

        // },
        {
            el: '[data-role-anchor="sec_pod"]',
            target: '.sec_pod',
            scroll: [-60,-100]
        },
        {
            el: '[data-role-anchor="pt_notice__benefit"]',
            target: '.sec_notice'
        },
        {
            el: '[data-role-anchor="sec_tabmenu01"]',
            target: '.sec_tabmenu01'
        },
    ]);

    anchor.load([
        { // 혜택 영역
            url: 'benefit',
            target: '.sec_benefit',
            scroll: [-67, -100]
        },
        // { // 특장점 영역
        //     url: 'pod',
        //     target: '.sec_feature',
        //     scroll: [-67, -100]
        // },
        {
            url: 'pod',
            target: '.sec_pod',
            scroll: [-60,-100]
        },
        {
            url: 'spec',
            target: '.sec_spec',
            scroll: [-60,-100]
        },
    ]);

    accordian.toggle([
        // {
        //     el: '[data-role-accordian="pt_spec"]',
        //     target: '#pt_spec',
        //     openFocus: 'pt_spec',
        //     scroll: [-100,-130]
        // },
        {
            el: '[data-role-accordian="spec_ultra"]',
            target: '#spec_ultra',
            group: 'spec',
            openFocus: 'spec_ultra',
            scroll: [-60,-100]
        },
        {
            el: '[data-role-accordian="spec_pro360"]',
            target: '#spec_pro360',
            group: 'spec',
            openFocus: 'spec_pro360',
            scroll: [-60,-100]
        },
        {
            el: '[data-role-accordian="spec_pro"]',
            target: '#spec_pro',
            group: 'spec',
            openFocus: 'spec_pro',
            scroll: [-60,-100]
        },
        {
            el: '[data-role-accordian="spec_book4"]',
            target: '#spec_book4',
            group: 'spec',
            openFocus: 'spec_book4',
            scroll: [-60,-100]
        },
    ]);

    tab.click([
        {
            el: '[data-role-tab="sec_tabmenu01"]',
            target: '#tab01',
            default: 0
        },
        // {
        //     el: '[data-role-tab="sec_tabmenu02"]',
        //     target: '#tab01',
        //     default: 0
        // },
        {
            el: '[data-role-tab="tab_pod"]',
            target: '#tab_pod_contents',
            default: 0
        },
    ]);

    // sticky.init();
    promoCoupon.init();

    // 카운트다운 타이머 설정
    // count.init('#count01', '2024/03/10 23:59:59');

    galaxy_book4_ultra.init();

    viewportChange(); // fold 해상도 대응
});
