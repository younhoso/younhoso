import { PT_STATE, util as _ } from './modules/bs_common';
// import { anchor } from './modules/anchor';
// import { accordian } from './modules/accordian';
// import { tab } from './modules/tab';
// import { copy } from './modules/copy';
// import { modal } from './modules/modal';
// import { count } from './modules/countdown';
// import { coupon, promoCoupon } from './modules/coupon';
// import { sns } from './modules/sns';
// import { video, videoKv } from './modules/video';
// import { sticky } from './modules/sticky';
// import { category_tab } from './modules/category_tab';

// 필요 한 부분만 남기고 제거해서 사용해주세요. 
// 실행소스 참고는 BS스크립트 3버전을 참고해주세요. PROJECT/00_bs_script_v3
$(document).ready(function(){
    //비디오 재생 끝났을때 적용되는 이벤트
    setInterval(function(){
       if($("#pod_vod").prop("ended")){
        $(".basic_btn").addClass("active");
       }
    },100);



    // console.log( $("#pod_vod").get(0).play());
    // $(".basic_btn").prop("disabled", true);


    // anchor.click([
    //     {
    //         el: '[data-role-anchor="sec_anchor01"]',
    //         target: '.sec_anchor'
    //     },
    //     {
    //         el: '[data-role-anchor="sec_anchor02"]',
    //         target: '.sec_anchor',
    //         speed: 1000,
    //         scroll: [500]
    //     },
    //     {
    //         el: '[data-role-anchor="sec_anchor03"]',
    //         target: '.sec_anchor',
    //         speed: 0,
    //         scroll: [-200, -100]
    //     },
    // ]);

    // anchor.load([
    //     {
    //         url: 'test01',
    //         target: '.sec_anchor'
    //     },
    //     {
    //         url: 'test02',
    //         target: '.sec_accordian',
    //         scroll: [0, -50]
    //     },
    // ]);

    // accordian.toggle([
    //     {
    //         el: '[data-role-accordian="sec_accordian01"]',
    //         target: '#toggle01'
    //     },
    //     {
    //         el: '[data-role-accordian="sec_accordian02"]',
    //         target: '#toggle02',
    //         speed: 0
    //     },
    //     {
    //         el: '[data-role-accordian="sec_accordian03"]',
    //         target: '#toggle03',
    //         group: 'group01'
    //     },
    //     {
    //         el: '[data-role-accordian="sec_accordian04"]',
    //         target: '#toggle04',
    //         group: 'group01'
    //     },
    //     {
    //         el: '[data-role-accordian="sec_accordian05"]',
    //         target: '#toggle05',
    //         openFocus: 'toggle05'
    //     },
    //     {
    //         el: '[data-role-accordian="sec_accordian06"]',
    //         target: '#toggle06',
    //         openFocus: 'toggle06',
    //     },
    //     {
    //         el: '[data-role-accordian="sec_accordian07"]',
    //         target: '#toggle07',
    //         open: true
    //     },
    //     {
    //         el: '[data-role-accordian="sec_button_test"]',
    //         target: '#button01'
    //     }
    // ]);

    // tab.click([
    //     {
    //         el: '[data-role-tab="sec_tabmenu01"]',
    //         target: '#tab01',
    //         default: 1
    //     },
    //     {
    //         el: '[data-role-tab="sec_tabmenu02"]',
    //         target: '#tab02',
    //     },
    // ]);

    // video.init([
    //     {
    //         el: '[data-role-video="video01"]',
    //         target: '#video03',
    //         video: 'https://images.samsung.com/kdp/event/sec/PM_0607_alarm_samsung_careplus/launching/video/care.mp4'
    //     },
    //     {
    //         el: '[data-role-video="video02"]',
    //         target: '#video02',
    //         youtube: 'Ix0a4QRZzUU'
    //     }
    // ])

    // videoKv.init({
    //     target: '#kv_video',
    //     maxCount: 1
    // });

    // copy.click();
    // modal.init();
    // sticky.init();
    // category_tab.init();
    // coupon.init();
    // promoCoupon.init();
    // sns.init();

    // 카운트다운 타이머 설정
    //count.init('#count01', '2023/03/31 23:59:59');

    viewportChange(); // fold 해상도 대응
});
