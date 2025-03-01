var chrome;
var valid = {
    login_id: /^[a-z0-9A-Z\d]{6,15}$/,
    name: /^([a-zA-Z0-9]{3,50})|([媛�-��]{2,25})$/,
    password: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^~*+=-]).{8,15}$/,
    tel: /^0\d{8,10}$/,
    mobile: /^01([0|1|6|7|8|9])(\d{7,8})$/,
    email : /^[0-9 A-Z a-z _.-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
    url_website: /^(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
    onlyNum: /^[0-9 ]+$/,
    bizNo: /^\d{3}-?\d{2}-?\d{5}$/,
    acct: /^[0-9-]+$/,
    birth: /^(19\d{2}|20\d{2})(0\d|1[0-2])(0\d|[1-2]\d|3[0-1])$/,
    newBirth: /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
    numRegex: /[0-9]/,
    enRegex: /[a-zA-Z]/,
    specialRegex: /[!@#$%^~*+=-]/,
    number: "0123456789",
    lowerCase: "abcdefghijklmnopqrstuvwxyz",
    upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    checkSimplePswd: function(pswd) {
        if (pswd.length >= 8) return false;
        if (!this.numRegex.test(pswd) && !this.enRegex.test(pswd)) return false;
        if (this.numRegex.test(pswd) &&
            this.enRegex.test(pswd)) return false;
        return true
    },
    checkPswdMatch: function(pswd, loginId) {
        for (var i = 0; i < this.number.length - 3; i++)
            if (pswd.indexOf(this.number.substring(i, i + 3)) > -1 || pswd.indexOf(this.reverse(this.number).substring(i, i + 3)) > -1) return false;
        for (var j = 0; j < this.lowerCase.length - 3; j++)
            if (pswd.indexOf(this.lowerCase.substring(j, j + 3)) > -1 || pswd.indexOf(this.reverse(this.lowerCase).substring(j, j + 3)) > -1) return false;
        for (var k = 0; k < this.upperCase.length - 3; k++)
            if (pswd.indexOf(this.upperCase.substring(k,
                k + 3)) > -1 || pswd.indexOf(this.reverse(this.upperCase).substring(k, k + 3)) > -1) return false;
        var sameTextCnt = 0;
        for (var l = 0; l < pswd.length - 1; l++) {
            if (pswd.charCodeAt(l) === pswd.charCodeAt(l + 1)) sameTextCnt++;
            else sameTextCnt = 0;
            if (sameTextCnt >= 2) return false
        }
        if (loginId != null)
            for (var j$0 = 0; j$0 < pswd.length - 3; j$0++)
                if (loginId.indexOf(pswd.substring(j$0, j$0 + 3)) > -1) return false;
        return true
    },
    checkIncludeStr: function(pswd, str) {
        if (str != null && str !== "")
            if (pswd.indexOf(str) > -1) return false;
        return true
    },
    checkSpace: function(str) {
        if (str.search(/\s/) !==
            -1) return false;
        else return true
    },
    reverse: function(str) {
        return str.split("").reverse().join("")
    },
    checkByte: function(targetId, valueObj, maxByte) {
        var result = 0;
        var strVal = $(valueObj).val();
        var strLen = strVal.length;
        var dLen = 0;
        if (strVal !== "") {
            for (var idx = 0; idx < strLen; idx++) {
                var c = escape(strVal.charAt(idx));
                if (c.length === 1) result++;
                else if (c.indexOf("%u") !== -1) result += 2;
                else if (c.indexOf("%") !== -1) result += c.length / 3;
                if (result <= maxByte) dLen = idx + 1
            }
            if (result > maxByte) {
                var alertData = {
                    title: "alert",
                    content: maxByte +
                        "Byte瑜� 珥덇낵 �낅젰�� �� �놁뒿�덈떎."
                };
                commonAlert(alertData);
                openLayer("commonAlert");
                strVal = strVal.substr(0, dLen);
                $(valueObj).val(strVal);
                this.checkByte(targetId, valueObj, maxByte)
            } else $("#" + targetId).html(result + "/" + maxByte + "Byte")
        } else $("#" + targetId).html(result + "/" + maxByte + "Byte")
    },
    numberWithCommas: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
};

function checkKeysInt(e) {
    var thisNums = e.target.value;
    e.target.value = thisNums.replace(/[^0-9]/g, "")
}
var waiting = {
    start: function() {
        $.blockUI({
            message: '<img src="/sec/static/evt/_images/common/ajax-loader-white.gif" alt="Loading..." />'
        })
    },
    stop: function() {
        $.unblockUI()
    },
    startId: function(id) {
        $.blockUI({
            message: $("#" + id)
        })
    },
    stopId: function() {
        $.unblockUI()
    }
};
var dialog = {
    create: function(targetId, options) {
        var dialogOption = {
            autoOpen: setDefaultIfNull(options.autoOpen, false),
            width: setDefaultIfNull(options.width, 500),
            height: setDefaultIfNull(options.height, 300),
            draggable: setDefaultIfNull(options.draggable, false),
            resizable: setDefaultIfNull(options.resizable, false),
            modal: options.modal
        };
        if (options.open != null) dialogOption.open = options.open;
        if (options.close != null) dialogOption.close = options.close;
        $("#" + targetId).dialog(dialogOption)
    },
    open: function(targetId) {
        $("#" +
            targetId).dialog("open")
    },
    close: function(targetId) {
        $("#" + targetId).dialog("close")
    },
    destroy: function(targetId) {
        $("#" + targetId).dialog("destroy")
    }
};
var ajax = {
    call: function(options) {
        if (options.netFunnelId !== undefined) NetFunnel_Action({
            action_id: options.netFunnelId
        }, function(ev, ret) {
            ajax.originCall(options)
        });
        else ajax.originCall(options)
    },
    originCall: function(options) {
        waiting.start();
        jQuery.ajaxSettings.traditional = true;
        options.contentType = options.contentType == undefined ? "application/x-www-form-urlencoded;charset=UTF-8" : options.contentType;
        options.type = setDefaultIfNull(options.type, "POST");
        options.dataType = setDefaultIfNull(options.dataType, "json");
        options.async = options.async == null || options.async ? true : false;
        options.beforeSend == undefined ? undefined : options.beforeSend;
        options.processData = options.processData == undefined ? true : options.processData;
        $.ajax({
            url: options.url,
            type: options.type,
            dataType: options.dataType,
            contentType: options.contentType,
            data: options.data,
            async: options.async,
            beforeSend: options.beforeSend,
            processData: options.processData
        }).done(function(data, textStatus, jqXHR) {
            if (options.netFunnelId !== undefined) NetFunnel_Complete();
            if (data.exCode != null && data.exCode !== "") {
                if (options.fail !== undefined) options.fail();
                var alertData = {
                    title: "alert",
                    content: data.exMsg
                };
                commonAlert(alertData);
                openLayer("commonAlert");
            } else options.done(data, textStatus, jqXHR);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            if (options.netFunnelId !== undefined) NetFunnel_Complete();
            if (options.fail !== undefined) options.fail();
            if (jqXHR.status !== 0) ajax.error(jqXHR.status, jqXHR.responseText);
            waiting.stop();
        }).always(function() {
            waiting.stop();
        }).then(function(data, textStatus, jqXHR) {});
    },
	call2 : function(options) {
		if (options.netFunnelId !== undefined){
			NetFunnel_Action({action_id : options.netFunnelId}, function(ev, ret){
				ajax.originCall2(options);
			});
		}else{
			ajax.originCall2(options);
		}
	},
	originCall2 : function(options) {
		//waiting.start();
		
		jQuery.ajaxSettings.traditional = true;
		
		options.contentType = options.contentType == undefined ? "application/x-www-form-urlencoded;charset=UTF-8" : options.contentType;
		options.type = setDefaultIfNull(options.type, "POST");
		options.dataType = setDefaultIfNull(options.dataType, "json");
		options.async = (options.async == null || options.async) ? true : false;
		options.beforeSend == undefined ? undefined : options.beforeSend;
		options.processData = options.processData == undefined ? true: options.processData;
		
		$.ajax({
			url : options.url,
			type : options.type,
			dataType : options.dataType,
			contentType : options.contentType,
			data : options.data, 
			async: options.async,
			beforeSend : options.beforeSend,
			processData : options.processData
		}).done(
				function(data, textStatus, jqXHR) {
					if (options.netFunnelId !== undefined){
						NetFunnel_Complete();
					}
					if (data.exCode != null && data.exCode !== "") {
						
						if(options.customFail !== undefined){
							options.customFail(data);
						}else {
							if (options.fail !== undefined) {
								options.fail();
							}
							let alertData = {
									title: "alert"
										,content : data.exMsg
										,callback : options.failAlertCallback
							};
							commonAlert(alertData);
							openLayer('commonAlert');
						}
						
					} else {
						options.done(data,textStatus, jqXHR);
					}
				}).fail(function(jqXHR, textStatus, errorThrown) {
					if (options.netFunnelId !== undefined){
						NetFunnel_Complete();
					}
					
					if (options.fail !== undefined) {
						options.fail();
					}
					if (jqXHR.status !== 0)
						ajax.error(jqXHR.status, jqXHR.responseText);
				}).always(function() {
					//waiting.stop();
				}).then(function(data, textStatus, jqXHR) {
				});
		
	},
    load: function(targetId, url, params, popId, callBackFn) {
        waiting.start();
        jQuery.ajaxSettings.traditional = true;
        if (params == null) params = {};
        $("#" + targetId).load(url, params, function(response, status, xhr) {
            waiting.stop();
            if (status === "error") {
                if (xhr.status === 460)
                    if (popId != null && popId !== "") {
                        dialog.destroy(popId);
                        $("#" + popId).remove();
                    } ajax.error(xhr.status, xhr.responseText);
            }
            if (typeof callBackFn === "function") callBackFn(response);
            else if (typeof callBackFn === "string") window[callBackFn](response)
        })
    },
    error: function(status, data) {
    	waiting.stop();
//        var url = "";
//        if (data != null && data !== "" && data !== "{}") url = data.split("returnUrl=")[1];
//        if (status === 450)
//            if (url === undefined || url === "") location.href = "/indexLogin?loginType=&returnUrl=" + encodeURIComponent($(location).attr("href"));
//            else location.href = "/indexLogin?loginType=&returnUrl=" + encodeURIComponent(url);
//        else if (status === 451) location.href = "/indexLogin?loginType=NMOD";
//        else if (status === 452) location.href = "/indexLogin?loginType=NMODS";
//        else if (status === 460) pop.login({
//            loginType: ""
//        });
//        else if (status === 461) pop.login({
//            loginType: "NMOD"
//        });
//        else if (status === 462) pop.login({
//            loginType: "NMODS"
//        });
//        else {
//            var alertData = {
//                title: "alert",
//                content: "�ㅻ쪟媛� 諛쒖깮�섏��듬땲��. 愿�由ъ옄�먭쾶 臾몄쓽�섏떆湲� 諛붾엻�덈떎."
//            };
//            commonAlert(alertData);
//            openLayer("commonAlert")
//        }
    }
};
var calendar = {
    one: function(targetId, options) {
        $("#" + targetId).datepicker({
            showButtonPanel: false,
            dateFormat: "yy-mm-dd",
            yearRange: setDefaultIfNull(options.yearRange, "c-10:c+10"),
            changeYear: true,
            changeMonth: true,
            showOn: "button",
            buttonImage: "../../_images/common/common/icon_datepicker.gif",
            buttonImageOnly: true,
            buttonText: "Select date"
        })
    },
    range: function(fromId, toId, options) {
        $("#" + fromId).datepicker({
            showButtonPanel: false,
            defaultDate: "+1w",
            changeYear: true,
            changeMonth: true,
            dateFormat: "yy-mm-dd",
            yearRange: setDefaultIfNull(options.yearRange,
                "c-10:c+10"),
            showOn: "button",
            buttonImage: "../../_images/common/common/icon_datepicker.gif",
            buttonImageOnly: true,
            buttonText: "Select date",
            onClose: function(selectedDate) {
                $("#" + toId).datepicker("option", "minDate", selectedDate)
            }
        });
        $("#" + toId).datepicker({
            showButtonPanel: false,
            defaultDate: "+1w",
            changeYear: true,
            changeMonth: true,
            dateFormat: "yy-mm-dd",
            yearRange: options.yearRange || "c-10:c+10",
            showOn: "button",
            buttonImage: "../../_images/common/common/icon_datepicker.gif",
            buttonImageOnly: true,
            buttonText: "Select date",
            onClose: function(selectedDate) {
                $("#" + fromId).datepicker("option", "maxDate", selectedDate)
            }
        })
    },
    autoRange: function(fromId, toId, period) {
        var fromYear, fromMonth, fromDate;
        var toYear, toMonth, toDate;
        var today = new Date;
        var fromday = new Date;
        fromday.setMonth(today.getMonth() - period);
        fromday.setDate(today.getDate() + 1);
        fromYear = fromday.getFullYear();
        fromMonth = fromday.getMonth() + 1;
        fromMonth = fromMonth < 10 ? "0" + fromMonth : fromMonth;
        fromDate = fromday.getDate();
        fromDate = fromDate < 10 ? "0" + fromDate : fromDate;
        toYear = today.getFullYear();
        toMonth = today.getMonth() + 1;
        toMonth = toMonth < 10 ? "0" + toMonth : toMonth;
        toDate = today.getDate();
        toDate = toDate < 10 ? "0" + toDate : toDate;
        $("#" + fromId).val(fromYear + "-" + fromMonth + "-" + fromDate);
        $("#" + toId).val(toYear + "-" + toMonth + "-" + toDate)
    },
    autoRangeDay: function(fromId, toId, period) {
        var fromYear, fromMonth, fromDate;
        var toYear, toMonth, toDate;
        var today = new Date;
        var fromday = new Date;
        fromday.setDate(today.getDate() - period);
        fromYear = fromday.getFullYear();
        fromMonth = fromday.getMonth() + 1;
        fromMonth = fromMonth < 10 ? "0" + fromMonth :
            fromMonth;
        fromDate = fromday.getDate();
        fromDate = fromDate < 10 ? "0" + fromDate : fromDate;
        toYear = today.getFullYear();
        toMonth = today.getMonth() + 1;
        toMonth = toMonth < 10 ? "0" + toMonth : toMonth;
        toDate = today.getDate();
        toDate = toDate < 10 ? "0" + toDate : toDate;
        $("#" + fromId).val(fromYear + "-" + fromMonth + "-" + fromDate);
        $("#" + toId).val(toYear + "-" + toMonth + "-" + toDate)
    },
    holiday: function() {}
};
var form = {
    clear: function(formId) {
        var currentForm = $("#" + formId);
        var inputElement = currentForm.find("input").not(".no_clear");
        var selectElement = currentForm.find("select").not(".no_clear");
        var textareaElement = currentForm.find("textarea").not(".no_clear");
        var spanElement = currentForm.find("td > span").not(".no_clear");
        for (var l = 0; l < inputElement.length; l++)
            if (inputElement[l].type === "checkbox" || inputElement[l].type === "radio") $(inputElement[l]).attr("checked", false);
            else $(inputElement[l]).val("");
        for (var i =
            0; i < selectElement.length; i++) $(selectElement[i]).val("");
        for (var j = 0; j < textareaElement.length; j++) $(textareaElement[j]).val("");
        for (var k = 0; k < spanElement.length; k++) $(spanElement[k]).html("")
    }
};
var format = {
    tel: function(tel) {
        if (tel != null && tel !== "" && tel !== "null")
            if (tel.length === 8) return tel.replace(/([0-9]{4})([0-9]{4})/, "$1-$2");
            else return tel.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
        return tel
    },
    fax: function(fax) {
        if (fax != null && fax !== "" && fax !== "null")
            if (fax.length === 8) return fax.replace(/([0-9]{4})([0-9]{4})/, "$1-$2");
            else return fax.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
        return fax
    },
    mobile: function(no) {
        if (no != null && no !== "" && no !== "null") return no.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
            "$1-$2-$3");
        return no
    },
    post: function(no) {
        if (no != null && no !== "" && no !== "null") return no.replace(/([0-9]{3})([0-9]{3})/, "$1-$2");
        return no
    },
    bizNo: function(no) {
        if (no != null && no !== "" && no !== "null") return no.replace(/([0-9]{3})([0-9]{2})([0-9]{5})/, "$1-$2-$3");
        return no
    },
    cprNo: function(no) {
        if (no != null && no !== "" && no !== "null") return no.replace(/([0-9]{6})([0-9]{7})/, "$1-$2");
        return no
    },
    num: function(n) {
        var reg = /(^[+-]?\d+)(\d{3})/;
        n += "";
        while (reg.test(n)) n = n.replace(reg, "$1" + "," + "$2");
        return n
    },
    date: function(d) {
        return d.replace(/(\d{4})(\d{2})(\d{2})/,
            "$1-$2-$3")
    }
};
$.fn.serializeJson = function() {
    var o = {};
    $(this).find('input[type="hidden"], input[type="text"], input[type="number"], input[type="password"], input[type="checkbox"]:checked, input[type="radio"]:checked, select').each(function() {
        if ($(this).attr("type") === "hidden") {
            var $parent = $(this).parent();
            var $chb = $parent.find('input[type="checkbox"][name="' + this.name.replace(/\[/g, "[").replace(/\]/g, "]") + '"]');
            if ($chb != null)
                if ($chb.prop("checked")) return
        }
        if (this.name === null || this.name === "") return;
        var elemValue =
            null;
        if ($(this).is("select")) elemValue = $(this).find("option:selected").val();
        else elemValue = this.value;
        if (o[this.name]) o[this.name] = o[this.name] + "," + elemValue;
        else o[this.name] = elemValue
    });
    return o
};
var tag = {
    goodsImage: function(imgDomain, goodsId, imgPath, seq, size, alt, cls) {
        if (cls == null) cls = "";
        if (alt == null) alt = "";
        if (imgPath == null) return "";
        var ext = imgPath.substr(imgPath.lastIndexOf("."), imgPath.length);
        var imgSize = tag.getImgSize(size);
        var src = imgDomain + "/goods/" + goodsId + "/" + goodsId + "_" + seq + "_" + imgSize[0] + "x" + imgSize[1] + ext;
        var onError = "../_images/mall/common/default_image.jpg";
        return '<img src="' + src + '" alt="' + alt + '" class="' + cls + '" onerror="this.src=\'' + onError + "'\" />"
    },
    getImgSize: function(size) {
        if (size ===
            10) return ["600", "600"];
        else if (size === 20) return ["440", "440"];
        else if (size === 30) return ["374", "374"];
        else if (size === 40) return ["315", "315"];
        else if (size === 50) return ["280", "280"];
        else if (size === 60) return ["224", "224"];
        else if (size === 70) return ["167", "167"];
        else if (size === 80) return ["77", "77"];
        else return ["0", "0"]
    },
    listPage: function(recordPerPage, currentPage, totalRecord, indexPerPage) {
        var page = "";
        var block = parseInt(Math.ceil(currentPage / indexPerPage));
        var startPage = (block - 1) * indexPerPage + 1;
        var endPage = startPage +
            indexPerPage - 1;
        var totalPage = parseInt(Math.ceil(totalRecord / recordPerPage));
        if (endPage > totalPage) endPage = totalPage;
        var prevPage = currentPage - 1;
        if (currentPage === 1) prevPage = 1;
        var nextPage = currentPage + 1;
        if (nextPage > totalPage) nextPage = currentPage;
        if (currentPage > indexPerPage) {
            page += '<a href="javascript:goPage(1);" class="btn_paging first"><span>1</span></a>';
            page += '<a href="javascript:goPage(' + prevPage + ');" class="btn_paging prev"><span>' + prevPage + "</span></a>"
        }
        for (var i = startPage; i <= endPage; i++)
            if (i ===
                currentPage) page += '<strong class="current">' + i + "</strong>";
            else page += '<a href="javascript:goPage(' + i + ');"><span>' + i + "</span></a>";
        if (totalPage > endPage) {
            page += '<a href="javascript:goPage(' + nextPage + ');" class="btn_paging next"><span>' + nextPage + "</span></a>";
            page += '<a href="javascript:goPage(' + totalPage + ');" class="btn_paging end"><span>' + totalPage + "</span></a>"
        }
        return page
    }
};

function inputNumKey(event) {
    event = setDefaultIfNull(event, window.event);
    console.log("dsfsdf");
    if (event.shiftKey) return false;
    var keyID = event.which ? event.which : event.keyCode;
    if (keyID >= 48 && keyID <= 57 || keyID >= 96 && keyID <= 105 || keyID === 8 || keyID === 9 || keyID === 46) return true;
    else return false
}

function setDefaultIfNull(target, def) {
    return target || def
}

function logger(gb) {
    if (gb === "oper") {
        window["console"]["log"] = function() {};
        window["console"]["debug"] = function() {}
    }
}

function specialCharRemove(obj) {
    var value = $(obj).val();
    var pattern = /[~!#$^&*=+|:;?"<,.>'%@]/;
    if (pattern.test(value)) {
        for (var i = 0; i < value.length; i++) value = value.replace(pattern, "");
        var alertData = {
            title: "alert",
            content: "�뱀닔臾몄옄�� �낅젰�섏떎 �� �놁뒿�덈떎."
        };
        commonAlert(alertData);
        openLayer("commonAlert");
        $(obj).val(value.replace(pattern, ""));
        $(obj).focus()
    }
}

function specialCharRemoveSpace(obj) {
    var value = $(obj).val();
    var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\u318D\u119E\u11A2\u2022\u2025a\u00B7\uFE55)]/gi;
    if (pattern.test(value)) {
        var alertData = {
            title: "alert",
            content: "�뱀닔臾몄옄�� �낅젰�섏떎 �� �놁뒿�덈떎."
        };
        commonAlert(alertData);
        openLayer("commonAlert");
        $(obj).val(value.replace(pattern, ""));
        $(obj).focus()
    }
}

