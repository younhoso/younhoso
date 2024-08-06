    <? 
    $turi = $_SERVER["REQUEST_URI"];
    if( $turi != "/" ) { ?>
    </div>
    <? } ?>

</div>
<!-- //Content -->


<div id="footer" class="footer_wrap">
		<div class="footer_in">
			<ul class="footer_lst">
				<li><a href="<?php echo SUPPORT_REGULAR_URL; ?>" target="_blank">후원하기</a></li>
				<li><a style="cursor:pointer" onclick="popView('<?php echo SUPPORT_ENTERPRISE_URL; ?>');">제휴문의</a></li>
				<li><a href="/index.php/etc/rule">이용약관</a></li>
				<li><a href="/index.php/etc/privacy">개인정보처리방침</a></li>
				<li><a href="https://www.p2pdc.or.kr/main.do" target="_blank">민간외교단체 커뮤니티</a></li>
			</ul>
			<a href="/" class="logo_footer"><img src="/assets/images/desk/logo_footer.png" alt="NGO I LOVE AFRICA" /></a>
			<div class="footer_terms">
				사단법인 아이러브아프리카 <span class="tx1">아프리카 전문</span> <span class="tx2">국제구호개발</span> 비정부단체
			</div>
			<div class="sns_area" style="display:none;">
                <?php include APPPATH."views/$nation/desk/common/v2/_default_social.php"; ?>
			</div>
			<address>
				<p>대표 : 이창옥 사업자번호 : 107-82-15120</p>
				<p>서울특별시 영등포구 여의서로 43 912호(여의도동, 한서리버파크)</p>
				<p>대표전화 : 02-780-7111 <span>|</span> 이메일 : <a href="mailto:iloveafrica9@naver.com">iloveafrica9@naver.com</a> <span>|</span> <a href="mailto:info@iloveafrica.or.kr">info@iloveafrica.or.kr</a></p> 
			</address>
			<div class="footer_numbers">
				<div class="num_wrap">
					<p>정기/일시 후원</p>
					<p class="num">1577-1855</p>
				</div>
				<div class="num_wrap">
					<p>ARS 후원</p>
					<p class="num">060-700-0789</p>
				</div>
				<div class="num_wrap">
					<p>후원 문의</p>
					<p class="num">02-780-7111</p>
				</div>
			</div>
			<p class="footer_desc">본 웹사이트는 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단 수집되는 것을 거부합니다. 
				이를 위반시 『정보통신망이용촉진 및 정보보호등에 관한법률』등에 의해 처벌 받을 수 있습니다.</p>
			
			<? if( $this->agent->is_mobile() ) { ?>
			<div class="footer_btn_mobile" style="display:none;">
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


<!-- Footer -->
<!-- <div id="footer" class="footer_wrap">
	<div class="footer_in">
		<div class="sns_area">
            <a href="https://www.youtube.com/user/IloveafricaNGO" target="_blank" class="ic_ut"><span class="blind">Youtube</span></a>
			<a href="https://www.facebook.com/ngoiloveafrica/" target="_blank" class="ic_fb"><span class="blind">FaceBook</span></a>
			<a href="https://www.instagram.com/ngoiloveafrica/" target="_blank" class="ic_in"><span class="blind">Instagram</span></a>
			<a href="http://blog.naver.com/iloveafrica1" target="_blank" class="ic_nb"><span class="blind">Naver Blog</span></a>
			<a href="https://post.naver.com/iloveafrica1" target="_blank" class="ic_np"><span class="blind">Naver Post</span></a>
            <a href="http://www.twitter.com/ngoiloveafrica" target="_blank" class="ic_tw"><span class="blind">Twitter</span></a>
		</div>
		<div class="footer_txt">
			<ul class="footer_lst">
                <li><a href="<?php echo SUPPORT_REGULAR_URL; ?>" target="_blank">후원하기</a></li>
				<li><a href="<?php echo SUPPORT_ENTERPRISE_URL; ?>" target="_blank">제휴문의</a></li>
				<li><a href="/index.php/etc/rule">이용약관</a></li>
				<li><a href="/index.php/etc/privacy">개인정보처리방침</a></li>
			</ul>
			<div class="footer_terms">
				<strong><span class="tx3">사단법인 아이러브아프리카</span> <span class="tx1">아프리카 전문</span> <span class="tx2">국제구호개발</span> <span class="tx3">비정부단체</span></strong> 대표 : 이창옥 <span class="bar">|</span> 사업자번호 : 107-82-15120<br />
			</div>
			<address>
				정기/일시후원 : 1577-1855  <span class="bar">|</span>  대표전화 : 02-780-7111<br /> 기업/단체문의 : 02-780-7111  <span class="bar">|</span>  ARS후원 : 060-700-0789<br />이메일 : <a href="mailto:iloveafrica9@naver.com">iloveafrica9@naver.com</a> / <a href="mailto:info@iloveafrica.or.kr">info@iloveafrica.or.kr</a><br />
				서울특별시 영등포구 여의서로 43  912호(여의도동, 한서리버파크)
			</address>
		</div>
		<a href="#" class="logo_footer"><span class="blind">NGO I LOVE AFRICA</span></a>
		<p class="footer_desc">※ 본 웹사이트는 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단 수집되는 것을 거부합니다.
				이를 위반시 『정보통신망이용촉진 및 정보보호등에 관한법률』등에 의해 처벌 받을 수 있습니다.</p>
		<div class="footer_btn_pc">
			<a href="javascript:changeToDesk();">PC버전보기</a>
		</div>
	</div>
</div> -->
<!-- //Footer -->

</div>
</body>
</html>