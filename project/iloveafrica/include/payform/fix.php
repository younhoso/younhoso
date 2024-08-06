<!-- 정기 후원 신청 폼 -->
<form name="fixedFrm" id="fixedFrm" method="post" enctype="multipart/form-data" style="margin:0;">
<input type="hidden" name="m" value="<?=$argu["m"]?>" />
<input type="hidden" name="s" value="<?=$argu["s"]?>" />

<?if($argu['cmode']=='1'){?>
<input type="hidden" name="f_no" value="<?=$_conf['cc_no']?>" />
<input type="hidden" name="good_name" value="[캠페인후원] <?=$_conf['f_title']?>" />
<input type="hidden" name="cl_give_type" value="1" />
<?}else{?>
<input type="hidden" name="f_no" value="<?=$_conf['f_no']?>" />
<input type="hidden" name="good_name" value="[사업후원] <?=$_conf['f_title']?>" />
<?}?>
<input type="hidden" name="pf_status" value="1" />
<input type="hidden" name="mode" value="INPUT" />
<table width="638" border="0" cellpadding="0" cellspacing="0" style="color:#494949; margin:30px 21px;">
	<tr>
		<td colspan="4" width="658" height="37"><img src="./img/m02/s01/m02_s01_01_01_01_02.jpg"></td>
	</tr>
	<tr>
		<td colspan="4" width="658" height="16"></td>
	</tr>
	<tr>
		<td colspan="4"><img src="./img/m02/s01/m02_s01_01_01_01_05.jpg" width="497" height="49"></td>
	</tr>
	<tr>
		<td width="417" height="45"></td>

		<!-- 로그인, 회원가입, 비회원후원 버튼 -->
		<?if($_SESSION['user_id']){?>
		<td width="80"></td>
		<td width="80"></td>
		<td width="81"></td>
		<?}else{?>
		<td width="80"><div id="order_login_btn" style="width:80px;"><a href="#" onclick="layer_pop_view('login.php?return_url=<?=urlencode("fix_order.php?".$_SERVER['QUERY_STRING'])?>', '417');"><img src="./img/m02/s01/m02_s01_01_01_01_08.jpg" width="80" height="45"></a></div></td>
		<td width="80"><div id="order_join_btn" style="width:80px;"><a href="index.php?m=m10&s=s02_01_01"><img src="./img/m02/s01/m02_s01_01_01_01_09.jpg" width="80" height="45"></a></div></td>
		<td style="width:81px;"><div id="order_nouser_btn" style="width:81px;"><a href="#" onclick="no_user_order();"><img src="./img/m02/s01/m02_s01_01_01_01_10.jpg" width="81" height="45"></a></div></td>
		<?}?>
	</tr>
	<tr>
		<td colspan="4">
		<table cellpadding="0" cellspacing="0" border="0" style="width:658px;">
			<tr>
				<td colspan="3" height="2" bgcolor="#454545"></td>
			</tr>
			<tr>
				<td colspan="3" height="10"></td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
				<td width="98" height="30" class="title1">후원분야</td>
				<td width="535" height="30"><?=$_conf['f_title']?></td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
				<td width="98" height="30" class="title1">결제방법</td>
				<td width="535" height="30">
				<table cellpadding="0" cellspacing="0" border="0" class="title2">
					<tr>
						<?
							foreach($_PAYMENT_CODE["fmethod"] as $key => $value){
								$_checked = ($key==$argu["pay_method"]) ? " checked" : "";
						?>
						<td><input type="radio" name="pay_method" value="<?=$key?>"<?=$_checked?> onclick="pay_method_form('fix_form.php', '<?=$key?>', '<?=$value?>');"></td>
						<td class="p1"><?=$value?></td>
						<?}?>
					</tr>
				</table>
				</td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
				<td width="98" height="30" class="title1">후원금액</td>
				<td width="535" height="30">
				<table cellpadding="0" cellspacing="0" border="0" class="title2">
					<tr>
						<?
							foreach($_good_mny as $key => $value){
								$_checked = ($value==$argu['good_mny']) ? " checked" : "";
								$_value = ($value=="etc") ? "기타" : number_format($value)."원";
						?>
						<td><input type="radio" name="good_mny" value="<?=$value?>"<?=$_checked?> onclick="fix_good_mny('<?=$value?>');" /></td>
						<td class="p1"><?=$_value?></td>
						<?}?>
						<td><input type="text" name="good_mny1" id="good_mny1" style="width:100px;ime-mode:disabled;"<?if($argu['good_mny'] != end($_good_mny)){?> disabled<?}?> onkeypress="numberOnly()" maxlength="10" value="<?=$argu['good_mny1']?>" /></td>
						<td class="p1">원</td>
					</tr>
				</table>
				</td>
			</tr>
			<tr>
				<td colspan="3">

				<!-- 신용카드, 계좌이체, 휴대전화 -->
				<table cellpadding="0" cellspacing="0" border="0" class="title2">
					<tr>
						<td width="25" align="center"><img src="./img/m02/s02/img.jpg" /></td>
						<td width="98" class="title1"><span id="pay_type" class="title1"></span></td>
						<td width="535" bgcolor="#f0f0f0">
						<div id="pay_method" style="padding:5px 0px;"></div>
						</td>
					</tr>
				</table>
				</td>
			</tr>    
			<tr>
				<td colspan="3" height="10"></td>
			</tr>
			<tr>
				<td colspan="3" height="1" bgcolor="#cfcfcf"></td>
			</tr>
			<tr>
				<td colspan="3" height="10"></td>
			</tr>
			<tr>
				<td colspan="3" style="background:url(./img/m02/s02/s02_01_01_15_1.jpg) no-repeat;" width="658" height="39" align="right">
				<table cellpadding="0" cellspacing="0" border="0" class="title2">
					<tr>
						<td><input type="checkbox" name="same_data" id="same_data" value="1" onclick="fix_same_data();"<?if($argu['same_data']=='1'){?> checked<?}?> /></td>
						<td>결제 정보와 동일</td>
					</tr>
				</table>
				</td>
			</tr>
			<tr>
				<td colspan="3" height="2" bgcolor="#454545"></td>
			</tr>
			<tr>
				<td colspan="3" height="10"></td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
				<td width="98" height="30" class="title1">성명</td>
				<td width="535" height="30"><input type="text" style="width:150px;" name="fl_give_name" maxlength="20" class="{label:'성명',required:true}" value="<?=$argu['fl_give_name']?>" /></td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
				<td width="98" height="30" class="title1">주민번호</td>
				<td width="535" height="30"><input type="text" style="width:65px;ime-mode:disabled;" name="fl_give_person1" class="{label:'주민등록번호',required:true,numeric:true}" maxlength="6" onkeypress="numberOnly()" /> - 
				<input type="password" style="width:65px;ime-mode:disabled;" name="fl_give_person2" class="{label:'주민등록번호',required:true,numeric:true}" maxlength="7" onkeypress="numberOnly()" /></td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
				<td width="98" height="30" class="title1">연락처</td>
				<td width="535" height="30"><select style="width:65px;" name="fl_give_tel1" class="{label:'연락처',required:true}">
					<option value="">선택</option>
					<?foreach($_FL_CODE[5][1] as $key => $value){?>
					<option value="<?=$value?>"<?if($argu['fl_give_tel1']==$value){?> selected<?}?>><?=$value?></option>
					<?}?>
				</select>
				- 
				<input type="text" style="width:60px;ime-mode:disabled;" name="fl_give_tel2" class="{label:'연락처',required:true}" onkeypress="numberOnly()" maxlength="4" value="<?=$argu['fl_give_tel2']?>" /> 
				- 
				<input type="text" style="width:65px;ime-mode:disabled;" name="fl_give_tel3" class="{label:'연락처',required:true}" onkeypress="numberOnly()" maxlength="4" value="<?=$argu['fl_give_tel3']?>" /></td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
				<td width="98" height="30" class="title1">이메일</td>
				<td width="535" height="30"><input type="text" style="width:100px;ime-mode:disabled;" name="fl_give_email1" class="{label:'이메일',required:true}" value="<?=$argu['fl_give_email1']?>"  /> @ 
				<input type="text" style="width:100px;ime-mode:disabled;" name="fl_give_email2" id="fl_give_email2" readonly class="{label:'이메일',required:true}" value="<?=$argu['fl_give_email2']?>" />
				<select name="fl_give_email3" onchange="selectEmail(this.value, '#fl_give_email2');">
					<option value="">선택하세요.</option>
				<?foreach($_FL_CODE[4] as $key => $value){?>
					<option value="<?=$value?>"<?if($value==$argu['fl_give_email3']){?> selected<?}?>><?=$value?></option>
				<?}?>
				</select></td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
				<td width="98" height="30" class="title1">주소</td>
				<td width="535" height="30">
				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td><input type="text" style="width:70px;" name="fl_give_zip" readonly onclick="zipcode('fixedFrm', 'fl_give_zip', 'fl_give_add1', 'fl_give_add2');" class="{label:'우편번호',required:true}" value="<?=$argu['fl_give_zip']?>" /></td>
						<td style="padding:0 5px;"><img src="./img/m02/s01/woo.jpg" style="cursor:pointer;" onclick="zipcode('fixedFrm', 'fl_give_zip', 'fl_give_add1', 'fl_give_add2');" /></td>
						<?
							foreach($_FL_CODE[7] as $key => $value){
								$_checked = ($key==$argu["fl_give_local"]) ? " checked" : "";
						?>
						<td><input type="radio" name="fl_give_local" value="<?=$key?>"<?=$_checked?> class="{label:'주소',groupcheck:true}" ></td>
						<td class="p1"><?=$value?></td>
						<?}?>
					</tr>
				</table>
				</td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"></td>
				<td width="98" height="30" class="title1"></td>
				<td width="535" height="30"><input type="text" name="fl_give_add1" style="width:345px;" readonly class="{label:'주소',required:true}" value="<?=$argu['fl_give_add1']?>" /></td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"></td>
				<td width="98" height="30" class="title1"></td>
				<td width="535" height="30"><input type="text" name="fl_give_add2" style="width:345px;" class="{label:'상세주소',required:true}" value="<?=$argu['fl_give_add2']?>" /></td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
				<td width="98" height="30" class="title1">가입동기</td>
				<td width="535" height="30">
				<table cellpadding="0" cellspacing="0" border="0" class="title2">
					<tr>
						<?
							foreach($_FL_CODE[3] as $key => $value){
								$_checked = ($key==$argu["fl_give_reason"]) ? " checked" : "";
						?>
						<td><input type="radio" name="fl_give_reason" value="<?=$key?>"<?=$_checked?> class="{label:'가입동기',groupcheck:true}" ></td>
						<td class="p1"><?=$value?></td>
						<?}?>
					</tr>
				</table>
				</td>
			</tr>
			<tr>
				<td colspan="3" height="10"></td>
			</tr>
			<tr>
				<td colspan="3" height="1" bgcolor="#cfcfcf"></td>
			</tr>
			<tr>
				<td colspan="3" align="center" height="70"><input type="image" src="./img/m02/s01/m02_s01_01_01_01_40.jpg" width="119" height="46" id="order_submit" <?if(!$_SESSION['user_id']){?>style="display:none;"<?}?>></td>
			</tr>
		</table>
		</td>
	</tr>
</table>
</form>
<script>pay_method_form('fix_form.php', '<?=$argu["pay_method"]?>', '<?=$_PAYMENT_CODE["fmethod"][$argu["pay_method"]]?>');</script>