function NumberOnly(obj) {
    var value = $(obj).val();
    var pattern = /[^(0-9)]/gi;
    if (pattern.test(value)) {
        var alertData = {
            title: "alert",
            content: "怨꾩쥖踰덊샇�� �レ옄留� �낅젰�섏떎 �� �덉뒿�덈떎."
        };
        commonAlert(alertData);
        openLayer("commonAlert");
        $(obj).val(value.replace(pattern, ""));
        $(obj).focus()
    }
}

function fnComma(param) {
    if (param != null) {
        var numStr = param.toString().trim();
        var reg = /(^[+-]?\d+)(\d{3})/;
        while (reg.test(numStr)) numStr = numStr.replace(reg, "$1,$2");
        return numStr
    }
    return param
}

function fnMobilel(param) {
    if (param != null) {
        var numStr = param.toString().trim();
        numStr = numStr.replace("-", "");
        var reg = /(\d{3})(\d{3,4})(\d{4})/;
        if (numStr.match(reg)) numStr = numStr.replace(reg, "$1-$2-$3");
        return numStr
    }
    return param
}

function fnTel(param) {
    if (param != null) {
        var numStr = param.toString().trim();
        numStr = numStr.replace("-", "");
        var reg = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/;
        if (numStr.match(reg)) numStr = numStr.replace(reg, "$1-$2-$3");
        return numStr
    }
    return param
}

