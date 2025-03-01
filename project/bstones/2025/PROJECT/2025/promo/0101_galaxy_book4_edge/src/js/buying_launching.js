import buyingData from "../data/data_launching.json";
import pickupData from "../data/pickupStore.json";
import buyingSlide from "../data/buyingSlide_launching.json";
import benefitImage from "../data/benefitImage.json";
import {Buying} from './modules/buying';
import {BuyingSlide} from "./modules/buyingSlide";
import {util as _} from './modules/bs_common';
import {coupon, promoCoupon} from './modules/coupon';
import {buyingAccordian} from './modules/buyingAccordian';

const $secWrap = $('.sec_project_wrap');
let mainBuying = null;

/**
 * 초기변수, 얼럿 메시지, 옴니값 등 바잉툴 초기값
 * - 초기 설정값(변경X): isOnce, isOpened, isDeactive
 * - deactiveMessage: 구매 관련 버튼 클릭시 얼럿 메시지
 * - omni: 구매 관련 버튼들의 옴기값 작성
 * - slideImage: 제품 슬라이드 이미지 파일경로 및 파일명 작성
 */
let config = {
    isOnce: false,
    isOpened: false,
    isDeactive: false,
    deactiveMessage: '중고 추가 보상 프로그램까지<br/>선택 후 구매 가능합니다.',
    netFunnel: {
        buy: 'b2c_cta_event',
        // npay: 'b2c_cta_event',
        // cart: 'b2c_promotion',
        // present: 'b2c_promotion',
        // pickup: ''
    },
    omni: {
        buy: 'sec:event:galaxy-book4-edge:buynow_',
        pickup: 'sec:event:galaxy-book4-edge:pickup_',
        cart: 'sec:event:galaxy-book4-edge:cart_',
        // present: 'sec:event:galaxy-book4-edge:gift_',
        link: 'sec:event:galaxy-book4-edge:viewmore_',
        // appCoupon: 'sec:event:galaxy-book4-edge:goto_download_coupon_',
        // benefitCoupon: 'sec:event:galaxy-book4-edge:goto_benefit_coupon_',
        buySticky: 'sec:event:galaxy-book4-edge:sticky_buynow_',
        pickupSticky: 'sec:event:galaxy-book4-edge:sticky_pickup_',
        cartSticky: 'sec:event:galaxy-book4-edge:sticky_cart_',
        // presentSticky: 'sec:event:galaxy-book4:gift_',
        pickupClose: 'sec:event:galaxy-book4-edge:pickup_close_', // 확인필요
        linkSticky: 'sec:event:galaxy-book4-edge:sticky_viewmore_',
    },
    slideImage: buyingSlide
}

// 스크롤 방지
const noScroll = {
    scrollY: 0,
    add() {
        this.scrollY = window.scrollY;
        $('body').addClass('pt_no_scroll').css('top', `-${this.scrollY}px`);
    },
    remove() {
        $('body').removeClass('pt_no_scroll');
        window.scrollTo(0, this.scrollY);
    }
}

/**
 * 바잉툴 초기화
 */
let buyingSlideTop = null;

