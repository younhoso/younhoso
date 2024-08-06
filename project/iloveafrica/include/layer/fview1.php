<?
	include "../../common/common.php";

	$_row = $Obj_fsupport -> get_fs_view($argu["f_no"]);
?>
<div  >
    <table cellpadding="0" cellspacing="0" border="0" style="width:391px; border:3px solid #dedede; background:#ffffff;">
        <tr>
            <td style="padding:25px;"><table cellpadding="0" cellspacing="0" border="0" style="width:341px;">
                    <tr>
                        <td style="width:170px;"><img src="img/sub03/s32231_bt.png" /></td>
                        <td style="width:171px; text-align:right;"><img src="img/sub03/close.png" style="cursor:pointer;" onclick="layer_pop_close()"/></td>
                    </tr>
                    <!-- <tr>
                        <td colspan="2" style="color:#2a8a02; font-size:18px; text-align:center; padding:25px 0; font-family:NanumGothicExtraBold;">"송중기 데뷔 5주년 기념"</td>
                    </tr>
                    <tr>
                        <td colspan="2"><img src="img/sub03/song.png" /></td>
                    </tr> -->
                    <tr>
                        <td colspan="2" style="line-height:17px; font-size:11px; color:#676767; padding:10px 0;">
						<?=txtParse($_row["f_content"],2)?>
						</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="font-size:11px; color:#676767; font-weight:bold; text-align:right;"><?=$_row["f_name"]?></td>
                    </tr>
                </table></td>
        </tr>
    </table>
</div>
