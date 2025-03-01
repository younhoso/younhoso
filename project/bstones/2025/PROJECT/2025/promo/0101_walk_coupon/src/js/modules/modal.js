import { PT_STATE, util as _} from './bs_common';

export const modal = {
    /** 모달오픈버튼 클릭시 dimm 처리와 모달 오픈 함수 */
    init() {
        
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

            data.$prevfocus.push($this);
            winHeight > targetHeight ? $target.css('top', winTop + (winHeight - targetHeight) / 2 - headerHeight - tabHeight) : $target.css('top', winTop);
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

    }
};
