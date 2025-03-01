import { PT_STATE, util as _} from './bs_common';

export const count = {
    
    pad (value) {
        return ('0' + Math.floor(value)).slice(-2);
    },
    init (el, datetime, type) {

        const _second = 1000;
        const _minute = _second * 60;
        const _hour = _minute * 60;
        const _day = _hour * 24;

        let timer;
        const _date = new Date(datetime).getTime();
        var html = '';
        var _el;
        var _time = {
            d:'00',
            h:'00',
            m:'00',
            s:'00',
        }

        function countDown() {

            var distance = _date - new Date().getTime();
            var days = count.pad(distance / _day);
            var hours = count.pad((distance % _day) / _hour);
            var minutes = count.pad((distance % _hour) / _minute);
            var seconds = count.pad((distance % _minute) / _second);

            if (_time.d !== days) {
                _time.d = days;
                distance > 0 ? _el.eq(0).html(days) : _el.eq(0).html('00');
            }
            if (_time.h !== hours) {
                _time.h = hours;
                distance > 0 ? _el.eq(1).html(hours) : _el.eq(1).html('00');
            }
            if (_time.m !== minutes) {
                _time.m = minutes;
                distance > 0 ? _el.eq(2).html(minutes) : _el.eq(2).html('00');
            }
            if (_time.s !== seconds) {
                _time.s = seconds;
                distance > 0 ? _el.eq(3).html(seconds) : _el.eq(3).html('00');
            }

            // 카운트 종료
            if (distance < 0) {
                clearInterval(timer);
            }
        }

        html = `
        <ul class="pt_count_box">
            <li class="pt_count_slot">
                <div class="pt_card">
                    <p class="pt_count_num mono_en">00</p>
                    <p class="pt_count_txt">일</p>
                </div>
            </li>
            <li class="pt_count_slot">
                <div class="pt_card">
                    <p class="pt_count_num mono_en">00</p>
                    <p class="pt_count_txt">시간</p>
                </div>
            </li>
            <li class="pt_count_slot">
                <div class="pt_card">
                    <p class="pt_count_num mono_en">00</p>
                    <p class="pt_count_txt">분</p>
                </div>
            </li>
            <li class="pt_count_slot">
                <div class="pt_card">
                    <p class="pt_count_num mono_en">00</p>
                    <p class="pt_count_txt">초</p>
                </div>
            </li>
        </ul>
        `;

        $(el).html(html);
        _el = $(el).find('.pt_count_num');
        timer = setInterval(countDown, 1000);
    }
};