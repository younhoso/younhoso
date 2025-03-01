const $window = $(window);

export const PT_STATE = {
    $PROJECT: $('.sec_project_wrap'),
    eventState: {},
};

//  * @todo 해야 하는일
//  * @example <caption>Example usage of method1.</caption>
//  * returns 2
//  * globalNS.method1(5, 10);
//  * @deprecated [더이상 사용되지 않는 기능 버전 0.1]
//  * @version 0.1

export const util = {
    /**
     * 해당 화면이 768 미만이면 true 리턴
     * @returns boolean
     */
    isMobile() {
        return $window.outerWidth() <= 768;
    },

    /**
     * ',' 추가 함수 ex) 9999 => 9,999
     * @param {number} numberStr
     */
    addComma(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    /**
     * ',' 제거 함수 ex) 9,999 => 9999
     * @param {string} numberStr
     */
    removeComma(num) {
        return +num.replace(/,/g, '');
    },

    /**
     * pc 1440, mo 720 기준으로 px값을 vw값으로 변환
     * @param {number} pc pc 픽셀 값
     * @param {number} mo mo 픽셀 값, 인자 값이 없을경우 pc 픽셀 값으로 계산
     */
    pxToVw(pc, mo) {
        const winWidth = $window.outerWidth();
        const divide = util.isMobile() ? 720 : 1440;
        const pixel = util.isMobile() ? (mo === undefined ? pc : mo) : pc;
        return pixel >= 0 ? Math.min(pixel, (pixel / divide) * winWidth) : Math.max(pixel, (pixel / divide) * winWidth);
    },

    /**
     * makeAlert이 정의가 되어 있으면 makeAlert 함수 호출
     * @param {string} message
     */
    alert: function(message) {
        typeof makeAlert == 'function' ? makeAlert(message) : alert(message);
    },

    /**
     * 현재 주소의 파리미터 값 '=' 뒤에 텍스트 리턴 함수 ex) ?name=value
     * @param {string} name
     * @returns value
     */
    getParameterByName: function(name) {
        const regex = new RegExp(`[\\?&]${name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')}=([^&#]*)`);
        const results = regex.exec(location.search);

        return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },

    /**
     * PT_STATE eventState 상태 값 저장
     * @param {string} key eventState key값
     * @param {object} params eventState value 값
     */
    setEventState: function(key, params) {
        if (!PT_STATE.eventState[key]) {
            PT_STATE.eventState[key] = params;
        } else {
            PT_STATE.eventState[key] = Object.assign(PT_STATE.eventState[key], params);
        }
    },

    /**
     * PT_STATE eventState 상태 값 불러오기
     * @param {string} key eventState key값
     * @returns eventState value 값
     */
    getEventState: function(key) {
        return PT_STATE.eventState[key];
    },

    /**
     * 해당 이벤트의 값을 가진 객체를 return 하는 함수
     * @param {*} params 해당 배열
     * @param {*} key 찾는 key 값
     * @param {*} val 찾는 val 값
     * @returns 해당 객체
     */
    findItem: function(params, key, val) {
        const { [key]: evtItem, ...item } = params.filter(item => item[key] === val)[0];
        return item;
    }
};

export const anchor = {
    /**
     * 버튼 클릭 시 페이지 내 data-target으로 앵커 이동
     * @param {object} params {'target': str, 'speed': num, 'scroll': [pc,mo]}
     * @desc target : 해당 타켓
     * @desc speed : 이동 속도
     * @desc scroll : 이동 후 추가 여백
     */
    click(params) {
        util.setEventState('clickAnc', params);

        const data = {
            opt: {
                speed: 500,
                scroll: [0, 0],
            },
            params: util.getEventState('clickAnc')
        };

        PT_STATE.$PROJECT.off('click.clickAnc').on('click.clickAnc', '[data-role-anchor]', function (e) {
            e.preventDefault();
            const $this = $(this);
            const { target, speed = data.opt.speed, scroll = data.opt.scroll } = util.findItem(data.params, 'el', `[data-role-anchor="${$this.attr('data-role-anchor')}"]`);
            let ancClick = $this.attr('data-role-anchor');

            if(ancClick == 'notice_jet'){
                if(!$('[data-role-accordian="benefit_acco_jet"]').hasClass('active')){
                    $('[data-role-accordian="benefit_acco_jet"]').trigger('click');
                }
            }
            if(ancClick == 'notice_jet_point'){
                if(!$('[data-role-accordian="benefit_acco_jet"]').hasClass('active')){
                    $('[data-role-accordian="benefit_acco_jet"]').trigger('click');
                }
            }
            if(ancClick == 'notice_air01'){
                if(!$('[data-role-accordian="benefit_acco_air"]').hasClass('active')){
                    $('[data-role-accordian="benefit_acco_air"]').trigger('click');
                }
            }
            if(ancClick == 'notice_air02'){
                if(!$('[data-role-accordian="benefit_acco_air"]').hasClass('active')){
                    $('[data-role-accordian="benefit_acco_air"]').trigger('click');
                }
            }



            $('html, body').stop().animate({ scrollTop: $(target).offset().top + util.pxToVw(scroll[0], scroll[1]) }, speed, function(){
                if(ancClick == 'notice_jet' || ancClick == 'notice_air01' || ancClick == 'notice_air02'){
                    $(target).attr('tabindex', 0).focus();
                } else {
                    $(target).focus();
                }
            });

            if(ancClick == 'pt_nav05'){
                $('.pt_nav05 a').trigger('click');
            }

        });
        $('[data-focus="notice_jet"]').focusout(function(){
            $('[data-focus="notice_jet"]').removeAttr('tabindex');
        });
        $('[data-focus="notice_air01"]').focusout(function(){
            $('[data-focus="notice_air01"]').removeAttr('tabindex');
        });
        $('[data-focus="notice_air02"]').focusout(function(){
            $('[data-focus="notice_air02"]').removeAttr('tabindex');
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
                const { target, speed = data.opt.speed, scroll = data.opt.scroll, handleLoadAncTarget = data.opt.handleLoadAncTarget, beforeScrollStart = data.opt.beforeScrollStart, offScroll = data.opt.beforeScrollStart } = _.findItem(data.params, 'url', param);

                if (beforeScrollStart && typeof beforeScrollStart == 'function') {
                    beforeScrollStart();
                }

                // 240213 로드 시 앵커드 이동 및 클릭
                if (handleLoadAncTarget && typeof handleLoadAncTarget == 'function') {
                    handleLoadAncTarget();
                }

                if (!offScroll) {
                    $(target).attr('tabindex', 0);
                    $('html, body').stop().animate({ scrollTop: $(target).offset().top + _.pxToVw(scroll[0], scroll[1]) }, speed, function(){
                        $(target).focusout(function(){
                            $(target).removeAttr('tabindex');
                        });
                    });
                    $(target).focus();
                }

            } catch (err) {
                console.log('해당하는 앵커 영역이 없습니다.');
            }
        });
    },
    /**
     * 바잉툴 출력 후 paramsData.target으로 앵커드 이동
     * @param {object} params target:해당 타겟, speed: 속도, scroll: 추가 여백
     * @desc key : 기본 anc key값 변경 필요시 사용
     * @desc target : 해당 타켓
     * @desc speed : 이동 속도
     * @desc scroll : 이동 후 추가 여백
     */
    reset() {
        console.log('reset', PT_STATE.ancLoadList);

        // util.setEventState('loadAnc', params);

        // const data = {
        //     opt: {
        //         key: 'anc',
        //         speed: 500,
        //         scroll: [0, 0],
        //     },
        //     params: util.getEventState('loadAnc')
        // };

        // const param = util.getParameterByName(data.opt.key);

        // if (!param) return;

        // const { target, speed = data.opt.speed, scroll = data.opt.scroll, beforeScrollStart = data.opt.beforeScrollStart } = util.findItem(data.params, 'url', param);

        // if (beforeScrollStart && typeof beforeScrollStart == 'function') {
        //     beforeScrollStart();
        // }

        // $window.off('load.loadAnc').on('load.loadAnc', function () {
        //     try {
        //         $('html, body').stop().animate({ scrollTop: $(target).offset().top + util.pxToVw(scroll[0], scroll[1]) }, speed);
        //     } catch (err) {
        //         console.log('해당하는 앵커 영역이 없습니다.');
        //     }
        // });
    },
};

