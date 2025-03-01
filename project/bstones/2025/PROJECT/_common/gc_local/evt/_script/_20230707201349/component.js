//cta link
function openCtaLink(url, target) {
	if (url.indexOf('javascript:downloadFileCms') >= 0) {
		var sIdx = url.indexOf("(");
		var eIdx = url.indexOf(")");
		var lettNo = url.substring(sIdx + 1, eIdx);

		downloadFileCms(lettNo);
	} else {
		try {
			var lowerUrl = "";
			if (typeof url === 'string'){
				lowerUrl = url.toLowerCase();
			}
			if (stGbCd == 10) { //�룹뺨
				if (lowerUrl.indexOf('galaxycampusday_2212') >= 0 || lowerUrl.indexOf('galaxycampus/?galaxycampusday') >= 0) {
					NetFunnel_Action({ action_id: 'b2b2c_kv_cta' }, function (ev, ret) {
						window.open(url, target);
					});
				} else if (lowerUrl.indexOf('galaxycampus/?2023GCSfestival') >= 0 || lowerUrl.indexOf('event/galaxy-watch6/preorder') >= 0 || lowerUrl.indexOf('event/galaxy-watch6/launching') >= 0) {
					NetFunnel_Action({ action_id: 'b2c_kv_cta' }, function (ev, ret) {
						window.open(url, target);
					});
				} else if (lowerUrl.indexOf('event/galaxy-tabs9/preorder') >= 0 || lowerUrl.indexOf('event/galaxy-tabs9/launching') >= 0) {
					NetFunnel_Action({ action_id: 'b2c_kv_cta2' }, function (ev, ret) {
						window.open(url, target);
					});
				} else if (lowerUrl.indexOf('galaxy-z-fold5/preorder') >= 0 || lowerUrl.indexOf('galaxy-z-fold5/launching') >= 0 || lowerUrl.indexOf('galaxy-z-flip5/preorder') >= 0 || lowerUrl.indexOf('galaxy-z-flip5/launching') >= 0) {
					NetFunnel_Action({ action_id: 'b2c_kv_cta3' }, function (ev, ret) {
						window.open(url, target);
					});
				} else {
					window.open(url, target);
				}
			} else if (stGbCd == 20) { //�⑤꽬  
				if (lowerUrl.indexOf('all-mobile-galaxy-a53') >= 0) {
					NetFunnel_Action({ action_id: 'fnet_kv_cta' }, function (ev, ret) {
						window.open(url, target);
					});
				} else {
					window.open(url, target);
				}
			} else if (stGbCd == 30) { //�붿뒪�뚮젅�� �⑤꽬
				if (lowerUrl.indexOf('all-mobile-galaxy-a53') >= 0) {
					NetFunnel_Action({ action_id: 'fnet_kv_cta2' }, function (ev, ret) {
						window.open(url, target);
					});
				} else {
					window.open(url, target);
				}
			} else if (stGbCd == 80) { //媛ㅼ틺�� 湲고쉷��
				if (lowerUrl.indexOf('galaxycampusday_2212') >= 0 || lowerUrl.indexOf('galaxycampus/?galaxycampusday') >= 0 || lowerUrl.indexOf('eventlist/2023GCSfestival') >= 0 || lowerUrl.indexOf('eventlist/galaxy-watch6/preorder') >= 0 || lowerUrl.indexOf('eventlist/galaxy-watch6/launching') >= 0) {
					NetFunnel_Action({ action_id: 'b2b2c_kv_cta' }, function (ev, ret) {
						window.open(url, target);
					});
				} else if (lowerUrl.indexOf('eventlist/galaxy-tabs9/preorder') >= 0 || lowerUrl.indexOf('eventlist/galaxy-tabs9/launching') >= 0) {
					NetFunnel_Action({ action_id: 'b2b2c_kv_cta2' }, function (ev, ret) {
						window.open(url, target);
					});
				} else if (lowerUrl.indexOf('eventlist/galaxy-z-fold5/preorder') >= 0 || lowerUrl.indexOf('eventlist/galaxy-z-fold5/launching') >= 0 || lowerUrl.indexOf('eventlist/galaxy-z-flip5/preorder') >= 0 || lowerUrl.indexOf('eventlist/galaxy-z-flip5/launching') >= 0) {
					NetFunnel_Action({ action_id: 'b2b2c_kv_cta3' }, function (ev, ret) {
						window.open(url, target);
					});
				} else {
					window.open(url, target);
				}
			} else {
				window.open(url, target);
			}
		} catch (e) {
			window.open(url, target);
		}
	}
}

//�곸긽 �덉씠�댄뙘�� �몄텧 �� �먮룞�ъ깮 - iframe �쎌엯�� �듭뀡 ?autoplay=1 �쎌엯(�덉씠�댄뙘�� �ㅽ뵂�� �먮룞�ъ깮)
function compLayerOpenPlay(elem) {
	if ($(elem).find("video").length > 0) {
		$(elem).find("video").get(0).play();
	}
}

