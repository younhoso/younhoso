<?
	include "../../common/common.php";

	$_row = $Obj_ainfo->get_ainfo_view($argu);

	if($argu["tab_chk"] == "1"){
?>
    <table cellpadding="0" cellspacing="0" border="0" width="728">
    
    <!-- 나라명, 국기 -->
    <tr>
    <td style="color:#323232; font-size:21px; font-weight:bold; padding-bottom:28px; height:21px;"><?=$_row["ai_country"]?><span style="padding-left:10px;"></span></td>
    </tr>
    
    <!-- 나라소개, 나라설명, 통관절차 탭 -->
    <tr>
    <td style="width:728px;margin:0px; padding:0px; border-bottom:2px solid #ef3b36;">
    <ul style="">
    <li class="fl" style="float:left;margin:0px; padding:0px;"><img src="../../img/sub05/tab1_o.png" name="tt1" border="0" id="tt1" onclick="javascript:tab_change_info(1,<?=$_row["ai_no"]?>);" style="cursor:hand"/></li>
    <li class="fl" style="float:left;margin:0px; padding:0px"><img src="../../img/sub05/tab2.png" name="tt2" border="0" id="tt2" onclick="javascript:tab_change_info(2,<?=$_row["ai_no"]?>);" style="cursor:hand"/></li>
    <li class="fl" style="float:left;margin:0px; padding:0px"><img src="../../img/sub05/tab3.png" name="tt3" border="0" id="tt3" onclick="javascript:tab_change_info(3,<?=$_row["ai_no"]?>);" style="cursor:hand"/></li>
    </ul>
    </td>
    </tr>
	<tr>
		<td style="border-top:1px solid #ef3b36;width:728px"></td>
	</tr>
    
    <!-- 내용 -->
    <tr>
    <td style="line-height:19px; color:#494949; font-size:11px; padding-top:10px;" >
		<div class="s241" style="width:728px; height:395px;overflow:auto;border:1px solid #cacaca;padding:5px;color:#494949;" >
			<?=$_row["ai_memo1"]?>
		</div>
	</td>
    </tr>
    </table>
<?
	}
	else if($argu["tab_chk"] == "2"){
?>
    <table cellpadding="0" cellspacing="0" border="0" width="728">
    
    <!-- 나라명, 국기 -->
    <tr>
    <td style="color:#323232; font-size:21px; font-weight:bold; padding-bottom:28px; height:21px;"><?=$_row["ai_country"]?><span style="padding-left:10px;"></span></td>
    </tr>
    
    <!-- 나라소개, 나라설명, 통관절차 탭 -->
    <tr>
    <td style="width:728px;margin:0px; padding:0px; border-bottom:2px solid #ef3b36;">
    <ul style="">
    <li class="fl" style="float:left;margin:0px; padding:0px;"><img src="../../img/sub05/tab1.png" name="tt1" border="0" id="tt1" onclick="javascript:tab_change_info(1,<?=$_row["ai_no"]?>);" style="cursor:hand"/></li>
    <li class="fl" style="float:left;margin:0px; padding:0px"><img src="../../img/sub05/tab2_o.png" name="tt2" border="0" id="tt2" onclick="javascript:tab_change_info(2,<?=$_row["ai_no"]?>);" style="cursor:hand"/></li>
    <li class="fl" style="float:left;margin:0px; padding:0px"><img src="../../img/sub05/tab3.png" name="tt3" border="0" id="tt3" onclick="javascript:tab_change_info(3,<?=$_row["ai_no"]?>);" style="cursor:hand"/></li>
    </ul>
    </td>
    </tr>
	<tr>
		<td style="border-top:1px solid #ef3b36;width:728px"></td>
	</tr>
    
    <!-- 내용 -->
    <tr>
    <td style="line-height:19px; color:#494949; font-size:11px; padding-top:10px;" >
		<div class="s241" style="width:728px; height:395px;overflow:auto;border:1px solid #cacaca;padding:5px;color:#494949;" >
			<?=$_row["ai_memo2"]?>
		</div>
	</td>
    </tr>
    </table>
<?
	}	
	else if($argu["tab_chk"] == "3"){
?>
    <table cellpadding="0" cellspacing="0" border="0" width="728">
    
    <!-- 나라명, 국기 -->
    <tr>
    <td style="color:#323232; font-size:21px; font-weight:bold; padding-bottom:28px; height:21px;"><?=$_row["ai_country"]?><span style="padding-left:10px;"></span></td>
    </tr>
    
    <!-- 나라소개, 나라설명, 통관절차 탭 -->
    <tr>
    <td style="width:728px;margin:0px; padding:0px; border-bottom:2px solid #ef3b36;">
    <ul style="">
    <li class="fl" style="float:left;margin:0px; padding:0px;"><img src="../../img/sub05/tab1.png" name="tt1" border="0" id="tt1" onclick="javascript:tab_change_info(1,<?=$_row["ai_no"]?>);" style="cursor:hand"/></li>
    <li class="fl" style="float:left;margin:0px; padding:0px"><img src="../../img/sub05/tab2.png" name="tt2" border="0" id="tt2" onclick="javascript:tab_change_info(2,<?=$_row["ai_no"]?>);" style="cursor:hand"/></li>
    <li class="fl" style="float:left;margin:0px; padding:0px"><img src="../../img/sub05/tab3_o.png" name="tt3" border="0" id="tt3" onclick="javascript:tab_change_info(3,<?=$_row["ai_no"]?>);" style="cursor:hand"/></li>
    </ul>
    </td>
    </tr>
	<tr>
		<td style="border-top:1px solid #ef3b36;width:728px"></td>
	</tr>
    
    <!-- 내용 -->
    <tr>
    <td style="line-height:19px; color:#494949; font-size:11px; padding-top:10px;" >
		<div class="s241" style="width:728px; height:395px;overflow:auto;border:1px solid #cacaca;padding:5px;color:#494949;" >
			<?=$_row["ai_memo3"]?>
		</div>
	</td>
    </tr>
    </table>
<?
	}	
?>