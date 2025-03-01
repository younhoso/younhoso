import { PT_STATE, util as _ } from './modules/bs_common';
import { anchor } from './modules/anchor';
import { sticky } from './modules/sticky';

// 필요 한 부분만 남기고 제거해서 사용해주세요. 
// 실행소스 참고는 BS스크립트 3버전을 참고해주세요. PROJECT/00_bs_script_v3
$(document).ready(function(){
    function popupBanner(){
        $('.pt_popup__close').on('click', function(){
            $('.pt_popup').hide();
        })
    }

    function setSwiper() {
        //pod 스와이퍼
        $('.pt_pod__container').each(function(){
            let podSwiper;
            let $this = $(this);
            podSwiper = new Swiper(this,{
                slidesPerView: 'auto',
                allowTouchMove: true,
                observer: true,
                observeParents: true,
                preloadImages: false,
                watchOverflow : true,
                lazy: true,
                navigation: {
                    nextEl: $this.siblings(".pt_arrow.pt_arrow__next"),
                    prevEl: $this.siblings(".pt_arrow.pt_arrow__prev"),
                },
                on: {
                    breakpoint: function() {
                        var that = this;
                        setTimeout(function () {
                            that.slideTo(0, 0);
                        }, 150);
                    },
                }
            });
        });

        //lnb스와이퍼
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
        
        // 브랜드 스와이퍼
        let brandSlide = new Swiper('.pt_brand__slide',{
            slidesPerView: 'auto',
            allowTouchMove: true,
            preloadImages: false,
            lazy: true,
            navigation: {
                prevEl: ".pt_brand__navi.pt_brand__navi--prev",
                nextEl: ".pt_brand__navi.pt_brand__navi--next",
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
            }
        });


        let pointSwiper = new Swiper('.pt_point',{
            slidesPerView: 'auto',
            // allowTouchMove: true,
            // observer: true,
            // observeParents: true,
            // preloadImages: false,
            // watchOverflow : true,
            // lazy: true,
            // navigation: {
            //     nextEl: $this.siblings(".pt__arrow.pt__arrow__next"),
            //     prevEl: $this.siblings(".pt__arrow.pt__arrow__prev"),
            // },
        });


        //event스와이퍼
        let eventswiper = new Swiper('.swiper-container.pt_event__wrap--active', {
            slidesPerView: 'auto',
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            loop: true,
            allowTouchMove: true,
            preloadImages: false,
            lazy: true,
            navigation: {
                prevEl: ".pt_event__navi.pt_event__navi--prev",
                nextEl: ".pt_event__navi.pt_event__navi--next",
            },
            pagination: {
                el: ".swiper-pagination.pt_event__pagination",
                type: 'bullets',
                clickable: true,
            },
            on: {
                breakpoint: function() {
                    var that = this;
                    setTimeout(function() {
                        that.slideTo(0, 0);
                    }, 150);
                },
                init: function(){
                    const btnStop = document.querySelector('.pt_pause')
                    const btnPlay = document.querySelector('.pt_play')
                    btnStop.addEventListener('click', function(){
                        // e.preventDefault();
                        eventswiper.autoplay.stop()
                        btnPlay.classList.add('pt_block')
                        btnStop.classList.remove('pt_block')
                    })

                    btnPlay.addEventListener('click', function(){
                        // e.preventDefault();
                        eventswiper.autoplay.start()
                        btnStop.classList.add('pt_block')
                        btnPlay.classList.remove('pt_block')
                    })
                    
                }
            }
        })

        

    }
    

    anchor.load([
        {
            url: 'curation',
            target: '.sec_pod',
            scroll: [-60, -270]
        },
        {
            url: 'event',
            target: '.sec_event',
            scroll: [-140, -400]
        }
    ]);
    sticky.init();
    setSwiper();
    popupBanner();
    viewportChange(); // fold 해상도 대응
});
