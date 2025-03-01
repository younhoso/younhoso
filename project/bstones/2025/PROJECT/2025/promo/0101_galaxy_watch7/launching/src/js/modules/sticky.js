import { PT_STATE, util as _} from './bs_common';

export const sticky = {
  init() {
      var stickyMove = function() {
          var _navHeight = $('.sec_nav').outerHeight();

          if ($(window).scrollTop() >= $('.sec_nav').offset().top && $(window).scrollTop() <= $('.sec_anchor').offset().top - _navHeight){
              $('.sticky_wrapper').addClass('fixed_start');
          }else if ($(window).scrollTop() >= $('.sec_accordian').offset().top - _navHeight && $(window).scrollTop() <= $('.sec_modal').offset().top - _navHeight){
              $('.sticky_wrapper').addClass('fixed_start');
          }else{
              $('.sticky_wrapper').removeClass('fixed_start');
          }

      }

      $(window).on('scroll.sticky', stickyMove);
  }

};