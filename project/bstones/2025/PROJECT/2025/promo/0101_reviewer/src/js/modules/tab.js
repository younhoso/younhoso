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

        const data = {
            params: _.getEventState('clickTab')
        };

        //탭 클릭시 타겟 show
        PT_STATE.$PROJECT.off('click.clickTab').on('click.clickTab', '[data-role-tab] > a', function (e) {
            e.preventDefault();
            const $this = $(this);

            if ($this.hasClass('active')) return;

            const $parent = $this.closest('[data-role-tab]');
            const { target } = _.findItem(data.params, 'el', `[data-role-tab="${$parent.attr('data-role-tab')}"]`);
            const _index = $this.index();

            //a11y
            $parent.find('.selected_option').remove();
            $this.addClass('active').siblings().removeClass('active');
            $this.append('<span class="blind selected_option">선택됨</span>');

            $(target).each((idx, item) => {
                $(item).children().eq(_index).show().siblings().hide();
            })
        });

        //초기값 제외 hide 처리
        Object.values(data.params).forEach(item => {
            const { el, default: _index = 0 } = item;

            $(el).children().eq(_index).trigger('click');
        });
    },
};