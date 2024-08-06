<?
	include "../common/common.php";
	
	$argu['c_code'] = $argu["am_cate"];
	$m_row = $Obj_afmove -> get_afm_view($argu);

	// 첨부 이미지 or 본문 이미지 찾기
	if($m_row["am_image"] != ""){
		$ext = substr(strrchr($m_row["am_image"],"."),1);	//확장자앞 .을 제거하기 위하여 substr()함수를 이용
		$ext = strtolower($ext);					//확장자를 소문자로 변환
		
		if ( $ext=="gif"||$ext=="jpg"||$ext=="jpeg"||$ext=="png"||$ext=="bmp"||$ext=="tif"||$ext=="tiff"){
			$thumbImage="/pds/".$Obj_afmove->_PDS_SUB.$m_row["am_image"];
		}else{
			preg_match("/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i",$m_row['am_content'],$imgSRC);
			$thumbImage=$imgSRC[1];
		}
	}else{
		preg_match("/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i",txtParse($m_row['am_content'],2),$imgSRC);
		$thumbImage=$imgSRC[1];
	}

	if(strlen($thumbImage)<3){
		$thumbImage="/common/no_photo.php?w=203&h=152";
	}


	if($argu["am_cate"] == "1"){
?>
			<!-- 2017 kor 111 -->
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"></td>
                </tr>
                <tr>
                    <td width="710" style="padding-left:10px; position:relative; height:361px;">
					
					<?if($m_row["am_move"] ==""){?>
				<div data-configid="15812229/54168489" style="width:710px; height:554px;" class="issuuembed"></div>
					<script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>  
                   
			<?}else{?>

            <?//=txtParse($m_row['am_move'],2)?>
			
			<?}?>
					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <tr>
                    <td style="padding-left:10px;">
                    <ul class="mp">
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab9_off.png" name="s52" border="0" id="s52" onclick="move_tab(1);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab10_on.png" name="s53" border="0" id="s53" onclick="move_tab(2);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab12_on.png" name="s60" border="0" id="s60" onclick="move_tab(3);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab13_on.png" name="s61" border="0" id="s61" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab8_on.png" name="s51" border="0" id="s51" onclick="move_tab(5);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab11_on.png" name="s52" border="0" id="s52" onclick="move_tab(6);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab5_on.png" name="s53" border="0" id="s53" onclick="move_tab(7);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab6_on.png" name="s54" border="0" id="s54" onclick="move_tab(11);" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab3_on.png" name="s55" border="0" id="s55"  onclick="move_tab(12);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab4_on.png" name="s56" border="0" id="s56" onclick="move_tab(13);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab1_on.png" name="s57" border="0" id="s57" onclick="move_tab(14);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab2_on.png" name="s58" border="0" id="s58" onclick="move_tab(15);" style="cursor:pointer"/>                        </ul></td>                        </ul></td>
                <tr>
                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>

            
<!-- 2017 eng 111 -->
<?
	}
	else if($argu["am_cate"] == "2"){
?>
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"></td>
                </tr>
                <tr>
                    <td width="710" style="padding-left:10px; position:relative; height:361px;">
					
					 <?if($m_row["am_move"] ==""){?>
				<div data-configid="15812229/58856889" style="width:710px; height:554px;" class="issuuembed"></div>
					<script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>    
					<?}else{?>

            <?//=txtParse($m_row['am_move'],2)?>
		
				<div data-configid="15812229/58856889" style="width:710px; height:554px;" class="issuuembed"></div>
					<script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>    
                
                			<?}?>
					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <tr>
                    <td style="padding-left:10px;">
                    <ul class="mp">
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab9_on.png" name="s52" border="0" id="s52" onclick="move_tab(1);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab10_off.png" name="s53" border="0" id="s53" onclick="move_tab(2);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab12_on.png" name="s60" border="0" id="s60" onclick="move_tab(3);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab13_on.png" name="s61" border="0" id="s61" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab8_on.png" name="s51" border="0" id="s51" onclick="move_tab(5);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab11_on.png" name="s52" border="0" id="s52" onclick="move_tab(6);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab5_on.png" name="s53" border="0" id="s53" onclick="move_tab(7);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab6_on.png" name="s54" border="0" id="s54" onclick="move_tab(11);" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab3_on.png" name="s55" border="0" id="s55"  onclick="move_tab(12);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab4_on.png" name="s56" border="0" id="s56" onclick="move_tab(13);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab1_on.png" name="s57" border="0" id="s57" onclick="move_tab(14);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab2_on.png" name="s58" border="0" id="s58" onclick="move_tab(15);" style="cursor:pointer"/>                        </ul></td>                        </ul></td>
                </tr>
                <tr>
                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>

<!-- 2017 kor -->

<?
	}
	else if($argu["am_cate"] == "3"){
?>
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"></td>
                </tr>
                <tr>
                    <td width="710" style="padding-left:10px; position:relative; height:361px;">
					
					<?if($m_row["am_move"] ==""){?>
				<div data-configid="15812229/58850315" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>
					<?}else{?>

            <?//=txtParse($m_row['am_move'],2)?>
		
				<div data-configid="15812229/58850315" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>
                
                			<?}?>
					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <tr>
                    <td style="padding-left:10px;">
                    <ul class="mp">
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab9_on.png" name="s52" border="0" id="s52" onclick="move_tab(1);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab10_on.png" name="s53" border="0" id="s53" onclick="move_tab(2);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab12_off.png" name="s60" border="0" id="s60" onclick="move_tab(3);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab13_on.png" name="s61" border="0" id="s61" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab8_on.png" name="s51" border="0" id="s51" onclick="move_tab(5);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab11_on.png" name="s52" border="0" id="s52" onclick="move_tab(6);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab5_on.png" name="s53" border="0" id="s53" onclick="move_tab(7);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab6_on.png" name="s54" border="0" id="s54" onclick="move_tab(11);" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab3_on.png" name="s55" border="0" id="s55"  onclick="move_tab(12);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab4_on.png" name="s56" border="0" id="s56" onclick="move_tab(13);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab1_on.png" name="s57" border="0" id="s57" onclick="move_tab(14);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab2_on.png" name="s58" border="0" id="s58" onclick="move_tab(15);" style="cursor:pointer"/>                        </ul></td>                        </ul></td>
                </tr>
                <tr>
                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>

<!-- 2017 eng -->

<?
	}
	else if($argu["am_cate"] == "4"){

?>
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"></td>
                </tr>
                <tr>
                    <td width="710" style="padding-left:10px; position:relative; height:361px;">
					
					<!-- <?if($m_row["am_move"] ==""){?>
				<div data-configid="15812229/54169368" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>
					<?}else{?>

            <?//=txtParse($m_row['am_move'],2)?>
		
				<div data-configid="15812229/54169368" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>
                
                			<?}?>
					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <tr>
                    <td style="padding-left:10px;">
                    <ul class="mp">
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab9_on.png" name="s52" border="0" id="s52" onclick="move_tab(1);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab10_on.png" name="s53" border="0" id="s53" onclick="move_tab(2);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab12_on.png" name="s60" border="0" id="s60" onclick="move_tab(3);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab13_off.png" name="s61" border="0" id="s61" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab8_on.png" name="s51" border="0" id="s51" onclick="move_tab(5);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab11_on.png" name="s52" border="0" id="s52" onclick="move_tab(6);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab5_on.png" name="s53" border="0" id="s53" onclick="move_tab(7);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab6_on.png" name="s54" border="0" id="s54" onclick="move_tab(11);" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab3_on.png" name="s55" border="0" id="s55"  onclick="move_tab(12);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab4_on.png" name="s56" border="0" id="s56" onclick="move_tab(13);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab1_on.png" name="s57" border="0" id="s57" onclick="move_tab(14);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab2_on.png" name="s58" border="0" id="s58" onclick="move_tab(15);" style="cursor:pointer"/>                        </ul></td>                        </ul></td>
                </tr>
                <tr>
                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>

            
<!-- 2016 kor -->
<?
	}
	else if($argu["am_cate"] == "5"){
?>
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"></td>
                </tr>
                <tr>
                    <td width="710" style="padding-left:10px; position:relative; height:361px;">
					
					<?if($m_row["am_move"] ==""){?>
				<div data-configid="15812229/58852169" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>
					<?}else{?>

            <?//=txtParse($m_row['am_move'],2)?>
		
				<div data-configid="15812229/58852169" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>
                
                			<?}?>
					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <tr>
                    <td style="padding-left:10px;">
                    <ul class="mp">
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab9_on.png" name="s52" border="0" id="s52" onclick="move_tab(1);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab10_on.png" name="s53" border="0" id="s53" onclick="move_tab(2);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab12_on.png" name="s60" border="0" id="s60" onclick="move_tab(3);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab13_on.png" name="s61" border="0" id="s61" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab8_off.png" name="s51" border="0" id="s51" onclick="move_tab(5);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab11_on.png" name="s52" border="0" id="s52" onclick="move_tab(6);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab5_on.png" name="s53" border="0" id="s53" onclick="move_tab(7);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab6_on.png" name="s54" border="0" id="s54" onclick="move_tab(11);" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab3_on.png" name="s55" border="0" id="s55"  onclick="move_tab(12);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab4_on.png" name="s56" border="0" id="s56" onclick="move_tab(13);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab1_on.png" name="s57" border="0" id="s57" onclick="move_tab(14);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab2_on.png" name="s58" border="0" id="s58" onclick="move_tab(15);" style="cursor:pointer"/>                        </ul></td>                        </ul></td>
                </tr>
                <tr>
                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>

<!-- 2016 eng -->
<?
	}
	else if($argu["am_cate"] == "6"){
?>
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"></td>
                </tr>
                <tr>
                    <td width="710" style="padding-left:10px; position:relative; height:361px;">
					
					<?if($m_row["am_move"] ==""){?>
				<div data-configid="15812229/54643014" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>
					<?}else{?>

            <?//=txtParse($m_row['am_move'],2)?>
		
				<div data-configid="15812229/54643014" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>
                
                			<?}?>
					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <tr>
                    <td style="padding-left:10px;">
                    <ul class="mp">
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab9_on.png" name="s52" border="0" id="s52" onclick="move_tab(1);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab10_on.png" name="s53" border="0" id="s53" onclick="move_tab(2);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab12_on.png" name="s60" border="0" id="s60" onclick="move_tab(3);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab13_on.png" name="s61" border="0" id="s61" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab8_on.png" name="s51" border="0" id="s51" onclick="move_tab(5);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab11_off.png" name="s52" border="0" id="s52" onclick="move_tab(6);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab5_on.png" name="s53" border="0" id="s53" onclick="move_tab(7);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab6_on.png" name="s54" border="0" id="s54" onclick="move_tab(11);" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab3_on.png" name="s55" border="0" id="s55"  onclick="move_tab(12);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab4_on.png" name="s56" border="0" id="s56" onclick="move_tab(13);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab1_on.png" name="s57" border="0" id="s57" onclick="move_tab(14);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab2_on.png" name="s58" border="0" id="s58" onclick="move_tab(15);" style="cursor:pointer"/>                        </ul></td>                        </ul></td>
                <tr>
                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>            
            

<!-- 2015 kor -->
<?
	}
	else if($argu["am_cate"] == "7"){
?>
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"></td>
                </tr>
                <tr>
                    <td width="710" style="padding-left:10px; position:relative; height:361px;">
					
					<?if($m_row["am_move"] ==""){?>
				<div data-configid="15812229/34893423" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>
					<?}else{?>

            <?//=txtParse($m_row['am_move'],2)?>
		
				<div data-configid="15812229/34893423" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>
                
                			<?}?>
					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <tr>
                    <td style="padding-left:10px;">
                    <ul class="mp">
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab9_on.png" name="s52" border="0" id="s52" onclick="move_tab(1);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab10_on.png" name="s53" border="0" id="s53" onclick="move_tab(2);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab12_on.png" name="s60" border="0" id="s60" onclick="move_tab(3);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab13_on.png" name="s61" border="0" id="s61" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab8_on.png" name="s51" border="0" id="s51" onclick="move_tab(5);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab11_on.png" name="s52" border="0" id="s52" onclick="move_tab(6);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab5_off.png" name="s53" border="0" id="s53" onclick="move_tab(7);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab6_on.png" name="s54" border="0" id="s54" onclick="move_tab(11);" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab3_on.png" name="s55" border="0" id="s55"  onclick="move_tab(12);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab4_on.png" name="s56" border="0" id="s56" onclick="move_tab(13);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab1_on.png" name="s57" border="0" id="s57" onclick="move_tab(14);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab2_on.png" name="s58" border="0" id="s58" onclick="move_tab(15);" style="cursor:pointer"/>                        </ul></td>                        </ul></td>
                </tr>
                <tr>
                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>

            
<!-- 2015 eng -->
<?
	}	
	else if($argu["am_cate"] == "11"){
?>
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"></td>
                </tr>
                <tr>
                    <td width="710" style="padding-left:10px; position:relative; height:361px;">
					
					<?if($m_row["am_move"] ==""){?>
				<div data-configid="15812229/36455072" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>					<?}else{?>

            <?//=txtParse($m_row['am_move'],2)?>
				<div data-configid="15812229/36455072" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>					
            
				 			<?}?>
					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <tr>
                    <td style="padding-left:10px;">
                    <ul class="mp">
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab9_on.png" name="s52" border="0" id="s52" onclick="move_tab(1);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab10_on.png" name="s53" border="0" id="s53" onclick="move_tab(2);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab12_on.png" name="s60" border="0" id="s60" onclick="move_tab(3);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab13_on.png" name="s61" border="0" id="s61" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab8_on.png" name="s51" border="0" id="s51" onclick="move_tab(5);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab11_on.png" name="s52" border="0" id="s52" onclick="move_tab(6);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab5_on.png" name="s53" border="0" id="s53" onclick="move_tab(7);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab6_off.png" name="s54" border="0" id="s54" onclick="move_tab(11);" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab3_on.png" name="s55" border="0" id="s55"  onclick="move_tab(12);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab4_on.png" name="s56" border="0" id="s56" onclick="move_tab(13);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab1_on.png" name="s57" border="0" id="s57" onclick="move_tab(14);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab2_on.png" name="s58" border="0" id="s58" onclick="move_tab(15);" style="cursor:pointer"/>                        </ul></td>                        </ul></td>
                <tr>
                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>

<!-- 2014 kor -->
<?
	}	
	else if($argu["am_cate"] == "12"){
?>
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"></td>
                </tr>
                <tr>
                    <td width="710" style="padding-left:10px; position:relative; height:361px;">
					
					<?if($m_row["am_move"] ==""){?>
				<div data-configid="15812229/34893303" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>					<?}else{?>

            <?//=txtParse($m_row['am_move'],2)?>
            	<div data-configid="15812229/34893303" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>
		 			<?}?>
					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <tr>
                    <td style="padding-left:10px;">
                    <ul class="mp">
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab9_on.png" name="s52" border="0" id="s52" onclick="move_tab(1);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab10_on.png" name="s53" border="0" id="s53" onclick="move_tab(2);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab12_on.png" name="s60" border="0" id="s60" onclick="move_tab(3);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab13_on.png" name="s61" border="0" id="s61" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab8_on.png" name="s51" border="0" id="s51" onclick="move_tab(5);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab11_on.png" name="s52" border="0" id="s52" onclick="move_tab(6);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab5_on.png" name="s53" border="0" id="s53" onclick="move_tab(7);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab6_on.png" name="s54" border="0" id="s54" onclick="move_tab(11);" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab3_off.png" name="s55" border="0" id="s55"  onclick="move_tab(12);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab4_on.png" name="s56" border="0" id="s56" onclick="move_tab(13);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab1_on.png" name="s57" border="0" id="s57" onclick="move_tab(14);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab2_on.png" name="s58" border="0" id="s58" onclick="move_tab(15);" style="cursor:pointer"/>                        </ul></td>                        </ul></td>
                <tr>
                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>
            
<!-- 2014 eng -->            
<?
	}
	else if($argu["am_cate"] == "13"){
?>
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"></td>
                </tr>
                <tr>
                    <td width="710" style="padding-left:10px; position:relative; height:361px;">
					
					<?if($m_row["am_move"] ==""){?>
			<div data-configid="15812229/34893414" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script> 

					<?}else{?>

            <?//=txtParse($m_row['am_move'],2)?>
			<div data-configid="15812229/34893414" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>
			<?}?>
					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <tr>
                    <td style="padding-left:10px;">
                    <ul class="mp">
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab9_on.png" name="s52" border="0" id="s52" onclick="move_tab(1);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab10_on.png" name="s53" border="0" id="s53" onclick="move_tab(2);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab12_on.png" name="s60" border="0" id="s60" onclick="move_tab(3);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab13_on.png" name="s61" border="0" id="s61" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab8_on.png" name="s51" border="0" id="s51" onclick="move_tab(5);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab11_on.png" name="s52" border="0" id="s52" onclick="move_tab(6);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab5_on.png" name="s53" border="0" id="s53" onclick="move_tab(7);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab6_on.png" name="s54" border="0" id="s54" onclick="move_tab(11);" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab3_on.png" name="s55" border="0" id="s55"  onclick="move_tab(12);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab4_off.png" name="s56" border="0" id="s56" onclick="move_tab(13);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab1_on.png" name="s57" border="0" id="s57" onclick="move_tab(14);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab2_on.png" name="s58" border="0" id="s58" onclick="move_tab(15);" style="cursor:pointer"/>                        </ul></td>                        </ul></td>                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>
            
<!-- 2013 kor -->
<?
	}	
	else if($argu["am_cate"] == "14"){
?>
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"></td>
                </tr>
                <tr>
                    <td width="710" style="padding-left:10px; position:relative; height:361px;">
					
					<?if($m_row["am_move"] ==""){?>
				<div data-configid="15812229/41256279" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script> 

            <?//=txtParse($m_row['am_move'],2)?>
			
			<?}?>
					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <tr>
                    <td style="padding-left:10px;">
                    <ul class="mp">
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab9_on.png" name="s52" border="0" id="s52" onclick="move_tab(1);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab10_on.png" name="s53" border="0" id="s53" onclick="move_tab(2);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab12_on.png" name="s60" border="0" id="s60" onclick="move_tab(3);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab13_on.png" name="s61" border="0" id="s61" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab8_on.png" name="s51" border="0" id="s51" onclick="move_tab(5);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab11_on.png" name="s52" border="0" id="s52" onclick="move_tab(6);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab5_on.png" name="s53" border="0" id="s53" onclick="move_tab(7);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab6_on.png" name="s54" border="0" id="s54" onclick="move_tab(11);" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab3_on.png" name="s55" border="0" id="s55"  onclick="move_tab(12);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab4_on.png" name="s56" border="0" id="s56" onclick="move_tab(13);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab1_off.png" name="s57" border="0" id="s57" onclick="move_tab(14);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab2_on.png" name="s58" border="0" id="s58" onclick="move_tab(15);" style="cursor:pointer"/>                        </ul></td>                        </ul></td>                </tr>
                <tr>
                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>
            
<!-- 2013 eng -->
<?
	}	
	else if($argu["am_cate"] == "15"){
?>
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"></td>
                </tr>
                <tr>
                    <td width="710" style="padding-left:10px; position:relative; height:361px;">
					
					<?if($m_row["am_move"] ==""){?>
				<div data-configid="0/34869161" style="width:710px; height:554px;" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script> 

            <?//=txtParse($m_row['am_move'],2)?>
			
			<?}?>
					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <tr>
                    <td style="padding-left:10px;">
                    <ul class="mp">
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab9_on.png" name="s52" border="0" id="s52" onclick="move_tab(1);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab10_on.png" name="s53" border="0" id="s53" onclick="move_tab(2);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab12_on.png" name="s60" border="0" id="s60" onclick="move_tab(3);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab13_on.png" name="s61" border="0" id="s61" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab7_on.png" name="s58" border="0" id="s58" style="cursor:pointer"/><br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab8_on.png" name="s51" border="0" id="s51" onclick="move_tab(5);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab11_on.png" name="s52" border="0" id="s52" onclick="move_tab(6);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab5_on.png" name="s53" border="0" id="s53" onclick="move_tab(7);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab6_on.png" name="s54" border="0" id="s54" onclick="move_tab(11);" style="cursor:pointer"/> <br />
                            <img src="img/sub01/tap/s2_tab.png" name="s59" border="0" id="s59" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab3_on.png" name="s55" border="0" id="s55"  onclick="move_tab(12);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab4_on.png" name="s56" border="0" id="s56" onclick="move_tab(13);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab1_on.png" name="s57" border="0" id="s57" onclick="move_tab(14);" style="cursor:pointer"/><img src="img/sub01/tap/s2_tab2_off.png" name="s58" border="0" id="s58" onclick="move_tab(15);" style="cursor:pointer"/>                        </ul></td>                        </ul></td>                </tr>
                <tr>
                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>


<?
	}	
?>