<?
	include "../../common/common.php";
	
	$si_no = $argu["si_no"];

	echo $argu["sa_price"];

	if($si_no){
		$_row = $data = $Obj_shop->get_item_view($si_no);
		$_price_arr = explode("|",$_row["si_price"]);
?>
              <tr id="price_<?=$si_no?>">
                <td style="width:228px; height:30px; font-size:12px; color:#494949; font-weight:bold; padding-left:20px; background:#f0f0f0; border-bottom:1px solid #dedede; ">
					<?=$_row["si_name"]?>
				</td>
                <td style="width:463px; height:30px; font-size:12px; color:#494949; padding-left:20px; border-bottom:1px solid #dedede; ">후원금
                  <select style="width:100px; height:20px; border:1px solid #dedede;" onchange="fix_good_mny(this.value,<?=$si_no?>);">
<?
		if(is_array($_price_arr)){
			foreach($_price_arr as $key => $value){
			//$_checked = ($value==$argu['good_mny']) ? " checked" : "";
			$_value = ($value=="etc") ? "직접입력" : number_format($value)."원";
?>                    
					<option value="<?=$value?>"><?=$_value?></option>
<?
			}
?>
                  </select>
                  <input type="text" name="totalMoney" id="good_mny<?=$si_no?>" value="<?=($_price_arr[0])?>" onkeyup="total_price();fix_good_mny_input(<?=$si_no?>);" style="width:100px; height:18px; border:1px solid #dedede;" disabled />
                  <strong>원</strong>
<?
			$argu["sc_no"] = $_row["sc_no"];
			$argu["scm_no"] = $_row["scm_no"];

			if(!$argu["sa_price"]){
				$argu["sa_price"] = $_price_arr[0];
			}

			switch($argu['mode']){
				case "INSERT":
					$Obj_shop -> set_cart_insert($argu);
					break;
				case "DELETE":
					$Obj_shop -> set_cart_delete($argu);
					break;
			}
		}	
?>				  
				  </td>
              </tr>
<?
	
	}
?>