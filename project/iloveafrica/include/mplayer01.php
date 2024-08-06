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
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"><img src="img/sub04/s4_img4.png" /></td>
                </tr>
                <tr>
                    <td width="539" style="padding-left:20px; position:relative; height:361px;">
					
					<?if($m_row["am_move"] ==""){?>
					<div id='mediaspace1'>등록된 동영상이 없습니다.</div>
					<!--<script type='text/javascript'> 
					  jwplayer('mediaspace1').setup({
						autostart: true,
						flashplayer: '/js/mediaplayer/player.swf',
						file: '<?=$m_row["am_url"]?>',
						controlbar: 'bottom',
						width: '539',
						height: '360',
						fullscreen: true,

						/*
						plugins: {
							hd: { file: '<?=$m_row["am_url"]?>', fullscreen: true },
							gapro: { accountid: "UKsi93X940-24" }
						},
						*/
						image: '<?=$thumbImage?>'
					  });
					</script>-->
                   
			<?}else{?>

            <?=txtParse($m_row['am_move'],2)?>
			<?}?>
					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <td align="right" style="padding-left:10px;">
                    <ul class="mp">
                            <li><img src="img/sub04/s4_tab1_o.png" name="s41" border="0" id="s41" onclick="move_tab(1);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab2.png" name="s42" border="0" id="s42" onclick="move_tab(2);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab3.png" name="s43" border="0" id="s43" onclick="move_tab(3);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab4.png" name="s44" border="0" id="s44" onclick="move_tab(4);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab5.png" name="s45" border="0" id="s45" onclick="move_tab(5);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab6.png" name="s46" border="0" id="s46" onclick="move_tab(6);" style="cursor:pointer"/></li>
                        </ul></td>
                </tr>
                <tr>
                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>
