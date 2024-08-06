<?
	class Vt_app{
		var $DB;
		var $_LIST_NUM = 10;

		# 생성자
		function Vt_app($db) {
			$this->DB = $db;
		}

		#리스트
		function get_vtapp_list($argu,&$total,$limit = true){

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			/// 검색 쿼리
			$addwhere = "(1=1)";
			if($argu['s_type']=="id"){ $addwhere .= " and (user_id like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="name"){ $addwhere .= " and (vta_name like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="tel"){ $addwhere .= " and (vta_hp like '%{$argu['keyword']}%' or vta_tel like '%{$argu['keyword']}%') "; }

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_VT_APP."
				where
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
					".TABLE_VT_APP." 
				where
					$addwhere
				order by
					vta_no desc
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

		#등록
		function set_vtapp_insert($argu){

			$vta_kind="";
			foreach($argu["vta_kind"] as $key => $value){
				$vta_kind.=$value."|";
			}

			$argu["vta_kind"] = substr($vta_kind,0,-1);
			
			$argu["vta_person"] = trim($argu["vta_person"]);
			// 주민/사업자 등록 번호 암호화
			$cipher = new zm_Cipher;
			$argu["vta_person"] = $cipher -> encrypt($argu["vta_person"]);
			$cipher = new zm_Cipher_Close;


			$data = array(
				"user_id" => $argu["user_id"],
				"vta_name" => $argu["vta_name"],
				"vta_hp" => $argu["vta_hp"],
				"vta_person" => $argu["vta_person"],
				"vta_hp" => $argu["vta_hp1"]."-".$argu["vta_hp2"]."-".$argu["vta_hp3"],
				"vta_tel" => $argu["vta_tel1"]."-".$argu["vta_tel2"]."-".$argu["vta_tel3"],
				"vta_post" => $argu["vta_post"],
				"vta_add1" => $argu["vta_add1"],
				"vta_add2" => $argu["vta_add2"],
				"vta_email" => $argu["vta_email1"]."@".$argu["vta_email2"],
				"vta_job" => $argu["vta_job"],
				"vta_major" => $argu["vta_major"],
				"vta_kind" => $argu["vta_kind"],
				"vta_sdate" => $argu["vta_sdate"],
				"vta_edate" => $argu["vta_edate"],
				"vta_memo" => $argu["vta_memo"],
				"vta_status" => $argu["vta_status"],
				"vta_regdate" => _NowTime,
			);

			$res = $this->DB->autoExecute(TABLE_VT_APP, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
			    debug($res);
			    die($res->getMessage());
			    exit;
			}
				
			// $vta_no=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$vta_no = $this->DB->getOne($q);
			
			$data=array_merge($data,array("vta_no"=>$vta_no));

			//활동경험 상세 정보 insert
			if(count($argu["vte_organ"]) > 0){
				foreach($argu["vte_organ"] as $key => $value){

						if($argu["vte_organ"][$key] != ""){
						$data = array_merge(array(
							"vta_no"	=> $data["vta_no"],
							"vte_organ"    => $argu["vte_organ"][$key],
							"vte_memo"    => $argu["vte_memo"][$key],
							"vte_sdate" => $argu["vte_sdate"][$key],
							"vte_edate"     => $argu["vte_edate"][$key],
						));

						$res = $this->DB->autoExecute(TABLE_VT_EX, $data, DB_AUTOQUERY_INSERT);
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
	
		#수정
		function set_vtapp_modify($argu){

			$vta_kind="";
			foreach($argu["vta_kind"] as $key => $value){
				$vta_kind.=$value."|";
			}

			$argu["vta_kind"] = substr($vta_kind,0,-1);

			$argu["vta_person"] = trim($argu["vta_person"]);
			// 주민/사업자 등록 번호 암호화
			$cipher = new zm_Cipher;
			$argu["vta_person"] = $cipher -> encrypt($argu["vta_person"]);
			$cipher = new zm_Cipher_Close;

			$data = array(
				"vta_hp" => $argu["vta_hp"],
				"vta_person" => $argu["vta_person"],
				"vta_hp" => $argu["vta_hp1"]."-".$argu["vta_hp2"]."-".$argu["vta_hp3"],
				"vta_tel" => $argu["vta_tel1"]."-".$argu["vta_tel2"]."-".$argu["vta_tel3"],
				"vta_post" => $argu["vta_post"],
				"vta_add1" => $argu["vta_add1"],
				"vta_add2" => $argu["vta_add2"],
				"vta_email" => $argu["vta_email1"]."@".$argu["vta_email2"],
				"vta_job" => $argu["vta_job"],
				"vta_major" => $argu["vta_major"],
				"vta_kind" => $argu["vta_kind"],
				"vta_sdate" => $argu["vta_sdate"],
				"vta_edate" => $argu["vta_edate"],
				"vta_memo" => $argu["vta_memo"],
				"vta_status" => $argu["vta_status"],
			);

			$res = $this->DB->autoExecute(TABLE_VT_APP, $data, DB_AUTOQUERY_UPDATE, " vta_no = '{$argu['vta_no']}'");
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}


			//활동경험 상세 정보 update
			foreach($argu["vte_organ"] as $key => $value){
				if($argu['vte_no'][$key]=="new"){
					$data = array_merge(array(
						"vta_no"	=> $argu["vta_no"],
						"vte_organ"    => $argu["vte_organ"][$key],
						"vte_memo"    => $argu["vte_memo"][$key],
						"vte_sdate" => $argu["vte_sdate"][$key],
						"vte_edate"     => $argu["vte_edate"][$key],
					));

					$res = $this->DB->autoExecute(TABLE_VT_EX, $data, DB_AUTOQUERY_INSERT);
					if (DB::isError($res)) {
						//debug($res);
						die($res->getMessage());
						exit;
					}
				}else{

					$data = array_merge(array(
						"vte_organ"    => $argu["vte_organ"][$key],
						"vte_memo"    => $argu["vte_memo"][$key],
						"vte_sdate" => $argu["vte_sdate"][$key],
						"vte_edate"     => $argu["vte_edate"][$key],
					));

					$res = $this->DB->autoExecute(TABLE_VT_EX, $data, DB_AUTOQUERY_UPDATE, " vte_no = '{$argu['vte_no'][$key]}'");
					if (DB::isError($res)) {
						//debug($res);
						die($res->getMessage());
						exit;
					}
				}
			}

			return true;

		}

		#삭제
		function set_vtapp_delete($argu){
			$query = "
				delete from ".TABLE_VT_APP."
				where
					vta_no   = '{$argu['vta_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			//활동경험 상세 정보 delete
			$query = "
				delete from ".TABLE_VT_EX."
				where
					vta_no  = '{$argu['vta_no']}'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;
		
		}

		#상세보기
		function get_vtapp_view($argu){

			$query = "
				select
					*
				from
					".TABLE_VT_APP."
				where
					vta_no   = '{$argu['vta_no']}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    //debug($row);
			    die($row->getMessage());
			    exit;
			}

			/// 주민번호 복호화
			$cipher = new zm_Cipher;
			$vta_person = $cipher -> decrypt($row["vta_person"]);
			$cipher = new zm_Cipher_Close;

			$vta_person1 = substr($vta_person, 0, 6);
			$vta_person2 = substr($vta_person, -7);

			$row = array_merge($row, array(
				"vta_person"=>$vta_person
			));

			return $row;
		
		}

		/*****
		 * 활동겨험 상세정보를 가져온다.
		 *****/
		function get_vtex_view($vta_no){
			
			$query = "
				select
					*
				from
					".TABLE_VT_EX."
				where
					vta_no = '{$vta_no}'
				order by vte_no asc
			";
			$row = $this->DB->getAll($query,array(),DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				//print_r($row);
				die($row->getMessage());
			}

			return $row;
		}

		/*****
		 * 활동겨험 모집분야를 삭제한다.
		 *****/
		function set_vtex_delete($argu){
			
			$query = "
				delete from ".TABLE_VT_EX."
				where
					vte_no  = '{$argu['vte_no']}'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;
		}

	}
?>