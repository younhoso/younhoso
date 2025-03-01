import { PT_STATE, util as _} from './bs_common';

export const page_tab = {
    /**
     * 탭 버튼 클릭시 해당 타겟 show 하는 함수
     * @param {object} params {'target': str, 'default': num}
     * @desc target : 해당 타켓
     * @desc default : 화면 로드 시 초기 액티브 index
     */
    showContent(key) {
        $('.wrap-component').removeClass('pt_page_hide');

        $(`[data-page-content]`).each((idx, item) => {
            const $this = $(item);

            ($this.attr('data-page-content') == key) ? $this.removeClass('pt_page_hide') : $this.addClass('pt_page_hide');

            if ($this.find('.pt_component_tab').length > 0 && $this.attr('data-page-content') != key) {
                const $comp = $this.closest('.sec_project_wrap').nextAll('.wrap-component');
                const compLength = $this.find('.pt_component_tab .pt_slider_category_sticky a').length;

                for (let i = 0; i < compLength; i++) {
                    $comp.eq(i).addClass('pt_page_hide');
                }
            }
        });
    },
    init(params) {
        const $tabBtn = PT_STATE.$PROJECT.find('[data-page-tab].on');
        const defaultKey = $tabBtn.attr('data-page-tab');

        //탭 클릭시 타겟 show
        PT_STATE.$PROJECT.off('click.clickPageTab').on('click.clickPageTab', '[data-page-tab]', function (e) {
            e.preventDefault();
            const $this = $(this);

            if($this.hasClass('on')) return;

            const tagetKey = $this.attr('data-page-tab');

            page_tab.showContent(tagetKey);

            //a11y
            $this.siblings().find('.selected_option').remove();
            $this.addClass('on').siblings().removeClass('on');
            $this.append('<span class="blind selected_option">선택됨</span>');
            
            // if(firstPass === false){ //처음 접속시 포커스 제거
            //     $(target).attr('tabindex', 0);
            //     data.params.forEach(function(item, index){
            //         if(item.el === $tabTarget){
            //             // 앵커이동
            //             if(item.anc === true){ 
            //                 $('html, body').stop().animate({scrollTop:$(target).offset().top - $($tabTarget).outerHeight() }, 500, function(){
            //                     $(target).focusout(function(){
            //                         $(target).removeAttr('tabindex');
            //                     });
            //                 });
            //             }else{
            //                 $(target).focusout(function(){
            //                     $(target).removeAttr('tabindex');
            //                 });
            //             }
            //         }
            //     });
            //     $(target).focus();
            // }

            // if(_idx === 'all'){
            //     $(target).each((idx, item) => {
            //         $(item).children().show();
            //     })
            //     return;
            // }

            // $(target).each((idx, item) => {
            //     $(item).children().eq(_idx).show().siblings().hide();
            // })

        });

        //초기값 제외 hide 처리
        // Object.values(data.params).forEach((item, idx) => {
        //     const { el, default: _index = 0 } = item;

        //     $(el).children().eq(_index).trigger('click');

        //     if(idx === Object.values(data.params).length-1){
        //         firstPass = false;
        //     }
        // });

        this.showContent(defaultKey);

    },
};