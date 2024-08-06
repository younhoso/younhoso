<?
	/*****
	 * 로그아웃
	 *
	 *****/

	### 공통 사용파일을 포함시킨다.
	require_once $_SERVER['DOCUMENT_ROOT']."/common/common.php";

	header("Content-Type: text/html; charset="._CHARSET);

	$_SESSION = array();

/*
	session_unset();
	// 장바구니를 남기기 위해 다음 두 줄을 주석처리 하였다.
	setcookie( session_name() ,"",0,"/");
	unset($_COOKIE[session_name()]);
	session_destroy();
*/

	go_url("/","로그아웃하였습니다.");

	### DB disconnect
	$DB_->disconnect();
	unset($DB_);
?>