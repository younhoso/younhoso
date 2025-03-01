import { PT_STATE, util as _ } from './modules/bs_common';
import { tab } from './modules/tab';
import { sticky } from './modules/sticky';

$(document).ready(function(){

    function swiperEvt() {
        let kvSwiper = new Swiper('.swiper-container.kv_swiper--active', {
            slidesPerView: 'auto',
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            allowTouchMove: true,
            preloadImages: false,
            lazy: true,
            loop: true,
            watchOverflow : true,
            pagination: {
                el: ".swiper_pagination",
                clickable: true,
            },
            // breakpoints: {
            //     769: {
            //         allowTouchMove: true,
            //     }
            // },
            on: {
                breakpoint: function() {
                    var that = this;
                    setTimeout(function () {
                        that.slideTo(0, 0);
                    }, 150);
                },

                init: function() {

                    // 정지/ 재생 버튼
                    var $target = $(this.$el).find('.swiper_play');
                    $target.click(function(){
                        const swiper = $(this).closest('.swiper-container')[0].swiper;
                        if ($target.hasClass('on')){
                            console.log(this);
                            $(this).removeClass('on').attr('title','재생')
                            swiper.autoplay.stop(); 
                        } else {
                            $(this).addClass('on').attr('title','일시정지')
                            swiper.autoplay.start();
                        }
                    });
                },
                slideChange: function(){
                    const activeIndex = this.activeIndex;
                    const $activeSlide = $(this.slides[activeIndex]);
                    if($activeSlide.hasClass('pt_ty-black')){
                        $('.kv_swiper').addClass('pt_ty-black');
                    } else {
                        $('.kv_swiper').removeClass('pt_ty-black');
                    }

                }
            }
        })


        let lnbswiper = new Swiper('.swiper-container.pt_lnb-swiper', {
            slidesPerView: 'auto',
            autoplay: false,
            allowTouchMove: true,
            preloadImages: false,
            lazy: true,
            navigation: {
                nextEl: $('.sec_lnb').find(".swiper-button-next"),
                prevEl: $('.sec_lnb').find(".swiper-button-prev"),
            },
            breakpoints: {
                769: {
                    allowTouchMove: false,
                }
            },
        })
    }

    tab.click([
        {
            el: '[data-role-tab="sec_tab"]',
            target: '#tab01',
            default: 0
        },
    ]);

    
    sticky.init();
    swiperEvt();
    viewportChange(); // fold 해상도 대응
});
