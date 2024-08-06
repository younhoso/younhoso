<?include $_SERVER["DOCUMENT_ROOT"]."/common/common.php";?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>NGO I love AFRICA</title>
<meta name="robots" content="NGO I love AFRICA" />
<meta name="subject" content="NGO I love AFRICA" />
<meta name="author" content="ziieum comunications publisher serin" />
<meta name="keywords" content="NGO I love AFRICA" />
<meta name="description" content="NGO아이러브아프리카는 NGO 최초의 ‘아프리카 전문 국제구호개발’ 아프리카 희망나눔 전문NGO로서 외교부 산하 소속단체입니다." />
<meta name="copyright" content="copyrights NGO I love AFRICA" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link type="text/css" href="/css/style.css" rel="stylesheet" />
<link type="text/css" href="/css/sub01.css" rel="stylesheet" />
<link type="text/css" href="/css/bgstretcher.css" rel="stylesheet" />
<!--[if IE 7]>
<link href="css/ie7.css" rel="stylesheet" type="text/css" />
<![endif]-->
<script type="text/javascript" src="/js/ajax.js"></script>
<script type="text/javascript" src="/js/jquery.js"></script>
<script type="text/javascript" src="/js/img.js"></script>
<script type="text/javascript" src="/js/img_tab.js"></script>
<script type="text/javascript" src="/js/menu.js"></script>
<script type="text/javascript" src="/js/jquery.ESvalidator.js"></script>
<script type="text/javascript" src="/js/jquery.easing.1.3.js"></script>
<!--<script type="text/javascript" src="/js/lnb.js"></script>-->
<!-- <script type="text/javascript" src="/SmartEditor/js/HuskyEZCreator.js" charset="utf-8"></script> -->
<script type="text/javascript" src="/SE2/js/HuskyEZCreator.js" charset="utf-8"></script>
<script type="text/javascript" src="/js/common.js" charset="utf-8"></script>
<!--<script type="text/javascript" src="/js/layer_pop.js"></script>-->
<script type="text/javascript" src="/js/slides.min.jquery.js"></script>
<script type="text/javascript" src="/js/bgstretcher.js"></script>
<!-- 슬라이드 스크립트 -->
<link href="/js/vmcslider/style.css" rel="stylesheet" type="text/css">
    <!-- 슬라이드 스크립트 끝 -->

<script type="text/javascript">
$(document).ready(function() {
/* quick menu */
$("#quickMenu").animate( {"top":$(document).scrollTop()+750+"px"}, 500); //처음시작하는위치
$(window).scroll(function(){
$("#quickMenu").stop();
$("#quickMenu").animate( {"top":$(document).scrollTop()+750+"px"}, 500);
});
});
</script>

<div id="quickMenu" style="width:98px; height:34px; position:absolute; top:300px;left:50%; margin-left:500px; z-index:999;"><a href="https://mrmweb.hsit.co.kr/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=join" target="_blank"><img src="/img/sp_bt_ing.png"></a><a href="https://mrmweb.hsit.co.kr/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=once2" target="_blank"><img src="/img/sp_bt_ing2.png"></a></div>


