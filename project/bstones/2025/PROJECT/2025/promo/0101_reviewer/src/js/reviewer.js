import { PT_STATE, util as _ } from './modules/bs_common';
import { anchor } from './modules/anchor';
import { accordian } from './modules/accordian';
import { sticky } from './modules/sticky';
import { copy } from './modules/copy';







$(document).ready(function(){

    function imgLozad (){
        const observerbg = lozad(".pt_bg-image", {
            loaded: function (el) {
                el.classList.add("pt_add-bg");
            },
        });
        observerbg.observe();
    }
    imgLozad();

    accordian.toggle([
        {
            el: '[data-role-accordian="step_01"]',
            target: '#step_01',
            group: 'group01',
            openFocus: 'step_01',
        },
        {
            el: '[data-role-accordian="step_02"]',
            target: '#step_02',
            group: 'group01',
            openFocus: 'step_02',
        },
        {
            el: '[data-role-accordian="step_03"]',
            target: '#step_03',
            group: 'group01',
            openFocus: 'step_03',
        },
        {
            el: '[data-role-accordian="step_04"]',
            target: '#step_04',
            group: 'group01',
            openFocus: 'step_04',
        },
        {
            el: '[data-role-accordian="event_noti_accodian"]',
            target: '#event_noti_accodian',
        },
    ]);
    
    
    sticky.init();

    copy.click();

    anchor.load([
        {
            url: 'bestreviewer',
            target: '.sec_info'
        },
        {
            url: 'snsreview',
            target: '.sec_event',
        },
        {
            url: 'howtoch',
            target: '.sec_step',
        },
        {
            url: 'bestreviewcheck',
            target: '.sec_best_review',
        },
        {
            url: 'notice',
            target: '.sec_notice',
            scroll: [10, 10]
        },
    ]);
    anchor.click([
        {
            el: '[data-role-anchor="best"]',
            target: '.sec_banner',
            scroll: [-145, -148],
            // speed: 1000,
        },
        // {
        //     el: '[data-role-anchor="sns"]',
        //     target: '.sec_event',
        //     scroll: [-140, -135],
        //     // speed: 1000,
        // },
    ]);
    

    let reviewSwiper = new Swiper ('.pt_best_slide .swiper-container',{
        slidesPerView: 'auto',
        allowTouchMove: true,
        navigation: {
            nextEl: '.pt_arrow_box .pt_arrow_btn_next',
            prevEl: '.pt_arrow_box .pt_arrow_btn_prev',
        },
        breakpoints: {
            769: {
                slidesPerView: 'auto',
                allowTouchMove: false,
            }
        },
        on: {
            breakpoint: function () {
                var that = this;
                setTimeout(function () {
                    that.slideTo(0, 0);
                }, 150);
            },
        },
    });
    viewportChange(); // fold 해상도 대응
});
