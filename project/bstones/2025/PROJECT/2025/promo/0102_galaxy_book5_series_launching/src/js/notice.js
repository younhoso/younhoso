import pickupData from "../data/pickupStore_oliveyoung.json";
import pickupDataAcc from "../data/pickupStore_acc.json";

// 매장픽업 팝업
function pickupPopupEvt(){ 
    const pickupList = $('.pt_modal_pickup').find('[data-modal-pickup-olive]');
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

// 매장픽업 팝업
function pickupPopupAccEvt(){ 
    const pickupListAcc = $('.pt_modal_pickup.pt_modal_pickup__acc').find('[data-modal-pickup-acc]');
    const pickupStoreAcc = pickupDataAcc.result;
    let pickupHtml = [];

    $.each(pickupStoreAcc, function(i, item){
        pickupHtml.push(`
        <li class="pt_pickup__item">
            <i class="pt_num">${i + 1}</i>${item.storeNm}
        </li>
        `);
    });

    pickupListAcc.append(pickupHtml);
}


$(document).ready(function(){
    
    // PT_STATE.module.modal.init();
    
    // 매장픽업 팝업
    pickupPopupEvt(); 
    pickupPopupAccEvt(); 

    // fold 해상도 대응
    viewportChange(); 
    
});
