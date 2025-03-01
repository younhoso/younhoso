export class Buying {
    /**
     * 객체 생성자
     * @param {object} obj
     */
    constructor (obj) {
        this.el = obj.el;
        this.$el = $(obj.el);
        this.data = JSON.parse(JSON.stringify(obj.data));
        this.groupData = {};
        this.html = {
            buyingHtml: obj.buyingHtml,
            innerHtml: '',
        };
        this.allOptions = [];
        this.optText = {};
        this.groupKey = !!obj.group ? obj.group : 'prdGroup';
        this.singleMode = obj.singleMode ? obj.singleMode : false;
        this.kvChange = !!obj.kvChange ? obj.kvChange : false;
        this.podImgChange = !!obj.podImgChange ? obj.podImgChange : false;
        this.podMode = !!obj.podMode ? obj.podMode : false;
        this.imgChange = !!obj.imgChange ? obj.imgChange : false;
        this.podChange = !!obj.podChange ? obj.podChange : false;
        this.onOptionChange = !!obj.onOptionChange ? obj.onOptionChange : false;

        // 그룹 키
        if (this.singleMode == true) {
            for (let item of this.data) {
                item[this.groupKey] = 'g01';
            }
        }

        if (!!obj.optHtml) {
            this.html.optionHtml = obj.optHtml;
        }

        this.init();
    }

    /**
     * 최초 데이터 셋팅
     */
    setData() {
        const _html = this.html;
        const _groupData = this.groupData;
        const _groupKey = this.groupKey;
        const _optText = this.optText;
        let defaultList = [];

        if (this.html.optionHtml) {
            this.allOptions = Object.keys(_html.optionHtml);

            this.allOptions.forEach(opt => {
                _optText[opt] = _html.optionHtml[opt].match(/\*{3,}\w+\*{3,}/gi);
            });
        }

        _html.innerHtml = _html.buyingHtml.split('\n');
        _html.innerHtml.pop();
        _html.innerHtml.shift();
        _html.innerHtml = _html.innerHtml.join('');

        // 데이터 그룹핑
        for (let dataItem of this.data) {
            const prdGroup = dataItem[_groupKey];

            if (!_groupData[prdGroup]) {
                _groupData[prdGroup] = {
                    list: [],
                    optList: {},
                    selectedOpt: {},
                    tradeIn: 'N',
                };
            }

            _groupData[prdGroup].list.push(dataItem);

        }

        // default 데이터 저장
        if (this.singleMode) {
            defaultList = [this.data[0]];
        } else {
            defaultList = this.data.filter(item => !!item.default?.trim() && item.default?.trim != "-");

            if (defaultList.length > 1) {
                defaultList.sort(function(a, b) {
                    return a[_groupKey].replace(/[^0-9]+/gi, '') - b[_groupKey].replace(/[^0-9]+/gi, '');
                });
            }
        }

        this.defaultList = defaultList;

    }

    checkRegEx(text, data) {
        let html = text;
        const textArr = html.match(/\*{3,}\w+\*{3,}/gi);

        textArr.forEach(text => {
            const key = text.replace(/\*{3,}/gi, '');
            const pattern = '\\*{3,}' + key + '\\*{3,}'
            const reg = new RegExp(pattern, 'gi');
            html = html.replace(reg, data[key]?.trim());
        });

        return html;
    }

    /**
     * html 렌더링 하는 함수
     * @param {object} buyingTarget
     * @param {boolean} isDefault 최초 생성할 때
     */
    renderHtml(buyingTarget, isDefault) {
        let html = isDefault === true ? this.html.buyingHtml : this.html.innerHtml;
        const textArr = html.match(/\*{3,}\w+\*{3,}/gi);
        const optionHtml = this.html.optionHtml;
        const target = buyingTarget;
        const prdGroup = buyingTarget.prdGroup;
        const buyingGroup = this.groupData[prdGroup];
        const isSpread = this.podMode;
        const $el = this.$el;
        const _allOpt = this.allOptions;
        const _optText = this.optText;
        let $prd;
        let delOption = [];
        let $podslide;


        if (this.podMode) {
            $podslide = $(`[data-pod-slide="${prdGroup}"]`);
        }

        // ****text**** 변경
        html = this.checkRegEx(html, target);


        // 옵션 html 생성
        _allOpt.forEach((optKey, idx) => {
            let optHtml = [];
            const _optList = buyingGroup.optList[optKey];
            let optTarget = [... buyingGroup.list];
            const newList = [];

            if (_optList.length > 0) {

                if (idx == 0) {
                    optTarget = optTarget.filter(item => {

                        if (!newList.includes(item[optKey])) {
                            newList.push(item[optKey]);

                            return item;
                        }
                    });
                } else {

                    for (let i = 0; i < idx; i++) {
                        const mainOpt = _allOpt[i];

                        optTarget = optTarget.filter(item => item[mainOpt] === buyingGroup.selectedOpt[mainOpt]);
                    }

                }

                _optList.forEach(item => {
                    let option = optionHtml[optKey];

                    _optText[optKey].forEach(text => {
                        const key = text.replace(/\*{3,}/gi, '');
                        const pattern = '\\*{3,}' + key + '\\*{3,}'
                        const reg = new RegExp(pattern, 'gi');

                        option = option.replace(reg, item[key]);
                    });

                    optHtml.push(option);

                });

                html = html.replace('###' + optKey + '###', optHtml.join(''));

            } else {
                delOption.push(optKey);
            }
        });

        //
        if (isDefault) {
            // podMode
            if (isSpread) {
                $el.find(`[data-group="${prdGroup}"]`).append(html);
            } else {
                $el.append(html);
            }
        } else {
            $el.find('[data-prd-name="' + prdGroup + '"]').html(html);
        }

        $prd = $el.find('[data-prd-name="' + prdGroup + '"]');

        // 그룹 내 없는 옵션 숨김처리
        if (delOption.length > 0) {
            for (let item of delOption) {
                $prd.find('[data-opt="' + item + '"]').remove();
            }
        }

        // data-optional 요소 숨김처리
        // 해당 키값이 없을 때 삭제
        $prd.find('[data-optional]').each((idx, item) => {
            const key = $(item).attr('data-optional');
            if (!target[key] || target[key]?.trim() == '-') {
                $(item).remove();
            }
        });

        // data-optional-reverse 요소 숨김처리
        // 해당 키값이 있을 때 삭제
        $prd.find('[data-optional-reverse]').each((idx, item) => {
            const key = $(item).attr('data-optional-reverse').split('|');
            key.forEach(function(key){
                if (!!target[key] && target[key]?.trim() != '-') {
                    $(item).remove();
                }
            })
        });

        // 옵션 버튼 active
        for (let optKey in buyingGroup.selectedOpt) {
            const optVal = buyingGroup.selectedOpt[optKey];

            $prd.find('[data-opt-value="' + optVal + '"]').addClass('active').append('<span class="blind">선택 됨</span>');
        }

        const $buyng = $el.find(`[data-prd-name="${prdGroup}"]`);

        // // soldout 처리
        if (!!buyingTarget.soldOut || buyingTarget.soldOut =='-') {
            $buyng.addClass('pt_soldout');
        } else {
            $buyng.removeClass('pt_soldout');
        }

        if(buyingTarget.prdGroup == 'g03'){
            if (!!this.podChange) {
                const pcPod02 = this.checkRegEx(this.podChange.pod02[0], target);
                const moPod02 = this.checkRegEx(this.podChange.pod02[1], target);
                const pcPod03 = this.checkRegEx(this.podChange.pod03[0], target);
                const moPod03 = this.checkRegEx(this.podChange.pod03[1], target);
                const pcPod04 = this.checkRegEx(this.podChange.pod04[0], target);
                const moPod04 = this.checkRegEx(this.podChange.pod04[1], target);

                $(`[data-pod-change="g03_02"]`).find('img').eq(0).attr('src', pcPod02);
                $(`[data-pod-change="g03_02"]`).find('img').eq(1).attr('src', moPod02);
                $(`[data-pod-change="g03_03"]`).find('img').eq(0).attr('src', pcPod03);
                $(`[data-pod-change="g03_03"]`).find('img').eq(1).attr('src', moPod03);
                $(`[data-pod-change="g03_04"]`).find('img').eq(0).attr('src', pcPod04);
                $(`[data-pod-change="g03_04"]`).find('img').eq(1).attr('src', moPod04);

            }
        }

        // data-text-change
        if (!!this.imgChange) {
            const pcImg = this.checkRegEx(this.imgChange.src[0], target);
            const moImg = this.checkRegEx(this.imgChange.src[1], target);
            const alt = this.checkRegEx(this.imgChange.alt, target);

            $(`[data-img-change="${prdGroup}"]`).find('img').eq(0).attr('src', pcImg);
            $(`[data-img-change="${prdGroup}"]`).find('img').eq(1).attr('src', moImg);
            $(`[data-img-change="${prdGroup}"]`).find('img').attr('alt', alt);

            // $podslide.find('[data-txt-change]').each((idx, item) => {
            //     const txtKey = $(item).attr('data-txt-change');

            //     $(item).html(target[txtKey]);
            // });
        }

    }

    setOptionList(groupId) {
        const _allOpt = this.allOptions;
        const _groupTarget = this.groupData[groupId];
        const _optList =  _groupTarget.optList;
        let newList;

        // 그룹별 옵션 데이터 설정
        _allOpt.forEach((optName, idx) => {
            const list = [];

            if (!list[optName]) {
                list[optName] = [];
            }

            // optList 초기화
            _optList[optName] = [];

            newList = idx == 0 ? _groupTarget.list : newList.filter(item => item[_allOpt[idx - 1]] == _groupTarget.selectedOpt[_allOpt[idx - 1]]);

            newList.forEach(dataItem => {
                if (!!dataItem[optName] && dataItem[optName]?.trim() !== '-' && !list[optName].includes(dataItem[optName])) {
                    list[optName].push(dataItem[optName]);
                    _optList[optName].push(dataItem);
                }

            });

            if (_optList[optName].length == 0) {
                _groupTarget.selectedOpt[optName] = '-';
            }


        });

    }

    printDefaultHtml() {
        const _groupData = this.groupData;
        const _groupKey = this.groupKey;
        const _allOpt = this.allOptions;

        this.defaultList.forEach(item => {
            const groupTarget = _groupData[item[_groupKey]];

            for (let optKey of _allOpt) {
                groupTarget.selectedOpt[optKey] = item[optKey]
            }

            this.setOptionList(item[_groupKey]);
            this.renderHtml(item, true);

        });

        this.$el.find('[data-prd-sample]').removeClass('pt_loading');

    }

    changeOption() {
        const _this = this;
        const _groupData = this.groupData;
        const _allOpt = this.allOptions;

        this.$el.on('click', '[data-opt-btn]', function(e) {
            const $this = $(this);
            const groupId = $this.closest('[data-prd-name]').attr('data-prd-name');
            const optKey = $this.closest('[data-opt]').attr('data-opt');
            const optVal =  $this.closest('[data-opt-value]').attr('data-opt-value');
            const _buyingGroup = _groupData[groupId];
            let target;


            $this.closest('.pt_pod_box').find('.pt_pod_slide')[0].swiper.slideTo(0);
            _buyingGroup.selectedOpt[optKey] = optVal;
            _this.setOptionList(groupId);
            target = _this.checkSlectedItem(groupId);

            // 땜빵
            if(target === undefined){
                _buyingGroup.list.forEach(function(item, index){
                    $this.closest('.pt_left').find(`[data-opt-value="${item.colorCode}"] [data-opt-btn]`).trigger('click');
                    return
                });
            }

            _this.renderHtml(target);

            if (!!_this.kvChange) {
                $(_this.kvChange).find(0).attr('src', target.kvImgPc);
                $(_this.kvChange).find(1).attr('src', target.kvImgMo);
            }

            // if (!!_this.imgChange) {
            //     $(`[data-pod-change="${target.prdGroup}"]`).find(0).attr('src', this.podImgChange + '_' + target.sku + '_pc.png');
            //     $(`[data-pod-change="${target.prdGroup}"]`).find(0).attr('src', this.podImgChange + '_' + target.sku + '_mo.png');
            // }

            _this.$el.find(`[data-prd-name="${groupId}"] [data-opt="${optKey}"] [data-opt-value="${optVal}"] [data-opt-btn]`).trigger('focus');

            if (!!_this.onOptionChange) {
                // console.log($this.closest('.pt_pod_box'));
                console.log('e', $this.closest('[data-group]'));
                _this.onOptionChange(e.target);
            }
        });

    }

    /**
     * 그룹 내에 선택된 제품 데이터 찾는 함수
     * @param {string} id prdGroup 값(그룹핑 id)
     * @returns object : 해당 하는 제품 객체
     */
    checkSlectedItem(id) {
        const _group = this.groupData[id];
        const _slected = _group.selectedOpt;
        const _allOpt = this.allOptions;
        let result = [... _group.list];

        // 그룹 내 선택된 옵션 값 저장
        for (let opt of _allOpt) {

            if (_slected[opt] !== '-') {
                result = result.filter(item => item[opt] == _slected[opt]);
            } else {
                _slected[opt] = result[0][opt];
            }

        }

        result = result[0];

        return result;
    }

    init() {
        this.setData();
        this.printDefaultHtml();
        this.changeOption();
    }

}
