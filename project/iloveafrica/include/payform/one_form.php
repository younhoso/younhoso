<?
	include "../../common/common.php";
	
	if($argu["pay_code"] == "100000000000"){
?>
<table cellpadding="0" cellspacing="0" border="0" class="title2">
	<tr>
		<td width="100" height="30" class="p2">카드 소유자명</td>
		<td width="435" height="30"><input type="text" style="width:100px;ime-mode:active;height:18px; border:1px solid #cacaca;" name="buyr_name" class="{label:'소유자명',required:true}" maxlength="20" /></td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">소유자 연락처</td>
		<td width="435" height="30"><select style="width:60px; height:20px; border:1px solid #cacaca;" name="buyr_tel11" class="{label:'소유자 연락처',required:true}">
			<option value="">선택</option>
			<?foreach($_FL_CODE[5][1] as $key => $value){?>
			<option value="<?=$value?>"<?if($argu['buyr_tel11']==$value){?> selected<?}?>><?=$value?></option>
			<?}?>
		</select>
		- 
		<input type="text" style="width:100px;ime-mode:disabled;height:18px; border:1px solid #cacaca;" name="buyr_tel12" maxlength='4' class="{label:'소유자 연락처',required:true}" onkeypress="numberOnly()" value="<?=$argu['buyr_tel12']?>" /> 
		- 
		<input type="text" style="width:100px;ime-mode:disabled;height:18px; border:1px solid #cacaca;" name="buyr_tel13" maxlength='4' class="{label:'소유자 연락처',required:true}" onkeypress="numberOnly()" value="<?=$argu['buyr_tel13']?>" /></td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">소유자 이메일</td>
		<td width="435" height="30"><input type="text" style="width:100px;ime-mode:disabled;height:18px; border:1px solid #cacaca;" name="buyr_mail1" class="{label:'소유자 이메일',required:true}" value="<?=$argu['buyr_mail1']?>"  /> @ 
		<input type="text" style="width:100px;ime-mode:disabled;height:18px; border:1px solid #cacaca;" name="buyr_mail2" id="buyr_mail2" readonly class="{label:'소유자 이메일',required:true}" value="<?=$argu['buyr_mail2']?>" />
		<select name="buyr_mail3" onchange="selectEmail(this.value, '#buyr_mail2');" style="width:100px; height:20px; border:1px solid #cacaca; margin-left:5px;">
			<option value="">선택하세요.</option>
		<?foreach($_FL_CODE[4] as $key => $value){?>
			<option value="<?=$value?>"<?if($value==$argu['buyr_mail3']){?> selected<?}?>><?=$value?></option>
		<?}?>
		</select></td>
	</tr>
</table>
<?}?>
	
<?if($argu["pay_code"] == "010000000000"){?>
<table cellpadding="0" cellspacing="0" border="0" class="title2">
	<tr>
		<td width="100" height="30" class="p2">예금주 성명</td>
		<td width="435" height="30"><input type="text" style="width:100px;ime-mode:active;height:18px; border:1px solid #cacaca;" name="buyr_name" class="{label:'예금주성명',required:true}" maxlength="20" /></td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">예금주 연락처</td>
		<td width="435" height="30"><select style="width:60px; height:20px; border:1px solid #cacaca;" name="buyr_tel11" class="{label:'예금주 연락처',required:true}">
			<option value="">선택</option>
			<?foreach($_FL_CODE[5][1] as $key => $value){?>
			<option value="<?=$value?>"><?=$value?></option>
			<?}?>
		</select>
		- <input type="text" style="width:100px;ime-mode:disabled;height:18px; border:1px solid #cacaca;" name="buyr_tel12" maxlength="4" class="{label:'예금주 연락처',required:true,numeric:true}" onkeypress="numberOnly()" /> -
		<input type="text" style="width:100px;ime-mode:disabled;height:18px; border:1px solid #cacaca;" name="buyr_tel13" maxlength="4" class="{label:'예금주 연락처',required:true,numeric:true}" onkeypress="numberOnly()" /></td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">예금주 이메일</td>
		<td width="435" height="30"><input type="text" style="width:100px;ime-mode:disabled;height:18px; border:1px solid #cacaca;" name="buyr_mail1" class="{label:'예금주 이메일',required:true}" value="<?=$argu['buyr_mail1']?>"  /> @ 
		<input type="text" style="width:100px;ime-mode:disabled;height:18px; border:1px solid #cacaca;" name="buyr_mail2" id="buyr_mail2" readonly class="{label:'예금주 이메일',required:true}" value="<?=$argu['buyr_mail2']?>" />
		<select name="buyr_mail3" onchange="selectEmail(this.value, '#buyr_mail2');" style="width:100px; height:20px; border:1px solid #cacaca; margin-left:5px;">
			<option value="">선택하세요.</option>
		<?foreach($_FL_CODE[4] as $key => $value){?>
			<option value="<?=$value?>"<?if($value==$argu['buyr_mail3']){?> selected<?}?>><?=$value?></option>
		<?}?>
		</select></td>
	</tr>
</table>
<?}?>

