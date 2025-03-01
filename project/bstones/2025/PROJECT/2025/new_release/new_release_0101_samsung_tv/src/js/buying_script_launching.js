import buyingDataTV from "../data/data_tv_launching.json";
// import buyingDataMusic from "../data/data_music_launching.json";
import buyingSlide from "../data/buyingSlide_launching.json";
// import benefitImage from "../data/benefitImage.json";
import {Buying} from './modules/buying_new';
import {BuyingSlide} from "./modules/buyingSlide";
import {util as _} from './modules/bs_common';
import {buyingAccordian} from './modules/buyingAccordian';
// import {promoCoupon} from './modules/coupon';
// import { benefitSwiper } from './modules/benefitSwiper'; //혜택 스와이퍼
// import { buyingChecker } from "./modules/buyingChecker";

const $secWrap = $('.sec_project_wrap');
let tvBuying = null;
let musicBuying = null;
let globalSelected = null;

/**
 * 초기변수, 얼럿 메시지, 옴니값 등 바잉툴 초기값
 * - 초기 설정값(변경X): isOnce, isOpened, isDeactive
 * - deactiveMessage: 구매 관련 버튼 클릭시 얼럿 메시지
 * - omni: 구매 관련 버튼들의 옴기값 작성
 * - slideImage: 제품 슬라이드 이미지 파일경로 및 파일명 작성
 */


let config = {
    isOnceTv: false,
    isOpenedTv: true,
    isOnceMusic: false,
    isOpenedMusic: true,
    isDeactive: false,
    apiUrl: '/sec/',
    isLocal : !(document.domain.includes("samsung.com")),
    deactiveMessage: '중고 추가 보상 프로그램과 My갤럭시클럽까지<br/>모든 옵션 선택 후 구매 가능합니다.',
    telecomMessage: '통신사 선택(택1)까지<br/> 옵션 선택 후 신청 가능합니다.',
    telecomEvtNum: {
        skt: '32738',
        kt: '32739',
        lg: '32740'
    },
    netFunnel: {
        buy: 'b2c_cta_event',
        npay: 'b2c_cta_event',
        // cart: 'b2c_promotion',
        // present: 'b2c_promotion',
        pickup: ''
    },
    omniTv: {
        buy: `sec:event:2024-tv-launching:goto_a_buying_`, //바잉툴 구매하기 버튼
        buySticky: `sec:event:2024-tv-launching:goto_a_buying_`, //스티키 구매하기 버튼
        coupon: `sec:event:2024-tv-launching:download_a_buying_`, //바잉툴 쿠폰
        couponSticky: `sec:event:2024-tv-launching:download_a_buying_`, //스티키 쿠폰
        link: `sec:event:2024-tv-launching:goto_sku_`, //바잉툴 자세히보기
        linkSticky: `sec:event:2024-tv-launching:goto_sku_`, // 스티키 자세히보기
    },
    omniMusic: {
        buy: 'sec:event:2024-tv-launching:goto_buy_',
        link: 'sec:event:2024-tv-launching:goto_sku_',
        // coupon: '',
        buySticky: 'sec:event:2024-tv-launching:goto_buy_',
        // couponSticky: '',
        linkSticky: 'sec:event:2024-tv-launching:goto_sku_',
    },
    slideImage: buyingSlide
}

/**
 * 바잉툴 초기화
 */
let buyingSlideTv = null;
let buyingSlideMusic = null;

const TV_HYBRID_WRAP = document.querySelector('#samsung_tv_launching');
const tabBtnTv = document.querySelector('.pt_category_nav .pt_category_nav__btn--tv');
const tabBtnHybrid = document.querySelector('.pt_category_nav .pt_category_nav__btn--hybrid');

let tvSwitch = false;
let hybridSwitch = false;

// 바잉툴 리스트 맵핑 변수
let mappingMethod = new Map();
let soldCheckData = [];

const api = {
    movePdLink(gCode, gCodeB, isDsChoice, isCpGoodsId, pdUrl){
        /* PdUrl Parameter */
        let dsChoiceYn = isDsChoice ? isDsChoice : 'N';

        const pop = window.open(undefined, '자세히보기 팝업');
        if(!!gCodeB && gCodeB.length > 3 && isCpGoodsId === 'Y'){
            pop.location.href = `${pdUrl}` + `?cpGoodsId=${gCodeB}&dsChoiceYn=${dsChoiceYn}`;
        } else if(dsChoiceYn) {
            pop.location.href = `${pdUrl}` + `?dsChoiceYn=${dsChoiceYn}&cpGoodsId=N`;
        } else {
            pop.location.href = `${pdUrl}`;
        }
    }
}


