/**
 * Buying 0.0.1
 * 작성자 : Peter
 * 작성일 : 2023-07-03
 * 수정일 : 2023-07-03
 */
function uniqueArr(dupArr) {
    return dupArr.filter((item, idx) =>  dupArr.indexOf(item) === idx);
}

function diffArr(arr1, arr2) {
    return arr1.filter(element => !arr2.includes(element));
}

function findKeysStartingWith(obj, prefix) {
    return Object.keys(obj).filter(function(key) {
        return key.startsWith(prefix);
    });
}

function addComma(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getParameterByName(name) {
    const regex = new RegExp(`[\\?&]${name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')}=([^&#]*)`);
    const results = regex.exec(location.search);
    return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// 객체 또는 배열이 아닌 경우에는 false 반환
function isEmpty(value) {
    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return Object.keys(value).length === 0;
        }
    }
    return false;
}

function groupBy(data, key){
    return data.reduce(function (carry, el){
        let group = el[key];
        if (carry[group] === undefined){
            carry[group] = []
        }
        carry[group].push(el)
        return carry
    }, {})
}

function isMobile() {
    return $(window).outerWidth() <= 768;
}

function pxToVw(pc, mo) {
    const winWidth = $(window).outerWidth();
    const divide = isMobile() ? 720 : 1440;
    const pixel = isMobile() ? (mo === undefined ? pc : mo) : pc;
    return pixel >= 0 ? Math.min(pixel, (pixel / divide) * winWidth) : Math.max(pixel, (pixel / divide) * winWidth);
}

function setOption(dataList, groupList){
    dataList.forEach(function(item){
        let arrColor=[],arrOptA=[],arrOptB=[];
        groupList[item.group].forEach(function(groupItem){
            if(!!groupItem.optColorCd) arrColor.push(groupItem.optColorCd+'|'+groupItem.optColorNm+'|'+groupItem.optColor);
            if(!!groupItem.optACd) arrOptA.push(groupItem.optACd+'|'+groupItem.optA);
            if(!!groupItem.optBCd) arrOptB.push(groupItem.optBCd+'|'+groupItem.optB);
        });

        if(arrColor.length>0) item['arrColor'] = uniqueArr(arrColor);
        if(arrOptA.length>0) item['arrOptA'] = uniqueArr(arrOptA);
        if(arrOptB.length>0) item['arrOptB'] = uniqueArr(arrOptB);
    });
}

let eventsListeners = {}

const eventsEmitter = {
    on(key, events, handler) {
        const _self = this;
        if (typeof handler !== 'function') return _self;
        if (!eventsListeners[key]) eventsListeners[key] = [];
        eventsListeners[key][events] = handler;
    },
}

let resetTimeout = null;
const eventsStates = {
    // 상태 초기화 로직
    reset(params, executeCallbacks) {
        const buying = this;
        if(buying.params.reset && buying.params.reset.loading){
            try{
                $.blockUI({message:'<img src="http://www.samsung.com/sec/static/_images/common/ajax-loader-white.gif" alt="Loading…" />'});
                clearTimeout(resetTimeout);
                resetTimeout = setTimeout(function(){
                    $.unblockUI();
                }, 200);
            } catch (e) {
                $.unblockUI();
            }
        }

        buying.destroy();
        buying.init();

        if(executeCallbacks && typeof executeCallbacks === 'function'){
            executeCallbacks(buying);
        }
    },
    // 상태 업데이트 로직
    update(params, executeCallbacks) {
        const buying = this;
        buying.destroy();
        buying.params = params;
        buying.init();

        if(executeCallbacks && typeof executeCallbacks === 'function'){
            executeCallbacks(buying);
        }
    },
    // 상태 제거 로직
    destroy(executeCallbacks) {
        const buying = this;

        buying.$el.html(buying.htmlOrigin);
        buying.$el.removeClass((index, className) => (className.match(/(^|\s)pt_step_\S+/g) || []).join(' ')).removeClass('pt_last_step').removeClass('pt_active_prd');
        buying.params = JSON.parse(JSON.stringify(buying.origins));

        if(executeCallbacks && typeof executeCallbacks === 'function'){
            executeCallbacks(buying);
        }
    }
};

const prototypes = {
    eventsListeners,
    eventsEmitter,
    eventsStates
}

