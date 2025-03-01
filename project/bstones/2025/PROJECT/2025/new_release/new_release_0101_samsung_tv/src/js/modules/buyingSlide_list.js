/**
 * BuyingSlide 0.0.1
 * 작성자 : Peter
 * 작성일 : 2024-01-09
 * 수정일 : 2024-01-09
 */
function checkDevice() {
    let device = 'pc';
    // if($(window).outerWidth() <= 768){
    //     device = 'mobile';
    // } 
    return device;
}

export class BuyingSlide {
    constructor(selected, options) {
        const buyingSlide = this;
        try {
            const defaults = {
                loop: true,
                autoplay: false,
                navigation: false,
                imageFadeEffect: true,
                tagHtml: '',
                useTab: '',
                useTabOrg: '',
                isActiveTab: false,
                isResize: false,
                swiper: null,
            }
            buyingSlide.data = selected;
            buyingSlide.options = defaults;
            Object.keys(options).forEach(key => {
                buyingSlide.options[key] = options[key];
            });

            // buyingSlide.options.wrapper = buying.el;
            buyingSlide.origins = JSON.parse(JSON.stringify(buyingSlide.options));
            buyingSlide.deviceOrigin = checkDevice();
            buyingSlide.config = buyingSlide.options.imageData.config;

            if(buyingSlide.getSlide().productAll){
                buyingSlide.init();
            }
            // buyingSlide.resize();
            return buyingSlide;

        } catch (e) {
            console.log(e)
            console.warn('필수 매개변수(buying, options)가 지정되지 않았습니다.');
        }
    }

