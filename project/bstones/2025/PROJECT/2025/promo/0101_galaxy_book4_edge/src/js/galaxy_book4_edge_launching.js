import pickupData from "../data/pickupStore.json";
import { PT_STATE, util as _ } from './modules/bs_common';
import { anchor } from './modules/anchor';
import { accordian } from './modules/accordian';
import { tab } from './modules/tab';
// import { copy } from './modules/copy';
import { modal } from './modules/modal';
import { modalOrigin } from './modules/modalOrigin';
// import { count } from './modules/countdown';
// import { coupon, promoCoupon } from './modules/coupon';
// import { sns } from './modules/sns';
// import { video, videoKv } from './modules/video';
// import { sticky } from './modules/sticky_launching';
// import { category_tab } from './modules/category_tab';

// 필요 한 부분만 남기고 제거해서 사용해주세요. 
// 실행소스 참고는 BS스크립트 3버전을 참고해주세요. PROJECT/00_bs_script_v3

const $secWrap = $('.sec_project_wrap');

const galaxy_book4_edge_launching = {
    hubSwiperEvt() { // 허브 텝 스와이퍼
        // hub swiper
        const hubSwiper = new Swiper(".sec_hub .pt_hub__swiper", {
            slidesPerView: 'auto',
            breakpoints: {
                769: {
                    slidesPerView: 'auto',
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

    rollingSwiperEvt(){ // 롤링 배너
        let rollingSwiper = new Swiper(".sec_rolling_banner .pt_rolling__swiper", {
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
            loop: true,
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
                            $('.swiper-control').attr('data-omni', 'sec:event:galaxy-book4-edge:launching:slide_slide_stop');
                        } else {
                            rollingSwiper.autoplay.stop();
                            $('.swiper-control').html('시작');
                            $('.swiper-control').attr('data-omni', 'sec:event:galaxy-book4-edge:launching:slide_slide_play');
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

    buyingRollingSwiperEvt(){ // 바잉툴 롤링 배너
        let buyingBannerRollingSwiper = new Swiper(".sec_buying .pt_rolling__swiper", {
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
                el: '.sec_buying .pt_rolling__page',
                type: 'fraction',
            },
            navigation: {
                nextEl: ".sec_buying .pt_rolling__next",
                prevEl: ".sec_buying .pt_rolling__prev",
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
                    $('.swiper-control-buying').on('click', function(){
                        $(this).toggleClass("pt_pause pt_play");
                        if($(this).hasClass("pt_pause")) {
                            buyingBannerRollingSwiper.autoplay.start();
                            $('.swiper-control-buying').html('일시정지');
                            $('.swiper-control-buying').attr('data-omni', 'sec:event:galaxy-book4-edge:launching:slide_slide_stop');
                        } else {
                            buyingBannerRollingSwiper.autoplay.stop();
                            $('.swiper-control-buying').html('시작');
                            $('.swiper-control-buying').attr('data-omni', 'sec:event:galaxy-book4-edge:launching:slide_slide_play');
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
    // btnClickUrl() {
    //     $secWrap.on('click', '[data-role="btnPdUrl"]',function(e){
    //         e.preventDefault();
    
    //         const attrUrl = $(this).attr('data-attr');
            
            
    //         if (attrUrl.length === 0) return false;
    //         const pop = window.open(undefined, '');       
    //         pop.location.href = attrUrl;
    //     });
    // },
    
    imgLozad() { // bg에 lozad 적용
        const observerbg = lozad(".pt_bg-image", {
            loaded: function (el) {
                el.classList.add("pt_add-bg");
            },
        });
        observerbg.observe();
    },
    
    init(){
        this.hubSwiperEvt();
        this.rollingSwiperEvt();
        this.buyingRollingSwiperEvt()
        this.pickupPopupEvt();
        this.imgLozad();
        // this.btnClickUrl();
    },
}

$(document).ready(function(){
    
    anchor.click([
        {
            el: '[data-role-anchor="sec_notice"]',
            target: '.sec_notice'
        },
        {
            el: '[data-role-anchor="sec_anchor02"]',
            target: '.sec_anchor',
            speed: 1000,
            scroll: [500]
        },
        {
            el: '[data-role-anchor="sec_anchor03"]',
            target: '.sec_anchor',
            speed: 0,
            scroll: [-200, -100]
        },
        {
            el: '[data-role-anchor="pt_benefit__insta"]',
            target: '.pt_benefit__insta',
            // speed: 100,
            scroll: [-139, -398],
            click: '[data-ancload-click="pt_benefit__insta"]'
        },
    ]);

    anchor.load([
        {
            url: 'benefit',
            target: '.sec_benefit',
            scroll: [-100, -120]
        },
        {
            url: 'spec',
            target: '.sec_spec',
            scroll: [-100, -120]
        },
        {
            url: 'pod',
            target: '.sec_feature',
            scroll: [-100, -120]
        },
    ]);

    // accordian.toggle([
    //     {
    //         el: '[data-role-accordian="sec_accordian01"]',
    //         target: '#toggle01'
    //     },
    //     {
    //         el: '[data-role-accordian="sec_accordian02"]',
    //         target: '#toggle02',
    //         speed: 0
    //     },
    //     {
    //         el: '[data-role-accordian="sec_accordian03"]',
    //         target: '#toggle03',
    //         group: 'group01'
    //     },
    //     {
    //         el: '[data-role-accordian="sec_accordian04"]',
    //         target: '#toggle04',
    //         group: 'group01'
    //     },
    //     {
    //         el: '[data-role-accordian="sec_accordian05"]',
    //         target: '#toggle05',
    //         openFocus: 'toggle05'
    //     },
    //     {
    //         el: '[data-role-accordian="sec_accordian06"]',
    //         target: '#toggle06',
    //         openFocus: 'toggle06',
    //     },
    //     {
    //         el: '[data-role-accordian="sec_accordian07"]',
    //         target: '#toggle07',
    //         open: true
    //     },
    //     {
    //         el: '[data-role-accordian="sec_button_test"]',
    //         target: '#button01'
    //     }
    // ]);

    accordian.toggle([
        {
            el: '[data-role-accordian="sec_accordian01"]',
            target: '#toggle01',
            scroll: [50, -200],
            speed: 400
        },
    ]);

    tab.click([
        {
            el: '[data-role-tab="pt_benefit__tab"]',
            target: '#tab01',
            default: 0,
            anc: true,
        },
        {
            el: '[data-role-tab="pt_spec__tab"]',
            target: '#pt_spec__tab',
            default: 1,
            anc: true,
        },
    ]);

    // 스펙 영역 tab 닫기 + scrolltop 기능
    $(document).ready(function() {
        $('.pt_btn__spec--close').on('click', function() {
            $(this).closest('.pt_spec__box--inner').css('display', 'none');
            $('.pt_text-box__btn').removeClass('active');

            const stickyHeight = $('.pt_sticky').outerHeight() || 0;
            $('html, body').animate({
                scrollTop: $('.sec_spec').offset().top - stickyHeight
            }, 300);
        });
    });

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
        {
            el: '[data-role-anchor-modal="modal_bnf_tradein01"]',
            target: "#modal_bnf_tradein02",
            group: "pt_modal_bnf_tradein",
        },
        {
            el: '[data-role-anchor-modal="modal_bnf_tradein02"]',
            target: "#modal_bnf_tradein02",
            group: "pt_modal_bnf_tradein",
        }
    ]);

    // video.init([
    //     {
    //         el: '[data-role-video="video01"]',
    //         target: '#video03',
    //         video: 'https://images.samsung.com/kdp/event/sec/PM_0607_alarm_samsung_careplus/launching/video/care.mp4'
    //     },
    //     {
    //         el: '[data-role-video="video02"]',
    //         target: '#video02',
    //         youtube: 'Ix0a4QRZzUU'
    //     }
    // ])

    // videoKv.init({
    //     target: '#kv_video',
    //     maxCount: 1
    // });

    const podSwiper = {
        swiperBenefit : {
                // 혜택 슬라이드 
            variables: {
                modelNavs: document.querySelectorAll('.pt_icon__swiper .pt_icon__item'),
                modelConts: document.querySelectorAll('.pt_feature__conts--swiper .pt_feature__conts-item'),
                swiperIns: null,
                // ttt: console.log('this?', this)
            },
            lineModelSwiper() {
                let _this = this;

                // nav swiper 
                const navSwiper = new Swiper(".pt_icon__swiper", {
                    slidesPerView: "auto",
                    observer : true, 
                    observeParents : true,
                    allowTouchMove: true,
                    preloadImages: false,
                    lazy: true,
                    a11y: {
                        prevSlideMessage: '이전 슬라이드',
                        nextSlideMessage: '다음 슬라이드',
                        slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
                    },
                    breakpoints: {
                        320: {
                            // allowTouchMove: false,
                            // slidesPerView: 1,
                        },
                        768: {
                            allowTouchMove: true,
                            slidesPerView: "auto",
                        }
                    },
                    on: {
                        init: function() {
                            $('.pt_icon__swiper .pt_icon__item.active').append('<span class="blind selected_option">선택됨</span>');
                        },
                        transitionStart: function() {
                            // 네비 이동 시 컨텐츠 스와이프 이동
                            if(document.body.clientWidth > 768) {
                                contentSwiper.slideTo(this.activeIndex, 500);
                            };
                        }, 
                        slideChangeTransitionEnd: function() {
                            $('.pt_icon__swiper .pt_icon__item').find('.blind').remove();
                            $('.pt_icon__swiper .pt_icon__item.active').append('<span class="blind selected_option">선택됨</span>');
                        },
                        breakpoint: function () {
                            var that = this;
                            setTimeout(function () {
                                that.slideTo(0, 0);
                            }, 150);
                        },
                    },
                });

                // conts swiper
                const contentSwiper = new Swiper(".pt_feature__conts--swiper", {
                    slidesPerView: 1,
                    observer : true, 
                    observeParents : true,
                    preloadImages: false,
                    lazy: true,
                    nested: true,
                    allowTouchMove: true,
                    spaceBetween: 20,
                    pagination: {
                        el: ".pt_feature__conts--swiper .pt_conts__pagination",
                        clickable : true,
                    },
                    navigation: {
                        nextEl: ".swiper-button-next.pt_feature__btn-next",
                        prevEl: ".swiper-button-prev.pt_feature__btn-prev",
                    },
                    a11y: {
                        prevSlideMessage: '이전 슬라이드',
                        nextSlideMessage: '다음 슬라이드',
                        slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
                    },
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                            // spaceBetween: 16,
                        },
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                            allowTouchMove: true,
                        }
                    },
                    on: {
                        transitionStart: function() {
                            _this.lineModelNav(this.activeIndex);
                            navSwiper.slideTo(this.activeIndex, 500);
                            // 마지막 요소에 접근 시 activeIndex가 마지막 요소 못잡는 이슈 해결
                            // if(this.isEnd) {
                            //     _this.lineModelNav(this.activeIndex + 1);
                            // }
                        },
                        breakpoint: function () {
                            var that = this;
                            setTimeout(function () {
                                that.slideTo(0, 0);
                                for(let i = 0; i < that.slides.length; i ++) {
                                    that.slides[i].setAttribute('style', '')
                                }
                            }, 150);
                        },
                        init: function() {
                            let swiperContainer = document.querySelector('.pt_feature__conts--swiper');
                            swiperContainer.classList.add('pt_blk');

                            // data-bg-blk attr 을 가진 슬라이드에만 특정 스타일링 적용
                            // const swiperContainerList = document.querySelectorAll('[data-bg-blk]');
                            // swiperContainerList.forEach(swiperContainerList => {
                            //     swiperContainerList.classList.add('pt_blk');
                            // });
                        },
                        slideChange: function () {
                            let swiperContainer = document.querySelector('.pt_feature__conts--swiper');
                            if (this.activeIndex >= 0 && this.activeIndex <= 1) {
                                swiperContainer.classList.add('pt_blk');
                            } else if (this.activeIndex === 6) {
                                swiperContainer.classList.add('pt_blk');
                            } else {
                                swiperContainer.classList.remove('pt_blk');
                            }
                        },
                        slideChangeTransitionEnd: function() {
                            $('.pt_icon__swiper .pt_icon__item').find('.blind').remove();
                            $('.pt_icon__swiper .pt_icon__item.active').append('<span class="blind selected_option">선택됨</span>');
                        }
                        // init: function() {
                        //     $(this.el).find('.swiper-slide').attr('tabindex', -1);
                        //     $(this.el).find('.swiper-slide.swiper-slide-active').attr('tabindex', 0);                    
                        // },
                    },
                });

                $('.pt_icon__swiper .pt_icon__item').on('click', function() {
                    $('.pt_icon__swiper .pt_icon__item').find('.blind').remove();
                    $(this).append('<span class="blind selected_option">선택됨</span>');
                })

                // idx
                for(let i = 0; i < this.variables.modelNavs.length; i++) {
                    
                    this.variables.modelNavs[i].addEventListener('click', e => {
                        contentSwiper.slideTo(i, 500);
                        // debugger
                        // console.log(contentSwiper)
                        // _this.lineModelNav(i);
                        for(let j = 0; j < this.variables.modelNavs.length; j++) {
                            this.variables.modelNavs[j].classList.remove('active');
                            this.variables.modelConts[j].classList.remove('active');
                        }
                        this.variables.modelNavs[i].classList.add('active');
                        this.variables.modelConts[i].classList.add('active');
                    });

                };

                // let playPauseButton = document.createElement('.pt_feature__btn-play');
                // playPauseButton.addEventListener('click', function() {
                //     if (contentSwiper.autoplay.running) {
                //         contentSwiper.autoplay.stop();
                //         playPauseButton.textContent = 'Play';
                //     } else {
                //         contentSwiper.autoplay.start();
                //         playPauseButton.textContent = 'Pause';
                //     }
                // });

                return { contentSwiper, navSwiper };
            },
            lineModelNav(idx) { // 네비 연결
                this.variables.modelNavs.forEach(el => el.classList.remove('active'))
                this.variables.modelNavs[idx].classList.add('active')
            },
            swiperStats() {
                setTimeout(() => {
                    this.variables.swiperIns = this.lineModelSwiper();
                    this.lineModelNav(0);
                    this.variables.swiperIns.contentSwiper.update();
                    this.variables.swiperIns.navSwiper.update();
                    // console.log(this.variables.swiperIns.navSwiper)
                }, 0)
            },
        },
        init(){
            this.swiperBenefit.swiperStats(); // 먼저 실행하면 안됨. 클릭했을 때 실행하는걸로 
        },
    }
    
    podSwiper.init();
    galaxy_book4_edge_launching.init();
    // copy.click();
    // sticky.init();
    modal.init();
    modal.toggle();
    modalOrigin.init();
    // category_tab.init();
    // coupon.init();
    // promoCoupon.init();
    // sns.init();

    // 카운트다운 타이머 설정
    //count.init('#count01', '2023/03/31 23:59:59');

    viewportChange(); // fold 해상도 대응
});