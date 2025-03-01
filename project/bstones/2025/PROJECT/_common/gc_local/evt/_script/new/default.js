var GCFrontV2 = {
    SwiperShortcut: function() {
        var $container = $('.shortcut_box .hscroll-wrap');
        var $scWrap  = $container.parent();

        $container.sly({
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            scrollBar: $scWrap.find('.scrollbar'),
            scrollBy: 1,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
        });
    },
    hScroll: function() {
        var $container = $('.hscroll-container');
        var $cateWrap  = $container.parent();

        $container.sly({
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            scrollBar: $cateWrap.find('.scrollbar'),
            scrollBy: 1,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
        });
    },
    copyUrl: function() {
        var btns = document.querySelectorAll('.btn_copy_url');
        var clipboard = new ClipboardJS(btns);
      
        clipboard.on('success', function(e) {
            console.log(e);
            $('.pop_copy').fadeIn();
            setTimeout(function() {
                $('.pop_copy').fadeOut();
            }, 1000 );
        });
    },
    replySticky: function() {
        var stickyEl = $('.reply_sticky');
        var stickyStartTop = $(".reply_container").offset().top;
        var stickyStartEnd = stickyStartTop + $(".reply_container").height();
        var winH = document.documentElement.clientHeight;

        $(window).on("load resize scroll", function() {
            var st = $(this).scrollTop();

            if(st + winH >= stickyStartTop + stickyEl.height() && st + winH <= stickyStartEnd) {
                stickyEl.addClass('fixed');
            } else {
                stickyEl.removeClass('fixed');
            }
        });
    },
    replyEllipsis: function() {
        var replyEls = $('.reply_cont.type_ellipsis');
        $(replyEls).on("click", function(_this){
        	var replyEl = $(_this["target"]);
	        var textEl = replyEl.find('textarea');
	
	        //replyEl.on('click', function() {
	            if(replyEl.hasClass('type_ellipsis')) {
	            	replyEl.removeClass('type_ellipsis');
	                textEl.height(textEl.prop('scrollHeight'));
	            }
	            else return false;
	        //}); 
	        GCFrontV2.replySticky();
        })
    },
}
$(document).ready(function() {
    var rsEl = document.querySelector('.reply_sticky');

    GCFrontV2.SwiperShortcut();
    GCFrontV2.hScroll();
    GCFrontV2.copyUrl();
    GCFrontV2.replyEllipsis();
    /*GCFrontV2.replySticky();
    
    $(window).on("resize", function() {
        if(rsEl) GCFrontV2.replySticky();
    });
    */
});



function tooltipBottom(e, t, w, b) {
    e = $(e);
    t = $("." + t);
    var widths = w,
        aria = "aria-selected";
    if (event) event.stopPropagation();
    $(".tooltip-layer").fadeOut(200);
    if (ariaBox !== undefined) ariaBox.attr(aria, false);
    e.attr(aria, true);
    ariaBox = e;
    $(window).resize(function() {
        var winw = $(window).width();
        var top = $("#header").height();
        if (winw > 800) {
            var left;
            var leftover = e.offset().left - widths / 2 - e.innerWidth() / 2;
            var rightover = e.offset().left + widths;
            top = e.offset().top + e.height() - top;
            if (leftover < 24) left = widths / 2 + 24;
            else if (rightover >
                winw) left = winw - widths / 2 - 24;
            else left = e.offset().left + e.innerWidth() / 2;
            t.css({
                maxWidth: widths + "px",
                left: left,
                right: "auto",
                top: top + 17,
                transform: "translateX(-50%)"
            })
        } else {
            top = e.offset().top + e.height() - top;
            if (b == "fixed") t.addClass("fixed");
            else t.removeClass("fixed");
            t.css({
                maxWidth: 100 + "%",
                left: 12 + "px",
                right: 12 + "px",
                top: top + 17,
                transform: "none"
            })
        }
        console.log(top);
    }).resize();
    $(window).trigger('resize');
    t.fadeIn(200);
    t.find(".btn-tooltip-close").focus();
    t.find(".share-tooltip-box li:first-child a").focus();
    t.find(".btn-tooltip-close").on("click",
        function() {
            ariaBox.attr(aria, false);
            $(this).parent().fadeOut(200);
            if (!$(this).closest(".tooltip-layer").data("inner-slick-link"))
                if ($("#commonAlert").is(":visible"));
                else e.focus()
        });
    $("#pd-tooltip-close").on("keydown", function(e) {
        if (!event.shiftKey && (event.keyCode || event.which) === 9) {
            event.preventDefault();
            $(".pd-copylink").focus()
        }
    });
    return false
}