export class Buying {
    constructor(element, params) {
        const buying = this;
        const defaults = {
            type: 'single',
            pdList: {},
            parsedData: {},
            defaults: true,
            sessionStorage: true,
            reset: {
                loading: false,
            },
            autoScope: {
                use: false,
                model: ''
            },
            option: {
                type: 'disabled',
                scroll: {
                    use: false,
                    speed: 600,
                    gab: 0,
                },
            },
            paging: {
                use: false,
                pcIncrease: 6,
                moIncrease: 4,
                btnMore: '[data-btn-more]',
            },
        };
        buying.__buying__ = true;
        buying.el = element;
        buying.$el = $(element);
        buying.htmlOrigin = $(element).html();
        buying.params = defaults;
        buying.eventsListeners = {}

        Object.keys(params).forEach(key => {
            if (typeof params[key] === "object" && key !== 'pdList' && key !== 'on') {
                Object.entries(params[key]).forEach(([innerKey, innerValue]) => {
                    buying.params[key][innerKey] = innerValue;
                });
            } else {
                buying.params[key] = params[key];
            }
        });

        buying.origins = JSON.parse(JSON.stringify(buying.params));

        buying.init();

        return buying;
    }

    init(){
        const buying = this;
        const state = {
            realKey: null,
            realIndex: 0,
            lastStep: 0,
            etcRealIndex: 0,
            etcLastStep: 0,
            isLastStep: false,
            isEtcLastStep: false,
            isError: false,
            isOnce: false,
            htmlOption: {
                all: {},
                show: {},
                hide: {},
            },
            selectOption: {},
            selectOptionEtc: {},
            selected: {},
            init: true,
        };

        buying.state = state;

        if (buying.params && buying.params.on) {
            Object.keys(buying.params.on).forEach(eventName => {
                // console.info(buying.params.on[eventName]);
                eventsEmitter.on(buying.el, eventName, buying.params.on[eventName]);
            });
        }

        if (buying.state.init) {
            if(buying.params.type==='multi'||buying.params.type==='list') {
                buying.setData();
            } else {
                buying.params.pdList = buying.params.pdList.filter((item) => item.hidden.trim().toUpperCase() != 'O');
            }
            buying.render();
        }
    }

    renderOption(_key,_checked) {
        const buying = this;
        const allList = buying.params.pdList;
        const htmlOpt = buying.state.htmlOption;
        const selectOpt = buying.state.selectOption;
        const optKeys = findKeysStartingWith(allList[0], "optCd");
        let newList = {};

        // 마지막 스텝 선언
        buying.state.lastStep = optKeys.length;
        const lastStep = buying.state.lastStep;
        let isLastIdx = false;

        // 초기화
        optKeys.forEach(function(key, idx) {
            let arrOptInit = [];

            Object.keys(htmlOpt).forEach(name => htmlOpt[name][key] = []);

            allList.forEach(function(product){
                arrOptInit.push(product[key]);
            });

            uniqueArr(arrOptInit).forEach(function(optNm){
                htmlOpt['all'][key].push(optNm);
            });
        });

        optKeys.forEach(function(key, idx) {
            let arrOpt = [];
            let arrAllOpt = [];
            let arrNextAllOpt = [];
            let checked = _key == key ? _checked : selectOpt[key];

            // 마지막 스텝 여부 확인
            if(lastStep === idx+1){
                isLastIdx = true;
            }

            // 각 옵션별 사용되는 옵션값 분류
            newList = newList.length ? newList : allList;

            newList.forEach(function(prd){
                if(prd[key] == checked) arrOpt.push(prd[key]);
                arrAllOpt.push(prd[key]);
            });

            arrOpt = uniqueArr(arrOpt);
            arrAllOpt = uniqueArr(arrAllOpt);

            // 선택값이 없으면 선택가능한 첫번째 값으로 변경함
            if(!!checked && !arrOpt.length){
                checked = arrAllOpt[0];
                selectOpt[key] = checked;
                arrOpt.push(checked);
            }

            // 다음 스텝에서 선택 가능한 제품 저장
            const nextKey = isLastIdx ? false : optKeys[idx+1];
            if(nextKey){
                newList = newList.filter(item => item[key] == checked);
                newList.forEach(function(nextPrd){
                    arrNextAllOpt.push(nextPrd[nextKey]);
                });

                arrNextAllOpt = uniqueArr(arrNextAllOpt);
            }

            // 선택된 옵션 저장
            selectOpt[key] = (key === _key) ? _checked : (!selectOpt[key] ? null : selectOpt[key]);

            // 각 옵션별 show 옵션 추가
            if(arrOpt.length) {
                buying.state.realIndex = idx+1; // 현재 진행 단계 인덱스값 저장
                buying.state.realKey = key;     // 현재 진행 단계 키값 저장
                arrAllOpt.forEach(function(optNm){
                    htmlOpt['show'][key].push(optNm);
                });
                // 다음 스텝의 show 옵션 추가
                if(nextKey){
                    arrNextAllOpt.forEach(function(optNm){
                        htmlOpt['show'][nextKey].push(optNm);
                    });
                }
            }

            // 각 옵션별 hide 옵션 추가
            htmlOpt['hide'][key] = diffArr(htmlOpt['all'][key], htmlOpt['show'][key]);

            // 다음 스텝의 hide 옵션 추가
            if(nextKey){
                htmlOpt['hide'][nextKey] = diffArr(htmlOpt['all'][nextKey], htmlOpt['show'][nextKey]);
            }

            // 조회 결과 저장
            if(isLastIdx){
                let complete = true;
                Object.keys(selectOpt).forEach(key => {
                    if(!selectOpt[key]) complete = false;
                });
                if(complete){
                    buying.state.isLastStep = true;
                    buying.state.selected = newList.filter(item => item[key] == checked)[0];
                }
            }
        });

        // sessionStorage 현재 상태값 저장
        if(buying.params.sessionStorage){
            sessionStorage.setItem(buying.el, JSON.stringify(buying.state));
        }
    }

