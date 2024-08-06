<?include "../../common/common.php"?>
<?
	// 사용자 정보 받기
	$_user_info = $obj_User->get_user_view($user_info['user_no']);

	if(strlen($_user_info['user_email'])>5){
		
		$_title = ($argu['mail_type']==1) ? "후원자님께서 요청하신 후원금 영수증입니다." : "후원자님께서 요청하신 봉사활동 증명서입니다.";
		
		/// 메일 보내기
		if(mailer(_MASTER_NAME, _MASTER_EMAIL, $_user_info['user_email'], $_title, $argu['msg'], 1)){
			echo "true";
		}else{
			echo "false";
		}

	}else{
		echo "F";
	}
?>