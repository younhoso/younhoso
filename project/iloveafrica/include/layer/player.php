<?
	include "../../common/common.php";

	$_row = $Obj_afmove->get_afm_view($argu);
	
	// 첨부 이미지 or 본문 이미지 찾기
	if($_row["am_image"] != ""){
		$ext = substr(strrchr($_row["am_image"],"."),1);	//확장자앞 .을 제거하기 위하여 substr()함수를 이용
		$ext = strtolower($ext);					//확장자를 소문자로 변환
		
		if ( $ext=="gif"||$ext=="jpg"||$ext=="jpeg"||$ext=="png"||$ext=="bmp"||$ext=="tif"||$ext=="tiff"){
			$thumbImage="/pds/".$Obj_afmove->_PDS_SUB.$_row["am_image"];
		}else{
			preg_match("/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i",$_row['am_content'],$imgSRC);
			$thumbImage=$imgSRC[1];
		}
	}else{
		preg_match("/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i",txtParse($_row['am_content'],2),$imgSRC);
		$thumbImage=$imgSRC[1];
	}

	if(strlen($thumbImage)<3){
		$thumbImage="/common/no_photo.php?w=203&h=152";
	}
?>
<script type="text/javascript" src="/js/mediaplayer/jwplayer.js"></script>
<div class="video">
    <table cellpadding="0" cellspacing="0" border="0" width="690">
        <tr>
            <td style="width:594px; height:45px; background:url(img/sub04/tt.png) no-repeat; padding:0 46px;" valign="bottom"><img src="img/sub04/video_title.png" /><span style="float:right;"><img src="img/sub04/close.png" style="cursor:pointer;" onclick="jwplayer('mediaspace').stop(); layer_pop_close();"/></span></td>
        </tr>
        <tr>
            <td style="background:url(img/sub04/bg.png) repeat-y; font-size:16px; color:#464646; font-weight:bold; padding:27px 46px 15px 46px;"><?=$_row["am_title"]?></td>
        </tr>
        <tr>
            <td style="background:url(img/sub04/bg.png) repeat-y; padding:0 46px; height:335px;">
			
			<?if($_row["am_move"] ==""){?>
			<div id='mediaspace'>This text will be replaced</div>
			<!--<script type='text/javascript'> 
			  jwplayer('mediaspace').setup({
				autostart: false,
				flashplayer: "/js/mediaplayer/player.swf",
				file: '<?=$_row["am_url"]?>',
				controlbar: 'bottom',
				width: '598',
				height: '335',
				image: "<?=$thumbImage?>"
			  });
			</script>-->
			<?}else{?>

            <?=txtParse($_row['am_move'],2)?>
			<?}?>
			</td>
        </tr>
        <tr>
            <td style="color:#494949; font-size:12px; font-weight:bold; padding:20px 46px;background:url(img/sub04/bg.png) repeat-y;">줄거리</td>
        </tr>
        <tr>
            <td style="padding:0 46px; color:#676767; line-height:19px; font-size:11px;background:url(img/sub04/bg.png) repeat-y;">
			<?=txtParse($_row["am_content"],2)?>
			</td>
        </tr>
        <tr>
            <td style="width:690px; height:45px; background:url(img/sub04/bb.png) no-repeat;"></td>
        </tr>
    </table>
</div>