function createFormSubmit(id, url, data) {
    $("#" + id).remove();
    var method = "post";
    var form = document.createElement("form");
    form.setAttribute("action", url);
    form.setAttribute("id", id);
    form.setAttribute("method", method);
    form.setAttribute("style", "display:none;");
    if (data != null)
        if (data.constructor === Object)
            for (var key in data) {
                var input = document.createElement("input");
                input.setAttribute("type", "text");
                input.setAttribute("name", key);
                input.setAttribute("value", data[key]);
                form.appendChild(input)
            } else if (data.constructor ===
            Array)
            for (var i in data)
                for (var key$1 in data[i]) {
                    var input$2 = document.createElement("input");
                    input$2.setAttribute("type", "text");
                    input$2.setAttribute("name", key$1);
                    input$2.setAttribute("value", data[i][key$1]);
                    form.appendChild(input$2)
                }
    document.body.appendChild(form);
    document.getElementById(id).submit();
    $("#" + id).remove()
}

function fnCheckMobile() {
    var flag = false;
    var filter = "win16|win32|win64|mac";
    if (navigator.platform) flag = filter.indexOf(navigator.platform.toLowerCase()) < 0;
    return flag
}
var layerPost = {
    element_layer: undefined,
    open: function(options) {
        var param = {
            q: options.searchField === "" || options.searchField === undefined ? undefined : options.searchField,
            left: options.left === "" || options.left === undefined ? undefined : options.left,
            top: options.top === "" || options.top === undefined ? undefined : options.top,
            popupName: "�고렪 踰덊샇 李얘린",
            autoClose: true
        };
        var option = {
            oncomplete: options.oncomplete === undefined ? function(data) {} : options.oncomplete,
            onclose: options.onclose === undefined ? function(state) {} : options.onclose,
            onsearch: options.onsearch ===
            undefined ? function(data) {} : options.onsearch,
            width: options.width === "" || options.width === undefined ? "25%" : options.width,
            height: options.height === "" || options.height === undefined ? "50%" : options.height,
            animation: false,
            shorthand: true,
            pleaseReadGuide: options.pleaseReadGuide === "" || options.pleaseReadGuide === undefined ? 0 : options.pleaseReadGuide,
            maxSuggestItems: options.maxSuggestItems === "" || options.maxSuggestItems === undefined || options.maxSuggestItems > 10 ? 5 : options.maxSuggestItems,
            showMoreHName: false,
            hideMapBtn: false,
            hideEngBtn: false,
            alwaysShowEngAddr: false
        };
        (new daum.Postcode(option)).open(param)
    },
    embed: function(options) {
        var ele = document.createElement("div");
        ele.id = "popupAddress";
        var inHtml = "";
        inHtml += '<div class="layer-header"><h2>二쇱냼 寃���</h2></div>';
        inHtml += '<div class="layer-content" id="postDiv" ></div>';
        inHtml += '<button type="button" class="pop-close" data-focus-next="popupAddress" onclick="layerPost.close()">�앹뾽�リ린</button>';
        ele.innerHTML = inHtml;
        ele.setAttribute("data-popup-layer", "popupAddress");
        ele.setAttribute("data-focus",
            "popupAddress");
        ele.setAttribute("class", "layer-pop layer-normal layer-downCoupon");
        ele.setAttribute("style", "z-index:1000;display:block;");
        $("body").append(ele);
        $("body").append('<div id="mask" class="popupAddressMask" style="z-index:999;"></div>');
        this.element_layer = document.getElementById("postDiv");
        var param = {
            q: options.searchField === "" || options.searchField === undefined ? undefined : options.searchField,
            autoClose: options.autoClose === "" || options.autoClose === undefined ? true : false
        };
        var option = {
            oncomplete: function(data) {
                options.oncomplete(data);
                layerPost.close();
                $(".popupAddressMask").remove()
            },
            onresize: options.onresize === undefined ? function(size) {} : options.onresize,
            onclose: options.onclose === undefined ? function(state) {} : options.onclose,
            onsearch: options.onsearch === undefined ? function(data) {} : options.onsearch,
            width: options.width === "" || options.width === undefined ? "25%" : options.width,
            height: options.height === "" || options.height === undefined ? "50%" : options.height,
            animation: options.animation === undefined || options.animation === "" ? false : true,
            shorthand: options.shorthand ===
            "" || options.shorthand === undefined ? true : false,
            pleaseReadGuide: options.pleaseReadGuide === "" || options.pleaseReadGuide === undefined ? 0 : options.pleaseReadGuide,
            maxSuggestItems: options.maxSuggestItems === "" || options.maxSuggestItems === undefined || options.maxSuggestItems > 10 ? 5 : options.maxSuggestItems,
            showMoreHName: options.showMoreHName === "" || options.showMoreHName === undefined ? false : true,
            hideMapBtn: options.hideMapBtn === "" || options.hideMapBtn === undefined ? false : true,
            hideEngBtn: options.hideEngBtn === "" || options.hideEngBtn ===
            undefined ? false : true,
            alwaysShowEngAddr: options.alwaysShowEngAddr === "" || options.alwaysShowEngAddr === undefined ? false : true
        };
        (new daum.Postcode(option)).embed(layerPost.element_layer, param);
        layerPost.element_layer.style.display = "block";
        layerPost.init()
    },
    layerEmbed: function(options) {
        var ele = document.createElement("div");
        ele.id = "popupAddress";
        var inHtml = "";
        inHtml += '<div class="layer-header"><h2>二쇱냼 寃���</h2></div>';
        inHtml += '<div class="layer-content" id="postDiv" ></div>';
        inHtml += '<button type="button" class="pop-close" data-focus-next="popupAddress" onclick="layerPost.layerClose()">�앹뾽�リ린</button>';
        ele.innerHTML = inHtml;
        ele.setAttribute("data-popup-layer", "popupAddress");
        ele.setAttribute("data-focus", "popupAddress");
        ele.setAttribute("class", "layer-pop layer-normal layer-downCoupon");
        ele.setAttribute("style", "z-index:1000;display:block;");
        $("body").append(ele);
        $("body").append('<div id="mask" class="popupAddressMask" style="z-index:999;"></div>');
        this.element_layer = document.getElementById("postDiv");
        var param = {
            q: options.searchField === "" || options.searchField === undefined ? undefined : options.searchField,
            autoClose: options.autoClose === "" || options.autoClose === undefined ? true : false
        };
        var option = {
            oncomplete: function(data) {
                options.oncomplete(data);
                layerPost.close();
                $(".popupAddressMask").remove()
            },
            onresize: options.onresize === undefined ? function(size) {} : options.onresize,
            onclose: options.onclose === undefined ? function(state) {} : options.onclose,
            onsearch: options.onsearch === undefined ? function(data) {} : options.onsearch,
            width: options.width === "" || options.width === undefined ? "25%" : options.width,
            height: options.height === "" ||
            options.height === undefined ? "50%" : options.height,
            animation: options.animation === undefined || options.animation === "" ? false : true,
            shorthand: options.shorthand === "" || options.shorthand === undefined ? true : false,
            pleaseReadGuide: options.pleaseReadGuide === "" || options.pleaseReadGuide === undefined ? 0 : options.pleaseReadGuide,
            maxSuggestItems: options.maxSuggestItems === "" || options.maxSuggestItems === undefined || options.maxSuggestItems > 10 ? 5 : options.maxSuggestItems,
            showMoreHName: options.showMoreHName === "" || options.showMoreHName ===
            undefined ? false : true,
            hideMapBtn: options.hideMapBtn === "" || options.hideMapBtn === undefined ? false : true,
            hideEngBtn: options.hideEngBtn === "" || options.hideEngBtn === undefined ? false : true,
            alwaysShowEngAddr: options.alwaysShowEngAddr === "" || options.alwaysShowEngAddr === undefined ? false : true
        };
        (new daum.Postcode(option)).embed(layerPost.element_layer, param);
        layerPost.element_layer.style.display = "block";
        layerPost.init()
    },
    init: function() {
        var width = 300;
        var height = 480;
        var borderWidth = 5;
        layerPost.element_layer.style.height =
            height + "px";
        layerPost.element_layer.style.left = ((window.innerWidth || document.documentElement.clientWidth) - width) / 2 - borderWidth + "px";
        layerPost.element_layer.style.top = ((window.innerHeight || document.documentElement.clientHeight) - height) / 2 - borderWidth + "px"
    },
    close: function() {
        if (event === undefined) $("[data-focus=detailAddress]").focus();
        else $("[data-focus=popupAddress]").focus();
        $("#popupAddress").remove();
        $(".popupAddressMask").remove();
        $("body").css("overflow", "")
    },
    layerClose: function() {
        if (event === undefined) $("[data-focus=detailAddress]").focus();
        else $("[data-focus=popupAddress]").focus();
        $("#popupAddress").remove();
        $(".popupAddressMask").remove()
    }
};
var LAYERZINDEX = 300;
var commonCpPop = {
    openPopupCallback: null,
    closePopupCallback: null,
    target: null,
    init: function() {
        commonCpPop.openPopupCallback = "";
        commonCpPop.closePopupCallback = "";
        commonCpPop.target = ""
    },
    setOpenPopupCallback: function(callback) {
        commonCpPop.openPopupCallback = callback
    },
    setClosePopupCallback: function(callback) {
        commonCpPop.closePopupCallback = callback
    },
    callOpenPopupCallback: function(data) {
        if (typeof commonCpPop.openPopupCallback === "function") commonCpPop.openPopupCallback(data);
        else if (typeof commonCpPop.openPopupCallback ===
            "string") window[commonCpPop.openPopupCallback](data)
    },
    callClosePopupCallback: function(data) {
        if (typeof commonCpPop.closePopupCallback === "function") commonCpPop.closePopupCallback(data);
        else if (typeof commonCpPop.closePopupCallback === "string") window[commonCpPop.closePopupCallback](data)
    },
    openPopup: function() {
        var t = commonCpPop.target;
        var showTarget = $("#" + commonCpPop.target);
        if ($(".layer-pop").is(":visible")) LAYERZINDEX++;
        else LAYERZINDEX = 300;
        showTarget.removeAttr("style").addClass("active").css("z-index",
            LAYERZINDEX).attr("aria-hidden", false).attr("data-zindex", LAYERZINDEX).focus();
        showTarget.find(".pop-close").data("activeTarget", t);
        if (!showTarget.hasClass("embed")) $("body *").not($("#" + t)).not($("#" + t).parents()).not($("#" + t).find("*")).not($("[data-popup-target=" + t + "]").parents()).not($("[data-popup-target=" + t + "]")).attr("aria-hidden", true);
        if (!showTarget.hasClass("nomask")) {
            var zidx = parseInt($("#" + t).attr("data-zindex")) - 1;
            $("body").append("<div id='mask' data-mask-target='" + t + "' style='z-index:" +
                zidx + "'></div>");
            $("#mask").fadeIn().data("activeTarget", t);
            scrollLock("lock")
        }
    },
    closePopup: function() {
        var t = commonCpPop.target;
        var activeTarget = $("[data-popup-layer=" + t + "]");
        if (!activeTarget.hasClass("active")) {
            scrollLock("unlock");
            return
        }
        activeTarget.removeAttr("style").removeClass("active").removeAttr("data-zindex").attr("aria-hidden", true);
        if (!$(".layer-pop").not("#latestItemLayer").is(":visible")) $("body").css("overflow", "");
        $("#mask[data-mask-target='" + t + "']").fadeOut("fast").remove();
        $("[data-popup-target=" +
            t + "]").focus();
        if (!activeTarget.hasClass("embed")) $("body *").not($("#" + t)).not($("#" + t).parents()).not($("#" + t).find("*")).not($("[data-popup-target=" + t + "]").parents()).not($("[data-popup-target=" + t + "]")).removeAttr("aria-hidden");
        scrollLock("unlock");
        LAYERZINDEX--
    },
    downloadCouponPopup: function(target, param) {
        $("#" + target).empty();
        commonCpPop.target = target;
        if (param && param.hasOwnProperty("goodsId")) {
            var options = {
                url: param.prefix + "coupon/goods/search/",
                data: {},
                dataType: "html",
                done: function(data) {
                    $("#" +
                        target).empty();
                    $("#" + target).html(data);
                    commonCpPop.openPopup();
                    commonCpPop.callOpenPopupCallback(data)
                }
            };
            options.data.goodsId = param.goodsId;
            ajax.call(options)
        }
    },
    serialCouponPopup: function(target, param) {
        $("#" + target).addClass("layer-eventcode").addClass("active");
        $("#" + target).empty();
        commonCpPop.target = target;
        if (param && param.hasOwnProperty("goodsId")) {
            var options = {
                url: param.prefix + "coupon/goods/serial/",
                data: {
                    goodsId: param.goodsId
                },
                dataType: "html",
                done: function(data) {
                    $("#" + target).empty();
                    $("#" +
                        target).append(data);
                    openLayer(target);
                    commonCpPop.callOpenPopupCallback(data)
                }
            };
            ajax.call(options)
        }
    }
};

