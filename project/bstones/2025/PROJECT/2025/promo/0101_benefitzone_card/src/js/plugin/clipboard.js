/**
 * @constructor
 * @version v1.0
 * @author jaden1.kim@cheilpengtai.com
 * @param selector {string} '#button', '.button1', '.wrap .button1' ...
 * @param options {object} {
 * text: {string},
 * promptMsg: {string},
 * callback: {function}
 * }
 */
function Clipboard(selector, options) {
    this.button = this._initButton(selector);
    this._options = null;
    this._txtBox = null;
    this._success = true;
    this._isPrompt = false;
    this.initOption(options);
  
    this._initEvent();
  }
Clipboard._defaultOptions = {
    text: '복사할 키워드를 입력해주세요.',
    promptMsg: '해당 문구를 복사해주세요.',
    callback: function () {
        alert('클립보드에 해당 문구가 복사되었습니다.');
    }
};
Clipboard.prototype = {
    _initButton : function (selector){
        if ( typeof document.querySelector === 'function' ){
            return document.querySelector(selector);
        } else if ( selector.indexOf('#') !== -1 && selector.split('#').slice(-1).toString().match(/[^A-Za-z0-9-\-_]/) === null ) {
            return document.getElementById(selector.split('#').slice(-1).toString());
        } else {
            if ( window.$ ) {
                if ( typeof window.$.fn === 'object' )
                    return $(selector)[0];
            }
            if ( window.jQuery ) {
                if ( typeof window.jQuery.fn === 'object' )
                    return jQuery(selector)[0];
            }
        }
        return false;
    },
    /**
     * 초기화 이벤트 핸들러
     */
    reset: function () {
        if ( this.button ){
            this._removeEvent();
            this.button = null;
            this._options = null;
            this._txtBox = null;
            this._success = null;
            this._isPrompt = null;
        }
    },
    _removeEvent: function () {
        var that = this;
        if ( !this.button ) return false;
        if (window.removeEventListener) {
            this.button.removeEventListener('click', function(){
                that.copy();
            });
        } else if (window.detachEvent) {
            this.button.detachEvent('onclick', function(){
                that.copy();
            });
        } else {
            this.button.onclick = function(){
                that.copy();
            };
        }
    },
    /**
     * 옵션 재설정
     * @param options {object} {
     * text: {string},
     * promptMsg: {string},
     * callback: {function}
     * }
     */
    initOption: function (options) {
        options = options || {text: undefined, promptMsg: undefined, callback: undefined};
        this._options = {
            text: options.text !== undefined ? options.text : Clipboard._defaultOptions.text,
            promptMsg: options.promptMsg !== undefined ? options.promptMsg : Clipboard._defaultOptions.promptMsg,
            callback: options.callback !== undefined ? options.callback : Clipboard._defaultOptions.callback
        };
    },
    _initEvent: function () {
        var that = this;
        if ( !this.button ) return false;
        if (window.addEventListener) {
            this.button.addEventListener('click', function(){
                that.copy();
            });
        } else if (window.attachEvent){
            this.button.attachEvent('onclick', function(){
                that.copy();
            });
        } else {
            this.button.onclick = function(){
                that.copy();
            }
        }
    },
    /**
     * 카피 이벤트 핸들러
     */
    copy: function () {
        if ( this.button ){
            if (window.clipboardData) {
                this._setClipboardData();
            } else {
                this._createTxtBox();
                this._setExecCommand();
            }
            this._complete();
        }
    },
    _setClipboardData: function () {
        window.clipboardData.setData('Text', this._options.text);
    },
    _createTxtBox: function () {
        this._txtBox = document.createElement('textarea');
        this._txtBox.style.cssText = 'overflow:hidden;position:fixed;top:-1px;left:-1px;width:1px;height:1px;';
        this._txtBox.innerHTML = this._options.text;
        this.button.parentNode.appendChild(this._txtBox);

        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
            var oldContentEditable = this._txtBox.contentEditable;
            var oldReadOnly = this._txtBox.readOnly;
            var range = document.createRange();
            this._txtBox.contentEditable = true;
            this._txtBox.readOnly = false;
            range.selectNodeContents(this._txtBox);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            this._txtBox.setSelectionRange(0, 9999);

            this._txtBox.contentEditable = oldContentEditable;
            this._txtBox.readOnly = oldReadOnly;
        } else {
            this._txtBox.readOnly = true;
            this._txtBox.select();
            this._txtBox.setSelectionRange(0, 9999);
        }
    },
    _setExecCommand: function () {
        try {
            this._success = document.execCommand('copy', false, null);
        }
        catch (e) {
            this._isPrompt = true;
            if (!window.prompt(this._options.promptMsg, this._options.text)) {
                this._success = false;
            }
        }
        finally {
            if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
                window.getSelection().removeAllRanges();
            } else {
                this.button.parentNode.removeChild(this._txtBox);
            }
        }
    },
    _complete: function () {
        if (this._success) {
            this._options.callback();
        } else {
            if (!this._isPrompt) {
                if (window.prompt(this._options.promptMsg, this._options.text)) {
                    this._options.callback();
                }
            }
        }
    }
};
