import { PT_STATE, util as _ } from './modules/bs_common';
import { modal } from './modules/modal';
import { anchor } from './modules/anchor';
import cardDataJson from "../data/cardData.json";
import cardBenefitsJson from "../data/cardBenefits.json";

let cardData = cardDataJson.result;
let cardBenefits = cardBenefitsJson.result;

const calculate = {
    $benefitSelect: PT_STATE.$PROJECT.find('[data-benefit-select]'),
    $paymentAmount: PT_STATE.$PROJECT.find('[data-payment-amount]'),
    $benefitCont: PT_STATE.$PROJECT.find("[data-benefit-cont]"),
    init() {
        this.createOption();
        this.inputAmount();
        this.clickReset();
        this.clickConfirm();
        this.changeCard();
    },
    renderHtml() {
        const selected = cardData.filter( (item) => item.cardCd === this.$benefitSelect.val() )[0];
        const paymentAmount = _.removeComma(calculate.$paymentAmount.val());

        // text mapping
        try {
            PT_STATE.$PROJECT.find('[data-benefit-text]').each(function(){
                const textKey = $(this).attr('data-benefit-text');
                if(!textKey || textKey === undefined) return;
                let text = selected[textKey].trim();
                if(/^\d+$/.test(text)) text = _.addComma(text); // 숫자이면 콤마추가
                $(this).html(text);
            });
        } catch (e) { console.error(e); }

        // show mapping
        try {
            PT_STATE.$PROJECT.find('[data-benefit-show]').each(function(){
                const text = $(this).attr('data-benefit-show');
                const price = _.removeComma(PT_STATE.$PROJECT.find('[data-payment-amount]').val());
                if (text.includes('==')) {
                    const [key, value] = text.split('==');
                    $(this).toggle(selected[key] === value);
                } else if (text.includes('!=')) {
                    const [key, value] = text.split('!=');
                    $(this).toggle(selected[key] !== value);
                } else if (text === 'benefitD_rate'){
                    // 삼성카드 경우
                    if(selected.cardCd === 'card_1'){
                        $(this).toggle(price >= 1000000);
                    // 삼성카드 아닌 경우
                    } else {
                        const benefitD_rate = selected.benefitD_rate;
                        $(this).toggle(benefitD_rate !== '-' && !!benefitD_rate);
                    }
                } else if (text === 'benefitE_rate'){
                    // 국민카드 경우
                    if(selected.cardCd === 'card_5'){
                        $(this).toggle(price >= 10000);
                    // 국민카드 아닌 경우
                    } else {
                        const benefitE_rate = selected.benefitE_rate;
                        $(this).toggle(benefitE_rate !== '-' && !!benefitE_rate);
                    }
                } else if (text === 'benefitF_rate'){
                    // 롯데카드 경우
                    if(selected.cardCd === 'card_3'){
                        $(this).show();
                        $(this).toggle(price >= 500000);
                    // 롯데카드 아닌 경우
                    } else {
                        const benefitF_rate = selected.benefitF_rate;
                        $(this).toggle(benefitF_rate !== '-' && !!benefitF_rate);
                    }

                    // 삼성카드 + 500만원이상
                    if(selected.cardCd === 'card_1'){
                        price >= 5000000 ? $(this).show() : $(this).hide();
                    }
                }
            });
        } catch (e) { console.error(e); }

        // 금액대별 결제일 할인
        const $discountAmount = PT_STATE.$PROJECT.find('[data-benefit-custom="discountAmount"]');
        const $chkDiscountAmount = PT_STATE.$PROJECT.find('[data-benefit-custom="chkDiscountAmount"]');
        const $discountText = PT_STATE.$PROJECT.find('[data-benefit-custom="discountText"]');
        if($discountAmount.length){
            let discountAmount = '-';
            $.each(cardBenefits, function(index, benefit) {
                const benefitAmount = _.removeComma(benefit.purchaseAmount);
                if (paymentAmount >= benefitAmount) {
                    discountAmount = benefit.discountAmount.trim();
                }
            });

            // 금액대별 결제일 할인
            if(selected.isUse && selected.isUse.trim() === 'O' && discountAmount && discountAmount.trim() !== '-'){
                $chkDiscountAmount.show();
                $discountText.text('금액대별 결제일할인');
            } else if (selected.isUse02 && selected.isUse02.trim() === 'O' && discountAmount && discountAmount.trim() !== '-') {
                $chkDiscountAmount.show();
                $discountText.text('금액대별 캐시백 혜택');
            } else {
                $chkDiscountAmount.hide();
            }

            $discountAmount.text(discountAmount);
        }

        // 특별 추가 혜택
        const $specialBenefit = PT_STATE.$PROJECT.find('[data-benefit-custom="specialBenefit"]');
        const $chkSpecialBenefit = PT_STATE.$PROJECT.find('[data-benefit-custom="chkSpecialBenefit"]');
        if($specialBenefit.length){
            let specialBenefit = '-';
            $.each(cardBenefits, function(index, benefit) {
                const benefitAmount = _.removeComma(benefit.purchaseAmount);
                if (paymentAmount >= benefitAmount) {
                    specialBenefit = benefit.AISaleBenefit_A.trim();
                }
            });

            if(selected.isUse03 && selected.isUse03.trim() === 'O' && specialBenefit && specialBenefit.trim() !== '-'){
                $chkSpecialBenefit.show();
            } else {
                $chkSpecialBenefit.hide();
            }

            $specialBenefit.text(specialBenefit);
        }

        // 네이버페이로 결제 시
        const $naverPayPoints = PT_STATE.$PROJECT.find('[data-benefit-custom="naverPayPoints"]');
        const $chkNaverPayPoints = PT_STATE.$PROJECT.find('[data-benefit-custom="chkNaverPayPoints"]');
        if($naverPayPoints.length){
            let naverPayPoints = '-';
            $.each(cardBenefits, function(index, benefit) {
                const benefitAmount = _.removeComma(benefit.purchaseAmount);
                if (paymentAmount >= benefitAmount) {
                    naverPayPoints = benefit.naverPayPoints.trim();
                }
            });

            // 네이버페이 결제 시 추가 적립(P)이 없는 경우
            if(selected.isUse && selected.isUse.trim() === 'O' && naverPayPoints && naverPayPoints.trim() !== '-'){
                $chkNaverPayPoints.show();
            } else {
                $chkNaverPayPoints.hide();
            }

            $naverPayPoints.text(naverPayPoints);
        }

        // (무이자 할부 (100만원 이상 결제 시) and 100만원 이상 결제 시) show, hide
        let ischkPrice100 = false;
        const $chkPrice100 = PT_STATE.$PROJECT.find('[data-benefit-custom="chkPrice100"]');
        const $chkPrice100Else = PT_STATE.$PROJECT.find('[data-benefit-custom="chkPrice100Else"]');
        if($chkPrice100.length && selected.benefitA && selected.benefitA !== '-'){
            if(paymentAmount < 1000000){
                $chkPrice100.hide();
            } else {
                $chkPrice100.show();
                ischkPrice100 = true;
            }
        } else {
            $chkPrice100.hide();
        }

        // (무이자 할부 (200만원 이상 결제 시) and 200만원 이상 결제 시) show, hide
        let ischkPrice200 = false;
        const $chkPrice200 = PT_STATE.$PROJECT.find('[data-benefit-custom="chkPrice200"]');
        // const $chkPrice200Else = PT_STATE.$PROJECT.find('[data-benefit-custom="chkPrice200Else"]');
        if($chkPrice200.length && selected.benefitA_A && selected.benefitA_A !== '-'){
            if(paymentAmount < 2000000){
                $chkPrice200.hide();
            } else {
                $chkPrice200.show();
                ischkPrice200 = true;
            }
        } else {
            $chkPrice200.hide();
        }

        // (무이자 할부 100만원 이상 결제 시 and 100만원 이상 결제 시) show, hide
        if(!(ischkPrice100 || ischkPrice200) && $chkPrice100Else.length && selected.benefitB && selected.benefitB !== '-'){
            $chkPrice100Else.show();
        } else {
            $chkPrice100Else.hide();
        }

        // (삼성전자 AI 세일 페스타 특별 추가 혜택 (300만원 이상 결제 시) and 500만원 미만 결제 시) show, hide
        let isaiPrice300 = false;
        const $aiPrice300 = PT_STATE.$PROJECT.find('[data-benefit-custom="plus10"]');
        const $aiPrice300Else = PT_STATE.$PROJECT.find('[data-benefit-custom="plus10Else"]');
        if($aiPrice300.length && selected.benefitA && selected.benefitA !== '-'){
            if(paymentAmount < 3000000 || paymentAmount < 5000000){
                $aiPrice300.hide();
            } else {
                $aiPrice300.show();
                isaiPrice300 = true;
            }
        } else {
            $aiPrice300.hide();
        }

        // (무이자 할부 (200만원 이상 결제 시) and 200만원 이상 결제 시) show, hide
        if(!isaiPrice300 && $aiPrice300Else.length && selected.benefitB && selected.benefitB !== '-'){
            $aiPrice300Else.show();

        } else {
            $aiPrice300Else.hide();
        }
    },
    formatNumber(input) {
        let value = input.value.replace(/,/g, '');
        !isNaN(value) && value !== '' ? input.value = parseInt(value).toLocaleString() : input.value = '';
    },
    createOption() {
        let _htmlOption = `<option value="none" selected="selected" data-omni-type="microsite" data-omni="sec:eventList:creditcard_benefit:viewmore_card">카드사 선택하기</option>`;
        cardData.forEach(function(item) {
            _htmlOption += `<option value="${item.cardCd}" data-omni-type="microsite" data-omni="${item.omniData}">${item.cardNm}</option>`;
        });
        this.$benefitSelect.html(_htmlOption);
    },
    inputAmount(){
        this.$paymentAmount.on('input', function() {
            calculate.formatNumber(this);
        });
    },
    clickReset(){
        PT_STATE.$PROJECT.find('[data-role="btnReset"]').on('click', function() {
            calculate.$benefitSelect.find("option[value=none]").prop("selected", true);
            calculate.$paymentAmount.val("");
            calculate.$benefitCont.addClass('pt_bnf__cont--none');
        });
    },
    clickConfirm(){
        PT_STATE.$PROJECT.find('[data-role="btnConfirm"]').on('click', function() {
            if(calculate.$benefitSelect.val() === "none"){
                window.PT_STATE.service.messager.alert('카드사를 선택해주세요');
            } else if(calculate.$paymentAmount.val().length < 1){
                window.PT_STATE.service.messager.alert('결제 예정 금액을 입력하세요');

            } else if(Number(_.removeComma(calculate.$paymentAmount.val())) < 50000){
                window.PT_STATE.service.messager.alert('50,000원 이상 결제 금액을 입력해주세요');

            } else {
                calculate.$benefitCont.removeClass('pt_bnf__cont--none');
                calculate.renderHtml();
            }
        });
    },
    changeCard() {
        const $btnConfirm = PT_STATE.$PROJECT.find('[data-role="btnConfirm"]');
        PT_STATE.$PROJECT.find('[data-benefit-select]').on('change', function() {
            const selected = cardData.filter( (item) => item.cardCd === $(this).val() )[0];
            if(selected){
                $btnConfirm.attr('data-omni-type','microsite').attr('data-omni',selected.omniData);
            }else{
                $btnConfirm.removeAttr('data-omni-type').removeAttr('data-omni');
            }
        });
    }
}

