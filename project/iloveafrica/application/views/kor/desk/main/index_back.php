<?
    function txtParse($txt, $type){
		if($type==1){
			$txt=htmlspecialchars($txt,ENT_QUOTES,'UTF-8');
		}else{
			$txt=html_entity_decode($txt,ENT_QUOTES,'UTF-8');
		}

		return $txt;
	}
?>

<script>
var cookiedata = document.cookie; 
$(function() {
    
<? foreach($popup as $p) {
    $pop_no = $p["p_idx"];
    $pop_name= "#pop".$pop_no;
    ?>if ( cookiedata.indexOf("ncookie_pop<?=$pop_no?>=done") < 0 ){ 
        //document.getElementById(pop).style.display = "block";
        $("<?=$pop_name?>").show();
    } else {
        //document.getElementById(pop).style.display = "none"; 
        $("<?=$pop_name?>").hide();
    }<?
} ?>
});

function closeWin(name) { 
    document.getElementById(name).style.display = "none";
}

function todaycloseWin(name,id) { 
    var chkbox = "chkbox" + id;
    var ncookie = "ncookie_" + name;
    if ( document.getElementById(chkbox).checked ){ 
        setCookie( ncookie, "done" , 24 ); 
    } 
    document.getElementById(name).style.display = "none";
}

function setCookie( name, value, expiredays ) { 
    var todayDate = new Date(); 
    todayDate.setDate( todayDate.getDate() + expiredays ); 
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
} 
</script>

<?
for($i=0;$i<count($popup);$i++){
    $_p = $popup[$i];
    $pop_no = $_p["p_idx"];
    $title=$_p["p_title"];
    $p_width = $_p["p_width"];
    $p_height = $_p["p_height"]+25;
    $p_left = $_p["p_left"];
    $p_top = $_p["p_top"];
?>
<style type="text/css">
#pop<?=$pop_no?> {
    width:<?=$p_width?>px; height:<?=$p_height?>px; background:#3d3d3d; 
    position:absolute; top:<?=$p_top?>px; left:<?=$p_left?>px; text-align:center; 
    border:1px solid #1f1b1c;   z-index:3;
}

.close<?=$pop_no?> div{float:left; text-align:right;padding-top:3px;}
#check<?=$pop_no?>{font-size:12px; font-family:'돋움'; color:#fff;padding-left:20px;}

#close<?=$pop_no?>{float:right;font-size:13px;font-weight:bold;padding-right:20px; }
#close<?=$pop_no?> a{color:#eaeaea;}
</style>

<div id="pop<?=$pop_no?>" style="display:none;z-index:999" >
	<div>
		<?=str_replace("<br style=\"clear: both;\"><br>","",txtParse($_p["p_content"],2))?>
	</div>

	<div class="close<?=$pop_no?>">
		<form name="pop_form<?=$pop_no?>">
			<div id="check<?=$pop_no?>"><input type="checkbox" name="chkbox" id="chkbox<?=$pop_no?>" value="checkbox" onClick="todaycloseWin('pop<?=$pop_no?>','<?=$pop_no?>')">&nbsp;<span style="color:#fff">오늘 하루동안 보지 않기</span></div>
			<div id="close<?=$pop_no?>" style="margin:auto;"><a href="javascript:closeWin('pop<?=$pop_no?>');">CLOSE</a></div>
		</form>
	</div>
</div>
<?
	}
