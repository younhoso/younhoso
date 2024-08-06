<?
	class Payment {

		var $DB;
		var $total = 0;
		var $_LIST_NUM=20;
		var $_PDS;
		var $_user_id;

		# 생성자
		function Payment($db){
			$this->DB = $db;
			$this->_PDS = _PDS."excel/";
			$this->_user_id = ($_SESSION["user_id"]) ? $_SESSION["user_id"] : $_SESSION["guest_id"];
		}

		
##################################################
#		정기 후원 관련
#################################################

		/*****
		 * 정기후원 신청을 등록한다.
		 *****/
		function set_fix_insert($argu){

			global $_adminpage;
			
			// 아이디
			$argu["user_id"] = ($_adminpage) ? $argu["user_id"] : $this->_user_id;
			
			// 휴대폰 결제 번호
			if($argu["pay_method"]=="MOB"){ $argu["pay_num"]=$argu["pay_num1"].$argu["pay_num2"].$argu["pay_num3"]; }
			
			// 주문자 연락처
			$argu["buyr_tel"]=$argu["buyr_tel1"]."-".$argu["buyr_tel2"]."-".$argu["buyr_tel3"];
			
			// 결제 주민번호
			$argu["pay_person"]=$argu["pay_person1"].$argu["pay_person2"];

			// 주민 등록 번호 및 결제정보 암호화
			$cipher = new zm_Cipher;
			$argu["pay_person"] = $cipher -> encrypt($argu["pay_person"]);
			$argu["pay_num"] = $cipher -> encrypt($argu["pay_num"]);
			$argu["taxbill_info"] = $cipher -> encrypt($argu["taxbill_info"]);
			$cipher = new zm_Cipher_Close;
			
			$data = array(
				"ordr_idxx"         => $argu["ordr_idxx"],
				"good_idx"         => $argu["good_idx"],
				"user_id"         => $argu["user_id"],
				"good_name"         => $argu["good_name"],
				"pay_method"         => $argu["pay_method"],
				"buyr_name"         => $argu["buyr_name"],
				"pay_date"         => $argu["pay_date"],
				"good_mny"         => $argu["good_mny"],
				"start_date"         => ($argu["start_date"]) ? $argu["start_date"] : date("Ymd"),
				"end_date"         => ($argu["end_date"]) ? $argu["end_date"] : "99991231",
				"buyr_tel"         => $argu["buyr_tel"],
				"sms_agree"         => $argu["sms_agree"],
				"bank_cd"         => $argu["bank_cd"],
				"pay_num"      => $argu["pay_num"],
				"pay_name"      => $argu["pay_name"],
				"pay_person"      => $argu["pay_person"],
				"pay_zip"      => $argu["pay_zip"],
				"pay_add1"      => $argu["pay_add1"],
				"pay_add2"      => $argu["pay_add2"],
				"pay_memo"      => $argu["pay_memo"],
				"taxbill"      => $argu["taxbill"],
				"taxbill_info"      => $argu["taxbill_info"],
				"pf_status"      => $argu["pf_status"],
				"pf_regdate"          => _NowTime
			);

			$sth = $this->DB->autoPrepare(TABLE_PAYMENT_FIX, array_keys($data), DB_AUTOQUERY_INSERT);
			$res = $this->DB->execute($sth, array_values($data));

			if (DB::isError($res)) {
				go_url("","등록 오류 입니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return $argu['return_url'];
		}

		/*****
		 * 정기 후원신청 내역을 Update 한다.
		 *****/
		function set_fix_update($argu){
			 
			global $_adminpage;
			
			// 휴대폰 결제 번호
			if($argu["pay_method"]=="MOB"){ $argu["pay_num"]=$argu["pay_num1"].$argu["pay_num2"].$argu["pay_num3"]; }
			
			// 주문자 연락처
			$argu["buyr_tel"]=$argu["buyr_tel1"]."-".$argu["buyr_tel2"]."-".$argu["buyr_tel3"];
			
			// 결제 주민번호
			$argu["pay_person"]=$argu["pay_person1"].$argu["pay_person2"];

			// 주민 등록 번호 및 결제정보 암호화
			$cipher = new zm_Cipher;
			$argu["pay_person"] = $cipher -> encrypt($argu["pay_person"]);
			$argu["pay_num"] = $cipher -> encrypt($argu["pay_num"]);
			$argu["taxbill_info"] = $cipher -> encrypt($argu["taxbill_info"]);
			$cipher = new zm_Cipher_Close;
			
			$data = array(
				"pay_method"         => $argu["pay_method"],
				"buyr_name"         => $argu["buyr_name"],
				"pay_date"         => $argu["pay_date"],
				"good_mny"         => $argu["good_mny"],
				"start_date"         => ($argu["start_date"]) ? $argu["start_date"] : date("Ymd"),
				"end_date"         => ($argu["end_date"]) ? $argu["end_date"] : "99991231",
				"buyr_tel"         => $argu["buyr_tel"],
				"sms_agree"         => $argu["sms_agree"],
				"bank_cd"         => $argu["bank_cd"],
				"pay_num"      => $argu["pay_num"],
				"pay_name"      => $argu["pay_name"],
				"pay_person"      => $argu["pay_person"],
				"pay_zip"      => $argu["pay_zip"],
				"pay_add1"      => $argu["pay_add1"],
				"pay_add2"      => $argu["pay_add2"],
				"pay_memo"      => $argu["pay_memo"],
				"taxbill"      => $argu["taxbill"],
				"taxbill_info"      => $argu["taxbill_info"],
				"pf_status"      => $argu["pf_status"],
				"pf_updated"          => _NowTime
			);

			$res = $this->DB->autoExecute(TABLE_PAYMENT_FIX, $data, DB_AUTOQUERY_UPDATE, "ordr_idxx = '{$argu['ordr_idxx']}' ");

			if (DB::isError($res)) {
				go_url("","수정 오류 입니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return true;
		}

		/*****
		 * 정기 후원신청 내역을 cancel 한다.
		 *****/
		function set_fix_cancel($ordr_idxx){
			 
			global $_adminpage;
			
			$data = array(
				"pay_memo" => "사용자 취소",
				"pf_status"      => "3",
				"pf_cancel_date"          => _NowTime
			);

			$res = $this->DB->autoExecute(TABLE_PAYMENT_FIX, $data, DB_AUTOQUERY_UPDATE, "ordr_idxx = '{$ordr_idxx}' ");

			if (DB::isError($res)) {
				go_url("","취소 오류 입니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return true;
		}


		/*****
		 * 정기 후원신청 내역을 삭제 한다.
		 *****/
		function set_fix_delete($argu) {

			$query = "
				delete from ".TABLE_PAYMENT_FIX."
				where  ordr_idxx = '{$argu['ordr_idxx']}'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
				go_url("","삭제 오류 입니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return true;
		}

		/*****
		 * 정기 후원신청 리스트를 반환한다.
		 *****/
		function get_fix_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = " pf_status='{$argu['status']}' ";
			
			/// 기간 검색
			if($argu['date_start']){
				$argu['date_start'] = $argu['date_start']." 00:00:00";
				$addwhere .= " and {$argu['datetype']} >= '{$argu['date_start']}' ";
			}
			if($argu['date_end']){
				$argu['date_end'] = $argu['date_end']." 23:59:59";
				$addwhere .= " and {$argu['datetype']} <= '{$argu['date_end']}' ";
			}

			// 검색어
			if($argu['keyword']){
				$addwhere .= " and {$argu['s_type']} like '%{$argu['keyword']}%' ";
			}

			$query = "
				select
					count(*)
				from
					".TABLE_PAYMENT_FIX."
				where
					$addwhere
			";

			$res = $total = $this->DB->getOne($query);
			if (DB::isError($res)) {
				go_url("","목록을 불러오지 못했습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			if($argu['status']=='3'){
				$_orderby = "pf_cancel_date desc";
			}elseif($argu['status']=='4'){
				$_orderby = "pf_updated desc";
			}else{
				$_orderby = "pf_regdate desc";
			}

			$query = "
				select
					*
				from
					".TABLE_PAYMENT_FIX."
				where
					$addwhere
				order by
					$_orderby";
			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_LIST_NUM.",".$this->_LIST_NUM;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($res)) {
				go_url("","목록을 불러오지 못했습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return $list;
		}

		/*****
		* 정기후원 신청 내용을 불러온다.
		*****/
		function get_fix_view($ordr_idxx){
			$query = "
				select
					*
				from
					".TABLE_PAYMENT_FIX."
				where
					ordr_idxx = '{$ordr_idxx}'
				";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
				go_url("","내용을 불러오지 못했습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			$row = $res->fetchRow(DB_FETCHMODE_ASSOC);

			if(is_array($row)){
				/// 주민번호 및 결제정보 복호화
				$cipher = new zm_Cipher;
				$pay_num = $cipher -> decrypt($row["pay_num"]);
				$pay_person = $cipher -> decrypt($row["pay_person"]);
				$taxbill_info = $cipher -> decrypt($row["taxbill_info"]);
				$cipher = new zm_Cipher_Close;

				$pay_person1 = substr($pay_person, 0, 6);
				$pay_person2 = substr($pay_person, -7);

				$row = array_merge($row, array(
					"pay_person1"=>$pay_person1,
					"pay_person2"=>$pay_person2
				));

				if($row['pay_method']=='MOB'){
					$cardnum=split_hp($pay_num);

					$row = array_merge($row, array(
						"pay_num1"=>$cardnum[0],
						"pay_num2"=>$cardnum[1],
						"pay_num3"=>$cardnum[2]
					));
				}

				if($row['pay_method']=='CMS'){
					$row = array_merge($row, array(
						"pay_num"=>$pay_num
					));
				}

				$row = array_merge($row, array(
					"taxbill_info"=>$taxbill_info
				));
			}

			return $row;
		}

		/*****
		 * 정기 후원신청 엑셀용 날짜를 반환한다.
		 *****/
		function get_fix_excel_date($argu){
			
			/// 검색 쿼리
			$addwhere = " pf_status='1' ";

			$_curr_year = ($argu['curr_year']) ? $argu['curr_year'] : date("Y");
			$_curr_month = ($argu['curr_month']) ? $argu['curr_month'] : date("n");
			$_curr_date = $_curr_year."-".sprintf("%'02d",$_curr_month);

			$addwhere .= " and pf_regdate like '{$_curr_date}%' ";

			$query = "
				select
					DATE_FORMAT(`pf_regdate`,'%Y-%m-%d') as pf_date
				from
					".TABLE_PAYMENT_FIX."
				where
					$addwhere
				group by 
					pf_date
				order by 
					pf_date desc ";

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($res)) {
				go_url("","목록을 불러오지 못했습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return $list;
		}

		/*****
		 * 정기 후원신청 엑셀용 리스트를 반환한다.
		 *****/
		function get_fix_excel_list($argu){
			
			/// 검색 쿼리
			$addwhere = " pf_status='1' ";
			
			/// 기간 검색
			$argu['date_start'] = $argu['pf_date']." 00:00:00";
			$addwhere .= " and pf_regdate >= '{$argu['date_start']}' ";
			$argu['date_end'] = $argu['pf_date']." 23:59:59";
			$addwhere .= " and pf_regdate <= '{$argu['date_end']}' ";

			$query = "
				select
					*
				from
					".TABLE_PAYMENT_FIX."
				where
					$addwhere
				order by
					pf_regdate asc ";

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($res)) {
				go_url("","목록을 불러오지 못했습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return $list;
		}


		/*****
		 * 정기 후원 결제 엑셀 파일 업로드.
		 *****/
		function set_fix_xls_upload($argu) {

			/// 업로드 폴더 설정
			$_subpds = date("Ym");
			$this->_PDS .= $_subpds."/";

			$_ext = array_pop(explode(".",$_FILES["excel_file"]["name"]));
			$_filename = date("Y-m-d").".".$_ext;
			$_upload = $this->_PDS.$_filename;

			if(file_exists($_upload)){
				@unlink($_upload);
			}

			if(strtolower($_ext) != "xls"){
				go_url("","[{$_ext}] 잘못된 파일 형식입니다. xls 파일만 업로드 하세요.");
				exit;
			}

			if(upload($this->_PDS,$_FILES["excel_file"],$_filename,$tag = "U")){

				$arr_field = array(
					"pi_regdate",
					"deposit_date",
					"user_id",
					"buyr_name",
					"fix_mny",
					"res_msg",
					"status",
					"good_mny",
					"bank_code",
					"mobile_no",
					"card_no",
					"pd_staff",
					"pd_orderdate"
				);

				
				$xls_data = new Spreadsheet_Excel_Reader();
				$xls_data->read($_upload);

				$arrData=$xls_data->sheets[0]['cells'];
				$cntData=count($arrData)-1;

				$data = array();

				for($i=0;$i<$cntData;$i++){
					$arrNo=$i+2;

					$jCount = count($arrData[$arrNo])-1;
					
					for($j=0;$j<$jCount;$j++){
						$jNo=$j+2;

						$strData=trim($arrData[$arrNo][$jNo]);

						if($arr_field[$j]=='fix_mny'){ $strData = str_replace(",","",$strData); }
						if($arr_field[$j]=='good_mny'){ $strData = str_replace(",","",$strData); }

						$data[$arr_field[$j]] = $strData;
					}

					$data = array_merge($data, array(
						"pay_type" => "1",
						"good_name" => "정기후원",
						"pay_method" => $argu["pd_method"],
						"pd_uploaded" => _NowTime
					));
				
					
					$sth = $this->DB->autoPrepare(TABLE_PAYMENT_INFO, array_keys($data), DB_AUTOQUERY_INSERT);
					$res = $this->DB->execute($sth, array_values($data));
				}

				return true;
			}else{
				return false;
			}
		}

		/*****
		 * 정기 후원 결제 내역을 Update 한다.
		 *****/
		function set_fix_done_update($argu){
			 
			global $_adminpage;
			
			$data = array(
				"pi_memo"         => $argu["pd_etc"],
				"pi_upated"         => _NowTime
			);

			$res = $this->DB->autoExecute(TABLE_PAYMENT_INFO, $data, DB_AUTOQUERY_UPDATE, "pi_no = '{$argu['pi_no']}' ");

			if (DB::isError($res)) {
				go_url("","수정 오류 입니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return true;
		}


		/*****
		 * 정기 후원 결제 내역을 삭제 한다.
		 *****/
		function set_fix_done_delete($argu) {

			$query = "
				delete from ".TABLE_PAYMENT_INFO."
				where  pi_no = '{$argu['pi_no']}'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
				go_url("","삭제 오류 입니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return true;
		}

		/*****
		 * 정기 후원 결제 리스트를 반환한다.
		 *****/
		function get_fix_done_list($argu,&$total,$limit = true){

			global $_adminpage;
			
			$addwhere = " pay_type='1' ";

			/// 기간 검색
			if($argu['date_start']){
				$addwhere .= " and pi_regdate >= '{$argu['date_start']}' ";
			}
			if($argu['date_end']){
				$addwhere .= " and pi_regdate <= '{$argu['date_end']}' ";
			}

			// 검색어
			if($argu['keyword']){
				$addwhere .= " and {$argu['s_type']} like '%{$argu['keyword']}%' ";
			}

			$query = "
				select
					count(*)
				from
					".TABLE_PAYMENT_INFO."
				where
					$addwhere
			";

			$res = $total = $this->DB->getOne($query);
			if (DB::isError($res)) {
				go_url("","목록을 불러오지 못했습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			$query = "
				select
					*
				from
					".TABLE_PAYMENT_INFO."
				where
					$addwhere
				order by
					pi_regdate desc,
					pi_no desc
				";
			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_LIST_NUM.",".$this->_LIST_NUM;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($res)) {
				go_url("","목록을 불러오지 못했습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return $list;
		}

		/*****
		* 정기후원 결제 내용을 불러온다.
		*****/
		function get_fix_done_view($pi_no){
			$query = "
				select
					*
				from
					".TABLE_PAYMENT_INFO."
				where
					pi_no = '{$pi_no}'
				";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
				go_url("","내용을 불러오지 못했습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			$row = $res->fetchRow(DB_FETCHMODE_ASSOC);

			return $row;
		}


##################################################
#		일시 후원 관련
#################################################

		/*****
		 * 일시 후원 결제 내역을 등록한다.
		 *****/
		function set_one_insert($argu){

			global $_adminpage;
			
			// 아이디
			$argu["user_id"] = ($_adminpage) ? $argu["user_id"] : $this->_user_id;
			
			// 주문자 연락처
			$argu["buyr_tel1"]=($argu["buyr_tel1"]) ? $argu["buyr_tel1"] : $argu["buyr_tel11"]."-".$argu["buyr_tel12"]."-".$argu["buyr_tel13"];
			$argu["buyr_tel2"]=($argu["buyr_tel2"]) ? $argu["buyr_tel2"] : $argu["buyr_tel21"]."-".$argu["buyr_tel22"]."-".$argu["buyr_tel23"];

			// 후원금액
			$argu['good_mny'] = ($argu['good_mny']=='etc') ? $argu['good_mny1'] : $argu['good_mny'];
			
			// 주민 등록 번호 및 결제정보 암호화
			$cipher = new zm_Cipher;
			$argu["card_no"] = $cipher -> encrypt($argu["card_no"]);
			$argu["mobile_no"] = $cipher -> encrypt($argu["mobile_no"]);
			$cipher = new zm_Cipher_Close;
			
			$data = array(
				"ordr_idxx"         => $argu["ordr_idxx"],
				"good_idx"         => $argu["good_idx"],
				"good_name"         => $argu["good_name"],
				"user_id"         => $argu["user_id"],
				"pay_method"         => $argu["pay_method"],
				"good_mny"         => $argu["good_mny"],
				"buyr_name"         => $argu["buyr_name"],
				"buyr_tel1"         => $argu["buyr_tel1"],
				"buyr_tel2"         => $argu["buyr_tel2"],
				"buyr_mail"         => $argu["buyr_mail"],
				"status"         => $argu["status"],
				"res_msg"         => $argu["res_msg"],
				"tno"         => $argu["tno"],
				"van_cd"      => $argu["van_cd"],
				"app_time"      => $argu["app_time"],
				"card_cd"      => $argu["card_cd"],
				"card_name"      => $argu["card_name"],
				"acqu_cd"      => $argu["acqu_cd"],
				"acqu_name"      => $argu["acqu_name"],
				"bizx_numb"      => $argu["bizx_numb"],
				"app_no"      => $argu["app_no"],
				"noinf"      => $argu["noinf"],
				"quota"      => $argu["quota"],
				"card_no"      => $argu["card_no"],
				"bank_code"      => $argu["bank_code"],
				"deposit_date"      => $argu["deposit_date"],
				"bank_name"      => $argu["bank_name"],
				"van_id"      => $argu["van_id"],
				"commid"      => $argu["commid"],
				"mobile_no"      => $argu["mobile_no"],
				"mod_desc"      => $argu["mod_desc"],
				"pi_regdate"          => _NowTime,
				"pi_memo"         => $argu["pi_memo"]
			);

			$sth = $this->DB->autoPrepare(TABLE_PAYMENT_INFO, array_keys($data), DB_AUTOQUERY_INSERT);
			$res = $this->DB->execute($sth, array_values($data));

			if (DB::isError($res)) {
				go_url("","등록 오류 입니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return true;
		}

		/*****
		 * 일시 후원 결제 내역을 Update 한다.
		 *****/
		function set_one_update($argu){
			 
			global $_adminpage;
			
			$data = array(
				"pi_memo"         => $argu["pi_memo"]
			);

			if($argu['pay_method']=='bank'){
				$data = array_merge($data, array(
					"status"      => $argu["status"],
					"bank_code"      => $argu["bank_code"],
					"deposit_date"      => $argu["deposit_date"],
					"bank_name"      => $argu["bank_name"]
				));

				if($argu['status']=='1'){
					$data = array_merge($data, array(
						"res_msg"      => "[0000] ".date("Y-m-d")." 입금확인 완료"
					));
				}
			}

			$res = $this->DB->autoExecute(TABLE_PAYMENT_INFO, $data, DB_AUTOQUERY_UPDATE, "ordr_idxx = '{$argu['ordr_idxx']}' ");

			if (DB::isError($res)) {
				go_url("","수정 오류 입니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return true;
		}

		/*****
		 * 일시 후원 결제 내역을 취소 한다.
		 *****/
		function set_one_cancel($argu) {

			$data = array(
				"mod_desc"      => $argu["mod_desc"],
				"status"      => "4",
				"pi_cancel_date"      => _NowTime
			);

			$res = $this->DB->autoExecute(TABLE_PAYMENT_INFO, $data, DB_AUTOQUERY_UPDATE, "ordr_idxx = '{$argu['ordr_idxx']}' ");

			if (DB::isError($res)) {
				go_url("","취소 오류 입니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return true;
		}

		/*****
		 * 일시 후원 결제 내역을 삭제 한다.
		 *****/
		function set_one_delete($argu) {

			$query = "
				delete from ".TABLE_PAYMENT_INFO."
				where  ordr_idxx = '{$argu['ordr_idxx']}'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
				go_url("","삭제 오류 입니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return true;
		}
		
		/*****
		 * 일시 후원 결제 내역 리스트를 반환한다.
		 *****/
		function get_one_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = " pay_type='0' ";
			
			if($argu['pf_status']){
				$addwhere .= " and status='{$argu['pf_status']}' ";
			}
			
			/// 기간 검색
			if($argu['date_start']){
				$argu['date_start'] = $argu['date_start']." 00:00:00";
				$addwhere .= " and {$argu['datetype']} >= '{$argu['date_start']}' ";
			}
			if($argu['date_end']){
				$argu['date_end'] = $argu['date_end']." 23:59:59";
				$addwhere .= " and {$argu['datetype']} <= '{$argu['date_end']}' ";
			}

			// 검색어
			if($argu['keyword']){
				$addwhere .= " and {$argu['s_type']} like '%{$argu['keyword']}%' ";
			}

			$query = "
				select
					count(*)
				from
					".TABLE_PAYMENT_INFO."
				where
					$addwhere
			";

			$res = $total = $this->DB->getOne($query);
			if (DB::isError($res)) {
				go_url("","목록을 불러오지 못했습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			$query = "
				select
					*
				from
					".TABLE_PAYMENT_INFO."
				where
					$addwhere
				order by
					pi_regdate desc ";
			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_LIST_NUM.",".$this->_LIST_NUM;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($res)) {
				go_url("","목록을 불러오지 못했습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return $list;
		}

		/*****
		* 일시 후원 결제 내역을 불러온다.
		*****/
		function get_one_view($ordr_idxx){
			$query = "
				select
					*
				from
					".TABLE_PAYMENT_INFO."
				where
					ordr_idxx = '{$ordr_idxx}'
				";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
				go_url("","내용을 불러오지 못했습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			$row = $res->fetchRow(DB_FETCHMODE_ASSOC);

			if(is_array($row)){
				/// 주민번호 및 결제정보 복호화
				$cipher = new zm_Cipher;
				$card_no = $cipher -> decrypt($row["card_no"]);
				$mobile_no = $cipher -> decrypt($row["mobile_no"]);
				$cipher = new zm_Cipher_Close;

				$mobile_no=split_hp($mobile_no);

				$row = array_merge($row, array(
					"mobile_no1"=>$mobile_no[0],
					"mobile_no2"=>$mobile_no[1],
					"mobile_no3"=>$mobile_no[2]
				));

				$card_no=split_card($card_no);

				$row = array_merge($row, array(
					"card_no1"=>$card_no[0],
					"card_no2"=>$card_no[1],
					"card_no3"=>$card_no[2],
					"card_no4"=>$card_no[3]
				));

			}

			return $row;
		}

		/*****
		 * 전체 결제 내역 리스트를 반환한다.
		 *****/
		function get_all_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = " user_id='".$this->_user_id."' ";
			
			if($argu['pay_type']){
				$addwhere .= " and pay_type = '{$argu['pay_type']}' ";
			}
			
			/// 기간 검색
			if($argu['pay_year']){
				$addwhere .= " and pi_regdate like '{$argu['pay_year']}%' ";
			}

			/// 기간 검색
			if($argu['start_year']){
				$argu['start_year'] = $argu['start_year']."01-01 00:00:00";
				$addwhere .= " and pi_regdate >= '{$argu['start_year']}' ";
			}

			/// 기간 검색
			if($argu['end_year']){
				$argu['end_year'] = $argu['end_year']."12-31 23:59:59";
				$addwhere .= " and pi_regdate <= '{$argu['end_year']}' ";
			}

			if($argu['before']=='1'){
				$addwhere .= " and status = '출금실패' ";
			}

			if($argu['status']){
				$addwhere .= " and status = '".$argu['status']."' ";
			}

			$query = "
				select
					count(*)
				from
					".TABLE_PAYMENT_INFO."
				where
					$addwhere
			";

			$res = $total = $this->DB->getOne($query);
			if (DB::isError($res)) {
				go_url("","목록을 불러오지 못했습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			$query = "
				select
					*
				from
					".TABLE_PAYMENT_INFO."
				where
					$addwhere
				order by
					pi_regdate desc ";
			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_LIST_NUM.",".$this->_LIST_NUM;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($res)) {
				go_url("","목록을 불러오지 못했습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return $list;
		}

	}
?>