$(function () {
	// 200623
	$(window).resize(function () {
		var winw = $(window).width();
		if (winw > 800) {  // 紐⑤컮�� �ъ씠利� 800 遺���
			$(".wrap-component").find(".visual-area").find("img").each(function () {
				var src = $(this).attr("data-pcimg-src");
				$(this).attr("src", src);
			});

			$(".gallery-carousel").find(".visual-area").find("a").each(function () {
				var src = $(this).attr("data-pc-src-origin");
				$(this).attr("data-src-origin", src);
			});

		} else {
			$(".wrap-component").find(".visual-area").find("img").each(function () {
				var src = $(this).attr("data-mimg-src");
				if (src != "") {
					$(this).attr("src", src);
				}
			});

			$(".gallery-carousel").find(".visual-area").find("a").each(function () {
				var src = $(this).attr("data-mo-src-origin");
				if (src != "") {
					$(this).attr("data-src-origin", src);
				}
			});
		}

		// 2021-08-27 �ъ슜�섏� �딅뒗 �댁슜�쇰줈 �명븯�� 二쇱꽍泥섎━
		// if(winw > 801){
		// 	$(".wrap-component.feature-benefit .component-text .box-disc .disc, .wrap-component.feature-benefit .component-text .box-disc .disc.pc-ver").not(".mo-ver").css('display','block');
		// } else{
		// 	$(".wrap-component.feature-benefit .component-text .box-disc .disc").css('display','none');
		// }

	}).resize();

	// �곸긽 �앹뾽 �닿린
	$(document).on("click", "[data-popup-target]", function (e) {
		e.preventDefault();
		var target = $(this).attr("data-popup-target");
		if ($("#" + target).hasClass("popup-comp-player")) {
			if (!$("#" + target).hasClass("embed"))
				$("#mask").addClass("video-player");
		}
	});

	// �곸긽 �앹뾽 �レ쓣 �� �곸긽 硫덉땄
	$(document).on("click", ".popup-comp-player .pop-close, #mask.video-player", function (e) {
		e.preventDefault();
		if ($(this).parents(".popup-comp-player").length > 0) {
			var video = $(this).parents(".popup-comp-player").find("video");
			if (video.length > 0) video.get(0).pause();
		}
	});


	// 媛ㅻ윭由� �대�吏� �대┃ �대깽��
	var $galleyMainSliderSlide = $(".slider-grid-gallery").find(".slide-visual");
	$galleyMainSliderSlide.find(".visual").click(function (e) {
		e.preventDefault();
		var name = $(this).attr("data-popup-name");
		var idx = $(this).attr("data-visual-index");

		$(this).attr("data-popup-target", name);  // popup target �앹꽦
		displayGallery($(this), idx);  // �앹뾽 �� �щ씪�대뱶 泥섎━
		setTimeout(function () {
			$("#mask").addClass("gallery");
		}, 100);
	});

	var setGalleryDetail = {
		infinite: false,
		arrow: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		fade: true,
		cssEase: 'linear',
		responsive: [
			{
				breakpoint: 801,
				settings: {
					arrows: true,
				}
			}]
	};
	// 媛ㅻ윭由� �덉씠�댄뙘�� �대�吏� �щ씪�대뱶 泥섎━
	var initGalleryDetail;
	function displayGallery(elem, idx) {
		var $html = "";
		var popup = elem.attr("data-popup-name");
		elem.parents(".slide-visual").find(".row").each(function () {
			$(this).find("a").each(function () {
				var origin = $(this).attr("data-src-origin");
				var desc = $(this).find("img").attr("alt")
				$html += "<div class='big'><img src='" + origin + "' alt='" + desc + "'></div>";
			});
		});
		$("#" + popup).find(".slider-gallery-detail").not(".slick-initialized").html($html);
		setTimeout(function () {
			initGalleryDetail = $("#" + popup).find(".slider-gallery-detail").not(".slick-initialized").slick(setGalleryDetail);
			//initGalleryDetail.slick("slickAdd", $html);
			initGalleryDetail.slick("slickGoTo", idx);
		}, 300);
	}

	// 媛ㅻ윭由� �덉씠�댄뙘�� �レ쓣 �� �덉씠�댄뙘�� �� �щ씪�대뱶 珥덇린��
	$(document).on("click", ".popup-comp-gallery .pop-close, #mask.gallery", function (e) {
		e.preventDefault();
		if ($(this).parents(".popup-comp-gallery")) {
			var slider = $(this).parents(".popup-comp-gallery").find(".slider-gallery-detail");
			if (slider.hasClass("slick-initialized")) {
				initGalleryDetail.slick("unslick");
				slider.html("");
			}

			// �대┃�덈뜕 �대�吏�濡� �ъ빱�� 媛� �꾩뿉 popup target ��젣
			var popup = $(this).parents(".popup-comp-gallery").attr("id");
			setTimeout(function () {
				$("[data-popup-target='" + popup + "']").removeAttr("data-popup-target");
			}, 100);
		}
	});

	$('.gt-wrap').each(function () {
		var $this = $(this);
		var slide = $this.find('.gt-slide');
		setMainSlickDataOmni(slide, $this.data("cptnm"));
	});

	$(".wrap-component .btn-copy").each(function () {
		var url = getGrpBuySnsShareUrl();

		url += "?scrlLctn=" + $(this).parent().parent().parent().parent().data("location");
		$(this).attr("data-clipboard-text", url);
	});

	var clipboardCpt = new ClipboardJS('.wrap-component .btn-copy');
	clipboardCpt.on('success', function (e) {
		let alertData = {
			title: ""
			, content: "留곹겕媛� 蹂듭궗�섏뿀�듬땲��."
			, callback: ""
			, btnText: "�뺤씤"
		};
		commonAlert(alertData);
		openLayer('commonAlert');
		// e.clearSelection();
	});
	clipboardCpt.on('error', function (e) {
		let alertData = {
			title: ""
			, content: "�ㅼ떆 �쒕룄�섏뿬 二쇱떗�쒖삤."
			, callback: ""
			, btnText: "�뺤씤"
		};
		commonAlert(alertData);
		openLayer('commonAlert');
	});

	$(document).on("click", ".wrap-component .btn-kakao", function () {
		var url = getGrpBuySnsShareUrl();

		url += "?scrlLctn=" + $(this).parent().parent().parent().parent().data("location");

		var imgpath = $(this).data("imgpath");
		var title = "[怨듬룞援щℓ] " + $(this).data("title");
		if (imgpath.startsWith("//")) {
			imgpath = "https:" + imgpath;
		}

		var desc = "�먮ℓ媛� " + $(this).data("sale-price") + "��\r\n�� 怨듬룞援щℓ媛� " + $(this).data("grpbuy-price") + "��";

		snsShare.kakaoTalk(url, title, imgpath, desc);
	});
});

