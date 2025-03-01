/**
 * 援щℓ�섍린(crawling)_�⑥씪嫄�
 * @param mdlCode 紐⑤뜽肄붾뱶
 */
function crawlingBuyDirect(mdlCode) {
	buyDirect(mdlCode, "_self");
};

/**
 * 援щℓ�섍린(crawling)_�⑥씪嫄� - target 異붽�
 * @param mdlCode 紐⑤뜽肄붾뱶
 * @param target ��寃�
 */
function buyDirect(mdlCode, target) {
	// URL - stContextPath �곸슜 
	var stContextPath = $("#viewStContextPath").val();
	
	if (mdlCode === null || mdlCode === undefined
			|| $.trim(mdlCode).length == 0) {
		var alertData = {
			title : "",
			content : "紐⑤뜽肄붾뱶媛� �놁뒿�덈떎.",
			callBack : "",
			btnText : "�뺤씤"
		};
		commonAlert(alertData);
		openLayer('commonAlert');
		return false;
	}

	var goodsId;

	var option = {
		url : stContextPath+"/xhr/bespoke/goodsIdsAjax",
		dataType : "json",
		type : "POST",
		async : false,
		data : {
			bspkGrpKeys : mdlCode
		},
		success : function(result) {

			if (result.exCode !== null && result.exCode !== undefined) {
				var alertData = {
					title : "",
					content : "�곹뭹�� 以�鍮꾩쨷�낅땲��.",
					callBack : "",
					btnText : "�뺤씤"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return false;
			} else {
				if (result.goodsIdList != null) {
					goodsId = result.goodsIdList[0];
				}
			}

		},
		error : function(response, status, error) {
			var alertData = {
				title : "",
				content : "�ㅻ쪟",
				callBack : "",
				btnText : "�뺤씤"
			};
			commonAlert(alertData);
			openLayer('commonAlert');
			return false;
		},
		beforeSend : function(xhr) {
			xhr.setRequestHeader("ajax", true);
		},
		complete : function() {
		}

	};

	$.ajax(option);

	if (goodsId !== null && goodsId !== undefined) {
		var reqData = {
			goodsIds : goodsId,
			stGbCd : "${view.stGbCd}",
			stId : "${view.stId}",
			mbrNo : "${session.mbrNo}",
			nowBuyYn : "Y",
			buyQtys : 1,
			orderType : "ONCE",
		};

		var nowBuyOptions = {
			url : stContextPath+"/xhr/order/insertCart",
			dataType : "json",
			type : "POST",
			data : reqData,
			success : function(result) {

				if (result.exCode !== null && result.exCode !== undefined) {
					var alertData = {
						title : "",
						content : result.exMsg,
						callBack : "",
						btnText : "�뺤씤"
					};
					commonAlert(alertData);
					openLayer('commonAlert');
					return false;
				} else {
					var form = document.createElement('form');

					form.setAttribute('action', stContextPath+"order/");
					form.setAttribute('target', target);
					form.setAttribute('method', 'post');

					document.body.appendChild(form);
					form.submit();
				}

			},
			error : function(response, status, error) {
				var alertData = {
					title : "",
					content : "�ㅻ쪟",
					callBack : "",
					btnText : "�뺤씤"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return false;
			},
			beforeSend : function(xhr) {
				xhr.setRequestHeader("ajax", true);
			},
			complete : function() {
			}
		};
		$.ajax(nowBuyOptions);
	}
};

/**
 * 援щℓ�섍린_蹂듭닔嫄� (紐⑤뜽肄붾뱶)
 * @param mdlList
 */
function fnBuyDirect(mdlList) {

	// URL - stContextPath �곸슜 
	var stContextPath = $("#viewStContextPath").val();
	
	console.log("mdlList 222222=====> " + JSON.stringify(mdlList));

	// @ Test 紐⑤뜽肄붾뱶 由ъ뒪��
	// @ ex: { mdlCode:�곹뭹紐⑤뜽肄붾뱶, qty:�섎웾, compNo:�낆껜踰덊샇(@�룹뺨湲곗�: [312:�쇱꽦�꾩옄�쒓뎅珥앷큵],[313:�쇱꽦�먮ℓ二쇱떇�뚯궗],[0:�놁쓬]) }
	// var mdlList = [
	// { mdlCode:"SM-G986NZPAKOO", qty:2, compNo:312 },
	// { mdlCode:"SM-N976NZSEKOO", qty:4, compNo:313 },
	// { mdlCode: "RF85T98A2AP", qty:1, compNo:313, bespokeYn:"Y", pannelCode:"RA-F18DUU32|RA-F18DUU38|RA-F18DBB35|RA-F18DBB38" }
	// ];

	// @ �곹뭹�꾩씠�� 議고쉶瑜� �꾪븳 紐⑤뜽肄붾뱶 諛� �낆껜 由ъ뒪��(String)
	// @ searchMdlParams: SM-G986NZPAKOO^SM-N976NZSEKOO^...
	// @ searchCompNoParams: 000^312^313...
	var searchMdlParams = "";
	var searchCompNoParams = "";

	// @ �섎웾 由ъ뒪��
	var qtyList = new Array();

	// �몃젅�대뱶�� 由ъ뒪��
	var tradeInList = new Array();
	// @ Validate Check
	if (0 < mdlList.length) {
		var mdlCodeI = "";
		var qtyI = 0;
		var compNoI = "";
		var content = "";
		var goodsOrdTpCd = "";
		var galaxyClubTpCd = "";
		var bespokeYnI = "";
		var bspkPannelCodeI = "";
		var bspkPannelCodeListI = "";

		for (var i = 0; i < mdlList.length; i++) {
			mdlCodeI = mdlList[i].mdlCode;
			qtyI = mdlList[i].qty;
			
			// �낆껜踰덊샇 泥댄겕
			if (mdlList[i].compNo === null || mdlList[i].compNo === undefined || $.trim(mdlList[i].compNo).length == 0) {
				compNoI = 0;
			}else{
				compNoI = mdlList[i].compNo;
			}
			
			// 鍮꾩뒪�ы겕�щ� 泥댄겕
			if (mdlList[i].bespokeYn === null || mdlList[i].bespokeYn === undefined ) {
				bespokeYnI = "N";
			} else {
				bespokeYnI = mdlList[i].bespokeYn;
			}

			// 紐⑤뜽肄붾뱶 泥댄겕
			if (mdlCodeI === null || mdlCodeI === undefined || $.trim(mdlCodeI).length == 0) {
				if( bespokeYnI == "Y") {
					content = "紐⑤뜽�� �좏깮�섏� �딆븯�듬땲��.<br/>�좏깮 �꾨즺 �� 援щℓ�� 二쇱떆湲� 諛붾엻�덈떎.";
				}else{
					content = "紐⑤뜽肄붾뱶瑜� �뺤씤�섏뿬 二쇱떆湲� 諛붾엻�덈떎."
				}
			}
			
			// �섎웾 泥댄겕
			if (qtyI === null || qtyI === undefined || qtyI < 1) {
				content = "�섎웾�� �뺤씤�섏뿬 二쇱떆湲� 諛붾엻�덈떎."
			}
			
			// 鍮꾩뒪�ы겕 �⑤꼸 �섎웾 泥댄겕
			if( bespokeYnI == "Y" ) {
				
				bspkPannelCodeI = mdlList[i].pannelCode;
				bspkPannelCodeListI = mdlList[i].pannelCode.split("|");
				
				var mdlOptions = {
					url: stContextPath+"/xhr/bespoke/bespokeModelType",
					dataType : 'json',
					type : 'POST',
					async : false,
					data : {
						mdlCode : mdlCodeI
					},
					success : function(result) {
						
						// �⑤꼸 �섎웾 泥댄겕 - 1door, 2door, 3door, 4door (�⑤�由ы뿀釉�(21)�� �⑤꼸 3媛� �좏깮�쇰줈, 3door type seq�� �ы븿)
						var oneDoorTypeSeq = ["4", "5", "6", "8"];
						var twoDoorTypeSeq = ["3"];
						var threeDoorTypeSeq = ["7", "9", "21"];
						var pannelReqLength = 0;
						
						if(oneDoorTypeSeq.indexOf(result.typeSeq) > -1) {
							pannelReqLength = 1;
						} else if(twoDoorTypeSeq.indexOf(result.typeSeq) > -1) {
							pannelReqLength = 2;
						} else if(threeDoorTypeSeq.indexOf(result.typeSeq) > -1) {
							pannelReqLength = 3;
						} else {
							pannelReqLength = 4;
						}
						
						if(bspkPannelCodeListI == "" || bspkPannelCodeListI == undefined || bspkPannelCodeListI == null) {
							content = "而щ윭媛� �좏깮�섏� �딆븯�듬땲��.<br/>�좏깮 �꾨즺 �� 援щℓ�� 二쇱떆湲� 諛붾엻�덈떎.";
						} else if(bspkPannelCodeListI.length < pannelReqLength) {
							content = "紐⑤뱺 而щ윭媛� �좏깮�섏� �딆븯�듬땲��.<br/>�좏깮 �꾨즺 �� 援щℓ�� 二쇱떆湲� 諛붾엻�덈떎.";
						}
						
						// 紐⑤뜽肄붾뱶 諛� �섎웾 �댁긽 �덉쓣�� alert
						if (content !== "") {
							var alertData = {
								title : "",
								content : content,
								callBack : "",
								btnText : "�뺤씤"
							};
							commonAlert(alertData);
							openLayer('commonAlert');
							return false;
						} else {
							var bspkCodes = mdlCodeI + "|" + bspkPannelCodeI;
							buyfixedMatchAjax(bspkCodes, qtyI, 'buy', '');
						}
						return false;
					}
					, error: function() {
						var alertData = {
							title : "",
							content : "�곗씠�� �뺤씤�� �꾩슂�⑸땲��.",
							callBack : "",
							btnText : "�뺤씤"
						};
						commonAlert(alertData);
						openLayer('commonAlert');
						return false;
					}
				}
				$.ajax(mdlOptions);
				
				return false;

			} else {
				mdlList[i].pannelCode = "";
				bspkPannelCodeI = mdlList[i].pannelCode;
				bspkPannelCodeListI = mdlList[i].pannelCode.split("|");
				
				// ---- �몃젅�대뱶�� 援щℓ 愿��� start;
				//�몃젅�대뱶��
				if(mdlList[i].tradeIn == "Y") {
					goodsOrdTpCd = "TRD";
				}else if(mdlList[i].ceTradeIn == "Y"){
					goodsOrdTpCd = "CETRD";
				}else{
					// �몃젅�대뱶�� / 媛ㅻ윮�� �대읇 �곹뭹�� �섎굹留� 援щℓ 媛��ν븯誘�濡� �뚮씪硫뷀꽣 珥덇린�� ��젣
					//goodsOrdTpCd = "";
				}
				
				if(mdlList[i].galaxyClub == "Y") {
					goodsOrdTpCd += "GC";
					if (mdlList[i].galaxyClubTpCd === null || mdlList[i].galaxyClubTpCd === undefined || $.trim(mdlList[i].galaxyClubTpCd).length == 0) {
						content = "媛ㅻ윮�� �대읇 罹좏럹�� 肄붾뱶瑜� �뺤씤�섏뿬 二쇱떆湲� 諛붾엻�덈떎.";
					} else {
						galaxyClubTpCd = mdlList[i].galaxyClubTpCd;
					}
				}
				
				// TradeIn, GalaxyClub �곹뭹�� 2媛� �댁긽�� 寃쎌슦 �덉쇅泥섎━
				if (goodsOrdTpCd != "" && i > 0) {
					content = "�몃젅�대뱶�� / 媛ㅻ윮�� �대읇 �곹뭹�� �쒓컻留� 援щℓ 媛��ν빀�덈떎.";
				}
				
				console.log("goodsOrdTpCd=====> " + goodsOrdTpCd);
				// ---- �몃젅�대뱶�� 援щℓ 愿��� end;

				// 紐⑤뜽肄붾뱶 諛� �섎웾 �댁긽 �덉쓣�� alert
				if (content !== "") {
					var alertData = {
						title : "",
						content : content,
						callBack : "",
						btnText : "�뺤씤"
					};
					commonAlert(alertData);
					openLayer('commonAlert');
					return false;
				} else {
					// 紐⑤뜽肄붾뱶 �뺤젣
					if (i !== (mdlList.length - 1)) {
						searchMdlParams += mdlCodeI + "^";
						searchCompNoParams += compNoI + "^";
					} else {
						searchMdlParams += mdlCodeI;
						searchCompNoParams += compNoI;
					}
					// �섎웾 �뺤젣
					qtyList.push(qtyI);
					
					tradeInList.push(goodsOrdTpCd);
				}
			}
		}
	} else {
		var alertData = {
			title : "",
			content : "�곗씠�� �뺤씤�� �꾩슂�⑸땲��.",
			callBack : "",
			btnText : "�뺤씤"
		};
		commonAlert(alertData);
		openLayer('commonAlert');
		return false;
	}
	
	// @ �곹뭹�꾩씠�� 由ъ뒪��
	var goodsIdList = [];
	// @ �곹뭹�꾩씠�� 議고쉶
	var option = {
		url : stContextPath+"/xhr/bespoke/goodsIdsAjax",
		dataType : "json",
		type : "POST",
		async : false,
		data : {
			bspkGrpKeys : searchMdlParams,
			compNos : searchCompNoParams
		},
		success : function(result) {

			if (result.exCode !== null && result.exCode !== undefined) {
				var alertData = {
					title : "goodsIdsAjax",
					content : result.exMsg,
					callBack : "",
					btnText : "�뺤씤"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return false;
			} else {
				if (result.goodsIdList !== null) {
					goodsIdList = result.goodsIdList;
				}
			}

		},
		error : function(response, status, error) {
			var alertData = {
				title : "goodsIdsAjax.err",
				content : "�ㅻ쪟",
				callBack : "",
				btnText : "�뺤씤"
			};
			commonAlert(alertData);
			openLayer('commonAlert');
			return false;
		},
		beforeSend : function(xhr) {
			xhr.setRequestHeader("ajax", true);
		},
		complete : function() {
		}
	};
	$.ajax(option);

	// @ Cart Insert
	if (goodsIdList !== null && goodsIdList !== undefined
			&& goodsIdList.length > 0) {
		
		// @ goodsIds, buyQtys�� 諛곗뿴媛믪쓣 String�쇰줈 �섍꺼二쇱� �딆쑝硫� 而⑦듃濡ㅻ윭�먯꽌 param�� null濡� 諛쏆븘�몄꽌 String泥섎━,
		var reqData = {
			goodsIds : String(goodsIdList),
			nowBuyYn : "Y",
			buyQtys : String(qtyList),
			orderType : "ONCE",
			goodsOrdTpCd : String(tradeInList),
			galaxyClubTpCd : galaxyClubTpCd
		};			

		var orderUrl = stContextPath + "order/";
		
		var nowBuyOptions = {
			url : stContextPath+"/xhr/order/insertCart",
			dataType : "json",
			type : "POST",
			data : reqData,
			success : function(result) {
				if (result.exCode !== null && result.exCode !== undefined) {
					var alertData = {
						title : "insertCart",
						content : result.exMsg,
						callBack : "",
						btnText : "�뺤씤"
					};
					commonAlert(alertData);
					openLayer('commonAlert');
					return false;
				} else {
					if(tradeInList.includes('CETRD') || tradeInList.includes('TRD')) { // TradeIn 泥댄겕
						if (fnChkLogin("援щℓ�섍린", orderUrl)) { // 濡쒓렇�� 泥댄겕
							location.href= orderUrl;
						}
					} else if(tradeInList.includes('GC') || tradeInList.includes('TRDGC')) { // GalaxyClub 泥댄겕
						fnChkGalaxyClub(reqData);	// 濡쒓렇�� 泥댄겕 & 硫ㅻ쾭�� 泥댄겕
					} else {
						// @ 二쇰Ц �섏씠吏�濡�..
						var form = document.createElement('form');
						form.setAttribute('action', orderUrl);
						form.setAttribute('target', "_self");
						form.setAttribute('method', 'post');
						document.body.appendChild(form);
						form.submit();
					}
				}
			},
			error : function(response, status, error) {
				var alertData = {
					title : "insertCart.err",
					content : "�ㅻ쪟",
					callBack : "",
					btnText : "�뺤씤"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return false;
			},
			beforeSend : function(xhr) {
				xhr.setRequestHeader("ajax", true);
			},
			complete : function() {
			}
		};
		$.ajax(nowBuyOptions);
	}

};

// bespoke buyAjax
var buyAjax = function (data) {
	// URL - stContextPath �곸슜 
	var stContextPath = $("#viewStContextPath").val();
    var ids = '';

    var option1 = {
        url: stContextPath+"/xhr/bespoke/goodsIdsAjax",
        dataType: "json",
        type: "POST",
        async: false,
        data: {bspkGrpKeys : data},
        success: function (result) {

        	if(typeof(result.exCode) !== 'undefined') {
                var alertData ={
                    title : ""
                    , content : "�곹뭹�� 以�鍮꾩쨷�낅땲��."
                    , callBack : ""
                    , btnText : "�뺤씤"
                };
                commonAlert(alertData);
                openLayer('commonAlert');
                return false;
            } else {
                ids =  JSON.stringify(result.goodsIdList);
            }
        },
        error: function (response, status, error) {
            alert('�ㅻ쪟');
            return false;
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("ajax", true);
        },
        complete: function () { }
    };
    $.ajax(option1);

    if(ids != '') {
        var option = {
            url: stContextPath+"/xhr/order/insertCart",
            dataType: "json",
            type: "POST",
            data: {
                nowBuyYn : 'Y',
                bspkGrpKeys : data,
                goodsIds : ids
            },
            success: function (result) {

            	if(typeof(result.exCode) !== 'undefined') {
                    var alertData ={
                        title : ""
                        , content : result.exMsg
                        , callBack : ""
                        , btnText : "�뺤씤"
                    };
                    commonAlert(alertData);
                    openLayer('commonAlert');
                    return false;
                } else {
                    var form = document.createElement('form');
                    form.setAttribute('action', stContextPath+"order/");
                    form.setAttribute('target', "_self");
                    form.setAttribute('method', 'post');

                    document.body.appendChild(form);
                    form.submit();
                }

            },
            error: function (response, status, error) {
                alert('�ㅻ쪟');
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ajax", true);
            },
            complete: function () { }
        };
        $.ajax(option);
    }

};

/**
 * �λ컮援щ땲_蹂듭닔嫄� (紐⑤뜽肄붾뱶)
 * @param mdlList
 */
function fnCartDirect(mdlList, cartCallMethod) {
	
	// URL - stContextPath �곸슜
	var stContextPath = $("#viewStContextPath").val();
	console.log("mdlList=====> " + JSON.stringify(mdlList));

	// @ Test 紐⑤뜽肄붾뱶 由ъ뒪��
	// @ ex: { mdlCode:�곹뭹紐⑤뜽肄붾뱶, qty:�섎웾, compNo:�낆껜踰덊샇(@�룹뺨湲곗�: [312:�쇱꽦�꾩옄�쒓뎅珥앷큵],[313:�쇱꽦�먮ℓ二쇱떇�뚯궗],[0:�놁쓬]), bespokeYn:鍮꾩뒪�ы겕�щ�, pannelCode:鍮꾩뒪�ы겕�쇰븣 �⑤꼸肄붾뱶 }
	// var mdlList = [
	// { mdlCode:"SM-G986NZPAKOO", qty:2, compNo:312 },
	// { mdlCode:"SM-N976NZSEKOO", qty:4, compNo:313 },
	// { mdlCode: "RF85T98A2AP", qty:1, compNo:313, bespokeYn:"Y", pannelCode:"RA-F18DUU32|RA-F18DUU38|RA-F18DBB35|RA-F18DBB38" }
	// ];
	
	// cartCallMethod : �λ컮援щ땲 �대룞 �щ� �뺤씤 �뚮씪誘명꽣
	// var cartCallMethod = "move" (default) �λ컮援щ땲 �대룞
	//						"confirm" �숈씪�� �곹뭹 �뺤씤 / �λ컮援щ땲 �대룞 �앹뾽 �꾩슦湲�

	// @ �곹뭹�꾩씠�� 議고쉶瑜� �꾪븳 紐⑤뜽肄붾뱶 諛� �낆껜 由ъ뒪��(String)
	// @ searchMdlParams: SM-G986NZPAKOO^SM-N976NZSEKOO^...
	// @ searchCompNoParams: 000^312^313...
	var searchMdlParams = "";
	var searchCompNoParams = "";

	// @ �섎웾 由ъ뒪��
	var qtyList = new Array();

		
	// @ Validate Check
	if (0 < mdlList.length) {
		var mdlCodeI = "";
		var qtyI = 0;
		var compNoI = "";
		var content = "";
		var bespokeYnI = "";
		var bspkPannelCodeI = "";
		var bspkPannelCodeListI = "";
		
		for (var i = 0; i < mdlList.length; i++) {
			mdlCodeI = mdlList[i].mdlCode;
			qtyI = mdlList[i].qty;

			// �낆껜踰덊샇 泥댄겕
			if (mdlList[i].compNo === null || mdlList[i].compNo === undefined || $.trim(mdlList[i].compNo).length == 0) {
				compNoI = 0;
			}else{
				compNoI = mdlList[i].compNo;
			}
			
			// 鍮꾩뒪�ы겕�щ� 泥댄겕
			if (mdlList[i].bespokeYn === null || mdlList[i].bespokeYn === undefined ) {
				bespokeYnI = "N";
			} else {
				bespokeYnI = mdlList[i].bespokeYn;
			}

			// 紐⑤뜽肄붾뱶 泥댄겕
			if (mdlCodeI === null || mdlCodeI === undefined || $.trim(mdlCodeI).length == 0) {
				if( bespokeYnI == "Y") {
					content = "紐⑤뜽�� �좏깮�섏� �딆븯�듬땲��.<br/>�좏깮 �꾨즺 �� 援щℓ�� 二쇱떆湲� 諛붾엻�덈떎.";
				}else{
					content = "紐⑤뜽肄붾뱶瑜� �뺤씤�섏뿬 二쇱떆湲� 諛붾엻�덈떎."
				}
			}
			
			// �섎웾 泥댄겕
			if (qtyI === null || qtyI === undefined || qtyI < 1) {
				content = "�섎웾�� �뺤씤�섏뿬 二쇱떆湲� 諛붾엻�덈떎."
			}
			
			// 鍮꾩뒪�ы겕 �⑤꼸 �섎웾 泥댄겕
			if( bespokeYnI == "Y" ) {
				bspkPannelCodeI = mdlList[i].pannelCode;
				bspkPannelCodeListI = mdlList[i].pannelCode.split("|");
				
				var mdlOptions = {
					url: stContextPath+"/xhr/bespoke/bespokeModelType",
					dataType : 'json',
					type : 'POST',
					async : false,
					data : {
						mdlCode : mdlCodeI
					},
					success : function(result) {
						
						// �⑤꼸 �섎웾 泥댄겕 - 1door, 2door, 3door, 4door (�⑤�由ы뿀釉�(21)�� �⑤꼸 3媛� �좏깮�쇰줈, 3door type seq�� �ы븿)
						var oneDoorTypeSeq = ["4", "5", "6", "8"];
						var twoDoorTypeSeq = ["3"];
						var threeDoorTypeSeq = ["7", "9", "21"];
						var pannelReqLength = 0;
						
						if(oneDoorTypeSeq.indexOf(result.typeSeq) > -1) {
							pannelReqLength = 1;
						} else if(twoDoorTypeSeq.indexOf(result.typeSeq) > -1) {
							pannelReqLength = 2;
						} else if(threeDoorTypeSeq.indexOf(result.typeSeq) > -1) {
							pannelReqLength = 3;
						} else {
							pannelReqLength = 4;
						}
						
						if(bspkPannelCodeListI == "" || bspkPannelCodeListI == undefined || bspkPannelCodeListI == null) {
							content = "而щ윭媛� �좏깮�섏� �딆븯�듬땲��.<br/>�좏깮 �꾨즺 �� 援щℓ�� 二쇱떆湲� 諛붾엻�덈떎.";
						} else if(bspkPannelCodeListI.length < pannelReqLength) {
							content = "紐⑤뱺 而щ윭媛� �좏깮�섏� �딆븯�듬땲��.<br/>�좏깮 �꾨즺 �� 援щℓ�� 二쇱떆湲� 諛붾엻�덈떎.";
						}
						
						// 紐⑤뜽肄붾뱶 諛� �섎웾 �댁긽 �덉쓣�� alert
						if (content !== "") {
							var alertData = {
								title : "",
								content : content,
								callBack : "",
								btnText : "�뺤씤"
							};
							commonAlert(alertData);
							openLayer('commonAlert');
							return false;
						} else {
							var bspkCodes = mdlCodeI + "|" + bspkPannelCodeI;
							buyfixedMatchAjax(bspkCodes, qtyI, 'cart', cartCallMethod);
						}
						return false;
					}
					, error : function() {
						var alertData = {
							title : "",
							content : "�곗씠�� �뺤씤�� �꾩슂�⑸땲��.",
							callBack : "",
							btnText : "�뺤씤"
						};
						commonAlert(alertData);
						openLayer('commonAlert');
						return false;
					}
				}
				$.ajax(mdlOptions);
				
				return false;
				
			} else  {
				
				mdlList[i].pannelCode = "";
				bspkPannelCodeI = mdlList[i].pannelCode;
				bspkPannelCodeListI = mdlList[i].pannelCode.split("|");
				
				// 紐⑤뜽肄붾뱶 諛� �섎웾 �댁긽 �덉쓣�� alert
				if (content !== "") {
					var alertData = {
						title : "",
						content : content,
						callBack : "",
						btnText : "�뺤씤"
					};
					commonAlert(alertData);
					openLayer('commonAlert');
					return false;
				} else {
					// 紐⑤뜽肄붾뱶 �뺤젣
					if (i !== (mdlList.length - 1)) {
						searchMdlParams += mdlCodeI + "^";
						searchCompNoParams += compNoI + "^";
					} else {
						searchMdlParams += mdlCodeI;
						searchCompNoParams += compNoI;
					}
					// �섎웾 �뺤젣
					qtyList.push(qtyI);
				}
			}
			
		}
		
	} else {
		var alertData = {
			title : "",
			content : "�곗씠�� �뺤씤�� �꾩슂�⑸땲��.",
			callBack : "",
			btnText : "�뺤씤"
		};
		commonAlert(alertData);
		openLayer('commonAlert');
		return false;
	}
	
	//�쇰컲�곹뭹 goodsId 議고쉶
	getGoodsIds(searchMdlParams, searchCompNoParams, qtyList, cartCallMethod);
};

function getGoodsIds(searchMdlParams, searchCompNoParams, qtyList, cartCallMethod) {

	// @ �곹뭹�꾩씠�� 由ъ뒪��
	var goodsIdList = [];
	
	// URL - stContextPath �곸슜 
	var stContextPath = $("#viewStContextPath").val();
	
	// @ �곹뭹�꾩씠�� 議고쉶
	var option = {
		url : stContextPath + "xhr/bespoke/goodsIdsAjax",
		dataType : "json",
		type : "POST",
		async : false,
		data : {
			bspkGrpKeys : searchMdlParams,
			compNos : searchCompNoParams
		},
		success : function(result) {
			if (result.exCode !== null && result.exCode !== undefined) {
				var alertData = {
					title : "",
					content : result.exMsg,
					callBack : "",
					btnText : "�뺤씤"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return false;
			} else {
				if (result.goodsIdList !== null) {
					goodsIdList = result.goodsIdList;
				}
				//�쇰컲�곹뭹 �λ컮援щ땲 goodsCnt 議고쉶
				goodsCntCart(goodsIdList, qtyList, cartCallMethod);
			}

		},
		error : function(response, status, error) {
			var alertData = {
				title : "",
				content : "�ㅻ쪟",
				callBack : "",
				btnText : "�뺤씤"
			};
			commonAlert(alertData);
			openLayer('commonAlert');
			return false;
		},
		beforeSend : function(xhr) {
			xhr.setRequestHeader("ajax", true);
		},
		complete : function() {
		}
	};
	$.ajax(option);
	
}

function goodsCntCart(goodsIdList, qtyList, cartCallMethod) {
	// @ Cart Insert
	if (goodsIdList !== null && goodsIdList !== undefined
			&& goodsIdList.length > 0) {
		// @ goodsIds, buyQtys�� 諛곗뿴媛믪쓣 String�쇰줈 �섍꺼二쇱� �딆쑝硫� 而⑦듃濡ㅻ윭�먯꽌 param�� null濡� 諛쏆븘�몄꽌 String泥섎━,
		var reqData = {
			goodsIds : String(goodsIdList),
			stGbCd : "${view.stGbCd}",
			stId : "${view.stId}",
			mbrNo : "${session.mbrNo}",
			nowBuyYn : "N",
			buyQtys : String(qtyList),
			orderType : "ONCE",
		};
		
		// URL - stContextPath �곸슜 
		var stContextPath = $("#viewStContextPath").val();
		
		if (cartCallMethod == "confirm") {
			var options = {
				url : stContextPath + "xhr/order/goodscnt"
				, data : reqData 
				, done : function(data){
					var cartCnt = data.goodsCnt;
					if ( cartCnt > 0 ) {
						let confirmData = {
							content : "�대� �숈씪�� �곹뭹�� �λ컮援щ땲�� �덉뒿�덈떎.</br>異붽��섏떆寃좎뒿�덇퉴?"
					        ,okBtnText : "�뺤씤"
					        ,cancelBtnText : "痍⑥냼"
				        };
						commonConfirm(confirmData);
						openLayer('commonConfirm');
						$("#closeCommonConfirmBtn").css("display", "none");
						
						$("#commonConfirmOkBtn").on('click' , function(){
							if($("#commonConfirmOkBtn").text() == "�뺤씤") {
								insertCartItemFn(reqData, cartCallMethod);
							}
						});
						$("#commonConfirmCancelBtn").on('click' , function(){
							//痍⑥냼
							return false;
						});
					} else {
						insertCartItemFn(reqData, cartCallMethod);
					}
				}
			};
			ajax.call(options);
		} else {
			insertCartItemFn(reqData, cartCallMethod);
		}
	}
}

function insertCartItemFn(reqData, cartCallMethod) {
	
	// URL - stContextPath �곸슜 
	var stContextPath = $("#viewStContextPath").val();
	
	var nowBuyOptions = {
			url : stContextPath + "xhr/order/insertCart",
			dataType : "json",
			type : "POST",
			data : reqData,
			async: false,
			success : function(result) {
				if (result.exCode !== null && result.exCode !== undefined) {
					var alertData = {
						title : "",
						content : result.exMsg,
						callBack : "",
						btnText : "�뺤씤"
					};
					commonAlert(alertData);
					openLayer('commonAlert');
					return false;
				} else {
					if(cartCallMethod == "confirm") {
						let confirmData = {
							content : "�쒗뭹�� �λ컮援щ땲�� 異붽��섏뿀�듬땲��.<br>�λ컮援щ땲濡� �대룞�섏떆寃좎뒿�덇퉴?"
						    ,okBtnText : "�쇳븨 怨꾩냽�섍린"
						    ,cancelBtnText : "�λ컮援щ땲 �대룞"
					    };
						commonConfirm(confirmData);
						openLayer('commonConfirm');
						$("#closeCommonConfirmBtn").css("display", "none");
						
						$("#commonConfirmOkBtn").on('click' , function(){
							//痍⑥냼
							return false;
						});
						
						$("#commonConfirmCancelBtn").on('click' , function(){
							if($("#commonConfirmCancelBtn").text() == "�λ컮援щ땲 �대룞") {
								location.href = stContextPath + "cart/";
							}
						});
						
					} else {
						location.href = stContextPath + "cart/";
					}
					return false;
				}
			},
			error : function(response, status, error) {
				var alertData = {
					title : "",
					content : "�ㅻ쪟",
					callBack : "",
					btnText : "�뺤씤"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return false;
			},
			beforeSend : function(xhr) {
				xhr.setRequestHeader("ajax", true);
			},
			complete : function() {
			}
		};
		$.ajax(nowBuyOptions);
		return false;
}

var buyfixedMatchAjax = function (dataParam, qtyList, type, cartCallMethod) { 
	// URL - stContextPath �곸슜 
	var stContextPath = $("#viewStContextPath").val();
    var self_ = this;
    var fixedmodel = "";
    var yesCallback = function () {
        buyAjax(fixedmodel + ':::1'); // 留ㅼ묶�쒗뭹 �덉쑝硫� 'Y' : fixedMdl援щℓ
    }
    
    dataParam = dataParam.replace(/\|/g, "^");
    
    var noCallback = function () {
        buyAjax(dataParam);
    }
    var coCallback = function () {
    }
    
    var params = {
        'storeCd': 'sec',
        'productCode': + dataParam
    };

    var option = {
        url: stContextPath+'/xhr/bespoke/fixedMatchAjax',
        dataType: "json",
        type: "POST",
        data: params,
        jsonpCallback: "jsonpcallback_bespoke",
        success: function (rtnjson) {
            var price1 = "0";
            var price2 = "0";

            if (rtnjson.fixedMatchResult.code == 'Y') {
                fixedmodel = rtnjson.fixedMatchResult.data.fixedMdl;
                price1 = controlNumber.numberWithCommas(selectPrice);
                price2 = controlNumber.numberWithCommas(rtnjson.fixedMatchResult.data.bPrice);
                
                popup.confirm8(1, '媛�寃⑸퉬援� �덈궡 諛� fixed �쒗뭹 援щℓ', price1, price2, yesCallback, noCallback, coCallback)
                return false;
            } else {
                if(type == 'cart'){
                	
                    cartAjax(dataParam, qtyList, cartCallMethod);
                } else {
                    buyAjax(dataParam);
                }
            }
        },
        error: function (response, status, error) {
            alert('fixedMatchAjax.�ㅻ쪟');
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("ajax", true);
        },
        complete: function () { }
    };

    $.ajax(option);
};

// bespoke cartAjax
var cartAjax = function (data, qtyList, cartCallMethod) {
	// URL - stContextPath �곸슜 
	var stContextPath = $("#viewStContextPath").val();
    var cartParam = "";
    var ids = '';

    var option1 = {
        url: stContextPath+"/xhr/bespoke/goodsIdsAjax",
        dataType: "json",
        type: "POST",
        async: false,
        data: {bspkGrpKeys : data},
        success: function (result) {
        	
            if(typeof(result.exCode) !== 'undefined') {
                var alertData ={
                    title : ""
                    , content : "�곹뭹�� 以�鍮꾩쨷�낅땲��."
                    , callBack : ""
                    , btnText : "�뺤씤"
                };
                commonAlert(alertData);
                openLayer('commonAlert');
                return false;
            } else {
                ids =  JSON.stringify(result.goodsIdList);
            }

        },
        error: function (response, status, error) {
            alert('�ㅻ쪟');
            return false;
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("ajax", true);
        },
        complete: function () { }
    };
    $.ajax(option1);

    goodsIdsTmp = ids.replace(/\"/g, '');
    goodsIdsTmp = goodsIdsTmp.replace("[", '');
    goodsIdsTmp = goodsIdsTmp.replace("]", '');
    var bspkGoodsIdsList = goodsIdsTmp.split(",");
    
    if (cartCallMethod == "confirm") {
		var options = {
			url : stContextPath+"/xhr/order/goodscnt"
			, data : {
				goodsIds: bspkGoodsIdsList, //蹂몄껜 goodsId�� �⑤꼸 goodsId瑜� list濡� �꾨떖
				nowBuyYn : "N",
				buyQtys : String(qtyList),
				orderType : "ONCE",
				bspkGrpKeys : data,
				bspkGoodsYn : "Y"
			}
			, done : function(resData){
				var cartCnt = resData.goodsCnt;
				
				if ( cartCnt > 0 ) {
					let confirmData = {
						content : "�대� �숈씪�� �곹뭹�� �λ컮援щ땲�� �덉뒿�덈떎.</br>異붽��섏떆寃좎뒿�덇퉴?"
				        ,okBtnText : "�뺤씤"
				        ,cancelBtnText : "痍⑥냼"
			        };
					commonConfirm(confirmData);
					openLayer('commonConfirm');
					$("#closeCommonConfirmBtn").css("display", "none");
					
					$("#commonConfirmOkBtn").on('click' , function(){
						if($("#commonConfirmOkBtn").text() == "�뺤씤") {
							insertBespokeCartFn(data, ids, cartCallMethod);
						}
					});
					$("#commonConfirmCancelBtn").on('click' , function(){
						//痍⑥냼
						return false;
					});
				} else {
					insertBespokeCartFn(data, ids, cartCallMethod);
				}
			}
		};
		ajax.call(options);
	} else {
		insertBespokeCartFn(data, ids, cartCallMethod);
	}

};

// bespoke insert cart
var insertBespokeCartFn = function(data, ids, cartCallMethod) {
	// URL - stContextPath �곸슜 
	var stContextPath = $("#viewStContextPath").val();
	
	 if(ids != '') {
	        var option = {
	            url: stContextPath+"/xhr/order/insertCart",
	            dataType: "json",
	            type: "POST",
	            data: {
	                nowBuyYn : 'N',
	                bspkGrpKeys : data,
	                goodsIds : ids
	            },
	            success: function (result) {
	            	
	                if(typeof(result.exCode) !== 'undefined') {
	                    var alertData ={
	                        title : ""
	                        , content : result.exMsg
	                        , callBack : ""
	                        , btnText : "�뺤씤"
	                    };
	                    commonAlert(alertData);
	                    openLayer('commonAlert');
	                    return false;
	                } else {
	                	
	                	if(cartCallMethod == "confirm") {
							let confirmData = {
								content : "�쒗뭹�� �λ컮援щ땲�� 異붽��섏뿀�듬땲��.<br>�λ컮援щ땲濡� �대룞�섏떆寃좎뒿�덇퉴?"
							    ,okBtnText : "�대룞"
							    ,cancelBtnText : "痍⑥냼"
						    };
							commonConfirm(confirmData);
							openLayer('commonConfirm');
							$("#closeCommonConfirmBtn").css("display", "none");
							
							$("#commonConfirmOkBtn").on('click' , function(){
								if($("#commonConfirmOkBtn").text() == "�대룞") {
									location.href = stContextPath+"cart/";
								}
							});
							
							$("#commonConfirmCancelBtn").on('click' , function(){
								//痍⑥냼
								return false;
							});
							
						} else {
							location.href = stContextPath+"cart/";
						}
						return false;
	                }

	            },
	            error: function (response, status, error) {
	                alert('�ㅻ쪟');
	            },
	            beforeSend: function (xhr) {
	                xhr.setRequestHeader("ajax", true);
	            },
	            complete: function () { }
	        };
	        $.ajax(option);
	    }
}

/**
 * �좊Ъ�섍린(crawling)_�⑥씪嫄� - target 異붽�
 * @param mdlCode 紐⑤뜽肄붾뱶
 * @param target ��寃�
 */
function presentDirect(mdlCode, target) {
	if (mdlCode === null || mdlCode === undefined
			|| $.trim(mdlCode).length == 0) {
		var alertData = {
			title : "",
			content : "紐⑤뜽肄붾뱶媛� �놁뒿�덈떎.",
			callBack : "",
			btnText : "�뺤씤"
		};
		commonAlert(alertData);
		openLayer('commonAlert');
		return false;
	}
	
	// URL - stContextPath �곸슜 
	var stContextPath = $("#viewStContextPath").val();
	var goodsId;

	var option = {
		url : stContextPath+"/xhr/bespoke/goodsIdsAjax",
		dataType : "json",
		type : "POST",
		async : false,
		data : {
			bspkGrpKeys : mdlCode
		},
		success : function(result) {

			if (result.exCode !== null && result.exCode !== undefined) {
				var alertData = {
					title : "",
					content : "�곹뭹�� 以�鍮꾩쨷�낅땲��.",
					callBack : "",
					btnText : "�뺤씤"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return false;
			} else {
				if (result.goodsIdList != null) {
					goodsId = result.goodsIdList[0];
				}
			}

		},
		error : function(response, status, error) {
			var alertData = {
				title : "",
				content : "�ㅻ쪟",
				callBack : "",
				btnText : "�뺤씤"
			};
			commonAlert(alertData);
			openLayer('commonAlert');
			return false;
		},
		beforeSend : function(xhr) {
			xhr.setRequestHeader("ajax", true);
		},
		complete : function() {
		}

	};

	$.ajax(option);

	if (goodsId !== null && goodsId !== undefined) {
		var reqData = {
			goodsIds : goodsId,
			stGbCd : "${view.stGbCd}",
			stId : "${view.stId}",
			mbrNo : "${session.mbrNo}",
			nowBuyYn : "Y",
			buyQtys : 1,
			orderType : "ONCE",
		};

		var nowBuyOptions = {
			url : stContextPath+"/xhr/order/insertCart",
			dataType : "json",
			type : "POST",
			data : reqData,
			success : function(result) {
				if (result.exCode !== null && result.exCode !== undefined) {
					var alertData = {
						title : "",
						content : result.exMsg,
						callBack : "",
						btnText : "�뺤씤"
					};
					commonAlert(alertData);
					openLayer('commonAlert');
					return false;
				} else {
					var msg = "�좊Ъ�섍린";
					
					if (fnChkLogin(msg, location.pathname)) {
						var cartId = document.createElement('input');
						
						cartId.setAttribute('name', "cartId");
						cartId.setAttribute('value', result.cartId);
						
						var presentYn = document.createElement('input');
						
						presentYn.setAttribute('name', "presentYn");
						presentYn.setAttribute('value', 'Y');
						
						var form = document.createElement('form');
						
						form.setAttribute('action', stContextPath+"present/presentSend/");
						form.setAttribute('target', target);
						form.setAttribute('method', 'post');

						form.appendChild(cartId);
						form.appendChild(presentYn);
						document.body.appendChild(form);
						form.submit();
					}
				}
			},
			error : function(response, status, error) {
				var alertData = {
					title : "",
					content : "�ㅻ쪟",
					callBack : "",
					btnText : "�뺤씤"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return false;
			},
			beforeSend : function(xhr) {
				xhr.setRequestHeader("ajax", true);
			},
			complete : function() {
			}
		};
		$.ajax(nowBuyOptions);
	}
};

/**
 * crawlingBuyDirectById : 援щℓ�섍린(crawling)_�⑥씪嫄� (�곹뭹�꾩씠��)
 * @param goodsId �곹뭹�꾩씠��
 */
function crawlingBuyDirectById(goodsId) {
	fnBuyDirectBySingleId(goodsId, "_self");
};



/**********************************************************************************************************
 * �곹뭹 �꾩씠�� 踰꾩쟾
 **********************************************************************************************************/

/**
 * fnChkLogin : 濡쒓렇�� �좏슚�� 寃���
 * @param msg : 援щℓ / �좊Ъ�섍린 ��
 * @param returnUrl : 二쇰Ц / �ㅻ줈媛�湲�
 */
function fnChkLogin(msg, returnUrl) {
	// URL - stContextPath �곸슜
	var stContextPath = $("#viewStContextPath").val();
	var ret = false;
	var options = {
		url : stContextPath+"/xhr/goods/loginCheck"
		, type: 'POST'
		, async : false
		, done : function(data) {
			if(!data.isLogin) {
				ret = false;
				let confirmData = {
					content : "濡쒓렇�� �� " + msg + "媛� 媛��ν빀�덈떎.<br/>濡쒓렇�� �섏떆寃좎뒿�덇퉴?"
					,okBtnText : "�뺤씤"
					,cancelBtnText : "痍⑥냼"
				};
				commonConfirm(confirmData);
				openLayer('commonConfirm');

				$("#closeCommonConfirmBtn").hide();

				$("#commonConfirmOkBtn").on('click' , function(){
					location.href= stContextPath + "member/indexLogin/?returnUrl=" + returnUrl;
					return false;
				});

				$("#commonConfirmCancelBtn").on('click' , function(){
					return false;
				});
			} else {
				ret = true;
			}
		}
	};
	ajax.call(options);
	return ret;
}

/**
 * fnChkGalaxyClub : Galaxy Club �좏슚�� 寃���
 * @param reqData : 罹좏럹�몄퐫��
 */
function fnChkGalaxyClub (reqData) {
	// URL - stContextPath �곸슜
	var stContextPath = $("#viewStContextPath").val();
	var ret = false;
	var options = {
		url : stContextPath+"xhr/goods/galaxyClubCheck"
		, type: 'POST'
		, data : reqData
		, async : false
		, done : function(data) {
			if(!data.isLogin) {
				let confirmData = {
					content : "濡쒓렇�� �댄썑 援щℓ�섍린媛� 媛��� �⑸땲��<br/>濡쒓렇�� �섏떆寃좎뒿�덇퉴?"
					,okBtnText : "�뺤씤"
					,cancelBtnText : "痍⑥냼"
				};
				commonConfirm(confirmData);
				openLayer('commonConfirm');

				$("#closeCommonConfirmBtn").hide();

				$("#commonConfirmOkBtn").on('click' , function(){
					location.href= stContextPath + "member/indexLogin/?returnUrl=" + location.pathname;
					return false;
				});

				$("#commonConfirmCancelBtn").on('click' , function(){
					return false;
				});
			} else {
				var alertMsg = "";
				// 硫ㅻ쾭�� 媛��� �щ�
				if(data.membershipNo != null){
					// 罹좏럹�� 媛��� �щ�
					if(data.isGalaxyCmpnYn != null){
						if(data.isGalaxyCmpnYn == 'N' && data.prgrStatCd == null){
							// 二쇰Ц�붾㈃
							location.href = stContextPath + "order/";
						}else if(data.isGalaxyCmpnYn == 'N' && data.prgrStatCd != null){
							if(data.prgrStatCd == '01'){// 媛��낆긽��:�묒닔
								alertMsg = "<span class='blue-color'>" + data.clubNm + "</span>��<br class='pc-ver'> 媛��낆떊泥�씠 吏꾪뻾 以묒씠誘�濡�<br class='pc-ver'> My 媛ㅻ윮�� �대읇 ���� �쒗뭹��<br class='pc-ver'> 異붽� 援щℓ�� �� �놁뒿�덈떎.";
							}else if(data.prgrStatCd == '02'){// 媛��낆긽��:媛��낅�湲�
								alertMsg = "<span class='blue-color'>" + data.clubNm + "</span>��<br class='pc-ver'> 媛��낆떊泥�씠 �꾨즺�섏뿀�쇰�濡�<br class='pc-ver'> My 媛ㅻ윮�� �대읇 ���� �쒗뭹��<br class='pc-ver'> 異붽� 援щℓ�� �� �놁뒿�덈떎.";
							}else if(data.prgrStatCd == '03'){// 媛��낆긽��:媛��낆셿猷�
								alertMsg = "<span class='blue-color'>" + data.clubNm + "</span>��<br class='pc-ver'> 媛��낆씠 �꾨즺�섏뿀�쇰�濡�<br class='pc-ver'> My 媛ㅻ윮�� �대읇 ���� �쒗뭹��<br class='pc-ver'> 異붽� 援щℓ�� �� �놁뒿�덈떎.";
							}
						}else{
							alertMsg = "�대� <span class='blue-color'>" + data.clubNm + "</span>��<br class='pc-ver'> �ы븿�섏뼱 �덈뒗 �쒗뭹�� 援щℓ�섏뀲�듬땲��.<br>"
								+ "�숈씪 " + data.clubNm + "��<br class='pc-ver'> �ы븿�섏뼱 �덈뒗 �쒗뭹��<br class='pc-ver'> �뚯썝 1�몃떦 1��留� 援щℓ 媛��ν빀�덈떎.";
						}
						// pop alert msg
						if (alertMsg != "") {
							let confirmData = {
								content : alertMsg
								,cancelBtnText : "�リ린"
							};
							commonConfirm(confirmData);
							openLayer('commonConfirm');

							$("#commonConfirmOkBtn").hide();

							$("#commonConfirmCancelBtn").on('click' , function(){
								return false;
							});
							return ret;
						}
					}
				}else{
					let confirmData = {
						content : "My 媛ㅻ윮�� �대읇 �쒗뭹�� 援щℓ�섏떆�ㅻ㈃<br class='pc-ver'> 硫ㅻ쾭�� �뚯썝�쇰줈 癒쇱� 媛��낇븯�붿빞 �⑸땲��.<br>硫ㅻ쾭�� �뚯썝�쇰줈 媛��� �섏떆寃좎뒿�덇퉴?"
						,okBtnText : "�뺤씤"
						,cancelBtnText : "痍⑥냼"
					};
					commonConfirm(confirmData);
					openLayer('commonConfirm');

					$("#commonConfirmOkBtn").on('click' , function(){
						location.href=stContextPath+"membership/point/";
						return false;
					});

					$("#commonConfirmCancelBtn").on('click' , function(){
						return false;
					});
					return ret;
				}
				ret = true;
			}

		}
	};
	ajax.call(options);
	return ret;
}

/**
 * fnCheckGoodsStatus : �곹뭹 �먮ℓ �곹깭 泥댄겕
 * @param goodsIdParam �곹뭹�꾩씠��
 */
function fnCheckGoodsStatus(goodsIdParam) {
	var stContextPath = $("#viewStContextPath").val();
	var goodsIdList = [];
	var checkOption = {
		url : stContextPath+"xhr/goods/checkGoodsStatus",
		dataType : "json",
		type : "POST",
		async : false,
		data : {
			grpKeys : goodsIdParam
		},
		success : function(result) {
			if (result.exCode !== null && result.exCode !== undefined) {
				fnAlertMessage("�곹뭹�� 以�鍮꾩쨷�낅땲��.");
				return false;
			} else {
				if (result != null) {
					goodsIdList = result;
				}
			}
		},
		error : function(response, status, error) {
			fnAlertMessage("[�ㅻ쪟] goodsIdsAjax");
			return false;
		},
		beforeSend : function(xhr) {
			xhr.setRequestHeader("ajax", true);
		},
		complete : function() {
		}
	};

	$.ajax(checkOption);
	return goodsIdList;
}

/**
 * fnAlertMessage : �뚮┝硫붿꽭吏�
 * @param alertMsg 硫붿꽭吏� �댁슜
 */
function fnAlertMessage(alertMsg) {
	var alertData = {
		title : "",
		content : alertMsg,
		callBack : "",
		btnText : "�뺤씤"
	};
	commonAlert(alertData);
	openLayer('commonAlert');
}

/**
 * fnInsertCart : �λ컮援щ땲 �깅줉
 * @param reqData ->
 goodsIds : goodsIdList,
 nowBuyYn : 援щℓ�섍린 �щ�,
 buyQtys : �섎웾,
 orderType : "ONCE"
 */
function fnInsertCart(reqData) {
	var stContextPath = $("#viewStContextPath").val();
	var cartResult = null;
	var nowBuyOptions = {
		url : stContextPath+"/xhr/order/insertCart",
		dataType : "json",
		type : "POST",
		data : reqData,
		async : false,
		success : function(result) {
			if (result.exCode !== null && result.exCode !== undefined) {
				fnAlertMessage(result.exMsg);
				return false;
			} else {
				cartResult = result;

				if("N" === reqData.nowBuyYn) {
					if("confirm" === reqData.cartCallMethod) {
						let confirmData = {
							content : "�쒗뭹�� �λ컮援щ땲�� 異붽��섏뿀�듬땲��.<br>(�꾩옱 珥� " +result.cartCnt + "媛쒖쓽 �쒗뭹�� �λ컮援щ땲�� �닿꼈�듬땲��.)"
							,okBtnText : "�쇳븨 怨꾩냽�섍린"
							,cancelBtnText : "�λ컮援щ땲 �대룞"
						};
						commonConfirm(confirmData);
						openLayer('commonConfirm');
						$("#closeCommonConfirmBtn").css("display", "none");

						$("#commonConfirmOkBtn").on('click' , function(){
							//痍⑥냼
							return false;
						});

						$("#commonConfirmCancelBtn").on('click' , function(){
							if($("#commonConfirmCancelBtn").text() == "�λ컮援щ땲 �대룞") {
								location.href = stContextPath + "cart/";
								return false;
							}
						});
						if (result.cartCnt !== 0) {
							$(".cart-inner-count").css("display", "block");
							$(".cart-inner-count").html(result.cartCnt);
						} else {
							$(".cart-inner-count").css("display", "none");
						}
					} else {
						location.href = stContextPath + "cart/";
						return false;
					}
				}
			}
		},
		error : function(response, status, error) {
			fnAlertMessage("[�ㅻ쪟] insertCart");
			return false;
		},
		beforeSend : function(xhr) {
			xhr.setRequestHeader("ajax", true);
		},
		complete : function() {
		}
	};
	$.ajax(nowBuyOptions);
	return cartResult;
}

/**
 * fnCartDirectByMultiId : �λ컮援щ땲_蹂듭닔嫄� (�곹뭹�꾩씠��)
 * @param goodsList
 */
function fnCartDirectByMultiId(goodsList, cartCallMethod) {
	var stContextPath = $("#viewStContextPath").val();
	console.log("goodsList=====> " + JSON.stringify(goodsList));

	// @ Test �곹뭹�꾩씠�� 由ъ뒪��
	// @ ex: { goodsId:�곹뭹�꾩씠��, qty:�섎웾, compNo:�낆껜踰덊샇(@�룹뺨湲곗�: [312:�쇱꽦�꾩옄�쒓뎅珥앷큵],[313:�쇱꽦�먮ℓ二쇱떇�뚯궗],[0:�놁쓬]) }
	// var goodsList = [
	// { goodsId:"G000001111", qty:2, compNo:312 },
	// { goodsId:"G000001112", qty:4, compNo:313 },
	// { goodsId:"G000001113", qty:1, compNo:313, tradeIn:"Y", galaxyClub:"Y", galaxyClubTpCd:"CLB008" }
	// ];

	// cartCallMethod : �λ컮援щ땲 �대룞 �щ� �뺤씤 �뚮씪誘명꽣
	// var cartCallMethod = "move" (default) �λ컮援щ땲 �대룞
	//						"confirm" �숈씪�� �곹뭹 �뺤씤 / �λ컮援щ땲 �대룞 �앹뾽 �꾩슦湲�

	// @ �곹뭹�꾩씠�� 議고쉶瑜� �꾪븳 紐⑤뜽肄붾뱶 諛� �낆껜 由ъ뒪��(String)
	// @ searchGoodsParams: G000001111^G000001112^...
	// @ searchCompNoParams: 000^312^313...
	var searchGoodsParams = "";
	var searchCompNoParams = "";

	// @ �섎웾 由ъ뒪��
	var qtyList = new Array();

	// �몃젅�대뱶�� 由ъ뒪��
	var tradeInList = new Array();
	// @ Validate Check
	if (0 < goodsList.length) {
		if(!fnChkLogin("�λ컮援щ땲 �닿린", location.pathname)) {
			return false;
		}

		var goodsId = "";
		var qtyI = 0;
		var compNoI = "";
		var content = "";
		var goodsOrdTpCd = "";
		var galaxyClubTpCd = "";

		for (var i = 0; i < goodsList.length; i++) {
			goodsId = goodsList[i].goodsId;
			qtyI = goodsList[i].qty;

			// �곹뭹�꾩씠�� 泥댄겕
			if (goodsId === null || goodsId === undefined || $.trim(goodsId).length == 0) {
				content = "�곹뭹�꾩씠�붾� �뺤씤�섏뿬 二쇱떆湲� 諛붾엻�덈떎."
			}

			// �낆껜踰덊샇 泥댄겕
			if (goodsList[i].compNo === null || goodsList[i].compNo === undefined || $.trim(goodsList[i].compNo).length == 0) {
				compNoI = 0;
			}else{
				compNoI = goodsList[i].compNo;
			}

			// �섎웾 泥댄겕
			if (qtyI === null || qtyI === undefined || qtyI < 1) {
				content = "�섎웾�� �뺤씤�섏뿬 二쇱떆湲� 諛붾엻�덈떎."
			}

			// ---- �몃젅�대뱶�� 援щℓ 愿��� start;
			//�몃젅�대뱶��
			if(goodsList[i].tradeIn == "Y") {
				goodsOrdTpCd = "TRD";
			}else if(goodsList[i].ceTradeIn == "Y"){
				goodsOrdTpCd = "CETRD";
			}else{
				// �몃젅�대뱶�� / 媛ㅻ윮�� �대읇 �곹뭹�� �섎굹留� 援щℓ 媛��ν븯誘�濡� �뚮씪硫뷀꽣 珥덇린�� ��젣
				//goodsOrdTpCd = "";
			}

			if(goodsList[i].galaxyClub == "Y") {
				content = "My 媛ㅻ윮�� �대읇 �곹뭹�� �λ컮援щ땲�� �댁쓣 �� �놁뒿�덈떎.";
				// goodsOrdTpCd += "GC";
				// if (goodsList[i].galaxyClubTpCd === null || goodsList[i].galaxyClubTpCd === undefined || $.trim(goodsList[i].galaxyClubTpCd).length == 0) {
				// 	content = "媛ㅻ윮�� �대읇 罹좏럹�� 肄붾뱶瑜� �뺤씤�섏뿬 二쇱떆湲� 諛붾엻�덈떎.";
				// } else {
				// 	galaxyClubTpCd = goodsList[i].galaxyClubTpCd;
				// }
			}

			// 鍮꾩뒪�ы겕 �뚯튂 �� 寃쎌슦 �몃젅�대뱶�� �꾨옒 濡쒖쭅 �⑥뒪
			if ("Y" != goodsList[i].bspkWatchYn) {
				// TradeIn, GalaxyClub �곹뭹�� 2媛� �댁긽�� 寃쎌슦 �덉쇅泥섎━
				if (goodsOrdTpCd != "" && i > 0) {
					content = "�몃젅�대뱶�� / 媛ㅻ윮�� �대읇 �곹뭹�� �쒓컻留� 援щℓ 媛��ν빀�덈떎.";
				}
			}

			console.log("goodsOrdTpCd=====> " + goodsOrdTpCd);
			// ---- �몃젅�대뱶�� 援щℓ 愿��� end;

			// �곹뭹�꾩씠�� 諛� �섎웾 �댁긽 �덉쓣�� alert
			if (content !== "") {
				fnAlertMessage(content);
				return false;
			} else {
				// �곹뭹�꾩씠�� �뺤젣
				if (i !== (goodsList.length - 1)) {
					searchGoodsParams += goodsId + "^";
					searchCompNoParams += compNoI + "^";
				} else {
					searchGoodsParams += goodsId;
					searchCompNoParams += compNoI;
				}
				// �섎웾 �뺤젣
				qtyList.push(qtyI);

				tradeInList.push(goodsOrdTpCd);

				// 鍮꾩뒪�ы겕 �뚯튂 �� 寃쎌슦 �몃젅�대뱶�� & 媛ㅻ윮�� �대읇 �뚮씪硫뷀꽣珥덇린��
				if ("Y" == goodsList[i].bspkWatchYn) {
					goodsOrdTpCd = "";
				}
			}
		}
	} else {
		fnAlertMessage("�곗씠�� �뺤씤�� �꾩슂�⑸땲��.");
		return false;
	}

	// �곹뭹 �먮ℓ �곹깭 泥댄겕
	var goodsIdList = fnCheckGoodsStatus(searchGoodsParams);

	// @ Cart Insert
	if (goodsIdList !== null && goodsIdList !== undefined && goodsIdList.length > 0) {
		//�쇰컲�곹뭹 �λ컮援щ땲 goodsCnt 議고쉶
		//goodsCntCart(goodsIdList, qtyList, cartCallMethod);

		var reqData = {
			goodsIds : String(goodsIdList),
			nowBuyYn : "N",
			buyQtys : String(qtyList),
			orderType : "ONCE",
			cartCallMethod : cartCallMethod,
			goodsOrdTpCd : String(tradeInList),
			galaxyClubTpCd : galaxyClubTpCd
		};

		if (cartCallMethod == "confirm") {
			var options = {
				url : stContextPath + "xhr/order/goodscnt"
				, data : reqData
				, async : false
				, done : function(data){
					var cartCnt = data.goodsCnt;
					if ( cartCnt > 0 ) {
						let confirmData = {
							content : "�대� �숈씪�� �곹뭹�� �λ컮援щ땲�� �덉뒿�덈떎.</br>異붽��섏떆寃좎뒿�덇퉴?"
							,okBtnText : "�뺤씤"
							,cancelBtnText : "痍⑥냼"
						};
						commonConfirm(confirmData);
						openLayer('commonConfirm');
						$("#closeCommonConfirmBtn").css("display", "none");

						$("#commonConfirmOkBtn").on('click' , function(){
							if($("#commonConfirmOkBtn").text() == "�뺤씤") {
								fnInsertCart(reqData);
								return false;
							}
						});
						$("#commonConfirmCancelBtn").on('click' , function(){
							//痍⑥냼
							return false;
						});
					} else {
						fnInsertCart(reqData);
					}
				}
			};
			ajax.call(options);
		} else {
			fnInsertCart(reqData);
		}
	}
};

/**
 * fnBuyDirectBySingleId : 援щℓ�섍린_�⑥씪嫄� (�곹뭹�꾩씠��)
 * @param goodsId �곹뭹�꾩씠��
 * @param target ��寃�
 */
function fnBuyDirectBySingleId(goodsId, target) {
	if (goodsId === null || goodsId === undefined
		|| $.trim(goodsId).length == 0) {
		fnAlertMessage("�곹뭹�꾩씠�붽� �놁뒿�덈떎.");
		return false;
	}

	var stContextPath = $("#viewStContextPath").val();

	// �곹뭹 �먮ℓ �곹깭 泥댄겕
	var goodsIdList = fnCheckGoodsStatus(goodsId);

	if (goodsIdList !== null && goodsIdList !== undefined && goodsIdList.length > 0) {
		var reqData = {
			goodsIds : goodsIdList,
			nowBuyYn : "Y",
			buyQtys : 1,
			orderType : "ONCE",
		};

		// �λ컮援щ땲 �깅줉
		if(fnInsertCart(reqData) != null) {
			// @ 二쇰Ц �섏씠吏�濡�..
			var form = document.createElement('form');
			form.setAttribute('action', stContextPath + "order/");
			form.setAttribute('target', target);
			form.setAttribute('method', 'post');
			document.body.appendChild(form);
			form.submit();
		}
	}
};

/**
 * fnBuyDirectByMultiId : 援щℓ�섍린_蹂듭닔嫄� (�곹뭹�꾩씠��)
 * @param goodsList
 */
function fnBuyDirectByMultiId(goodsList) {

	var stContextPath = $("#viewStContextPath").val();

	console.log("goodsList 222222=====> " + JSON.stringify(goodsList));

	// @ Test �곹뭹�꾩씠�� 由ъ뒪��
	// @ ex: { goodsId:�곹뭹�꾩씠��, qty:�섎웾, compNo:�낆껜踰덊샇(@�룹뺨湲곗�: [312:�쇱꽦�꾩옄�쒓뎅珥앷큵],[313:�쇱꽦�먮ℓ二쇱떇�뚯궗],[0:�놁쓬]) }
	// var goodsList = [
	// { goodsId:"G000001111", qty:2, compNo:312 },
	// { goodsId:"G000001112", qty:4, compNo:313 },
	// { goodsId:"G000001113", qty:1, compNo:313, tradeIn:"Y", galaxyClub:"Y", galaxyClubTpCd:"CLB008" }
	// { goodsId:"G000001112", qty:4, compNo:313, pckStrNo : 1 },
	// ];

	// @ �곹뭹�꾩씠�� 議고쉶瑜� �꾪븳 紐⑤뜽肄붾뱶 諛� �낆껜 由ъ뒪��(String)
	// @ searchGoodsParams: G000001111^G000001112^...
	// @ searchCompNoParams: 000^312^313...
	var searchGoodsParams = "";
	var searchCompNoParams = "";

	// @ �섎웾 由ъ뒪��
	var qtyList = new Array();

	// �몃젅�대뱶�� 由ъ뒪��
	var tradeInList = new Array();
	// @ Validate Check
	if (0 < goodsList.length) {
		var goodsId = "";
		var qtyI = 0;
		var compNoI = "";
		var content = "";
		var goodsOrdTpCd = "";
		var galaxyClubTpCd = "";
		var pckStrNo = "";
		var pckGoodsIdList = [];

		for (var i = 0; i < goodsList.length; i++) {
			goodsId = goodsList[i].goodsId;
			qtyI = goodsList[i].qty;
			pckStrNo = goodsList[i].pckStrNo;
			pckGoodsIdList.push(goodsId);

			// �곹뭹�꾩씠�� 泥댄겕
			if (goodsId === null || goodsId === undefined || $.trim(goodsId).length == 0) {
				content = "�곹뭹�꾩씠�붾� �뺤씤�섏뿬 二쇱떆湲� 諛붾엻�덈떎."
			}

			// �낆껜踰덊샇 泥댄겕
			if (goodsList[i].compNo === null || goodsList[i].compNo === undefined || $.trim(goodsList[i].compNo).length == 0) {
				compNoI = 0;
			}else{
				compNoI = goodsList[i].compNo;
			}

			// �섎웾 泥댄겕
			if (qtyI === null || qtyI === undefined || qtyI < 1) {
				content = "�섎웾�� �뺤씤�섏뿬 二쇱떆湲� 諛붾엻�덈떎."
			}

			// ---- �몃젅�대뱶�� 援щℓ 愿��� start;
			//�몃젅�대뱶��
			if(goodsList[i].tradeIn == "Y") {
				goodsOrdTpCd = "TRD";
			}else if(goodsList[i].ceTradeIn == "Y"){
				goodsOrdTpCd = "CETRD";
			}else{
				// �몃젅�대뱶�� / 媛ㅻ윮�� �대읇 �곹뭹�� �섎굹留� 援щℓ 媛��ν븯誘�濡� �뚮씪硫뷀꽣 珥덇린�� ��젣
				//goodsOrdTpCd = "";
			}

			if(goodsList[i].galaxyClub == "Y") {
				goodsOrdTpCd += "GC";
				if (goodsList[i].galaxyClubTpCd === null || goodsList[i].galaxyClubTpCd === undefined || $.trim(goodsList[i].galaxyClubTpCd).length == 0) {
					content = "媛ㅻ윮�� �대읇 罹좏럹�� 肄붾뱶瑜� �뺤씤�섏뿬 二쇱떆湲� 諛붾엻�덈떎.";
				} else {
					galaxyClubTpCd = goodsList[i].galaxyClubTpCd;
				}
			}

			// 鍮꾩뒪�ы겕 �뚯튂 �� 寃쎌슦 �몃젅�대뱶�� �꾨옒 濡쒖쭅 �⑥뒪
			if ("Y" != goodsList[i].bspkWatchYn) {
				// TradeIn, GalaxyClub �곹뭹�� 2媛� �댁긽�� 寃쎌슦 �덉쇅泥섎━
				if (goodsOrdTpCd != "" && i > 0) {
					content = "�몃젅�대뱶�� / 媛ㅻ윮�� �대읇 �곹뭹�� �쒓컻留� 援щℓ 媛��ν빀�덈떎.";
				}
			}

			console.log("goodsOrdTpCd=====> " + goodsOrdTpCd);
			// ---- �몃젅�대뱶�� 援щℓ 愿��� end;

			// �곹뭹�꾩씠�� 諛� �섎웾 �댁긽 �덉쓣�� alert
			if (content !== "") {
				fnAlertMessage(content);
				return false;
			} else {
				// �곹뭹�꾩씠�� �뺤젣
				if (i !== (goodsList.length - 1)) {
					searchGoodsParams += goodsId + "^";
					searchCompNoParams += compNoI + "^";
				} else {
					searchGoodsParams += goodsId;
					searchCompNoParams += compNoI;
				}
				// �섎웾 �뺤젣
				qtyList.push(qtyI);

				tradeInList.push(goodsOrdTpCd);

				// 鍮꾩뒪�ы겕 �뚯튂 �� 寃쎌슦 �몃젅�대뱶�� & 媛ㅻ윮�� �대읇 �뚮씪硫뷀꽣珥덇린��
				if ("Y" == goodsList[i].bspkWatchYn) {
					goodsOrdTpCd = "";
				}
			}
		}
	} else {
		fnAlertMessage("�곗씠�� �뺤씤�� �꾩슂�⑸땲��.");
		return false;
	}

	// �곹뭹 �먮ℓ �곹깭 泥댄겕
	var goodsIdList;
	if(!pckStrNo){
		goodsIdList = fnCheckGoodsStatus(searchGoodsParams);
	}else{
		goodsIdList = pckGoodsIdList;
	}


	// @ Cart Insert
	if (goodsIdList !== null && goodsIdList !== undefined && goodsIdList.length > 0) {
		// @ goodsIds, buyQtys�� 諛곗뿴媛믪쓣 String�쇰줈 �섍꺼二쇱� �딆쑝硫� 而⑦듃濡ㅻ윭�먯꽌 param�� null濡� 諛쏆븘�몄꽌 String泥섎━,
		var reqData = {
			goodsIds : String(goodsIdList),
			nowBuyYn : "Y",
			buyQtys : String(qtyList),
			orderType : "ONCE",
			goodsOrdTpCd : String(tradeInList),
			galaxyClubTpCd : galaxyClubTpCd,
			pckStrNo : pckStrNo
		};

		var orderUrl = stContextPath + "order/";

		// �λ컮援щ땲 �깅줉
		if(fnInsertCart(reqData) != null) {
			if(tradeInList.includes('CETRD') || tradeInList.includes('TRD')) { // TradeIn 泥댄겕
				if (fnChkLogin("援щℓ�섍린", orderUrl)) { // 濡쒓렇�� 泥댄겕
					location.href= orderUrl;
				}
			} else if(tradeInList.includes('GC') || tradeInList.includes('TRDGC')) { // GalaxyClub 泥댄겕
				fnChkGalaxyClub(reqData);	// 濡쒓렇�� 泥댄겕 & 硫ㅻ쾭�� 泥댄겕
			} else {
				// @ 二쇰Ц �섏씠吏�濡�..
				var form = document.createElement('form');
				form.setAttribute('action', orderUrl);
				form.setAttribute('target', "_self");
				form.setAttribute('method', 'post');
				document.body.appendChild(form);
				form.submit();
			}
		}
	}
};

/**
 * fnPresentDirectBySingleId : �좊Ъ�섍린 �⑥씪嫄� (�곹뭹�꾩씠��)
 * @param goodsId �곹뭹�꾩씠��
 * @param target ��寃�
 */
function fnPresentDirectBySingleId(goodsId, target) {
	if (goodsId === null || goodsId === undefined
		|| $.trim(goodsId).length == 0) {
		fnAlertMessage("�곹뭹�꾩씠�붽� �놁뒿�덈떎.");
		return false;
	}

	var stContextPath = $("#viewStContextPath").val();

	// �곹뭹 �먮ℓ �곹깭 泥댄겕
	var goodsIdList = fnCheckGoodsStatus(goodsId);

	if (goodsIdList !== null && goodsIdList !== undefined && goodsIdList.length > 0) {
		var reqData = {
			goodsIds : goodsIdList,
			nowBuyYn : "Y",
			buyQtys : 1,
			orderType : "ONCE",
		};

		// �λ컮援щ땲 �깅줉
		var cartResult = fnInsertCart(reqData);
		if(cartResult != null) {
			var msg = "�좊Ъ�섍린";

			// 濡쒓렇�� 泥댄겕
			if (fnChkLogin(msg, location.pathname)) {
				// �좊Ъ�섍린 二쇰Ц �뚮씪硫뷀꽣 �뗮똿
				var cartId = document.createElement('input');
				cartId.setAttribute('name', "cartId");
				cartId.setAttribute('value', cartResult.cartId);

				var presentYn = document.createElement('input');
				presentYn.setAttribute('name', "presentYn");
				presentYn.setAttribute('value', 'Y');

				var form = document.createElement('form');
				form.setAttribute('action', stContextPath+"present/presentSend/");
				form.setAttribute('target', target);
				form.setAttribute('method', 'post');
				form.appendChild(cartId);
				form.appendChild(presentYn);
				document.body.appendChild(form);
				form.submit();
			}
		}
	}
};

/**
 * 留ㅼ옣�쎌뾽 �앹뾽 �ㅽ뵂
 */
function fnOpenPickUpStorePop(goodsInfo){
	// var goodsInfo =
	// { goodsId:"G000231889", goodsNm:"留ㅼ옣�쎌뾽 SM-S908NDREKOO", mdlCode:"SM-S908NDREKOO", saleStat:12, isEvent:"Y" };
	var stContextPath = $("#viewStContextPath").val();

	var storePickUpOptions = {
		url : stContextPath + "xhr/goods/storePickupList"
		, data : goodsInfo
		, type: 'POST'
		, dataType : "html"
		, done : function(data) {
			$objLayer = $("#popupLayer").addClass("layer-storepickup advancement");
			var t = $objLayer.attr('id');
			$objLayer.html(data);
			if($(".layer-pop").is(":visible")) {
				LAYERZINDEX++; // 200729 �앹뾽 �� 媛� �댁긽 �꾩슱 寃쎌슦 z-index ++
			} else {
				LAYERZINDEX = 300; // 200729 �앹뾽 �� 媛� �댁긽 �꾩슱 寃쎌슦 z-index ++
			}
			$objLayer.show().css("z-index", LAYERZINDEX).attr("aria-hidden", false).attr("data-zindex", LAYERZINDEX).focus(); // 200729 z-index 媛� data attr�� ����
			$objLayer.find(".pop-close").data("activeTarget", t);
			// �ㅻ뱶�앹뾽 留덉뒪�� �앹꽦 諛� �쒖꽦��  // 200729
			if(!$objLayer.hasClass("nomask")){
				var zidx = parseInt($("#"+t).attr("data-zindex")) - 1;
				$("body").append("<div id='mask' data-mask-target='"+t+"' style='z-index:"+zidx+"'></div>");

				$("#mask").fadeIn().data("activeTarget", t);
				scrollLock('lock');
			}

			if(!$("body").children().is("#mask")) $("body").append("<div id='mask'></div>");
			$("#mask").fadeIn().data("activeTarget", $objLayer.data("popup-layer"));
			$("#commonAlert a").attr("onblur", "$('#commonAlert').focus();")
			$("#commonAlert").attr("onblur", "$('#commonAlert a').focus();")

			$objLayer.find('.pop-close').off().on('click', function (){
				$objLayer.removeAttr("style").removeAttr("data-zindex").attr("aria-hidden", true).hide();  // 200729
				$objLayer.empty();
				$("body").css("overflow", "");

				if ($objLayer.hasClass("layer-storepickup")) $objLayer.removeClass("layer-storepickup");
				if ($objLayer.hasClass("layer-gatherview")) $objLayer.removeClass("layer-gatherview");
				if ($objLayer.hasClass("popup-comm-video")) $objLayer.removeClass("popup-comm-video");
				if ($objLayer.hasClass("popup-comm-img360")) $objLayer.removeClass("popup-comm-img360");
				if ($objLayer.hasClass("popup-comm-gallery")) $objLayer.removeClass("popup-comm-gallery");

				$("#mask[data-mask-target='"+t+"']").fadeOut("fast").remove();  // 200729
				scrollLock('unlock');

				LAYERZINDEX--;  // 200729 �덉씠�댄뙘�� z-index媛� 珥덇린��

				$(this).off();

			});

		}
	};
	ajax.call(storePickUpOptions);
}

/**
 * 留ㅼ옣 �쎌뾽 留ㅼ옣 �좏깮 �꾨즺
 */
function setChoosenPickupStoreForBuyNow(data, pickupCount, buyNowYn){

	var plazaNmId = '#plazaNm-'+data.goodsId;
	var plazaNoId = '#plazaNo-'+data.goodsId;
	var storeAddrId = '#storeAddr-'+data.goodsId;
	$(plazaNmId).text(data.plazaNm);
	$(plazaNoId).text(data.plazaNo);
	$(storeAddrId).text("(" + storePickupManager.genFullAddress(data) + ")");

	if(buyNowYn == 'Y') {
		var goodsList = [
			{
				goodsId	:	data.goodsId,
				qty		:	1,
				compNo	:	data.goodsId,
				pckStrNo:	data.plazaNo
			}
		];
		fnBuyDirectByMultiId(goodsList);
	}
}