function initBuying() {
    mainBuying = new Buying('#pt_buying', {
        pdList: buyingData.result,
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
                
                // 제품 슬라이드 초기화
                buyingSlideTop = new BuyingSlide(buying, {
                    target: '#buying_slide',
                    imageData: config.slideImage.buyingSlideTop,
                });

                // 모든 옵션을 클릭하기전까지, 버튼 클릭시 얼럿창 출력 이벤트
                // buyingUtil.clickDeactiveBuy();

                // 구매하기 이벤트, etc 옵션 생길 시 주석처리
                // PT_STATE.service.initBuy();

                // 매장픽업 이벤트 활성화
                buyingUtil.pickupEvt();
            },
            // optionChangeEnd(buying, option) {
            //     const selected = buying.state.selected;
            //     const selectOption = buying.state.selectOption;
                
            // },
            productChangeEnd(buying) {
                const selectOptEtc = buying.state.selectOptionEtc;
                const selected = buying.state.selected;
                const sku = selected && selected.sku;
                const model = selected && selected.type;
                const gCode = selected && selected.gCode;


                // 선택된 제품의 데이터를 html에서 출력함
                buyingUtil.renderHtml(buying);

                // 각 버튼 클릭시 마다 API 실행시 사용될 data 속성값 저장 (G코드, 스큐, 회사코드 등)
                buyingUtil.updateBtn(buying.$el, selected, selectOptEtc, config.omni);

                // 매장픽업 초기화
                buyingPickup.reset();

                // 바잉툴 상단, 하단 슬라이드 업데이트
                buyingSlideTop.update({sku:sku, model:model}, config.isOnce);

                // 제품 품절여부 확인 및 구매관련버튼 활성/비활성화
                PT_STATE.service.checkSoldout(gCode, function(saleStatCd){
                    buyingUtil.soldoutEvt(saleStatCd);
                });

                // 제품 별점 api
                PT_STATE.service.getCommentAvg(gCode, function(commentAvg) {
                    const $star = $('[data-comment]');
                    const $starTxt = $star.find('[data-comment-text]');

                    if (commentAvg === '0.0') {
                        $star.hide();
                    } else {
                        $starTxt.html(commentAvg);
                        $star.attr('href', selected.pdUrl + '?focus=review');
                        $star.attr('title', selected.sku + '제품 상품평 페이지로 이동');
                        $star.show();
                    }
                });

                buyingUtil.checkUserAgent();

                //const selectOptEtc = buying.state.selectOptionEtc;
                //const selected = buying.state.selected;
                let isStickChk = false;

                // 각 버튼 클릭시 사용되는 data 속성값 저장 (G코드, 스큐, 회사코드 등) --> 공통화
                buyingUtil.updateBtn(buying.$el, selected, selectOptEtc, config.omni);

                // if($('[data-pickup-plazaNo]').text() === ''){
                // 제품 품절여부 확인 및 구매관련버튼 활성/비활성화 --> 공통화
                // PT_STATE.service.checkSoldout(selected.gCode, function (saleStatCd) {
                //     buyingUtil.soldoutEvt(saleStatCd);
                // });
                // }

                // if (selected.sku === 'NT750XQA-KC02B') {
                //     const $btnPickup =  $secWrap.find('[data-role=btnPickup]');
                //     $btnPickup.addClass('pt_btn--disabled');
                // }

                if (!config.isOpened) {
                    const $buyingBnf = $('[data-role="buyingBenefit"]');
                    $buyingBnf.show();
                    PT_STATE.service.initBtnAll(config.netFunnel);
                    // if(!buying.origins.sessionStorage || !isSessionStorage){
                    //     $('html, body').animate({scrollTop:$buyingBnf.offset().top - _.pxToVw(80, 265)}, 300);
                    // }
                    config.isOpened = true;

                    // if(!buying.origins.sessionStorage || !isSessionStorage){
                    // }

                    // if (!$('[data-buying-sticky]').hasClass('pt_fixed')) {
                    //     $('html, body').stop().animate({scrollTop: $('#pt_buying .pt_buying__prd').offset().top - _.pxToVw(80, 297)}, 500, function(){
                    //         if(!isStickChk){
                    //             $('[data-role-buying-accordian="buyingBenefitBtn"]').trigger('click');
                    //             isStickChk = true;
                    //         }
                    //     });
                    //
                    // } else {
                    //     $('[data-role-buying-accordian="buyingBenefitBtn"]').trigger('click');
                    // }
                    //
                    // $('[data-buying-btn]').addClass('active');

                    
                }
            },
            optionAllChangeEnd(buying) {
                // const selectOptEtc = buying.state.selectOptionEtc;
                // const selected = buying.state.selected;
                // let isStickChk = false;

                // // 각 버튼 클릭시 사용되는 data 속성값 저장 (G코드, 스큐, 회사코드 등) --> 공통화
                // buyingUtil.updateBtn(buying.$el, selected, selectOptEtc, config.omni);

                // // if($('[data-pickup-plazaNo]').text() === ''){
                // // 제품 품절여부 확인 및 구매관련버튼 활성/비활성화 --> 공통화
                // // PT_STATE.service.checkSoldout(selected.gCode, function (saleStatCd) {
                // //     buyingUtil.soldoutEvt(saleStatCd);
                // // });
                // // }

                // // if (selected.sku === 'NT750XQA-KC02B') {
                // //     const $btnPickup =  $secWrap.find('[data-role=btnPickup]');
                // //     $btnPickup.addClass('pt_btn--disabled');
                // // }

                // if (!config.isOpened) {
                //     // const $btnBenefit = $('[data-role="btnBenefit"]');
                //     const $buyingBnf = $('[data-role="buyingBenefit"]');
                //     $buyingBnf.slideDown();
                //     $('html, body').animate({scrollTop:$buyingBnf.offset().top - _.pxToVw(80, 265)}, 300);

                //     PT_STATE.service.initBtnAll(config.netFunnel);

                //     // if(!buying.origins.sessionStorage || !isSessionStorage){
                //     // }

                //     // if (!$('[data-buying-sticky]').hasClass('pt_fixed')) {
                //     //     $('html, body').stop().animate({scrollTop: $('#pt_buying .pt_buying__prd').offset().top - _.pxToVw(80, 297)}, 500, function(){
                //     //         if(!isStickChk){
                //     //             $('[data-role-buying-accordian="buyingBenefitBtn"]').trigger('click');
                //     //             isStickChk = true;
                //     //         }
                //     //     });
                //     //
                //     // } else {
                //     //     $('[data-role-buying-accordian="buyingBenefitBtn"]').trigger('click');
                //     // }
                //     //
                //     // $('[data-buying-btn]').addClass('active');

                //     config.isOpened = true;
                // }
            }
        }
    });
}

