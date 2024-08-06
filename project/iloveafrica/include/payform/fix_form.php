<?
	include "../../common/common.php";
	
	if($argu["pay_code"] == "CMS"){
?>
<table cellpadding="0" cellspacing="0" border="0" class="title2">
	<tr>
		<td width="100" height="30" class="p2">결제은행</td>
		<td width="435" height="30"><select name="bank_cd" class="{label:'은행선택',required:true}">
				<option value="" >은행선택</option>
<?
			$query = "
				select
					*
				from
					payment_conf
				where
					pc_type='CMS'
				order by
					pc_code asc
			";
			$res = $_list =& $_DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			foreach($_list as $key => $value){
?>
				<option value="<?=$value['pc_code']?>"><?=$value['pc_name']?></option>
<?
			}	
?>
			</select>
		</td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">계좌번호</td>
		<td width="435" height="30"><input type="text" style="width:198px;ime-mode:disabled;" name="pay_num" class="{label:'계좌번호',required:true,numeric:true}" onkeypress="numberOnly()" maxlength="30" /></td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">예금주 성명</td>
		<td width="435" height="30"><input type="text" style="width:148px;" name="pay_name" class="{label:'예금주성명',required:true}" maxlength="20" /></td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">주민등록번호</td>
		<td width="435" height="30"><input type="text" name="pay_person1" size="8" class="{label:'주민등록번호',required:true,numeric:true}" maxlength="6" style="ime-mode:disabled;" onkeypress="numberOnly()" /> - <input type="password" name="pay_person2" size="12" class="{label:'주민등록번호',required:true,numeric:true}" maxlength="7" style="ime-mode:disabled;" onkeypress="numberOnly()" /></td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">정기후원일</td>
		<td width="435" height="30">
		<?foreach($_FL_CODE[6] as $key => $value){?>
		<input type="radio" name="pay_date" value="<?=$value?>" class="{label:'정기후원일',groupcheck:true}" <?if($key=='1'){?>checked<?}?>><?=$value?>일&nbsp;
		<?}?>
		</td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">휴대전화</td>
		<td width="435" height="30"><select style="width:65px;" name="buyr_tel1" class="{label:'휴대전화',required:true}">
			<option value="">선택</option>
			<?foreach($_FL_CODE[5][1] as $key => $value){?>
			<option value="<?=$value?>"><?=$value?></option>
			<?}?>
		</select>
		- <input type="text" style="width:40px;ime-mode:disabled;" name="buyr_tel2" maxlength="4" class="{label:'휴대전화',required:true,numeric:true}" onkeypress="numberOnly()" /> -
		<input type="text" style="width:40px;ime-mode:disabled;" name="buyr_tel3" maxlength="4" class="{label:'휴대전화',required:true,numeric:true}" onkeypress="numberOnly()" /></td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">SMS 전송여부</td>
		<td width="435" height="30"><input type="radio" name="sms_agree" value="Y">전송함 / <input type="radio" name="sms_agree" value="N" checked>전송안함</td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">현금영수증</td>
		<td width="435" height="30"><input type="checkbox" name="taxbill" id="taxbill" value="Y" onclick="taxbill_chg('taxbill', 'taxbill_info');">발행함 / 현금영수증 발행정보 : <input type="text" name="taxbill_info" id="taxbill_info" size="20" disabled style="ime-mode:disabled;" onkeypress="numberOnly()" maxlength="20"></td>
	</tr>
</table>
<?}?>

<?if($argu["pay_code"] == "MOB"){
?>
<table cellpadding="0" cellspacing="0" border="0" class="title2">
	<tr>
		<td width="100" height="30" class="p2">가입통신사</td>
		<td width="435" height="30">
		<input type="radio" name="bank_cd" value="SKT" class="{label:'가입통신사',groupcheck:true}" checked />SKT
		<input type="radio" name="bank_cd" value="KTF" class="{label:'가입통신사',groupcheck:true}" />KT
		<input type="radio" name="bank_cd" value="LGT" class="{label:'가입통신사',groupcheck:true}" />LGT
		</td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">정기후원일</td>
		<td width="435" height="30">
		<input type="radio" name="pay_date" value="05" class="{label:'정기후원일',groupcheck:true}" checked>5일
		</td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">휴대전화</td>
		<td width="435" height="30"><select style="width:65px;" name="pay_num1" class="{label:'휴대전화',required:true}">
			<option value="">선택</option>
			<?foreach($_FL_CODE[5][1] as $key => $value){?>
			<option value="<?=$value?>"><?=$value?></option>
			<?}?>
		</select>
		- <input type="text" style="width:40px;ime-mode:disabled;" name="pay_num2" class="{label:'휴대전화',required:true,numeric:true}" onkeypress="numberOnly()" maxlength="4" /> -
		<input type="text" style="width:40px;ime-mode:disabled;" name="pay_num3" class="{label:'휴대전화',required:true,numeric:true}" onkeypress="numberOnly()" maxlength="4" /></td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">가입자성명</td>
		<td width="435" height="30"><input type="text" style="width:148px;" name="pay_name" class="{label:'예금주성명',required:true}" maxlength="20" /></td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">주민등록번호</td>
		<td width="435" height="30"><input type="text" name="pay_person1" size="8" class="{label:'주민등록번호',required:true,numeric:true}" maxlength="6" style="ime-mode:disabled;" onkeypress="numberOnly()" /> - <input type="password" name="pay_person2" size="12" class="{label:'주민등록번호',required:true,numeric:true}" maxlength="7" style="ime-mode:disabled;" onkeypress="numberOnly()" /></td>
	</tr>
	<tr>
		<td width="100" height="30" class="p2">SMS 전송여부</td>
		<td width="435" height="30"><input type="radio" name="sms_agree" value="Y">전송함 / <input type="radio" name="sms_agree" value="N" checked>전송안함</td>
	</tr>
</table>
<?}?>