$(document).ready(function(){

    $(function(){
        modalDialog($('.re-tip .btn-open-modal'));
    })  
    
    function modalDialog(modalOpen){
        modalOpen.off('click').on('click', function(){
            let btn = $(this),
                openModal = $('#' + btn.attr('aria-controls')),
                modalDim = openModal.prev('.modal-dim'),
                modal = openModal.find('.modal-cont'),
                closeModal = openModal.find('.btn-modal-close');
            
            $('body').addClass('-has-modal');
            modalDim.addClass('-active');
            openModal.addClass('-active').attr('aria-hidden', false);
    
            // 팝업 닫을 때 유튜브 정지
            let youtubeId = openModal.find('.video').children().attr('id');
            function youtubeStop() {
                modal.find('iframe').removeAttr('src title')
            }
    
            // 포커스 이동 함수
            function modalFocus(modalId) {
                let dialog = $(modalId).find('[role=dialog]');
                dialog.focus();
    
                let focusble = modalId.find('button, a, [tabindex="0"]');
                let focusbleFirst = focusble.eq(0);
                let focusbleLast = focusble.eq(focusble.length - 1);
                
                focusbleFirst.on('keydown', function(e){
                    let keycode = e.keyCode || e.which;
                    let tab = (e.key === 'Tab' || e.keycode === 9);
                    
                    if(e.shiftKey && tab){
                        // console.log(document.activeElement)
                        if(document.activeElement === focusbleFirst[0]){
                            // console.log('쉬프트 탭 눌렀을 때 첫번째 포커서블한 요소에 포커스가 가면')
                            e.preventDefault();
                            focusbleLast.focus();
                        }
                    }
                })
                focusbleLast.on('keydown', function(e){
                    let keycode = e.keyCode || e.which;
                    let tab = (e.key === 'Tab' || e.keycode === 9);
                    
                    if(tab){
                        // console.log(document.activeElement)
                        if(document.activeElement === focusbleLast[0]){
                            // console.log('탭 눌렀을 때 마지막 포커서블한 요소에 포커스가 가면')
                            e.preventDefault();
                            focusbleFirst.focus();
                        }
                    }
                })
            }
            modalFocus(openModal);
    
            // 닫기 버튼 함수
            function modlaClose() {
                $('body').removeClass('-has-modal');
                modalDim.removeClass('-active');
                
                openModal.removeClass('-active').attr('aria-hidden', true);
                btn.focus(); // 팝업 닫으면 열었던 버튼으로 포커스 이동
                
    
                if(openModal.find('iframe').length){
                    console.log('asdfasdf')
                    youtubeStop(); // 팝업 닫을 때 유튜브 정지
                }
    
                if(openModal.find('.dryer-search').hasClass('-active') === false){
                    $('body').addClass('-has-modal');
                }
    
                if($('#allaboutSetguide').hasClass('-active') === false){
                    $(document).off('keyup.closeModal');
                    $('body').removeClass('-has-modal');
                }
            }    
    
            // 닫기 버튼 클릭 시 팝업창 닫기
            closeModal.off('click').on('click', modlaClose);
    
            // modalDim을 클릭해도 팝업창 닫기
            modalDim.off('click').on('click', function(e){
                if(e.target === e.currentTarget){
                    modlaClose();
                }
            });
    
            // 팝업창이 열렸을 때 esc 키를 누르면 닫기
            $(document).on('keyup.closeModal', function(e){
                let keycode = e.keyCode || e.which;
                if(keycode === 27 && openModal.hasClass('-active')){
                    modlaClose();
                }
            })
    
            // 유튜브
            let youtubeLink = btn.attr("data-youtube-id");
            let youtubeUrl = 'https://youtube.com/watch?v=' + youtubeLink;
            
            $.getJSON('https://noembed.com/embed', 
                {format: 'json', url: youtubeUrl}, function(data){
                    modal.find('iframe').attr({'src': 'https://www.youtube.com/embed/' + youtubeLink, 'title': data.title})
                }
            )
        });
    };   
    
    function initHander(){
        a11yGuide(); // 팝업 안에 선택
        slickSlider(); // slick 
    }
    initHander();
    
    function slickSlider(){
        var slider = $('#slideQled8k0');
        slider.slick({
            autoplay: false,
            infinite: true,
            dots: true,
            customPaging: function(slider, i) { 
                // console.log($(slider.$slides[i]).html());
                return '<button class="tab">' + '<span class="blind">' + $(slider.$slides[i]).find('.tit').text() + '</span>' + '</button>';
            },
        })
    }
    
    function a11yGuide(){
        var body = $('body'),
            a11y = $('.a11y-guide'),
            open = a11y.find('.btn-pop-guide'),
            modalWrap = a11y.find('.modal-pop-guide');
    
        var dim = '<div class="modal-dim -hidden" data-pop-dim="dim-guide"></div>',
            focusStart = '<div role="none" data-focus="focusStart" tabindex="0"></div>',
            focusEnd = '<div role="none" data-focus="focusEnd" tabindex="0"></div>';
            
        // 접근성 초기 셋팅
        function a11yAttr(){
            a11y.append(dim);
    
            open.each(function(idx, item){
                var data = $(item).attr('data-popup-target');
    
                $(item).attr({'role':'button', 'aria-controls': data});
            });
    
            modalWrap.each(function(idx, item){
                var pc = $(item).find('.pc-guide-view'),
                    mo = $(item).find('.mo-guide-view');
                    
                pc.before(focusStart).append(focusEnd);
                mo.before(focusStart).append(focusEnd);
    
                function modalCont(modalIn){
                    var label = modalIn.attr('class'),
                        title = modalIn.find('.layer-header h2');
        
                    modalIn.attr({'role':'dialog', 'aria-modal':true, 'aria-labelledby':'label-' + label + idx, 'tabindex':0});
                    title.attr('id', modalIn.attr('aria-labelledby'));
                    modalIn.find('.nav-cont nav').attr('role', 'tablist');
        
                    modalIn.find('.nav-cont nav > a').each(function(idx, item){
                        var id = $(item).attr('href').substring(1);
                        $(item).attr({'role':'tab', 'id':'id-' + id});
        
                        if($(item).hasClass('active')){
                            $(item).attr('aria-selected','true').siblings().attr('aria-selected','false');
                        }
                    });
        
                    var tabpanel = modalIn.find('[role=tabpanel]');
    
                    tabpanel.each(function(idx, item){
                        $(item).attr('tabindex', 0);
                        if($(item).find('nav').length){
                            var nav = $(item).find('nav');
                            nav.closest('[role=tabpanel]').attr('aria-labelledby', 'id-' + nav.attr('id'));
                        }else{
                            $(item).attr('aria-labelledby', 'id-' + $(item).attr('id'));
                        }
                    })
    
                    
                }
                modalCont(pc);
                modalCont(mo);
                
            });
        }
        a11yAttr();
    
        // 팝업 열었을 때
        open.on('click', function(){
            var wind = $(window),
                $this = $(this),
                dim = a11y.find('[data-pop-dim=dim-guide]'),
                thisModal = a11y.find('#' + $this.attr('aria-controls')),
                pc = thisModal.find('.pc-guide-view'),
                mo = thisModal.find('.mo-guide-view'),
                close = a11y.find('.pc-guide-view .pop-close, .mo-guide-view .pop-close');
    
            dim.removeClass('-hidden');
            body.addClass('-has-modal');
    
            // 슬릭 리사이즈
            $('#slideQled8k0').trigger('resize');
    
            // 포커스
            if(wind.width() >= 800){
                modalFocus(thisModal, pc);
            }else{
                modalFocus(thisModal, mo);
            }
            function modalFocus(modalId, modalCont){
                // 팝업 버튼 클릭하면 dialog에 포커스
                modalId.on('focus', function(){
                    modalId.find(modalCont).focus();
                })
                
                // 닫기 버튼에서 tab을 눌렀을 때 role=dialog로 포커스 이동
                modalId.find(modalCont).find('[data-focus=focusEnd]').on('focus', function(){
                    modalId.find(modalCont).focus();
                });
    
                // role=dialog에서 shift + tab을 눌렀을 때 닫기 버튼으로 포커스 이동
                modalId.find(modalCont).prev('[data-focus=focusStart]').on('focus', function(){
                    modalId.find(modalCont).find('.pop-close').focus();
                });
            }
    
            // 닫기 버튼 클릭
            close.on('click', function(){
                dim.addClass('-hidden');
                body.removeClass('-has-modal');
                $this.focus();
    
                if(a11y.find('.popup-nec-info.active').length){
                    a11y.find('.popup-nec-info.active .pop-close').trigger('click');
                }
            });
    
            // dim 클릭
            dim.on('click', function(e){
                if(e.target === e.currentTarget){
                    close.trigger('click');
                }
            });
    
            // esc 키 눌렀을 때
            $(document).off('keyup').on('keyup.closeModal', function(e){
                var keycode = e.keycode || e.which;
    
                if(keycode == 27 && modalWrap.hasClass('active') && a11y.find('.popup-nec-info.active').length){
                    a11y.find('.popup-nec-info.active .pop-close').trigger('click');
                }else if(keycode == 27 && modalWrap.hasClass('active') && a11y.find('.popup-nec-info.active').length === 0){
                    close.trigger('click');
                }
            });
    
            // 팝업 안의 팝업
            function modalInModal(){
                var modalInDim = '<div class="modal-in-dim"></div>',
                    inFocusStart = '<div role="none" data-focus="inFocusStart" tabindex="0"></div>',
                    inFocusEnd = '<div role="none" data-focus="inFocusEnd" tabindex="0"></div>',
                    open = $('.pop-nec-info[data-popup-target]');
                    
                open.off('click').on('click', function(){
                    var open = $(this),
                        target = $('#' + open.attr('data-popup-target')),
                        dim = target.prev('.modal-in-dim'),
                        close = target.find('.pop-close');
                    
                    target.before(inFocusStart, modalInDim).append(inFocusEnd);
                    target.attr({'role':'dialog', 'aria-modal':true, 'aria-labelledby':'label-' + target.attr('id')});
    
                    // 닫기 버튼 클릭
                    close.on('click', function(){
                        target.siblings().remove('.modal-in-dim, [data-focus=inFocusStart]');
                        target.children().remove('[data-focus=inFocusEnd]');
                        open.focus();
                    });
    
                    // dim 클릭
                    $(document).on('click','.modal-in-dim',  function(e){
                        if(e.target === e.currentTarget){
                            close.trigger('click');
                        }
                    });
    
                    // 닫기 버튼에서 tab을 눌렀을 때 role=dialog로 포커스 이동
                    target.find('[data-focus=inFocusEnd]').on('focus', function(){
                        target.focus();
                    });
    
                    // role=dialog에서 shift + tab을 눌렀을 때 닫기 버튼으로 포커스 이동
                    target.prev().prev('[data-focus=inFocusStart]').on('focus', function(){
                        close.focus();
                    });
                })
    
            }
            modalInModal();
            
            // 선택함 컨트롤
            function selectControls(){
                var tab = thisModal.find('[role=tab]');
    
                tab.on('click', function(){
                    var tab = $(this),
                        panel = $(tab.attr('href'));
    
                    tab.attr('aria-selected','true').siblings().attr('aria-selected','false');
                    tab.addClass('active').siblings().removeClass('active');
                    panel.show().siblings('.set-guide-contents').hide();
    
                    if(panel.find('[role=tab].active').length){
                        panel.find('[role=tab].active').trigger('click');
                        panel.attr({'aria-hidden': false, 'tabindex': 0}).siblings('[role=tabpanel]').attr({'aria-hidden': true, 'tabindex': -1});
                    }
                });
    
                if(thisModal.find('.pc-guide-view .nav-cont').find('[role=tabpanel]').length){
                    var thisTab = $('#id-tvGuideLine0b'),
                        thisPanel = $('#tvGuideLine0b'),
                        navPanel = thisModal.find('.pc-guide-view .nav-cont').find('[role=tabpanel]');
    
                    thisTab.on('click', function(){
                        navPanel.css('visibility', 'hidden').attr({'aria-hidden': true, 'tabindex': -1});
                        navPanel.siblings('h4, .pop-nec-info').css('visibility', 'hidden').attr('aria-hidden', true);
                    });
    
                    thisTab.siblings('[role=tab]').on('click', function(){
                        navPanel.css('visibility', 'visible').attr({'aria-hidden': false, 'tabindex': 0});
                        navPanel.siblings('h4, .pop-nec-info').css('visibility', 'visible').attr('aria-hidden', false);
                    });
                }
            }
            selectControls();
    
            // 모바일 컨트롤
            function mobileTabControls(){
                var tab = mo.find('.nav-cont [role=tab]');
                tab.on('click', function(){
                    var tab = $(this);
                    $(tab.attr('href')).css({'display':'block', 'visibility':'visible', 'height':'auto'})
                    .siblings('[role=tabpanel]').css({'overflow':'hidden', 'visibility':'hidden', 'height':'0', 'background-color':'#f7f7f7'})
                })
            }
            mobileTabControls();
        });
    }
})
