<?
	include "../common/common.php";
	include "./mail/user_join.php";

	if($argu["user_type"] == "3"){
		$argu["user_company"] = $argu["user_name"];
	}

	if($argu["user_type"] == "2"){
		$argu["parent_email"] = $argu["parent_email1"]."@".$argu["parent_email2"];
	}

	if($argu["user_type"] =="4"){
		$argu["user_company"] = $argu["user_name"];
	}

	$argu["user_email"] = $argu["user_email1"]."@".$argu["user_email2"];

	switch($argu["mode"]){
		case "ID_CHECK":
			$idchk=$obj_User->check_dupleid($argu["user_id"]);
			echo $idchk["code"];
			break;
		case "JOIN":
			$idchk=$obj_User->set_user_insert($argu);
			if($argu["user_emaillist"] == "Y"){
				if($argu["user_email1"] != "" && $argu["user_email2"] != ""){
					$argu["wm_email"] = $argu["user_email1"]."@".$argu["user_email2"];
					$argu["user_id"] = $argu["user_id"];
					$argu["wm_name"] = $argu["user_name"];
					$argu["wm_tel1"] = $argu["user_hp1"];
					$argu["wm_tel2"] = $argu["user_hp2"];
					$argu["wm_tel3"] = $argu["user_hp3"];
					$Obj_webzine->set_maillist_insert($argu);
				}
			}

			// 메일 변수처리
			$argu['user_email'] = $argu["user_email1"]."@".$argu["user_email2"];
			$_mail_body = str_replace("{{USER_ID}}",$argu["user_id"],$_mail_body);
			$_mail_body = str_replace("{{USER_NAME}}",$argu["user_name"],$_mail_body);
			$_mail_body = str_replace("{{USER_MAIL}}",$argu['user_email'],$_mail_body);

			$_mail_title = str_replace("{{USER_NAME}}",$argu["user_name"],$_mail_title);

			//메일 발송
			mailer(_MASTER_NAME, _MASTER_EMAIL, $argu['user_email'], $_mail_title, $_mail_body, 1);

			echo "<form method='post' name='f' id='f' action='/common/login.php' style='margin:0'>";
			echo "<input type='hidden' name='mode' value='LOGIN_ACTION'>";
			echo "<input type='hidden' name='return_url' value='/index.php'>";
			echo "<input type='hidden' name='user_id'  value='".$argu["user_id"]."'/>";
			echo "<input type='hidden'  name='user_pwd' value='".$argu["user_pwd"]."' />";
			echo "</form>";
			echo "<script>document.f.submit();</script>";
			break;
		case "MODIFY":
			$argu["user_no"] = $user_info["user_no"];
			
			// 회원정보 불러오기
			$_row = $obj_User->get_user_view($argu["user_no"]);

			$argu["wm_email"] = $argu["user_email1"]."@".$argu["user_email2"];
			$argu["wm_name"] = $argu["user_name"];
			$argu["user_id"] = $user_info["user_id"];
			$argu["wm_tel1"] = $argu["user_hp1"];
			$argu["wm_tel2"] = $argu["user_hp2"];
			$argu["wm_tel3"] = $argu["user_hp3"];

			if($argu["user_emaillist"] == "Y"){
				$query = "select wm_no from ".TABLE_WEBZINE_MAILLIST." where user_id ='".$argu["user_id"]."' order by wm_no desc limit 0,1";

				$wm_no = $_DB->getOne($query);

				if($wm_no > 0){
					$argu['wm_no'] = $wm_no;
					$Obj_webzine->set_maillist_modify($argu);
				}else{
					$Obj_webzine->set_maillist_insert($argu);
				}
			}else{
				$query = "select wm_no from ".TABLE_WEBZINE_MAILLIST." where wm_email ='".$_row["user_email"]."' order by wm_no desc limit 0,1 ";

				$wm_no = $_DB->getOne($query);

				if($wm_no > 0){
					$argu['wm_no'] = $wm_no;
					$Obj_webzine->set_maillist_delete($argu);
				}
			}

			$obj_User->set_user_update($argu);
			
			go_url("/index.php","회원정보가 수정되었습니다.");
			break;
	}
?>