function initBuyingTv() {
    tvBuying = new Buying('#pt_buying_tv', {
        pdList: buyingDataTV.result,
        defaults: true,
        option: {
            type: 'hide',
            scroll: {
                use: false
            },
        },
        sessionStorage: false,
        autoScope: {
            use: true
        },
        on: {
            init(buying) {
                const slideSubTxt = document.querySelector('[data-page-content=tv] .pt_slide__subtxt')
                const selected = buying.state.selected;
                const gCode = selected && selected.gCode;

                // 제품 슬라이드 초기화
                buyingSlideTv = new BuyingSlide(buying, {
                    target: '#buying_slide_tv',
                    imageData: config.slideImage.buyingSlideTv,
                });


                // 모든 옵션을 클릭하기전까지, 버튼 클릭시 얼럿창 출력 이벤트
                buyingUtil.clickDeactiveBuy();

                // 구매하기 이벤트, etc 옵션 생길 시 주석처리
                PT_STATE.service.initBuy();

                // 매장픽업 이벤트 활성화
                // buyingUtil.pickupEvt();
            },
            productChangeEnd(buying) {
                const $el = buying.$el;
                const selectOptEtc = buying.state.selectOptionEtc;
                const selected = buying.state.selected;
                const sku = selected && selected.sku;
                const model = selected && selected.category;
                const gCode = selected && selected.gCode;
                const gCodeB = selected && selected.gCodeB;


                // 삼케플 트리거
                if (!$el.find('[name="samsungCarePlus"]').is(':checked')) {
                    $('#opt_etc_a2').trigger('click');
                } else if (gCodeB === '-') {
                    $('#opt_etc_a1').trigger('click');
                }

                // 선택된 제품의 데이터를 html에서 출력함
                buyingUtil.renderHtml(buying, '.sec_sticky.tv');

                // 각 버튼 클릭시 마다 API 실행시 사용될 data 속성값 저장 (G코드, 스큐, 회사코드 등)
                buyingUtil.updateBtn(buying.$el, selected, selectOptEtc, config.omniTv, '.sec_sticky.tv');

                // 매장픽업 초기화
                // buyingPickup.reset();

                // 바잉툴 상단, 하단 슬라이드 업데이트
                buyingSlideTv.update({sku:sku, model:model, gCode:gCode}, config.isOnceTv, '');

                // 제품 품절여부 확인 및 구매관련버튼 활성/비활성화
                PT_STATE.service.checkSoldout(gCode, function(saleStatCd){
                    buyingUtil.totalSoldCheck(saleStatCd, buying.$el, $('.sec_sticky.tv'));
                });

                // 제품 별점 api
                PT_STATE.service.getCommentAvg(gCode, function(commentAvg) {
                    buyingUtil.getCommentAvg(buying.$el, selected, $('.sec_sticky.tv'), commentAvg);
                });
            },
            optionEtcChangeEnd(buying, option) {
                const selectOptEtc = buying.state.selectOptionEtc;
                const selected = buying.state.selected;

                // 각 버튼 클릭시 마다 API 실행시 사용될 data 속성값 저장 (G코드, 스큐, 회사코드 등)
                buyingUtil.updateBtn(buying.$el, selected, selectOptEtc, config.omni, '.sec_sticky.tv');

            },
            optionAllChangeEnd(buying) {
                const selectOptEtc = buying.state.selectOptionEtc;
                const selected = buying.state.selected;

                if (!config.isOpenedTv) {
                    // PT_STATE.service.initBtnAll();
                    config.isOpenedTv = true;
                }
            },
        }
    });
}

