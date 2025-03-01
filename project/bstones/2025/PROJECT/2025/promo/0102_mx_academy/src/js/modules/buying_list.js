// import { PT_STATE } from './bs_common';
import { Buying } from './buying';
import { promoCoupon } from "./coupon";

const $secWrap = $('.sec_project_wrap');
const $secBuying = $secWrap.find('.sec_buying');
let arrSimulatorSlide = [];

export const buyingUtil = {
    findKeysStartingWith(obj, prefix) {
        return Object.keys(obj).filter(function(key) {
            return key.startsWith(prefix);
        });
    },
    addComma(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    removeComma(num) {
        const _num = num.trim();
        if(_num === '' || _num === '-') return 0;
        if(Number(_num) < 1000 || _num === '-') return Number(_num);
        return Number(_num.replace(/,/g, ''));
    },
    alert: function(message) {
        typeof makeAlert == 'function' ? makeAlert(message) : alert(message);
    },
}

let checkTimeout = null;
let shareUpdateOmni = null;
let prdInvList = {};
let buyingListState = {
    buying: null,
    omni: null,
    forceExecution: false,
    $itemWrap: null,
}
const netFunnel = {
    buy: 'b2b2c_cta_event', 
    npay: '',
    cart: '', 
    present: '', 
    pickup: ''
};

export const buyingList = {
    type1(arrParams){
        if(!arrParams.length) return;

        const clickBtnToggle = function(){
            $secWrap.off('click.btnBuyingToggle').on('click.btnBuyingToggle', '[data-role="btnToggle"]', function(){
                $(this).closest('[data-buying-group]').toggleClass('pt_open');
                if($(this).closest('[data-buying-group]').hasClass('pt_open')) {
                    $(this).attr('data-omni', 'event:2025_galaxy_academy_festa:close_togetherbuy_benefit');
                } else {
                    $(this).attr('data-omni', 'event:2025_galaxy_academy_festa:open_togetherbuy_benefit');
                }
            });
        }

        const updateData = function($el, selected) {
            if(!selected) return;

            const $targetGroup = $el.find(`[data-buying-group="${selected.grp}"]`)

            // 태그 관련
            const $benefitPrice = $targetGroup.find(`[data-benefit-price]`);
            const $benefitCoupon = $targetGroup.find(`[data-benefit-coupon]`);
            if($benefitPrice.length || $benefitCoupon.length){
                selected.tagA && selected.tagA.trim() === 'O' ? $benefitPrice.show() : $benefitPrice.hide();
                selected.tagB && selected.tagB.trim() === 'O' ? $benefitCoupon.show() : $benefitCoupon.hide();
            }

            // 제품 썸네일
            const $prdImg = $targetGroup.find('[data-prd-img]');
            if(!!$prdImg.length && selected.gcd){
                $prdImg.attr('src', selected.thm);
                $prdImg.attr('alt', selected.pdNm);
            }

            // 쿠폰 다운받기 버튼
            const $btnCoupon = $targetGroup.find('[data-role="btnCouponPromo"]');
            if(!!$btnCoupon.length && selected.gcd){
                let coupon = '';
                if(selected.cn && selected.cn.trim() !== '-') coupon ? coupon += ','+selected.cn : coupon = selected.cn;
                if(selected.apCn && selected.apCn.trim() !== '-') coupon ? coupon += ','+selected.apCn : coupon = selected.apCn;

                if(!coupon){
                    $btnCoupon.hide();
                } else {
                    $btnCoupon.attr('data-cpNum', coupon);
                    $btnCoupon.attr('title', `${selected.pdNm} 쿠폰 다운받기`);
                    $btnCoupon.show();
                }
            }

            // 자세히보기 버튼
            const $btnLink = $targetGroup.find('[data-role="btnLink"]');
            if(!!$btnLink.length && selected.gcd){
                $btnLink.attr('href', selected.url);
                $btnLink.attr('title', `${selected.sku} 자세히 보기 페이지 새 창으로 열림`);
            }

            // 담기 버튼
            const $btnCart = $targetGroup.find('[data-role="btnSimulAdd"]');
            if(!!$btnCart.length && selected.gcd){
                $btnCart.attr('data-gcode', selected.gcd);
                $btnCart.attr('data-sku', selected.sku);
            }
        }

        shareUpdateOmni = function() {
            const $el = buyingListState.buying.$el;
            const selected = buyingListState.buying.state.selected;
            const omni = buyingListState.omni;
            const forceExecution = buyingListState.forceExecution;

            if((!selected && !omni) || !forceExecution) return;

            const $targetGroup = forceExecution ? buyingListState.$itemWrap : $el.find(`[data-buying-group="${selected.grp}"]`)

            // 쿠폰 다운받기 버튼
            const $btnCoupon = $targetGroup.find('[data-role="btnCouponPromo"]');
            if(!!$btnCoupon.length && !forceExecution){
                $btnCoupon.attr('data-omni', `${omni.coupon}${selected.sku}`);
            }

            // 자세히보기 버튼
            const $btnLink = $targetGroup.find('[data-role="btnLink"]');
            if(!!$btnLink.length && !forceExecution){
                $btnLink.attr('data-omni', `${omni.btnLink}${selected.sku}`);
            }

            // 담기 버튼
            const $btnCart = $targetGroup.find('[data-role="btnSimulAdd"]');
            if(!!$btnCart.length){
                const _gcode = forceExecution ? $btnCart.attr('data-gcode') : selected.gcd;
                const _sku = forceExecution ? $btnCart.attr('data-sku') :  selected.sku;
                if(simulatorState.itemList.includes(_gcode)){
                    $btnCart.attr('data-omni', `${omni.btnSimulOut}${_sku}`);
                } else {
                    $btnCart.attr('data-omni', `${omni.btnSimul}${_sku}`);
                }
            }

            // 꿀조합 담기 버튼
            const $btnCartAll = $secWrap.find('[data-role="btnSimulAddAll"]');
            if(!!$btnCartAll.length){
                $btnCartAll.each(function(idx,item){
                    let changeOmni = $(item).attr('data-omni').replace('out_','put_');
                    if($(item).hasClass('active')){
                        changeOmni = $(item).attr('data-omni').replace('put_','out_');
                    }
                    $(item).attr('data-omni',changeOmni);
                });
            }
            buyingListState.forceExecution = false;
        }

        const checkSoldout = function(buying, forceExecution){

            $secWrap.find('[data-role="btnSimulAddAll"], [data-role="btnSimulAdd"]').each(function(idx,item){
                const arrGCode = $(this).attr('data-gcode').replaceAll(' ','').trim().split(',');

                arrGCode.forEach(function(gCode){
                    if(!Object.keys(prdInvList).includes(gCode)){
                        // 초기화
                        prdInvList[gCode] = {'isSoldout': false, 'isSimul': false, 'isApi': false, 'isMapping': false}
                    }
                });
            });

            if(window.PT_STATE && window.PT_STATE.service){
                const checkList = Object.keys(prdInvList).filter(gCode => !prdInvList[gCode].isApi);

                window.PT_STATE.service.checkSoldoutMulti(checkList, function(list){

                    Object.keys(list).forEach(function(gCode){
                        prdInvList[gCode].isSoldout = Number(list[gCode]) === 12 ? false : true;
                        prdInvList[gCode].isApi = true;
                    });

                    renderSoldout(buying, null, forceExecution);
                });
            }
        }

        const renderSoldout = function(buying, $target, forceExecution){

            function render($item) {
                const $btnBuy = $item;
                const $itemWrap = $btnBuy.closest('.pt_buying__item');
                const $btnList = $itemWrap.find('.pt_btn--detail');
                const arrGCode = $btnBuy.attr('data-gcode').replaceAll(' ','').trim().split(',')

                let soldoutCnt = 0;
                let includeCnt = 0;
                let isMapping = false;
                arrGCode.forEach(function(gCode){
                    if(prdInvList[gCode] && prdInvList[gCode].isSoldout) {
                        soldoutCnt++;
                    }
                    if(prdInvList[gCode] && prdInvList[gCode].isMapping) {
                        isMapping = true;
                    }
                    if(arrGCode.length < 2) {
                        prdInvList[gCode].isMapping = true;
                    }
                    if(simulatorState.itemList.includes(gCode)){
                        includeCnt++;
                    }
                });

                let isInclude = (arrGCode.length > 1) ? (includeCnt === (arrGCode.length - soldoutCnt)) : includeCnt === arrGCode.length;
                let isSoldout = soldoutCnt > 0; // (soldoutCnt === arrGCode.length);
                if(!isMapping || forceExecution){
                    if(isSoldout){ // 솔드아웃인 경우
                        $btnBuy.addClass('pt_disabled').removeClass('active').text('일시품절');
                        // $btnList.addClass('pt_disabled');

                    } else { // 정상판매인 경우
                        if(isInclude){
                            if(!isSoldout){
                                $btnBuy.removeClass('pt_disabled').text('담기 완료').addClass('active');
                            }
                        } else {
                            $btnBuy.removeClass('pt_disabled').text('담기').removeClass('active');
                        }
                        // $btnList.removeClass('pt_disabled');
                        shareUpdateOmni();
                    }
                }
            }

            if($target) {
                render($target);
            } else {
                $secWrap.find('[data-role="btnSimulAddAll"], [data-role="btnSimulAdd"]').each((idx, item) => render($(item)));
            }
        }

        const checkSoldoutSingle = function(buying, self){
            const $itemWrap = $(self).closest('.pt_buying__item');
            const $btnBuy = $itemWrap.find('[data-role="btnSimulAdd"]');
            // const $btnLink = $itemWrap.find('.pt_btn--detail');
            const gCode = $itemWrap.find('[data-role="btnSimulAdd"]').attr('data-gcode');
            if(window.PT_STATE && window.PT_STATE.service){
                window.PT_STATE.service.checkSoldout(gCode, function(item){
                    let isSoldout = Number(item) === 12 ? false : true;
                    if(!!prdInvList[gCode]){
                        prdInvList[gCode].isSoldout = isSoldout;
                    } else {
                        prdInvList[gCode] = {'isSoldout': isSoldout, 'isSimul': false, 'isApi': false,}
                    }
                    renderSoldout(buying, $btnBuy, true);
                });
            }
        }

        const setOptionSlide = function(buying){
            buying.$el.find('[data-option-slide]').each(function() {
                const $option = $(this);
                const isColor = $option.find('.pt_opt__list--color').length;
                const optCnt = $option.find('[data-opt-btn]').length;
                if ((isColor && optCnt < 5) || (!isColor && optCnt < 3)){ // 옵션개수가 3개 미만이면 스와이퍼 실행 안함
                    $option.find('.pt_btn--next, .pt_btn--prev').hide();

                } else if (!$option.hasClass('swiper-container-initialized')){ // 스와이퍼가 선언되지 않은 경우만 실행함
                    let optSwiper = new Swiper(this, {
                        allowTouchMove: true,
                        slidesPerView: 'auto',
                        // watchOverflow : true, // 다음슬라이드가 없을때 pager, button 숨김 여부 설정
                        threshold: 10,
                        observer: true,
                        observeParents: true,
                        observeSlideChildren: true,
                        navigation: {
                            nextEl: '.pt_btn--next',
                            prevEl: '.pt_btn--prev',
                        },
                        on: {
                            init: function() {
                                // const $el = $(this.$el);
                                //
                                // // 다음슬라이드가 있는지 없는지 체크 ("true"면 다음 슬라이드가 없는상태)
                                // if(this.isLocked == true){
                                //     // 다음슬라이드가 없으면 클래스(slide_lockd) 추가
                                //     $el.closest('.swiper-container').addClass('slide_lockd');
                                // }else{
                                //     $el.closest('.swiper-container').removeClass('slide_lockd');
                                // }
                            }
                        }
                    });
                };
            });
        }

        const render = function(){
            arrParams.forEach(function(params){
                const prdBuying1 = new Buying(params.target, {
                    type: 'list',
                    pdList: params.pdList,
                    category: {
                        use: true,
                        btnCate: '[data-btn-cate]',
                        defaults: 'all',
                        scroll: true,
                    },
                    paging: {
                        use: true,
                        btnMore: '[data-btn-more]',
                        pcIncrease: params.increase.pc,
                        moIncrease: params.increase.mo,
                    },
                    on: {
                        init(buying) {
                            params.beforeCreateHtml(buying, params.omni, true);
                            buyingListState.omni = params.omni;
                            buyingListState.buying = buying;
                            setOptionSlide(buying);
                            clickBtnToggle();
                            try{
                                clearTimeout(checkTimeout);
                                checkTimeout = setTimeout(function(){
                                    checkSoldout(buying);
                                },1000);
                            } catch (e) {}
                        },
                        optionChangeEnd(buying, self) {
                            try {
                                setTimeout(function() {
                                    checkSoldoutSingle(buying, self);
                                    simulator.changeBtnAdd();
                                },150);
                            } catch (e) {}
                        },
                        productChangeEnd(buying) {
                            const selected = buying.state.selected;
                            updateData(buying.$el, selected);
                            shareUpdateOmni();
                        },
                        clickBtnCate(buying, $el) {
                            params.beforeCreateHtml(buying, params.omni, true);
                            buying.update();
                            setOptionSlide(buying);
                            simulator.changeBtnAdd();
                            prdInvList = {};
                            checkSoldout(buying);
                            $el.closest('section').find('[data-btn-cate]').removeClass('active');
                            $el.addClass('active');
                        },
                        clickBtnMore(buying) {
                            params.beforeCreateHtml(buying, params.omni);
                            buying.update();
                            setOptionSlide(buying);
                            simulator.changeBtnAdd();
                            checkSoldout(buying);
                        }
                    }
                });
            });
            if(window.PT_STATE && window.PT_STATE.service) {
                window.PT_STATE.service.initBtnAll();
            }
        }

        $(document).ready(function(){
            render();
        });
    }
}

let simulatorState = {
    length: 0,
    itemList: [],
    calc: {},
}
export const simulator = {
    type1(params){
        if(!params) return;

        const pdList = params.pdList;
        // 삼성카드 금액대별 결제일 할인 가져오기
        const getAmountBasedDiscount = function(totalPrice){
            const price = Number(totalPrice/10000);
            let amountBasedDiscount = 0;
            if(price >= 2000){ // 2000만원 이상
                amountBasedDiscount = 100; // 결제일 할인가 100만원
            } else if(price >= 1500){ // 1500만원 이상
                amountBasedDiscount = 70; // 결제일 할인가 70만원
            } else if(price >= 1000){ // 1000만원 이상
                amountBasedDiscount = 50; // 결제일 할인가 50만원
            } else if(price >= 700){ // 700만원 이상
                amountBasedDiscount = 40; // 결제일 할인가 40만원
            } else if(price >= 500){ // 500만원 이상
                amountBasedDiscount = 30; // 결제일 할인가 30만원
            } else if(price >= 400){ // 400만원 이상
                amountBasedDiscount = 20; // 결제일 할인가 20만원
            } else if(price >= 300){ // 300만원 이상
                amountBasedDiscount = 14; // 결제일 할인가 14만원
            } else if(price >= 200){ // 200만원 이상
                amountBasedDiscount = 7; // 결제일 할인가 7만원
            } else if(price >= 100){ // 100만원 이상
                amountBasedDiscount = 4; // 결제일 할인가 4만원
            }
            return amountBasedDiscount * 10000;
        }

        const calculate = function(){
            // 초기화
            params.usagePrice.forEach(function(item){
                simulatorState.calc[item[0]] = 0;
            });
            // 덧셈 처리
            simulatorState.itemList.forEach(function(gCode){
                const selected = pdList.filter((item) => item.gcd === gCode)[0];
                params.usagePrice.forEach(function(item){
                    if(!!item[2] && item[2] === 'add'){
                        simulatorState.calc[item[0]] += buyingUtil.removeComma(selected[item[1]]);
                    }
                });
            });
            // 덧셈 외 처리
            params.usagePrice.forEach(function(item){
                // 신용카드 금액대별 결제일할인
                if(!!item[2] && item[2] === 'amountBasedDiscount'){
                    simulatorState.calc[item[0]] = getAmountBasedDiscount(simulatorState.calc['priceG']);
                }
                // 신용카드 결제일할인가
                else if(!!item[2] && item[2] === 'paymentDayDiscount'){
                    // 신용카드 결제일할인가 = 기준가(priceA) - 즉시 할인(priceB) - 동시구매 할인(priceC) - 올리브영 모바일 기프트카드(priceD_1) - 로그인 쿠폰(priceD_2) - 아카데미 특가 쿠폰(priceD_3) - 신용카드 금액대별 결제일할인(priceE)
                    simulatorState.calc[item[0]] = simulatorState.calc['priceA'] - simulatorState.calc['priceB'] - simulatorState.calc['priceC'] - simulatorState.calc['priceD_1'] - simulatorState.calc['priceD_2'] - simulatorState.calc['priceD_3'] - simulatorState.calc['priceE'];
                }
            });
        }

        const updateHtml = function(isDelete){
            const $simulBox = $(params.target);
            const $btnCart = $simulBox.find('[data-role="btnCartAll"]');
            const $btnBuy = $simulBox.find('[data-role="btnBuyAll"]');
            const $btnEmpty = $simulBox.find('[data-role="btnEmpty"]');

            // 담은 제품이 2개 이상인 경우
            if (simulatorState.length > 1) {
                $simulBox.addClass('active');
                $btnBuy.show().removeClass('pt_disabled');
                $simulBox.addClass('pt_slide_custom');
                $btnCart.show();
                $btnEmpty.hide();

            // 담은 제품이 1개 이상인 경우
            } else if (simulatorState.length > 0) {
                $simulBox.addClass('active');
                $btnBuy.show().addClass('pt_disabled');
                $simulBox.removeClass('pt_slide_custom');
                $btnCart.hide();
                $btnEmpty.hide();

            // 담은 제품이 없는 경우
            } else {
                $simulBox.removeClass('active');
                $btnBuy.hide().addClass('pt_disabled');
                $simulBox.removeClass('pt_slide_custom');
                $btnCart.hide();
                $btnEmpty.show();
            }

            // console.log('simulatorState.length=>', simulatorState.length);

            // 기준가 ~ 신용카드 결제일 할인가
            params.usagePrice.forEach(function (item) {
                const resultPrice = buyingUtil.addComma(simulatorState.calc[item[0]]);
                const $target = $secWrap.find(`[data-simul-price="${item[0]}"]`);

                if(Number(resultPrice) === 0){
                    $target.closest('li.pt_bnf__item').hide();
                } else {
                    $target.closest('li.pt_bnf__item').show();
                }
                $target.text(resultPrice);
            });

            // 총 구매 개수
            if (!!$secWrap.find('[data-simul-cnt]').length) {
                $secWrap.find('[data-simul-cnt]').text(simulatorState.length);
                $secWrap.find('[data-role="btnBuyAll"]').attr('data-omni','event:2025_galaxy_academy_festa:goto_simul_' + simulatorState.length + '_buynow');
            }

            // 시뮬 제품 리스트 추가
            let arrList = '';
            let itemIdx = 1;
            simulatorState.itemList.forEach(function (gCode) {
                const selected = pdList.filter((item) => item.gcd === gCode)[0];
                arrList += /* html */`
                                <div class="swiper-slide pt_wish__item">
                                    <div class="img_box pt_wish__img"><img src="${selected.thm}" alt="${selected.pdNm}" loading="lazy" /></div>
                                    <div class="pt_wish__info">
                                        <p class="pt_wish__info--tit">${selected.pdNm}</p>
                                        <p class="pt_wish__info--sku">${selected.sku}</p>
                                    </div>
                                    <a href="javascript:;" 
                                        class="pt_btn pt_btn--del" 
                                        data-role="btnSimulDel"
                                        data-gcode="${selected.gcd}"
                                        data-omni-type="microsite" 
                                        data-omni="event:2025_galaxy_academy_festa:tab_togetherbuy_open_out">
                                        <span class="blind">삭제</span>
                                    </a>
                                </div>`;
                if(itemIdx === simulatorState.itemList.length && simulatorState.itemList.length > 0){
                    arrList += '<div class="swiper-slide pt_wish__item pt_wish__item--none"></div>';
                }
                itemIdx++;
            });

            $('.pt_item__wish .swiper-wrapper').html('');
            arrSimulatorSlide.forEach(function(simulSlide){
                simulSlide.removeAllSlides();
                simulSlide.appendSlide(arrList);
                try{
                    simulSlide.update();
                } catch (error) {}
                simulSlide.slideToLoop(simulatorState.length-1,0);
            });

            // data 속성 추가
            $btnCart.attr('data-gcode',simulatorState.itemList.toString());
            $btnBuy.attr('data-gcode',simulatorState.itemList.toString());
        }

        const setSlide = function() {
            $secWrap.find(".pt_wish-slide").each(function(idx, slideList){
                arrSimulatorSlide[idx] = new Swiper(slideList, {
                    slidesPerView: 'auto',
                    allowTouchMove: true,
                    observer: true,
                    observeParents: true,
                    threshold: 10,
                    preloadImages: false,
                    lazy: true,
                    navigation: {
                        nextEl: ".pt_simulator .pt_arrow--next",
                        prevEl: ".pt_simulator .pt_arrow--prev",
                    },
                    on: {
                        breakpoint: function () {
                            var that = this;
                            setTimeout(function () {
                                that.slideTo(0, 0);
                            }, 150);
                        },
                        slidesLengthChange: function() {
                            if(arrSimulatorSlide[idx].slides.length < 3) {
                                $('.pt_cart').addClass('pt_cart--empty');
                            } else {
                                $('.pt_cart').removeClass('pt_cart--empty');
                            }
                        }
                    }
                });
            });
        }

        const simulSession = {
            init() {
                if(params.sessionStorage){
                    const sessionList = this.getData();
                    if(sessionList){
                        simulatorState.itemList = sessionList;
                        simulatorState.length = sessionList.length;
                    }
                    updateItem();
                }
            },
            setData(){
                if(params.sessionStorage){
                    sessionStorage.setItem('pt_simulator_promo', JSON.stringify(simulatorState.itemList));
                }
            },
            getData(){
                if(params.sessionStorage){
                    return JSON.parse(sessionStorage.getItem('pt_simulator_promo'));
                } else {
                    return false;
                }
            }
        }

        const updateItem = function(){
            calculate();
            updateHtml();
            simulator.changeBtnAdd();
            simulSession.setData();
        }

        const addItem = function(gCode, _self){
            simulatorState.itemList.push(gCode);
            simulatorState.length++;
            calculate();
            updateHtml();
            simulator.changeBtnAdd();
            prdInvList[gCode].isSimul = true;
            simulSession.setData();
        }

        const removeItem = function(gCode, _self){
            const index = simulatorState.itemList.indexOf(gCode);
            if(index > -1) {
                simulatorState.itemList.splice(index, 1);
                simulatorState.length--;
                calculate();
                updateHtml(true);
                simulator.changeBtnAdd();
                try{
                    prdInvList[gCode].isSimul = false;
                    simulSession.setData();
                } catch (error) {
                    console.error(error)
                }
            }

            if(simulatorState.itemList.length < 1){
                $secWrap.find('[data-simul-close]').trigger('click')
            }
        }

        $secWrap.on('click', '[data-role="btnSimulDel"]', function(e){
            e.preventDefault();
            const gCode = $(this).attr('data-gcode');
            removeItem(gCode);
        });

        // 1개 제품 담기
        $secWrap.on('click', params.btnAdd, function(e) {
            e.preventDefault();
            const gCode = $(this).attr('data-gcode');

            let isCatDup = false;
            const cat = params.pdList.filter((item) => item.gcd === gCode)[0].cat;
            simulatorState.itemList.forEach(function(innerGcd){
                const innerCat = params.pdList.filter((item) => item.gcd === innerGcd)[0].cat;
                if(cat === innerCat){
                    isCatDup = true;
                }
            });

            if(simulatorState.itemList.includes(gCode)){ // 이미 장바구니에 있는 경우 삭제
                removeItem(gCode);

            } else if(isCatDup){ // 동일 카테고리 상품이 장바구니에 있는 경우
                buyingUtil.alert('다른 품목의 제품을 담아보세요.');

            } else { // 장바구니에 없는 경우 추가
                addItem(gCode);
            }
        });

        // 모바일 시뮬레이터 열기 버튼
        $secWrap.on('click', '[data-simul-open]', function(e){
            e.preventDefault();
            const $secBuying = $('.sec_buying');
            const $wrap = $secBuying.closest('.sec_project_wrap');
            const _html = '<div class="dimm" style="z-index:220;"></div>';

            if(!$wrap.find('.dimm').length){
                $secBuying.siblings(':first').after(_html);
            }
            
            $wrap.find('.dimm').show();

            $(params.target).find('.pt_full-box').addClass('pt_open');
        });

        // 모바일 시뮬레이터 닫기 버튼
        $secWrap.on('click', '[data-simul-close]', function(e){
            e.preventDefault();
            const $secBuying = $('.sec_buying');
            const $wrap = $secBuying.closest('.sec_project_wrap');

            $wrap.find('.dimm').hide();
            $(params.target).find('.pt_full-box').removeClass('pt_open');
        });

        // 여러개 제품 담기
        $secWrap.on('click', params.btnAddAll, function(e){
            e.preventDefault();
            const arrGCode = $(this).attr('data-gcode').replaceAll(' ','').trim().split(',');

            let isCatDup = false;
            arrGCode.forEach(function(gCode){
                if(!simulatorState.itemList.includes(gCode)){
                    const cat = params.pdList.filter((item) => item.gcd === gCode)[0].cat;
                    simulatorState.itemList.forEach(function (innerGcd) {
                        const innerCat = params.pdList.filter((item) => item.gcd === innerGcd)[0].cat;
                        if (cat === innerCat) {
                            isCatDup = true;
                        }
                    });
                }
            });

            if($(this).hasClass('active')){ // 이미 장바구니에 있는 경우 삭제
                arrGCode.forEach(function(gCode){
                    removeItem(gCode);
                });

            } else if(isCatDup){ // 동일 카테고리 상품이 장바구니에 있는 경우
                buyingUtil.alert('다른 품목의 제품을 담아보세요.');

            } else { // 장바구니에 없는 경우 추가
                arrGCode.forEach(function(gCode){
                    if(!simulatorState.itemList.includes(gCode) && !prdInvList[gCode].isSoldout){
                        addItem(gCode);
                    }
                });
            }
        });

        // 시뮬레이터 장바구니
        $secWrap.on('click', '[data-role="btnCartAll"]', function(e){
            e.preventDefault();
            let params = [];
            simulatorState.itemList.forEach(function(gCode){
                params.push({goodsId: gCode, qty: 1,});
            });
            fnCartDirectByMultiId(params, "confirm");
        });

        // 시뮬레이터 구매하기
        $secWrap.on('click', '[data-role="btnBuyAll"]', function(e){
            e.preventDefault();
            let params = [];
            simulatorState.itemList.forEach(function(gCode){
                params.push({goodsId: gCode, qty: 1,});
            });
            fnBuyDirectByMultiId(params);
        });

        $(document).ready(function(){
            setSlide();
            simulSession.init();
        });

        if(!window.PT_STATE) window.PT_STATE = {};
        window.PT_STATE.simulator = simulatorState;
    },
    // 담기버튼 활성화,비활성화 처리
    changeBtnAdd(){
        $secWrap.find('[data-role="btnSimulAdd"], [data-role="btnSimulAddAll"]').each(function(idx,item){
            const arrGCode = $(this).attr('data-gcode').replaceAll(' ','').trim().split(',');

            let includeCnt = 0;
            let soldoutCnt = 0;
            arrGCode.forEach(function(gCode){
                if(simulatorState.itemList.includes(gCode)) {
                    includeCnt++;
                }
                if(prdInvList[gCode] && prdInvList[gCode].isSoldout){
                    soldoutCnt++;
                }
            });

            let isInclude = (arrGCode.length > 1) ? (includeCnt === (arrGCode.length - soldoutCnt)) : includeCnt === arrGCode.length;
            let isSoldout = soldoutCnt > 0; // (soldoutCnt === arrGCode.length);
            if(isInclude) {
                if(!isSoldout){
                    $(item).text('담기 완료').addClass('active');
                    $(item).attr('title','담기 완료');
                }
            } else if(!isSoldout){
                $(item).text('담기').removeClass('active');
                $(item).attr('title','담기');
            }
            buyingListState.forceExecution = true;
            buyingListState.$itemWrap = $(item).closest('[data-buying-group]');
            shareUpdateOmni();
        });
    },
}

$(document).ready(function(){

    promoCoupon.init();
})