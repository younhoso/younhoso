<?
	class Fsupport{
		var $DB;
		var $_LIST_NUM = 8;

		# 생성자
		function Fsupport($db) {
			$this->DB = $db;
		}

		### 후원사연리스트 ########################################################
		function get_fs_list($argu,&$total,$limit = true){

			global $_adminpage;
			
			/// 검색 쿼리
			if(!$_adminpage){
				$addwhere = "where (f_type = '{$argu['f_type']}') and (f_chk = 'Y') ";
			}
			else{
				$addwhere = "where (f_type = '{$argu['f_type']}') ";
			}
			if($argu['s_case']=="f_name"){ $addwhere .= " and f_name like '%{$argu['keyword']}%' "; }
			if($argu['s_case']=="user_id"){ $addwhere .= " and user_id like '%{$argu['keyword']}%' "; }
			if($argu['s_case']=="f_tel"){ $addwhere .= " and f_tel like '%{$argu['keyword']}%' "; }
			if($argu['s_case']=="f_email"){ $addwhere .= " and f_email like '%{$argu['keyword']}%' "; }

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_FANCLUB_SUPPORT."
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
					".TABLE_FANCLUB_SUPPORT." 
					$addwhere
				order by
					f_no desc
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

		### 후원사연등록 #########################################################
		function set_fs_insert($argu){

			$data = array(
				"user_id" => $argu["user_id"],
				"f_type" => $argu["f_type"],
				"f_name" => $argu["f_name"],
				"f_man" => $argu["f_man"],
				"f_star" => $argu["f_star"],
				"f_price" => $argu["f_price"],
				"f_tel" => $argu["f_tel"],
				"f_email" => $argu["f_email"],
				"f_content" => $argu["f_content"],
				"f_memo" => $argu["f_memo"],
				"f_chk" => "N",
				"f_regdate" =>_NowTime,
				"f_kind" => $argu["f_kind"],
			);
		
			$res = $this->DB->autoExecute(TABLE_FANCLUB_SUPPORT, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
				//debug($res);
			    die($res->getMessage());
			    exit;
			}
			
			// $f_no=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$f_no = $this->DB->getOne($q);
			
			$data=array_merge($data,array("f_no"=>$f_no));
			
			return $data;

		}

		### 후원사연수정 ####################################################################
		function set_fs_modify($argu){
			

			if($argu["f_chk"] == "Y"){
				$f_chkdate = _NowTime;
			}
			else{
				$argu["f_chk"] = "N";
			}
			
			/*
			$data = array(
				"f_name" => $argu["f_name"],
				"f_man" => $argu["f_man"],
				"f_star" => $argu["f_star"],
				"f_price" => $argu["f_price"],
				"f_tel" => $argu["f_tel"],
				"f_content" => $argu["f_content"],
				"f_memo" => $argu["f_memo"],
				"f_chk" => $argu["f_chk"],
				"f_chkdate" => $f_chkdate,
				"f_kind" => $argu["f_kind"],
			);*/

			$data = array(
				"f_chk" => $argu["f_chk"],
				"f_chkdate" => $f_chkdate,
			);

			
			$res = $this->DB->autoExecute(TABLE_FANCLUB_SUPPORT, $data, DB_AUTOQUERY_UPDATE, " f_no = '{$argu['f_no']}'");
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			
			return true;
		}

		### 후원사연삭제 ##########################################################################
		function set_fs_delete($argu){
			
			$query = "
				delete from ".TABLE_FANCLUB_SUPPORT."
				where
					f_no   = '{$argu['f_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;

		}

		### 후원사연상세보기 #########################################################################
		function get_fs_view($argu){
			$query = "
				select
					*
				from
					".TABLE_FANCLUB_SUPPORT."
				where
					f_no   = '{$argu['f_no']}'
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