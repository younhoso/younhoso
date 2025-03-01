import { PT_STATE, util as _} from './bs_common';

export const sticky = {
  init() {
      var stickyMove = function() {
        let windowSrollTop = $(window).scrollTop();
        let lnbScrollTop = $('.sec_lnb').offset().top
        let tabScrollTop = $('.sec_tab').offset().top
        let footerScrollTop = $('.sec_notice').offset().top

        let lnbHeight = $('.sec_lnb').outerHeight();
        let tabHeight = $('.sec_tab').outerHeight();


         // LNB 네비바 스티키
        if (windowSrollTop >= lnbScrollTop  && windowSrollTop <= footerScrollTop - lnbHeight - tabHeight){
          $('.lnb_wrapper').addClass('fixed_start');
        }else{
          $('.lnb_wrapper').removeClass('fixed_start');
        }

        // 카테고리 네비바 스티키
        if (windowSrollTop >= tabScrollTop - lnbHeight  && windowSrollTop <= footerScrollTop - lnbHeight - tabHeight){
          $('.pt_tab__wrap').addClass('fixed_start');
        }else{
            $('.pt_tab__wrap').removeClass('fixed_start');
        }
      }

      $(window).on('scroll.sticky', stickyMove);
  }

};