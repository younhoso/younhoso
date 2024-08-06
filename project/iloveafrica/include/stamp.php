<?
	include "../common/common.php";

	$c_date = $argu["c_date"];

	if($c_date > date("Y-m-d")){
		echo "A";
		exit;
	}
	else if($c_date < date("Y-m-d")){
		echo "B";
		exit;
	}
	else{
		$_row = $Obj_attendance -> get_att_view($user_info["user_id"],$c_date);

		if($_row["a_no"]){
			echo "C";
			exit;
		}
		else{
			$argu["user_id"] = $user_info["user_id"];
			$argu["date"] = $c_date;
			if($Obj_attendance->set_att_insert($argu)){
				echo "true";
				exit;
			}
		}
	}
?>