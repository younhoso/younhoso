import { PT_STATE, util as _ } from './modules/bs_common';
import { modal } from './modules/modal';

function imgLozad() {
    const observerbg = lozad(".pt_bg-image", {
        loaded: function (el) {
            el.classList.add("pt_add-bg");
        },
    });
    observerbg.observe();
}

// benefit_card
const benefitzone_card = {
    tabSwiper : {
        // 혜택 슬라이드 
        variables: {
            modelNavs: document.querySelectorAll('.pt_menu .pt_menu__item'),
            modelConts: document.querySelectorAll('.pt_cont__container .pt_cont__item'),
            swiperIns: null,
            // ttt: console.log('this?', this)
        },
        lineModelSwiper() {
            let _this = this;

            // nav swiper 
            const navSwiper = new Swiper(".pt_menu", {
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
                on: {
                    init: function() {
                        $('.pt_menu .pt_menu__item.active').append('<span class="blind selected_option">선택됨</span>');
                    },
                    transitionStart: function() {
                        // 네비 이동 시 컨텐츠 스와이프 이동
                        if(document.body.clientWidth > 768) {
                            contentSwiper.slideTo(this.activeIndex, 500);
                        };
                    }, 
                    slideChangeTransitionEnd: function() {
                        $('.pt_menu .pt_menu__item').find('.blind').remove();
                        $('.pt_menu .pt_menu__item.active').append('<span class="blind selected_option">선택됨</span>');
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
            const contentSwiper = new Swiper(".pt_cont__container", {
                slidesPerView: 'auto',
                observer : true, 
                observeParents : true,
                preloadImages: false,
                // lazy: true,
                lazy: {
                    loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
                    // loadPrevNextAmount: 5 
                },
                nested: true,
                allowTouchMove: true,
                // loop: true,
                pagination: {
                    el: ".pt_cont__container .pt_cont__pagination",
                    clickable : true,
                },
                on: {
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
                        $(".pt_cont__item.swiper-slide-active").find('a').attr("tabindex","0");
                        let swiperContainer = document.querySelector('.pt_cont__container');
                        swiperContainer.classList.add('pt_blk');
                    },
                    transitionStart: function() {
                        _this.lineModelNav(this.activeIndex);
                        navSwiper.slideTo(this.activeIndex, 500);
                        // 마지막 요소에 접근 시 activeIndex가 마지막 요소 못잡는 이슈 해결
                        // if(this.isEnd) {
                        //     _this.lineModelNav(this.activeIndex + 1);
                        // }
                    },
                    transitionEnd: function() {
                        $(".pt_cont__item").find('a').attr("tabindex","-1");
                        $(".pt_cont__item.swiper-slide-active").find('a').attr("tabindex","0");
                    },
                    slideChange: function () {
                        let swiperContainer = document.querySelector('.pt_cont__container');
                        if (this.activeIndex >= 0 && this.activeIndex <= 2) {
                            swiperContainer.classList.add('pt_blk');
                        } else {
                            swiperContainer.classList.remove('pt_blk');
                        }
                    },
                    slideChangeTransitionEnd: function() {
                        $('.pt_menu .pt_menu__item').find('.blind').remove();
                        $('.pt_menu .pt_menu__item.active').append('<span class="blind selected_option">선택됨</span>');
                    }
                    // init: function() {
                    //     $(this.el).find('.swiper-slide').attr('tabindex', -1);
                    //     $(this.el).find('.swiper-slide.swiper-slide-active').attr('tabindex', 0);                    
                    // },
                },
                navigation: {
                    nextEl: ".swiper-button-next.pt_cont__btn-next",
                    prevEl: ".swiper-button-prev.pt_cont__btn-prev",
                },
                a11y: {
                    prevSlideMessage: '이전 슬라이드',
                    nextSlideMessage: '다음 슬라이드',
                    slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
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
            });

            // pc에서는 autoplay x, mo에서는 autoplay
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 768) {
                    contentSwiper.autoplay.stop();
                } else {
                    contentSwiper.autoplay.start();
                }
            });

            $('.pt_menu .pt_menu__item').on('click', function() {
                $('.pt_menu .pt_menu__item').find('.blind').remove();
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

            let playPauseButton = document.querySelector('.pt_cont__btn-play');
            playPauseButton.addEventListener('click', function() {

                if (contentSwiper.autoplay.running) {
                    contentSwiper.autoplay.stop();
                    playPauseButton.innerHTML = '<span class="blind">Play</span>';
                    playPauseButton.classList.remove('pause')
                } else {
                    contentSwiper.autoplay.start();
                    playPauseButton.innerHTML = '<span class="blind">Pause</span>';
                    playPauseButton.classList.add('pause')
                }
            });

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
        this.tabSwiper.swiperStats(); // 먼저 실행하면 안됨. 클릭했을 때 실행하는걸로 

        // let resizeTimer = null;
        // window.addEventListener('resize', function() {
        //     setTimeout(() => {
        //         this.tabSwiper.swiperStats();
        //         // console.log(this.variables.swiperIns.navSwiper)
        //     }, 400)

        //     // clearTimeout(resizeTimer);
        //     // resizeTimer = setTimeout(this.tabSwiper.lineModelSwiper(), 400);
        // }, false);
    },
}

benefitzone_card.init();

$(document).ready(function(){
    modal.init();
    imgLozad();
    viewportChange(); // fold 해상도 대응
});