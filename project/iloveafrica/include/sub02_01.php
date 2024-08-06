<?
	include "../common/common.php";
	
	$ii_no = $argu["ii_no"];
	$_row = $Obj_info -> get_item_view($ii_no);

	// 첨부 이미지 or 본문 이미지 찾기
	if($_row["ii_img_3"] != ""){
		$ext = substr(strrchr($_row["ii_img_3"],"."),1);	//확장자앞 .을 제거하기 위하여 substr()함수를 이용
		$ext = strtolower($ext);					//확장자를 소문자로 변환
		
		if ( $ext=="gif"||$ext=="jpg"||$ext=="jpeg"||$ext=="png"||$ext=="bmp"||$ext=="tif"||$ext=="tiff"){
			//$thumbImage="/common/download.php?fullpath=/psd/".$Obj_info->_PDS_SUB."&filename=".$_row["am_image"];
			$thumbImage="/pds/".$Obj_info->_PDS_SUB.$_row["ii_img_3"];
		}else{
			preg_match("/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i",$_row['ii_memo'],$imgSRC);
			$thumbImage=$imgSRC[1];
		}
	}else{
		preg_match("/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i",txtParse($_row['ii_memo'],2),$imgSRC);
		$thumbImage=$imgSRC[1];
	}

	if(strlen($thumbImage)<3){
		$thumbImage="/common/no_photo.php?w=203&h=152";
	}

?>
    <h2><img src="img/sub21_c1_title.png" alt="지역개발사업"  /></h2>
    <span class="sub21_c1_text"><img src="img/sub21_c1_text.png" alt="아프리카 여러 나라들의 지역사회를 개발하는 일에 힘쓰고 있습니다." /></span> 
