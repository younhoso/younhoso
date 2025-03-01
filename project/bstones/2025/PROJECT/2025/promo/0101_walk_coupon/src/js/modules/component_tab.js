import { PT_STATE, util as _} from './bs_common';

export const component_tab = {
    init(){

        //기본값
        let flag = false;
        let $component = $('[data-cptno]'); // 컴포넌트 
        let $category = $('[data-compo-cate]'); // 카테고리
        let categorySwiper = []; //각 카테고리 스와이퍼
        let cateEnd = []; //각 카테고리의 마지막 컴포넌트
        let cateSwp = []; //모바일 카테고리 스와이퍼 제어 true:작동on/false:작동off 초기값 true
        let cateSticky = []; //컴포넌트 스티키 제어 true:스티키/false:스티키 제거 초기값 true
        let dataCompCate = []; // 컴포넌트 호출함수 구분 product-card / product-selection
        let dataCptno = []; // 전체 콤포넌트 번호 담는 변수
        let compFirst = []; // 스크롤로 자기영역 위치시 카테고리의 ".on"위치의 컴포넌트만 불러오기 할때 사용. 처음 한번만 실행됨
        let compLength = 0;
        let compSumLength = 0;
        let url = location.href;
        let _scrollTop = $(window).scrollTop();

        $category.each(function(index,el){
            let $this = $(this);
            $this.addClass('pt_comp_cate' + index);
            $this.css('height', $this.find('.pt_slider_category_wrap').outerHeight());

            compFirst[index] = true;

            if($this.attr('data-swiper')){
                cateSwp[index] = $this.attr('data-swiper');
            }else{
                cateSwp[index] = 'true';
            }

            if($this.attr('data-sticky')){
                cateSticky[index] = $this.attr('data-sticky');
            }else{
                cateSticky[index] = 'true';
            }

        });

        //설정영역
        $category.each(function(index,el){
            let $this = $(this);
            let cateActive = $this.find('li').closest('.on').index();

            //탭동작
            compLength += $this.find('li').length;

            $component.each(function(idx, item) {
                dataCptno[idx] = $component.eq(idx).attr('data-cptno');
                if(compSumLength <= idx && idx < compLength){
                    // 컴포넌트 번호 카테고리 버튼에 넣기
                    $this.find('li').eq(idx - compSumLength).find('a').attr('data-cpntnum',dataCptno[idx]);
                }
            });

            $component.each(function(idx, item) {
                if(compSumLength <= idx && idx < compLength){
                    if(idx == compSumLength + cateActive){
                        $component.eq(idx).removeClass('pt_hide');
                    }else{
                        $component.eq(idx).addClass('pt_hide');
                    }
                }
            });
            compSumLength += $this.find('li').length;

            // 스크롤이 해당영역 위치시 컴포넌트 호출
            if (_scrollTop >= $this.find('.pt_slider_category_sticky').offset().top - $(window).height() ) {
                console.log(_scrollTop >= $this.find('.pt_slider_category_sticky').offset().top - $(window).height());
                if(compFirst[index] == true){
                    // 첫번째 컴포넌트 가져오기
                    let cpntNum = $this.find('li.on').find('a').attr('data-cpntnum');
                    dataCompCate[index] = $this.attr('data-compo-cate');

                    if (url.indexOf('www.samsung.com/sec') > -1 ) {
                        if(cpntNum){
                            if(dataCompCate[index] == "product-card"){
                                fnGetProdCardCompGoodsList(cpntNum);
                            }else if(dataCompCate[index] == "product-selection"){
                                fnGetProdSelectionCompGoodsList(cpntNum);
                            }
                        }
                    } 
                    $this.find('li.on').find('a').removeAttr('data-cpntnum');
                    compFirst[index] = false;
                }
            }
            
        });

        function resizeSwiper() {
            $category.each(function(index,el){
                let $this = $(this);
                if(cateSwp[index] == 'true'){
                    categorySwiper[index] = new Swiper('.pt_comp_cate'+ (index) +' .swiper-container', {
                        allowTouchMove: true,
                        slidesPerView: 'auto',
                        watchOverflow : true, // 다음슬라이드가 없을때 pager, button 숨김 여부 설정
                        observer: true,
                        observeParents: true,
                        observeSlideChildren: true,
                        breakpoints: {
                            769: {
                                allowTouchMove: false
                            }
                        },
                        on: {
                            init : function () {
                                $this.removeClass('pt_noSwiper');
                                // 슬라이드를 안해도 될때 자동으로 체크
                                if(this.isLocked == true){
                                    $this.addClass('pt_noSwiper');
                                }
                            },
                            // breakpoint: function() {
                            //     let that = this;
                            //     setTimeout(function() {
                            //         that.slideTo(0, 0);
                            //     }, 150);
                            // }
                        }
                    });
                }else{
                    $this.addClass('pt_noSwiper');
                }
            });
        }
        resizeSwiper();

        let resizeTimer = null;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resizeSwiper, 400);
        }, false);


        let scrollMove = function() {
            _scrollTop = $(window).scrollTop();
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

                // 스크롤시 해당영역 컴포넌트 호출
                if (_scrollTop >= $this.find('.pt_slider_category_sticky').offset().top - $(window).height() ) {
                    if(compFirst[index] == true){
                        // 첫번째 컴포넌트 가져오기
                        let cpntNum = $this.find('li.on').find('a').attr('data-cpntnum');
                        dataCompCate[index] = $this.attr('data-compo-cate');
    
                        if (url.indexOf('www.samsung.com/sec') > -1 ) {
                            if(cpntNum){
                                if(dataCompCate[index] == "product-card"){
                                    fnGetProdCardCompGoodsList(cpntNum);
                                }else if(dataCompCate[index] == "product-selection"){
                                    fnGetProdSelectionCompGoodsList(cpntNum);
                                }
                            }
                        } 
                        $this.find('li.on').find('a').removeAttr('data-cpntnum');
                        compFirst[index] = false;
                    }
                }

                // 컴포넌트 카테고리 sticky 처리
                if (cateSticky[index] != 'false' && _scrollTop >= $this.find('.pt_slider_category_sticky').offset().top - _.pxToVw(60, 204) && _scrollTop <= cateEnd[index].offset().top - _.pxToVw(60, 204) + cateEnd[index].outerHeight() - $this.outerHeight()) {
                    $this.find('.pt_slider_category_sticky').addClass('fixed');
                } else {
                    $this.find('.pt_slider_category_sticky').removeClass('fixed');
                }

            });
        }

        $(window).on('scroll.scroll', scrollMove);


        // 컴포넌트 카테고리 이벤트(클릭시 위치이동)
        PT_STATE.$PROJECT.off('click.compClickCate').on('click.compClickCate', '[data-compo-cate] .pt_category_list a', function(e) {
            e.preventDefault();
            let $this = $(this).closest('li');
            let click_idx = $this.index();
            let parenstName = $this.closest('[data-compo-cate]');
            let _parenstScrollTop = parenstName.offset().top

            _scrollTop = $(window).scrollTop();
            compLength = 0;
            compSumLength = 0;
            $('.pt_category_list a').find('.selected_option').remove();
            $(this).append('<span class="blind selected_option">선택됨</span>')                

            if (!flag) {
                flag = true;

                $this.closest('.pt_slider_category_wrap').find('.pt_category_list').each(function() {
                    $(this).find('li').eq(click_idx).addClass('on').siblings().removeClass('on');

                    let cpntNum = $(this).find('li').eq(click_idx).find('a').attr('data-cpntnum');
                    let compCate = parenstName.attr('data-compo-cate');
                    if(cpntNum){
                        if (url.indexOf('www.samsung.com/sec') > -1 ) {
                            if(cpntNum){
                                if(compCate == "product-card"){
                                    fnGetProdCardCompGoodsList(cpntNum);
                                }else if(compCate == "product-selection"){
                                    fnGetProdSelectionCompGoodsList(cpntNum);
                                }
                            }
                        } 
                    }
                    $(this).find('li').eq(click_idx).find('a').removeAttr('data-cpntnum');

                });

                $category.each(function(index,el){
                    let $this = $(this);
                    compLength += $this.find('li').length;
                    // cateEnd[index] = $component.eq(compLength-1);
    
                    if (parenstName.hasClass('pt_comp_cate'+ index)) {
                        $component.each(function(idx, item) {
                            if(compSumLength <= idx && idx < compLength){
                                if(click_idx + compSumLength == idx){
                                    $component.eq(idx).removeClass('pt_hide');
                                    $component.eq(idx).find('.component-contents').css('opacity', 0);
                                }else{
                                    $component.eq(idx).addClass('pt_hide');
                                }
                            }
                        });

                        if ($(window).outerWidth() <= 768 && cateSwp[index] == 'true') {
                            categorySwiper[index].slideTo(click_idx);
                        }
                        
                        
                        let compTarget = $component.eq(click_idx + compSumLength);
                        $(compTarget).attr('tabindex', 0);

                        // 컴포넌트 영역 위쪽에서 클릭했을때만 애니메이션 이동
                        if(_scrollTop < _parenstScrollTop){
                            $('html, body').stop().animate({scrollTop:compTarget.offset().top - $this.find('.pt_slider_category_wrap').outerHeight() / 1.01- _.pxToVw(60, 34)}, 500, function(){
                                $(compTarget).focusout(function(){
                                    $(compTarget).removeAttr('tabindex');
                                });
                            });
                        }else{
                            $('html, body').stop().animate({scrollTop:compTarget.offset().top - $this.find('.pt_slider_category_wrap').outerHeight() / 1.01- _.pxToVw(60, 34)}, 1, function(){
                                $(compTarget).focusout(function(){
                                    $(compTarget).removeAttr('tabindex');
                                });
                            });
                        }
                        $(compTarget).focus();

                        flag = false;

                    }
                    compSumLength += $this.find('li').length;

                });
                
            }

            setTimeout(function () {
                $(window).resize();
                $('div.wrap-component .component-contents').animate({opacity: '1'}, 300);
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
