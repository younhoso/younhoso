<?
	class Campain{
		var $DB;
		var $_LIST_NUM = 10;
		var $_PDS = _PDS;
		var $_PDS_SUB = "campain/";
		var $_user_id;

		# 생성자
		function Campain($db) {
			$this->DB = $db;
			$this->_PDS .= $this->_PDS_SUB;
			$this->_user_id = ($_SESSION["user_id"]) ? $_SESSION["user_id"] : $_SESSION["guest_id"];
		}

		### 캠페인리스트 ########################################################
		function get_campain_conf_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = "where (1=1) ";
			if($argu['s_type']=="title"){ $addwhere .= " and cc_title like '%{$argu['keyword']}%' "; }
			if($argu['s_type']=="cc_status"){ $addwhere .= " and cc_status = '{$argu['keyword']}' "; }
			if($argu['status']){ $addwhere .= " and cc_status = '{$argu['status']}' "; }

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_CAMPAIN_CONFIG."
					$addwhere
			";

			$res = $total = $this->DB->getOne($query);

			if (DB::isError($res)) {
				go_url("","목록을 가져오지 못했습니다.");
				exit;
			}

			$query = "
				select
					*
				from
					".TABLE_CAMPAIN_CONFIG." 
					$addwhere
				order by
					cc_no desc
				";

			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_LIST_NUM.",".$this->_LIST_NUM;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("","목록을 가져오지 못했습니다.");
				exit;
			}

			return $list;

		}

		function get_campain_conf_limit($argu,$limit=0){
			$query = "
				select
					*
				from
					".TABLE_CAMPAIN_CONFIG." 
					$addwhere
				order by
					cc_no desc
				limit ".$limit;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("","목록을 가져오지 못했습니다.");
				exit;
			}

			return $list;
		}

		### 캨페인등록 #########################################################
		function set_campain_conf_insert($argu){

			// 첨부파일 argu 를 정리한다.
			if(is_array($_FILES['cc_img']['tmp_name'])){
				foreach($_FILES['cc_img'] as $_FILE_KEY => $tmp){
					foreach($tmp as $_FILE_NO => $_FILE_VALUE){
						$_FILE[$_FILE_NO][$_FILE_KEY] = $_FILE_VALUE;
					}
				}
			}

			$data = array(
				"cc_title" => $argu["cc_title"],
				"cc_memo" => $argu["cc_memo"],
				"cc_cnt" => 0,
				"cc_vote" => 0,
				"cc_status" => $argu["cc_status"],
				"cc_price" => $argu["cc_price"],
				"cc_regdate" =>_NowTime,
			);
		
			$res = $this->DB->autoExecute(TABLE_CAMPAIN_CONFIG, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
				go_url("","등록에 실패했습니다.");
				exit;
			}
			
			// $cc_no=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$cc_no = $this->DB->getOne($q);
			
			$data=array_merge($data,array("cc_no"=>$cc_no));
			
			// 첨부파일 저장
			// TODO : board_config 의 media 여부에 따라 허용 파일 타입을 필터링 해주는 부분이 필요하다.
			if(is_array($_FILE)){
				foreach($_FILE as $_FILE_NO => $_FILE_VALUE){
					//$data['bf_name'] = upload_($this->_PDS, $_FILE_VALUE,  $data['b_no']."_".$_FILE_NO, "U", &$M);
					if($_FILE_VALUE !== null && $_FILE_VALUE[error] == 0 && $_FILE_VALUE[size] > 0 ){// 첨부파일이 있을경우

						if(upload($this->_PDS, $_FILE_VALUE,$data['cc_no']."_".$_FILE_NO,"U")){ // 첨부파일 업로드에 성공했을경우
							if($_FILE_NO == 0){
								$data["cc_img_list"] = $_FILE_VALUE[name];
							}
							else{
								$data["cc_img_body"] = $_FILE_VALUE[name];
							}
							
						}else{ // 첨부파일 업로드에 실패했을경우 alert 과 동시에 작업을 중단하고 이전페이지로 돌아간다.
							go_url("","파일 업로드에 실패했습니다.");
							exit;
						}

						if($_FILE_NO == 0){
							$data_file = array(
								"cc_img_list" => $data['cc_img_list'],
							);
						}
						else{
							$data_file = array(
								"cc_img_body" => $data['cc_img_body'],
							);
						}

						$res = $this->DB->autoExecute(TABLE_CAMPAIN_CONFIG, $data_file, DB_AUTOQUERY_UPDATE, " cc_no = '{$data['cc_no']}'");
						if (DB::isError($res)) {
						    go_url("","파일 업로드에 실패했습니다.");
							exit;
						}
					}
				}
			}
			
			return $data;

		}

		### 캨페인수정 ####################################################################
		function set_campain_conf_modify($argu){
			
			// 첨부파일 argu 를 정리한다.
			if(is_array($_FILES['cc_img']['tmp_name'])){
				foreach($_FILES['cc_img'] as $_FILE_KEY => $tmp){
					foreach($tmp as $_FILE_NO => $_FILE_VALUE){
						$_FILE[$_FILE_NO][$_FILE_KEY] = $_FILE_VALUE;
					}
				}
			}

			$data = array(
				"cc_title" => $argu["cc_title"],
				"cc_memo" => $argu["cc_memo"],
				"cc_status" => $argu["cc_status"],
				"cc_price" => $argu["cc_price"],
				"cc_updated" =>_NowTime,
			);
			
			$res = $this->DB->autoExecute(TABLE_CAMPAIN_CONFIG, $data, DB_AUTOQUERY_UPDATE, " cc_no = '{$argu['cc_no']}'");
			if (DB::isError($res)) {
			    go_url("","수정되지 않았습니다.");
				exit;
			}

			// 첨부파일 저장
			// TODO : board_config 의 media 여부에 따라 허용 파일 타입을 필터링 해주는 부분이 필요하다.
			if(is_array($_FILE)){
				foreach($_FILE as $_FILE_NO => $_FILE_VALUE){
					//$data['bf_name'] = upload_($this->_PDS, $_FILE_VALUE,  $data['b_no']."_".$_FILE_NO, "U", &$M);
					if($_FILE_VALUE !== null && $_FILE_VALUE[error] == 0 && $_FILE_VALUE[size] > 0 ){// 첨부파일이 있을경우
						upload($this->_PDS, "",$argu['cc_no']."_".$_FILE_NO,"D");

						if(upload($this->_PDS, $_FILE_VALUE,$argu['cc_no']."_".$_FILE_NO,"U")){ // 첨부파일 업로드에 성공했을경우
							if($_FILE_NO == 0){
								$data["cc_img_list"] = $_FILE_VALUE[name];
							}
							else{
								$data["cc_img_body"] = $_FILE_VALUE[name];
							}
						}else{ // 첨부파일 업로드에 실패했을경우 alert 과 동시에 작업을 중단하고 이전페이지로 돌아간다.
							go_url("","파일 업로드에 실패했습니다.");
							exit;
						}

						if($_FILE_NO == 0){
							$data_file = array(
								"cc_img_list" => $data['cc_img_list'],
							);
						}
						else{
							$data_file = array(
								"cc_img_body" => $data['cc_img_body'],
							);
						}

						$res = $this->DB->autoExecute(TABLE_CAMPAIN_CONFIG, $data_file, DB_AUTOQUERY_UPDATE, " cc_no = '{$argu['cc_no']}'");
						if (DB::isError($res)) {
						    go_url("","파일 업로드에 실패했습니다.");
							exit;
						}
					}
				}
			}
			
			return true;
		}

		### 캠페인삭제 ##########################################################################
		function set_campain_conf_delete($argu){
			
			$file_list = $this->get_campain_conf_view($argu);
			if($file_list['cc_img_list'] != ""){
				upload($this->_PDS, "",$argu['cc_no']."_0","D");
			}
			if($file_list['cc_img_body'] != ""){
				upload($this->_PDS, "",$argu['cc_no']."_1","D");
			}

			$query = "
				delete from ".TABLE_CAMPAIN_CONFIG."
				where
					cc_no   = '{$argu['cc_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    go_url("","삭제되지 않았습니다.");
				exit;
			}

			return true;

		}

		### 캠페인상세보기 #########################################################################
		function get_campain_conf_view($cc_no){
			$query = "
				select
					*
				from
					".TABLE_CAMPAIN_CONFIG."
				where
					cc_no   = '{$cc_no}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    go_url("","내용을 불러오지 못했습니다.");
			    exit;
			}

			return $row;

		}

