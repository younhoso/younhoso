import buyingData from "../data/buying_data.json";
import { buyingList, buyingUtil, simulator } from './modules/buying_list';
// import {PT_STATE} from "../../../component_test/src/js/modules/bs_common";

simulator.type1({
    target: '[data-buying-simulator]',   // 시뮬레이터 대상 타겟
    btnAdd: '[data-role="btnSimulAdd"]', // 1개 제품 담기 버튼
    btnAddAll: '[data-role="btnSimulAddAll"]', // 여러개 제품 담기 버튼
    pdList: buyingData.result,  // json 데이터
    sessionStorage: true, // 세션 스토리지 사용 여부
    usagePrice: [
        ['priceA', 'pA', 'add'], // 기준가
        ['priceB', 'bA', 'add'], // 즉시 할인
        ['priceC', 'bB', 'add'], // 동시구매 할인
        ['priceD_1', 'bC', 'add'], // 올리브영 모바일 기프트카드
        ['priceD_2', 'bD', 'add'], // 로그인 쿠폰
        ['priceD_3', 'bE', 'add'], // 아카데미 특가 쿠폰
        // ['priceC', 'bB', 'add'], // 쿠폰 할인
        // ['priceD', 'bE', 'add'], // APP 쿠폰 할인
        ['priceE', null, 'amountBasedDiscount'], // 신용카드 금액대별 결제일할인
        ['priceF', null, 'paymentDayDiscount'],  // 신용카드 결제일할인가
        ['priceG', 'pB', 'add'], // 동시구매가 (신용카드 금액대별 결제일할인 금액 산출시 사용)
    ]
});