function initBuyingMusic() {
    musicBuying = new Buying('#pt_buying_music', {
        pdList: buyingDataMusic.result,
        defaults: true,
        option: {
            type: 'hide',
            scroll: {
                use: false
            },
        },
        sessionStorage: false,
        autoScope: {
            use: true
        },
        on: {
            init(buying) {
                const slideSubTxt = document.querySelector('[data-page-content=music] .pt_slide__subtxt');

                // 제품 슬라이드 초기화
                buyingSlideMusic = new BuyingSlide(buying, {
                    target: '#buying_slide_music',
                    imageData: config.slideImage.buyingSlideMusic,
                });

                // 모든 옵션을 클릭하기전까지, 버튼 클릭시 얼럿창 출력 이벤트
                buyingUtil.clickDeactiveBuy();

                // 구매하기 이벤트, etc 옵션 생길 시 주석처리
                PT_STATE.service.initBuy();

                // 매장픽업 이벤트 활성화
                // buyingUtil.pickupEvt();
            },
            productChangeEnd(buying) {
                const $el = buying.$el;
                const selectOptEtc = buying.state.selectOptionEtc;
                const selected = buying.state.selected;
                const sku = selected && selected.sku;
                const model = selected && selected.category;
                const gCode = selected && selected.gCode;
                const gCodeB = selected && selected.gCodeB;

                // 삼케플 트리거
                if (!$el.find('[name="samsungCarePlus"]').is(':checked')) {
                    $('#opt_etc_b2').trigger('click');
                } else if (gCodeB === '-') {
                    $('#opt_etc_b1').trigger('click');
                }

                const arrGCode =  selectOptEtc.samsungCarePlus === 'Y' ? [gCode, gCodeB] : [gCode];

                // 선택된 제품의 데이터를 html에서 출력함
                buyingUtil.renderHtml(buying, '.sec_sticky.music');

                // 각 버튼 클릭시 마다 API 실행시 사용될 data 속성값 저장 (G코드, 스큐, 회사코드 등)
                buyingUtil.updateBtn(buying.$el, selected, selectOptEtc, config.omniMusic, '.sec_sticky.music');

                // 매장픽업 초기화
                // buyingPickup.reset();

                // 바잉툴 상단, 하단 슬라이드 업데이트
                buyingSlideMusic.update({sku:sku, model:model, gCode:gCode}, config.isOnceMusic, '', mappingMethod);

                // 제품 품절여부 확인 및 구매관련버튼 활성/비활성화
                PT_STATE.service.checkSoldout(gCode, function(saleStatCd){
                    buyingUtil.totalSoldCheck(saleStatCd, buying.$el, $('.sec_sticky.music'));
                });

                // 제품 별점 api
                PT_STATE.service.getCommentAvg(gCode, function(commentAvg) {
                    buyingUtil.getCommentAvg(buying.$el, selected, $('.sec_sticky.music'), commentAvg);
                });
            },
            optionEtcChangeEnd(buying, option) {
                const selectOptEtc = buying.state.selectOptionEtc;
                const selected = buying.state.selected;

                // 각 버튼 클릭시 마다 API 실행시 사용될 data 속성값 저장 (G코드, 스큐, 회사코드 등)
                buyingUtil.updateBtn(buying.$el, selected, selectOptEtc, config.omni, '.sec_sticky.music');

            },
            optionAllChangeEnd(buying) {
                const selectOptEtc = buying.state.selectOptionEtc;
                const selected = buying.state.selected;

                if (!config.isOpenedMusic) {
                    // PT_STATE.service.initBtnAll();
                    config.isOpenedMusic = true;
                }
            },
        }
    });
}