function getWindowOpenConfig(obj, exceptKeyArr) {
    var arr = [];
    exceptKeyArr = exceptKeyArr == undefined || exceptKeyArr === [] || exceptKeyArr === "" ? exceptKeyArr = [] : exceptKeyArr;
    for (var key in obj) {
        var ele = key + "=" + obj[key];
        if (exceptKeyArr.indexOf(key) === -1) arr.push(ele)
    }
    var queryStr = arr.join(",");
    return queryStr
}

function getQueryStr(obj, exceptKeyArr) {
    var arr = [];
    exceptKeyArr = exceptKeyArr == undefined || exceptKeyArr === [] || exceptKeyArr === "" ? exceptKeyArr = [] : exceptKeyArr;
    for (var key in obj) {
        var ele = key + "=" + obj[key];
        if (exceptKeyArr.indexOf(key) === -1) arr.push(ele)
    }
    var queryStr = arr.join("&");
    return queryStr
}
var newWindow;

function newWindowAndSubmit(options, target) {
    target = target != undefined && target != "" ? target : "targetPop";
    var config = {
        width: (window.innerWidth || document.documentElement.clientWidth) / 2,
        height: (window.innerHeight || document.documentElement.clientHeight) / 5 * 4,
        left: (window.innerWidth || document.documentElement.clientWidth) / 2,
        top: window.screenTop,
        resizable: "yes",
        scrollbars: "yes"
    };
    config.width = options.width != undefined ? options.width : config.width;
    config.height = options.height != undefined ? options.height : config.height;
    config.top = options.top != undefined ? options.top : config.top;
    config.left = options.left != undefined ? config.left : options.left;
    if (options.nice != undefined && options.nice != null) {
        config.width = 460;
        config.height = 740;
        config.top = ((window.innerHeight || document.documentElement.clientHeight) - config.height) / 2;
        config.left = ((window.innerWidth || document.documentElement.clientWidth) - config.width) / 2
    }
    config.width = config.width < 350 ? window.innerWidth || document.documentElement.clientWidth : config.width;
    config.height = config.width <
    350 ? (window.innerHeight || document.documentElement.clientHeight) / 5 * 2 : config.height;
    config.fullscreen = "no";
    config.menubar = "no";
    config.status = "no";
    config.toolbar = "no";
    config.titlebar = "no";
    config.location = "no";
    var configStr = getWindowOpenConfig(config);
    newWindow = window.open(options.stContextPath + "common/newWindow", target, configStr);
    var id = "tempForm";
    var url = options.url;
    var method = options.method == undefined || options.method === "" ? "POST" : options.method;
    var data = options.data === undefined || options.data === {} ? {} :
        options.data;
    var keys = [];
    for (var key$3 in data) keys.push(key$3);
    var agent = navigator.userAgent.toLowerCase();
    if (navigator.appName === "Netscape" && agent.indexOf("trident") !== -1 || agent.indexOf("msie") !== -1) {
        var form$4 = newWindow.document.createElement("form");
        form$4.setAttribute("id", id);
        form$4.setAttribute("action", url);
        form$4.setAttribute("method", method);
        var size = keys.length;
        for (var i = 0; i < size; i += 1) {
            var key$5 = keys[i];
            var value$6 = data[key$5];
            var input = newWindow.document.createElement("input");
            input.setAttribute("name",
                key$5);
            input.setAttribute("id", key$5);
            input.setAttribute("value", value$6);
            input.setAttribute("type", "hidden");
            form$4.appendChild(input)
        }
        newWindow.document.appendChild(form$4);
        newWindow.document.getElementById(id).submit()
    } else {
        var size$7 = keys.length;
        var innerHtml = "<form id='" + id + "' action='" + url + "' method='" + method + "' target='" + target + "' >";
        for (var i$8 = 0; i$8 < size$7; i$8 += 1) {
            var key = keys[i$8];
            var value = data[key];
            innerHtml += "<input type='hidden' id='" + key + "' name='" + key + "' value='" + value + "' />"
        }
        innerHtml +=
            "</form>";
        $(document.body).append(innerHtml);
        document.getElementById(id).submit();
        $("#" + id).remove()
    }
}

