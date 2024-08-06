<?
	include "../../common/common.php";
	
	if($argu["pay_code"]=="bank"){
?>
<table cellpadding="0" cellspacing="0" border="0" style="width:658px;">
	<tr>
	<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
    <td width="98" height="30" class="title1">입금은행</td>
    <td width="535" height="30"><select name="bank_code" class="{label:'입금은행',required:true}">
		<option value="">선택</option>
		<?foreach($_DEPOSIT_CODE as $key => $value){?>
		<option value="<?=$key?>"><?=$value['bank']?></option>
		<?}?>
	</select></td>
    </tr>
    <tr>
    <td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
    <td width="98" height="30" class="title1">입금자명</td>
    <td width="535" height="30"><input type="text" style="width:150px;" name="bank_name" class="{label:'입금자명',required:true}" maxlength="20" /></td>
    </tr>
    <tr>
    <td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
    <td width="98" height="30" class="title1">입금예정일</td>
    <td width="535" height="30"><input type="text" style="width:100px;" name="deposit_date" id="deposit_date" class="{label:'입금예정일',required:true}" /></td>
  </tr>
</table>
<?}?>