/* 바잉툴 유틸리티 함수 모음 */
const buyingUtil = {
    // 각 버튼 클릭시 마다 API 실행시 사용될 data 속성값 저장 (G코드, 스큐, 회사코드 등)
    updateBtn($el, selected, selectOptEtc, omni, stickyType) {
        if(!selected) return;

        const $sticky = $secWrap.find(stickyType);

        // 구매하기 버튼
        const $btnBuy = $el.find('[data-role=btnBuy]');
        const $btnBuySticky = $sticky.find('[data-role=btnBuy]');

        // 바잉툴 내 삼케플 분기처리
        const $samcare_opt_a1 = $el.find('.samcare_opt_a1');
        const $samcare_opt_a2 = $el.find('.samcare_opt_a2');
        const $samcare_opt_b1 = $el.find('.samcare_opt_b1');
        const $samcare_opt_b2 = $el.find('.samcare_opt_b2');
        const $samcare_opt_d1 = $el.find('.samcare_opt_d1');
        const $samcare_opt_d2 = $el.find('.samcare_opt_d2');

        const $samcare_detail_price = $el.find('.pt_bnf__cont [data-opt-text="benefitB"]');

        // 스티키 내 삼케플 분기처리
        const $sticky_samcare_opt_a1 = $sticky.find('.samcare_opt_a1');
        const $sticky_samcare_opt_a2 = $sticky.find('.samcare_opt_a2');
        const $sticky_samcare_opt_b1 = $sticky.find('.samcare_opt_b1');
        const $sticky_samcare_opt_b2 = $sticky.find('.samcare_opt_b2');
        const $sticky_samcare_opt_d1 = $sticky.find('.samcare_opt_d1');
        const $sticky_samcare_opt_d2 = $sticky.find('.samcare_opt_d2');

        const $sticky_samcare_detail_price = $sticky.find('.pt_bnf__won [data-buying-text="benefitB"]');

        if(!!$btnBuy.length && selected.gCode){
            $btnBuy.attr('data-gcode', selected.gCode);
            $btnBuySticky.attr('data-gcode', selected.gCode);
            $btnBuy.attr('data-comp', selected.deptCd ? selected.deptCd : 313);
            $btnBuySticky.attr('data-comp', selected.deptCd ? selected.deptCd : 313);

            if(!!omni) {
                $btnBuy.attr('data-omni', `${omni.buy}${selected.sku}`);
                $btnBuySticky.attr('data-omni', `${omni.buySticky}${selected.sku}`);
            }
        }

        // 삼케플 추가
        if (selected.gCodeB === "-"){
            selectOptEtc.samsungCarePlus = 'N';
        }

        if (selectOptEtc.samsungCarePlus === 'Y') {
            // 삼케플 gCode
            $samcare_opt_a1.addClass('pt_hide');
            $samcare_opt_a2.removeClass('pt_hide');
            $sticky_samcare_opt_a1.addClass('pt_hide');
            $sticky_samcare_opt_a2.removeClass('pt_hide');
            $samcare_opt_b1.addClass('pt_hide');
            $samcare_opt_b2.removeClass('pt_hide');
            $sticky_samcare_opt_b1.addClass('pt_hide');
            $sticky_samcare_opt_b2.removeClass('pt_hide');
            $samcare_opt_d1.addClass('pt_hide');
            $samcare_opt_d2.removeClass('pt_hide');
            $sticky_samcare_opt_d1.addClass('pt_hide');
            $sticky_samcare_opt_d2.removeClass('pt_hide');
        } else {
            $samcare_opt_a1.removeClass('pt_hide');
            $samcare_opt_a2.addClass('pt_hide');
            $sticky_samcare_opt_a1.removeClass('pt_hide');
            $sticky_samcare_opt_a2.addClass('pt_hide');
            $samcare_opt_b1.removeClass('pt_hide');
            $samcare_opt_b2.addClass('pt_hide');
            $sticky_samcare_opt_b1.removeClass('pt_hide');
            $sticky_samcare_opt_b2.addClass('pt_hide');
            $samcare_opt_d1.removeClass('pt_hide');
            $samcare_opt_d2.addClass('pt_hide');
            $sticky_samcare_opt_d1.removeClass('pt_hide');
            $sticky_samcare_opt_d2.addClass('pt_hide');

        }

        // 쿠폰 다운로드 버튼
        const $btnCoupon =  $el.find('[data-role=btnCouponPromo]');
        const $btnCouponSticky =  $sticky.find('[data-role=btnCouponPromo]');
        if(!!$btnCoupon.length && selected.cpNum) {
            $btnCoupon.attr('data-cpnum', selected.cpNum ? selected.cpNum.trim() : '');
            $btnCouponSticky.attr('data-cpnum', selected.cpNum ? selected.cpNum.trim() : '');

            $btnCoupon.show();
            $btnCouponSticky.show();
        } else {
            $btnCoupon.hide();
            $btnCouponSticky.hide();
        }

        const $btnPdUrl = $el.find('[data-role="btnPdUrl"]');
        const $btnPdUrlSticky = $sticky.find('[data-role="btnPdUrl"]');
        const $btnCouponUrl = $el.find('[data-role="btnCouponPromo"]');
        const $btnCouponUrlSticky = $sticky.find('[data-role="btnCouponPromo"]');

        $btnPdUrl.attr('data-gcode', selected.gCode);
        $btnPdUrl.attr('data-gcodeb', selected.gCodeB);
        $btnPdUrl.attr('data-url', selected.pdUrl);
        $btnPdUrl.attr('title', `${selected.pdNmTxt} 페이지 새창 이동`);
        $btnPdUrlSticky.attr('data-gcode', selected.gCode);
        $btnPdUrlSticky.attr('data-gcodeb', selected.gCodeB);
        $btnPdUrlSticky.attr('data-url', selected.pdUrl);
        $btnPdUrlSticky.attr('title', `${selected.pdNmTxt} 페이지 새창 이동`);
        if(!!omni) {
            $btnPdUrl.attr('data-omni', `${config.omniTv.buy}${selected.sku}`);
            $btnPdUrlSticky.attr('data-omni', `${config.omniTv.buySticky}${selected.sku}`);
            $btnCouponUrl.attr('data-omni', `${config.omniTv.coupon}${selected.sku}`);
            $btnCouponUrlSticky.attr('data-omni', `${config.omniTv.couponSticky}${selected.sku}`);
        }
        const $btnPdLocation = $el.find('[data-role="btnPdLocation"]');

        $btnPdLocation.attr('href', selected.pdUrl);
        $btnPdLocation.attr('title', `${selected.pdNmTxt} 페이지 새창 이동`);
    },
    pickupEvt(){
        // add
        $secWrap.find('[data-pickup-plazaNo]').on('DOMSubtreeModified', function() {
            try{
                const $btnNPay = $secWrap.find('[data-role=btnNPay]');
                const $btnBuy = $secWrap.find('[data-role=btnBuy]');
                const plazaNo = $('[data-pickup-plazaNo]').text();
                
                if(!!plazaNo){
                    $secWrap.find('[data-role="pickupItem"]').slideDown();
                    // 구매하기 버튼
                    $btnBuy.attr('data-is-pickup', true);
                    $btnBuy.html('구매하기');
                    $btnBuy.removeAttr('tabindex');
                    $btnBuy.removeClass('pt_btn--disabled');

                    // N페이 구매 버튼
                    $btnNPay.attr('data-is-pickup', true);
                    if($btnNPay.attr('data-galaxyclub') === 'Y'){
                        // $btnNPay.html('<span><span class="pt_ico pt_ico--npay">N Pay</span></span>');
                        $btnNPay.attr('tabindex', -1);
                        $btnNPay.addClass('pt_btn--disabled');

                    } else {
                        // $btnNPay.html('<span><span class="pt_ico pt_ico--npay">N Pay</span>구매하기</span>');
                        $btnNPay.removeAttr('tabindex');
                        $btnNPay.removeClass('pt_btn--disabled');
                    }
                }

                // 특정 매장픽업 선택시 이벤트
                if(plazaNo === '923' || plazaNo === '251' || plazaNo === '184'){
                    $('[data-pickup-show="true"]').show();
                    $('[data-pickup-show="false"]').hide();
                } else {
                    $('[data-pickup-show="true"]').hide();
                    $('[data-pickup-show="false"]').show();
                }

            }catch (e) {}
        });

        // 매장픽업 시간 적용
        $secWrap.find('[data-pickup-capaDate]').on('DOMSubtreeModified', function() {
            const capaDate = $secWrap.find('[data-pickup-capaDate]').text();
            let date = '';
            try{
                if(capaDate){
                    date = capaDate.substr(0,4) + '-' + capaDate.substr(4,2) + '-' + capaDate.substr(6,2);
                    $secWrap.find('[data-role="pickupDate"]').closest('.pt_pickup__list').show();
                } else {
                    $secWrap.find('[data-role="pickupDate"]').closest('.pt_pickup__list').hide();
                }
            } catch (e) {}
            $secWrap.find('[data-role="pickupDate"]').text(date);
        });

        // 매장픽업 시간 적용
        $secWrap.find('[data-pickup-capaTime]').on('DOMSubtreeModified', function() {
            const capaTime = $secWrap.find('[data-pickup-capaTime]').text();
            let time = '';
            try{
                if(capaTime){
                    time = ( capaTime.length < 2 ? '0'+capaTime : capaTime ) + ':00';
                }
            } catch (e) {}
            $secWrap.find('[data-role="pickupTime"]').text(time);
        });

        $secWrap.on('click', '[data-pickup-close]', function() {
            const $btnBuy = $secWrap.find('[data-role=btnBuy]');
            const gCode = $btnBuy.attr('data-gcode');
            buyingPickup.reset('close');
            // 제품 품절여부 확인 및 구매관련버튼 활성/비활성화
            PT_STATE.service.checkSoldout(gCode, function(saleStatCd){
                buyingUtil.totalSoldCheck(saleStatCd);
            });
        });
    },
    totalSoldCheck(saleStatCd, $el, $sticky){
        const $btnDetail = $el.find('[sold-role="Y"]');
        const $btnBuy = $el.find('[sold-role="N"]');
        const $stickBtnDetail = $sticky.find('[sold-role="Y"]');
        const $stickBtnBuy = $sticky.find('[sold-role="N"]');

        try {
            if (Number(saleStatCd) === 12) {
                // 품절 X : 구매하기CTA Open, 자세히보기CTA Hide
                $btnBuy.removeClass('pt_hide');
                $btnDetail.addClass('pt_hide');
                $stickBtnBuy.removeClass('pt_hide');
                $stickBtnDetail.addClass('pt_hide');
            } else {
                // 품절 O : 구매하기CTA Hide, 자세히보기CTA Open
                $btnBuy.addClass('pt_hide');
                $btnDetail.removeClass('pt_hide');
                $stickBtnBuy.addClass('pt_hide');
                $stickBtnDetail.removeClass('pt_hide');
            }
        } catch (error) {
            !config.isLocal ? console.log(error) : '';
        }
    },
    conditionTransfer(_buying, _$this, data) {
        /**
         * 다중 조건문 수식 : Boolean으로 반환 (true or false)
         * @param {class} _buying 바잉툴 클래스
         * @param {$(this)} _$this each => $(this)
         * @param {string} data eventState value 값
         */
        // let cond_Container = _$this.attr(data).trim().replace(/ /g,'');
        let cond_Container = _$this.attr(data).trim();
        let center_Cond_Arr = cond_Container.match(/&&|\|\|/g);
        let child_Cond_Arr = cond_Container.split(/&&|\|\|/g);
        let result = null;
        
        child_Cond_Arr = child_Cond_Arr.map(text => {
            let txt_Boolean;
            if (text.includes('==')) {
                const [key, value] = text.split('==');
                txt_Boolean = _buying.state.selected[key] === value;
            } else if (text.includes('!=')) {
                const [key, value] = text.split('!=');
                txt_Boolean = _buying.state.selected[key] !== value;
            }

            return txt_Boolean;
        });

        let condtionResult = child_Cond_Arr[0];
        if (1 < child_Cond_Arr.length) {
            for (let i=1; i<child_Cond_Arr.length; i++) {
                if (center_Cond_Arr[i-1] === '&&') condtionResult = condtionResult && child_Cond_Arr[i];
                else if (center_Cond_Arr[i-1] === '||') condtionResult = condtionResult || child_Cond_Arr[i];
            }
            result = condtionResult;
        } else {
            result = condtionResult;
        }

        return result;
    },
    checkUserAgent() {
        // 닷컴앱 유무 체크
        const ua = navigator.userAgent.toLowerCase();
        if ( ua.indexOf('secapp') != -1) { // 닷컴앱 인경우
            $secWrap.find('[data-app-only]').show();
            $secWrap.find('[data-web-only]').hide();
        } else {
            $secWrap.find('[data-app-only]').hide();
            $secWrap.find('[data-web-only]').show();
        }
    },
    clickDeactiveBuy(){
        // 제품의 모든 옵션들을 선택하기 전 구매 관련 버튼(구매하기, 매장픽업, 선물하기, 장바구니 등) 클릭시 얼럿 문구 출력
        $secWrap.on('click', '[data-role="btnBuy"], [data-role="btnNPay"], [data-role="btnPickup"], [data-role="btnPresent"], [data-role="btnCart"]', function(e) {
            if(config.isOpenedMusic) return;
            if(config.isOpenedTv) return;
            e.preventDefault();
            PT_STATE.service.messager.alert(config.deactiveMessage, function(){
                let offset = $('#pt_buying .pt_option').offset().top - _.pxToVw(84, 224);
                let isOnce = false;
                $secWrap.find('[data-opt-etc]').each(function(i,item){
                    if(!isOnce && $(item).find('input:checked').length < 1){
                        offset = $(item).offset().top - _.pxToVw($(window).outerHeight()/3,$(window).outerHeight()/2);
                        isOnce = true;
                    }
                });

                $('html, body').stop().animate({ scrollTop: offset }, 500);
            });
        });
    },
    btnClickUrl() {
        $secWrap.on('click', '[data-role="btnPdUrl"]',function(e){
            e.preventDefault();

            const gCode = $(this).attr('data-gcode');
            const gCodeB = $(this).attr('data-gcodeb');
            const pdUrl = $(this).attr('data-url');
            const isCpGoodsId = $secWrap.find('[name="samsungCarePlus"]:checked').val() === 'Y' ? 'Y' : 'N';
            let isDsChoice;
    
            if (TV_HYBRID_WRAP.classList.contains('tv')) {
                isDsChoice = $secWrap.find('[name="optCdG"]:checked').val() === 'optG_2' ? 'Y' : 'N';
            } else if (TV_HYBRID_WRAP.classList.contains('music')) {
                isDsChoice = $secWrap.find('[name="optCdFF"]:checked').val() === 'optFF_2' ? 'Y' : 'N';
            }
    
            api.movePdLink(gCode, gCodeB, isDsChoice, isCpGoodsId, pdUrl);
        });
    },
    getCommentAvg($el, selected, $sticky, commentAvg) {
        // 평점 리뷰 체크
        const pdUrl = selected.pdUrl;
        const sku = selected.sku;
        const $star = $el.find(`[data-comment]`);
        const $stickyStar = $sticky.find(`[data-comment]`);
        
        try {
            const reviewGrade = Number(commentAvg);

            if (reviewGrade === 0) {
                $star.hide();
                $stickyStar.hide();
            } else {
                $star.html(reviewGrade.toFixed(1));
                $star.attr({
                    href: `${pdUrl}?focus=review`,
                    title: `${sku} 제품 상품평 페이지로 이동`
                });
                $star.show();

                $stickyStar.html(reviewGrade.toFixed(1));
                $stickyStar.attr({
                    href: `${pdUrl}?focus=review`,
                    title: `${sku} 제품 상품평 페이지로 이동`
                });
                $stickyStar.show();
            }
        } catch (error) {
            !config.isLocal ? console.log(error) : '';
        }
    },
    renderHtml(buying, stickyType){
        // 선택된 제품의 데이터를 html에서 출력함

        const selected = buying.state.selected;

        // 바잉툴 외부 제품 정보 text 변경
        try {
            $secWrap.find(stickyType).find('[data-buying-text]').each(function(){
                const textKey = $(this).attr('data-buying-text');
                if(!textKey || textKey === undefined) return;
                let text = selected[textKey].trim();
                if(/^\d+$/.test(text)) text = _.addComma(text); // 숫자이면 콤마추가
                $(this).html(text);
            });
        } catch (e) { console.error(e); }

        // data 값이 없을 때 바잉툴 외부 영역 숨김 처리
        try {
            $secWrap.find('[data-buying-active]').each(function(){
                const text = $(this).attr('data-buying-active');

                $(this).toggle(!!buying.state.selected[text]);
            });
        } catch (e) { console.error(e); }

        // show mapping
        try {
            $secWrap.find('[data-buying-show]').each(function(){
                const text = $(this).attr('data-buying-show');
                if (text.includes('==')) {
                    const [key, value] = text.split('==');
                    $(this).toggle(buying.state.selected[key] === value);
                } else if (text.includes('!=')) {
                    const [key, value] = text.split('!=');
                    $(this).toggle(buying.state.selected[key] !== value);
                }
            });
        } catch (e) { console.error(e); }

        // 다중 조건 show mapping
        try {
            $secWrap.find('[data-case-show]').each(function(){
                // conditionTransfer(_buying, _$this, data);
                if (buyingUtil.conditionTransfer(buying, $(this), 'data-case-show')) {
                    $(this).removeClass('pt_sam_hide');
                } else {
                    $(this).addClass('pt_sam_hide');
                }
            });
        } catch (e) { console.error(e); }

        // pd 이미지
        const $pdImg = $('[data-pd-img]');

        if(selected && selected.pdImg){
            $pdImg.attr('src', selected.pdImg).attr('alt', `${selected.pdNm} ${selected.optNmD} 제품 이미지`);
        }
    },
}

