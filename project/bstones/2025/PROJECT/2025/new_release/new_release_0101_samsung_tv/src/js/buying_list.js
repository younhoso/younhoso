import buyingData from "../data/data_list.json";
import slideData from "../data/buyingSlide_list.json"
import { util as _ } from './modules/bs_common';
import { Buying } from './modules/buying_mod_list';
import { BuyingSlide } from "./modules/buyingSlide_list";
import { coupon, promoCoupon } from './modules/coupon';
import { count } from './modules/countDown';

let config = {
    isOnce: false,
    isOpened: true,
    isDeactive: false,
    apiUrl: '/sec/',
    isLocal : !(document.domain.includes("samsung.com")),
    netFunnel: {
        buy: 'b2c_cta_event',
        npay: 'b2c_cta_event',
        // cart: 'b2c_promotion',
        // present: 'b2c_promotion',
        pickup: ''
    },
    omni: {
        buy: 'sec:event:2024-tv-launching:goto_vertical_',
        buyWith: 'sec:event:bespoke-refrigerator:goto_with_buy_',
        coupon: 'sec:event:2024-tv-launching:goto_verticalcoupon_',
        couponWith: 'sec:event:bespoke-refrigerator:download_with_coupon_',
        detail: 'sec:event:bespoke-refrigerator:goto_new_detaiil',
        detailWith: 'sec:event:bespoke-refrigerator:goto_with_detaiil'
    },
    slides: {}
}

const $secWrap = $('.sec_project_wrap');

// 바잉툴 리스트 맵핑 변수
let mappingMethod = new Map();
let soldCheckData = [];

const api = {
    gProdData(callback){
        try {
            if (!config.isLocal) {
                var buyGcodeArr = buyingData.result.map(item => item.gCode);
                var options = {
                    url: `${config.apiUrl}cxhr/pf/goodsList`,
                    data: {
                        prdtCardYn: 'Y',
                        prdtCardGoodsIds: buyGcodeArr,
                        pfFasterUseYn: 'Y',
                        fmyGrpYn: 'N'
                    },
                    type: 'GET',
                    done: function (data) {
                        soldCheckData = data.products;

                        if(callback) callback();
                    }
                };

                ajax.call(options);
            } else {
                if(callback) callback();
            }
        } catch (error) {
            console.info(error);
        }
    },
}