export const accordian = {
    /**
     * 토글 버튼 클릭 시 페이지 내 data-target show/hide
     * @param {object} params {'target': str, 'speed': num, 'group': str, 'openFocus': str, 'open': boolean}
     * @desc target : 해당 타켓
     * @desc speed : 토글 속도
     * @desc group : 그룹 지정시 동일한 그룹명 지정
     * @desc openFocus : 토글 오픈 후 컨텐츠 타켓
     * @desc open : 페이지 로드 후 컨텐츠 오픈 유무
     */
    toggle(params) {
        util.setEventState('clickToggle', params);

        const data = {
            opt: {
                speed: 0,
                openFocus: false,
                open: false,
            },
            params: util.getEventState('clickToggle')
        };

        //토글 열기
        PT_STATE.$PROJECT.off('click.toggleAcc').on('click.toggleAcc', '[data-role-accordian]', function (e) {
            e.preventDefault();
            const $this = $(this);
            const { target, speed = data.opt.speed, openFocus = data.opt.openFocus, group } = util.findItem(data.params, 'el', `[data-role-accordian="${$this.attr('data-role-accordian')}"]`);

            if (group && !$this.hasClass('active')) {
                const arr = Object.values(data.params).filter(item => item.group === group);

                arr.forEach(item => {
                    $(item.el).removeClass('active');
                    $(item.target).stop().slideUp(speed);
                });
            }

            // $this.toggleClass('active');
            // $this.hasClass('active') ? $(target).stop().slideDown(speed) : $(target).stop().slideUp(speed);
            // $(target).attr('tabindex', 0);

            $this.toggleClass('active');
            $this.hasClass('active') ? $(target).stop().slideDown(speed) : $(target).stop().slideUp(speed);

            // 토글클릭시 앵커이동 안되게
            if(!util.isMobile() && target == "#pt_step_jet1" || !util.isMobile() && target == "#pt_step_jet2" || !util.isMobile() && target == "#pt_step_jet3" || !util.isMobile() && target == "#pt_step_air1" || !util.isMobile() && target == "#pt_step_air2" || !util.isMobile() && target == "#pt_step_air3"){

            }else{
                $('html, body').stop().animate({ scrollTop: $(target).is(':visible') && openFocus ? $(target).offset().top : $(target).is(':visible') && $this.hasClass('active') ? $this.offset().top : $(window).scrollTop() }, 500);
            }

            // $('html, body').stop().animate({ scrollTop: $(target).is(':visible') && openFocus ? $(target).offset().top : $this.offset().top }, 500, function(){
            //     $(target).focusout(function(){
            //         $(target).removeAttr('tabindex');
            //     });
            // });
            //$(target).attr('tabindex', 0);

            /* 230414 해당영역 포커스 제거
            $(target).focus(); */
        });

        //토글 닫기
        PT_STATE.$PROJECT.off('click.closeAcc').on('click.closeAcc', '[data-role-accordianClose]', function (e) {
            e.preventDefault();
            const $this = $(this);
            const target = $this.attr('data-role-accordianClose');

            //$(`[data-role-accordian="${target}"]`).click().focus();
            $(`[data-role-accordian="${target}"]`).click();
            $('html, body').stop().animate({ scrollTop: $(`[data-role-accordian="${target}"]`).offset().top }, 500, function(){
                $(target).focusout(function(){
                    $(target).removeAttr('tabindex');
                });
            });

        });


        //토글 컨탠츠 hide 처리
        PT_STATE.$PROJECT.find('[data-role-accordian]').each(function () {
            const $this = $(this);
            const { target, open = data.opt.open} = util.findItem(data.params, 'el', `[data-role-accordian="${$this.attr('data-role-accordian')}"]`);

            open ? $this.addClass('active') : $(target).hide();
        });
    },
};