/**
 * 바잉툴 유틸리티 함수 모음
 */
const buyingUtil = {
    /**
     * 각 버튼 클릭시 마다 API 실행시 사용될 data 속성값 저장 (G코드, 스큐, 회사코드 등)
     */

    // 카트 옴니 생성
    getCartOmni(selected){
        const modelName = selected.pdNm;   // 모델명
        const modelCode = selected.sku;      // 모델코드
        // const bundleCode = selected.skuB && selected.skuB !== '-' ? '_'+selected.skuB : ''; // 모델코드(번들) - 번들(skuB)이 있을 때
        const basePrice = selected.priceA;   // 기준가
        const salePrice = selected.priceB; // 판매가

        // 기존 옴니값|(모델명)|(모델코드)|(기준가)|(판매가)
        // return `|${modelName}|${modelCode}${bundleCode}|${basePrice}|${salePrice}`; // 모델코드(번들) - 번들(skuB)이 있을 때
        return `|${modelName}|${modelCode}|${basePrice}|${salePrice}`;
    },

    updateBtn($el, selected, selectOptEtc, omni) {
        if(!selected) return;

        const $sticky = $secWrap.find('[data-buying-sticky]');
        const $benefit = $secWrap.find('[data-role="buyingBenefit"]');

        // 구매하기 버튼
        const $btnBuy = $el.find('[data-role=btnBuy]');
        const $btnBuySticky = $sticky.find('[data-role=btnBuy]');
        if(!!$btnBuy.length && selected.gCode){
            $btnBuy.attr('data-gcode', selected.gCode);
            $btnBuySticky.attr('data-gcode', selected.gCode);
            $btnBuy.attr('data-comp', selected.deptCd ? selected.deptCd : 313);
            $btnBuySticky.attr('data-comp', selected.deptCd ? selected.deptCd : 313);
            $btnBuy.attr('data-tradeIn', selectOptEtc.tradein ? selectOptEtc.tradein : 'N');
            $btnBuySticky.attr('data-tradeIn', selectOptEtc.tradein ? selectOptEtc.tradein : 'N');

            if(!!omni) {
                $btnBuy.attr('data-omni', `${omni.buy}${selected.sku}`);
                $btnBuy.attr('title', `${selected.sku} 제품 구매하기`);
                $btnBuySticky.attr('data-omni', `${omni.buySticky}${selected.sku}`);
                $btnBuySticky.attr('title', `${selected.sku} 제품 구매하기`);
            }
        }

        // 선물하기 버튼
        // const $btnPresent = $secWrap.find('[data-role=btnPresent]');
        // if(!!$btnPresent.length && selected.sku) {
        //     $btnPresent.attr('data-sku', selected.sku);
        //     if(!!omni) {
        //         $sticky.find('[data-role=btnPresent]').attr('data-omni', `${omni.presentSticky}${selected.sku}`);
        //         $el.find('[data-role=btnPresent]').attr('data-omni', `${omni.present}${selected.sku}`);
        //     }
        // }

        // 장바구니 버튼
        const $btnCart = $secWrap.find('[data-role="btnCart"]');
        if(!!$btnCart.length && selected.sku) {
            $btnCart.attr('data-gcode', selected.gCode);
            $btnCart.attr('data-gcodeB', selected.gCodeB);
            $btnCart.attr('data-comp', selected.deptCd ? selected.deptCd : 313);
            $btnCart.attr('data-tradeIn', selectOptEtc.tradein ? selectOptEtc.tradein : 'N');

            if(!!omni) {
                // 카트 옴니타입 변경 microsite -> microsite_addCart
                $sticky.find('[data-role=btnCart]').attr('data-omni-type', 'microsite_addCart');
                $el.find('[data-role=btnCart]').attr('data-omni-type', 'microsite_addCart');

                if( selected.sku != 'NT750XQA-KC02B' && selected.sku != 'NT750XQA-KC01B' ) {
                    $sticky.find('[data-role=btnCart]').attr('data-omni', `${omni.cartSticky}${selected.sku}${buyingUtil.getCartOmni(selected)}`);
                    $el.find('[data-role=btnCart]').attr('data-omni', `${omni.cart}${selected.sku}${buyingUtil.getCartOmni(selected)}`);
                } else {
                    $sticky.find('[data-role=btnCart]').attr('data-omni', `${omni.cartSticky}${selected.sku}`);
                    $el.find('[data-role=btnCart]').attr('data-omni', `${omni.cart}${selected.sku}`);
                }
            }
        }

        // 매장픽업 버튼
        const $btnPickup =  $secWrap.find('[data-role=btnPickup]');
        if(!!$btnPickup.length && selected.gCode) {
            $btnPickup.attr('data-gcode', selected.gCode);
            $btnPickup.attr('data-gname', selected.pdNmApi);
            $btnPickup.attr('data-sku', selected.sku);
            $btnPickup.attr('data-goodsTpCd', selected.goodsTpCd);
            if(!!omni) {
                $sticky.find('[data-role=btnPickup]').attr('data-omni', `${omni.pickupSticky}${selected.sku}`);
                $el.find('[data-role=btnPickup]').attr('data-omni', `${omni.pickup}${selected.sku}`);
            }
        }

        // 매장픽업 닫기 버튼
        const $btnPickupClose =  $secWrap.find('[data-pickup-close]');
        if(!!$btnPickupClose.length && !!omni) {
            $btnPickupClose.attr('data-omni', `${omni.pickupClose}${selected.sku}`);
        }

        // 쿠폰 다운로드 버튼
        // const $btnCoupon =  $el.find('[data-role=btnCouponPromo]');
        // const $btnCouponSticky =  $sticky.find('[data-role=btnCouponPromo]');
        // if(!!$btnCoupon.length && selected.cpNum) {
        //     $btnCoupon.attr('data-cpnum', selected.cpNum ? selected.cpNum.trim() : '');
        //     $btnCouponSticky.attr('data-cpnum', selected.cpNum ? selected.cpNum.trim() : '');
        //     if(!!omni) {
        //         $btnCoupon.attr('data-omni', `${omni.coupon}${selected.sku}`);
        //         $btnCouponSticky.attr('data-omni', `${omni.couponSticky}${selected.sku}`);
        //     }
        //     $btnCoupon.show();
        //     $btnCouponSticky.show();
        // } else {
        //     $btnCoupon.hide();
        //     $btnCouponSticky.hide();
        // }

        // 자세히 보기 버튼
        const $btnPdUrl = $el.find('[data-role="btnPdUrl"]');
        const $btnPdUrlSticky = $sticky.find('[data-role="btnPdUrl"]');
        if (!!$btnPdUrl.length && selected.pdUrl) {
            $btnPdUrl.attr('href', selected.pdUrl);
            $btnPdUrlSticky.attr('href', selected.pdUrl);
            $btnPdUrl.attr('title', `${selected.sku} PD 페이지로 이동`);
            $btnPdUrlSticky.attr('title', `${selected.sku} PD 페이지로 이동`);
            if(!!omni) {
                $btnPdUrl.attr('data-omni', `${omni.link}${selected.sku}`);
                $btnPdUrlSticky.attr('data-omni', `${omni.linkSticky}${selected.sku}`);
            }
        } else {
            // $btnPdUrl.hide();
            // $btnPdUrlSticky.hide();
        }

        // 시뮬레이터 혜택 이미지 변경
        const $benefitImgBox = $secWrap.find('[data-benefit-image]');
        if(!!$benefitImgBox.length && selected.optNmC) {
            const imgSrc = benefitImage.src;
            const product = !!benefitImage.product[selected.optNmC] ? benefitImage.product[selected.optNmC] : benefitImage.product['edge_14'];
            $benefitImgBox.find('img.m_show').attr('src',imgSrc+product.imageMo).attr('alt',product.alt);
            $benefitImgBox.find('img.m_hide').attr('src',imgSrc+product.image).attr('alt',product.alt);
        }

        // 바잉툴 : 선택된 CPU에 따라 스펙 영역 토글
        const toggleTextBox = (optCdA) => {
            $('.pt_text-box--01').toggle(optCdA === 'optA_1');
            $('.pt_text-box--02').toggle(optCdA === 'optA_2');

            if (optCdA === 'optA_1') {
                $('.pt_btn__tab--01').addClass('active');
                $('.pt_btn__tab--02').removeClass('active');
            } else if (optCdA === 'optA_2') {
                $('.pt_btn__tab--01').removeClass('active');
                $('.pt_btn__tab--02').addClass('active');
            }
        };

        toggleTextBox(selected.optCdA);

        $('select').on('change', function() {
            toggleTextBox($(this).val());
        });

    },
    pickupEvt(){

        let arrObserver = [];
        function mutationObserver(selectorId, callback){
            try{
                arrObserver[selectorId] = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if(callback) callback();
                    });
                });
                arrObserver[selectorId].observe(document.getElementById(selectorId),  {
                    attributes: true,
                    childList: true,
                    subtree: true,
                    characterData: true
                });
            } catch (error) {
                console.error('[mutationObserver]',error);
            }
        };

        mutationObserver('pt_pickup_chk', function(){
            // 매장픽업 날짜 적용
            (function(){
                try{
                    const $btnNPay = $secWrap.find('[data-role=btnNPay]');
                    const $btnBuy = $secWrap.find('[data-role=btnBuy]');
                    const $cart = $('[data-role="btnCart"]');
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
                    const pickupStore = pickupData.result;
                    $('[data-pickup-show="true"]').hide();
                    $('[data-pickup-show="false"]').show();
                    $.each(pickupStore, function(i, item){
                        if (plazaNo === item.storeNo) {
                            $('[data-pickup-show="true"]').show();
                            $('[data-pickup-show="false"]').hide();
                        }
                    });
                } catch (e) {
                    console.error(e);
                }
            })();

            // 매장픽업 일자 적용
            (function(){
                const capaDate = $secWrap.find('[data-pickup-capaDate]').text();
                let date = '';
                try{
                    if(capaDate){
                        date = capaDate.substr(0,4) + '-' + capaDate.substr(4,2) + '-' + capaDate.substr(6,2);
                        $secWrap.find('[data-role="pickupDate"]').closest('.pt_pickup__list').show();
                    } else {
                        $secWrap.find('[data-role="pickupDate"]').closest('.pt_pickup__list').hide();
                    }
                } catch (e) {
                    console.error(e);
                }
                $secWrap.find('[data-role="pickupDate"]').text(date);
            })();

            // 매장픽업 시간 적용
            (function(){
                const capaTime = $secWrap.find('[data-pickup-capaTime]').text();
                let time = '';
                try{
                    if(capaTime){
                        time = ( capaTime.length < 2 ? '0'+capaTime : capaTime ) + ':00';
                    }
                } catch (e) {
                    console.error(e);
                }
                $secWrap.find('[data-role="pickupTime"]').text(time);
            })();
        });

        $secWrap.on('click', '[data-pickup-close]', function() {
            const $btnBuy = $secWrap.find('[data-role=btnBuy]');
            const gCode = $btnBuy.attr('data-gcode');
            buyingPickup.reset('close');
            // 제품 품절여부 확인 및 구매관련버튼 활성/비활성화
            PT_STATE.service.checkSoldout(gCode, function(saleStatCd){
                buyingUtil.soldoutEvt(saleStatCd);
            });
        });
    },
    soldoutEvt(saleStatCd){
        const tradeInValue = $secWrap.find('[data-opt-etc="tradein"] input:checked').val();
        const galaxyClubValue = $secWrap.find('[data-opt-etc="galaxyClub"] input:checked').val();
        const $btnBuy = $secWrap.find('[data-role="btnBuy"]');
        const btnDisabled = PT_STATE.service.getBtnDisabled({
            tradeIn: tradeInValue ? tradeInValue : 'N',
            galaxyClub: galaxyClubValue ? galaxyClubValue : 'N',
            soldout: Number(saleStatCd) === 12 ? 'N' : 'Y',
            pickup: $btnBuy.attr('data-is-pickup') === 'true' ? 'Y' : 'N'
        });

        const isPickup = $btnBuy.attr('data-is-pickup');
        if(isPickup==="true"){
            $btnBuy.removeClass('pt_btn--disabled');
            $btnBuy.html('구매하기');
            $btnBuy.removeAttr('tabindex');
        } else {
            if(btnDisabled.buy){
                $btnBuy.addClass('pt_btn--disabled');
                $btnBuy.text('일시품절')
                $btnBuy.attr('tabindex', -1);

            } else {
                $btnBuy.removeClass('pt_btn--disabled');
                $btnBuy.html('구매하기');
                $btnBuy.removeAttr('tabindex');
            }
        }

        const $btnCart = $secWrap.find('[data-role="btnCart"]');
        if(btnDisabled.cart){
            $btnCart.addClass('pt_btn--disabled');
        } else {
            $btnCart.removeClass('pt_btn--disabled');
        }

        const $btnPickup = $secWrap.find('[data-role="btnPickup"]');
        if(btnDisabled.pickup){
            $btnPickup.addClass('pt_btn--disabled');
        } else {
            $btnPickup.removeClass('pt_btn--disabled');
        }

        // const $btnPresent = $secWrap.find('[data-role="btnPresent"]');
        // if(btnDisabled.present){
        //     $btnPresent.addClass('pt_btn--disabled');
        // } else {
        //     $btnPresent.removeClass('pt_btn--disabled');
        // }
    },
    /**
     * 닷컴앱 유무 체크
     */
    checkUserAgent() {
        const ua = navigator.userAgent.toLowerCase();
        if ( ua.indexOf('secapp') != -1) { // 닷컴앱 인경우
            $secWrap.find('[data-app-only]').show();
            $secWrap.find('[data-web-only]').hide();
        } else {
            $secWrap.find('[data-app-only]').hide();
            $secWrap.find('[data-web-only]').show();
        }
    },
    /**
     * 바잉툴 확대하기 기능 초기화
     */
    // initZoom() {
    //     let arrImage = {};
    //
    //     function setData(imageData){
    //         const src = imageData.src_zoom;
    //         const product = imageData.product;
    //         const alt = imageData.alt;
    //         Object.keys(product).forEach( (sku) => {
    //             if (!arrImage[sku]) arrImage[sku] = [];
    //             product[sku].forEach( (item) => {
    //                 if (!_.isMobile()) {
    //                     arrImage[sku].push( { src: src + item.imageZoom, width: 810, height: 690, alt: item.alt } );
    //                 } else {
    //                     arrImage[sku].push( { src: src + item.imageZoomMo, width: 720, height: 606, alt: item.alt } );
    //                 }
    //             });
    //         });
    //     }
    //
    //     function open(wrapper, sku) {
    //         let arrImgData = arrImage[sku];
    //         const lightbox = new PhotoSwipeLightbox({
    //             dataSource: arrImgData,
    //             children:'a',
    //             pswpModule: () => import('./plugins/photoswipe'),
    //             bgOpacity: .7,
    //             arrowPrevTitle: '이전',
    //             arrowNextTitle: '다음',
    //             closeTitle: '레이어 팝업 닫기',
    //             zoomTitle: '확대하기',
    //             initialZoomLevel: 'fit',
    //             secondaryZoomLevel: 1.3,
    //             maxZoomLevel: 1,
    //         });
    //
    //         lightbox.on('uiRegister', function() {
    //             lightbox.pswp.ui.registerElement({
    //                 name: 'bulletsIndicator',
    //                 className: 'pswp__bullets-indicator',
    //                 appendTo: 'wrapper',
    //                 onInit: (el, pswp) => {
    //                     const bullets = [];
    //                     let bullet;
    //                     let prevIndex = -1;
    //                     for (let i = 0; i < pswp.getNumItems(); i++) {
    //                         bullet = document.createElement('div');
    //                         bullet.className = 'pswp__bullet';
    //                         bullet.onclick = (e) => {
    //                             pswp.goTo(bullets.indexOf(e.target));
    //                         };
    //                         el.appendChild(bullet);
    //                         bullets.push(bullet);
    //                     }
    //                     pswp.on('change', (a) => {
    //                         if (prevIndex >= 0) {
    //                             bullets[prevIndex].classList.remove('pswp__bullet--active');
    //                         }
    //                         bullets[pswp.currIndex].classList.add('pswp__bullet--active');
    //                         prevIndex = pswp.currIndex;
    //                     });
    //                 },
    //             });
    //         });
    //
    //         const $target = $(wrapper).find(buyingSlide.target);
    //         const $swiper = $target[0].swiper;
    //         const realIdx = $swiper.realIndex ? $swiper.realIndex : 0;
    //
    //         lightbox.init();
    //         lightbox.loadAndOpen(realIdx);
    //     }
    //
    //     const $el = mainBuying.$el;
    //     setData(buyingSlide.imageData);
    //     $el.off('click.btnZoom').on('click.btnZoom', '[data-role="btnZoom"]', function(e) {
    //         e.preventDefault();
    //         let sku = $(this).attr('data-sku');
    //         open(mainBuying.el, sku);
    //     });
    // },
    /**
     * 제품의 모든 옵션들을 선택하기 전 구매 관련 버튼(구매하기, 매장픽업, 장바구니 등) 클릭시 얼럿 문구 출력
     */
    clickDeactiveBuy(){
        $secWrap.on('click', '[data-role="btnBuy"], [data-role="btnNPay"], [data-role="btnPickup"], [data-role="btnCart"]', function(e) {
            if(config.isOpened) return;
            e.preventDefault();
            PT_STATE.service.messager.alert(config.deactiveMessage, function(){
                let offset = $('#pt_buying [data-opt-etc]').offset().top - _.pxToVw(84, 224);
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
    /**
     * 선택된 제품의 데이터를 html에서 출력함
     */
    renderHtml(buying){
        const selected = buying.state.selected;

        // 바잉툴 외부 제품 정보 text 변경
        try {
            $secWrap.find('[data-buying-text]').each(function(){
                const textKey = $(this).attr('data-buying-text');
                // let text = selected[textKey].trim();
                let text = selected[textKey] ? selected[textKey].trim() : '';
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

        // 뺄셈 계산
        try {
            $secWrap.find('[data-buying-calc]').each(function(){
                const text = $(this).attr('data-buying-calc');
                if (text.includes('-')) {
                    const keys = text.split('-');
                    const minus = keys.reduce(function(acc, curr, idx){
                        const result = idx === 0? acc : acc - _.removeComma(selected[curr]);
                        return result;
                    }, _.removeComma(selected[keys[0]]));

                    $(this).html(_.addComma(minus));
                }
            });
        } catch (e) { console.error(e); }

        // 매장픽업 비활성화
        const $btnPickup = $secWrap.find('[data-role="btnPickup"]');
        if(selected.pickup && selected.pickup.toUpperCase().trim() === 'O'){
            $btnPickup.addClass('pt_btn-pickup--disabled');
        } else {
            $btnPickup.removeClass('pt_btn-pickup--disabled');
        }

        // pd 이미지 
        // const $pdImg = $('[data-pd-img]');
        // if(selected && selected.pdImg){
        //     $pdImg.attr('src', selected.pdImg).attr('alt', `${selected.pdNm} ${selected.optNmD} 제품 이미지`);
        // }
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

            PT_STATE.service.checkSoldout($btnBuy.attr('data-gcode'), function (saleStatCd) {
                buyingUtil.soldoutEvt(saleStatCd);
            });
        }
    }
}

/**
 * 바잉툴 스티키 네비 함수 모음
 */
const buyingSticky = {
    scrollEvt: function() {
        $(window).off('scroll.buyingSticky').on('scroll.buyingSticky', function() {
            const scrollTop = $(window).scrollTop();
            const $secBuying = $('.sec_buying');
            const $sec_notice = $('.sec_notice');
            const $buyingSticky = $('[data-buying-sticky]');
            const stickyHeight = $buyingSticky.outerHeight();
            const secTarget = $secBuying.offset().top - _.pxToVw(83, -485);

            if (scrollTop >= secTarget && scrollTop <= $sec_notice.offset().top - _.pxToVw(stickyHeight, stickyHeight) ) {
                $buyingSticky.addClass('pt_fixed');
            } else {
                $buyingSticky.removeClass('pt_fixed');
            }

        }).scroll();
    },
    accordianEvt: function() {
        let noScrollScrollY = 0;
        buyingAccordian.toggle([
            {
                el: '[data-role-buying-accordian="buyingBenefitBtn"]',
                target: '[data-buying-role="buyingBenefitBox"]',
                speed : 100,
                offScroll: true,
                callback: function($this) {
                    if ($this.hasClass('active')) {
                        $('[data-buying-sticky]').addClass('opened').append('<div class="pt_sticky__dimm"></div>');
                        $this.html('<span class="blind">혜택 닫기</span>');
                        $this.attr('data-omni', 'sec:event:galaxy-book4-ultra:preorder:close_sticky_benefit');
                        noScroll.add(); // 팝업 열릴때 스크롤 방지
                    } else {
                        $('[data-buying-sticky]').removeClass('opened');
                        $('.pt_sticky__dimm').remove();
                        $this.html('<span class="blind">혜택 보기</span>');
                        $this.attr('data-omni', 'sec:event:galaxy-book4-ultra:preorder:open_sticky_benefit');
                        noScroll.remove(); // 팝업 닫힐때 스크롤 방지 해제
                    }

                    $secWrap.off('click.stickyDimm').on('click.stickyDimm', '.pt_sticky__dimm', function() {
                        $('[data-role-buying-accordian="buyingBenefitBtn"]').trigger('click');
                    });
                }
            }
        ]);
    },
    init: function() {
        this.scrollEvt();
        this.accordianEvt();
    }
}

$(document).ready(function(){
    // 바잉툴 초기화
    initBuying();
    // 바잉툴 스티키 초기화
    buyingSticky.init();
    // 확대하기 버튼 초기화
    // buyingUtil.initZoom();
    // 닷컴앱 유무 체크
    buyingUtil.checkUserAgent();
    // 쿠폰 다운로드 초기화
    promoCoupon.init();

    config.isOnce = true;
});