// slick Play, Stop 踰꾪듉 data-omni �뗮똿
function setMainSlickDataOmni(el, cptEnNm) {

	//console.log('===== MAIN SLICK [ID:' + $(el).attr("id") +", CptEnNm:" + cptEnNm + "]");

	var $this = $(el);
	var wrap = $this.parent();
	setSlickDataOmni(wrap, cptEnNm, 'MAIN');
}
function setPopSlickDataOmni(el, cptEnNm) {
	//console.log('===== POPUP SLICK [ID:' + $(el).attr("id") +", CptEnNm:" + cptEnNm + "]");

	setTimeout(function () {
		setSlickDataOmni(el, cptEnNm, 'POP');
	}, 100)
}
function setSlickDataOmni(el, cptEnNm, callDv) {

	var btnPrev = el.find('.slick-prev');
	var btnNext = el.find('.slick-next');
	var dots = el.find('.slick-dots button');
	var btnPause = el.find('.slide-pause');
	var btnPlay = el.find('.slide-play');

	if (btnPrev.length > 0) {
		btnPrev.attr('data-omni', cptEnNm + ':left_arrow');
		//console.log(callDv + '- Arrow Prev data-omni : ' + btnPrev.data('omni'));
	}
	if (btnNext.length > 0) {
		btnNext.attr('data-omni', cptEnNm + ':right_arrow');
		//console.log(callDv + '-Arrow Next data-omni : ' + btnNext.data('omni'));
	}
	if (btnPause.length > 0) {
		//console.log(btnPause);
		btnPause.attr('data-omni', cptEnNm + ' rolling:index_stop');
		//console.log(callDv + '-StopButton data-omni : ' + btnPause.data('omni'));
	}
	if (btnPlay.length > 0) {
		btnPlay.attr('data-omni', cptEnNm + ' rolling:index_play');
		//console.log(callDv + '-PlayButton data-omni : ' + btnPlay.data('omni'));
	}
	if (dots.length > 0) {
		for (var dotIdx = 0; dotIdx < dots.length; dotIdx++) {
			$(dots[dotIdx]).attr('data-omni', cptEnNm + ' rolling:index_' + (dotIdx + 1));
			//console.log(callDv + '-Dots data-omni : ' + $(dots[dotIdx]).attr('data-omni'));
		}
	}
}


// Tab Container 理쒖쥌 �곹뭹媛�寃� �ㅼ떆媛� �뗮똿
function fnGetLastPrdPrice(goodsObjArr, stContextPath) {

	var goodsIdArr = new Array();
	if (goodsObjArr != null && goodsObjArr.length > 0) {

		var goodsIdIdx = 0;
		var idStrArr = "";
		for (var idx = 0; idx < goodsObjArr.length; idx++) {
			idStrArr = $(goodsObjArr[idx]).attr('id').split("_");
			if (idStrArr.length == 5 && idStrArr[3] != '') {
				goodsIdArr[goodsIdIdx++] = idStrArr[3];
			}
		}

		if (goodsIdArr.length == 0) return false;

		$.ajax({
			data: JSON.stringify({ goodsIdArr: goodsIdArr })
			, type: "POST"
			, contentType: "application/json"
			, url: stContextPath + 'xhr/display/componentGoodsPrice'
			, success: function (data) {
				if (data.result != null && data.result.length > 0) {
					data.result.forEach(function (item) {
						if (item.lastPrice != "") {
							$("[id$=" + item.goodsId + "_prclbl]").text(item.lastPrcLbl);
							$("[id$=" + item.goodsId + "_price]").text(item.lastPrice + " ��");
						}
					});
				}
			}
		});
	}
	return true;
}

// Production Selection �꾩껜 �곹뭹媛�寃� �ㅼ떆媛� �뗮똿
function fnGetAllPrdPrice(goodsObjArr, stContextPath) {
	fnGetAllPrdPrice2(goodsObjArr, stContextPath, "", "");
}

//Production Selection �꾩껜 �곹뭹媛�寃� �ㅼ떆媛� �뗮똿
function fnGetAllPrdPrice2(goodsObjArr, stContextPath, lastPrcText, stGbCd) {

	var goodsIdArr = new Array();
	if (goodsObjArr != null && goodsObjArr.length > 0) {

		var goodsIdIdx = 0;
		var idStrArr = "";
		var compNo = "";
		for (var idx = 0; idx < goodsObjArr.length; idx++) {
			idStrArr = $(goodsObjArr[idx]).attr('id').split("_");
			if (idStrArr.length == 4 && idStrArr[3] != '') {
				goodsIdArr[goodsIdIdx++] = idStrArr[3];
				compNo = idStrArr[1];
			}
		}

		//console.log("## �곹뭹肄붾뱶 紐⑸줉: " + goodsIdArr);
		if (goodsIdArr.length == 0) return false;

		$.ajax({
			data: JSON.stringify({ goodsIdArr: goodsIdArr, compNo: compNo })
			, type: "POST"
			, contentType: "application/json"
			, url: stContextPath + 'xhr/display/componentGoodsPrice'
			, success: function (data) {
				if (data.result != null && data.result.length > 0) {
					data.result.forEach(function (item) {

						//console.log("## " + item.goodsNm + " : " + item.goodsId);

						if (item.prdPrice1 != "") {
							$("[id$=" + item.goodsId + "_prc1]").text(item.prdPrice1 + " ��");
							$("[id$=" + item.goodsId + "_lbl1]").text(item.prdPrcLbl1);
							//console.log("## " + item.prdPrcLbl1 + " : " + item.prdPrice1);
						}

						if (item.prdPrice2 != "") {
							$("[id$=" + item.goodsId + "_prc2]").text(item.prdPrice2 + " ��");
							// $("[id$="+item.goodsId+"_lbl2]").text(item.prdPrcLbl2);
							if (stGbCd == "90" && lastPrcText != "") {
								$("#slicePrdSel_" + compNo).find("[id$=" + item.goodsId + "_lbl2]").text(lastPrcText);
							} else {
								$("[id$=" + item.goodsId + "_lbl2]").text(item.prdPrcLbl2);
							}
							//console.log("## " + item.prdPrcLbl2 + " : " + item.prdPrice2);
						}
						if (item.prdPrice3 != "") {
							$("[id$=" + item.goodsId + "_prc3]").text(item.prdPrice3 + " ��");
							if (lastPrcText != "") {
								$("#slicePrdSel_" + compNo).find("[id$=" + item.goodsId + "_lbl3]").text(lastPrcText);
							} else {
								$("[id$=" + item.goodsId + "_lbl3]").text(item.prdPrcLbl3);
							}
							//console.log("## " + item.prdPrcLbl3 + " : " + item.prdPrice3);
						}
						if (item.prdPrice4 != "") {
							$("[id$=" + item.goodsId + "_prc4]").text(item.prdPrice4 + " ��");
							$("[id$=" + item.goodsId + "_lbl4]").text(item.prdPrcLbl4);
							//console.log("## " + item.prdPrcLbl4 + " : " + item.prdPrice4);
						}
						if (item.membershipPoint != "") {
							$("[id$=" + item.goodsId + "_svmnt]").text(item.membershipPoint + "P");
						}
					});
				}
			}
		});
	}
	return true;
}

