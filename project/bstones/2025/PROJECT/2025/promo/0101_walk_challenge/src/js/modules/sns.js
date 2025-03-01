import { PT_STATE, util as _} from './bs_common';

export const sns = {
    init(){
        if(Kakao && !Kakao.isInitialized()){
            Kakao.init("5880e4317936087f2764a5d340e6bca6");
            // Kakao.init("35647808cacf0c6d5840b49519b145f2"); 갤캠
        }
        function shareSns(url, title, image, desc){
            if (url == null || url == "") url = document.location.href;
            const setting = {
                objectType: "feed",
                content: {
                    title: title,
                    description: desc,
                    imageUrl: image,
                    link: {
                        mobileWebUrl: url,
                        webUrl: url
                    }
                },
                buttons: [{
                    title: "챌린지 참여하기",
                    link: {
                        mobileWebUrl: url,
                        webUrl: url
                    }
                }],
                installTalk: true,
                fail: shareFail
            };
            Kakao.Link.sendDefault(setting)
        }
        function shareFail() {
            const alertData = {
                title: "alert",
                content: "카카오톡 공유하기 기능을 실행할 수 없는 환경입니다."
            };
            commonAlert(alertData);
            openLayer("commonAlert")
        }
        PT_STATE.$PROJECT.on('click', '[data-role="btnSns"]', function (e) {
            e.preventDefault();
            const $this = $(this);
            const type = $this.attr('data-sns-type');
            const url = $this.attr('data-sns-url') || $('meta[property="og:url"]').attr('content');
            const title = $this.attr('data-sns-title') || $('meta[property="og:title"]').attr('content');
            const desc = $this.attr('data-sns-desc') || $('meta[property="og:description"]').attr('content');
            const img = $this.attr('data-sns-img') || $('meta[property="og:image"]').attr('content');
    
            if (type === 'fb') { // 페이스북
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}?menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=800,height=650`);
            } else if (type === 'blog' || type ==='cafe') { // 네이버블로그
                window.open(`http://share.naver.com/web/shareView.nhn?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=800,height=650`);
            } else if (type === 'insta') {
                window.open('https://www.instagram.com/');
            } else if (type === 'kakao') {
                shareSns(url, title, img, desc);
            }
        });
    }
}
