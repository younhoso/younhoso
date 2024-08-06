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
		<div class="main_campaign">
			<div class="h_tit">아프리카사람들에게 희망을 선물합니다</div>
			<div class="campaign_area">
				<div class="bnr bnr_b">
					<span class="thmb"><img src="/assets/images/desk/img_campaign1.jpg" alt=""></span>
					<span class="tt">당신이 베푸는 우물파기는<br>아프리카의 생명을 지켜줍니다</span>
					<a href="<?= MAIN_LINK_WATER ?>" class="link">자세히보기</a>
				</div>
				<div class="bnr bnr_s">
					<span class="thmb"><img src="/assets/images/desk/img_campaign2.jpg" alt=""></span>
					<span class="tt">세계 NGO최초로<br>슬럽가에<br>재봉틀을 보내요.</span>
					<a href="<?= MAIN_LINK_SELF ?>" class="link">자세히보기</a>
				</div>
				<div class="bnr bnr_s">
					<span class="thmb"><img src="/assets/images/desk/img_campaign3.jpg" alt=""></span>
					<span class="tt">가난으로<br>의료혜택을 받을 수 없는<br>아프리카사람들이<br>많이 있습니다.</span>
					<a href="<?= MAIN_LINK_MEDICAL ?>" class="link">자세히보기</a>
				</div>
				<div class="bnr bnr_b">
					<span class="thmb"><img src="/assets/images/desk/img_campaign4.jpg" alt=""></span>
					<span class="tt">아프리카의 기아와 고아들이 굶주림으로<br>생명을 잃지 않도록 살려주세요!</span>
					<a href="<?= MAIN_LINK_CHILD ?>"" class="link">자세히보기</a>
				</div>
			</div>
		</div>
		<div class="main_mid_bnr">
			<div class="b1" style="background:url(/assets/images/desk/img_mid_bnr1.jpg) #FFAE00 100% 0 no-repeat">
				<div class="w">
					<div class="t1">RELIFE WORK</div>
					<div class="t2">아이러브아프리카의<br>아프리카 사랑은<br>끝이 없습니다.</div>
					<a href="/index.php/<?= $nationlink ?>news/relief" class="link">구호활동 보기</a>
				</div>
			</div>
			<div class="b2" style="background:url(/assets/images/desk/img_mid_bnr2.jpg) #FF2A14 0 0 no-repeat">
				<div class="w">
					<div class="t1">DONATE NOW</div>
					<div class="t2">후원이 처음이세요?<br>내게 딱 맞는 후원방법을<br>찾아드려요!</div>
					<a href="/index.php/<?= $nationlink ?>support/regular" class="link">후원안내 보기</a>
				</div>
			</div>
		</div>
		<div class="main_vod">
			<div class="h_tit">당신의 참여로 만드는 아이러브아프리카의 나눔 영상</div>
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
							<span class="thmb"><img src="<?= $imgPath ?>" alt="<?= $title ?>" width="439px" height="246" max-height="246px" /></span>
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
			<div class="main_sponsor_bg">
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
						02-780-6053
					</div>
				</div>
			</div>
		</div>
		<div class="main_togather">
			<div class="main_togather_wrap">
				<div class="s_tit">GOING <span>TOGETHER</span></div>
				<div class="h_tit">아이러브아프리카와 <br />함께 하는 기관 &amp; 기업</div>
				<p class="desc">희망을 전하는 기관 &amp; 기업과 함께 <br />아프리카의 좋은 변화를 만들어 갑니다.</p>
				<a href="/index.php/support/enterprise_intro" class="link">기관&amp;기업후원 보기</a>
			</div>
		</div>
	</div>

