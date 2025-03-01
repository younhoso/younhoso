import { PT_STATE, util as _} from './bs_common';

export const sticky = {
    init() {
        var stickyMove = function() {
            var _navHeight = $('.sec_nav').outerHeight();          

            if (!_.isMobile()) {
                if ($(window).scrollTop() >= $('.sec_nav').offset().top && $(window).scrollTop() <= $('.sec_notice').offset().top - _navHeight) {
                    $('.sticky_wrapper').addClass('fixed_start');
                } else {
                    $('.sticky_wrapper').removeClass('fixed_start');
                }
            } else {
                if ($(window).scrollTop() + ($(window).outerHeight() - _navHeight) >= $('#footer').offset().top - _navHeight){
                    $('.sticky_wrapper').css('visibility', 'hidden');
                } else {
                    $('.sticky_wrapper').css('visibility', 'visible');
                }
            }            
        }

        $(window).on('scroll.sticky', stickyMove);
    }
};
