var shareSet = false;
var shareUrl = "";
var shareTitle = "";
var shareImage = "";
var shareDesc = "";
var shareList = "";
var kakaoAppKey = "";

function shareInit(kakaoKey, facebookId) {
	kakaoAppKey = kakaoKey;
	Kakao.init(kakaoAppKey)
}

function openSns(url, title, image, desc) {
	shareUrl = url;
	shareTitle = title;
	shareImage = image;
	shareDesc = desc;
	shareSet = true
}
if (kakaoAppKey != "" && kakaoAppKey != null && kakaoAppKey != undefined) Kakao.init(kakaoAppKey);

var snsShare = {

	facebook: function(url) {
		if (url == null || url == "") url = document.location.href;
		window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url), "facebookSharePopup", "resizable=no width=526 height=158")
	},

	kakaoTalk: function(url, title, image, desc, imgWidth, imgHeight, buttonTitle) {
		
		if (url == null || url == "") url = document.location.href;

		var setting = {
			objectType: "feed",
			content: {
				title: title,
				description: desc,
				imageUrl: image,
				link: {
					mobileWebUrl: url,
					webUrl: url
				}
			},
			buttons: [{
				title: buttonTitle ? buttonTitle : "�먯꽭�� 蹂닿린",
				link: {
					mobileWebUrl: url,
					webUrl: url
				}
			}],
			installTalk: true,
			fail: shareFail
		};

		if (imgWidth) setting.content.imageWidth = imgWidth;
		if (imgHeight) setting.content.imageHeight = imgHeight;
		
		Kakao.Link.sendDefault(setting);
	},
	
	kakaoTalkNewVer : function(url, title, image, desc, imgWidth, imgHeight, buttonTitle) {
		
		if (url == null || url == "") url = document.location.href;

		var setting = {
			objectType: "feed",
			content: {
				title: title,
				description: desc,
				imageUrl: image,
				link: {
					mobileWebUrl: url,
					webUrl: url
				}
			},
			buttons: [{
				title: buttonTitle ? buttonTitle : "�먯꽭�� 蹂닿린",
				link: {
					mobileWebUrl: url,
					webUrl: url
				}
			}],
			installTalk: true,
			fail: shareFail
		};
		
		if (imgWidth) setting.content.imageWidth = imgWidth;
		if (imgHeight) setting.content.imageHeight = imgHeight;

		Kakao.Share.sendDefault(setting);
	},
	
	kakaoTalkCallback: function(url, title, image, desc, eventNo, mbrNo) {
		if (url == null || url == "") url = document.location.href;
		var setting = {
			objectType: "feed",
			content: {
				title: title,
				description: desc,
				imageUrl: image,
				link: {
					mobileWebUrl: url,
					webUrl: url
				}
			},
			buttons: [{
				title: "�먯꽭�� 蹂닿린",
				link: {
					mobileWebUrl: url,
					webUrl: url
				}
			}],
			serverCallbackArgs: {
				eventNo: eventNo,
				mbrNo: mbrNo
			},
			installTalk: true,
			fail: shareFail
		};
		Kakao.Link.sendDefault(setting)
	},
	kakaoStory: function(url, title, image, desc) {
		if (url ==
			null || url == "") url = document.location.href;
		var text = title;
		if (title != desc) text += "\n" + desc;
		Kakao.Story.share({
			url: url,
			text: text
		})
	},
	
	kakaoTalkGalcams: function(url, title, desc) {
		if (url == null || url == "") url = document.location.href;

		var setting = {
				templateId: 97029,
				templateArgs: {
					title: title,
					desc: desc,
					webUrl: url
				}
		};

		Kakao.Share.sendCustom(setting);
	}
};

function share(type) {
	if (!shareSet) {
		shareUrl = $(location).attr("href");
		shareTitle = $("meta[name='title']").attr("content");
		shareImage = $("meta[property='og:image']").attr("content");
		shareDesc = $("meta[name='description']").attr("content")
	}
	if (type == "facebook") snsShare.facebook(shareUrl);
	else if (type == "kakaostory") snsShare.kakaoStory(shareUrl, shareTitle, shareImage, shareDesc);
	else if (type == "kakaotalk") snsShare.kakaoTalk(shareUrl, shareTitle, shareImage, shareDesc)
}

function shareFail() {
	var alertData = {
		title: "alert",
		content: "移댁뭅�ㅽ넚 怨듭쑀�섍린 湲곕뒫�� �ㅽ뻾�� �� �녿뒗 �섍꼍�낅땲��."
	};
	commonAlert(alertData);
	openLayer("commonAlert")
}

function KakaoShare(data) {
	console.log(data);
	var setting = {};
	if (data.url == null || data.url == "") data.url = document.location.href;
	if (data.objectType === "feed") setting = {
		objectType: "feed",
		content: {
			title: data.title,
			imageUrl: data.image,
			link: {
				mobileWebUrl: data.url,
				webUrl: data.url
			}
		},
		buttons: [{
			title: "�먯꽭�� 蹂닿린",
			link: {
				mobileWebUrl: data.url,
				webUrl: data.url
			}
		}],
		installTalk: true,
		fail: shareFail
	};
	if (data.objectType === "location") setting = {
		objectType: "location",
		address: data.address,
		addressTitle: data.addressTitle,
		content: {
			title: data.title,
			imageUrl: "",
			link: {
				mobileWebUrl: data.url,
				webUrl: data.url
			}
		},
		buttons: [{
			title: "�곸꽭 �뺣낫",
			link: {
				mobileWebUrl: data.url,
				webUrl: data.url
			}
		}]
	};
	if (data.objectType === "list") setting = {
		objectType: "list",
		headerTitle: data.header,
		headerLink: {
			webUrl: data.shopUrl,
			mobileWebUrl: data.shopUrl
		},
		contents: data.content
	};
	Kakao.Link.sendDefault(setting);
};

