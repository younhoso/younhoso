import pickupData from './data/pickupStore.json';

$(document).ready(function(){
    function pickupPopupEvt(){ // 유의사항 매장픽업 팝업
        const pickupList = $('.pt_popup_pickup').find('[data-popup-pickup]');
        const pickupStore = pickupData.result;
        let pickupHtml = [];
        $.each(pickupStore, function(i, item){
            pickupHtml.push(`
            <li class="pt_pickup__item">
                <i class="pt_num">${i + 1}</i>${item.storeNm}
            </li>
            `);
        });
        pickupList.append(pickupHtml);
    }
    pickupPopupEvt();
})