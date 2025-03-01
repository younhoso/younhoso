var GCFront = {
    gb: {
        detailHelpBox: true,
        scTop: 0,
        hash: null,
        lock: false,
        lockCnt: 0
    },
    init: function(options) {

    },
    headerFixed: function() {
        var header = $('.container-header,.container_header');
        win = window;
        $(win).on('scroll',function(){
            var pos = $(this).scrollTop();
            if(pos >= 60){
                header.addClass('top');
            }
            else{
                header.removeClass('top');
            }
        });
    },
    detectScroll: function() {
        let oldValue = 0
        let newValue = 0
        var fixer = $('.header');
        var fixer2 = $('.appbar');
        window.addEventListener('scroll', (e) => {
            e.preventDefault();
            newValue = window.pageYOffset;
            if (oldValue < newValue) {
                fixer.addClass('hide');
                fixer2.removeClass('hide');
            } else if (oldValue > newValue) {
                fixer2.addClass('hide');
                fixer.removeClass('hide');
            }
            oldValue = newValue;
        });
    },
    detectScroll3: function() {
        let newValue = 0
        let oldValue = 0
        var fixer = $('body');
        window.addEventListener('scroll',(e)=> {
            e.preventDefault();
            newValue = document.body.scrollTop <= 0
            if (oldValue < newValue) {
                fixer.addClass('scroll-down');
            } else if (oldValue > newValue) {
                fixer.removeClass('scroll-up');
            }
            oldValue = newValue;
        });
    },
    detectScroll4: function() {
        var lastScrollTop = 0;
        // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
        element.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
            var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
            if (st > lastScrollTop){
                // downscroll code
                body.addClass('scroll-down');
                body.removeClass('scroll-up');
            } else {
                // upscroll code
                body.addClass('scroll-up');
                body.removeClass('scroll-down');
            }
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        }, false);
    },
    detectScroll5: function() {
        let oldValue = 0;
        var fixer = $('body');
        window.addEventListener('scroll', function(e){

            // Get the new Value
            newValue = window.pageYOffset;

            e.preventDefault();
            //Subtract the two and conclude
            if(oldValue - newValue < 0){
                fixer.addClass('scroll-down');
                fixer.removeClass('scroll-up');
            } else if(oldValue - newValue > 0){
                fixer.addClass('scroll-up');
                fixer.removeClass('scroll-down');
            }

            // Update the old value
            oldValue = window.pageYOffset;
        });
    },
    detectScroll2: function() {
        let oldValue = 0;
        let newValue = 0;
        var fixer = $('body');
        window.addEventListener('scroll', (e) => {
            newValue = window.pageYOffset;
            e.preventDefault();
            if (oldValue < newValue) {
                fixer.addClass('scroll-down');
                fixer.removeClass('scroll-up');
            } else if (oldValue > newValue) {
                fixer.addClass('scroll-up');
                fixer.removeClass('scroll-down');
            }
            oldValue = window.pageYOffset;
        });
    },
    commonTab: function() {
        $(function() {
            $("#tabs,#keywordTab,.tab_guide,.gc_tab").tabs();
        });
    },
    gcComonTab: function() {
        $(function() {
            $(".gc_tab").tabs();
        });
    },
    sticky: function() {
        //STICKY
        // $(document).ready(function() {
        //     window.onscroll = function() {myFunction()};

        //     var header = document.getElementById("navSub");
        //     var sticky = header.offsetHeight;

        //     function myFunction() {
        //         if (window.pageYOffset >= sticky) {
        //             header.classList.add("sticky");
        //         } else {
        //             header.classList.remove("sticky");
        //         }
        //     }
        // });
    },
    swipeKeyword: function() {
        // �몃옖�� �ㅼ썙��
        var exhibitionSwiper = new Swiper('.swiper-keyword', {
            slidesPerView: "auto",
            spaceBetween: 12,
            touchEventsTarget: 'wrapper',
            // loop: true,
            // freeMode: true,
            // centeredSlides: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });
    },
    swipeKeyword2: function() {
        var exhibitionSwiper = new Swiper('.swiper-keyword', {
            slidesPerView: "auto",
            spaceBetween: 20,
            loop: true,
            freeMode: true,
            centeredSlides: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
        });
    },
    swipeHero: function() {
        // hero
        var exhibitionSwiper = new Swiper('.swiper-hero', {
            slidesPerView: 1,
            spaceBetween: 15,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            }
        });
    },
    swipeToast: function(notLoop) {
    	var loop = true;
    	
    	if(notLoop) {
    		loop = false;
    	} 
        // Toast
        var exhibitionSwiper = new Swiper('.swiper-toast', {
            slidesPerView: 1,
//            spaceBetween: 15,
            loop: loop,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            observer: true,
            observeParents: true,
            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
                clickable: true,
            },
        });
        exhibitionSwiper.update();
    },
    swipePf: function() {
        // product
        var pfSwiper = new Swiper('.swiper-pf', {
            slidePerView: 2,
            spaceBetween: 15,
            freeMode: true,
            loop: true,
            centeredSlides: true,
        });
    },
    swipeBanner: function() {
        // banner
        var bnrSwiper = new Swiper('.swiper-bnr', {
            // direction: 'vertical',
            slidePerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    },
    swipeNotice: function() {
        // notice
        var noticeSwiper = new Swiper('.swiper-notice', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: false, // 20220713 gc �섏젙
            centeredSlides: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    },
    swipeRanking: function() {
        // Ranking
        var rankingSwiper = new Swiper('.swiper-ranking', {
            direction: 'vertical',
            slidesPerView: "auto",
            spaceBetween: 0,
            freeMode: true,
            centeredSlides: true,
        });
    },
    swipeShortcut: function() {
        // shortcut
        var shortcutSwiper = new Swiper('.swiper-shortcut', {
            slidesPerView: "auto",
            spaceBetween: 12,
            loop: true,
            freeMode: true,
            centeredSlides: true,
            autoplay:true
        });
    },
    btnToggle: function() {
        $('.btn-tgl,.btn_tgl,.list_item.has_depth > a').on('click', function() {
            $(this).toggleClass('on');
            return false;
        });
    },
    btnToggle2: function() {
        $('.btn-tgl2').on('click', function() {
            $(this).toggleClass('on');
            $('.ranking .swiper').toggleClass('swiper-ranking');
            GCFront.swipeRanking('refresh');
            return false;
        });
    },
    gnbOpen: function() {
        $('.gnb_open').on('click',function() {
            $('body').toggleClass('bnb_up');
            return false;
        });
    },
    commonAccordion: function() {
        $(".gc_accordion").accordion({
            heightStyle: "content",
            collapsible: true,
            icons: false,
            active: false,
            disable: 4,
        });

    },
    catOpen: function() {
        $('.cat_open').on('click', function() {
            $(this).toggleClass('on');
            $('.container_header').toggleClass('open');
            return false;
        });
    },
    catOpen2: function() {
        $('.depth2_open').on('click mouseover', function() {
            $(this).toggleClass('on');
            $('.header').toggleClass('open');
            return false;
        });
        // $('.depth2_open').on('mouseleave', function() {
        //     $(this).removeClass('on');
        //     $('.header').removeClass('open');
        //     return false;
        // })
    },
    catOpen3: function() {
        $(document).mouseup(function (e)
        {
            var container = $(".depth2_open"); // Give you class or ID
            if (!container.is(e.target) &&            // If the target of the click is not the desired div or section
                container.has(e.target).length === 0) // ... nor a descendant-child of the container
            {
                container.hide();
            }
        });
    },
    swipeTab: function() {
        // swipeTab
        var menu = ['硫붾돱 1', '�⑥꽦異붿쿇', '�ъ꽦異붿쿇', '�곗씪由�']
        var tabSwiper = new Swiper('.swiper-tab', {
            slidesPerView: 1,
            keyboard: {
                enabled: true,
            },
            pagination: {
                el:'.swiper-pagination',
                clickable: true,
                renderBullet: function(index, className) {
                    return'<span class="' + className + '">' + (menu[index]) + '</span>';
                }
            },
            // touchEventsTarget: 'wrapper',
        });
    },
    hScroll: function() {
        $('.hscroll-wrap,.nav-sub,.nav_sub').sly({
            horizontal: 1,
            itemNav: 'centered',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            //startAt: 4,
            //scrollBar: $wrap.find('.scrollbar'),
            scrollBy: 1,
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
        });
    },
    // 20220524 gc 異붽� : 硫붿씤 而ㅻ��덊떚 horizontal swiper
    hScroll2: function() {
        var $frame = $('.gc_hscroll');
        var $wrap  = $frame.parent();
        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            activateMiddle: 1,
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBar: $wrap.find('.scrollbar'),
            scrollBy: 1,
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
            // Cycling
            cycleBy: 'items',
            cycleInterval: 3000,
            pauseOnHover: 1,
            // startPaused: false,
        });
        // $frame.reload();
    },
    layerPopup: function() {
        // LAYER POPUP
        var closeBtn2 = ".btn-box .btn";
        $(document).on("click", closeBtn2, function(e){
            e.preventDefault();
            $(this).parents('.layer-pop').hide();
            // close($(this).data("activeTarget"));
            $("body").css("overflow","");
            $(".mask").fadeOut("fast").remove();
        });
    },
    popup: {
        zIndex: 1001,
        open: function(target, close, cbfunc, closeFunc) {
            console.log('�앹뾽�닿린 : ' + target);

            var _this = this,
                effect = $(target).data('effect');

            $(target).css('z-index', _this.zIndex++);

            if (effect == 'fade') {$(target).fadeIn();}
            else {$(target).show();}

            GCFront.lock(true);

            if (!$(target).hasClass('layer-pop')) _this.autoHeight(target);

            if (close == undefined || close) {
                $('.pop-close', target).off('click').on('click', function() {
                    if (typeof(closeFunc) == 'function') closeFunc();
                    _this.close(target);
                    GCFront.layerClose();
                    return false;
                });
            }
            // 2媛� �댁긽 �덉씠�댄뙘�� �곕븣 dimmed �ロ엳�� �꾩긽 泥섎━ popClose�� exctDim �대옒�� 異붽�
            if (close == undefined || close) {
                $('.pop-close.exctDim', target).off('click').on('click', function() {
                    if (typeof(closeFunc) == 'function') closeFunc();
                    _this.close(target);
                    // MCFront.layerClose();
                    return false;
                });
            }

            if (typeof(cbfunc) == 'function') {
                $('.btnConfirm', target).off('click').on('click', function() {
                    cbfunc();
                });
            }
            GCFront.layerOpen();
            return false;
        },
        close: function(target) {
            console.log('�앹뾽�リ린 : ' + target);
            $(target).hide();
            $('.inner', target).removeAttr('style');
            GCFront.lock();

        },
        autoHeight: function(target) {
            var maxH = $(window).height() - 80,
                height = $(target).data('height'),
                targetH = (height == undefined) ? $('.inner', target).outerHeight() : height;

            if (targetH >= maxH) targetH = maxH;
            $('.inner', target).css({
                'height' : targetH,
                'margin-top' : -(targetH / 2)
            });
        }
    },
    layerOpen: function(){
        layerDom = "";
        layerDom += '<div class="dimmed"></div>';
        $(".wrap").append(layerDom).bind('touchmove mousewheel', function(e){
            e.preventDefault();
        });
    },
    layerOpen2: function(){
        layerDom = "";
        layerDom += '<div class="mask"></div>';
        $(".wrap").append(layerDom).bind('touchmove mousewheel', function(e){
            e.preventDefault();
        });
    },
    layerClose: function(){
        $(".dimmed").remove();
        $(".wrap").unbind('touchmove mousewheel');
    },
    layerClose2: function(){
        $(".mask").remove();
        $(".wrap").unbind('touchmove mousewheel');
    },
    layerCommon :function() {
        $(document).on("click", ".layerOpen", function(e){
            e.preventDefault();
            $('.layer-pop-type2').addClass("on");
            GCFront.layerOpen2();
        })
            .mouseup(function(e) {
                var layerPop = $('.layer-pop-type2');
                if(layerPop.has(e.target).length === 0) {
                    layerPop.removeClass("on");
                    GCFront.layerClose2();
                }
            })
            .on("click", ".layer-pop-type2 .pop-close", function(e){
                e.preventDefault();
                $('.layer-pop-type2').removeClass("on");
                GCFront.layerClose2();
            });
    },
    innerScroll: function() {
        $(".scrollHidden").remove();
        GCFront.lock();
    },
    lock: function(lock) {
        if (GCFront.gb.lock) {
            var _this = this,
                winTop = $(window).scrollTop();
            if (lock) {
                GCFront.gb.lockCnt++;
                if (GCFront.gb.lockCnt > 1) return;

                _this.gb.scTop = winTop;
                $('html').addClass(winTop > 0 ? 'scIngHidden' : 'scHidden');
                $('body').addClass('scrollHidden');
                $('.contents, .footer').css('top', -winTop);
            } else {
                GCFront.gb.lockCnt--;
                if (GCFront.gb.lockCnt > 0) return;

                $('html').removeClass('scHidden scIngHidden');
                $('body').removeClass('scrollHidden');
                $('.contents, .footer').css('top', 0);
                $(window).scrollTop(_this.gb.scTop);
            }
        } else {
            if (lock) $('body').addClass('scrollHidden');
            else $('body').removeClass('scrollHidden');
        }
    },
    hidden: function() {
        GCFront.lock(true);
    },
    inputFocus: function(){
        $(document).on("focus change paste keyup", ".gc-input", function(event){
            $(event.target).parent().addClass('focus');
            if ($(event.target).val() != "") {
                $(event.target).parent().find(".btn-clear").addClass("on");
            }
            else {
                $(event.target).parent().find(".btn-clear").removeClass("on");
            }
        })
            .on("blur", ".gc-input", function(event){
                $(event.target).parent().removeClass('focus');
                setTimeout(function(){
                    $(event.target).parent().find(".btn-clear").removeClass("on");
                }, 1);
            })
            .on("click", ".btn-clear", function(event){
                $(event.target).removeClass("on").parent().find(".gc-input").focus().val("");
            });
    },
    scrolled: function() {
        $(window).scroll(function() {
            var targt = $('body').offset().top;
            if($(document).scrollTop() > targt) {
                $('.header').addClass('headerScrolled');
            }
            else {
                $('.header').removeClass('headerScrolled');

            }
        });
    },
    commonFooter: function() {
        $("#footer .footer_com_btn").click(function(){
            console.log('aa');
            $(this).toggleClass("on");
            $("#footer .info-detail").toggleClass("active");
        });
    },
    // resizeInit: function(){
    //   $(window).on('resize',function() {
    //       $('.hscroll-wrap,.nav-sub').sly.reload();
    //   });
    //
    // },
    resizeInit: function() {
        // sly reload
        $(window).on('resize',function(){
            $('.hscroll-wrap,.nav-sub,.gc_hscroll').data('sly').reload();
        });
    },
}
// AS_IS base.js
var viewportChange = function() {
    var pcView = "width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1, user-scalable=0";
    var normalView = "width=device-width,initial-scale=1.0";
    var viewPort = document.querySelector('[name="viewport"]');

    function widthChk() {
        var winW = window.outerWidth;
        if (device.agent !== undefined)
            if (device.agent.indexOf("iphone") > -1 || device.agent.indexOf("ipad") > -1 || device.agent.indexOf("android") > -1)
                if (540 < winW && winW < 1100) viewPort.setAttribute("content", pcView);
                else viewPort.setAttribute("content", normalView)
    }
    widthChk();
    window.addEventListener("resize",
        function() {
            if (viewPort.getAttribute("content") == pcView || viewPort.getAttribute("content") == normalView) widthChk();
            else return false
        })
};
! function() {
    viewportChange()
}();