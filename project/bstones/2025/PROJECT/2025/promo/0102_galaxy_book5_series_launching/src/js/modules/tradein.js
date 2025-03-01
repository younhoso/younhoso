/* 
  TradeIn - v0.1

  updatedAt: 2024-10-07
  updatedBy: jacob

  createdAt: 2024-10-07
  createdBy: jacob
*/

export default class tradeIn {
    constructor(tradeContainer, tradeData) {
        this.$window = window;
        this.$el = $(tradeContainer); // trade container
        this.data = JSON.parse(JSON.stringify(tradeData.result)); // json data
        this.defaultdata = tradeData.result.filter(v => v.default === 'O'); // default json data
        this.defaultBtnHtml = null; // default btn html
        this.uniqueObj = {}; // branch data
        this.uniqueOptCd = [] // optCd
        this.uniqueOptNm = [] // optNm
        this.selectArr = []; // select data
  
        this.init();
    }
    setData(validateFunc) {
        const resultData = this.data;
  
        // opt branch
        for (let item of resultData) {
            const allow = 'opt';
            const filtered = Object.keys(item).filter(key => key.includes(allow)).reduce((obj, key) => {
                obj[key] = item[key];
                return obj;
            }, {});
  
            if (Object.entries(filtered).length % 2 !== 0) throw new Error("optCd와 optNm의 개수가 일치하지 않아요.");
            
            for (const [key, value] of Object.entries(filtered)) {
                let valued = value.trim();
                if (this.uniqueObj[key] === undefined) this.uniqueObj[key] = [valued];
                else if (!this.uniqueObj[key].includes(valued)) this.uniqueObj[key].push(valued);
            }
        }
  
        // unique optCd branch
        this.uniqueOptCd = Object.entries(this.uniqueObj).filter(item => item[0].includes('optCd'));
  
        // unique optNm branch
        this.uniqueOptNm = Object.entries(this.uniqueObj).filter(item => item[0].includes('optNm'));
  
        // select Array setting
        for (let i=0; i<Object.keys(this.uniqueObj).length / 2; i++) this.selectArr.push(null);
  
        // default button name setting
        this.defaultBtnHtml = this.$el.find('.pt_combo__btn').map(function() {
            return $(this).html().trim();
        });
  
        // validate
        validateFunc(resultData, this.$el, this.uniqueOptCd, this.defaultdata);
    }
    drawHtml() {
        const resultData = this.data;
        const optCd = this.uniqueOptCd;
        const optNm = this.uniqueOptNm;
        const $el = this.$el;
  
        // first html draw
        for (let i=0; i<optCd.length; i++) {
            let _html = '';
            let optCdName = optCd[i][0];
            let optCdItem = optCd[i][1];
            let dataNm = optNm[i][0];
            let dataNmItem = optNm[i][1];
            
            for (let j=0; j<optCdItem.length; j++) {
                let optionHtml = resultData.find(item => item[optCdName] === optCdItem[j])[dataNm];
                _html += `<li class="pt_combo__item"><button type="button" data-pt-option='${optCdItem[j]}'>${optionHtml}</button></li>`;
            }
            $el.find("[data-pt-combobox='" + optCdName + "']").html(_html);
        }
    }
    validate(resultData, $el, uniqueOptCd, defaultdata) {
        if (uniqueOptCd.length !== $el.find('[data-combo]').length) {
            throw new Error("[data-combo] 개수와 optCd의 개수가 일치하지 않습니다.");
        }
    
        for (let i=0; i<$el.find('[data-combo]').length; i++) {
            let comboItem = $el.find('[data-combo]').eq(i).attr('data-index').trim();
            if (comboItem.length === 0) {
            throw new Error(`[data-combo] 의 [data-index] 값이 비어있거나 존재하지 않습니다.`);
            }
            if (comboItem !== String(i)) {
            throw new Error(`[data-combo] 의 [data-index] 값을 순서대로 입력해주세요. (ex. 0, 1, 2)`);
            }
        }
    
        if (uniqueOptCd.length !== $el.find('[data-pt-combobox]').length) {
            throw new Error("[data-pt-combobox] 개수와 optCd의 개수가 일치하지 않습니다.");
        }
    
        for (let i=0; i<uniqueOptCd.length; i++) {
            let comboboxItem = $el.find("[data-pt-combobox='" + uniqueOptCd[i][0] + "']");
            if (comboboxItem.length === 0) {
            throw new Error("[data-pt-combobox='" + uniqueOptCd[i][0] + "'] 가 존재하지 않습니다.");
            }
        }
    
        if ($el.find('[data-pt-text]').length === 0) {
            throw new Error('[data-pt-text] 가 존재하지 않습니다.');
        }
    
        for (let i=0; i<$el.find('[data-pt-text]').length; i++) {
            const attrValue = $el.find('[data-pt-text]').eq(i).attr('data-pt-text').trim();
    
            if (attrValue === '') {
            throw new Error(`[data-pt-text] 값이 비어있습니다.`);
            }
            if (!!!resultData.find(dataItem => dataItem[attrValue])) {
            throw new Error(`json 데이터에 ${attrValue} 가 정의되지 않았습니다.`);
            }
        }
    
        if (defaultdata.length > 1) {
            throw new Error(`Default 설정 개수가 2개 이상입니다. 1개만 설정해주세요.`);
        }
    }
    util(selectArr, updateFunc, reDrawHtmlFunc, defaultBtnHtml, defaultdata) {
        const resultData = this.data;
        const $el = this.$el;
        const comboWrap = $el.find('[data-combo]');
        const optCdArr = this.uniqueOptCd;
        const optNmArr = this.uniqueOptNm;
  
        comboWrap.on('click', '.pt_combo__btn', function(e){
            e.preventDefault();
            const $self = $(this);
            const combo = $self.parent('[data-combo]');
            const list = $self.siblings('.pt_combo__list');
  
            if (combo.hasClass('pt_on')){
                combo.removeClass('pt_on');
                list.stop().slideUp(300);
            } else {
                combo.addClass('pt_on').siblings().removeClass('pt_on');
                comboWrap.find('.pt_combo__list').hide();
                list.stop().slideDown(300);
            }
        });
  
        comboWrap.on('click', '.pt_combo__item button', function(e){
            e.preventDefault();
            const combo = $(this).parents('[data-combo]');
            const comboIndex = Number($(this).closest('[data-combo]').attr('data-index'));
            const list = $(this).parents('.pt_combo__list');
            const item = $(this).parent('.pt_combo__item');
            const label = combo.find('.pt_combo__btn');
            let resetObj = {};
  
            if(item.hasClass('pt_on')){
                combo.removeClass('pt_on');
                list.stop().slideUp(300);
                return;
            }
  
            combo.removeClass('pt_on');
            list.slideUp(300);
            item.addClass('pt_on').siblings().removeClass('pt_on');
            label.html($(this).html());
  
            const selected = $(this).attr('data-pt-option');
            const depthCd = $(this).closest('[data-pt-combobox]').attr('data-pt-combobox');
  
            selectArr[comboIndex] = `${depthCd}:${selected}:${comboIndex}`;
            resetObj = updateFunc(resultData, optCdArr, optNmArr, selectArr[comboIndex], selectArr);
  
            reDrawHtmlFunc(resultData, resetObj, $el, defaultBtnHtml);
        });
  
        // default target
        if (defaultdata.length === 1) {
            const defaultRow = Object.entries(defaultdata[0]).filter(defaultItem => defaultItem[0].includes('optCd'));
            defaultRow.forEach((defaultOpt, i) => {
                $el.find("[data-pt-option='" + defaultOpt[1] + "']").trigger('click');
            });
        }
    }
    update(resultData, optCdArr, optNmArr, select, selectArr) {
        const _resultData = resultData;
        const _optCdArr = optCdArr;
        const _optNmArr = optNmArr;
        const [selectKey, selectValue, selectIndex] = select.split(':').map((selectItem,i) => select.length-1 !== i ? selectItem : Number(selectItem));
        const _selectArr = selectArr;
        let radData = [];
        let selectUniqueData = [];
        let returnObj = {};
  
        // 첫 카테고리 opt 세팅
        _selectArr.forEach((radItem, i) => i === 0 ? radData.push(_optCdArr[0][1]) : radData.push(null));
  
        // 선택 옵션 데이터 세팅
        _selectArr.forEach((item, i) => {
            const guItem = !!item ? item.split(':') : item;
            let uniqueSet = new Set();
            let resetData = [];
  
            for (let j=0; j<=i; j++) {
                const rapdata = !resetData.length ? _resultData : resetData;
                let uniqueData = [];
  
                if (guItem !== null && _selectArr.length-1 !== i) {
                    rapdata.forEach(rapItem => rapItem[guItem[0]] === guItem[1] ? uniqueData.push(rapItem) : '');
                    resetData = uniqueData;
                }
            }
  
            if (_selectArr.length-1 !== i ) {
                resetData.forEach(resetItem => uniqueSet.add(resetItem[_optCdArr[i+1][0]]));
                radData[i+1] = [...uniqueSet];
            }
        });
        
        // 상위 옵션 선택 시, 일치하지 않는 하위 옵션 초기화
        for (let i=0; i<radData.length; i++) {
            if (!radData[i].length) radData[i] = _optCdArr[i][1];
  
            if (_selectArr[i] !== null) {
                const _select = _selectArr[i].split(':');
                if (!radData[i].includes(_select[1])) _selectArr[i] = null;
            }
        }

        // 최종 선택 데이터
        _selectArr.forEach((item, i) => {
            const guItem = !!item ? item.split(':') : item;
            const rapdata = !!!selectUniqueData.length ? _resultData : selectUniqueData;
            let uniqueData = [];

            if (guItem !== null) {
                uniqueData = rapdata.filter(rapItem => rapItem[guItem[0]] === guItem[1]);
                selectUniqueData = uniqueData;
            }
        });

        returnObj['allOptCd'] = _optCdArr;
        returnObj['allOptNm'] = _optNmArr;
        returnObj['reSelect'] = _selectArr;
        returnObj['reData'] = radData;
        returnObj['selectUniqueData'] = selectUniqueData;

        return returnObj;
    }
    reDrawHtml(resultData, resetObj, $el, defaultBtnHtml) {
        const _resultData = resultData;
        const _resetObj = resetObj;
        const _defaultBtnHtml = defaultBtnHtml;
        const {allOptCd, allOptNm, reData, reSelect, selectUniqueData} = _resetObj;
        const $texts = $el.find('[data-pt-text]');

        // select html redraw
        for (let i=0; i<allOptCd.length; i++) {
            let _html = '';
            let optCdName = allOptCd[i][0];
            let optCdItem = reData[i];
            let optNm = allOptNm[i][0];
            
            for (let j=0; j<optCdItem.length; j++) {
                let optionHtml = _resultData.find(item => item[optCdName] === optCdItem[j])[optNm];
                _html += `<li class="pt_combo__item"><button type="button" data-pt-option='${optCdItem[j]}'>${optionHtml}</button></li>`;
            }
            
            $el.find("[data-pt-combobox='" + optCdName + "']").html(_html);
        }

        // button html redraw
        reSelect.forEach((reSelectItem, i) => {
            if (reSelectItem === null) {
                const defaultBtnHtml = _defaultBtnHtml.eq(i)[0];
                $el.find('.pt_combo__btn').eq(i).html(defaultBtnHtml);
            } else {
                const [reSelectKey, reSelectValue, reSelectIndex] = reSelectItem.split(':');
                const $combobox = $el.find("[data-pt-combobox='" + reSelectKey + "']");
                $combobox.find("[data-pt-option='" + reSelectValue + "']").closest('.pt_combo__item').addClass('pt_on').append('<span class="blind">선택됨</span>');
            }
        });

        // all select btn ok
        const isReSelect = reSelect.every(v => v !== null);
        if (isReSelect && selectUniqueData.length === 1) {
            const onlyData = selectUniqueData[0];
            $texts.each(function() {
                $texts.html(onlyData[$texts.attr('data-pt-text')]);
            });
        } else {
            $texts.each(function() {
                $(this).text('0');
            });
        }
    }
    init() {
        this.setData(this.validate);
        this.drawHtml();
        this.util(this.selectArr, this.update, this.reDrawHtml, this.defaultBtnHtml, this.defaultdata);
    }
}