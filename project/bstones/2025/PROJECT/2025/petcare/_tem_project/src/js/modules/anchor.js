import { PT_STATE, util as _} from './bs_common';

const $window = $(window);

export const anchor = {
    /**
     * 버튼 클릭 시 페이지 내 data-target으로 앵커 이동
     * @param {object} params {'target': str, 'speed': num, 'scroll': [pc,mo]}
     * @desc target : 해당 타켓
     * @desc speed : 이동 속도
     * @desc scroll : 이동 후 추가 여백
     */
    click(params) {
        _.setEventState('clickAnc', params);

        const data = {
            opt: {
                speed: 500,
                scroll: [0, 0],
            },
            params: _.getEventState('clickAnc')
        };

        PT_STATE.$PROJECT.off('click.clickAnc').on('click.clickAnc', '[data-role-anchor]', function (e) {
            e.preventDefault();
            const $this = $(this);
            const { target, speed = data.opt.speed, scroll = data.opt.scroll } = _.findItem(data.params, 'el', `[data-role-anchor="${$this.attr('data-role-anchor')}"]`);

            $(target).attr('tabindex', 0);
            $('html, body').stop().animate({ scrollTop: $(target).offset().top + _.pxToVw(scroll[0], scroll[1]) }, speed, function(){
                $(target).focusout(function(){
                    $(target).removeAttr('tabindex');
                });
            });
            $(target).focus();

        });
    },

    /**
     * 화면 로드 후 paramsData.target으로 앵커드 이동
     * @param {object} params target:해당 타겟, speed: 속도, scroll: 추가 여백
     * @desc key : 기본 anc key값 변경 필요시 사용
     * @desc target : 해당 타켓
     * @desc speed : 이동 속도
     * @desc scroll : 이동 후 추가 여백
     */
    load(params) {
        _.setEventState('loadAnc', params);

        const data = {
            opt: {
                key: 'anc',
                speed: 500,
                scroll: [0, 0],
            },
            params: _.getEventState('loadAnc')
        };

        const param = _.getParameterByName(data.opt.key);

        if (!param) return;

        
        $window.off('load.loadAnc').on('load.loadAnc', function () {
            try {
                const { target, speed = data.opt.speed, scroll = data.opt.scroll } = _.findItem(data.params, 'url', param);
                $(target).attr('tabindex', 0);
                $('html, body').stop().animate({ scrollTop: $(target).offset().top + _.pxToVw(scroll[0], scroll[1]) }, speed, function(){
                    $(target).focusout(function(){
                        $(target).removeAttr('tabindex');
                    });
                });
                $(target).focus();
            } catch (err) {
                console.log('해당하는 앵커 영역이 없습니다.');
            }
        });
    },
};