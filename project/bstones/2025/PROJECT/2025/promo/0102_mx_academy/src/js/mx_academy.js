import { PT_STATE, util as _ } from './modules/bs_common';
import { anchor } from './modules/anchor';
import { sticky } from './modules/sticky';
import {component_tab} from "./modules/component_tab";

const mx_academy = {
    bnfSwiperEvt(){ // 혜택 스와이퍼
        
        const benefitSlide = new Swiper ('.pt_bnf-slide',{
            // slideToClickedSlide : true,
            
            autoHeight: true,
            allowTouchMove: true,
            slidesPerView: 'auto',
            pagination: {
                el: '.pt_bnf__bullets',
                type: 'bullets',
                clickable: true,
            },
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            preloadImages: false,
            lazy: true,
            on: {
                slideChange: function() {
                    let idx = this.realIndex;
                    $('.pt_tab__btn').eq(idx).addClass('active').siblings().removeClass('active');

                    let offsetTop = $('.sec_benefit').offset().top;
                    $('body, html').animate({scrollTop : offsetTop}, 100);
                },
                breakpoint: function () {
                    var that = this;
                    setTimeout(function () {
                        that.slideTo(0, 0);
                    }, 150);
                },
            },
        });
        $('.pt_tab__btn').click(function(){
            let index = $(this).closest('a').index();
            benefitSlide.slideTo(index, 300);
        });
    },
    setBuyingEvt(){  // 바잉툴

        // swiper
        const cateSilide = new Swiper('.sec_buying .swiper-container.pt_cate', {
            slidesPerView: 'auto',
            allowTouchMove: true,
            observer:true,
            observeParents:true,
            breakpoints: {
                769: {
                    allowTouchMove: false,
                }
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

        // scroll
        $(window).off('scroll.youmakeScroll').on('scroll.youmakeScroll', function(){
            const $simulArea = $('.sec_buying');
            const $simulBox = $simulArea.find('.pt_simulator');
            const winTop = $(window).scrollTop();
    
            if(_.isMobile()) {
                if (winTop >= $simulArea.offset().top && winTop <= $simulArea.next().offset().top - $(window).outerHeight()){
                // if (winTop >= $simulArea.offset().top - $('.pt_nav').outerHeight() && winTop <= $simulArea.next().offset().top - $(window).outerHeight()){
                    $simulBox.addClass('pt_fixed');
                }else{
                    $simulBox.removeClass('pt_fixed');
                    $('[data-simul-close]').trigger('click');
                }
            }
        }).scroll();
    
        $(window).resize(function(){
            !_.isMobile() && PT_STATE.$PROJECT.find('.dimm').length ? PT_STATE.$PROJECT.find('.dimm').hide() : '';
        }).resize();

        // simul btn
        const $secWrap = $('.sec_project_wrap');
        const $simulBuyBtn = $secWrap.find('[data-role="btnBuyAll"]');
        $('.pt_btn--simul').off('click').on('click', function(){
            let simulBuyOmni = $secWrap.find('.pt_full-box').hasClass('pt_open') ? $simulBuyBtn.attr('data-omni').replace('_open','_close') : $simulBuyBtn.attr('data-omni').replace('_close','_open');
            $simulBuyBtn.attr('data-omni', simulBuyOmni);
        });

    },
    checkIos() { 
        var isIos = navigator.userAgent.toUpperCase().indexOf('SECIOS') != -1;
        if(isIos){
            // iOS 전용
            $("[data-ios-yes]").show();
            $("[data-ios-no]").remove();
        }else{
            // iOS 제외
            $("[data-ios-yes]").remove();
            $("[data-ios-no]").show();
        }
    },
    imgLozad() { // 이미지 최적화 (bg에 lozad 적용)
        const observerbg = lozad(".pt_bg-image", {
            loaded: function (el) {
                el.classList.add("pt_add-bg");
            },
        });
        observerbg.observe();
    },
    init(){
        this.bnfSwiperEvt(); // 혜택 스와이퍼
        this.setBuyingEvt(); // 바잉툴
        this.checkIos(); // 삼성앱 IOS/AOS 체크
        this.imgLozad(); // 이미지 최적화 (bg에 lozad 적용)
    }
}

$(document).ready(function(){
    anchor.click([
        {
            el: '[data-role-anchor="sec_benefit"]',
            target: '.sec_benefit',
            scroll: [-64, -98]
        },
        {
            el: '[data-role-anchor="sec_buying"]',
            target: '.sec_buying',
            scroll: [-64, -98]
        },
        {
            el: '[data-role-anchor="sec_comp_all"]',
            target: '.sec_comp_all',
            scroll: [-64, -98]
        },
        {
            el: '[data-role-anchor="pt_notice--bnf"]',
            target: '.pt_notice--bnf',
        },
        // {
        //     el: '[data-role-anchor="sec_notice"]',
        //     target: '.sec_notice',
        // },
    ]);

    // anchor.load([
    //     {
    //         url: 'test01',
    //         target: '.sec_anchor'
    //     },
    //     {
    //         url: 'test02',
    //         target: '.sec_accordian',
    //         scroll: [0, -50]
    //     },
    // ]);
    
    sticky.init();
    component_tab.init();

    mx_academy.init();
        
    viewportChange(); // fold 해상도 대응
});
