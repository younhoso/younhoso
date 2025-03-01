import { PT_STATE, util as _ } from './modules/bs_common';
import { anchor } from './modules/anchor';
import { tab } from './modules/tab';
// import { sticky } from './modules/sticky';


// 필요 한 부분만 남기고 제거해서 사용해주세요. 
// 실행소스 참고는 BS스크립트 3버전을 참고해주세요. PROJECT/00_bs_script_v3
$(document).ready(function(){

    function checkDevice() {
        const ua = navigator.userAgent.toLowerCase();
    
        if (ua.indexOf('secapp') != -1) { // 닷컴앱인 경우      
            $('[data-web-only]').hide();
            $('[data-app-only]').show();
    
            // Z6 또는 S24 기기 확인
            // S24 울트라 : SM-S928, S24+ : SM-S926, S24 : SM-S921
            // 플립 : SM-F741, 폴드 : SM-F956
            if (
                ua.indexOf('sm-f741') != -1 || 
                ua.indexOf('sm-f956') != -1 || 
                ua.indexOf('sm-s928n') != -1 || 
                ua.indexOf('sm-s926n') != -1 || 
                ua.indexOf('sm-s921n') != -1
            ) {
                $('[data-z6="N"], [data-s24="N"]').hide();
                $('[data-z6="Y"], [data-s24="Y"]').show();
            } else {
                $('[data-z6="Y"], [data-s24="Y"]').hide();
                $('[data-z6="N"], [data-s24="N"]').show();
            }
        } else { 
            $('[data-app-only]').hide();
            $('[data-web-only]').show();         
        } 
    }

    anchor.load([
        {
            url: 'recommend',
            target: '.sec_recommend'
        },
    ]);

    tab.click([
        {
            el: '[data-role-tab="sec_benefit"]',
            target: '#tab01',
            default: 1
        },
    ]);


    checkDevice();
    // sticky.init();


    //BNB 미노출 처리
    // $("#bottom__navi").hide();


    viewportChange(); // fold 해상도 대응
});
