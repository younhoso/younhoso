
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
		<a href="https://mrmweb.hsit.co.kr/default.aspx?Server=E+/byfTanGgtVEhsDgYi8w==&action=join" class="btn_regular">후원하기</a>
	</div>
	<div class="main_campaign">
		<div class="h_tit">후원 캠페인</div>
		<ul class="lst_cpi">
			<li>
				<a href="/index.php/business/water">
					<div class="sp_main_ic cpi_1"></div>
					<span class="tit">식수개발개선사업</span>
				</a>
			</li>
			<li>
				<a href="/index.php/business/selfhelp">
					<div class="sp_main_ic cpi_2"></div>
					<span class="tit">자활기술개발사업</span>
				</a>
			</li>
			<li>
				<a href="/index.php/business/medical">
					<div class="sp_main_ic cpi_3"></div>
					<span class="tit">의료보건개선사업</span>
				</a>
			</li>
			<li>
				<a href="/index.php/business/child">
					<div class="sp_main_ic cpi_4"></div>
					<span class="tit">아동복지개선사업</span>
				</a>
			</li>
			<li>
				<a href="/index.php/business/education">
					<div class="sp_main_ic cpi_5"></div>
					<span class="tit">교육개발개선사업</span>
				</a>
			</li>
			<li>
				<a href="/index.php/business/culture">
					<div class="sp_main_ic cpi_6"></div>
					<span class="tit">문화체육사업</span>
				</a>
			</li>
			<li>
				<a href="/index.php/business/environment">
					<div class="sp_main_ic cpi_7"></div>
					<span class="tit">환경개발개선사업</span>
				</a>
			</li>
		</ul>
		<div class="banner_first">
			<a href="/index.php/support/regular"><img src="/assets/images/mobile/banner_campaign.jpg" alt="후원이처음이세요?  내게딱맞는후원방법을찾아드려요!" /></a>
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
					?><li>
						<a href="<?= $path ?>">
							<span class="thmb"><img src="<?= $imgPath ?>" alt="<?= $title ?>" /></span>
							<div class="cont">
								<span class="tt"><?= $board ?></span>
								<span class="desc">&quot;<?= $title ?>&quot;</span>
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

			<div class="bg_line"></div>

			<div class="spon_area2">
				<div class="h_tit">ARS 후원</div>
				<div class="phone_num">
					060-700-0789
				</div>
			</div>
			<div class="bg_line"></div>

			<div class="spon_area3">
				<div class="h_tit">후원 문의</div>
				<div class="phone_num">
					02-780-6053
				</div>
			</div>
		</div>
		<div class="main_togather">
			<div class="h_tit"><img src="/assets/images/mobile/tit_together.png" alt="GOING TOGETHER" /></div>
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