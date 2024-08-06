<style>
	.slider_wrap .swiper-slide img {
		width: 100%;
	}
	.slider_wrap_20_02.slider_wrap .swiper-slide {
		height: 223px;
		background-color: #ededed;
	}
	.slider_wrap_20_02.slider_wrap .swiper-slide img {
		width: 100%; 
		height: 100%; 
		object-fit: contain;
	}
	.slider_wrap_20_03.slider_wrap .swiper-slide {
		height: 223px;
		background-color: #ededed;
	}
	.slider_wrap_20_03.slider_wrap .swiper-slide img{
		width: 100%; 
		height: 100%;
		object-fit: contain;
	}

	.slider_wrap .swiper-button-next{
		position: absolute;
		top: auto;
    bottom: 12px;
    left: auto;
    right: 0px;
    width: 50px;
    height: 50px;
		background: url(/assets/images/icons/arrow_right_dark.svg) var(--primary) 50% 50% no-repeat;
    background-size: 32px auto;
	}
	.slider_wrap .swiper-button-prev{
		position: absolute;
		top: auto;
    bottom: 12px;
    left: auto;
    right: 50px;
    width: 50px;
    height: 50px;
    background: url(/assets/images/icons/arrow_left_dark.svg) 50% 50% var(--primary) no-repeat;
    background-size: 32px auto;
	}
	.swiper-button-prev:after, .swiper-rtl .swiper-button-next:after {display: none;}
	.swiper-button-next:after, .swiper-rtl .swiper-button-prev:after {display: none;}
</style>
<?php
	$years = array('1977_2003', '2004_2007', '2008_2011', '2012_2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023');
	if(!isset($curYear) || empty($curYear)) {
		$curYear = '2023';
	}
	$curKey =  array_search($curYear, $years);
	$preYear = array_key_exists($curKey + 1, $years) ? $years[$curKey + 1] : $curYear;
	$nextYear = array_key_exists($curKey - 1, $years) ? $years[$curKey - 1] : $curYear;
?>
<div class="page_cont">
	<?php include APPPATH."views/$nation/mobile/foundation/sub_tab.php"; ?>
	<div class="sub_cont">
		<div class="head">
			<h2 class="">연혁</h2>
			<p class="sub_tit">아프리카 전문 NGO,<br>아이러브아프리카가 걸어온 길</p>
			<p class="caption">The path taken by I Love Africa,<br>an NGO specializing in Africa</p>
		</div>
		<div class="his_select">
			<a href="/index.php/foundation/history?year=<?=$preYear?>" class="prev <? echo $preYear == $curYear ? 'disabled' : '' ?>"></a>
			<h3><? echo str_replace("_", " ~ ", $curYear); ?></h3>
			<a href="/index.php/foundation/history?year=<?=$nextYear?>" class="next <? echo $nextYear == $curYear ? 'disabled' : '' ?>"></a>
		</div>
	</div>

	<div class="history_area">
		<div class="history_cont">
			<?php include APPPATH."views/$nation/mobile/foundation/history/history_$curYear.php"; ?>
		</div>
	</div>
</div>

<script>
	$(document).ready(() => {
		function createSlider(selector) {
			return new Swiper(selector, {
				slidesPerView: 1,
				loop: true,
				navigation: {
						nextEl: `${selector} .swiper-button-next`,
						prevEl: `${selector} .swiper-button-prev`,
				},
			});
		};

		createSlider('.slider');
	});
</script>