</head>
<body>
<div class="wrap">
<? if(preg_match("/sub01/",$_SERVER["PHP_SELF"])) { ?><img src="/img/bg/sub/sub1.jpg" /><? } ?>
<? if(preg_match("/sub02/",$_SERVER["PHP_SELF"])) { ?><img src="/img/bg/sub/sub2.jpg" /><? } ?>
<? if(preg_match("/sub03/",$_SERVER["PHP_SELF"])) { ?><img src="/img/bg/sub/sub3.jpg" /><? } ?>
<? if(preg_match("/support/",$_SERVER["PHP_SELF"])) { ?><img src="/img/bg/sub/sub3.jpg" /><? } ?>
<? if(preg_match("/sub04/",$_SERVER["PHP_SELF"])) { ?><img src="/img/bg/sub/sub4.jpg" /><? } ?>
<? if(preg_match("/sub05/",$_SERVER["PHP_SELF"])) { ?><img src="/img/bg/sub/sub5.jpg" /><? } ?>
<? if(preg_match("/sub06/",$_SERVER["PHP_SELF"])) { ?><img src="/img/bg/sub/sub6.jpg" /><? } ?>
<? if(preg_match("/board/",$_SERVER["PHP_SELF"])) { ?><img src="/img/bg/sub/sub6.jpg" /><? } ?>
<? if(preg_match("/sub09/",$_SERVER["PHP_SELF"])) { ?><img src="/img/bg/sub/sub5.jpg" /><? } ?>
<? if(preg_match("/sub10/",$_SERVER["PHP_SELF"])) { ?><img src="/img/bg/sub/sub4.jpg" /><? } ?>
<? if(preg_match("/sitemap/",$_SERVER["PHP_SELF"])) { ?><img src="/img/bg/sub/sub3.jpg" /><? } ?>
<? if(preg_match("/sub_news/",$_SERVER["PHP_SELF"])) { ?><img src="/img/bg/sub/sub3.jpg" /><? } ?>
</div>
<!-- bg -->

<!-- 레이어 띄우기 -->
<div id="layer_pop_bg"></div>
<div id="layer_pop_wrap">
	<div id="layer_pop_close" style="padding-right:55px;"><img src="/img/close.png" onclick="layer_pop_close();" style="cursor:pointer;"></div>
	<div id="layer_pop_contents"></div>
</div>

<div class="top_bg">
    <div class="top">
    <h1><a href="index.php"><img src="/img/logo.png" alt="로고" /></a></h1>
    
	<?if($_SESSION['user_id']){?>
    <div class="logout">
    <ul>
    <li><a href="index.php"><img src="/img/login1.jpg" alt="홈" /></a></li>
   <!--  <li><a href="common/logout.php"><img src="/img/logout2.jpg" alt="로그아웃" /></a></li>
    <li><a href="sub10_01_01_01_01.php"><img src="/img/logout3.jpg" alt="마이페이지" /></a></li> -->
    <li><a href="sub03_02_07_01_01.php"><img src="/img/login4.jpg" alt="후원안내" /></a></li>
    <li class="last"><a href="sitemap.php"><img src="/img/login5.jpg" alt="사이트맵" /></a></li>
    </ul>    
    </div>
	<!-- // logout -->
 	<?}else{?>
     <div class="login">
    <ul>
    <li><a href="index.php"><img src="/img/login1.jpg" alt="홈" /></a></li>
    <li><a href="https://mrmweb.hsit.co.kr/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=info" target="_blank"><img src="/img/info.jpg" alt="나의 후원정보" /></a></li>
    <li><a href="#"  onclick="window.open('https://db.blueweb.co.kr/formmail/formmail.html?dataname=iloveafrica0', 'window', 'width=650, height=700 scrollbars=yes')"><img src="/img/qna.jpg" alt="기업/단체 문의" /></a>
   <!-- <li><a href="sub09_04_01_01_01.php"><img src="/img/login3.jpg" alt="회원가입" /></a></li> -->
    <li><a href="sub03_02_07_01_01.php"><img src="/img/login4.jpg" alt="후원안내" /></a></li>
    <li class="last"><a href="sitemap.php"><img src="/img/login5.jpg" alt="사이트맵" /></a></li>
    </ul>    
    </div>
	<!-- // login -->  
 	<?}?>
   
    <div class="navi">
    <ul>
    <li><a href="sub01.php" class="navi1"><!--<img src="/img/navi1.png" alt="아이러브아프리카" />--></a></li>
    <li><a href="sub02.php" class="navi2"><!--<img src="/img/navi2.png" alt="사업소개" />--></a></li>
    <li><a href="sub03.php" class="navi3"><!--<img src="/img/navi3.png" alt="후원하기" />--></a></li>
    <li><a href="sub04.php" class="navi4"><!--<img src="/img/navi4.png" alt="땡큐TV" />--></a></li>
    <li><a href="sub05.php" class="navi5"><!--<img src="/img/navi5.png" alt="자료나눔방" />--></a></li>
    <li><a href="sub06.php" class="navi6"><!--<img src="/img/navi6.png" alt="커뮤니티" />--></a></li>
    </ul>
    </div>
	<!-- // navi -->
    <div class="social"> 
        <ul>
        <li><a href="http://www.facebook.com/ngoiloveafrica" target="_blank"  class="social1"></a></li>
        <li><a href="http://www.twitter.com/ngoiloveafrica"  target="_blank" class="social2"></a></li>
        <li><a href="http://www.youtube.com/iloveafricaNGO" target="_blank" class="social3"></a></li>
        <li class="last"><a href="http://blog.naver.com/iloveafrica1"  target="_blank" class="social4"></a></li>
        </ul>
    </div><!-- // social -->
    
    </div><!-- // top -->

