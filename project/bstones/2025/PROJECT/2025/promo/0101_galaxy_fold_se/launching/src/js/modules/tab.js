import { PT_STATE, util as _ } from './bs_common';

export const tab = {
    /**
     * 탭 버튼 클릭시 해당 타겟 show 하는 함수
     * @param {object} params {'target': str, 'default': num}
     * @desc target : 해당 타켓
     * @desc default : 화면 로드 시 초기 액티브 index
     */
    click(params) {
        _.setEventState('clickTab', params);

        let firstPass = true;

        const data = {
            params: _.getEventState('clickTab')
        };

        //탭 클릭시 타겟 show
        PT_STATE.$PROJECT.off('click.clickTab').on('click.clickTab', '[data-role-tab] > a', function (e) {
            e.preventDefault();
            const $this = $(this);

            if ($this.hasClass('active')) return;

            const $parent = $this.closest('[data-role-tab]');
            const $tabTarget = `[data-role-tab="${$parent.attr('data-role-tab')}"]`;
            const { target } = _.findItem(data.params, 'el', $tabTarget);
            const _idx = $this.attr('data-tab-idx');
            const _tabIndex = PT_STATE.$PROJECT.find('[data-tab-idx="0"]');

            //a11y
            $parent.find('.selected_option').remove();
            $this.addClass('active').siblings().removeClass('active');
            $this.append('<span class="blind selected_option">선택됨</span>');

            if(firstPass === false){ //처음 접속시 포커스 제거
                $(target).attr('tabindex', 0);
                data.params.forEach(function(item, index){
                    if(item.el === $tabTarget){
                        console.log($(target).offset().top);
                        console.log($($tabTarget).offset().top);
                        // 앵커이동
                        if(item.anc === true){ 
                            $('html, body').stop().animate({scrollTop:$($tabTarget).offset().top - _.pxToVw(20, 20)}, 500, function(){
                                $(target).focusout(function(){
                                    $(target).removeAttr('tabindex');
                                });
                            });
                        }else{
                            $(target).focusout(function(){
                                $(target).removeAttr('tabindex');
                            });
                        }
                    }
                });
                $(target).focus();
            }

            if (_idx === 'all') {
                $(target).each((idx, item) => {
                    $(item).children().show();
                })
                return;
            }

            $(target).each((idx, item) => {
                $(item).children().eq(_idx).show().siblings().hide();
            })


             // x버튼 누를때 탭 초기화
             function resetTab() {
                const closeBtn = $('.layer_close');
                closeBtn.on('click', function() {

                    if (_idx != 0) {
                        _tabIndex.trigger('click');
                    }
                })
            }
            
            // 탭 누를때마다 동영상 초기화
            // function resetVideo() {
            //     const getVideo = PT_STATE.$PROJECT.find('#pt_popup_video');
            
            //     if (!!getVideo.hasClass('on')) {
            //         getVideo.removeClass('on')
            //         getVideo[0].currentTime = 0
            //         getVideo[0].pause();
                
            //     }
            // }

            // 링 라이브페이지, 로컬페이지 체크 유무 
            // if (url.indexOf('galaxy-ring/buy') > -1 || url.indexOf('http://localhost:4441/') > -1) {
            //     resetTab();
            //     resetVideo();
            // } 


            resetTab();



        });

        //초기값 제외 hide 처리
        Object.values(data.params).forEach((item, idx) => {
            const { el, default: _index = 0 } = item;

            $(el).children().eq(_index).trigger('click');

            if (idx === Object.values(data.params).length - 1) {
                firstPass = false;
            }
        });
    },
};