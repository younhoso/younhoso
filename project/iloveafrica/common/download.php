<?php
	include $_SERVER["DOCUMENT_ROOT"]."/common/common.php";

	if(empty($argu['fullpath'])){
		go_url("","정상적인 접근이 아닙니다.");
	}

	@download(_PDS.$argu['fullpath'],$argu['filename']);

	### disconnect
	//$_DB->disconnect();

	### unset
	unset($_DB);
	unset($_TPL);
?>