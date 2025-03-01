/**
 * API 호출 시 공통으로 수행되는 처리에 대한 함수
 *
 * @details
 * 이 함수는 전역에서 사용되는 API 호출 과정에서 필요한 공통 처리를 담당합니다.
 * 에러 핸들링, 인증 처리 등 API 호출에 필요한 기본적인 사항을 정리하여
 * 코드의 재사용성을 높이고, 에러 가능성을 줄입니다.
 *
 * @version 1.0.4
 * @update 2024-08-28
 */
;(function(){
    'use strict';

    let config = {
        debugMode: false,

        /* 아래 옵션 수정 금지 */
        isLocal: false,
        apiUrl: '/sec/',
        isSamsung: document.domain.includes("samsung.com"),
        isSamsungebiz: document.domain.includes("samsungebiz.com"),
    }

    config.isLocal = !(config.isSamsung || config.isSamsungebiz);

    if(config.isSamsungebiz){
        config.apiUrl = '/event/galaxycampus/';
    }

    function start(funcName, start){
        if(!service.performance[funcName]){
            service.performance[funcName] = {
                start: 0,
                end: 0,
                _cycle: 0,
                _performance: []
            }
        }
        service.performance[funcName].start = start;
    }

    function end(funcName, end){
        service.performance[funcName].end = end;
        service.performance[funcName]._cycle += 1;
        service.performance[funcName]._performance.push(`${(end - service.performance[funcName].start).toFixed(1)}ms`);
    }

    function checkPerformance(funcName, callBack) {
        try {
            if(config.debugMode) start(funcName, performance.now());

            if(callBack) {
                callBack();
            } else {
                console.warn('callback function has not been specified.');
            }

            if(config.debugMode) end(funcName, performance.now());
        } catch (e) {}
    }

    const $secWrap = $('.sec_project_wrap');

    const service = {
        /*
         * ex) netFunnel = {
         *   buy: 'b2c_promotion',     // string
         *   npay: 'b2c_promotion',    // string
         *   cart: 'b2c_promotion',    // string
         *   present: 'b2c_promotion', // string
         *   pickup: 'b2c_promotion'   // string
         * }
         */
        initBtnAll(netFunnel) {
            const render = function(){
                service.initBuy(null,(netFunnel && netFunnel.buy) ? netFunnel.buy : null);
                service.initNPay(null,(netFunnel && netFunnel.npay) ? netFunnel.npay : null);
                service.initCart(null, (netFunnel && netFunnel.cart) ? netFunnel.cart : null);
                service.initPresent(null, (netFunnel && netFunnel.present) ? netFunnel.present : null);
                service.initPickup(null, (netFunnel && netFunnel.pickup) ? netFunnel.pickup : null);
            }
            checkPerformance('initBtnAll', render);
        },
        initBtnAllOff() {
            $secWrap.off(`click.pt_btnBuy`);
            $secWrap.off(`click.pt_btnNPay`);
            $secWrap.off(`click.pt_btnCart`);
            $secWrap.off(`click.pt_present`);
            $secWrap.off(`click.pt_pickup`);
        },
        initBuy(target, netFunnelId){
            const render = function(){
                if(!target) target='[data-role="btnBuy"]';
                if(!$(target).length) return;

                $secWrap.off(`click.pt_btnBuy`).on(`click.pt_btnBuy`, target, function (e) {
                    e.preventDefault();
                    try {
                        const _self = this;
                        const bindRender = function(){
                            const $btnBuy = $(_self);
                            let arrParams = [];
                            let params = {
                                goodsId: $btnBuy.attr('data-gcode'),
                                qty: 1
                            }

                            // 매장픽업
                            const pckStrNo = $('#plazaNo-'+$btnBuy.attr('data-gcode')).text();
                            if(pckStrNo){
                                params.pckStrNo = pckStrNo;
                                params.pickupCapaDate = $('#pickupCapaDate-'+$btnBuy.attr('data-gcode')).text();
                                params.pickupCapaTime = $('#pickupCapaTime-'+$btnBuy.attr('data-gcode')).text();
                            }

                            // 중고보상
                            if($btnBuy.attr('data-tradeIn')){
                                params.tradeIn = $btnBuy.attr('data-tradeIn') ? $btnBuy.attr('data-tradeIn') : 'N';
                            }

                            // 체험이벤트
                            if($btnBuy.attr('data-trial')){
                                params.galaxyTrial = $btnBuy.attr('data-trial') ? $btnBuy.attr('data-trial') : 'N';
                            }

                            // 마갤클코드
                            if($btnBuy.attr('data-galaxyCd')){
                                params.galaxyClub = $btnBuy.attr('data-galaxyClub') ? $btnBuy.attr('data-galaxyClub') : 'N';
                                params.galaxyClubTpCd = $btnBuy.attr('data-galaxyCd');
                            }

                            arrParams.push(params);

                            // 네이버페이 유무
                            const useNPay = $btnBuy.attr('data-npay') ? $btnBuy.attr('data-npay') : 'N';

                            // paramsB 번들용
                            let paramsB = {};
                            if($btnBuy.attr('data-gcodeB') && $btnBuy.attr('data-gcodeB').trim() !== '-'){
                                paramsB = {
                                    goodsId: $btnBuy.attr('data-gcodeB'),
                                    qty: 1
                                }
                                // 매장픽업
                                const pckStrNo = $('#plazaNo-'+$btnBuy.attr('data-gcode')).text();
                                if(pckStrNo){
                                    paramsB.pckStrNo = pckStrNo;
                                    paramsB.pickupCapaDate = $('#pickupCapaDate-'+$btnBuy.attr('data-gcode')).text();
                                    paramsB.pickupCapaTime = $('#pickupCapaTime-'+$btnBuy.attr('data-gcode')).text();
                                }
                                arrParams.push(paramsB);
                            }

                            if(config.isLocal){
                                console.info('[Local:buy]', {
                                    target: target,
                                    params: params,
                                    useNPay: useNPay
                                });

                            } else {
                                if(netFunnelId){
                                    NetFunnel_Action({action_id:netFunnelId}, function(ev,ret) {
                                        fnBuyDirectByMultiId(arrParams, useNPay);
                                    });
                                    if(config.debugMode){
                                        console.info('[debugMode]initBuy',{
                                            'netFunnelId': netFunnelId,
                                            'params': arrParams,
                                        })
                                    }
                                } else {
                                    fnBuyDirectByMultiId(arrParams, useNPay);
                                }
                            }
                        }

                        checkPerformance(`_${arguments[0].type}:${target}`, bindRender);
                    } catch (e) {}
                });
            }

            checkPerformance('initBuy', render);
        },
        initNPay(target, netFunnelId){
            const render = function(){
                if(!target) target='[data-role="btnNPay"]';
                if(!$(target).length) return;

                $secWrap.off(`click.pt_btnNPay`).on(`click.pt_btnNPay`, target, function (e) {
                    e.preventDefault();
                    try {
                        const _self = this;
                        const bindRender = function(){
                            const $btnBuy = $(_self);
                            let arrParams = [];
                            let params = {
                                goodsId: $btnBuy.attr('data-gcode'),
                                qty: 1
                            }

                            // 매장픽업
                            const pckStrNo = $('#plazaNo-'+$btnBuy.attr('data-gcode')).text();
                            if(pckStrNo){
                                params.pckStrNo = pckStrNo;
                                params.pickupCapaDate = $('#pickupCapaDate-'+$btnBuy.attr('data-gcode')).text();
                                params.pickupCapaTime = $('#pickupCapaTime-'+$btnBuy.attr('data-gcode')).text();
                            }

                            // 중고보상
                            if($btnBuy.attr('data-tradeIn')){
                                params.tradeIn = $btnBuy.attr('data-tradeIn') ? $btnBuy.attr('data-tradeIn') : 'N';
                            }

                            // 체험이벤트
                            if($btnBuy.attr('data-trial')){
                                params.galaxyTrial = $btnBuy.attr('data-trial') ? $btnBuy.attr('data-trial') : 'N';
                            }

                            // 마갤클코드
                            if($btnBuy.attr('data-galaxyCd')){
                                params.galaxyClub = $btnBuy.attr('data-galaxyClub') ? $btnBuy.attr('data-galaxyClub') : 'N';
                                params.galaxyClubTpCd = $btnBuy.attr('data-galaxyCd');
                            }

                            arrParams.push(params);

                            // 네이버페이 유무
                            const useNPay = $btnBuy.attr('data-npay') ? $btnBuy.attr('data-npay') : 'N';

                            // paramsB 번들용
                            let paramsB = {};
                            if($btnBuy.attr('data-gcodeB') && $btnBuy.attr('data-gcodeB').trim() !== '-'){
                                paramsB = {
                                    goodsId: $btnBuy.attr('data-gcodeB'),
                                    qty: 1
                                }
                                // 매장픽업
                                const pckStrNo = $('#plazaNo-'+$btnBuy.attr('data-gcode')).text();
                                if(pckStrNo){
                                    paramsB.pckStrNo = pckStrNo;
                                    paramsB.pickupCapaDate = $('#pickupCapaDate-'+$btnBuy.attr('data-gcode')).text();
                                    paramsB.pickupCapaTime = $('#pickupCapaTime-'+$btnBuy.attr('data-gcode')).text();
                                }
                                arrParams.push(paramsB);
                            }

                            if(config.isLocal){
                                console.info('[Local:buy]', {
                                    target: target,
                                    params: params,
                                    useNPay: useNPay
                                });

                            } else {
                                if(netFunnelId){
                                    NetFunnel_Action({action_id:netFunnelId}, function(ev,ret) {
                                        fnBuyDirectByMultiId(arrParams, useNPay);
                                    });
                                    if(config.debugMode){
                                        console.info('[debugMode]initBuy',{
                                            'netFunnelId': netFunnelId,
                                            'params': arrParams,
                                        })
                                    }
                                } else {
                                    fnBuyDirectByMultiId(arrParams, useNPay);
                                }
                            }
                        }

                        checkPerformance(`_${arguments[0].type}:${target}`, bindRender);
                    } catch (e) {}
                });
            }

            checkPerformance('initNPay', render);
        },
        initCart(target, netFunnelId){
            const render = function() {
                if (!target) target = '[data-role="btnCart"]';
                if (!$(target).length) return;

                $secWrap.off(`click.pt_btnCart`).on(`click.pt_btnCart`, target, function (e) {
                    e.preventDefault();
                    try {
                        const _self = this;
                        const bindRender = function(){
                            const $btnCart = $(_self);
                            let arrParams = [];
                            let params = {
                                goodsId: $btnCart.attr('data-gcode'),
                                qty: 1
                            }

                            params.tradeIn = $btnCart.attr('data-tradeIn') ? $btnCart.attr('data-tradeIn') : 'N';

                            arrParams.push(params);

                            // paramsB 번들용
                            let paramsB = {};
                            if($btnCart.attr('data-gcodeB') && $btnCart.attr('data-gcodeB').trim() !== '-'){
                                paramsB = {
                                    goodsId: $btnCart.attr('data-gcodeB'),
                                    qty: 1
                                }
                                arrParams.push(paramsB);
                            }

                            if (config.isLocal) {
                                console.info('[Local:cart]', arrParams);
                            } else {
                                if (netFunnelId) {
                                    NetFunnel_Action({action_id: netFunnelId}, function (ev, ret) {
                                        fnCartDirectByMultiId(arrParams);
                                    });
                                    if(config.debugMode){
                                        console.info('[debugMode]initCart',{
                                            'netFunnelId': netFunnelId,
                                            'params': arrParams,
                                        })
                                    }
                                } else {
                                    fnCartDirectByMultiId(arrParams);
                                }
                            }
                        }

                        checkPerformance(`_${arguments[0].type}:${target}`, bindRender);
                    } catch (e) {}
                });
            }

            checkPerformance('initCart', render);
        },
        initPresent(target, netFunnelId){
            const render = function() {
                if(!target) target='[data-role="btnPresent"]';
                if(!$(target).length) return;

                $secWrap.off(`click.pt_present`).on(`click.pt_present`, target, function (e) {
                    e.preventDefault();
                    try {
                        const _self = this;
                        const bindRender = function(){
                            const $btnPresent = $(_self);
                            const sku = $btnPresent.attr('data-sku');
                            if(config.isLocal){
                                console.info('[Local:present]',sku);
                            } else {
                                if(netFunnelId){
                                    NetFunnel_Action({action_id:netFunnelId}, function(ev,ret) {
                                        presentDirect(sku, '_self');
                                    });
                                    if(config.debugMode){
                                        console.info('[debugMode]initPresent',{
                                            'netFunnelId': netFunnelId,
                                            'sku': sku,
                                        })
                                    }
                                } else {
                                    presentDirect(sku, '_self');
                                }
                            }
                        }

                        checkPerformance(`_${arguments[0].type}:${target}`, bindRender);
                    } catch (e) {}
                });
            }

            checkPerformance('initPresent', render);
        },
        initPickup(target, netFunnelId){
            const render = function() {
                if(!target) target='[data-role="btnPickup"]';
                if(!$(target).length) return;

                $secWrap.off(`click.pt_pickup`).on(`click.pt_pickup`, target, function (e) {
                    e.preventDefault();
                    try {
                        const _self = this;
                        const bindRender = function(){
                            const $btnPickup = $(_self);
                            const params = {
                                goodsId: $btnPickup.attr('data-gcode'),
                                mdlCode: $btnPickup.attr('data-sku'),
                                isEvent: "Y"
                            };

                            // paramsB 번들용
                            if($btnPickup.attr('data-gcodeB') && $btnPickup.attr('data-gcodeB').trim() !== '-'){
                                params.optGoodsId = $btnPickup.attr('data-gcodeB');
                                params.optMdlCode = $btnPickup.attr('data-optSku');
                            }

                            // 단품 10 BOM 20 항목 추가
                            if($btnPickup.attr('data-goodsTpCd') && $btnPickup.attr('data-goodsTpCd').trim() !== '-'){
                                params.goodsTpCd = $btnPickup.attr('data-goodsTpCd') === 'Y' ? 20 : 10;
                            }

                            console.info('v2',params);

                            if(config.isLocal){
                                console.info('[Local:pickup]',params);
                            } else {
                                if(netFunnelId){
                                    NetFunnel_Action({action_id:netFunnelId}, function(ev,ret) {
                                        fnOpenPickUpStorePop(params);
                                    });
                                    if(config.debugMode){
                                        console.info('[debugMode]initPickup',{
                                            'netFunnelId': netFunnelId,
                                            'params': params,
                                        })
                                    }
                                } else {
                                    fnOpenPickUpStorePop(params);
                                }
                                $secWrap.find('[data-pickup-plazaNm]').attr('id', 'plazaNm-' + params.goodsId);
                                $secWrap.find('[data-pickup-plazaNo]').attr('id', 'plazaNo-' + params.goodsId);
                                $secWrap.find('[data-pickup-storeAddr]').attr('id', 'storeAddr-' + params.goodsId);
                                $secWrap.find('[data-pickup-capaDate]').attr('id', 'pickupCapaDate-' + params.goodsId);
                                $secWrap.find('[data-pickup-capaTime]').attr('id', 'pickupCapaTime-' + params.goodsId);
                            }
                        }

                        checkPerformance(`_${arguments[0].type}:${target}`, bindRender);
                    } catch (e) {}
                });
            }

            checkPerformance('initPickup', render);
        },
        initGalaxyClub(){

            function openPopup(_self) {
                service.checkGalaxyClub(function(){
                    const $this = $(_self);
                    const $target = $($this.attr('data-target'));
                    const checkId = $this.attr('data-check-target');
                    const $closeModal = $target.find('[data-check-id="' + checkId + '"]');
                    const $lastBtn = $target.find('[data-check-id="' + checkId + '"]:last-child');
                    const dimm_id = `dimm_${new Date().getTime()}`;

                    // 팝업 열릴때 스크롤 방지
                    $('body').css("overflow", "hidden");
                    $('body').css("width", "100%");

                    //딤드 처리
                    $('body').append(`<div id="${dimm_id}" class="dimm"></div>`);
                    $(`#${dimm_id}`).css('z-index', + $target.css('z-index') - 1).fadeIn();
                    $closeModal.attr('data-dimm', `#${dimm_id}`);

                    $target.show().attr('aria-hidden', false).trigger('focus');

                    $target.on('keydown', function (e) {
                        if ($target.is(':focus') && e.shiftKey && e.keyCode == 9) {
                            e.preventDefault();
                            $lastBtn.trigger('focus');
                        }
                    });

                    $lastBtn.on('keydown', function (e) {
                        if (!e.shiftKey && e.keyCode == 9) {
                            e.preventDefault();
                            $target.trigger('focus');
                        }
                    });

                    // 모달 닫기
                    $closeModal.one('click', function (e) {
                        e.preventDefault();
                        const $this = $(this);
                        const $clubBtn = $($this.attr('data-target'));
                        const dimm_id = $this.attr('data-dimm');

                        // 팝업 닫힐때 스크롤 방지 해제
                        $('body').css("overflow", "");
                        $('body').css("width", "");

                        $(dimm_id).fadeOut(function () {
                            $(this).remove();
                        });
                        $target.hide().attr('aria-hidden', true);
                        $clubBtn.trigger('click');
                        $clubBtn.trigger('focus');
                    });
                });
            }
            $secWrap.off('change.initGalaxyClub').on('change.initGalaxyClub', '[data-check-target]', function(e){
                e.preventDefault();
                openPopup(this);
            });
        },
        getCommentAvg(gcode, callBack) {
            try {
                let commentAvg = '0.0';
                if(!config.isLocal){
                    const goodsCommentData = fnGoodsCommentData(gcode, 1, 'Y', 1);
                    if(!!goodsCommentData) {
                        commentAvg = goodsCommentData.commentAvg;
                    }
                }
                if(callBack) {
                    callBack(commentAvg);
                } else {
                    console.warn('callback function has not been specified.');
                }
            } catch (e) {}
        },
        getImage(gcode, callBack) {
            try {
                if(config.debugMode) start('_ajax:getImage', performance.now());
                const api = {
                    url: `${config.apiUrl}xhr/display/componentGoodsPrice`,
                    type: 'POST',
                    dataType: "json",
                    contentType : "application/json",
                    data : JSON.stringify({goodsIdArr : [gcode]}),
                    done: function(data){
                        try {
                            if(callBack) {
                                callBack(data.result[0].imgPath);
                            } else {
                                console.warn('callback function has not been specified.');
                            }
                            if(config.debugMode) end('_ajax:getImage', performance.now());
                        } catch (e) {}
                    }
                }
                if(config.isLocal){
                    console.info('[Local:getImage]',params,callBack);
                } else {
                    ajax.call(api);
                }

            } catch (e) {}
        },
        getPrice(params, callBack) {
            try {
                if(config.debugMode) start('_ajax:getPrice', performance.now());
                const api = {
                    url: `${config.apiUrl}xhr/goods/getGoodsTotalPrice`,
                    type: 'POST',
                    contentType : "application/json",
                    data : JSON.stringify(params),
                    done: function(data){
                        try {
                            if(callBack) {
                                callBack(data);
                            } else {
                                console.warn('callback function has not been specified.');
                            }
                            if(config.debugMode) end('_ajax:getPrice', performance.now());
                        } catch (e) {}
                    }
                }
                if(config.isLocal){
                    console.info('[Local:getPrice]',params,callBack);
                } else {
                    ajax.call(api);
                }

            } catch (e) {}
        },
        /**
         * 로그인된 상태의 사용자 이메일,핸드폰번호 리턴
         * @param {function} callBack 콜백함수
         * @return data 사용자 이메일
         */
        getMemberInfo(callBack) {
            try {
                if(config.debugMode) start('_ajax:checkMemberInfo', performance.now());
                const api = {
                    url : `${config.apiUrl}xhr/goods/getMemberInfo`,
                    type: "POST",
                    dataType : "json",
                    done : function(data){
                        try{
                            if(callBack) {
                                callBack(data);
                            } else {
                                // console.warn('callback function has not been specified.');
                            }
                            if(config.debugMode) end('_ajax:checkEmail', performance.now());
                        }catch (e) {}
                    }
                };
                if(config.isLocal){
                    console.info('[Local:checkEmail]',callBack);
                } else {

                    ajax.call(api);
                }
            } catch (e) {}
        },
        /*
         * params = {
         *   tradeIn: 'Y or N', // 옵션 체크 여부 ( Y: 선택, N: 미선택 )
         *   galaxyClub: 'Y or N',
         *   galaxyTrial: 'Y or N',
         *   soldout: 'Y or N',
         *   pickup: 'Y or N',
         * }
         */
        getBtnDisabled(params) {

            if(!params) {
                console.warn('params have not been specified.');
                return;
            }

            if(config.debugMode) start('getBtnDisabled', performance.now());

            // 버튼 비활성화 정책 (api 지원 여부: true 지원, false 미지원)
            const button = {
                buy: {
                    tradeIn: true,
                    galaxyClub: true,
                    galaxyTrial: true,
                    soldout: false,
                    pickup: true,
                },
                npay: {
                    tradeIn: true,
                    galaxyClub: false,
                    galaxyTrial: true,
                    soldout: false,
                    pickup: true,
                },
                cart: {
                    tradeIn: true,
                    galaxyClub: false,
                    galaxyTrial: false,
                    soldout: false,
                    pickup: false,
                },
                pickup: {
                    tradeIn: true,
                    galaxyClub: true,
                    galaxyTrial: false,
                    soldout: true,
                    pickup: true,
                },
                present: {
                    tradeIn: false,
                    galaxyClub: false,
                    galaxyTrial: false,
                    soldout: false,
                    pickup: false,
                },
            }

            function getUseDisabled(btnType){
                let btnState = {}
                let isDisabled = false;

                if(params.tradeIn) btnState.tradeIn = params.tradeIn.toUpperCase() === 'Y' ? 'Y' : 'N';
                if(params.galaxyClub) btnState.galaxyClub = params.galaxyClub.toUpperCase() === 'Y' ? 'Y' : 'N';
                if(params.galaxyTrial) btnState.galaxyTrial = params.galaxyTrial.toUpperCase() === 'Y' ? 'Y' : 'N';
                if(params.soldout) btnState.soldout = params.soldout.toUpperCase() === 'Y' ? 'Y' : 'N';
                if(params.pickup) btnState.pickup = params.pickup.toUpperCase() === 'Y' ? 'Y' : 'N';

                const chkTradeIn = !button[btnType].tradeIn && btnState.tradeIn === 'Y';
                const chkGalaxyClub = !button[btnType].galaxyClub && btnState.galaxyClub === 'Y';
                const chkGalaxyTrial = !button[btnType].galaxyTrial && btnState.galaxyTrial === 'Y';
                const chkSoldout = !button[btnType].soldout && btnState.soldout === 'Y';
                const chkPickup = !button[btnType].pickup && btnState.pickup === 'Y';

                if( chkTradeIn || chkGalaxyClub || chkGalaxyTrial || chkSoldout || chkPickup){
                    isDisabled = true;
                }

                return isDisabled;
            }

            const results = {
                buy: getUseDisabled('buy'),
                npay: getUseDisabled('npay'),
                cart: getUseDisabled('cart'),
                pickup: getUseDisabled('pickup'),
                present: getUseDisabled('present'),
            }

            if(config.debugMode) end('getBtnDisabled', performance.now());

            // 버튼 비활성화 여부 리턴
            return results;
        },
        resetPickup(params){
            try{
                const $btnBuy = $secWrap.find('[data-role="btnBuy"]');
                if($btnBuy.attr('data-is-pickup')){
                    $secWrap.find('[data-pickup-plazaNo]').text('');
                    $secWrap.find('[data-pickup-storeAddr]').text('');
                    $secWrap.find('[data-pickup-capaDate]').text('');
                    $secWrap.find('[data-pickup-capaTime]').text('');
                    $secWrap.find('[data-role="pickupDate"]').text('');
                    $secWrap.find('[data-role="pickupTime"]').text('');
                    if(params && params.effect === 'slideUp'){
                        $secWrap.find('[data-role="pickupItem"]').slideUp();
                    } else {
                        $secWrap.find('[data-role="pickupItem"]').hide();
                    }
                    $btnBuy.attr('data-is-pickup', false);
                }
            } catch (e) {}
        },
        checkSoldout(goodsId, callBack) {
            try {
                if(!goodsId) {
                    // console.warn('goodsId가 지정되지 않았습니다.');
                    return;
                }
                if(config.debugMode) start('_ajax:checkSoldout', performance.now());
                const api = {
                    url: `${config.apiUrl}xhr/goods/getSaleStatCd`,
                    data: {
                        goodsId: goodsId
                    },
                    done: function(data){
                        try {

                            // data.saleStatCd : 12 판매가능, 그외 판매불가능
                            const saleStatCd = data.saleStatCd;
                            if(callBack) {
                                callBack(saleStatCd);
                            } else {
                                // console.warn('callback function has not been specified.');
                            }
                            if(config.debugMode) end('_ajax:checkSoldout', performance.now());
                        } catch (e) {}
                    }
                }
                if(config.isLocal){
                    console.info('[Local:checkSoldout]',goodsId,callBack);
                    if(callBack) {
                        callBack(12);
                    } else {
                        console.warn('callback function has not been specified.');
                    }
                } else {
                    ajax.call(api);
                }

            } catch (e) {}
        },
        checkSoldoutBundle(arrGoodsId, callBack){
            try {
                if(!arrGoodsId) {
                    console.warn('arrGoodsId has not been specified.');
                    return;
                }
                if(config.debugMode) start('_ajax:checkSoldoutBundle', performance.now());
                let results = {};
                let api = {
                    url: `${config.apiUrl}xhr/goods/getSaleStatCdList`,
                    data: {
                        goodsIds: arrGoodsId
                    },
                    done: function (data) {
                        try {
                            if (!!data && 0 < data.saleStatList.length) {
                                let resultList = data.saleStatList;
                                let count = 0;
                                for (let i = 0; i < resultList.length; i++) {
                                    if(Number(resultList[i].goodsSaleStatCd) === 12) count++;
                                }
                                if(arrGoodsId.length === count){
                                    results = 12;
                                } else {
                                    results = 0;
                                }
                            }
                            if(callBack) {
                                callBack(results);
                            } else {
                                // console.warn('callback function has not been specified.');
                            }
                            if(config.debugMode) end('_ajax:checkSoldoutBundle', performance.now());
                        } catch (e) {}
                    }
                }
                if(config.isLocal){
                    console.info('[Local:checkSoldoutBundle]',arrGoodsId,callBack);
                    if(callBack) {
                        callBack(12);
                    } else {
                        console.warn('callback function has not been specified.');
                    }
                } else {
                    ajax.call(api);
                }

            } catch (e) {}
        },
        checkSoldoutMulti(arrGoodsId, callBack){
            try {
                if(!arrGoodsId) {
                    console.warn('arrGoodsId has not been specified.');
                    return;
                }
                if(config.debugMode) start('_ajax:checkSoldoutMulti', performance.now());
                let results = {};
                let api = {
                    url: `${config.apiUrl}xhr/goods/getSaleStatCdList`,
                    data: {
                        goodsIds: arrGoodsId
                    },
                    done: function (data) {
                        try {
                            if (!!data && 0 < data.saleStatList.length) {
                                let resultList = data.saleStatList;
                                for (let i = 0; i < resultList.length; i++) {
                                    results[resultList[i].goodsId] = resultList[i].goodsSaleStatCd;
                                }
                            }
                            if(callBack) {
                                callBack(results);
                            } else {
                                // console.warn('callback function has not been specified.');
                            }
                            if(config.debugMode) end('_ajax:checkSoldoutMulti', performance.now());
                        } catch (e) {}
                    }
                }
                if(config.isLocal){
                    console.info('[Local:checkSoldoutMulti]',arrGoodsId,callBack);
                } else {
                    ajax.call(api);
                }

            } catch (e) {}
        },
        checkSoldoutTelecom(goodsId, carrierCd){
            try {
                if(config.isLocal){
                    // console.info('[Local:checkSoldoutTelecom]',goodsId,carrierCd);
                    return true;
                } else {
                    return fnGetSaleStatCd({'goodsId':goodsId, 'carrierCd':carrierCd});
                }
            } catch (e) {}
        },
        checkGalaxyClub(callBack) {
            try {
                if(config.debugMode) start('_ajax:checkGalaxyClub', performance.now());
                let isGalaxyCmpnFlag = false;
                let prgrStatYn = 'N';
                const api = {
                    url : `${config.apiUrl}xhr/goods/galaxyClubOrderHistoryCheck`
                    ,type: 'POST'
                    ,done : function(data) {
                        try {
                            if(data.membershipNo != null && data.isGalaxyCmpnYn == 'Y'){
                                if( isGalaxyCmpnFlag ){
                                    if( prgrStatYn == 'Y'){
                                        callBack();
                                    }
                                } else {
                                    const galMintCheck = {
                                        url : `${config.apiUrl}xhr/goods/galaxyClubMintitCheck`
                                        ,type: 'POST'
                                        ,done : function(data) {
                                            prgrStatYn = data.prgrStatYn;
                                            isGalaxyCmpnFlag = true;
                                            if(prgrStatYn == 'Y'){
                                                callBack();
                                            }
                                        }
                                    };
                                    if(!config.isLocal) ajax.call(galMintCheck);
                                }
                            }
                            if(config.debugMode) end('_ajax:checkGalaxyClub', performance.now());
                        } catch (e) {}
                    },
                };
                if(config.isLocal){
                    console.info('[Local:checkGalaxyClub]',callBack);
                } else {
                    ajax.call(api);
                }

            } catch (e) {}
        },
        checkAlarm(goodsId, callBack){
            try {
                if(config.debugMode) start('_ajax:checkAlarm', performance.now());
                const api = {
                    url : `${config.apiUrl}xhr/mypage/interest/insertRestockCheck`,
                    data : {goodsId : goodsId},  // 상품아이디
                    type: "POST",
                    done : function(data){
                        try {
                            if(callBack) {
                                callBack(data);
                            } else {
                                // console.warn('callback function has not been specified.');
                            }
                            if(config.debugMode) end('_ajax:checkAlarm', performance.now());
                        } catch (e) {}
                    }
                }
                if(config.isLocal){
                    console.info('[Local:checkAlarm]',goodsId,callBack);
                } else {
                    ajax.call(api);
                }

            } catch (e) {}
        },
        checkLogin(callBack){
            try {
                if(config.debugMode) start('_ajax:checkLogin', performance.now());
                const api = {
                    url : `${config.apiUrl}xhr/member/getSession`,
                    type: "POST",
                    done : function(data){
                        try {
                            const session = JSON.parse(data);
                            const isLogin = (session.mbrNo !== 0);
                            if(callBack) {
                                callBack(isLogin);
                            } else {
                                console.warn('callback function has not been specified.');
                            }
                            if(config.debugMode) end('_ajax:checkLogin', performance.now());
                        } catch (e) {}
                    }
                };
                if(config.isLocal){
                    console.info('[Local:checkLogin]',callBack);
                    if(callBack) {
                        callBack(true);
                    } else {
                        console.warn('callback function has not been specified.');
                    }
                } else {
                    ajax.call(api);
                }
            } catch (e) {}
        },
        combineSoldout(jsonData, callBack) {
            const render = function(){
                if(!jsonData) {
                    // console.warn('jsonData가 지정되지 않았습니다.');
                    return;
                }
                let arrGoodsId = [];
                jsonData.forEach(function(item){
                    const gCode = item.gcode ? item.gcode : item.gcd;
                    arrGoodsId.push(gCode);
                });
                this.checkSoldout(arrGoodsId, function(results){
                    jsonData.forEach(function(item){
                        const gCode = item.gcode ? item.gcode : item.gcd;
                        item.saleStatCd = results[gCode];
                    });
                    if(callBack) {
                        callBack(jsonData);
                    } else {
                        // console.warn('callback function has not been specified.');
                    }
                });
            }

            checkPerformance('combineSoldout', render);
        },
        messager: {
            data: {
                content: '',
                btnText: '확인',
                okBtnText: '확인',
                cancelBtnText: '취소'
            },
            setAlertData: function (content, btnText, callback) {
                service.messager.data.content = content;
                service.messager.data.btnText = btnText;
                if (callback != undefined) {
                    service.messager.data.callback = callback;
                } else {
                    delete service.messager.data[callback];
                }
            },
            alert: function (content, btnText, callback) {
                try{
                    service.messager.setAlertData(content, btnText, callback);
                    commonAlert(service.messager.data);
                    openLayer('commonAlert');
                }catch (e) {}
            },
        },
        performance: {},
    }

    if(!window.PT_STATE) window.PT_STATE = {};
    PT_STATE.service = service;

    if(config.debugMode) {
        start('_onload', 0);
        window.onload = function(){
            end('_onload', performance.now());
        };
        // PT_STATE.performance = service.performance;
    }
})();