function timestampToString(timestamp) {
    var d = new Date(timestamp),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-")
}
var captCha = {
    data: undefined,
    setData: function() {
        captCha.data = {
            key: $("#key").val(),
            path: $("#path").val(),
            type: $("#type").val(),
            captchaValue: $("#captchaValue").val()
        }
    },
    rootPath: undefined,
    defaultRequestUrl: "xhr/common/imageView?filePath=",
    create: function(stContextPath) {
        captCha.rootPath = stContextPath;
        var options = {
            url: stContextPath + "common/naverCaptchaView/",
            data: {},
            dataType: "html",
            done: function(html) {
                $("#captChaDiv").replaceWith(html)
            }
        };
        ajax.call(options)
    },
    checkOverlap: function() {
        if ($("#currentWavPlayer").length >
            -1) $("#currentWavPlayer").remove()
    },
    refresh: function() {
        captCha.setData();
        var url = captCha.rootPath + "xhr/common/naverCaptcha";
        var options = {
            url: url,
            data: captCha.data,
            done: function(result) {
                var type = captCha.data.type;
                if (type === "image") {
                    $("#capAudio").css("display", "block");
                    $("#capImage").css("display", "none");
                    $("#captcha").attr("src", captCha.rootPath + captCha.defaultRequestUrl + result.data.captcha)
                } else {
                    $("#capImage").css("display", "block");
                    $("#capAudio").css("display", "none");
                    var agent = navigator.userAgent.toLowerCase();
                    captCha.checkOverlap();
                    if (navigator.appName == "Netscape" && agent.indexOf("trident") != -1 || agent.indexOf("msie") != -1) {
                        var newPlayer = document.createElement("bgsound");
                        newPlayer.setAttribute("id", "currentWavPlayer");
                        newPlayer.setAttribute("src", captCha.rootPath + captCha.defaultRequestUrl + result.data.captcha);
                        document.body.appendChild(newPlayer);
                        return
                    } else {
                        var newPlayer$9 = document.createElement("audio");
                        newPlayer$9.setAttribute("id", "currentWavPlayer");
                        newPlayer$9.setAttribute("src", captCha.rootPath + captCha.defaultRequestUrl +
                            result.data.captcha);
                        document.body.appendChild(newPlayer$9);
                        newPlayer$9.play()
                    }
                }
                captCha.init(result.data)
            }
        };
        ajax.call(options)
    },
    getFile: function(type) {
        $("#type").val(type);
        captCha.setData();
        var url = captCha.rootPath + "xhr/common/naverCaptcha";
        var options = {
            url: url,
            data: captCha.data,
            done: function(result) {
                if (type === "image") {
                    $("#capAudio").css("display", "block");
                    $("#capImage").css("display", "none");
                    $("#captcha").attr("src", captCha.rootPath + captCha.defaultRequestUrl + result.data.captcha)
                } else {
                    $("#capImage").css("display",
                        "block");
                    $("#capAudio").css("display", "none");
                    $("#captcha").attr("src", captCha.rootPath + captCha.defaultRequestUrl + result.data.captcha);
                    var agent = navigator.userAgent.toLowerCase();
                    captCha.checkOverlap();
                    if (navigator.appName == "Netscape" && agent.indexOf("trident") != -1 || agent.indexOf("msie") != -1) {
                        var newPlayer = document.createElement("bgsound");
                        newPlayer.setAttribute("id", "currentWavPlayer");
                        newPlayer.setAttribute("src", captCha.rootPath + captCha.defaultRequestUrl + result.data.captcha);
                        document.body.appendChild(newPlayer);
                        return
                    } else {
                        var newPlayer$10 = document.createElement("audio");
                        newPlayer$10.setAttribute("id", "currentWavPlayer");
                        newPlayer$10.setAttribute("src", captCha.rootPath + captCha.defaultRequestUrl + result.data.captcha);
                        document.body.appendChild(newPlayer$10);
                        newPlayer$10.play()
                    }
                }
                captCha.init(result.data)
            }
        };
        ajax.call(options)
    },
    cert: function(config) {
        captCha.setData();
        var url = captCha.rootPath + "xhr/common/checkCaptcha";
        var formData = captCha.data;
        var result = true;
        for (var key in formData)
            if (formData[key] === "") result =
                false;
        if (result) {
            var options = {
                url: url,
                data: formData,
                done: function(data) {
                    config.done(data);
                    $("#captcha").attr("src", captCha.rootPath + captCha.defaultRequestUrl + data.captcha);
                    captCha.init(data)
                }
            };
            ajax.call(options)
        }
    },
    init: function(data) {
        if (data != undefined && data != {})
            for (var key in data)
                if (key === "captcha") $("#path").val(data[key]);
                else $("#" + key).val(data[key]);
        $("#captchaValue").val("")
    }
};

