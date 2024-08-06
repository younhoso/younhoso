<?
	//include "../common/common.php";

	$argu['b_class']='46';
	// 게시판 설정값 받기
	$_info = $Obj_board->get_boardconf_view($argu['b_class']);
		$_list = $Obj_board->get_board_limit($argu['b_class'],3);
		$_list_link1="sub02_view_2.php?p=1&ii_no=1&lm=1&lmv=".$_list[0]['b_no'];
	if(count($_list) > 0){ // 리스트가 있을경우
		$tot = count($_list);
		for($i=0;$i<count($_list);$i++){

			$_file_list = $Obj_board->get_boardfile_list($argu['b_class'],$_list[$i]['b_no']);


			// 첨부 이미지 or 본문 이미지 찾기
			if($_file_list[0]['bf_no'] != null){
				$ext=$_file_list[0]['bf_type'];

				if ( $ext=="gif"||$ext=="jpg"||$ext=="jpeg"||$ext=="png"||$ext=="bmp"||$ext=="tif"||$ext=="tiff"){
					$thumbImage="/common/download.php?fullpath=".$Obj_board->_PDS_SUB.$_file_list[0][b_class]."/".$_file_list[0][b_no]."_".$_file_list[0][bf_no]."&filename=".$_file_list[0][bf_name];
				}else{
					preg_match("/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i",$_list[$i]['b_content'],$imgSRC);
					$thumbImage=$imgSRC[1];
				}
			}else{
				preg_match("/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i",txtParse($_list[$i]['b_content'],2),$imgSRC);
				$thumbImage=$imgSRC[1];
			}

			/*
			if(strlen($thumbImage)<3){
				$thumbImage="/common/no_photo.php?w=203&h=152";
			}
			*/

			$_list_subject=ksubstr($_list[$i]['b_title'],22);
			$_list_link="sub02_view_2.php?m=m01&s=main&b_class=46&ii_no=1&lm=1&lmv&mode=VIEW_FORM&b_no=".$_list[$i]['b_no'];

			if($i == 0){
				$display = "";
			}
			else{
				$display = "none";
			}

			if($tot == 1){
				if($i == 0){
					$onclick1 = "";
					$onclick2 = "onclick='DisplayMenu(2);'";
				}
			}
			else if($tot == 2){
				if($i == 0){
					$onclick1 = "";
					$onclick2 = "onclick='DisplayMenu(2);'";
				}
				else if($i == 1){
					$onclick1 = "onclick='DisplayMenu(1);'";
					$onclick2 = "onclick='DisplayMenu(2);'";
				}
			}
			else if($tot == 3){
				if($i == 0){
					$onclick1 = "";
					$onclick2 = "onclick='DisplayMenu(2);'";
				}
				else if($i == 1){
					$onclick1 = "onclick='DisplayMenu(1);'";
					$onclick2 = "onclick='DisplayMenu(3);'";
				}
				else if($i == 2){
					$onclick1 = "onclick='DisplayMenu(2);'";
					$onclick2 = "";
				}
			}

?>

<div class="ila_news" id="menu<?=$i+1?>" style="display:<?=$display?>;">
   <h1><img src="img/ila_news_title2.png" alt="아프리카뉴스" /></h1>
    
    <div class="campaign_page">
        <span class="campaign_num"><span id="cnt<?=$i+1?>" style="font-weight:bold; color:#ffffff;">1</span>/<?=$tot?></span>
        <span class="campaign_l"><img src="/img/l_btn2.png" alt="왼쪽버튼" id="ll" <?=$onclick1?>/></span>
        <span class="campaign_r"><img src="/img/r_btn2.png" alt="오른쪽버튼" id="rr" <?=$onclick2?>/></span>
        <span class="more"><a href="sub02_view_2.php?p=2&ii_no=1&lm=1&lmv="><img src="img/more.png" alt="more" /></a></span> 
    </div>
	<div class="news_line"></div>
<?
			if(!$thumbImage){
?>
	<div class="ila_news_text">
        <h2><a href="<?=$_list_link?>"><?=$_list_subject?></a></h2>
        <p><a href="<?=$_list_link?>"><?=ksubstr(strip_tags(txtParse($_list[$i]['b_content'],2)),90)?><img src="img/ila_news_img1.jpg" width="121" height="64"/></a></p>
    </div>
 <?
			}
			else{
?>
   
    <div class="ila_news_contents">
	    <h2><?=$_list_subject?></h2>
        <span class="ila_img"><a href="<?=$_list_link?>"><img src="<?=$thumbImage?>" alt="갤러리이미지1"  width="121" height="64"/></a></span>
        <p><a href="<?=$_list_link?>"><?=ksubstr(strip_tags(txtParse($_list[$i]['b_content'],2)),174)?></a></p>
    </div>
<?
			}
?>
</div>
<?
		}
?>
<script>
function DisplayMenu(index) {
	for (i=1; i<=<?=$tot?>; i++){
		if (index == i) {
			thisMenu = eval("menu" + index + ".style");
			thisMenu.display = "";
		} 
		else {
			otherMenu = eval("menu" + i + ".style"); 
			otherMenu.display = "none";
		}
		$('#cnt'+index).text(index);
		
	}
}
</script><?
	}
	else{	
?>
 <div class="ila_news" id="menu1" style="display:;">
   <h1><img src="img/ila_news_title2.png" alt="나누고 싶은 이야기" /></h1>
    
    <div class="campaign_page">
        <span class="campaign_num">&nbsp;</span>
        <span class="campaign_l"><img src="/img/l_btn2.png" alt="왼쪽버튼" id="ll" /></span>
        <span class="campaign_r"><img src="/img/r_btn2.png" alt="오른쪽버튼" id="rr"/></span>
        <span class="more"><a href="board.php?b_class=46"><img src="img/more.png" alt="more" /></a></span>
    </div>
   <div class="news_line"></div>
</div>
<?
	}	
?>
