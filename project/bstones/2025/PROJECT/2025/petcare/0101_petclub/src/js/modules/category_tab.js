import { PT_STATE, util as _} from './bs_common';

export const category_tab = {
    init(){
        let flag = false;
        let slideLength = -1;
        let $component = $('.wrap-component');
        let $category = $('[data-compo-cate]');
        let categorySwiper = [];//각 카테고리 스와이퍼
        let cateEnd = [];//각 카테고리의 마지막 컴포넌트
        let cateLength = [];//각 카테고리의 li갯수
        let cateAnc = [];//컴포넌트 앵커이동 제어 true:앵커이동/false:탭작동 초기값 true
        let cateSwp = [];//모바일 카테고리 스와이퍼 제어 true:작동on/false:작동off 초기값 true
        let compLength = 0;
        let compSumLength = 0;
        let dataCptno = []; // 전체 콤포넌트 번호 담는 변수
        let dataCompCate = []; // 컴포넌트 구분 product-card / product-selection
        let url = location.href;

        $category.each(function(index,el){
            let $this = $(this);
            cateLength[index] = $this.find('li').length;
            $this.addClass('pt_cate' + index);
            $this.css('height', $this.find('.pt_slider_category_wrap').outerHeight());

            if($this.attr('data-anchor')){
                cateAnc[index] = $this.attr('data-anchor');
            }else{
                cateAnc[index] = 'true';
            }

            if($this.attr('data-swiper')){
                cateSwp[index] = $this.attr('data-swiper');
            }else{
                cateSwp[index] = 'true';
            }
        });

        //설정영역

        
        $category.each(function(index,el){
            let $this = $(this);

            //탭동작
            compLength += $this.find('li').length;

            if(cateAnc[index] == 'false'){
                $component.each(function(idx, item) {
                    dataCptno[idx] = $component.eq(idx).attr('data-cptno');
                    if(compSumLength <= idx && idx < compLength){

                        // 컴포넌트 번호 카테고리 버튼에 넣기
                        $this.find('li').eq(idx - compSumLength).find('a').attr('data-cptno',dataCptno[idx]);
                        let cpntNo = $this.find('li.on').find('a').attr('data-cptno');
                        dataCompCate[index] = $this.attr('data-compo-cate');

                        // 첫번째 가져오기
                        if (url.indexOf('www.samsung.com/sec') > -1) {
                            if(cpntNo){
                                if(dataCompCate[index] == "product-card"){
                                    fnGetProdCardCompGoodsList(cpntNo);
                                }else if(dataCompCate[index] == "product-selection"){
                                    fnGetProdSelectionCompGoodsList(cpntNo);
                                }
                            }
                        } 

                        $this.find('li.on').find('a').removeAttr('data-cptno');
    
                        if(idx == compSumLength){
                            $component.eq(idx).removeClass('pt_hide');
                        }else{
                            $component.eq(idx).addClass('pt_hide');
                        }
                    }
                });
            }
            compSumLength += $this.find('li').length;

            if(cateSwp[index] == 'true'){
                categorySwiper[index] = new Swiper('.pt_cate'+ (index) +' .swiper-container', {
                    allowTouchMove: true,
                    slidesPerView: 'auto',
                    observer: true,
                    observeParents: true,
                    observeSlideChildren: true,
                    breakpoints: {
                        769: {
                            allowTouchMove: false
                        }
                    },
                    on: {
                        breakpoint: function() {
                            let that = this;
                            setTimeout(function() {
                                that.slideTo(0, 0);
                            }, 150);
                        }
                    }
                });
            }else{
                $this.addClass('pt_noSwiper');
            }
        });


        let scrollMove = function() {
            let _scrollTop = $(window).scrollTop();
            compLength = 0;
            compSumLength = 0;

            $category.each(function(index,el){
                let $this = $(this);

                //카테고리 높이값 자동조절
                $this.css('height', $this.find('.pt_slider_category_wrap').outerHeight());

                //카테고리 li갯수 담기
                compLength += $this.find('li').length;

                
                //각카테고리의 마지막 컴포넌트 가져오기
                cateEnd[index] = $component.eq(compLength-1);

                // 컴포넌트 카테고리 sticky 처리
                if ($(window).scrollTop() >= $this.find('.pt_slider_category_sticky').offset().top && $(window).scrollTop() <= cateEnd[index].offset().top + cateEnd[index].outerHeight() - $this.outerHeight()) {
                    $this.find('.pt_slider_category_sticky').addClass('fixed');
                } else {
                    $this.find('.pt_slider_category_sticky').removeClass('fixed');
                }

                //컴포넌트 스크롤시 카테고리 위치 ON
                if (cateAnc[index] != 'false' && _scrollTop >= $this.offset().top && _scrollTop < cateEnd[index].offset().top + cateEnd[index].outerHeight() && !flag) {

                    _scrollTop += $this.find('.pt_slider_category_wrap').outerHeight();
                    $component.each(function(idx, item) {
                        if (idx <= slideLength) return;
                        let $item = $(item);

                        if (_scrollTop >= $item.offset().top && _scrollTop < $item.offset().top + $item.outerHeight()) {
                            $this.find('.pt_category_list').each(function() {

                                let $target = $(this).find('li').eq(idx - compSumLength);
                                if (!$target.hasClass('on')) {
                                    $target.addClass('on').siblings().removeClass('on');
                                    $this.find('.pt_category_list a').find('.selected_option').remove();
                                    $target.find('a').append('<span class="blind selected_option">선택됨</span>'); 
                                }
                            });

                            if ($(window).outerWidth() <= 768 && cateSwp[index] == 'true') {
                                categorySwiper[index].slideTo(idx - compSumLength);
                            }
                        } 
                    });
                }

                compSumLength += $this.find('li').length;

            });
        }

        $(window).on('scroll.scroll', scrollMove);


        // 컴포넌트 카테고리 이벤트(클릭시 위치이동)
        PT_STATE.$PROJECT.off('click.clickCate').on('click.clickCate', '.pt_category_list a', function(e) {
            e.preventDefault();
            let $this = $(this).closest('li');
            let click_idx = $this.index();
            let parenstName = $this.closest('.pt_category_box');
            compLength = 0;
            compSumLength = 0;
            $('.pt_category_list a').find('.selected_option').remove();
            $(this).append('<span class="blind selected_option">선택됨</span>')                

            if (!flag) {
                flag = true;

                $this.closest('.pt_slider_category_wrap').find('.pt_category_list').each(function() {
                    $(this).find('li').eq(click_idx).addClass('on').siblings().removeClass('on');
                    let cpntNo = $(this).find('li').eq(click_idx).find('a').attr('data-cptno');
                    let compCate = parenstName.attr('data-compo-cate');

                    if(cpntNo){
                        if (url.indexOf('www.samsung.com/sec') > -1) {
                            if(cpntNo){
                                if(compCate == "product-card"){
                                    fnGetProdCardCompGoodsList(cpntNo);
                                }else if(compCate == "product-selection"){
                                    fnGetProdSelectionCompGoodsList(cpntNo);
                                }
                            }
                        } 
                    }

                    $(this).find('li').eq(click_idx).find('a').removeAttr('data-cptno');
                });

                $category.each(function(index,el){
                    let $this = $(this);
                    compLength += $this.find('li').length;
                    cateEnd[index] = $component.eq(compLength-1);
    
                    if (parenstName.hasClass('pt_cate'+ index)) {
                        if(cateAnc[index] == 'false'){
                            $component.each(function(idx, item) {
                                if(compSumLength <= idx && idx < compLength){
                                    if(click_idx + compSumLength == idx){
                                        $component.eq(idx).removeClass('pt_hide');
                                    }else{
                                        $component.eq(idx).addClass('pt_hide');
                                    }
                                }
                            });
                            if ($(window).outerWidth() <= 768 && cateSwp[index] == 'true') {
                                categorySwiper[index].slideTo(click_idx);
                            }
                        }
                        let compTarget = $component.eq(click_idx + compSumLength);
                        $(compTarget).attr('tabindex', 0);
                        $('html, body').stop().animate({scrollTop:compTarget.offset().top - $this.find('.pt_slider_category_wrap').outerHeight() + 1}, 500, function(){
                            flag = false;
                            $(compTarget).focusout(function(){
                                $(compTarget).removeAttr('tabindex');
                            });
                        });
                        $(compTarget).focus();

                    }
                    compSumLength += $this.find('li').length;

                });
                
            }

            setTimeout(function () {
                $(window).resize();
                $('div.wrap-component .component-contents').css('opacity', 1);
            }, 130);

        });

        PT_STATE.$PROJECT.off('click.popupCate').on('click.popupCate', '.pt_btn_popup_category', function(e) {
            e.preventDefault();
            if ($(this).closest('.pt_slider_category_wrap').hasClass('popup')) {
                $(this).closest('.pt_slider_category_wrap').removeClass('popup');
                $(this).attr('title', '카테고리 탭 메뉴 열기').find('span.blind').text('카테고리 탭 메뉴 열기');
            } else {
                $(this).closest('.pt_slider_category_wrap').addClass('popup');
                $(this).attr('title', '카테고리 탭 메뉴 닫기').find('span.blind').text('카테고리 탭 메뉴 닫기');
            }
        });

    }
}