function dateToStringFormat(date, format) {
    var yearSize = 4;
    var monthSize = 2;
    var daySize = 2;
    format = format === undefined || format === "" ? "yyyy-MM-dd" : format;
    var datepickerDay = date;
    var year = datepickerDay.getFullYear().toString();
    var month = (datepickerDay.getMonth() + 1).toString().length === 1 ? "0" + (datepickerDay.getMonth() + 1).toString() : (datepickerDay.getMonth() + 1).toString();
    var day = datepickerDay.getDate().toString().length === 1 ? "0" + datepickerDay.getDate().toString() : datepickerDay.getDate().toString();
    var yearFormat =
        format.match(/y/gi).length;
    var monthFormat = format.match(/M/gi).length;
    var dayFormat = format.match(/d/gi).length;
    var splitArr = format.split(/[a-zA-Z]/).filter(function(ele) {
        return ele != ""
    });
    if (splitArr.length === 0) {
        splitArr[0] = "";
        splitArr[1] = ""
    }
    year = year.substr(yearSize - yearFormat, yearFormat);
    month = month.substr(monthSize - monthFormat, monthFormat);
    day = day.substr(daySize - dayFormat, dayFormat);
    return year + splitArr[0] + month + splitArr[1] + day
}

function getCurrentTime() {
    return toTimeString(new Date, "N")
}

