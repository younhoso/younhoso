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
    
            // Z fold se 기기확인
            if (
                ua.indexOf('sm-f958') == -1
            ) {
                $('[data-zs="Y"]').hide();
                $('[data-zs="N"]').show();
                
            } else {
                $('[data-zs="N"]').hide();
                $('[data-zs="Y"]').show();
            }
        } else { // 웹
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

    // $('[link-btn]').on('click', function() {
    //     location.href = secapp.startWebBrowser('https://www.microsoft.com/ko-kr/microsoft-365/samsung-offer/');
    //     secapp.startWebBrowser('https://www.microsoft.com/ko-kr/microsoft-365/samsung-offer/');
    // });
    // console.log($('[link-btn]'));

    checkDevice();
    // sticky.init();


    //BNB 미노출 처리
    // $("#bottom__navi").hide();


    viewportChange(); // fold 해상도 대응
});