    renderMapping() {
        const buying = this;
        const isLastStep = buying.state.isLastStep;
        const optKey = buying.$el.find('[data-opt-key]');
        const optEtc = buying.$el.find('[data-opt-etc]');

        // ETC 마지막 스탭 선언
        buying.state.etcLastStep =  buying.state.lastStep + (optEtc ? optEtc.length : 0);

        // defaults false 설정 시, disabled 활성화
        if(!buying.params.defaults){
            const nextIdx = buying.state.realIndex;
            const lastStep = buying.state.lastStep;

            if(nextIdx === lastStep && optEtc.length > 0){
                $(optEtc[0]).removeClass('pt_disabled');
                $(optEtc[0]).find('input[type="radio"]').attr('disabled',false);
            } else {
                $(optKey[nextIdx]).removeClass('pt_disabled');
                $(optKey[nextIdx]).find('input[type="radio"]').attr('disabled',false);
            }
        }

        // 선택값이 없으면 선택가능한 첫번째 값으로 변경함
        const allItem = buying.state.htmlOption.all;
        Object.keys(allItem).forEach(key => {
            const selectOption = buying.state.selectOption[key];
            optKey.find('input[type="radio"]').each(function(idx,item){
                const chkVal = $(item).val();
                if(allItem[key].includes(chkVal) && $(item).prop('checked') && chkVal !== selectOption) {
                    $(item).closest('[data-opt-key]').find('input').each(function (idx, inner) {
                        if($(inner).val() === selectOption) $(inner).prop('checked', true);
                    });
                }
            });
        });

        // autoScope
        if(buying.params.autoScope.use){
            const optCdA = buying.state.selectOption.optCdA;
            this.setOptAutoScope(optCdA);
        }

        // option show
        const showItem = buying.state.htmlOption.show;
        Object.keys(showItem).forEach(key => {
            optKey.find('input[type="radio"]').each(function(idx,item){
                if(showItem[key].includes($(item).val())) {
                    $(item).attr('disabled', false);
                    $(item).closest('[data-opt-btn]').removeClass('pt_hide pt_disabled');
                }
            });
        });

        // option hide
        const hideItem = buying.state.htmlOption.hide;
        Object.keys(hideItem).forEach(key => {
            optKey.find('input[type="radio"]').each(function(idx,item){
                if(!$(item).closest('[data-opt-key]').hasClass('pt_disabled') && hideItem[key].includes($(item).val())) {
                    $(item).attr('disabled', true);
                    if(buying.params.option.type === 'disabled'){
                        $(item).closest('[data-opt-btn]').addClass('pt_disabled');
                    } else {
                        $(item).closest('[data-opt-btn]').addClass('pt_hide');
                    }
                }
            });
        });

        // add class
        const realIdx = buying.state.realIndex;
        if(!buying.$el.hasClass(`pt_step_${realIdx}`)){
            buying.$el.removeClass(function(index, className) {
                return (className.match(/(^|\s)pt_step_\S+/g) || []).join(' ');
            });
            buying.$el.addClass(`pt_step_${!!buying.state.etcRealIndex ? buying.state.etcRealIndex : realIdx}`);
        }

        if(isLastStep){
            const selected = buying.state.selected;

            if(!selected) {
                console.error('선택된 제품이 없습니다')
                return;
            }

            // add class
            if(!buying.$el.hasClass('pt_active_prd')){
                buying.$el.addClass('pt_active_prd');
            }

            // text mapping
            try {
                buying.$el.find('[data-opt-text]').each(function(){
                    const textKey = $(this).attr('data-opt-text');
                    let text = !!selected[textKey] ? selected[textKey].trim() : '';
                    if(/^\d+$/.test(text)) text = addComma(text); // 숫자이면 콤마추가
                    $(this).html(text);
                });
            } catch (e) { console.error(e); }

            // show mapping
            try {
                buying.$el.find('[data-opt-show]').each(function(){
                    const text = $(this).attr('data-opt-show');
                    if (text.includes('==')) {
                        const [key, value] = text.split('==');
                        $(this).toggle(buying.state.selected[key] === value);
                    } else if (text.includes('!=')) {
                        const [key, value] = text.split('!=');
                        $(this).toggle(buying.state.selected[key] !== value);
                    }
                });
            } catch (e) { console.error(e); }

            // show mapping new
            try {
                buying.$el.find('[btnt-opt-show]').each(function(){
                    $(this).toggle(conditionTransfer(buying, $(this), 'btnt-opt-show'));
                });
            } catch (e) { console.error(e); }
        }
    }

