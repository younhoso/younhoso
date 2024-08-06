<?
	class Company{
		var $DB;
		var $_LIST_NUM = 20;
		var $_PDS = _PDS;
		var $_PDS_SUB = "company/";

		# 생성자
		function Company($db) {
			$this->DB = $db;
			$this->_PDS .= $this->_PDS_SUB;
		}

		### 문의리스트 ########################################################
		function get_cq_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = "where (1=1) ";
			if($argu['s_type']=="id"){ $addwhere .= " and (user_id like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="name"){ $addwhere .= " and (cq_give_name like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="tel"){ $addwhere .= " and (cq_give_tel like '%{$argu['keyword']}%' ) "; }
			if($argu['s_type']=="email"){ $addwhere .= " and (cq_give_email  like '%{$argu['keyword']}%') "; }

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_COMPANY_QUESTION."
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
					".TABLE_COMPANY_QUESTION." 
					$addwhere
				order by
					cq_no desc
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

		### 문의등록 #########################################################
		function set_cq_insert($argu){

			$data = array(
				"user_id" => $argu["user_id"],
				"cq_give_name" => $argu["cq_give_name"],
				"cq_give_homepage" => $argu["cq_give_homepage"],
				"cq_give_tel" => $argu["cq_give_tel1"]."-".$argu["cq_give_tel2"]."-".$argu["cq_give_tel3"],
				"cq_give_email" => $argu["cq_give_email"],
				"cq_give_type1" => $argu["cq_give_type1"],
				"cq_give_type2" => $argu["cq_give_type2"],
				"cq_give_type3" => $argu["cq_give_type3"],
				"cq_give_type4" => $argu["cq_give_type4"],
				"cq_give_type5" => $argu["cq_give_type5"],
				"cq_give_memo" => $argu["cq_give_memo"],
				"cq_regdate" =>_NowTime,
			);
		
			$res = $this->DB->autoExecute(TABLE_COMPANY_QUESTION, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
			    go_url("","등록되지 않았습니다.");
			    exit;
			}
			
			// $cq_no=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$cq_no = $this->DB->getOne($q);
			
			$data=array_merge($data,array("cq_no"=>$cq_no));
			
			return $data;

		}

		### 문의수정 ####################################################################
		function set_cq_modify($argu){

			$data = array(
				"cq_give_name" => $argu["cq_give_name"],
				"cq_give_homepage" => $argu["cq_give_homepage"],
				"cq_give_tel" => $argu["cq_give_tel1"]."-".$argu["cq_give_tel2"]."-".$argu["cq_give_tel3"],
				"cq_give_email" => $argu["cq_give_email"],
				"cq_give_type1" => $argu["cq_give_type1"],
				"cq_give_type2" => $argu["cq_give_type2"],
				"cq_give_type3" => $argu["cq_give_type3"],
				"cq_give_type4" => $argu["cq_give_type4"],
				"cq_give_type5" => $argu["cq_give_type5"],
				"cq_give_memo" => $argu["cq_give_memo"],
				"cq_status" => $argu["cq_status"],
			);
			
			$res = $this->DB->autoExecute(TABLE_COMPANY_QUESTION, $data, DB_AUTOQUERY_UPDATE, " cq_no = '{$argu['cq_no']}'");
			if (DB::isError($res)) {
			    go_url("","수정되지 않았습니다.");
			    exit;
			}

			if($argu["cq_status"] == "Y"){
				
				$query = "
					select
						count(*)
					from
						".TABLE_COMPANY_LIST."
					where
						cq_no   = '{$argu['cq_no']}'
				";

				$chk = $this->DB->getOne($query);
				if (DB::isError($chk)) {
					go_url("","수정되지 않았습니다.");
				    exit;
				}

				if($chk == 0){
					//$argu["user_id"] = $argu["user_id"];
					$argu["cl_give_name"] = $argu["cq_give_name"];
					$accept_chk = $this->set_cl_insert($argu);
					return $accept_chk;
				}
				else{
					return true;
				}
			}
			else{
			
				return true;
			}
		}

		### 문의삭제 ##########################################################################
		function set_cq_delete($argu){
			
			$query = "
				delete from ".TABLE_COMPANY_QUESTION."
				where
					cq_no   = '{$argu['cq_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    go_url("", $res->getMessage());
			    exit;
			}

			return true;

		}

		### 문의상세보기 #########################################################################
		function get_cq_view($argu){
			$query = "
				select
					*
				from
					".TABLE_COMPANY_QUESTION."
				where
					cq_no   = '{$argu['cq_no']}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    go_url("", $res->getMessage());
			    exit;
			}

			if($row["cq_give_tel"] != ""){
				$cq_give_tel = explode("-",$row["cq_give_tel"]);
				$row = array_merge($row, array(
					"cq_give_tel1"=>$cq_give_tel[0],
					"cq_give_tel2"=>$cq_give_tel[1],
					"cq_give_tel3"=>$cq_give_tel[2]
				));
			}

			return $row;

		}


		### 승인내역리스트 ########################################################
		function get_cl_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = "where (1=1) ";
			if($argu['s_type']=="id"){ $addwhere .= " and (user_id like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="name"){ $addwhere .= " and (cl_give_name like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="title"){ $addwhere .= " and (cl_give_title like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="give_type"){ $addwhere .= " and (cl_give_type = '{$argu['keyword']}') "; }

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_COMPANY_LIST."
					$addwhere
			";

			$res = $total = $this->DB->getOne($query);

			if (DB::isError($res)) {
				//debug($res);
				die($res->getMessage());
			}

			$query = "
				select
					*
				from
					".TABLE_COMPANY_LIST." 
					$addwhere
				order by
					cl_no desc
				";

			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_LIST_NUM.",".$this->_LIST_NUM;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				//debug($res);
				die($res->getMessage());
			}

			return $list;

		}

		function get_cl_list_limit($argu,$limit=0){
			if($argu['s_type']=="give_type"){ $addwhere .= " where (cl_give_type = '{$argu['keyword']}') "; }
			$query = "
				select
					*
				from
					".TABLE_COMPANY_LIST." 
					$addwhere
				order by
					cl_no desc
				limit ".$limit;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("","목록을 가져오지 못했습니다.");
				exit;
			}

			return $list;
		}

		### 승인내역등록 #########################################################
		function set_cl_insert($argu){

			// 첨부파일 argu 를 정리한다.
			if(is_array($_FILES['cl_give_logo']['tmp_name'])){
				foreach($_FILES['cl_give_logo'] as $_FILE_KEY => $tmp){
					foreach($tmp as $_FILE_NO => $_FILE_VALUE){
						$_FILE[$_FILE_NO][$_FILE_KEY] = $_FILE_VALUE;
					}
				}
			}

			$data = array(
				"cq_no" => $argu["cq_no"],
				"user_id" => $argu["user_id"],
				"cl_give_type" => $argu["cl_give_type"],
				"cl_give_name" => $argu["cl_give_name"],
				"cl_give_title" => $argu["cl_give_title"],
				"cl_give_memo" => $argu["cl_give_memo"],
				"cl_regdate" =>_NowTime,
			);
		
			$res = $this->DB->autoExecute(TABLE_COMPANY_LIST, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
				//debug($res);
			    die($res->getMessage());
			    exit;
			}
			
			// $cl_no=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$cl_no = $this->DB->getOne($q);
			
			$data=array_merge($data,array("cl_no"=>$cl_no));
			
			// 첨부파일 저장
			// TODO : board_config 의 media 여부에 따라 허용 파일 타입을 필터링 해주는 부분이 필요하다.
			if(is_array($_FILE)){
				foreach($_FILE as $_FILE_NO => $_FILE_VALUE){
					//$data['bf_name'] = upload_($this->_PDS, $_FILE_VALUE,  $data['b_no']."_".$_FILE_NO, "U", &$M);
					if($_FILE_VALUE !== null && $_FILE_VALUE[error] == 0 && $_FILE_VALUE[size] > 0 ){// 첨부파일이 있을경우

						if(upload($this->_PDS, $_FILE_VALUE,$data['cl_no']."_".$_FILE_NO,"U")){ // 첨부파일 업로드에 성공했을경우
							$data["cl_give_logo"] = $_FILE_VALUE[name];
						}else{ // 첨부파일 업로드에 실패했을경우 alert 과 동시에 작업을 중단하고 이전페이지로 돌아간다.
							go_url("","파일 업로드에 실패했습니다.");
							exit;
						}

						$data_file = array(
							"cl_give_logo" => $data['cl_give_logo'],
						);

						$res = $this->DB->autoExecute(TABLE_COMPANY_LIST, $data_file, DB_AUTOQUERY_UPDATE, " cl_no = '{$data['cl_no']}'");
						if (DB::isError($res)) {
						    //debug($res);
						    die($res->getMessage());
						    exit;
						}
					}
				}
			}
			
			return $data;

		}

		### 승인내역수정 ####################################################################
		function set_cl_modify($argu){
			
			// 첨부파일 argu 를 정리한다.
			if(is_array($_FILES['f_file']['tmp_name'])){
				foreach($_FILES['f_file'] as $_FILE_KEY => $tmp){
					foreach($tmp as $_FILE_NO => $_FILE_VALUE){
						$_FILE[$_FILE_NO][$_FILE_KEY] = $_FILE_VALUE;
					}
				}
			}

			$data = array(
				"cl_give_type" => $argu["cl_give_type"],
				"cl_give_name" => $argu["cl_give_name"],
				"cl_give_title" => $argu["cl_give_title"],
				"cl_give_memo" => $argu["cl_give_memo"],
			);
			
			$res = $this->DB->autoExecute(TABLE_COMPANY_LIST, $data, DB_AUTOQUERY_UPDATE, " cl_no = '{$argu['cl_no']}'");
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			// 첨부파일 저장
			// TODO : board_config 의 media 여부에 따라 허용 파일 타입을 필터링 해주는 부분이 필요하다.
			if(is_array($_FILE)){
				foreach($_FILE as $_FILE_NO => $_FILE_VALUE){
					//$data['bf_name'] = upload_($this->_PDS, $_FILE_VALUE,  $data['b_no']."_".$_FILE_NO, "U", &$M);
					if($_FILE_VALUE !== null && $_FILE_VALUE[error] == 0 && $_FILE_VALUE[size] > 0 ){// 첨부파일이 있을경우
						upload($this->_PDS, "",$argu['cl_no']."_".$_FILE_NO,"D");

						if(upload($this->_PDS, $_FILE_VALUE,$argu['cl_no']."_".$_FILE_NO,"U")){ // 첨부파일 업로드에 성공했을경우
							$data["cl_give_logo"] = $_FILE_VALUE[name];
						}else{ // 첨부파일 업로드에 실패했을경우 alert 과 동시에 작업을 중단하고 이전페이지로 돌아간다.
							go_url("","파일 업로드에 실패했습니다.");
							exit;
						}

						$data_file = array(
							"cl_give_logo" => $data['cl_give_logo'],
						);

						$res = $this->DB->autoExecute(TABLE_COMPANY_LIST, $data_file, DB_AUTOQUERY_UPDATE, " cl_no = '{$argu['cl_no']}'");
						if (DB::isError($res)) {
						    //debug($res);
						    die($res->getMessage());
						    exit;
						}
					}
				}
			}
			
			return true;
		}

		### 승인내역삭제 ##########################################################################
		function set_cl_delete($argu){
			
			$query = "
				update ".TABLE_COMPANY_QUESTION." set
					cq_status = 'N'
				where
					cq_no   = '{$argu['cq_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}


			$file_list = $this->get_cl_view($argu);
			if($file_list['cl_give_logo'] != ""){
				upload($this->_PDS, "",$argu['cl_no']."_0","D");
			}

			$query = "
				delete from ".TABLE_COMPANY_LIST."
				where
					cl_no   = '{$argu['cl_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;

		}

		### 승인내역상세보기 #########################################################################
		function get_cl_view($argu){
			$query = "
				select
					*
				from
					".TABLE_COMPANY_LIST."
				where
					cl_no   = '{$argu['cl_no']}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    //debug($row);
			    die($row->getMessage());
			    exit;
			}

			return $row;

		}


	}
?>