<div class="main_banner">
    <ul class="main_slider">
    <?
        $total = sizeof($banner);
        foreach($banner as $key => $b) {
            $bannerPath = "/pds/mainbanner/".$b["banner_mo"];
            ?><li>
                <div class="img_area" style="background-image:url(<?= $bannerPath ?>)"></div>
                <div class="tx_area">
                    <!-- <div class="tt"><?= $b["c_title"] ?></div> -->
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
                    <!-- <? if( $b["link"] != "" ) {?>
                    <a href="<?= $b["link"] ?>" class="link_dtl" target="<?= $b["link_target"] == "S" ? "_self" : "_blank" ?>">
                        <span>자세히</span><img src="/assets/images/icons/arrow_half_right.svg" alt="">
                    </a>
                    <? } ?> -->
                </div>
            </li><?
        }
    ?>
    </ul>
    <!-- <div class="">
        <button id="main_bnr_prev" class="hover">AA</button>
        <button id="main_bnr_next" class="hover">AA</button>
    </div> -->
</div>

<div class="main_campaign">
    <div id="campaign-well" class="campaign_area well">
        <div class="inner effect_in-screen" data-parent="#campaign-well" data-animation="animate__fadeInUp">
            <p class="tit">생명의 우물</p>
            <p class="sub_tit">WELL OF LIFE</p>
            <div class="cont">
                <p>
                    당신이 건립한<br/>
                    사랑과 희망의 결실<br/>
                    같이 보러 갈래요?
                </p>
                <a href="/index.php/project/well" class="link">보러가기</a>
            </div>
        </div>
        <div class="bg_img effect_in-screen" data-parent="#campaign-well" data-animation="animate__fadeInUp" data-delay="300"></div>
    </div>
    <div id="campaign-machine" class="campaign_area machine">
        <div class="inner effect_in-screen" data-parent="#campaign-machine"  data-animation="animate__fadeInUp">
            <p class="tit">희망의 재봉틀</p>
            <p class="sub_tit">sewing machine<br>of hope</p>
            <div class="cont">
                <p>
                    자활여성에게 재봉틀은<br/>
                    아이를 먹이고 입히고<br/>
                    공부 시키는 생명줄이에요!
                </p>
                <a href="/index.php/news/relief?category=2" class="link">보러가기</a>
            </div>
        </div>
        <div class="bg_img effect_in-screen" data-parent="#campaign-machine" data-animation="animate__fadeInUp" data-delay="300"></div>
    </div>
</div>

<div class="main_story">
    <div class="head effect_in-screen"  data-animation="animate__fadeInUp">
        <h3 class="tit">아이러브아프리카 이야기</h3>
        <h2 class="sub_tit">STORY</h3>
        <p>아이러브아프리카는 당신과 아프리카를<br>잇는 희망의 다리입니다.</p>
    </div>
    <div class="section water">
        <div class="image effect_in-screen" data-animation="animate__fadeInUp">
            <img src="/assets/images/mobile/main_story_water.jpg" alt="">
        </div>
        <div class="summary">
            <div class="effect_in-screen" data-animation="animate__fadeInUp">
                <p class="tit">WATER</p>
                <p class="sub_tit">식수개발개선</p>
            </div>
            <div class="progress">
                <div class="cont effect_in-screen">76개</div>
            </div>
            <div class="effect_in-screen" data-animation="animate__fadeInUp">
                <p class="water_sub_tit">현재까지 만들어진 우물수</p>
                <p class="desc">우리학교에 우물을 파주세요!<br>우리도 깨끗한 물을 먹고 공부할래요.</p>
                <a href="/index.php/business/water" class="link">더보기</a>
            </div>
        </div>
    </div>
    <div class="line-wrap">
        <div class="line"></div>
    </div>
    <div class="section support">
        <div class="image effect_in-screen" data-animation="animate__fadeInUp">
            <img src="/assets/images/mobile/main_story_medical.jpg" alt="">
        </div>
        <div class="summary effect_in-screen" data-animation="animate__fadeInUp">
            <p class="tit">MEDICAL</p>
            <p class="sub_tit">의료보건개선</p>
            <p class="desc">몸속에 살고 있는 벌레가<br/> 발가락을 뜯어 먹어요.</p>
            <a href="/index.php/business/medical" class="link">더보기</a>
        </div>
    </div>
    <div class="line-wrap">
        <div class="line"></div>
    </div>
    <div class="section medical">
        <div class="image effect_in-screen" data-animation="animate__fadeInUp">
            <img src="/assets/images/mobile/main_story_education.jpg" alt="">
        </div>
        <div class="summary effect_in-screen" data-animation="animate__fadeInUp">
            <p class="tit EDUCATION">EDUCATION</p>
            <p class="sub_tit">교육개발개선</p>
            <p class="desc">교실이 무서워요.<br/>교실이 튼튼하면 내 친구는 안 다쳐요.</p>
            <a href="/index.php/business/education" class="link">더보기</a>
        </div>
    </div>
