import { PT_STATE, util as _ } from './modules/bs_common';
import { coupon, promoCoupon } from './modules/coupon';
import { component_tab } from './modules/component_tab';
import { anchor } from './modules/anchor';
import { tab } from './modules/tab';
import { modal } from './modules/modal';


$(document).ready(function(){

    let $secProject = $(".sec_project_wrap");

    function setAgreeEvt() {
        const $btnEvent = $secProject.find('[data-role="btnCouponPromo"]');
        const $agreeAll = document.getElementById('agreeAll');
        const $pt_apply_input = document.querySelectorAll(".pt_apply__input");
        const $agree01 = document.getElementById('agree1');
        const $agree02 = document.getElementById('agree2');
        const $agree03 = document.getElementById('agree3');
        const $agree04 = document.getElementById('agree4');

        // 전체 선택
        $secProject.on('click', '#agreeAll', function(){
            if($agreeAll.checked){
                $pt_apply_input.forEach((agree) => {
                    agree.checked = true;
                })
            }else{
                $pt_apply_input.forEach((agree) => {
                    agree.checked = false;
                })
            }
        })
        
        // 수신 동의 input event
        $secProject.on('change', '.pt_apply__input', function() {
            if ($agree01.checked && $agree02.checked && $agree03.checked && $agree04.checked) {
                $btnEvent.removeClass('pt_disabled');
                $agreeAll.checked = true;
            } else {
                $btnEvent.addClass('pt_disabled');
                $agreeAll.checked = false;
            }
        });
        function makeAlert(contentsParam){
            var contentsparam = contentsParam;
            let alertData = {
                       content : contentsparam
                      ,btnText : '확인'
                     
                    };
            commonAlert(alertData);
                openLayer('commonAlert');
        }

        // 이벤트 응모하기 클릭 이벤트
        function btnEventInit(){
            $secProject.off('click.btnEventInit');
            $secProject.on('click', '[data-role="btnCouponPromo"]', (e) => {
                $.ajax({
                    url : "/sec/xhr/membership/updateAccountMemberAgreeYn"
                    , type : "POST"
                    , data : {
                        // 개인정보수집선택동의 "X":체크
                        zzsagreyn: "X",

                        // 마케팅수신동의 "X":체크
                        zzmagreyn: "X",

                        // SMS수신동의 "X":체크
                        smsyn: "X",

                        // 제3자제공동의 "X":체크
                        zzthrdyn: "X",

                        // 제3자마케팅수신동의 "X":체크
                        zzaagreyn: "X"
                    }
                })
                .done(function(result) {
                    console.info(result.message);
                    $("#membershipMktRcvYn").val("N"); // GCRM 체크하지 않는다.
                });
            });
        }
        btnEventInit();
        
        let modaloOnce = false;

         // 로그인 체크
         function loginCheck() {
            returnUrl = window.location.pathname;
            stPath = $('#openPop').data('st-path');
            const options = {
                url: stPath + 'xhr/member/getSession',
                type: "POST",
                done: function(data){
                    const session = JSON.parse(data);
                    if(!session.mbrNo == 0){
                        $secProject.off('click.btnEventInit');
                        $(`[catch-common-role="start"]`).trigger("click");

                    } else {
                        fnLoginFowardFromServer();
	                    return;
                    }
                },
                fail: function(error) {
                    console.log(error)
                }
            };
            ajax.call(options);
            
        }



        $secProject.on('click.btnEventInit', '[catch-common-role="start"]', function(e) {
            loginCheck();
        });

        setTimeout(() => {
            $('.pt_apply__agree').find($("label")).keyup(function(e){
                if(e.keyCode==13) $(this).parent().find($('.pt_apply__input')).trigger('click');
            });
        }, 300);
    }

    setAgreeEvt();    

    // anchor.click([
    //     {
    //         el: '[data-role-anchor="notice"]',
    //         target: '.sec_notice',
    //         scroll: [-60, -202] 
    //     },        
    // ]);

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
    modal.init();
    coupon.init(); 
});