function addComma(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function htmlDraw(buying, omni, isReload){
    const buyingIndex = buying.$el.attr('data-prd-list');

    function returnHtml(data, idx) {
        // console.info(data);
        
        function returnOptHtml(optType) {
            const optArr = data[optType];
            const optionNoGubun = optArr.filter(v => v.indexOf('옵션없음') != -1).length >= 1 ? true : false;
            let optionColorBoxGubun = false;

            let optHtml = '';
            let optBtnHtml = '';
            let optKey = '';
            let btnType = '';

            if(optType === 'arrOptA') {
                optKey = 'optCdA';
                btnType = 'optA';
            } else if(optType === 'arrOptB') {
                optKey = 'optCdB';
                btnType = 'optB';
            } else if(optType === 'arrOptC') {
                optKey = 'optCdC';
                btnType = 'optCF';
                optionColorBoxGubun = true;
            } else if(optType === 'arrOptD') {
                optKey = 'optCdD';
                btnType = 'optCS';
                optionColorBoxGubun = true;
            }


            for (let opt of optArr) {
                const [optInfoNum, optInfoText] = opt.split('|');
                const optColor = opt.split('|')[2];
                const colorOptGubun = opt.indexOf('optCF') !== -1 || opt.indexOf('optCS') !== -1;
                let getSize = '';

                if(optInfoNum == "optA_7") {
                    getSize = '_85'
                } else if(optInfoNum == "optA_5") {
                    getSize = '_75'
                } else if(optInfoNum == "optA_4") {
                    getSize = '_65'
                } else if(optInfoNum == "optA_3") {
                    getSize = '_55'
                } else if(optInfoNum == "optB_1") {
                    getSize = '_stand'
                } else if(optInfoNum == "optB_2") {
                    getSize = '_slimfit'
                }
                
                optBtnHtml += /* html */`
                    <li class="swiper-slide pt_opt__item pt_opt__item--btn ${colorOptGubun ? 'pt_opt__item--color':''} ${optInfoText !== '옵션없음' ? '' : 'pt_hide'}" data-opt-btn>
                        <input
                            type="radio"
                            name="prd_buying${buyingIndex}_${data.grp}_${btnType}"
                            id="prd_buying${buyingIndex}_${data.grp}_${optInfoNum}"
                            value="${optInfoNum}"
                            ${optInfoNum === data[optKey]
                                ? 'checked'
                                : ''
                            }
                            autocomplete="off"
                        >
                        <label
                            for="prd_buying${buyingIndex}_${data.grp}_${optInfoNum}"
                            data-omni-type="microsite"
                            data-omni="sec:event:2024-tv-launching:goto_vertical${getSize}"
                            class="${colorOptGubun ? 'colorLabel':''}"
                            style="background-color: ${optColor !== undefined || optColor !== '-' ? optColor : ''};"
                        >
                        ${colorOptGubun ? '' : optInfoText}
                        </label>
                        <span class="blind">${optInfoText}</span>
                    </li>
                `
            }

            optHtml = /* html */`
                <div class="pt_opt__slide swiper-container ${optionColorBoxGubun ? 'colorOptBox':''} ${optionNoGubun ? 'pt_hide' : ''}" data-buying-option-slider>
                    <ul class="swiper-wrapper pt_opt__list" data-opt-key="${optKey}">
                        ${optBtnHtml}
                    </ul>
                    <div class="swiper-button-prev pt_btn pt_btn--prev"></div>
                    <div class="swiper-button-next pt_btn pt_btn--next"></div>
                </div>
            `;

            return optHtml;
        }

        // <span>${data.grp == "g01" ? '이주의 특가 구매 혜택' : 'TV 구매 혜택'}</span>

        // console.log(data.tagA.indexOf('0'));
        if (data.prdType !== 'list00') {
            return  /* html */`
                <div class="pt_buying_list swiper-slide ${data.tagA.indexOf('0') !== -1 ? 'type_0' : ''}" data-buying-group="${data.grp}">
                    <div class="pt_tagtype" data-tag="${data.tagA}">
                        <div class="pt_tagitem pt_tagitem-0 img_box ${data.tagA.indexOf('0') !== -1 ? "active" : ""}"></div>
                        <div class="pt_tagitem pt_tagitem-1 img_box ${data.tagA.indexOf('1') !== -1 ? "active" : ""}"></div>
                        <div class="pt_tagitem pt_tagitem-2 img_box ${data.tagA.indexOf('2') !== -1 ? "active" : ""}"></div>
                        <div class="pt_tagitem pt_tagitem-3 img_box ${data.tagA.indexOf('3') !== -1 ? "active" : ""}"></div>
                        <div class="pt_tagitem pt_tagitem-4 img_box ${data.tagA.indexOf('4') !== -1 ? "active" : ""}"></div>
                    </div>
                    <div class="pt_buying_list__slide swiper-container" data-slide-num=${idx}>
                        <div class="swiper-wrapper"></div>
                    </div>
                    <div class="pt_buying_list__prd">
                        <div class="pt_opt">
                            ${!!data.arrOptA && data.arrOptA.length > 0 ? returnOptHtml('arrOptA') : ''}
                            ${!!data.arrOptB && data.arrOptB.length > 0 ? returnOptHtml('arrOptB') : ''}
                            ${!!data.arrOptC && data.arrOptC.length > 0 ? returnOptHtml('arrOptC') : ''}
                            ${!!data.arrOptD && data.arrOptD.length > 0 ? returnOptHtml('arrOptD') : ''}
                        </div>
                        <div class="pt_title">
                            <p class="pt_title__name" data-opt-text="pdNm" title="${data.pdNm}">${data.pdNm}</p>
                            <p class="pt_title__sku" data-opt-text="sku">${data.sku}</p>
                        </div>
                        <div class="pt_price">
                            <ul class="pt_price__list">
                               <li class="pt_price__item pt_price__item--origin" data-opt-show="priceA!=-">
                                    <p class="pt_price__name">기준가</p>
                                    <p class="pt_price__cont"><span class="en" data-opt-text="priceA">${data.priceA}</span>원</p>
                                </li>
                                <li class="pt_price__item pt_price__item--blue" data-opt-show="priceB!=-" ${data.priceB !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_price__name">혜택가</p>
                                    <div class="pt_price__area">
                                        <p class="pt_price__cont pt_price__cont--blue pt_price__cont--cpnum"><span class="en" data-opt-text="cpPer">${data.cpPer}</span><span class="en">%</span></p>
                                        <p class="pt_price__cont"><span class="en" data-opt-text="priceB">${data.priceB}</span>원</p>
                                    </div>
                                </li>
                                <li class="pt_price__item pt_price__item--blue" data-opt-show="priceC!=-" ${data.priceC !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_price__name">${data.prdType == "list01" ? '쿠폰가' : '체험단 전용 쿠폰가'}</p>
                                    <div class="pt_price__area">
                                        <p class="pt_price__cont pt_price__cont--blue pt_price__cont--cpnum"><span class="en" data-opt-text="cpPer">${data.cpPer}</span><span class="en">%</span></p>
                                        <p class="pt_price__cont"><span class="en" data-opt-text="priceC">${data.priceC}</span>원</p>
                                    </div>
                                </li>
                            </ul>
                            <button class="pt_price__coupon" data-cpNum="${data.cpNum}" data-role="btnCouponPromo" data-opt-show="cpNum!=-" ${data.cpNum !== "-" ? '' : 'style="display: none;"'} 
                            data-omni-type="microsite" data-omni="${config.omni.coupon}${data.sku}" title="쿠폰 받기">
                                <span class="pt_price__coupon-txt">쿠폰 받기</span>
                                <div class="img_box pt_price__coupon-ico">
                                    <img src="../../is/images/launching/buying_list/stv_buying_list_coupon_ico_pc.png" alt="내려받기 아이콘" class="m_hide" loading="lazy"/>
                                    <img src="../../is/images/launching/buying_list/stv_buying_list_coupon_ico_mo.png" alt="내려받기 아이콘" class="m_show" loading="lazy"/>
                                </div>
                                </button>
                        </div>
                        <div class="pt_bnf">
                        <ul class="pt_bnf__list">
                            <li class="pt_bnf__item" data-opt-show="benefitA!=-" ${data.benefitA !== "-" ? '' : 'style="display: none;"'}>
                                <p class="pt_bnf__name">신용카드 금액대별 <br class="m_show"/>결제 혜택</p>
                                <p class="pt_bnf__cont"><span class="en" data-opt-text="benefitA">${data.benefitA}</span>원</p>
                            </li>
                            <li class="pt_bnf__item" data-opt-show="benefitB!=-" ${data.benefitB !== "-" ? '' : 'style="display: none;"'}>
                                <p class="pt_bnf__name">네이버페이로 <br class="m_show"/>카드 결제 시</p>
                                <p class="pt_bnf__cont">네이버페이 <br class="m_show"/><span class="en" data-opt-text="benefitB">${data.benefitB}</span>만<span class="en">P</span></p>
                            </li>
                            <li class="pt_bnf__item" data-opt-show="benefitF!=-" ${data.benefitF !== "-" ? '' : 'style="display: none;"'}>
                                <p class="pt_bnf__name">삼성카드로 결제 시 추가 캐시백</p>
                                <p class="pt_bnf__cont"><span class="en" data-opt-text="benefitF"> ${data.benefitF}</span>원</p>
                            </li>
                            <li class="pt_bnf__item" data-opt-show="benefitC!=-" ${data.benefitC !== "-" ? '' : 'style="display: none;"'}>
                                <p class="pt_bnf__name">삼성위크 <br class="m_show"/>Better Together</p>
                                <p class="pt_bnf__cont">올리브영 <br class="m_show"/><span class="en" data-opt-text="benefitC">${data.benefitC}</span>만원</p>
                            </li>
                            <li class="pt_bnf__item" data-opt-show="benefitD!=-" ${data.benefitD !== "-" ? '' : 'style="display: none;"'}>
                                <p class="pt_bnf__name">24개월 <br class="m_show"/>무이자 할부 시 <br/>월 납부 예상 금액
                                    <button type="button" class="pt_bnf__noti-btn" title="무이자 할부 팝업창 열기" data-omni-type="microsite" data-omni="sec:event:2024-tv-launching:popup_vertical_cardinfo_open">
                                        <div class="img_box">
                                            <img src="../../is/images/launching/buying_list/stv_buying_list_noti_ico.svg" class="m_hide" alt="무이자 할부 알림 얼럿창 느낌표 아이콘" loading="lazy"/>
                                            <img src="../../is/images/launching/buying_list/stv_buying_list_noti_ico_mo.svg" class="m_show" alt="무이자 할부 알림 얼럿창 느낌표 아이콘" loading="lazy"/>
                                        </div>
                                    </button>
                                </p>
                                <p class="pt_bnf__cont"><span class="en" data-opt-text="benefitD">${data.benefitD}</span>원부터~</p>
                                <div class="pt_bnf__noti-con">
                                    <div class="pt_bnf__noti-arae">
                                        <p class="pt_bnf__noti-text">삼성카드 기준, <br/>정확한 납부금액은 <br class="m_show"/>카드사 확인 필요</p>
                                        <a href="javascript:;" class="pt_bnf__noti-close" title="무이자 할부 팝업창 닫기" data-omni-type="microsite" data-omni="sec:event:2024-tv-launching:popup_vertical_cardinfo_close">
                                            <img src="../../is/images/launching/buying_list/stv_buying_list_noti_close_ico.svg" class="m_hide" alt="무이자 할부 알림 얼럿창 닫기 X버튼 아이콘" loading="lazy"/>
                                            <img src="../../is/images/launching/buying_list/stv_buying_list_noti_close_ico_mo.svg" class="m_show" alt="무이자 할부 알림 얼럿창 닫기 X버튼 아이콘" loading="lazy"/>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li class="pt_bnf__item" data-opt-show="benefitE!=-" ${data.benefitE !== "-" ? '' : 'style="display: none;"'}>
                                <p class="pt_bnf__name">베스트 리뷰어 챌린지 참여 시</p>
                                <p class="pt_bnf__cont">스타벅스 <span class="en" data-opt-text="benefitE"> ${data.benefitE}</span>만원</p>
                            </li>
                        </ul>
                    </div>
                        <div class="pt_btn-box">
                            <a href="${data.url}" 
                                class="pt_btn pt_btn--buy en ${data.sku == "KQ65SC9SAFXKR" || data.sku == "KQ65SC9S-W1" ? 'pt_btn--dimmed' : ''}" 
                                data-role="${data.sku == "KQ65SC9SAFXKR" || data.sku == "KQ65SC9S-W1" ? '' : 'btnListUrl'}" data-gCode="${data.gCode}"
                                data-omni-type="microsite" data-omni="${config.omni.buy}${data.sku}" 
                                title="${data.sku} 제품 페이지 새창으로 열림" target="_blank"
                            >${data.sku == "KQ65SC9SAFXKR" || data.sku == "KQ65SC9S-W1" ? 'Sold Out' : '구매하기'}</a>
                            <a href="#" class="pt_btn pt_btn--star" data-comment title="${data.sku} 제품 상품평 페이지 새창으로 열림" target="_blank">5.0</a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            return  /* html */`
                <div class="pt_buying_list swiper-slide ${data.tagA.indexOf('0') !== -1 ? 'type_0' : ''}" data-buying-group="${data.grp}">
                    <div class="pt_tagtype pt_tagtype--special" data-tag="${data.tagA}">
                        <div class="pt_tagitem pt_tagitem-0 img_box ${data.tagA.indexOf('0') !== -1 ? "active" : ""}"></div>
                        <div class="pt_tagitem pt_tagitem-1 img_box ${data.tagA.indexOf('1') !== -1 ? "active" : ""}"></div>
                        <div class="pt_tagitem pt_tagitem-2 img_box ${data.tagA.indexOf('2') !== -1 ? "active" : ""}"></div>
                        <div class="pt_tagitem pt_tagitem-3 img_box ${data.tagA.indexOf('3') !== -1 ? "active" : ""}"></div>
                        <div class="pt_tagitem pt_tagitem-4 img_box ${data.tagA.indexOf('4') !== -1 ? "active" : ""}"></div>
                    </div>
                    <div class="pt_buying_list__slide swiper-container" data-slide-num=${idx}>
                        <div class="swiper-wrapper"></div>
                    </div>
                    <div class="pt_buying_list__prd">
                        <div class="pt_title pt_title--special">
                            <a href="#" class="pt_title--star" data-comment title="${data.sku} 제품 상품평 페이지 새창으로 열림" target="_blank">5.0</a>
                            <p class="pt_title__name en" data-opt-text="pdNm" title="${data.pdNm}">${data.pdNm}</p>
                            <p class="pt_title__sku" data-opt-text="sku">${data.sku}</p>
                        </div>
                        <div class="pt_opt pt_opt--special">
                            ${!!data.arrOptA && data.arrOptA.length > 0 ? returnOptHtml('arrOptA') : ''}
                            ${!!data.arrOptB && data.arrOptB.length > 0 ? returnOptHtml('arrOptB') : ''}
                            ${!!data.arrOptC && data.arrOptC.length > 0 ? returnOptHtml('arrOptC') : ''}
                            ${!!data.arrOptD && data.arrOptD.length > 0 ? returnOptHtml('arrOptD') : ''}
                        </div>
                        <div class="pt_price pt_price--special">
                            <ul class="pt_price__list">
                                <li class="pt_price__item pt_price__item--origin" data-opt-show="priceA!=-">
                                    <p class="pt_price__name">기준가</p>
                                    <p class="pt_price__cont"><span class="en" data-opt-text="priceA">${data.priceA}</span>원</p>
                                </li>
                                <li class="pt_price__item pt_price__item--blue" data-opt-show="priceB!=-" ${data.priceB !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_price__name">혜택가</p>
                                    <p class="pt_price__cont pt_price__cont--blue pt_price__cont--cpnum en"><span class="en" data-opt-text="cpPer">${data.cpPer}</span>%</p>
                                    <p class="pt_price__cont"><span class="en" data-opt-text="priceB">${data.priceB}</span>원</p>
                                </li>
                                <li class="pt_price__item pt_price__item--blue" data-opt-show="priceC!=-" ${data.priceC !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_price__name">${data.prdType == "list00" ? '쿠폰가' : '체험단 전용 쿠폰가'}</p>
                                    <p class="pt_price__cont pt_price__cont--blue pt_price__cont--cpnum en"><span class="en" data-opt-text="cpPer">${data.cpPer}</span>%</p>
                                    <p class="pt_price__cont"><span class="en" data-opt-text="priceC">${data.priceC}</span>원</p>
                                </li>
                            </ul>
                            <button class="pt_price__coupon" data-cpNum="${data.cpNum}" data-role="btnCouponPromo" data-opt-show="cpNum!=-" ${data.cpNum !== "-" ? '' : 'style="display: none;"'} 
                            data-omni-type="microsite" data-omni="${config.omni.coupon}${data.sku}" title="쿠폰 받기"><span class="pt_price__coupon-txt">쿠폰 받기</span><div class="img_box pt_price__coupon-ico"><img src="../../is/images/launching/buying_list/stv_buying_list_coupon_ico_pc.png" alt="내려받기 아이콘" class="m_hide" loading="lazy"/><img src="../../is/images/launching/buying_list/stv_buying_list_coupon_ico_mo.png" alt="내려받기 아이콘" class="m_show" loading="lazy"/></div></button>
                        </div>
                        <div class="pt_bnf pt_bnf--special">
                            <ul class="pt_bnf__list" >
                                <li class="pt_bnf__item" data-opt-show="benefitA!=-" ${data.benefitA !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_bnf__name">신용카드 금액대별 결제 혜택</p>
                                    <p class="pt_bnf__cont"><span class="en" data-opt-text="benefitA">${data.benefitA}</span>원</p>
                                </li>
                                <li class="pt_bnf__item" data-opt-show="benefitB!=-" ${data.benefitB !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_bnf__name">네이버페이로 <br class="m_show"/>카드 결제 시</p>
                                    <p class="pt_bnf__cont">네이버페이 <br class="m_show"/><span class="en" data-opt-text="benefitB">${data.benefitB}</span>만<span class="en">P</span></p>
                                </li>
                                <li class="pt_bnf__item" data-opt-show="benefitF!=-" ${data.benefitF !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_bnf__name">삼성카드로 결제 시 추가 캐시백</p>
                                    <p class="pt_bnf__cont"><span class="en" data-opt-text="benefitF"> ${data.benefitF}</span>원</p>
                                </li>
                                <li class="pt_bnf__item" data-opt-show="benefitC!=-" ${data.benefitC !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_bnf__name">삼성위크 <br class="m_show"/>Better Together</p>
                                    <p class="pt_bnf__cont">올리브영 <br class="m_show"/><span class="en" data-opt-text="benefitC">${data.benefitC}</span>만원</p>
                                </li>
                                <li class="pt_bnf__item" data-opt-show="benefitD!=-" ${data.benefitD !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_bnf__name">24개월 무이자 할부 시 월 납부 예상 금액
                                        <button type="button" class="pt_bnf__noti-btn" title="무이자할부 팝업창 열기" data-omni-type="microsite" data-omni="sec:event:2024-tv-launching:popup_vertical_cardinfo_open">
                                            <div class="img_box">
                                                <img src="../../is/images/launching/buying_list/stv_buying_list_noti_ico.svg" class="m_hide" alt="무이자 할부 알림 얼럿창 느낌표 아이콘" loading="lazy"/>
                                                <img src="../../is/images/launching/buying_list/stv_buying_list_noti_ico_mo.svg" class="m_show" alt="무이자 할부 알림 얼럿창 느낌표 아이콘" loading="lazy"/>
                                            </div>
                                        </button>
                                    </p>
                                    <p class="pt_bnf__cont"><span class="en" data-opt-text="benefitD">${data.benefitD}</span>원부터~</p>
                                    <div class="pt_bnf__noti-con">
                                        <div class="pt_bnf__noti-arae">
                                            <p class="pt_bnf__noti-text">삼성카드 기준, <br/>정확한 납부금액은 카드사 확인 필요</p>
                                            <a href="javascript:;" class="pt_bnf__noti-close" title="무이자할부 팝업창 닫기" data-omni-type="microsite" data-omni="sec:event:2024-tv-launching:popup_vertical_cardinfo_close">
                                                <img src="../../is/images/launching/buying_list/stv_buying_list_noti_close_ico.svg" class="m_hide" alt="무이자 할부 알림 얼럿창 닫기 X버튼 아이콘" loading="lazy"/>
                                                <img src="../../is/images/launching/buying_list/stv_buying_list_noti_close_ico_mo.svg" class="m_show" alt="무이자 할부 알림 얼럿창 닫기 X버튼 아이콘" loading="lazy"/>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li class="pt_bnf__item" data-opt-show="benefitE!=-" ${data.benefitE !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_bnf__name">베스트 리뷰어 챌린지 참여 시</p>
                                    <p class="pt_bnf__cont">스타벅스 <span class="en" data-opt-text="benefitE"> ${data.benefitE}</span>만원</p>
                                </li>
                            </ul>
                        </div>
                        <div class="pt_btn-box pt_btn-box--special">
            
                            <a href="${data.url}" 
                                class="pt_btn pt_btn--buy en ${data.sku == "KQ65SC9SAFXKR" || data.sku == "KQ65SC9S-W1" ? 'pt_btn--dimmed' : ''}" 
                                data-role="${data.sku == "KQ65SC9SAFXKR" || data.sku == "KQ65SC9S-W1" ? '' : 'btnListUrl'}" data-gCode="${data.gCode}"
                                data-omni-type="microsite" data-omni="${config.omni.buy}${data.sku}" 
                                title="${data.sku} 제품 페이지 새창으로 열림" target="_blank"
                            >${data.sku == "KQ65SC9SAFXKR" || data.sku == "KQ65SC9S-W1" ? 'Sold Out' : '구매하기'}</a>
                        </div>
                    </div>
                </div>
            `;
        }
        
    }

    const listDefault = buying.params.parsedData.listPaging;

    let _html = '';
    listDefault.forEach((prd, idx) => {
        _html += returnHtml(prd, idx);
    });

    const $el = buying.$el;
    if(isReload){
        $el.html(_html);
    } else {
        $el.append(_html);
    }

    for (let item of listDefault) {
        config.slides[item.grp] = new BuyingSlide(item, {
            target: `[data-prd-list="${buyingIndex}"] [data-buying-group="${item.grp}"] .pt_buying_list__slide`,
            imageData: slideData
        });

        config.slides[item.grp].update(item, config.isOnce);
    }

    if (listDefault.length < 5) $el.closest('.pt_slide-box').addClass('pc_centered');
}

function setOptionSwiper() {
    $('[data-buying-option-slider]').each(function() {
        if ($(this).hasClass('swiper-container-initialized')) return;

        const optSwiper = new Swiper(this, {
            nested: true,
            allowTouchMove: true,
            slidesPerView: 'auto',
            watchOverflow : true, // 다음슬라이드가 없을때 pager, button 숨김 여부 설정
            // threshold: 30,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                init: function() {
                    const $el = $(this.$el);

                    // 다음슬라이드가 있는지 없는지 체크 ("true"면 다음 슬라이드가 없는상태)
                    if(this.isLocked == true){
                        // 다음슬라이드가 없으면 클래스(slide_lockd) 추가
                        $el.closest('.swiper-container').addClass('slide_lockd');
                    }else{
                        $el.closest('.swiper-container').removeClass('slide_lockd');
                    }

                    const _index =  $el.closest('.swiper-container').find('input:checked').closest('[data-opt-btn]').index();
                    this.slideTo(_index, 0);
                }
            }
        });

    });


}

const buyingUtil = {
    updateData($el, selected, omni) {
        if(!selected) return;

        const $targetGroup = $el.find(`[data-buying-group="${selected.grp}"]`);

        // 쿠폰 다운받기 버튼
        const $btnCoupon = $targetGroup.find('[data-role="btnCouponPromo"]');
        if(!!$btnCoupon.length && selected.gCode){
            $btnCoupon.attr({
                'data-cpNum': `${selected.cpNum !== '-' ? selected.cpNum : ''}`,
                'title': `${selected.pdNm} 쿠폰 다운받기`,
            });
            if(!!omni) $btnCoupon.attr('data-omni', `${omni.coupon}${selected.sku}`);
        }
        // 조합하여 구매하기 버튼
        const $btnCustom = $targetGroup.find('[data-role="btnCustom"]');
        if(!!$btnCustom.length && selected.gCode){
            $btnCustom.attr({
                'href': selected.url,
                'title': `${selected.sku} 제품 페이지 새창으로 열림`,
                'data-sku': selected.sku
            });

            if(!!omni) $btnCustom.attr('data-omni', `${omni.custom}${selected.sku}`);
        }
        // 구매하기 버튼
        const $btnListUrl = $targetGroup.find('[data-role="btnListUrl"]');
        if(!!$btnListUrl.length && selected.gCode){
            $btnListUrl.attr({
                'data-gcode': selected.gCode,
                'title': `${selected.sku} 페이지로 이동`,
                'data-omni': `${omni.buy}${selected.sku}`,
                'href': selected.url
            });
        }
    },
    btnToggle() {
        $('.sec_project_wrap .pt_buying_list').on('click', '[data-role="btnToggle"]', function(e){
            e.preventDefault();

            const $this = $(this);
            const $target = $this.siblings('[data-role="toggleCont"]');

            if ($this.hasClass('active')) {
                $this.removeClass('active');
                $target.hide();
            } else {
                $this.addClass('active');
                $target.show();
            }
        });
    },
    totalSoldCheck($el, selected) {
        // 솔드아웃 체크
        const gCode = selected.gCode;
        const group = selected.grp;

        const $target = $el.find(`[data-buying-group="${group}"] .pt_btn-box`);
        const $btnListUrl = $target.find('[data-role="btnListUrl"]');

        try {
            if (mappingMethod.get(gCode).saleStatCd == 12 || config.isLocal){
                $btnListUrl.html('구매하기').removeClass('pt_btn--soldout_more');
            } else {
                $btnListUrl.html('자세히 보기').addClass('pt_btn--soldout_more');
            }
        } catch (error) {
            !config.isLocal ? console.log(error) : '';
        }
    },
    getCommentAvg($el, selected) {
        // 평점 리뷰 체크
        const gCode = selected.gCode;
        const group = selected.grp;
        
        const $star = $el.find(`[data-buying-group=${group}] [data-comment]`);
        
        try {
            const reviewGrade = mappingMethod.get(gCode).reviewGrade;
            const goodsUrl = mappingMethod.get(gCode).goodsUrl;
            const sku = mappingMethod.get(gCode).sku;

            if (reviewGrade === 0) {
                $star.hide();
            } else {
                $star.html(reviewGrade.toFixed(1));
                $star.attr({
                    href: `https://www.samsung.com/sec/${goodsUrl}?focus=review`,
                    title: `${sku} 제품 상품평 페이지로 이동`
                });
                $star.show();
            }
        } catch (error) {
            !config.isLocal ? console.log(error) : '';
        }
    },
    tagCheck($el, selected) {
        // 태그 타입 체크
        const tag = selected.tagA.split(',').map(v => Number(v.trim()));
        const group = selected.grp;

        const $grp = $el.find(`[data-buying-group=${group}]`);
        const $tag = $el.find(`[data-buying-group=${group}] [data-tag]`);
        const $tagItem = $tag.find(`.pt_tagitem`);

        $tag.attr('data-tag', selected.tagA);
        tag.indexOf(0) !== -1 ? $grp.addClass('type_0') : $grp.removeClass('type_0');

        $tagItem.each(function(idx, item) {
            tag.indexOf(idx) >= 0 ? $(this).addClass('active') : $(this).removeClass('active');
        });
        
    },
    buyClickUrl() {
        $secWrap.on('click', '[data-role="btnListUrl"]',function(e){
            e.preventDefault();
    
            window.open('about:blank').location.href = $(this).attr('href');
        });
    },
    notiClickEvt(){
        $secWrap.find('.pt_bnf__noti-btn').on('click', function(){
            $(this).parents().siblings('.pt_bnf__noti-con').css("display", "flex")
        })
        $secWrap.find('.pt_bnf__noti-close').on('click', function() {
            $(this).parents().parents('.pt_bnf__noti-con').css("display", "none")
        })
    },
    init() {
        this.btnToggle();
        this.buyClickUrl();
        this.notiClickEvt();
    }
}

const initBuyingUtil = {
    init() {
        let formatDef = [];
        buyingData.result.filter(item => item.def === 'O').forEach(v => formatDef.push({'gCode': v.gCode, 'grp': v.grp}));

        formatDef.forEach(value => {
            let parentEle = $(`.pt_buying_list[data-buying-group="${value.grp}"]`).closest('[data-prd-list]');

            buyingUtil.totalSoldCheck(parentEle, value);
            buyingUtil.getCommentAvg(parentEle, value);
        });
    },
}

function swiperCategoryEvt($this, $el) {
    const category = $this.attr('data-btn-cate');
    const $target = $el.find(`[data-buying-category="${category}"]`).eq(0);
    const idx = $target.index();
    const swiper = $el.closest('.swiper-container')[0].swiper;

    swiper.slideToLoop(idx);
    $this.closest('li').addClass('pt_active').siblings().removeClass('pt_active');
}

function init() {
    if (!config.isLocal) {
        api.gProdData(function() {
            // 바잉툴 데이터 리스트 포맷 맵핑
            for (let data of soldCheckData) mappingMethod.set(data.goodsId , { // gCode에 맵핑
                saleStatCd: parseInt(data.saleStatCd), // 품절 체크: 정상 -> 12
                reviewGrade: data.reviewGrade, // 평정 리뷰: 점수
                goodsUrl: data.goodsDetailUrl, // 상품 자세히: url
                sku: data.mdlCode, // 상품 SKU: sku
                thunailImg: data.imgPath1 // 상품 썸네일 이미지: img
            });
    
            // console.info(mappingMethod);
            initStat();

            // 바잉툴 데이터 초기화
            initBuyingUtil.init();
        });
    } else {
        initStat();
    }

    function initStat() {
        const slideControlHtml = /* html */ `
            <div class="swiper-pagination pt_buying_list__pagination"></div>
            <div class="pt_arrow pt_arrow--prev"></div>
            <div class="pt_arrow pt_arrow--next"></div>
        `;

        const buying00 = new Buying('[data-prd-list="0"]', {
            type: 'list', // single(default), multi, list
            pdList: buyingData.result.filter(prd => prd.prdType.trim() === 'list00'),
            category: { // list 전용 옵션
                use: false,
            },
            paging: { // multi, list 전용 옵션
                use: true,
                pcIncrease: 999,
                moIncrease: 999,
            },
            on: {
                init(buying) {
                    htmlDraw(buying, config.omni);
                },
                productChangeEnd(buying) {
                    const selected = buying.state.selected;
                    
                    buyingUtil.updateData(buying.$el, selected, config.omni);
                    buyingUtil.getCommentAvg(buying.$el, selected);
                    buyingUtil.totalSoldCheck(buying.$el, selected);
                    buyingUtil.tagCheck(buying.$el, selected);
                    config.slides[selected.grp].update(selected, config.isOnce);
                },
            }
        });

        // BESPOKE 냉장고 신제품 만나보기
        const buying01 = new Buying('[data-prd-list="1"]', {
            type: 'list', // single(default), multi, list
            pdList: buyingData.result.filter(prd => prd.prdType.trim() === 'list01'),
            category: { // list 전용 옵션
                use: false,
            },
            paging: { // multi, list 전용 옵션
                use: true,
                pcIncrease: 999,
                moIncrease: 999,
            },
            on: {
                init(buying) {
                    htmlDraw(buying, config.omni);
                },
                productChangeEnd(buying) {
                    const selected = buying.state.selected;
                    
                    buyingUtil.updateData(buying.$el, selected, config.omni);
                    buyingUtil.getCommentAvg(buying.$el, selected);
                    buyingUtil.totalSoldCheck(buying.$el, selected);
                    buyingUtil.tagCheck(buying.$el, selected);
                    config.slides[selected.grp].update(selected, config.isOnce);
                },
            }
        });

        // 스와이퍼
        setOptionSwiper();

        const listSwiper  = new Swiper('.pt_slide.swiper-container', {
            slidesPerView: 'auto',
            slidesPerGroup: 2,
            allowTouchMove:true,
            preloadImages: false,
            lazy: true,
            observer: true,
            observeParents: true,
            pagination: {
                el: ".pt_buying_list__pagination",
                clickable : true,
            },
            breakpoints: {
                769: {
                    allowTouchMove: false,
                }
            },
            on: {
                init: function() {
                    const $el = $(this.$el);

                    this.params.navigation.prevEl = $el.siblings('.pt_arrow--prev');
                    this.params.navigation.nextEl = $el.siblings('.pt_arrow--next');
                },
                breakpoint: function(){
                    let _self = this;
                    setTimeout(function(){
                        _self.slideTo(0, 0);
                    }, 150);
                },
            }
        });

        // PT_STATE.service.initBuy();
        promoCoupon.init();
        buyingUtil.init();
    }
}

$(document).ready(function(){
    init();
    count.init('.pt_time-count--contents', '2024-11-10T00:00:00');
});