function fnGetPrdPrice(topId, arr, stContextPath) {
	var topEl = topId;
	var goodsIdArr = arr;
	var childEl = $('#' + topEl).find('.prd-info[data-sideprd-prdcode-set]');
	if (childEl) {
		childEl.each(function (i) {
			var thisEl = $(this);
			var thisCode = thisEl.data('sideprd-prdcode-set');
			$.ajax({
				data: JSON.stringify({ goodsIdArr: goodsIdArr })
				, type: "POST"
				, contentType: "application/json"
				, url: stContextPath + 'xhr/display/componentGoodsPrice'
				, success: function (data) {
					if (data.result != null && data.result.length > 0) {
						data.result.forEach(function (item) {
							for (var idx = 0; idx < goodsIdArr.length; idx++) {
								if (item.goodsId == thisCode) {
									thisEl.find('.prd-name').html(item.goodsNm);
									thisEl.find('.prd-code').html(item.mdlCode);
									thisEl.find('.reg .count').html(item.prdPrcLbl1);
									thisEl.find('.reg .price').html(item.prdPrice1 + ' ��');
									thisEl.find('.member .count').html(item.prdPrcLbl2);
									thisEl.find('.member .price').html(item.prdPrice2 + ' ��');
									if (item.prdPrice3) {
										thisEl.find('.benefit .count').html(item.prdPrcLbl3);
										thisEl.find('.benefit .price').html(item.prdPrice3 + ' ��');
									} else {
										thisEl.find('.benefit').remove();
									}
									thisEl.find('.card-btn a').attr('href', '/sec/' + item.goodsPath);
								}
							}
						});
					}
				}
			});
		});
	}
	return true;
}
function fnGetPrdPriceItr(topId, arr, stContextPath) {
	var topEl = topId;
	var goodsIdArr = arr;
	var childEl = $('#' + topEl).find('.interior-txt[data-interior-prdcode-set]');
	if (childEl) {
		childEl.each(function (i) {
			var thisEl = $(this);
			var thisCode = thisEl.data('interior-prdcode-set');
			$.ajax({
				data: JSON.stringify({ goodsIdArr: goodsIdArr })
				, type: "POST"
				, contentType: "application/json"
				, url: stContextPath + 'xhr/display/componentGoodsPrice'
				, success: function (data) {
					if (data.result != null && data.result.length > 0) {
						data.result.forEach(function (item) {
							for (var idx = 0; idx < goodsIdArr.length; idx++) {
								if (item.goodsId == thisCode) {
									thisEl.find('.prd-tit').html(item.goodsNm);
									thisEl.find('.prd-code').html(item.mdlCode);
									thisEl.find('.reg .count').html(item.prdPrcLbl1);
									thisEl.find('.reg .price').html(item.prdPrice1 + ' ��');
									thisEl.find('.member .count').html(item.prdPrcLbl2);
									thisEl.find('.member .price').html(item.prdPrice2 + ' ��');
									if (item.prdPrice3) {
										thisEl.find('.benefit .count').html(item.prdPrcLbl3);
										thisEl.find('.benefit .price').html(item.prdPrice3 + ' ��');
									} else {
										thisEl.find('.benefit').remove();
									}
									thisEl.parent('.prd-href').attr('href', '/sec/' + item.goodsPath);
								}
							}
						});
					}
				}
			});
		});
	}
	return true;
}


