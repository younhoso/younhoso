import { PT_STATE, util as _} from './bs_common';

// 단일쿠폰 다운로드 및 페이지 내 전체쿠폰 다운로드
export const coupon = {
    init(){
        // 쿠폰 기한 설정
        var couponLimit = '2022.03.31';
    
        var messager = {
            data: {
                content: '',
                btnText: '확인',
                okBtnText: '확인',
                cancelBtnText: '취소'
            },
            setAlertData: function (content, btnText, callback) {
                messager.data.content = content;
                messager.data.btnText = btnText;
                if (callback != undefined) {
                    messager.data.callback = callback;
                } else {
                    delete messager.data[callback];
                }
            },
            setConfirmData: function (content, okBtnText, cancelBtnText, callback) {
                messager.data.content = content;
                messager.data.okBtnText = okBtnText;
                messager.data.cancelBtnText = cancelBtnText;
                if (callback != undefined) {
                    messager.data.callback = callback;
                } else {
                    delete messager.data[callback];
                }
            },
            alert: function (content, btnText, callback) {
                messager.setAlertData(content, btnText, callback);
                commonAlert(messager.data);
                openLayer('commonAlert');
            },
            confirm: function (content, okBtnText, cancelBtnText, callback) {
                messager.setConfirmData(content, okBtnText, cancelBtnText, callback);
                commonConfirm(messager.data);
                openLayer('commonConfirm');
            },
            // 단일 쿠폰 다운로드 실패
            singleCouponDownloadFailAlert: function (content) {
                messager.alert(content, '확인', function () {
                    $('html').scrollTop(0);
                });
            },
            // 예외 처리 없는 다운로드 성공
            mustCouponDownloadSuccessAlert: function () {
                var content = '';
                content += '쿠폰 다운로드가 완료 되었습니다.<br/>';
                content += '* '+ couponLimit +' 까지 사용가능<br/><br/>';
                content += '다운로드 받으신 쿠폰은 나의 정보 > 쿠폰존 에서 확인 가능합니다.';
                messager.alert(content, '확인');
                // messager.alert(content, '확인', function() {
                //   window.location.href = '${view.stContextPath}' + 'mypage/coupon/indexCouponDownload/';
                // });
            },
            // 쿠폰 등록 성공
            successInsertSerialCoupon: function () {
                var content = '';
                content += '쿠폰이 등록되었습니다.<br/>';
                content += '등록한 쿠폰은 보유쿠폰에서 확인 가능합니다.';
                messager.alert(content, '확인', function () {
                    $('#popupEventCode .con-bottom').hide();
                    $('#popupEventCode .pop-close').trigger('click');
                    $('html').scrollTop(0);
                });
            },
            //쿠폰 등록 실패
            failInsertSerialCoupon: function (content) {
                messager.alert(content, '확인', function () {
                    $('html').scrollTop(0);
                });
            }
        };
    
        function downloadCoupon(type, objCoupon) {
            returnUrl = window.location.pathname;
            stPath = $('#openPop').data('st-path');
            var options = {
                url: stPath + 'xhr/member/getSession',
                type: 'POST',
                done: function (data) {
                    var session = JSON.parse(data);
                    if (session.mbrNo == 0) {
                        makeAlert('로그인 후 참여 가능합니다.', fnGoLoginPage);
                    } else {
                        var url = '';
                        if (type === 'single') {
                            url = stPath + 'xhr/mypage/coupon/couponBookDownload';
                        }
                        if (type === 'multi') {
                            url = stPath + 'xhr/mypage/coupon/couponDownload';
                        }
                        var options = {
                            url: url,
                            data: objCoupon,
                            done: function (result) {
                                messager.mustCouponDownloadSuccessAlert();
                            }
                        };
                        ajax.call(options);
                    }
                }
            };
            ajax.call(options);
        }
    
        // 전체 쿠폰 다운로드 이벤트 트리거
        PT_STATE.$PROJECT.off('click.couponAll').on('click.couponAll', '[data-role="btnCouponAll"]', function (e) {
            e.preventDefault();
    
            var strArr = [];
            $('[data-role="btnCoupon"]').each(function (i) {
                strArr.push('{cpBookNo: \'' + $(this).attr('data-cpNum') + '\'}');
            });
            downloadCoupon('multi', { couponBookJsonStr: '[' + strArr.join(', ') + ']' });
        });
    
        // 단일 쿠폰 다운로드 이벤트 트리거
        PT_STATE.$PROJECT.off('click.coupon').on('click.coupon', '[data-role="btnCoupon"]', function (e) {
            e.preventDefault();
            downloadCoupon('single', { cpBookNo: $(this).attr('data-cpNum') });
        });
    }
}


