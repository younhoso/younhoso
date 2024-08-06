<?if(!$_SESSION['user_id']){ ?>
<script>location.href="sub09_01_01_01_01.php";</script>
<?}?>
<h2 class="sub11_h2"><img src="img/sub11_title.png" alt="아이러브아프리카는 아프리카 대륙을 전문으로 돕는 아프리카전문국제구호개발 비정부기구(NGO, Non Governmental Organization)입니다." /></h2>
<script>
function chkFrm() {
	document.order_info.target="pay";
	document.order_info.action="./kcp/shop/order.php";
	document.order_info.submit();

//window.open ("./kcp/shop/order.php","test","width=800,height=800,status=0,menubar=0,toolbar=0,scrollbars=0"); 
} 
</script>

<!-- 일시 후원 결제 폼 -->
<form name="order_info" id="order_info" action="./kcp/shop/order.php" method="post" target="pay" onSubmit="return chkFrm();" enctype="multipart/form-data" style="margin:0;">
<input type="hidden" name="m" value="<?=$argu["m"]?>" />
<input type="hidden" name="s" value="<?=$argu["s"]?>" />

<input type="hidden" name="mode" value="INPUT" />
<input type="hidden" name="si_nos" value="<?=$_si_nos?>">
<input type="hidden" name="si_names" value="<?=$_si_names?>">
<input type="hidden" name="str_names" value="<?=$_str_names?>">
<input type="hidden" name="si_nums" value="<?=$_si_nums?>">

<input type="hidden" name="ordr_idxx" value="<?=$_ordr_idxx?>" />

<input type="hidden" name="good_name" value="일시후원" />
<input type="hidden" name="good_mny" value="<?=$_good_mny?>" />

<table cellpadding="0" cellspacing="0" border="0" class="sub03_table">
  <tr>
    <td class="sub_title">결제하기</td>
  </tr>
  <tr>
    <td class="sub_c" style="padding-bottom:30px;" valign="top"><table cellpadding="0" cellspacing="0" border="0" style="width:731px;">
        <tr>
          <td style="padding-bottom:13px;"><img src="img/sub03/title1.png" />
</td>
        </tr>
        <tr>
          <td><table cellpadding="0" cellspacing="0" border="0" class="tel1">
              <tr>
                <td style="font-size:12px; color:#494949; font-weight:bold; text-align:center; background:#f0f0f0; border-bottom:1px solid #dedede; border-top:2px solid #454545; width:90px; height:30px;">결제방법</td>
                <td style="font-size:12px; color:#676767; padding-left:20px; border-bottom:1px solid #dedede; border-top:2px solid #454545; width:621px; height:30px;">
					<ul>
<?
	foreach($_PAYMENT_CODE['nmethod'] as $key => $value){
?>
                    <li class="fl">
                      <input type="radio" name="pay_method" value="<?=$key?>" <?if($key==$argu["pay_method"]){?>checked<?}?> onclick="pay_method_form('one_form.php', '<?=$key?>', '<?=$value?>');" />
                    </li>
                    <li class="fl" style="padding:5px 15px 0 5px;"><?=$value?></li>
<?
	}
