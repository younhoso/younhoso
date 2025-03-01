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
            const { target, speed = data.opt.speed, scroll = data.opt.scroll, click = data.opt.click, modalClose = data.opt.modalClose } = _.findItem(data.params, 'el', `[data-role-anchor="${$this.attr('data-role-anchor')}"]`);

            $(target).attr('tabindex', 0);
            $('html, body').stop().animate({ scrollTop: $(target).offset().top + _.pxToVw(scroll[0], scroll[1]) }, speed, function(){
                $(target).focusout(function(){
                    $(target).removeAttr('tabindex');
                });
            });

            if(click){
                $(click).trigger('click');
            }

            if (modalClose && typeof modalClose == 'function') {
                modalClose();
            }

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

        const { target, isCategory, speed = data.opt.speed, scroll = data.opt.scroll, click = data.opt.click, beforeScrollStart = data.opt.beforeScrollStart, tabClick = data.opt.tabClick } = _.findItem(data.params, 'url', param);

        if (beforeScrollStart && typeof beforeScrollStart == 'function') {
            beforeScrollStart();
        }

        if (tabClick && typeof tabClick == 'function') {
            tabClick();
        }
        $window.off('load.loadAnc').on('load.loadAnc', function () {
            try {
                // $('html, body').stop().animate({ scrollTop: $(target).offset().top + util.pxToVw(scroll[0], scroll[1]) }, speed);
                $(target).attr('tabindex', 0);
                // $('html, body').stop().animate({ scrollTop: $(target).offset().top + util.pxToVw(scroll[0], scroll[1]) }, speed, function(){
                //     /**
                //      * 23.05.15
                //      * 카테고리 탭 트리거 추가
                //      * Mckenzi
                //      */
                //     if (isCategory) {
                //         $(`[data-category=${param}]`).trigger('click');
                //     }
                //     $(target).focusout(function(){
                //         $(target).removeAttr('tabindex');
                //     });
                // });
                setTimeout(function () {
                    $('html, body').animate({ scrollTop: $(target).offset().top + _.pxToVw(scroll[0], scroll[1]) }, speed, function(){
                    });
                    if (isCategory) {
                        $(`[data-category=${param}]`).trigger('click');
                    }
                    $(target).focusout(function(){
                        $(target).removeAttr('tabindex');
                    });
                }, 300);

                if(click){
                    $(click).trigger('click');
                }

                $(target).focus()

                // 일반에어컨
                // 일반> 한정수량 비스포크 AI 쿠풍 갤러리
                if (param === 'new-gallery-limited') {
                    // console.log('param', param);
                    document.querySelector('.sec_buying--com input[value="optB_7"]').click();
                    document.querySelector('.sec_buying--com input[value="optC_1"]').click();
                }
                // 비스포크 AI 쿠풍 갤러리
                if (param === 'new-gallery') {
                    document.querySelector('.sec_buying--com input[value="optB_1"]').click();
                }
                // 무풍에어컨 클래식
                if (param === 'classic') {
                    document.querySelector('.sec_buying--com input[value="optB_3"]').click();
                }
                // Q9000
                if (param === 'q9000') {
                    document.querySelector('.sec_buying--com input[value="optB_4"]').click();
                }

                // 시스템에어컨
                // 시스템> 비스포크 무풍 시스템에어컨
                if (param === 'normal') {
                    document.querySelector('.sec_buying--sys input[value="optBB_5"]').click();
                }
                // 시스템> 비스포크 무풍 시스템에어컨 인피니티라인
                if (param === 'infinite') {
                    document.querySelector('.sec_buying--sys input[value="optBB_6"]').click();
                }

            } catch (err) {
                console.log('해당하는 앵커 영역이 없습니다.');
            }
        });
    },
};