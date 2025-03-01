
import modelSlide from "../data/modelSlide.json";
import { PT_STATE, util as _ } from './modules/bs_common';

$(document).ready(function(){

  let config = {
    slideImgCom: modelSlide.modelSlideCom,
    slideImgSys: modelSlide.modelSlideSys,
    comSlideWrap: document.querySelector(".sec_model--com .pt_model__wrapper"),
    sysSlideWrap: document.querySelector(".sec_model--sys .pt_model__wrapper"),

    // 라인별 추천 모델 : 240110. Mark 추가
    variables: {
      modelNavs: document.querySelectorAll('.pt_tab--com .pt_tab__item'),
      modelConts: document.querySelectorAll('.pt_model__swiper--com .pt_model__item'),
      autoPlayState: document.querySelector('.pt_model__state--com'),
      playBtn: document.querySelector('.pt_model__state--com button.play'),
      stopBtn: document.querySelector('.pt_model__state--com button.stop'),
      swiperIns: null,
      buyingBtn: document.querySelector('.model_2--com'),
      modelPopClose: document.querySelector('.pt_model_pop--com .btn_close'),
    }, //com

    variablesSys: {
        modelNavs: document.querySelectorAll('.pt_tab--sys .pt_tab__item'),
        modelConts: document.querySelectorAll('.pt_model__swiper--sys .pt_model__item'),
        autoPlayState: document.querySelector('.pt_model__state--sys'),
        playBtn: document.querySelector('.pt_model__state--sys button.play'),
        stopBtn: document.querySelector('.pt_model__state--sys button.stop'),
        swiperIns: null,
        buyingBtn: document.querySelector('.model_2--sys'),
        modelPopClose: document.querySelector('.pt_model_pop--sys .btn_close'),
    }, //sys

    //com
    lineModelSwiper() {
        let _this = this;

        // conts swiper
        const contentSwiper = new Swiper(".sec_model--com .pt_model__swiper", {
            slidesPerView: 1,
            allowTouchMove: true,
            observer : true, 
            observeParents : true,
            preloadImages: false,
            lazy: true,
            // autoHeight: true,
            autoplay: {
                enabled: true,
                disableOnInteraction: true,
                delay: 3000,
            },
            navigation: {
                prevEl: '.sec_model--com .pt_model__prev',
                nextEl: '.sec_model--com .pt_model__next',                
            },
            pagination: {
                el: ".pt_model__swiper--com .pt_model__pagenation",
                clickable : true,
            },
            a11y: {
                prevSlideMessage: '이전 슬라이드',
                nextSlideMessage: '다음 슬라이드',
                slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
            },
            breakpoints: {
                320: {
                    allowTouchMove: true,
                },
                768: {
                    allowTouchMove: true,
                },
            },
            on: {
                transitionStart: function() {
                    // _this.lineModelNav(this.activeIndex);
                    // navSwiper.slideTo(this.activeIndex, 500);
                    this.slideTo(this.activeIndex, 500);

                    // 스와이핑하면 오토플레이 멈추는 버그 해결
                    if( _this.variables.autoPlayState.classList.contains('play') && document.body.clientWidth < 769 ) {
                        contentSwiper.autoplay.start();
                    } 
                    // 마지막 요소에 접근 시 activeIndex가 마지막 요소 못잡는 이슈 해결
                    // if(this.isEnd) {
                    //     _this.lineModelNav(this.activeIndex + 1);
                    // }
                },
                breakpoint: function () {
                    var that = this;
                    setTimeout(function () {
                        that.slideTo(0, 0);
                        for(let i = 0; i < that.slides.length; i ++) {
                            that.slides[i].setAttribute('style', '')
                        }
                    }, 150);
                },
            },
        });
        return { contentSwiper };
    },
    lineModelPlay() { // 상태 : 플레이
        this.variables.autoPlayState.classList.add('play');
        this.variables.autoPlayState.classList.remove('stop');
        this.variables.playBtn.style.display = 'none';
        this.variables.stopBtn.style.display = 'block';
        this.variables.swiperIns.contentSwiper.autoplay.start()

    },
    lineModelStop() { // 상태 : 정지
        this.variables.autoPlayState.classList.add('stop');
        this.variables.autoPlayState.classList.remove('play');
        this.variables.playBtn.style.display = 'block';
        this.variables.stopBtn.style.display = 'none';
        this.variables.swiperIns.contentSwiper.autoplay.stop()
    },
    modelPopOpen() {
        // 팝업 오픈
        setTimeout(() => {
          this.variables.swiperIns = this.lineModelSwiper();
          this.variables.swiperIns.contentSwiper.update();          
        }, 0)

    },
    modelPopClose() {
        this.variables.swiperIns.contentSwiper.destroy();
        this.variables.autoPlayState.classList.add('play');
        this.variables.autoPlayState.classList.remove('stop');
        this.variables.playBtn.style.display = 'none';
        this.variables.stopBtn.style.display = 'block';
    },
    //com e

    //sys
    lineModelSwiperSys() {
        let _this = this;

        // conts swiper
        const contentSwiperSys = new Swiper(".sec_model--sys .pt_model__swiper", {
            slidesPerView: 1,
            allowTouchMove: true,
            observer : true, 
            observeParents : true,
            preloadImages: false,
            lazy: true,
            // autoHeight: true,
            autoplay: {
                enabled: true,
                disableOnInteraction: true,
                delay: 3000,
            },
            navigation: {
                prevEl: '.sec_model--sys .pt_model__prev',
                nextEl: '.sec_model--sys .pt_model__next',                
            },
            pagination: {
                el: ".pt_model__swiper--sys .pt_model__pagenation",
                clickable : true,
            },
            a11y: {
                prevSlideMessage: '이전 슬라이드',
                nextSlideMessage: '다음 슬라이드',
                slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
            },
            breakpoints: {
                320: {
                    allowTouchMove: true,
                },
                768: {
                    allowTouchMove: true,
                },
            },
            on: {
                transitionStart: function() {
                    // _this.lineModelNav(this.activeIndex);
                    // navSwiper.slideTo(this.activeIndex, 500);
                    this.slideTo(this.activeIndex, 500);

                    // 스와이핑하면 오토플레이 멈추는 버그 해결
                    if( _this.variables.autoPlayState.classList.contains('play') && document.body.clientWidth < 769 ) {
                        contentSwiperSys.autoplay.start();
                    } 
                    // 마지막 요소에 접근 시 activeIndex가 마지막 요소 못잡는 이슈 해결
                    // if(this.isEnd) {
                    //     _this.lineModelNav(this.activeIndex + 1);
                    // }
                },
                breakpoint: function () {
                    var that = this;
                    setTimeout(function () {
                        that.slideTo(0, 0);
                        for(let i = 0; i < that.slides.length; i ++) {
                            that.slides[i].setAttribute('style', '')
                        }
                    }, 150);
                },
            },
        });

        return { contentSwiperSys };
    },
    lineModelPlaySys() { // 상태 : 플레이
        this.variablesSys.autoPlayState.classList.add('play');
        this.variablesSys.autoPlayState.classList.remove('stop');
        this.variablesSys.playBtn.style.display = 'none';
        this.variablesSys.stopBtn.style.display = 'block';
        this.variablesSys.swiperIns.contentSwiperSys.autoplay.start();
    },
    lineModelStopSys() { // 상태 : 정지
        this.variablesSys.autoPlayState.classList.add('stop');
        this.variablesSys.autoPlayState.classList.remove('play');
        this.variablesSys.playBtn.style.display = 'block';
        this.variablesSys.stopBtn.style.display = 'none';
        this.variablesSys.swiperIns.contentSwiperSys.autoplay.stop();
    },
    modelPopOpenSys() {
        // this.variables.buyingBtn.addEventListener('click', e => this.variablesSys.buyingTarget.click())
        // 팝업 오픈
        setTimeout(() => {
            this.variablesSys.swiperIns = this.lineModelSwiperSys();
            this.variablesSys.swiperIns.contentSwiperSys.update();
        }, 0)
    },
    modelPopCloseSys() {
        this.variablesSys.swiperIns.contentSwiperSys.destroy();
        this.variablesSys.autoPlayState.classList.add('play');
        this.variablesSys.autoPlayState.classList.remove('stop');
        this.variablesSys.playBtn.style.display = 'none';
        this.variablesSys.stopBtn.style.display = 'block';
    },
    //sys e

    init() {
        // 라인별 추천 모델 : 240110. Mark 추가
        // this.variables.swiperIns = this.lineModelSwiper(); // 먼저 실행하면 안됨. 클릭했을 때 실행하는걸로 
        //com
        this.variables.playBtn.addEventListener('click', this.lineModelPlay.bind(this));
        this.variables.stopBtn.addEventListener('click', this.lineModelStop.bind(this));
        this.variables.buyingBtn.addEventListener('click', this.modelPopOpen.bind(this));
        this.variables.modelPopClose.addEventListener('click', this.modelPopClose.bind(this));
        //com e
        //sys
        this.variablesSys.playBtn.addEventListener('click', this.lineModelPlaySys.bind(this));
        this.variablesSys.stopBtn.addEventListener('click', this.lineModelStopSys.bind(this)) ;       
        this.variablesSys.buyingBtn.addEventListener('click', this.modelPopOpenSys.bind(this));
        this.variablesSys.modelPopClose.addEventListener('click', this.modelPopCloseSys.bind(this));
        //sys e
    },
  }

  config.init();

  const modelTabCom = document.querySelectorAll('.pt_tab--com .pt_tab__item');
  const modelTabSys = document.querySelectorAll('.pt_tab--sys .pt_tab__item');
  const modelLinkCom = document.querySelector('.sec_model--com .pt_model__link');
  const modelLinkSys = document.querySelector('.sec_model--sys .pt_model__link');

  /** 일반에어컨 추천모델 슬라이드 렌더링 */
  function lenderHtmlCom(model) {
    let imgModel = config.slideImgCom[model];
    let slideHtml = '';

    for (let i=0, imgLen=imgModel.length; i < imgLen; i++) {
        slideHtml += `
            <div class="swiper-slide pt_model__item">
                <div class="pt_model__img-box">
                    <img src="../../is/images/model/${imgModel[i].imgPc}.jpg" alt="${imgModel[i].alt}" class="m_hide" loading="lazy" />
                    <img src="../../is/images/model/${imgModel[i].imgMo}.jpg" alt="${imgModel[i].alt}" class="m_show" loading="lazy" />
                </div>
                <p class="blind">${imgModel[i].blind}</p>
            </div>
        `         
    }
    config.comSlideWrap.insertAdjacentHTML("afterbegin", slideHtml);
  }

    modelTabCom.forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();

            modelTabCom.forEach(function(item){
                item.classList.remove('active');                
            });
            el.classList.add('active');

            config.comSlideWrap.innerHTML = '';

            let tabModel = el.getAttribute("data-model");        
            
            lenderHtmlCom(tabModel);
            setTimeout(function () {
                $(".sec_model--com .pt_model__swiper")[0].swiper.slideTo(0);
                config.lineModelPlay();
            }, 0);

            if (tabModel == "gallery") {
                modelLinkCom.setAttribute('data-role-anchor', 'recomm_gallery');
                modelLinkCom.setAttribute('data-omni', 'sec:event:air-conditioners:tab_popup_new-gallery_view_product');
                modelLinkCom.innerText = 'BESPOKE AI 무풍 갤러리 제품 보러가기 >';
            } else if (tabModel == "classic") {
                modelLinkCom.setAttribute('data-role-anchor', 'recomm_classic');
                modelLinkCom.setAttribute('data-omni', 'sec:event:air-conditioners:tab_popup_classic_view_product');
                modelLinkCom.innerText = '무풍에어컨 클래식 제품 보러가기 >';
            } else if (tabModel == "q9000") {
                modelLinkCom.setAttribute('data-role-anchor', 'recomm_q9000');
                modelLinkCom.setAttribute('data-omni', 'sec:event:air-conditioners:tab_popup_q9000_view_product');
                modelLinkCom.innerText = 'Q9000 제품 보러가기 >';
            }
        });
    });

  /** 시스템에어컨 추천모델 슬라이드 렌더링 */
  function lenderHtmlSys(model) {
    let imgModel = config.slideImgSys[model];
    let slideHtml = '';

    for (let i=0, imgLen=imgModel.length; i < imgLen; i++) {
      slideHtml += `
        <div class="swiper-slide pt_model__item">
          <div class="pt_model__img-box">
              <img src="../../is/images/model/${imgModel[i].imgPc}.jpg" alt="${imgModel[i].alt}" class="m_hide" loading="lazy" />
              <img src="../../is/images/model/${imgModel[i].imgMo}.jpg" alt="${imgModel[i].alt}" class="m_show" loading="lazy" />
          </div>
          <p class="blind">${imgModel[i].blind}</p>
        </div>
      ` 
    }
    config.sysSlideWrap.insertAdjacentHTML("afterbegin", slideHtml);
  }

    modelTabSys.forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();

            modelTabSys.forEach(function(item){
                item.classList.remove('active');
            });
            el.classList.add('active');

            config.sysSlideWrap.innerHTML = '';

            let tabModel = el.getAttribute("data-model");
            
            lenderHtmlSys(tabModel);
            setTimeout(function () {
                $(".sec_model--sys .pt_model__swiper")[0].swiper.slideTo(0);
                config.lineModelPlaySys();
            }, 0);            
        });
    });
});