?>
                  </ul>
				</td>
              </tr>
              <tr>
                <td style="font-size:12px; color:#494949; font-weight:bold; text-align:center; background:#f0f0f0; border-bottom:1px solid #dedede; width:90px; height:30px;">후원금액</td>
                <td style="font-size:12px; color:#676767; padding-left:20px; border-bottom:1px solid #dedede; width:621px; height:30px;"><?=number_format($_good_mny)?>원</td>
              </tr>
              <tr>
                <td style="font-size:12px; color:#494949; font-weight:bold; text-align:center; background:#f0f0f0; border-bottom:1px solid #dedede; width:90px; height:30px;">후원내역</td>
                <td style="font-size:12px; color:#676767; padding-left:20px; border-bottom:1px solid #dedede; width:621px; height:30px;"><?=$_str_names?></td>
              </tr>
              <tr>
                <td style="font-size:12px; color:#494949; font-weight:bold; text-align:center; background:#f0f0f0; border-bottom:2px solid #454545; width:90px; height:120px;" id="pay_type"></td>
                <td style="font-size:12px; color:#676767; padding-left:20px; border-bottom:2px solid #454545; width:621px; height:30px;" id="pay_method"></td>
              </tr>
            </table>
            
            
            <!-- // tel3 ( 휴대전화 ) --></td>
        </tr>
        <tr>
          <td style="padding:60px 0 13px 0;"><img src="img/sub03/title2.png" /> <span class="fr">
            <ul>
              <li class="fl">
                <input type="checkbox" id="same_data" onclick="shop_same_data();"/>
              </li>
              <li class="fl" style="padding-top:4px; font-size:12px; color:#494949; padding-left:5px;">결제정보와 동일</li>
            </ul>
            </span></td>
        </tr>
        <tr>
          <td><table cellpadding="0" cellspacing="0" border="0" style="width:731px;">
              <tr>
                <td style="width:90px; height:30px; background:#f0f0f0; text-align:center; font-size:12px; color:#494949; font-weight:bold; border-bottom:1px solid #dedede; border-top:2px solid #454545;">성명</td>
                <td style="width:621px; padding-left:20px; height:30px; font-size:12px; color:#494949; border-bottom:1px solid #dedede; border-top:2px solid #454545;">
				<input type="text" style="height:18px; width:150px; border:1px solid #cacaca;" name="so_give_name" maxlength='20' class="{label:'성명',required:true}"/></td>
              </tr>
              <tr>
                <td style="width:90px; height:30px; background:#f0f0f0; text-align:center; font-size:12px; color:#494949; font-weight:bold; border-bottom:1px solid #dedede;">주민번호</td>
                <td style="width:621px; padding-left:20px; height:30px; font-size:12px; color:#494949; border-bottom:1px solid #dedede;">
					<input type="text" style="height:18px; width:100px; border:1px solid #cacaca;ime-mode:disabled;" name="so_give_person1" maxlength='6' class="{label:'주민번호',required:true}" onkeypress="numberOnly()"/>
                  -
                  <input type="password" style="height:18px; width:100px; border:1px solid #cacaca;ime-mode:disabled;" name="so_give_person2" maxlength='7' class="{label:'주민번호',required:true}" onkeypress="numberOnly()"/>
                  <span style="color:#a0a0a0; font-size:12px; padding-left:10px;">(외국인의 경우 외국인 등록번호를 입력)</span></td>
              </tr>
              <tr>
                <td style="width:90px; height:30px; background:#f0f0f0; text-align:center; font-size:12px; color:#494949; font-weight:bold; border-bottom:1px solid #dedede;">연락처</td>
                <td style="width:621px; padding-left:20px; height:30px; font-size:12px; color:#494949; border-bottom:1px solid #dedede;">
				<select style="width:60px; height:20px; border:1px solid #cacaca;" name="so_give_tel1" class="{label:'연락처',required:true}">
					<option value="">선택</option>
					<?foreach($_FL_CODE[5][1] as $key => $value){?>
					<option value="<?=$value?>"<?if($argu['so_give_tel1']==$value){?> selected<?}?>><?=$value?></option>
					<?}?>
                  </select>
                  -
                  <input type="text" style="height:18px; width:100px; border:1px solid #cacaca;ime-mode:disabled;" name="so_give_tel2" maxlength='4' class="{label:'연락처',required:true}" onkeypress="numberOnly()" value="<?=$argu['so_give_tel2']?>"/>
                  -
                  <input type="text" style="height:18px; width:100px; border:1px solid #cacaca;ime-mode:disabled;" name="so_give_tel3" maxlength='4' class="{label:'연락처',required:true}" onkeypress="numberOnly()" value="<?=$argu['so_give_tel3']?>"/></td>
              </tr>
              <tr>
                <td style="width:90px; height:30px; background:#f0f0f0; text-align:center; font-size:12px; color:#494949; font-weight:bold; border-bottom:1px solid #dedede;">이메일</td>
                <td style="width:621px; padding-left:20px; height:30px; font-size:12px; color:#494949; border-bottom:1px solid #dedede;">
				<input type="text" style="height:18px; width:150px; border:1px solid #cacaca;ime-mode:disabled;" name="so_give_email1" class="{label:'이메일',required:true}" value="<?=$argu['so_give_email1']?>"/>
                  @
                  <input type="text" style="height:18px; width:150px; border:1px solid #cacaca;ime-mode:disabled;" name="so_give_email2" id="so_give_email2" readonly class="{label:'이메일',required:true}" value="<?=$argu['so_give_email2']?>"/>
                  <select style="width:100px; height:20px; border:1px solid #cacaca; margin-left:5px;" name="so_give_email3" onchange="selectEmail(this.value, '#so_give_email2');">
                    <option value="">선택하세요</option>
				<?foreach($_FL_CODE[4] as $key => $value){?>
					<option value="<?=$value?>"<?if($value==$argu['so_give_email3']){?> selected<?}?>><?=$value?></option>
				<?}?>
                  </select></td>
              </tr>
              <tr>
                <td style="width:90px; height:60px; background:#f0f0f0; text-align:center; font-size:12px; color:#494949; font-weight:bold; border-bottom:2px solid #454545;" rowspan="3">주소</td>
                <td style="width:621px; padding-left:20px; height:30px; font-size:12px; color:#494949; border-bottom:1px solid #dedede;"><ul>
                    <li class="fl" style="line-height:20px;">
                      <input type="text" style="width:100px; height:18px; border:1px solid #cacaca;" name="so_give_zip" readonly onclick="zipcode('order_info', 'so_give_zip', 'so_give_add1', 'so_give_add2');" class="{label:'우편번호',required:true}" value="<?=$argu['so_give_zip']?>"/>
                    </li>
                    <li class="fl" style="padding-left:5px; line-height:20px; padding-top:2px;"><img src="img/sub03/woo.png" class="cp" onclick="zipcode('order_info', 'so_give_zip', 'so_give_add1', 'so_give_add2');"/></li>
					<li>