<?
	}
	else if($argu["am_cate"] == "2"){
?>
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"><img src="img/sub04/s4_img4.png" /></td>
                </tr>
                <tr>
                    <td width="539" style="padding-left:20px; position:relative; height:361px;">
					
					<?if($m_row["am_move"] ==""){?>
					<div id='mediaspace1'>등록된 동영상이 없습니다.</div>
					<!--<script type='text/javascript'> 
					  jwplayer('mediaspace1').setup({
						autostart: false,
						flashplayer: "/js/mediaplayer/player.swf",
						file: '<?=$m_row["am_url"]?>',
						controlbar: 'bottom',
						width: '539',
						height: '360',
						image: "<?=$thumbImage?>"
					  });
					</script>-->
					<?}else{?>

            <?=txtParse($m_row['am_move'],2)?>
			<?}?>

					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <td align="right" style="padding-left:10px;"><ul class="mp">
                            <li><img src="img/sub04/s4_tab1.png" name="s41" border="0" id="s41" onclick="move_tab(1);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab2_o.png" name="s42" border="0" id="s42" onclick="move_tab(2);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab3.png" name="s43" border="0" id="s43" onclick="move_tab(3);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab4.png" name="s44" border="0" id="s44" onclick="move_tab(4);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab5.png" name="s45" border="0" id="s45" onclick="move_tab(5);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab6.png" name="s46" border="0" id="s46" onclick="move_tab(6);" style="cursor:pointer"/></li>
                        </ul></td>
                </tr>
                <tr>
                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>
<?
	}	
	else if($argu["am_cate"] == "3"){
?>
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"><img src="img/sub04/s4_img4.png" /></td>
                </tr>
                <tr>
                    <td width="539" style="padding-left:20px; position:relative; height:361px;">
					
					<?if($m_row["am_move"] ==""){?>
					<div id='mediaspace1'>등록된 동영상이 없습니다.</div>
					<!--<script type='text/javascript'> 
					  jwplayer('mediaspace1').setup({
						autostart: false,
						flashplayer: "/js/mediaplayer/player.swf",
						file: '<?=$m_row["am_url"]?>',
						controlbar: 'bottom',
						width: '539',
						height: '360',
						image: "<?=$thumbImage?>"
					  });
					</script>-->
					<?}else{?>

            <?=txtParse($m_row['am_move'],2)?>
			<?}?>

					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <td align="right" style="padding-left:10px;"><ul class="mp">
                            <li><img src="img/sub04/s4_tab1.png" name="s41" border="0" id="s41" onclick="move_tab(1);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab2.png" name="s42" border="0" id="s42" onclick="move_tab(2);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab3_o.png" name="s43" border="0" id="s43" onclick="move_tab(3);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab4.png" name="s44" border="0" id="s44" onclick="move_tab(4);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab5.png" name="s45" border="0" id="s45" onclick="move_tab(5);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab6.png" name="s46" border="0" id="s46" onclick="move_tab(6);" style="cursor:pointer"/></li>
                        </ul></td>
                </tr>
                <tr>
                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>
<?
	}	
	else if($argu["am_cate"] == "4"){
?>
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"><img src="img/sub04/s4_img4.png" /></td>
                </tr>
                <tr>
                    <td width="539" style="padding-left:20px; position:relative; height:361px;">
					
					<?if($m_row["am_move"] ==""){?>
				<div id='mediaspace1'>등록된 동영상이 없습니다.</div>
					<!--<script type='text/javascript'> 
					  jwplayer('mediaspace1').setup({
						autostart: false,
						flashplayer: "/js/mediaplayer/player.swf",
						file: '<?=$m_row["am_url"]?>',
						controlbar: 'bottom',
						width: '539',
						height: '360',
						image: "<?=$thumbImage?>"
					  });
					</script>-->
					<?}else{?>

            <?=txtParse($m_row['am_move'],2)?>
			<?}?>

					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <td align="right" style="padding-left:10px;"><ul class="mp">
                            <li><img src="img/sub04/s4_tab1.png" name="s41" border="0" id="s41" onclick="move_tab(1);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab2.png" name="s42" border="0" id="s42" onclick="move_tab(2);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab3.png" name="s43" border="0" id="s43" onclick="move_tab(3);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab4_o.png" name="s44" border="0" id="s44" onclick="move_tab(4);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab5.png" name="s45" border="0" id="s45" onclick="move_tab(5);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab6.png" name="s46" border="0" id="s46" onclick="move_tab(6);" style="cursor:pointer"/></li>
                        </ul></td>
                </tr>
                <tr>
                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>
<?
	}	
	else if($argu["am_cate"] == "5"){
?>
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"><img src="img/sub04/s4_img4.png" /></td>
                </tr>
                <tr>
                    <td width="539" style="padding-left:20px; position:relative; height:361px;">
					
					<?if($m_row["am_move"] ==""){?>
					<div id='mediaspace1'>등록된 동영상이 없습니다.</div>
					<!--<script type='text/javascript'> 
					  jwplayer('mediaspace1').setup({
						autostart: false,
						flashplayer: "/js/mediaplayer/player.swf",
						file: '<?=$m_row["am_url"]?>',
						controlbar: 'bottom',
						width: '539',
						height: '360',
						image: "<?=$thumbImage?>"
					  });
					</script>-->
					<?}else{?>

            <?=txtParse($m_row['am_move'],2)?>
			<?}?>

					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <td align="right" style="padding-left:10px;"><ul class="mp">
                            <li><img src="img/sub04/s4_tab1.png" name="s41" border="0" id="s41" onclick="move_tab(1);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab2.png" name="s42" border="0" id="s42" onclick="move_tab(2);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab3.png" name="s43" border="0" id="s43" onclick="move_tab(3);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab4.png" name="s44" border="0" id="s44" onclick="move_tab(4);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab5_o.png" name="s45" border="0" id="s45" onclick="move_tab(5);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab6.png" name="s46" border="0" id="s46" onclick="move_tab(6);" style="cursor:pointer"/></li>
                        </ul></td>
                </tr>
                <tr>
                    <td height="20" width="733" colspan="2"></td>   
                </tr>
            </table>
<?
	}	
	else if($argu["am_cate"] == "6"){
?>
			<table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td colspan="2" style="padding:20px 0 13px 20px;"><img src="img/sub04/s4_img4.png" /></td>
                </tr>
                <tr>
                    <td width="539" style="padding-left:20px; position:relative; height:361px;">
					
					<?if($m_row["am_move"] ==""){?>
					<div id='mediaspace1'>등록된 동영상이 없습니다.</div>
					<!--<script type='text/javascript'> 
					  jwplayer('mediaspace1').setup({
						autostart: false,
						flashplayer: "/js/mediaplayer/player.swf",
						file: '<?=$m_row["am_url"]?>',
						controlbar: 'bottom',
						width: '539',
						height: '360',
						image: "<?=$thumbImage?>"
					  });
					</script>-->
					<?}else{?>

            <?=txtParse($m_row['am_move'],2)?>
			<?}?>

					<!-- <div style="position:absolute; bottom:16px; left:36px; padding:10px 13px; background:url(img/sub01/text_bg.png); color:#ffffff; font-size:15px;">탄자니아 아이들을 행복하게 하는것은 많은 것이 아닌 ..</div>
                        <img src="img/sub04/s4_img5.png" style="padding:10px; border:1px solid #dedede;" /> -->
					</td>
                    <td align="right" style="padding-left:10px;"><ul class="mp">
                            <li><img src="img/sub04/s4_tab1.png" name="s41" border="0" id="s41" onclick="move_tab(1);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab2.png" name="s42" border="0" id="s42" onclick="move_tab(2);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab3.png" name="s43" border="0" id="s43" onclick="move_tab(3);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab4.png" name="s44" border="0" id="s44" onclick="move_tab(4);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab5.png" name="s45" border="0" id="s45" onclick="move_tab(5);" style="cursor:pointer"/></li>
                            <li><img src="img/sub04/s4_tab6_o.png" name="s46" border="0" id="s46" onclick="move_tab(6);" style="cursor:pointer"/></li>
                        </ul></td>
                </tr>
                <tr>
                    <td height="20" width="733" colspan="2"></td>
                </tr>
            </table>
<?
	}	
?>