function toTimeString(date, secondYn) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var second = date.getSeconds();
    if (("" + month).length == 1) month = "0" + month;
    if (("" + day).length == 1) day = "0" + day;
    if (("" + hour).length == 1) hour = "0" + hour;
    if (("" + min).length == 1) min = "0" + min;
    if (("" + second).length == 1) second = "0" + second;
    if (secondYn === "Y") return "" + year + month + day + hour + min + second;
    else return "" + year + month + day + hour + min
}

function setDatePicker(options) {
    var option = {
        prevText: options.prevText === undefined ? "�댁쟾 ��" : options.prevText,
        nextText: options.dateFormat === undefined ? "�ㅼ쓬 ��" : options.nextText,
        monthNames: ["1��", "2��", "3��", "4��", "5��", "6��", "7��", "8��", "9��", "10��", "11��", "12��"],
        monthNamesShort: ["1��", "2��", "3��", "4��", "5��", "6��", "7��", "8��", "9��", "10��", "11��", "12��"],
        dayNames: ["��", "��", "��", "��", "紐�", "湲�", "��"],
        dayNamesShort: ["��", "��", "��", "��", "紐�", "湲�", "��"],
        dayNamesMin: ["��", "��", "��", "��", "紐�", "湲�", "��"],
        showMonthAfterYear: options.dateFormat === undefined ?
            true : options.showMonthAfterYear,
        yearSuffix: "��",
        dateFormat: options.dateFormat === undefined ? "yy-mm-dd" : options.dateFormat,
        beforeShow: options.beforeShow === undefined ? undefined : options.beforeShow,
        beforeShowDay: options.beforeShowDay === undefined ? undefined : options.beforeShowDay
    };
    var disabledType = options.disabledType === undefined ? "00" : options.disabledType;
    var holidays = options.holidays === undefined ? [] : options.holidays;
    var activeDays = options.activeDays === undefined ? [] : options.activeDays;
    if (disabledType === "10") option =
        setDatePickerDisableType10(option);
    else if (disabledType === "20") option = setDatePickerDisableType20(option, holidays, activeDays);
    else if (disabledType === "30") option = setDatePickerDisableType30(option, holidays, activeDays);
    $.datepicker.setDefaults(option)
}

function setDatePickerDisableType10(option) {
    option.beforeShowDay = function(date) {
        var isWeekend = date.getDay() === 0 || date.getDay() === 6 ? false : true;
        var result = [isWeekend];
        return result
    };
    return option
}

function setDatePickerDisableType20(option, holidays, activeDays) {
    holidays = holidays.filter(function(e) {
        return fnCheckDayysFilter(e)
    });
    option.beforeShowDay = function(date) {
        var dateStr = dateToStringFormat(date, "yyyyMMdd");
        var isDisabled = true;
        if (activeDays.length > 0) {
            activeDays = activeDays.filter(function(e) {
                return fnCheckDayysFilter(e)
            });
            isDisabled = date.getDay() === 0 || date.getDay() === 6 || holidays.indexOf(dateStr) > -1 || activeDays.indexOf(dateStr) === -1 ? false : true
        } else isDisabled = date.getDay() === 0 || date.getDay() ===
        6 || holidays.indexOf(dateStr) > -1 ? false : true;
        return [isDisabled]
    };
    return option
}

function setDatePickerDisableType30(option, holidays, activeDays) {
    holidays = holidays.filter(function(e) {
        return fnCheckDayysFilter(e)
    });
    option.beforeShowDay = function(date) {
        var dateStr = dateToStringFormat(date, "yyyyMMdd");
        var isDisabled = true;
        if (activeDays.length > 0) {
            activeDays = activeDays.filter(function(e) {
                return fnCheckDayysFilter(e)
            });
            isDisabled = holidays.indexOf(dateStr) > -1 || activeDays.indexOf(dateStr) === -1 ? false : true
        } else isDisabled = holidays.indexOf(dateStr) > -1 ? false : true;
        return [isDisabled]
    };
    return option
}

