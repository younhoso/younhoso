<h2><img src="img/lnb6_title.png" alt="커뮤니티" /></h2>

<div id="lnb_menu" >
    
	<ul class="container">
		<li class="menu"><!-- // lnb61 -->
			<ul>
				<li class="button">
				<? 
					if($argu["b_class"] == "1" || $argu["b_class"] == "2" || $argu["b_class"] == "3") { 
						$display = "display:block";
				?>
					<a href="#"><img src="img/lnb/lnb6_on_01.png"><span></span></a>
				<? 	
					}
					else  {
						$display = "display:none";
				?>
					<a href="sub06_01_01_01_01.php" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb61','','img/lnb/lnb6_on_01.png',1)">
						<img src="img/lnb/lnb6_off_01.png" name="lnb61"><span></span>
					</a>
				<? 
					} 
				?>
				</li>
                <li class="dropdown" style="<?=$display?>">
					<ul>
						<li class="lnb_sub"><? if($argu["b_class"] == "1") { ?><img src="img/lnb/lnb6_on_01_01.png"><? 	}
						else  {?><a href="board.php?b_class=1" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb611','','img/lnb/lnb6_on_01_01.png',1)"><img src="img/lnb/lnb6_off_01_01.png" name="lnb611"></a><? } ?></li>
						<li class="lnb_sub"><? if($argu["b_class"] == "2") { ?><img src="img/lnb/lnb6_on_01_02.png"><? 	}
						else  {?><a href="board.php?b_class=2" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb612','','img/lnb/lnb6_on_01_02.png',1)"><img src="img/lnb/lnb6_off_01_02.png" name="lnb612"></a><? } ?></li>
						<li class="lnb_sub"><? if($argu["b_class"] == "3") { ?><img src="img/lnb/lnb6_on_01_03.png"><? 	}
						else  {?><a href="board.php?b_class=3" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb613','','img/lnb/lnb6_on_01_03.png',1)"><img src="img/lnb/lnb6_off_01_03.png" name="lnb613"></a><? } ?></li>
					</ul>
				</li>
			</ul>
		</li>

		<li class="menu"><!-- // lnb62 -->
			<ul>
				<li class="button">
				<? 
					if($argu["b_class"] == "4" || $argu["b_class"] == "5" || $argu["b_class"] == "6" || preg_match("/sub06_03_03_01_01/",$_SERVER["PHP_SELF"])) { 
						$display = "display:block";
				?>
					<a href="#"><img src="img/lnb/lnb6_on_02.png"><span></span></a>
				<? 	
					}
					else  {
						$display = "display:none";
				?>
					<a href="sub06_02_01_01_01.php" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb62','','img/lnb/lnb6_on_02.png',1)">
						<img src="img/lnb/lnb6_off_02.png" name="lnb62"><span></span>
					</a>
				<? 
					} 
				?>
				</li>
				<li class="dropdown" style="<?=$display?>">
					<ul>
						<li class="lnb_sub"><? if($argu["b_class"] == "4") { ?><img src="img/lnb/lnb6_on_02_01.png"><? 	}
						else  {?><a href="board.php?b_class=4" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb621','','img/lnb/lnb6_on_02_01.png',1)"><img src="img/lnb/lnb6_off_02_01.png" name="lnb621"></a><? } ?></li>
						<li class="lnb_sub"><? if($argu["b_class"] == "5") { ?><img src="img/lnb/lnb6_on_02_02.png"><? 	}
						else  {?><a href="board.php?b_class=5" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb622','','img/lnb/lnb6_on_02_02.png',1)"><img src="img/lnb/lnb6_off_02_02.png" name="lnb622"></a><? } ?></li>
						<li class="lnb_sub"><? if($argu["b_class"] == "6") { ?><img src="img/lnb/lnb6_on_02_03.png"><? 	}
						else  {?><a href="board.php?b_class=6" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb623','','img/lnb/lnb6_on_02_03.png',1)"><img src="img/lnb/lnb6_off_02_03.png" name="lnb623"></a><? } ?></li>
                        <li class="lnb_sub"><? if(preg_match("/sub06_03_03_01_01/",$_SERVER["PHP_SELF"])) { ?><img src="img/lnb/lnb6_on_02_04.png"><? 	}
						else  {?><a href="sub06_03_03_01_01.php" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb624','','img/lnb/lnb6_on_02_04.png',1)"><img src="img/lnb/lnb6_off_02_04.png" name="lnb624"></a><? } ?></li>
					</ul>
				</li>
			</ul>
		</li>


		<li class="menu"><!-- // lnb63 -->
			<ul>
				<li class="button">
				<? 
					if($argu["b_class"] == "7" || $argu["b_class"] == "8" || $argu["b_class"] == "9") { 
						$display = "display:block";
				?>
					<a href="#"><img src="img/lnb/lnb6_on_03.png"><span></span></a>
				<? 	
					}
					else  {
						$display = "display:none";
				?>
					<a href="sub06_03_01_01_01.php" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb63','','img/lnb/lnb6_on_03.png',1)">
						<img src="img/lnb/lnb6_off_03.png" name="lnb63"><span></span>
					</a>
				<? 
					} 
				?>
				</li>
				<li class="dropdown" style="<?=$display?>">
					<ul>
						<li class="lnb_sub"><? if($argu["b_class"] == "7") { ?><img src="img/lnb/lnb6_on_03_01.png"><? 	}
						else  {?><a href="board.php?b_class=7" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb631','','img/lnb/lnb6_on_03_01.png',1)"><img src="img/lnb/lnb6_off_03_01.png" name="lnb631"></a><? } ?></li>
						<li class="lnb_sub"><? if($argu["b_class"] == "8") { ?><img src="img/lnb/lnb6_on_03_02.png"><? 	}
						else  {?><a href="board.php?b_class=8" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb632','','img/lnb/lnb6_on_03_02.png',1)"><img src="img/lnb/lnb6_off_03_02.png" name="lnb632"></a><? } ?></li>
						<li class="lnb_sub"><? if($argu["b_class"] == "9") { ?><img src="img/lnb/lnb6_on_03_03.png"><? 	}
						else  {?><a href="board.php?b_class=9" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb633','','img/lnb/lnb6_on_03_03.png',1)"><img src="img/lnb/lnb6_off_03_03.png" name="lnb633"></a><? } ?></li>
					</ul>
				</li>
			</ul>
		</li>


		<li class="menu"><!-- // lnb64 -->
			<ul>
				<li class="button">
				<? 
					if($argu["b_class"] == "10" || $argu["b_class"] == "11" || $argu["b_class"] == "12") { 
						$display = "display:block";
				?>
					<a href="#"><img src="img/lnb/lnb6_on_04.png"><span></span></a>
				<? 	
					}
					else  {
						$display = "display:none";
				?>
					<a href="sub06_04_01_01_01.php" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb64','','img/lnb/lnb6_on_04.png',1)">
						<img src="img/lnb/lnb6_off_04.png" name="lnb64"><span></span>
					</a>
				<? 
					} 
				?>
				</li>
				<li class="dropdown" style="<?=$display?>">
					<ul>
						<li class="lnb_sub"><? if($argu["b_class"] == "10") { ?><img src="img/lnb/lnb6_on_04_01.png"><? 	}
						else  {?><a href="board.php?b_class=10" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb641','','img/lnb/lnb6_on_04_01.png',1)"><img src="img/lnb/lnb6_off_04_01.png" name="lnb641"></a><? } ?></li>
						<li class="lnb_sub"><? if($argu["b_class"] == "11") { ?><img src="img/lnb/lnb6_on_04_02.png"><? 	}
						else  {?><a href="board.php?b_class=11" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb642','','img/lnb/lnb6_on_04_02.png',1)"><img src="img/lnb/lnb6_off_04_02.png" name="lnb642"></a><? } ?></li>
						<li class="lnb_sub"><? if($argu["b_class"] == "12") { ?><img src="img/lnb/lnb6_on_04_03.png"><? 	}
						else  {?><a href="board.php?b_class=12" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('lnb643','','img/lnb/lnb6_on_04_03.png',1)"><img src="img/lnb/lnb6_off_04_03.png" name="lnb643"></a><? } ?></li>
					</ul>
				</li>
			</ul>
		</li>
			
    </ul>
<div class="clear"></div>
    
</div><!-- // lnb_menu -->

<div class="lnb_banner">

    <ul>
	<li class="margin_b_1"><a href="support.php?mode=CART&tab_chk=1"><img src="img/lnb/lnb_banner61.png"></a></li>
    <li class="margin_b_1"><a href="support.php?mode=CART&tab_chk=1"><img src="img/lnb/lnb_banner62.png"></a></li>
    <li class="margin_b_1"><a href="support.php?mode=CART&tab_chk=2"><img src="img/lnb/lnb_banner63.png"></a></li>
    <li class="margin_b_1"><a href="support.php?mode=VIEW&si_no=41&lm=9"><img src="img/lnb/lnb_banner64.png"></a></li>
    <li class="margin_b_1"><a href="sub10_01_01_01_01.php"><img src="img/lnb/lnb_banner65.png"></a></li>
    <li><a href="sub02_view.php?ii_no=1&lm=1" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('b66','','img/lnb/lnb_banner66_o.png',1)"><img src="img/lnb/lnb_banner66.png" name="b66"></a></li>
    <li><a href="sub02_view.php?ii_no=6&lm=2" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('b67','','img/lnb/lnb_banner67_o.png',1)"><img src="img/lnb/lnb_banner67.png" name="b67"></a></li>
    <li><a href="sub01_01_01_01_01.php" onmouseout="MM_swapImgRestore()" onmouseover="MM_swapImage('b68','','img/lnb/lnb_banner68_o.png',1)"><img src="img/lnb/lnb_banner68.png" name="b68"></a></li>
    </ul>
    
</div><!-- // lnb_banner -->