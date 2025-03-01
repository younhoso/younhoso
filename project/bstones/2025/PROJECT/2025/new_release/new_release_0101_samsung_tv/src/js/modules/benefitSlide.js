import { PT_STATE, util as _} from './bs_common';

const $window = $(window);

export const benefitSlide = {
    init() {
        // console.log('this.var', this.var);
        const contsSwiper = this.swiper_conts();
        const navSwiper = this.swiper_nav();
        this.var.swiperIns = { contsSwiper, navSwiper }
        // console.log('this.var2', this.var);
    },


    var: {
        swiperIns: null,
        navs: document.querySelectorAll('.buying_benefit_swiper .buying_benefit--item'),
    },

    swiper_nav() {
        let _this = this;

        // console.log('?????????_this', _this)
        return  new Swiper(".buying_benefit_swiper", {
            slidesPerView: "auto",
            observer: true, // 팝업 등 숨겨져있는 상태에서 옵저버 
            observeParents: true, // 팝업 등 숨겨져있는 상태에서 옵저버 
   
            // navigation: {
            //     prevEl: '.buying_conts_swiper .pt-swiper-prev',
            //     nextEl: '.buying_conts_swiper .pt-swiper-next',                
            // },
         
            autoplay: { // 오토플레이 모바일에서만 작동되게 하려면
                enabled: false,
            },
            breakpoints: {
                320: { // 320 이상
                    slidesPerView: "auto",
                    autoplay: { // 오토플레이 모바일에서만 작동되게 하려면
                        enabled: true,
                        delay: 3000,
                    },
                },
                768: { // 768 이상
                    slidesPerView: "auto",
                }
            },
            on: {
                slideChange: function() {}, // 슬라이드 변경 (오토는 불가)
                transitionEnd: function() {},  // 변경 후 (오토 가능)
                transitionStart: function() {
                    // _this.contsMove(this.activeIndex)
                }, 
                click: function() {
                    // console.log(this.clickedIndex)
                    // console.log('click', this.clickedIndex);
                    _this.contsMove(this.clickedIndex)
                },
              
                breakpoint: function () {  // 브렉포인트 지나갈때마다
                    var that = this;
                    setTimeout(function () {
                        that.slideTo(0, 0);
                    }, 150);
                },
                init: function() {},
            },
        });

    },
    swiper_conts() {
        let _this = this;
        return new Swiper(".buying_conts_swiper", {
            slidesPerView: "auto",
            observer: true, // 팝업 등 숨겨져있는 상태에서 옵저버 
            observeParents: true, // 팝업 등 숨겨져있는 상태에서 옵저버 
            

            // navigation: {
            //     prevEl: '.test_1 .pt-swiper-prev',
            //     nextEl: '.test_1 .pt-swiper-next',                
            // },
            pagination: {
                el: ".buying_conts_swiper .swiper-pagination",
            },
            autoplay: { // 오토플레이 모바일에서만 작동되게 하려면
                enabled: false,
            },
            breakpoints: {
                320: { // 320 이상
                    slidesPerView: "auto",
                    autoplay: { // 오토플레이 모바일에서만 작동되게 하려면
                        enabled: true,
                        delay: 3000,
                    },
                },
                768: { // 768 이하
                    slidesPerView: "auto",
                }
            },
            on: {
                slideChange: function() {}, // 슬라이드 변경 (오토는 불가)
                transitionEnd: function() {},  // 변경 후 (오토 가능)
                transitionStart: function() {
                    _this.navMove(this.activeIndex);
                },
                breakpoint: function () {  // 브렉포인트 지나갈때마다
                    var that = this;
                    setTimeout(function () {
                        that.slideTo(0, 0);
                    }, 150);
                },
                init: function() {},
            },
        });

    },

    navMove(idx) {
        // console.log('?nav move', idx)
        this.var.swiperIns.navSwiper.slideTo(idx)
    },

    contsMove(idx) {
        // console.log('?conts move', idx);
        this.var.swiperIns.contsSwiper.slideTo(idx)
    },

    tp() {
        // console.log('tp', this);
        return 11
    },
   
};