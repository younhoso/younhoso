<?
	class OnSupport{
		var $DB;
		var $_LIST_NUM = 10;

		# 생성자
		function OnSupport($db) {
			$this->DB = $db;
		}

		### 리스트 ###
		function get_onsupport_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = "where (1=1) ";
			if($argu['s_type']=="id"){ $addwhere .= " and (user_id like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="name"){ $addwhere .= " and (os_name like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="tel"){ $addwhere .= " and (os_tel like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="email"){ $addwhere .= " and (os_email like '%{$argu['keyword']}%' or os_rc_email like '%{$argu['keyword']}%' ) "; }

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_ONLINE_SUPPORT."
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
					".TABLE_ONLINE_SUPPORT." 
					$addwhere
				order by
					os_no desc
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
		function set_onsupport_insert($argu){

			$data = array(
				"user_id" => $argu["user_id"],
				"os_name" => $argu["os_name"],
				"os_email" => $argu["os_email"],
				"os_tel" => $argu["os_tel1"]."-".$argu["os_tel2"]."-".$argu["os_tel3"],
				"os_zip" => $argu["os_zip"],
				"os_add1" => $argu["os_add1"],
				"os_add2" => $argu["os_add2"],
				"os_memo" => $argu["os_memo"],
				"os_rc_email" => $argu["os_rc_email"],
				"os_agree" => "Y",
				"os_regdate" =>_NowTime,
			);
		
			$res = $this->DB->autoExecute(TABLE_ONLINE_SUPPORT, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
				//debug($res);
			    die($res->getMessage());
			    exit;
			}
			
			// $os_no=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
            $os_no = $this->DB->getOne($q);
			
			$data=array_merge($data,array("os_no"=>$os_no));

			return $data;

		}

		### 수정 ###
		function set_onsupport_modify($argu){
			
			$data = array(
				"os_name" => $argu["os_name"],
				"os_email" => $argu["os_email"],
				"os_tel" => $argu["os_tel1"]."-".$argu["os_tel2"]."-".$argu["os_tel3"],
				"os_zip" => $argu["os_zip"],
				"os_add1" => $argu["os_add1"],
				"os_add2" => $argu["os_add2"],
				"os_memo" => $argu["os_memo"],
				"os_rc_email" => $argu["os_rc_email"],
			);
			
			$res = $this->DB->autoExecute(TABLE_ONLINE_SUPPORT, $data, DB_AUTOQUERY_UPDATE, " os_no = '{$argu['os_no']}'");
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;
		}

		### 삭제 ###
		function set_onsupport_delete($argu){
			
			$query = "
				delete from ".TABLE_ONLINE_SUPPORT."
				where
					os_no   = '{$argu['os_no']}'
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
		function get_onsupport_view($argu){
			$query = "
				select
					*
				from
					".TABLE_ONLINE_SUPPORT."
				where
					os_no   = '{$argu['os_no']}'
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