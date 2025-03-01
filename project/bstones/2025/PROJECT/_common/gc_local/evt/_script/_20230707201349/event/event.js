///////////////////// event.js /////////////////////////////////////////////////////
///////////////////// �뚯씪蹂�寃� ��  indexLayout.jsp �� event.js �몄텧 �ㅽ겕由쏀듃 踰꾩쟾 異붽� (罹먯떆 諛⑹�)

let eventInfo;
let entryEvent; // 湲곕낯�뺣낫
let collectItems; // �섏쭛��ぉ
let goodsSerialInfos; // �쒗뭹紐⑸줉
let plcyContentCollect; // 媛쒖씤 �뺣낫 泥섎━ �섏쭛 �댁슜 �숈쓽
let plcyContentPrcs; // 媛쒖씤 �뺣낫 泥섎━ �낅Т �꾪긽 �숈쓽
let eventPrivacyPolicys; // 媛쒖씤 �뺣낫 諛⑹묠 由ъ뒪�� or 留덉��� �섏떊 �숈쓽
let addFields; // 異붽��꾨뱶
let eventGbFields; //�대깽�� 援щ텇 �꾨뱶
let plazas; // 留ㅼ옣紐⑸줉
let siDoList; // ��/�� 紐⑸줉
let siGunGuList; // �쒓뎔援� 紐⑸줉
let questionInfos;
let voteQuestionInfos;
let sessionMbr;
let membershipNo;
let stPath;
let returnUrl;
let pblcEvtNo;
let eventGbCd; // �대깽�� ���� : �쒕━��, 媛쒖씤�뺣낫�섏쭛, �ы몴, �ㅻЦ, 留ㅼ옣�곷떞�덉빟
let kakaoAppKeyEvent; // 移댁뭅�� ��
let eventAddType; //�대깽�� ����
let entryCnt;  //�묐え嫄댁닔
let eventAddYn; // �뱀젙�대깽�� 援щ텇 蹂���
let fanclassFlag; //�ы겢�섏뒪 �대깽�� �щ�
let joinNo; //�대깽�� �묐え踰덊샇
//let addSurveyFields; // 異붽��ㅻЦ�꾨뱶

let ugcFlag= false; // @PIL(22.10.28) GCS 戮� 寃붾윭由� �대깽�� �좊Т


/* 湲고쉷 �붽뎄�ы빆 : 移댁뭅�ㅻ㏊ 珥덇린 �뗮똿�� �쒖슱 / 媛뺣궓援щ줈 �뗮똿 */
let siDo10; // �쒖슱
let siGunGu123; // 媛뺣궓援�

let isPreView = false; // true : 誘몃━蹂닿린
let oneTimeChk = false;

let plazaNm;
let phoneTpCd;
let ciToken;
let unpackGoodsId;

let $popDiv;
let $popDivRenewal;
let $tooltipDiv;
let $unpackAuthDiv;
let $eventKcbAuthDiv;

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
stPath = ($("#openPop").data("st-path"));

var eventGoodsMain = {
		vMainWrapId : '#pd-inner-cont'
		, vGoodsWrapId : '#goods_detail_wrap'
		, fnGetHtml : function(target, url, data, callback){
			var options = {
				url: eventGoodsMain.fnAjaxUrl(url)
				, dataType : "html"
				, data: data
				, done: function (html){
					$(target).html(html);
					if(callback){
						callback();
					}
				}
			};
			ajax.call(options);
		}
		, fnAjaxUrl : function(vUrl, vAjaxUrl){
			var ajaxUrl = "xhr/goods/";
			if (vAjaxUrl !== undefined){
				ajaxUrl = vAjaxUrl;
			}
			return stPath +  ajaxUrl + vUrl;
		}, fnLoginCheck : function(callback){
			var options = {
				url : eventGoodsMain.fnAjaxUrl("loginCheck")
				, type: 'POST'
				, done : function(data) {
					if(callback){
						callback(data.isLogin);
					}
				}
			};
			ajax.call(options);
		}
	}

	var eventGoodsDetail = {
		fnReqData : function(){
			var reqData = $("#eventGoodsCartForm").serializeJson();

			return reqData;
		}

		//b2b2c b2b 異붽�
		, fnCartNowBuy: function(reqData) {
			if(($("input[name=stGbCd]").val() == '10' || $("input[name=stGbCd]").val() == '80' || $("input[name=stGbCd]").val() == '50') && $("#shop-storeYN").val() == 'Y' && $("#dlvrPckYn").val() == 'Y' && $("#dlvrGenYn").val() != 'Y') {
				var alertMsg = "留ㅼ옣�쎌뾽 �곹뭹�� 留ㅼ옣�� �좏깮 �� 諛붾줈援щℓ媛� 媛��ν빀�덈떎.";

				if($("input[name=stGbCd]").val() == '10'){
					alertMsg = "留ㅼ옣�쎌뾽/鍮좊Ⅸ諛곗넚 �곹뭹�� 留ㅼ옣�� �좏깮 �� 諛붾줈援щℓ媛� 媛��ν빀�덈떎.";
				}

				if($("#omsSendYn").val() != 'N') {
					alertMsg += "<br/>�곹뭹�� 以�鍮꾩쨷�낅땲��.";
				}

				if (reqData.pckStrNo === null || reqData.pckStrNo === undefined || $.trim(reqData.pckStrNo).length == 0) {
					var alertData = {
							 title: ""
							,content : alertMsg
							,callback : openPopDlvrPck
							,btnText : "�뺤씤"
						};
						commonAlert(alertData);
						openLayer('commonAlert');
						return false;
				}
			}

			var nowBuyOptions = {
				url : eventGoodsMain.fnAjaxUrl("insertCart", "xhr/order/")
				, data : reqData
				, done : function(data){
					if ( (reqData.pckStrNo !== null && reqData.pckStrNo !== undefined && $.trim(reqData.pckStrNo).length > 0 ) || reqData.rglrDlvrYn != null || data.isHomefitnessPrivateGoodsYn == "Y") {
						var options2 = {
								url : eventGoodsMain.fnAjaxUrl("loginCheck")
								, type: 'POST'
								, done : function(data) {
									if(!data.isLogin) {
										location.href= stPath + "member/indexLogin/?returnUrl="+ stPath +"order/";
									} else {
										location.href = stPath + "order/";
									}
								}
							};
							ajax.call(options2);

					} else {
						location.href = stPath + "order/";
					}
						_satellite.track('buy now');
				}
			};

//			nowBuyOptions = $.extend({}, nowBuyOptions, {netFunnelId : 'b2c_checkout'});

			var checkGoodsLimitOptions = {
				url : eventGoodsMain.fnAjaxUrl("limit", "xhr/order/check/goods/")
			  , data : reqData
			  , done : function(data) {
					ajax.call(nowBuyOptions);
			  }

			};

			ajax.call(checkGoodsLimitOptions);
		}

};

$(function(){
	// create html tag
	$popDiv = $(drawPopHtmlCode());
	$popDivRenewal = $(drawPopHtmlCodeRenewal());

	$tooltipDiv = $(drawTooltipHtmlCode());

	$popDiv2 = $(drawPopHtmlCode2());
	$popDiv4 = $(drawPopHtmlCode4());
	$popDiv5 = $(drawPopHtmlCode5());
    //媛ㅼ틺��
    $popDiv6 = $(drawPopHtmlCode6());

});

function fnDrawPop(){
	// �앹뾽 html Code
	if($("#popupArea_Event3791").length > 0){
		$("#popupArea_Event3791").append($popDiv);
	}else{
		$("#popupArea").append($popDiv);
	}

	// �댄똻 html Code
	if($("#tooltipArea_Event3791").length > 0){
		$("#tooltipArea_Event3791").append($tooltipDiv);
	}else{
		$("#tooltipArea").append($tooltipDiv);
	}


	$(".titleNo").show();
}

function fnDrawPopRenewal(){
	// �앹뾽 html Code
	if($("#popupArea_Event3791").length > 0){
		$("#popupArea_Event3791").append($popDivRenewal);
	}else{
		$("#popupArea").append($popDivRenewal);
	}

	// �댄똻 html Code
	if($("#tooltipArea_Event3791").length > 0){
		$("#tooltipArea_Event3791").append($tooltipDiv);
	}else{
		$("#tooltipArea").append($tooltipDiv);
	}


	$(".titleNo").show();
}

////////////////////////////////////////////////////////////////////////////////////
///////////////////// FUNCTION //////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

/* 留ㅼ옣�곷떞 �덉빟 �앹뾽 �ㅽ겕由쏀듃 濡쒕뱶 */
function fnScriptLoad(){

	$.getScript("//developers.kakao.com/sdk/js/kakao.min.js")
	.done(function(script, textStatus){
//		console.log("[ success ] kakao.min.js load success");
	})
	.fail(function(jqxhr, settings, exception){
//		console.log("[ fail ] kakao.min.js load fail");
	});

	$.getScript("//dapi.kakao.com/v2/maps/sdk.js?appkey="+kakaoAppKeyEvent+"&autoload=false", function() {
        daum.maps.load(function() {
        	if ( eventAddYn == 'B2C_PLAZA_DOCENT') {
        		console.log("[ success docent.js] dapi.kakao.com sdk.js load success");
        		fnEventDocentReservationJsLoad(); // event-docentreservation.js load
        	} else if ( eventAddYn == 'B2C_PLAZA_DOCENT_CAMPUS') {
        		console.log("[ success campus-docent.js] dapi.kakao.com sdk.js load success");
        		fnEventDocentCampusReservationJsLoad(); // event-docentreservation.js load
        	} else {
        		console.log("[ success reservation.js] dapi.kakao.com sdk.js load success");
        		fnEventReservationJsLoad(); // event-reservation.js load
        	}
        });
    });
}

// 移댁뭅�� 愿��� �ㅽ겕由쏀듃媛� 濡쒕뱶 �� �� 濡쒕뱶�섍린 �꾪븿
function fnEventReservationJsLoad(){
	var def = $.Deferred();
	var script = document.createElement('script');
	script.src = "/sec/static/evt/_script/event/event-reservation.js?ver=1.5";
	script.onload = function() {
//		console.log("[ success ] event-reservation.js load success");
		def.resolve();
	}
	script.onerror = function() {
//		console.log("[ fail ] event-reservation.js load fail");
		def.reject();
	}
	document.body.appendChild(script);
}

//媛ㅻ윮�� �ㅽ뒠�붿삤 �꾩뒯�� js load
function fnEventDocentReservationJsLoad(){
	var def = $.Deferred();
	var script = document.createElement('script');
	script.src = "/sec/static/evt/_script/event/event-docent-reservation.js?ver=1.1";
	script.onload = function() {
//		console.log("[ success ] event-reservation.js load success");
		def.resolve();
	}
	script.onerror = function() {
//		console.log("[ fail ] event-reservation.js load fail");
		def.reject();
	}
	document.body.appendChild(script);
}

//媛ㅻ윮�� �ㅽ뒠�붿삤 �꾩뒯�� in 罹좏띁�� js load
function fnEventDocentCampusReservationJsLoad(){
	var def = $.Deferred();
	var script = document.createElement('script');
	script.src = "/sec/static/evt/_script/event/event-docent-campus-reservation.js?ver=1.1";
	script.onload = function() {
//		console.log("[ success ] event-reservation.js load success");
		def.resolve();
	}
	script.onerror = function() {
//		console.log("[ fail ] event-reservation.js load fail");
		def.reject();
	}
	document.body.appendChild(script);
}

/* �앹뾽 �몄텧 */
function fnCallPop2(evtNo){
	oneTimeChk = false;

	pblcEvtNo = evtNo;
	returnUrl = window.location.pathname;

	var searchPath = window.location.search;

	if(searchPath.indexOf("eventNo") != -1) {
		returnUrl += searchPath;
	} else {
		if (searchPath.indexOf("?") != -1){
			if(returnUrl.indexOf("event/eventContentDetailView") != -1) {
				returnUrl += searchPath + "&eventNo="+pblcEvtNo;
			} else {
				returnUrl += searchPath;
			}
		} else {
			returnUrl += "?eventNo="+pblcEvtNo;
		}
	}

	stPath = ($("#openPop").data("st-path"));

	var param;
	param = {eventNo : pblcEvtNo , isPreView : isPreView };

	var options = {
		url : stPath+"xhr/event/getEventBaseInfo"
		, data : param
		, done: function (data) {

			$("#mask").remove();
			var eventInfo = data.eventInfo;

			/* 移댁뭅�� 留듭쓣 �ъ슜�섍린 �꾪븳 湲곗큹 �뺣낫 */
			kakaoAppKeyEvent = data.kakaoAppKey;
			siDo10 = data.siDo10;
			siGunGu123 = data.siGunGu123;

			if(eventInfo.errMsg == "" || eventInfo.errMsg == null){
				var evtGbCd = data.eventInfo.entryEvent.eventGbCd;
				if(evtGbCd != undefined && evtGbCd != ""){
					//湲곗〈 �대깽�� �앹뾽
					setEventPop(data);
				} else {
					//�좊뱶釉뚮┃�� customEvent
					adbrixCustomEvent(data.eventInfo.entryEvent.ttl, pblcEvtNo, 'click');
					//由щ돱�� �대깽�� �앹뾽
					setEventPopRenewal(data);
				}
			}else{
				if(eventInfo.errCd == "LGN0005"){
					makeAlert(eventInfo.errMsg, fnGoLoginPage);
				}else{
					makeAlert(eventInfo.errMsg, eventPopClose);
				}
			}
			if(eventGbCd){
				if(eventInfo.plazas){
					$("#eventBtn_Area_div").css("display","none");
				}else{
					$("#eventBtn_Area_div").css("display","");
				}
			}
		}
	};
	ajax.call(options);
	multiFileCnt = 0;			//泥⑤��뚯씪 媛쒖닔 珥덇린��
}


/* �앹뾽 �몄텧 */
function fnCallPop5(evtNo){
	oneTimeChk = false;

	pblcEvtNo = evtNo;
	returnUrl = window.location.pathname;

	var searchPath = window.location.search;

	if(searchPath.indexOf("eventNo") != -1) {
		returnUrl += searchPath;
	} else {
		if (searchPath.indexOf("?") != -1){
			if(returnUrl.indexOf("event/eventContentDetailView") != -1) {
				returnUrl += searchPath + "&eventNo="+pblcEvtNo;
			} else {
				returnUrl += searchPath;
			}
		} else {
			returnUrl += "?eventNo="+pblcEvtNo;
		}
	}

	stPath = ($("#openPop").data("st-path"));

	var param;
	param = {eventNo : pblcEvtNo , isPreView : isPreView };

	var options = {
		url : stPath+"xhr/event/getEventBaseInfo"
		, data : param
		, done: function (data) {
			$("#mask").remove();
			var eventInfo = data.eventInfo;

			/* 移댁뭅�� 留듭쓣 �ъ슜�섍린 �꾪븳 湲곗큹 �뺣낫 */
			kakaoAppKeyEvent = data.kakaoAppKey;
			siDo10 = data.siDo10;
			siGunGu123 = data.siGunGu123;

			if(eventInfo.errMsg == "" || eventInfo.errMsg == null){
				data.eventInfo.plcyContentCollect.plcyNm = "[�쇱꽦�꾩옄 硫ㅻ쾭��] 媛쒖씤�뺣낫 �섏쭛 諛� �댁슜 �숈쓽";
				if (data.eventInfo.plcyContentPrcs != null) {
					data.eventInfo.plcyContentPrcs.plcyNm = "[�대깽�� �묐え] �ы솕 �먮뒗 �쒕퉬�� �띾낫, �먮ℓ 沅뚯쑀 �낅Т �꾪긽�� ���� 媛쒕퀎 怨좎�";
				}
				setEventPop(data);
//				$("#evtImg").hide();
			}else{
				if(eventInfo.errCd == "LGN0005"){
					var loginConfirm = {
							content : "濡쒓렇�� �댄썑 �먮옉�섍린 �대깽�몄뿉 �묐え媛� 媛��ν빀�덈떎.<br>濡쒓렇�� �붾㈃�쇰줈 �대룞�섏떆寃좎뒿�덇퉴?"
				            ,okBtnText : "�뺤씤"
				            ,cancelBtnText : "痍⑥냼"
				            ,callback : fnGoLoginPage
					};
					commonConfirm(loginConfirm);
					openLayer('commonConfirm');
				}else if(eventInfo.errCd == "EVTPOP0017"){
					let confirmData = {
							content : eventInfo.errMsg
				            ,okBtnText : "�뺤씤"
				            ,cancelBtnText : "痍⑥냼"
				            ,callback : fnGoMembershipPage
			            };
						commonConfirm(confirmData);
						openLayer('commonConfirm');
				}else if(eventInfo.errMsg=="�대� �묐え�섏��듬땲��.") {
					var alertData = {
				               content : "�대� BESPOKE �대읇 媛��낇븯湲� �대깽�몄뿉 李몄뿬�섏뀲�듬땲��.<BR>媛먯궗�⑸땲��."
				               ,btnText : '�リ린'
				               ,callback : eventPopClose
				               };
					commonAlert(alertData);
					openLayer('commonAlert');
				}else{
					makeAlert(eventInfo.errMsg, eventPopClose);
				}
			}
			if(eventInfo.plazas){
				$("#eventBtn_Area_div").css("display","none");
			}else{
				$("#eventBtn_Area_div").css("display","");
			}
		}
	};
	ajax.call(options);
	multiFileCnt = 0;			//泥⑤��뚯씪 媛쒖닔 珥덇린��
}


/* 湲곗〈 �대깽�� �묐え �앹뾽 �붾㈃ �뗮똿 */
function setEventPop(data){

	fnDrawPop();
	$("#exhibition").click(); // �앹뾽�쒖떆

	eventInfo = data.eventInfo;
	entryEvent = eventInfo.entryEvent;
	collectItems = eventInfo.eventCollectItems; // �섏쭛��ぉ
	goodsSerialInfos = eventInfo.goodsSerialInfos; // �쒗뭹紐⑸줉
	plcyContentCollect = eventInfo.plcyContentCollect; // 媛쒖씤 �뺣낫 泥섎━ �섏쭛 �댁슜 �숈쓽
	plcyContentPrcs = eventInfo.plcyContentPrcs; // 媛쒖씤 �뺣낫 泥섎━ �낅Т �꾪긽 �숈쓽
	eventPrivacyPolicys = eventInfo.eventPrivacyPolicys; // 媛쒖씤 �뺣낫 諛⑹묠 由ъ뒪�� or 留덉��� �섏떊 �숈쓽
	addFields = eventInfo.addFields; // 異붽��꾨뱶
	questionInfos = eventInfo.questionInfos; // �ㅻЦ臾명빆
	plazas = eventInfo.plazas;
	siDoList = eventInfo.siDoList;
	siGunGuList = eventInfo.siGunGuList;
	eventAddYn = entryEvent.eventAddYn;
	eventAddType = entryEvent.eventAddYn; //�대깽�명���
	fanclassFlag = (eventAddYn == 'B2C_PLAZA_FOLD3' || eventAddYn == 'B2C_PLAZA_FLIP3');

	/*BO 媛쒕컻��, 異붽� �ㅻЦ�꾨뱶 �곗씠�� �뗮똿*/
	//addSurveyFields = eventInfo.addSurveyFields; // 異붽� �ㅻЦ�꾨뱶

	$("#entryEventNo").val(entryEvent.eventNo); // �쒕쾭�꾩넚�� �대깽�� 踰덊샇
	$("#evtGbCd").val(entryEvent.eventGbCd); // �쒕쾭�꾩넚�� �대깽�� 援щ텇
	$("#prtcpPsbGbCd").val(entryEvent.prtcpPsbGbCd); // 李몄뿬媛��κ뎄遺꾩퐫��
	$("#prtcpPsbCnt").val(entryEvent.prtcpPsbCnt); // 李몄뿬媛��μ닔
	$("#evtNm").text(entryEvent.ttl);
	$("#cpNo").val(entryEvent.cpNo); // 荑좏룿踰덊샇 �뗮똿
	$("#ftEvtNm").text(entryEvent.ttl); // 荑좏룿踰덊샇 �뗮똿
	$("#eventAddYn").val(entryEvent.eventAddYn); // �뱀젙�대깽�� �뱀꽌踰�, �꾩뭅留덉씠 �낅줈�� �щ�
	$("#popEntrySuccMsg").val(entryEvent.popEntrySuccMsg);

	sessionMbr = eventInfo.loginUserMbrNo;
	membershipNo = eventInfo.loginUserMembership;

	// �대깽�� �묐え 援щ텇 (媛쒖씤�뺣낫 �섏쭛, �ㅻЦ, �ы몴, �쒕━�쇰쾲�몄껜�� ��)
	eventGbCd = entryEvent.eventGbCd;

	setLayoutShowHide(eventGbCd);
	setCommLayout(entryEvent, collectItems, addFields);

	if(eventGbCd == "40"){
		$(".goodsSelect").hide();
		$("#goodsUl").empty();

		// �뚮┝�� �ъ슜 �щ�
		$("#biztalkUseYn").val(entryEvent.biztalkUseYn);

		// �쒗쑕荑좏룿 �ъ슜 �щ�
		$("#prtnrCpUseYn").val(entryEvent.prtnrCpUseYn);

		// �뚮┝�� �쒗뵆由�
		$("#biztalkTmplTxt").val(entryEvent.biztalkTmplTxt);
	}

	// �쒗뭹�좏깮 : 紐⑸줉 泥섎━ (�쒕━�쇳삎�� 寃쎌슦�먮쭔 泥섎━) =====================================================
	if(eventGbCd == "50"){
		$(".goodsSelect").hide();
		$("#goodsUl").empty();

		var html="";
		$.each(goodsSerialInfos, function(idx, val){
			var index = idx +1;
			html += "<li class=\"item\">";
			html += "	<input id=\"chk-goods-"+index+"\" type=\"radio\" name=\"chk-goods\" value=\""+val.goodsId+"\" onchange='goodsCheck(this)' data-mdlcode='"+val.mdlCode+"' data-goods-nm='"+val.goodsNm+"'>";
			html += "	<label for=\"chk-goods-"+index+"\">"+val.mdlCode+"</label>";
			html += "</li>";
		});
		$("#goodsUl").append(html);
		$(".goodsSelect").show();

		$("#inpEnterSerialNum").attr("readonly", true);
	}


	// 吏덈Ц �뗮똿 ==========================================================================
	if(eventGbCd == "60"){
		// �쒗쑕荑좏룿 �ъ슜 �щ�
		$("#prtnrCpUseYn").val(entryEvent.prtnrCpUseYn);

		createQuestionHtml(questionInfos);
	}

	// 留ㅼ옣�곷떞 �덉빟 ����
	if(eventGbCd == "80"){
		fnScriptLoad();

		// �뚮┝�� �쒗뵆由�
		$("#biztalkTmplTxt").val(entryEvent.biztalkTmplTxt);
	}

	// 媛쒖씤 �뺣낫 �숈쓽 愿��� =====================================================================
	var policyHtml="";
	$("#privacyPolicy").empty();

	// 媛쒖씤 �뺣낫 泥섎━ �섏쭛 �댁슜 �숈쓽
	policyHtml += createPrivacyPolicyHtml(plcyContentCollect, 1);
	// 媛쒖씤 �뺣낫 泥섎━ �낅Т �꾪긽 �숈쓽
	if (plcyContentPrcs != null) {
		policyHtml += createPrivacyPolicyHtml(plcyContentPrcs, 2);
	}
	// 媛쒖씤�뺣낫�섏쭛�좏삎 : 留덉��낆닔�좊룞�� 諛� 洹몄쇅
	$.each(eventPrivacyPolicys, function(idx, val){
		var index = idx +3;
		policyHtml += createPrivacyPolicyHtml(val, index);
	});
	$("#privacyPolicy").append(policyHtml);

	$(".error-msg").hide();

    if (eventAddYn == 'N') { // default 臾멸뎄
    	$("#inpCounselMembershipErr").html("<p>�섏쓽 �뺣낫�먯꽌 硫ㅻ쾭�� �뚯썝 異붽��뺣낫 �낅젰 ��</p><p>�뚮┝�좎껌�섎㈃ 硫ㅻ쾭�� 踰덊샇媛� 蹂댁뿬吏묐땲��.</p>");
    } else if (eventAddYn == 'Y') { // �⑥떊�� �대깽�몄씪�� 臾멸뎄 蹂�寃�
    	$("#inpCounselMembershipErr").html("<p>�삳ħ踰꾩떗踰덊샇媛� 蹂댁씠吏� �딆쑝�쒕굹��?</p><p>�붾㈃ �곗륫 �곷떒 > �섏쓽�뺣낫 硫붾돱�먯꽌</p><p>硫ㅻ쾭�� 媛��낆뿬遺� �뺤씤 �� �ㅼ떆 �쒕룄�� 蹂댁꽭��.</p><p>(誘멸��� �� 媛��� �� �ъ떆�� �꾩슂)</p>");
    }

	if(membershipNo == "" || membershipNo == null ){
		$("#inpCounselMembershipErr").show();
	}

}

/* 由щ돱�� �대깽�� �묐え �앹뾽 �붾㈃ �뗮똿 */
function setEventPopRenewal(data){

	fnDrawPopRenewal();
	$("#ciToken").val(ciToken);

	$("#exhibition").click(); // �앹뾽�쒖떆

	eventInfo = data.eventInfo;
	entryEvent = eventInfo.entryEvent;
	collectItems = eventInfo.eventCollectItems; // �섏쭛��ぉ
	goodsSerialInfos = eventInfo.goodsSerialInfos; // �쒗뭹紐⑸줉
	plcyContentCollect = eventInfo.plcyContentCollect; // 媛쒖씤 �뺣낫 泥섎━ �섏쭛 �댁슜 �숈쓽
	plcyContentPrcs = eventInfo.plcyContentPrcs; // 媛쒖씤 �뺣낫 泥섎━ �낅Т �꾪긽 �숈쓽
	eventPrivacyPolicys = eventInfo.eventPrivacyPolicys; // 媛쒖씤 �뺣낫 諛⑹묠 由ъ뒪�� or 留덉��� �섏떊 �숈쓽
	addFields = eventInfo.addFields; // 異붽��꾨뱶
	eventGbFields = eventInfo.eventGbFields //�대깽�� 援щ텇 �꾨뱶
	questionInfos = eventInfo.questionInfos; // �ㅻЦ臾명빆(�댁쫰)
	voteQuestionInfos = eventInfo.voteQuestionInfos; // �ㅻЦ臾명빆(�ы몴)
	plazas = eventInfo.plazas;
	siDoList = eventInfo.siDoList;
	siGunGuList = eventInfo.siGunGuList;
	eventAddYn = entryEvent.eventAddYn;
	eventAddType = entryEvent.eventAddYn; //�대깽�명���
	fanclassFlag = (eventAddYn == 'B2C_PLAZA_FOLD3' || eventAddYn == 'B2C_PLAZA_FLIP3');
	docentFlag = (eventAddYn == 'B2C_PLAZA_DOCENT' || eventAddYn == 'B2C_PLAZA_DOCENT_CAMPUS');
	
	$("#entryEventNo").val(entryEvent.eventNo); // �쒕쾭�꾩넚�� �대깽�� 踰덊샇
	$("#evtGbCd").val(entryEvent.eventGbCd); // �쒕쾭�꾩넚�� �대깽�� 援щ텇
	$("#isEvtGbFld").val("Y"); // 由щ돱�� �대깽�� �묐え 泥댄겕蹂���
	$("#prtcpPsbGbCd").val(entryEvent.prtcpPsbGbCd); // 李몄뿬媛��κ뎄遺꾩퐫��
	$("#prtcpPsbCnt").val(entryEvent.prtcpPsbCnt); // 李몄뿬媛��μ닔
	$("#evtNm").text(entryEvent.ttl);
	$("#cpNo").val(entryEvent.cpNo); // 荑좏룿踰덊샇 �뗮똿
	$("#ftEvtNm").text(entryEvent.ttl); // 荑좏룿踰덊샇 �뗮똿
	$("#eventAddYn").val(entryEvent.eventAddYn); // �뱀젙�대깽�� �뱀꽌踰�, �꾩뭅留덉씠 �낅줈�� �щ�

	$("#popTitle").text(entryEvent.popEntryTtl);
	$("#eventSaveBtn").text(entryEvent.popEntryCtaText);
	$("#popEntrySuccMsg").val(entryEvent.popEntrySuccMsg);

	sessionMbr = eventInfo.loginUserMbrNo;
	membershipNo = eventInfo.loginUserMembership;

	var evtGbFlds = [];
	for(var idx=0; idx<eventGbFields.length; idx++){
		evtGbFlds.push(eventGbFields[idx].eventFldTpCd);
	}

	setLayoutShowHideRenewal(evtGbFlds);
	setCommLayout(entryEvent, collectItems, addFields);

	// �쒗쑕荑좏룿 �ъ슜 �щ�
	$("#prtnrCpUseYn").val(entryEvent.prtnrCpUseYn);

	//�뺤옣��
	if(evtGbFlds.indexOf("01") > -1 || evtGbFlds.indexOf("06") > -1){
		$(".goodsSelect").hide();
		$("#goodsUl").empty();

		// �뚮┝�� �ъ슜 �щ�
		$("#biztalkUseYn").val(entryEvent.biztalkUseYn);

		// �뚮┝�� �쒗뵆由�
		$("#biztalkTmplTxt").val(entryEvent.biztalkTmplTxt);
	}

	// �쒗뭹�좏깮 : 紐⑸줉 泥섎━ (�쒕━�쇳삎�� 寃쎌슦�먮쭔 泥섎━) =====================================================
	if(evtGbFlds.indexOf("02") > -1){
		$(".goodsSelect").hide();
		$("#goodsUl").empty();

		var html="";
		$.each(goodsSerialInfos, function(idx, val){
			var index = idx +1;
			html += "<li class=\"item\">";
			html += "	<input id=\"chk-goods-"+index+"\" type=\"radio\" name=\"chk-goods\" value=\""+val.goodsId+"\" onchange='goodsCheck(this)' data-mdlcode='"+val.mdlCode+"' data-goods-nm='"+val.goodsNm+"'>";
			html += "	<label for=\"chk-goods-"+index+"\">"+val.mdlCode+"</label>";
			html += "</li>";
		});
		$("#goodsUl").append(html);
		$(".goodsSelect").show();

		$("#inpEnterSerialNum").attr("readonly", true);
	}


	// 吏덈Ц �뗮똿(�댁쫰) ==========================================================================
	if(evtGbFlds.indexOf("03") > -1){
		// �쒗쑕荑좏룿 �ъ슜 �щ�
		$("#prtnrCpUseYn").val(entryEvent.prtnrCpUseYn);

		createQuestionHtml(questionInfos);
	}

	// 吏덈Ц �뗮똿(�ы몴) ==========================================================================
	if(evtGbFlds.indexOf("04") > -1){
		createVoteQuestionHtml(voteQuestionInfos);
	}

	// 留ㅼ옣�곷떞 �덉빟 ����
	if(evtGbFlds.indexOf("05") > -1){
		fnScriptLoad();

		// �뚮┝�� �쒗뵆由�
		$("#biztalkTmplTxt").val(entryEvent.biztalkTmplTxt);
	}

	// 媛쒖씤 �뺣낫 �숈쓽 愿��� =====================================================================
	var policyHtml="";
	$("#privacyPolicy").empty();

	// 媛쒖씤 �뺣낫 泥섎━ �섏쭛 �댁슜 �숈쓽
	policyHtml += createPrivacyPolicyHtml(plcyContentCollect, 1);
	// 媛쒖씤 �뺣낫 泥섎━ �낅Т �꾪긽 �숈쓽
	if (plcyContentPrcs != null) {
		policyHtml += createPrivacyPolicyHtml(plcyContentPrcs, 2);
	}
	// 媛쒖씤�뺣낫�섏쭛�좏삎 : 留덉��낆닔�좊룞�� 諛� 洹몄쇅
	$.each(eventPrivacyPolicys, function(idx, val){
		var index = idx +3;
		policyHtml += createPrivacyPolicyHtml(val, index);
	});

	$("#privacyPolicy").append(policyHtml);
	$(".error-msg").hide();

	if (eventAddYn == 'N') { // default 臾멸뎄
		$("#inpCounselMembershipErr").html("<p>�섏쓽 �뺣낫�먯꽌 硫ㅻ쾭�� �뚯썝 異붽��뺣낫 �낅젰 ��</p><p>�뚮┝�좎껌�섎㈃ 硫ㅻ쾭�� 踰덊샇媛� 蹂댁뿬吏묐땲��.</p>");
	} else if (eventAddYn == 'Y') { // �⑥떊�� �대깽�몄씪�� 臾멸뎄 蹂�寃�
		$("#inpCounselMembershipErr").html("<p>�삳ħ踰꾩떗踰덊샇媛� 蹂댁씠吏� �딆쑝�쒕굹��?</p><p>�붾㈃ �곗륫 �곷떒 > �섏쓽�뺣낫 硫붾돱�먯꽌</p><p>硫ㅻ쾭�� 媛��낆뿬遺� �뺤씤 �� �ㅼ떆 �쒕룄�� 蹂댁꽭��.</p><p>(誘멸��� �� 媛��� �� �ъ떆�� �꾩슂)</p>");
	}

	if(membershipNo == "" || membershipNo == null ){
		$("#inpCounselMembershipErr").show();
	}

}

/* �쒕━�쇰꽆踰� �낅젰�� readonly �댁젣 */
function goodsCheck(obj){
	$("#inpEnterSerialNum").attr("readonly", false);
}

/* 媛쒖씤�뺣낫 �섏쭛 愿��� html �앹꽦 */
function createPrivacyPolicyHtml(obj, index){

	var agreeRqidYn = obj.agreeRqidYn;
	var agreeRqidYnNm;
	var agreeSelWds = obj.agreeSelWds;
	var policyNo = obj.policyNo;

	if(agreeRqidYn == "Y"){
		agreeRqidYnNm = "�꾩닔";
	}else{
		agreeRqidYnNm = "�좏깮";
	}

	if(obj.plcyGbCd == "10"){
		agreeSelWds = "�꾩쓽 媛쒖씤�뺣낫 �섏쭛 諛� �댁슜�� �숈쓽�⑸땲��.";
	}else if(obj.plcyGbCd == "20"){
		agreeSelWds = "�꾩쓽 媛쒖씤�뺣낫 泥섎━ �낅Т �꾪긽�� �숈쓽�⑸땲��.";
	}

	var html="";
	html += "<div class='terms-wrap'>";
	html += "	<h4 class='terms-tit'>"+obj.plcyNm+"</h4>";
	html += "	<div class='terms-box'>";
	html += "		<p>"+obj.content+"</p>";
	html += "	</div>";
	html += "	<div class='chk-form terms-more'>";

	if(agreeRqidYn == "Y"){
		html += "		<input id='chk-enter-"+index+"' data-chkgrp-name='checkEventEnter' type='checkbox' required='' title='' class='inp-terms entryAgreeY plcyGbCd" + obj.plcyGbCd + "' data-policyNo="+policyNo+">";
	}else{
		html += "		<input id='chk-enter-"+index+"' data-chkgrp-name='checkEventEnter' type='checkbox' required='' title='' class='inp-terms plcyGbCd" + obj.plcyGbCd + "' data-policyNo="+policyNo+">";
	}

	if(obj.plcyGbCd != "20"){
		html += "		<label for='chk-enter-"+index+"' class='chk-gray'>"+agreeSelWds+" ("+agreeRqidYnNm+")</label>";
	}

	html += "	</div>";

	if(agreeRqidYn == "Y" && obj.plcyGbCd != "20"){
		html += "	<div class='error-msg' id='err-chk-enter-"+index+"'>";

		if(obj.plcyGbCd == "10"){
			html += "		<p>媛쒖씤�뺣낫 �섏쭛 諛� �댁슜�� �숈쓽�� 二쇱꽭��.</p>";
		}
//		else if(obj.plcyGbCd == "20"){
//			html += "		<p>媛쒖씤�뺣낫 泥섎━ �꾪긽�� �숈쓽�� 二쇱꽭��.</p>";
//		}
		else{
			html += "		<p>"+obj.plcyNm+"�� �숈쓽�� 二쇱꽭��.</p>";
		}

		html += "	</div>";
	}
	html += "</div>";

	return html;
}

/*
	�ㅻЦ�� 吏덈Ц html �앹꽦(�댁쫰)
*/
function createQuestionHtml(obj){

	$(".qstList").empty();

	// 10 媛앷��� 泥댄겕諛뺤뒪 / 20 媛앷��� �쇰뵒�ㅻ쾭�� / 30 二쇨���
	var html="";
	$.each(questionInfos, function(idx, val){
		var qstTpCd = val.qstTpCd; // 吏덈Ц����
		var rplContent = val.rplContent; // 蹂닿린臾명빆
		var rplNos = val.rplNos; // 蹂닿린臾명빆 踰덊샇
		var rghtansYn = val.rghtansYn; // 蹂닿린臾명빆 �뺣떟
		var qstNo = val.qstNo;

		html += "<div class='survey-item'>";
		html += "    <p class='question'>Q. "+val.qstNm+"</p>";
		html += "    <input type='hidden' id='qstAnswer"+qstNo+"' name='qstAnswer' value='N' data-qsttpcd='"+qstTpCd+"'/>";
		html += "    <div class='answer-box'>";

		if(qstTpCd == "30"){
			html += "        <input type='text'  id='answer"+qstNo+"' name='answer"+qstNo+"' class='inp-line qstAnswer"+qstNo+"' placeholder='�뺣떟�� �낅젰�� 二쇱꽭��.' maxlength='200'>";
			html += "        <input type='hidden' id='answer"+qstNo+"Y' name='answer"+qstNo+"Y' value='"+rplContent+"'/>";
		}else{
            html += "        <ul class='answer-list chk-form qstAnswer"+qstNo+"'>";
            var rplNosArr = rplNos.split(",");
            var rplContentArr = rplContent.split(",");
            var rghtansYnArr = rghtansYn.split(",");

			for(var i=0; i<rplNosArr.length; i++){
				var qNo = rplNosArr[i]; // 蹂닿린臾명빆 踰덊샇
				var qText = rplContentArr[i]; // 蹂닿린臾명빆
				var qAns = rghtansYnArr[i]; // 蹂닿린臾명빆 �뺣떟

				html += "            <li class='item'>";
				if(qstTpCd == "10"){
					html += "            <input id='answer"+qstNo+qNo+"' type='checkbox' name='answer"+qstNo+"' value='Y'>";
				}else if(qstTpCd == "20"){
					html += "            <input id='answer"+qstNo+qNo+"' type='radio' name='answer"+qstNo+"' value='Y'>";
				}
				html += "                <label for='answer"+qstNo+qNo+"'>"+qText+"</label>";
                html += "                <input type='hidden' id='answer"+qstNo+qNo+"Y' value='"+qAns+"'/>";
                html += "            </li>";
			}
            html += "        </ul>";
		}

        html += "    </div>";
        html += "	 <div style='width: 100%; display: inline-block;margin-top:20px'>";
		html += "	     <div style='display:inline-block;vertical-align:middle;'>";

		if(qstTpCd == "30"){
			html += "	 		<button type='button' class='btn btn-s btn-type1 chkAns' style='margin-top:0' name='qstAnswer"+qstNo+"' id='chkAnsBtn"+qstNo+"' arg1='"+qstNo+"' arg2='"+qstTpCd+"'>�뺣떟�뺤씤</button>";
		}else{
			html += "	 		<button type='button' class='btn btn-s btn-type1 chkAns' style='margin-top:0' id='chkAnsBtn"+qstNo+"' arg1='"+qstNo+"' arg2='"+qstTpCd+"'>�뺣떟�뺤씤</button>";
		}

		html += "	     </div>";
		html += "	     <div class='error-msg answer-msg' id='answer"+qstNo+"Err' style='display:inline-block;vertical-align:middle;margin-left:8px;padding-top:0'>";
		html += "	       <p>�ㅻ떟�낅땲��.</p>  ";
		html += "	     </div>    ";
		html += "	 </div>	";
        html += "</div>";
	});
	$(".qstList").append(html);

	$(".error-msg").hide();
	if(membershipNo == "" || membershipNo == null ){
		$("#inpCounselMembershipErr").show();
	}
}

/*
�ㅻЦ�� 吏덈Ц html �앹꽦(�ы몴)
*/
function createVoteQuestionHtml(obj){

	$(".voteQstList").empty();

	// 10 媛앷��� 泥댄겕諛뺤뒪 / 20 媛앷��� �쇰뵒�ㅻ쾭�� / 30 二쇨���
	var html="";
	$.each(voteQuestionInfos, function(idx, val){
		var qstTpCd = val.qstTpCd; // 吏덈Ц����
		var rplContent = val.rplContent; // 蹂닿린臾명빆
		var rplNos = val.rplNos; // 蹂닿린臾명빆 踰덊샇
		var qstNo = val.qstNo;
		var imgUrl = val.imgUrl; // �대�吏�Url

		if(qstTpCd == "30"){	//二쇨���
			html += "<div class='secure-pop-tit margin-bottom bottom-line small-tit voteQstAnswer"+qstNo+"'>"+val.qstNm+"</div>";
			html += "<div class='inp-box width100'>";
			html += "	<label for='voteAnswer"+qstNo+"' class='blind'>"+val.qstNm+"</label>";
			html += "	<div class='inp-write'>";
			html += "		<input type='text' id='voteAnswer"+qstNo+"' name='voteAnswer"+qstNo+"' data-rplNo='"+rplNos+"' class='inp-line text-add voteQstAnswer"+qstNo+"' placeholder='�댁슜�� 湲곗엯 �� 二쇱꽭��'  maxlength='200'>";
			html += "	</div>";
			html += "	<div class='error-msg' id='voteAnswer"+qstNo+"Err'>";
			html += "		<p>��ぉ�� �낅젰�� 二쇱꽭��.</p>";
			html += "	</div>";
			html += "</div>";
		}else{
			html += "<div class='secure-pop-tit margin-bottom bottom-line small-tit voteQstAnswer"+qstNo+"'>"+val.qstNm+"</div>";
			html += "<div class='droptoggle'>";
			html += "	<div class='dropOption'>";
			html += "		<a href='javascript:;' class='dropButton underline-none dropButton"+qstNo+"'>";
			html += "			<span class='left-title'>�댁슜�� �뺤씤�섍퀬 �좏깮�댁＜�몄슂</span>";
			html += "		</a>";
			html += "		<div class='dropList'>";
			html += "			<div class='inp-box width100'>";
			html += "			<label for='chk-videos-"+qstNo+"' class='blind'>�ъ쭊 �좏깮</label>";
			if(qstTpCd == "10"){
				html += "			<div class='chk-form rounded'>";
			}else if(qstTpCd == "20"){
				html += "			<div>";
			}
			html += "					<ul class='chk-list-box2 chk-form mo-col1'>";
			var rplNosArr = rplNos.split(",");
			var rplContentArr = rplContent.split(",");
			var imgUrlArr = imgUrl.split(",");

			for(var i=0; i<rplNosArr.length; i++){
				var qNo = rplNosArr[i]; // 蹂닿린臾명빆 踰덊샇
				var qText = rplContentArr[i]; // 蹂닿린臾명빆
				var qUrl = imgUrlArr[i]; // �ъ쭊臾명빆
				html += "					<li class='item'>";
				if(qstTpCd == "10"){
					html += "					<input id='voteAnswer"+qstNo+qNo+"' type='checkbox' name='voteAnswer"+qstNo+"' class='voteAnswer' value='"+qText+"' data-rplNo='"+qNo+"'>";
				}else if(qstTpCd == "20"){
					html += "					<input id='voteAnswer"+qstNo+qNo+"' type='radio' name='voteAnswer"+qstNo+"' class='voteAnswer' value='"+qText+"' data-rplNo='"+qNo+"'>";
				}
				html += "						<label for='voteAnswer"+qstNo+qNo+"'>";
				html += "							<div class='img-box'>";
				if(qUrl != ""){
					html += "							<img src='"+qUrl+"' alt='"+qText+"'>";
				}
				html += "            				</div>";
				html += "							<div class='text-box'>";
				html += "							<pre>"+qText+"</pre>";
				html += "							</div>";
				html += "            			</label>";
				html += "            		</li>";
			}
			html += "					</ul>";
			html += "					<!-- �먮윭�� div 'inp-box'�� �대옒�� error �쎌엯 -->";
			html += "					<div class='error-msg' id='voteAnswer"+qstNo+"Err'>";
			html += "						<p>��ぉ�� �좏깮�� 二쇱꽭��.</p>";
			html += "					</div>";
			html += "				</div>";
			html += "			</div>";
			html += "		</div>";
			html += "	</div>";
			html += "</div>";
			html += "</div>";
		}
	});
	$(".voteQstList").append(html);
	$(".dropButton").first().click();
	$(".error-msg").hide();
	if(membershipNo == "" || membershipNo == null ){
		$("#inpCounselMembershipErr").show();
	}
}
/*
�ㅻЦ�� 吏덈Ц html �앹꽦(�ы몴)
*/
function createVoteQuestionHtml_Bak(obj){

	$(".voteQstList").empty();

	// 10 媛앷��� 泥댄겕諛뺤뒪 / 20 媛앷��� �쇰뵒�ㅻ쾭�� / 30 二쇨���
	var html="";
	$.each(voteQuestionInfos, function(idx, val){
		var qstTpCd = val.qstTpCd; // 吏덈Ц����
		var rplContent = val.rplContent; // 蹂닿린臾명빆
		var rplNos = val.rplNos; // 蹂닿린臾명빆 踰덊샇
		var qstNo = val.qstNo;

		html += "<div class='survey-item'>";
		html += "    <p class='question'>Q. "+val.qstNm+"</p>";
		html += "    <input type='hidden' id='voteQstAnswer"+qstNo+"' name='voteQstAnswer' value='N' data-qsttpcd='"+qstTpCd+"'/>";
		html += "    <div class='answer-box'>";

		if(qstTpCd == "30"){
			html += "        <input type='text'  id='voteAnswer"+qstNo+"' name='voteAnswer"+qstNo+"' data-rplNo='"+rplNos+"' class='inp-line voteQstAnswer"+qstNo+"' placeholder='�댁슜�� 湲곗엯�� 二쇱꽭��.' maxlength='200'>";
	//		html += "        <input type='hidden' id='voteAnswer"+qstNo+"Y' name='voteAnswer"+qstNo+"Y' value='"+rplContent+"'/>";
		}else{
			html += "        <ul class='answer-list chk-form voteQstAnswer"+qstNo+"'>";
			var rplNosArr = rplNos.split(",");
			var rplContentArr = rplContent.split(",");

			for(var i=0; i<rplNosArr.length; i++){
				var qNo = rplNosArr[i]; // 蹂닿린臾명빆 踰덊샇
				var qText = rplContentArr[i]; // 蹂닿린臾명빆

				html += "            <li class='item'>";
				if(qstTpCd == "10"){
					html += "            <input id='voteAnswer"+qstNo+qNo+"' type='checkbox' name='voteAnswer"+qstNo+"' value='"+qText+"' data-rplNo='"+qNo+"'>";
				}else if(qstTpCd == "20"){
					html += "            <input id='voteAnswer"+qstNo+qNo+"' type='radio' name='voteAnswer"+qstNo+"' value='"+qText+"' data-rplNo='"+qNo+"'>";
				}
				html += "                <label for='voteAnswer"+qstNo+qNo+"'>"+qText+"</label>";
				html += "            </li>";
			}
			html += "        </ul>";
		}

		html += "    </div>";

		//�뺣떟�뺤씤��
		html += "	 <div style='width: 100%; display: inline-block;margin-top:20px'>";
		html += "	     <div class='error-msg answer-msg' id='voteAnswer"+qstNo+"Err' style='display:inline-block;vertical-align:middle;margin-left:8px;padding-top:0'>";
		html += "	       <p>�낅젰�댁＜�몄슂.</p>  ";
		html += "	     </div>    ";
		html += "	 </div>	";
		html += "</div>";
	});
	$(".voteQstList").append(html);

	$(".error-msg").hide();
	if(membershipNo == "" || membershipNo == null ){
		$("#inpCounselMembershipErr").show();
	}
}

// 怨듯넻遺�遺� �몄뿉�� �곗꽑 hide 泥섎━ �� 媛� 援щ텇肄붾뱶�� 留욊쾶 show
function setLayoutShowHide(eventGbCd){
	$(".eventGbCd50").hide();
	$(".eventGbCd60").hide();
	$(".eventGbCd70").hide();
	$(".eventGbCd80").hide();
	$(".titleNo").hide();

	$("#eventSaveBtn").text("�대깽�� �묐え");
	$("#popTitle").text("�묐え�� �뺣낫");
	$("#evtHeader h2").text("�묐え �섍린");

	if(eventGbCd == "40" || eventGbCd == "50"){
		$("#popTitle").val("");
		$(".eventGbCd50").show();
	}else if(eventGbCd == "60"){
		$("#popTitle").val("");
		$(".eventGbCd60").show();
	}else if(eventGbCd == "70"){
		$("#eventSaveBtn").text("�ы몴�섍린");
		$("#popTitle").text("�ы몴�� �뺣낫");
		$("#evtHeader h2").text("�ы몴 �섍린");
		$(".eventGbCd70").show();
	}else if(eventGbCd == "80"){
		$(".titleNo").show();
		$(".eventGbCd80").show();

		if (fanclassFlag) { //�ы겢�섏뒪 �대깽�� �쇰븣
			$("#popTitle").text("�덉빟�� �뺣낫");
		} else {
			$("#popTitle").text(entryEvent.ttl+" 留ㅼ옣�곷떞�덉빟 �대깽�� �좎껌�뺣낫");
		}

		$(".btn-box").hide();
	}

	$("#chk-enter-all").prop("checked", false);
	$("#inpEnterName").focus();
}

//媛� �대깽�� HTML ���� �� �쒖꽌�� 留욊쾶 �꾨뱶�� show
function setLayoutShowHideRenewal(evtGbFlds){
	var html = '';
	var eventGbCdHtml50 = '';		//�쒕━�쇰쾲�� 泥댄겕 �대깽�� HTML
	var eventGbCdHtml60 = '';		//�댁쫰 �대깽�� HTML
	var eventGbCdHtml70 = '';		//�ы몴 �대깽�� HTML
	var eventGbCdHtml80 = '';		//留ㅼ옣�곷떞 �대깽�� HTML

	$(".eventGbCd80").hide();

	//�쒕━�쇰쾲�� 泥댄겕 �대깽�� HTML
	eventGbCdHtml50 += '<div class="inp-box goodsSelect eventGbCd50">';
	eventGbCdHtml50 += '		<label for="chk-goods-1" class="lb-line lb-top">�쒗뭹 �좏깮</label>';
	eventGbCdHtml50 += '		<div>';
	eventGbCdHtml50 += '			<ul class="chk-list-box chk-form mo-col1" id="goodsUl">';
	eventGbCdHtml50 += '			</ul>';
	eventGbCdHtml50 += '			<div class="error-msg" id="chk-goods-err">';
	eventGbCdHtml50 += '				<p>�쒗뭹�� �좏깮�� 二쇱꽭��.</p>';
	eventGbCdHtml50 += '			</div>';
	eventGbCdHtml50 += '		</div>';
	eventGbCdHtml50 += '	</div>';
	eventGbCdHtml50 += '<div class="inp-box goodsSelect eventGbCd50">';
	eventGbCdHtml50 += '		<p class="label-box">';
	eventGbCdHtml50 += '			<label for="inpEnterSerialNum" class="lb-line">�쒗뭹 �쒕━�� <br>�섎쾭</label>';
	eventGbCdHtml50 += '			<i class="btn-tooltop02" data-tooltip="serialno-usetip"><span>�댄똻蹂닿린(�덉씠�댁뿴由�)</span></i>';
	eventGbCdHtml50 += '		</p>';
	eventGbCdHtml50 += '		<div>';
	eventGbCdHtml50 += '			<div class="inquiry-con">';
	eventGbCdHtml50 += '				<textarea id="inpEnterSerialNum" name="inpEnterSerialNum" class="inp-line pop-tArea" placeholder="�쒗뭹 �쒕━�� �섎쾭 �뺤씤 �� �낅젰�� 二쇱꽭��." maxlength="500"></textarea>';
	eventGbCdHtml50 += '				<span class="txt-count serial-count"><em class="strong">0</em> / 500��</span>';
	eventGbCdHtml50 += '			</div>';
	eventGbCdHtml50 += '			<div class="serial-box">';
	eventGbCdHtml50 += '				<p class="essential">* �쒗뭹�� �쒕━�� �섎쾭瑜� �낅젰�섏떊 �� [�뺤씤�섍린] 踰꾪듉�� �뚮윭二쇱꽭��.</p>';
	eventGbCdHtml50 += '				<button type="button" class="btn btn-s btn-type1" id="chkSerialNoBtn">�뺤씤�섍린</button>';
	eventGbCdHtml50 += '			</div>';
	eventGbCdHtml50 += '			<div class="error-msg" id="inpEnterSerialNumErr">';
	eventGbCdHtml50 += '				<p>�쒕━�� �섎쾭瑜� �낅젰 �� �뺤씤�� 二쇱꽭��.</p>';
	eventGbCdHtml50 += '			</div>';
	eventGbCdHtml50 += '		</div>';
	eventGbCdHtml50 += '</div>';


	//�댁쫰 �대깽�� �대깽�� HTML
	eventGbCdHtml60 += '<div class="survey-box qstList eventGbCd60">';
	eventGbCdHtml60 += '</div>';


	//�ы몴 �대깽�� �대깽�� HTML
	eventGbCdHtml70 += '<div class="survey-box voteQstList eventGbCd70">';
	eventGbCdHtml70 += '		<p><strong><span id="evtNm"></span></strong> �ы몴�� 李몄뿬�댁＜�붿꽌 媛먯궗�⑸땲��.</p>';
	eventGbCdHtml70 += '		<p>�ы몴 �대깽�� 異붿꺼�� �꾪빐 �꾨옒 �뺣낫瑜� �묒꽦�댁＜�몄슂.</p>';
	eventGbCdHtml70 += '		<p class="txt-major">* �ы몴�섍린�� 1�뚮쭔 媛��ν빀�덈떎.</p>';
	eventGbCdHtml70 += '		<p class="txt-general eventGbCd70">* �섎せ�� �뺣낫 �낅젰 �� �ы몴�� �쒗븳�� �덉쓣 �� �덉쑝硫�, 寃쏀뭹 �뱀꺼�� 痍⑥냼�⑸땲��.</p>';
	eventGbCdHtml70 += '</div>';


	//留ㅼ옣�곷떞 �대깽�� �대깽�� HTML
	eventGbCdHtml80 += '<div class="user-info-box secure-pop-form user-form eventGbCd80">';
	eventGbCdHtml80 += '		<div class="secure-pop-tit bottom-line"><span class="titleNo">02. </span>留ㅼ옣�좏깮</div>';
	eventGbCdHtml80 += '    <p class="txt-general">留ㅼ옣 �곷떞 媛��ν븳 留ㅼ옣 諛� 留ㅼ옣�곷떞 �щ쭩�쇱쓣 �좏깮�섏꽭��.</p>';
	eventGbCdHtml80 += '    <div class="secure-pop">';
	eventGbCdHtml80 += '        <div class="inp-box">';
	eventGbCdHtml80 += '            <label for="inpCounselName" class="lb-line">��/�� �좏깮</label>';
	eventGbCdHtml80 += '            <div>';
	eventGbCdHtml80 += '                <div>';
	eventGbCdHtml80 += '                    <div class="select-box">';
	eventGbCdHtml80 += '                        <div id="dropAge" class="wrap-droplist">';
	eventGbCdHtml80 += '                            <button class="droplist-button selected" aria-haspopup="listbox" aria-labelledby="dropAreaBtn" id="dropAreaBtn">�쒖슱</button>';
	eventGbCdHtml80 += '                            <ul class="droplist" id="dropSiDo" tabindex="-1" role="listbox" aria-labelledby="dropAreaBtn" aria-activedescendant="dropArea1-1">';
	eventGbCdHtml80 += '                            </ul>';
	eventGbCdHtml80 += '                        </div>';
	eventGbCdHtml80 += '                    </div>';
	eventGbCdHtml80 += '                </div>';
	eventGbCdHtml80 += '            </div>';
	eventGbCdHtml80 += '        </div>';
	eventGbCdHtml80 += '        <div class="inp-box">';
	eventGbCdHtml80 += '           	<label for="inpCounselCall" class="lb-line">��/援�/援� �좏깮</label>';
	eventGbCdHtml80 += '				<div>';
	eventGbCdHtml80 += '                <div class="select-box">';
	eventGbCdHtml80 += '                    <div id="dropAge" class="wrap-droplist">';
	eventGbCdHtml80 += '                        <button class="droplist-button selected" aria-haspopup="listbox" aria-labelledby="dropAreaBtn2" id="dropAreaBtn2">媛뺣궓援�</button>';
	eventGbCdHtml80 += '                        <ul class="droplist" id="dropSiGunGu" tabindex="-1" role="listbox" aria-labelledby="dropAreaBtn2" aria-activedescendant="dropArea2-1">';
	eventGbCdHtml80 += '                        </ul>';
	eventGbCdHtml80 += '                    </div>';
	eventGbCdHtml80 += '                </div>';
	eventGbCdHtml80 += '            </div>';
	eventGbCdHtml80 += '        </div>';
	eventGbCdHtml80 += '        <ul class="chk-form style-btn store-select-list">';
	eventGbCdHtml80 += '        </ul>';
	eventGbCdHtml80 += '		<div class="error-msg" id="radio-store1Err" style="text-align: center;">';
	eventGbCdHtml80 += '		    <p>留ㅼ옣�� �좏깮�섏꽭��</p>';
	eventGbCdHtml80 += '		</div>';
	eventGbCdHtml80 += '        <div class="store-detail-info">';
	eventGbCdHtml80 += '            <div class="store-detail">';
	eventGbCdHtml80 += '                <p class="store-name"></p>';
	eventGbCdHtml80 += '                <dl>';
	eventGbCdHtml80 += '                    <dt>二쇱냼</dt>';
	eventGbCdHtml80 += '                    <dd id="storeAddr"></dd>';
	eventGbCdHtml80 += '                </dl>';
	eventGbCdHtml80 += '                <dl>';
	eventGbCdHtml80 += '                    <dt>�꾪솕踰덊샇</dt>';
	eventGbCdHtml80 += '                    <dd id="storeTel"></dd>';
	eventGbCdHtml80 += '                </dl>';
	eventGbCdHtml80 += '                <dl>';
	eventGbCdHtml80 += '                    <dt>�곸뾽�쒓컙</dt>';
	eventGbCdHtml80 += '                    <dd id="storeOpenTime"></dd>';
	eventGbCdHtml80 += '                </dl>';
	eventGbCdHtml80 += '                <dl class="dl-parking">';
	eventGbCdHtml80 += '                    <dt>二쇱감怨듦컙</dt>';
	eventGbCdHtml80 += '                    <dd id="storeParkingInfo"></dd>';
	eventGbCdHtml80 += '                </dl>';
	eventGbCdHtml80 += '                <p class="btn-more-box"><a href="#" class="link" id="microSiteDetailView">�곸꽭蹂닿린 ></a></p>';
	eventGbCdHtml80 += '            </div>';
	eventGbCdHtml80 += '            <div class="store-detail-mapbox" id="map">';
	eventGbCdHtml80 += '                <!-- 留� �곸뿭 -->';
	eventGbCdHtml80 += '            </div>';
	eventGbCdHtml80 += '            <div class="hope-visit-date">';
	eventGbCdHtml80 += '                <p class="date-title">諛⑸Ц �щ쭩 �쇱옄 �좏깮</p>';
	eventGbCdHtml80 += '                <dl>';
	eventGbCdHtml80 += '                    <dt>�좎쭨�좏깮</dt>';
	eventGbCdHtml80 += '                    <dd>';
	eventGbCdHtml80 += '                        <input type="text" id="visitDate" name="visitDate" placeholder="諛⑸Ц �щ쭩 �쇱옄瑜� �좏깮�� 二쇱꽭��." class="inp-line inp-calendar">';
	eventGbCdHtml80 += '                        <p class="txt">* �쇱꽦�ㅽ넗�� 留ㅼ옣 留덇컧�쒓컙�� 20�� 30遺꾩엯�덈떎.</p>';
	eventGbCdHtml80 += '                    </dd>';
	eventGbCdHtml80 += '                </dl>';
	eventGbCdHtml80 += '            </div>';
	eventGbCdHtml80 += '        </div>';
	eventGbCdHtml80 += '    </div>';
	eventGbCdHtml80 += '</div>';

//留ㅼ옣�곷떞�� �묐え踰꾪듉
//	eventGbCdHtml80 += '<div class="user-info-box secure-pop-form terms-form  eventGbCd80">';
//	eventGbCdHtml80 += '		<div class="secure-pop-tit bottom-line">';
//	eventGbCdHtml80 += '			<span class="titleNo">04. </span>�좎껌 �뺣낫 �뺤씤';
//	eventGbCdHtml80 += '		</div>';
//	eventGbCdHtml80 += '		<p class="txt-general">諛⑸Ц �щ쭩�쇱옄�� 留ㅼ옣 �뺣낫瑜� �뺤씤 �� �좎껌�� �꾨즺�섏꽭��.</p>';
//	eventGbCdHtml80 += '		<div class="final-check-box">';
//	eventGbCdHtml80 += '			<p class="txt1 storeRsltMsg"><span class="txt-major selectedResultMsg"></span>�쇰줈<br><span class="selectedResultMsg2">留ㅼ옣諛⑸Ц�� �좎껌�⑸땲��.</span></p>';
//	eventGbCdHtml80 += '			<p class="txt2">�� �좎껌 �� 移댁뭅�� �뚮┝�≪쑝濡� &lt;��<span id="ftEvtNm"></span>�� 留ㅼ옣�곷떞�덉빟&gt;<br> 珥덈��μ씠 諛쒖넚�⑸땲��.</p>';
//	eventGbCdHtml80 += '			<p class="btn-area"><button type="button" class="btn btn-d btn-type2" id="reservationBtn">�좎껌�섍린</button></p>';
//	eventGbCdHtml80 += '		</div>';
//	eventGbCdHtml80 += '</div>';


	for(var idx=0; idx<evtGbFlds.length; idx++){
		if(evtGbFlds[idx] == "02"){	//�쒕━�쇰쾲�� 泥댄겕
			html += eventGbCdHtml50;
		} else if(evtGbFlds[idx] == "03") {	//�댁쫰
			html += eventGbCdHtml60;
		} else if(evtGbFlds[idx] == "04") {	//�ы몴
			html += eventGbCdHtml70;
		} else if(evtGbFlds[idx] == "05") {	//留ㅼ옣�곷떞
			html += eventGbCdHtml80;
		}
	}

	$("#eventGbField").empty();
	$("#eventGbField").append(html);

	$(".titleNo").hide();
	
//	$("#eventSaveBtn").text("�대깽�� �묐え");
//	$("#popTitle").text("�묐え�� �뺣낫");
	$("#evtHeader h2").text("�묐え �섍린");

	if(evtGbFlds.indexOf("05") > -1){
		$(".titleNo").show();
		$(".eventGbCd80").show();
		if (fanclassFlag) { //�ы겢�섏뒪 �대깽�� �쇰븣
			$("#popTitle").text("�덉빟�� �뺣낫");
		}

		if(eventInfo.plazas){
			$("#eventBtn_Area_div").hide();
		}else{
			$("#eventBtn_Area_div").show();
		}
	}

	$("#chk-enter-all").prop("checked", false);
	$("#inpEnterName").focus();
}

// 怨듯넻 layout 泥섎━
function setCommLayout(entryEvent, collectItems, addFields){

	// 1. �곷떒 �대�吏� 紐⑤컮�� / pc 泥댄겕
	var imgUrl="";
	var filter = "win16|win32|win64|mac|macintel";
	if ( navigator.platform ) {
		if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
			imgUrl = "//"+entryEvent.moImgPath;
		} else {
			imgUrl = "//"+entryEvent.pcImgPath;
		}
	}

	if(imgUrl == ""){
		$("#evtHeader").removeClass("text-hide");
	}else{
		$("#evtImg").attr("src", imgUrl);
		$("#evtHeader").addClass("text-hide");
	}

	// 2. �대쫫 : 濡쒓렇�� �꾩닔 �щ��� �곕씪 �깅챸 �뗮똿 諛� readonly 泥섎━
	if(sessionMbr == 0 || sessionMbr == null){
		$("#inpEnterName").removeAttr("readonly");
    }

    if(sessionMbr != 0 && sessionMbr != null){
    	$("#inpEnterName").attr("readonly",true);
		$("#inpEnterName").val(eventInfo.loginUserMbrNm);
		$("#inpEnterCall").val(eventInfo.loginUserMobile);
		$("#inpEnterEmail").val(eventInfo.loginUserEmail);
		$("#inpEnterSchool").val(eventInfo.sculNm);
		$("#inpCounselMembership").val(membershipNo);
 	}

	// 3. �섏쭛��ぉ show/hide 泥섎━ : �대쫫, �곕씫泥�, �대찓��, 二쇱냼, sns, 硫λ쾭��
	$(".entryCollect").hide();
	$.each(collectItems, function(idx, val){
		var collectItemCd = val.collectItemCd;
		$(".entryCollect"+collectItemCd).show();
	});

	// 3-1. 硫ㅻ쾭�� 踰덊샇媛� �녿뒗 寃쎌슦�� 蹂댁씠吏� �딅뒗��.
	// 2020-12-24 硫ㅻ쾭�� 踰덊샇媛� �놁뼱�� �섑��쒕떎.
	if(membershipNo == "" || membershipNo == null ){
//		$(".entryCollect60").hide();
	}

	// �숆탳�대쫫 show泥섎━
	if(stPath.indexOf("/event/galaxycampus/")  -1){
		$(".entryCollect70").show();
	}

	// 4. 異붽��꾨뱶 泥섎━
	$("#addFieldArea").empty();

	var addFieldHtml="";
	$.each(addFields, function(idx, obj){
		addFieldHtml += createAddFieldHtml(obj);
	});

	$("#addFieldArea").append(addFieldHtml);

}

/* 異붽� �꾨뱶 �앹꽦 */
function createAddFieldHtml(obj){

	let fldTpCd = obj.fldTpCd;
	let fldNm = obj.fldNm;
	let fldVal = obj.fldVal;
	let fldNo = obj.fldNo;
	let fldDscrt = obj.fldDscrt;
	let html = "";

	const divInpBox = "<div class='inp-box'>";
	let labelFor =    "    <label for='addField"+fldNo+"' class='lb-line'>"+fldNm+"</label>";
	let comment = "		 <p class='essential'>"+fldDscrt+"</p>";

	if(fldTpCd == "10"){
		// �쒖쨪�낅젰
		html += divInpBox;
        html += labelFor;
        html += "    <div>";
        html += "        <input type='text' name='addField"+fldNo+"' id='addField"+fldNo+"' class='inp-line' value='' data-fldtpcd='"+fldTpCd+"'>";
        if(fldDscrt != null){
        	html += comment;
        }
        html += "        <div class='error-msg' id='addField"+fldNo+"Err'>";
        html += "        	<p>�낅젰�� 二쇱꽭��.</p>";
        html += "        </div>";
        html += "    </div>";
        html += "</div>";
	}else if(fldTpCd == "20"){
		// �щ윭以꾩엯��
		html += divInpBox;
        html += labelFor;
        html += "    <div>";
        html += "        <div class='inquiry-con'>";
        html += "            <textarea name='addField"+fldNo+"' id='addField"+fldNo+"' class='inp-line pop-tArea textAreaLen' placeholder='�낅젰�� 二쇱꽭��.' maxlength='1000' data-fldtpcd='"+fldTpCd+"'></textarea>";
        html += '		     <span class="txt-count textarea-count"><em class="strong">0</em> / 1000��</span>';
        html += "        </div>";
        if(fldDscrt != null){
        	html += comment;
        }
        html += "        <div class='error-msg' id='addField"+fldNo+"Err'>";
        html += "        	<p>�낅젰�� 二쇱꽭��.</p>";
        html += "        </div>";
        html += "    </div>";
        html += "</div>	";
	}else if(fldTpCd == "30"){
		// �쇰뵒�ㅻ쾭��
		html += divInpBox;
        html += labelFor;
        html += "    <div>";
        html += "        <ul class='chk-list-box chk-form mo-col2' id='addField"+fldNo+"' data-fldtpcd='"+fldTpCd+"'>";

        var fldValArrRd = fldVal.split(",");
		for(var i=0; i<fldValArrRd.length; i++){
			var lb = fldValArrRd[i];
			html += "            <li class='item'>";
            html += "                <input id='addField"+fldNo+(i+1)+"' type='radio' name='addField"+fldNo+"' value='"+lb+"'>";
            html += "                <label for='addField"+fldNo+(i+1)+"'>"+lb+"</label>";
            html += "            </li>";
		}

        html += "        </ul>";
        if(fldDscrt != null){
        	html += comment;
        }
        html += "        <div class='error-msg' id='addField"+fldNo+"Err'>";
        html += "        	<p>�좏깮�� 二쇱꽭��.</p>";
        html += "        </div>";
        html += "    </div>";
        html += "</div>";
	}else if(fldTpCd == "40"){
		// 泥댄겕諛뺤뒪
		html += divInpBox;
        html += labelFor;
        html += "    <div>";
        html += "        <ul class='chk-list-box chk-form mo-col2' id='addField"+fldNo+"' data-fldtpcd='"+fldTpCd+"'>";

        var fldValArrChk = fldVal.split(",");
		for(var j=0; j<fldValArrChk.length; j++){
			var lb2 = fldValArrChk[j];
			html += "            <li class='item'>";
            html += "                <input id='addField"+fldNo+(j+1)+"' type='checkbox' name='addField"+fldNo+"' value='"+lb2+"'>";
            html += "                <label for='addField"+fldNo+(j+1)+"'>"+lb2+"</label>";
            html += "            </li>";
		}

        html += "        </ul>";
        if(fldDscrt != null){
        	html += comment;
        }
        html += "        <div class='error-msg' id='addField"+fldNo+"Err'>";
        html += "        	<p>�좏깮�� 二쇱꽭��.</p>";
        html += "        </div>";
        html += "    </div>";
        html += "</div>";
	}else if(fldTpCd == "50"){
		// ���됲듃諛뺤뒪
		html += divInpBox;
        html += "    <label for='addField"+fldNo+"Btn' class='lb-line'>"+fldNm+"</label>";
        html += "    <div>";
        html += "        <div class='select-box'>";
        html += "            <div id='dropAge' class='wrap-droplist'>";
        html += "                <button type='button' class='droplist-button' aria-haspopup='listbox' aria-labelledby='addField"+fldNo+"Btn' id='addField"+fldNo+"Btn'>�좏깮�� 二쇱꽭��.</button>";
        html += "                <ul class='droplist' tabindex='-1' role='listbox' aria-labelledby='addField"+fldNo+"Btn' aria-activedescendant='addField"+fldNo+"1' id='addField"+fldNo+"' data-fldtpcd='"+fldTpCd+"'>";

		var fldValArrSel = fldVal.split(",");
		for(var k=0; k<fldValArrSel.length; k++){
			var lb3 = fldValArrSel[k];
			html += "                <li id='addField"+fldNo+(k+1)+"' role='option' class='droplist-item'>"+lb3+"</li>";
		}

        html += "                </ul>";
        html += "            </div>";
        html += "        </div>";
        if(fldDscrt != null){
        	html += comment;
        }
        html += "        <div class='error-msg' id='addField"+fldNo+"Err'>";
        html += "        	<p>�좏깮�� 二쇱꽭��.</p>";
        html += "        </div>";
        html += "    </div>";
        html += "</div>";
	}else if(fldTpCd == "60"){
		// 泥⑤��뚯씪
		html += divInpBox;
        html += labelFor;
        html += "    <div>";
        html += "        <div class='box mail'>";
        html += "            <input type='text' id='addField"+fldNo+"' class='inp-line' title='�뚯씪泥⑤�' readOnly='readOnly'>";
        html += "            <input type='hidden' id='phyPath"+fldNo+"' name='phyPath"+fldNo+"' />";
        html += "            <button type='button' class='btn btn-s btn-type1' id='upldBtn"+fldNo+"60' onclick=\"fnSearchFile('"+fldNo+"')\">李얠븘蹂닿린</button>";
        html += "        </div>";
        html += "        <p class='essential'>* JPG, PNG �뚯씪留� 泥⑤� 媛��ν빀�덈떎.</p>";
        html += "        <ul class='addfile-list file-list"+fldNo+"'></ul>";
        if(fldDscrt != null){
        	html += comment;
        }
        html += "        <div class='error-msg' id='addField"+fldNo+"Err'>";
        html += "            <p>泥⑤��� �뚯씪�� �놁뒿�덈떎.</p>";
        html += "    	</div>";
        html += " 		<input type='hidden' name='fileExe"+fldNo+"'  id='fileExe"+fldNo+"'/>";
		html += " 		<input type='hidden' name='fileName"+fldNo+"' id='fileName"+fldNo+"'/>";
		html += " 		<input type='hidden' name='filePath"+fldNo+"' id='filePath"+fldNo+"'/>";
		html += " 		<input type='hidden' name='fileSize"+fldNo+"' id='fileSize"+fldNo+"'/>";
		html += " 		<input type='hidden' name='fileType"+fldNo+"' id='fileType"+fldNo+"'/>";
        html += "    </div>";
        html += "</div>";


	}else if(fldTpCd == "70"){
		// �대�吏��쎌엯
		fldVal = "//"+fldVal;
		html += "<div>";
        html += "    <label for='inpEnterFileImg' class='lb-line'>"+fldNm+"</label>";
        html += "    <div class=\"event-img\">";
        html += "	 	<img src='"+fldVal+"' style='width:100%; height:250px;'>";
        html += "    </div>";
        if(fldDscrt != null){
        	html += comment;
        }
        html += "</div>";
	}else if(fldTpCd == "80"){

		var html80="";

		// �덈궡臾멸뎄
		/*html += divInpBox;
        html += "    <label for='addField"+fldTpCd+"' class='lb-line'>"+fldNm+"</label>";
        html += "    <div>";
        html += "        <div class='inquiry-con'>";
        html += "            <p>"+fldVal+"</p>";
        html += "        </div>";
        if(fldDscrt != null){
        	html += comment;
        }
        html += "    </div>";
        html += "</div>	";*/

		html80 = "<div class='inp-txt-box'>";
		if(fldNm != null){
			html80 += "    <label for='addField"+fldTpCd+"' class='lb-line'>"+fldNm+"</label>";
		}
		html80 += "    <div class='pre-box'>";
		html80 += "            <pre>"+fldVal+"</pre>";

		if(fldDscrt != null){
			html80 += "            <pre>"+fldDscrt+"</pre>";
        }
		html80 += "    </div>";
		html80 += "</div>";

		html = html80;
	} else if(fldTpCd == "90"){
		if(obj.eventNo == "30307"){
			// 由щ럭
			html += "<div>";
			html += "    <div>";
			html += labelFor;
			html += "        <div class='hmf_textarea_wrap'>";
			html += "			<span class='bspk-count'><strong id='counter'>0</strong> �� / 5000</span>";
			html += "        </div>";
			html += "        <div class='inquiry-con'>";
			html += "            <textarea name='bspk-txt-fld' id='addField"+fldNo+"' class='inp-line pop-tArea' placeholder='�곹뭹�됱� 理쒖냼 10�� �댁긽, 5000�� 源뚯� �낅젰 媛��ν빀�덈떎.' maxlength='5000' data-fldtpcd='"+fldTpCd+"'></textarea>";
			html += "        </div>";
			if(fldDscrt != null){
				html += comment;
			}
			html += "        <div class='error-msg' id='addField"+fldNo+"Err'>";
			html += "        	<p>�낅젰�� 二쇱꽭��.</p>";
			html += "        </div>";
			html += "    </div>";
			html += "</div>	";

			html += "<div>";
			html += "	<font size='2'>* �뚯씪 �⑸웾�� 理쒕� 50MB源뚯� �낅줈�� 媛��ν빀�덈떎.</font><br>";
			html += "	<font size='2'>* �대�吏� 洹쒓꺽 �ъ씠利덈뒗 理쒕��� 留욎떠 �ｌ뼱二쇱떆湲� 諛붾엻�덈떎.</font><br>";
			html += "	<font size='2'>* �대떦 紐⑤뜽怨� 臾닿��� �댁슜�대굹 �숈씪 臾몄옄�� 諛섎났, �뺤꽕 �� 遺��곹빀�� �댁슜�� ��젣�� �� �덉뒿�덈떎.</font><br>";
			html += "	<font size='2'>* �깅줉�� �ъ쭊怨� 紐⑤뜽紐낆씠 遺덉씪移섑븯嫄곕굹 臾닿��� 寃쎌슦, 寃뚯떆�� �댁슜�� ��젣�� �� �덉뒿�덈떎.</font>";
			html += "</div>";

		} else {
			// �볤�
			html += divInpBox;
			html += labelFor;
			html += "    <div>";
			html += "        <div class='inquiry-con'>";
			html += "            <textarea name='addField"+fldNo+"' id='addField"+fldNo+"' class='inp-line pop-tArea' placeholder='�낅젰�� 二쇱꽭��.' maxlength='500' data-fldtpcd='"+fldTpCd+"'></textarea>";
			html += "        </div>";
			if(fldDscrt != null){
				html += comment;
			}
			html += "        <div class='error-msg' id='addField"+fldNo+"Err'>";
			html += "        	<p>�낅젰�� 二쇱꽭��.</p>";
			html += "        </div>";
			html += "    </div>";
			html += "</div>	";
		}
	} else if(fldTpCd == "100"){
		//紐⑤뜽紐� 泥댄겕
		html += divInpBox;
        html += labelFor;
        html += "    <div>";
        html += "        <div class='box mail'>";
        html += "            <input type='text' name='inputMdlCode' id='addField"+fldNo+"' class='inp-line' value='' data-fldtpcd='"+fldTpCd+"'>";
        html += "            <input type='hidden' id='bspkMdChk' value=''/>";
        html += "            <button type='button' id='bspkMdBtn' class='btn btn-s btn-type1' onclick=\"bspkModelChk("+fldNo+")\">�뺤씤</button>";
        html += "        </div>";
        if(fldDscrt != null){
        	html += comment;
        }
        html += "        <div class='error-msg' id='addField"+fldNo+"Err'>";
        html += "        	<p>紐⑤뜽紐낆쓣 �낅젰�� 二쇱꽭��.</p>";
        html += "        </div>";
        html += "    </div>";
        html += "</div>";
	} else if(fldTpCd == "110"){
		// �됱젏 �낅젰
		html += divInpBox;
		html += labelFor;
		html += "    <div class='gradechoice'>";
		html += "        <div class='review-starating'>";
		for(var i=1; i<=5; i++){
			if(i==1){
				html += "<button type='button' value=" + i + " id='addField"+fldNo+"' data-fldtpcd='"+fldTpCd+"' onclick=\"bspkStarating("+i+", "+fldNo+", "+fldTpCd+")\"><span class='star-yellow' >蹂꾩젏</span></button>";
			} else {
				html += "<button type='button' value=" + i + " id='addField"+fldNo+"' data-fldtpcd='"+fldTpCd+"' onclick=\"bspkStarating("+i+", "+fldNo+", "+fldTpCd+")\"><span class='star-yellow'  aria-hidden='true'>蹂꾩젏</span></button>";
			}
		}
		html += "        <span class='starating-score'>";
		html += "            <input type='hidden' id='estmScore' name='estmScore' value='5'/>";
		html += "            <strong>5</strong>/5";
		html += "        </span>";
		html += "    </div>";
		html += "    </div>";
		html += "</div>";
	} else if(fldTpCd == "120"){
		//�ㅼ쨷泥⑤��뚯씪
		html += divInpBox;
		html += "    <div class='attach-file'>";
		html += "        <div class='addMedia' id='attach-file-btn'>";
		html += "            <label class='inp-file' for='attachFile' tabindex='0'>";
		html += "                <em class='blind'>�뚯씪泥⑤��섍린</em>";
		html += "                <button type='button' id='attachFile' style='width:100%; background:none;' onclick=\"multiFileUpload.file(multiFileUpload.afterFileSelect)\"><span>泥⑤�</span></button>";
		html += "                <input type='hidden' id='addField"+fldNo+"' data-fldtpcd='"+fldTpCd+"' value=''/>";
		html += "            </label>";
		html += "            <p>(<em>0</em>/10)</p>";
		html += "        </div>";
		html += "        <ol>";
		html += "        </ol>";
		html += "        <p class='mediaCount'>(<em>0</em>/10)</p>";
		html += "        <div class='error-msg' id='addField"+fldNo+"Err'>";
		html += "            <p>泥⑤��뚯씪�� �깅줉�� 二쇱꽭��.</p>";
		html += "        </div>";
		html += "    </div>";
		html += "</div>";
	} else if(fldTpCd == "130"){
		// �щ젰
		html += divInpBox;
        html += labelFor;
        html += "<div>";
        html += "        <input type='text' name='addField"+fldNo+"' id='addField"+fldNo+"' class='inp-line inp-calendar' placeholder='�좎쭨瑜� �좏깮�댁＜�몄슂' readonly='readonly' data-fldtpcd='"+fldTpCd+"'>";
        if(fldDscrt != null){
        	html += comment;
        }
        html += "     	<div class='error-msg' id='addField"+fldNo+"Err'>";
        html += "       	<p>�낅젰�� 二쇱꽭��.</p>";
        html += "     	</div>";
        html += "    </div>";
        html += "</div>	";
	}

    return html;

}


/*
	BESPOKE 紐⑤뜽紐� 泥댄겕
*/
function bspkModelChk(fldNo){
	var mdlCode = $("#addField"+fldNo).val();
	var option = {
		url : stPath+"event/eventEntryMdlCodeChk"
		, data : {
		mdlCode : mdlCode
		, eventNo : pblcEvtNo
		}
		, done : function(data){
			if(data === 1){
				let id;
				let errorMsgId;
				//$('input[name=inputMdlCode]').attr("readonly", true);
				$("#bspkMdChk").val("checked");
				$.each(addFields, function(idx, obj){
					if(obj.fldTpCd == "100"){
						id = "addField"+obj.fldNo;
						errorMsgId = "#"+id+"Err";
					}
				});
				makeAlert("紐⑤뜽紐� �낅젰�� �꾨즺�섏뿀�듬땲��.");
				$(errorMsgId).hide();
				$("#bspkMdBtn").hide();
			} else {
				makeAlert("紐⑤뜽紐낆쓣 �ㅼ떆 �뺤씤�� 二쇱꽭��.");
			}
		}
	};
	ajax.call(option);
}

/*
	BESPOKE �먮옉�섍린 �됱젏 �좏깮
*/
function bspkStarating(idx, fldNo, fldTpCd){
	var scoreHtml = "";
	$(".gradechoice>.review-starating").children().remove();

	for(var i = 1; i <= 5; i++){
		var ariaHidden = "";
		if(i > 1){
			ariaHidden = "aria-hidden='true'";
		}

		if(idx >= i){
			scoreHtml += '<button type="button" value="'+i+'" id="addField'+fldNo+'" data-fldtpcd="'+fldTpCd+'" onclick="bspkStarating('+i+', '+fldNo+', '+fldTpCd+')"><span class="star-yellow"'+ ariaHidden  +'>蹂꾩젏</span></button>';
		}else{
			scoreHtml += '<button type="button" value="'+i+'" id="addField'+fldNo+'" data-fldtpcd="'+fldTpCd+'" onclick="bspkStarating('+i+', '+fldNo+', '+fldTpCd+')"><span class="star-gray"'+ ariaHidden  +'>蹂꾩젏</span></button>';
		}
	}

	scoreHtml += '<input type="hidden" id="estmScore" name="estmScore" value="'+idx+'"/>';
	scoreHtml += '<span class="starating-score"><strong> ';
	scoreHtml += idx;
	scoreHtml += '</strong>/5</span>';
	$(".gradechoice>.review-starating").append(scoreHtml);
	$("button[value='"+idx+"']").focus();
}

/*
	�ㅼ쨷�뚯씪 泥⑤�
*/
var multiFileCnt = 0;										//泥⑤��� �뚯씪 ��
var multiFileUpload = {									//�ㅼ쨷 �뚯씪 �낅줈��
	file: function (callback, mob) {
		multiFileUpload.callBack = callback;
		multiFileUpload.fileForm("eventComment", mob);
	},
	fileForm: function (type, mob) {
		if(multiFileCnt >= 10){
			var alertOverCnt = {
				title : ""
				,content : "�� �댁긽 泥⑤�媛� 遺덇��ν빀�덈떎."
				,callback : ""
				,btnText : "�뺤씤"
			};
			commonAlert(alertOverCnt);
			openLayer('commonAlert');
			return false;
		}
		$("#multiFileUploadForm").remove();
		var html = [];
		html.push("<form name=\"multiFileUploadForm\" id=\"multiFileUploadForm\" method=\"post\" enctype=\"multipart/form-data\">");
		html.push("	<div style=\"display:none;\">");
		if(mob == undefined){
			html.push("		<input type=\"file\" name=\"uploadMultiFile\" id=\"eventUploaddMultiFile\" accept=\".jpg, .jpeg, .png, .gif, .mp4\" />");
		} else if(mob == "camera"){
			html.push("		<input type=\"file\" name=\"uploadMultiFile\" id=\"eventUploaddMultiFile\" accept=\"image/*\" />");
		} else if(mob == "camcorder"){
			html.push("		<input type=\"file\" name=\"uploadMultiFile\" id=\"eventUploaddMultiFile\" accept=\"video/*\" />");
		}
		html.push("		<input type=\"hidden\" name=\"uploadType\" value=\"" + type + "\">");
		html.push("	</div>");
		html.push("</form>");

		$("body").append(html.join(''));
		$("#eventUploaddMultiFile").click();
	},
	afterFileSelect: function(file, exCode){
		var fldNo = "";
		var errorMsgId = "";

		$.each(addFields, function(idx, obj){
			if(obj.fldTpCd == "120"){
				fldNo = obj.fldNo;
				errorMsgId = "#addField" + fldNo + "Err";
			}
		});
		$("#addField"+fldNo).val("attached");
		$(errorMsgId).hide();

		if(file.exMsg != null){
			var alertExMsg = {
				title : ""
				,content : file.exMsg
				,callback : ""
				,btnText : "�뺤씤"
			};
			commonAlert(alertExMsg);
			openLayer('commonAlert');
			return;
		}

		var ext = file.file.fileName.split('.').pop().toLowerCase();
		var attachLength = $(".attach-file>ol>li>a").length;

		for(var i = 0; i < attachLength; i++){
			if(file.file.fileName === $(".attach-file>ol>li>a")[i].title){
				var alertSameFile = {
					title : ""
					,content : "�숈씪�� �뚯씪�� �깅줉�섏뼱 �덉뒿�덈떎."
					,callback : ""
					,btnText : "�뺤씤"
				};
				commonAlert(alertSameFile);
				openLayer('commonAlert');
				return;
			}
		}

		var html = '';

		if(ext !== "mp4"){
			html += '<li id="'+multiFileCnt+'">';
//			html += '<button type="button" class="delete" name="delFileBtn" style="right: 0.5455vw; top: 0.4545vw; width: 1.4545vw; height: 1.4545vw; background: url(/sec/static/evt/_images/common/icon-delete-circle3.svg) no-repeat;"><span class="blind">��젣</span></button>';
			html += '<button type="button" class="delete" name="delFileBtn"><span class="blind">��젣</span></button>';
			html += '<a href="javascript:;" title="'+file.file.fileName+'">';
			html += '<input type="hidden" name="multiImgPath" value="'+file.file.filePath+'"/>';
			html += '<img src="' + stPath + 'xhr/common/imageView?filePath='+file.file.filePath+'" alt="'+file.file.fileName+'">';
			html += '</a></li>';
		}else{
			html += '<li id="'+multiFileCnt+'">';
//			html += '<button type="button" class="delete" name="delFileBtn" style="right: 0.5455vw; top: 0.4545vw; width: 1.4545vw; height: 1.4545vw; background: url(/sec/static/evt/_images/common/icon-delete-circle3.svg) no-repeat;"><span class="blind">��젣</span></button>';
			html += '<button type="button" class="delete" name="delFileBtn"><span class="blind">��젣</span></button>';
			html += '<a href="javascript:;" title="'+file.file.fileName+'">';
			html += '<input type="hidden" name="multiImgPath" value="'+file.file.filePath+'"/>';
			html += '<video muted="muted" loop="loop">';
			html += '<source src="' + stPath + 'xhr/common/imageView?filePath='+file.file.filePath+'" type="video/mp4">';
			html += 'Your browser does not support the video tag.';
			html += '</video>';
			html += '</a></li>';
		}
		$(".attach-file>ol").append(html);
		multiFileCnt++;
		$("#attach-file-btn>p").remove();
		$("#attach-file-btn").append("<p>(<em>"+multiFileCnt+"</em>/10)</p>");
		$(".mediaCount").html("<p>(<em>"+multiFileCnt+"</em>/10)</p>");
		if(multiFileCnt == 10){
			$("#attach-file-btn").hide();
		}
	}
}

/* 泥⑤��뚯씪 異붽� */
$(document).on("change", "#eventUploaddMultiFile", function () {
	waiting.start();
	$('#multiFileUploadForm').ajaxSubmit({
		url: stPath + 'xhr/common/fileUploadResult',
		dataType: 'json',
		success: function (result) {
			$("#multiFileUploadForm").remove();
			waiting.stop();
			multiFileUpload.callBack(result);
		},
		error: function (xhr, status, error) {
			waiting.stop();
		}
	});
});

$(document).on('click', '.attach-file>ol>li button[name=delFileBtn]', function(){
	$(this).parent().remove();
	multiFileCnt--;
	$("#attach-file-btn>p").remove();
	$("#attach-file-btn").append("<p>(<em>"+multiFileCnt+"</em>/10)</p>");
	$(".mediaCount").html("<p>(<em>"+multiFileCnt+"</em>/10)</p>");
	if(multiFileCnt < 10){
		$("#attach-file-btn").show();
	}
	if(multiFileCnt == 0){
		$.each(addFields, function(idx, obj){
			if(obj.fldTpCd == "120"){
				var fldNo = obj.fldNo;
				$("#addField"+fldNo).val("");
			}
		});
	}

	$('#attachFile').focus();
});

/* 硫ㅻ쾭�� �섏씠吏� �대룞 */
function fnGoMembershipPage(){
	window.location.href = stPath+"membership/membershipJoin/";
	$(".evt-pop-close").trigger("click");
}


/*
	�쒕━�� 踰덊샇 �뺤씤
*/
function fnCheckSerialNo(){
	var goodsVal = $("input[name='chk-goods']:checked").val(); // �좏깮�� �쒗뭹 �꾩씠��
	var inputValue = $("#inpEnterSerialNum").val(); // �낅젰�� �쒕━�쇰쾲��
	$("#inpEnterSerialNumErr").hide();

	if(goodsVal == undefined || goodsVal == ""){
		makeAlert("�쒗뭹�� �좏깮�섏뀛�� �쒕━�� �섎쾭 �뺤씤�� 媛��ν빀�덈떎.");
		return;
	}

	if(inputValue == ""){
		$("#inpEnterSerialNumErr").show();
		return;
	}

	let param = {
			serialNo : inputValue
		,	mdlCode : $("input[name='chk-goods']:checked").data("mdlcode") // 紐⑤뜽 肄붾뱶
		,	goodsId : $("input[name='chk-goods']:checked").val()
		,	eventNo : pblcEvtNo
	};

	let options = {
		url : stPath+"xhr/event/checkSerialNo"
		, data : param
		, type : "GET"
		, done: function (data) {
			var result = data.result;

			$("#serialNumChk").val(result.validate);

			if(result.validate == "Y"){
				$("#serialNum").val(result.serialNo);
				$("#mdlCode").val(result.mdlCode);
			}

			if(result.validate== "Y") {
				makeAlert("�쒗뭹 �쒕━�� �섎쾭<br/>�뺤씤�� �꾨즺�섏뿀�듬땲��.");
			} else if(result.validate == "D") {
				makeAlert("�대� �ъ슜�� �쒕━�쇱엯�덈떎.");
				$("#serialNumChk").val("N");
			} else {
				makeAlert("�쒗뭹 �쒕━�� �섎쾭瑜� �ㅼ떆<br/>�낅젰�� 二쇱꽭��.");
			}
			if(result === "N"){
				$("#inpEnterSerialNum").select();
			}
		}
	};
	ajax.call(options);

}

/*
�뱀젙�대깽�몄뿉 ���� 異붽��꾨뱶[�볤�] 議고쉶
*/
function fnGetReplyList(evtNo, so){
	if(evtNo == undefined || evtNo == ""){
		makeAlert("eventNo媛� 議댁옱�섏� �딆뒿�덈떎.");
		return;
	}

	stPath = ($("#openPop").data("st-path"));

	let param = {
			eventNo : evtNo
		,	fldTpCd : '90' // 異붽��꾨뱶 - �볤� �좏삎
		,   page : (so !== undefined ? so.page : 1)
		,   rows : (so !== undefined ? so.rows : 10)
	};

	let options = {
		url : stPath+"xhr/event/getReplyList"
		, data : param
		, type: 'POST'
		, dataType : "html"
		, done: function (data) { //joinName, fldVal, sysRegrNo
			$("#review-list").html(data);

		}
	};

	ajax.call(options);

}


/*
�뱀젙�대깽�몄뿉 ���� 異붽��꾨뱶[�볤�] 議고쉶
*/
function fnGetCommentList(evtNo){
	if(evtNo == undefined || evtNo == ""){
		makeAlert("eventNo媛� 議댁옱�섏� �딆뒿�덈떎.");
		return;
	} else {
		stPath = ($("#openPop").data("st-path"));

		var param = {
				eventNo : evtNo
				, fldTpCd : '90' // 異붽��꾨뱶 - �볤� �좏삎
			};

		var options = {
			url : stPath+"xhr/event/getCommentList"
			, data : param
			, type: 'POST'
			, dataType : "html"
			, done: function (data) { //joinName, fldVal, sysRegrNo
				$("#review-list").children().remove();
				$("#review-list").html(data);
			}
		};
		ajax.call(options);
	}


	/*if(linkJoinNo == undefined){
		var param = {
			eventNo : evtNo
			, fldTpCd : '90' // 異붽��꾨뱶 - �볤� �좏삎
		};

		var options = {
			url : stPath+"xhr/event/getCommentList"
			, data : param
			, type: 'POST'
			, dataType : "html"
			, done: function (data) { //joinName, fldVal, sysRegrNo
				$("#review-list").children().remove();
				$("#review-list").html(data);
			}
		};
		ajax.call(options);
	} else {
		var param = {
			eventNo : evtNo
			, fldTpCd : '90' // 異붽��꾨뱶 - �볤� �좏삎
			, linkJoinNo : linkJoinNo
		};

		var options = {
			url : stPath+"xhr/event/getCommentList"
			, data : param
			, type: 'POST'
			, dataType : "html"
			, done: function (data) { //joinName, fldVal, sysRegrNo
				$("#review-list").children().remove();
				$("#review-list").html(data);

			}
		};

		ajax.call(options);
	}*/

}



/*
	�뺣떟�뺤씤 qstNo : 臾명빆踰덊샇 / qstTbCd : 臾명빆����
*/
function checkAnswer(qstNo, qstTpCd){

	var rplCnt=0; // 蹂닿린臾명빆 媛�닔
	var answerCnt=0; // 留욏엺 媛�닔

	if(qstTpCd == "30"){
		var inputAnswer = $("input[name=answer"+qstNo+"]").val();
		var answer = $("input[name=answer"+qstNo+"Y]").val();
		if(inputAnswer == answer){
			$("#answer"+qstNo+"Err").hide();
			makeAlert("�뺣떟�낅땲��.");
			$("#qstAnswer"+qstNo).val("Y");
		}else{
			$("#answer"+qstNo+"Err").show();
			makeAlert("�꾩돺寃뚮룄 �ㅻ떟�낅땲��.<BR>�ㅼ떆 �쒕쾲 �뺤씤�� 二쇱꽭��.");
			$("#qstAnswer"+qstNo).val("N");
		}
	}else{
		$("input[name=answer"+qstNo+"]").each(function(idx){
			var id = $(this).attr("id");
			var answer = $("#"+id+"Y").val();

			if($("#"+id).is(":checked") == true){
				if(answer == "Y"){
					answerCnt++; // �좏깮�� 蹂닿린媛� �뺣떟�� Y�� 寃쎌슦
				}
			}else{
				if(answer != "Y"){
					answerCnt++; // �좏깮�섏� �딆� 蹂닿린媛� �뺣떟�� N�� 寃쎌슦
				}
			}
			rplCnt++;
		});

		if(rplCnt == answerCnt){
			$("#answer"+qstNo+"Err").hide();
			makeAlert("�뺣떟�낅땲��.");
			$("#qstAnswer"+qstNo).val("Y");
		}else{
			$("#answer"+qstNo+"Err").show();
			makeAlert("�꾩돺寃뚮룄 �ㅻ떟�낅땲��.<BR>�ㅼ떆 �쒕쾲 �뺤씤�� 二쇱꽭��.");
			$("#qstAnswer"+qstNo).val("N");
		}
	}
}

/*
	�고렪 踰덊샇 李얘린 �앹뾽 ===================================================================================
 */
function fnPostLayerPop(){
	var options = {
            oncomplete: function(data) {
            	 //var addr = ''; // 二쇱냼 蹂���
                 var extraAddr = ''; // 李멸퀬��ぉ 蹂���
                 // �ъ슜�먭� �좏깮�� 二쇱냼媛� �꾨줈紐� ���낆씪�� 李멸퀬��ぉ�� 議고빀�쒕떎.
                 if(data.userSelectedType === 'R'){
                     // 踰뺤젙�숇챸�� �덉쓣 寃쎌슦 異붽��쒕떎. (踰뺤젙由щ뒗 �쒖쇅)
                     // 踰뺤젙�숈쓽 寃쎌슦 留덉�留� 臾몄옄媛� "��/濡�/媛�"濡� �앸궃��.
                     if(data.bname !== '' && /[��|濡�|媛�]$/g.test(data.bname)){
                         extraAddr += data.bname;
                     }
                     // 嫄대Ъ紐낆씠 �덇퀬, 怨듬룞二쇳깮�� 寃쎌슦 異붽��쒕떎.
                     if(data.buildingName !== '' && data.apartment === 'Y'){
                         extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                     }
                     // �쒖떆�� 李멸퀬��ぉ�� �덉쓣 寃쎌슦, 愿꾪샇源뚯� 異붽��� 理쒖쥌 臾몄옄�댁쓣 留뚮뱺��.
                     if(extraAddr !== ''){
                         extraAddr = ' (' + extraAddr + ')';
                     }
                     // 議고빀�� 李멸퀬��ぉ�� �대떦 �꾨뱶�� �ｋ뒗��.
                 }
                data.jibunAddress += extraAddr;
                data.roadAddress += extraAddr;

                fnLoadAddrInfo(data);
            },
            width : '100%',
            height : '100%',
            maxSuggestItems : 5
    };
	layerPost.open(options);
};

function fnLoadAddrInfo(addrInfo){
	var html =  "";
	var addr = "";
	if(addrInfo.userSelectedType ==='R'){
		html = '<p>[�꾨줈紐�]</p>';
		html += '<p>'+addrInfo.roadAddress+'</p>';
		addr += "[�꾨줈紐�] "+addrInfo.roadAddress;
	}else{
		html = '<p>[吏�踰덈챸]</p>';
		html += '<p>'+addrInfo.jibunAddress+'</p>';
		addr += "[吏�踰덈챸] "+addrInfo.jibunAddress;
	}

	$("#inpEnterZonecode").val(addrInfo.zonecode);
	$("#inpEnterAddress").val(addr);
	$("#inpEnterAddressDiv").empty().append(html);
	$("#inpEnterAddressDetail").select();
}

// ================================================================================================= �고렪踰덊샇 END

/*
	�대찓�쇳삎�� 泥댄겕
*/
function fnEmailCheck(email) {
	var str = email.substring(0,2);
	var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	// �대찓�� �뺤떇�� �뚰뙆踰�+�レ옄@�뚰뙆踰�+�レ옄.�뚰뙆踰�+�レ옄 �뺤떇�� �꾨땺寃쎌슦
	if(exptext.test(email) == false) {
		if(str != "10" && str != "82" ){	//�몃뱶�곕쾲�멸� 硫붿씪�� �낅젰�쒓꼍�곕뒗 �쒖쇅
			return false;
		}
	}
	return true;
}

/*
	紐⑤컮�쇰쾲�� 泥댄겕
*/
function fnMobileCheck(phoneNum) {
	var regExp =/(01[016789])([1-9]{1}[0-9]{2,3})([0-9]{4})$/;
	if(regExp.test(phoneNum)){
		return true;
	} else {
		return false;
	}
}

function fnUrlCheck(url){
	var regExp = /^(http|https):\/\/[^ "]+$/;
	if(regExp.test(url)) {
		return true;
	}else{
		return false;
	}

}

/*
	援�Ц 25��, �곸뼱 50�� 泥댄겕
 */
function fnOnLimitInputVal(selector){
	var adrsNm = $(selector).val();
	adrsNm = adrsNm.replace(/[^a-zA-Z��-��\u119E\u11A20-9\s]/g, "").replace(/\s+/g, " ");
	var totalByte = 0;
	var macLen = 50;
	var len;
	for (var i = 0; i < adrsNm.length; i++) {
		var oneChar = escape(adrsNm.charAt(i));
		if (oneChar.length == 1) {
			totalByte++;
		} else if (oneChar.indexOf("%u") != -1) {
			totalByte += 2;
		} else if (oneChar.indexOf("%") != -1) {
			totalByte++;
		}
		if (totalByte <= macLen) {
			len = i + 1;
		}
	}
	$(selector).val(adrsNm.substring(0, len));
}

/*
   �곸꽭二쇱냼 �뱀닔臾몄옄 �덉쇅泥섎━
 */
function fnOnLimitInputValAtDtlAddr(selector){
	var dtlAddr = $(selector).val();
	dtlAddr = dtlAddr.replace(/[^a-zA-Z��-��\u119E\u11A20-9,-/\s]/g, "").replace(/\s+/g, " ");
	$(selector).val(dtlAddr);
}

/* 怨듯넻 �덉씠�� �뚮읉 �앹뾽 */
function makeAlert(contentsParam, calback){
	var contentsparam = contentsParam;
	let alertData = {
               content : contentsparam
               ,btnText : '�뺤씤'
               ,callback : calback
               };
	commonAlert(alertData);
	openLayer('commonAlert');
}

/* 怨듯넻 �덉씠�� �뚮읉 �앹뾽 */
function makeAlert3(contentsParam, calback){
	var contentsparam = contentsParam;
	let alertData = {
               content : contentsparam
               ,btnText : '�뺤씤'
               ,callback : calback
               };
	commonAlert3(alertData);
	openLayer('commonAlert');
}

function commonAlert3(data) {
	$("#commonAlert h2").text(data.title);
	$("#commonAlert pre").html(data.content);
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

/* �앹뾽�リ린 */
function eventPopClose3(){
	$(".evt-pop-close").trigger("click");
	$("#commonAlert pre").replaceWith("<p style='word-break:keep-all;'></p>");
	
	// S @PIL(22.10.28) GCS 戮� 寃붾윭由� �대깽�� 湲��곗씠 �붾㈃ �대룞 ----------
	// 戮� 媛ㅻ윭由� �대깽�� �깅줉 -> 寃뚯떆�� �대깽�� �깅줉 (�꾩껜 而ㅻ��덊떚 �뺣�) : 23-09-14
	if(ugcFlag){
		var param = {
			eventNo : pblcEvtNo
		};

		var options = {
			url : stPath + "xhr/event/getGalcamsEventBbsId",
			data: param,
			done: function(result) {
				if(result.bbsId === 'ugcboard'){
					window.location.href = stPath + "galcamsLog/write/?eventNo=" + pblcEvtNo;
				}else{
					window.location.href = stPath + "community/" + result.bbsId + "/write/?eventNo=" + pblcEvtNo;
				}
			}
		}
		ajax.call(options);
	}
	// E ----------@PIL(22.10.28) GCS 戮� 寃붾윭由� �대깽�� 湲��댁씠 �붾㈃ �대룞
	
}

/* �앹뾽�リ린 */
function eventPopClose(){
	$(".evt-pop-close").trigger("click");
}

/* �앹뾽�リ린 */
function eventSurveyPopClose(){
	$(".evt-pop-close").trigger("click");

	$("#popupArea_Event3791").html("");

	drawSurveyHtmlCode();

}

/* �앹뾽�リ린(鍮꾩뒪�ы겕 �먮옉�섍린 �꾩슜) */
function eventBspkPopClose(){
	$(".evt-pop-close").trigger("click");
	var offset = $("#exhibitionHeight").offset();
	$('html, body').animate({scrollTop : offset.top}, 400);
}

/* 濡쒓렇�� �섏씠吏� �대룞 */
function fnGoLoginPage(){
	window.location.href = stPath+"member/indexLogin/?returnUrl="+returnUrl;
	$(".evt-pop-close").trigger("click");
}

/*
	�뚯씪 �낅줈�� ============================================================================================= START
*/
var currentFileSize = 0; 	// �낅줈�� �뚯씪 �⑸웾
var currentFileExe = ''; 	// �낅줈�� �뚯씪 �뺤옣��

var fileUpload = {
	data : {
		fldNo : ""
	},
	file : function(callBack, fldNo) {
		fileUpload.callBack = callBack;
		fileUpload.fileForm("file", '');
		fileUpload.data.fldNo = fldNo;
	}
	, fileFilter : function(callback, filter) {
		fileUpload.callBack = callback;
		fileUpload.fileForm("file", filter);
	}
	, image : function(callback){
		fileUpload.callBack = callback;
		fileUpload.fileForm("image", '');
	}
	, certificate : function(callback){
		fileUpload.callBack = callback;
		fileUpload.fileForm("certificate", '');
	}
	, fileForm : function(type, filter){
		var html = [];
		$('#fileUploadForm').remove();
		html.push("<form name=\"fileUploadForm\" id=\"fileUploadForm\" method=\"post\" enctype=\"multipart/form-data\">");
		html.push("	<div style=\"display:none;\">");
		html.push("		<input type=\"file\" name=\"eventUploadFile\" id=\"eventUploadFile\" />");
		html.push("		<input type=\"hidden\" name=\"uploadType\" value=\"" + type + "\">");
		html.push("		<input type=\"hidden\" name=\"filter\" value=\"" + filter + "\">");
		html.push("	</div>");
		html.push("</form>");
		$("body").append(html.join(''));
		$("#eventUploadFile").click();
	}
	, callBack : null
	, objId : null
	, afterFileSelect : function(file, exCode) {

		//console.log("===> [afterFileSelect] fldNo : ", fileUpload.data.fldNo);

		$("#phyPath").val(file.filePath);

		var html = '';
		var maxSize = 10;

		currentFileSize = file.fileSize;
		currentFileExe = (file.fileExe).toUpperCase();

		var chkFileExe = false;

		var alertData1 = {
				title : "",
				content : "",
				callback : "",
				btnText : "�뺤씤"
			};

		if(currentFileExe != "JPG" && currentFileExe != "PNG") {
			alertData1.content = "JPG, PNG �뚯씪留� 泥⑤� 媛��ν빀�덈떎.";
			chkFileExe = true;
		}

		if (chkFileExe) {
			commonAlert(alertData1);
			openLayer('commonAlert');

			$("#addField"+fileUpload.data.fldNo).val("");

			$("input[name$='" + fileUpload.data.fldNo + "']").val("");

			return;
		}

		if (currentFileSize > maxSize * 1024 * 1024) {
			var alertData2 = {
				title : "",
				content : "�대�吏��� 理쒕� 10MB源뚯� 泥⑤� 媛��ν빀�덈떎.",
				callback : "",
				btnText : "�뺤씤"
			};
			commonAlert(alertData2);
			openLayer('commonAlert');
			return;
		}

		if ($(".file-list"+fileUpload.data.fldNo).children("li").length >= 1) {
			var alertData3 = {
				title : "",
				content : "�뚯씪�� 1媛쒕쭔 泥⑤� 媛��ν빀�덈떎.",
				callback : "",
				btnText : "�뺤씤"
			};
			commonAlert(alertData3);
			openLayer('commonAlert');
			return;
		}

		html += '<li>';
		html += '	<span>'+file.fileName+'</span>';
		html += '	<button type="button" class="ico-del-s" onclick="fileRemove(\''+fileUpload.data.fldNo+'\')">';
		html += '		<span class="blind">泥⑤��뚯씪 ��젣</span>';
		html += '	</button>';
		html += '</li>';

		$(".file-list"+fileUpload.data.fldNo).append(html);
	}
};

//�뚯씪 �낅줈�� �뷀뤃�� 肄쒕갚 �⑥닔
function fnFileUploadCallBack(result, exCode){
	var rsltFldNo = fileUpload.data.fldNo;
	$("#addField"+rsltFldNo).val(result.fileName);
	$("#fileExe"+rsltFldNo).val(result.fileExe);
	$("#fileName"+rsltFldNo).val(result.fileName);
	$("#filePath"+rsltFldNo).val(result.filePath);
	$("#fileSize"+rsltFldNo).val(result.fileSize);
	$("#fileType"+rsltFldNo).val(result.fileType);

	fileUpload.afterFileSelect(result, exCode);
}

// �뚯씪 ��젣
function fileRemove(fldNo) {
	//var liFileSize = $(".file-list"+fldNo).children("li").eq(0).find("input[name='fileSize']").val();
	//var minSize = currentFileSize - liFileSize;

	$(".file-list"+fldNo).children("li").eq(0).remove();
	$("#addField"+fldNo).val("");
}

$(document).on("change","#eventUploadFile",function(){
	waiting.start();
	$('#fileUploadForm').ajaxSubmit({
		url : stPath+'xhr/common/fileUploadResult.do'
		, dataType : 'json'
		, success : function(result){
			waiting.stop();
			$('#fileUploadForm').remove();
			if(result.exCode == null || result.exCode === ""){
				if(fileUpload.callBack === undefined || fileUpload.callBack == null){
					fnFileUploadCallBack(result.file, result.exCode);
				}else{
					fileUpload.callBack(result.file, result.exCode);
				}
			}else{
				makeAlert(result.exMsg);
			}
		}
		, error : function(xhr, status, error) {
			waiting.stop();
			if(xhr.status === 1000) {
				makeAlert("�몄뀡�� 醫낅즺�섏뿀�듬땲��.");
			} else {
				makeAlert("�ㅻ쪟媛� 諛쒖깮�섏뿀�듬땲��.<BR>愿�由ъ옄�먭쾶 臾몄쓽�섏떗�쒖슂.["+xhr.status+"]["+error+"]");
			}
		}
	});
});

// �뚯씪李얘린
function fnSearchFile(fldNo){
	fileUpload.file(fnFileUploadCallBack, fldNo);
}

// �뚯씪 �낅줈�� ============================================================================================= END



////////////////////////////////////////////////////////////////////////////////////
///////////////////// EVENT LISTENER ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

// �ㅻЦ�� : �뺣떟�뺤씤
$(document).on('click', '.chkAns', function(){
	//var id = $(this).attr('id');
	var qstNo = $(this).attr('arg1');
	var qstTpCd = $(this).attr('arg2');
	checkAnswer(qstNo, qstTpCd);
});

// �고렪踰덊샇 寃���
$(document).on('click', "#inpEnterZonecode, #zoneCodeBtn", function(){
	fnPostLayerPop();
});

// �대깽�� �묐え
$(document).on('click', "#eventSaveBtn", function(){
	fnSaveEventEntry();
});

//留ㅼ옣�곷떞 �묐え
$(document).on('click', "#reservationBtn", function(){

	if (entryEvent.eventAddYn == 'B2C_PLAZA_DOCENT' || entryEvent.eventAddYn == 'B2C_PLAZA_DOCENT_CAMPUS') {
		var ctt = $("#inpEnterCall").val();

		if (!fnMobileCheck(ctt)) {
			var alertData = {
					title : ""
					,content : '�щ컮瑜� �뺤떇�� �곕씫泥섎� �낅젰�섏꽭��.'
					,btnText : '�リ린'
					,callback : fnFocusCtt
				};
				commonAlert(alertData);
				openLayer('commonAlert');


		} else {
			stPath = ($("#openPop").data("st-path"));

			var param = {
					eventNo : entryEvent.eventNo
					, ctt : ctt // 異붽��꾨뱶 - �볤� �좏삎
				};

			var options = {
				url : stPath+"xhr/event/checkEntryConstraints"
				, data : param
				, type: 'POST'
				, done: function (data) {
					var result = data.result;

					if (result.cttCnt > 1) {
						var alertData = {
							content : "�대� �묐え�� �곕씫泥� �낅땲��."
							,btnText : '�リ린'
							,callback : fnFocusCtt
						};
						commonAlert(alertData);
						openLayer('commonAlert');
					} else {
						fnSaveEventEntry();
					}
				}
			};
			ajax.call(options);
		}
	} else {
		fnSaveEventEntry();
	}


});

function fnFocusCtt() {
	$("#inpEnterCall").focus();
}

//�대깽�� �묐え
$(document).on('click', "#eventSurveySaveBtn", function(){
	fnSaveEventSurvey();
});

// �쎄� �꾩껜 �좏깮
$(document).on('click', "#chk-enter-all", function(){
	var allChked = $(this).prop("checked");
	$(".inp-terms").each(function(){
		//console.log($(this).attr("id"));
		$(this).prop("checked", allChked);
	});
});

// url 泥댄겕
/*var timerUrl;
$(document).on('input', '#inpEnterSns', function(e){
	var value = e.target.value;
	var id = e.target.id;

	$("#"+id+"Err").hide();

	if(timerUrl){
		clearTimeout(timerUrl);
	}

	timerUrl = setTimeout(function(){
		if(!fnUrlCheck(value)){
			$("#"+id+"Err2").show();
			return;
		}else{
			$("#"+id+"Err2").hide();
		}
	},300);
});*/

// [�좏슚�� 泥댄겕] �몃뱶�� 踰덊샇
/*var timerPhone;
$(document).on('input', '#inpEnterCall', function(e){
	var value = e.target.value;
	var id = e.target.id;

	if(!value == ""){
		$("#"+id+"Err").hide();

		if(timerPhone){
			clearTimeout(timerPhone);
		}
		timerPhone = setTimeout(function(){
			if(!fnMobileCheck(value)) {
				$("#"+id+"Err2").show();
				return;
			}else{
				$("#"+id+"Err2").hide();
			}
		}, 300);
	}

});*/

// [�좏슚�� 泥댄겕] �대찓��
/*var timerEmail;
$(document).on('input', '#inpEnterEmail', function(e){
	var value = e.target.value;
	var id = e.target.id;

	$("#"+id+"Err").hide();
	$("#"+id+"Err2").hide();

	if(timerEmail){
		clearTimeout(timerEmail);
	}
	timerEmail = setTimeout(function(){
		if(!fnEmailCheck(value)) {
			$("#"+id+"Err2").show();
			return;
		}else{
			$("#"+id+"Err2").hide();
		}
	}, 300);
});*/

// [�좏슚�� 泥댄겕] 援�Ц 25, �곷Ц 50 �쒗븳
$(document).on('keyup keydown', '#inpEnterName', function(){
	fnOnLimitInputVal($(this));
});

// [�좏슚�� 泥댄겕] �곸꽭二쇱냼 �뱀닔臾몄옄 �덉쇅泥섎━
$(document).on('keyup keydown', '#inpEnterAddressDetail', function(){
	fnOnLimitInputValAtDtlAddr($(this));
});


// �댁슜 湲��먯닔 �ㅼ떆媛� 移댁슫��
var content;
$(document).on('keyup', '#inpEnterSns', function(){
	content = $(this).val();
	$(".sns-count").html("<em class='strong'>"+content.length+"</em> / 500��");
});

var content2;
$(document).on('input', '#inpEnterSerialNum', function(){
	content2 = $(this).val();
	$(".serial-count").html("<em class='strong'>"+content2.length+"</em> / 500��");
});


var content3;
$(document).on('input', 'textarea[name=bspk-txt-fld]', function(){
	content3 = $(this).val();
	$(".bspk-count").html("<strong id='counter'>"+content3.length+"</strong>�� / 5000");
});

var content4;
$(document).on('keyup', '.textAreaLen', function(){
	content4 = $(this).val();
	$(this).parent().find(".textarea-count").html("<em class='strong'>"+content4.length+"</em> / 1000��");
});

$(document).on('keyup keydown', 'input[name=inputMdlCode]', function(){
	$("#bspkMdBtn").show();
	$("#bspkMdChk").val("unchecked");
});



// �쒕━�쇰쾲�� 泥댄겕
$(document).on('click', '#chkSerialNoBtn', fnCheckSerialNo);

// [�좏슚�� 泥댄겕] �レ옄留� �낅젰
$(document).on('keyup', 'input:text[numberOnly]', function(){
	$(this).val($(this).val().replace(/[^0-9]/g,""));
});

// 留ㅼ옣 �곸꽭蹂닿린
$(document).on("click", "#microSiteDetailView", function(){
	//var microSitePlazaNo = $("input[name=radio-store]:checked").val();
	var microSiteShopNo = $("input[name=radio-store]:checked").data("shop-no");
	//var microSiteUrl = stPath+"digitalplaza/micro/"+microSitePlazaNo;
	var microSiteUrl = stPath+"digitalplaza/storeDetail/"+microSiteShopNo;
	//window.location.href = microSiteUrl;
	window.open(microSiteUrl);

	$("#microSiteUrl").val(microSiteUrl);
});

//�댄똻 �숈옉 �대깽��
$(document).on("click", ".btn-tooltop02", function(){
	var target = $(this).data("tooltip");
	var goodsVal = $("input[name='chk-goods']:checked").val();
	var imgUrl="";

	$(".serialno-usetip").css("z-index",1000); // tooltip�� �앹뾽�꾩뿉 �쒖떆�섎룄濡� �ㅼ젙

	$.each(goodsSerialInfos, function(idx, val){
		var goodsId = val.goodsId;

		if(goodsId == goodsVal){
			imgUrl = "//"+val.serialImgPath;
		}
	});

	if(imgUrl != ""){
		$("#serialImg").attr("src", imgUrl);
		tooltipCenterTop(this,target,380);
	}/*else{

		if(inputValue == undefined || inputValue == ""){
			$("#chk-goods-err").show();
		}
	}*/
});

// ========================================= event ======================================================= END
// ========================================= event ======================================================= END


/*
	�대깽�� �묐え ����
 */
function fnSaveEventEntry(){

//	createJsonStr();

	$("#focusTarget").val("");

	if(fnValidationCheck()){
		if ( $("#inpEnterSns").val() ) {
			var snsUrl =  $("#inpEnterSns").val();
			snsUrl = snsUrl.trim().replace(/^(http|https):\/\//, "");

			$("#inpEnterSns").val(snsUrl);
		}

		$("#addFieldArea").children(".inp-box").each(function(){
			var $addFieldId = $(this).find("[id^='addField']");

			var fldtpcd = $addFieldId.data("fldtpcd");

			if (fldtpcd === 10 || fldtpcd === 20 || fldtpcd === 90) { //�쒖쨪 �낅젰(10) �먮뒗 �щ윭以꾩엯��(20) �쇰븣
				var fldVal =  $addFieldId.val();
				fldVal = fldVal.trim().replace(/^(http|https):\/\//, "");

				$addFieldId.val(fldVal);
			}

		});

		createJsonStr();
		createVoteJsonStr();

		var options = {
				url: stPath+"xhr/event/insertEventEntry",
				data: $("#eventEntryPopFrm").serialize(),
				done: function (data) {
					var result = data.result;

					if(result.eventAddYn != undefined && result.eventAddYn == "B2C_BSPK_JOIN_2021"){
						var alertData = {
							content : "BESPOKE �대읇 媛��낇븯湲� �대깽�몄뿉 李몄뿬�� 二쇱뀛�� 媛먯궗�⑸땲��.<br>�대읇 媛��� 怨좉컼留뚯쓣 �꾪븳 �쒗깮�� �볦튂吏� 留덉꽭��"
							,btnText : '�リ린'
							,callback : eventPopClose
						};
						commonAlert(alertData);
						openLayer('commonAlert');
					} else if(result.eventAddYn != undefined && result.eventAddYn == "B2C_BSPK_BOAST_2021"){
						var alertData = {
							content : "BESPOKE �대읇 �먮옉�섍린 �대깽�몄뿉 李몄뿬�� 二쇱뀛�� 媛먯궗�⑸땲��.<br>�묒꽦�� �곹뭹�됱� 愿�由ъ옄媛� �뺤씤�섏뿬<br>�뱀씤 �꾩뿉 �먮옉�섍린 �대깽�� 寃뚯떆�먭낵<br>�대떦 �곹뭹�� �곹뭹�� 紐⑸줉�� 寃뚯떆�⑸땲��."
							,btnText : '�リ린'
							,callback : eventBspkPopClose
						};
						commonAlert(alertData);
						openLayer('commonAlert');
					} else {
						if(result.resultCd == "success" && eventAddType == "B2C_LIVE_ALARM"){
							makeAlert(result.resultMsg, eventPopClose);

							fnGetEventEntryInfo(entryEvent.eventNo);
						}
						else if(result.resultCd == "success" && eventAddType == "B2C_GALAXY_PREALARM_2022"){
							var surRcvSelFlag = $("input[data-chkgrp-name=checkEventEnter].plcyGbCd40").is(":checked");

							if (surRcvSelFlag) { // 留덉닔�� �대┃�� 梨꾨줈 �묐え�섍린 �뚮��꾨븣 �ㅻЦ�앹뾽
								joinNo = result.joinNo;

								makeAlert(result.resultMsg, eventSurveyPopClose);
							} else {
								makeAlert(result.resultMsg, eventPopClose);
							}
						} else {
							if (eventAddType == 'B2B2C_9ALAXY_DAY') {
								certificationKcbFlag = false;
							}

							$("#commonAlert p").replaceWith("<pre style='word-break:keep-all;'></pre>");

							var mktRcvSelYn = $("input[data-chkgrp-name=checkEventEnter].plcyGbCd30").eq(0).prop("checked");

							if (mktRcvSelYn !== undefined) {
								var curTime = toTimeString(new Date(), 'Y');
								var mbrNm = $("#inpEnterName").val();
								var stNm = "[" + result.stNm + "]";

								curTime = curTime.substring(0,4) + "��" + " " + curTime.substring(4,6) + "��" + curTime.substring(6,8) + "��" + " "
									+ curTime.substring(8,10) + ":" + curTime.substring(10,12) + ":" + curTime.substring(12,14) + "��<br>";

								if (mktRcvSelYn) {
									result.resultMsg = stNm + "<br>" + mbrNm + " 怨좉컼��<br><br>" + curTime + "<br>�대깽�몃� �꾪븳 愿묎퀬�� �뺣낫 �섏떊��<br>'�숈쓽' �섏뀲�듬땲��.<br>�욎쑝濡� SMS 諛� �대찓�쇱쓣 �듯빐<br> 愿묎퀬�� �뺣낫媛� �덈궡�⑸땲��.<br><br>" + result.resultMsg;
								} else if (!mktRcvSelYn) {
									result.resultMsg = stNm + "<br>" + mbrNm + " 怨좉컼��<br><br>" + curTime + "<br>�대깽�몃� �꾪븳 愿묎퀬�� �뺣낫 �섏떊��<br>'誘몃룞��' �섏뀲�듬땲��.<br>愿묎퀬�� �뺣낫 �섏떊�� �숈쓽�섏� �딆� 寃쎌슦<br> �대깽�� 愿��� �뺣낫, �쒗깮 �덈궡瑜� 諛쏆쑝�� �� �놁뒿�덈떎.<br><br>" + result.resultMsg;
								}
							}

							makeAlert3(result.resultMsg, eventPopClose3);
						}
					}
					
					//�묐え�깃났�� 寃쎌슦 �좊뱶釉뚮┃�� �몄텧
					if(result.resultCd == "success"){
						adbrixCustomEvent(entryEvent.ttl, pblcEvtNo, 'success');
					}
					
					//if(result.resultCd == "success"){
//						console.log("�묐え���� : ",result.resultCd);
						// 臾댁뒯 �댁쑀�몄��� �쇰툝 臾몄쓽 �꾩슂
						// 踰꾪듉�� display: none �� �ㅼ뼱媛��� 踰꾪듉�� �덈낫��
						// 留ㅼ옣�덉빟 �곷떞 �대깽�� �� 寃쎌슦�먮쭔
						// �꾩떆濡� style�� 吏��곌퀬 �덉쓬
						/*if(entryEvent.eventGbCd == "80"){
							$(".btn-box").removeAttr("style");
						}*/
					//}

				}
			};

		if (entryEvent.eventGbCd != "80") { //留ㅼ옣�곷떞�� �꾨땺�뚮쭔 湲곗〈濡쒖쭅(�묐え踰꾪듉 蹂댁씠寃뚰븯湲�) �곸슜
			$(".btn-box").removeAttr("style");
		}

		if (entryEvent.eventAddYn == 'B2C_PLAZA_DOCENT' || entryEvent.eventAddYn == 'B2C_PLAZA_DOCENT_CAMPUS') {
			$("#eventBtn_Area_div").hide();
		}

		if(isPreView) return;

		oneTimeChk = false;

		ajax.call(options);
	}
	// validation result
	else{
		var id = $("#focusTarget").val();
		var type = $("#focusTargetType").val();

		if(type == ""){
			setTimeout(function(){
				$("#"+id).focus();
			}, 1);
		}else{
			$("input[name="+id+"]").focus();
		}
		return;
	}

}

/*
 * [�좏슚�� 泥댄겕]
 */
function fnValidationCheck(){

	var passyn = "Y";
	var evtGbFlds = [];

	if(eventGbFields != undefined){
		for(var idx=0; idx<eventGbFields.length; idx++){
			evtGbFlds.push(eventGbFields[idx].eventFldTpCd);
		}
	}

	$(".error-msg").hide();
	if(membershipNo == "" || membershipNo == null ){
		$("#inpCounselMembershipErr").show();
	}

	const collectItem = {
		                  "10" : {/*�대쫫*/ id : "inpEnterName", errId1 : "inpEnterNameErr", errId2 : "inpEnterNameErr", callback : null},
						  "20" : {/*�곕씫泥�*/ id : "inpEnterCall", errId1 : "inpEnterCallErr", errId2 : "inpEnterCallErr2", callback : fnMobileCheck},
						  "30" : {/*�대찓��*/ id : "inpEnterEmail", errId1 : "inpEnterEmailErr", errId2 : "inpEnterEmailErr2", callback : fnEmailCheck},
						  "40" : {/*二쇱냼*/ id : "inpEnterZonecode", errId1 : "inpEnterZonecodeErr", errId2 : "inpEnterZonecodeErr", callback : null},
						  "50" : {/*SNS寃뚯떆臾�*/ id : "inpEnterSns", errId1 : "inpEnterSnsErr", errId2 : "inpEnterSnsErr2", callback : fnUrlCheck},
						  "60" : {/*硫ㅻ쾭��쾲��*/ id : "inpCounselMembership", errId1 : "inpCounselMembershipErr", errId2 : "inpCounselMembershipErr", callback : null}
						};

	// �섏쭛��ぉ null 泥댄겕
	$.each(collectItems, function(idx, val){

		// 硫ㅻ쾭��� 泥댄겕�섏� �딅뒗��.
//		if(val.collectItemCd != "60"){
			var collectItemId = collectItem[val.collectItemCd].id;
			var collectItemErrId = collectItem[val.collectItemCd].errId1;
			var collectItemVal = $("#"+collectItemId).val();

			if(collectItemVal == ""){
				$("#"+collectItemErrId).show();
				passyn = "N";
				fnFocusIdSet(collectItemId); // focus�� �꾩씠�� �뺣낫
			}
//		}
	});

	// �좏슚�� 泥댄겕 寃곌낵
	let validationSubResult;
	const chkArr = ["20", "30", "50"]; // �곕씫泥�, �대찓��, url �좏슚�� 泥댄겕

	$.each(chkArr, function(i, val){
		validationSubResult = fnValidationSub(collectItem[val]);
		if(!validationSubResult){
			passyn = "N";
			fnFocusIdSet(collectItem[val].id);
		}
	})

	// �앹꽦�� 異붽��꾨뱶�� ���� �좏슚�� 泥댄겕
	passyn = fnValidationAddFieldsChk(passyn);

	// 媛쒖씤�뺣낫 �섏쭛�� �쇰븣
	if(eventGbCd == "40" || evtGbFlds.indexOf("01") > -1 || evtGbFlds.indexOf("06") > -1){
		$("#eventNm").val(entryEvent.ttl);
	}

	// �쒕━�쇰쾲�� 泥댄겕 �뺤씪�뚮쭔
	if(eventGbCd == "50" || evtGbFlds.indexOf("02") > -1){
//		console.log("遺꾧린 泥섎━ :"+ passyn);
		passyn = fnValidationChk50(passyn);
	}

	// �ㅻЦ��(�댁쫰)�� 紐⑤뱺 �뺣떟�� 留욎뼱�쇳븿
	if(eventGbCd == "60" || evtGbFlds.indexOf("03") > -1){
		passyn = fnValidationChk60(passyn);
	}

	// �ы몴�� �쇰븣
	if(evtGbFlds.indexOf("04") > -1){
		passyn = fnValidationChk70(passyn);
	}

	// 留ㅼ옣�곷떞�덉빟 �뺤씪��
	if(eventGbCd == "80" || evtGbFlds.indexOf("05") > -1){

		// 留ㅼ옣�곷떞 �덉빟 �대깽�� �좎껌 �� �쒕쾭 �꾨떖媛�
		$("#visPlazaNo").val($("input[name=radio-store]:checked").val());
		$("#visShopNo").val($("input[name=radio-store]:checked").data("shop-no"));
		$("#visPathTpCd").val($("input[name=radio-store]:checked").data("path-tp-cd"));
		$("#visPlazaNm").val($("input[name=radio-store]:checked").next().text());

		if (docentFlag) {
			var visHopeDt = $docentCal.val();
			var timeCd = getVisTimeCd();
			var withPrsnNum = getWithPrsnNum();

			var visTimeCdNm = $("ul[data-fldtpcd='50']").children("li.focused").text();
			var visWithPrsnNumNm = $("ul[data-fldtpcd='30']").children("li.item").children("input:checked").val();

			$("#visTimeCdNm").val(visTimeCdNm);
			$("#visWithPrsnNumNm").val(visWithPrsnNumNm);

			$("#visHopeDt").val(visHopeDt);
			$("#visTimeCd").val(timeCd);
			$("#visWithPrsnNum").val(withPrsnNum);

		} else if (!docentFlag) { //�꾩뒯�� �꾨땺��
			$("#visHopeDt").val($("#visitDate").val());
		}

		$("#eventNm").val(entryEvent.ttl);

		var seletedPlazaNo = $("input[name=radio-store]:checked").val();

		if(seletedPlazaNo == undefined){
			passyn = "N";
			$("#radio-store1Err").show();
			//$("#radio-store1").focus();

			fnFocusIdSet("radio-store1");
		}
	}

	// 媛쒖씤�뺣낫�섏쭛愿���
	passyn = fnValidationPrivacyPolicy(passyn);

	return passyn == "Y" ? true : false;
}

/*
 * [�좏슚�� 泥댄겕] �섏쭛��ぉ
 * obj.id / obj.errId2 / obj.callback
 */
function fnValidationSub(obj){
	var value = $("#"+obj.id).val();
	if(value != ""){
		var chkFlag = obj.callback(value);
		if(!chkFlag){
			$("#"+obj.errId2).show();
			return false;
		}
	} return true;
}

// [�좏슚�� 泥댄겕] �쒕━�쇰쾲�� 泥댄겕 ��
function fnValidationChk50(passyn){
//	console.log(passyn);
	// �쒗뭹�좏깮
	var goodsVal = $("input[name=chk-goods]:checked").val();
	if(goodsVal == undefined || goodsVal == ""){
		$("#chk-goods-err").show();
		passyn = "N";
		fnFocusIdSet("chk-goods", "name");
	}

	// �쒗뭹 �쒕━�� 踰덊샇 �뺤씤
	if( $("#serialNumChk").val() == "N" ){
		$("#inpEnterSerialNumErr").show();
		passyn = "N";
		fnFocusIdSet("inpEnterSerialNum");
	}
	return passyn;
}

// [�좏슚�� 泥댄겕] �ㅻЦ�뺤� 紐⑤뱺 �뺣떟�� 留욎뼱�쇳븿(�댁쫰)
function fnValidationChk60(passyn){
	let failCnt = 0;
	let focusId;
	let tpCd;
	let ulClassNm;
	$("input[name=qstAnswer]").each(function(){
		ulClassNm = $(this).attr("id");
		var errMsgIdCd = ulClassNm.replaceAll("qstAnswer", "");
		if($(this).val() == "N"){
			failCnt++
			if(failCnt == 1){ // 泥ル쾲吏� �듭븞�� �ъ빱�� 以꾨씪怨�~!!
				tpCd = $(this).data("qsttpcd");
				if(tpCd == "30"){ // 二쇨��앹씪��..
					fnFocusIdSet("answer"+errMsgIdCd);
				}else{
					focusId = $("."+ulClassNm+" > li").children(":eq(0)").attr("id");
					fnFocusIdSet(focusId);
				}
			}
			$("#answer"+errMsgIdCd+"Err").show();
		}
	});

	if(failCnt > 0){
		passyn = "N";
	}

	return passyn;
}

//[�좏슚�� 泥댄겕] �ы몴�� 紐⑤뱺 ��ぉ�� 湲곗엯 �섏뼱 �덉뼱�쇳븿
function fnValidationChk70(passyn){
	//#$#$
	$.each(voteQuestionInfos, function(idx, val){
		var voteQstNo = val.qstNo;
		var voteQstTpCd = val.qstTpCd;
		var voteQstNm = val.qstNm;
		var errorMsgId = "#voteAnswer"+voteQstNo+"Err";

		if(voteQstTpCd=="30"){
			//二쇨���
			var inputValue = $("input[name='voteAnswer"+voteQstNo+"']").val();
			if(inputValue == undefined || inputValue == ""){
				$(errorMsgId).show();
				passyn = "N";
				fnFocusIdSet("voteAnswer"+voteQstNo, "name");
			}
		}else if(voteQstTpCd == "20"){
			//�쇰뵒�ㅻ쾭��
			var inputVal = $("input[name='voteAnswer"+voteQstNo+"']:checked").val();
			if(inputVal == undefined || inputVal == ""){
				$(errorMsgId).show();
				passyn = "N";
				if($(".dropButton"+voteQstNo).hasClass("open") === false){
					$(".dropButton"+voteQstNo).click();
				}
				fnFocusIdSet("voteAnswer"+voteQstNo, "name"); // focus�� �꾩씠�� �뺣낫
			}
		}else if(voteQstTpCd == "10"){
			//泥댄겕諛뺤뒪
			var chkCnt = 0;
			var inputVal = $("input[name='voteAnswer"+voteQstNo+"']:checked").val();
			$("input[name='voteAnswer"+voteQstNo+"']:checked").each(function(){
				if($(this).val() != ""){
					chkCnt++;
				}
			});
			if(chkCnt == 0){
				$(errorMsgId).show();
				passyn = "N";
				if($(".dropButton"+voteQstNo).hasClass("open") === false){
					$(".dropButton"+voteQstNo).click();
				}
				fnFocusIdSet("voteAnswer"+voteQstNo, "name"); // focus�� �꾩씠�� �뺣낫
			}
		}
	});
	return passyn;
}

// [�좏슚�� 泥댄겕] 媛쒖씤�뺣낫�섏쭛愿���
function fnValidationPrivacyPolicy(passyn){
	var plcyAltYn = entryEvent.plcyAltYn; // 泥섎━ 諛⑹묠 �뚮┝ �щ�

	let isRqidChkPlcy = false; // true : 媛쒖씤�뺣낫 [�좏깮]��ぉ 泥댄겕�꾨즺

	$("#privacyPolicy .entryAgreeY").each(function(idx, item){
		var id = $(item).attr("id");
		if($("#"+id).is(":checked") == false){
			$("#err-"+id).show();
			passyn = "N"; // �묐え ���� X
			fnFocusIdSet(id);

		}

	});

	if (passyn != "N") { // 媛쒖씤�뺣낫 �꾩닔 ��ぉ 紐⑤몢 泥댄겕�덉쓣 ��
		var $optPolicy = $("#privacyPolicy .inp-terms").not(".entryAgreeY").not(".plcyGbCd20").not(".plcyGbCd40"); // 媛쒖씤�뺣낫 �좏깮 ��ぉ

		if ($optPolicy.length != 0) {
			$optPolicy.each(function(){
				if($(this).is(":checked") == false){
					isRqidChkPlcy = true;
					return false; // break

				} else {
					isRqidChkPlcy = false;
					return true; // continue
				}
			});

		}
	}

	if (plcyAltYn == "Y") {
		if(passyn == "Y"){
			if (!oneTimeChk && isRqidChkPlcy) { // �쇳쉶�� �뚮┝ 濡쒖쭅
				var alertData = {
						title : "",
						content : "愿묎퀬�� �뺣낫 �섏떊�� �숈쓽�섏� �딆� 寃쎌슦<br>�대깽�� 愿��� �뺣낫, �쒗깮 �덈궡瑜� 諛쏆쑝�� �� �놁뒿�덈떎.<br>[愿묎퀬�� �뺣낫 �섏떊] �숈쓽 �щ�瑜� �뺤씤�댁＜�몄슂.",
						callback : "",
						btnText : "�뺤씤"
				};

				commonAlert(alertData);
				openLayer('commonAlert');

				passyn = "N";

				oneTimeChk = true;

			} else if (oneTimeChk && !isRqidChkPlcy) {
				passyn = "Y"; // �묐え ���� O
			}
		}
	}

	return passyn;
}

// [�좏슚�� 泥댄겕] �앹꽦�� 異붽��꾨뱶�� ���� �좏슚�� 泥댄겕
function fnValidationAddFieldsChk(passyn){

	$.each(addFields, function(idx, item){

		let id = "addField"+item.fldNo;
		let fldTpCd = item.fldTpCd;
		let errorMsgId = "#"+id+"Err";
		let fldValOptYn = (item.fldValOptYn == null || item.fldValOptYn === undefined) ? 'N' : item.fldValOptYn;

		const fldTpCdArr_10_20_60_90_130 = ['10', '20', '60', '90', '130'];

		if (fldValOptYn == 'N') { // 2021.01.04  �대깽�� 異붽� �꾨뱶 以� �꾩닔媛� �쒖쇅 而щ읆 異붽�(媛믪씠 'N' �먮뒗 null �쇰븣留� �꾩닔媛� 泥댄겕, 'Y'�대㈃ 泥댄겕 �섏� �딆쓬)
		//if(fldTpCdArr_10_20_60.includes(fldTpCd)){
			if(fldTpCdArr_10_20_60_90_130.indexOf(fldTpCd) > -1){
				// �쒖쨪, �щ윭以�, 泥⑤��뚯씪
				if($("#"+id).val() == ""){
					$(errorMsgId).show();
					passyn = "N";
					fnFocusIdSet(id); // focus�� �꾩씠�� �뺣낫
				} else if(eventInfo.entryEvent.eventNo == "30307" && fldTpCd == "90") {
					var content = $("#"+id).val();
					if(content.length < 10){
						makeAlert("�댁슜�� 理쒖냼 10�� �댁긽�쇰줈 �낅젰�� 二쇱꽭��.");
						passyn = "N";
					} else if (content.length > 5000){
						makeAlert("�댁슜�� 理쒕� 5,000�� �댄븯濡� �낅젰�� 二쇱꽭��.");
						passyn = "N";
					}
				}
			}else if(fldTpCd == "30"){
				// �쇰뵒�� 踰꾪듉
				var inputValue = $("input[name='"+id+"']:checked").val();
				if(inputValue == undefined || inputValue == ""){
					$(errorMsgId).show();
					passyn = "N";
					fnFocusIdSet(id, "name"); // focus�� �꾩씠�� �뺣낫
				}
			}else if(fldTpCd == "40"){
				// 泥댄겕諛뺤뒪
				var chkCnt=0;
				$("input[name='"+id+"']:checked").each(function(){
					if($(this).val() != ""){
						chkCnt++;
					}
				});

				if(chkCnt == 0){
					$(errorMsgId).show();
					passyn = "N";
					fnFocusIdSet(id, "name"); // focus�� �꾩씠�� �뺣낫
				}
			}else if(fldTpCd == "50"){
				// ���됲듃諛뺤뒪
				var selText = $("#"+id+" li.focused").text();
				if(selText == ""){
					$(errorMsgId).show();
					passyn = "N";
					fnFocusIdSet(id+"Btn"); // focus�� �꾩씠�� �뺣낫 : ���됲듃�� 寃쎌슦 踰꾪듉�� �ъ빱��
				}
			}else if(fldTpCd == "100"){
				//紐⑤뜽紐� �낅젰
				var modelChkFlag = $("#bspkMdChk").val();
				if($("#"+id).val() == "" || modelChkFlag != "checked"){
					$(errorMsgId).show();
					passyn = "N";
					fnFocusIdSet(id); // focus�� �꾩씠�� �뺣낫
				}
			}else if(fldTpCd == "120"){
				//�ㅼ쨷 泥⑤��뚯씪
				if($("#"+id).val() == ""){
					$(errorMsgId).show();
					passyn = "N";
					fnFocusIdSet("attachFile"); // focus�� �꾩씠�� �뺣낫
				}
			}
		}
	});

	return passyn;
}

/*
 * type�� name�쇰줈 �섏뼱�ㅻ뒗 寃쎌슦 targetId�� id媛� �꾨땲 name�쇰줈 �ъ빱�깆���.
 */
function fnFocusIdSet(targetId, type){
	if($("#focusTarget").val() == ""){
		$("#focusTarget").val(targetId);
		if(type != ""){
			$("#focusTargetType").val(type);
		}
	}
}

/*
	異붽��꾨뱶�� �댁슜�� jsonString�쇰줈 議고빀�댁꽌 �쒕쾭濡� �꾨떖
 */
function createJsonStr(){

	var jsonStr = new Object;
	var rowArr = new Array;
	var index = 0;

	$.each(addFields, function(idx, item){
		let jobj = new Object;
		let id = "addField"+item.fldNo;
		let fldTpCd = item.fldTpCd;

		if(fldTpCd == "10" || fldTpCd == "20" || fldTpCd == "90" || fldTpCd == "100" || fldTpCd == "130"){
			// �쒖쨪 , �щ윭以�
			var inputValue126 = $("#"+id).val();
			if(inputValue126 != ""){
				jobj.fldNo = item.fldNo+"";
				jobj.fldGrp = item.fldGrp;
				jobj.fldTpCd = item.fldTpCd+"";
				jobj.fldNm = item.fldNm;
				jobj.fldVal = inputValue126;

				rowArr.push(jobj);
				jsonStr.addFieldList = rowArr;
			}
			index++;
		}else if(fldTpCd == "30"){
			// �쇰뵒�� 踰꾪듉
			var inputValue3 = $("input[name='"+id+"']:checked").val();
			if(inputValue3 != undefined && inputValue3 != ""){
				jobj.fldNo = item.fldNo+"";
				jobj.fldGrp = item.fldGrp;
				jobj.fldTpCd = item.fldTpCd+"";
				jobj.fldNm = item.fldNm;
				jobj.fldVal = inputValue3;

				rowArr.push(jobj);
				jsonStr.addFieldList = rowArr;
			}
			index++;
		}else if(fldTpCd == "40"){
			// 泥댄겕諛뺤뒪
			$("input[name='"+id+"']:checked").each(function(a, b){
				var obj2 = new Object;
				obj2.fldNo = item.fldNo+"";
				obj2.fldGrp = item.fldGrp;
				obj2.fldTpCd = item.fldTpCd+"";
				obj2.fldNm = item.fldNm;
				obj2.fldVal = $(this).val();

				rowArr.push(obj2);
				jsonStr.addFieldList = rowArr;
			});
			index++;
		}else if(fldTpCd == "50"){
			// ���됲듃諛뺤뒪
			var selText = $("#"+id+" li.focused").text();
			if(selText != ""){
				jobj.fldNo = item.fldNo+"";
				jobj.fldGrp = item.fldGrp;
				jobj.fldTpCd = item.fldTpCd+"";
				jobj.fldNm = item.fldNm;
				jobj.fldVal = selText;

				rowArr.push(jobj);
				jsonStr.addFieldList = rowArr;
			}
			index++;
		} else if(fldTpCd == "60"){
			// 泥⑤��뚯씪
			var inputValue126 = $("#"+id).val();
			var filePath = $("#filePath"+item.fldNo).val();

			if(inputValue126 != ""){
				if (item.fldVal != "" && item.fldVal != null && item.fldVal != undefined) {
					var fldValMeta = item.fldVal.split(",");

					if (fldValMeta.length == 1) { // 湲곗〈 fileTypeImg
						jobj.fldNo = item.fldNo+"";
						jobj.fldGrp = item.fldGrp;
						jobj.fldTpCd = item.fldTpCd+"";
						jobj.fldNm = item.fldNm;
						jobj.fldVal = inputValue126 + ";" + filePath;
						jobj.fldValMeta = fldValMeta[0];

						rowArr.push(jobj);
						jsonStr.addFieldList = rowArr;

					} else if (fldValMeta.length == 2) { // 異붽� fileTypeImg, fileTypeImgWithMeta
						//fileTypeImg data setting
						jobj.fldNo = item.fldNo+"";
						jobj.fldGrp = item.fldGrp;
						jobj.fldTpCd = item.fldTpCd+"";
						jobj.fldNm = item.fldNm;
						jobj.fldVal = inputValue126 + ";" + filePath;
						jobj.fldValMeta = fldValMeta[0];

						rowArr.push(jobj);
						jsonStr.addFieldList = rowArr;

						if (eventAddYn == 'N') {
							let jobj2 = new Object;
							//fileTypeImgWithMeta data setting
							jobj2.fldNo = (item.fldNo+1)+"";
							jobj2.fldGrp = item.fldGrp;
							jobj2.fldTpCd = item.fldTpCd+"";
							jobj2.fldNm = item.fldNm;
							jobj2.fldVal = inputValue126 + ";" + filePath;
							jobj.fldValMeta = fldValMeta[1];

							rowArr.push(jobj2);
							jsonStr.addFieldList = rowArr;
						}
					}
				}
			}
			index++;
		}

		else if(fldTpCd == "110") {
			//�됱젏
			var starating = $("#estmScore").val();
			if(starating != "" && starating != undefined && starating != null){
				jobj.fldNo = item.fldNo+"";
				jobj.fldGrp = item.fldGrp;
				jobj.fldTpCd = item.fldTpCd+"";
				jobj.fldNm = item.fldNm;
				jobj.fldVal = starating;

				rowArr.push(jobj);
				jsonStr.addFieldList = rowArr;
			}
			index++;
		} else if(fldTpCd == "120"){
			//�ㅼ쨷 泥⑤��뚯씪
			var multiImgPath = new Array;
			var addMultiImgPathArr = $('input[name=multiImgPath]');
			if($(addMultiImgPathArr).length > 0){
				for(var i = 0; i < addMultiImgPathArr.length; i++){
					multiImgPath.push($(addMultiImgPathArr[i]).val());
				}
			}
			index++;
			if(multiImgPath != null && multiImgPath != undefined && multiImgPath != ""){
				jobj.fldNo = item.fldNo+"";
				jobj.fldGrp = item.fldGrp;
				jobj.fldTpCd = item.fldTpCd+"";
				jobj.fldNm = item.fldNm;
				jobj.fldVal = multiImgPath;

				rowArr.push(jobj);
				jsonStr.addFieldList = rowArr;
			}
		}

	});

	// �숈쓽
	var rowArrPlcy = new Array;

	$(".plcyGbCd20").prop("checked", true);

	$("input[data-chkgrp-name=checkEventEnter]").each(function(idx, item){
		let plcyObj = new Object;
		var id = $(item).attr("id");

		plcyObj.policyNo = $("#"+id).data("policyno")+"";
		plcyObj.fldGrp = idx;

		if($("#"+id).is(":checked") == true){
			plcyObj.seletedYn = "Y";
		}else{
			plcyObj.seletedYn = "N";
		}

		rowArrPlcy.push(plcyObj);
		jsonStr.plcyAgreeList = rowArrPlcy;
		index++;

	});

	var biztalkUseYn = $("#biztalkUseYn").val();

	if (biztalkUseYn == 'Y') {
		var mktRcvSelYnLen = $("input[data-chkgrp-name=checkEventEnter].plcyGbCd30").length;

		var plcyGbCd30idx = 0;

		$("input[data-chkgrp-name=checkEventEnter].plcyGbCd30").each(function(idx, item){
			var id = $(item).attr("id");

			if($("#"+id).is(":checked") == true){
				plcyGbCd30idx++;
			}

		});

		if (mktRcvSelYnLen == plcyGbCd30idx) {
			$("#mktRcvSelYn").val("Y");
		} else {
			$("#mktRcvSelYn").val("N");
		}

	}

	if(index == 0){
		$("#jsonStr").val("noData"); // ��ぉ�� �놁쓣 寃쎌슦 noData 濡� �섍꺼�� �쒕쾭�먯꽌 else 泥섎━��
	}else{
		$("#jsonStr").val(JSON.stringify(jsonStr));
	}

	//console.log($("#jsonStr").val());
}

/*
	�ы몴�� �댁슜�� jsonString�쇰줈 議고빀�댁꽌 �쒕쾭濡� �꾨떖
*/
function createVoteJsonStr(){
	var voteInfo = new Object;
	voteInfo.rdoBox = [];
	voteInfo.txtBox = [];
	voteInfo.chkBox = [];

	$.each(voteQuestionInfos, function(idx, val){
		var rplInfo = new Array();
		var voteQstNo = val.qstNo;
		var voteQstTpCd = val.qstTpCd;
		var voteQstNm = val.qstNm;
		var errorMsgId = "#voteAnswer"+voteQstNo+"Err";
		let jobj = new Object;

		if(voteQstTpCd=="30"){
			//二쇨���
			var inputValue = $("input[name='voteAnswer"+voteQstNo+"']").val();
			var rplNo = $("input[name='voteAnswer"+voteQstNo+"']").data("rplno");

			jobj.qstNo = voteQstNo;
			jobj.qstTpCd = voteQstTpCd;
			jobj.qstNm = voteQstNm;
			jobj.rplNo = rplNo;
			jobj.rplInfo = inputValue;
			voteInfo.txtBox.push(jobj);

		}else if(voteQstTpCd == "20"){
			//�쇰뵒�ㅻ쾭��
			var inputValue = $("input[name='voteAnswer"+voteQstNo+"']:checked").val();
			var rplNo = $("input[name='voteAnswer"+voteQstNo+"']:checked").data("rplno");

			jobj.qstNo = voteQstNo;
			jobj.qstTpCd = voteQstTpCd;
			jobj.qstNm = voteQstNm;
			jobj.rplNo = rplNo;
			jobj.rplInfo = inputValue;
			voteInfo.rdoBox.push(jobj);

		}else if(voteQstTpCd == "10"){
			var rplNo = new Array();
			var rplVal = new Array();
			var inputVal = $("input[name='voteAnswer"+voteQstNo+"']:checked").val();
			$("input[name='voteAnswer"+voteQstNo+"']:checked").each(function(){
				if($(this).val() != ""){
					rplNo.push($(this).data("rplno"));
					rplVal.push($(this).val());
				}
			});

			jobj.qstNo = voteQstNo;
			jobj.qstTpCd = voteQstTpCd;
			jobj.qstNm = voteQstNm;
			jobj.rplNo = rplNo;
			jobj.rplInfo = rplVal;
			voteInfo.chkBox.push(jobj);

		}
	});

	$("#voteJsonStr").val(JSON.stringify(voteInfo));

}

/*
	�댄똻�곸뿭 html tag
 */
function drawTooltipHtmlCode(){
	var html="";
	html += '<div class="tooltip-layer serialno-usetip" tabindex="0">';
	html += '    <div class="tooltip-title"><h2>�쒕━�쇰쾲�� �뺤씤</h2></div>';
	html += '    <div class="tooltip-content">';
	html += '        <div class="serial-img">';
    html += '            <img src="" alt="" id="serialImg">';
    html += '        </div>';
	html += '    </div>';
	html += '    <button type="button" class="btn-tooltip-close"><em class="blind">�リ린</em></button>';
	html += '</div>	';
	return html;
}

/*
	�앹뾽�곸뿭 html tag
 */
function drawPopHtmlCode(){
//	var ctPath = $("#openPop").data("st-path");

	var html="";
	html += '<form id="eventEntryPopFrm">';

	html += '	<input type="hidden" id="serialNumChk" value="N"/>';
	html += '	<input type="hidden" id="serialNum" name="serialNum" value=""/>';
	html += '	<input type="hidden" id="mdlCode" name="mdlCode" value=""/>';
	html += '	<input type="hidden" id="focusTarget" value=""/>';
	html += '	<input type="hidden" id="focusTargetType" value=""/>';
	html += '	<input type="hidden" id="jsonStr" name="jsonStr" value=""/>';
	html += '	<input type="hidden" id="entryEventNo" name="eventNo" value=""/>';
	html += '	<input type="hidden" id="evtGbCd" name="evtGbCd" value=""/>';
	html += '	<input type="hidden" id="prtcpPsbGbCd" name="prtcpPsbGbCd" value=""/>';
	html += '	<input type="hidden" id="prtcpPsbCnt" name="prtcpPsbCnt" value=""/>';
	html += '	<input type="hidden" id="visPlazaNo" name="visPlazaNo" value=""/>';
	html += '	<input type="hidden" id="visShopNo" name="visShopNo" value=""/>';
	html += '	<input type="hidden" id="visPlazaNm" name="visPlazaNm" value=""/>';
	html += '	<input type="hidden" id="visHopeDt" name="visHopeDt" value=""/>';
	html += '	<input type="hidden" id="visTimeCd" name="visTimeCd" value=""/>';
	html += '	<input type="hidden" id="visWithPrsnNum" name="visWithPrsnNum" value=""/>';
	html += '	<input type="hidden" id="visPlazaTel" name="visPlazaTel" value=""/>';
	html += '	<input type="hidden" id="visPlazaAddr" name="visPlazaAddr" value=""/>';
	html += '	<input type="hidden" id="visPathTpCd" name="visPathTpCd" value=""/>';
	html += '	<input type="hidden" id="cpNo" name="cpNo" value=""/>';
	html += '	<input type="hidden" id="eventNm" name="eventNm" value=""/>';
	html += '	<input type="hidden" id="microSiteUrl" name="microSiteUrl" value=""/>';
	html += '	<input type="hidden" id="biztalkTmplTxt" name="biztalkTmplTxt" value=""/>'; // �뚮┝�� �쒗뵆由� 踰덊샇
	html += '	<input type="hidden" id="biztalkUseYn" name="biztalkUseYn" value=""/>'; // �뚮┝�� �ъ슜 �щ�
	html += '	<input type="hidden" id="prtnrCpUseYn" name="prtnrCpUseYn" value=""/>'; // �쒗쑕荑좏룿 �ъ슜 �щ�
	html += '	<input type="hidden" id="mktRcvSelYn" name="mktRcvSelYn" value=""/>'; // 愿묎퀬�� �뺣낫 �섏떊 �꾩껜 �숈쓽 �щ�

	html += '	<input type="hidden" id="weekdayCloseTime" name="weekdayCloseTime" value=""/>'; // �됱씪 留덇컧�쒓컙
	html += '	<input type="hidden" id="weekdayOpenTime" name="weekdayOpenTime" value=""/>'; // �됱씪 �ㅽ뵂 �쒓컙
	html += '	<input type="hidden" id="weekendCloseTime" name="weekendCloseTime" value=""/>'; // 二쇰쭚 留덇컧 �쒓컙
	html += '	<input type="hidden" id="weekendOpenTime" name="weekendOpenTime" value=""/>'; // 二쇰쭚 �ㅽ뵂 �쒓컙
	html += '	<input type="hidden" id="eventAddYn" name="eventAddYn" value=""/>'; // 二쇰쭚 �ㅽ뵂 �쒓컙
	html += '	<input type="hidden" id="popEntrySuccMsg" name="popEntrySuccMsg" value=""/>';


	html += '	<div class="layer-pop layer-normal layer-event-exhibition" id="popupExhibitionEnter" tabindex="0" data-popup-layer="popupExhibitionEnter" data-focus="popupExhibitionEnter">';
	html += '       <button type="button" id="exhibition" data-popup-target="popupExhibitionEnter" style="display: none;"></button>';
	html += '	    <div class="layer-header" id="evtHeader">';
	html += '	        <h2>�묐え �섍린</h2>';
	html += '	    </div>';
	html += '	    <div class="layer-content">';
	html += '	        <div class="frm-login ">';
	html += '	            <form action="">';
	html += '	                <fieldset class="secureInp">';
	html += '	                    <legend>�묐え �낅젰 ��</legend>';
	html += '						 <div class="event-img">';
	html += '	                        <img src="" alt="" id="evtImg">';
	html += '	                    </div>';

	html += '	                    <div class="vote-txt-box eventGbCd70">';
	html += '	                        <p><strong><span id="evtNm"></span></strong> �ы몴�� 李몄뿬�댁＜�붿꽌 媛먯궗�⑸땲��.</p>';
	html += '	                        <p>�ы몴 �대깽�� 異붿꺼�� �꾪빐 �꾨옒 �뺣낫瑜� �묒꽦�댁＜�몄슂.</p>';
	html += '	                        <p class="txt-major">* �ы몴�섍린�� 1�뚮쭔 媛��ν빀�덈떎.</p>';
	html += '	                    </div>';

	html += '	                    <div class="user-info-box secure-pop-form user-form">';
	html += '	                        <div class="secure-pop-tit bottom-line"><span class="titleNo">01. </span><span id="popTitle">�묐え�� �뺣낫</span></div>';
	html += '	                        <div class="secure-pop form-write">';
	html += '	                            <div class="inp-box entryCollect10 entryCollect">';
	html += '	                                <label for="inpEnterName" class="lb-line">�대쫫</label>';
	html += '		                            <div>';
	html += '		                                <input type="text" id="inpEnterName" name="inpEnterName" class="inp-line" value="" readonly="readonly">';
	html += '		                                <div class="error-msg" id="inpEnterNameErr">';
	html += '	                                    	<p>�대쫫�� �낅젰�� 二쇱꽭��.</p>';
	html += '	                                    </div>';
	html += '		                            </div>';
	html += '	                            </div>';

	html += '	                            <div class="inp-box entryCollect20 entryCollect">';
	html += '	                                <label for="inpEnterCall" class="lb-line">�곕씫泥�</label>';
	html += '		                            <div>';
	html += '	                                    <input type="text" id="inpEnterCall" name="inpEnterCall" class="inp-line" placeholder="(-) �놁씠 �レ옄留� �낅젰�� 二쇱꽭��." numberOnly maxlength="11">';
	html += '	                                    <div class="error-msg" id="inpEnterCallErr">';
	html += '	                                    	<p>�곕씫泥섎� �낅젰�� 二쇱꽭��.</p>';
	html += '	                                    </div>';
	html += '	                                    <div class="error-msg"  id="inpEnterCallErr2">';
	html += '	                                    	<p>�곕씫泥섍� �щ컮瑜댁� �딆뒿�덈떎.</p>';
	html += '	                                    </div>';
	html += '		                            </div>';
	html += '	                            </div>';

	html += '								<div class="inp-box entryCollect60 entryCollect">';
    html += '								    <label for="inpCounselMembership" class="lb-line line-double">�쇱꽦�꾩옄 <br>硫ㅻ쾭�� 踰덊샇</label>';
    html += '								    <div>';
    html += '								        <input type="text" id="inpCounselMembership" class="inp-line" value="" readonly="readonly">';
    html += '	                                    <div class="error-msg" id="inpCounselMembershipErr">';
//	html += '	                                    	<p>�섏쓽 �뺣낫�먯꽌 硫ㅻ쾭�� �뚯썝 異붽��뺣낫 �낅젰 ��</p><p>�뚮┝�좎껌�섎㈃ 硫ㅻ쾭�� 踰덊샇媛� 蹂댁뿬吏묐땲��.</p>';
	html += '	                                    </div>';
    html += '								    </div>';
    html += '								</div>';

	html += '	                            <div class="inp-box entryCollect30 entryCollect">';
	html += '	                                <label for="inpEnterEmail" class="lb-line">�대찓��</label>';
	html += '		                            <div>';
	html += '	                                    <input type="text" id="inpEnterEmail" name="inpEnterEmail" class="inp-line" placeholder="�대찓�쇱쓣 �낅젰�� 二쇱꽭��.">';
	html += '	                                    <div class="error-msg" id="inpEnterEmailErr">';
	html += '	                                        <p>�대찓�쇱쓣 �낅젰�� 二쇱꽭��. </p>';
	html += '	                                    </div>';
	html += '	                                    <div class="error-msg" id="inpEnterEmailErr2">';
	html += '	                                        <p>�대찓�쇱쓣 �뺥솗�� �낅젰�� 二쇱꽭��. </p>';
	html += '	                                    </div>';
	html += '		                            </div>';
	html += '	                            </div>';

	html += '	                            <div class="inp-box entryCollect40 entryCollect">';
	html += '	                                <label for="inpEnterZonecode" class="lb-line">二쇱냼</label>';
	html += '		                            <div class="address-box">';
	html += '		                                <div class="address-search">';
	html += '	                                        <input type="text" id="inpEnterZonecode" name="inpEnterZonecode"readonly="readonly" class="inp-line" title="�고렪踰덊샇" placeholder="�고렪踰덊샇瑜� 寃��됲빐 二쇱꽭��." value="">';
	html += '	                                        <button type="button" class="btn btn-s btn-type1" id="zoneCodeBtn">�고렪踰덊샇</button>';
	html += '	                                    </div>';
	html += '	                                    <div class="address-txt">';
	html += '	                                        <div id="inpEnterAddressDiv" >';
	html += '	                                        </div>';
	html += '	                                        	<input type="hidden" id="inpEnterAddress" name="inpEnterAddress">';
	html += '	                                    </div>';
	html += '	                                    <div class="address-detail">';
	html += '	                                        <input type="text" name="inpEnterAddressDetail" id="inpEnterAddressDetail" class="inp-line" placeholder="�곸꽭二쇱냼瑜� �낅젰�댁＜�몄슂(�좏깮�ы빆).">';
	html += '	                                    </div>';
	html += '	                                     <div class="error-msg" id="inpEnterZonecodeErr">';
	html += '	                                        <p>�고렪踰덊샇瑜� �듯빐 二쇱냼瑜� �좏깮�� 二쇱꽭��.</p>';
	html += '	                                    </div>';
	html += '		                            </div>';
	html += '	                            </div>';

	html += '	                            <div class="inp-box entryCollect50 entryCollect">';
	html += '	                                <label for="inpEnterSns" class="lb-line">SNS 寃뚯떆臾� URL</label>';
	html += '		                            <div>';
	html += '		                                <div class="inquiry-con">';
	html += '		                                    <textarea id="inpEnterSns" name="inpEnterSns" class="inp-line pop-tArea" placeholder="寃뚯떆�� SNS URL�� �낅젰�� 二쇱꽭��." maxlength="500"></textarea>';
	html += '		                                    <span class="txt-count sns-count"><em class="strong">0</em> / 500��</span>';
	html += '		                                </div>';
//	html += '	                                    <p class="essential">* SNS �덈궡 臾멸뎄 �곸뿭</p>';
	html += '	                                    <div class="error-msg" id="inpEnterSnsErr">';
	html += '	                                       <p>SNS 寃뚯떆臾� URL�� �낅젰�� 二쇱꽭��.</p>';
	html += '	                                    </div>';
	html += '	                                    <div class="error-msg" id="inpEnterSnsErr2">';
	html += '	                                       <p>URL�� �뺥솗�섍쾶 �낅젰�� 二쇱꽭��.</p>';
	html += '	                                    </div>';
	html += '	                                </div>';
	html += '	                            </div>';

	html += '								<div class="inp-box entryCollect70 entryCollect">';
	html += '	                                <label for="inpEnterSchool" class="lb-line">�숆탳</label>';
	html += '		                            <div>';
	html += '	                                    <input type="text" id="inpEnterSchool" name="inpEnterSchool" class="inp-line pop-tArea" readonly="readonly">';
	html += '		                            </div>';
	html += '	                            </div>';

	html += '	                            <p class="txt-general eventGbCd70">* �섎せ�� �뺣낫 �낅젰 �� �ы몴�� �쒗븳�� �덉쓣 �� �덉쑝硫�, 寃쏀뭹 �뱀꺼�� 痍⑥냼�⑸땲��.</p>';

	html += '	                            <div id="addFieldArea"> ';

	html += '	                            </div>';

	html += '	                            <div class="inp-box goodsSelect eventGbCd50">';
	html += '	                                <label for="chk-goods-1" class="lb-line lb-top">�쒗뭹 �좏깮</label>';
	html += '		                            <div>';
	html += '	                                    <ul class="chk-list-box chk-form mo-col1" id="goodsUl"></ul>';

	html += '	                                     <div class="error-msg" id="chk-goods-err">';
	html += '	                                        <p>�쒗뭹�� �좏깮�� 二쇱꽭��.</p>';
	html += '	                                    </div>';
	html += '		                            </div>';
	html += '	                            </div>';

	html += '	                            <div class="inp-box goodsSelect eventGbCd50">';
	html += '	                                <p class="label-box">';
	html += '	                                    <label for="inpEnterSerialNum" class="lb-line">�쒗뭹 �쒕━�� <br>�섎쾭</label>';
	html += '	                                    <i class="btn-tooltop02" data-tooltip="serialno-usetip"><span>�댄똻蹂닿린(�덉씠�댁뿴由�)</span></i>';
	html += '	                                </p>';
	html += '		                            <div>';
	html += '		                                <div class="inquiry-con">';
	html += '		                                    <textarea id="inpEnterSerialNum" name="inpEnterSerialNum" class="inp-line pop-tArea" placeholder="�쒗뭹 �쒕━�� �섎쾭 �뺤씤 �� �낅젰�� 二쇱꽭��." maxlength="500"></textarea>';
	html += '		                                    <span class="txt-count serial-count"><em class="strong">0</em> / 500��</span>';
	html += '	                                    </div>';
	html += '	                                    <div class="serial-box">';
	html += '	                                        <p class="essential">* �쒗뭹�� �쒕━�� �섎쾭瑜� �낅젰�섏떊 �� [�뺤씤�섍린] 踰꾪듉�� �뚮윭二쇱꽭��.</p>';
	html += '	                                        <button type="button" class="btn btn-s btn-type1" id="chkSerialNoBtn">�뺤씤�섍린</button>';
	html += '	                                    </div>';

	html += '	                                     <div class="error-msg" id="inpEnterSerialNumErr">';
	html += '	                                        <p>�쒕━�� �섎쾭瑜� �낅젰 �� �뺤씤�� 二쇱꽭��.</p>';
	html += '	                                    </div>';
	html += '		                            </div>';
	html += '	                            </div>';
	html += '	                        </div>';
	html += '	                    </div>';

	html += '	                    <div class="survey-box qstList eventGbCd60">';
	html += '	                    </div>';

	html += '						<div class="user-info-box secure-pop-form user-form eventGbCd80">';
	html += '							<div class="secure-pop-tit bottom-line"><span class="titleNo">02. </span>留ㅼ옣�좏깮</div>';
	html += '						    <p class="txt-general">留ㅼ옣 �곷떞 媛��ν븳 留ㅼ옣 諛� 留ㅼ옣�곷떞 �щ쭩�쇱쓣 �좏깮�섏꽭��.</p>';
	html += '						    <div class="secure-pop">';
	html += '						        <div class="inp-box">';
	html += '						            <label for="inpCounselName" class="lb-line">��/�� �좏깮</label>';
	html += '						            <div>';
	html += '						                <div>';
	html += '						                    <div class="select-box">';
	html += '						                        <div id="dropAge" class="wrap-droplist">';
	html += '						                            <button class="droplist-button selected" aria-haspopup="listbox" aria-labelledby="dropAreaBtn" id="dropAreaBtn">�쒖슱</button>';
	html += '						                            <ul class="droplist" id="dropSiDo" tabindex="-1" role="listbox" aria-labelledby="dropAreaBtn" aria-activedescendant="dropArea1-1">';
	html += '						                            </ul>';
	html += '						                        </div>';
	html += '						                    </div>';
	html += '						                </div>';
	html += '						            </div>';
	html += '						        </div>';
	html += '						        <div class="inp-box">';
	html += '						            <label for="inpCounselCall" class="lb-line">��/援�/援� �좏깮</label>';
	html += '						           <div>';
	html += '						                <div class="select-box">';
	html += '						                    <div id="dropAge" class="wrap-droplist">';
	html += '						                        <button class="droplist-button selected" aria-haspopup="listbox" aria-labelledby="dropAreaBtn2" id="dropAreaBtn2">媛뺣궓援�</button>';
	html += '						                        <ul class="droplist" id="dropSiGunGu" tabindex="-1" role="listbox" aria-labelledby="dropAreaBtn2" aria-activedescendant="dropArea2-1">';
	html += '						                        </ul>';
	html += '						                    </div>';
	html += '						                </div>';
	html += '						            </div>';
	html += '						        </div>';

	html += '						        <ul class="chk-form style-btn store-select-list">';
	html += '						        </ul>';
	html += '								<div class="error-msg" id="radio-store1Err" style="text-align: center;">';
	html += '								    <p>留ㅼ옣�� �좏깮�섏꽭��</p>';
	html += '								</div>';

	html += '						        <div class="store-detail-info">';
	html += '						            <div class="store-detail">';
	html += '						                <p class="store-name"></p>';
	html += '						                <dl>';
	html += '						                    <dt>二쇱냼</dt>';
	html += '						                    <dd id="storeAddr"></dd>';
	html += '						                </dl>';
	html += '						                <dl>';
	html += '						                    <dt>�꾪솕踰덊샇</dt>';
	html += '						                    <dd id="storeTel"></dd>';
	html += '						                </dl>';
	html += '						                <dl>';
	html += '						                    <dt>�곸뾽�쒓컙</dt>';
	html += '						                    <dd id="storeOpenTime"></dd>';
	html += '						                </dl>';
	html += '						                <dl class="dl-parking">';
	html += '						                    <dt>二쇱감怨듦컙</dt>';
	html += '						                    <dd id="storeParkingInfo"></dd>';
	html += '						                </dl>';
	html += '						                <p class="btn-more-box"><a href="#" class="link" id="microSiteDetailView">�곸꽭蹂닿린 ></a></p>';
	html += '						            </div>';


	html += '						            <div class="store-detail-mapbox" id="map">';
	html += '						                <!-- 留� �곸뿭 -->';
	html += '						            </div>';
	html += '						            <div class="hope-visit-date">';
	html += '						                <p class="date-title">諛⑸Ц �щ쭩 �쇱옄 �좏깮</p>';
	html += '						                <dl>';
	html += '						                    <dt>�좎쭨�좏깮</dt>';
	html += '						                    <dd>';
	html += '						                        <input type="text" id="visitDate" name="visitDate" placeholder="諛⑸Ц �щ쭩 �쇱옄瑜� �좏깮�� 二쇱꽭��." class="inp-line inp-calendar">';
	html += '						                        <p class="txt">* �쇱꽦�ㅽ넗�� 留ㅼ옣 留덇컧�쒓컙�� 20�� 30遺꾩엯�덈떎.</p>';
	html += '						                    </dd>';
	html += '						                </dl>';
	html += '						            </div>';


	html += '						        </div>';
	html += '						    </div>';
	html += '						</div>';

	html += '	                    <div class="user-info-box secure-pop-form terms-form">';
	html += '	                        <div class="secure-pop-tit bottom-line">';
	html += '	                            <span class="titleNo">03. </span>媛쒖씤�뺣낫 �섏쭛쨌�댁슜 �숈쓽 <span class="ico-required">*<span>�꾩닔�낅젰</span></span>';
	html += '	                        </div>';

	html += '	                        <div class="secure-pop terms-con">';
	html += '	                            <p class="txt-general">';
	html += '			                                洹��섍퍡�쒕뒗 蹂� �숈쓽 �덈궡 臾멸뎄瑜� �숈��섏뀲�쇰ŉ, �덈궡臾멸뎄�� ���� 嫄곗젅�섏떎 �� �덉뒿�덈떎.<br>';
	html += '			                                ��, 嫄곗젅�섏떊 寃쎌슦�먮뒗 �대깽�� �묐え媛� �쒗븳�섏떎 �� �덉뒿�덈떎.';
	html += '	                            </p>';
	html += '	                            <div class="chk-form allChk-box">';
	html += '	                                <input id="chk-enter-all" data-allchk-name="allCheck" data-children-name="checkEventEnter" type="checkbox" required="" title=""';
	html += '	                                    class="checkBoxTerms">';
	html += '	                                <label for="chk-enter-all" class="chk-all">紐⑤뱺 �쎄��� �뺤씤�섍퀬 �꾩껜 �숈쓽�⑸땲��.</label>';
	html += '	                            </div>';
	html += '	                            <div id="privacyPolicy"></div>';
	html += '	                        </div>';

	html += '	                        <div class="help-box">';
	html += '	                            <p>';
	html += '			                                媛쒖씤�뺣낫 泥섎━�� ���� �곸꽭�� �ы빆�� 媛ㅻ윮�� 罹좏띁�� �덊럹�댁�  (<a href="www.samsungebiz.com/event/galaxycampus" class="link" target="_blank">www.samsungebiz.com/event/galaxycampus</a>)�� 怨듦컻�� "�대깽�� 媛쒖씤�뺣낫 泥섎━諛⑹묠"�� 李몄“�섏떗�쒖삤.<br>';
	html += '			                                �ㅻ쭔, 蹂� �숈쓽�� �댁슜怨� �곸땐�섎뒗 遺�遺꾩� 蹂� �숈쓽�� �댁슜�� �곗꽑�⑸땲��.';
	html += '	                            </p>';
	html += '	                        </div>';
	html += '	                    </div>';
	html += '						<div class="user-info-box secure-pop-form terms-form  eventGbCd80">';
	html += '						    <div class="secure-pop-tit bottom-line">';
	html += '						        <span class="titleNo">04. </span>�좎껌 �뺣낫 �뺤씤';
	html += '						    </div>';
	html += '						    <p class="txt-general">諛⑸Ц �щ쭩�쇱옄�� 留ㅼ옣 �뺣낫瑜� �뺤씤 �� �좎껌�� �꾨즺�섏꽭��.</p>';
	html += '						    <div class="final-check-box">';
	html += '						        <p class="txt1 storeRsltMsg"><span class="txt-major selectedResultMsg"></span>�쇰줈<br><span class="selectedResultMsg2">留ㅼ옣諛⑸Ц�� �좎껌�⑸땲��.</span></p>';
	html += '						        <p class="txt2">�� �좎껌 �� 移댁뭅�� �뚮┝�≪쑝濡� &lt;��<span id="ftEvtNm"></span>�� 留ㅼ옣�곷떞�덉빟&gt;<br> 珥덈��μ씠 諛쒖넚�⑸땲��.</p>';
	html += '						        <p class="btn-area"><button type="button" class="btn btn-d btn-type2" id="reservationBtn">�좎껌�섍린</button></p>';
	html += '						    </div>';
	html += '						</div>';
	html += '	                </fieldset>';
	html += '	            </form>';
	html += '	            <div class="btn-box " id="eventBtn_Area_div">';
	html += '		            <button type="button" class="btn btn-d btn-type2" id="eventSaveBtn">�대깽�� �묐え</button>';
	html += '		        </div>';
	html += '	        </div>';
	html += '	    </div>';
	html += '	    <button type="button" class="pop-close evt-pop-close" data-focus-next="popupExhibitionEnter"></button>';
	html += '	</div>	';
	html += '</form>';

	return html;

}

/********************** 由щ돱�� �대깽�몄슜 �앹뾽 HTML Start**********************/
function drawPopHtmlCodeRenewal(){
	var html="";
	html += '<form id="eventEntryPopFrm">';

	html += '	<input type="hidden" id="serialNumChk" value="N"/>';
	html += '	<input type="hidden" id="serialNum" name="serialNum" value=""/>';
	html += '	<input type="hidden" id="mdlCode" name="mdlCode" value=""/>';
	html += '	<input type="hidden" id="focusTarget" value=""/>';
	html += '	<input type="hidden" id="focusTargetType" value=""/>';
	html += '	<input type="hidden" id="jsonStr" name="jsonStr" value=""/>';

	html += '	<input type="hidden" id="voteJsonStr" name="voteJsonStr" value=""/>';

	html += '	<input type="hidden" id="entryEventNo" name="eventNo" value=""/>';
	html += '	<input type="hidden" id="evtGbCd" name="evtGbCd" value=""/>';
	html += '	<input type="hidden" id="isEvtGbFld" name="isEvtGbFld" value=""/>';
	html += '	<input type="hidden" id="prtcpPsbGbCd" name="prtcpPsbGbCd" value=""/>';
	html += '	<input type="hidden" id="prtcpPsbCnt" name="prtcpPsbCnt" value=""/>';
	html += '	<input type="hidden" id="visPlazaNo" name="visPlazaNo" value=""/>';
	html += '	<input type="hidden" id="visShopNo" name="visShopNo" value=""/>';
	html += '	<input type="hidden" id="visPlazaNm" name="visPlazaNm" value=""/>';
	html += '	<input type="hidden" id="visHopeDt" name="visHopeDt" value=""/>';
	html += '	<input type="hidden" id="visTimeCd" name="visTimeCd" value=""/>';
	html += '	<input type="hidden" id="visTimeCdNm" name="visTimeCdNm" value=""/>';
	html += '	<input type="hidden" id="visWithPrsnNum" name="visWithPrsnNum" value=""/>';
	html += '	<input type="hidden" id="visWithPrsnNumNm" name="visWithPrsnNumNm" value=""/>';
	html += '	<input type="hidden" id="visPlazaTel" name="visPlazaTel" value=""/>';
	html += '	<input type="hidden" id="visPlazaAddr" name="visPlazaAddr" value=""/>';
	html += '	<input type="hidden" id="visPathTpCd" name="visPathTpCd" value=""/>';
	html += '	<input type="hidden" id="cpNo" name="cpNo" value=""/>';
	html += '	<input type="hidden" id="eventNm" name="eventNm" value=""/>';
	html += '	<input type="hidden" id="microSiteUrl" name="microSiteUrl" value=""/>';
	html += '	<input type="hidden" id="biztalkTmplTxt" name="biztalkTmplTxt" value=""/>'; // �뚮┝�� �쒗뵆由� 踰덊샇
	html += '	<input type="hidden" id="biztalkUseYn" name="biztalkUseYn" value=""/>'; // �뚮┝�� �ъ슜 �щ�
	html += '	<input type="hidden" id="prtnrCpUseYn" name="prtnrCpUseYn" value=""/>'; // �쒗쑕荑좏룿 �ъ슜 �щ�
	html += '	<input type="hidden" id="mktRcvSelYn" name="mktRcvSelYn" value=""/>'; // 愿묎퀬�� �뺣낫 �섏떊 �꾩껜 �숈쓽 �щ�

	html += '	<input type="hidden" id="weekdayCloseTime" name="weekdayCloseTime" value=""/>'; // �됱씪 留덇컧�쒓컙
	html += '	<input type="hidden" id="weekdayOpenTime" name="weekdayOpenTime" value=""/>'; // �됱씪 �ㅽ뵂 �쒓컙
	html += '	<input type="hidden" id="weekendCloseTime" name="weekendCloseTime" value=""/>'; // 二쇰쭚 留덇컧 �쒓컙
	html += '	<input type="hidden" id="weekendOpenTime" name="weekendOpenTime" value=""/>'; // 二쇰쭚 �ㅽ뵂 �쒓컙
	html += '	<input type="hidden" id="eventAddYn" name="eventAddYn" value=""/>'; // 二쇰쭚 �ㅽ뵂 �쒓컙
	html += '	<input type="hidden" id="ciToken" name="ciToken" value=""/>';
	html += '	<input type="hidden" id="popEntrySuccMsg" name="popEntrySuccMsg" value=""/>';

	html += '	<div class="layer-pop layer-normal layer-event-exhibition layer-famailyPF layer-pop-content-festa-event" id="popupExhibitionEnter" tabindex="0" data-popup-layer="popupExhibitionEnter" data-focus="popupExhibitionEnter">';
	html += '       <button type="button" id="exhibition" data-popup-target="popupExhibitionEnter" style="display: none;"></button>';
	html += '	    <div class="layer-header" id="evtHeader">';
	html += '	        <h2>�묐え �섍린</h2>';
	html += '	    </div>';
	html += '	    <div class="layer-content">';
	html += '	        <div class="frm-login ">';
	html += '	            <form action="">';
	html += '	                <fieldset class="secureInp">';
	html += '	                    <legend>�묐え �낅젰 ��</legend>';
	html += '						 <div class="event-img">';
	html += '	                        <img src="" alt="" id="evtImg">';
	html += '	                    </div>';

//	html += '	                    <div class="vote-txt-box eventGbCd70">';
//	html += '	                        <p><strong><span id="evtNm"></span></strong> �ы몴�� 李몄뿬�댁＜�붿꽌 媛먯궗�⑸땲��.</p>';
//	html += '	                        <p>�ы몴 �대깽�� 異붿꺼�� �꾪빐 �꾨옒 �뺣낫瑜� �묒꽦�댁＜�몄슂.</p>';
//	html += '	                        <p class="txt-major">* �ы몴�섍린�� 1�뚮쭔 媛��ν빀�덈떎.</p>';
//	html += '	                    </div>';

	html += '	                    <div class="user-info-box secure-pop-form user-form">';
	html += '	                        <div class="secure-pop-tit bottom-line"><span class="titleNo">01. </span><span id="popTitle">�묐え�� �뺣낫</span></div>';
	html += '	                        <div class="secure-pop form-write">';
	html += '	                            <div class="inp-box entryCollect10 entryCollect">';
	html += '	                                <label for="inpEnterName" class="lb-line">�대쫫</label>';
	html += '		                            <div>';
	html += '		                                <input type="text" id="inpEnterName" name="inpEnterName" class="inp-line" value="" readonly="readonly">';
	html += '		                                <div class="error-msg" id="inpEnterNameErr">';
	html += '	                                    	<p>�대쫫�� �낅젰�� 二쇱꽭��.</p>';
	html += '	                                    </div>';
	html += '		                            </div>';
	html += '	                            </div>';

	html += '	                            <div class="inp-box entryCollect20 entryCollect">';
	html += '	                                <label for="inpEnterCall" class="lb-line">�곕씫泥�</label>';
	html += '		                            <div>';
	html += '	                                    <input type="text" id="inpEnterCall" name="inpEnterCall" class="inp-line" placeholder="(-) �놁씠 �レ옄留� �낅젰�� 二쇱꽭��." numberOnly maxlength="11">';
	html += '	                                    <div class="error-msg" id="inpEnterCallErr">';
	html += '	                                    	<p>�곕씫泥섎� �낅젰�� 二쇱꽭��.</p>';
	html += '	                                    </div>';
	html += '	                                    <div class="error-msg"  id="inpEnterCallErr2">';
	html += '	                                    	<p>�곕씫泥섍� �щ컮瑜댁� �딆뒿�덈떎.</p>';
	html += '	                                    </div>';
	html += '		                            </div>';
	html += '	                            </div>';

	html += '								<div class="inp-box entryCollect60 entryCollect">';
	html += '								    <label for="inpCounselMembership" class="lb-line line-double">�쇱꽦�꾩옄 <br>硫ㅻ쾭�� 踰덊샇</label>';
	html += '								    <div>';
	html += '								        <input type="text" id="inpCounselMembership" class="inp-line" value="" readonly="readonly">';
	html += '	                                    <div class="error-msg" id="inpCounselMembershipErr">';
	//html += '	                                    	<p>�섏쓽 �뺣낫�먯꽌 硫ㅻ쾭�� �뚯썝 異붽��뺣낫 �낅젰 ��</p><p>�뚮┝�좎껌�섎㈃ 硫ㅻ쾭�� 踰덊샇媛� 蹂댁뿬吏묐땲��.</p>';
	html += '	                                    </div>';
	html += '								    </div>';
	html += '								</div>';

	html += '	                            <div class="inp-box entryCollect30 entryCollect">';
	html += '	                                <label for="inpEnterEmail" class="lb-line">�대찓��</label>';
	html += '		                            <div>';
	html += '	                                    <input type="text" id="inpEnterEmail" name="inpEnterEmail" class="inp-line" placeholder="�대찓�쇱쓣 �낅젰�� 二쇱꽭��.">';
	html += '	                                    <div class="error-msg" id="inpEnterEmailErr">';
	html += '	                                        <p>�대찓�쇱쓣 �낅젰�� 二쇱꽭��. </p>';
	html += '	                                    </div>';
	html += '	                                    <div class="error-msg" id="inpEnterEmailErr2">';
	html += '	                                        <p>�대찓�쇱쓣 �뺥솗�� �낅젰�� 二쇱꽭��. </p>';
	html += '	                                    </div>';
	html += '		                            </div>';
	html += '	                            </div>';

	html += '	                            <div class="inp-box entryCollect40 entryCollect">';
	html += '	                                <label for="inpEnterZonecode" class="lb-line">二쇱냼</label>';
	html += '		                            <div class="address-box">';
	html += '		                                <div class="address-search">';
	html += '	                                        <input type="text" id="inpEnterZonecode" name="inpEnterZonecode"readonly="readonly" class="inp-line" title="�고렪踰덊샇" placeholder="�고렪踰덊샇瑜� 寃��됲빐 二쇱꽭��." value="">';
	html += '	                                        <button type="button" class="btn btn-s btn-type1" id="zoneCodeBtn">�고렪踰덊샇</button>';
	html += '	                                    </div>';
	html += '	                                    <div class="address-txt">';
	html += '	                                        <div id="inpEnterAddressDiv" >';
	html += '	                                        </div>';
	html += '	                                        	<input type="hidden" id="inpEnterAddress" name="inpEnterAddress">';
	html += '	                                    </div>';
	html += '	                                    <div class="address-detail">';
	html += '	                                        <input type="text" name="inpEnterAddressDetail" id="inpEnterAddressDetail" class="inp-line" placeholder="�곸꽭二쇱냼瑜� �낅젰�댁＜�몄슂(�꾩닔�ы빆).">';
	html += '	                                    </div>';
	html += '	                                     <div class="error-msg" id="inpEnterZonecodeErr">';
	html += '	                                        <p>�고렪踰덊샇瑜� �듯빐 二쇱냼瑜� �좏깮�� 二쇱꽭��.</p>';
	html += '	                                    </div>';
	html += '		                            </div>';
	html += '	                            </div>';

	html += '	                            <div class="inp-box entryCollect50 entryCollect">';
	html += '	                                <label for="inpEnterSns" class="lb-line">SNS 寃뚯떆臾� URL</label>';
	html += '		                            <div>';
	html += '		                                <div class="inquiry-con">';
	html += '		                                    <textarea id="inpEnterSns" name="inpEnterSns" class="inp-line pop-tArea" placeholder="寃뚯떆�� SNS URL�� �낅젰�� 二쇱꽭��." maxlength="500"></textarea>';
	html += '		                                    <span class="txt-count sns-count"><em class="strong">0</em> / 500��</span>';
	html += '		                                </div>';
	//html += '	                                    <p class="essential">* SNS �덈궡 臾멸뎄 �곸뿭</p>';
	html += '	                                    <div class="error-msg" id="inpEnterSnsErr">';
	html += '	                                       <p>SNS 寃뚯떆臾� URL�� �낅젰�� 二쇱꽭��.</p>';
	html += '	                                    </div>';
	html += '	                                    <div class="error-msg" id="inpEnterSnsErr2">';
	html += '	                                       <p>URL�� �뺥솗�섍쾶 �낅젰�� 二쇱꽭��.</p>';
	html += '	                                    </div>';
	html += '	                                </div>';
	html += '	                            </div>';

	html += '								<div class="inp-box entryCollect70 entryCollect">';
	html += '	                                <label for="inpEnterSchool" class="lb-line">�숆탳</label>';
	html += '		                            <div>';
	html += '	                                    <input type="text" id="inpEnterSchool" name="inpEnterSchool" class="inp-line" readonly="readonly">';
	html += '		                            </div>';
	html += '	                            </div>';

//	html += '	                            <p class="txt-general eventGbCd70">* �섎せ�� �뺣낫 �낅젰 �� �ы몴�� �쒗븳�� �덉쓣 �� �덉쑝硫�, 寃쏀뭹 �뱀꺼�� 痍⑥냼�⑸땲��.</p>';

	html += '	                            <div id="eventGbField"> ';
	html += '	                            </div>';

	html += '	                            <div id="addFieldArea"> ';
	html += '	                            </div>';
	html += '	                        </div>';
	html += '	                    </div>';


	html += '	                    <div class="user-info-box secure-pop-form terms-form">';
	html += '	                        <div class="secure-pop-tit bottom-line">';
	html += '	                            <span class="titleNo">03. </span>媛쒖씤�뺣낫 �섏쭛쨌�댁슜 �숈쓽 <span class="ico-required">*<span>�꾩닔�낅젰</span></span>';
	html += '	                        </div>';

	html += '	                        <div class="secure-pop terms-con">';
	html += '	                            <p class="txt-general">';
	html += '			                                洹��섍퍡�쒕뒗 蹂� �숈쓽 �덈궡 臾멸뎄瑜� �숈��섏뀲�쇰ŉ, �덈궡臾멸뎄�� ���� 嫄곗젅�섏떎 �� �덉뒿�덈떎.<br>';
	html += '			                                ��, 嫄곗젅�섏떊 寃쎌슦�먮뒗 �대깽�� �묐え媛� �쒗븳�섏떎 �� �덉뒿�덈떎.';
	html += '	                            </p>';
	html += '	                            <div class="chk-form allChk-box">';
	html += '	                                <input id="chk-enter-all" data-allchk-name="allCheck" data-children-name="checkEventEnter" type="checkbox" required="" title=""';
	html += '	                                    class="checkBoxTerms">';
	html += '	                                <label for="chk-enter-all" class="chk-all">紐⑤뱺 �쎄��� �뺤씤�섍퀬 �꾩껜 �숈쓽�⑸땲��.</label>';
	html += '	                            </div>';
	html += '	                            <div id="privacyPolicy"></div>';
	html += '	                        </div>';

	html += '	                        <div class="help-box">';
	html += '	                            <p>';
	html += '			                                媛쒖씤�뺣낫 泥섎━�� ���� �곸꽭�� �ы빆�� 媛ㅻ윮�� 罹좏띁�� �덊럹�댁�  (<a href="www.samsungebiz.com/event/galaxycampus" class="link" target="_blank">www.samsungebiz.com/event/galaxycampus</a>)�� 怨듦컻�� "�대깽�� 媛쒖씤�뺣낫 泥섎━諛⑹묠"�� 李몄“�섏떗�쒖삤.<br>';
	html += '			                                �ㅻ쭔, 蹂� �숈쓽�� �댁슜怨� �곸땐�섎뒗 遺�遺꾩� 蹂� �숈쓽�� �댁슜�� �곗꽑�⑸땲��.';
	html += '	                            </p>';
	html += '	                        </div>';
	html += '	                    </div>';
	html += '						<div class="user-info-box secure-pop-form terms-form  eventGbCd80">';
	html += '						    <div class="secure-pop-tit bottom-line">';
	html += '						        <span class="titleNo">04. </span>�좎껌 �뺣낫 �뺤씤';
	html += '						    </div>';
	html += '						    <p class="txt-general">諛⑸Ц �щ쭩�쇱옄�� 留ㅼ옣 �뺣낫瑜� �뺤씤 �� �좎껌�� �꾨즺�섏꽭��.</p>';
	html += '						    <div class="final-check-box">';
	html += '						        <p class="txt1 storeRsltMsg"><span class="txt-major selectedResultMsg"></span>�쇰줈<br><span class="selectedResultMsg2">留ㅼ옣諛⑸Ц�� �좎껌�⑸땲��.</span></p>';
	html += '						        <p class="txt2">�� �좎껌 �� 移댁뭅�� �뚮┝�≪쑝濡� &lt;��<span id="ftEvtNm"></span>�� 留ㅼ옣�곷떞�덉빟&gt;<br> 珥덈��μ씠 諛쒖넚�⑸땲��.</p>';
	html += '						        <p class="btn-area"><button type="button" class="btn btn-d btn-type2" id="reservationBtn">�좎껌�섍린</button></p>';
	html += '						    </div>';
	html += '						</div>';
	html += '	                </fieldset>';
	html += '	            </form>';
	html += '	            <div class="btn-box " id="eventBtn_Area_div">';
	html += '		            <button type="button" class="btn btn-d btn-type2" id="eventSaveBtn">�대깽�� �묐え</button>';
	html += '		        </div>';
	html += '	        </div>';
	html += '	    </div>';
	html += '	    <button type="button" class="pop-close evt-pop-close" data-focus-next="popupExhibitionEnter">�앹뾽�リ린</button>';
	html += '	</div>	';
	html += '</form>';

	return html;

}
/********************** 由щ돱�� �대깽�몄슜 �앹뾽 HTML End **********************/



/********************** �명뙥 �꾩슜 紐⑤뱢 **********************/

var certificationFlag = false;

function fnCallPop3(evtNo, paramPhoneTpCd){
	if (!certificationFlag) {
		pblcEvtNo = evtNo;
		phoneTpCd = paramPhoneTpCd;
	}

	returnUrl = window.location.pathname;

	var searchPath = window.location.search;

	if(searchPath.indexOf("eventNo") != -1) {
		returnUrl += searchPath;
	} else {
		if (searchPath.indexOf("?") != -1){
			if(returnUrl.indexOf("event/eventContentDetailView") != -1) {
				returnUrl += searchPath + "&eventNo="+pblcEvtNo;
			} else {
				returnUrl += searchPath;
			}
		} else {
//			returnUrl += "?eventNo="+pblcEvtNo;
		}
	}

	stPath = ($("#openPop").data("st-path"));

	var param;
	param = {eventNo : pblcEvtNo , isPreView : isPreView };


	var options2 = {
			url : "/sec/xhr/member/getSession",
			type: "POST",
			done : function(data){
				var options = {
						url : stPath+"xhr/event/getEventBaseInfo"
						, data : param
						, done: function (data2) {
							$("#mask").remove();
							var eventInfo = data2.eventInfo;

							if(eventInfo.errMsg == "" || eventInfo.errMsg == null){
								if (!certificationFlag) {
									fnNicePopup(data2);
								} else {
									setEventPop2(data2);
								}
							}else{
								if(eventInfo.errCd == "LGN0005"){
									makeAlert(eventInfo.errMsg, fnGoLoginPage2);
								}else{
									makeAlert(eventInfo.errMsg, eventPopClose);
								}
							}
						}
					};

				var session = JSON.parse(data);

				if (session.mbrNo == 0) { // 濡쒓렇�몄씠 �섏뼱 �덉� �딆쓣��
					options = $.extend({}, options, {netFunnelId : 'b2c_gnb_login'});

				} else { // 濡쒓렇�몄씠 �섏뼱�덉쓣��
					if (!certificationFlag) {
						options = $.extend({}, options, {netFunnelId : 'b2c_promotion2'});
					}
				}

				ajax.call(options);
			}
	}

	ajax.call(options2);


}

//�대��곗떎紐낆씤利� popup
function fnNicePopup(data) {
	stPath = ($("#openPop").data("st-path"));

	$unpackAuthDiv = $(drawUnpackAuthDivHtmlCode(data));

	$("#popupArea_Event3791").html("");

	if($("#popupArea_Event3791").length > 0) {
		$("#popupArea_Event3791").append($unpackAuthDiv);
		var checkPlus = data.checkPlus;

		$("form[name='form_chk']").children("input[name='EncodeData']").val(checkPlus.encData);

	}

	var agent = navigator.userAgent.toLowerCase();
	if ( ( (navigator.appName === 'Netscape' && agent.indexOf('trident') !== -1) || (agent.indexOf("msie") !== -1))){
		newWindowAndSubmit({
			url : stPath + 'popupCheckPlus/',
			nice : true
			, stContextPath : stPath
		})
	} else {
		window.open(
						'',
						'popupChk',
						'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
		document.form_chk.action = "https://evt.niceid.co.kr/CheckPlusSafeModel/checkplus.cb";
		document.form_chk.target = "popupChk";
		document.form_chk.submit();
	}
}
// KCB�몄쬆�� 肄쒕갚�⑥닔紐낆씠 寃뱀튂誘�濡� 二쇱꽍泥섎━(2022-02-23, kdp59.sec)
// �ㅻ챸�몄쬆 �� callback
//function cbCertificationInfo(data) {
//	if(data.rtnCode){
//		param = { ciToken : data.colInfo, phoneTpCd: phoneTpCd };
//
//		ciToken = data.colInfo;
//		stPath = ($("#openPop").data("st-path"));
//
//		var options = {
//			url : stPath+"xhr/event/getUnpackNiceAuthCnt"
//			, data : param
//			, done: function (data) {
//
//				if (data.niceAuthCnt > 0) { // �대� �섏씠�ㅼ젙蹂대줈 �깅줉�� �섏뼱 �덉쑝硫�,
//					certificationFlag = false;
//					makeAlert("�대� �묐え�섏��듬땲��.");
//
//				} else {
//					certificationFlag = true;
//
//					makeAlert("蹂몄씤 �몄쬆�� �꾨즺 �섏뿀�듬땲��.", fnCallPop3Chain);
//				}
//
//			}
//		};
//
//		ajax.call(options);
//
//	} else{
//		certificationFlag = false;
//	}
//}

function fnCallPop3Chain() {
	fnCallPop3(pblcEvtNo, phoneTpCd);
}

/* Nice�몄쬆 */
function drawUnpackAuthDivHtmlCode(data){
	var html="";
	html += '<form name="form_chk" method="post" action="/checkplus_main.jsp">';
	html += '	<input type="hidden" name="m" value="checkplusService">';
	html += '	<input type="hidden" name="EncodeData" value="">';
	html += '</form>';

	return html;
}

/* �대깽�� �묐え �앹뾽 �붾㈃ �뗮똿 */
function setEventPop2(data){
	fnDrawPop2();

	$("#phoneTpCd").val(phoneTpCd);
	$("#ciToken").val(ciToken);

	$("#exhibition").click(); // �앹뾽�쒖떆

	eventInfo = data.eventInfo;
	entryEvent = eventInfo.entryEvent;
	collectItems = eventInfo.eventCollectItems; // �섏쭛��ぉ
//	goodsSerialInfos = eventInfo.goodsSerialInfos; // �쒗뭹紐⑸줉
	plcyContentCollect = eventInfo.plcyContentCollect; // 媛쒖씤 �뺣낫 泥섎━ �섏쭛 �댁슜 �숈쓽
	plcyContentPrcs = eventInfo.plcyContentPrcs; // 媛쒖씤 �뺣낫 泥섎━ �낅Т �꾪긽 �숈쓽
	eventPrivacyPolicys = eventInfo.eventPrivacyPolicys; // 媛쒖씤 �뺣낫 諛⑹묠 由ъ뒪�� or 留덉��� �섏떊 �숈쓽
//	addFields = eventInfo.addFields; // 異붽��꾨뱶
//	questionInfos = eventInfo.questionInfos; // �ㅻЦ臾명빆
//	plazas = eventInfo.plazas;
//	siDoList = eventInfo.siDoList;
//	siGunGuList = eventInfo.siGunGuList;
	eventAddYn = entryEvent.eventAddYn;

	$("#entryEventNo").val(entryEvent.eventNo); // �쒕쾭�꾩넚�� �대깽�� 踰덊샇
	$("#evtGbCd").val(entryEvent.eventGbCd); // �쒕쾭�꾩넚�� �대깽�� 援щ텇
	$("#prtcpPsbGbCd").val(entryEvent.prtcpPsbGbCd); // 李몄뿬媛��κ뎄遺꾩퐫��
	$("#prtcpPsbCnt").val(entryEvent.prtcpPsbCnt); // 李몄뿬媛��μ닔
	$("#evtNm").text(entryEvent.ttl);
	$("#cpNo").val(entryEvent.cpNo); // 荑좏룿踰덊샇 �뗮똿
	$("#ftEvtNm").text(entryEvent.ttl); // 荑좏룿踰덊샇 �뗮똿
//	$("#eventAddYn").val(entryEvent.eventAddYn); // �뱀젙�대깽�� �뱀꽌踰�, �꾩뭅留덉씠 �낅줈�� �щ�

	sessionMbr = eventInfo.loginUserMbrNo;
	membershipNo = eventInfo.loginUserMembership;

	// �대깽�� �묐え 援щ텇 (媛쒖씤�뺣낫 �섏쭛, �ㅻЦ, �ы몴, �쒕━�쇰쾲�몄껜�� ��)
	eventGbCd = entryEvent.eventGbCd;

	setLayoutShowHide(eventGbCd);
	setCommLayout(entryEvent, collectItems, addFields);

	if(eventGbCd == "40"){
		$(".goodsSelect").hide();
		$("#goodsUl").empty();

		// �뚮┝�� �ъ슜 �щ�
		$("#biztalkUseYn").val(entryEvent.biztalkUseYn);

		// �뚮┝�� �쒗뵆由�
		$("#biztalkTmplTxt").val(entryEvent.biztalkTmplTxt);
	}

	// 媛쒖씤 �뺣낫 �숈쓽 愿��� =====================================================================
	var policyHtml="";
	$("#privacyPolicy").empty();

	// 媛쒖씤 �뺣낫 泥섎━ �섏쭛 �댁슜 �숈쓽
	policyHtml += createPrivacyPolicyHtml(plcyContentCollect, 1);
	// 媛쒖씤 �뺣낫 泥섎━ �낅Т �꾪긽 �숈쓽
	if (plcyContentPrcs != null) {
		policyHtml += createPrivacyPolicyHtml(plcyContentPrcs, 2);
	}
	// 媛쒖씤�뺣낫�섏쭛�좏삎 : 留덉��낆닔�좊룞�� 諛� 洹몄쇅
	$.each(eventPrivacyPolicys, function(idx, val){
		var index = idx +3;
		policyHtml += createPrivacyPolicyHtml(val, index);
	});
	$("#privacyPolicy").append(policyHtml);

	$(".error-msg").hide();

    if (eventAddYn == 'N') { // default 臾멸뎄
    	$("#inpCounselMembershipErr").html("<p>�섏쓽 �뺣낫�먯꽌 硫ㅻ쾭�� �뚯썝 異붽��뺣낫 �낅젰 ��</p><p>�뚮┝�좎껌�섎㈃ 硫ㅻ쾭�� 踰덊샇媛� 蹂댁뿬吏묐땲��.</p>");
    } else if (eventAddYn == 'Y') { // �⑥떊�� �대깽�몄씪�� 臾멸뎄 蹂�寃�
    	$("#inpCounselMembershipErr").html("<p>�삳ħ踰꾩떗踰덊샇媛� 蹂댁씠吏� �딆쑝�쒕굹��?</p><p>�붾㈃ �곗륫 �곷떒 > �섏쓽�뺣낫 硫붾돱�먯꽌</p><p>硫ㅻ쾭�� 媛��낆뿬遺� �뺤씤 �� �ㅼ떆 �쒕룄�� 蹂댁꽭��.</p><p>(誘멸��� �� 媛��� �� �ъ떆�� �꾩슂)</p>");
    }

	if(membershipNo == "" || membershipNo == null ){
		$("#inpCounselMembershipErr").show();
	}

}


/* 濡쒓렇�� �섏씠吏� �대룞 */
function fnGoLoginPage2(){
	window.location.href = stPath+"member/indexLogin/?returnUrl="+returnUrl;
	$(".evt-pop-close").trigger("click");
}

function fnDrawPop2(){
	// �앹뾽 html Code
	if($("#popupArea_Event3791").length > 0){
		$("#popupArea_Event3791").append($popDiv2);
	}else{
		$("#popupArea").append($popDiv2);
	}

	$(".titleNo").show();
}

/*
	�앹뾽�곸뿭 html tag
*/
function drawPopHtmlCode2(){
	var html="";
	html += '<form id="eventEntryPopFrm">';

	html += '	<input type="hidden" id="jsonStr" name="jsonStr" value=""/>';
	html += '	<input type="hidden" id="entryEventNo" name="eventNo" value=""/>';
	html += '	<input type="hidden" id="evtGbCd" name="evtGbCd" value=""/>';
	html += '	<input type="hidden" id="prtcpPsbGbCd" name="prtcpPsbGbCd" value=""/>';
	html += '	<input type="hidden" id="prtcpPsbCnt" name="prtcpPsbCnt" value=""/>';
	html += '	<input type="hidden" id="cpNo" name="cpNo" value=""/>';
	html += '	<input type="hidden" id="eventNm" name="eventNm" value=""/>';
	html += '	<input type="hidden" id="microSiteUrl" name="microSiteUrl" value=""/>';
	html += '	<input type="hidden" id="biztalkTmplTxt" name="biztalkTmplTxt" value=""/>'; // �뚮┝�� �쒗뵆由� 踰덊샇
	html += '	<input type="hidden" id="biztalkUseYn" name="biztalkUseYn" value=""/>'; // �뚮┝�� �ъ슜 �щ�
	html += '	<input type="hidden" id="mktRcvSelYn" name="mktRcvSelYn" value=""/>'; // 愿묎퀬�� �뺣낫 �섏떊 �꾩껜 �숈쓽 �щ�

	html += '	<input type="hidden" id="eventAddYn" name="eventAddYn" value=""/>';
	html += '	<input type="hidden" id="ciToken" name="ciToken" value=""/>';
	html += '	<input type="hidden" id="phoneTpCd" name="phoneTpCd" value=""/>';

	html += '	<div class="layer-pop layer-normal layer-event-exhibition" id="popupExhibitionEnter" tabindex="0" data-popup-layer="popupExhibitionEnter" data-focus="popupExhibitionEnter">';
	html += '       <button type="button" id="exhibition" data-popup-target="popupExhibitionEnter" style="display: none;"></button>';
	html += '	    <div class="layer-header" id="evtHeader">';
	html += '	        <h2>�묐え �섍린</h2>';
	html += '	    </div>';
	html += '	    <div class="layer-content">';
	html += '	        <div class="frm-login ">';
	html += '	            <form action="">';
	html += '	                <fieldset class="secureInp">';
	html += '	                    <legend>�묐え �낅젰 ��</legend>';
	html += '						 <div class="event-img">';
	html += '	                        <img src="" alt="" id="evtImg">';
	html += '	                    </div>';

	html += '	                    <div class="user-info-box secure-pop-form user-form">';
	html += '	                        <div class="secure-pop-tit bottom-line"><span class="titleNo">01. </span><span id="popTitle">�묐え�� �뺣낫</span></div>';
	html += '	                        <div class="secure-pop form-write">';
	html += '	                            <div class="inp-box entryCollect10 entryCollect">';
	html += '	                                <label for="inpEnterName" class="lb-line">�대쫫</label>';
	html += '		                            <div>';
	html += '		                                <input type="text" id="inpEnterName" name="inpEnterName" class="inp-line" value="" readonly="readonly">';
	html += '		                                <div class="error-msg" id="inpEnterNameErr">';
	html += '	                                    	<p>�대쫫�� �낅젰�� 二쇱꽭��.</p>';
	html += '	                                    </div>';
	html += '		                            </div>';
	html += '	                            </div>';

	html += '	                            <div class="inp-box entryCollect20 entryCollect">';
	html += '	                                <label for="inpEnterCall" class="lb-line">�곕씫泥�</label>';
	html += '		                            <div>';
	html += '	                                    <input type="text" id="inpEnterCall" name="inpEnterCall" class="inp-line" placeholder="(-) �놁씠 �レ옄留� �낅젰�� 二쇱꽭��." numberOnly maxlength="11">';
	html += '	                                    <div class="error-msg" id="inpEnterCallErr">';
	html += '	                                    	<p>�곕씫泥섎� �낅젰�� 二쇱꽭��.</p>';
	html += '	                                    </div>';
	html += '	                                    <div class="error-msg"  id="inpEnterCallErr2">';
	html += '	                                    	<p>�곕씫泥섍� �щ컮瑜댁� �딆뒿�덈떎.</p>';
	html += '	                                    </div>';
	html += '		                            </div>';
	html += '	                            </div>';

	html += '								<div class="inp-box entryCollect60 entryCollect">';
	html += '								    <label for="inpCounselMembership" class="lb-line line-double">�쇱꽦�꾩옄 <br>硫ㅻ쾭�� 踰덊샇</label>';
	html += '								    <div>';
	html += '								        <input type="text" id="inpCounselMembership" class="inp-line" value="" readonly="readonly">';
	html += '	                                    <div class="error-msg" id="inpCounselMembershipErr">';
	//html += '	                                    	<p>�섏쓽 �뺣낫�먯꽌 硫ㅻ쾭�� �뚯썝 異붽��뺣낫 �낅젰 ��</p><p>�뚮┝�좎껌�섎㈃ 硫ㅻ쾭�� 踰덊샇媛� 蹂댁뿬吏묐땲��.</p>';
	html += '	                                    </div>';
	html += '								    </div>';
	html += '								</div>';

	html += '								<div class="inp-box entryCollect70 entryCollect">';
	html += '	                                <label for="inpEnterSchool" class="lb-line">�숆탳</label>';
	html += '		                            <div>';
	html += '	                                    <input type="text" id="inpEnterSchool" name="inpEnterSchool" class="inp-line" readonly="readonly">';
	html += '		                            </div>';
	html += '	                            </div>';

	html += '	                            <div class="inp-box entryCollect30 entryCollect">';
	html += '	                                <label for="inpEnterEmail" class="lb-line">�대찓��</label>';
	html += '		                            <div>';
	html += '	                                    <input type="text" id="inpEnterEmail" name="inpEnterEmail" class="inp-line" placeholder="�대찓�쇱쓣 �낅젰�� 二쇱꽭��.">';
	html += '	                                    <div class="error-msg" id="inpEnterEmailErr">';
	html += '	                                        <p>�대찓�쇱쓣 �낅젰�� 二쇱꽭��. </p>';
	html += '	                                    </div>';
	html += '	                                    <div class="error-msg" id="inpEnterEmailErr2">';
	html += '	                                        <p>�대찓�쇱쓣 �뺥솗�� �낅젰�� 二쇱꽭��. </p>';
	html += '	                                    </div>';
	html += '		                            </div>';
	html += '	                            </div>';

	html += '	                        </div>';
	html += '	                    </div>';

	html += '	                    <div class="user-info-box secure-pop-form terms-form">';
	html += '	                        <div class="secure-pop-tit bottom-line">';
	html += '	                            <span class="titleNo">03. </span>媛쒖씤�뺣낫 �섏쭛쨌�댁슜 �숈쓽 <span class="ico-required">*<span>�꾩닔�낅젰</span></span>';
	html += '	                        </div>';

	html += '	                        <div class="secure-pop terms-con">';
	html += '	                            <p class="txt-general">';
	html += '			                                洹��섍퍡�쒕뒗 蹂� �숈쓽 �덈궡 臾멸뎄瑜� �숈��섏뀲�쇰ŉ, �덈궡臾멸뎄�� ���� 嫄곗젅�섏떎 �� �덉뒿�덈떎.<br>';
	html += '			                                ��, 嫄곗젅�섏떊 寃쎌슦�먮뒗 �대깽�� �묐え媛� �쒗븳�섏떎 �� �덉뒿�덈떎.';
	html += '	                            </p>';
	html += '	                            <div class="chk-form allChk-box">';
	html += '	                                <input id="chk-enter-all" data-allchk-name="allCheck" data-children-name="checkEventEnter" type="checkbox" required="" title=""';
	html += '	                                    class="checkBoxTerms">';
	html += '	                                <label for="chk-enter-all" class="chk-all">紐⑤뱺 �쎄��� �뺤씤�섍퀬 �꾩껜 �숈쓽�⑸땲��.</label>';
	html += '	                            </div>';
	html += '	                            <div id="privacyPolicy"></div>';
	html += '	                        </div>';

	html += '	                        <div class="help-box">';
	html += '	                            <p>';
	html += '			                                媛쒖씤�뺣낫 泥섎━�� ���� �곸꽭�� �ы빆�� �쇱꽦�꾩옄 �뱀궗�댄듃  (<a href="http://www.samsung.com/sec" class="link" target="_blank">www.samsung.com/sec</a>)�� 怨듦컻�� "�쇱꽦�룹뺨 �대깽�� 媛쒖씤�뺣낫 泥섎━諛⑹묠"�� 李몄“�섏떗�쒖삤.<br>';
	html += '			                                �ㅻ쭔, 蹂� �숈쓽�� �댁슜怨� �곸땐�섎뒗 遺�遺꾩� 蹂� �숈쓽�� �댁슜�� �곗꽑�⑸땲��.';
	html += '	                            </p>';
	html += '	                        </div>';
	html += '	                    </div>';
	html += '	                </fieldset>';
	html += '	            </form>';
	html += '	            <div class="btn-box " id="eventBtn_Area_div2">';
	html += '		            <button type="button" class="btn btn-d btn-type2" id="eventSaveBtn2">�대깽�� �묐え</button>';
	html += '		        </div>';
	html += '	        </div>';
	html += '	    </div>';
	html += '	    <button type="button" class="pop-close evt-pop-close" data-focus-next="popupExhibitionEnter">�앹뾽�リ린</button>';
	html += '	</div>	';
	html += '</form>';

	return html;

}

//�대깽�� �묐え
$(document).on('click', "#eventSaveBtn2", function(){
	fnSaveEventEntry2();
});

/*
	�대깽�� �묐え ����
*/
function fnSaveEventEntry2(){

	//createJsonStr();

	$("#focusTarget").val("");

	if(fnValidationCheck2()){
		if ( $("#inpEnterSns").val() ) {
			var snsUrl =  $("#inpEnterSns").val();
			snsUrl = snsUrl.trim().replace(/^(http|https):\/\//, "");

			$("#inpEnterSns").val(snsUrl);
		}

		$("#addFieldArea").children(".inp-box").each(function(){
			var $addFieldId = $(this).find("[id^='addField']");

			var fldtpcd = $addFieldId.data("fldtpcd");

			if (fldtpcd === 10 || fldtpcd === 20 || fldtpcd === 90) { //�쒖쨪 �낅젰(10) �먮뒗 �щ윭以꾩엯��(20) �쇰븣
				var fldVal =  $addFieldId.val();
				fldVal = fldVal.trim().replace(/^(http|https):\/\//, "");

				$addFieldId.val(fldVal);
			}

		});

		createJsonStr();



		var options = {
				url: stPath+"xhr/event/insertEventEntry",
				data: $("#eventEntryPopFrm").serialize(),
				done: function (data) {
					var result = data.result;
					makeAlert(result.resultMsg, eventPopClose);

					certificationFlag = false;
					//if(result.resultCd == "success"){
	//					console.log("�묐え���� : ",result.resultCd);
						// 臾댁뒯 �댁쑀�몄��� �쇰툝 臾몄쓽 �꾩슂
						// 踰꾪듉�� display: none �� �ㅼ뼱媛��� 踰꾪듉�� �덈낫��
						// 留ㅼ옣�덉빟 �곷떞 �대깽�� �� 寃쎌슦�먮쭔
						// �꾩떆濡� style�� 吏��곌퀬 �덉쓬
						/*if(entryEvent.eventGbCd == "80"){
							$(".btn-box").removeAttr("style");
						}*/
					//}

				}
			};

		$(".btn-box").removeAttr("style");
		if(isPreView) return;

		oneTimeChk = false;

		ajax.call(options);
	}
	// validation result
	else{
		var id = $("#focusTarget").val();
		var type = $("#focusTargetType").val();

		if(type == ""){
			setTimeout(function(){
				$("#"+id).focus();
			}, 1);
		}else{
			$("input[name="+id+"]").focus();
		}
		return;
	}

}

/*
 * [�좏슚�� 泥댄겕]
 */
function fnValidationCheck2(){

	var passyn = "Y";

	$(".error-msg").hide();
	if(membershipNo == "" || membershipNo == null ){
		$("#inpCounselMembershipErr").show();
	}

	const collectItem = {
		                  "10" : {/*�대쫫*/ id : "inpEnterName", errId1 : "inpEnterNameErr", errId2 : "inpEnterNameErr", callback : null},
						  "20" : {/*�곕씫泥�*/ id : "inpEnterCall", errId1 : "inpEnterCallErr", errId2 : "inpEnterCallErr2", callback : fnMobileCheck},
						  "30" : {/*�대찓��*/ id : "inpEnterEmail", errId1 : "inpEnterEmailErr", errId2 : "inpEnterEmailErr2", callback : fnEmailCheck},
						};

	// �섏쭛��ぉ null 泥댄겕
	$.each(collectItems, function(idx, val){

		// 硫ㅻ쾭��� 泥댄겕�섏� �딅뒗��.
//		if(val.collectItemCd != "60"){
			var collectItemId = collectItem[val.collectItemCd].id;
			var collectItemErrId = collectItem[val.collectItemCd].errId1;
			var collectItemVal = $("#"+collectItemId).val();

			if(collectItemVal == ""){
				$("#"+collectItemErrId).show();
				passyn = "N";
				fnFocusIdSet(collectItemId); // focus�� �꾩씠�� �뺣낫
			}
//		}
	});

	// �좏슚�� 泥댄겕 寃곌낵
	let validationSubResult;
	const chkArr = ["20", "30"]; // �곕씫泥�, �대찓��, url �좏슚�� 泥댄겕

	$.each(chkArr, function(i, val){
		validationSubResult = fnValidationSub(collectItem[val]);
		if(!validationSubResult){
			passyn = "N";
			fnFocusIdSet(collectItem[val].id);
		}
	})

	// �앹꽦�� 異붽��꾨뱶�� ���� �좏슚�� 泥댄겕
//	passyn = fnValidationAddFieldsChk(passyn);

	// 媛쒖씤�뺣낫 �섏쭛�� �쇰븣
	if(eventGbCd == "40"){
		$("#eventNm").val(entryEvent.ttl);
	}

	// 媛쒖씤�뺣낫�섏쭛愿���
	passyn = fnValidationPrivacyPolicy(passyn);

	return passyn == "Y" ? true : false;
}


//濡쒓렇�� 泥댄겕
//function fnLoginCheck() {
//	stPath = ($("#openPop").data("st-path"));
//
//	var options = {
//			url : stPath+"xhr/member/getSession",
//			type: "POST",
//			done : function(data){
//				var session = JSON.parse(data);
//
//				if (session.mbrNo == 0) {
//					makeAlert("濡쒓렇�몄씠 �꾩슂�⑸땲��.", fnLoginPage);
//
//				}
//			}
//	}
//
//	ajax.call(options);
//}

//function fnLoginPage() {
//	stPath = ($("#openPop").data("st-path"));
//
//	var returnUrl = document.referrer;
//
//	location.href= stPath + 'member/indexLogin/?returnUrl='+returnUrl;
//}

/*
	�뱀꺼�� �뺤씤 湲곌컙 �뺤씤
*/
function fnCheckWinConstraints(evtNo, paramGoodsId){

	returnUrl = window.location.pathname;

	var searchPath = window.location.search;

	returnUrl += searchPath;

	stPath = ($("#openPop").data("st-path"));

	unpackGoodsId = paramGoodsId;

	let param = {
			eventNo : evtNo
	};

	let options = {
		url : stPath+"xhr/event/checkWinConstraints"
		, data : param
		, done: function (data) {
			$("#mask").remove();

			var result = data.result;

			if (result.errCd == "LGN0005") {
				makeAlert(result.errMsg, fnGoLoginPage);

			} else if (result.errCd == "EVTWIN0005") { //�뱀꺼�섏뿀�꾨븣
				var paramAlert = [];
				paramAlert.content = result.errMsg;
				paramAlert.btnText = "援щℓ�섎윭 媛�湲�";
				paramAlert.goodsId = paramGoodsId;
				makeAlert2(paramAlert, fnEventNowBuyChain);

			} else {
				makeAlert(result.errMsg, eventPopClose);
			}

		}
	};
//	options = $.extend({}, options, {netFunnelId : 'b2c_promotion2'});

	ajax.call(options);

}

function fnEventNowBuyChain () {

	fnEventNowBuy(unpackGoodsId);
}

function fnEventNowBuy (unpackGoodsId) {
	$eventCartForm = drawEventCartHtmlCode();

	$("#popupArea_Event3791").html("");

	if($("#popupArea_Event3791").length > 0) {
		$("#popupArea_Event3791").append($eventCartForm);
	}

	//G000181490, G000181479, G000181471
	$("form[name='eventGoodsCartForm'] > input[name='goodsIds']").val(unpackGoodsId);
	eventGoodsDetail.fnCartNowBuy(eventGoodsDetail.fnReqData());
}

/*
	�댄똻�곸뿭 html tag
*/
function drawEventCartHtmlCode(){
	var html="";
	html += '	<form id="eventGoodsCartForm" name="eventGoodsCartForm" method="post">';
	html += '    <input type="hidden" name="goodsIds" value="" />';                      //�곹뭹踰덊샇
	html += '    <input type="hidden" name="stGbCd" value="10" />';                        //�ъ씠�멸뎄遺꾩퐫��
	html += '    <input type="hidden" name="stId" value="1" />';                          //�ъ씠�� �꾩씠��
	html += '    <input type="hidden" name="nowBuyYn" value="Y" />';                     //諛붾줈援щℓ �щ�
	html += '    <input type="hidden" name="buyQtys" class="count-prd" value="1" />';    //援щℓ�섎웾
	html += '    <input type="hidden" name="orderType" value="ONCE" />';    //二쇰Ц�좏삎
	html += '</form>';
	return html;
}

/* 怨듯넻 �덉씠�� �뚮읉 �앹뾽 */
function makeAlert2(contentsParam, calback){

	//TB�묐え�뺤씠踰ㅽ듃 �꾩슜 援щℓ�대젰泥댄겕
	if(!checkEvtPersonalBuyLimit(contentsParam.goodsId)){
		return false;
	}

	var contentsparam = contentsParam;
	let alertData = {
               content : contentsparam.content
               ,btnText : contentsparam.btnText
               ,callback : calback
               };

	commonAlert(alertData);
	openLayer('commonAlert');
}

/* TB�묐え�� �대깽�� 援щℓ�섎웾 chk(TB�묐え�� �대깽�� �꾩슜)
 * Author : Gyeongjae.id(二쇰Ц)
 * */
function checkEvtPersonalBuyLimit(goodsId){

	let rtnVal = true;

	let options = {
		url : stPath+"xhr/order/check/checkEvtPersonalBuyLimit"
		, async : false
		, data : {goodsId : goodsId}
		, done: function (data) {
			console.log(typeof data);
			if(data){
				rtnVal = data;
			}else{
				rtnVal = data;
				commonAlert({title: "alert" ,content : "�대� 援щℓ�섏떊 �곹뭹�낅땲��."});
				openLayer('commonAlert');
			}
		}
	};
	ajax.call(options);

	return rtnVal;
}

/********************** 肄붿꽭�� (肄붾━�� �몄씪 �섏뒪��) start**********************/
/* �앹뾽 �몄텧 */
function fnCallPop4(evtNo){
	oneTimeChk = false;

	pblcEvtNo = evtNo;
	returnUrl = window.location.pathname;

	var searchPath = window.location.search;

	if(searchPath.indexOf("eventNo") != -1) {
		returnUrl += searchPath;
	} else {
		if (searchPath.indexOf("?") != -1){
			if(returnUrl.indexOf("event/eventContentDetailView") != -1) {
				returnUrl += searchPath + "&eventNo="+pblcEvtNo;
			} else {
				returnUrl += searchPath;
			}
		} else {
			returnUrl += "?eventNo="+pblcEvtNo;
		}
	}

	stPath = ($("#openPop").data("st-path"));

	var param;
	param = {eventNo : pblcEvtNo , isPreView : isPreView };

	var options = {
		url : stPath+"xhr/event/getEventBaseInfo"
		, data : param
		, done: function (data) {
			$("#mask").remove();

			var eventInfo = data.eventInfo;

			/* 移댁뭅�� 留듭쓣 �ъ슜�섍린 �꾪븳 湲곗큹 �뺣낫 */
			kakaoAppKeyEvent = data.kakaoAppKey;
			siDo10 = data.siDo10;
			siGunGu123 = data.siGunGu123;

			if(eventInfo.errMsg == "" || eventInfo.errMsg == null){
				if(eventInfo.entryCnt > 0){
					setEventPop5(data);
				}else{
					setEventPop4(data);
				}
			}else{
				if(eventInfo.errCd == "LGN0005"){
					makeAlert(eventInfo.errMsg, fnGoLoginPage);
				}else{
					makeAlert(eventInfo.errMsg, eventPopClose);
				}
			}
			/*if(eventInfo.plazas){
				$("#eventBtn_Area_div").css("display","none");
			}else{
				$("#eventBtn_Area_div").css("display","");
			}*/

/*			var session = JSON.parse(data);

			if (session.mbrNo == 0) { // 濡쒓렇�몄씠 �섏뼱 �덉� �딆쓣��
				options = $.extend({}, options, {netFunnelId : 'b2c_gnb_login'});

			} else { // 濡쒓렇�몄씠 �섏뼱�덉쓣��
				if (!certificationFlag) {
					options = $.extend({}, options, {netFunnelId : 'b2c_promotion2'});
				}
			}*/

		}
	};
	ajax.call(options);
}

/* �대깽�� �묐え �앹뾽 �붾㈃ �뗮똿 */
function setEventPop4(data){

	fnDrawPop4();
	$("#exhibition").click(); // �앹뾽�쒖떆

	eventInfo = data.eventInfo;
	entryEvent = eventInfo.entryEvent;
	collectItems = eventInfo.eventCollectItems; // �섏쭛��ぉ
	goodsSerialInfos = eventInfo.goodsSerialInfos; // �쒗뭹紐⑸줉
	plcyContentCollect = eventInfo.plcyContentCollect; // 媛쒖씤 �뺣낫 泥섎━ �섏쭛 �댁슜 �숈쓽
	plcyContentPrcs = eventInfo.plcyContentPrcs; // 媛쒖씤 �뺣낫 泥섎━ �낅Т �꾪긽 �숈쓽
	eventPrivacyPolicys = eventInfo.eventPrivacyPolicys; // 媛쒖씤 �뺣낫 諛⑹묠 由ъ뒪�� or 留덉��� �섏떊 �숈쓽
	addFields = eventInfo.addFields; // 異붽��꾨뱶
	questionInfos = eventInfo.questionInfos; // �ㅻЦ臾명빆
	plazas = eventInfo.plazas;
	siDoList = eventInfo.siDoList;
	siGunGuList = eventInfo.siGunGuList;
	eventAddType = entryEvent.eventAddYn; //�대깽�명���
	entryCnt = eventInfo.entryCnt;  //�묐え嫄댁닔
	eventAddYn = entryEvent.eventAddYn;

	$("#entryEventNo").val(entryEvent.eventNo); // �쒕쾭�꾩넚�� �대깽�� 踰덊샇
	$("#evtGbCd").val(entryEvent.eventGbCd); // �쒕쾭�꾩넚�� �대깽�� 援щ텇
	$("#prtcpPsbGbCd").val(entryEvent.prtcpPsbGbCd); // 李몄뿬媛��κ뎄遺꾩퐫��
	$("#prtcpPsbCnt").val(entryEvent.prtcpPsbCnt); // 李몄뿬媛��μ닔
	$("#evtNm").text(entryEvent.ttl);
	$("#cpNo").val(entryEvent.cpNo); // 荑좏룿踰덊샇 �뗮똿
	$("#ftEvtNm").text(entryEvent.ttl); // 荑좏룿踰덊샇 �뗮똿
//	$("#eventAddYn").val(entryEvent.eventAddYn); // �뱀젙�대깽�� �뱀꽌踰�, �꾩뭅留덉씠 �낅줈�� �щ�

	$("#popTitle4").text(entryEvent.popEntryTtl);
	$("#eventSaveBtn4").text(entryEvent.popEntryCtaText);
	$("#popEntrySuccMsg4").val(entryEvent.popEntrySuccMsg);

	if(eventAddYn == "B2C_KSF_KAKAO_SEND"){
		$("#imageForm").empty().append(drawPopHtmlCode4_1());
	}else if(eventAddYn == "B2C_KAKAO_SEND"){
		$("#imageForm").empty().append(drawPopHtmlCode4_2());
	}

	sessionMbr = eventInfo.loginUserMbrNo;
	membershipNo = eventInfo.loginUserMembership;

	// �대깽�� �묐え 援щ텇 (媛쒖씤�뺣낫 �섏쭛, �ㅻЦ, �ы몴, �쒕━�쇰쾲�몄껜�� ��)
	eventGbCd = entryEvent.eventGbCd;

	setLayoutShowHide(eventGbCd);
	setCommLayout(entryEvent, collectItems, addFields);

	if(eventGbCd == "40"){
		$(".goodsSelect").hide();
		$("#goodsUl").empty();

		// �뚮┝�� �ъ슜 �щ�
		$("#biztalkUseYn").val(entryEvent.biztalkUseYn);

		// �쒗쑕荑좏룿 �ъ슜 �щ�
		$("#prtnrCpUseYn").val(entryEvent.prtnrCpUseYn);

		// �뚮┝�� �쒗뵆由�
		$("#biztalkTmplTxt").val(entryEvent.biztalkTmplTxt);
	}

	// �쒗뭹�좏깮 : 紐⑸줉 泥섎━ (�쒕━�쇳삎�� 寃쎌슦�먮쭔 泥섎━) =====================================================
	if(eventGbCd == "50"){
		$(".goodsSelect").hide();
		$("#goodsUl").empty();

		var html="";
		$.each(goodsSerialInfos, function(idx, val){
			var index = idx +1;
			html += "<li class=\"item\">";
			html += "	<input id=\"chk-goods-"+index+"\" type=\"radio\" name=\"chk-goods\" value=\""+val.goodsId+"\" onchange='goodsCheck(this)' data-mdlcode='"+val.mdlCode+"' data-goods-nm='"+val.goodsNm+"'>";
			html += "	<label for=\"chk-goods-"+index+"\">"+val.mdlCode+"</label>";
			html += "</li>";
		});
		$("#goodsUl").append(html);
		$(".goodsSelect").show();

		$("#inpEnterSerialNum").attr("readonly", true);
	}


	// 吏덈Ц �뗮똿 ==========================================================================
	if(eventGbCd == "60"){
		// �쒗쑕荑좏룿 �ъ슜 �щ�
		$("#prtnrCpUseYn").val(entryEvent.prtnrCpUseYn);

		createQuestionHtml(questionInfos);
	}

	// 留ㅼ옣�곷떞 �덉빟 ����
	if(eventGbCd == "80"){
		fnScriptLoad();

		// �뚮┝�� �쒗뵆由�
		$("#biztalkTmplTxt").val(entryEvent.biztalkTmplTxt);
	}

	// 媛쒖씤 �뺣낫 �숈쓽 愿��� =====================================================================
	var policyHtml="";
	$("#privacyPolicy").empty();

	// 媛쒖씤 �뺣낫 泥섎━ �섏쭛 �댁슜 �숈쓽
	policyHtml += createPrivacyPolicyHtml(plcyContentCollect, 1);
	// 媛쒖씤 �뺣낫 泥섎━ �낅Т �꾪긽 �숈쓽
	if (plcyContentPrcs != null) {
		policyHtml += createPrivacyPolicyHtml(plcyContentPrcs, 2);
	}
	// 媛쒖씤�뺣낫�섏쭛�좏삎 : 留덉��낆닔�좊룞�� 諛� 洹몄쇅
	$.each(eventPrivacyPolicys, function(idx, val){
		var index = idx +3;
		policyHtml += createPrivacyPolicyHtml(val, index);
	});
	$("#privacyPolicy").append(policyHtml);

	$(".error-msg").hide();

    if (eventAddYn == 'N') { // default 臾멸뎄
    	$("#inpCounselMembershipErr").html("<p>�섏쓽 �뺣낫�먯꽌 硫ㅻ쾭�� �뚯썝 異붽��뺣낫 �낅젰 ��</p><p>�뚮┝�좎껌�섎㈃ 硫ㅻ쾭�� 踰덊샇媛� 蹂댁뿬吏묐땲��.</p>");
    } else if (eventAddYn == 'Y') { // �⑥떊�� �대깽�몄씪�� 臾멸뎄 蹂�寃�
    	$("#inpCounselMembershipErr").html("<p>�삳ħ踰꾩떗踰덊샇媛� 蹂댁씠吏� �딆쑝�쒕굹��?</p><p>�붾㈃ �곗륫 �곷떒 > �섏쓽�뺣낫 硫붾돱�먯꽌</p><p>硫ㅻ쾭�� 媛��낆뿬遺� �뺤씤 �� �ㅼ떆 �쒕룄�� 蹂댁꽭��.</p><p>(誘멸��� �� 媛��� �� �ъ떆�� �꾩슂)</p>");
    }

	if(membershipNo == "" || membershipNo == null ){
		$("#inpCounselMembershipErr").show();
	}

}

function fnDrawPop4(){
	$("#popupArea_Event3791").html("");
	$("#tooltipArea_Event3791").html("");
	// �앹뾽 html Code
	if($("#popupArea_Event3791").length > 0){
		$("#popupArea_Event3791").append($popDiv4);
	}else{
		$("#popupArea").append($popDiv4);
	}

	// �댄똻 html Code
	if($("#tooltipArea_Event3791").length > 0){
		$("#tooltipArea_Event3791").append($tooltipDiv);
	}else{
		$("#tooltipArea").append($tooltipDiv);
	}


	$(".titleNo").show();
}

/*
�앹뾽�곸뿭 html tag
*/
function drawPopHtmlCode4(){
var html="";
html += '<form id="eventEntryPopFrm">';

html += '	<input type="hidden" id="serialNumChk" value="N"/>';
html += '	<input type="hidden" id="serialNum" name="serialNum" value=""/>';
html += '	<input type="hidden" id="mdlCode" name="mdlCode" value=""/>';
html += '	<input type="hidden" id="focusTarget" value=""/>';
html += '	<input type="hidden" id="focusTargetType" value=""/>';
html += '	<input type="hidden" id="jsonStr" name="jsonStr" value=""/>';
html += '	<input type="hidden" id="entryEventNo" name="eventNo" value=""/>';
html += '	<input type="hidden" id="evtGbCd" name="evtGbCd" value=""/>';
html += '	<input type="hidden" id="prtcpPsbGbCd" name="prtcpPsbGbCd" value=""/>';
html += '	<input type="hidden" id="prtcpPsbCnt" name="prtcpPsbCnt" value=""/>';
html += '	<input type="hidden" id="visPlazaNo" name="visPlazaNo" value=""/>';
html += '	<input type="hidden" id="visShopNo" name="visShopNo" value=""/>';
html += '	<input type="hidden" id="visPlazaNm" name="visPlazaNm" value=""/>';
html += '	<input type="hidden" id="visHopeDt" name="visHopeDt" value=""/>';
html += '	<input type="hidden" id="visPlazaTel" name="visPlazaTel" value=""/>';
html += '	<input type="hidden" id="visPlazaAddr" name="visPlazaAddr" value=""/>';
html += '	<input type="hidden" id="cpNo" name="cpNo" value=""/>';
html += '	<input type="hidden" id="eventNm" name="eventNm" value=""/>';
html += '	<input type="hidden" id="microSiteUrl" name="microSiteUrl" value=""/>';
html += '	<input type="hidden" id="biztalkTmplTxt" name="biztalkTmplTxt" value=""/>'; // �뚮┝�� �쒗뵆由� 踰덊샇
html += '	<input type="hidden" id="biztalkUseYn" name="biztalkUseYn" value=""/>'; // �뚮┝�� �ъ슜 �щ�
html += '	<input type="hidden" id="prtnrCpUseYn" name="prtnrCpUseYn" value=""/>'; // �쒗쑕荑좏룿 �ъ슜 �щ�
html += '	<input type="hidden" id="mktRcvSelYn" name="mktRcvSelYn" value=""/>'; // 愿묎퀬�� �뺣낫 �섏떊 �꾩껜 �숈쓽 �щ�

html += '	<input type="hidden" id="weekdayCloseTime" name="weekdayCloseTime" value=""/>'; // �됱씪 留덇컧�쒓컙
html += '	<input type="hidden" id="weekdayOpenTime" name="weekdayOpenTime" value=""/>'; // �됱씪 �ㅽ뵂 �쒓컙
html += '	<input type="hidden" id="weekendCloseTime" name="weekendCloseTime" value=""/>'; // 二쇰쭚 留덇컧 �쒓컙
html += '	<input type="hidden" id="weekendOpenTime" name="weekendOpenTime" value=""/>'; // 二쇰쭚 �ㅽ뵂 �쒓컙
html += '	<input type="hidden" id="eventAddYn" name="eventAddYn" value=""/>'; // 二쇰쭚 �ㅽ뵂 �쒓컙
html += '	<input type="hidden" id="popEntrySuccMsg4" name="popEntrySuccMsg4" value=""/>';

html += '	<div class="layer-pop layer-normal layer-event-exhibition" id="popupExhibitionEnter" tabindex="0" data-popup-layer="popupExhibitionEnter" data-focus="popupExhibitionEnter">';
html += '       <button type="button" id="exhibition" data-popup-target="popupExhibitionEnter" style="display: none;"></button>';
html += '	    <div class="layer-header" id="evtHeader">';
html += '	        <h2>�묐え �섍린</h2>';
html += '	    </div>';
html += '	    <div class="layer-content">';
html += '	        <div class="frm-login ">';
html += '	            <form action="">';
html += '	                <fieldset class="secureInp">';
html += '	                    <legend>�묐え �낅젰 ��</legend>';
html += '						 <div class="event-img">';
html += '	                        <img src="" alt="" id="evtImg">';
html += '	                    </div>';

html += '	                    <div class="vote-txt-box eventGbCd70">';
html += '	                        <p><strong><span id="evtNm"></span></strong> �ы몴�� 李몄뿬�댁＜�붿꽌 媛먯궗�⑸땲��.</p>';
html += '	                        <p>�ы몴 �대깽�� 異붿꺼�� �꾪빐 �꾨옒 �뺣낫瑜� �묒꽦�댁＜�몄슂.</p>';
html += '	                        <p class="txt-major">* �ы몴�섍린�� 1�뚮쭔 媛��ν빀�덈떎.</p>';
html += '	                    </div>';

html += '	                    <div class="user-info-box secure-pop-form user-form">';
html += '	                        <div class="secure-pop-tit bottom-line"><span class="titleNo">01. </span><span id="popTitle">�묐え�� �뺣낫</span></div>';
html += '	                        <div class="secure-pop form-write">';
html += '	                            <div class="inp-box entryCollect10 entryCollect">';
html += '	                                <label for="inpEnterName" class="lb-line">�대쫫</label>';
html += '		                            <div>';
html += '		                                <input type="text" id="inpEnterName" name="inpEnterName" class="inp-line" value="" readonly="readonly">';
html += '		                                <div class="error-msg" id="inpEnterNameErr">';
html += '	                                    	<p>�대쫫�� �낅젰�� 二쇱꽭��.</p>';
html += '	                                    </div>';
html += '		                            </div>';
html += '	                            </div>';

html += '	                            <div class="inp-box entryCollect20 entryCollect">';
html += '	                                <label for="inpEnterCall" class="lb-line">�곕씫泥�</label>';
html += '		                            <div>';
html += '	                                    <input type="text" id="inpEnterCall" name="inpEnterCall" class="inp-line" placeholder="(-) �놁씠 �レ옄留� �낅젰�� 二쇱꽭��." numberOnly maxlength="11">';
html += '	                                    <div class="error-msg" id="inpEnterCallErr">';
html += '	                                    	<p>�곕씫泥섎� �낅젰�� 二쇱꽭��.</p>';
html += '	                                    </div>';
html += '	                                    <div class="error-msg"  id="inpEnterCallErr2">';
html += '	                                    	<p>�곕씫泥섍� �щ컮瑜댁� �딆뒿�덈떎.</p>';
html += '	                                    </div>';
html += '		                            </div>';
html += '	                            </div>';

html += '								<div class="inp-box entryCollect60 entryCollect">';
html += '								    <label for="inpCounselMembership" class="lb-line line-double">�쇱꽦�꾩옄 <br>硫ㅻ쾭�� 踰덊샇</label>';
html += '								    <div>';
html += '								        <input type="text" id="inpCounselMembership" class="inp-line" value="" readonly="readonly">';
html += '	                                    <div class="error-msg" id="inpCounselMembershipErr">';
//html += '	                                    	<p>�섏쓽 �뺣낫�먯꽌 硫ㅻ쾭�� �뚯썝 異붽��뺣낫 �낅젰 ��</p><p>�뚮┝�좎껌�섎㈃ 硫ㅻ쾭�� 踰덊샇媛� 蹂댁뿬吏묐땲��.</p>';
html += '	                                    </div>';
html += '								    </div>';
html += '								</div>';

html += '	                            <div class="inp-box entryCollect30 entryCollect">';
html += '	                                <label for="inpEnterEmail" class="lb-line">�대찓��</label>';
html += '		                            <div>';
html += '	                                    <input type="text" id="inpEnterEmail" name="inpEnterEmail" class="inp-line" placeholder="�대찓�쇱쓣 �낅젰�� 二쇱꽭��.">';
html += '	                                    <div class="error-msg" id="inpEnterEmailErr">';
html += '	                                        <p>�대찓�쇱쓣 �낅젰�� 二쇱꽭��. </p>';
html += '	                                    </div>';
html += '	                                    <div class="error-msg" id="inpEnterEmailErr2">';
html += '	                                        <p>�대찓�쇱쓣 �뺥솗�� �낅젰�� 二쇱꽭��. </p>';
html += '	                                    </div>';
html += '		                            </div>';
html += '	                            </div>';

html += '	                            <div class="inp-box entryCollect40 entryCollect">';
html += '	                                <label for="inpEnterZonecode" class="lb-line">二쇱냼</label>';
html += '		                            <div class="address-box">';
html += '		                                <div class="address-search">';
html += '	                                        <input type="text" id="inpEnterZonecode" name="inpEnterZonecode"readonly="readonly" class="inp-line" title="�고렪踰덊샇" placeholder="�고렪踰덊샇瑜� 寃��됲빐 二쇱꽭��." value="">';
html += '	                                        <button type="button" class="btn btn-s btn-type1" id="zoneCodeBtn">�고렪踰덊샇</button>';
html += '	                                    </div>';
html += '	                                    <div class="address-txt">';
html += '	                                        <div id="inpEnterAddressDiv" >';
html += '	                                        </div>';
html += '	                                        	<input type="hidden" id="inpEnterAddress" name="inpEnterAddress">';
html += '	                                    </div>';
html += '	                                    <div class="address-detail">';
html += '	                                        <input type="text" name="inpEnterAddressDetail" id="inpEnterAddressDetail" class="inp-line" placeholder="�곸꽭二쇱냼瑜� �낅젰�� 二쇱꽭��.">';
html += '	                                    </div>';
html += '	                                     <div class="error-msg" id="inpEnterZonecodeErr">';
html += '	                                        <p>�고렪踰덊샇瑜� �듯빐 二쇱냼瑜� �좏깮�� 二쇱꽭��.</p>';
html += '	                                    </div>';
html += '		                            </div>';
html += '	                            </div>';

html += '	                            <div class="inp-box entryCollect50 entryCollect">';
html += '	                                <label for="inpEnterSns" class="lb-line">SNS 寃뚯떆臾� URL</label>';
html += '		                            <div>';
html += '		                                <div class="inquiry-con">';
html += '		                                    <textarea id="inpEnterSns" name="inpEnterSns" class="inp-line pop-tArea" placeholder="寃뚯떆�� SNS URL�� �낅젰�� 二쇱꽭��." maxlength="500"></textarea>';
html += '		                                    <span class="txt-count sns-count"><em class="strong">0</em> / 500��</span>';
html += '		                                </div>';
//html += '	                                    <p class="essential">* SNS �덈궡 臾멸뎄 �곸뿭</p>';
html += '	                                    <div class="error-msg" id="inpEnterSnsErr">';
html += '	                                       <p>SNS 寃뚯떆臾� URL�� �낅젰�� 二쇱꽭��.</p>';
html += '	                                    </div>';
html += '	                                    <div class="error-msg" id="inpEnterSnsErr2">';
html += '	                                       <p>URL�� �뺥솗�섍쾶 �낅젰�� 二쇱꽭��.</p>';
html += '	                                    </div>';
html += '	                                </div>';
html += '	                            </div>';

html += '								<div class="inp-box entryCollect70 entryCollect">';
html += '	                                <label for="inpEnterSchool" class="lb-line">�숆탳</label>';
html += '		                            <div>';
html += '	                                    <input type="text" id="inpEnterSchool" name="inpEnterSchool" class="inp-line" readonly="readonly">';
html += '		                            </div>';
html += '	                            </div>';

html += '	                            <p class="txt-general eventGbCd70">* �섎せ�� �뺣낫 �낅젰 �� �ы몴�� �쒗븳�� �덉쓣 �� �덉쑝硫�, 寃쏀뭹 �뱀꺼�� 痍⑥냼�⑸땲��.</p>';

html += '	                            <div id="addFieldArea"> ';

html += '	                            </div>';

html += '	                            <div class="inp-box goodsSelect eventGbCd50">';
html += '	                                <label for="chk-goods-1" class="lb-line lb-top">�쒗뭹 �좏깮</label>';
html += '		                            <div>';
html += '	                                    <ul class="chk-list-box chk-form mo-col1" id="goodsUl"></ul>';

html += '	                                     <div class="error-msg" id="chk-goods-err">';
html += '	                                        <p>�쒗뭹�� �좏깮�� 二쇱꽭��.</p>';
html += '	                                    </div>';
html += '		                            </div>';
html += '	                            </div>';

html += '	                            <div class="inp-box goodsSelect eventGbCd50">';
html += '	                                <p class="label-box">';
html += '	                                    <label for="inpEnterSerialNum" class="lb-line">�쒗뭹 �쒕━�� <br>�섎쾭</label>';
html += '	                                    <i class="btn-tooltop02" data-tooltip="serialno-usetip"><span>�댄똻蹂닿린(�덉씠�댁뿴由�)</span></i>';
html += '	                                </p>';
html += '		                            <div>';
html += '		                                <div class="inquiry-con">';
html += '		                                    <textarea id="inpEnterSerialNum" name="inpEnterSerialNum" class="inp-line pop-tArea" placeholder="�쒗뭹 �쒕━�� �섎쾭 �뺤씤 �� �낅젰�� 二쇱꽭��." maxlength="500"></textarea>';
html += '		                                    <span class="txt-count serial-count"><em class="strong">0</em> / 500��</span>';
html += '	                                    </div>';
html += '	                                    <div class="serial-box">';
html += '	                                        <p class="essential">* �쒗뭹�� �쒕━�� �섎쾭瑜� �낅젰�섏떊 �� [�뺤씤�섍린] 踰꾪듉�� �뚮윭二쇱꽭��.</p>';
html += '	                                        <button type="button" class="btn btn-s btn-type1" id="chkSerialNoBtn">�뺤씤�섍린</button>';
html += '	                                    </div>';

html += '	                                     <div class="error-msg" id="inpEnterSerialNumErr">';
html += '	                                        <p>�쒕━�� �섎쾭瑜� �낅젰 �� �뺤씤�� 二쇱꽭��.</p>';
html += '	                                    </div>';
html += '		                            </div>';
html += '	                            </div>';
html += '	                        </div>';
html += '	                    </div>';

html += '	                    <div class="survey-box qstList eventGbCd60">';
html += '	                    </div>';

html += '						<div class="user-info-box secure-pop-form user-form eventGbCd80">';
html += '							<div class="secure-pop-tit bottom-line"><span class="titleNo">02. </span>留ㅼ옣�좏깮</div>';
html += '						    <p class="txt-general">留ㅼ옣 �곷떞 媛��ν븳 留ㅼ옣 諛� 留ㅼ옣�곷떞 �щ쭩�쇱쓣 �좏깮�섏꽭��.</p>';
html += '						    <div class="secure-pop">';
html += '						        <div class="inp-box">';
html += '						            <label for="inpCounselName" class="lb-line">��/�� �좏깮</label>';
html += '						            <div>';
html += '						                <div>';
html += '						                    <div class="select-box">';
html += '						                        <div id="dropAge" class="wrap-droplist">';
html += '						                            <button class="droplist-button selected" aria-haspopup="listbox" aria-labelledby="dropAreaBtn" id="dropAreaBtn">�쒖슱</button>';
html += '						                            <ul class="droplist" id="dropSiDo" tabindex="-1" role="listbox" aria-labelledby="dropAreaBtn" aria-activedescendant="dropArea1-1">';
html += '						                            </ul>';
html += '						                        </div>';
html += '						                    </div>';
html += '						                </div>';
html += '						            </div>';
html += '						        </div>';
html += '						        <div class="inp-box">';
html += '						            <label for="inpCounselCall" class="lb-line">��/援�/援� �좏깮</label>';
html += '						           <div>';
html += '						                <div class="select-box">';
html += '						                    <div id="dropAge" class="wrap-droplist">';
html += '						                        <button class="droplist-button selected" aria-haspopup="listbox" aria-labelledby="dropAreaBtn2" id="dropAreaBtn2">媛뺣궓援�</button>';
html += '						                        <ul class="droplist" id="dropSiGunGu" tabindex="-1" role="listbox" aria-labelledby="dropAreaBtn2" aria-activedescendant="dropArea2-1">';
html += '						                        </ul>';
html += '						                    </div>';
html += '						                </div>';
html += '						            </div>';
html += '						        </div>';

html += '						        <ul class="chk-form style-btn store-select-list">';
html += '						        </ul>';
html += '								<div class="error-msg" id="radio-store1Err" style="text-align: center;">';
html += '								    <p>留ㅼ옣�� �좏깮�섏꽭��</p>';
html += '								</div>';

html += '						        <div class="store-detail-info">';
html += '						            <div class="store-detail">';
html += '						                <p class="store-name"></p>';
html += '						                <dl>';
html += '						                    <dt>二쇱냼</dt>';
html += '						                    <dd id="storeAddr"></dd>';
html += '						                </dl>';
html += '						                <dl>';
html += '						                    <dt>�꾪솕踰덊샇</dt>';
html += '						                    <dd id="storeTel"></dd>';
html += '						                </dl>';
html += '						                <dl>';
html += '						                    <dt>�곸뾽�쒓컙</dt>';
html += '						                    <dd id="storeOpenTime"></dd>';
html += '						                </dl>';
html += '						                <dl>';
html += '						                    <dt>二쇱감怨듦컙</dt>';
html += '						                    <dd id="storeParkingInfo"></dd>';
html += '						                </dl>';
html += '						                <p class="btn-more-box"><a href="#" class="link" id="microSiteDetailView">�곸꽭蹂닿린 ></a></p>';
html += '						            </div>';
html += '						            <div class="store-detail-mapbox" id="map">';
html += '						                <!-- 留� �곸뿭 -->';
html += '						            </div>';
html += '						            <div class="hope-visit-date">';
html += '						                <p class="date-title">諛⑸Ц �щ쭩 �쇱옄 �좏깮</p>';
html += '						                <dl>';
html += '						                    <dt>�좎쭨�좏깮</dt>';
html += '						                    <dd>';
html += '						                        <input type="text" id="visitDate" name="visitDate" placeholder="諛⑸Ц �щ쭩 �쇱옄瑜� �좏깮�� 二쇱꽭��." class="inp-line inp-calendar">';
html += '						                        <p class="txt">* �쇱꽦�ㅽ넗�� 留ㅼ옣 留덇컧�쒓컙�� 20�� 30遺꾩엯�덈떎.</p>';
html += '						                    </dd>';
html += '						                </dl>';
html += '						            </div>';
html += '						        </div>';
html += '						    </div>';
html += '						</div>';

html += '	                    <div class="user-info-box secure-pop-form terms-form">';
html += '	                        <div class="secure-pop-tit bottom-line">';
html += '	                            <span class="titleNo">03. </span>媛쒖씤�뺣낫 �섏쭛쨌�댁슜 �숈쓽 <span class="ico-required">*<span>�꾩닔�낅젰</span></span>';
html += '	                        </div>';

html += '	                        <div class="secure-pop terms-con">';
html += '	                            <p class="txt-general">';
html += '			                                洹��섍퍡�쒕뒗 蹂� �숈쓽 �덈궡 臾멸뎄瑜� �숈��섏뀲�쇰ŉ, �덈궡臾멸뎄�� ���� 嫄곗젅�섏떎 �� �덉뒿�덈떎.<br>';
html += '			                                ��, 嫄곗젅�섏떊 寃쎌슦�먮뒗 �대깽�� �묐え媛� �쒗븳�섏떎 �� �덉뒿�덈떎.';
html += '	                            </p>';
html += '	                            <div class="chk-form allChk-box">';
html += '	                                <input id="chk-enter-all" data-allchk-name="allCheck" data-children-name="checkEventEnter" type="checkbox" required="" title=""';
html += '	                                    class="checkBoxTerms">';
html += '	                                <label for="chk-enter-all" class="chk-all">紐⑤뱺 �쎄��� �뺤씤�섍퀬 �꾩껜 �숈쓽�⑸땲��.</label>';
html += '	                            </div>';
html += '	                            <div id="privacyPolicy"></div>';
html += '	                        </div>';

html += '	                        <div class="help-box">';
html += '	                            <p>';
html += '			                                媛쒖씤�뺣낫 泥섎━�� ���� �곸꽭�� �ы빆�� �쇱꽦�꾩옄 �뱀궗�댄듃  (<a href="http://www.samsung.com/sec" class="link" target="_blank">www.samsung.com/sec</a>)�� 怨듦컻�� "�쇱꽦�룹뺨 �대깽�� 媛쒖씤�뺣낫 泥섎━諛⑹묠"�� 李몄“�섏떗�쒖삤.<br>';
html += '			                                �ㅻ쭔, 蹂� �숈쓽�� �댁슜怨� �곸땐�섎뒗 遺�遺꾩� 蹂� �숈쓽�� �댁슜�� �곗꽑�⑸땲��.';
html += '	                            </p>';
html += '	                        </div>';
html += '	                    </div>';
html += '						<div class="user-info-box secure-pop-form terms-form  eventGbCd80">';
html += '						    <div class="secure-pop-tit bottom-line">';
html += '						        <span class="titleNo">04. </span>�좎껌 �뺣낫 �뺤씤';
html += '						    </div>';
html += '						    <p class="txt-general">諛⑸Ц �щ쭩�쇱옄�� 留ㅼ옣 �뺣낫瑜� �뺤씤 �� �좎껌�� �꾨즺�섏꽭��.</p>';
html += '						    <div class="final-check-box">';
html += '						        <p class="txt1 storeRsltMsg"><span class="txt-major selectedResultMsg"></span>�쇰줈<br> 留ㅼ옣諛⑸Ц�� �좎껌�⑸땲��.</p>';
html += '						        <p class="txt2">�� �좎껌 �� 移댁뭅�� �뚮┝�≪쑝濡� &lt;��<span id="ftEvtNm"></span>�� 留ㅼ옣�곷떞�덉빟&gt;<br> 珥덈��μ씠 諛쒖넚�⑸땲��.</p>';
html += '						        <p class="btn-area"><button type="button" class="btn btn-d btn-type2" id="reservationBtn">�좎껌�섍린</button></p>';
html += '						    </div>';
html += '						</div>';
/****************************/
html += '    					<div id = "imageForm">';
html += '    					</div>';
/*****************************/
html += '	                </fieldset>';
html += '	            </form>';
html += '	            <div class="btn-box " id="eventBtn_Area_div">';
html += '		            <button type="button" class="btn btn-d btn-type2" id="eventSaveBtn4">移댁뭅�ㅽ넚 怨듭쑀�섍린</button>';
html += '		        </div>';
html += '	        </div>';
html += '	    </div>';
html += '	    <button type="button" class="pop-close evt-pop-close" data-focus-next="popupExhibitionEnter">�앹뾽�リ린</button>';
html += '	</div>	';
html += '</form>';

return html;

}

function drawPopHtmlCode4_1(){
var html="";
/****************************/
html += '    					<!-- s : CHEER CARD form -->';
html += '    					<div class="user-info-box secure-pop-form user-form">';
html += '    						<div class="secure-pop-tit bottom-line">�띾낫 �대�吏�</div>';
html += '    					</div>';
html += '    					<ul class="cheer-cards">';
html += '    						<li>';
html += '    							<div class="chk-form terms-more">';
html += '    								<input type="radio" id="chrCard_01" name="chrCard" checked>';
html += '    								<label for="chrCard_01">';
html += '    									�쇱꽭�� �대�吏�';
html += '    									<figure class="card-img">';
html += '    										<img src="https://images.samsung.com/kdp/event/festa_samsungsale/sec_promotion_img_02.jpg" alt="�쇱꽦�꾩옄 �몄씪 �섏뒪��留뚯쓽 轅��쒗깮�� �띾낫�섍퀬 鍮꾩뒪�ы겕 援우쫰瑜� 諛쏆븘蹂댁꽭��!">';
html += '    									</figure>';
html += '    								</label>';
html += '    							</div>';
html += '    						</li>';
html += '    					</ul>';

return html;

}

function drawPopHtmlCode4_2(){
var html="";
/****************************/
html += '    					<!-- s : CHEER CARD form -->';
html += '    					<div class="user-info-box secure-pop-form user-form">';
html += '    						<div class="secure-pop-tit bottom-line">媛�議� �щ옉 留덉쓬 移대뱶</div>';
html += '    					</div>';
html += '    					<ul class="cheer-cards">';
html += '    						<li>';
html += '    							<div class="chk-form terms-more">';
html += '    								<input type="radio" id="chrCard_01" name="chrCard" checked>';
html += '    								<label for="chrCard_01">';
html += '    									嫄닿컯�섏꽭��';
html += '    									<figure class="card-img">';
html += '    										<img src="https://images.samsung.com/kdp/event/familylove/sec_familylove_card_01.jpg" alt="怨곸뿉 怨꾩뀛二쇱뀛�� 媛먯궗�댁슂">';
html += '    									</figure>';
html += '    								</label>';
html += '    							</div>';
html += '    						</li>';
html += '    						<li>';
html += '    							<div class="chk-form terms-more">';
html += '    								<input type="radio" id="chrCard_02" name="chrCard">';
html += '    								<label for="chrCard_02">';
html += '    									�щ옉�댁슂-1';
html += '    									<figure class="card-img">';
html += '    										<img src="https://images.samsung.com/kdp/event/familylove/sec_familylove_card_02.jpg" alt="�뚯쨷�� �뱀떊, 留롮씠 �щ옉�댁슂">';
html += '    									</figure>';
html += '    								</label>';
html += '    							</div>';
html += '    						</li>';
html += '    						<li>';
html += '    							<div class="chk-form terms-more">';
html += '    								<input type="radio" id="chrCard_03" name="chrCard">';
html += '    								<label for="chrCard_03">';
html += '    									�됰났�섏꽭��';
html += '    									<figure class="card-img">';
html += '    										<img src="https://images.samsung.com/kdp/event/familylove/sec_familylove_card_03.jpg" alt="�욎쑝濡� 苑껉만留� 嫄몄뼱��">';
html += '    									</figure>';
html += '    								</label>';
html += '    							</div>';
html += '    						</li>';
html += '    						<li>';
html += '    							<div class="chk-form terms-more">';
html += '    								<input type="radio" id="chrCard_04" name="chrCard">';
html += '    								<label for="chrCard_04">';
html += '    									�щ옉�댁슂-2';
html += '    									<figure class="card-img">';
html += '    										<img src="https://images.samsung.com/kdp/event/familylove/sec_familylove_card_04.jpg" alt="�녹븘二쇱떆怨� �ㅼ썙二쇱뀛�� 媛먯궗�댁슂">';
html += '    									</figure>';
html += '    								</label>';
html += '    							</div>';
html += '    						</li>';
html += '    						<li>';
html += '    							<div class="chk-form terms-more">';
html += '    								<input type="radio" id="chrCard_05" name="chrCard">';
html += '    								<label for="chrCard_05">';
html += '    									�묒썝�댁슂';
html += '    									<figure class="card-img">';
html += '    										<img src="https://images.samsung.com/kdp/event/familylove/sec_familylove_card_05.jpg" alt="鍮쏅굹�� �뱀떊�� 轅덉쓣 �묒썝�댁슂">';
html += '    									</figure>';
html += '    								</label>';
html += '    							</div>';
html += '    						</li>';
html += '    						<li>';
html += '    							<div class="chk-form terms-more">';
html += '    								<input type="radio" id="chrCard_06" name="chrCard">';
html += '    								<label for="chrCard_06">';
html += '    									�섎궡�몄슂';
html += '    									<figure class="card-img">';
html += '    										<img src="https://images.samsung.com/kdp/event/familylove/sec_familylove_card_06.jpg" alt="紐⑤몢 �� �섎맆 嫄곗삁��">';
html += '    									</figure>';
html += '    								</label>';
html += '    							</div>';
html += '    						</li>';
html += '    					</ul>';

return html;

}

//�대깽�� �묐え
$(document).on('click', "#eventSaveBtn4", function(){
	//fnSaveEventEntry4();
	$("#focusTarget").val("");

	if(fnValidationCheck4()){
		if(fnValidationSelCard()){
			makeAlert("怨듭쑀瑜� �꾪빐 移댁뭅�ㅽ넚APP�� �ㅽ뻾�섎ŉ,<br>移댁뭅�ㅽ넚 APP�� �듯빐 諛섎뱶�� 怨듭쑀�섍린瑜� �꾨즺�댁빞 李몄뿬�⑸땲��.", fnSaveEventEntry4);
		}
	}
	// validation result
	else{
		var id = $("#focusTarget").val();
		var type = $("#focusTargetType").val();

		if(type == ""){
			setTimeout(function(){
				$("#"+id).focus();
			}, 1);
		}else{
			$("input[name="+id+"]").focus();
		}
		return;
	}
});

/*
�대깽�� �묐え ����
*/
function fnSaveEventEntry4(){

	if ( $("#inpEnterSns").val() ) {
		var snsUrl =  $("#inpEnterSns").val();
		snsUrl = snsUrl.trim().replace(/^(http|https):\/\//, "");

		$("#inpEnterSns").val(snsUrl);
	}

	$("#addFieldArea").children(".inp-box").each(function(){
		var $addFieldId = $(this).find("[id^='addField']");

		var fldtpcd = $addFieldId.data("fldtpcd");

		if (fldtpcd === 10 || fldtpcd === 20 || fldtpcd === 90) { //�쒖쨪 �낅젰(10) �먮뒗 �щ윭以꾩엯��(20) �쇰븣
			var fldVal =  $addFieldId.val();
			fldVal = fldVal.trim().replace(/^(http|https):\/\//, "");

			$addFieldId.val(fldVal);
		}

	});

	createJsonStr();

	var options = {
		url: stPath+"xhr/event/insertEventEntry",
		data: $("#eventEntryPopFrm").serialize(),
		done: function (data) {
			var result = data.result;

	    	if(result.resultCd == "success"){	//�묐え�깃났�� 移댄넚怨듭쑀�섍린李� �ㅽ뻾

	    		var eventUrl   = document.location.href;
	    		var eventTitle = "";
	    		var eventImagePath = "";
	    		var eventDesc  = "";
	    		var msg = $("#popEntrySuccMsg4").val();
	    		var eventNo = $("#entryEventNo").val();
                var mbrNo = sessionMbr;

	    		if(eventAddYn == "B2C_KSF_KAKAO_SEND"){
	    			eventTitle = "紐⑤몢媛� 湲곕떎�ㅼ삩 異뺤젣 �쇱꽭��";
	    			eventImagePath = "https://images.samsung.com/kdp/event/festa_samsungsale/sec_promotion_img_02.jpg";
	    			eventDesc  = "�쇱꽦�꾩옄 �몄씪 �섏뒪��留뚯쓽 轅��쒗깮�� �띾낫�섍퀬 鍮꾩뒪�ы겕 援우쫰瑜� 諛쏆븘蹂댁꽭��!";
	    			msg = "�대깽�� �묐え 諛� �띾낫 �대�吏� 蹂대궡湲곌� �꾨즺�섏뿀�듬땲��.<br>�대깽�명럹�댁��먯꽌 �뺤긽李몄뿬 �섏뿀�붿� �뺤씤�댁＜�몄슂.<br>(鍮꾩젙�� 醫낅즺, �섏��� 梨꾪똿諛� 怨듭쑀�� 諛섏쁺�섏� �딆뒿�덈떎)";
	    		}else if(eventAddYn == "B2C_KAKAO_SEND"){
	    			eventTitle = "�쇱꽦�꾩옄�� �④퍡�섎뒗 媛�議깆궗�� �좊Ъ����";
	    		    eventImagePath = $("[name='chrCard']:checked").parent().find('img').attr('src');
	    		    eventDesc  = "�μ뒪�ъ썙�� �섏� 紐삵뻽�� 留�, 媛�議� �щ옉 留덉쓬 移대뱶 �대깽�몄� �④퍡 �좊Ъ���꾩쓣 利먭꺼蹂댁꽭��!";
	    		    msg = "�대깽�� �묐え 諛� 留덉쓬 移대뱶 蹂대궡湲곌� �꾨즺�섏뿀�듬땲��.<br>�대깽�명럹�댁��먯꽌 �뺤긽李몄뿬 �섏뿀�붿� �뺤씤�댁＜�몄슂.<br>(鍮꾩젙�� 醫낅즺, �섏��� 梨꾪똿諛� 怨듭쑀�� 諛섏쁺�섏� �딆뒿�덈떎)";
	    		}
	    	    snsShare.kakaoTalkCallback(eventUrl, eventTitle, eventImagePath, eventDesc, eventNo, mbrNo);
	    	    makeAlert(msg, eventPopClose);
	    	}else{
	    		makeAlert(result.resultMsg, eventPopClose);
			}
		}
	};

	$(".btn-box").removeAttr("style");
	if(isPreView) return;

	oneTimeChk = false;

	ajax.call(options);

}

/*
 * [�좏슚�� 泥댄겕]
 */
function fnValidationCheck4(){

	var passyn = "Y";

	$(".error-msg").hide();
	if(membershipNo == "" || membershipNo == null ){
		$("#inpCounselMembershipErr").show();
	}

	const collectItem = {
		                  "10" : {/*�대쫫*/ id : "inpEnterName", errId1 : "inpEnterNameErr", errId2 : "inpEnterNameErr", callback : null},
						  "20" : {/*�곕씫泥�*/ id : "inpEnterCall", errId1 : "inpEnterCallErr", errId2 : "inpEnterCallErr2", callback : fnMobileCheck},
						  "30" : {/*�대찓��*/ id : "inpEnterEmail", errId1 : "inpEnterEmailErr", errId2 : "inpEnterEmailErr2", callback : fnEmailCheck},
						  "40" : {/*二쇱냼*/ id : "inpEnterZonecode", errId1 : "inpEnterZonecodeErr", errId2 : "inpEnterZonecodeErr", callback : null},
						  "50" : {/*SNS寃뚯떆臾�*/ id : "inpEnterSns", errId1 : "inpEnterSnsErr", errId2 : "inpEnterSnsErr2", callback : fnUrlCheck},
						  "60" : {/*硫ㅻ쾭��쾲��*/ id : "inpCounselMembership", errId1 : "inpCounselMembershipErr", errId2 : "inpCounselMembershipErr", callback : null}
						};

	// �섏쭛��ぉ null 泥댄겕
	$.each(collectItems, function(idx, val){

		// 硫ㅻ쾭��� 泥댄겕�섏� �딅뒗��.
//		if(val.collectItemCd != "60"){
			var collectItemId = collectItem[val.collectItemCd].id;
			var collectItemErrId = collectItem[val.collectItemCd].errId1;
			var collectItemVal = $("#"+collectItemId).val();

			if(collectItemVal == ""){
				$("#"+collectItemErrId).show();
				passyn = "N";
				fnFocusIdSet(collectItemId); // focus�� �꾩씠�� �뺣낫
			}
//		}
	});

	// �좏슚�� 泥댄겕 寃곌낵
	let validationSubResult;
	const chkArr = ["20", "30"]; // �곕씫泥�, �대찓�� �좏슚�� 泥댄겕

	$.each(chkArr, function(i, val){
		validationSubResult = fnValidationSub(collectItem[val]);
		if(!validationSubResult){
			passyn = "N";
			fnFocusIdSet(collectItem[val].id);
		}
	})

	// �앹꽦�� 異붽��꾨뱶�� ���� �좏슚�� 泥댄겕
	passyn = fnValidationAddFieldsChk(passyn);

	// 媛쒖씤�뺣낫 �섏쭛�� �쇰븣
	if(eventGbCd == "40"){
		$("#eventNm").val(entryEvent.ttl);
	}

	// 媛쒖씤�뺣낫�섏쭛愿���
	passyn = fnValidationPrivacyPolicy(passyn);

	return passyn == "Y" ? true : false;
}

/* �대깽�� �묐え �앹뾽 �붾㈃ �뗮똿 */
function setEventPop5(data){
	fnDrawPop5();
	$("#exhibition").click(); // �앹뾽�쒖떆

	eventInfo = data.eventInfo;
	entryEvent = eventInfo.entryEvent;
	$("#entryEventNo").val(entryEvent.eventNo); // �쒕쾭�꾩넚�� �대깽�� 踰덊샇
	sessionMbr = eventInfo.loginUserMbrNo;
	eventAddYn = entryEvent.eventAddYn;

	if(eventAddYn == "B2C_KSF_KAKAO_SEND"){
		$("#imageForm").empty().append(drawPopHtmlCode5_1());
	}else if(eventAddYn == "B2C_KAKAO_SEND"){
		$("#imageForm").empty().append(drawPopHtmlCode5_2());
	}

	$("#eventSaveBtn5").text(entryEvent.popEntryCtaText);
	$("#popEntrySuccMsg5").val(entryEvent.popEntrySuccMsg);

	// 1. �곷떒 �대�吏� 紐⑤컮�� / pc 泥댄겕
	var imgUrl="";
	var filter = "win16|win32|win64|mac|macintel";
	if ( navigator.platform ) {
		if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
			imgUrl = "//"+entryEvent.moImgPath;
		} else {
			imgUrl = "//"+entryEvent.pcImgPath;
		}
	}
	$("#evtImg").attr("src", imgUrl);

}

function fnDrawPop5(){
	$("#popupArea_Event3791").html("");
	$("#tooltipArea_Event3791").html("");
	// �앹뾽 html Code
	if($("#popupArea_Event3791").length > 0){
		$("#popupArea_Event3791").append($popDiv5);
	}else{
		$("#popupArea").append($popDiv5);
	}

	// �댄똻 html Code
	if($("#tooltipArea_Event3791").length > 0){
		$("#tooltipArea_Event3791").append($tooltipDiv);
	}else{
		$("#tooltipArea").append($tooltipDiv);
	}

	$(".titleNo").show();
}


function drawPopHtmlCode5(){
	var html="";
	html += '<!-- s : 21-10-22 KOREA Sale FESTA - �묒썝移대뱶 移댄넚怨듭쑀 -->';
	html += '<input type="hidden" id="focusTargetType" value=""/>';
	html += '<input type="hidden" id="entryEventNo" name="eventNo" value=""/>';
	html += '<input type="hidden" id="popEntrySuccMsg5" name="popEntrySuccMsg5" value=""/>';
	html += '<div class="layer-pop layer-normal layer-event-exhibition" id="popupExhibitionEnter" tabindex="0" data-popup-layer="popupExhibitionEnter" data-focus="popupExhibitionEnter">';
	html += '   <button type="button" id="exhibition" data-popup-target="popupExhibitionEnter" style="display: none;"></button>';
/****************************/
	html += '   <div id = "imageForm">';
	html += '   </div>';
/****************************/
	html += '	<button type="button" class="pop-close evt-pop-close" data-focus-next="popupExhibitionEnter">�앹뾽�リ린</button>';
	html += '</div>';
	html += '<!-- e : 21-10-22 KOREA Sale FESTA - �묒썝移대뱶 移댄넚怨듭쑀 -->';
	return html;
}

function drawPopHtmlCode5_1(){
	var html="";
	html += '		<div class="layer-header text-hide">';
	html += '			<h2>�띾낫 �대�吏� - 移댁뭅�ㅽ넚 怨듭쑀�섍린</h2>';
	html += '		</div>';
	html += '		<div class="layer-content">';
	html += '			<div class="">';
	html += '				<form action="">';
	html += '					<fieldset class="secureInp">';
	html += '						<legend>SAMSUNG Sale FESTA</legend>';

	html += '						<div class="event-img">';
	html += '    						<img src="" alt="�쇱꽦�꾩옄 �몄씪 �섏뒪��留뚯쓽 轅��쒗깮�� �띾낫�섍퀬 鍮꾩뒪�ы겕 援우쫰瑜� 諛쏆븘蹂댁꽭��!" id="evtImg">';
	html += '						</div>';

	html += '						<!-- s : CHEER CARD form -->';
	html += '						<div class="user-info-box secure-pop-form user-form">';
	html += '							<div class="secure-pop-tit bottom-line">�띾낫 �대�吏�</div>';
	html += '						</div>';
	html += '						<ul class="cheer-cards">';
	html += '							<li>';
	html += '								<div class="chk-form terms-more">';
	html += '									<input type="radio" id="chrCard_01" name="chrCard" checked>';
	html += '									<label for="chrCard_01">';
	html += '										�쇱꽭�� �대�吏�';
	html += '										<figure class="card-img">';
	html += '											<img src="https://images.samsung.com/kdp/event/festa_samsungsale/sec_promotion_img_02.jpg" alt="�쇱꽦�꾩옄 �몄씪 �섏뒪��留뚯쓽 轅��쒗깮�� �띾낫�섍퀬 鍮꾩뒪�ы겕 援우쫰瑜� 諛쏆븘蹂댁꽭��!">';
	html += '										</figure>';
	html += '									</label>';
	html += '								</div>';
	html += '							</li>';
	html += '						</ul>';
	html += '						<!-- e : CHEER CARD form -->';
	html += '					</fieldset>';

	html += '				</form>';
	html += '				<div class="btn-box">';
	html += '					<button type="button" class="btn btn-d btn-type2" id="eventSaveBtn5">移댁뭅�ㅽ넚 怨듭쑀�섍린</button>';
	html += '				</div>';
	html += '			</div>';

	html += '		</div>';

	return html;
}

function drawPopHtmlCode5_2(){
	var html="";
	html += '		<div class="layer-header text-hide">';
	html += '			<h2>�묒썝移대뱶 - 移댁뭅�ㅽ넚 怨듭쑀�섍린</h2>';
	html += '		</div>';
	html += '		<div class="layer-content">';
	html += '			<div class="">';
	html += '				<form action="">';
	html += '					<fieldset class="secureInp">';
	html += '						<legend>BESPOKE GRANDE AI</legend>';

	html += '						<div class="event-img">';
	html += '    						<img src="" alt="�쇱꽦�꾩옄 �몄씪 �섏뒪��留뚯쓽 轅��쒗깮�� �띾낫�섍퀬 湲고봽�곗퐯 諛쏆븘蹂댁꽭��!" id="evtImg">';
	html += '						</div>';

	html += '						<!-- s : CHEER CARD form -->';
	html += '						<div class="user-info-box secure-pop-form user-form">';
	html += '							<div class="secure-pop-tit bottom-line">媛�議� �щ옉 留덉쓬 移대뱶</div>';
	html += '						</div>';
	html += '    					<ul class="cheer-cards">';
	html += '    						<li>';
	html += '    							<div class="chk-form terms-more">';
	html += '    								<input type="radio" id="chrCard_01" name="chrCard" checked>';
	html += '    								<label for="chrCard_01">';
	html += '    									嫄닿컯�섏꽭��';
	html += '    									<figure class="card-img">';
	html += '    										<img src="https://images.samsung.com/kdp/event/familylove/sec_familylove_card_01.jpg" alt="怨곸뿉 怨꾩뀛二쇱뀛�� 媛먯궗�댁슂">';
	html += '    									</figure>';
	html += '    								</label>';
	html += '    							</div>';
	html += '    						</li>';
	html += '    						<li>';
	html += '    							<div class="chk-form terms-more">';
	html += '    								<input type="radio" id="chrCard_02" name="chrCard">';
	html += '    								<label for="chrCard_02">';
	html += '    									�щ옉�댁슂-1';
	html += '    									<figure class="card-img">';
	html += '    										<img src="https://images.samsung.com/kdp/event/familylove/sec_familylove_card_02.jpg" alt="�뚯쨷�� �뱀떊, 留롮씠 �щ옉�댁슂">';
	html += '    									</figure>';
	html += '    								</label>';
	html += '    							</div>';
	html += '    						</li>';
	html += '    						<li>';
	html += '    							<div class="chk-form terms-more">';
	html += '    								<input type="radio" id="chrCard_03" name="chrCard">';
	html += '    								<label for="chrCard_03">';
	html += '    									�됰났�섏꽭��';
	html += '    									<figure class="card-img">';
	html += '    										<img src="https://images.samsung.com/kdp/event/familylove/sec_familylove_card_03.jpg" alt="�욎쑝濡� 苑껉만留� 嫄몄뼱��">';
	html += '    									</figure>';
	html += '    								</label>';
	html += '    							</div>';
	html += '    						</li>';
	html += '    						<li>';
	html += '    							<div class="chk-form terms-more">';
	html += '    								<input type="radio" id="chrCard_04" name="chrCard">';
	html += '    								<label for="chrCard_04">';
	html += '    									�щ옉�댁슂-2';
	html += '    									<figure class="card-img">';
	html += '    										<img src="https://images.samsung.com/kdp/event/familylove/sec_familylove_card_04.jpg" alt="�녹븘二쇱떆怨� �ㅼ썙二쇱뀛�� 媛먯궗�댁슂">';
	html += '    									</figure>';
	html += '    								</label>';
	html += '    							</div>';
	html += '    						</li>';
	html += '    						<li>';
	html += '    							<div class="chk-form terms-more">';
	html += '    								<input type="radio" id="chrCard_05" name="chrCard">';
	html += '    								<label for="chrCard_05">';
	html += '    									�묒썝�댁슂';
	html += '    									<figure class="card-img">';
	html += '    										<img src="https://images.samsung.com/kdp/event/familylove/sec_familylove_card_05.jpg" alt="鍮쏅굹�� �뱀떊�� 轅덉쓣 �묒썝�댁슂">';
	html += '    									</figure>';
	html += '    								</label>';
	html += '    							</div>';
	html += '    						</li>';
	html += '    						<li>';
	html += '    							<div class="chk-form terms-more">';
	html += '    								<input type="radio" id="chrCard_06" name="chrCard">';
	html += '    								<label for="chrCard_06">';
	html += '    									�섎궡�몄슂';
	html += '    									<figure class="card-img">';
	html += '    										<img src="https://images.samsung.com/kdp/event/familylove/sec_familylove_card_06.jpg" alt="紐⑤몢 �� �섎맆 嫄곗삁��">';
	html += '    									</figure>';
	html += '    								</label>';
	html += '    							</div>';
	html += '    						</li>';
	html += '    					</ul>';
	html += '						<!-- e : CHEER CARD form -->';
	html += '					</fieldset>';

	html += '				</form>';
	html += '				<div class="btn-box">';
	html += '					<button type="button" class="btn btn-d btn-type2" id="eventSaveBtn5">移댁뭅�ㅽ넚 怨듭쑀�섍린</button>';
	html += '				</div>';
	html += '			</div>';

	html += '		</div>';

	return html;
}

//>移댁뭅�ㅽ넚 怨듭쑀�섍린
$(document).on('click', "#eventSaveBtn5", function(){
	if(fnValidationSelCard()){
		$("#focusTarget").val("");
		makeAlert("怨듭쑀瑜� �꾪빐 移댁뭅�ㅽ넚APP�� �ㅽ뻾�섎ŉ,<br>移댁뭅�ㅽ넚 APP�� �듯빐 諛섎뱶�� 怨듭쑀�섍린瑜� �꾨즺�댁빞 李몄뿬�⑸땲��.", fnSaveEventEntry5);
	}
});



/*
>移댁뭅�ㅽ넚 怨듭쑀�섍린
*/
function fnSaveEventEntry5(){

	var eventUrl   = document.location.href;
	var eventTitle = "";
	var eventImagePath = "";
	var eventDesc  = "";
	var msg = $("#popEntrySuccMsg5").val();
	var eventNo = $("#entryEventNo").val();
    var mbrNo = sessionMbr;

	if(eventAddYn == "B2C_KSF_KAKAO_SEND"){
		eventTitle = "紐⑤몢媛� 湲곕떎�ㅼ삩 異뺤젣 �쇱꽭��";
		eventImagePath = "https://images.samsung.com/kdp/event/festa_samsungsale/sec_promotion_img_02.jpg";
		eventDesc  = "�쇱꽦�꾩옄 �몄씪 �섏뒪��留뚯쓽 轅��쒗깮�� �띾낫�섍퀬 鍮꾩뒪�ы겕 援우쫰瑜� 諛쏆븘蹂댁꽭��!";
		msg = "�대깽�� �묐え 諛� �띾낫 �대�吏� 蹂대궡湲곌� �꾨즺�섏뿀�듬땲��.<br>�대깽�명럹�댁��먯꽌 �뺤긽李몄뿬 �섏뿀�붿� �뺤씤�댁＜�몄슂.<br>(鍮꾩젙�� 醫낅즺, �섏��� 梨꾪똿諛� 怨듭쑀�� 諛섏쁺�섏� �딆뒿�덈떎)";
	}else if(eventAddYn == "B2C_KAKAO_SEND"){
		eventTitle = "�쇱꽦�꾩옄�� �④퍡�섎뒗 媛�議깆궗�� �좊Ъ����";
	    eventImagePath = $("[name='chrCard']:checked").parent().find('img').attr('src');
	    eventDesc  = "�μ뒪�ъ썙�� �섏� 紐삵뻽�� 留�, 媛�議� �щ옉 留덉쓬 移대뱶 �대깽�몄� �④퍡 �좊Ъ���꾩쓣 利먭꺼蹂댁꽭��!";
	    msg = "�대깽�� �묐え 諛� 留덉쓬 移대뱶 蹂대궡湲곌� �꾨즺�섏뿀�듬땲��.<br>�대깽�명럹�댁��먯꽌 �뺤긽李몄뿬 �섏뿀�붿� �뺤씤�댁＜�몄슂.<br>(鍮꾩젙�� 醫낅즺, �섏��� 梨꾪똿諛� 怨듭쑀�� 諛섏쁺�섏� �딆뒿�덈떎)";
	}
    snsShare.kakaoTalkCallback(eventUrl, eventTitle, eventImagePath, eventDesc, eventNo, mbrNo);
    makeAlert(msg, eventPopClose);
}

//[�좏슚�� 泥댄겕] 移대뱶�좏깮
function fnValidationSelCard(){
	var passyn = true;
	passyn = $("input[name='chrCard']").is(':checked');
	if(!passyn){
		if(eventInfo.entryEvent.eventAddYn == "B2C_KSF_KAKAO_SEND"){
			makeAlert("�띾낫 �대�吏�瑜� �좏깮�� 二쇱꽭��.");
		}else if(eventInfo.entryEvent.eventAddYn == "B2C_KAKAO_SEND"){
			makeAlert("�묒썝移대뱶瑜� �좏깮�� 二쇱꽭��.");
		}
	}
	return passyn;
}
/********************** 肄붿꽭�� (肄붾━�� �몄씪 �섏뒪��) end**********************/

/*
�덈줈�� 媛ㅻ윮�� �뚮┝�좎껌-異붽��ㅻЦ�앹뾽 html tag
*/
function drawSurveyHtmlCode(){
	stPath = ($("#openPop").data("st-path"));

	var options = {
			url: stPath+"xhr/event/getEventSurveyCodeList",
			done: function (data) {
				var evtSurBftCdList = data.evtSurBftCdList;
				var evtSurPhoneCdList = data.evtSurPhoneCdList;

				var html="";
				html += '<div class="layer-pop layer-normal layer-event-survey" id="popupAddSurvey" style="z-index:300;" tabindex="0" data-popup-layer="popupAddSurvey" data-focus="popupAddSurvey">';
				html += '    <button type="button" id="exhibition" data-popup-target="popupAddSurvey" style="display: none;"></button>';
				html += '    <div class="layer-header">';
				html += '        <h2>�덈줈�� Galaxy 異붽� �ㅻЦ議곗궗</h2>';
				html += '    </div>';
				html += '    <div class="layer-content">';
				html += '		<div class="frm-login wrap-scroll">';
				html += '			<form id="eventEntrySurveyPopFrm">';
				html += '	            <input type="hidden" id="joinNo" name="joinNo" />';
				html += '	            <input type="hidden" id="eventNo" name="eventNo" />';
				html += '	            <input type="hidden" id="evtSurBftCd" name="evtSurBftCd" value=""/>';
				html += '	            <input type="hidden" id="evtSurPhoneCd" name="evtSurPhoneCd" value=""/>';
				html += '				<input type="hidden" id="focusTarget" value=""/>';
				html += '				<input type="hidden" id="focusTargetType" value=""/>';
				html += '				<input type="hidden" id="jsonStr" name="jsonStr" value=""/>';
				html += '				<fieldset>';
				html += '					<legend>�ㅻЦ議곗궗 �낅젰</legend>';
				html += '					<div class="inp-box-survey bg-box">';
				html += '						<div class="inp-box">';
				html += '							<label for="prodSolSltLv1" class="lb-line">�쒗뭹 援щℓ �� 媛��� �좏샇�섎뒗 �쒗깮�� �좏깮�댁＜�몄슂.</label>';
				html += '							<div id="evtSurBftCdList" class="wrap-droplist">';
				html += '								<button class="droplist-button" aria-haspopup="listbox" aria-labelledby="droplistTitleLv-1 droplistPdBtn-1"';
				html += '									id="droplistPdBtn-1">�듭뀡�� �좏깮�섏꽭��</button>';
				html += '								<ul class="droplist" tabindex="-1" role="listbox" aria-labelledby="droplistTitleLv-1"';
				html += '									aria-activedescendant="pd-type01-01">';

				for (var i = 0; i < evtSurBftCdList.length; i++) {
					html += '<li id="pd-type01-0' + (i + 1) + '" role="option" data-pd-type-cd="' + evtSurBftCdList[i].dtlCd + '" class="droplist-item">' + evtSurBftCdList[i].dtlNm + '</li>';
				}

	//			html += '									<li id="pd-type01-02" role="option" class="droplist-item">移대뱶�좎씤</li>';
	//			html += '									<li id="pd-type01-03" role="option" class="droplist-item">以묎퀬�� 蹂댁긽</li>';
	//			html += '									<li id="pd-type01-04" role="option" class="droplist-item">臾댁씠�� �좊�</li>';
				html += '								</ul>';
				html += '							</div>';
				html += '							<div id="evtSurBftCdListErr" class="error-msg">';
				html += '								<p>�� �듭뀡�� �좏깮�섏떗�쒖삤.</p>';
				html += '							</div>';
				html += '						</div>';
				html += '						<div class="inp-box">																																															';
				html += '							<label for="prodSolSltLv1" class="lb-line">�꾩옱 �ъ슜以묒씤 �ㅻ쭏�명룿�� �쒖“�щ� �좏깮�댁＜�몄슂.</label>																																															';
				html += '							<div id="evtSurPhoneCdList" class="wrap-droplist">																																															';
				html += '								<button class="droplist-button" aria-haspopup="listbox" aria-labelledby="droplistTitleLv-1 droplistPdBtn-2"																																															';
				html += '									id="droplistPdBtn-2">�듭뀡�� �좏깮�섏꽭��</button>																																															';
				html += '								<ul class="droplist" tabindex="-1" role="listbox" aria-labelledby="droplistTitleLv-1"																																															';
				html += '									aria-activedescendant="pd-type01-01">';
				for (var i = 0; i < evtSurPhoneCdList.length; i++) {
					html += '<li id="pd-type01-0' + (i + 1) + '" role="option" data-pd-type-cd="' + evtSurPhoneCdList[i].dtlCd + '" class="droplist-item">' + evtSurPhoneCdList[i].dtlNm + '</li>';
				}
	//			html += '									<li id="pd-type01-01" role="option" class="droplist-item">�쇱꽦</li>																																															';
	//			html += '									<li id="pd-type01-02" role="option" class="droplist-item">�좏뵆</li>																																															';
	//			html += '									<li id="pd-type01-03" role="option" class="droplist-item">�붿썾��</li>																																															';
	//			html += '									<li id="pd-type01-04" role="option" class="droplist-item">�ㅽ룷</li>																																															';
	//			html += '									<li id="pd-type01-05" role="option" class="droplist-item">鍮꾨낫</li>																																															';
	//			html += '									<li id="pd-type01-06" role="option" class="droplist-item">湲고�</li>																																															';
				html += '								</ul>																																															';
				html += '							</div>																																															';
				html += '							<div id="evtSurPhoneCdListErr" class="error-msg">																																															';
				html += '								<p>�� �듭뀡�� �좏깮�섏떗�쒖삤.</p>																																															';
				html += '							</div>																																															';
				html += '						</div>																																															';
				html += '					</div>																																															';
				html += '				</fieldset>																																															';
				html += '			</form>																																															';
				html += '		</div>																																															';
				html += '        <div class="btn-box">																																															';
				html += '            <button id="eventSurveySaveBtn" type="button" class="btn btn-d btn-type2">�쒖텧�섍린</button>																																															';
				html += '        </div>																																															';
				html += '    </div>																																															';
				html += '    <button type="button" class="pop-close evt-pop-close" data-focus-next="popupAddSurvey">�앹뾽�リ린</button>																																															';
				html += '</div>																																															';

				if ($("#popupArea_Event3791").length > 0) {
					$("#popupArea_Event3791").append(html);

					$("#exhibition").click();
				}

				$("#eventEntrySurveyPopFrm > #eventNo").val(entryEvent.eventNo); // �쒕쾭�꾩넚�� �대깽�� 踰덊샇
			}
	};

	ajax.call(options);

}

/*
	�대깽�� �ㅻЦ ����
*/
function fnSaveEventSurvey(){
	$(".error-msg").hide();

	$("#focusTarget").val("");

	if (fnSurveyValidCheck()) {
		createSurveyJsonStr();

		var options = {
				url: stPath+"xhr/event/insertEventSurvey",
				data: $("#eventEntrySurveyPopFrm").serialize(),
				done: function (data) {
					var result = data.result;

					makeAlert(result.resultMsg, eventPopClose);
				}
			};

		ajax.call(options);

	} else {
		var id = $("#focusTarget").val();
		var type = $("#focusTargetType").val();

		if(type == ""){
			setTimeout(function(){
				$("#"+id).focus();
			}, 1);
		}else{
			$("input[name="+id+"]").focus();
		}

		return;
	}

}

function fnSurveyValidCheck() {
	var passyn = "Y";

	var evtSurBftCd = $("#evtSurBftCdList > ul > li.focused").data("pd-type-cd");
	var evtSurPhoneCd = $("#evtSurPhoneCdList > ul > li.focused").data("pd-type-cd");

	if (joinNo === undefined || joinNo == '') {
		passYn = "N";
		alert("�묐え踰덊샇媛� 議댁옱�섏� �딆뒿�덈떎.");
	} else {
		$("#eventEntrySurveyPopFrm > #joinNo").val(joinNo);
	}

	if (evtSurBftCd === undefined) {
		$("#evtSurBftCdListErr").show();
	//	$("#droplistPdBtn-1").click();
		passyn = "N";
	} else {
		$("#eventEntrySurveyPopFrm > #evtSurBftCd").val(evtSurBftCd);
	}

	if (evtSurPhoneCd === undefined ) {
		$("#evtSurPhoneCdListErr").show();
	//	$("#droplistPdBtn-2").click();
		passyn = "N";
	} else {
		$("#eventEntrySurveyPopFrm > #evtSurPhoneCd").val(evtSurPhoneCd);
	}

	return passyn == "Y" ? true : false;
}

/*
	異붽��꾨뱶�� �댁슜�� jsonString�쇰줈 議고빀�댁꽌 �쒕쾭濡� �꾨떖
*/
function createSurveyJsonStr(){

	var jsonStr = new Object;
	var rowArr = new Array;
	var index = 0;

	//addSurveyFields = eventInfo.addSurveyFields; // 異붽� �ㅻЦ�꾨뱶

	var addSurvey = new Object;
	var addSurveyFields = new Array;

	addSurvey.fldNo = "evtSurBftCdList";
	addSurvey.surveyFldTpCd = 50;
	addSurvey.fldGrp = 1;
	addSurvey.fldNm = '�쒗뭹 援щℓ �� 媛��� �좏샇�섎뒗 �쒗깮�� �좏깮�댁＜�몄슂.';

	addSurveyFields.push(addSurvey);

	addSurvey = new Object;
	addSurvey.fldNo = "evtSurPhoneCdList";
	addSurvey.surveyFldTpCd = 50;
	addSurvey.fldGrp = 2;
	addSurvey.fldNm = '�꾩옱 �ъ슜以묒씤 �ㅻ쭏�명룿�� �쒖“�щ� �좏깮�댁＜�몄슂.';

	addSurveyFields.push(addSurvey);

	$.each(addSurveyFields, function(idx, item){
		let jobj = new Object;
		let id = item.fldNo;
		let surveyFldTpCd = item.surveyFldTpCd;

		if(surveyFldTpCd == "10" || surveyFldTpCd == "20" || surveyFldTpCd == "90" || surveyFldTpCd == "100" || surveyFldTpCd == "130"){
			// �쒖쨪 , �щ윭以�
		}else if(surveyFldTpCd == "30"){
			// �쇰뵒�� 踰꾪듉
		}else if(surveyFldTpCd == "40"){
			// 泥댄겕諛뺤뒪
		}else if(surveyFldTpCd == "50"){
			// ���됲듃諛뺤뒪
//			var evtSurBftCd = $("#evtSurBftCdList > ul > li.focused").data("pd-type-cd");
//			var evtSurPhoneCd = $("#evtSurPhoneCdList > ul > li.focused").data("pd-type-cd");

			var selText = $("#"+id+" > ul > li.focused").text();
			if(selText != ""){
				jobj.fldNo = item.fldNo+"";
				jobj.fldGrp = item.fldGrp;
				jobj.surveyFldTpCd = item.surveyFldTpCd+"";
				jobj.fldNm = item.fldNm;
				jobj.fldVal = selText;

				rowArr.push(jobj);
				jsonStr.addSurveyFields = rowArr;
			}
			index++;
		} else if(surveyFldTpCd == "60"){
			// 泥⑤��뚯씪
		} else if(surveyFldTpCd == "110") {
			//�됱젏
		} else if(surveyFldTpCd == "120"){
			//�ㅼ쨷 泥⑤��뚯씪
		}

	});

	if(index == 0){
		$("#jsonStr").val("noData"); // ��ぉ�� �놁쓣 寃쎌슦 noData 濡� �섍꺼�� �쒕쾭�먯꽌 else 泥섎━��
	}else{
		$("#jsonStr").val(JSON.stringify(jsonStr));
	}

	//console.log($("#jsonStr").val());
}


/* KCB�몄쬆 */
function drawEventKcbAuthDivHtmlCode(data){
	var html="";
	html += '<form name="form_kcbPhone" method="post">';
	html += '	<input type="hidden" name="tc" value="kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd">';
	html += '	<input type="hidden" name="cp_cd" value="">'; //�뚯썝�� 肄붾뱶
	html += '	<input type="hidden" name="mdl_tkn" value="">'; // �좏겙
	html += '</form>';

	return html;
}


/********************** KCB �몄쬆 �꾩슜 紐⑤뱢 **********************/

var certificationKcbFlag = false;

function fnCallPop7(evtNo){
		pblcEvtNo = evtNo;

	oneTimeChk = false;

	returnUrl = window.location.pathname;

	var searchPath = window.location.search;

	if(searchPath.indexOf("eventNo") != -1) {
		returnUrl += searchPath;
	} else {
		if (searchPath.indexOf("?") != -1){
			if(returnUrl.indexOf("event/eventContentDetailView") != -1) {
				returnUrl += searchPath + "&eventNo="+pblcEvtNo;
			} else {
				returnUrl += searchPath;
			}
		} else {
//			returnUrl += "?eventNo="+pblcEvtNo;
		}
	}

	stPath = ($("#openPop").data("st-path"));

	var param;
	param = {eventNo : pblcEvtNo , isPreView : isPreView };

	var options = {
		url : stPath+"xhr/event/getEventBaseInfo"
		, data : param
		, done: function (data) {

			$("#mask").remove();
			var eventInfo = data.eventInfo;

			if(eventInfo.errMsg == "" || eventInfo.errMsg == null){
				if (!certificationKcbFlag) {
					eventAddYn = eventInfo.entryEvent.eventAddYn;
					fnKcbPopup(data);
				} else {
					//�좊뱶釉뚮┃�� customEvent
					adbrixCustomEvent(data.eventInfo.entryEvent.ttl, pblcEvtNo, 'click');
					
					setEventPopRenewal(data);
				}

			}else{
				if(eventInfo.errCd == "LGN0005"){
					makeAlert(eventInfo.errMsg, fnGoLoginPage);
				}else{
					makeAlert(eventInfo.errMsg, eventPopClose);
				}
			}
			if(eventGbCd){
				if(eventInfo.plazas){
					$("#eventBtn_Area_div").css("display","none");
				}else{
					$("#eventBtn_Area_div").css("display","");
				}
			}
		}
	};
	ajax.call(options);
	multiFileCnt = 0;			//泥⑤��뚯씪 媛쒖닔 珥덇린��
}

//�대��곗떎紐낆씤利� popup
function fnKcbPopup(data) {
	stPath = ($("#openPop").data("st-path"));

	$eventKcbAuthDiv = $(drawEventKcbAuthDivHtmlCode(data));

	$("#popupArea_Event3791").html("");

	if($("#popupArea_Event3791").length > 0) {
		$("#popupArea_Event3791").append($eventKcbAuthDiv);
		var kcbPhone = data.kcbPhone;

		$("form[name='form_kcbPhone']").children("input[name='cp_cd']").val(kcbPhone.cp_CD);
		$("form[name='form_kcbPhone']").children("input[name='mdl_tkn']").val(kcbPhone.mdl_TKN);

	}

	var agent = navigator.userAgent.toLowerCase();

	if ( ( (navigator.appName === 'Netscape' && agent.indexOf('trident') !== -1) || (agent.indexOf("msie") !== -1))){
		newWindowAndSubmit({
			url : stPath + 'popupKcbPhone/',
			stContextPath : stPath
		})
	} else {
		window.open(
						'',
						'popupChk',
						'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
		document.form_kcbPhone.action = "https://safe.ok-name.co.kr/CommonSvl";
		document.form_kcbPhone.target = "popupChk";
		document.form_kcbPhone.submit();
	}
}

function cbCertificationInfo(data) {
	if(data.rtnCode){
		// �룹뺨 鍮꾩뒪�ы겕 �명뵾�덊떚 �쇱씤
		if (eventAddYn == 'B2C_BSPK_INFINITE_LINE') {
			var birthDayYear = (data.birthDate).toString().substring(0, 4);
			var curYear = new Date().getFullYear();
			var curAge = (curYear - birthDayYear) + 1;

			if (curAge < 19) {
				makeAlert("留�19�� �댁긽留� �묐え�� �� �덉뒿�덈떎.");
				return;
			} else {

				param = { ciToken : data.colInfo, eventNo: pblcEvtNo };

				ciToken = data.colInfo;
				stPath = ($("#openPop").data("st-path"));

				var options = {
					url : stPath+"xhr/event/getEventKcbAuthCnt"
					, data : param
					, done: function (data) {

						if (data.kcbAuthCnt > 0) { // �대� KCB�뺣낫濡� �깅줉�� �섏뼱 �덉쑝硫�,
							certificationKcbFlag = false;
							makeAlert("�대� �묐え�섏��듬땲��.");

						} else {
							certificationKcbFlag = true;

							makeAlert("蹂몄씤 �몄쬆�� �꾨즺 �섏뿀�듬땲��.", fnCallPop7Chain);
						}

					}
				};

				ajax.call(options);
			}
		}
		// 媛ㅼ틺�� 鍮꾩뒪�ы겕 �명뵾�덊떚 �쇱씤
		else if (eventAddYn == 'B2B2C_9ALAXY_DAY') {
			param = { ciToken : data.colInfo, eventNo: pblcEvtNo };

			ciToken = data.colInfo;
			stPath = ($("#openPop").data("st-path"));

			var options = {
				url : stPath+"xhr/event/getEventKcbAuthCnt"
				, data : param
				, done: function (data) {

					if (data.kcbAuthCnt > 0) { // �대�  KCB�뺣낫濡� �깅줉�� �섏뼱 �덉쑝硫�,
						certificationKcbFlag = false;
						makeAlert("�대� �묐え�섏��듬땲��.");

					} else {
						certificationKcbFlag = true;

						makeAlert("蹂몄씤 �몄쬆�� �꾨즺 �섏뿀�듬땲��.", fnCallPop7Chain);
					}

				}
			};

			ajax.call(options);
		}

		else {
			makeAlert("�대떦�섎뒗 �뱀젙�대깽�멸� �놁뒿�덈떎.");
		}

	} else{
		certificationKcbFlag = false;
	}
}

function fnCallPop7Chain() {
	fnCallPop7(pblcEvtNo);
}

//�묐え�먯닔
function listEventParticpant(evtNo) {
			stPath = $("#openPop").data("st-path");
        	var options = {
                url: stPath + "xhr/event/getEventJoinInfo",
                data:{eventNo : evtNo},
                done: function(data) {
                	$("#test").append("<p>{�꾩옱 "+data.result.entryTtlCnt+"紐� �묐え以�!}</p>");
                },
                fail:function(){
                }
    	}
    	ajax.call(options);
}

// 媛ㅼ틺�� ���숆탳 ����쟾 �숆탳 �쒖쐞
function galcamsSchoolEvent(evtNo, cnt, schoolNm, entryNum) {
	if(evtNo == undefined || evtNo == ""){
		makeAlert("eventNo媛� 議댁옱�섏� �딆뒿�덈떎.");
		return;
	} else {
		stPath = ($("#openPop").data("st-path"));

		var param = {
				eventNo: evtNo
			,   cnt:cnt
			,   eventSchoolNmYn:schoolNm
			,   eventEntryYn:entryNum
		};

		var options = {
			url : stPath+"xhr/event/galcamsSchoolEvent"
			, data : param
			, type: 'POST'
			, dataType : "html"
			, done: function (data) { //joinName, fldVal, sysRegrNo
				$("#schoolEventRank").children().remove();
				$("#schoolEventRank").html(data);
			}
		};
		ajax.call(options);
	}
}

//媛ㅼ틺�� �대깽�� 李몄뿬媛��� �ъ슜�� 泥댄겕
function fnCallPop8(evtNo) {
	stPath = $("#openPop").data("st-path");

	var options2 = {
        url: stPath + "xhr/member/getSession",
        type: "POST",
        done: function(data) {
            var session = JSON.parse(data);
            if(session.mbrNo == 0 ) {
				var returnUrl = $("input[name=returnUrl]").val();
				location.href= stPath + 'member/indexLogin/?returnUrl='+ window.location.pathname + "?eventNo="+evtNo;
            }else{
                var fnCallPop8Data = {
            			mbrNo : session.mbrNo
            		  , eventNo : evtNo
                };

            	var options = {
                        url : stPath + "xhr/event/galcamsEntryTargetInfo",
                        data: fnCallPop8Data,
                        done: function(data2) {
                        	if($("#popupArea_Event3791").length > 0){
                        		$("#popupArea_Event3791").children().remove();
                        	}

                        	if(data2.eventTargetChk){
                        		fnCallPop2(evtNo);
                        	}else{
                            	makeAlert(data2.msg, eventPopClose);
                            	$("#mask").remove();
                        		return;
                        	}
                        }
            	}
            	ajax.call(options);
            }
        }
    }
    ajax.call(options2);
}

//媛ㅼ틺�� �뱀꺼 �앹뾽
function drawPopHtmlCode6(){
	var html="";
	html += '<div class="layer-pop layer-default alert layer-event-exhibition" id="popupWinInfo" tabindex="0" data-popup-layer="popupWinInfo" data-focus="popupWinInfo">';
	html += '   <button type="button" id="exhibition" data-popup-target="popupWinInfo" style="display: none;"></button>';
/****************************/
	html += '   <div id = "winPopDiv">';
	html += '   </div>';
/****************************/
	html += '	<button type="button" class="pop-close evt-pop-close" data-focus-next="popupWinInfo">�앹뾽�リ린</button>';
	html += '</div>';
	return html;
}

//�뱀꺼
function drawPopHtmlCode6_1() {
    var html = "";
      html += 	'<div class="layer-header blind">';
      html += 		'<h2>�대깽�� �뱀꺼 寃곌낵 �앹뾽</h2>';
      html += 	'</div>';
      html += 	'<div class="layer-content">';
      html += 		'<div class="content-box">';
      html += 			'<ul>';
      html += 				'<li>';
      html += 					'<div class="icon-box">';
      html += 						'<i class="gc_icon i-event-01">�대깽�� �앹뾽 �대�吏�01</i>';
      html += 					'</div>';
      html += 					'<p class="gc_bold_word">';
      html += 						'<span id="winName"></span>��, 異뺥븯�댁슂<br>';
      html += 						'<br>';
      html += 						'<span id="eventName"></span> 寃곌낵<br>';
      html += 						'<span class="gc_blue_word gc_bold_word"><span id="rewardNm"></span></span>��<br>';
      html += 						'�뱀꺼�섏뀲�듬땲��';
      html += 					'</p>';
      html += 				'</li>';
      html += 			'</ul>';
      html += 		'</div>';
      html += 		'<div class="btn-box">';
      html += 			'<a href="javascript:void(0)" class="btn btn-d btn-type2" onclick="eventPopClose();">�뺤씤</a>';
      html += 		'</div>';
      html += 	'</div>';

    return html
}

//誘몃떦泥�
function drawPopHtmlCode6_2() {
    var html = "";
	      html += 	'<div class="layer-header blind">';
	      html += 		'<h2>�대깽�� �뱀꺼 寃곌낵 �앹뾽</h2>';
	      html += 	'</div>';
	      html += 	'<div class="layer-content">';
	      html += 		'<div class="content-box">';
	      html += 			'<ul>';
	      html += 				'<li>';
	      html += 					'<div class="icon-box">';
	      html += 						'<i class="gc_icon i-event-01">�대깽�� �앹뾽 �대�吏�01</i>';
	      html += 					'</div>';
	      html += 					'<p class="gc_normal_word">';
	      html += 						'�꾩돺寃뚮룄 �대깽�몄뿉 �뱀꺼�섏� �딆븯�댁슂';
	      html += 						'�ㅻⅨ �대깽�몃룄 留롮씠 以�鍮꾨릺�� �덉쑝��';
	      html += 						'�꾩쟾�� 二쇱꽭��';
	      html += 					'</p>';
	      html += 				'</li>';
	      html += 			'</ul>';
	      html += 		'</div>';
	      html += 		'<div class="btn-box">';
	      html += 			'<a href="javascript:void(0)" class="btn btn-d btn-type2" onclick="eventPopClose();">�뺤씤</a>';
	      html += 		'</div>';
	      html += 	'</div>';
    return html
}


function fnDrawPop6(){
	// �앹뾽 html Code
	if($("#popupArea_Event3791").length > 0){
		$("#popupArea_Event3791").children().remove();
		$("#popupArea_Event3791").append($popDiv6);
	}else{
		$("#popupArea").append($popDiv6);
	}

	// �댄똻 html Code
	if($("#tooltipArea_Event3791").length > 0){
		$("#tooltipArea_Event3791").children().remove();
		$("#tooltipArea_Event3791").append($tooltipDiv);
	}else{
		$("#tooltipArea").append($tooltipDiv);
	}

	$(".titleNo").show();
}

/* 湲곗〈 �대깽�� �묐え �앹뾽 �붾㈃ �뗮똿 */
function setEventPop6(data){
	fnDrawPop6();
	$("#exhibition").click(); // �앹뾽�쒖떆

	if (data.myWinInfo.mbrNm == null || data.myWinInfo.mbrNm == "N") {
		$("#winPopDiv").empty().append(drawPopHtmlCode6_2());
	}else{
		$("#winPopDiv").empty().append(drawPopHtmlCode6_1());
	    $("#winName").text(data.myWinInfo.mbrNm);       		// �붾㈃異쒕젰�� �ъ슜�먮챸
	    $("#eventName").text(data.myWinInfo.ttl);				// �붾㈃異쒕젰�� �대깽�몃챸
	    $("#rewardNm").text(data.myWinInfo.rewardNm);		// �붾㈃異쒕젰�� 蹂댁긽紐�
	}
}


/* �뱀꺼�� �앹뾽 �몄텧 */
function fnCallPop9(evtNo){
	oneTimeChk = false;

	pblcEvtNo = evtNo;
	returnUrl = window.location.pathname;

	var searchPath = window.location.search;

	if(searchPath.indexOf("eventNo") != -1) {
		returnUrl += searchPath;
	} else {
		if (searchPath.indexOf("?") != -1){
			if(returnUrl.indexOf("event/eventContentDetailView") != -1) {
				returnUrl += searchPath + "&eventNo="+pblcEvtNo;
			} else {
				returnUrl += searchPath;
			}
		} else {
			returnUrl += "?eventNo="+pblcEvtNo;
		}
	}

	stPath = ($("#openPop").data("st-path"));

	var options2 = {
	        url: stPath + "xhr/member/getSession",
	        type: "POST",
	        done: function(data) {
	            var session = JSON.parse(data);
	            if(session.mbrNo == 0 ) {
					var returnUrl = $("input[name=returnUrl]").val();
					location.href= stPath + 'member/indexLogin/?returnUrl='+ window.location.pathname + "?eventNo="+evtNo;
	            }else{
	                var param = {mbrNo : session.mbrNo , eventNo : evtNo };

	            	var options = {
	                        url : stPath + "xhr/event/getMyWinInfo",
	                        data: param,
	                        done: function(data2) {
	                        	$("#mask").remove();
	                        	//if(eventInfo.errMsg == "" || eventInfo.errMsg == null){}
	        					setEventPop6(data2);
	                        }
	            	}
	            	ajax.call(options);
	            }
	        }
	    }
	    ajax.call(options2);
}
function sendPost(url, params) {
	var form = document.createElement('form');
	form.setAttribute('method', 'post');
	form.setAttribute('target', '_blank');
	form.setAttribute('action', url);
	document.charest = "UTF-8";
	
	for(var key in params) {
		var hiddenField = document.createElement('input');
		hiddenField.setAttribute('type', 'hidden');
		hiddenField.setAttribute('name', key);
		hiddenField.setAttribute('value', params[key]);
		form.appendChild(hiddenField);
	}
	
	document.body.appendChild(form);
	form.submit();
}	
/* S @PIL(23.09.20) �대깽�� 而ㅻ��덊떚 紐⑸줉�쇰줈 �대룞 ----------*/
function fnCallPop11(evtNo){
	   stPath = ($("#openPop").data("st-path"));
	   
		var param = {
			eventNo : evtNo
		};

		var options = {
			url : stPath + "xhr/event/getGalcamsEventBbsId",
			data: param,
			done: function(result) {
				if(result.bbsId === 'ugcboard'){
					window.location.href = stPath+"galcamsLog/event/" + evtNo + "/list";
				}else{
					sendPost(stPath + "community/" + result.bbsId, {bbsGbNo:result.bbsGbNo});
				}
			}
		}
		ajax.call(options);   
}

/* S @PIL(22.10.28) GCS 戮� 寃붾윭由� �대깽�� �뺣낫 �숈쓽 & 李몄뿬 ----------*/
function fnCallPop12(evtNo){
    ugcFlag     = true;
    pblcEvtNo = evtNo;
    stPath      = $("#openPop").data("st-path");

	var options2 = {
        url: stPath + "xhr/member/getSession",
        type: "POST",
        done: function(data) {
            var session = JSON.parse(data);

	         if(session.mbrNo ==0){
					var returnUrl = $("input[name=returnUrl]").val();
					location.href= stPath + 'member/indexLogin/?returnUrl='+ window.location.pathname + "?eventNo="+evtNo;
	         }else{
			    var param = {
			            mbrNo : session.mbrNo
			          , eventNo : evtNo
			    };
			
				var options = {
			            url : stPath + "xhr/event/galcamsEventEntryInfo",
			            data: param,
			            done: function(data2) {
			               // �뺣낫 �숈쓽 �щ� 諛� 戮먭갇�щ━ 湲��곌린 �щ� 泥댄겕
			            	if(data2.eventEntryInfoChk){
			            		fnCallPop2(evtNo);
			            	}else{
			                	makeAlert(data2.msg, eventPopClose12); // 戮� 媛ㅻ윭由� 湲��곌린 �붾㈃�쇰줈 �대룞
			                	$("#mask").remove();
			            		return;
			            	}
			            }
				}
				ajax.call(options);
			}
        }
    }
    ajax.call(options2);
}

/* S @PIL(22.10.28) GCS 戮� 寃붾윭由� �대깽�� KCP �몄쬆 & 李몄뿬 ----------*/
/* 戮� 媛ㅻ윭由� �대깽�� �깅줉 -> 寃뚯떆�� �대깽�� �깅줉 (�꾩껜 而ㅻ��덊떚 �뺣�) : 23-09-14 */
function fnCallPop13(evtNo){
    ugcFlag     = true;
    pblcEvtNo = evtNo;
    stPath      = $("#openPop").data("st-path");

	var options2 = {
        url: stPath + "xhr/member/getSession",
        type: "POST",
        done: function(data) {
            var session = JSON.parse(data);

	         if(session.mbrNo ==0){
					var returnUrl = $("input[name=returnUrl]").val();
					location.href= stPath + 'member/indexLogin/?returnUrl='+ window.location.pathname + "?eventNo="+evtNo;
	         }else{
			    var param = {
			            mbrNo : session.mbrNo
			          , eventNo : evtNo
			    };
			
				var options = {
			            url : stPath + "xhr/event/galcamsEventEntryInfo",
			            data: param,
			            done: function(data2) {
			               // �뺣낫 �숈쓽 �щ� 諛� 戮먭갇�щ━ 湲��곌린 �щ� 泥댄겕
			            	if(data2.eventEntryInfoChk){
			            		fnCallPop7(evtNo);
			            	}else{
			                	makeAlert(data2.msg, eventPopClose12); // 戮� 媛ㅻ윭由� 湲��곌린 �붾㈃�쇰줈 �대룞
			                	$("#mask").remove();
			            		return;
			            	}
			            }
				}
				ajax.call(options);
			}
        }
    }
    ajax.call(options2);
}

/* S @PIL(22.10.28) GCS 戮� 寃붾윭由� �대깽�� �묐え �쒗븳 & 李몄뿬 ----------*/
function fnCallPop14(evtNo){
    ugcFlag     = true;
    pblcEvtNo = evtNo;
    stPath      = $("#openPop").data("st-path");

	var options2 = {
        url: stPath + "xhr/member/getSession",
        type: "POST",
        done: function(data) {
            var session = JSON.parse(data);

	         if(session.mbrNo ==0){
					var returnUrl = $("input[name=returnUrl]").val();
					location.href= stPath + 'member/indexLogin/?returnUrl='+ window.location.pathname + "?eventNo="+evtNo;
	         }else{
			    var param = {
			            mbrNo : session.mbrNo
			          , eventNo : evtNo
			    };
			
				var options = {
			            url : stPath + "xhr/event/galcamsEventEntryInfo",
			            data: param,
			            done: function(data2) {
			               // �뺣낫 �숈쓽 �щ� 諛� 戮먭갇�щ━ 湲��곌린 �щ� 泥댄겕
			            	if(data2.eventEntryInfoChk){
			            		fnCallPop8(evtNo);
			            	}else{
			                	makeAlert(data2.msg, eventPopClose12); // 戮� 媛ㅻ윭由� 湲��곌린 �붾㈃�쇰줈 �대룞
			                	$("#mask").remove();
			            		return;
			            	}
			            }
				}
				ajax.call(options);
			}
        }
    }
    ajax.call(options2);
}

/*  戮� 媛ㅻ윭由� �대깽�� �앹뾽�リ린 */
/* 戮� 媛ㅻ윭由� �대깽�� �깅줉 -> 寃뚯떆�� �대깽�� �깅줉 (�꾩껜 而ㅻ��덊떚 �뺣�) : 23-09-14 */
function eventPopClose12(){
	$(".evt-pop-close").trigger("click");

	var param = {
		eventNo : pblcEvtNo
	};

	var options = {
		url : stPath + "xhr/event/getGalcamsEventBbsId",
		data: param,
		done: function(result) {
			if(result.bbsId === 'ugcboard'){
				window.location.href = stPath + "galcamsLog/write/?eventNo=" + pblcEvtNo;
			}else{
				window.location.href = stPath + "community/" + result.bbsId + "/write/?eventNo=" + pblcEvtNo;
			}
		}
	}
	ajax.call(options);
}

/* E ----------@PIL(22.10.28) GCS 戮� 寃붾윭由�  */


//�ы몴�섍린 �좏깮
$(document).on("click", ".voteAnswer", function(){
	var title="";
	var html="";
	var checkCnt=0;

	$(this).parent().parent().find(".item").each(function(){
		if($(this).find("input").is(":checked") == true){
			if(title == ""){
				title=$(this).find("input").val();
			}
			checkCnt++;
		}
	});

	if(checkCnt == 0){
		$(this).parents(".dropOption").find("a").removeClass("right-add-icon");
		html += "			<span class='left-title'>�댁슜�� �뺤씤�섍퀬 �좏깮�댁＜�몄슂</span>";
	}else if(checkCnt == 1){
		$(this).parents(".dropOption").find("a").removeClass("right-add-icon").addClass("right-add-icon");
		html += "			<span class='left-title'>"+title+"</span>";
		html += "		<span class='round-icon-sky'>�좏깮 �꾨즺</span>";
	}else{
		checkCnt--;
		$(this).parents(".dropOption").find("a").removeClass("right-add-icon").addClass("right-add-icon");
		html += "			<span class='left-title'>"+title+"</span>";
		html += "			<em class='others-num'>�� "+checkCnt+"媛�</em>";
		html += "		<span class='round-icon-sky'>�좏깮 �꾨즺</span>";
	}
	$(this).parents(".dropOption").find("a").empty().append(html);
});

//�좊뱶釉뚮┃�� �몄텧
function adbrixCustomEvent(ttl, evtNo, clickTime){
	var eventName = "";
	var userAgent=navigator.userAgent.toUpperCase();
	//�좊뱶釉뚮┃�� customEvent
	if(window.secapp !== undefined && userAgent.indexOf("SECAPP") > -1){
		if(clickTime == "success"){
			eventName = "enter_event_" + String(evtNo);
		}else{
			eventName = "click_event_" + String(evtNo);
		}
    	var eventParam = {
    		eventName : eventName
    	  , attrModel : {
    		      eventNm : ttl,
    		      service_id : "GCS"
    		}
    	};
		window.secapp.customEvent(JSON.stringify(eventParam));
	}	
}