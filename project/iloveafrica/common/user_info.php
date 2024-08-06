<?
	include "./common.php";
	
	$idchk=$obj_User->check_dupleid($argu["tmp_id"]);
	echo $idchk["code"];
?>