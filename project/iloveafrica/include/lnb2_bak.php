<h2><a href="sub02.php"><img src="img/lnb2_title.png" alt="사업소개" /></a></h2>

<div id="lnb_menu">

    <ul class="container">
    
<?
	$_cate_list = $Obj_info->get_category_all($ctotal);

	if(is_array($_cate_list)){
		$_imgFullPath = $_SERVER["DOCUMENT_ROOT"]."/pds/info/";
		$_imgPath = "/pds/info/";
		foreach($_cate_list as $_ckey => $_cvalue){
			$_strImg=(file_exists($_imgFullPath.$_cvalue["ic_img_off"]) && $_cvalue["ic_img_off"]) ? $_imgPath.$_cvalue["ic_img_off"] : "/common/no_photo.php?w=221&h=35";
?>

		<li class="menu">
			<ul>
				<li>
					<img src="<?=$_strImg?>" alt="<?=$_cvalue["ic_title"]?>">
				</li>
<?
			$ic_no = $_cvalue["ic_no"];
			$_cate_list_m = $Obj_info->get_category_all_m($ic_no,$ctotal);
			if(is_array($_cate_list_m)){
				foreach($_cate_list_m as $_cmkey => $_cmvalue){
					$_strImg_m=(file_exists($_imgFullPath.$_cmvalue["icm_img_off"]) && $_cmvalue["icm_img_off"]) ? $_imgPath.$_cmvalue["icm_img_off"] : "/common/no_photo.php?w=221&h=35";
					$_strImg_m_on=(file_exists($_imgFullPath.$_cmvalue["icm_img_on"]) && $_cmvalue["icm_img_on"]) ? $_imgPath.$_cmvalue["icm_img_on"] : "/common/no_photo.php?w=221&h=35";

?>
				<li class="button">
<?
					if($argu["lm"] == $_cmvalue["icm_no"]){
						$display = "display:block";
?>
					<img src="<?=$_strImg_m_on?>" name="icm_<?=$_cmvalue["icm_no"]?>" alt="<?=$_cmvalue["icm_title"]?>"><span></span>
<?
					}
					else{
						$display = "display:none";
?>
					<a href="#" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('icm_<?=$_cmvalue["icm_no"]?>','','<?=$_strImg_m_on?>',1)">
						<img src="<?=$_strImg_m?>" name="icm_<?=$_cmvalue["icm_no"]?>" alt="<?=$_cmvalue["icm_title"]?>"><span></span>
					</a>
<?
					}	
?>
				</li>
				<li class="dropdown" style="<?=$display?>">
					<ul>
<?
						$argu["ic_no"] = $_cvalue["ic_no"];
						$argu["icm_no"] = $_cmvalue["icm_no"];
						$_item_list = $Obj_info -> get_item_all($argu,$total);
						if(is_array($_item_list)){
							foreach($_item_list as $_itemkey => $_itemvalue){
								if($argu["ii_no"] == $_itemvalue["ii_no"]){
									$_strImg_item=(file_exists($_imgFullPath.$_itemvalue["ii_img_2"]) && $_itemvalue["ii_img_2"]) ? $_imgPath.$_itemvalue["ii_img_2"] : "/common/no_photo.php?w=221&h=35";
								}
								else{
									$_strImg_item=(file_exists($_imgFullPath.$_itemvalue["ii_img_1"]) && $_itemvalue["ii_img_1"]) ? $_imgPath.$_itemvalue["ii_img_1"] : "/common/no_photo.php?w=221&h=35";
								}
?>
						<li>
							<a href="sub02_view.php?ii_no=<?=$_itemvalue["ii_no"]?>&lm=<?=$argu["icm_no"]?>"><img src="<?=$_strImg_item?>" alt="<?=$_itemvalue["ii_name"]?>"></a>
						</li>
<?
							}
						}
						
?>
					</ul>
				</li>
<?
				}
			}
?>
			</ul>
		</li>
<?

		}
	}
?>
	
	
	</ul>
<div class="clear"></div>
   
</div><!-- // lnb_menu -->

<div class="lnb_banner">

    <ul>
	<li class="margin_b_1"><a href="support.php?mode=CART&tab_chk=1"><img src="img/lnb/lnb_banner21.png"></a></li>
    <li class="margin_b_1"><a href="support.php?mode=CART&tab_chk=1"><img src="img/lnb/lnb_banner22.png"></a></li>
    <li class="margin_b_1"><a href="support.php?mode=CART&tab_chk=2"><img src="img/lnb/lnb_banner23.png"></a></li>
    <li class="margin_b_1"><a href="support.php?mode=VIEW&si_no=41&lm=9"><img src="img/lnb/lnb_banner24.png"></a></li>
    <li><a href="board.php?b_class=7" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('b25','','img/lnb/lnb_banner25_o.png',1)"><img src="img/lnb/lnb_banner25.png" name="b25"></a></li>
    <li><a href="board.php?b_class=7" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('b26','','img/lnb/lnb_banner26_o.png',1)"><img src="img/lnb/lnb_banner26.png" name="b26"></a></li>
    <li><a href="board.php?b_class=7" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('b27','','img/lnb/lnb_banner27_o.png',1)"><img src="img/lnb/lnb_banner27.png" name="b27"></a></li>
    <li><a href="board.php?b_class=7" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('b28','','img/lnb/lnb_banner28_o.png',1)"><img src="img/lnb/lnb_banner28.png" name="b28"></a></li>
    </ul>
    
</div><!-- // lnb_banner -->