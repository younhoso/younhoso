
	<div id="footer" class="footer_wrap">
		<div class="footer_in">
			<div class="sns_area">
                <?php include APPPATH."views/$nation/desk/common/v2/_default_social.php"; ?>
			</div>
			<a href="/" class="logo_footer"><img src="/assets/images/desk/logo_footer.png" alt="NGO I LOVE AFRICA" /></a>
			<div class="footer_txt">
				<ul class="footer_lst">
					<li><a href="<?php echo SUPPORT_REGULAR_URL; ?>" target="_blank">후원하기</a></li>
					<li><a style="cursor:pointer" onclick="popView('<?php echo SUPPORT_ENTERPRISE_URL; ?>');">제휴문의</a></li>
					<li><a href="/index.php/etc/rule">이용약관</a></li>
					<li><a href="/index.php/etc/privacy">개인정보처리방침</a></li>
					<li><a href="/index.php/etc/sitemap">사이트맵</a></li>
				</ul>
				<div class="footer_terms">
					<strong>사단법인아이러브아프리카 <span class="tx1">아프리카 전문</span> <span class="tx2">구제구호개발</span> <span class="tx3">비정부단체</span></strong> <span class="bar">|</span> 대표 : 이창옥 <span class="bar">|</span> 사업자번호 : 107-82-15120<br />
				</div>
				<address>
					대표전화 : 1577-1855  <span class="bar">|</span>  기업/단체문의전화 : 02-780-7111  <span class="bar">|</span>  이메일 : <a href="mailto:iloveafrica1@iloveafrica.or.kr">iloveafrica1@iloveafrica.or.kr</a> / <a href="mailto:info@iloveafrica.or.kr">info@iloveafrica.or.kr</a><br />
					서울특별시 종로구 새문안로92, 1917호
				</address>
				<p class="footer_desc">※ 본 웹사이트는 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단 수집되는 것을 거부합니다. <br />
				이를 위반시 『정보통신망이용촉진 및 정보보호등에 관한법률』등에 의해 처벌 받을 수 있습니다.</p>
			</div>
			<? if( $this->agent->is_mobile() ) { ?>
			<div class="footer_btn_mobile" style="display:block;">
				<a href="javascript:changeToMobile();">모바일 버전보기</a>
			</div>
			<? } ?>
		</div>
	</div>
</div>


<script type="text/javascript" src="/assets/js/jquery.bxslider.min.js"></script>
<script type="text/javascript" src="/assets/js/desk/ila.js"></script>
<script>
$(document).ready(function(){
	$('.main_slider').bxSlider({
	mode:'fade',
	slideMargin: 0,
	auto: true, 
	autoHover: false, 
	controls: false
	});
	$("#mainSticky").stick_in_parent();

	console.log("test2");
});

function popView(url) {
    window.open(url, "window", "width=650, height=700 scrollbars=yes");
}
</script>


</body>
</html>
