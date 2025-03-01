import { PT_STATE, util as _} from './bs_common';

export const sticky = {
    init() {
        var stickyMove = function() {
            var _navHeight = $('.sec_nav').outerHeight();
            if ($(window).scrollTop() >= $('.sec_nav').offset().top && $(window).scrollTop() <= $('.sec_notice').offset().top - _navHeight){
                $('.sticky_wrapper').addClass('active');
                $('.nav_wrapper').addClass('active');
            // }else if ($(window).scrollTop() >= $('.sec_accordian').offset().top - _navHeight && $(window).scrollTop() <= $('.sec_modal').offset().top - _navHeight){
            //     $('.nav_wrapper').addClass('active');
            }else{
                $('.sticky_wrapper').removeClass('active');
                $('.nav_wrapper').removeClass('active');
            }
        }

        $(window).on('scroll.sticky', stickyMove);
    }

};