function fnCheckDayysFilter(e) {
    if (typeof e === "string") return e.replace(/[!@#$%^~*+=-]/gi, "");
    else if (typeof e === "object") return dateToStringFormat(e, "yyyyMMdd");
    else return e.toString()
}

function closePop(obj) {
    $(obj).removeClass("active");
    $("#mask").remove();
    var _thisCheck = $(obj).filter("#latestItemLayer");
    if (!!_thisCheck) {
        $(obj).attr({
            "tabindex": "-1",
            "style": ""
        });
        $("#btn-rcntgoods-floating").focus()
    }
}

function closeRecentPop(obj) {
    $(obj).removeClass("active");
    $("#mask").remove();
    if (!$(".layer-pop").not("#latestItemLayer").is(":visible")) $("body").css("overflow", "")
}

function getRecentGoods(separator) {
    var stPath = $("#btn-rcntgoods-floating").data("st-path");
    var options = {
        url: stPath + "xhr/goods/getRecentViewGoods",
        dataType: "html",
        done: function(data) {
            var appendData = $(data).find(".latestItmList");
            var changeImgSrc = appendData.first().find("img").attr("src");
            var changeImgAlt = appendData.first().find("img").attr("alt");
            $(".menu04").find("img").attr("src", changeImgSrc);
            $(".menu04").find("span").html("<img src='" + changeImgSrc + "' alt='" + changeImgAlt + "'> 理쒓렐 蹂� �쒗뭹 (" + appendData.length +
                ")");
            $("#latestItemLayer").html(data);
            if (appendData.length < 1) {
                $("#latestItemLayer").find(".pop-close").trigger("click");
                $(".menu04").hide()
            }
        }
    };
    ajax.call(options)
}

function deleteRecentGoods(param) {
    var stPath = $(".btn-list-delete").data("st-path");
    var data;
    if (param === "Y") data = {
        allCookie: "Y"
    };
    else data = {
        goodsId: param
    };
    var options = {
        url: stPath + "xhr/goods/deleteRecentViewGoods",
        data: data,
        done: function() {
            getRecentGoods()
        }
    };
    ajax.call(options)
}
String.prototype.formatComma = function() {
    var v = this + "";
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = v.split(",").join("").replace(/^\s*|\s*$/g, "");
    while (reg.test(n)) n = n.replace(reg, "$1" + "," + "$2");
    return n
};
Number.prototype.formatComma = function() {
    if (this == 0) return "0";
    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = this + "";
    while (reg.test(n)) n = n.replace(reg, "$1" + "," + "$2");
    return n
};
Date.prototype.addDay = function(day) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + day);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date
};
Date.prototype.addMonth = function(month) {
    var date = new Date(this.valueOf());
    date.setMonth(date.getMonth() + month);
    return date
};
Date.prototype.dateFormat = function(f) {
    var d = this;
    var date = d.getFullYear() + "-" + (d.getMonth() + 1).zeroformat(2) + "-" + d.getDate().zeroformat(2) + " " + d.getHours().zeroformat(2) + ":" + d.getMinutes().zeroformat(2) + ":" + d.getSeconds().zeroformat(2);
    return date.dateFormat(f)
};
String.prototype.zeroformat = function(len) {
    var s = this + "";
    while (s.length < len) s = "0" + s;
    return s
};
Number.prototype.zeroformat = function(len) {
    return this.toString().zeroformat(len)
};
String.prototype.dateFormat = function(f, a) {
    if (!this.valueOf()) return "";
    var t = (this + "").replaceAll("-", "").replaceAll(".", "").replaceAll(":", "").replaceAll(" ", "");
    if (t.substring(0, 4) == "9999") return "臾댁젣��";
    var d = new Date;
    switch (t.length) {
        case 6:
            d = new Date(d.getFullYear(), d.getMonth() + 1, d.getDate(), eval(t.substring(0, 2)), eval(t.substring(2, 4)), eval(t.substring(4, 6)), 0);
            break;
        case 8:
            d = new Date(eval(t.substring(0, 4)), eval(t.substring(4, 6)) - 1, eval(t.substring(6, 8)), 0, 0, 0, 0);
            break;
        case 10:
            d = new Date(eval(t.substring(0,
                4)), eval(t.substring(4, 6)) - 1, eval(t.substring(6, 8)), eval(t.substring(8, 10)), 0, 0, 0);
            break;
        case 12:
            d = new Date(eval(t.substring(0, 4)), eval(t.substring(4, 6)) - 1, eval(t.substring(6, 8)), eval(t.substring(8, 10)), eval(t.substring(10, 12)), 0, 0);
            break;
        case 14:
            d = new Date(eval(t.substring(0, 4)), eval(t.substring(4, 6)) - 1, eval(t.substring(6, 8)), eval(t.substring(8, 10)), eval(t.substring(10, 12)), eval(t.substring(12, 14)), 0);
            break;
        default:
            break
    }
    if (a) d.setTime(d.getTime() + 1E3 * 3600 * 24 * a);
    var weekName1 = ["�쇱슂��", "�붿슂��", "�붿슂��",
        "�섏슂��", "紐⑹슂��", "湲덉슂��", "�좎슂��"
    ];
    var weekName2 = ["��", "��", "��", "��", "紐�", "湲�", "��"];
    var h;
    var result = f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy":
                return d.getFullYear();
            case "yy":
                return (d.getFullYear() % 1E3).zeroformat(2);
            case "MM":
                return (d.getMonth() + 1).zeroformat(2);
            case "dd":
                return d.getDate().zeroformat(2);
            case "E":
                return weekName1[d.getDay()];
            case "e":
                return weekName2[d.getDay()];
            case "HH":
                return d.getHours().zeroformat(2);
            case "hh":
                return ((h = d.getHours() % 12) ? h : 12).zeroformat(2);
            case "mm":
                return d.getMinutes().zeroformat(2);
            case "ss":
                return d.getSeconds().zeroformat(2);
            case "a/p":
                return d.getHours() < 12 ? "�ㅼ쟾" : "�ㅽ썑";
            default:
                return $1
        }
    });
    return result
};
Number.prototype.dateFormat = function(f, a) {
    if (!this.valueOf()) return "";
    var d = new Date(this);
    if (a) d.setTime(d.getTime() + 1E3 * 3600 * 24 * a);
    var weekName1 = ["�쇱슂��", "�붿슂��", "�붿슂��", "�섏슂��", "紐⑹슂��", "湲덉슂��", "�좎슂��"];
    var weekName2 = ["��", "��", "��", "��", "紐�", "湲�", "��"];
    var result = f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy":
                return d.getFullYear();
            case "yy":
                return (d.getFullYear() % 1E3).zeroformat(2);
            case "MM":
                return (d.getMonth() + 1).zeroformat(2);
            case "dd":
                return d.getDate().zeroformat(2);
            case "E":
                return weekName1[d.getDay()];
            case "e":
                return weekName2[d.getDay()];
            case "HH":
                return d.getHours().zeroformat(2);
            case "hh":
                return (d.getHours() % 12 ? d.getHours() : 12).zeroformat(2);
            case "mm":
                return d.getMinutes().zeroformat(2);
            case "ss":
                return d.getSeconds().zeroformat(2);
            case "a/p":
                return d.getHours() < 12 ? "�ㅼ쟾" : "�ㅽ썑"
        }
        return $1
    });
    return result
};
$(function() {
    $(".type-number").on("keyup keypress blur change", function(event) {
        $(this).val($(this).val().replace(/[^0-9]/g, ""))
    })
});

function logger(gb) {
    if (gb === "prd") {
        window["console"]["log"] = function() {};
        window["console"]["debug"] = function() {}
    }
}

function getGoodsSpecInfo(param) {
    var options = {
        url: "xhr/goods/goodsSpec",
        dataType: "html",
        data: param,
        async: false,
        done: function(html) {
            return html
        }
    };
    ajax.call(options)
}

function getGoodsSpecList(specParam) {
    var rtnHtml = "";
    var options = {
        url: "/sec/xhr/goods/getGoodsSpecList",
        dataType: "html",
        data: specParam,
        async: false,
        done: function(html) {
            rtnHtml = html
        }
    };
    ajax.call(options);
    return rtnHtml
};


//cookie getValue
function getCookie( name ){  
   var nameOfCookie = name + "=";
   var x = 0;
   while ( x <= document.cookie.length ){
       var y = (x+nameOfCookie.length);
       if ( document.cookie.substring( x, y ) == nameOfCookie ) { 
           if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )   
           	endOfCookie = document.cookie.length; 
               return unescape( document.cookie.substring( y, endOfCookie ) ); 
       }  
       x = document.cookie.indexOf( " ", x ) + 1;  
       if ( x == 0 )  break;  
   }  
   return ""; 
}

function setCookie(name, value, exp){
	var date = new Date();
	date.setTime(date.getTime()+exp*24*60*60*1000);
	document.cookie=name+'='+value+';expires='+date.toUTCString()+';path=/';
}

function doLogout(){ //媛ㅼ틺�ㅻ뒗 evt/common.js留� include
	var uAgent = navigator.userAgent.toUpperCase();
	try{
		if( window.secapp !== undefined && (uAgent.indexOf("SECAPP") > -1||uAgent.indexOf("SECTEST")>-1) ){
			window.secapp.logout();
			var eventParam = {
					eventName : "App_logout"
					, attrModel : {
						service_id: 'GCS'
					}
			};
			window.secapp.customEvent(JSON.stringify(eventParam));
		}
	} catch (exception){
		
	}
	location.href = "/event/galaxycampus/member/logout/";
}