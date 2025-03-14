$(document).ready(function() {
    if ($(".connection-itm > div").length > 1) $(".connection-itm").slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        fade: false,
        infinite: true,
        dots: true,
        lazyLoad: "ondemand",
        responsive: [{
            breakpoint: 1280,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                fade: false
            }
        }, {
            breakpoint: 1101,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                fade: false
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                fade: false
            }
        }, {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: false,
                arrows: false,
                centerMode: true,
                centerPadding: "90px"
            }
        }, {
            breakpoint: 360,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: false,
                arrows: false,
                centerMode: true
            }
        }]
    });
    $(".dp-store-visual").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        dots: false,
        lazyLoad: "ondemand"
    });
    $(".mediaslide").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        lazyLoad: "ondemand",
        fade: true
    });
    $(".daySlick").slick({
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 7,
        dots: false,
        arrows: true,
        centerMode: false,
        touchMove: false,
        focusOnSelect: false,
        responsive: [{
            breakpoint: 800,
            settings: {
                slidesToShow: 7,
                slidesToScroll: 7,
                arrows: false,
                touchMove: true
            }
        }, {
            breakpoint: 640,
            settings: {
                slidesToShow: 7,
                slidesToScroll: 7,
                arrows: false,
                touchMove: true
            }
        }, {
            breakpoint: 360,
            settings: {
                slidesToShow: 7,
                slidesToScroll: 7,
                arrows: false,
                touchMove: true
            }
        }]
    });
    $(".modelslide").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        infinite: true,
        lazyLoad: "ondemand",
        fade: true,
        autoplay: false
    });
    $(".s-gnb-productWrap.subType3").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        lazyLoad: "ondemand",
        touchMove: false,
        vertical: true,
        verticalSwiping: true,
        responsive: [{
            breakpoint: 800,
            settings: "unslick"
        }, {
            breakpoint: 640,
            settings: "unslick"
        }, {
            breakpoint: 360,
            settings: "unslick"
        }, {
            breakpoint: 320,
            settings: "unslick"
        }]
    });
    $(".visualslide").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        infinite: false,
        asNavFor: ".visualslide-navi",
        lazyLoad: "ondemand",
        autoplay: true,
        fade: true
    });
    $(".visualslide-navi").slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: ".visualslide",
        arrows: true,
        centerMode: false,
        focusOnSelect: true
    });
    $(".viewItemslide").slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        fade: false,
        infinite: false,
        dots: false,
        centerMode: true,
        lazyLoad: "ondemand",
        responsive: [{
            breakpoint: 1280,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                fade: false
            }
        }, {
            breakpoint: 1101,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                fade: false
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                fade: false
            }
        }, {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: false,
                arrows: false,
                dots: true,
                centerMode: true,
                centerPadding: "90px"
            }
        }, {
            breakpoint: 360,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: false,
                arrows: false,
                dots: true,
                centerMode: true
            }
        }]
    });
});

// KV
$(document).ready(function() {
    $('.slider-carousel-visual:not(.gc_kv_list)').each(function(i,el){
        var $status = $('#pagingInfo-'+i);
        var $slickElement = $(el);
        $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.text(i + '/' + slick.slideCount);
        });
        $slickElement.slick({
            autoplay: true,
            slideToShow: 1,
            slidesToScroll: 1,
            dots: false,
            centerMode: false,
            // prevArrow: false,
            // nextArrow: false,
            swipeToSlide: true,
            prevArrow: $('.home-posts__arrow__prev'),
            nextArrow: $('.home-posts__arrow__next'),
            // 20220616 gc 異붽�
            responsive: [{
                breakpoint: 800,
                settings: {
                    dots: false,
                    prevArrow: false,
                    nextArrow: false,
                    pagingInfo: false,
                }
            }],
        });
    });
});