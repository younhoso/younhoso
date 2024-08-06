<?php 
	$turi = $_SERVER["REQUEST_URI"];

	function menuCheck($uri, $u) {
		$isMatch = false;

		if(strpos($uri, $u)) {
			$isMatch = true;
		}

		return $isMatch;
    }
    
    function menuChecks($uri, $arr) {
        $isMatch = true;

        for($i = 0, $len = count($arr) ; $i < $len ; $i++) {
            $u = $arr[$i];

            if(!strpos($uri, $u)) {
                $isMatch = false;
                break;
            }
        }

		return $isMatch;
	}

	$headerName = "";
	if(isset($activemenu)) {
		$headerName = $activemenu['parent'];
	}
	if(menuCheck($turi, "foundation/followview")) {
		$headerName = '설립자 발자취';
	} elseif(menuCheck($turi, "news/relief") || menuCheck($turi, "news/reliefview")){
		$headerName = '구호활동';
	} elseif(menuCheck($turi, "news/reportview")){
		$headerName = '현장소식';
	} elseif(menuCheck($turi, "news/mediaview")){
		$headerName = '언론보도';
	} elseif(menuCheck($turi, "news/noticedetail")){
		$headerName = '공지사항';
	} elseif(menuCheck($turi, "project/well")){
		$headerName = '생명의 우물';
	}

	$isMainHeader = empty($headerName);
?>
<div id="header" class="<? echo $isMainHeader ? "main" : "sub"; ?>">
	<? if($isMainHeader) { ?>
		<h1 class="logo"><a href="/"><span class="blind">I LOVE AFRICA</span></a></h1>
	<? } else { ?>
		<button class="btn_back" onclick="history.back()"><span class="blind">돌아가기</span></button>
		<h3><?=$headerName?></h3>
	<? } ?>
	<button class="btn_menu"><span class="blind">메뉴보기</span></button>
