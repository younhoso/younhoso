export const PT_STATE = {
    $PROJECT: $('.sec_project_wrap'),
    eventState: {},
};

//  * @todo 해야 하는일
//  * @example <caption>Example usage of method1.</caption>
//  * returns 2
//  * globalNS.method1(5, 10);
//  * @deprecated [더이상 사용되지 않는 기능 버전 0.1]
//  * @version 0.1

export const util = {
    /**
     * 해당 화면이 768 미만이면 true 리턴
     * @returns boolean
     */
    isMobile() {
        return $(window).outerWidth() <= 768;
    },

    /**
     * ',' 추가 함수 ex) 9999 => 9,999
     * @param {number} numberStr
     */
    addComma(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    /**
     * ',' 제거 함수 ex) 9,999 => 9999
     * @param {string} numberStr
     */
    removeComma(num) {
        return +num.replace(/,/g, '');
    },

    /**
     * pc 1440, mo 720 기준으로 px값을 vw값으로 변환
     * @param {number} pc pc 픽셀 값
     * @param {number} mo mo 픽셀 값, 인자 값이 없을경우 pc 픽셀 값으로 계산
     */
    pxToVw(pc, mo) {
        const winWidth = $(window).outerWidth();
        const divide = util.isMobile() ? 720 : 1440;
        const pixel = util.isMobile() ? (mo === undefined ? pc : mo) : pc;
        return pixel >= 0 ? Math.min(pixel, (pixel / divide) * winWidth) : Math.max(pixel, (pixel / divide) * winWidth);
    },

    /**
     * makeAlert이 정의가 되어 있으면 makeAlert 함수 호출
     * @param {string} message
     */
    alert: function(message) {
        typeof makeAlert == 'function' ? makeAlert(message) : alert(message);
    },

    /**
     * 현재 주소의 파리미터 값 '=' 뒤에 텍스트 리턴 함수 ex) ?name=value
     * @param {string} name
     * @returns value
     */
    getParameterByName: function(name) {
        // const regex = new RegExp(`[\\?&]${name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')}=([^&#]*)`);
        const regex = new RegExp(`[\\?&]${name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')}([^&#]*)`); // 갤캠스 버전 (주소?파라미터값)
        const results = regex.exec(location.search);

        return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },

    /**
     * PT_STATE eventState 상태 값 저장
     * @param {string} key eventState key값
     * @param {object} params eventState value 값
     */
    setEventState: function(key, params) {
        if (!PT_STATE.eventState[key]) {
            PT_STATE.eventState[key] = params;
        } else {
            PT_STATE.eventState[key] = Object.assign(PT_STATE.eventState[key], params);
        }
    },

    /**
     * PT_STATE eventState 상태 값 불러오기
     * @param {string} key eventState key값
     * @returns eventState value 값
     */
    getEventState: function(key) {
        return PT_STATE.eventState[key];
    },

    /**
     * 해당 이벤트의 값을 가진 객체를 return 하는 함수
     * @param {*} params 해당 배열
     * @param {*} key 찾는 key 값
     * @param {*} val 찾는 val 값
     * @returns 해당 객체
     */
    findItem: function(params, key, val) {
        const { [key]: evtItem, ...item } = params.filter(item => item[key] === val)[0];
        return item;
    }
};

if(!window.PT_STATE) window.PT_STATE = {};
window.PT_STATE.$PROJECT = PT_STATE.$PROJECT;
window.PT_STATE.eventState = PT_STATE.eventState;