//========================================================
// B2B e-�쒖븞�� �ㅼ슫濡쒕뱶
function downloadFileCms(lettNo) {
	var fileInfo;
	var options = {
		url: "/sec/business/xhr/insights/getFileInfoCms",
		data: { lettNo: lettNo },
		async: false,
		done: function (data) {
			fileInfo = data;
		}
	};
	ajax.call(options);

	if (fileInfo == undefined) {
		var alertData = {
			title: ""
			, content: "�뚯씪�� 議댁옱�섏� �딆뒿�덈떎."
			, callback: ""
			, btnText: "�뺤씤"
		};
		commonAlert(alertData);
		openLayer('commonAlert');
		return;
	}


	var cnsntYn = $.cookie('cnsntYn');

	var link = document.location.pathname;
	console.log(link);

	if (cnsntYn == "Y") {
		if (fileInfo.downYn == "Y") {
			if (fileInfo.file.orgFlNm == "") {
				var alertData = {
					title: ""
					, content: "�뚯씪�� 議댁옱�섏� �딆뒿�덈떎."
					, callback: ""
					, btnText: "�뺤씤"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
			}
			else {
				var data = {
					filePath: fileInfo.file.phyPath,
					fileName: fileInfo.file.orgFlNm
				}
				createFormSubmit("fileDownload", "/sec/business/common/fileDownloadResult/", data);
			}
		}
		else {
			window.open(fileInfo.url, '_blank');
		}
	}
	else {
		$("#popupIdentificationCms div.cont > img").attr("src", fileInfo.letter.imgPath);
		$("#popupIdentificationCms div.cont > img").attr("alt", fileInfo.letter.ttl);
		$("#popupIdentificationCms div.cont > p").text(fileInfo.letter.ttl);

		$("#popupIdentificationCms .login").attr("href", "/sec/business/member/indexLogin/?returnUrl=" + link);

		if (fileInfo.email == "") {
			$("#email-identification-cms").val("");
		}
		else {
			$("#email-identification-cms").val(fileInfo.email);
			$("#popupIdentificationCms #email-identification-cms").attr("disabled", "disabled");
			$("#popupIdentificationCms .btn-box").hide();

			$("#popupIdentificationCms .error-msg > p").text("鍮꾩쫰�덉뒪 �뺣낫 �대엺/援щ룆 �좎껌�� 吏꾪뻾�� 二쇱꽭��.");
			$("#email-identification-cms").addClass("error");
		}

		$("#checkCmsFileBtn").data("lett-no", fileInfo.letter.lettNo);
		$("#checkCmsFileBtn").trigger("click");

		return false;
	}
}


function checkEmailCms() {
	var email = $("#email-identification-cms").val().trim();

	if (email == "") {
		$("#popupIdentificationCms .error-msg > p").text("�대찓�쇱쓣 �낅젰�� 二쇱꽭��.");
		$("#email-identification-cms").addClass("error");
	} else if (!valid.email.test(email)) {
		$("#popupIdentificationCms .error-msg > p").text("�대찓�쇱쓣 �뺥솗�� �낅젰�� 二쇱꽭��.");
		$("#email-identification-cms").addClass("error");
	} else {
		var checkYn = checkNewsletterYnCms(email);

		$.cookie('cnsntYn', checkYn);

		if (checkYn == "Y") {
			closeLayer('popupIdentificationCms');

			var lettNo = $("#checkCmsFileBtn").data("lett-no");
			downloadFileCms(lettNo);
		} else {
			$("#popupIdentificationCms .error-msg > p").text("�섏떊�숈쓽�� �대찓�쇱씠 �꾨떃�덈떎.");
			$("#email-identification-cms").addClass("error");
		}
	}
}

// �댁뒪�덊꽣 �좎껌 �щ� �뺤씤
function checkNewsletterYnCms(email) {
	var checkYn = "";

	var options = {
		url: "/sec/business/xhr/insights/checkNewsletterYn",
		data: { email: email },
		async: false,
		done: function (data) {
			checkYn = data.checkYn;
		}
	};
	ajax.call(options);

	return checkYn;
}

function cartDirect(mdlCode) {
	var mdlList = [];
	var mdl = {};
	mdl.mdlCode = mdlCode;
	mdl.qty = 1;
	mdlList.push(mdl);

	fnCartDirect(mdlList, "confirm");
}

function goGoodsInfo(mdlCode, ctaMoveStyleClassNm, ctaWindowStyleClassNm, goodsPath) {
	if (ctaMoveStyleClassNm == "2") {
		buyDirect(mdlCode, ctaWindowStyleClassNm);
	} else if (ctaMoveStyleClassNm == "1") {
		openCtaLink(goodsPath, ctaWindowStyleClassNm);
	} else if (ctaMoveStyleClassNm == "3") {
		openCtaLink(goodsPath, ctaWindowStyleClassNm);
	} else if (ctaMoveStyleClassNm == "4") {
		cartDirect(mdlCode);
	} else if (ctaMoveStyleClassNm == "5"){
		presentDirect(mdlCode, ctaWindowStyleClassNm);
	}
}

function showCarouselCountdown(targetId, timerId, dt, hr, mn) {
	try {
		var _second = 1000;
		var _minute = _second * 60;
		var _hour = _minute * 60;
		var _day = _hour * 24;
		var date = dt.split("-");
		var targetDate = new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]), Number(hr), Number(mn), 00);
		var now = new Date().getTime();
		var distDt = targetDate.getTime() - now;
		var htmlText = '';

		var days = "00";
		var hours = "00";
		var minutes = "00";
		var seconds = "00";
		if (distDt < 0) {
			clearInterval(timerId);
			$("#" + targetId).remove();
		}
		else {
			days = Math.floor(distDt / _day);
			days = (days < 10) ? "0" + days : days;
			hours = Math.floor((distDt % _day) / _hour);
			hours = (hours < 10) ? "0" + hours : hours;
			minutes = Math.floor((distDt % _hour) / _minute);
			minutes = (minutes < 10) ? "0" + minutes : minutes;
			seconds = Math.floor((distDt % _minute) / _second);
			seconds = (seconds < 10) ? "0" + seconds : seconds;

			htmlText += '<ul>';
			htmlText += '	<li>';
			htmlText += '		<div class="num">' + days + '<span class="txt">��</span></div>';
			htmlText += '	</li>';
			htmlText += '	<li>';
			htmlText += '		<div class="num">' + hours + '<span class="txt">�쒓컙</span></div>';
			htmlText += '	</li>';
			htmlText += '	<li>';
			htmlText += '		<div class="num">' + minutes + '<span class="txt">遺�</span></div>';
			htmlText += '	</li>';
			htmlText += '	<li>';
			htmlText += '		<div class="num">' + seconds + '<span class="txt">珥�</span></div>';
			htmlText += '	</li>';
			htmlText += '</ul>';

			$("#" + targetId).html(htmlText);
		}
	} catch (e) {
		clearInterval(timerId);
	}
}