buyingList.type1([{
    target: '[data-buying-list=benefit]', // 바잉툴 초기화 대상 타겟
    category: 'all', // 페이지 로드시 카테고리 지정
    increase: { pc: 9, mo: 6 }, // 디바이스별 한번에 출력되는 리스트 개수
    pdList: buyingData.result,  // json 데이터,
    omni: {
        'color': 'event:2025_galaxy_academy_festa:tab_togetherbuy_', // 컬러칩
        'option': 'event:2025_galaxy_academy_festa:tab_togetherbuy_', // 용량
        'coupon': 'event:2025_galaxy_academy_festa:tab_togetherbuy_coupon_', // 쿠폰 다운로드
        'btnLink': 'event:2025_galaxy_academy_festa:viewmore_togetherbuy_', // 자세히보기
        'btnSimul': 'event:2025_galaxy_academy_festa:tab_togetherbuy_put_', // 담기
        'btnSimulOut': 'event:2025_galaxy_academy_festa:tab_togetherbuy_out_', // 담기 2번 클릭 시
        'btnSimulBuy': 'event:2025_galaxy_academy_festa:goto_simul_', // 구매하기
    },
    beforeCreateHtml: function(buying, omni, isReload){
        // 프로덕트 카드 html 생성
        function createItem(prd) {
            let coupon = '';
            // json -> 쿠폰 가져오기
            if(prd.cn && prd.cn.trim() !== '-') coupon ? coupon += ','+prd.cn : coupon = prd.cn;
            // json -> 앱쿠폰 가져오기
            if(prd.apCn && prd.apCn.trim() !== '-') coupon ? coupon += ','+prd.apCn : coupon = prd.apCn;

            return /* html */`
                <div class="pt_buying__item" data-buying-group="${prd.grp}">
                    <div class="pt_bnf">
                        <div class="pt_bnf__head">
                            <p class="pt_bnf__txt"><span class="en" data-opt-text="bF">${prd.bF}</span>만원 상당 할인 혜택</p>
                        </div>
                        <ul class="pt_bnf__list">
                            <li class="pt_bnf__item" 
                                data-benefit-price
                                style="display: ${!!prd.bA && prd.bA.trim() !== '-' ? 'flex' : 'none'}">
                                <p class="pt_bnf__txt">즉시 할인</p>
                                <p class="pt_bnf__price"><span class="en" data-opt-text="bA">${prd.bA}</span>원</p>
                            </li>
                            <li class="pt_bnf__item" 
                                data-benefit-coupon
                                style="display: ${!!prd.bB && prd.bB.trim() !== '-' ? 'flex' : 'none'}">
                                <p class="pt_bnf__txt">쿠폰 할인</p>
                                <p class="pt_bnf__price"><span class="en" data-opt-text="bB">${prd.bB}</span>원</p>
                            </li>
                        </ul>
                    </div>
                    <div class="pt_prd">
                        <div class="pt_tag__list">
                            <div class="pt_tag__item pt_prd__item--app" 
                                data-benefit-price
                                style="display: ${prd.tagB && prd.tagB.trim() === 'O' ? 'block' : 'none'}">APP 쿠폰</div>
                            <div class="pt_tag__item pt_prd__item--sale"
                                data-benefit-coupon
                                style="display: ${prd.tagA && prd.tagA.trim() === 'O' ? 'black' : 'none'}">할인 쿠폰</div>
                        </div>
                        <div class="img_box pt_prd__img">
                            <img src="${prd.thm}" alt="${prd.pdNm}" data-prd-img loading="lazy">
                        </div>
                        <div class="pt_opt">
                            ${createOption(prd)}
                        </div>
                        <div class="pt_prd__info">
                            <p class="pt_prd__name" data-opt-text="pdNm">${prd.pdNm}</p>
                            <p class="pt_prd__sku" data-opt-text="sku">${prd.sku}</p>
                        </div>
                        <div class="pt_prd__price">
                            <div class="pt_price__item">
                                <span class="pt_price__txt">기준가</span>
                                <span class="pt_price__num"><em class="en" data-opt-text="pA">${prd.pA}</em>원</span>
                            </div>
                            <div class="pt_price__item pt_price__item--bnf">
                                <span class="pt_price__txt">동시구매가</span>
                                <div class="pt_price__num" data-login-tag>
                                   <em class="en" data-opt-text="pB">${prd.pB}</em>원
                                </div>
                            </div>
                        </div>
                        <div class="pt_prd__btn">
                            <a href="${prd.url}" 
                                class="pt_btn pt_btn--detail" 
                                title="${prd.sku} 자세히보기 페이지 새 창으로 열림" 
                                data-omni-type="microsite" 
                                data-omni="${omni.btnLink}${prd.sku}"
                                data-role="btnLink"
                                target="_blank">자세히보기</a>
                            <a href="javascript:;" 
                                class="pt_btn pt_btn--add" 
                                data-omni-type="microsite" 
                                data-omni="${omni.btnSimul}${prd.sku}"
                                data-role="btnSimulAdd"
                                data-sku="${prd.sku}"
                                data-gcode="${prd.gcd}" title="담기">담기</a>
                        </div>
                    </div>
                </div>`;
        }

        // 프로덕트 카드 > 옵션 html 생성
        function createOption(prd) {
            let _html = '';
            buyingUtil.findKeysStartingWith(prd,'optCd').forEach(function(optCd) {
                const opt = optCd.replace('Cd','');
                const optVal = prd[opt];
                const optCdVal = prd[optCd];

                if(!!optCdVal && optCdVal.trim() !== '-'){
                    // color add
                    if(opt === 'optCo'){
                        let optBtnHtml = '';
                        prd['arrColor'].forEach(function(inner){
                            const optInfo = inner.split('|');
                            optBtnHtml += /* html */`
                                        <li class="swiper-slide pt_opt__item" data-opt-btn>
                                            <input type="radio" 
                                                    name="prd_${prd.grp}_${optCd}"
                                                    id="prd_${optInfo[0]}" 
                                                    value="${optInfo[0]}"
                                                    ${optInfo[0] === prd[optCd] ? 'checked' : ''}
                                                    autocomplete="off">
                                            <label for="prd_${optInfo[0]}" 
                                                    class="pt_opt__label" 
                                                    data-omni-type="microsite" 
                                                    data-omni="${omni.color}${prd.sku}_${optInfo[0]}" 
                                                    style="background-color: ${optInfo[2]}">
                                                <span class="blind">${optInfo[1]}</span>
                                            </label>
                                        </li>`;
                        });

                        _html += /* html */`
                            <div class="swiper-container pt_opt__slide" data-option-slide>
                                <ul class="swiper-wrapper pt_opt__list pt_opt__list--color" data-opt-key="${optCd}">
                                    ${optBtnHtml}
                                </ul>
                                <div class="swiper-button-prev pt_btn pt_btn--prev"></div>
                                <div class="swiper-button-next pt_btn pt_btn--next"></div>
                            </div>`;

                    } else {  // option add
                        let optBtnHtml = '';
                        prd['arrOptA'].forEach(function(inner){
                            const optInfo = inner.split('|');
                            let _disabled = '';

                            try{
                                const optKey = `arrO${opt.slice(1)}Hide`;
                                prd[optKey] && prd[optKey].forEach(function(item){
                                    if(optInfo[0] === item.split('|')[0]) {
                                        _disabled = 'pt_disabled';
                                    }
                                });

                            } catch (e) {}

                            optBtnHtml += /* html */`
                                        <li class="swiper-slide pt_opt__item ${_disabled}" data-opt-btn>
                                            <input type="radio"
                                                    name="prd_${prd.grp}_${optCd}"
                                                    id="prd_${optInfo[0]}" 
                                                    value="${optInfo[0]}"
                                                    ${optInfo[0] === prd[optCd] ? 'checked' : ''}
                                                    autocomplete="off">
                                            <label for="prd_${optInfo[0]}" 
                                                    class="pt_opt__label" 
                                                    data-omni-type="microsite" 
                                                    data-omni="${omni.option}${prd.sku}_${optInfo[0]}">
                                                ${optInfo[1]}
                                            </label>
                                        </li>`;
                        });

                        _html += /* html */`
                            <div class="swiper-container pt_opt__slide" data-option-slide>
                                <ul class="swiper-wrapper pt_opt__list pt_opt__list--storage" data-opt-key="${optCd}">
                                    ${optBtnHtml}
                                </ul>
                                <div class="swiper-button-prev pt_btn pt_btn--prev"></div>
                                <div class="swiper-button-next pt_btn pt_btn--next"></div>
                            </div>`;
                    }
                }
            });
            return _html;
        }

        // 페이징 단위 html 생성: 하단 로직은 되도록 수정 금지
        let _html = '';
        buying.params.parsedData.listPaging.forEach(prd => {
            _html += createItem(prd);
        });

        isReload ? buying.$el.html(_html) : buying.$el.append(_html);
    }
}]);

