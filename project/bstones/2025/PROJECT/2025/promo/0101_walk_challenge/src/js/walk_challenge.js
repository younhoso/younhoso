import { PT_STATE, util as _ } from './modules/bs_common';
import { coupon, promoCoupon } from './modules/coupon';
import { component_tab } from './modules/component_tab';
import { anchor } from './modules/anchor';
import { tab } from './modules/tab';
import { page_tab } from './modules/page_tab';
import { modal } from './modules/modal';
import { sticky } from './modules/sticky';
import { copy } from './modules/copy';
import { sns } from './modules/sns';

page_tab.init();

$(document).ready(function(){

    //lnb스와이퍼
    let lnbswiper = new Swiper('.swiper-container.pt_lnb-swiper', {
        slidesPerView: 'auto',
        autoplay: false,
        allowTouchMove: true,
        preloadImages: false,
        lazy: true,
        navigation: {
            nextEl: $('.sec_lnb').find(".swiper-button-next"),
            prevEl: $('.sec_lnb').find(".swiper-button-prev"),
        },
        breakpoints: {
            769: {
                allowTouchMove: false,
            }
        },
    })

    anchor.click([
        // {
        //     el: '[data-role-anchor="howto"]',
        //     target: '.howto',
        //     scroll: [-130, -300] 
        // }, 
        // {
        //     el: '[data-role-anchor="benefit"]',
        //     target: '.benefit',
        //     scroll: [-130, -300] 
        // }, 
        // {
        //     el: '[data-role-anchor="comp"]',
        //     target: '.comp',
        //     scroll: [-230, -396] 
        // }, 
        {
            el: '[data-role-anchor="notice"]',
            target: '.sec_notice',
            scroll: [-60, -100] 
        },        
    ]);

    anchor.load([
        {
            url: 'product',
            target: '.sec_comp'
        },
    ]);

    tab.click([
        {
            el: '[data-role-tab="sec_tabmenu"]',
            target: '#tab',
            default: 0,
            anc: true
        }
    ]);

    component_tab.init();
    promoCoupon.init();
    modal.init();
    modal.toggle();
    copy.click();
    sns.init();
    sticky.init();
    viewportChange(); // fold 해상도 대응
});
