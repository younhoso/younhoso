
<div class="page_cont">
	<?php include APPPATH."views/$nation/mobile/foundation/sub_tab.php"; ?>
	<div class="sub_cont">
		<div class="head"><h2>찾아오시는 길</h2></div>
	</div>
	<div id="daumRoughmapContainer1599455469234" class="root_daum_roughmap root_daum_roughmap_landing"></div>
	<div class="sub_cont">
		<h6 class="tit mt24 mb16">주소 및 대표번호</h6>
		<p>서울특별시 영등포구 여의서로 43  912호<br />
			(여의도동, 한서리버파크)<br>
			대표전화 : 1577-1855 / 02-780-7111<br>
			기업/단체문의전화 : 02-780-7111
		</p>
		<h6 class="tit mt24 mb16">버스로 오실 때 (여의도 순복음교회)</h6>
		<p>지선(초록버스) : 5633, 5713, 6623<br />
			간선(파랑버스) : 461, 463, 753<br>
			일반 : 1002<br>
			광역버스 : 7007-1
		</p>
		<h6 class="tit mt24 mb16">지하철로 오실 때</h6>
		<p>9호선 국회의사당역  1번출구 : 도보 10분<br />
			3번출구: 도보 15분
		</p>
		<br>
		<br>
	</div>
</div>

<!--
	2. 설치 스크립트
	* 지도 퍼가기 서비스를 2개 이상 넣을 경우, 설치 스크립트는 하나만 삽입합니다.
-->
<script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>

<!-- 3. 실행 스크립트 -->
<script charset="UTF-8">
	new daum.roughmap.Lander({
		"timestamp" : "1599455469234",
		"key" : "2zwua",
		"mapWidth" : "100%",
		"mapHeight" : "320"
	}).render();
</script>