</div>

<!-- <div class="main_gallery grid cols-3">
    <div class="item col-span-2">
        <img src="/assets/images/desk/main/main_gallery_1.jpg" alt="">
        <a href="/" class="link">아동복지개선</a>
    </div>
    <div class="item">
        <img src="/assets/images/desk/main/main_gallery_2.jpg" alt="">
        <a href="/" class="link">교육개발개선</a>
    </div>
    <div class="item">
        <img src="/assets/images/desk/main/main_gallery_3.jpg" alt="">
        <a href="/" class="link">환경개발개선</a>
    </div>
    <div class="item col-span-2">
        <img src="/assets/images/desk/main/main_gallery_4.jpg" alt="">
        <a href="/" class="link">문화체육교류</a>
    </div>
</div> -->

<div class="main_mid_banner">
    <img src="/assets/images/desk/main/main_mid_banner1.jpg" alt="">
    <div class="content primary">
        <div class="effect_in-screen" data-animation="animate__fadeIn" style="--animate-duration: 2s;">
            <p class="symbol">❝</p>
            <p class="tit">후원이 처음이세요?</p>
            <p class="desc">딱 맞는 후원 방법을 찾아 드려요!</p>
        </div>
        <a href="/index.php/support/regular" class="link effect_in-screen" data-delay="500" data-animation="animate__fadeIn" style="--animate-duration: 3s;">후원안내보기</a>
    </div>
</div>

<div class="main_vod">
    <div class="effect_in-screen" data-animation="animate__fadeInUp">
        <h3 class="h_tit">아이러브아프리카 나눔영상</h3>
        <p class="h_desc">당신의 참여로 만드는 구호활동 영상이에요</p>
    </div>
    <div class="slider_wrap effect_in-screen" data-animation="animate__fadeInUp">
        <div class="lst_vods swiper">
            <div class="swiper-wrapper">
        <?
            foreach($recent as $r) {
                $imgPath = "/pds";
                $board = "";
                $path = "";
                switch($r["MENU"]) {
                    case "report":
                        $imgPath .= "/afmove_img";
                        $board = "현상소식";
                        $path = "/index.php/news/reportview";
                        break;

                    case "campaign":
                        $imgPath .= "/afmove_img";  
                        $board = "현상소식";
                        $path = "/index.php/news/campaignview";
                        break;

                    case "video":
                        $imgPath .= "/afmove_img";
                        $board = "현상소식";
                        $path = "/index.php/news/videosview";
                        break;

                    case "media":
                        $imgPath .= "/afmovel_img";
                        $board = "아프리카사업현지영상";
                        $path = "/index.php/news/mediaview";
                        break;

                    case "africa":
                        $imgPath .= "/afmovel_img";
                        $board = "아프리카사업현지영상";
                        $path = "/index.php/news/iluvafricaview";
                        break;
                }

                $imgPath .= "/".$r["img"];
                $path .= "?idx=".$r["idx"];
                $title = $r["title"];
                $content = "여전히 아프리카에서는 10억 인구 중 3분의 1이 물 기근 속에 살고 있고, 수만 명의 아이들은 수인성 전염병으로 목숨을 잃고 있습니다. 더 이상 이들이 고통받지 않도록 생명의 우물을 선물합니다.";//$r["desc"];
                ?>
                <div class="swiper-slide">
                    <a href="<?= $path ?>" class="thmb">
                        <img src="<?= $imgPath ?>" alt="<?= $title ?>" width="200px" height="110px" max-height="110px" />
                    </a>
                    <div class="content">
                        <p class="tit"><?= $title ?></p>
                        <a href="<?= $path ?>" class="link">read more</a>
                    </div>
                </div>
            <?
                }
            ?>
            </div>
        </div>
    </div>
</div>

<div class="main_mid_banner">
    <img src="/assets/images/desk/main/main_mid_banner2.jpg" alt="">
    <div class="content success">
        <div class="effect_in-screen" data-animation="animate__fadeIn" style="--animate-duration: 2s;">
            <p class="symbol">❝</p>
            <p class="tit">희망을 전하는 기업&기관과 함께!</p>
            <p class="desc">아프리카의 좋은 변화를 만들어갑니다.</p>
        </div>
        <a href="/index.php/support/enterprise_intro"  class="link effect_in-screen" data-delay="500" data-animation="animate__fadeIn" style="--animate-duration: 3s;">후원하기</a>
    </div>
