<?
	class VtClub{
		var $DB;
		var $_LIST_NUM = 10;
		var $_PDS = _PDS;
		var $_PDS_SUB = "vtclub/";

		# 생성자
		function VtClub($db) {
			$this->DB = $db;
			$this->_PDS .= $this->_PDS_SUB;
		}

	###### 클럽설정 start ##############################################
	function get_vtclub_conf_view(){
			$query = "
				select
					*
				from
					".TABLE_VT_CLUB_CONFIG."
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    //debug($row);
			    die($row->getMessage());
			    exit;
			}
			
			return $row;
	}

	function set_vtclub_conf_modify($argu){
			$data = array(
				"vcc_sort" => $argu["vcc_sort"],
			);
			
			$res = $this->DB->autoExecute(TABLE_VT_CLUB_CONFIG, $data, DB_AUTOQUERY_UPDATE, " vcc_no = 1");
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;
	}
	###### 클럽설정 end ##############################################
		
	###### 클럽내역 start ##############################################

	### 리스트 ###
	function get_vtclub_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = "where (1=1) ";
			if($argu['s_type']=="id"){ $addwhere .= " and user_id like '%{$argu['keyword']}%' "; }
			if($argu['s_type']=="name"){ $addwhere .= " and vc_name like '%{$argu['keyword']}%' "; }
			if($argu['s_type']=="tel"){ $addwhere .= " and vc_tel like '%{$argu['keyword']}%' "; }
			if($argu['status']){ $addwhere .= " and vc_status = 'Y' "; }
			
			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			$sort = $this->get_vtclub_conf_view();

			if($sort["vcc_sort"] == "N"){
				$addsort = "vc_no";
			}
			else{
				$addsort = "vc_mem_count";
			}

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_VT_CLUB."
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
					".TABLE_VT_CLUB." 
					$addwhere
				order by
					vc_week asc, $addsort desc
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

	### 등록 ###
		function set_vtclub_insert($argu){

			global $_adminpage;

			// 첨부파일 argu 를 정리한다.
			if(is_array($_FILES['vc_img']['tmp_name'])){
				foreach($_FILES['vc_img'] as $_FILE_KEY => $tmp){
					foreach($tmp as $_FILE_NO => $_FILE_VALUE){
						$_FILE[$_FILE_NO][$_FILE_KEY] = $_FILE_VALUE;
					}
				}
			}

			$argu["vc_week"]=($argu["vc_week"] == "Y") ? "Y" : "N";

			$argu['user_id'] = ($_adminpage) ? $argu['user_id'] : $_SESSION['user_id'];

			$data = array(
				"user_id" => $argu["user_id"],
				"vc_name" => $argu["vc_name"],
				"vc_president" => $argu["vc_president"],
				"vc_mem_count" => $argu["vc_mem_count"],
				"vc_email" => $argu["vc_email"],
				"vc_tel" => $argu["vc_tel1"]."-".$argu["vc_tel2"]."-".$argu["vc_tel3"],
				"vc_home" => $argu["vc_home"],
				"vc_zip" => $argu["vc_zip"],
				"vc_add1" => $argu["vc_add1"],
				"vc_add2" => $argu["vc_add2"],
				"vc_memo1" => $argu["vc_memo1"],
				"vc_memo2" => $argu["vc_memo2"],
				"vc_agree" => "Y",
				"vc_regdate" =>_NowTime,
			);

			if($_adminpage){
				$data = array_merge($data, array(
					"vc_status" => $argu["vc_status"],
					"vc_week" => $argu["vc_week"]
				));
			}
		
			$res = $this->DB->autoExecute(TABLE_VT_CLUB, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
				//debug($res);
			    die($res->getMessage());
			    exit;
			}
			
			// $vc_no=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$vc_no = $this->DB->getOne($q);
			
			$data=array_merge($data,array("vc_no"=>$vc_no));

			if($argu["vc_week"] == "Y"){
				$query = "
					update ".TABLE_VT_CLUB." set
						vc_week = 'N'
					where
						vc_no   <> '{$data['vc_no']}'
				";

				$res = $this->DB->query($query);
				if (DB::isError($res)) {
					//debug($res);
					die($res->getMessage());
					exit;
				}
				
			}
			
			// 첨부파일 저장
			// TODO : board_config 의 media 여부에 따라 허용 파일 타입을 필터링 해주는 부분이 필요하다.
			if(is_array($_FILE)){
				foreach($_FILE as $_FILE_NO => $_FILE_VALUE){
					//$data['bf_name'] = upload_($this->_PDS, $_FILE_VALUE,  $data['b_no']."_".$_FILE_NO, "U", &$M);
					if($_FILE_VALUE !== null && $_FILE_VALUE[error] == 0 && $_FILE_VALUE[size] > 0 ){// 첨부파일이 있을경우

						if(upload($this->_PDS, $_FILE_VALUE,$data['vc_no']."_".$_FILE_NO,"U")){ // 첨부파일 업로드에 성공했을경우
							$data["vc_img"] = $_FILE_VALUE[name];
						}else{ // 첨부파일 업로드에 실패했을경우 alert 과 동시에 작업을 중단하고 이전페이지로 돌아간다.
							go_url("","파일 업로드에 실패했습니다.");
							exit;
						}

						$data_file = array(
							"vc_img" => $data['vc_img'],
						);

						$res = $this->DB->autoExecute(TABLE_VT_CLUB, $data_file, DB_AUTOQUERY_UPDATE, " vc_no = '{$data['vc_no']}'");
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

		### 수정 ###
		function set_vtclub_modify($argu){

			global $_adminpage;
			
			// 첨부파일 argu 를 정리한다.
			if(is_array($_FILES['vc_img']['tmp_name'])){
				foreach($_FILES['vc_img'] as $_FILE_KEY => $tmp){
					foreach($tmp as $_FILE_NO => $_FILE_VALUE){
						$_FILE[$_FILE_NO][$_FILE_KEY] = $_FILE_VALUE;
					}
				}
			}

			$argu['user_id'] = ($_adminpage) ? $argu['user_id'] : $_SESSION['user_id'];

			$argu["vc_week"]=($argu["vc_week"] == "Y") ? "Y" : "N";

			$data = array(
				"user_id" => $argu["user_id"],
				"vc_name" => $argu["vc_name"],
				"vc_president" => $argu["vc_president"],
				"vc_mem_count" => $argu["vc_mem_count"],
				"vc_email" => $argu["vc_email"],
				"vc_tel" => $argu["vc_tel1"]."-".$argu["vc_tel2"]."-".$argu["vc_tel3"],
				"vc_home" => $argu["vc_home"],
				"vc_zip" => $argu["vc_zip"],
				"vc_add1" => $argu["vc_add1"],
				"vc_add2" => $argu["vc_add2"],
				"vc_memo1" => $argu["vc_memo1"],
				"vc_memo2" => $argu["vc_memo2"]
			);

			if($_adminpage){
				$data = array_merge($data, array(
					"vc_status" => $argu["vc_status"],
					"vc_week" => $argu["vc_week"]
				));
			}
			
			$res = $this->DB->autoExecute(TABLE_VT_CLUB, $data, DB_AUTOQUERY_UPDATE, " vc_no = '{$argu['vc_no']}'");
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			if($argu["vc_week"] == "Y"){
				$query = "
					update ".TABLE_VT_CLUB." set
						vc_week = 'N'
					where
						vc_no   <> '{$argu['vc_no']}'
				";

				$res = $this->DB->query($query);
				if (DB::isError($res)) {
					//debug($res);
					die($res->getMessage());
					exit;
				}
			}

			// 첨부파일 저장
			// TODO : board_config 의 media 여부에 따라 허용 파일 타입을 필터링 해주는 부분이 필요하다.
			if(is_array($_FILE)){
				foreach($_FILE as $_FILE_NO => $_FILE_VALUE){
					//$data['bf_name'] = upload_($this->_PDS, $_FILE_VALUE,  $data['b_no']."_".$_FILE_NO, "U", &$M);
					if($_FILE_VALUE !== null && $_FILE_VALUE[error] == 0 && $_FILE_VALUE[size] > 0 ){// 첨부파일이 있을경우
						upload($this->_PDS, "",$argu['vc_no']."_".$_FILE_NO,"D");

						if(upload($this->_PDS, $_FILE_VALUE,$argu['vc_no']."_".$_FILE_NO,"U")){ // 첨부파일 업로드에 성공했을경우
							$data["vc_img"] = $_FILE_VALUE[name];
						}else{ // 첨부파일 업로드에 실패했을경우 alert 과 동시에 작업을 중단하고 이전페이지로 돌아간다.
							go_url("","파일 업로드에 실패했습니다.");
							exit;
						}

						$data_file = array(
							"vc_img" => $data['vc_img'],
						);

						$res = $this->DB->autoExecute(TABLE_VT_CLUB, $data_file, DB_AUTOQUERY_UPDATE, " vc_no = '{$argu['vc_no']}'");
						if (DB::isError($res)) {
						    //debug($res);
						    die($res->getMessage());
						    exit;
						}
					}
				}
			}
			
			if(count($argu['del_file']) > 0){
				upload($this->_PDS, "",$argu['vc_no']."_0","D");;
				$del_file = array(
					"vc_img" => null,
				);

				$res = $this->DB->autoExecute(TABLE_VT_CLUB, $del_file, DB_AUTOQUERY_UPDATE, " vc_no = '{$argu['vc_no']}'");
				if (DB::isError($res)) {
					//debug($res);
					die($res->getMessage());
					exit;
				}
			}
			
			return $data;
		}

		### 삭제 ###
		function set_vtclub_delete($argu){
			

			$file_list = $this->get_vtclub_view($argu);
			if($file_list['vc_img'] != ""){
				upload($this->_PDS, "",$argu['vc_no']."_0","D");
			}

			$query = "
				delete from ".TABLE_VT_CLUB."
				where
					vc_no   = '{$argu['vc_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;

		}

		### 상세내역보기 ###
		function get_vtclub_view($argu){
			$query = "
				select
					*
				from
					".TABLE_VT_CLUB."
				where
					vc_no   = '{$argu['vc_no']}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    //debug($row);
			    die($row->getMessage());
			    exit;
			}

			return $row;

		}
	

	###### 클럽내역 end ##############################################

	}
?>