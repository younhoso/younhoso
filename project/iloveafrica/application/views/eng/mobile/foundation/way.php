
<?php include APPPATH."views/$nation/mobile/foundation/sub_tab.php"; ?>
<div class="sub_cont_c">
	<div class="sub_title">찾아오시는 길</div>
	<!-- * Daum 지도 - 지도퍼가기 -->
	<!-- 1. 지도 노드 -->
	<div id="daumRoughmapContainer1541139894241" class="root_daum_roughmap root_daum_roughmap_landing"></div>

	<!--
		2. 설치 스크립트
		* 지도 퍼가기 서비스를 2개 이상 넣을 경우, 설치 스크립트는 하나만 삽입합니다.
	-->
	<script charset="UTF-8" class="daum_roughmap_loader_script" src="http://dmaps.daum.net/map_js_init/roughmapLoader.js"></script>

	<!-- 3. 실행 스크립트 -->
	<script charset="UTF-8">
		new daum.roughmap.Lander({
			"timestamp" : "1541139894241",
			"key" : "qp6w",
			"mapWidth" : "375",
			"mapHeight" : "300"
		}).render();
	</script>
	<dl class="map_dl">
		<dt>주소 및 대표번호</dt>
		<dd style="margin-bottom:5px">서울특별시 종로구 새문안로 92, 1917호 <br />    (신문로1가 163, 광화문 오피시아 빌딩)</dd>
		<dd class="tx_point">대표전화 : 1577-1855</dd>
		<dd class="tx_point">기업/단체문의전화 : 02-780-7111</dd>
	</dl>
	<dl class="map_dl">
		<dt>버스로 오실 때</dt>
		<dd>지선(초록버스) : 7023, 7019</dd>
		<dd>간선(파랑버스) : 160, 161, 200, 270, 262, 273, 260, 271, 370, 470, 471, 600, 601, 602, 702, 703, 705, 706, 720</dd>
		<dd>광역(빨강버스) : 9701, 9702, 9704, 9709, 0710</dd>
		<dd>공항버스 : 602</dd>
	</dl>
	<dl class="map_dl">
		<dt>지하철로 오실 때</dt>
		<dd>5호선 광화문역  6번출구</dd>
		<dd>1호선 시청역 3번출구</dd>
		<dd>2호선 시청역 12번출구</dd>
	</dl>
</div>