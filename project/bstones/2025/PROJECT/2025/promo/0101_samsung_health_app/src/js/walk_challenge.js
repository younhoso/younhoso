import { PT_STATE, util as _ } from './modules/bs_common';
import { coupon, promoCoupon } from './modules/coupon';
import { component_tab } from './modules/component_tab';
import { anchor } from './modules/anchor';
import { tab } from './modules/tab';


$(document).ready(function(){

    anchor.click([
        {
            el: '[data-role-anchor="notice"]',
            target: '.sec_notice',
            scroll: [-60, -202] 
        },        
    ]);

    tab.click([
        {
            el: '[data-role-tab="sec_tabmenu"]',
            target: '#tab',
            default: 1
        }
    ]);

    component_tab.init();
    promoCoupon.init();

    viewportChange(); // fold 해상도 대응
});