    renderScrollEvt($el){
        const buying = this;
        const isDefault= buying.params.defaults;
        const $next = $el.next();
        const isChkSession = !!sessionStorage.getItem(buying.el) && !buying.state.isOnce;

        if(!isDefault && $next){
            const speed = buying.params.option.scroll.speed;
            const gab = pxToVw(buying.params.option.scroll.gab);
            if(!$el.hasClass('pt_active')){
                if(!isChkSession) $('html, body').stop().animate({ scrollTop: $next.offset().top - gab }, speed, "easeInOutQuad");
                $el.addClass('pt_active');
            }
        }
    }

    testing(_key,_checked) {
        const buying = this;
        const showOpt = buying.state.htmlOption.show[_key];
        if(!!showOpt){
            const isOptChk = !!showOpt.filter((item) => item === _checked).length;
            if(!isOptChk){
                buying.state.isError = true;
                console.error('buyingError: HTML validation is needed.');
                return false;
            }
        }
        if(buying.state.isError){
            console.error('buyingError: previous error remains unresolved.');
            return false;
        }
        return true;
    }

    changeOpt() {
        const buying = this;
        const $optKey = buying.$el.find('[data-opt-key]');
        let keyStep = 0;

        $optKey.each(function(idx, item){
            const key = $(item).attr('data-opt-key');
            const checked = $(item).find('input[type="radio"]:checked').length ? $(item).find('input[type="radio"]:checked').val() : null;
            if(!!checked) keyStep++;
            buying.state.realIndex = keyStep;
        });

        buying.$el.on('change', '[data-opt-key] input[type="radio"]', function (e) {
            e.preventDefault();
            const _self = this;
            const key = $(_self).closest('[data-opt-key]').attr('data-opt-key');
            const checked = $(_self).val();
            const isTesting = buying.testing(key,checked);

            if(isTesting){
                if(typeof eventsListeners[buying.el].optionChangeStart === 'function'){
                    let buyingOrigin = {
                        ...buying,
                        state: JSON.parse(JSON.stringify(buying.state))
                    };
                    eventsListeners[buying.el].optionChangeStart(buyingOrigin,_self);
                }
                buying.renderOption(key,checked);
                buying.renderMapping();
                if(buying.params.option.scroll.use){
                    const $el = $(_self).closest('[data-opt-key]');
                    buying.renderScrollEvt($el);
                }
                if(typeof eventsListeners[buying.el].optionChangeEnd === 'function'){
                    eventsListeners[buying.el].optionChangeEnd(buying,_self);
                }
                if(typeof eventsListeners[buying.el].productChangeEnd === 'function' && buying.state.isLastStep){
                    eventsListeners[buying.el].productChangeEnd(buying);
                }
                if(typeof eventsListeners[buying.el].optionAllChangeEnd === 'function' && buying.state.isLastStep && buying.state.isEtcLastStep){
                    eventsListeners[buying.el].optionAllChangeEnd(buying);
                }
            }
        });
    }