export const tab = {
    /**
     * 탭 버튼 클릭시 해당 타겟 show 하는 함수
     * @param {object} params {'target': str, 'default': num}
     * @desc target : 해당 타켓
     * @desc default : 화면 로드 시 초기 액티브 index
     */

    click(params) {

        util.setEventState('clickTab', params);

        const data = {
            params: util.getEventState('clickTab')
        };

        //탭 클릭시 타겟 show
        PT_STATE.$PROJECT.off('click.clickTab').on('click.clickTab', '[data-role-tab] > a', function (e) {
            e.preventDefault();
            const $this = $(this);

            if ($this.hasClass('active')) return;

            const $parent = $this.closest('[data-role-tab]');
            const { target } = util.findItem(data.params, 'el', `[data-role-tab="${$parent.attr('data-role-tab')}"]`);
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

export const modal = {
    /** 모달오픈버튼 클릭시 dimm 처리와 모달 오픈 함수 */
    init() {

        //모달 오픈
        PT_STATE.$PROJECT.off('.click.clickModal').on('click.clickModal', '[data-role="btnModal"]', function (e) {
            e.preventDefault();
            const data = {
                $prevfocus: [],
                opt: {
                    video: false,
                    youtube: false,
                    focus: false,
                },
            };
            const $this = $(this);
            const $target = $($this.attr('data-target'));
            const target = $this.attr('data-target');
            const $closeModal = $(`[data-role="closeModal"][data-target="${target}"]`);
            const winTop = $window.scrollTop();
            const winHeight = $window.outerHeight();
            const targetHeight = $target.outerHeight();
            const headerHeight = !!$('header') ? $('header').outerHeight() : 0;
            const opt = $this.attr('data-option') ? JSON.parse($this.attr('data-option')) : data.opt;
            const { video = data.opt.video, youtube = data.opt.youtube, focus = data.opt.focus } = opt;
            const dimm_id = `dimm_${new Date().getTime()}`;
            // const tapHeight = !!$('.sec_kv_tab') ? $('.sec_kv_tab').outerHeight() : 0;
            // const bannerHeight = !!$('.ins-preview-wrapper') ? $('.ins-preview-wrapper').outerHeight() : 0;

            data.$prevfocus.push($this);
            winHeight > targetHeight ? $target.css('top', winTop + (winHeight - targetHeight) / 2 - headerHeight) : $target.css('top', winTop);
            focus ? $target.show().find(focus).trigger('focus') : $target.show().trigger('focus');

            //딤드 처리
            $('body').append(`<div id="${dimm_id}" class="dimm"></div>`);
            $(`#${dimm_id}`).css('z-index', +$target.css('z-index') - 1).fadeIn();
            $closeModal.attr('data-dimm', `#${dimm_id}`);
            if (!!video) {
                $target.find('video source').attr('src', video);
                $target.find('video')[0].load();
                if (!!opt.caption) {
                    $target.find('video').after('<p data-role="caption">' + opt.caption + '</p>');
                }
            }
            if (!!youtube) {
                $target
                    .find('iframe')
                    .attr('src', 'https://www.youtube.com/embed/' + youtube + '?rel=0&autoplay=1&howinfo=0&enablejsapi=1')
                    .on('load', function () {
                        this.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                    });
            }
            $target.on('keydown', function (e) {
                if ($target.is(':focus') && e.shiftKey && e.keyCode == 9) {
                    e.preventDefault();
                    $closeModal.trigger('focus');
                }
            });
            $closeModal.on('keydown', function (e) {
                if (!e.shiftKey && e.keyCode == 9) {
                    e.preventDefault();
                    $target.trigger('focus');
                }
            });

            // 모달 닫기
            PT_STATE.$PROJECT.off('click.closeModal').on('click.closeModal', '[data-role="closeModal"]', function (e) {
                e.preventDefault();
                const $this = $(this);
                const $target = $($this.attr('data-target'));
                const dimm_id = $this.attr('data-dimm');

                $(dimm_id).fadeOut(function () {
                    $(this).remove();
                });
                $target.hide();
                data.$prevfocus.pop().trigger('focus');
                if (!!video) {
                    $target.find('video source').attr('src', '');
                    if (!!opt.caption) {
                        $target.find('[data-role="caption"]').remove();
                    }
                }
                if (!!youtube) {
                    $target.find('iframe').attr('src', '');
                }
            });

        });

    },
};


export const copy = {
    click() {
        const target = new ClipboardJS('[data-role="btnCopy"]');
        const $alertMsg = $('.alert_msg');

        target.on('success', function () {
            $alertMsg.fadeIn();
            setTimeout(function () {
                $alertMsg.fadeOut();
            }, 2800);
            // target.clearSelection();
        });
        target.on('error', function () {
            prompt('', target.data('clipboard-text'));
        });

        PT_STATE.$PROJECT.off('click.clickCopy').on('click.clickCopy', '[data-role="btnCopy"]', function (e) {
            e.preventDefault();
            const msg = $(this).data('alertMsg');

            if (msg) {
                $alertMsg.text(msg);
            } else {
                $alertMsg.text('해시태그가 복사되었습니다.');
            }
        });
    },
};

export const countDownEvt = {
    pad (value) {
        return ('0' + Math.floor(value)).slice(-2);
    },

    init (el, datetime, type) {

        const _second = 1000;
        const _minute = _second * 60;
        const _hour = _minute * 60;
        const _day = _hour * 24;

        let timer;
        const _date = new Date(datetime).getTime();
        var html = '';
        var _el;
        var _time = {
            d:'00',
            h:'00',
            m:'00',
            s:'00',
        }

        function countDown() {

            var distance = _date - new Date().getTime();
            var days = pad(distance / _day);
            var hours = pad((distance % _day) / _hour);
            var minutes = pad((distance % _hour) / _minute);
            var seconds = pad((distance % _minute) / _second);

            if (_time.d !== days) {
                _time.d = days;
                _el.eq(0).html(days);
            }
            if (_time.h !== hours) {
                _time.h = hours;
                _el.eq(1).html(hours);
            }
            if (_time.m !== minutes) {
                _time.m = minutes;
                _el.eq(2).html(minutes);
            }
            if (_time.s !== seconds) {
                _time.s = seconds;
                _el.eq(3).html(seconds);
            }

            // 카운트 종료
            if (distance < 0) {
                clearInterval(timer);
            }
        }

        if (type === 'flip') {
            html = ``;
        } else if (type === 'img') {
            html = ``;
        } else {
            html = `
                <div class="count_box">
                    <div class="count_slot">
                        <div class="count_num en">00</div>
                        <div class="count_txt">일</div>
                    </div>
                    <div class="count_slot">
                        <div class="count_num en">00</div>
                        <div class="count_txt">시간</div>
                    </div>
                    <div class="count_slot">
                        <div class="count_num en">00</div>
                        <div class="count_txt">분</div>
                    </div>
                    <div class="count_slot">
                        <div class="count_num en">00</div>
                        <div class="count_txt">초</div>
                    </div>
                </div>
            `;
        }

        $(el).html(html);
        _el = $(el).find('.count_num');

        timer = setInterval(countDown, 1000);
    }
}

export const button = {
    all(netFunnel) {
        this.btnPresent(netFunnel);
        this.btnBuy(netFunnel);
        this.btnCart(netFunnel);
        this.btnCouponBook(netFunnel);
    },
    btnPresent(netFunnel) {
        let $btnPresent = PT_STATE.$PROJECT.find('[data-role="btnPresent"]');
        if(!$btnPresent.length) return;

        PT_STATE.$PROJECT.off('click.click_pt_present').on('click.click_pt_present', '[data-role="btnPresent"]', function(e) {
            e.preventDefault();
            let $self = $(this);
            let sku = $self.attr('data-sku');

            if (sku && window.presentDirect) {
                if(!!netFunnel){
                    NetFunnel_Action(netFunnel, function(ev,ret){
                        presentDirect(sku, '_self');
                    });
                } else {
                    presentDirect(sku, '_self');
                }
            }
        });
    },
    btnBuy(netFunnel) {
        let $btnBuy = PT_STATE.$PROJECT.find('[data-role="btnBuy"]');
        if(!$btnBuy.length) return;

        PT_STATE.$PROJECT.off('click.click_pt_buy').on('click.click_pt_buy', '[data-role="btnBuy"]', function(e) {
            e.preventDefault();
            let $self = $(this);
            let gCode = $self.attr('data-gcode');
            let cpCode = $self.attr('data-cpcode');
            let compNo = $self.attr('data-comp') ? $self.attr('data-comp') : 312;
            let tradeIn = $self.attr('data-tradein') ? $self.attr('data-tradein') : 'N';
            //let ceTradeIn = $self.attr('data-ceTradeIn') ? $self.attr('data-ceTradeIn') : 'N';
            let galaxyClub = $self.attr('data-galaxyClub') ? $self.attr('data-galaxyClub') : 'N';
            let galaxyClubTpCd = $self.attr('data-galaxyClubTpCd') ? $self.attr('data-galaxyClubTpCd') : null;

            if (gCode && window.fnBuyDirectByMultiId) {
                if(!!netFunnel){
                    NetFunnel_Action(netFunnel, function(ev,ret){
                        fnBuyDirectByMultiId([{
                            goodsId: gCode,
                            qty: 1,
                            compNo: compNo,
                            tradeIn: tradeIn,
                            //ceTradeIn: ceTradeIn,
                            galaxyClub: galaxyClub,
                            galaxyClubTpCd: galaxyClubTpCd
                        }]);
                    });
                } else {
                    fnBuyDirectByMultiId([{
                        goodsId: gCode,
                        qty: 1,
                        compNo: compNo,
                        tradeIn: tradeIn,
                        //ceTradeIn: ceTradeIn,
                        galaxyClub: galaxyClub,
                        galaxyClubTpCd: galaxyClubTpCd
                    }]);
                }
            }
        });
    },
    btnCart(netFunnel) {
        let $btnCart = PT_STATE.$PROJECT.find('[data-role="btnCart"]');
        if(!$btnCart.length) return;

        PT_STATE.$PROJECT.off('click.click_pt_cart').on('click.click_pt_cart', '[data-role="btnCart"]', function(e) {
            e.preventDefault();
            let $self = $(this);
            let sku = $self.attr('data-sku');
            let compNo = $self.attr('data-comp') ? $self.attr('data-comp') : 312;

            if (sku && window.fnCartDirect) {
                if(!!netFunnel){
                    NetFunnel_Action(netFunnel, function(ev,ret){
                        fnCartDirect([{mdlCode:sku, qty:1, compNo:compNo}]);;
                    });
                } else {
                    fnCartDirect([{mdlCode:sku, qty:1, compNo:compNo}]);;
                }
            }
        });
    },
    btnCouponBook(netFunnel) {
        let $btnCouponBook = PT_STATE.$PROJECT.find('[data-role="btnCouponBook"]');
        if(!$btnCouponBook.length) return;
    }
}


if(!window.PT_STATE) window.PT_STATE = {};
window.PT_STATE.$PROJECT = PT_STATE.$PROJECT;
window.PT_STATE.eventState = PT_STATE.eventState;