</div><!-- // top_bg -->



<? if(preg_match("/sub/",$_SERVER["PHP_SELF"]) || preg_match("/board/",$_SERVER["PHP_SELF"]) || preg_match("/support/",$_SERVER["PHP_SELF"]) || preg_match("/sitemap/",$_SERVER["PHP_SELF"]) || preg_match("/one_order/",$_SERVER["PHP_SELF"])) { ?>
<div class="visual"></div>
<div class="contents">
<div class="lnb">
<? 
if(preg_match("/sub01/",$_SERVER["PHP_SELF"]) || $argu["b_class"] == "13" || $argu["b_class"] == "14") { include "include/lnb1.php"; }

else if(preg_match("/sub02/",$_SERVER["PHP_SELF"])){ include "include/lnb2.php"; }
else if(preg_match("/sub03/",$_SERVER["PHP_SELF"]) || preg_match("/support/",$_SERVER["PHP_SELF"])){ include "include/lnb3.php"; }
else if(preg_match("/sub04/",$_SERVER["PHP_SELF"]) || $argu["b_class"] == "36" || $argu["b_class"] == "37"){ include "include/lnb4.php"; }
else if(preg_match("/sub05/",$_SERVER["PHP_SELF"])|| $argu["b_class"] == "21" || $argu["b_class"] == "22" || $argu["b_class"] == "23"){ include "include/lnb5.php"; }
else if(preg_match("/sub06/",$_SERVER["PHP_SELF"])|| $argu["b_class"] == "1" || $argu["b_class"] == "2" || $argu["b_class"] == "3"  || $argu["b_class"] == "5"  || $argu["b_class"] == "6"  || $argu["b_class"] == "4"  || $argu["b_class"] == "7"  || $argu["b_class"] == "8"  || $argu["b_class"] == "9"  || $argu["b_class"] == "11"  || $argu["b_class"] == "12"|| $argu["b_class"] == "43" || $argu["b_class"] == "38" || $argu["b_class"] == "44" || $argu["b_class"] == "39" || $argu["b_class"] == "40"){ include "include/lnb6.php"; }
else if(preg_match("/sub07/",$_SERVER["PHP_SELF"])){ include "include/lnb7.php"; }
else if(preg_match("/sub09/",$_SERVER["PHP_SELF"])){ include "include/lnb9.php"; }
else if(preg_match("/sub10/",$_SERVER["PHP_SELF"]) || preg_match("/one_order.php/",$_SERVER["PHP_SELF"])){ include "include/lnb10.php"; }
else if(preg_match("/sitemap/",$_SERVER["PHP_SELF"])){ include "include/lnb11.php"; }
else if(preg_match("/sub_news/",$_SERVER["PHP_SELF"])){ include "include/lnb12.php"; }
?>
</div>
<div class="main">
<? } ?>