    changeOptEtc() {
        const buying = this;
        let etcStep = 0;

        buying.$el.find('[data-opt-etc]').each(function(idx, item){
            const key = $(item).attr('data-opt-etc');
            const checked = $(item).find('input[type="radio"]:checked').length ? $(item).find('input[type="radio"]:checked').val() : null;
            const etcMaxCnt = $(item).find('input[type="radio"]').length;
            if(!!checked) etcStep++;
            buying.state.etcRealIndex = buying.state.realIndex + etcStep;

            if(etcStep === etcMaxCnt){
                buying.state.isEtcLastStep = true;
            }
            buying.state.selectOptionEtc[key] = checked;
        });

        buying.$el.on('change', '[data-opt-etc] input[type="radio"]', function (e) {
            e.preventDefault();
            const _self = this;
            const key = $(_self).closest('[data-opt-etc]').attr('data-opt-etc');
            const checked = $(_self).val();
            const $optEtc = buying.$el.find('[data-opt-etc]');
            etcStep = 0;

            if(typeof eventsListeners[buying.el].optionEtcChangeStart === 'function'){
                let buyingOrigin = {
                    ...buying,
                    state: JSON.parse(JSON.stringify(buying.state))
                };
                eventsListeners[buying.el].optionEtcChangeStart(buyingOrigin,_self);
            }

            // state change s
            buying.state.selectOptionEtc[key] = checked;
            $optEtc.each(function(idx, item){
                const inner = $(item).find('input[type="radio"]:checked').val()
                if(!!inner) etcStep++;
            });
            buying.state.etcRealIndex = buying.state.realIndex + etcStep;
            if( buying.state.etcRealIndex ===  buying.state.etcLastStep ){
                buying.state.isEtcLastStep = true;
            }
            // state change e

            // add class
            if(!buying.$el.hasClass(`pt_step_${buying.state.etcRealIndex}`)){
                buying.$el.removeClass(function(index, className) {
                    return (className.match(/(^|\s)pt_step_\S+/g) || []).join(' ');
                });
                buying.$el.addClass(`pt_step_${buying.state.etcRealIndex}`);
            }

            if(buying.state.isEtcLastStep && !buying.$el.hasClass('pt_last_step')){
                buying.$el.addClass('pt_last_step');
            }

            // defaults false 설정 시, disabled 활성화
            if(!buying.params.defaults){
                const isLastStep = buying.state.isEtcLastStep;
                if(!isLastStep){
                    $optEtc.eq(etcStep).removeClass('pt_disabled');
                    $optEtc.eq(etcStep).find('input[type="radio"]').attr('disabled',false);
                }
            }

            // sessionStorage 현재 상태값 저장
            if(buying.params.sessionStorage){
                sessionStorage.setItem(buying.el, JSON.stringify(buying.state));
            }

            if(buying.params.option.scroll.use){
                const $el = $(_self).closest('[data-opt-etc]');
                buying.renderScrollEvt($el);
            }

            if(typeof eventsListeners[buying.el].optionEtcChangeEnd === 'function'){
                eventsListeners[buying.el].optionEtcChangeEnd(buying,_self);
            }
            if(typeof eventsListeners[buying.el].optionEtcAllChangeEnd === 'function' && buying.state.isEtcLastStep){
                eventsListeners[buying.el].optionEtcAllChangeEnd(buying);
            }
            if(typeof eventsListeners[buying.el].optionAllChangeEnd === 'function' && buying.state.isLastStep && buying.state.isEtcLastStep){
                eventsListeners[buying.el].optionAllChangeEnd(buying);
            }
        });
    }

    setData() {
        const buying = this;
        const list = buying.params.pdList;
        let visibleData = list.filter((item) => item.hidden.trim().toUpperCase() != 'O');
        let listDefault = !!visibleData[0].default ? visibleData.filter((item) => item.default.trim().toUpperCase() == 'O') : [];
        let listGroup = groupBy(visibleData, 'group');
        let listCategory = [];

        if(buying.params.type === 'list' ){
            listCategory = groupBy(listDefault, 'category');
            setOption(visibleData, listGroup);
        }

        if(!isEmpty(visibleData)) buying.params.parsedData['visibleData'] = visibleData;
        if(!isEmpty(listGroup)) buying.params.parsedData['listGroup'] = listGroup;
        if(!isEmpty(listDefault)) buying.params.parsedData['listDefault']  = listDefault;
        if(!isEmpty(listCategory)) buying.params.parsedData['listCategory'] = listCategory;
    }