/**
 * 바잉툴 매장픽업 함수 모음
 */
const buyingPickup = {
    /**
     * 매장픽업 초기화
     */
    reset(isClose) {
        const $btnBuy = $secWrap.find('[data-role="btnBuy"]');
        const $btnNPay = $secWrap.find('[data-role="btnNPay"]');
        if($btnBuy.attr('data-is-pickup') || isClose === 'close'){
            $secWrap.find('[data-pickup-plazaNo]').text('');
            $secWrap.find('[data-pickup-storeAddr]').text('');
            $secWrap.find('[data-pickup-capaDate]').text('');
            $secWrap.find('[data-pickup-capaTime]').text('');
            $secWrap.find('[data-role="pickupDate"]').text('');
            $secWrap.find('[data-role="pickupTime"]').text('');
            $secWrap.find('[data-role="pickupItem"]').slideUp();
            $btnBuy.attr('data-is-pickup', false);
            $btnNPay.attr('data-is-pickup', false);
        }
    }
}

/**
 * 바잉툴 스티키 네비 함수 모음
 */
const buyingSticky = {
    scrollEvt: function() {
        const mainTag = $('#samsung_tv_launching');
        let $secBuying = null;

        $(window).off('scroll.buyingSticky').on('scroll.buyingSticky', function() {
            const scrollTop = $(window).scrollTop();

            $secBuying = mainTag.hasClass('tv') ? $('[data-page-content=tv].sec_buying') : '';

            if (mainTag.hasClass('tv')) {
                const $sec_notice = $('.sec_notice');
                const $buyingSticky = $('[data-buying-sticky]');
                const stickyHeight = $buyingSticky.outerHeight();
                const secTarget = $secBuying.offset().top;
                const startPosition = _.isMobile() ? secTarget - (window.innerHeight / 2) : secTarget + _.pxToVw(-83, -485);
                const endPosition = _.isMobile() ? secTarget + $secBuying.innerHeight() - (window.innerHeight / 2) : secTarget + $secBuying.innerHeight() - 100;

                if (scrollTop >= startPosition && scrollTop <= endPosition ) {
                    $buyingSticky.addClass('pt_fixed');
                } else {
                    $buyingSticky.removeClass('pt_fixed');
                }
            }
            
        }).scroll();
    },
    accordianEvt: function() {
        let noScrollScrollY = 0;

        buyingAccordian.toggle([
            {
                el: '[data-role-buying-accordian="buyingBenefitBtn_tv"]',
                target: '[data-buying-role="buyingBenefitBox_tv"]',
                speed : 100,
                offScroll: true,
                callback: function($this) {
                    if ($this.hasClass('active')) {
                        $this.html('<span class="blind">혜택 닫기</span>');
                        $this.attr('data-omni', 'sec:event:2024-tv-launching:tv_button_sticky_benefit_close');
                    } else {
                        $this.html('<span class="blind">혜택 보기</span>');
                        $this.attr('data-omni', 'sec:event:2024-tv-launching:tv_button_sticky_benefit_open');
                    }
                }
            },
            {
                el: '[data-role-buying-accordian="buyingBenefitBtn_music"]',
                target: '[data-buying-role="buyingBenefitBox_music"]',
                speed : 100,
                offScroll: true,
                callback: function($this) {
                    if ($this.hasClass('active')) {
                        $this.html('<span class="blind">혜택 닫기</span>');
                        $this.attr('data-omni', 'sec:event:2024-tv-launching:music_button_sticky_benefit_close');
                    } else {
                        $this.html('<span class="blind">혜택 보기</span>');
                        $this.attr('data-omni', 'sec:event:2024-tv-launching:music_button_sticky_benefit_open');
                    }
                }
            },
        ]);
    },
    init: function() {
        this.scrollEvt();
        this.accordianEvt();
    }
}