<?
	if($ii_no == "1"){
?>
	<div class="sub21_c1_c" id="tab111">
        <div class="sub21_c1_btn">
            <ul>
                <li><img src="img/sub21_c1_on_btn1.png" alt="꿈망교육개발사업" /></li>
                <li><img src="img/sub21_c1_off_btn2.png" alt="식수개발개선사업" onclick="sub02_tab(2,1);" /></li>
                <li><img src="img/sub21_c1_off_btn3.png" alt="의료보건복지사업" onclick="sub02_tab(3,1);" /></li>
                <li><img src="img/sub21_c1_off_btn4.png" alt="소득증대개발사업" onclick="sub02_tab(4,1);" /></li>
                <li class="last"><img src="img/sub21_c1_off_btn5.png" alt="주민역량강화사업" onclick="sub02_tab(5,1);" /></li>
            </ul>
        </div>
        <span class="sub21_c1_img"><a href="sub02_view.php?ii_no=<?=$ii_no?>&lm=1"><img src="<?=$thumbImage?>" alt="이미지" width="203" height="127"/></a></span>
        <p class="sub21_c1_p"><a href="sub02_view.php?ii_no=<?=$ii_no?>&lm=1"><?=ksubstr(htmlspecialchars(strip_tags($_row['ii_memo'])),50)?></a></p>
        <span class="more"><a href="sub02_view.php?ii_no=<?=$ii_no?>&lm=1"><img src="img/more2.png" alt="더보기" /></a></span>
	</div>
<?
	}
	else if($ii_no == "2"){
?>
	<div class="sub21_c1_c" id="tab111">
        <div class="sub21_c1_btn">
            <ul>
                <li><img src="img/sub21_c1_off_btn1.png" alt="꿈망교육개발사업" onclick="sub02_tab(1,1);" /></li>
                <li><img src="img/sub21_c1_on_btn2.png" alt="식수개발개선사업"  /></li>
                <li><img src="img/sub21_c1_off_btn3.png" alt="의료보건복지사업" onclick="sub02_tab(3,1);" /></li>
                <li><img src="img/sub21_c1_off_btn4.png" alt="소득증대개발사업" onclick="sub02_tab(4,1);" /></li>
                <li class="last"><img src="img/sub21_c1_off_btn5.png" alt="주민역량강화사업" onclick="sub02_tab(5,1);" /></li>
            </ul>
        </div>
        <span class="sub21_c1_img"><a href="sub02_view.php?ii_no=<?=$ii_no?>&lm=1"><img src="<?=$thumbImage?>" alt="이미지" width="203" height="127"/></a></span>
        <p class="sub21_c1_p"><a href="sub02_view.php?ii_no=<?=$ii_no?>&lm=1"><?=ksubstr(htmlspecialchars(strip_tags($_row['ii_memo'])),50)?></a></p>
        <span class="more"><a href="sub02_view.php?ii_no=<?=$ii_no?>&lm=1"><img src="img/more2.png" alt="더보기" /></a></span>
	</div>
<?
	}
	else if($ii_no == "3"){
?>
	<div class="sub21_c1_c" id="tab111">
        <div class="sub21_c1_btn">
            <ul>
                <li><img src="img/sub21_c1_off_btn1.png" alt="꿈망교육개발사업" onclick="sub02_tab(1,1);"/></li>
                <li><img src="img/sub21_c1_off_btn2.png" alt="식수개발개선사업" onclick="sub02_tab(2,1);" /></li>
                <li><img src="img/sub21_c1_on_btn3.png" alt="의료보건복지사업"  /></li>
                <li><img src="img/sub21_c1_off_btn4.png" alt="소득증대개발사업" onclick="sub02_tab(4,1);" /></li>
                <li class="last"><img src="img/sub21_c1_off_btn5.png" alt="주민역량강화사업" onclick="sub02_tab(5,1);" /></li>
            </ul>
        </div>
        <span class="sub21_c1_img"><a href="sub02_view.php?ii_no=<?=$ii_no?>&lm=1"><img src="<?=$thumbImage?>" alt="이미지" width="203" height="127"/></a></span>
        <p class="sub21_c1_p"><a href="sub02_view.php?ii_no=<?=$ii_no?>&lm=1"><?=ksubstr(htmlspecialchars(strip_tags($_row['ii_memo'])),50)?></a></p>
        <span class="more"><a href="sub02_view.php?ii_no=<?=$ii_no?>&lm=1"><img src="img/more2.png" alt="더보기" /></a></span>
	</div>
<?
	}
	else if($ii_no == "4"){
?>
	<div class="sub21_c1_c" id="tab111">
        <div class="sub21_c1_btn">
            <ul>
                <li><img src="img/sub21_c1_off_btn1.png" alt="꿈망교육개발사업" onclick="sub02_tab(1,1);"/></li>
                <li><img src="img/sub21_c1_off_btn2.png" alt="식수개발개선사업" onclick="sub02_tab(2,1);" /></li>
                <li><img src="img/sub21_c1_off_btn3.png" alt="의료보건복지사업" onclick="sub02_tab(3,1);" /></li>
                <li><img src="img/sub21_c1_on_btn4.png" alt="소득증대개발사업"  /></li>
                <li class="last"><img src="img/sub21_c1_off_btn5.png" alt="주민역량강화사업" onclick="sub02_tab(5,1);" /></li>
            </ul>
        </div>
        <span class="sub21_c1_img"><a href="sub02_view.php?ii_no=<?=$ii_no?>&lm=1"><img src="<?=$thumbImage?>" alt="이미지" width="203" height="127"/></a></span>
        <p class="sub21_c1_p"><a href="sub02_view.php?ii_no=<?=$ii_no?>&lm=1"><?=ksubstr(htmlspecialchars(strip_tags($_row['ii_memo'])),50)?></a></p>
        <span class="more"><a href="sub02_view.php?ii_no=<?=$ii_no?>&lm=1"><img src="img/more2.png" alt="더보기" /></a></span>
	</div>
<?
	}
	else if($ii_no == "5"){
?>
	<div class="sub21_c1_c" id="tab111">
        <div class="sub21_c1_btn">
            <ul>
                <li><img src="img/sub21_c1_off_btn1.png" alt="꿈망교육개발사업" onclick="sub02_tab(1,1);"/></li>
                <li><img src="img/sub21_c1_off_btn2.png" alt="식수개발개선사업" onclick="sub02_tab(2,1);" /></li>
                <li><img src="img/sub21_c1_off_btn3.png" alt="의료보건복지사업" onclick="sub02_tab(3,1);" /></li>
                <li><img src="img/sub21_c1_off_btn4.png" alt="소득증대개발사업" onclick="sub02_tab(4,1);" /></li>
                <li class="last"><img src="img/sub21_c1_on_btn5.png" alt="주민역량강화사업"  /></li>
            </ul>
        </div>
        <span class="sub21_c1_img"><a href="sub02_view.php?ii_no=<?=$ii_no?>&lm=1"><img src="<?=$thumbImage?>" alt="이미지" width="203" height="127"/></a></span>
        <p class="sub21_c1_p"><a href="sub02_view.php?ii_no=<?=$ii_no?>&lm=1"><?=ksubstr(htmlspecialchars(strip_tags($_row['ii_memo'])),50)?></a></p>
        <span class="more"><a href="sub02_view.php?ii_no=<?=$ii_no?>&lm=1"><img src="img/more2.png" alt="더보기" /></a></span>
	</div>
<?
	}	
?>