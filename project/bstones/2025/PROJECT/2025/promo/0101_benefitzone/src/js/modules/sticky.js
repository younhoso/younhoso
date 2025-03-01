import { PT_STATE, util as _} from './bs_common';

export const sticky = {
    init() {
        // bespoke 청소기
        let tabIndex = 0;

        function setBlindTxt($this) {
            $this.closest('.sec_nav').find('li a .blind').remove();
            $this.append('<span class="blind">선택됨</span>');
        }

        const navArr = ['#sec_nav_benefit'];

        let stickyMove = function() {
            const scrollTop = $(window).scrollTop();

            navArr.forEach((item) => {
                if ($(item).hasClass('pt_page_hide')) return false;

                const $secNav = $(item);
                const $nav = $secNav.find('.pt_sticky');
                const _navHeight = $nav.outerHeight();
                const ancArr = $nav.find('[data-role-anchor]');

                if (scrollTop >= $secNav.offset().top && scrollTop <= $('.sec_notice').offset().top - _navHeight){
                     // 240216 푸터 조건 삭제 && scrollTop <= $('.sec_notice').offset().top - _navHeight
                    $nav.addClass('pt_fixed');
                }
                else {
                    $nav.removeClass('pt_fixed');
                }

                for (let i = 0; i < ancArr.length; i++) {
                    const $btn = $(ancArr[i]);
                    const target = $btn.attr('data-target');
                    const nextTarget = i + 1 == ancArr.length ? '.sec_notice' : $(ancArr[i +1]).attr('data-target');

                    if (scrollTop >= $(target).offset().top + _.pxToVw(-100, -120) && scrollTop < $(nextTarget).offset().top + _.pxToVw(-100, -120)) {
                        const $sibing = $btn.closest('li').siblings().find('[data-role-anchor]');
                        $sibing.removeClass('on');
                        $btn.addClass('on');
                        setBlindTxt($btn);
                        
                        break;
                    }else {
                        $btn.removeClass('on');
                    }
                }
            });
        }

        stickyMove();
        
        $(window).on('scroll.sticky', stickyMove);
    }
};