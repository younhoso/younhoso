/**
 * BuyingSlide 0.0.1
 * 작성자 : Peter
 * 작성일 : 2024-01-09
 * 수정일 : 2024-01-09
 */
function checkDevice() {
    let device = 'pc';
    if($(window).outerWidth() <= 768){
        device = 'mobile';
    } 
    return device;
}

export class BuyingSlide {
    constructor(buying, options) {
        const buyingSlide = this;
        try {
            const defaults = {
                loop: true,
                autoplay: true,
                navigation: true,
                imageFadeEffect: true,
                tagHtml: '',
                useTab: '',
                useTabOrg: '',
                isActiveTab: false,
                isResize: false,
                swiper: null
            }

            buyingSlide.buying = buying;
            buyingSlide.options = defaults;

            Object.keys(options).forEach(key => {
                buyingSlide.options[key] = options[key];
            });

            buyingSlide.options.wrapper = buying.el;
            buyingSlide.origins = JSON.parse(JSON.stringify(buyingSlide.options));
            buyingSlide.deviceOrigin = checkDevice();
            buyingSlide.config = buyingSlide.options.imageData.config;

            if(buyingSlide.getSlide().productAll){
                buyingSlide.init();
            }
            buyingSlide.resize();

            return buyingSlide;

        } catch (e) {
            console.warn('필수 매개변수(buying, options)가 지정되지 않았습니다.');
        }
    }

    /**
     * 스와이퍼 초기화
     */
    init() {
        const buyingSlide = this;
        const wrapper = buyingSlide.options.wrapper;
        const target = buyingSlide.options.target;
        const $target = $(wrapper).find(target);

        let options = {
            slidesPerView: 'auto',
            loop: buyingSlide.options.loop,
            pagination: {
                el: '[data-buying-pagination]',
                clickable: true,
                bulletElement: 'button'
            },
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
                    const realIndex = this.realIndex;
                    const activeIndex = this.activeIndex;
                    const $activeSlide = $(this.slides[activeIndex]);

                    // 다크모드
                    if($activeSlide.hasClass('pt_dark')){
                        $target.addClass('pt_dark');
                    } else {
                        $target.removeClass('pt_dark');
                    }

                    // 태그 
                    if ($activeSlide.hasClass('pt_tag--included')){
                        $(wrapper).find('[data-buying-tag]').show();
                    } else {
                        $(wrapper).find('[data-buying-tag]').hide();
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
    update(slideId, isOnce, useTab, startIdxForce) {
        const buyingSlide = this;
        const imgSrc = buyingSlide.config.src;
        const tagHtml = buyingSlide.options.tagHtml;
        const wrapper = buyingSlide.options.wrapper;
        let arrImg = [];

        if(slideId){
            buyingSlide.slideId = slideId;
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
        Object.keys(productAll).forEach(function(item){
            if(item === buyingSlide.slideId[slideKey]){
                arrImg = JSON.parse(JSON.stringify(productAll[item].slide));
                if(isOnce){
                    startIdx = productAll[item].startIdx ? productAll[item].startIdx : 0;
                }
            }
        });

        const bundle = buyingSlide.slideId.skuB && buyingSlide.slideId.skuB.trim() !== '-' ? buyingSlide.slideId.skuB : null;
        if(bundle){
            Object.keys(productAll).forEach(function(item){
                if(item === bundle){
                    productAll[item].slide.forEach(function(innerItem){
                        arrImg.push(innerItem);
                    });
                    if(isOnce){
                        startIdx = productAll[item].startIdx ? productAll[item].startIdx : 0;
                    }
                }
            });
        }

        if(!!startIdxForce || startIdxForce === 0){
            startIdx = startIdxForce;
        }

        function getAltText(text){
            const jsonAlt = buyingSlide.config.alt;
            if(jsonAlt && buyingSlide.config.alt[text]){
                text = buyingSlide.config.alt[text];
            }
            return text
        }
        function getBlindText(blindTxt){
            const jsonAlt = buyingSlide.config.blind;
            let text = '<div class="blind">';            

            if (typeof blindTxt == 'string') {
                if(jsonAlt && buyingSlide.config.blind[blindTxt]){
                    text += `<p>${buyingSlide.config.blind[blindTxt]}</p>`;
                }
            } else {
                const blind = [... blindTxt];

                blind.forEach(function(item) {
                    if(jsonAlt && buyingSlide.config.blind[item]){
                        text += `<p>${buyingSlide.config.blind[item]}</p>`;
                    }
                });
            }
            text += '</div>';
            
            return text
        }

        function mainSlide(){
            const $wrapper = $(buyingSlide.options.wrapper);
            const $target = $wrapper.find(buyingSlide.options.target);
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
                const altText = getAltText(this.alt);
                const imgSize = checkDevice() == 'pc' ? '?$784_512_PNG$' : '?$720_360_PNG$';
                arrMainList.push(`<li class="swiper-slide ${this.dark === 'O' ? 'pt_dark' : ''} ${this.tag === 'O' ? 'pt_tag--included' : ''}">
                                      ${idx > 0 ? tagHtml : ''}

                                      <div class="img_box">
                                          ${this.isPdImg ? `
                                            <img src="${buyingSlide.buying.state.selected.pdImg}${imgSize}" alt="${buyingSlide.buying.state.selected.sku} 제품 이미지" loading="lazy" />
                                          ` : `
                                            <img src="${imgSrc}${this.image}" alt="${altText}" loading="lazy" />
                                          `}
                                      </div>
                                      ${!!this.blind? blindTxt : ''}
                                  </li>`);
            });

            $mainSwiper.removeAllSlides();

            if ( !!isOnce ) { 
                arrMainList.splice(0,1); // 첫번째 슬라이드 이미지 삭제
            }

            $mainSwiper.appendSlide(arrMainList);
            $mainSwiper.update();
            $mainSwiper.slideToLoop(startIdx, 0);

            if(imgBeforeSrc && buyingSlide.options.imageFadeEffect){
                let $imgBox =  $target.find('.swiper-slide-active .img_box');
                $imgBox.append('<img data-slide-effect src="' + imgBeforeSrc + '" alt="" style="position: absolute;top: 0;left: 0;"/>');
                $imgBox.find('[data-slide-effect]').stop().fadeOut(400, function() { $(this).remove() });
            }
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