// [프로모션 쿠폰 다운 SCRIPT]
export const promoCoupon = {
    init(){

        var messager = {
            data : {                           
                content : "",    
                btnText : "확인",    
                okBtnText : "확인",    
                cancelBtnText : "취소"
            },
            setAlertData : function(content,btnText,callback){
                messager.data.content = content;
                messager.data.btnText = btnText;
                if(callback != undefined){
                    messager.data.callback = callback;
                }else{
                    delete messager.data[callback] ;
                }                        
            },
            setConfirmData : function(content,okBtnText,cancelBtnText,callback){
                messager.data.content = content;
                messager.data.okBtnText = okBtnText;
                messager.data.cancelBtnText = cancelBtnText;
                if(callback != undefined){
                    messager.data.callback = callback;
                }else{
                    delete messager.data[callback] ;
                }        
            },
            alert :  function(content,btnText,callback){
                messager.setAlertData(content,btnText,callback);
                commonAlert(messager.data);
                openLayer('commonAlert');                                                
            },
            confirm : function(content,okBtnText,cancelBtnText,callback){
                messager.setConfirmData(content,okBtnText,cancelBtnText,callback);
                commonConfirm(messager.data);
                openLayer('commonConfirm');
            },
            // 단일 쿠폰 다운로드 실패
            singleCouponDownloadFailAlert : function(content){
                messager.alert(content,"확인",function(){
                    $("html").scrollTop(0);
                });
            },
            // 전체 다운로드 성공
            allCouponDownloadSuccessAlert : function(){
                var content =  "";
                content += "쿠폰이 발급되었습니다.";
                messager.alert(content,"확인",function(){
                    //window.location.href="/sec/"+"mypage/coupon/indexCouponDownload/";
                });
            }

        };

        function PromotionCouponDown(couponNum){
            returnUrl = window.location.pathname;
            stPath = $('#openPop').data('st-path');
            var options = {
                url : stPath + "xhr/mypage/coupon/promotionCouponDownload",    
                // 쿠폰 (단일/복수) 다운가능
                data : {cpNos:[couponNum]},     
                done : function(result){
                    
                    if (result.exCd === 'COP0024') {
                        makeAlert('로그인 후 다운 가능합니다.', fnGoLoginPage);
                    } else {

                        if(result.couponDownYn=="Y"){       //쿠폰다운받기 성공여부
                            messager.allCouponDownloadSuccessAlert(); 
                        }else{
                            if (result.exCd=="COP0008") {
                                //수량부족 에러코드  <<커스텀하고자하는 에러코드만 조건추가
                                messager.singleCouponDownloadFailAlert("오늘 데일리 선착순 쿠폰이 모두 소진되었습니다.<br/> 내일 다시 도전해보세요!");
                            }else if(result.exCd=="COP0009"){
                                messager.singleCouponDownloadFailAlert("이미 다운받으신 쿠폰입니다.<br/>보유쿠폰함을 확인해 주세요!");
                            }else{
                                //다른예외 코드는 기존의 시스템 정의 문구 출력
                                messager.singleCouponDownloadFailAlert(result.exMsg);
                            }
                        }
                    }
                }
            };
            ajax.call(options);
        }    

        let cpnNum = {
            'cpn_app' : `33030,33031,33032,33033,33034,33035,33036,33037,33038,33041,33042,33043,33612,33044,33045,33046,33047,33048,33613`,
            'cpn_month' : `33842,33843,33844,33845,33846,33849,33850,33851,33852,33853,33854`
        }
        let cpnTarget;
        // 단일/복수 쿠폰 다운로드 이벤트 트리거
        PT_STATE.$PROJECT.off('click.couponPromo').on('click.couponPromo', '[data-role="btnCouponPromo"]', function (e) {
            e.preventDefault();
            // PromotionCouponDown($(this).attr('data-cpNum'));
            cpnTarget = $(this).data('cptype');
            PromotionCouponDown(cpnNum[cpnTarget]);
        });

    }
}