<?
	foreach($_FL_CODE[7] as $key => $value){
		$_checked = ($key==$argu["so_give_local"]) ? " checked" : "";
?>
                    <li class="fl">
                      <input type="radio" name="so_give_local" value="<?=$key?>" <?=$_checked?> class="{label:'주소지',groupcheck:true}" />
                    </li>
                    <li class="fl" style="padding:5px 15px 0 5px;"><?=$value?></li>
<?
	}
?>
                  </ul></td>
              </tr>
              <tr>
                <td style="width:621px; padding-left:20px; height:30px; font-size:12px; color:#494949; border-bottom:1px solid #dedede;">
				<input type="text" style="height:18px; width:600px; border:1px solid #cacaca;" name="so_give_add1" style="width:345px;" readonly class="{label:'주소',required:true}" value="<?=$argu['so_give_add1']?>"/></td>
              </tr>
              <tr>
                <td style="width:621px; padding-left:20px; height:30px; font-size:12px; color:#494949; border-bottom:2px solid #454545;">
				<input type="text" style="height:18px; width:600px; border:1px solid #cacaca;" name="so_give_add2" style="width:345px;" class="{label:'상세주소',required:true}" value="<?=$argu['so_give_add2']?>"/></td>
              </tr>
            </table>
            
            <!-- // 후원자정보 --></td>
        </tr>
        <tr>
          <td height="80" align="center">
		  <span style="padding-right:7px;">
			<input type="image" src="img/sub03/bt.png" style="<?if(!$_SESSION['user_id']){?>display:none;<?}?>"/>
		  </span>
		  <span style="padding-left:7px;">
			<a href="support.php?mode=CANCEL"><img src="img/sub03/cancell.jpg" /></a>
		  </span>
		  
		  </td>
        </tr>
      </table></td>
  </tr>
</table>
</form>
<script>pay_method_form('one_form.php', '<?=$argu["pay_method"]?>', '<?=$_PAYMENT_CODE["nmethod"][$argu["pay_method"]]?>');</script>
<iframe name="pay" id="pay" width="0" height="0"></iframe>