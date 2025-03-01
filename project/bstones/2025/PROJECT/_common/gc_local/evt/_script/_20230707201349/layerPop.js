function openLayer(t, callback) {
    var showTarget = $("[data-popup-layer=" + t + "]");

	if ($(".layer-pop").is(":visible")) {
		LAYERZINDEX++; // 200729 �앹뾽 �� 媛� �댁긽 �꾩슱 寃쎌슦 z-index ++
	} else {
		LAYERZINDEX = 300; // 200729 �앹뾽 �� 媛� �댁긽 �꾩슱 寃쎌슦 z-index ++
	}
	showTarget.removeAttr("style").addClass('active').css("z-index", LAYERZINDEX).attr("aria-hidden", false).attr("data-zindex", LAYERZINDEX).focus(); // 200729 z-index 媛� data attr�� ����
    showTarget.find(".pop-close").data("activeTarget", t);

	// layerOpt(showTarget,'open');
	// 2021-11-03 KDP-7422 �앹뾽�꾩튂 �ㅻ쪟 �섏젙
    // 230413 KDP-28261 �앹뾽�섏젙
	// if (device.isApp == true && device.val === 'm' && showTarget.hasClass('layer-normal')) {
	// 	showTarget.css('top', device.appHgt + 'px');
	// }

	// �ㅻ뱶�앹뾽 留덉뒪�� �앹꽦 諛� �쒖꽦��  // 200729
    if (!showTarget.hasClass("nomask")) {
		var zidx = parseInt($("#" + t).attr("data-zindex")) - 1;
        $("body").append("<div id='mask' data-mask-target='" + t + "' style='z-index:" + zidx + "'></div>");
        $("#mask").fadeIn().data("activeTarget", t);
		scrollLock('lock');
		//$("body").css("overflow","hidden");
	};

	// 紐⑥븘蹂닿린 slick reset ��
    if (showTarget.is("#gatherview, #layerSlick, #popupProdCode")) {
		$('.mediaslide, .modelslide, .filter-slick, .visualslide').slick('setPosition');
		$('.mediaslide-navi, .modelslide-navi, .visualslide-navi').slick('setPosition');
	}

	//	/* 荑좏룿 �깅줉 �앹뾽 �덉쇅泥섎━ : transform ��젣�� �곕Ⅸ �꾩튂(留덉쭊) 媛� �명똿 */
	//	if (t === 'popupCoupon') {
	//		var $obj = $('#' + t ),
	//			$objWidth = $obj.outerWidth(),
	//			$objHeight = $obj.outerHeight();
	//		$obj.css({ 'margin-left': Math.round(-($objWidth / 2)) + 'px', 'margin-top': Math.round(-($objHeight / 2)) + 'px', 'transform' : 'none' });
	//	}

	showTarget.focus();
	
	if (typeof accessibility !== 'undefined'
		&&  typeof accessibility.bind === 'function') {
		accessibility.bind();
    }
	$("#commonAlert a").focus();
}

function closeLayer(t, callback) {
    var activeTarget = $("[data-popup-layer=" + t + "]");

	if (!activeTarget.hasClass("active")) {
		return;
	}

	activeTarget.removeAttr("style").removeClass("active").removeAttr("data-zindex").attr("aria-hidden", true);  // 200729
	// layerOpt(activeTarget,'close');
	scrollLock('unlock');
	//if(!$(".layer-pop").not("#latestItemLayer").is(":visible")) $("body").css("overflow",""); // 200729 �앹뾽 紐⑤몢 �ロ엺 �꾩뿉 overflow hidden �댁젣  //20200813 理쒓렐蹂� �곹뭹 �덉씠�� �쒖쇅.
	$("#mask[data-mask-target='" + t + "']").fadeOut("fast").remove();  // 200729
    $("[data-popup-target=" + t + "]").focus();

	LAYERZINDEX--;  // 200729 �덉씠�댄뙘�� z-index媛� 珥덇린��

    $("#commonAlert h2").text("");
    $("#commonAlert p").html("");
    $("#commonAlert a").text("�뺤씤");
	$("#commonAlert a").attr("onclick", "closeLayer('commonAlert'," + undefined + ");");

	if (callback != undefined) {
		callback();
	}
	$("#commonAlert a").data("focus-id", "");
}

