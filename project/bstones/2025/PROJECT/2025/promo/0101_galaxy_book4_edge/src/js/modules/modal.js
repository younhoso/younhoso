import { PT_STATE, util as _} from './bs_common';

export const modal = {
    /** 모달오픈버튼 클릭시 dimm 처리와 모달 오픈 함수 */
    init() {
        // 스크롤 방지
        const noScroll = {
            scrollY: 0,
            add() {
                this.scrollY = window.scrollY;
                $('body').addClass('pt_no_scroll').css('top', `-${this.scrollY}px`);
            },
            remove() {
                $('body').removeClass('pt_no_scroll');
                window.scrollTo(0, this.scrollY);
            }
        }
        //모달 오픈
        PT_STATE.$PROJECT.off('.click.clickModal').on('click.clickModal', '[data-role="btnModal"]', function (e) {
            e.preventDefault();
            const data = {
                $prevfocus: [],
                opt: {
                    video: false,
                    youtube: false,
                    focus: false,
                },
            };
            const $this = $(this);
            const $target = $($this.attr('data-target'));
            const target = $this.attr('data-target');
            const $closeModal = $(`[data-role="closeModal"][data-target="${target}"]`);
            const winTop = $(window).scrollTop();
            const winHeight = $(window).outerHeight();
            const targetHeight = $target.outerHeight();
            const headerHeight = !!$('header').length ? $('header').outerHeight() : 0;
            const tabHeight = !!$('.sec_kv_tab').length ? $('.sec_kv_tab').outerHeight() : 0;
            // const bannerHeight = !!$('.ins-preview-wrapper').length ? $('.ins-preview-wrapper').outerHeight() : 0;
            const opt = $this.attr('data-option') ? JSON.parse($this.attr('data-option')) : data.opt;
            const { video = data.opt.video, youtube = data.opt.youtube, focus = data.opt.focus } = opt;
            const dimm_id = `dimm_${new Date().getTime()}`;
            // 팝업 열릴때 스크롤 방지
            noScroll.add();
            data.$prevfocus.push($this);
            // winHeight > targetHeight ? $target.css('top', winTop + (winHeight - targetHeight) / 2 - headerHeight - tabHeight) : $target.css('top', winTop);
            $target.css('top', (winHeight - targetHeight) / 2);
            focus ? $target.show().find(focus).trigger('focus') : $target.show().trigger('focus');

            //딤드 처리
            $('body').append(`<div id="${dimm_id}" class="dimm"></div>`);
            $(`#${dimm_id}`).css('z-index', +$target.css('z-index') - 1).fadeIn();
            $closeModal.attr('data-dimm', `#${dimm_id}`);
            if (!!video) {
                $target.find('video source').attr('src', video);
                $target.find('video')[0].load();
                if (!!opt.caption) {
                    $target.find('video').after('<p data-role="caption">' + opt.caption + '</p>');
                }
            }
            if (!!youtube) {
                $target
                    .find('iframe')
                    .attr('src', 'https://www.youtube.com/embed/' + youtube + '?rel=0&autoplay=1&howinfo=0&enablejsapi=1')
                    .on('load', function () {
                        this.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                    });
            }
            $target.on('keydown', function (e) {
                if ($target.is(':focus') && e.shiftKey && e.keyCode == 9) {
                    e.preventDefault();
                    $closeModal.trigger('focus');
                }
            });
            $closeModal.on('keydown', function (e) {
                if (!e.shiftKey && e.keyCode == 9) {
                    e.preventDefault();
                    $target.trigger('focus');
                }
            });

            // 모달 닫기
            PT_STATE.$PROJECT.off('click.closeModal').on('click.closeModal', '[data-role="closeModal"]', function (e) {
                e.preventDefault();
                const $this = $(this);
                const $target = $($this.attr('data-target'));
                const dimm_id = $this.attr('data-dimm');
                // 팝업 닫힐때 스크롤 방지 해제
                noScroll.remove();
                $(dimm_id).fadeOut(function () {
                    $(this).remove();
                });
                $target.hide();
                data.$prevfocus.pop().trigger('focus');
                if (!!video) {
                    $target.find('video source').attr('src', '');
                    if (!!opt.caption) {
                        $target.find('[data-role="caption"]').remove();
                    }
                }
                if (!!youtube) {
                    $target.find('iframe').attr('src', '');
                }
            });

        });

    },
    toggle(params) {

        // 텝
        _.setEventState('clickAncInModal', params);
        const dataAnchor = {
            opt: {
                speed: 500,
                scroll: [0, 0],
            },
            params: _.getEventState('clickAncInModal')
        }

        // 스크롤 방지
        const noScroll = {
            scrollY: 0,
            add() {
                this.scrollY = window.scrollY;
                $('body').addClass('pt_no_scroll').css('top', `-${this.scrollY}px`);
            },
            remove() {
                $('body').removeClass('pt_no_scroll');
                window.scrollTo(0, this.scrollY);
            }
        }

        // debounce
        function debounceEvt(e,target,fn,ms){
            let timer;
            target.on(e, function(){ 
                if (timer) {
                    clearTimeout(timer);  
                }
                timer = setTimeout(fn,ms);  
            }); 
        }

        // setTimeout
        function setTimeoutEvt(fn,ms){
            let timer;
            if (timer) {
                clearTimeout(timer);  
            }
            timer = setTimeout(fn,ms);
        };

        // modal
        function modalEvt(){
            if (!_.isMobile()){
                // console.log('pc');
    
                 //모달 오픈
                PT_STATE.$PROJECT.off('click.clickModal2').on('click.clickModal2', '[data-role="btnModal2"]', function (e) {
                    e.preventDefault();
                    const data = {
                        $prevfocus: [],
                        opt: {
                            video: false,
                            youtube: false,
                            focus: false,
                        },
                    };
                    const $this = $(this);
                    const $target = $($this.attr('data-target'));
                    const target = $this.attr('data-target');
                    const $closeModal = $(`[data-role="closeModal2"][data-target="${target}"]`);
                    const winTop = $(window).scrollTop();
                    const winHeight = $(window).outerHeight();
                    const targetHeight = $target.outerHeight();
                    const headerHeight = !!$('header').length ? $('header').outerHeight() : 0;
                    const tabHeight = !!$('.sec_kv_tab').length ? $('.sec_kv_tab').outerHeight() : 0;
                    // const bannerHeight = !!$('.ins-preview-wrapper').length ? $('.ins-preview-wrapper').outerHeight() : 0;
                    const opt = $this.attr('data-option') ? JSON.parse($this.attr('data-option')) : data.opt;
                    const { video = data.opt.video, youtube = data.opt.youtube, focus = data.opt.focus } = opt;
                    const dimm_id = `dimm_${new Date().getTime()}`;
                    data.$prevfocus.push($this);
                    // $target.css('top', '');

                    // 팝업 열릴때 스크롤 방지
                    noScroll.add();

                    winHeight > targetHeight ? $target.css('top', winTop + (winHeight - targetHeight) / 2 - headerHeight - tabHeight) : $target.css('top', winTop);
                    $target.addClass('pt_modal_on');
                    focus ? $target.find(focus).trigger('focus') : $target.trigger('focus');
                    $target.find('.pt_modal_body').scrollTop(0);
    
                    //딤드 처리
                    $('body').append(`<div id="${dimm_id}" class="dimm"></div>`);
                    $(`#${dimm_id}`).css('z-index', +$target.css('z-index') - 1).fadeIn();
                    $closeModal.attr('data-dimm', `#${dimm_id}`);
                    if (!!video) {
                        $target.find('video source').attr('src', video);
                        $target.find('video')[0].load();
                        if (!!opt.caption) {
                            $target.find('video').after('<p data-role="caption">' + opt.caption + '</p>');
                        }
                    }
                    if (!!youtube) {
                        $target
                            .find('iframe')
                            .attr('src', 'https://www.youtube.com/embed/' + youtube + '?rel=0&autoplay=1&howinfo=0&enablejsapi=1')
                            .on('load', function () {
                                this.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                            });
                    }
                    $target.on('keydown', function (e) {
                        if ($target.is(':focus') && e.shiftKey && e.keyCode == 9) {
                            e.preventDefault();
                            $closeModal.trigger('focus');
                        }
                    });
                    $closeModal.on('keydown', function (e) {
                        if (!e.shiftKey && e.keyCode == 9) {
                            e.preventDefault();
                            $target.trigger('focus');
                        }
                    });
    
                    // 모달 닫기
                    PT_STATE.$PROJECT.off('click.closeModal2').on('click.closeModal2', '[data-role="closeModal2"]', function (e) {
                        e.preventDefault();
                        const $this = $(this);
                        const $target = $($this.attr('data-target'));
                        const dimm_id = $this.attr('data-dimm');

                        // 팝업 닫힐때 스크롤 방지 해제
                        noScroll.remove();
                        
                        $(dimm_id).fadeOut(function () {
                            $(this).remove();
                        });
                        $target.removeClass('pt_modal_on');
                        $(data.$prevfocus).trigger('focus');
                        data.$prevfocus.pop();
                        if (!!video) {
                            $target.find('video source').attr('src', '');
                            if (!!opt.caption) {
                                $target.find('[data-role="caption"]').remove();
                            }
                        }
                        if (!!youtube) {
                            $target.find('iframe').attr('src', '');
                        }
                    });
    
                });
            } else {
                // console.log('mo');
    
                //모달 오픈
                PT_STATE.$PROJECT.off('click.clickModal2').on('click.clickModal2', '[data-role="btnModal2"]', function (e) {
                    e.preventDefault();
                    const data = {
                        $prevfocus: [],
                        opt: {
                            video: false,
                            youtube: false,
                            focus: false,
                        },
                    };

                    const $this = $(this);
                    const $target = $($this.attr('data-target'));
                    const target = $this.attr('data-target');
                    const $closeModal = $(`[data-role="closeModal2"][data-target="${target}"]`);
                    const winTop = $(window).scrollTop();
                    const opt = $this.attr('data-option') ? JSON.parse($this.attr('data-option')) : data.opt;
                    const { video = data.opt.video, youtube = data.opt.youtube, focus = data.opt.focus } = opt;
                    const dimm_id = `dimm_${new Date().getTime()}`;
                    // const targetData = Object.values(dataAnchor.params).filter(item => item.group === $target.attr('id'));
                    const targetData = Object.values(dataAnchor.params).filter(item => item.group === $target.attr('id'));

                    const max = targetData.length - 1;
                    data.$prevfocus.push($this);
                    $target.css('top', '');
                    $target.find('.pt_modal_body').scrollTop(0);

                    // 팝업 열릴때 스크롤 방지
                    // noScroll.add(); // 삼성닷컴 앱 스크롤 이슈 대응으로 주석 처리
                    
                    $('body').append(`<div id="${dimm_id}" class="dimm"></div>`);
                    $closeModal.attr('data-dimm', `#${dimm_id}`);
                    $(`#${dimm_id}`).css('z-index', 111).fadeIn();
                    $('[data-buying-sticky]').addClass('pt_move');

                    if ($('.pt_nav')){
                        // 바잉툴 상단 영역 펼침/닫힘에 맞게 수정 필요
                        $('.pt_nav').addClass('pt_nav_on');
                        setTimeoutEvt(function(){
                            $target.addClass('pt_modal_on');
                        }, 150);
                        setTimeoutEvt(function(){
                            focus ? $target.find(focus).trigger('focus') : $target.trigger('focus');
                            $target.removeClass('pt_modal_init');
                        }, 300);
                    } else {
                        $target.addClass('pt_modal_on');
                        focus ? $target.find(focus).trigger('focus') : $target.trigger('focus');
                        setTimeoutEvt(function(){
                            $target.removeClass('pt_modal_init');
                        }, 150);
                    }

                    if (!!video) {
                        $target.find('video source').attr('src', video);
                        $target.find('video')[0].load();
                        if (!!opt.caption) {
                            $target.find('video').after('<p data-role="caption">' + opt.caption + '</p>');
                        }
                    }
                    if (!!youtube) {
                        $target
                            .find('iframe')
                            .attr('src', 'https://www.youtube.com/embed/' + youtube + '?rel=0&autoplay=1&howinfo=0&enablejsapi=1')
                            .on('load', function () {
                                this.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                            });
                    }
                    $target.on('keydown', function (e) {
                        if ($target.is(':focus') && e.shiftKey && e.keyCode == 9) {
                            e.preventDefault();
                            $closeModal.trigger('focus');
                        }
                    });
                    $closeModal.on('keydown', function (e) {
                        if (!e.shiftKey && e.keyCode == 9) {
                            e.preventDefault();
                            $target.trigger('focus');
                        }
                    });

                    // 텝
                    const wrapper = $target.find('.pt_modal_body');
                    let wrapperTop, targetTop=[], targetBottom=[];

                    setTimeoutEvt(function(){
                        wrapperTop = wrapper.offset().top;

                        for (let i=0; i<=max; i++){ 
                            const $ancTarget = $(targetData[i].target);
                            targetTop.push($ancTarget.offset().top - wrapperTop);
                            targetBottom.push($ancTarget.offset().top - wrapperTop + $ancTarget.outerHeight());
                        }
                    },300);
                    
                    $target.find('.pt_on').append('<span class="blind pt_selected_txt">선택됨</span>');

                    PT_STATE.$PROJECT.off('click.clickAncModal').on('click.clickAncModal', '[data-role-anchor-modal]', function (e) {

                        e.preventDefault();
                        const $this = $(this);
                        const index = $this.parent().index();
                        const { target, speed = dataAnchor.opt.speed, scroll = dataAnchor.opt.scroll } = _.findItem(targetData, 'el', `[data-role-anchor-modal="${$this.attr('data-role-anchor-modal')}"]`);

                        $this.parent().addClass('pt_on').append('<span class="blind pt_selected_txt">선택됨</span>').siblings().removeClass('pt_on').find('.pt_selected_txt').remove();

                        $(target).attr('tabindex', 0);
                        $(wrapper).stop().animate({ scrollTop: targetTop[index] + _.pxToVw(scroll[0], scroll[1]) }, speed, function(){
                            $(target).focusout(function(){
                                $(target).removeAttr('tabindex');
                            });
                        });
                        $(target).focus();
                    });

                    // 텝 사용시
                    debounceEvt('scroll', wrapper, function(){
                        const sct = wrapper.scrollTop();

                        if (sct == 0){
                            // 최상단
                            $(targetData[0].el).parent().addClass('pt_on').siblings().removeClass('pt_on');
                            if (!$(targetData[0].el).siblings('.pt_selected_txt').length){
                                $(targetData[0].el).parent().append('<span class="blind pt_selected_txt">선택됨</span>').siblings().find('.pt_selected_txt').remove();
                            }
                        } else if (Math.floor(sct + wrapper.outerHeight()) > Math.floor(wrapper.children('.pt_modal_outer').outerHeight() - 10)){
                            // 최하단
                            $(targetData[max].el).parent().addClass('pt_on').siblings().removeClass('pt_on');
                            if (!$(targetData[max].el).siblings('.pt_selected_txt').length){
                                $(targetData[max].el).parent().append('<span class="blind pt_selected_txt">선택됨</span>').siblings().find('.pt_selected_txt').remove();
                            }
                        }  else {
                            for (let i=0; i<=max; i++){
                                if (sct >= targetTop[i] && sct <= targetBottom[i] - 1){
                                    $(targetData[i].el).parent().addClass('pt_on').siblings().removeClass('pt_on');
                                    if (!$(targetData[i].el).siblings('.pt_selected_txt').length){
                                        $(targetData[i].el).parent().append('<span class="blind pt_selected_txt">선택됨</span>').siblings().find('.pt_selected_txt').remove();
                                    }
                                }
                            }
                        }
                    }, 150);
    
                    // 모달 닫기
                    PT_STATE.$PROJECT.off('click.closeModal2').on('click.closeModal2', '[data-role="closeModal2"]', function (e) {
                        e.preventDefault();
                        const $this = $(this);
                        const $target = $($this.attr('data-target'));
                        const dimm_id = $this.attr('data-dimm');

                        // 팝업 닫힐때 스크롤 방지 해제
                        // noScroll.remove(); // 삼성닷컴 앱 스크롤 이슈 대응으로 주석 처리
                        
                        $(dimm_id).fadeOut(function () {
                            $(this).remove();
                        });

                        $('[data-buying-sticky]').removeClass('pt_move');
                        if ($('.pt_nav')){
                            // 바잉툴 상단 영역 펼침/닫힘에 맞게 수정 필요
                            $('.pt_nav').removeClass('pt_nav_on');
                            $target.removeClass('pt_modal_on');
                            setTimeoutEvt(function(){
                                $(data.$prevfocus).trigger('focus');
                                data.$prevfocus.pop();
                                $target.addClass('pt_modal_init');
                            }, 150);
                        } else {
                            $target.removeClass('pt_modal_on');
                            setTimeoutEvt(function(){
                                $(data.$prevfocus).trigger('focus');
                                data.$prevfocus.pop();
                                $target.addClass('pt_modal_init');
                            }, 150);
                        }
                        
                        if (!!video) {
                            $target.find('video source').attr('src', '');
                            if (!!opt.caption) {
                                $target.find('[data-role="caption"]').remove();
                            }
                        }
                        if (!!youtube) {
                            $target.find('iframe').attr('src', '');
                        }
                    });
    
                });
            }
        }
        
        // run
        modalEvt();

        // resize
        let isMobileInit = _.isMobile();
        debounceEvt('resize', $(window), function(){
            if (isMobileInit == _.isMobile()){
                return;
            } else {
                isMobileInit = _.isMobile();
                $('[data-role="closeModal2"]').trigger('click');
                modalEvt();
            }
        }, 150);

    },

};
