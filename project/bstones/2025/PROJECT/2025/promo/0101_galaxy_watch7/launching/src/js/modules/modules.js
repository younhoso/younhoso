;(function(){
    'use strict';

    if(!window.PT_STATE) {
        window.PT_STATE = {
            $PROJECT: $('.sec_project_wrap'),
            eventState: {},
            loadCSS: false,
        };
    }

    let config = {
        debugMode: false,
        loadCSS: [
            'https://images.samsung.com/kdp/event/sec/assets/css/promo_20240625.min.css'
        ],
    }

    const util = {
        /**
         * 해당 화면이 768 미만이면 true 리턴
         * @returns boolean
         */
        isMobile() {
            return $(window).outerWidth() <= 768;
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
            const winWidth = $(window).outerWidth();
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
    }

    const modules = {
        accordian: {
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
                    const $target = $(target);

                    if (group && !$this.hasClass('active')) {
                        const arr = Object.values(data.params).filter(item => item.group === group);

                        arr.forEach(item => {
                            $(item.el).removeClass('active');
                            $(item.target).stop().slideUp(speed);
                        });
                    }

                    $this.toggleClass('active');
                    $this.hasClass('active') ? $target.stop().slideDown(speed) : $target.stop().slideUp(speed, () => $target.hide());

                    $('html, body').stop().animate({ scrollTop: $target.is(':visible') && openFocus ? $target.offset().top : $this.offset().top }, 500);

                    /*230414 해당영역 포커스 제거
                    $(target).attr('tabindex', 0);
                    $('html, body').stop().animate({ scrollTop: $(target).is(':visible') && openFocus ? $(target).offset().top : $this.offset().top }, 500, function(){
                        $(target).focusout(function(){
                            $(target).removeAttr('tabindex');
                        });
                    });
                    $(target).focus(); */
                });

                //토글 닫기
                PT_STATE.$PROJECT.off('click.closeAcc').on('click.closeAcc', '[data-role-accordianClose]', function (e) {
                    e.preventDefault();
                    const $this = $(this);
                    const target = $this.attr('data-role-accordianClose');

                    $(`[data-role-accordian="${target}"]`).click().focus();
                });

                //토글 컨탠츠 hide 처리
                PT_STATE.$PROJECT.find('[data-role-accordian]').each(function () {
                    const $this = $(this);
                    const { target, open = data.opt.open} = util.findItem(data.params, 'el', `[data-role-accordian="${$this.attr('data-role-accordian')}"]`);

                    open ? $this.addClass('active') : $(target).hide();
                });
            },
        },
        anchor: {
            /**
             * 버튼 클릭 시 페이지 내 data-target으로 앵커 이동
             * @param {object} params {'target': str, 'speed': num, 'scroll': [pc,mo]}
             * @desc target : 해당 타켓
             * @desc speed : 이동 속도
             * @desc scroll : 이동 후 추가 여백
             */
            click(params) {
                console.log('test');
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

                    $(target).attr('tabindex', 0);
                    $('html, body').stop().animate({ scrollTop: $(target).offset().top + util.pxToVw(scroll[0], scroll[1]) }, speed, function(){
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
                util.setEventState('loadAnc', params);

                const data = {
                    opt: {
                        key: 'anc',
                        speed: 500,
                        scroll: [0, 0],
                    },
                    params: util.getEventState('loadAnc')
                };

                const param = util.getParameterByName(data.opt.key);

                if (!param) return;


                $window.off('load.loadAnc').on('load.loadAnc', function () {
                    try {
                        const { target, speed = data.opt.speed, scroll = data.opt.scroll } = util.findItem(data.params, 'url', param);
                        $(target).attr('tabindex', 0);
                        $('html, body').stop().animate({ scrollTop: $(target).offset().top + util.pxToVw(scroll[0], scroll[1]) }, speed, function(){
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
        },
        categoryTab: {
            init(){
                //기본값
                let flag = false;
                let slideLength = -1;
                let $component = $('.wrap-component');
                let $category = $('.pt_category_box');
                let categorySwiper = [];//각 카테고리 스와이퍼
                let cateEnd = [];//각 카테고리의 마지막 컴포넌트
                let cateLength = [];//각 카테고리의 li갯수
                let cateAnc = [];//컴포넌트 앵커이동 제어 true:앵커이동/false:탭작동 초기값 true
                let cateSwp = [];//모바일 카테고리 스와이퍼 제어 true:작동on/false:작동off 초기값 true
                let compLength = 0;
                let compSumLength = 0;

                $category.each(function(index,el){
                    let $this = $(this);
                    cateLength[index] = $this.find('li').length;
                    $this.addClass('pt_cate' + index);
                    $this.css('height', $this.find('.pt_slider_category_wrap').outerHeight());

                    if($this.attr('data-anchor')){
                        cateAnc[index] = $this.attr('data-anchor');
                    }else{
                        cateAnc[index] = 'true';
                    }

                    if($this.attr('data-swiper')){
                        cateSwp[index] = $this.attr('data-swiper');
                    }else{
                        cateSwp[index] = 'true';
                    }
                });

                //설정영역


                $category.each(function(index,el){
                    let $this = $(this);

                    //탭동작
                    compLength += $this.find('li').length;

                    if(cateAnc[index] == 'false'){
                        $component.each(function(idx, item) {
                            if(compSumLength <= idx && idx < compLength){
                                if(idx == compSumLength){
                                    $component.eq(idx).removeClass('pt_hide');
                                }else{
                                    $component.eq(idx).addClass('pt_hide');
                                }
                            }
                        });
                    }
                    compSumLength += $this.find('li').length;

                    if(cateSwp[index] == 'true'){
                        categorySwiper[index] = new Swiper('.pt_cate'+ (index) +' .swiper-container', {
                            allowTouchMove: true,
                            slidesPerView: 'auto',
                            observer: true,
                            observeParents: true,
                            observeSlideChildren: true,
                            breakpoints: {
                                769: {
                                    allowTouchMove: false
                                }
                            },
                            on: {
                                breakpoint: function() {
                                    let that = this;
                                    setTimeout(function() {
                                        that.slideTo(0, 0);
                                    }, 150);
                                }
                            }
                        });
                    }else{
                        $this.addClass('pt_noSwiper');
                    }
                });


                let scrollMove = function() {
                    let _scrollTop = $(window).scrollTop();
                    compLength = 0;
                    compSumLength = 0;

                    $category.each(function(index,el){
                        let $this = $(this);

                        //카테고리 높이값 자동조절
                        $this.css('height', $this.find('.pt_slider_category_wrap').outerHeight());

                        //카테고리 li갯수 담기
                        compLength += $this.find('li').length;


                        //각카테고리의 마지막 컴포넌트 가져오기
                        cateEnd[index] = $component.eq(compLength-1);

                        // 컴포넌트 카테고리 sticky 처리
                        if ($(window).scrollTop() >= $this.find('.pt_slider_category_sticky').offset().top && $(window).scrollTop() <= cateEnd[index].offset().top + cateEnd[index].outerHeight() - $this.outerHeight()) {
                            $this.find('.pt_slider_category_sticky').addClass('fixed');
                        } else {
                            $this.find('.pt_slider_category_sticky').removeClass('fixed');
                        }

                        //컴포넌트 스크롤시 카테고리 위치 ON
                        if (cateAnc[index] != 'false' && _scrollTop >= $this.offset().top && _scrollTop < cateEnd[index].offset().top + cateEnd[index].outerHeight() && !flag) {

                            _scrollTop += $this.find('.pt_slider_category_wrap').outerHeight();
                            $component.each(function(idx, item) {
                                if (idx <= slideLength) return;
                                let $item = $(item);

                                if (_scrollTop >= $item.offset().top && _scrollTop < $item.offset().top + $item.outerHeight()) {
                                    $this.find('.pt_category_list').each(function() {

                                        let $target = $(this).find('li').eq(idx - compSumLength);
                                        if (!$target.hasClass('on')) {
                                            $target.addClass('on').siblings().removeClass('on');
                                            $this.find('.pt_category_list a').find('.selected_option').remove();
                                            $target.find('a').append('<span class="blind selected_option">선택됨</span>');
                                        }
                                    });

                                    if ($(window).outerWidth() <= 768 && cateSwp[index] == 'true') {
                                        categorySwiper[index].slideTo(idx - compSumLength);
                                    }
                                }
                            });
                        }

                        compSumLength += $this.find('li').length;

                    });
                }

                $(window).on('scroll.scroll', scrollMove);


                // 컴포넌트 카테고리 이벤트(클릭시 위치이동)
                PT_STATE.$PROJECT.off('click.clickCate').on('click.clickCate', '.pt_category_list a', function(e) {
                    e.preventDefault();
                    let $this = $(this).closest('li');
                    let click_idx = $this.index();
                    let parenstName = $this.closest('.pt_category_box');
                    compLength = 0;
                    compSumLength = 0;
                    $('.pt_category_list a').find('.selected_option').remove();
                    $(this).append('<span class="blind selected_option">선택됨</span>')

                    if (!flag) {
                        flag = true;

                        $this.closest('.pt_slider_category_wrap').find('.pt_category_list').each(function() {
                            $(this).find('li').eq(click_idx).addClass('on').siblings().removeClass('on');
                        });

                        $category.each(function(index,el){
                            let $this = $(this);
                            compLength += $this.find('li').length;
                            cateEnd[index] = $component.eq(compLength-1);

                            if (parenstName.hasClass('pt_cate'+ index)) {
                                if(cateAnc[index] == 'false'){
                                    $component.each(function(idx, item) {
                                        if(compSumLength <= idx && idx < compLength){
                                            if(click_idx + compSumLength == idx){
                                                $component.eq(idx).removeClass('pt_hide');
                                            }else{
                                                $component.eq(idx).addClass('pt_hide');
                                            }
                                        }
                                    });
                                    if ($(window).outerWidth() <= 768 && cateSwp[index] == 'true') {
                                        categorySwiper[index].slideTo(click_idx);
                                    }
                                }
                                let compTarget = $component.eq(click_idx + compSumLength);
                                $(compTarget).attr('tabindex', 0);
                                $('html, body').stop().animate({scrollTop:compTarget.offset().top - $this.find('.pt_slider_category_wrap').outerHeight() + 1}, 500, function(){
                                    flag = false;
                                    $(compTarget).focusout(function(){
                                        $(compTarget).removeAttr('tabindex');
                                    });
                                });
                                $(compTarget).focus();

                            }
                            compSumLength += $this.find('li').length;

                        });

                    }

                    setTimeout(function () {
                        $(window).resize();
                        $('div.wrap-component .component-contents').css('opacity', 1);
                    }, 130);

                });

                PT_STATE.$PROJECT.off('click.popupCate').on('click.popupCate', '.pt_btn_popup_category', function(e) {
                    e.preventDefault();
                    if ($(this).closest('.pt_slider_category_wrap').hasClass('popup')) {
                        $(this).closest('.pt_slider_category_wrap').removeClass('popup');
                        $(this).attr('title', '카테고리 탭 메뉴 열기').find('span.blind').text('카테고리 탭 메뉴 열기');
                    } else {
                        $(this).closest('.pt_slider_category_wrap').addClass('popup');
                        $(this).attr('title', '카테고리 탭 메뉴 닫기').find('span.blind').text('카테고리 탭 메뉴 닫기');
                    }
                });
            }
        },
        copy: {
            click() {
                const target = new ClipboardJS('[data-role="btnCopy"]');
                const $alertMsg = $('.alert_msg');

                target.on('success', function () {
                    $alertMsg.fadeIn();
                    setTimeout(function () {
                        $alertMsg.fadeOut();
                    }, 2800);
                    target.clearSelection();
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
        },
        count: {
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
                    var days = count.pad(distance / _day);
                    var hours = count.pad((distance % _day) / _hour);
                    var minutes = count.pad((distance % _hour) / _minute);
                    var seconds = count.pad((distance % _minute) / _second);

                    if (_time.d !== days) {
                        _time.d = days;
                        distance > 0 ? _el.eq(0).html(days) : _el.eq(0).html('00');
                    }
                    if (_time.h !== hours) {
                        _time.h = hours;
                        distance > 0 ? _el.eq(1).html(hours) : _el.eq(1).html('00');
                    }
                    if (_time.m !== minutes) {
                        _time.m = minutes;
                        distance > 0 ? _el.eq(2).html(minutes) : _el.eq(2).html('00');
                    }
                    if (_time.s !== seconds) {
                        _time.s = seconds;
                        distance > 0 ? _el.eq(3).html(seconds) : _el.eq(3).html('00');
                    }

                    // 카운트 종료
                    if (distance < 0) {
                        clearInterval(timer);
                    }
                }

                html = `<ul class="pt_count_box">
                            <li class="pt_count_slot">
                                <div class="pt_card">
                                    <p class="pt_count_num mono_en">00</p>
                                    <p class="pt_count_txt">일</p>
                                </div>
                            </li>
                            <li class="pt_count_slot">
                                <div class="pt_card">
                                    <p class="pt_count_num mono_en">00</p>
                                    <p class="pt_count_txt">시간</p>
                                </div>
                            </li>
                            <li class="pt_count_slot">
                                <div class="pt_card">
                                    <p class="pt_count_num mono_en">00</p>
                                    <p class="pt_count_txt">분</p>
                                </div>
                            </li>
                            <li class="pt_count_slot">
                                <div class="pt_card">
                                    <p class="pt_count_num mono_en">00</p>
                                    <p class="pt_count_txt">초</p>
                                </div>
                            </li>
                        </ul>`;

                $(el).html(html);
                _el = $(el).find('.pt_count_num');
                timer = setInterval(countDown, 1000);
            }
        },
        coupon: {
            init(couponLimit = '2024.00.00'){
                var messager = {
                    data: {
                        content: '',
                        btnText: '확인',
                        okBtnText: '확인',
                        cancelBtnText: '취소'
                    },
                    setAlertData: function (content, btnText, callback) {
                        messager.data.content = content;
                        messager.data.btnText = btnText;
                        if (callback != undefined) {
                            messager.data.callback = callback;
                        } else {
                            delete messager.data[callback];
                        }
                    },
                    setConfirmData: function (content, okBtnText, cancelBtnText, callback) {
                        messager.data.content = content;
                        messager.data.okBtnText = okBtnText;
                        messager.data.cancelBtnText = cancelBtnText;
                        if (callback != undefined) {
                            messager.data.callback = callback;
                        } else {
                            delete messager.data[callback];
                        }
                    },
                    alert: function (content, btnText, callback) {
                        messager.setAlertData(content, btnText, callback);
                        commonAlert(messager.data);
                        openLayer('commonAlert');
                    },
                    confirm: function (content, okBtnText, cancelBtnText, callback) {
                        messager.setConfirmData(content, okBtnText, cancelBtnText, callback);
                        commonConfirm(messager.data);
                        openLayer('commonConfirm');
                    },
                    // 단일 쿠폰 다운로드 실패
                    singleCouponDownloadFailAlert: function (content) {
                        messager.alert(content, '확인', function () {
                            $('html').scrollTop(0);
                        });
                    },
                    // 예외 처리 없는 다운로드 성공
                    mustCouponDownloadSuccessAlert: function () {
                        var content = '';
                        content += '쿠폰 다운로드가 완료 되었습니다.<br/>';
                        content += '* '+ couponLimit +' 까지 사용가능<br/><br/>';
                        content += '다운로드 받으신 쿠폰은 나의 정보 > 쿠폰존 에서 확인 가능합니다.';
                        messager.alert(content, '확인');
                        // messager.alert(content, '확인', function() {
                        //   window.location.href = '${view.stContextPath}' + 'mypage/coupon/indexCouponDownload/';
                        // });
                    },
                    // 쿠폰 등록 성공
                    successInsertSerialCoupon: function () {
                        var content = '';
                        content += '쿠폰이 등록되었습니다.<br/>';
                        content += '등록한 쿠폰은 보유쿠폰에서 확인 가능합니다.';
                        messager.alert(content, '확인', function () {
                            $('#popupEventCode .con-bottom').hide();
                            $('#popupEventCode .pop-close').trigger('click');
                            $('html').scrollTop(0);
                        });
                    },
                    //쿠폰 등록 실패
                    failInsertSerialCoupon: function (content) {
                        messager.alert(content, '확인', function () {
                            $('html').scrollTop(0);
                        });
                    }
                };

                function downloadCoupon(type, objCoupon) {
                    returnUrl = window.location.pathname;
                    stPath = $('#openPop').data('st-path');
                    var options = {
                        url: stPath + 'xhr/member/getSession',
                        type: 'POST',
                        done: function (data) {
                            var session = JSON.parse(data);
                            if (session.mbrNo == 0) {
                                makeAlert('로그인 후 참여 가능합니다.', fnGoLoginPage);
                            } else {
                                var url = '';
                                if (type === 'single') {
                                    url = stPath + 'xhr/mypage/coupon/couponBookDownload';
                                }
                                if (type === 'multi') {
                                    url = stPath + 'xhr/mypage/coupon/couponDownload';
                                }
                                var options = {
                                    url: url,
                                    data: objCoupon,
                                    done: function (result) {
                                        messager.mustCouponDownloadSuccessAlert();
                                    }
                                };
                                ajax.call(options);
                            }
                        }
                    };
                    ajax.call(options);
                }

                // 전체 쿠폰 다운로드 이벤트 트리거
                PT_STATE.$PROJECT.off('click.couponAll').on('click.couponAll', '[data-role="btnCouponAll"]', function (e) {
                    e.preventDefault();

                    var strArr = [];
                    $('[data-role="btnCoupon"]').each(function (i) {
                        strArr.push('{cpBookNo: \'' + $(this).attr('data-cpNum') + '\'}');
                    });
                    downloadCoupon('multi', { couponBookJsonStr: '[' + strArr.join(', ') + ']' });
                });

                // 단일 쿠폰 다운로드 이벤트 트리거
                PT_STATE.$PROJECT.off('click.coupon').on('click.coupon', '[data-role="btnCoupon"]', function (e) {
                    e.preventDefault();
                    downloadCoupon('single', { cpBookNo: $(this).attr('data-cpNum') });
                });
            }
        },
        promoCoupon: {
            init(){
                var messager = {
                    data : {
                        content : "",
                        btnText : "확인",
                        okBtnText : "확인",
                        cancelBtnText : "취소"
                    },
                    setAlertData : function(content,btnText,callback){
                        messager.data.content = content;
                        messager.data.btnText = btnText;
                        if(callback != undefined){
                            messager.data.callback = callback;
                        }else{
                            delete messager.data[callback] ;
                        }
                    },
                    setConfirmData : function(content,okBtnText,cancelBtnText,callback){
                        messager.data.content = content;
                        messager.data.okBtnText = okBtnText;
                        messager.data.cancelBtnText = cancelBtnText;
                        if(callback != undefined){
                            messager.data.callback = callback;
                        }else{
                            delete messager.data[callback] ;
                        }
                    },
                    alert :  function(content,btnText,callback){
                        messager.setAlertData(content,btnText,callback);
                        commonAlert(messager.data);
                        openLayer('commonAlert');
                    },
                    confirm : function(content,okBtnText,cancelBtnText,callback){
                        messager.setConfirmData(content,okBtnText,cancelBtnText,callback);
                        commonConfirm(messager.data);
                        openLayer('commonConfirm');
                    },
                    // 단일 쿠폰 다운로드 실패
                    singleCouponDownloadFailAlert : function(content){
                        messager.alert(content,"확인",function(){
                            $("html").scrollTop(0);
                        });
                    },
                    // 전체 다운로드 성공
                    allCouponDownloadSuccessAlert : function(){
                        var content =  "";
                        content += "쿠폰이 발급되었습니다.<br/>";
                        content += "발급된 쿠폰은 보유쿠폰에서 확인 가능합니다.";
                        messager.alert(content,"확인",function(){
                            //window.location.href="/sec/"+"mypage/coupon/indexCouponDownload/";
                        });
                    }
                };

                function PromotionCouponDown(couponNum){
                    returnUrl = window.location.pathname;
                    stPath = $('#openPop').data('st-path');
                    var options = {
                        url : stPath + "xhr/mypage/coupon/promotionCouponDownload",
                        // 쿠폰 (단일/복수) 다운가능
                        data : {cpNos:[couponNum]},
                        done : function(result){

                            if (result.exCd === 'COP0024') {
                                makeAlert('로그인 후 다운 가능합니다.', fnGoLoginPage);
                            } else {

                                if(result.couponDownYn=="Y"){       //쿠폰다운받기 성공여부
                                    messager.allCouponDownloadSuccessAlert();
                                }else{
                                    if (result.exCd=="COP0008") {
                                        //수량부족 에러코드  <<커스텀하고자하는 에러코드만 조건추가
                                        messager.singleCouponDownloadFailAlert("오늘 데일리 선착순 쿠폰이 모두 소진되었습니다.<br/> 내일 다시 도전해보세요!");
                                    }else if(result.exCd=="COP0009"){
                                        messager.singleCouponDownloadFailAlert("이미 다운받으신 쿠폰입니다.<br/>보유쿠폰함을 확인해 주세요!");
                                    }else{
                                        //다른예외 코드는 기존의 시스템 정의 문구 출력
                                        messager.singleCouponDownloadFailAlert(result.exMsg);
                                    }
                                }
                            }
                        }
                    };
                    ajax.call(options);
                }

                // 단일/복수 쿠폰 다운로드 이벤트 트리거
                PT_STATE.$PROJECT.off('click.couponPromo').on('click.couponPromo', '[data-role="btnCouponPromo"]', function (e) {
                    e.preventDefault();
                    PromotionCouponDown($(this).attr('data-cpNum'));
                });
            }
        },
        modal: {
            /** 모달오픈버튼 클릭시 dimm 처리와 모달 오픈 함수 */
            init() {

                //모달 오픈
                PT_STATE.$PROJECT.off('.click.clickModal').on('click.clickModal', '[data-role="btnModal"]', function (e) {
                    console.log('test');
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
                    const winTop = $(window).scrollTop();
                    const winHeight = $(window).outerHeight();
                    const targetHeight = $target.outerHeight();
                    const headerHeight = !!$('header').length ? $('header').outerHeight() : 0;
                    const tabHeight = !!$('.sec_kv_tab').length ? $('.sec_kv_tab').outerHeight() : 0;
                    // const bannerHeight = !!$('.ins-preview-wrapper').length ? $('.ins-preview-wrapper').outerHeight() : 0;
                    const opt = $this.attr('data-option') ? JSON.parse($this.attr('data-option')) : data.opt;
                    const { video = data.opt.video, youtube = data.opt.youtube, focus = data.opt.focus } = opt;
                    const dimm_id = `dimm_${new Date().getTime()}`;

                    data.$prevfocus.push($this);
                    winHeight > targetHeight ? $target.css('top', winTop + (winHeight - targetHeight) / 2 - headerHeight - tabHeight) : $target.css('top', winTop);
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
        },
        sns: {
            init() {
                if (Kakao && !Kakao.isInitialized()) {
                    Kakao.init("5880e4317936087f2764a5d340e6bca6");
                    // Kakao.init("35647808cacf0c6d5840b49519b145f2"); 갤캠
                }

                function shareSns(url, title, image, desc) {
                    if (url == null || url == "") url = document.location.href;
                    const setting = {
                        objectType: "feed",
                        content: {
                            title: title,
                            description: desc,
                            imageUrl: image,
                            link: {
                                mobileWebUrl: url,
                                webUrl: url
                            }
                        },
                        buttons: [{
                            title: "자세히 보기",
                            link: {
                                mobileWebUrl: url,
                                webUrl: url
                            }
                        }],
                        installTalk: true,
                        fail: shareFail
                    };
                    Kakao.Link.sendDefault(setting)
                }

                function shareFail() {
                    const alertData = {
                        title: "alert",
                        content: "카카오톡 공유하기 기능을 실행할 수 없는 환경입니다."
                    };
                    commonAlert(alertData);
                    openLayer("commonAlert")
                }

                PT_STATE.$PROJECT.on('click', '[data-role="btnSns"]', function (e) {
                    e.preventDefault();
                    const $this = $(this);
                    const type = $this.attr('data-sns-type');
                    const url = $this.attr('data-sns-url') || $('meta[property="og:url"]').attr('content');
                    const title = $this.attr('data-sns-title') || $('meta[property="og:title"]').attr('content');
                    const desc = $this.attr('data-sns-desc') || $('meta[property="og:description"]').attr('content');
                    const img = $this.attr('data-sns-img') || $('meta[property="og:image"]').attr('content');

                    if (type === 'fb') { // 페이스북
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}?menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=800,height=650`);
                    } else if (type === 'blog' || type === 'cafe') { // 네이버블로그
                        window.open(`http://share.naver.com/web/shareView.nhn?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=800,height=650`);
                    } else if (type === 'insta') {
                        window.open('https://www.instagram.com/');
                    } else if (type === 'kakao') {
                        shareSns(url, title, img, desc);
                    }
                });
            }
        },
        sticky: {
            init() {
                var stickyMove = function() {
                    var _navHeight = $('.sec_nav').outerHeight();
                    if ($(window).scrollTop() >= $('.sec_nav').offset().top && $(window).scrollTop() <= $('.sec_anchor').offset().top - _navHeight){
                        $('.sticky_wrapper').addClass('fixed_start');
                    }else if ($(window).scrollTop() >= $('.sec_accordian').offset().top - _navHeight && $(window).scrollTop() <= $('.sec_modal').offset().top - _navHeight){
                        $('.sticky_wrapper').addClass('fixed_start');
                    }else{
                        $('.sticky_wrapper').removeClass('fixed_start');
                    }
                }
                $(window).on('scroll.sticky', stickyMove);
            }
        },
        tab: {
            /**
             * 탭 버튼 클릭시 해당 타겟 show 하는 함수
             * @param {object} params {'target': str, 'default': num}
             * @desc target : 해당 타켓
             * @desc default : 화면 로드 시 초기 액티브 index
             */
            click(params) {
                util.setEventState('clickTab', params);

                let firstPass = true;

                const data = {
                    params: util.getEventState('clickTab')
                };

                //탭 클릭시 타겟 show
                PT_STATE.$PROJECT.off('click.clickTab').on('click.clickTab', '[data-role-tab] > a', function (e) {
                    e.preventDefault();
                    const $this = $(this);

                    if($this.hasClass('active')) return;

                    const $parent = $this.closest('[data-role-tab]');
                    const $tabTarget = `[data-role-tab="${$parent.attr('data-role-tab')}"]`;
                    const { target } = util.findItem(data.params, 'el', $tabTarget);
                    const _idx = $this.attr('data-tab-idx');

                    //a11y
                    $parent.find('.selected_option').remove();
                    $this.addClass('active').siblings().removeClass('active');
                    $this.append('<span class="blind selected_option">선택됨</span>');

                    if(firstPass === false){ //처음 접속시 포커스 제거
                        $(target).attr('tabindex', 0);
                        data.params.forEach(function(item, index){
                            if(item.el === $tabTarget){
                                // 앵커이동
                                if(item.anc === true){
                                    $('html, body').stop().animate({scrollTop:$(target).offset().top - $($tabTarget).outerHeight() }, 500, function(){
                                        $(target).focusout(function(){
                                            $(target).removeAttr('tabindex');
                                        });
                                    });
                                }else{
                                    $(target).focusout(function(){
                                        $(target).removeAttr('tabindex');
                                    });
                                }
                            }
                        });
                        $(target).focus();
                    }

                    if(_idx === 'all'){
                        $(target).each((idx, item) => {
                            $(item).children().show();
                        })
                        return;
                    }

                    $(target).each((idx, item) => {
                        $(item).children().eq(_idx).show().siblings().hide();
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
        },
        video: {
            init(params) {
                util.setEventState('video', params);

                const data = {
                    opt: {
                        video: false,
                        youtube: false,
                    },
                    params: util.getEventState('video')
                };

                PT_STATE.$PROJECT.on('click', '[data-role-video]', function(e) {
                    e.preventDefault();
                    const $this = $(this);
                    const { target, video = data.opt.video, youtube = data.opt.youtube } = util.findItem(data.params, 'el', `[data-role-video="${$this.attr('data-role-video')}"]`);
                    const $target = $(target);

                    $target.addClass('on');

                    if(video) {
                        $target.find('source').attr('src', video);
                        $target[0].load();
                    }

                    if (youtube) {
                        $target
                            .attr('src', 'https://www.youtube.com/embed/' + youtube + '?rel=0&autoplay=1&howinfo=0&enablejsapi=1')
                            .on('load', function() {
                                this.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                            });
                    }
                });
            }
        },
        videoKv: {
            init(params) {
                util.setEventState('videoKv', params);

                const {target, maxCount} = params;
                const $video = $(target);
                let count = 1;

                function videoEvent($video) {
                    $video.find('source').attr('src', $video.attr('data-video').split('|')[ util.isMobile() ? 1 : 0 ]);
                    $video.trigger('load');
                }

                function resizeEvent($video) {
                    const _src = $video.attr('data-video').split('|')[ util.isMobile() ? 1 : 0 ];
                    const _thisSrc = $video.find('source').attr('src');

                    if (_src !== _thisSrc) {
                        videoEvent($video);
                        $video.removeClass('on');
                    }
                }

                videoEvent($video);

                $video.on('loadedmetadata', function() {
                    $video.addClass('on');
                });

                $video.on('ended', function() {
                    maxCount ?? this.play();
                    if (count < maxCount) {
                        count++;
                        this.play();
                    }else{
                        count === maxCount && $video.removeClass('on');
                    }
                });

                $(window).on('resize.video', function() {
                    let resizeTimer;

                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function() {
                        resizeEvent($video);
                    });
                });
            }
        },
        addResetCSS(arrCssHref){
            if(!PT_STATE.loadCSS){
                function loadCSS(href){
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = href;
                    document.head.appendChild(link);
                    PT_STATE.loadCSS = true;
                }
                if(arrCssHref){
                    arrCssHref.forEach((item) => loadCSS(item));
                } else {
                    config.loadCSS.forEach((item) => loadCSS(item));
                }
            }
        }
    }

    alert(1);

    window.PT_STATE.util = util;
    window.PT_STATE.module = modules;
})();