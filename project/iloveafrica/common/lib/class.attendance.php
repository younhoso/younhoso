<?
	class Attendance{
		var $DB;
		var $_LIST_NUM = 20;
		var $_user_id;

		# 생성자
		function Attendance($db) {
			$this->DB = $db;
			$this->_user_id = ($_SESSION['user_id']) ? $_SESSION['user_id'] : $_SESSION['guest_id'];
		}



		### 리스트 ########################################################
		function get_att_list($argu,&$total,$limit = true){
			/// 검색 쿼리
			$addwhere = "having (1=1) ";
			if($argu['s_type']=="user_id"){ $addwhere .= " and (user_id like '%{$argu['keyword']}%') "; }

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_ATTENDANCE."
					group by user_id 
					$addwhere
			";

			$res = $total = $this->DB->getOne($query);

			if (DB::isError($res)) {
				go_url("","목록을 불러오지 못했습니다.");
			    exit;
			}

			$query = "
				select
					count(*) AS cnt, user_id
				from
					".TABLE_ATTENDANCE." 
					group by user_id 
					$addwhere
				order by
					cnt desc
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

		### 등록 #########################################################
		function set_att_insert($argu){

//			$user_id = $argu["user_id"];
//			$date = $argu["data"];
//			$chk = $this->DB->get_att_view($user_id,$date);
			
			$data = array(
				"user_id" => $argu["user_id"],	//카테고리
				"a_regdate" => _NowTime,			//출석일
			);
		
			$res = $this->DB->autoExecute(TABLE_ATTENDANCE, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
			    go_url("","등록되지 않았습니다.");
			    exit;
			}
			
		
			return true;

		}



		### 상세보기 #########################################################################
		function get_att_view($user_id,$date){

			global $_adminpage;

			$query = "
				select
					*
				from
					".TABLE_ATTENDANCE."
				where
					(user_id   = '{$user_id}') and (substring(a_regdate,1,10) = '{$date}')
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    go_url("", $res->getMessage());
			    exit;
			}

			return $row;

		}




	}
?>