$(document).ready(function(){
    if(tabBtnTv.classList.contains('on') && !tvSwitch) { // 로드 시 티비 실행
        initBuyingTv();
        TV_HYBRID_WRAP.classList.add('tv')
        tvSwitch = true;
    }

    if(tabBtnHybrid.classList.contains('on') && !hybridSwitch) { // 로드 시 하이브리드 실행
        // initBuyingMusic();
        TV_HYBRID_WRAP.classList.add('hybrid')
        hybridSwitch = true;
    }

    // 앵커드가 너무 느려서 탭 on체크를 못하는 예외처리.. 나중에 수정
    const getUrl = new URL(window.location.href)
    if(getUrl.search.indexOf('hybrid') > -1) {
        // initBuyingMusic();
        setTimeout(() => {
            hybridSwitch = true;
            document.querySelector('.pt_category_nav__btn--hybrid').click();
        }, 500)
    }


    function tvActive() { // 클릭 시 티비
        TV_HYBRID_WRAP.classList.remove('hybrid')
        TV_HYBRID_WRAP.classList.add('tv')
        // if(default_element) default_element.querySelector('input').click() // 탭 변경했을 때 클릭되야하는 디폴트 값

        if(tvBuying) {
            const selectOptEtc = tvBuying.state.selectOptionEtc;
            const selected = tvBuying.state.selected;
            const sku = selected && selected.sku;
            const model = selected && selected.category;
            const gCode = selected && selected.gCode;

            buyingUtil.renderHtml(tvBuying, '.sec_sticky.tv');
            buyingUtil.updateBtn(tvBuying.$el, selected, selectOptEtc, config.omniTv, '.sec_sticky.tv');
            PT_STATE.service.checkSoldout(gCode, function(saleStatCd){
                buyingUtil.totalSoldCheck(saleStatCd, tvBuying.$el, '.sec_sticky.tv');
            });
        }

        // 탭 클릭 시, 삼케플 초기화
        $('#opt_etc_a1').trigger('click');

        if(tvSwitch) {
            const defId = tvBuying.origins.pdList.filter(pd => pd.default === 'O')[0].optCdA;
            const defEle = document.querySelector('#'+ defId);
            defEle ? defEle.click() : null;
            return;
        };

        initBuyingTv();
        tvSwitch = true;

        globalSelected = selected;
    }

    function musicActive() { // 클릭 시 뮤직
        TV_HYBRID_WRAP.classList.remove('tv')
        TV_HYBRID_WRAP.classList.add('hybrid')

        if(musicBuying) {
            const selectOptEtc = musicBuying.state.selectOptionEtc;
            const selected = musicBuying.state.selected;
            const sku = selected && selected.sku;
            const model = selected && selected.category;
            const gCode = selected && selected.gCode;

            buyingUtil.renderHtml(musicBuying, '.sec_sticky.music');
            buyingUtil.updateBtn(musicBuying.$el, selected, selectOptEtc, config.omniTv, '.sec_sticky.music');
            PT_STATE.service.checkSoldout(gCode, function(saleStatCd){
                buyingUtil.totalSoldCheck(saleStatCd, tvBuying.$el, '.sec_sticky.tv');
            });
        }

        // 탭 클릭 시, 삼케플 초기화
        $('#opt_etc_b1').trigger('click');

        if(hybridSwitch) {
            const defId = musicBuying.origins.pdList.filter(pd => pd.default === 'O')[0].optCdAA;
            const defEle = document.querySelector('#'+ defId);
            defEle ? defEle.click() : null;
            return;
        }

        // initBuyingMusic();
        hybridSwitch = true;

        globalSelected = selected;
    }

    tabBtnTv.addEventListener('click', tvActive)
    tabBtnHybrid.addEventListener('click', musicActive)

    // 구매하기, 자세히보기 버튼 클릭 이벤트
    buyingUtil.btnClickUrl();

    // 바잉툴 스티키 초기화
    buyingSticky.init();
    // 확대하기 버튼 초기화
    // buyingUtil.initZoom();
    // 닷컴앱 유무 체크
    // buyingUtil.checkUserAgent();
    // 쿠폰 다운로드 초기화
    // promoCoupon.init();

    // PT_STATE.service.initBuy(null, 'b2c_cta_event'); //넷퍼넬 적용시 tv music 바잉함수 내부에서 initBuy없애고 넣음

    config.isOnceTv = true;
    config.isOnceMusic = true;
});