if(typeof NetFunnel == "object"){
	NetFunnel.SkinUtil.add('kdp', {
		prepareCallback : function(){
			// var netFunnelLoadingPopupCount = document.getElementById("NetFunnel_Loading_Popup_Count");
			// var netFunnelLoadingPopupTimeLeft = document.getElementById("NetFunnel_Loading_Popup_TimeLeft");
			// netFunnelLoadingPopupCount.innerHTML = "0";
			// netFunnelLoadingPopupTimeLeft.innerHTML = "0";
		},
		updateCallback : function(percent,nwait,totwait,timeleft){
			var custom_timeLeft = document.getElementById("NetFunnel_Loading_Popup_TimeLeft");
			var timeLeftStr="";
			if(timeleft > (40*60)){
				timeLeftStr="40遺� �댁긽";
			}else if((40*60) > timeleft > (30*60)){
				timeLeftStr="30遺� �댁긽";
			}else if((30*60) > timeleft > (20*60)){
				timeLeftStr="20遺� �댁긽";
			}else if((20*60) > timeleft > (10*60)){
				timeLeftStr="10遺� �댁긽";
			}else if((10*60) > timeleft > (5*60)){
				timeLeftStr="5遺� �댁긽";
			}else {
			
				//NetFunnel.Util.getTimeStr(timeleft) : NetFUNNEL 湲곕낯 �쒓컙 怨꾩궛
				if(timeleft > 60) timeLeftStr = parseInt(timeleft/60) + '遺� ' + timeleft%60 + '珥�';
				else timeLeftStr = timeleft%60 + '珥�';
			}
			custom_timeLeft.innerHTML=timeLeftStr;
		},
		htmlStr : '<style>#pop_iframe { background: black !important; }</style>\
			<div id="popNetfunnel" class="net-funnel-pop net-funnel-pop2" tabindex="0" data-popup-layer="popNetfunnel" data-focus="popNetfunnel" style="z-index: 300;">\
				<div class="layer-content">\
					<div class="img-boxing">\
						<img src="/sec/static/_images/common/img-waiting-pop2.png" alt="">\
						<p>�꾩옱 �ъ씠�� �댁슜�먭� 留롮븘<br>�쒕퉬�� �묒냽 <span class="txt-blue">��湲곗쨷</span>�낅땲��</p>\
					</div>\
					<div class="waiting-boxing">\
						<p>議곌툑留� 湲곕떎�ㅼ＜�쒕㈃ �먮룞 �묒냽�⑸땲��</p>\
						<dl class="waiting-data">\
							<dt class="last">�낆옣 �쒖꽌 <span id="NetFunnel_Loading_Popup_TimeLeft" style="font-size: 1px; visibility: hidden;"></span></dt>\
							<dd class="txt-blue last"><span id="NetFunnel_Loading_Popup_Count" class="' + NetFunnel.TS_LIMIT_TEXT + '"></span>踰덉㎏</dd>\
						</dl>\
					</div>\
					<div class="noti">\
						<p>�ㅼ떆 �묒냽�섏떆硫� ��湲� �쒓컙�� �섏뼱�섎땲 �좎쓽�댁＜�몄슂!</p>\
						<button id="NetFunnel_Countdown_Stop" class="cta-exit">�섍�湲�</button>\
					</div>\
				</div>\
			</div>'
	},'normal');
}