function imgLozad() {
    const observerbg = lozad(".pt_bg-image", {
        loaded: function (el) {
            el.classList.add("pt_add-bg");
        },
    });
    observerbg.observe();
}

// benefit_card
const benefitzone_card = {
    tabSwiper : {
        // 혜택 슬라이드 
        variables: {
            modelNavs: document.querySelectorAll('.pt_menu .pt_menu__item'),
            modelConts: document.querySelectorAll('.pt_cont__container .pt_cont__item'),
            swiperIns: null,
            // ttt: console.log('this?', this)
        },
        lineModelSwiper() {
            let _this = this;

            // nav swiper 
            const navSwiper = new Swiper(".pt_menu", {
                slidesPerView: "auto",
                observer : true, 
                observeParents : true,
                allowTouchMove: true,
                preloadImages: false,
                lazy: true,
                a11y: {
                    prevSlideMessage: '이전 슬라이드',
                    nextSlideMessage: '다음 슬라이드',
                    slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
                },
                on: {
                    init: function() {
                        $('.pt_menu .pt_menu__item.active').append('<span class="blind selected_option">선택됨</span>');
                    },
                    transitionStart: function() {
                        // 네비 이동 시 컨텐츠 스와이프 이동
                        if(document.body.clientWidth > 768) {
                            contentSwiper.slideTo(this.activeIndex, 500);
                        };
                    }, 
                    slideChangeTransitionEnd: function() {
                        $('.pt_menu .pt_menu__item').find('.blind').remove();
                        $('.pt_menu .pt_menu__item.active').append('<span class="blind selected_option">선택됨</span>');
                    },
                    breakpoint: function () {
                        var that = this;
                        setTimeout(function () {
                            that.slideTo(0, 0);
                        }, 150);
                    },
                },
            });

            // conts swiper
            const contentSwiper = new Swiper(".pt_cont__container", {
                slidesPerView: 'auto',
                observer : true, 
                observeParents : true,
                preloadImages: false,
                // lazy: true,
                lazy: {
                    loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
                    // loadPrevNextAmount: 5 
                },
                nested: true,
                allowTouchMove: true,
                // loop: true,
                pagination: {
                    el: ".pt_cont__container .pt_cont__pagination",
                    clickable : true,
                },
                on: {
                    breakpoint: function () {
                        var that = this;
                        setTimeout(function () {
                            that.slideTo(0, 0);
                            for(let i = 0; i < that.slides.length; i ++) {
                                that.slides[i].setAttribute('style', '')
                            }
                        }, 150);
                    },
                    init: function() {
                        $(".pt_cont__item.swiper-slide-active").find('a').attr("tabindex","0");
                        let swiperContainer = document.querySelector('.pt_cont__container');
                        swiperContainer.classList.add('pt_blk');
                    },
                    transitionStart: function() {
                        _this.lineModelNav(this.activeIndex);
                        navSwiper.slideTo(this.activeIndex, 500);
                        // 마지막 요소에 접근 시 activeIndex가 마지막 요소 못잡는 이슈 해결
                        // if(this.isEnd) {
                        //     _this.lineModelNav(this.activeIndex + 1);
                        // }
                    },
                    transitionEnd: function() {
                        $(".pt_cont__item").find('a').attr("tabindex","-1");
                        $(".pt_cont__item.swiper-slide-active").find('a').attr("tabindex","0");
                    },
                    slideChange: function () {
                        let swiperContainer = document.querySelector('.pt_cont__container');
                        if (this.activeIndex >= 0 && this.activeIndex <= 2) {
                            swiperContainer.classList.add('pt_blk');
                        } else {
                            swiperContainer.classList.remove('pt_blk');
                        }
                    },
                    slideChangeTransitionEnd: function() {
                        $('.pt_menu .pt_menu__item').find('.blind').remove();
                        $('.pt_menu .pt_menu__item.active').append('<span class="blind selected_option">선택됨</span>');
                    }
                    // init: function() {
                    //     $(this.el).find('.swiper-slide').attr('tabindex', -1);
                    //     $(this.el).find('.swiper-slide.swiper-slide-active').attr('tabindex', 0);                    
                    // },
                },
                navigation: {
                    nextEl: ".swiper-button-next.pt_cont__btn-next",
                    prevEl: ".swiper-button-prev.pt_cont__btn-prev",
                },
                a11y: {
                    prevSlideMessage: '이전 슬라이드',
                    nextSlideMessage: '다음 슬라이드',
                    slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
                },
                autoplay: { // 오토플레이 모바일에서만 작동되게 하려면
                    enabled: false,
                },
                breakpoints: {
                    320: { // 320 이상
                        slidesPerView: "auto",
                        autoplay: { // 오토플레이 모바일에서만 작동되게 하려면
                            enabled: true,
                            delay: 3000,
                        },
                    },
                    768: { // 768 이하
                        slidesPerView: "auto",
                    }
                },
            });

            // pc에서는 autoplay x, mo에서는 autoplay
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 768) {
                    contentSwiper.autoplay.stop();
                } else {
                    contentSwiper.autoplay.start();
                }
            });

            $('.pt_menu .pt_menu__item').on('click', function() {
                $('.pt_menu .pt_menu__item').find('.blind').remove();
                $(this).append('<span class="blind selected_option">선택됨</span>');
            })

            // idx
            for(let i = 0; i < this.variables.modelNavs.length; i++) {
                
                this.variables.modelNavs[i].addEventListener('click', e => {
                    contentSwiper.slideTo(i, 500);
                    // debugger
                    // console.log(contentSwiper)
                    // _this.lineModelNav(i);
                    for(let j = 0; j < this.variables.modelNavs.length; j++) {
                        this.variables.modelNavs[j].classList.remove('active');
                        this.variables.modelConts[j].classList.remove('active');
                    }
                    this.variables.modelNavs[i].classList.add('active');
                    this.variables.modelConts[i].classList.add('active');
                });

            };

            let playPauseButton = document.querySelector('.pt_cont__btn-play');
            playPauseButton.addEventListener('click', function() {

                if (contentSwiper.autoplay.running) {
                    contentSwiper.autoplay.stop();
                    playPauseButton.innerHTML = '<span class="blind">Play</span>';
                    playPauseButton.classList.remove('pause')
                } else {
                    contentSwiper.autoplay.start();
                    playPauseButton.innerHTML = '<span class="blind">Pause</span>';
                    playPauseButton.classList.add('pause')
                }
            });

            return { contentSwiper, navSwiper };
        },
        lineModelNav(idx) { // 네비 연결
            this.variables.modelNavs.forEach(el => el.classList.remove('active'))
            this.variables.modelNavs[idx].classList.add('active')
        },
        swiperStats() {
            setTimeout(() => {
                this.variables.swiperIns = this.lineModelSwiper();
                this.lineModelNav(0);
                this.variables.swiperIns.contentSwiper.update();
                this.variables.swiperIns.navSwiper.update();
                // console.log(this.variables.swiperIns.navSwiper)
            }, 0)
        },
    },
    
    init(){
        this.tabSwiper.swiperStats(); // 먼저 실행하면 안됨. 클릭했을 때 실행하는걸로 

        // let resizeTimer = null;
        // window.addEventListener('resize', function() {
        //     setTimeout(() => {
        //         this.tabSwiper.swiperStats();
        //         // console.log(this.variables.swiperIns.navSwiper)
        //     }, 400)

        //     // clearTimeout(resizeTimer);
        //     // resizeTimer = setTimeout(this.tabSwiper.lineModelSwiper(), 400);
        // }, false);
    },
}