function downloadCoupon(stContextPath, cpNo, mdlCode) {
	$.ajax({
		url: stContextPath + 'xhr/coupon/goods/download'
		, type: "POST"
		, async: false
		, data: { cpNoList: cpNo }
		, success: function (result) {
			if (result.resultCode === "S" || result.exCode === "COP0009" || result.exCode === "COP0011") {
				// �λ컮援щ땲 �대룞
				cartDirect(mdlCode);
			} else {
				var callbackFunction = "";
				if (result.exCode == "COP0024") {
					callbackFunction = function () { window.location.href = $(".stPathTemp").eq(0).val() + "member/indexLogin/?returnUrl=" + window.location.pathname + window.location.search };
				}
				var alertData = {
					title: ""
					, content: result.exMsg
					, callback: callbackFunction
					, btnText: "�뺤씤"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return;
			}
		}
	});
}

function enterGroupBuy(stContextPath, grpBuyNo, obj) {
	$.ajax({
		url: stContextPath + 'xhr/enterGroupBuy'
		, type: "POST"
		, async: false
		, data: { grpBuyNo: grpBuyNo }
		, success: function (data) {
			if (data.isLogin) {
				var alertData = {
					title: ""
					, content: data.resultMsg
					, callback: ""
					, btnText: "�뺤씤"
				};
				if (data.success) {
					fnGetGrpPrdCardForComponent(obj);
				}
				commonAlert(alertData);
				openLayer('commonAlert');
				return;
			} else {
				var alertData = {
					title: ""
					, content: "濡쒓렇�몄씠 �꾩슂�⑸땲��."
					, callback: function () { window.location.href = $(".stPathTemp").eq(0).val() + "member/indexLogin/?returnUrl=" + window.location.pathname + window.location.search }
					, btnText: "�뺤씤"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
			}
		}
	});
}

function getParam(name) {
	var curr_url = location.search.substr(location.search.indexOf("?") + 1);
	var svalue = "";
	if (curr_url != "") {
		var params = curr_url.split("&");
		for (var i=0; i<params.length; i++) {
			var temp = params[i].split("=");
			if (temp[0] == name) {
				svalue = temp[1];
			}
		}
	}
	
	return svalue;
}

function getGrpBuySnsShareUrl() {
	var url = window.location.href.substr(0, window.location.href.indexOf("?"));

	if (url == "") {
		url = window.location.href;
	}

	return url;
}

// compo31 Navigation bar
function navigationBar() {
	var targetElement = $('.type-visual');
	var targetSlide = targetElement.find('.navigation');
	var navVisual = true;
	function checkWidth() {
		$('.navigation').each(function () {
			var sum = 0;
			var _this = $(this);
			var navW = _this.outerWidth(true);
			var settings = {
				slidesPerView: 'auto',
				slideToClickedSlide: false,
				navigation: {
					nextEl: _this.find('.btn-next'),
					prevEl: _this.find('.btn-prev'),
				},
				centeredSlides: true,
				centeredSlidesBounds: true,
				breakpoints: {
					801: {
						centeredSlides: false,
						centeredSlidesBounds: false,
					},
				}
			}
			// 由ъ뒪�� �볦씠 �⑹궛
			_this.find('.item').each(function (index) {
				sum += parseInt($(this).outerWidth(true), 10);
			});
			// 由ъ뒪�멸� �볦씠蹂대떎 �닿꼍��
			if (sum > navW) {
				if (_this.hasClass('swiper-container-initialized')) {
					_this.data('slider').updateSlides();
				}
				// �щ씪�대뜑媛� �놁쓣寃쎌슦
				else {
					slider = new Swiper(_this, settings);
					_this.data('slider', slider);
					_this.find('.nav-slider').css("justify-content", "flex-start");
				}
			}
			// 由ъ뒪�멸� �묒쓣寃쎌슦
			else {
				// �щ씪�대뜑媛� �덉쓣寃쎌슦
				if (_this.hasClass('swiper-container-initialized')) {
					_this.data('slider').destroy();
					_this.removeData('slider');
					_this.find('.swiper-wrapper').removeAttr('style');
					_this.find('.swiper-slide').removeAttr('style');
					_this.find('.nav-slider').removeAttr('style');
				}
			}
		});
	}
	function navFixed() {
		var navType = $('.navigation').parent().parent().parent();
		if (navType.hasClass('type-visual')) {
			var targetTop = $('.type-visual').offset().top;
			var targetTopNum = parseInt(targetTop);
		}
		else {
			var targetTop = 0;
		}
		// �ㅽ겕濡ㅼ떆 �곷떒 怨좎젙
		if (navType.hasClass('type-visual')) {
			$(window).scroll(function () {
				if (targetTopNum <= $(window).scrollTop() && navVisual == true) {
					targetElement.removeClass('type-visual');
					targetElement.addClass('fixed');
					checkWidth();
					moveLine();
					if (targetSlide.hasClass('swiper-container-initialized')) {
						targetSlide.data('slider').updateSlides();
						targetSlide.data('slider').slideTo(0, 0);
					}
					navVisual = false;
				}
				else if (targetTopNum > $(window).scrollTop() && navVisual == false) {
					targetElement.addClass('type-visual');
					targetElement.removeClass('fixed');
					checkWidth();
					if (targetSlide.hasClass('swiper-container-initialized')) {
						targetSlide.data('slider').updateSlides();
						targetSlide.data('slider').slideTo(0, 0);
					}
					navVisual = true;
				}
				else {
					return false;
				}
			});
		}
	}
	//諛묒쨪
	function moveLine() {
		var nav = $('.navigation-bar .navigation');
		var menu = nav.find('.item');
		var pos = 0;
		var wid = 0;
		// line.appendTo('.navigation-bar .navigation .slick-track');
		nav.each(function () {
			var _this = $(this);
			var active = _this.find('.active');
			var pos = active.position();
			var wid = active.width();
			var menu = _this.find('.item');
			var bar = _this.find('.line');
			if (active.length) {
				bar.css({
					left: pos.left,
					width: wid
				});
			}
			menu.mouseleave(function (e) {
				if (active.length) {
					bar.css({
						left: pos.left,
						width: wid
					});
				}
			});
		});
		menu.mouseover(function (e) {
			var _this = $(this).find('a');
			var bar = _this.parent().parent().find('.line');
			var position = _this.position();
			var width = _this.width();
			bar.css({
				left: position.left,
				width: width
			});
		});
	}
	checkWidth();
	navFixed();
	moveLine();
}

// <!-- s : 2022-02-15 �듭뀡 -->
// �꾪꽣 Swiper
function filterSel() {
	$('.filter-slick:not(.event)').each(function() {
		$(this).addClass('event');
		var _this = $(this);
		var check = _this.find('input:checked');
		var checkIdx = 0;
		
		if (check.parent().index() > 0) {
			checkIdx = check.parent().index();
			//console.log(checkIdx)
		}
		if (_this.width() > _this.parent().width()) {
			_this.parent().addClass('slideOn');
			var slider = new Swiper(_this, {
				slidesPerView: 'auto',
				slideToClickedSlide: true,
				initialSlide: check.parent().index(),
				navigation: {
					nextEl: _this.find('.btn-next'),
					prevEl: _this.find('.btn-prev'),
				},
				spaceBetween: 5,
				breakpoints: {
					801: {
						spaceBetween: 8,
					},
					1441: {
						spaceBetween: 10,
					}
				}
			});
			slider.slideTo(checkIdx);
		}
	});
}
// <!-- e : 2022-02-15 �듭뀡 -->

function fnGetMdPickForComponent(obj) {

	var goodsId = $(obj).data('goods-id');
	var orgGoodsId = $(obj).data('org-goods-id');
	var targetId = $(obj).data('target-id');
	var componentId = $(obj).data('component-id');
	var stContextPath = $(obj).data('st-context-path');
	var svmnAmtDispYn = $(obj).data('svmn-amt-disp-yn');
	var lastPrcText = $(obj).data('last-prc-text');
	var ctaMoveStyle = $(obj).data('cta-move-style');
	var ctaWindowStyleClassNm = $(obj).data('cta-window-style-class-nm');
	var bgColor = $(obj).data('bg-color');

	if ($(obj).prop('checked') || (!$(obj).hasClass('focused') && !$(obj).hasClass('disabled'))) {
		$.ajax({
			url: stContextPath + 'xhr/display/componentGoodsForMdPick'
			, type: "POST"
			, data: {
				goodsId: goodsId
				, targetId: targetId
				, svmnAmtDispYn: svmnAmtDispYn
				, lastPrcText: lastPrcText
				, ctaMoveStyle: ctaMoveStyle
				, ctaWindowStyleClassNm: ctaWindowStyleClassNm
				, bgColor: bgColor
				, orgGoodsId: orgGoodsId
			}
			, success: function (data) {
				if (data.html != null && data.html != "") {
					$('#' + data.targetId).html(data.html);
					const observer = lozad();
					observer.observe();
				}
				/* 2020-10-30 �섏젙 */
				$("#" + componentId + " .card-images").each(function () {
					$(this).height($(this).outerWidth());
				});
				listHeightControl('#' + componentId, '.box-product-card');
				$(window).scrollTop($('#' + targetId).offset().top);
				filterSel();
				colorOptSel();
				/* // 2020-10-30 �섏젙 */
			}
		});
	}
}

//怨듬룞援щℓ 罹먯떆�ъ슜�� 濡쒕뵫�� �뺣낫 議고쉶
function fnGetGrpBuyList() {
    var stContextPath = $("#viewStContextPath").val();
	var grpBuyNo = "";
	var grpBuyNos = [];
	var goodsIds = [];

	$("[name=grpBuyInfo]").each(function(){
		if(!$(this).children(".count-bar-box").hasClass("success")){
		grpBuyNo = $(this).data("grpbuyno");
		if(grpBuyNo != undefined){
			grpBuyNos.push(grpBuyNo);
		}
		goodsId = $(this).data("goodsid");
		if(goodsId != undefined){
			goodsIds.push(goodsId);
		}
		}
	});
	grpBuyNos = Array.from(new Set(grpBuyNos));
	goodsIds = Array.from(new Set(goodsIds));
	grpBuyNos = grpBuyNos.sort();
	goodsIds = goodsIds.sort();

	if(grpBuyNos.length > 0 || goodsIds.length > 0){
		var options = {
			url : stContextPath + 'xhr/display/getGrpBuyListAjax'
		  , data : { grpBuyNos : grpBuyNos
			       , goodsIds : goodsIds
			}
		  , done : function(data){
				var grpBuyList = data.grpBuyList;
				var stContextPath = $("#viewStContextPath").val();
				
				// S : for
				for(var i in grpBuyList){
					
					var grpBuy = grpBuyList[i];
					var grpBuyNo = grpBuy.grpBuyNo;
					var goodsId = grpBuy.goodsId;
					var divGrpBuy = $("[name=grpBuyInfo][data-grpbuyno=" + grpBuyNo + "][data-goodsid=" + goodsId + "]");
					var compNo = $(divGrpBuy).data("compno");
					var grpBuyIndex = $(divGrpBuy).data("grpbuyindex");
					var grpBuyId = grpBuyNo + "_" + goodsId;
					grpBuy.joinCnt = Number(grpBuy.joinCnt);
					grpBuy.trgtQty = Number(grpBuy.trgtQty);
					
					// �곹뭹紐�
					$("[name=goodsNm_"+grpBuyId+"]").text(grpBuy.goodsNm);
					
					// 紐⑤뜽肄붾뱶
					$("[name=mdlCode_"+grpBuyId+"]").text(grpBuy.mdlCode);
					
					// 理쒖냼 紐�(紐⑺몴�몄썝)
					$("[name=trgtQty_"+grpBuyId+"]").text(grpBuy.trgtQty);
					
					// �꾨줈洹몃젅�ㅻ컮
					$("[name=countBarBox_"+grpBuyId+"]").removeClass("success");  // �띿뒪�몃컯�� 而щ윭
					if(grpBuy.joinCnt < grpBuy.trgtQty){
						$("[name=prgBar_"+grpBuyId+"]").css("width", (grpBuy.joinCnt / grpBuy.trgtQty * 100) + "%");
						
						// �좎껌�쒖옉 OR n紐낅쭔��
						if(grpBuy.joinCnt == 0){
							$("[name=barTxt_"+grpBuyId+"]").text("�좎껌 �쒖옉!");
						} else {
							$("[name=barTxt_"+grpBuyId+"]").html("<span class='num'>"+ (grpBuy.trgtQty - grpBuy.joinCnt) + "</span>紐낅쭔 ��!");
						}
					} else {
						$("[name=countBarBox_"+grpBuyId+"]").addClass("success");  // �띿뒪�몃컯�� 而щ윭
						$("[name=barTxt_"+grpBuyId+"]").text("怨듬룞援щℓ �깃났!");
						$("[name=prgBar_"+grpBuyId+"]").css("width", "100%");
					}
					
					// �먮ℓ媛�
					$("[name=prdPrice1_"+grpBuyId+"]").text(grpBuy.prdPrice1);
					
					// 怨듬룞援щℓ媛�
					$("[name=grpPrice_"+grpBuyId+"]").text(fnComma(grpBuy.salePrice - grpBuy.cpDcAmt));
					
					// �� 援щℓ �좎갑�� (success �ㅼ젙)
					$("[name=salePsbQty_"+grpBuyId+"]").text(grpBuy.salePsbQty);
					$("[name=tagBox01_"+grpBuyId+"]").removeClass("success");
					if(grpBuy.joinCnt >= grpBuy.trgtQty){
						$("[name=tagBox01_"+grpBuyId+"]").addClass("success");
					}
					
					// 怨듬룞援щℓ�좎껌 CTA�ㅼ젙
					var ctaHtml = "";
					$("[name=grpBtn_"+grpBuyId+"]").remove();
					if(grpBuy.grpBuySaleStatCd == "20"){
						ctaHtml = "<button name='grpBtn_" + grpBuyId + "' type='button' class='btn btn-d btn-type2 disable'>�먮ℓ 以�鍮꾩쨷</button>";
					} else if(grpBuy.saleStatCd != "12"){
						ctaHtml = "<button name='grpBtn_" + grpBuyId + "' type='button' class='btn btn-d btn-type2 disable'>�좎갑�� �먮ℓ 醫낅즺</button>";
					} else if(grpBuy.ingYn != "Y"){
						ctaHtml = "<button name='grpBtn_" + grpBuyId + "' type='button' class='btn btn-d btn-type2 disable'>怨듬룞援щℓ媛� " 
	                            + "<span>" + fnComma(grpBuy.salePrice - grpBuy.cpDcAmt) + "</span>�� "
	                            + "</button>";
					} else if(grpBuy.joinCnt >= grpBuy.trgtQty){
						ctaHtml = "<button name='grpBtn_" + grpBuyId + "' type='button' class='btn btn-d btn-type3' "
	                            + "onclick=\"downloadCoupon('" + stContextPath + "'," + grpBuy.cpNo + ",'" + grpBuy.mdlCode + "');\"> "
	                            + "怨듬룞援щℓ媛� <span>" + fnComma(grpBuy.salePrice - grpBuy.cpDcAmt) + "</span>�� "
	                            + "</button>";					
					} else if(grpBuy.mbrJoinCnt > 0){
						ctaHtml = "<button name='grpBtn_" + grpBuyId + "' type='button' class='btn btn-d btn-type2 disable' onclick='appliedGrpBuy();'>�좎껌 �꾨즺</button>";					
					} else {
						ctaHtml = "<button name='grpBtn_" + grpBuyId + "' type='button' class='btn btn-d btn-type2 hvr-pulse' "
	                            + "onclick=\"enterGroupBuy('" + stContextPath + "', " + grpBuyNo + ", this);\" " 
	                            + "data-goods-id='" + goodsId + "' " 
	                            + "data-target-id='prdSel_" + compNo + "_" + grpBuyIndex + "' "
	                            + "data-component-id='slicePrdSel_" + compNo + "' "
	                            + "data-st-context-path='" + stContextPath + "' "
	                            + "data-group-buy-no='" + grpBuyNo + "'>怨듬룞援щℓ �좎껌�섍린"
	                            + "</button>";
					}
					$("[name=grpBtns_"+grpBuyId+"]").prepend(ctaHtml);
					
					// 湲덉븸��蹂�/�ㅻ떎�듭꽑 �ъ씤��
					$("[name=aplPntAmt_"+grpBuyId+"]").empty();
					if((grpBuy.aplPntAmt1 != null && grpBuy.aplPntAmt1 != "" && Number(grpBuy.aplPntAmt1) > 0)
					|| (grpBuy.aplPntAmt2 != null && grpBuy.aplPntAmt2 != "" && Number(grpBuy.aplPntAmt2) > 0)){
						var pointTxt = "";
						pointTxt += "<div class='point-txt'>";
						if(grpBuy.aplPntAmt1 != "" && Number(grpBuy.aplPntAmt1) > 0){
							pointTxt += "<p>�쇱꽦移대뱶 湲덉븸��蹂� 寃곗젣�쇳븷�� <span>" + fnComma(grpBuy.aplPntAmt1) + "P</span></p>";
						}
						if(grpBuy.aplPntAmt2 != "" && Number(grpBuy.aplPntAmt2) > 0){
							pointTxt += "<p>�ㅻ떎�듭꽑 �ъ씤�� <span>" + fnComma(grpBuy.aplPntAmt2) + "P</span></p>";
						}
						pointTxt += "</div>";
						$("[name=aplPntAmt_"+grpBuyId+"]").html(pointTxt);
					}
					
					// 怨듬룞援щℓ�ㅻ챸1/怨듬룞援щℓ�ㅻ챸2
					$("[name=goodsDscrt_"+grpBuyId+"]").empty();
					if((grpBuy.goodsDscrt1 != null && grpBuy.goodsDscrt1 != "") 
					|| (grpBuy.goodsDscrt2 != null && grpBuy.goodsDscrt2 != "")){
						var dscrtTxt = "";
						dscrtTxt += "<ul class='li-dot'>";
						if(grpBuy.goodsDscrt1 != null && grpBuy.goodsDscrt1 != ""){
							dscrtTxt += "<li>" + grpBuy.goodsDscrt1 + "</li>";
						}
						if(grpBuy.goodsDscrt2 != null && grpBuy.goodsDscrt2 != ""){
							dscrtTxt += "<li>" + grpBuy.goodsDscrt2 + "</li>";
						}
						dscrtTxt += "</ul>";
						$("[name=goodsDscrt_"+grpBuyId+"]").html(dscrtTxt);
					}
				}
				// E : for
			}
		};
		ajax.call2(options);
	}
}