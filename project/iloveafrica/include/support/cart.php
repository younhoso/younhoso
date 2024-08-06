<?
	for($i=0;$i<count($argu["si_no"]);$i++){
		$si_no = $argu["si_no"];
		echo $si_no[$i]."<br>";
	}
//	switch($argu['mode']){
//		case "INSERT":
//			if($Obj_shop -> set_cart_insert($argu)){
//				go_url("support.php?mode=ORDER","");
//				exit;
//			}
//			break;
//		case "DELETE":
//			$Obj_shop -> set_cart_delete($argu);
//			break;
//	}

?>