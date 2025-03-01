import podList from '../data/pod.json';

$(document).ready(function () {

    function podListItem(arrayName, imgPath, targetList) { 
        arrayName.forEach((key, index) => {
            // console.log(imgPath)
            index = (index += 1).toString();
            let bestOmni = (imgPath === 'best') ? '' : 'pet';

            let html =  /*html*/`
                <li class="swiper-slide pt_pod__item">
                    <a href="${key.pdUrl}" title="${key.pdName} 페이지로 이동" data-omni-type="microsite" data-omni="sec:petcarestore:petcarestore:launching:goto_${bestOmni}${imgPath}${index}">
                        <div class="img_box pt_pod__item-img">
                            <div class="pt_pod__tag-box">
                                <div class="pt_pod__tag pt_pod__tag-num" style="${targetList.classList.contains('tag-num') ? `display:flex` : `display:none`}">
                                    <p class="en">${index < 10 ? `0` + index : index}</p>
                                </div>
                                <div class="pt_pod__tag pt_pod__tag-best" style="${key.tagA === 'O' ? `display:flex` : `display:none`}">
                                    <p class="pt_pod__tag-text en">BEST</p>
                                </div>
                                <div class="pt_pod__tag pt_pod__tag-dog" style="${key.tagB === 'O' ? `display:flex` : `display:none`}">
                                    <p class="pt_pod__tag-text en">DOG</p>
                                </div>
                                <div class="pt_pod__tag pt_pod__tag-cat" style="${key.tagC === 'O' ? `display:flex` : `display:none`}">
                                    <p class="pt_pod__tag-text en">CAT</p>
                                </div>
                                <div class="pt_pod__tag pt_pod__tag-hot" style="${key.tagD === 'O' ? `display:flex` : `display:none`}">
                                    <p class="pt_pod__tag-text en">HOT</p>
                                </div>
                                <div class="pt_pod__tag pt_pod__tag-sale" style="${key.tagE === 'O' ? `display:flex` : `display:none`}">
                                    <p class="pt_pod__tag-text en">SALE</p>
                                </div>
                            </div>
                            <img src="../../is/images/pod/${imgPath}/${key.imgPc}" alt="${key.pdName}" class="m_hide" loading="lazy" />
                            <img src="../../is/images/pod/${imgPath}/${key.imgMo}" alt="${key.pdName}" class="m_show" loading="lazy" />
                        </div>
                        <div class="pt_pod__item-text">
                            <p class="pt_pod__item-name">${key.pdNameTxt}</p>
                            <dl class="pt_pod__item-price">
                                <div class="pt_pod__item-price--wrap pt_pod__item-price--base" style="${key.priceA != '-' ? `display:flex` : `display:none`}">
                                    <dt class="pt_pod__item-price--tit">기준가</dt>
                                    <dd class="pt_pod__item-price--num">${key.priceA}원</dd>
                                </div>
                                <div class="pt_pod__item-price--wrap pt_pod__item-price--black" style="${key.priceB != '-' && key.priceC == '-' && key.priceD == '-' ? `display:flex` : `display:none`}">
                                    <dt class="pt_pod__item-price--tit">혜택가</dt>
                                    <dd class="pt_pod__item-price--num"><span class="en">${key.priceB}</span>원</dd>
                                </div>
                                <div class="pt_pod__item-price--wrap pt_pod__item-price--black" style="${key.priceC != '-' ? `display:flex` : `display:none`}">
                                    <dt class="pt_pod__item-price--tit">최종가</dt>
                                    <dd class="pt_pod__item-price--num"><span class="en">${key.priceC}</span>원</dd>
                                </div>
                                <div class="pt_pod__item-price--wrap pt_pod__item-price--blue" style="${key.priceD != '-' ? `display:flex` : `display:none`}">
                                    <dt class="pt_pod__item-price--tit pt_pod__item-price--smalltit">쿠폰 적용 예상가</dt>
                                    <dd class="pt_pod__item-price--num"><span class="en">${key.priceD}</span>원</dd>
                                </div>
                            </dl>
                        </div>
                    </a>
                </li>
            `
            if(index > 5){
                html =  /*html*/`
                <li class="swiper-slide pt_pod__item m_hide">
                    <a href="${key.pdUrl}" title="${key.pdName} 페이지로 이동" data-omni-type="microsite" data-omni="sec:petcarestore:petcarestore:launching:goto_${bestOmni}${imgPath}${index}">
                        <div class="img_box pt_pod__item-img">
                            <div class="pt_pod__tag-box">
                                <div class="pt_pod__tag pt_pod__tag-num" style="${targetList.classList.contains('tag-num') ? `display:flex` : `display:none`}">
                                    <p class="en">${index < 10 ? `0` + index : index}</p>
                                </div>
                                <div class="pt_pod__tag pt_pod__tag-best" style="${key.tagA === 'O' ? `display:flex` : `display:none`}">
                                    <p class="pt_pod__tag-text en">BEST</p>
                                </div>
                                <div class="pt_pod__tag pt_pod__tag-dog" style="${key.tagB === 'O' ? `display:flex` : `display:none`}">
                                    <p class="pt_pod__tag-text en">DOG</p>
                                </div>
                                <div class="pt_pod__tag pt_pod__tag-cat" style="${key.tagC === 'O' ? `display:flex` : `display:none`}">
                                    <p class="pt_pod__tag-text en">CAT</p>
                                </div>
                                <div class="pt_pod__tag pt_pod__tag-hot" style="${key.tagD === 'O' ? `display:flex` : `display:none`}">
                                    <p class="pt_pod__tag-text en">HOT</p>
                                </div>
                                <div class="pt_pod__tag pt_pod__tag-sale" style="${key.tagE === 'O' ? `display:flex` : `display:none`}">
                                    <p class="pt_pod__tag-text en">SALE</p>
                                </div>
                            </div>
                            <img src="../../is/images/pod/${imgPath}/${key.imgPc}" alt="${key.pdName}" class="m_hide" loading="lazy" />
                            <img src="../../is/images/pod/${imgPath}/${key.imgMo}" alt="${key.pdName}" class="m_show" loading="lazy" />
                        </div>
                        <div class="pt_pod__item-text">
                            <p class="pt_pod__item-name">${key.pdNameTxt}</p>
                            <dl class="pt_pod__item-price">
                                <div class="pt_pod__item-price--wrap pt_pod__item-price--base" style="${key.priceA != '-' ? `display:flex` : `display:none`}">
                                    <dt class="pt_pod__item-price--tit">기준가</dt>
                                    <dd class="pt_pod__item-price--num">${key.priceA}원</dd>
                                </div>
                                <div class="pt_pod__item-price--wrap pt_pod__item-price--black" style="${key.priceB != '-' && key.priceC == '-' && key.priceD == '-' ? `display:flex` : `display:none`}">
                                    <dt class="pt_pod__item-price--tit">혜택가</dt>
                                    <dd class="pt_pod__item-price--num"><span class="en">${key.priceB}</span>원</dd>
                                </div>
                                <div class="pt_pod__item-price--wrap pt_pod__item-price--black" style="${key.priceC != '-' ? `display:flex` : `display:none`}">
                                    <dt class="pt_pod__item-price--tit">최종가</dt>
                                    <dd class="pt_pod__item-price--num"><span class="en">${key.priceC}</span>원</dd>
                                </div>
                                <div class="pt_pod__item-price--wrap pt_pod__item-price--blue" style="${key.priceD != '-' ? `display:flex` : `display:none`}">
                                    <dt class="pt_pod__item-price--tit pt_pod__item-price--smalltit">쿠폰 적용 예상가</dt>
                                    <dd class="pt_pod__item-price--num"><span class="en">${key.priceD}</span>원</dd>
                                </div>
                            </dl>
                        </div>
                    </a>
                </li>
            `
            }

            
            targetList.insertAdjacentHTML('beforeend', html)
        });
    }

    // BEST
    let $pointList = document.querySelector('.pt_pod__swiper--best .pt_pod__list');
    podListItem(podList.best, 'best' , $pointList);

    // 사료
    let $foodList = document.querySelector('.pt_pod__swiper--food .pt_pod__list');
    podListItem(podList.food, 'food' , $foodList);

    // 장난감
    let $toyList = document.querySelector('.pt_pod__swiper--toy .pt_pod__list');
    podListItem(podList.toy, 'toy' , $toyList);

    // 리빙템
    let $livingList = document.querySelector('.pt_pod__swiper--living .pt_pod__list');
    podListItem(podList.living, 'living' , $livingList);

    // 영양제
    let $supplementsList = document.querySelector('.pt_pod__swiper--supplements .pt_pod__list');
    podListItem(podList.supplements, 'supplements' , $supplementsList);

    // 의류
    let $clothesList = document.querySelector('.pt_pod__swiper--clothes .pt_pod__list');
    podListItem(podList.clothes, 'clothes' , $clothesList);

    // 박스
    // let $boxList = document.querySelector('.pt_pod__swiper--box .pt_pod__list');
    // podListItem(podList.box, 'box' , $boxList);

    // 필터
    let $filterList = document.querySelector('.pt_pod__swiper--filter .pt_pod__list');
    podListItem(podList.filter, 'filter' , $filterList);
    
});