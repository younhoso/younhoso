<?
	/// 결제 내역 기록
	$argu['res_msg'] = "무통장 입금(입금 확인 시 결제 완료로 변경요망)";
	$argu['status'] = '3';
	$argu["buyr_name"]=$argu['ol_give_name'];
	$argu["buyr_mail"]=$argu['ol_give_email1']."@".$argu['ol_give_email2'];
	$argu["buyr_tel1"]=$argu['ol_give_tel11']."-".$argu['ol_give_tel12']."-".$argu['ol_give_tel13'];
	$argu["buyr_tel2"]=$argu['ol_give_tel11']."-".$argu['ol_give_tel12']."-".$argu['ol_give_tel13'];

	$argu["ol_give_email"]=$argu["buyr_mail"];

	$Obj_payment -> set_one_insert($argu);

	// 후원내역 기록
	$Obj_onespon -> set_insert($argu);

	// 메일링 리스트 등록
	if($argu["ol_give_email1"] != "" && $argu["ol_give_email2"] != ""){
		$argu["wm_email"] = $argu["ol_give_email"];
		$argu["wm_name"] = $argu["ol_give_name"];
		$argu["wm_tel"] = $argu["ol_give_tel11"]."-".$argu["ol_give_tel12"]."-".$argu["ol_give_tel13"];
		$Obj_webzine->set_maillist_insert($argu);
	}

	// 결과 메일 발송
	$_mail_user_id = ($_SESSION["user_id"]) ? $_SESSION["user_id"] : $_SESSION["guest_id"];
	$_mail_good_mny = ($argu['good_mny']=='etc') ? $argu['good_mny1'] : $argu['good_mny'];
	$_mail_addr = $argu["ol_give_email"];
	$_mail_method = ($argu['give_type']==1 || $argu['give_type']=="re") ? $_PAYMENT_CODE["nmethod"][$argu["pay_method"]] : $_PAYMENT_CODE["hmethod"][$argu["pay_method"]];
	$_mail_pay_info = "결제방법 : ".$_mail_method."<br />";
	
	$_mail_pay_info .= "입금은행 : ".$_DEPOSIT_CODE[$argu['bank_code']]["bank"]."<br />계좌번호 : ".$_DEPOSIT_CODE[$argu['bank_code']]["no"]."<br />예금주 : ".$_DEPOSIT_CODE[$argu['bank_code']]["owner"]."<br />입금자명 : ".$argu['bank_name']."<br />입금예정일 : ".$argu['deposit_date'];

	// 메일 변수처리
	$_mail_body = str_replace("{{GOOD_NAME}}",$argu['good_name'],$_mail_body);
	$_mail_body = str_replace("{{GIVE_NAME}}",$argu["ol_give_name"],$_mail_body);
	$_mail_body = str_replace("{{GOOD_MONEY}}",number_format($_mail_good_mny),$_mail_body);
	$_mail_body = str_replace("{{PAY_INFO}}",$_mail_pay_info,$_mail_body);

	$_mail_title = str_replace("{{USER_NAME}}",$argu["ol_give_name"],$_mail_title);

	//메일 발송
	mailer(_MASTER_NAME, _MASTER_EMAIL, $_mail_addr, $_mail_title, $_mail_body, 1);

?>

<table width="658" border="0" cellpadding="0" cellspacing="0" style="margin:0px auto;">
	<tr>
    <td height="30"></td>
    </tr>
	<tr>
		<td><img src="./img/m02/s02/done_title.png" ></td>
	</tr>
	<tr>
		<td width="658" height="32"></td>
	</tr>
	<tr>
		<td><img src="./img/m02/s02/done_subtitle.png" ></td>
	</tr>
	<tr>
		<td width="658" style="background:#f0f0f0;">
        <table cellpadding="0" cellspacing="0" border="0" style="width:640px; margin:0px auto;">
  <tr>
    <td style="color:#494949; font-weight:bold; width:219px; text-align:center; height:31px;">후원종류</td>
    <td style="color:#494949; font-weight:bold; width:219px; text-align:center; height:31px;">결제방법</td>
    <td style="color:#494949; font-weight:bold; width:220px; text-align:center; height:31px;">후원금액</td>
  </tr>
  <tr>
    <td style="background:#c4c4c4;color:#494949; width:219px; text-align:center; height:32px;"><?=$argu['good_name']?></td>
    <td style="background:#c4c4c4;color:#494949; width:219px; text-align:center; height:32px;"><?=$_PAYMENT_CODE['hmethod'][$argu['pay_method']]?></td>
    <td style="background:#c4c4c4;color:#494949; width:220px; text-align:center; height:32px;"><?=number_format($argu['good_mny'])?>원</td>
  </tr>
</table>

        </td>
	</tr>
	<tr>
		<td width="658" style="background:#f0f0f0;">
        <table cellpadding="0" cellspacing="0" border="0" style="width:640px; margin:0px auto;">
  <tr>
    <td style="color:#494949; font-weight:bold; text-align:center; height:31px;">결제 계좌안내</td>
  </tr>
  <tr>
    <td style="background:#c4c4c4;color:#494949; text-align:center; height:32px;">
	<?foreach($_DEPOSIT_CODE[$argu['bank_code']] as $key => $value){?>
	<?=$value?>
	<?}?>
	(입금 기한일 : <?=$argu['deposit_date']?> / 입금자명 : <?=$argu['bank_name']?>)
	</td>
  </tr>
</table>

        </td>
	</tr>
	<tr>
		<td bgcolor="#f0f0f0" width="658"  align="center"><a href="/"><img src="./img/m02/s02/done_btn_ok.png"></a> <a href="index.php?m=m10&s=s01_01_01"><img src="./img/m02/s02/done_btn_mypage.png" ></a></td>
	</tr>
	<tr>
		<td><img src="./img/m02/s02/done_msg.png"></td>
	</tr>
	<tr>
		<td width="658" height="32"></td>
	</tr>
	<tr>
		<td><img src="./img/m02/s02/done_txt.png"></td>
	</tr>
    	<tr>
    <td height="30"></td>
    </tr>
</table>
