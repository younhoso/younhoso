import pdtList from '../data/point.json';

$(document).ready(function () {

    function pdtListItem(arrayName, imgPath, targetList) { 
        arrayName.forEach((key, index) => {
            index = (index += 1).toString();
            // let omniNum = index < 10 ? `0` + index : index;
            let defaultPrice =  key.priceA != '' ? `${key.priceA}원` : '';
            let pointOmni = imgPath === 'point' ? 'shop' : '';
            let careBoolean = imgPath ==='carefood';
            let careClass = careBoolean === true ? 'pt_care' : '';
            let Html = 
            `<li class="pt_point__item ${careClass} swiper-slide">
                <a href="${key.pdUrl}" title="${key.pdName} 페이지로 이동" data-omni-type="microsite"data-omni="sec:bespokeshop:bespokeshop_homemain:launching:goto_${imgPath}${pointOmni}${index}">
                    <div class="pt_point__item-img img_box">
                        <img src="../../is/images/prd/${imgPath}/${key.imgPc}" alt="${key.pdName}" class="m_hide" loading="lazy">
                        <img src="../../is/images/prd/${imgPath}/${key.imgMo}" alt="${key.pdName}" class="m_show" loading="lazy">
                    </div>
                    <div class="pt_point__item-text">
                        <p class="pt_point__item-name">${key.pdName}</p>
                        <dl class="pt_point__item-price">
                            <div class="pt_point__item-price--1" style="${key.priceA === key.priceB ? `display:none` : `display:flex`}">
                                <dt class="pt_point__item-price-tit">기준가</dt>
                                <dd class="pt_point__item-price-num">${key.priceA}원</dd>
                            </div>
                            <div class="pt_point__item-price--2">
                                <dt class="pt_point__item-price-tit">혜택가</dt>
                                <dd class="pt_point__item-price-num"><em class="en">${key.priceB}</em>원</dd>
                            </div>
                        </dl>
                    </div>
                </a>
            </li>`
            targetList.insertAdjacentHTML('beforeend', Html)
        });
    }

    // 포인트샵 제품 리스트
    let $pointList = document.querySelector('.pt_point__list.swiper-wrapper');
    pdtListItem(pdtList.pointList, 'point' , $pointList);
    
    // // 설프라이즈 특가 제품 리스트
    // let $surpriceList = document.querySelector('.pt_prd--surprice .pt_prd__list');
    // pdtListItem(pdtList.surpriceList, 'surprice' , $surpriceList);
    
    // // 헬스케어 제품 리스트
    // let $careFoodList = document.querySelector('.pt_prd--carefood .pt_prd__list');
    // pdtListItem(pdtList.careFoodList, 'carefood' , $careFoodList);
});