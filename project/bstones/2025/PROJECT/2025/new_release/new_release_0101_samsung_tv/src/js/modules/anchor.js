import { PT_STATE, util as _} from './bs_common';

const $window = $(window);

export const anchor = {
    /**
     * 버튼 클릭 시 페이지 내 data-target으로 앵커 이동
     * @param {object} params {'target': str, 'speed': num, 'scroll': [pc,mo]}
     * @desc target : 해당 타켓
     * @desc speed : 이동 속도
     * @desc scroll : 이동 후 추가 여백
     * @desc reTime : 이동 후 Lazy 컨텐츠 콜백 시간
     * @desc reTimeSpeed : 이동 후 Lazy 컨텐츠 콜백 시간, 재이동 시간
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
        // console.log(data);

        PT_STATE.$PROJECT.off('click.clickAnc').on('click.clickAnc', '[data-role-anchor]', function (e) {
            e.preventDefault();
            const $this = $(this);
            const { target, speed = data.opt.speed, scroll = data.opt.scroll } = _.findItem(data.params, 'el', `[data-role-anchor="${$this.attr('data-role-anchor')}"]`);
            const reTime = 700;
            const reTimeSpeed = 100;

            $(target).attr('tabindex', 0);
            $('html, body').stop().animate(
                { 
                    scrollTop: $(target).offset().top + _.pxToVw(scroll[0], scroll[1]) 
                }, 
                { 
                    duration: speed, 
                    step: (now, fx) => {
                        let realPos = $(target).offset().top + _.pxToVw(scroll[0], scroll[1]);
                        if (fx.end !== realPos) {
                            fx.end = realPos;
                        }
                    }
                },
                function(){
                    $(target).focusout(function(){
                        $(target).removeAttr('tabindex');
                    });
                }
            ).promise().done(function() {
                setTimeout(function () {
                    $('html, body').stop().animate(
                        { 
                            scrollTop: $(target).offset().top + _.pxToVw(scroll[0], scroll[1])
                        }, 
                        {
                            duration: reTimeSpeed, 
                            step: (now, fx) => {
                                let realPos = $(target).offset().top + _.pxToVw(scroll[0], scroll[1]);
                                if (fx.end !== realPos) {
                                    fx.end = realPos;
                                }
                            }
                        },
                        function(){
                            $(target).focusout(function(){
                                $(target).removeAttr('tabindex');
                            });
                        }
                    )
                }, reTime);
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
     * @desc reTime : 이동 후 Lazy 컨텐츠 콜백 시간
     * @desc reTimeSpeed : 이동 후 Lazy 컨텐츠 콜백 시간, 재이동 시간
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
        // console.log(data);
        const param = _.getParameterByName(data.opt.key);
        
        if (!param) return;
        
        const { target, speed = data.opt.speed, scroll = data.opt.scroll, tabClick = data.opt.tabClick  } = _.findItem(data.params, 'url', param);
        const reTime = 700;
        const reTimeSpeed = 100;
        
        if (tabClick && typeof tabClick == 'function') {
            tabClick();
        }

        $window.off('load.loadAnc').on('load.loadAnc', function () {
            try {
                const { target, speed = data.opt.speed, scroll = data.opt.scroll } = _.findItem(data.params, 'url', param);
                $(target).attr('tabindex', 0);
                $('html, body').stop().animate(
                    { 
                        scrollTop: $(target).offset().top + _.pxToVw(scroll[0], scroll[1])
                    }, 
                    {
                        duration: speed, 
                        step: (now, fx) => {
                            let realPos = $(target).offset().top + _.pxToVw(scroll[0], scroll[1]);
                            if (fx.end !== realPos) {
                                fx.end = realPos;
                            }
                        }
                    },
                    function(){
                        $(target).focusout(function(){
                            $(target).removeAttr('tabindex');
                        });
                    }
                ).promise().done(function() {
                    setTimeout(function () {
                        $('html, body').stop().animate(
                            { 
                                scrollTop: $(target).offset().top + _.pxToVw(scroll[0], scroll[1])
                            }, 
                            {
                                duration: reTimeSpeed, 
                                step: (now, fx) => {
                                    let realPos = $(target).offset().top + _.pxToVw(scroll[0], scroll[1]);
                                    if (fx.end !== realPos) {
                                        fx.end = realPos;
                                    }
                                }
                            },
                            function(){
                                $(target).focusout(function(){
                                    $(target).removeAttr('tabindex');
                                });
                            }
                        )
                    }, reTime);
                });
                $(target).focus();

                if (param === 'neo-qled-8k') {
                    // document.querySelector('.option_type_buy_1 .pt_opt__item input[value="optCT_1"]').click();
                    document.querySelector('.pt_category_btn.pt_category_btn--8k').click();
                }

                if (param === 'neo-qled') {
                    // document.querySelector('.option_type_buy_1 .pt_opt__item input[value="optCT_1"]').click();
                    document.querySelector('.pt_category_btn.pt_category_btn--neo').click();
                }

                if (param === 'qled') {
                    document.querySelector('.pt_category_btn.pt_category_btn--qled').click();
                }

                if (param === 'uhd') {
                    // document.querySelector('.option_type_buy_1 .pt_opt__item input[value="optCT_2"]').click();
                    document.querySelector('.pt_category_btn.pt_category_btn--uhd').click();
                }

                if (param === 'the-frame') {
                    // document.querySelector('.option_type_buy_1 .pt_opt__item input[value="optCT_3"]').click();
                    document.querySelector('.pt_category_btn.pt_category_btn--frame').click();
                }

                if (param === 'the-serif') {
                    // document.querySelector('.option_type_buy_1 .pt_opt__item input[value="optCT_3"]').click();
                    document.querySelector('.pt_category_btn.pt_category_btn--serif').click();
                }
            } catch (err) {
                console.log('해당하는 앵커 영역이 없습니다.');
            }
        });
    },
};