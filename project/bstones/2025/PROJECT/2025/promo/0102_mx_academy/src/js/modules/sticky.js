import { PT_STATE, util as _} from './bs_common';

export const sticky = {
    init() {
        var stickyMove = function() {
            const scrollTop = $(window).scrollTop();
            const $secNav = PT_STATE.$PROJECT.find(".sec_nav");
            const $secBuying = PT_STATE.$PROJECT.find('.sec_buying');
            const $buyingTab = $secBuying.find('[data-buying-cate]');
            const $secCompAll = PT_STATE.$PROJECT.find('.sec_comp_all');
            const $compAllTab = $secCompAll.find('.pt_slider_category_sticky');
            const $secNotice = PT_STATE.$PROJECT.find(".sec_notice");

            // sticky
            if (scrollTop <= $secNav.offset().top){
                // 최상단 ~ nav
                $secNav.removeClass('pt_fixed');
                $buyingTab.removeClass('pt_fixed');
                $compAllTab.removeClass('pt_fixed');
            } else if (scrollTop > $secNav.offset().top && scrollTop <= $buyingTab.offset().top - $secNav.outerHeight()) { 
                // nav ~ buying
                $secNav.addClass('pt_fixed');
                $buyingTab.removeClass('pt_fixed');
                $compAllTab.removeClass('pt_fixed');
            } else if (scrollTop > $buyingTab.offset().top && scrollTop <= $secBuying.offset().top + $secBuying.outerHeight() - $buyingTab.outerHeight()) { 
                // buying
                $secNav.removeClass('pt_fixed');
                $buyingTab.addClass('pt_fixed');
                $compAllTab.removeClass('pt_fixed');
            } else if (scrollTop > $secCompAll.offset().top - $secNav.outerHeight() && scrollTop <= $compAllTab.offset().top - $secNav.outerHeight()){ 
                // buying ~ compAll
                $secNav.addClass('pt_fixed');
                $buyingTab.removeClass('pt_fixed');
                $compAllTab.removeClass('pt_fixed');
            } else if (scrollTop > $compAllTab.offset().top && scrollTop <= $secNotice.offset().top - $compAllTab.outerHeight()){ 
                // compAll ~ notice
                $secNav.removeClass('pt_fixed');
                $buyingTab.removeClass('pt_fixed');
                $compAllTab.addClass('pt_fixed');
            } else {
                // 지정된 범위 외외
                $secNav.removeClass('pt_fixed');
                $buyingTab.removeClass('pt_fixed');
                $compAllTab.removeClass('pt_fixed');
            }

            // nav active on scroll
            $secNav.find('.pt_nav__link').each(function(){
                const secId = $(this).attr('data-role-anchor');
                const $target = $('#' + secId);

                if (scrollTop <= $secNav.offset().top) {
                    // 혜택 only
                    $secNav.find('[data-role-anchor="sec_benefit"]').parent().addClass('pt_on').siblings().removeClass('pt_on');
                } else if (scrollTop > $secCompAll.offset().top - $secNav.outerHeight() && scrollTop <= $secNotice.offset().top - $secNav.outerHeight()){
                    // 컴포넌트 only
                    $secNav.find('[data-role-anchor="sec_comp_all"]').parent().addClass('pt_on').siblings().removeClass('pt_on');
                } else {
                    // 혜택 & 컴포넌트 외 모든 영역
                    if (scrollTop > $target.offset().top - $secNav.outerHeight() && scrollTop <= $target.offset().top + $target.outerHeight() - $secNav.outerHeight()){
                        $(this).parent().addClass('pt_on').siblings().removeClass('pt_on');
                    } else {
                        $(this).parent().removeClass('pt_on');
                    }
                }
            });
        }

        $(window).on('scroll.sticky', stickyMove);
    }

};