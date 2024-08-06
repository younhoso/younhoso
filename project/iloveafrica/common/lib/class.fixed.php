<?
	class Fixed{
		var $DB;
		var $_LIST_NUM = 20;
		var $_PDS = _PDS;
		var $_PDS_SUB = "fixed/";
		var $_user_id;

		# 생성자
		function Fixed($db) {
			$this->DB = $db;
			$this->_PDS .= $this->_PDS_SUB;
			$this->_user_id = ($_SESSION["user_id"]) ? $_SESSION["user_id"] : $_SESSION["guest_id"];
		}

#####항목설정 start ###################################

		###리스트###
		function get_fixedconf_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = "where (1=1) ";
			if($argu['s_type']=="title"){ $addwhere .= " and (f_title like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="status"){ $addwhere .= " and (f_status = '{$argu['keyword']}') "; }
			
			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_FIXED_CONFIG."
					$addwhere
			";

			$res = $total = $this->DB->getOne($query);

			if (DB::isError($res)) {
				go_url("","목록을 불러올 수 없습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			$query = "
				select
					*
				from
					".TABLE_FIXED_CONFIG." 
					$addwhere
				order by
					f_no desc
				";

			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_LIST_NUM.",".$this->_LIST_NUM;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("","목록을 불러올 수 없습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return $list;

		}

		###등록#####
		function set_fixedconf_insert($argu){

			// 첨부파일 argu 를 정리한다.
			if(is_array($_FILES['f_file']['tmp_name'])){
				foreach($_FILES['f_file'] as $_FILE_KEY => $tmp){
					foreach($tmp as $_FILE_NO => $_FILE_VALUE){
						$_FILE[$_FILE_NO][$_FILE_KEY] = $_FILE_VALUE;
					}
				}
			}

			$data = array(
				"f_title" => $argu["f_title"],
				"f_memo" => $argu["f_memo"],
				"f_price" => $argu["f_price"],
			);
		
			$res = $this->DB->autoExecute(TABLE_FIXED_CONFIG, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
			    go_url("","등록 오류입니다.\\n[".$res->getMessage()."]");
				exit;
			}
			
			// $f_no=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$f_no = $this->DB->getOne($q);
			
			$data=array_merge($data,array("f_no"=>$f_no));
			
			// 첨부파일 저장
			// TODO : board_config 의 media 여부에 따라 허용 파일 타입을 필터링 해주는 부분이 필요하다.
			if(is_array($_FILE)){
				foreach($_FILE as $_FILE_NO => $_FILE_VALUE){
					//$data['bf_name'] = upload_($this->_PDS, $_FILE_VALUE,  $data['b_no']."_".$_FILE_NO, "U", &$M);
					if($_FILE_VALUE !== null && $_FILE_VALUE[error] == 0 && $_FILE_VALUE[size] > 0 ){// 첨부파일이 있을경우

						if(upload($this->_PDS, $_FILE_VALUE,$data['f_no']."_".$_FILE_NO,"U")){ // 첨부파일 업로드에 성공했을경우
							$data["f_file"] = $_FILE_VALUE[name];
						}else{ // 첨부파일 업로드에 실패했을경우 alert 과 동시에 작업을 중단하고 이전페이지로 돌아간다.
							go_url("","파일 업로드에 실패했습니다.");
							exit;
						}

						$data_file = array(
							"f_file" => $data['f_file'],
						);

						$res = $this->DB->autoExecute(TABLE_FIXED_CONFIG, $data_file, DB_AUTOQUERY_UPDATE, " f_no = '{$data['f_no']}'");
						if (DB::isError($res)) {
						    go_url("","파일 업로드에 실패했습니다.\\n[".$res->getMessage()."]");
							exit;
						}
					}
				}
			}
			
			return $data;

		}

		###수정###########
		function set_fixedconf_modify($argu){
			// 첨부파일 argu 를 정리한다.
			if(is_array($_FILES['f_file']['tmp_name'])){
				foreach($_FILES['f_file'] as $_FILE_KEY => $tmp){
					foreach($tmp as $_FILE_NO => $_FILE_VALUE){
						$_FILE[$_FILE_NO][$_FILE_KEY] = $_FILE_VALUE;
					}
				}
			}

			$data = array(
				"f_title" => $argu["f_title"],
				"f_memo" => $argu["f_memo"],
				"f_status" => $argu["f_status"],
				"f_price" => $argu["f_price"],
			);
			
			$res = $this->DB->autoExecute(TABLE_FIXED_CONFIG, $data, DB_AUTOQUERY_UPDATE, " f_no = '{$argu['f_no']}'");
			if (DB::isError($res)) {
			    go_url("","수정 오류입니다.\\n[".$res->getMessage()."]");
				exit;
			}
			
			// 첨부파일 저장
			// TODO : board_config 의 media 여부에 따라 허용 파일 타입을 필터링 해주는 부분이 필요하다.
			if(is_array($_FILE)){
				foreach($_FILE as $_FILE_NO => $_FILE_VALUE){
					//$data['bf_name'] = upload_($this->_PDS, $_FILE_VALUE,  $data['b_no']."_".$_FILE_NO, "U", &$M);
					if($_FILE_VALUE !== null && $_FILE_VALUE[error] == 0 && $_FILE_VALUE[size] > 0 ){// 첨부파일이 있을경우
						upload($this->_PDS, "",$argu['f_no']."_".$_FILE_NO,"D");

						if(upload($this->_PDS, $_FILE_VALUE,$argu['f_no']."_".$_FILE_NO,"U")){ // 첨부파일 업로드에 성공했을경우
							$data["f_file"] = $_FILE_VALUE[name];
						}else{ // 첨부파일 업로드에 실패했을경우 alert 과 동시에 작업을 중단하고 이전페이지로 돌아간다.
							go_url("","파일 업로드에 실패했습니다.");
							exit;
						}

						$data_file = array(
							"f_file" => $data['f_file'],
						);

						$res = $this->DB->autoExecute(TABLE_FIXED_CONFIG, $data_file, DB_AUTOQUERY_UPDATE, " f_no = '{$argu['f_no']}'");
						if (DB::isError($res)) {
						    go_url("","파일 업로드에 실패했습니다.\\n[".$res->getMessage()."]");
							exit;
						}
					}
				}
			}
			return true;
		}

		###삭제###########
		function set_fixedconf_delete($argu){

			$file_list = $this->get_fixedconf_view($argu);
			if($file_list['f_file'] != ""){
				upload($this->_PDS, "",$argu['f_no']."_0","D");
			}
			
			$query = "
				delete from ".TABLE_FIXED_CONFIG."
				where
					f_no   = '{$argu['f_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    go_url("","삭제 오류입니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return true;

		}

		###상세보기######
		function get_fixedconf_view($argu){
			$query = "
				select
					*
				from
					".TABLE_FIXED_CONFIG."
				where
					f_no   = '{$argu['f_no']}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			   go_url("","내용을 불러 올 수 없습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return $row;

		}

#####항목설정 end ###################################	

##### 내역조회 start #####################################

		/*****
		 * 주문번호를 생성한다.
		 *****/
		function set_order_idx(){

			// 주문번호 생성하기
			$ordr_idxx = "BU".date("YmdHis");
			$res = $order_cnt = $this->DB->getOne("select coalesce(count(*),0)+1 from ".TABLE_FIXED_LIST." where ordr_idxx like '{$ordr_idxx}%'");
			if (DB::isError($res)) {
			    go_url("","주문번호 생성 오류입니다!\\n[".$res->getMessage()."]");
			    exit;
			}
			
			$ordr_idxx .= $order_cnt;

			return $ordr_idxx;
		}
		
		#등록
		function set_fixed_insert($argu){

			global $_adminpage;

			// 주문번호 생성
			$ordr_idxx = $this->set_order_idx();
				
			$f_title = $this->get_fixedconf_view($argu);

			// 주민/사업자 등록 번호 암호화
			$argu["fl_give_person"] = trim($argu["fl_give_person1"]).trim($argu["fl_give_person2"]);
			
			$cipher = new zm_Cipher;
			$argu["fl_give_person"] = $cipher -> encrypt($argu["fl_give_person"]);
			$cipher = new zm_Cipher_Close;

			$data = array(
				"ordr_idxx" => $ordr_idxx,
				"f_no" => $argu['f_no'],		//정기후원분야PK
				"f_title" => $f_title['f_title'],		//정기후원분야 제목
				"user_id" => ($_adminpage) ? $argu['user_id'] : $this->_user_id,		//회원아이디
				"fl_give_name" => $argu['fl_give_name'],	 //기부자성명
				"fl_give_person" => $argu['fl_give_person'],	//기부자주민번호
				"fl_give_tel" => $argu['fl_give_tel1']."-".$argu['fl_give_tel2']."-".$argu['fl_give_tel3'],		//기부자연락처
				"fl_give_email" => ($argu['fl_give_email']) ? $argu['fl_give_email'] : $argu['fl_give_email1']."@".$argu['fl_give_email2'],		//기부자이메일
				"fl_give_local" => $argu['fl_give_local'],		//기부자주소지 (1:자택/2:직장)
				"fl_give_zip" => $argu['fl_give_zip'],		//기부자우편번호
				"fl_give_add1" => $argu['fl_give_add1'],		//기부자주소1
				"fl_give_add2" => $argu['fl_give_add2'],		//기부자주소2
				"fl_give_reason" => $argu['fl_give_reason'],		//가입동기
				"fl_regdate" => _NowTime,		//신청날짜
			);
			
			$res = $this->DB->autoExecute(TABLE_FIXED_LIST, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
			    go_url("","등록 오류입니다.\\n[".$res->getMessage()."]");
				exit;
			}

			$argu["good_mny"] = ($argu["good_mny"]=='etc') ? $argu["good_mny1"] : $argu["good_mny"];

			// 결제 관련 변수 정리
			$pay_data = array(
				"ordr_idxx"         => $data["ordr_idxx"],
				"good_idx"         => $data["f_no"],
				"user_id"         => $data["user_id"],
				"good_name"         => $argu["good_name"],
				"buyr_name"         => $data["fl_give_name"],
				"buyr_tel1"         => ($argu["buyr_tel1"]) ? $argu["buyr_tel1"] : $argu["fl_give_tel1"],
				"buyr_tel2"         => ($argu["buyr_tel2"]) ? $argu["buyr_tel2"] : $argu["fl_give_tel1"],
				"buyr_tel3"         => ($argu["buyr_tel3"]) ? $argu["buyr_tel3"] : $argu["fl_give_tel1"],
				"pay_zip"      => $data["fl_give_zip"],
				"pay_add1"      => $data["fl_give_add1"],
				"pay_add2"      => $data["fl_give_add2"],
				"pay_method"         => $argu["pay_method"],
				"pay_date"         => $argu["pay_date"],
				"good_mny"         => ($argu["good_mny"]=='etc') ? $argu["good_mny1"] : $argu["good_mny"],
				"start_date"         => ($argu["start_date"]) ? $argu["start_date"] : date("Ymd"),
				"end_date"         => ($argu["end_date"]) ? $argu["end_date"] : "99991231",
				"sms_agree"         => $argu["sms_agree"],
				"bank_cd"         => $argu["bank_cd"],
				"pay_name"      => $argu["pay_name"],
				"pay_person1"      => $argu["pay_person1"],
				"pay_person2"      => $argu["pay_person2"],
				"pay_memo"      => $argu["pay_memo"],
				"taxbill"      => $argu["taxbill"],
				"taxbill_info"      => $argu["taxbill_info"],
				"pf_status"      => $argu["pf_status"]
			);

			if($argu["pay_method"]=="MOB"){
				$pay_data = array_merge($pay_data, array(
					"pay_num1"      => $argu["pay_num1"],
					"pay_num2"      => $argu["pay_num2"],
					"pay_num3"      => $argu["pay_num3"]
				));
			}else{
				$pay_data = array_merge($pay_data, array(
					"pay_num"      => $argu["pay_num"]
				));
			}

			// 결제 class 선언
			$Obj_payment = new Payment($this->DB);
			$Obj_payment->set_fix_insert($pay_data);
			
			return $ordr_idxx;
		}

		#수정
		function set_fixed_modify($argu){
			
			global $_adminpage;
			
			$f_title = $this->get_fixedconf_view($argu);

			// 주민/사업자 등록 번호 암호화
			$argu["fl_give_person"] = trim($argu["fl_give_person1"]).trim($argu["fl_give_person2"]);
			
			$cipher = new zm_Cipher;
			$argu["fl_give_person"] = $cipher -> encrypt($argu["fl_give_person"]);
			$cipher = new zm_Cipher_Close;

			$data = array(
				"f_no" => $argu['f_no'],		//정기후원분야PK
				"f_title" => $f_title['f_title'],		//정기후원분야 제목
				"user_id" => ($_adminpage) ? $argu['user_id'] : $this->_user_id,		//회원아이디
				"fl_give_name" => $argu['fl_give_name'],	 //기부자성명
				"fl_give_person" => $argu['fl_give_person'],	//기부자주민번호
				"fl_give_tel" => $argu['fl_give_tel1']."-".$argu['fl_give_tel2']."-".$argu['fl_give_tel3'],		//기부자연락처
				"fl_give_email" => $argu['fl_give_email'],		//기부자이메일
				"fl_give_local" => $argu['fl_give_local'],		//기부자주소지 (1:자택/2:직장)
				"fl_give_zip" => $argu['fl_give_zip'],		//기부자우편번호
				"fl_give_add1" => $argu['fl_give_add1'],		//기부자주소1
				"fl_give_add2" => $argu['fl_give_add2'],		//기부자주소2
				"fl_give_reason" => $argu['fl_give_reason']		//가입동기
			);

			$res = $this->DB->autoExecute(TABLE_FIXED_LIST, $data, DB_AUTOQUERY_UPDATE, " fl_no = '{$argu['fl_no']}'");
			if (DB::isError($res)) {
				go_url("","수정 오류입니다.\\n[".$res->getMessage()."]");
				exit;
			}
			
			return true;
		}

		#삭제
		function set_fixed_delete($argu){

			//주문번호 받기
			$_row = $this->get_fixed_view($argu);

			// 결제 내역 취소하기
			$Obj_payment = new Payment($this->DB);

			$argu = array_merge($argu, array(
				"ordr_idxx" => $_row['ordr_idxx'],
				"pay_memo" => "관리자 후원 내역 삭제"
			));

			$Obj_payment->set_fix_cancel($argu);

			$query = "
				delete from ".TABLE_FIXED_LIST."
				where
					fl_no   = '{$argu['fl_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    go_url("","삭제 오류입니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return true;
		}

		#리스트
		function get_fixed_list($argu,&$total,$limit = true){

			global $_adminpage;
			
			/// 검색 쿼리
			$addwhere = ($_adminpage) ? " where (1=1) " : " where user_id = '".$this->_user_id."' ";
			if($argu['s_type']=="id"){ $addwhere .= " and (user_id like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="name"){ $addwhere .= " and (fl_give_name like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="tel"){ $addwhere .= " and (fl_give_tel like '%{$argu['keyword']}%' ) "; }
			if($argu['s_type']=="email"){ $addwhere .= " and (fl_give_email  like '%{$argu['keyword']}%') "; }

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_FIXED_LIST."
					$addwhere
			";

			$res = $total = $this->DB->getOne($query);

			if (DB::isError($res)) {
				go_url("","목록을 불러올 수 없습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			$query = "
				select
					*
				from
					".TABLE_FIXED_LIST." 
					$addwhere
				order by
					fl_no desc
				";

			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_LIST_NUM.",".$this->_LIST_NUM;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("","목록을 불러올 수 없습니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return $list;

		}

		#상세보기
		function get_fixed_view($argu){
			$query = "
				select
					*
				from
					".TABLE_FIXED_LIST."
				where
					fl_no   = '{$argu['fl_no']}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				go_url("","내용을 불러올 수 없습니다.\\n[".$res->getMessage()."]");
				exit;
			}
			/// 주민번호 복호화
			$cipher = new zm_Cipher;
			$fl_give_person = $cipher -> decrypt($row["fl_give_person"]);
			$cipher = new zm_Cipher_Close;

			$fl_give_person1 = substr($fl_give_person, 0, 6);
			$fl_give_person2 = substr($fl_give_person, -7);

			$row = array_merge($row, array(
				"fl_give_person1"=>$fl_give_person1,
				"fl_give_person2"=>$fl_give_person2
			));

			if($row["fl_give_tel"] != ""){
				$fl_give_tel = explode("-",$row["fl_give_tel"]);
				$row = array_merge($row, array(
					"fl_give_tel1"=>$fl_give_tel[0],
					"fl_give_tel2"=>$fl_give_tel[1],
					"fl_give_tel3"=>$fl_give_tel[2]
				));
			}

			return $row;
		}


##### 내역조회 end #####################################
	}
?>