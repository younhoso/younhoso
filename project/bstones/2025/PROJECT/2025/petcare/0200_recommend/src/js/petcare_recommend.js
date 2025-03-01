import { PT_STATE, util as _ } from './modules/bs_common';
import { anchor } from './modules/anchor';
import { component_tab } from './modules/component_tab';

// 필요 한 부분만 남기고 제거해서 사용해주세요. 
// 실행소스 참고는 BS스크립트 3버전을 참고해주세요. PROJECT/00_bs_script_v3
$(document).ready(function(){

    anchor.click([
        {
            el: '[data-role-anchor="notice"]',
            target: '.sec_notice'
        },
    ]);

    component_tab.init();
    // promoCoupon.init();
    viewportChange(); // fold 해상도 대응
});
