<?
	include "./common.php";
	include "../include/mail/user_pw.php";

	$_row = $obj_User->get_id_search($argu);

	if(count($_row) > 0){
		
		$_temp_pwd = zm_RandString(6, array(1,2));
		$pwd1=substr(md5($_temp_pwd),0,20);
		$pwd2=substr(md5($_temp_pwd),-20);
		$pwd=$pwd1.$pwd2;
		$data =  array(
			"user_pwd" => $pwd
		);
		$result = $obj_User->DB->autoExecute(TABLE_USER, $data, DB_AUTOQUERY_UPDATE, "user_id = '{$argu['user_id']}' ");

		if (DB::isError($result)) {
			debug($this->DB);
			die($result->getMessage());
		}
		
		$_mail_title = str_replace("{{USER_NAME}}", $_row["user_name"],$_mail_title);

		$_mail_body = str_replace("{{USER_ID}}",$_row["user_id"],$_mail_body);
		$_mail_body = str_replace("{{USER_NAME}}",$_row["user_name"],$_mail_body);
		$_mail_body = str_replace("{{USER_PWD}}",$_temp_pwd,$_mail_body);
		
		mailer(_MASTER_NAME, _MASTER_EMAIL, $_row['user_email'], $_mail_title, $_mail_body, 1);

		//$msg = "<span style=\"font-weight:bold;\">등록된 이메일 :</span><span style=\"color:#1157ad; font-weight:bold;\">".substr($_row["user_email"],0,3)."****@******</span><br>임시비밀번호를 발송하였습니다. <br> 로그인후 비밀번호를 변경해 주세요!";
		$msg = "email=".$_row["user_email"]."&name=".$_row["user_name"];
	}
	else{
		//$msg = "<span style=\"color:#1157ad; font-weight:bold;\">".$argu["user_name"]." 회원님</span>께서 입력하신 이메일 주소는<br>가입 당시에 입력하신 이메일 정보와 다릅니다.<br>다시 입력하시거나<br>콜센터로 문의하여 주세요.<br>";
		$msg = "false";
	}

	echo $msg;

?>
