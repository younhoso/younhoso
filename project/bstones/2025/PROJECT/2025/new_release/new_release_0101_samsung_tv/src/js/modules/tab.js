import { PT_STATE, util as _} from './bs_common';

export const tab = {
    /**
     * 탭 버튼 클릭시 해당 타겟 show 하는 함수
     * @param {object} params {'target': str, 'default': num}
     * @desc target : 해당 타켓
     * @desc default : 화면 로드 시 초기 액티브 index
     */
    click(params) {
        _.setEventState('clickTab', params);

        let firstPass = true; 

        const data = {
            params: _.getEventState('clickTab')
        };

        //탭 클릭시 타겟 show
        PT_STATE.$PROJECT.off('click.clickTab').on('click.clickTab', '[data-role-tab] > a', function (e) {
            e.preventDefault();
            const $this = $(this);

            if($this.hasClass('pt_tab_disney')) {
                $('.wrap-component.product-card').addClass('pt_none');
                $('.feature-benefit').removeClass('pt_none');
                $('.carousel-container').removeClass('pt_none');
                $('.gallery-carousel').removeClass('pt_none');
                $('.sec_event').hide();
                $('.sec_disney_more').show();
            } else if($this.hasClass('pt_tab_tv')){
                $('.wrap-component.product-card').removeClass('pt_none');
                setTimeout(() => {
                    $('div.wrap-component.product-card').css('opacity', 1);
                    $('div.wrap-component.product-card .component-contents').css('opacity', 1);
                },1000)
                $('.feature-benefit').addClass('pt_none');
                $('.carousel-container').addClass('pt_none');
                $('.gallery-carousel').addClass('pt_none');
                $('.sec_event').show();
                $('.sec_disney_more').hide();
            }

            if($this.hasClass('active')) return;

            const $parent = $this.closest('[data-role-tab]');
            const $tabTarget = `[data-role-tab="${$parent.attr('data-role-tab')}"]`;
            const { target } = _.findItem(data.params, 'el', $tabTarget);
            const _idx = $this.attr('data-tab-idx');
            const navHeight = $('.sec_nav').outerHeight();

            //a11y
            $parent.find('.selected_option').remove();
            $this.addClass('active').siblings().removeClass('active');
            $this.append('<span class="blind selected_option">선택됨</span>');

            if(firstPass === false){ //처음 접속시 포커스 제거
                $(target).attr('tabindex', 0);
                // $('html, body').stop().animate({scrollTop:$(target).offset().top - navHeight }, 500, function(){
                    $(target).focusout(function(){
                        $(target).removeAttr('tabindex');
                    });
                // });
                // $(target).focus();
            }

            if(_idx === 'all'){
                $(target).each((idx, item) => {
                    $(item).children().show();
                })
                return;
            }

            $(target).each((idx, item) => {
                $(item).children().eq(_idx).show().addClass('on').siblings().hide().removeClass('on');
            })
        });

        //초기값 제외 hide 처리
        Object.values(data.params).forEach((item, idx) => {
            const { el, default: _index = 0 } = item;

            $(el).children().eq(_index).trigger('click');

            if(idx === Object.values(data.params).length-1){
                firstPass = false;
            }
        });
    },
};