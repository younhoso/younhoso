<?
	include "../common/common.php";
	
	$idchk=$obj_User->check_dupleid($argu["user_id"]);
	echo $idchk["code"];
?>