import { PT_STATE, util as _ } from './modules/bs_common';
import { component_tab } from './modules/component_tab';
import { anchor } from './modules/anchor';
import { CountUp } from './plugin/countUp';




$(document).ready(function(){

    anchor.click([
        {
            el: '[data-role-anchor="notice"]',
            target: '.sec_notice',
        },
    ]);

    // function swiperEvt() {

    //     let lnbswiper = new Swiper('.swiper-container.pt_lnb-swiper', {
    //         slidesPerView: 'auto',
    //         autoplay: false,
    //         allowTouchMove: true,
    //         preloadImages: false,
    //         lazy: true,
    //         navigation: {
    //             nextEl: $('.sec_lnb').find(".swiper-button-next"),
    //             prevEl: $('.sec_lnb').find(".swiper-button-prev"),
    //         },
    //         breakpoints: {
    //             769: {
    //                 allowTouchMove: false,
    //             }
    //         },
    //     })
    // }

    function lozadEvt(){
        const observerbg = lozad('.pt_bg-image', {
            loaded: function(el) {
                el.classList.add('pt_add-bg');
            }
        });
        observerbg.observe();
    }

    
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
        alert: function (content, btnText, callback) {
            messager.setAlertData(content, btnText, callback);
            commonAlert(messager.data);
            openLayer('commonAlert');
        },
    }
    
    function searchPointSummary() {
        const options = {
            url: '/sec/xhr/membership/point/getSearchPointSummary',
            done: function(result) {
                if(result != null && result.pointSummaryInfo != null && result.pointSummaryInfo.evrslt != "E") {
                    const spoint = Number(result.pointSummaryInfo.evspoint);
                    const $btnCheck = $('.pt_infor__point-btn--check');
                    const countNum = $('#count').text();
                    countUp(spoint, countNum);
                    cancelAnimationFrame(slotCount);
                } else {
                    messager.alert('멤버십에 가입하거나 휴면을 해제하신 후 포인트를 확인하실 수 있습니다. 나의 정보 페이지에서 가입 또는 휴면 해제를 진행해 주세요.', '확인', gotoMem);
                }
            },
            fail : function() {}
        };
        ajax.call(options);
    }

    function gotoMem() {
        window.location.href = 'https://www.samsung.com/sec/membership/point/';
    }

    function countUp(point, countNum) {
        establishOptionsFromInputs(countNum);
        const demo = new CountUp('count', point, countOpt);
        demo.start();
    }

    var countOpt;

    function establishOptionsFromInputs(countNum) {
        countOpt = {
            startVal: countNum.replace(/,/g, ''),
            duration: 0.9,
            separator: ','
        };

        for (var key in countOpt) {
            if (countOpt.hasOwnProperty(key)) {
                if (countOpt[key] === null) {
                    delete countOpt[key];
                }
            }
        }
    }

    const slotEl = document.getElementById('count');
    const numberLength = 5;
    let currentNumber = generateRandomNumber();
    let lastTimestamp = 0;
    const updateInterval = 25;
    // 속도조절
    
    function generateRandomNumber() {
        let randomNumber = '';
        for (let i = 0; i < numberLength; i++) {
            randomNumber += Math.floor(Math.random() * 10);
        }
        return randomNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    let slotCount = '';
    requestAnimationFrame(updateSlot);
        
    function updateSlot(timestamp) {
        if (timestamp - lastTimestamp >= updateInterval) {
            currentNumber = generateRandomNumber();
            slotEl.innerText = currentNumber;
            lastTimestamp = timestamp;
        }
        slotCount = requestAnimationFrame(updateSlot)
    }

    function pointCheck() {
        const $btnCheck = $('.pt_infor__point-btn--check');
        $btnCheck.one('click', function() {
            returnUrl = window.location.pathname;
            stPath = $('#openPop').data('st-path');    
            const options = {
                url: stPath + 'xhr/member/getSession',
                type: "POST",
                done: function(data){
                    const session = JSON.parse(data);
                    if(!session.mbrNo == 0){
                        searchPointSummary();
                    } else {
                        makeAlert('로그인이 필요합니다.', fnGoLoginPage);
                    }
                },
                fail: function(error) {}
            };
            ajax.call(options);
        });
    }

    component_tab.init();
    pointCheck();
    lozadEvt();
    viewportChange(); // fold 해상도 대응
});