    setOptDefaults() {
        const buying = this;

        function render(){
            const getData = sessionStorage.getItem(buying.el) ? JSON.parse(sessionStorage.getItem(buying.el)) : null;
            if(buying.params.sessionStorage && !!getData){
                const selectOpt = getData.selectOption;
                Object.keys(selectOpt).forEach(key => {
                    if(!!selectOpt[key]){
                        const $iptAll = buying.$el.find(`[data-opt-key="${key}"] input[type="radio"]`);
                        $iptAll.each(function(idx,item){
                            if($(item).val() === selectOpt[key]) $(item).trigger('click');
                        });
                    }
                });

                const selectOptEtc = getData.selectOptionEtc;
                Object.keys(selectOptEtc).forEach(key => {
                    if(!!selectOptEtc[key]){
                        const $iptAll = buying.$el.find(`[data-opt-etc="${key}"] input[type="radio"]`);
                        $iptAll.each(function(idx,item){
                            if($(item).val() === selectOptEtc[key]) $(item).trigger('click');
                        });
                    }
                });

            }else if(!buying.params.defaults){
                const $optKey = buying.$el.find('[data-opt-key]');
                const $optEtc = buying.$el.find('[data-opt-etc]');
                $optKey.each(function(idx,item){
                    if(idx > 0){
                        $(item).addClass('pt_disabled');
                        $(item).find('input[type="radio"]').attr('disabled',true);
                    }
                });
                $optEtc.each(function(idx,item){
                    $(item).addClass('pt_disabled');
                    $(item).find('input[type="radio"]').attr('disabled',true);
                });
                buying.$el.addClass(`pt_step_0`);

            }else{
                const pdList = buying.params.pdList;
                const selected = (pdList.filter((inner) => inner.default.toUpperCase() === 'O'))[0];
                const optKeys = findKeysStartingWith(selected, "optCd");
                optKeys.forEach(function(key) {
                    const $iptAll = buying.$el.find(`[data-opt-key="${key}"] input[type="radio"]`);
                    $iptAll.each(function(idx,item){
                        if($(item).val() === selected[key]) $(item).trigger('click');
                    });
                });
            }
        }

        // 앵커드 기능, 사용방법 : (페이지 URL)?sku=(제품 스큐)
        const qsSku = getParameterByName('sku');
        if(!!qsSku && buying.el === '#pt_buying'){
            const pdList = buying.params.pdList;
            const selected = (pdList.filter((inner) => inner.sku === qsSku))[0];
            if(!!selected.sku){
                const optKeys = findKeysStartingWith(selected, "optCd");
                optKeys.forEach(function(key) {
                    const $iptAll = buying.$el.find(`[data-opt-key="${key}"] input[type="radio"]`);
                    $iptAll.each(function(idx,item){
                        if($(item).val() === selected[key]) $(item).trigger('click');
                    });
                });
            } else {
                render();
            }
        } else {
            render();
        }
    }

    setOptAutoScope(model) {
        const buying = this;
        if(buying.params.autoScope.use && buying.params.autoScope.model){
            const pdList = buying.params.pdList;
            const optKeys = findKeysStartingWith(pdList[0], "optCd");
            let _model = model ? model : buying.params.autoScope.model;

            optKeys.forEach(function(key, idx) {
                const $iptWrap = buying.$el.find(`[data-opt-key="${key}"]`);
                const isAutoScope = $iptWrap.attr('data-auto-scope');
                if(idx > 0 && isAutoScope !== 'false'){
                    const $iptAll = $iptWrap.find('input[type="radio"]');
                    $iptAll.closest('[data-opt-btn]').hide();
                    $iptAll.each(function(idx,item){
                        const isChk = (pdList.filter((inner) => inner.optCdA === _model && inner[key] === $(item).val()));
                        if(isChk.length > 0){
                            $(item).closest('[data-opt-btn]').show();
                        }
                    });
                }
            });
        }
    }

    render() {
        const buying = this;
        if(typeof eventsListeners[buying.el].init === 'function'){
            eventsListeners[buying.el].init(buying);
        }
        buying.changeOpt();
        buying.changeOptEtc();
        buying.setOptAutoScope();
        buying.setOptDefaults();
        buying.state.isOnce = true;
    }
}

Object.keys(prototypes).forEach(protoGroup => {
    Object.keys(prototypes[protoGroup]).forEach(protoMethod => {
        Buying.prototype[protoMethod] = prototypes[protoGroup][protoMethod];
    });
});