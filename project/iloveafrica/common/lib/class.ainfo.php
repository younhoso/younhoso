<?
	class Ainfo{
		var $DB;
		var $_LIST_NUM = 20;
		//var $_PDS = _PDS;
		//var $_PDS_SUB = "company/";

		# 생성자
		function Ainfo($db) {
			$this->DB = $db;
			//$this->_PDS .= $this->_PDS_SUB;
		}

		### 리스트 ########################################################
		function get_ainfo_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = "where (ai_continent = '{$argu['c_code']}') ";
			if($argu['s_type']=="ai_country"){ $addwhere .= " and (ai_country like '%{$argu['keyword']}%') "; }

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_AFRICA_INFO."
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
					".TABLE_AFRICA_INFO." 
					$addwhere
				order by
					ai_no desc
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
		function set_ainfo_insert($argu){

			$data = array(
				"ai_continent" => $argu["ai_continent"],	//대륙코드
				"ai_country" => $argu["ai_country"],		//국가명
				"ai_memo1" => $argu["ai_memo1"],			//나라소개
				"ai_memo2" => $argu["ai_memo2"],			//나라설명
				"ai_memo3" => $argu["ai_memo3"],			//통관절차
				"ai_latlng" => $argu["ai_latlng"],			//구글맵좌표
				"ai_regdate" => _NowTime,
			);
		
			$res = $this->DB->autoExecute(TABLE_AFRICA_INFO, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
			    go_url("","등록되지 않았습니다.");
			    exit;
			}
			
			//$ai_no=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$ai_no = $this->DB->getOne($q);
			
			$data=array_merge($data,array("ai_no"=>$ai_no));
			
			return $data;

		}

		### 수정 ####################################################################
		function set_ainfo_modify($argu){

			$data = array(
				"ai_country" => $argu["ai_country"],		//국가명
				"ai_memo1" => $argu["ai_memo1"],			//나라소개
				"ai_memo2" => $argu["ai_memo2"],			//나라설명
				"ai_memo3" => $argu["ai_memo3"],			//통관절차
				"ai_latlng" => $argu["ai_latlng"],			//구글맵좌표
				"ai_regdate" => _NowTime,
			);
			
			$res = $this->DB->autoExecute(TABLE_AFRICA_INFO, $data, DB_AUTOQUERY_UPDATE, " ai_no = '{$argu['ai_no']}'");
				if (DB::isError($res)) {
					go_url("","수정되지 않았습니다.");
					exit;
				}
		
			return true;
		}

		### 삭제 ##########################################################################
		function set_ainfo_delete($argu){
			
			$query = "
				delete from ".TABLE_AFRICA_INFO."
				where
					ai_no   = '{$argu['ai_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    go_url("", $res->getMessage());
			    exit;
			}

			return true;

		}

		### 상세보기 #########################################################################
		function get_ainfo_view($argu){

			global $_adminpage;

			if($argu["ai_no"]==""){
				$query = "
					select
						*
					from
						".TABLE_AFRICA_INFO."
					where
						(ai_continent = '{$argu['c_code']}') 
					order by ai_country asc limit 0,1
				";
			}
			else{
				$query = "
					select
						*
					from
						".TABLE_AFRICA_INFO."
					where
						ai_no   = '{$argu['ai_no']}'
				";
			}

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    go_url("", $res->getMessage());
			    exit;
			}

			return $row;

		}


		### 리스트 전체보기 ########################################################
//		function get_ainfo_list_all(&$ctotal){
//			
//			/// 검색 쿼리
//			$addwhere = "where (ai_continent = '{$c_code}') ";
//
//			$query = "
//				select
//					count(*)
//				from
//					".TABLE_AFRICA_INFO."
//					$addwhere
//			";
//
//			$res = $ctotal = $this->DB->getOne($query);
//
//			if (DB::isError($res)) {
//				go_url("","목록을 불러올 수 없습니다!\\n[".$res->getMessage()."]");
//			    exit;
//			}
//
//			$query = "
//				select
//					*
//				from
//					".TABLE_AFRICA_INFO." 
//					$addwhere
//				order by
//					ai_country asc
//				";
//
//			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
//			if (DB::isError($res)) {
//				go_url("","목록을 불러올 수 없습니다!\\n[".$list->getMessage()."]");
//			    exit;
//			}
//
//			return $list;
//
//		}

		function get_ainfo_list_all($c_code,&$ctotal){
		 
			/// 검색 쿼리
			$addwhere = "where (ai_continent = '{$c_code}') ";

			$query = "
				select
					count(*)
				from
					".TABLE_AFRICA_INFO."
					$addwhere
			";

			$res = $ctotal = $this->DB->getOne($query);
			if (DB::isError($res)) {
				go_url("","목록을 불러올 수 없습니다!\\n[".$res->getMessage()."]");
				exit;
			}

			$query = "
				select
					*
				from
					".TABLE_AFRICA_INFO." 
					$addwhere
				order by
					ai_country asc
				";

			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($list)) {
				go_url("","목록을 불러올 수 없습니다!\\n[".$list->getMessage()."]");
				exit;
			}

			return $list;
		}


	}
?>