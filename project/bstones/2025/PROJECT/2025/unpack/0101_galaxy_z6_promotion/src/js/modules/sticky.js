import { PT_STATE, util as _} from './bs_common';

export const sticky = {
    init() {
        var stickyMove = function() {
            if($(window).scrollTop() > $('.sec_notice').offset().top - $(window).outerHeight()){
                $('.pt_btn-box').hide();
                // console.log('st',$(window).scrollTop());
                // console.log('notice', $('.sec_notice').offset().top);
                // console.log('notice', $('.sec_notice'));
                // console.log('window',$(window).outerHeight());
            }else{
                $('.pt_btn-box').show();
            }       
        }

        $(window).on('scroll.sticky', stickyMove);
    }
};
