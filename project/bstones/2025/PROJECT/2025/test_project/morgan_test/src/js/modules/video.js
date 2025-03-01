import {PT_STATE, util as _} from './bs_common';

export const video = {
    init(params) {
        _.setEventState('video', params);

        const data = {
            opt: {
                video: false,
                youtube: false,
            },
            params: _.getEventState('video')
        };

        PT_STATE.$PROJECT.on('click', '[data-role-video]', function(e) {
            e.preventDefault();
            const $this = $(this);
            const { target, video = data.opt.video, youtube = data.opt.youtube } = _.findItem(data.params, 'el', `[data-role-video="${$this.attr('data-role-video')}"]`);
            const $target = $(target);

            $target.addClass('on');

            if(video) {
                $target.find('source').attr('src', video);
                $target[0].load();
            }

            if (youtube) {
                $target
                    .attr('src', 'https://www.youtube.com/embed/' + youtube + '?rel=0&autoplay=1&howinfo=0&enablejsapi=1')
                    .on('load', function() {
                    this.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                });
            }
        });
    }
}

function videoEvent($video) {
    $video.find('source').attr('src', $video.attr('data-video').split('|')[ _.isMobile() ? 1 : 0 ]);
    $video.trigger('load');
}

function resizeEvent($video) {
    const _src = $video.attr('data-video').split('|')[ _.isMobile() ? 1 : 0 ];
    const _thisSrc = $video.find('source').attr('src');

    if (_src !== _thisSrc) {
        videoEvent($video);
        $video.removeClass('on');
    }
}

export const videoKv = {
    init(params) {
        _.setEventState('videoKv', params);

        const {target, maxCount} = params;
        const $video = $(target);
        let count = 1;
        videoEvent($video);

        $video.on('loadedmetadata', function() {
            $video.addClass('on');
        });

        $video.on('ended', function() {
            maxCount ?? this.play();
            if (count < maxCount) {
                count++;
                this.play();
            }else{
                count === maxCount && $video.removeClass('on');
            }
        });

        $(window).on('resize.video', function() {
            let resizeTimer;

            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                resizeEvent($video);
            });
        });
    }
}