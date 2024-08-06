<div class="main_banner">
    <ul class="main_slider">
    <?
        $isFirst = true;
        foreach($banner as $b) {
            $bannerPath = "/pds/mainbanner/".$b["banner"];
            ?><li>
                <div class="img_area" style="background-image:url(<?= $bannerPath ?>)"></div>
                <div class="tx_area">
                    <div class="tt"><?= $b["c_title"] ?></div>
                    <div class="tx">
                    <?
                        $mt = $b["m_title"];
                        $mt = str_replace("\n", "<br />", $mt);
                        echo $mt;
                    ?>
                    </div>
                    <p class="desc">
                    <?
                        $cont = $b["content"];
                        $cont = str_replace("\n", "<br />", $cont);
                        echo $cont;
                    ?>
                    </p>
                    <? if( $b["link"] != "" ) {?>
                    <a href="<?= $b["link"] ?>" class="link_dtl" target="<?= $b["link_target"] == "S" ? "_self" : "_blank" ?>">자세히보기</a>
                    <? } ?>
                </div>
            </li><?
        }
    ?>
    </ul>
</div>
<div class="main_sticky" id="mainSticky">
    <a href="<? echo SUPPORT_REGULAR_URL; ?>" target="<? echo SUPPORT_REGULAR_TARGET; ?>" class="btn_regular">정기후원하기</a>
    <a href="<? echo SUPPORT_ONECE_URL; ?>" target="<? echo SUPPORT_ONECE_TARGET; ?>" class="btn_temporary">일시후원하기</a>
</div>

<div class="main_campaign">
    <div class="h_tit">아프리카사람들에게 희망을 선물합니다</div>
    <div class="campaign_area">
        <div class="bnr bnr_b">
            <span class="thmb"><img src="/assets/images/mobile/img_campaign1.jpg" alt=""></span>
            <span class="tt">당신이 베푸는 우물파기는<br>아프리카의 생명을 지켜줍니다</span>
            <a href="<?= MAIN_LINK_WATER ?>" class="link">자세히보기</a>
        </div>
        <div class="bnr bnr_s">
            <span class="thmb"><img src="/assets/images/mobile/img_campaign2.jpg" alt=""></span>
            <span class="tt">세계 NGO최초로<br>슬럽가에 재봉틀을 보내요.</span>
            <a href="<?= MAIN_LINK_SELF ?>" class="link">자세히보기</a>
        </div>
        <div class="bnr bnr_s">
            <span class="thmb"><img src="/assets/images/mobile/img_campaign3.jpg" alt=""></span>
            <span class="tt">가난으로 의료혜택을 받을 수 없는<br>아프리카사람들이 많이 있습니다.</span>
            <a href="<?= MAIN_LINK_MEDICAL ?>" class="link">자세히보기</a>
        </div>
        <div class="bnr bnr_b">
            <span class="thmb"><img src="/assets/images/mobile/img_campaign4.jpg" alt=""></span>
            <span class="tt">아프리카의 기아와 고아들이 굶주림으로<br>생명을 잃지 않도록 살려주세요!</span>
            <a href="<?= MAIN_LINK_CHILD ?>" class="link">자세히보기</a>
        </div>
    </div>
</div>

<div class="main_mid_bnr">
    <div class="b1" style="background-color:#FFAE00">
        <img src="/assets/images/mobile/img_mid_bnr1.jpg" alt="">
        <div class="w">
            <div class="t1">RELIFE WORK</div>
            <div class="t2">아이러브아프리카의<br>아프리카 사랑은<br>끝이 없습니다.</div>
            <a href="/index.php/<?= $nationlink ?>news/relief" class="link">구호활동 보기</a>
        </div>
    </div>
    <div class="b2" style="background-color:#FF2A14">
        <img src="/assets/images/mobile/img_mid_bnr2.jpg" alt="">
        <div class="w">
            <div class="t1">DONATE NOW</div>
            <div class="t2">후원이 처음이세요?<br>내게 딱 맞는 후원방법을<br>찾아드려요!</div>
            <a href="/index.php/<?= $nationlink ?>support/regular" class="link">후원안내 보기</a>
        </div>
    </div>
</div>

<div class="main_vod">
    <div class="h_tit">당신의 참여로 만드는<br />아이러브아프리카의 나눔 영상</div>
    <ul class="lst_vods">
    <?
        foreach($recent as $r) {
            $imgPath = "/pds";
            $board = "";
            $path = "";
            switch($r["MENU"]) {
                case "report":
                    $imgPath .= "/afmove_img";
                    $board = "현상소식";
                    $path = "/index.php/".$nationlink."news/reportview";
                    break;

                case "campaign":
                    $imgPath .= "/afmove_img";  
                    $board = "현상소식";
                    $path = "/index.php/".$nationlink."news/campaignview";
                    break;

                case "video":
                    $imgPath .= "/afmove_img";
                    $board = "현상소식";
                    $path = "/index.php/".$nationlink."news/videosview";
                    break;

                case "media":
                    $imgPath .= "/afmovel_img";
                    $board = "아프리카사업현지영상";
                    $path = "/index.php/".$nationlink."news/mediaview";
                    break;

                case "africa":
                    $imgPath .= "/afmovel_img";
                    $board = "아프리카사업현지영상";
                    $path = "/index.php/".$nationlink."news/iluvafricaview";
                    break;
            }

            $imgPath .= "/".$r["img"];
            $path .= "?idx=".$r["idx"];
            $title = $r["title"];
            ?><li>
                <a href="<?= $path ?>">
                    <span class="thmb"><img src="<?= $imgPath ?>" alt="<?= $title ?>" width="300px" /></span>
                    <div class="cont">
                        <span class="desc"><?= $title ?></span>
                    </div>
                </a>
            </li><?
        }
    ?>
    </ul>
</div>

<div class="main_sponsor">
    <div class="spon_area1">
        <div class="tit_account">
            <div class="h_tit">후원계좌</div>
            <span class="tx">예금주 : 아이러브아프리카</span>
        </div>
        <ul class="lst_account">
            <li>하나은행 : 357-910008-93405</li>
            <li>신한은행 : 140-009-197323</li>
            <li>농<span class="sp"></span>협 : 351-0325-0051-33</li>
            <li>국민은행 : 816-901-04-172086</li>
        </ul>
    </div>

    <div class="bg_line2"></div>

    <div class="spon_area2">
        <div class="h_tit">ARS 후원</div>
        <div class="phone_num">
            060-700-0789
        </div>
    </div>

    <div class="bg_line2"></div>

    <div class="spon_area3">
        <div class="h_tit">후원 문의</div>
        <div class="phone_num">
            02-780-6053
        </div>
    </div>
</div>

<div class="main_togather">
    <img src="/assets/images/mobile/bg_main_togather.jpg" alt="">
    <div class="s_tit">GOING <span>TOGETHER</span></div>
    <div class="main_togather_wrap">
        <div class="h_tit">아이러브아프리카와 함께 하는 기관 &amp; 기업</div>
        <p class="desc">희망을 전하는 기관 &amp; 기업과 함께 아프리카의<br />좋은 변화를 만들어 갑니다.</p>
        <a href="/index.php/<?= $nationlink ?>support/enterprise_intro" class="link">기관&amp;기업후원 보기</a>
    </div>
</div>

<script>
$(document).ready(function(){
	$('.main_slider').bxSlider({
	mode:'fade',
	slideMargin: 0,
	auto: true, 
	autoHover: false, 
	controls: false
	});
});
</script>