<?if($argu["pay_code"] == "000010000000"){?>
<table cellpadding="0" cellspacing="0" border="0" class="title2">
	<tr>
		<td width="100" height="30" class="p2">가입자 성명</td>
		<td width="435" height="30"><input type="text" style="width:100px;ime-mode:active;height:18px; border:1px solid #cacaca;" name="buyr_name" class="{label:'가입자 성명',required:true}" maxlength="20" /></td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">가입자 연락처</td>
		<td width="435" height="30"><select style="width:60px; height:20px; border:1px solid #cacaca;" name="buyr_tel11" class="{label:'가입자 연락처',required:true}">
			<option value="">선택</option>
			<?foreach($_FL_CODE[5][1] as $key => $value){?>
			<option value="<?=$value?>"><?=$value?></option>
			<?}?>
		</select>
		- <input type="text" style="width:100px;ime-mode:disabled;height:18px; border:1px solid #cacaca;" name="buyr_tel12" maxlength="4" class="{label:'가입자 연락처',required:true,numeric:true}" onkeypress="numberOnly()" /> -
		<input type="text" style="width:100px;ime-mode:disabled;height:18px; border:1px solid #cacaca;" name="buyr_tel13" maxlength="4" class="{label:'가입자 연락처',required:true,numeric:true}" onkeypress="numberOnly()" /></td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">가입자 이메일</td>
		<td width="435" height="30"><input type="text" style="width:100px;ime-mode:disabled;height:18px; border:1px solid #cacaca;" name="buyr_mail1" class="{label:'가입자 이메일',required:true}" value="<?=$argu['buyr_mail1']?>"  /> @ 
		<input type="text" style="width:100px;ime-mode:disabled;height:18px; border:1px solid #cacaca;" name="buyr_mail2" id="buyr_mail2" readonly class="{label:'가입자 이메일',required:true}" value="<?=$argu['buyr_mail2']?>" />
		<select name="buyr_mail3" onchange="selectEmail(this.value, '#buyr_mail2');" style="width:100px; height:20px; border:1px solid #cacaca; margin-left:5px;">
			<option value="">선택하세요.</option>
		<?foreach($_FL_CODE[4] as $key => $value){?>
			<option value="<?=$value?>"<?if($value==$argu['buyr_mail3']){?> selected<?}?>><?=$value?></option>
		<?}?>
		</select></td>
	</tr>
</table>
<?}?>

<?if($argu["pay_code"] == "bank"){?>
<table cellpadding="0" cellspacing="0" border="0" class="title2">
	<tr>
		<td width="100" height="30" class="p2">입금은행</td>
		<td width="435" height="30"><select name="bank_code" class="{label:'입금은행',required:true}">
		<option value="">선택</option>
		<?foreach($_DEPOSIT_CODE as $key => $value){?>
		<option value="<?=$key?>"><?=$value['bank']?></option>
		<?}?>
	</select></td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">입금자명</td>
		<td width="435" height="30"><input type="text" style="width:150px;" name="bank_name" class="{label:'입금자명',required:true}" /></td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">입금예정일</td>
		<td width="435" height="30"><input type="text" style="width:100px;" name="deposit_date" id="deposit_date" class="{label:'입금예정일',required:true}" /></td>
	</tr>
</table>
<?}?>