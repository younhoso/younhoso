<!-- 일시 후원 신청 폼 -->
<form name="order_info" id="order_info" method="post" enctype="multipart/form-data" style="margin:0;">
<input type="hidden" name="m" value="<?=$argu["m"]?>" />
<input type="hidden" name="s" value="<?=$argu["s"]?>" />
<input type="hidden" name="give_type" value="<?=$argu['give_type']?>" />
<input type="hidden" name="good_name" value="<?=$_CODE_ONE_GIVE[1][$argu['give_type']]?>" />
<input type="hidden" name="mode" value="INPUT" />

<input type="hidden" name="ordr_idxx" value="<?=$_ordr_idxx?>" />

<table width="658" border="0" cellpadding="0" cellspacing="0" style="margin:30px 21px; color:#494949;">
	<tr>
		<td colspan="4"><img src="./img/m02/s02/s02_01_01_01.jpg" width="658" height="111"></td>
	</tr>
	<tr>
		<td width="417" height="36"></td>
		<!-- 로그인, 회원가입, 비회원후원 버튼 -->
		<?if($_SESSION['user_id']){?>
		<td width="80"></td>
		<td width="80"></td>
		<td width="81"></td>
		<?}else{?>
		<td width="80"><div id="order_login_btn" style="width:80px;"><a href="#" onclick="layer_pop_view('login.php?return_url=<?=urlencode("one_order.php?m=".$argu['m']."&s=".$argu['s']."&give_type=".$argu['give_type'])?>', '417');"><img src="./img/m02/s02/s02_01_01_03.jpg" width="80" height="36"></a></div></td>
		<td width="80"><div id="order_join_btn" style="width:80px;"><a href="index.php?m=m10&s=s02_01_01"><img src="./img/m02/s02/s02_01_01_04.jpg" width="80" height="36"></a></div></td>
		<td width="81"><div id="order_nouser_btn" style="width:81px;"><a href="#" onclick="no_user_order();"><img src="./img/m02/s02/s02_01_01_05.jpg" width="81" height="36"></a></div></td>
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
				<td width="98" height="30" class="title1">결제방법</td>
				<td width="535" height="30">
				<table cellpadding="0" cellspacing="0" border="0" class="title2">
					<tr>
					<?foreach($_PAYMENT_CODE['nmethod'] as $key => $value){?>
						<td><input type="radio" name="pay_method" value="<?=$key?>" <?if($key==$argu["pay_method"]){?>checked<?}?> onclick="pay_method_form('one_form.php', '<?=$key?>', '<?=$value?>');"/></td>
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
						<td><input type="radio" name="good_mny" value="30000"  onclick="fix_good_mny('30000');" checked/></td>
						<td class="p1">30,000원</td>
						<td><input type="radio" name="good_mny" value="50000" onclick="fix_good_mny('50000');" /></td>
						<td class="p1">50,000원</td>
						<td><input type="radio" name="good_mny" value="100000" onclick="fix_good_mny('100000');" /></td>
						<td class="p1">100,000원</td>
						<td><input type="radio" name="good_mny" value="200000" onclick="fix_good_mny('200000');" /></td>
						<td class="p1">200,000원</td>
						<td><input type="radio" name="good_mny" value="300000" onclick="fix_good_mny('300000');" /></td>
						<td class="p1">300,000원</td>
					</tr>
				</table>
				</td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"></td>
				<td width="98" height="30" class="title1"></td>
				<td width="535" height="30">
				<table cellpadding="0" cellspacing="0" border="0" class="title2">
					<tr>
						<td><input type="radio" name="good_mny" value="etc"  onclick="fix_good_mny('etc');"  /></td>
						<td class="p1">기타</td>
						<td><input type="text" style="width:100px;ime-mode:disabled;" name="good_mny1" id="good_mny1" maxlength="10" disabled onkeypress="numberOnly()"/></td>
						<td class="p1">원</td>
					</tr>
				</table>
				</td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
				<td width="98" height="30" class="title1">후원종류</td>
				<td width="535" height="30">
				<table cellpadding="0" cellspacing="0" border="0" class="title2">
					<tr>
						<td>일시후원</td>
						<td class="p1"><select name="ol_give_sel[]" class="{label:'후원종류',Groupsel:true,required:true}">
							<option value="">선택</option>
							<?foreach($_CODE_ONE_GIVE[5] as $key => $value){?>
							<option value="<?=$key?>"><?=$value?></option>
							<?}?>
						</select></td>
					</tr>
				</table>
				</td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"></td>
				<td width="98" height="30" class="title1"></td>
				<td width="535" height="30">
				<table cellpadding="0" cellspacing="0" border="0" class="title2">
					<tr>
						<td>긴급구호</td>
						<td class="p1"><select name="ol_give_sel[]" class="{label:'후원종류',Groupsel:true,required:true}">
						<option value="">선택</option>
							<?foreach($_CODE_ONE_GIVE[6] as $key => $value){?>
							<option value="<?=$key?>"><?=$value?></option>
							<?}?>
						</select></td>
					</tr>
				</table>
				</td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
				<td width="98" height="30" class="title1"><span id="pay_type" class="title1"></span></td>
				<td width="535" height="30" bgcolor="#f0f0f0">
				<div id="pay_method" style="padding:5px 0px;"></div>
				</td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
				<td width="98" height="30" class="title1">가입동기</td>
				<td width="535" height="30">
				<table cellpadding="0" cellspacing="0" border="0" class="title2">
					<tr>
						<?foreach($_CODE_ONE_GIVE[4] as $key => $value){?>
						<td><input type="radio" name="ol_give_reason" value="<?=$key?>" class="{label:'가입동기',groupcheck:true}" /></td>
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
				<td colspan="3" height="10"></td>
			</tr>
			<tr>
				<td colspan="3" style="background:url(./img/m02/s02/s02_01_01_15_1.jpg) no-repeat;" width="658" height="39" align="right">
				<table cellpadding="0" cellspacing="0" border="0" class="title2">
					<tr>
						<td><input type="checkbox" id="same_data" onclick="one_same_data();" /></td>
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
				<td width="535" height="30"><input type="text" style="width:150px;" name="ol_give_name" maxlength='20' class="{label:'성명',required:true}" /></td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
				<td width="98" height="30" class="title1">주민번호</td>
				<td width="535" height="30"><input type="text" style="width:65px;ime-mode:disabled;" name="ol_give_person1" maxlength='6' class="{label:'주민번호',required:true}" onkeypress="numberOnly()" /> - <input type="password" style="width:75px;ime-mode:disabled;" name="ol_give_person2" maxlength='7' class="{label:'주민번호',required:true}" onkeypress="numberOnly()" /></td>
			</tr>
			<tr>
			<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
			<td width="98" height="30" class="title1">연락처</td>
			<td width="535" height="30"><select style="width:65px;" name="ol_give_tel11" maxlength='3' class="{label:'연락처',required:true}">
					<option value="">선택</option>
					<?foreach($_FL_CODE[5][1] as $key => $value){?>
					<option value="<?=$value?>"<?if($argu['ol_give_tel11']==$value){?> selected<?}?>><?=$value?></option>
					<?}?>
				</select>
				- 
				<input type="text" style="width:60px;ime-mode:disabled;" name="ol_give_tel12" maxlength='4' class="{label:'연락처',required:true}" onkeypress="numberOnly()" value="<?=$argu['ol_give_tel12']?>" /> 
				- 
				<input type="text" style="width:65px;ime-mode:disabled;" name="ol_give_tel13" maxlength='4' class="{label:'연락처',required:true}" onkeypress="numberOnly()" value="<?=$argu['ol_give_tel13']?>" /></td>
			</tr>
			<tr>
			<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
			<td width="98" height="30" class="title1">이메일</td>
			<td width="535" height="30"><input type="text" style="width:100px;ime-mode:disabled;" name="ol_give_email1" class="{label:'이메일',required:true}" value="<?=$argu['ol_give_email1']?>"  /> @ 
				<input type="text" style="width:100px;ime-mode:disabled;" name="ol_give_email2" id="ol_give_email2" readonly class="{label:'이메일',required:true}" value="<?=$argu['ol_give_email2']?>" />
				<select name="ol_give_email3" onchange="selectEmail(this.value, '#ol_give_email2');">
					<option value="">선택하세요.</option>
				<?foreach($_FL_CODE[4] as $key => $value){?>
					<option value="<?=$value?>"<?if($value==$argu['ol_give_email3']){?> selected<?}?>><?=$value?></option>
				<?}?>
				</select></td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"><img src="./img/m02/s02/img.jpg" /></td>
				<td width="98" height="30" class="title1">주소</td>
				<td width="535" height="30">
				<table cellpadding="0" cellspacing="0" border="0">
					<tr>
						<td><input type="text" style="width:70px;" name="ol_give_zip" readonly onclick="zipcode('order_info', 'ol_give_zip', 'ol_give_add1', 'ol_give_add2');" class="{label:'우편번호',required:true}" value="<?=$argu['ol_give_zip']?>" /></td>
						<td style="padding:0 5px;"><img src="./img/m02/s01/woo.jpg" style="cursor:pointer;" onclick="zipcode('order_info', 'ol_give_zip', 'ol_give_add1', 'ol_give_add2');" /></td>
						<?
							foreach($_FL_CODE[7] as $key => $value){
								$_checked = ($key==$argu["ol_give_local"]) ? " checked" : "";
						?>
						<td><input type="radio" name="ol_give_local" value="<?=$key?>"<?=$_checked?> class="{label:'주소',groupcheck:true}" ></td>
						<td class="p1"><?=$value?></td>
						<?}?>
					</tr>
				</table>
				</td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"></td>
				<td width="98" height="30" class="title1"></td>
				<td width="535" height="30"><input type="text" name="ol_give_add1" style="width:345px;" readonly class="{label:'주소',required:true}" value="<?=$argu['ol_give_add1']?>" /></td>
			</tr>
			<tr>
				<td width="25" height="30" align="center"></td>
				<td width="98" height="30" class="title1"></td>
				<td width="535" height="30"><input type="text" name="ol_give_add2" style="width:345px;" class="{label:'상세주소',required:true}" value="<?=$argu['ol_give_add2']?>" /></td>
			</tr>
			<tr>
				<td colspan="3" height="10"></td>
			</tr>
			<tr>
				<td colspan="3" height="1" bgcolor="#cfcfcf"></td>
			</tr>
			<tr>
				<td colspan="3" align="center" height="70"><input type="image" src="./img/m02/s01/m02_s01_01_01_01_40.jpg" width="119" height="46" id="order_submit" style="cursor:pointer;<?if(!$_SESSION['user_id']){?>display:none;<?}?>"></td>
			</tr>
		</table>
		</td>
	</tr>    
</table>
</form>
<script>pay_method_form('one_form.php', '<?=$argu["pay_method"]?>', '<?=$_PAYMENT_CODE["nmethod"][$argu["pay_method"]]?>');</script>