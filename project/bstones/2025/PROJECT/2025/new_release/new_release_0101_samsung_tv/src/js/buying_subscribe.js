import buyingData from "../data/data_subscribe.json";
import slideData from "../data/buyingSlide_list.json"
import { util as _ } from './modules/bs_common';
import { Buying } from './modules/buying_subscribe';
import { BuyingSlide } from "./modules/buyingSlide_list";
import { coupon, promoCoupon } from './modules/coupon';

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
        buy: 'sec:event:samsung-tv:goto_ai-subs-buying-',
        buyWith: 'sec:event:bespoke-refrigerator:goto_with_buy_',
        coupon: 'sec:event:samsung-tv:goto_verticalcoupon_',
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
    const buyingIndex = buying.$el.attr('data-prd-subscribe');

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

            if(optType === 'arrOptAA') {
                optKey = 'optCdAA';
                btnType = 'optAA';
            } else if(optType === 'arrOptBB') {
                optKey = 'optCdBB';
                btnType = 'optBB';
            } else if(optType === 'arrOptCC') {
                optKey = 'optCdCC';
                btnType = 'optCF';
                optionColorBoxGubun = true;
            } else if(optType === 'arrOptDD') {
                optKey = 'optCdDD';
                btnType = 'optCS';
                optionColorBoxGubun = true;
            }


            for (let opt of optArr) {
                const [optInfoNum, optInfoText] = opt.split('|');
                const optColor = opt.split('|')[2];
                const colorOptGubun = opt.indexOf('optCF') !== -1 || opt.indexOf('optCS') !== -1;
                let getSize = '';

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
                            data-omni="sec:event:samsung-tv:goto_vertical${getSize}"
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
                    <ul class="swiper-wrapper pt_opt__subscribe" data-opt-key="${optKey}">
                        ${optBtnHtml}
                    </ul>
                    <div class="swiper-button-prev pt_btn pt_btn--prev"></div>
                    <div class="swiper-button-next pt_btn pt_btn--next"></div>
                </div>
            `;

            return optHtml;
        }

        return  /* html */`
            <div class="pt_buying_subscribe swiper-slide" data-buying-group="${data.grp}">
                <div class="pt_opt">
                    ${!!data.arrOptAA && data.arrOptAA.length > 0 ? returnOptHtml('arrOptAA') : ''}
                    ${!!data.arrOptBB && data.arrOptBB.length > 0 ? returnOptHtml('arrOptBB') : ''}
                    ${!!data.arrOptCC && data.arrOptCC.length > 0 ? returnOptHtml('arrOptCC') : ''}
                    ${!!data.arrOptDD && data.arrOptDD.length > 0 ? returnOptHtml('arrOptDD') : ''}
                </div>
                <div class="pt_buying_subscribe__slide swiper-container" data-slide-num=${idx}>
                    <div class="swiper-wrapper"></div>
                </div>
                <div class="pt_buying_subscribe__prd">
                    <div class="pt_title">
                        <p class="pt_title__name" data-opt-text="pdNm" title="${data.pdNm}">${data.pdNm}</p>
                        <p class="pt_title__sku" data-opt-text="sku">${data.sku}</p>
                    </div>
                    <div class="pt_wrap pt_wrap__top">
                        <div class="pt_price">
                            <ul class="pt_price__subscribe">
                                <li class="pt_price__item pt_price__item--origin" data-opt-show="priceAA!=-">
                                    <p class="pt_price__name">기준가</p>
                                    <p class="pt_price__cont"><span class="en" data-opt-text="priceAA">${data.priceAA}</span>원</p>
                                </li>
                                <li class="pt_price__item pt_price__item--middle" data-opt-show="priceBB!=-" ${data.priceBB !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_price__name">혜택가</p>
                                    <div class="pt_price__area">
                                        <p class="pt_price__cont"><span class="en" data-opt-text="priceBB">${data.priceBB}</span>원</p>
                                    </div>
                                </li>
                                <li class="pt_price__item pt_price__item--middle" data-opt-show="priceCC!=-" ${data.priceCC !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_price__name">쿠폰가</p>
                                    <div class="pt_price__area">
                                        <p class="pt_price__cont"><span class="en" data-opt-text="priceCC">${data.priceCC}</span>원</p>
                                    </div>
                                </li>
                            </ul>
                            <button class="pt_price__coupon" data-cpNum="${data.cpNum}" data-role="btnCouponPromo" data-opt-show="cpNum!=-" ${data.cpNum !== "-" ? '' : 'style="display: none;"'} data-omni-type="microsite" data-omni="${config.omni.coupon}${data.sku}" title="쿠폰 받기">
                                <span class="pt_price__coupon-txt">쿠폰 받기</span>
                                <div class="img_box pt_price__coupon-ico">
                                    <img src="../../is/images/launching/buying_list/stv_buying_list_coupon_ico_pc.png" alt="내려받기 아이콘" class="m_hide" loading="lazy"/>
                                    <img src="../../is/images/launching/buying_list/stv_buying_list_coupon_ico_mo.png" alt="내려받기 아이콘" class="m_show" loading="lazy"/>
                                </div>
                            </button>
                        </div>
                        <div class="pt_bnf top">
                            <ul class="pt_bnf__subscribe">
                                <li class="pt_bnf__item pt_bnf__item--topbenefit" data-opt-show="benefitTopA!=-" ${data.benefitTopA !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_bnf__name">카드사 금액대별 할인 혜택</p>
                                    <p class="pt_bnf__cont"><span class="en" data-opt-text="benefitTopA">${data.benefitTopA}</span>원</p>
                                </li>
                              
                            </ul>
                        </div>
                    </div>
                    <div class="pt_wrap pt_wrap__bottom">
                        <div class="pt_price">
                            <ul class="pt_price__subscribe">
                                <li class="pt_price__item pt_price__item--botype" data-opt-show="priceTB!=-" ${data.priceTB !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_price__name">카드 혜택가</p>
                                    <div class="pt_price__area">
                                        <p class="pt_price__cont"><span class="en" data-opt-text="priceTB">${data.priceTB}</span>원</p>
                                    </div>
                                </li>
                                <li class="pt_price__item pt_price__item--botype" data-opt-show="priceTC!=-" ${data.priceTC !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_price__name">최대 쿠폰가</p>
                                    <div class="pt_price__area">
                                        <p class="pt_price__cont"><span class="en" data-opt-text="priceTC">${data.priceTC}</span>원</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="pt_bnf">
                            <ul class="pt_bnf__subscribe">
                                <li class="pt_bnf__item pt_bnf__item--botbenefit" data-opt-show="benefitBotC!=-" ${data.benefitBotC !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_bnf__name">
                                         <span class="img_box plus">
                                            <img src="../../is/images/launching/buying_list/stv_plus_ico_pc.png" alt="더하기 아이콘" class="m_hide" loading="lazy"/>
                                            <img src="../../is/images/launching/buying_list/stv_plus_ico_mo.png" alt="더하기 아이콘" class="m_show" loading="lazy"/>
                                        </span>
                                        AI 구독클럽 스마트요금제 추가 캐시백<br><span class="tag">(삼성/우리카드, 구독케어 3개월 이상 납부 시)</span></p>
                                    <p class="pt_bnf__cont"><span class="en" data-opt-text="benefitBotC">${data.benefitBotC}</span>원</p>
                                </li>
                                <li class="pt_bnf__item pt_bnf__item--botbenefit" data-opt-show="benefitBotA!=-" ${data.benefitBotA !== "-" ? '' : 'style="display: none;"'}>
                                    <p class="pt_bnf__name">
                                        <span class="img_box plus">
                                            <img src="../../is/images/launching/buying_list/stv_plus_ico_pc.png" alt="더하기 아이콘" class="m_hide" loading="lazy"/>
                                            <img src="../../is/images/launching/buying_list/stv_plus_ico_mo.png" alt="더하기 아이콘" class="m_show" loading="lazy"/>
                                        </span>
                                        구독케어 신청 시 <br/><span class="tag">(무상수리서비스 3년형 기준)</span>
                                    </p>
                                    <p class="pt_bnf__cont"><span class="en" data-opt-text="benefitBotA">월 ${data.benefitBotA}</span>원</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="pt_btn-box">
                        <a href="${data.url}" 
                            class="pt_btn pt_btn--buy en" 
                            data-gCode="${data.gCode}"
                            data-omni-type="microsite" data-omni="${config.omni.buy}${data.sku}" 
                            title="${data.sku} 제품 페이지 새창으로 열림" target="_blank"
                        >구매하기</a>                        
                    </div>
                </div>
            </div>
        `;
    }
    // 별점 추가 시 반영
    // <a href="#" class="pt_btn pt_btn--star" data-comment title="${data.sku} 제품 상품평 페이지 새창으로 열림" target="_blank">5.0</a>
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
            target: `[data-prd-subscribe="${buyingIndex}"] [data-buying-group="${item.grp}"] .pt_buying_subscribe__slide`,
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
        $('.sec_project_wrap .pt_buying_subscribe').on('click', '[data-role="btnToggle"]', function(e){
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
            let parentEle = $(`.pt_buying_subscribe[data-buying-group="${value.grp}"]`).closest('[data-prd-subscribe]');

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
            <div class="swiper-pagination pt_buying_subscribe__pagination"></div>
            <div class="pt_arrow pt_arrow--prev"></div>
            <div class="pt_arrow pt_arrow--next"></div>
        `;

        // const buying00 = new Buying('[data-prd-subscribe="0"]', {
        //     type: 'list', // single(default), multi, list
        //     pdList: buyingData.result.filter(prd => prd.prdType.trim() === 'list00'),
        //     category: { // list 전용 옵션
        //         use: false,
        //     },
        //     paging: { // multi, list 전용 옵션
        //         use: true,
        //         pcIncrease: 999,
        //         moIncrease: 999,
        //     },
        //     on: {
        //         init(buying) {
        //             htmlDraw(buying, config.omni);
        //         },
        //         productChangeEnd(buying) {
        //             const selected = buying.state.selected;
                    
        //             buyingUtil.updateData(buying.$el, selected, config.omni);
        //             buyingUtil.getCommentAvg(buying.$el, selected);
        //             buyingUtil.totalSoldCheck(buying.$el, selected);
        //             config.slides[selected.grp].update(selected, config.isOnce);
        //         },
        //     }
        // });

        // BESPOKE 냉장고 신제품 만나보기
        const buying01 = new Buying('[data-prd-subscribe="1"]', {
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
                el: ".pt_buying_subscribe__pagination",
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
});