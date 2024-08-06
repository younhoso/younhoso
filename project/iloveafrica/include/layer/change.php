<?include "../../common/common.php";?>
<div style="width:320px; height:188px; border:1px solid #dedede; background:#ffffff; ">
    <div style="position:relative; width:282px; margin:0 auto;">
	<form name="myform" id="myform" method="post" action="change_ok.php">
	<input type="hidden" name="ordr_idxx[]" value="<?=$argu["ordr_idxx"]?>">
        <table cellpadding="0" cellspacing="0" border="0" width="282">
            <tr>
                <td colspan="2" style="height:27px; padding-top:30px;" valign="top"><img src="img/sub10/pop_h2.png" /></td>
            </tr>
            <tr>
                <td style="border-bottom:1px solid #dedede; border-top:2px solid #454545; background:#f0f0f0; text-align:center; font-size:12px; color:#494949; font-weight:bold; height:30px; width:89px;">후원금액</td>
                <td style="border-bottom:1px solid #dedede; border-top:2px solid #454545; font-size:12px; color:#494949; width:183px; height:30px; padding-left:10px;">
					<input type="text" style="ime-mode:disabled" onkeypress="numberOnly()" name="chg_good_mny[]">
				</td>
            </tr>
            <tr>
                <td style="border-bottom:2px solid #454545; background:#f0f0f0; text-align:center; font-size:12px; color:#494949; font-weight:bold; width:89px; height:30px;">후원상태</td>
                <td style="border-bottom:2px solid #454545; font-size:12px; color:#494949; width:183px; height:30px; padding-left:10px;">
					<!-- <input type="radio" name="h" />
                    진행 -->
                    <input type="checkbox" name="chg_good_cancel[]" value="<?=$argu["ordr_idxx"]?>" />
                    취소</td>
            </tr>
            <tr>
                <td colspan="2" style="height:55px; text-align:center;"><span style="padding-right:5px;"><input type="image" src="img/sub10/pop_bt1.png" /></span><span style="padding-left:5px;"><img src="img/sub10/pop_bt2.png" onclick="layer_pop_close();" style="cursor:pointer;"/></span></td>
            </tr>
        </table>
	</form>
    </div>
</div>