    /**
     * 스와이퍼 초기화
     */
    init() {
        const buyingSlide = this;
        // const wrapper = buyingSlide.options.wrapper;
        const target = buyingSlide.options.target;
        const $target = $(target);

        let options = {
            nested: true,
            slidesPerView: 1,
            loop: buyingSlide.options.loop,
            // pagination: {
            //     el: '.pt_bullet',
            //     clickable: true,
            //     bulletElement: 'button'
            // },
            lazy: true,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            on: {
                init: function () {
                    // autoplay play/pause
                    if(buyingSlide.options.autoplay){
                        const $btnPlay = $target.find('.pt_btn__play');
                        $btnPlay.addClass('pt_paused');
                        $btnPlay.off(`click.clickAutoplay${target}`).on(`click.clickAutoplay${target}`, function() {
                            const isPaused = $(this).hasClass('pt_paused');
                            if(isPaused) {
                                buyingSlide.swiper.autoplay.stop();
                                $(this).removeClass('pt_paused');
                            } else {
                                buyingSlide.swiper.autoplay.start();
                                $(this).addClass('pt_paused');
                            }
                        });
                    }
                },
                slideChange: function(){
                    const activeIndex = this.activeIndex;
                    const $activeSlide = $(this.slides[activeIndex]);
                    if($activeSlide.hasClass('pt_dark')){
                        $target.addClass('pt_dark');
                    } else {
                        $target.removeClass('pt_dark');
                    }
                },
                breakpoint: function () {
                    var _self = this;
                    setTimeout(function () {
                        _self.slideTo(0, 0);
                    }, 150);
                },
            }
        };

        if(buyingSlide.options.autoplay){
            options.autoplay = {
                enabled: true,
                delay: 3000,
                disableOnInteraction: false
            }
        }

        if(buyingSlide.options.navigation){
            options.navigation = {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        }

        buyingSlide.swiper = new Swiper($target, options);
    }

    /**
     * 스와이퍼 업데이트
     */
    update(selectedData, isOnce, useTab) {
        const buyingSlide = this;
        const imgSrc = buyingSlide.config.src;
        const slideImage = buyingSlide.config.img;
        const slideAlt = buyingSlide.config.alt;
        const slideBlind = buyingSlide.config.blind;

        let arrImg = [];
        if(selectedData){
            buyingSlide.data = selectedData;
        }
        if(useTab){
            buyingSlide.useTab = useTab.tab;
            buyingSlide.useTabOrg = useTab.tab;
            buyingSlide.isActiveTab = true;

        } else {
            if(!buyingSlide.isResize){
                buyingSlide.isActiveTab = false;
            }
        }
        let productAll = buyingSlide.getSlide().productAll;
        let slideKey = buyingSlide.getSlide().slideKey;
        let startIdx = 0;
        if(!productAll) return;
        if (!buyingSlide.data.imgSlide) {
            Object.keys(productAll).forEach(function(item){
                if(item === buyingSlide.data[slideKey]){
                        const data = productAll[item];
                        
                        if (Object.keys(data).length > 0) {
                            Object.keys(data).forEach(item => {
                                if (data[item] == "O") {
                                    arrImg.push({
                                        pcImg: imgSrc + 'ref_buying_' + slideImage[item][0],
                                        moImg: imgSrc + 'ref_buying_' + slideImage[item][1],
                                        alt: slideAlt[item],
                                        blind: slideBlind[item]
                                    });
                                }
                            });
                        }
                    
                    if(isOnce){
                        startIdx = productAll[item].startIdx ? productAll[item].startIdx : 0;
                    }
                }
            });

            arrImg.unshift({
                pcImg: buyingSlide.data.thm,
                moImg: buyingSlide.data.thm,
                alt: buyingSlide.data.sku + ' 제품 이미지',
            });
            buyingSlide.data.imgSlide = arrImg;
        } else {
            arrImg = buyingSlide.data.imgSlide
        }

        function getAltText(text){
            const jsonAlt = buyingSlide.config.alt;
            if(jsonAlt && buyingSlide.config.alt[text]){
                text = buyingSlide.config.alt[text];
            }
            return text
        }
        function getBlindText(blindTxt){
            const jsonBlind = buyingSlide.config.blind;
            let text = '<div class="blind">';            
            if (typeof blindTxt == 'string') {
                if(jsonBlind && jsonBlind[blindTxt]){

                    jsonBlind[blindTxt].forEach(function(item) {
                        text += `<p>${item}</p>`;
                    });
                } else {
                    text += `<p>${blindTxt}</p>`;
                }
            } else {
                const blind = [... blindTxt];

                blind.forEach(function(item) {
                    if(jsonBlind && jsonBlind[item]){
                        text += `<p>${jsonBlind[item]}</p>`;
                    }
                });
            }
            text += '</div>';
            
            return text
        }

        function mainSlide(){
            const $target = $(buyingSlide.options.target);
            const $mainSwiper = $target[0].swiper;
            let arrMainList = [];
            let imgBeforeSrc = '';

            if(!$mainSwiper) return;

            if(buyingSlide.options.imageFadeEffect){
                imgBeforeSrc = $target.find('.swiper-slide-active img').attr('src');
            }


            $.each(arrImg, function(idx){
                let blindTxt = '';
                if (!!this.blind) {
                    blindTxt = getBlindText(this.blind);
                }
                // const altText = getAltText(this.alt);
                arrMainList.push(`<li class="img_box swiper-slide ${this.dark === 'O' ? 'pt_dark' : ''}">
                                        <img src="${this.pcImg}" alt="${this.alt} 제품 이미지" class="m_hide" loading="lazy" />
                                        <img src="${this.moImg}" alt="${this.alt}" class="m_show" loading="lazy" />
                                      ${!!this.blind? blindTxt : ''}
                                  </li>`);
            });

            if (arrImg.length == 1) {
                $target.addClass('no_swiper');
                $mainSwiper.allowTouchMove = false;
            } else {
                $target.removeClass('no_swiper');
                $mainSwiper.allowTouchMove = true;
            }

            $mainSwiper.removeAllSlides();
            $mainSwiper.appendSlide(arrMainList);
            $mainSwiper.update();
            $mainSwiper.slideToLoop(startIdx, 0);

            if(imgBeforeSrc && buyingSlide.options.imageFadeEffect){
                let $imgBox =  $target.find('.swiper-slide-active .img_box');
                $imgBox.append('<img data-slide-effect src="' + imgBeforeSrc + '" alt="" style="position: absolute;top: 0;left: 0;"/>');
                $imgBox.find('[data-slide-effect]').stop().fadeOut(400, function() { $(this).remove() });
            }

            // api 요청 이미지로 받을 때 swiper 처음 이미지는 res값
            // const selected = buyingSlide.buying.state.selected;
            // const gCode = selected && selected.gCode;
            // const swiperFirstEle = buyingSlide.swiper.$el.find('[data-api-img]');

            // PT_STATE.service.getImage(gCode, res => {
            //     console.log(gCode, res);
            //     for(let i = 0; i < swiperFirstEle.length; i++) {
            //         swiperFirstEle[i].setAttribute('src', `https://images.samsung.com/kdp/${res}${checkDevice() == 'pc' ? '?$784_512_PNG$' : '?$720_480_PNG$'}`)
            //     }
            // });
        }
        mainSlide();
        buyingSlide.useTab = '';
    }

    /**
     * 스와이퍼 리사이즈
     */
    resize() {
        const buyingSlide = this;
        const target = buyingSlide.options.target;
        $(window).off(`resize.${target}`).on(`resize.${target}`, function(){
            const device = checkDevice();
            if(buyingSlide.deviceOrigin !== device){
                buyingSlide.isResize = true;
                if(buyingSlide.swiper){
                    $(target).find('.swiper-slide').remove();
                    $(target).find('.swiper-pagination-bullet').remove();
                    buyingSlide.swiper.destroy();
                }
                if(!!buyingSlide.getSlide().productAll){
                    buyingSlide.init();
                    buyingSlide.update();
                }
                buyingSlide.deviceOrigin = device;
                buyingSlide.isResize = false;
            }
        });
    }

    getSlide() {
        const buyingSlide = this;
        const device = checkDevice();
        let useTab = buyingSlide.useTab;
        let slideKey = '';
        let productAll = {};

        // if(buyingSlide.useTabOrg){
        //     console.info({
        //         isResize: buyingSlide.isResize,
        //         useTab: buyingSlide.useTab,
        //         useTabOrg: buyingSlide.useTabOrg,
        //         isActiveTab: buyingSlide.isActiveTab
        //     });
        // }

        if(buyingSlide.isActiveTab && buyingSlide.useTabOrg){
            useTab = buyingSlide.useTabOrg;
        }

        if(device === 'pc'){
            if(useTab) {
                slideKey = buyingSlide.config.slideKey[useTab]['pc'];
            } else {
                slideKey = buyingSlide.config.slideKey['pc'];
            }
            productAll = buyingSlide.options.imageData.pc;

        }else{
            if(useTab) {
                slideKey = buyingSlide.config.slideKey[useTab]['mobile'];
            } else {
                slideKey = buyingSlide.config.slideKey['mobile'];
            }
            productAll = buyingSlide.options.imageData.mobile;
        }

        return {
            productAll: productAll,
            slideKey: slideKey
        };
    }
}