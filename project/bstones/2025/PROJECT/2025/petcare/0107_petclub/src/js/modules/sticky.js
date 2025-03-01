import { PT_STATE, util as _} from './bs_common';

export const sticky = {
  init() {
      var stickyMove = function() {
          var _navHeight = $('.sec_lnb').outerHeight();

        //   if ($(window).scrollTop() >= $('.sec_lnb').offset().top && $(window).scrollTop() <= $('.sec_notice').offset().top - _navHeight){
          if ($(window).scrollTop() >= $('.sec_lnb').offset().top ){
              $('.lnb_wrapper').addClass('fixed_start');
          }else{
              $('.lnb_wrapper').removeClass('fixed_start');
          }

          console.log('??');
      }

      $(window).on('scroll.sticky', stickyMove);
  }

};