</div>

<div class="main_sticky" id="mainSticky">
    <a href="<? echo SUPPORT_REGULAR_URL; ?>" target="<? echo SUPPORT_REGULAR_TARGET; ?>" class="btn_regular">정기후원하기</a>
    <a href="<? echo SUPPORT_ONECE_URL; ?>" target="<? echo SUPPORT_ONECE_TARGET; ?>" class="btn_temporary">일시후원하기</a>
</div>


<script>
var cookiedata = document.cookie; 
var popupIndex = 0;
var popups = [<? 
    foreach($popup as $p) { 
        echo $p["p_idx"].",";
    }
?>];

$(document).ready(function(){

	$('.main_slider').bxSlider({
        mode:'fade',
        slideMargin: 0,
        auto: false, 
        <? if( $this->agent->is_mobile() ) { ?>
        touchEnabled: false,
        <? } ?>
        autoHover: false, 
        controls: true,
        pager: true,
	});

    // $('.lst_vods').bxSlider({
    //     auto: false,
    //     controls: true,
    //     pager:false,
    //     shrinkItems: true,
    //     slideWidth: 360,
    //     slideMargin: 16,
    //     minSlides: 1.6,
    //     maxSlides: 1.6,
    //     moveSlides: 1,
    //     useCSS: 'false',
    //     mode: 'horizontal',
    //     infiniteLoop: 'true',
    // });

    const swiper = new Swiper('.lst_vods', {
        slidesPerView: 1.6,
        spaceBetween: 16,
        loop: true,
    });

    showPopup();
});

function showPopup() {
    if( popupIndex < popups.length ) {
        $("#popupBack").show();
        var idx = popups[popupIndex];
        var p = $("#popup_"+idx);

        if ( cookiedata.indexOf("ncookie_pop" + idx + "=done") < 0 ) {
            p.show();
            $("body").css("overflow", "hidden");
        } else {
            popupIndex++;
            showPopup();
        }  
    } else {
        $("#popupBack").hide();
        $("body").css("overflow", "auto");
        
    }
}

function todaycloseWin(idx) { 
    var name = "pop"+idx;
    var ncookie = "ncookie_" + name;
    setCookie( ncookie, "done" , 1 );
    closeWin(idx);
}

function setCookie( name, value, expiredays ) { 
    var todayDate = new Date(); 
    todayDate.setDate( todayDate.getDate() + expiredays ); 
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
} 

function closeWin(idx) {
    let p = $("#popup_" + idx);
    p.hide();

    popupIndex++;
    showPopup();
}
</script>

<style type="text/css">

#popupBack {
    display:none;
    position:fixed;
    width:100%;
    height:100%;
    top:0px;
    left:0px;
    z-index:200;
    background-color:rgba(0, 0, 0, 0.7);
    overflow: hidden;
}

.pop {
    overflow: auto;
    background:#3d3d3d; 
    border:1px solid #1f1b1c;   
    z-index:3;
    position:absolute;
    left:0px;
    right:0px;
    margin-left:10%;
    margin-right:10%;
    top:50%;
    transform: translateY(-50%);
    display:none;
}

.pop div img {
    width:100% !important;
    height: auto;
}

.check {
    height:35px;
    padding-top:15px;
    font-size:10pt; 
    color:#FFF;
    float:left;
    width:50%;
}

.close {
    height:35px;
    padding-top:15px;
    font-size:10pt;
    color:#FFF;
    float:left;
    width:50%;
}

.close a {
    color:#FFF;
}

.btnView {
    text-align:center;
}
</style>
<div id="popupBack">
<?
    foreach($popup as $p) {
        $idx = $p["p_idx"];
        $width = $p["p_width"];
        $height = $p["p_height"];
        ?><div class="pop" id="popup_<?= $idx ?>">
            <div style="width:100%;" ><?
                $cont = $p["p_content"];
                $cont = str_replace("&lt;", "<", $cont);
                $cont = str_replace("&gt;", ">", $cont);
                $cont = str_replace("&quot;", "\"", $cont);
                echo $cont;
            ?></div>
        
            <div class="btnView">
                <div onclick="todaycloseWin(<?= $idx ?>);" class="check"><span style="color:#fff">오늘 하루동안 보지 않기</span></div>
                <div onclick="closeWin('<?= $idx ?>');" class="close">닫기</div>
            </div>
        </div><?
    }
?>
</div>