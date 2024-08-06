<h2><img src="img/lnb3_title.png" alt="후원하기" /></h2>

<div id="lnb_menu">

    <ul class="container">
<?
	$_cate_list = $Obj_shop->get_category_all($ctotal);

	if(is_array($_cate_list)){
		$_imgFullPath = $_SERVER["DOCUMENT_ROOT"]."/pds/shop/";
		$_imgPath = "/pds/shop/";
		foreach($_cate_list as $_ckey => $_cvalue){
			$_strImg=(file_exists($_imgFullPath.$_cvalue["sc_img_off"]) && $_cvalue["sc_img_off"]) ? $_imgPath.$_cvalue["sc_img_off"] : "/common/no_photo.php?w=221&h=35";
?>

		<li class="menu">
			<ul>
				<li>
					<img src="<?=$_strImg?>" alt="<?=$_cvalue["sc_title"]?>">
				</li>
<?
			$sc_no = $_cvalue["sc_no"];
			$_cate_list_m = $Obj_shop->get_category_all_m($sc_no,$ctotal);
			if(is_array($_cate_list_m)){
				foreach($_cate_list_m as $_cmkey => $_cmvalue){
					$_strImg_m=(file_exists($_imgFullPath.$_cmvalue["scm_img_off"]) && $_cmvalue["scm_img_off"]) ? $_imgPath.$_cmvalue["scm_img_off"] : "/common/no_photo.php?w=221&h=35";
					$_strImg_m_on=(file_exists($_imgFullPath.$_cmvalue["scm_img_on"]) && $_cmvalue["scm_img_on"]) ? $_imgPath.$_cmvalue["scm_img_on"] : "/common/no_photo.php?w=221&h=35";


?>
				<li class="button">
<?
					if($argu["lm"] == $_cmvalue["scm_no"]){
						$display = "display:block";
?>
					<img src="<?=$_strImg_m_on?>" name="scm_<?=$_cmvalue["scm_no"]?>" alt="<?=$_cmvalue["scm_title"]?>"><span></span>
<?
					}
					else{
						$display = "display:none";
?>
					<a href="#" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('scm_<?=$_cmvalue["scm_no"]?>','','<?=$_strImg_m_on?>',1)">
						<img src="<?=$_strImg_m?>" name="scm_<?=$_cmvalue["scm_no"]?>" alt="<?=$_cmvalue["scm_title"]?>"><span></span>
					</a>
<?
					}	
?>
				</li>
				<li class="dropdown" style="<?=$display?>">
					<ul>
<?
						$argu["sc_no"] = $_cvalue["sc_no"];
						$argu["scm_no"] = $_cmvalue["scm_no"];
						$_item_list = $Obj_shop -> get_item_all($argu,$total);
						if(is_array($_item_list)){
							foreach($_item_list as $_itemkey => $_itemvalue){
							if($argu["si_no"] == $_itemvalue["si_no"]){
								$_strImg_item=(file_exists($_imgFullPath.$_itemvalue["si_img_2"]) && $_itemvalue["si_img_2"]) ? $_imgPath.$_itemvalue["si_img_2"] : "/common/no_photo.php?w=221&h=35";
							}
							else{
								$_strImg_item=(file_exists($_imgFullPath.$_itemvalue["si_img_1"]) && $_itemvalue["si_img_1"]) ? $_imgPath.$_itemvalue["si_img_1"] : "/common/no_photo.php?w=221&h=35";
							}


							if($_itemvalue["si_no"] == "36"){
								$_link = "#";
							}
							else if($_itemvalue["si_no"] == "37"){
								$_link = "sub03_02_02_02_01.php?lm=".$argu["scm_no"];
							}
							else if($_itemvalue["si_no"] == "38"){
								$_link = "sub03_02_02_03_01.php?lm=".$argu["scm_no"];
							}
							else if($_itemvalue["si_no"] == "39"){
								$_link = "sub03_02_02_04_01.php?lm=".$argu["scm_no"];
							}
							else if($_itemvalue["si_no"] == "40"){
								$_link = "sub03_02_02_05_01.php?lm=".$argu["scm_no"];
							}
							else if($_itemvalue["si_no"] == "41"){
								$_link = "sub03_02_02_06_01.php?lm=".$argu["scm_no"];
							}
							else{
								$_link = "support.php?mode=VIEW&si_no=".$_itemvalue["si_no"]."&lm=".$argu["scm_no"];
							}
?>
						<li>
							<a href="<?=$_link?>"><img src="<?=$_strImg_item?>" alt="<?=$_itemvalue["si_name"]?>"></a>
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
 
	



		<li class="menu"><!-- // lnb34 -->
			<ul>
				<li >
				<? 
					if(preg_match("/sub03_02_05_01_01/",$_SERVER["PHP_SELF"])) { 
						$display = "display:block";
				?>
					<a href="#"><img src="img/lnb3_on_04.png"><span></span></a>
				<? 	
					}
					else  {
						$display = "display:none";
				?>
					<a href="support.php?mode=CART&tab_chk=1" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb34','','img/lnb3_on_04.png',1)">
						<img src="img/lnb3_off_04.png" name="lnb34"><span></span>
					</a>
				<? 
					} 
				?>
				</li>
			</ul>
		</li>


		<li class="menu"><!-- // lnb36 -->
			<ul>
				<li >
				<? 
					if(preg_match("/sub03_06/",$_SERVER["PHP_SELF"])) { 
						$display = "display:block";
				?>
					<a href="#"><img src="img/lnb3_on_06.png"><span></span></a>
				<? 	
					}
					else  {
						$display = "display:none";
				?>
					<a href="sub10_02_01_01_01.php" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb36','','img/lnb3_on_06.png',1)">
						<img src="img/lnb3_off_06.png" name="lnb36"><span></span>
					</a>
				<? 
					} 
				?>
				</li>
			</ul>
		</li>

		<li class="menu"><!-- // lnb37 -->
			<ul>
				<li >
				<? 
					if(preg_match("/sub03_02_07_01_01/",$_SERVER["PHP_SELF"])) { 
						$display = "display:block";
				?>
					<a href="#"><img src="img/lnb3_on_07.png"><span></span></a>
				<? 	
					}
					else  {
						$display = "display:none";
				?>
					<a href="sub03_02_07_01_01.php" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb37','','img/lnb3_on_07.png',1)">
						<img src="img/lnb3_off_07.png" name="lnb37"><span></span>
					</a>
				<? 
					} 
				?>
				</li>
			</ul>
		</li>

    </ul>
    
<div class="clear"></div>
</div><!-- // lnb_menu -->

<div class="lnb_banner">

    <ul>
	<li class="margin_b_1"><a href="support.php?mode=CART&tab_chk=1"><img src="img/lnb/lnb_banner31.png"></a></li>
    <li class="margin_b_1"><a href="support.php?mode=CART&tab_chk=1"><img src="img/lnb/lnb_banner32.png"></a></li>
    <li class="margin_b_1"><a href="support.php?mode=CART&tab_chk=2"><img src="img/lnb/lnb_banner33.png"></a></li>
    <li class="margin_b_1"><a href="support.php?mode=VIEW&si_no=41&lm=9"><img src="img/lnb/lnb_banner34.png"></a></li>
    <!-- <li><a href="sub02_view.php?ii_no=1&lm=1" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('b35','','img/lnb/lnb_banner35_o.png',1)"><img src="img/lnb/lnb_banner35.png" name="b35"></a></li>
    <li><a href="sub02_view.php?ii_no=6&lm=2" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('b36','','img/lnb/lnb_banner36_o.png',1)"><img src="img/lnb/lnb_banner36.png" name="b36"></a></li> -->
    </ul>
    
</div><!-- // lnb_banner -->