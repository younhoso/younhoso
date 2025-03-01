import pickupData from "../data/pickupStore.json";

// 매장픽업 팝업
function pickupPopupEvt(){ 
    const pickupList = $('.pt_modal_pickup').find('[data-modal-pickup]');
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

$(document).ready(function(){
    
    // PT_STATE.module.modal.init();
    
    // 매장픽업 팝업
    pickupPopupEvt(); 

    // fold 해상도 대응
    viewportChange(); 
    
});