##### 내역조회 start #####################################

		/*****
		 * 주문번호를 생성한다.
		 *****/
		function set_order_idx($argu){

			// 주문번호 생성하기
			$ordr_idxx = ($argu['cl_give_type']=='1') ? "CF".date("YmdHis") : "CN".date("YmdHis");
			$res = $order_cnt = $this->DB->getOne("select coalesce(count(*),0)+1 from ".TABLE_FIXED_LIST." where ordr_idxx like '{$ordr_idxx}%'");
			if (DB::isError($res)) {
			    go_url("","주문번호 생성 오류입니다!\\n[".$res->getMessage()."]");
			    exit;
			}
			
			$ordr_idxx .= $order_cnt;

			return $ordr_idxx;
		}

		#등록
		function set_campain_insert($argu){

			global $_adminpage;

			// 주문번호 생성
			//if($_adminpage){ $argu['ordr_idxx'] = $this->set_order_idx($argu); }
				
			$cc_title = $this->get_campain_conf_view($argu['cc_no']);
			
			// 주민/사업자 등록 번호 암호화
			$argu["cl_give_person"] = trim($argu["fl_give_person1"]).trim($argu["fl_give_person2"]);
			
			$cipher = new zm_Cipher;
			$argu["cl_give_person"] = $cipher -> encrypt($argu["cl_give_person"]);
			$cipher = new zm_Cipher_Close;
			
			$data = array(
				"ordr_idxx"         => $argu['ordr_idxx'],
				"cc_no" => $argu['cc_no'],
				"cc_title" => $cc_title['cc_title'],
				"user_id" => ($_adminpage) ? $argu['user_id'] : $this->_user_id,
				"cl_give_type" => $argu['cl_give_type']	,
				"cl_give_name" => $argu['fl_give_name'],
				"cl_give_person" => $argu['cl_give_person'],
				"cl_give_tel" => $argu['fl_give_tel1']."-".$argu['fl_give_tel2']."-".$argu['fl_give_tel3'],
				"cl_give_email" => ($argu['fl_give_email']) ? $argu['fl_give_email'] : $argu['fl_give_email1']."@".$argu['fl_give_email2'],
				"cl_give_local" => $argu['fl_give_local'],
				"cl_give_zip" => $argu['fl_give_zip'],
				"cl_give_add1" => $argu['fl_give_add1'],
				"cl_give_add2" => $argu['fl_give_add2'],
				"cl_give_reason" => $argu['fl_give_reason'],
				"cl_regdate" => _NowTime
			);
			
			$res = $this->DB->autoExecute(TABLE_CAMPAIN_LIST, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
			    go_url("","등록되지 않았습니다.");
			    exit;
			}
				
			$argu["good_mny"] = ($argu["good_mny"]=='etc') ? $argu["good_mny1"] : $argu["good_mny"];

			// 결제 관련 변수 정리
			$pay_data = array(
				"ordr_idxx"         => $data["ordr_idxx"],
				"good_idx"         => $data["cc_no"],
				"user_id"         => $data["user_id"],
				"good_name"         => $argu["good_name"],
				"buyr_name"         => $data["cl_give_name"],
				"buyr_tel1"         => ($argu["buyr_tel1"]) ? $argu["buyr_tel1"] : $argu["fl_give_tel1"],
				"buyr_tel2"         => ($argu["buyr_tel2"]) ? $argu["buyr_tel2"] : $argu["fl_give_tel1"],
				"buyr_tel3"         => ($argu["buyr_tel3"]) ? $argu["buyr_tel3"] : $argu["fl_give_tel1"],
				"pay_zip"      => $data["cl_give_zip"],
				"pay_add1"      => $data["cl_give_add1"],
				"pay_add2"      => $data["cl_give_add2"],
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
		function set_campain_modify($argu){
			
			global $_adminpage;

			$cc_title = $this->get_campain_conf_view($argu);

			// 주민/사업자 등록 번호 암호화
			$argu["cl_give_person"] = trim($argu["cl_give_person1"]).trim($argu["cl_give_person2"]);
			
			$cipher = new zm_Cipher;
			$argu["cl_give_person"] = $cipher -> encrypt($argu["cl_give_person"]);
			$cipher = new zm_Cipher_Close;

			$data = array(
				"cl_give_name" => $argu['cl_give_name'],
				"cl_give_person" => $argu['cl_give_person'],
				"cl_give_tel" => $argu['cl_give_tel1']."-".$argu['cl_give_tel2']."-".$argu['cl_give_tel3'],
				"cl_give_email" => $argu['cl_give_email'],
				"cl_give_local" => $argu['cl_give_local'],
				"cl_give_zip" => $argu['cl_give_zip'],
				"cl_give_add1" => $argu['cl_give_add1'],
				"cl_give_add2" => $argu['cl_give_add2'],
				"cl_give_reason" => $argu['cl_give_reason']
			);

			$res = $this->DB->autoExecute(TABLE_CAMPAIN_LIST, $data, DB_AUTOQUERY_UPDATE, " cl_no = '{$argu['cl_no']}'");
			if (DB::isError($res)) {
			    go_url("","수정되지 않았습니다.");
			    exit;
			}
			
			return true;
		}

		#삭제
		function set_campain_delete($argu){
			$query = "
				delete from ".TABLE_CAMPAIN_LIST."
				where
					cl_no   = '{$argu['cl_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    go_url("","삭제되지 않았습니다.");
			    exit;
			}

			return true;
		}

		#리스트
		function get_campain_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = "where (1=1) ";
			if($argu['s_type']=="id"){ $addwhere .= " and (user_id like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="name"){ $addwhere .= " and (cl_give_name like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="tel"){ $addwhere .= " and (cl_give_tel like '%{$argu['keyword']}%' ) "; }
			if($argu['s_type']=="email"){ $addwhere .= " and (cl_give_email  like '%{$argu['keyword']}%') "; }

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_CAMPAIN_LIST."
					$addwhere
			";

			$res = $total = $this->DB->getOne($query);

			if (DB::isError($res)) {
				go_url("","목록을 불러오지 못했습니다.");
			    exit;
			}

			$query = "
				select
					*
				from
					".TABLE_CAMPAIN_LIST."
					$addwhere
				order by
					cl_no desc
				";

			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_LIST_NUM.",".$this->_LIST_NUM;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("","목록을 불러오지 못했습니다.");
			    exit;
			}

			return $list;

		}

		#상세보기
		function get_campain_view($argu){
			$query = "
				select
					*
				from
					".TABLE_CAMPAIN_LIST."
				where
					cl_no   = '{$argu['cl_no']}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    go_url("","내용을 불러오지 못했습니다.");
			    exit;
			}
			
			if(is_array($row)){
				/// 주민번호 복호화
				$cipher = new zm_Cipher;
				$cl_give_person = $cipher -> decrypt($row["cl_give_person"]);
				$cipher = new zm_Cipher_Close;

				$cl_give_person1 = substr($cl_give_person, 0, 6);
				$cl_give_person2 = substr($cl_give_person, -7);

				$row = array_merge($row, array(
					"cl_give_person1"=>$cl_give_person1,
					"cl_give_person2"=>$cl_give_person2
				));

				if($row["cl_give_tel"] != ""){
					$cl_give_tel = explode("-",$row["cl_give_tel"]);
					$row = array_merge($row, array(
						"cl_give_tel1"=>$cl_give_tel[0],
						"cl_give_tel2"=>$cl_give_tel[1],
						"cl_give_tel3"=>$cl_give_tel[2]
					));
				}
			}

			return $row;
		}


##### 내역조회 end #####################################


	}
?>