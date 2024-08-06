<?
        include "../common/common.php";

        if($argu["user_email1"] != ""){
                $dataRS=$obj_News->set_user_insert($argu);
                if($dataRS> 0){
                        echo "true";
                        exit;
                }
        }else{
                echo "false";
                exit;
        }
?>

