<?
	require_once("./common.php");

//	define("_MENU","sub01");
//	define("_SUB","0");
//	define("_NUM","1");

	// 사용자가 이미 로그인한 상태이면 먼저 로그아웃한다.
	if($obj_User->check_login($user_info)){ // 이미 로그인 되어있는 상태일때
		go_url("","이미 로그인한 상태입니다.");
		exit;
	}

	if( preg_match("/login.php/",$argu['return_url'])  ){
		$argu['return_url'] = "";
	}

	if($argu['mode'] == "LOGIN_ACTION"){
		$user_info = $obj_User->get_status();

		// 사용자가 이미 로그인한 상태이면 먼저 로그아웃한다.
		if($obj_User->check_login($user_info)){ // 이미 로그인 되어있는 상태일때
			go_url("/logout.php","이미 로그인한 상태입니다.\\n로그아웃을 합니다.");
			exit;
		}else{ // 로그인 되어있지 않을 상태일때 로그인 정보가 정확한지 확인한다.
			$data = $obj_User->check_login_info($argu);
			if($_SERVER["HTTP_REFERER"] == "") $_SERVER["HTTP_REFERER"] = "./index.php"; // 되돌아갈 페이지가 아무것도 없을것을 방지하기 위함이다.

			if(count($data) == 0){ // 정보가 일치하지 않아 로그인에 실패하였을경우
				go_url("","정보가 일치하지 않습니다.\\n아이디와 비밀번호를 다시 확인하세요.");
				exit;
			}else{ // 로그인 정보가 일치할경우
				if(
					($data['user_level'] > $obj_User->user_basic_level)
					||
					($data['user_withdrawal'] == "Y")
					||
					($data['user_level'] == $obj_User->user_login_level)
				){ // 로그인 정보는 일치하나 권한이 부족한 경우
					go_url("","접근 권한이 없습니다.\\n관리자에게 문의하세요.");
					exit;
				}else{ // 로그인 정보도 일치하고 권한도 있는경우
					$obj_User->set_login_session($data);
					
					$obj_User->set_login_update($data);

					go_url(($argu['return_url'] !== null)? $argu['return_url']: $_SERVER["HTTP_REFERER"]); // return_url 이 존재하면 return_url, 그렇지 않으면 referer 페이지로 이동
					exit;
				}
			}
		}
	}
?>