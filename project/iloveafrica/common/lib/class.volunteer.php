<?
	class Volunteer{
		
		var $DB;
		var $_LIST_NUM = 20;

		# 생성자
		function Volunteer($db) {
			$this->DB = $db;
		}

		#리스트
		function get_volunteer_list($argu,&$total,$limit = true){

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			/// 검색 쿼리
			$addwhere = "v_gubun = '{$argu['subpage']}'";
			if($argu['s_type']=="id"){ $addwhere .= " and user_id like '%{$argu['keyword']}%' "; }
			if($argu['s_type']=="name"){ $addwhere .= " and v_name like '%{$argu['keyword']}%' "; }
			if($argu['s_type']=="tel"){ $addwhere .= " and v_tel like '%{$argu['keyword']}%' "; }

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_VOLUNTEER."
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
					".TABLE_VOLUNTEER." 
				where
					$addwhere
				order by
					v_idx desc
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
		function set_volunteer_insert($argu){
			$v_kind="";

			foreach($argu["v_kind"] as $key => $value){
				$v_kind.=$value."|";
			}

			$argu["v_kind"] = substr($v_kind,0,-1);
			
			$data = array(
				"v_gubun" => $argu["v_gubun"],
				"user_id" => $argu["user_id"],
				"v_name" => $argu["v_name"],
				"v_tel" => $argu["v_tel1"]."-".$argu["v_tel2"]."-".$argu["v_tel3"],
				"v_email" => $argu["v_email1"]."@".$argu["v_email2"],
				"v_post" => $argu["v_post1"]."-".$argu["v_post2"],
				"v_addr1" => $argu["v_addr1"],
				"v_addr2" => $argu["v_addr2"],
				"v_kind" => $argu["v_kind"],
				"v_memo" => $argu["v_memo"],
				"v_memo2" => $argu["v_memo2"],
				"v_accept" => $argu["v_accept"],
				"reg_date" => _NowTime,
			);

			$res = $this->DB->autoExecute(TABLE_VOLUNTEER, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}
				
			// $v_idx=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$v_idx = $this->DB->getOne($q);
			
			$data=array_merge($data,array("v_idx"=>$v_idx));
			
			return $data;
		}

		#수정
		function set_volunteer_modify($argu){
			$v_kind="";

			foreach($argu["v_kind"] as $key => $value){
				$v_kind.=$value."|";
			}

			$argu["v_kind"] = substr($v_kind,0,-1);

			$data = array(
				"v_tel" => $argu["v_tel1"]."-".$argu["v_tel2"]."-".$argu["v_tel3"],
				"v_email" => $argu["v_email1"]."@".$argu["v_email2"],
				"v_post" => $argu["v_post1"]."-".$argu["v_post2"],
				"v_addr1" => $argu["v_addr1"],
				"v_addr2" => $argu["v_addr2"],
				"v_kind" => $argu["v_kind"],
				"v_memo" => $argu["v_memo"],
				"v_accept" => $argu["v_accept"],
			);

			$res = $this->DB->autoExecute(TABLE_VOLUNTEER, $data, DB_AUTOQUERY_UPDATE, " v_idx = '{$argu['v_idx']}'");
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			/*if($argu["v_accept"] == "Y"){
				
				$query = "
					select
						count(*)
					from
						".TABLE_VOLUNTEER_LIST."
					where
						v_idx   = '{$argu['v_idx']}'
				";

				$chk = $this->DB->getOne($query);
				if (DB::isError($chk)) {
					//debug($row);
					die($chk->getMessage());
					exit;
				}

				if($chk == 0){
					$argu["user_id"] = $argu["user_id"];
					$argu["vl_name"] = $argu["v_name"];
					$accept_chk = $this->set_vl_insert($argu);
					return $accept_chk;
				}
				else{
					return true;
				}
			}
			else{
			
				return true;
			}*/

			return true;

		}

		#삭제
		function set_volunteer_delete($argu){
			$query = "
				delete from ".TABLE_VOLUNTEER."
				where
					v_idx   = '{$argu['v_idx']}'
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
		function get_volunteer_view($argu){

			$query = "
				select
					*
				from
					".TABLE_VOLUNTEER."
				where
					v_idx   = '{$argu['v_idx']}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    //debug($row);
			    die($row->getMessage());
			    exit;
			}

			return $row;
		
		}

####### 자원봉사자 명단 start #############################################################

		### 리스트 ###
		function get_vl_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = "where (1=1) ";
			if($argu['s_type']=="id"){ $addwhere .= " and (user_id like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="name"){ $addwhere .= " and (vl_name like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="field"){ $addwhere .= " and (vl_field like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="place"){ $addwhere .= " and (vl_place like '%{$argu['keyword']}%') "; }
			if($argu['vl_sdate'] && $argu['vl_edate']){ $addwhere .= " and (vl_sdate >= '{$argu['vl_sdate']}' AND vl_sdate <= '{$argu['vl_sdate']}' or vl_edate >= '{$argu['vl_edate']}' AND vl_edate <= '{$argu['vl_edate']}') "; }

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_VOLUNTEER_LIST."
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
					".TABLE_VOLUNTEER_LIST." 
					$addwhere
				order by
					vl_idx desc
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
		function set_vl_insert($argu){

			$argu["vl_tel"] = $argu["vl_tel1"]."-".$argu["vl_tel2"]."-".$argu["vl_tel3"];
			
			// 주민/사업자 등록 번호 암호화
			$argu["vl_person"] = trim($argu["vl_person1"]).trim($argu["vl_person2"]);
			
			$cipher = new zm_Cipher;
			$argu["vl_person"] = $cipher -> encrypt($argu["vl_person"]);
			$cipher = new zm_Cipher_Close;

			$data = array(
				"vl_num" => $argu["vl_num"],
				"user_id" => $argu["user_id"],
				"vl_name" => $argu["vl_name"],
				"vl_person" => $argu["vl_person"],
				"vl_org" => $argu["vl_org"],
				"vl_tel" => $argu["vl_tel"],
				"vl_email" => $argu["vl_email"],
				"vl_field" => $argu["vl_field"],
				"vl_location" => $argu["vl_location"],
				"vl_place" => $argu["vl_place"],
				"vl_sdate" => $argu["vl_sdate"],
				"vl_edate" => $argu["vl_edate"],
				"vl_regdate" =>_NowTime,
			);
		
			$res = $this->DB->autoExecute(TABLE_VOLUNTEER_LIST, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
				//debug($res);
			    die($res->getMessage());
			    exit;
			}
			
			// $vl_idx=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$vl_idx = $this->DB->getOne($q);
			
			$data=array_merge($data,array("vl_idx"=>$vl_idx));
			
			return $data;

		}

		### 수정 ###
		function set_vl_modify($argu){

			$argu["vl_tel"] = $argu["vl_tel1"]."-".$argu["vl_tel2"]."-".$argu["vl_tel3"];
			
			// 주민/사업자 등록 번호 암호화
			$argu["vl_person"] = trim($argu["vl_person1"]).trim($argu["vl_person2"]);
			
			$cipher = new zm_Cipher;
			$argu["vl_person"] = $cipher -> encrypt($argu["vl_person"]);
			$cipher = new zm_Cipher_Close;
			
			$data = array(
				"vl_num" => $argu["vl_num"],
				"user_id" => $argu["user_id"],
				"vl_name" => $argu["vl_name"],
				"vl_person" => $argu["vl_person"],
				"vl_org" => $argu["vl_org"],
				"vl_tel" => $argu["vl_tel"],
				"vl_email" => $argu["vl_email"],
				"vl_field" => $argu["vl_field"],
				"vl_location" => $argu["vl_location"],
				"vl_place" => $argu["vl_place"],
				"vl_sdate" => $argu["vl_sdate"],
				"vl_edate" => $argu["vl_edate"]
			);
			
			$res = $this->DB->autoExecute(TABLE_VOLUNTEER_LIST, $data, DB_AUTOQUERY_UPDATE, " vl_idx = '{$argu['vl_idx']}'");
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;
		}

		### 삭제 ###
		function set_vl_delete($argu){
			
			$query = "
				delete from ".TABLE_VOLUNTEER_LIST."
				where
					vl_idx   = '{$argu['vl_idx']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;

		}

		### 상세보기 ###
		function get_vl_view($argu){
			$query = "
				select
					*
				from
					".TABLE_VOLUNTEER_LIST."
				where
					vl_idx   = '{$argu['vl_idx']}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    //debug($row);
			    die($row->getMessage());
			    exit;
			}

			/// 주민번호 복호화
			$cipher = new zm_Cipher;
			$vl_person = $cipher -> decrypt($row["vl_person"]);
			$cipher = new zm_Cipher_Close;

			$vl_person1 = substr($vl_person, 0, 6);
			$vl_person2 = substr($vl_person, -7);

			$row = array_merge($row, array(
				"vl_person1"=>$vl_person1,
				"vl_person2"=>$vl_person2
			));

			$vl_tel = explode("-",$row['vl_tel']);

			$row = array_merge($row, array(
				"vl_tel1"=>$vl_tel[0],
				"vl_tel2"=>$vl_tel[1],
				"vl_tel3"=>$vl_tel[2]
			));

			return $row;

		}

####### 자원봉사자 명단 end #############################################################

	}
?>