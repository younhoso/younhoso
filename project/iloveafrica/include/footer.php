<script>
<? $rand = mt_rand(0,3); ?>
$(function(){
	$('.new_banner > div:eq(<?=$rand?>)').css("display","block");
	//$(".lnb_bg").css("height",$('.main').height() - $('.lnb').height());
});
</script>
	<div class="new_banner"
	<? if(preg_match("/index/",$_SERVER["PHP_SELF"]) || preg_match("/sitemap/",$_SERVER["PHP_SELF"]) || preg_match("/sub10/",$_SERVER["PHP_SELF"]) || preg_match("/sub09/",$_SERVER["PHP_SELF"])|| preg_match("/support/",$_SERVER["PHP_SELF"]) || preg_match("/sub02/",$_SERVER["PHP_SELF"])) { ?> style="display:none;"<? }{ ?><? } ?>  style="padding:0px 0 35px 0;">
		<div class="bn1">
			<h2>식수개발개선사업후원</h2>
			<p>물이 부족한 도시 빈민지역과 원주민 마을의 어린이와 청소년, 지역사의 주민들과 가축들을 대상으로 이들 모두가 공동으로 사용할 수 있는 우물(혹은 식수 공급장치)을 설치합니다.</p>
			<a href="https://mrmweb.hsit.co.kr/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=join" target="_blank"><img src="img/bn_bt.jpg"></a>
		</div>
		<div class="bn2">
			<h2>1:1결연후원사업</h2>
			<p>아이러브 아프리카에서 지원하고 있는 빈곤국가의 아동과 후원자가 1:1로 결열을 맺어 아동이 건강하게 성장 할 수 있도록 지속적으로 돕게됩니다. </p>
			<a href="https://mrmweb.hsit.co.kr/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=join" target="_blank"><img src="img/bn_bt.jpg"></a>
		</div>
		<div class="bn3">
			<h2>환경개발개선사업</h2>
			<p>아이러브아프리카는 제바 환경의 부족으로 고통받는 아프리카 어린이들과 지역 주민들이 꺠끗한 환경에서 생활하므로 인간다운 삶을 살수있도록하는데 목적을 가지고 있습니다.</p>
			<a href="https://mrmweb.hsit.co.kr/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=join" target="_blank"><img src="img/bn_bt.jpg"></a>
		</div>
		<div class="bn4">
			<h2>교육개발개선사업</h2>
			<p>아이러브아프리카는[꿈망교육사업(꿈+희망=교육=미래)]을 통해 열악한 교육 환경과 지역을 개선하고 교육을 통해 아프리카 어린이들과 지역주민들에게 꿈과 희망을 심어주고자 합니다.</p>
			<a href="https://mrmweb.hsit.co.kr/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=join" target="_blank"><img src="img/bn_bt.jpg"></a>
		</div>
	</div><!-- // new_banner -->
	</div><!-- // main -->
</div><!-- // contents -->
<? if(preg_match("/index/",$_SERVER["PHP_SELF"])) { ?><div class="footer_bg_m"><? }
else  {?><div class="footer_bg"><? } ?>
    <div class="footer">
        <div class="footer_line"></div>
		<!--<div class="lnb_bg"></div>-->
            <h1><!-- <img src="img/footer_logo.png" alt="로고" /> --><img src="img/logo.png" alt="로고" /></h1>
            <div class="add">
            <ul>
            <li><a href="sub01_01_01_01_01.php" class="footer_bt1"></a></li>
            <!-- <li><a href="sub01_01_05_01_01.php" class="footer_bt2"></a></li>  -->
            <li><a href="https://mrmweb.hsit.co.kr/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=join" target="_blank" class="footer_bt3"></a></li>
            <li><a href="support.php?mode=VIEW&si_no=32&lm=10" class="footer_bt4"></a></li>
            <li><a href="sub03_02_07_01_01.php" class="footer_bt5"></a></li>
            <li><a href="board.php?b_class=8" class="footer_bt6"></a></li>
            <li><a href="sub09_05_01_01_01.php" class="footer_bt7"></a></li>
            <li><a href="sub09_06_01_01_01.php" class="footer_bt8"></a></li>
            <li><a href="sub09_07_01_01_01.php" class="footer_bt9"></a></li>
            </ul>            
            <address><img src="img/footer_copy.png" alt="아이러브아프리카는 외교통상부의 승인을 받아 아프리카를 전문으로 하는 국제구호단체이며 대한민국을 본부로 하는 NGO입니다. 대표전화 : 1577-1855 기업/단체문의전화 : 02)780-9991 이메일 : help@iloveafrica.or.kr 사단법인 아이러브 아프리카 사업자등록번호 : 107-82-15120 대표 : 이창옥 개인정보보호책임자 : 박민영 서울 영등포구 여의도동 17-20 3층" /></address>
            </div><!-- // add -->
        </div><!-- // footer -->
</div><!-- // footer_bg -->
</body>
</html>