$(document).ready(function(){
    const $secWrap = $('.sec_project_wrap');

    function notiHoverEvt(){
        if ($(window).outerWidth() <= 768){
            $secWrap.find('.pt_benefit__noti-btn').on('click', function(){
                console.log('click');
                
                $(this).siblings('.pt_benefit__noti-area-hover').css("display", "flex");
            });
            $('html, body').on('touchstart', function(){
                $('html, body').find('.pt_benefit__noti-area-hover').css("display", "none");
            });
            
        } else {
            $secWrap.find('.pt_benefit__noti-btn').on('mouseover', function(){
                $(this).siblings('.pt_benefit__noti-area-hover').css("display", "flex");
            });
            $secWrap.find('.pt_benefit__noti-btn').on('mouseleave', function(){
                $(this).siblings('.pt_benefit__noti-area-hover').css("display", "none");
            });
        }
    }

    notiHoverEvt()
});