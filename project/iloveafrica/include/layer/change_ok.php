<?
	
	// 취소 내역처리
	if(is_array($argu["chg_good_cancel"])){
		foreach($argu["chg_good_cancel"] as $key => $value){
			$Obj_payment -> set_fix_cancel($value);
		}
	}

	// 변경 내용 처리
	foreach((array) $argu["ordr_idxx"] as $key => $value){

		// 변경 내용이 있을 경우
		if($argu["chg_good_mny"][$key]>0){
			
			$chg_data=array(
				"good_mny" => $argu["chg_good_mny"][$key],
				"pay_memo" => "사용자 변경 신청",
				"pf_status" => "4",
				"pf_updated" => _NowTime
			);
			
			$res = $_DB->autoExecute(TABLE_PAYMENT_FIX, $chg_data, DB_AUTOQUERY_UPDATE, "ordr_idxx = '{$value}' ");
		}
	}

	// 회원정보 받기
	$_user_row = $obj_User -> get_user_view($user_info['user_no']);

	// 최근 결제 정보 받기
	$_last_ordr_idxx = $argu["ordr_idxx"][0];
	if($_last_ordr_idxx){
		$_pay_info = $Obj_payment -> get_fix_view($_last_ordr_idxx);
	}

	// 추가 내용 처리
	foreach($argu["add_good_mny"] as $key => $value){
		
		// 추가내역이 있다면
		if($value>0){

			if($_last_ordr_idxx){

				// 주문번호 받기
				$_ordr_idxx = $Obj_fixed -> set_order_idx();

				// 신청리스트
				$fix_data = array(
					"ordr_idxx" => $_ordr_idxx,
					"f_no" => $argu["add_f_no"][$key],
					"f_title" => $argu["add_f_title"][$key],
					"user_id" => $user_info["user_id"],
					"fl_give_name" => $_user_row['user_name'],
					"fl_give_person" => $_user_row['user_person'],
					"fl_give_tel" => $_user_row['user_hp'],
					"fl_give_email" => $_user_row['user_email'],
					"fl_give_zip" => $_user_row['user_zip'],
					"fl_give_add1" => $_user_row['user_add1'],
					"fl_give_add2" => $_user_row['user_add2'],
					"fl_give_reason" => "7",
					"fl_regdate" => _NowTime
				);

				$res = $_DB->autoExecute(TABLE_FIXED_LIST, $fix_data, DB_AUTOQUERY_INSERT);
				if (DB::isError($res)) {
					echo $res->getMessage();
				}

				// 결제정보
				$pay_data = array(
					"ordr_idxx" => $_ordr_idxx,
					"good_idx" => $argu["add_f_no"][$key],
					"user_id" => $user_info["user_id"],
					"good_name" => "[사업후원] ".$argu["add_f_title"][$key],
					"pay_method" => $_pay_info['pay_method'],
					"buyr_name" => $_user_row['user_name'],
					"pay_date" => $_pay_info['pay_date'],
					"good_mny" => $value,
					"start_date" => date("Ymd"),
					"end_date" => "99991231",
					"buyr_tel" => $_user_row['user_hp'],
					"sms_agree" => $_pay_info['sms_agree'],
					"bank_cd" => $_pay_info['bank_cd'],
					"pay_num" => $_pay_info['pay_num'],
					"pay_name" => $_pay_info['pay_name'],
					"pay_person" => $_pay_info['pay_person'],
					"pay_zip" => $_user_row['user_zip'],
					"pay_add1" => $_user_row['user_add1'],
					"pay_add2" => $_user_row['user_add2'],
					"pay_memo" => "사용자 추가 신청",
					"taxbill" => $_pay_info['taxbill'],
					"taxbill_info" => $_pay_info['taxbill_info'],
					"pf_status" => "2",
					"pf_regdate" => _NowTime
				);

				$res = $_DB->autoExecute(TABLE_PAYMENT_FIX, $pay_data, DB_AUTOQUERY_INSERT);
				if (DB::isError($res)) {
					echo $res->getMessage();
				}
			}else{
				go_url("index.php?m=m02&s=s01_01_01", "진행중인 후원내역이 존재하지 않습니다.\\n정기후원 페이지로 이동 됩니다.");
			}
		}
	}

	go_url("sub10_02_01_01_01.php","변경 신청이 완료되었습니다.");
?>