</div>
<div class="nav_menu">
	<div class="menu_wrap">
		<a href="/index.php" class="logo">
			<h1><span class="blind">I LOVE AFRICA</span></h1>
		</a>
		<div class="login_bx">
            <a href="<?php echo SUPPORT_REGULAR_URL; ?>" target="<?php echo SUPPORT_REGULAR_TARGET; ?>">후원 및 회원가입</a>
			<span class="bar">|</span>
			<a href="<? echo SUPPORT_MY; ?>" target="<? echo SUPPORT_MY_TARGET; ?>">나의 후원정보</a>
		</div>
		<div class="sns_area">
            <a href="https://www.youtube.com/user/IloveafricaNGO" target="_blank" class="ic_ut"><span class="blind">Youtube</span></a>
			<a href="https://www.facebook.com/ngoiloveafrica/" target="_blank" class="ic_fb"><span class="blind">FaceBook</span></a>
			<a href="https://www.instagram.com/ngoiloveafrica/" target="_blank" class="ic_in"><span class="blind">Instagram</span></a>
			<a href="http://blog.naver.com/iloveafrica1" target="_blank" class="ic_nb"><span class="blind">Naver Blog</span></a>
			<a href="https://post.naver.com/iloveafrica1" target="_blank" class="ic_np"><span class="blind">Naver Post</span></a>
            <a href="http://www.twitter.com/ngoiloveafrica" target="_blank" class="ic_tw"><span class="blind">Twitter</span></a>
		</div>
		<ul>
            <li <?php if(menuCheck($turi, "foundation")) { ?>class="on"<?php } ?>>
				<button>아이러브아프리카</button>
				<ul class="sub_menu">
                    <li <?php if(menuCheck($turi, "foundation/about")) { ?>class="on"<?php } ?>><a href="/index.php/foundation/about">ILA는?</a></li>
					<li <?php if(menuCheck($turi, "foundation/history")) { ?>class="on"<?php } ?>><a href="/index.php/foundation/history">연혁</a></li>
					<li <?php if(menuCheck($turi, "foundation/greetings")) { ?>class="on"<?php } ?>><a href="/index.php/foundation/greetings">인사말</a></li>
					<li <?php if(menuCheck($turi, "foundation/way")) { ?>class="on"<?php } ?>><a href="/index.php/foundation/way">찾아오시는 길</a></li>
				</ul>
			</li>
			<li <?php if(menuCheck($turi, "business")) { ?>class="on"<?php } ?>>
				<button>사업소개</button>
				<ul class="sub_menu">
                    <li <?php if(menuCheck($turi, "business/water")) { ?>class="on"<?php } ?>><a href="/index.php/business/water">식수개발개선</a></li>
					<li <?php if(menuCheck($turi, "business/selfhelp")) { ?>class="on"<?php } ?>><a href="/index.php/business/selfhelp">자활기술개발</a></li>
					<li <?php if(menuCheck($turi, "business/medical")) { ?>class="on"<?php } ?>><a href="/index.php/business/medical">의료보건개선</a></li>
					<li <?php if(menuCheck($turi, "business/child")) { ?>class="on"<?php } ?>><a href="/index.php/business/child">아동복지개선</a></li>
					<li <?php if(menuCheck($turi, "business/education")) { ?>class="on"<?php } ?>><a href="/index.php/business/education">교육개발개선</a></li>
					<li <?php if(menuCheck($turi, "business/culture")) { ?>class="on"<?php } ?>><a href="/index.php/business/culture">문화체육교류</a></li>
					<li <?php if(menuCheck($turi, "business/environment")) { ?>class="on"<?php } ?>><a href="/index.php/business/environment">환경개발개선</a></li>
				</ul>
			</li>
			<li <?php if(menuCheck($turi, "news") && !menuCheck($turi, "relief")) { ?>class="on"<?php } ?>>
				<button>ILA 소식</button>
				<ul class="sub_menu">
                    <li <?php if(menuCheck($turi, "news/report")) { ?>class="on"<?php } ?>><a href="/index.php/news/report">현장소식</a></li>
					<li <?php if(menuCheck($turi, "news/media")) { ?>class="on"<?php } ?>><a href="/index.php/news/media">언론보도</a></li>
					<li <?php if(menuCheck($turi, "news/notice")) { ?>class="on"<?php } ?>><a href="/index.php/news/notice">공지사항</a></li>
					<li <?php if(menuCheck($turi, "news/download")) { ?>class="on"<?php } ?>><a href="/index.php/news/download">특별자료실</a></li>
				</ul>
			</li>
			<li <?php if(menuCheck($turi, "relief")) { ?>class="on"<?php } ?>>
				<button>구호활동</button>
				<ul class="sub_menu">
					<li <?php if(menuCheck($turi, "relief") && !menuCheck($turi, "category")) { ?>class="on"<?php } ?>><a href="/index.php/news/relief">전체보기</a></li>
					<li <?php if(menuChecks($turi, array("relief", "category=1"))) { ?>class="on"<?php } ?>><a href="/index.php/news/relief?category=1">식수개발개선</a></li>
					<li <?php if(menuChecks($turi, array("relief", "category=2"))) { ?>class="on"<?php } ?>><a href="/index.php/news/relief?category=2">자활기술개발</a></li>
					<li <?php if(menuChecks($turi, array("relief", "category=3"))) { ?>class="on"<?php } ?>><a href="/index.php/news/relief?category=3">의료보건개선</a></li>
					<li <?php if(menuChecks($turi, array("relief", "category=4"))) { ?>class="on"<?php } ?>><a href="/index.php/news/relief?category=4">아동복지개선</a></li>
					<li <?php if(menuChecks($turi, array("relief", "category=5"))) { ?>class="on"<?php } ?>><a href="/index.php/news/relief?category=5">교육개발개선</a></li>
					<li <?php if(menuChecks($turi, array("relief", "category=6"))) { ?>class="on"<?php } ?>><a href="/index.php/news/relief?category=6">문화체육교류</a></li>
					<li <?php if(menuChecks($turi, array("relief", "category=7"))) { ?>class="on"<?php } ?>><a href="/index.php/news/relief?category=7">환경개발개선</a></li>
				</ul>
			</li>
			<li <?php if(menuCheck($turi, "support")) { ?>class="on"<?php } ?>>
				<button>후원하기</button>
				<ul class="sub_menu">
                    <li <?php if(menuCheck($turi, "support/regular")) { ?>class="on"<?php } ?>><a href="/index.php/support/regular">정기후원</a></li>
					<li <?php if(menuCheck($turi, "support/onece")) { ?>class="on"<?php } ?>><a href="/index.php/support/onece">일시후원</a></li>
					<li <?php if(menuCheck($turi, "support/special")) { ?>class="on"<?php } ?>><a href="/index.php/support/special">기념일기부</a></li>
					<li <?php if(menuCheck($turi, "support/legacy")) { ?>class="on"<?php } ?>><a href="/index.php/support/legacy">유산기부</a></li>
					<li <?php if(menuCheck($turi, "support/group")) { ?>class="on"<?php } ?>><a href="/index.php/support/group">단체기부</a></li>
					<li <?php if(menuCheck($turi, "support/enterprise")) { ?>class="on"<?php } ?>><a href="/index.php/support/enterprise_intro">기관&기업후원</a></li>
				</ul>
			</li>
		</ul>
	</div>
	<button class="btn_close"><span class="blind">메뉴닫기</span></button>
</div>
<!-- //Header -->
<div class="overlay_btns on">
	<a href="<? echo SUPPORT_REGULAR_URL; ?>" target="<? echo SUPPORT_REGULAR_TARGET; ?>" id="short-btn"></a>
    <!-- <a href="<? echo SUPPORT_ONECE_URL; ?>" target="<? echo SUPPORT_ONECE_TARGET; ?>" class="btn_temporary">일시후원하기</a> -->
	<button id="scroll-btn">TOP</button>
</div>
<script>
	// $(window).scroll(function() {
	// 	if ( $(this).scrollTop() <= 100){
	// 		$('#header').removeClass('fix');
	// 		$('.overlay_btns').removeClass('on');
	// 	}else{
	// 		$('#header').addClass('fix');
	// 		$('.overlay_btns').addClass('on');
	// 	}
	// });

	$(document).ready(function(){

		$("#scroll-btn").on('click', function(){
			window.scrollTo({ top: 0, behavior: 'smooth' });
			return false
		});

	});
</script>
