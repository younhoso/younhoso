import exhibitionData from "../data/exhibitionStore";

$(document).ready(function(){

    // 오프라인 팝업스토어 팝업
    const exhibitJS = {

        exhibitionPopupEvt(filterId = '') {
            const exhibitionList = $('.pt_exhibit__body').find('[data-modal-exhibition]');

            exhibitionList.empty();

            const exhibitionStore = exhibitionData.result;
            let exhibitionHtml = [];

            const filteredStore = filterId ? exhibitionStore.filter(item => item.id === filterId) : exhibitionStore;

            $.each(filteredStore, function(i, item) {
                exhibitionHtml.push(`
                    <tr>
                        <td rowspan="2" class="pt_num"><i class="en">${i + 1}</i></td>
                        <th rowspan="2" class="pt_exhibition__item">${item.storeNm}</th>
                        <td>${item.location}</td>
                    </tr>
                    <tr class="pt_table__loc">
                        <td>${item.contactNum}</td>
                    </tr>
                `);
            });

            exhibitionList.append(exhibitionHtml.join(''));
        },
        init(){
            this.exhibitionPopupEvt(); // 오프라인 팝업스토어 팝업
        }
    }

    // 오프라인 팝업스토어 팝업
    exhibitJS.exhibitionPopupEvt();
});