// benefitzone_card.init();

$(document).ready(function(){

    function setSwiper(){
        const cardSwiper = new Swiper ('.pt_card__list', {
            slidesPerView: 'auto',
            allowTouchMove: true,
            observer: true,
            observeParents: true,
            preloadImages: false,
            watchOverflow : true,
            slidesPerGroup: 2,
            lazy: true,
            // loop: true,
            // autoplay: {
            //     delay: 2500,
            //     disableOnInteraction: false,
            // },
            pagination: {
                el: '.pt_card__control .swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints :{
                769: {
                    slidesPerGroup: 3,
                    // allowTouchMove: false,
                }
            },
            on: {
                init: function() {
                    const $el = $(this.$el);

                    this.params.navigation.prevEl = $el.siblings('.pt_card__arrow').find('.pt_card__btn--prev');
                    this.params.navigation.nextEl = $el.siblings('.pt_card__arrow').find('.pt_card__btn--next');


                    // const btnPlay = $('.pt_card__control--btn')
                    // btnPlay.on('click', function(){
                    //     if(btnPlay.hasClass('pause')){
                    //         btnPlay.removeClass('pause');
                    //         btnPlay.attr("title","슬라이드 멈춤");
                    //         cardSwiper.autoplay.stop();
                    //     }else{
                    //         btnPlay.addClass('pause');
                    //         btnPlay.attr("title","슬라이드 재생");
                    //         cardSwiper.autoplay.start();
                    //     }
                    // });
                },
                breakpoint: function() {
                    var that = this;
                    setTimeout(function() {
                        that.slideTo(0, 0);
                    }, 150);
                }
            }
        });
        const bannerSwiper = new Swiper ('.pt_banner', {
            slidesPerView: 'auto',
            allowTouchMove: true,
            observer: true,
            observeParents: true,
            preloadImages: false,
            watchOverflow : true,
            lazy: true,
            // loop: true,
            // autoplay: {
            //     delay: 2500,
            //     disableOnInteraction: false,
            // },
            pagination: {
                el: '.pt_banner__control .swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            on: {
                init: function() {
                    const $el = $(this.$el);

                    this.params.navigation.prevEl = $el.find('.pt_banner__arrow').find('.pt_banner__btn--prev');
                    this.params.navigation.nextEl = $el.find('.pt_banner__arrow').find('.pt_banner__btn--next');


                    // const bannerBtnPlay = $('.pt_banner__control--btn')
                    // bannerBtnPlay.on('click', function(){
                    //     if(bannerBtnPlay.hasClass('pause')){
                    //         bannerBtnPlay.removeClass('pause');
                    //         bannerBtnPlay.attr("title","슬라이드 멈춤");
                    //         bannerSwiper.autoplay.stop();
                    //     }else{
                    //         bannerBtnPlay.addClass('pause');
                    //         bannerBtnPlay.attr("title","슬라이드 재생");
                    //         bannerSwiper.autoplay.start();
                    //     }
                    // });
                },
                breakpoint: function() {
                    var that = this;
                    setTimeout(function() {
                        that.slideTo(0, 0);
                    }, 150);
                }
            }
        });
    }
    setSwiper();

    modal.init();
    calculate.init();
    imgLozad();
    viewportChange(); // fold 해상도 대응

    anchor.load([
        // 카드사 혜택
        {
            url: 'paydiscount',
            target: '.sec_card',
        },
        // 카드 소배너
        {
            url: 'cardbenefit',
            target: '.pt_card-slide',
        },
        // 금액대별 결제 혜택 표
        {
            url: 'benefitdetail',
            target: '.pt_subbnf',
            scroll: [-60,-40],
        },
        // 시뮬영역
        {
            url: 'simulcard',
            target: '.sec_check',
        },
        // 유의사항
        {
            url: 'cardnote',
            target: '.sec_notice',
        },
        {
            url: 'naverpay-benefit',
            target: '.pt_pay',
            scroll: [-60,-40],
        },
        {
            url: 'mwallet',
            target: '.pt_pay__service',
            scroll: [-60,-40],
        },
        {
            url: 'mwalletbenefit',
            target: '.pt_howto',
            scroll: [-60,-40],
        },
    ]);
});