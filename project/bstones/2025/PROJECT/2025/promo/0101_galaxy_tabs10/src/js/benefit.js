
// 롤링배너 슬라이드
function rollingSwiper(){

    //혜택 롤링배너 슬라이드
    const rollingSlide = new Swiper ('.pt_rolling-slide',{
        nested: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        allowTouchMove: true,
        // effect: 'fade',
        speed: 200,
        slidesPerView: 'auto',
        loop: true,
        pagination: {
            el: '.pt_controls__page',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.pt_controls__nav--next',
            prevEl: '.pt_controls__nav--prev'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        preloadImages: false,
        lazy: true,
        on: {
            init: function(){
                // play & pause
                $('.pt_controls__play').on('click', function() {
                    $(this).toggleClass('pt_controls__paused');
                    if($(this).hasClass('pt_controls__paused')) {
                        rollingSlide.autoplay.start();
                    } else {
                        rollingSlide.autoplay.stop();
                    }
                });
            },
            breakpoint: function () {
                var that = this;
                setTimeout(function () {
                    that.slideTo(0, 0);
                }, 150);
            },
        },
    });

}

// 혜택 슬라이드
function bnfSwiper(){
    
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

                let offsetTop = $('.sec_benefit .pt_title').offset().top;
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
}

// 실행소스 참고는 BS스크립트 3버전을 참고해주세요. PROJECT/00_bs_script_v3
$(document).ready(function(){

    PT_STATE.module.tab.click([
        {
            el: '[data-role-tab="pt_tab-bnf"]',
            target: '#tab_bnf',
            default: 0
        },    
    ]);

    // 롤링배너 슬라이드
    rollingSwiper();

    // 혜택 슬라이드
    bnfSwiper();

    // fold 해상도 대응
    viewportChange(); 

});
