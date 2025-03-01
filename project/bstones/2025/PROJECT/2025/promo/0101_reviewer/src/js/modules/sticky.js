import { PT_STATE, util as _} from './bs_common';

export const sticky = {
  init() {
      var stickyMove = function() {

          var _navHeight = $('.sec_kv').outerHeight();
          let navHeight = $('.sec_nav').outerHeight();
          let navPosition = $('.sec_nav .inner_1440').offset().top;
          let scrollPosition = $(window).scrollTop();
          let snsPosition = $(window).scrollTop() >= $('.sec_event').offset().top - navHeight;

          if (scrollPosition >= navPosition && scrollPosition <= $('.sec_notice').offset().top){
            $('.sec_nav').addClass('fixed');
            $('.sec_nav li').removeClass('on');
            $('.sec_nav li').eq(0).addClass('on');
            // console.log('111')
            if(snsPosition){
            //   $('.sec_nav').removeClass('fixed');
              $('.sec_nav li').removeClass('on');
              $('.sec_nav li').eq(1).addClass('on'); 
            //   console.log('222')
            } 
          } else {
            $('.sec_nav').removeClass('fixed');
            // console.log('kv & notice')
          }



      }

      $(window).on('scroll.sticky', stickyMove);
  }

};