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


// 제품명 로고 이미지 바인딩 ( watch7 / watchultra / buds3 / ring / fold6 / care / galaxy )
function logoTxtEvt() {

    let targetParents = $('.sec_notice');
    let target = targetParents.find('.pt_desc__logo');

    target.each(function(idx) {
        let newData = $(this).attr('class').split('--')[1];
        switch(newData) {
        case "watch7" :
                $(this).find('.blind').remove();
                $(this).append(`<p class="blind">Galaxy Watch7 | Watch Ultra 로고</p>`)
            break

        case "watchultra" :
                $(this).find('.blind').remove();
                $(this).append(`<p class="blind">Galaxy Watch Ultra 로고</p>`)
            break

        case "buds3" :
                $(this).find('.blind').remove();
                $(this).append(`<p class="blind">Galaxy Buds3 | Buds3 Pro 로고</p>`)
            break

        case "ring" :
                $(this).find('.blind').remove();
                $(this).append(`<p class="blind">Galaxy Ring 로고</p>`)
            break

        case "fold6" :
                $(this).find('.blind').remove();
                $(this).append(`<p class="blind">Galaxy Z Fold6 | Z Flip6 로고</p>`)
            break

        case "care" :
                $(this).find('.blind').remove();
                $(this).append(`<p class="blind">Samsung Care+ 로고</p>`)
            break

        case "galaxy" :
                $(this).find('.blind').remove();
                $(this).append(`<p class="blind">Galaxy 로고</p>`)
            break
    }
    });
}


$(document).ready(function(){
    
    PT_STATE.module.modal.init();
    
    // 매장픽업 팝업
    pickupPopupEvt(); 

    // 제품명 로고 이미지 바인딩
    logoTxtEvt();

    // fold 해상도 대응
    viewportChange(); 
    
});