/**
   data: Json, title, content
	  var alertData = {
		  title: "怨듯넻 �쇰읉 �앹뾽 �뚯뒪��"
		,content : "�뚯뒪�몄엯�덈떎.!!!"
		,callback : searchNoticeList
		,btnText : "�뺤씤"
	};
	commonAlert(alertData);
	openLayer('commonAlert');
*/
function commonAlert(data) {
    $("#commonAlert h2").text(data.title);
    $("#commonAlert p").html(data.content);
    $("#commonAlert a").text(data.btnText);
	if (data.focusId) {
		$("#commonAlert a").data("focus-id", data.focusId);
	}
	if (data.callback === '') {
		data.callback = undefined;
	}
    $("#commonAlert a").attr("onclick", "closeLayer('commonAlert'," + data.callback + ");");
	$("#commonAlert a").attr("data-focus-next", "commonAlert");

}

/**
	commonAlert2(alertData);
	openLayer('commonAlert2');
*/
function commonAlert2(data) {
	$("#commonAlert2 h2").text(data.title);
	$("#commonAlert2 p").html(data.content);
	$("#commonAlert2 a").text(data.btnText);
	if (data.focusId) {
		$("#commonAlert2 a").data("focus-id", data.focusId);
	}
	if (data.callback === '') {
		data.callback = undefined;
	}
	$("#commonAlert2 a").attr("onclick", "closeLayer('commonAlert2'," + data.callback + ");");
	$("#commonAlert2 a").attr("data-focus-next", "commonAlert2");

}

/**
data: Json, title, content
	var confirmData = {
		title: "怨듯넻 �쇰읉 �앹뾽 �뚯뒪��"
	  ,content : "�뺤씤�섏떆寃좎뒿�덇퉴?"
	  ,callback : searchNoticeList
	  ,okBtnText : "�뺤씤"
	  ,cancelBtnText : "痍⑥냼"
	  // 20210530 異붽�
	  ,closeCallback : function(){ 痍⑥냼 �대깽�� }
 };
 commonConfirm(confirmData);
 openLayer('commonConfirm');
*/
function commonConfirm(data) {
    $("#commonConfirm h2").text(data.title);
    $("#commonConfirm p").html(data.content);
    $("#commonConfirm #commonConfirmOkBtn").text(data.okBtnText);
    $("#commonConfirm #commonConfirmCancelBtn").text(data.cancelBtnText);

	if (data.dataPopupName) {
		$("#commonConfirm").attr("data-popup-name", data.dataPopupName);
	} else {
		$("#commonConfirm").attr("data-popup-name", "");
	}

    $("#commonConfirm #commonConfirmOkBtn").attr("onclick", "closeLayer('commonConfirm'," + data.callback + ");");

	if (data.closeCallback != undefined) {
        $("#commonConfirm #commonConfirmCancelBtn").attr("onclick", "closeLayer('commonConfirm'," + data.closeCallback + ");");
		$("#commonConfirm #closeCommonConfirmBtn").attr("onclick", "closeLayer('commonConfirm'," + data.closeCallback + ");");
	}
}
/**
 commonConfirm2(confirmData);
 openLayer('commonConfirm2');
*/
function commonConfirm2(data) {
	$("#commonConfirm2 h2").text(data.title);
	$("#commonConfirm2 p").html(data.content);
	$("#commonConfirm2 #commonConfirmOkBtn2").text(data.okBtnText);
	$("#commonConfirm2 #commonConfirmCancelBtn2").text(data.cancelBtnText);

	if (data.dataPopupName) {
		$("#commonConfirm2").attr("data-popup-name", data.dataPopupName);
	} else {
		$("#commonConfirm2").attr("data-popup-name", "");
	}

	$("#commonConfirm2 #commonConfirmOkBtn2").attr("onclick", "closeLayer('commonConfirm2'," + data.callback + ");");

	if (data.closeCallback != undefined) {
		$("#commonConfirm2 #commonConfirmCancelBtn2").attr("onclick", "closeLayer('commonConfirm2'," + data.closeCallback + ");");
    }
}
$(function() {});