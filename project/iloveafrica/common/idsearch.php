<?
	include "./common.php";
	include "../include/mail/user_find.php";


	$_row = $obj_User->get_id_search($argu);

	if(count($_row) > 0){

		$_mail_body = str_replace("{{USER_ID}}",$_row["user_id"],$_mail_body);
		$_mail_body = str_replace("{{USER_NAME}}",$_row["user_name"],$_mail_body);
		$_mail_body = str_replace("{{USER_MAIL}}",$_row["user_email"],$_mail_body);

		$_mail_title = str_replace("{{USER_NAME}}",$_row["user_name"],$_mail_title);

		//메일 발송
		mailer(_MASTER_NAME, _MASTER_EMAIL, $_row['user_email'], $_mail_title, $_mail_body, 1);

		$msg = "id=".$_row["user_id"]."&name=".$_row["user_name"];
	}
	else{
		$msg = "false";
	}

	echo $msg;
?>