?>
<div id="container">
    <div class="main_banner">
        <ul class="main_slider">
        <?
            $isFirst = true;
            foreach($banner as $b) {
                ?><li>
                    <div class="img_area" style="background:url(/pds/mainbanner/<?= $b["banner"] ?>) 50% 0 no-repeat;"></div>
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
        <a href="<? echo SUPPORT_REGULAR_URL; ?>" target="<? echo SUPPORT_REGULAR_TARGET; ?>" class="btn_regular">정기<br />후원</a>
        <a href="<? echo SUPPORT_ONECE_URL; ?>" target="<? echo SUPPORT_ONECE_TARGET; ?>" class="btn_temporary">일시<br />후원</a>
    </div>
    <div class="main_campaign">
        <div class="h_tit">후원 캠페인</div>
        <ul class="lst_cpi">
            <li>
                <a href="/index.php/<?= $nationlink ?>business/water">
                    <div class="sp_main_ic cpi_1"></div>
                    <span class="tit">식수개발개선사업</span>
                </a>
            
            </li>
            <li>
                <a href="/index.php/<?= $nationlink ?>business/selfhelp">
                    <div class="sp_main_ic cpi_2"></div>
                    <span class="tit">자활기술개발사업</span>
                </a>
            </li>
            <li>
                <a href="/index.php/<?= $nationlink ?>business/medical">
                    <div class="sp_main_ic cpi_3"></div>
                    <span class="tit">의료보건개선사업</span>
                </a>
            </li>
            <li>
                <a href="/index.php/<?= $nationlink ?>business/child">
                    <div class="sp_main_ic cpi_4"></div>
                    <span class="tit">아동복지개선사업</span>
                </a>
            </li>
            <li>
                <a href="/index.php/<?= $nationlink ?>business/education">
                    <div class="sp_main_ic cpi_5"></div>
                    <span class="tit">교육개발개선사업</span>
                </a>
            </li>
            <li>
                <a href="/index.php/<?= $nationlink ?>business/culture">
                    <div class="sp_main_ic cpi_6"></div>
                    <span class="tit">문화체육사업</span>
                </a>
            </li>
            <li>
                <a href="/index.php/<?= $nationlink ?>business/environment">
                    <div class="sp_main_ic cpi_7"></div>
                    <span class="tit">환경개발개선사업</span>
                </a>
            </li>
        </ul>
        <div class="banner_first">
            <a href="/index.php/<?= $nationlink ?>support/regular"><img src="/assets/images/desk/banner_campaign.jpg" alt="후원이처음이세요?  내게딱맞는후원방법을찾아드려요!" /></a>
        </div>
    </div>
    <div class="main_news">
        <div class="h_tit">ILA 소식</div>
        <ul class="lst_news">
        <?
            foreach($recent as $r) {
                $imgPath = "http://iloveafrica.or.kr/pds";
                $board = "";
                $path = "";
                switch($r["MENU"]) {
                    case "report":
                        $imgPath .= "/afmove_img";
                        $board = "현장소식";
                        $path = "/index.php/news/reportview";
                        break;

                    case "campaign":
                        $imgPath .= "/afmove_img";  
                        $board = "현장소식";
                        $path = "/index.php/news/campaignview";
                        break;

                    case "video":
                        $imgPath .= "/afmove_img";
                        $board = "현장소식";
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

                ?><li>
                    <a href="<?= $path ?>">
                        <span class="thmb"><img src="<?= $imgPath ?>" alt="<?= $r["title"] ?>" style="max-width:340px;max-height:250px" /></span>
                        <div class="cont">
                            <span class="tt"><?= $board ?></span>
                            <span class="desc">&quot;<?= $r["title"] ?>&quot;</span>
                        </div>
                    </a>
                </li><?

            } ?>
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
        <div class="spon_area2">
            <div class="h_tit">ARS 후원</div>
            <div class="phone_num">
                060-700-0789
            </div>
        </div>
        <div class="spon_area3">
            <div class="h_tit">후원 문의</div>
            <div class="phone_num">
                02-780-7111
            </div>
        </div>
    </div>
    <div class="main_togather">
        <div class="h_tit"><img src="/assets/images/desk/tit_together.png" alt="GOING TOGETHER" /></div>
        <div class="cont">
            <img src="/assets/images/desk/img_together.png" alt="참여 기업" />
            <ul class="blind">
                <li>CBS 기독교방송</li>
                <li>WBC복지TV</li>
                <li>GENESIS BBQ</li>
                <li>KOICA 한국국제협력단</li>
                <li>외교부</li>
                <li>국민일보</li>
                <li>NH농협금융</li>
                <li>대신증권</li>
                <li>한국교육문화진흥원</li>
                <li>기획재정부</li>
                <li>한양대학교</li>
            </ul>
        </div>
    </div>
</div>

