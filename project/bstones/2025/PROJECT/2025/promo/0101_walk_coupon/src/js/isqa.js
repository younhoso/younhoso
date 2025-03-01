(function() {
    'use strict';

    const $window = $(window);
    const $secWrap = $('.sec_project_wrap');

    const UTIL = {
        isQA: function(){
            return (location.href.indexOf("preview") > -1) || (location.href.indexOf("output/local") > -1);
        },
        getParameterByName: function(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    }
    const tooltip = {
        omniLoad: function () {
            const $target = $('#pt_omni_analyze_modal .pt_omni_list')
            $target.html('');
            $secWrap.find('[data-omni]').each(function(idx){
                if ($(this).closest('.swiper-slide').hasClass('swiper-slide-duplicate')) return;
                const omni = $(this).attr('data-omni');
                const omniData = omni === '' ? `옵니값 없음 [${$(this).text().replace('선택됨', '').trim()}]` : omni;
                $target.append(`<li class="item item${idx} ${omni === '' ? 'null' : ''}"><input type="checkbox" ${omni ==='' ? 'checked' : ''}><span class="pt_desc">${omniData}</span></li>`);
                $target.find(`li.item${idx}`)[0].target = this;
            })
        },

        imgLoad: function () {
            const $target = $('#pt_omni_analyze_modal .pt_img_list')
            $target.html('');
            $secWrap.find('img').each(function(idx){
                if ($(this).closest('.swiper-slide').hasClass('swiper-slide-duplicate')) return;
                const alt = $(this).attr('alt');
                const altData = alt === '' || alt === undefined ? `ALT 없음 [${$(this).attr('src')}]` : alt;
                $target.append(`<li class="item item${idx} ${alt === '' || alt === undefined ? 'null' : ''}"><input type="checkbox" ${alt === '' || alt === undefined ? 'checked' : ''}><div class="pt_img_box"><img src="${$(this).attr('src')}" draggable="false"></div><span class="pt_desc">${altData}</span></li>`);
                $target.find(`li.item${idx}`)[0].target = this;
            })
        },

        titleLoad: function () {
            const $target = $('#pt_omni_analyze_modal .pt_title_list')
            $target.html('');
            $secWrap.find('a').each(function(idx){
                if ($(this).closest('.swiper-slide').hasClass('swiper-slide-duplicate')) return;
                console.log(this)
                const title = $(this).attr('title');
                const titleData = title === '' || title === undefined  ? `타이틀 없음 [${$(this).text().replace('선택됨', '').trim()}]` : title;
                $target.append(`<li class="item item${idx} ${title === '' || title == undefined  ? 'null' : ''}"><input type="checkbox" ${title === '' || title == undefined ? 'checked' : ''}><span class="pt_desc">${titleData}</span></li>`);
                $target.find(`li.item${idx}`)[0].target = this;
            })
        },

        createOmniListPopup: function () {
            const _omni = UTIL.getParameterByName('omni') == 'true' ? true : false
            const _img = UTIL.getParameterByName('img') == 'true' ? true : false
            const _title = UTIL.getParameterByName('title') == 'true' ? true : false
            const navOmni = _omni ?
                `<div class="pt_nav_btn pt_omni">
                    <p>OMNI</p>
                </div>`
                : ''
            const bodyOmni = _omni ?
                `<div class="pt_body_box pt_omni">
                    <ul class="pt_omni_list"></ul>
                    <div class="pt_modal_alert">
                        <div class="pt_alert_inner"></div>
                    </div>
                </div>`
                : ''
            const navImg = _img ?
                `<div class="pt_nav_btn pt_img">
                    <p>IMG</p>
                </div>`
                : ''
            const bodyImg = _img ?
                `<div class="pt_body_box pt_img">
                    <ul class="pt_img_list"></ul>
                    <div class="pt_modal_alert">
                        <div class="pt_alert_inner"></div>
                    </div>
                </div>`
                : ''
            const navTitle = _title ?
                `<div class="pt_nav_btn pt_title">
                    <p>TITLE</p>
                </div>`
                : ''
            const bodyTitle = _title ?
                `<div class="pt_body_box pt_title">
                    <ul class="pt_title_list"></ul>
                    <div class="pt_modal_alert">
                        <div class="pt_alert_inner"></div>
                    </div>
                </div>`
                : ''

            $('body').append(`<div id="pt_omni_analyze_modal">
                <div class="pt_modal_header">
                    <div class="pt_btn_box">
                        <a href="javascript:;" class="pt_btn_round pt_btn_min" data-text="최소화"><span class="blind">최소화</span></a>
                        <a href="javascript:;" class="pt_btn_round pt_btn_refresh" data-text="새로고침"><span class="blind">새로고침</span></a>
                        <a href="javascript:;" class="pt_btn_round pt_btn_save" data-text="저장"><span class="blind">저장</span></a>
                    </div>
                    <div class="pt_modal_title"></div>
                    <input type="range" min="1" max="10" value="9" class="pt_btn_range pt_btn_opacity">
                </div>
                <div class="pt_modal_nav">
                    ${navOmni}
                    ${navImg}
                    ${navTitle}
                </div>
                <div class="pt_modal_body">
                    ${bodyOmni}
                    ${bodyImg}
                    ${bodyTitle}
                </div>
            </div>`);

            const $el = $('#pt_omni_analyze_modal');

            function modalAlert(txt){
                $el.find('.pt_alert_inner').text(txt)
                $el.find('.pt_modal_alert').finish().fadeIn(300).delay(1000).fadeOut(800);
            }

            $el.draggable({containment: 'body', scroll:false}).resizable();

            $el.find('.pt_nav_btn').on('click', function(e) {
                const thisClass = this.classList[1]
                $el.find('.pt_body_box').hide()
                $el.find(`.pt_body_box.${thisClass}`).show()
            });

            $el.find('.pt_btn_opacity').on('input', function(e) {
                $el.css('opacity', e.target.value/10);
            });

            $el.find('.pt_btn_min').on('click', function(e) {
                $el.toggleClass('toggle');
            });

            $el.find('.pt_btn_refresh').on('click', function(e) {
                tooltip.omniLoad();
                tooltip.imgLoad();
                tooltip.titleLoad();
            });

            $el.find('.pt_btn_save').on('click', function(e) {
                let textList = '';
                let emptyList = '';
                let omniNullNum = 0;
                let imgNullNum = 0;
                let titleNullNum = 0;
                const tempArea = document.createElement("textarea");

                document.body.appendChild(tempArea);
                $el.find('input:checked').each(function(){
                    const text = $(this).closest('.item').find('.pt_desc').text();
                    if(text.indexOf('옵니값 없음') > -1){
                        emptyList += text + '\n';
                        omniNullNum = omniNullNum + 1;
                    } else if(text.indexOf('타이틀 없음') > -1) {
                        emptyList += text + '\n';
                        titleNullNum = titleNullNum + 1;
                    } else if(text.indexOf('ALT 없음') > -1) {
                        emptyList += text + '\n';
                        imgNullNum = imgNullNum + 1;
                    } else {
                        textList += text + '\n';
                    }
                })
                textList += emptyList;
                textList += '옵니값 없음(전체) : ' + omniNullNum + '\n';
                textList += 'ALT 없음(전체) : ' + imgNullNum + '\n';
                textList += '타이틀 없음(전체) : ' + titleNullNum;
                tempArea.value = textList;
                tempArea.select();
                document.execCommand("copy");
                document.body.removeChild(tempArea);
                modalAlert('클립보드에 저장되었습니다.');
            });

            $el.find('.pt_btn_round').on('mouseover', function (e) {
                const $self = $(this);
                const target = $('.pt_modal_title');
                const dataText = $self.attr('data-text');
                target.text(dataText);
            });

            $el.find('.pt_btn_round').on('mouseout', function (e) {
                const target = $('.pt_modal_title');
                target.text('');
            });



            function anchor(){
                const $self = $(this);
                const $target = $(this.target);
                const isLabel = $target.attr('for');

                // if ($self.hasClass('null')) return;

                $self.addClass('active').siblings().removeClass('active');

                if ($target.closest('.swiper-container').length > 0){
                    const idx = $target.closest('.swiper-slide').index();
                    $target.closest('.swiper-container')[0].swiper.autoplay.stop();
                    $target.closest('.swiper-container')[0].swiper.slideTo(idx, 0);
                }

                if (isLabel) {
                    $target.click();
                } else {
                    $target.focus();
                }

                if(!$target.is(":visible")){
                    modalAlert('현재 화면에 없습니다.');
                }
            }

            $el.on('click', '.pt_omni_list .item', anchor);
            $el.on('click', '.pt_title_list .item', anchor);
        },
        createTooltip: function () {
            $('body').append('<div id="pt_tooltip"></div>');

            const $el = $('#pt_tooltip');

            $secWrap.on('mouseover focus click', 'a', function (e) {
                const $self = $(this);
                const pos = $self.offset();
                const omni = $self.attr('data-omni');
                const title = $self.attr('title');
                const tooltipHeight = $el.outerHeight() + 10;
                let tooltipTop = pos.top - 10;

                if (pos.top - $window.scrollTop() < tooltipHeight) {
                    $el.addClass('active');
                    tooltipTop = pos.top + $self.outerHeight() + tooltipHeight
                } else {
                    $el.removeClass('active');
                }

                $el.css({
                    'top': tooltipTop,
                    'left': pos.left + $self.outerWidth()/2
                   })
                   .html(omni === '' || omni === undefined || title === '' || title === undefined ? '해당 값이 없음' : omni)
                   .show();
            });
        },

        removeDisabled: function() {
            $('[disabled]').each(function() {
               $(this).removeAttr('disabled').css('pointer-events', 'auto');
            });
        },

        init: function() {
            const omni = UTIL.getParameterByName('omni') == 'true'
            const img = UTIL.getParameterByName('img') == 'true'
            const title = UTIL.getParameterByName('title') == 'true'

            if ((omni || img || title) && UTIL.isQA()) {
                (omni || title) && this.createTooltip();
                this.createOmniListPopup();
                omni && this.omniLoad();
                img && this.imgLoad();
                title && this.titleLoad();
                this.removeDisabled();
                const $el = $('#pt_omni_analyze_modal');
                $el.find('.pt_nav_btn')[0].click()
            }

        }
    }

    tooltip.init();

})();