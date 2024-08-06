<?
	class Give_story{
		var $DB;
		var $_LIST_NUM = 20;

		# 생성자
		function Give_story($db) {
			$this->DB = $db;
		}

		### 후원사연리스트 ########################################################
		function get_give_story_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = "where (1=1) ";
			if($argu['s_case']=="title"){ $addwhere .= " and gs_title like '%{$argu['s_string']}%' "; }
			if($argu['s_case']=="content"){ $addwhere .= " and gs_memo = '{$argu['s_string']}' "; }
			if($argu['s_case']=="name"){ $addwhere .= " and gs_name = '{$argu['s_string']}' "; }
			if($argu['gs_category']){ $addwhere .= " and gs_category = '{$argu['gs_category']}' "; }

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_GIVE_STORY."
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
					".TABLE_GIVE_STORY." 
					$addwhere
				order by
					gs_no desc
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
		function set_give_story_insert($argu){

			$data = array(
				"gs_category" => $argu["gs_category"],
				"gs_title" => $argu["gs_title"],
				"gs_name" => $argu["gs_name"],
				"gs_memo" => $argu["gs_memo"],
				"gs_regdate" =>_NowTime,
			);
		
			$res = $this->DB->autoExecute(TABLE_GIVE_STORY, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
				//debug($res);
			    die($res->getMessage());
			    exit;
			}
			
			// $gs_no=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$gs_no = $this->DB->getOne($q);
			
			$data=array_merge($data,array("gs_no"=>$gs_no));
			
			return $data;

		}

		### 후원사연수정 ####################################################################
		function set_give_story_modify($argu){
			

			$data = array(
				"gs_category" => $argu["gs_category"],
				"gs_title" => $argu["gs_title"],
				"gs_name" => $argu["gs_name"],
				"gs_memo" => $argu["gs_memo"],
			);
			
			$res = $this->DB->autoExecute(TABLE_GIVE_STORY, $data, DB_AUTOQUERY_UPDATE, " gs_no = '{$argu['gs_no']}'");
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			
			return true;
		}

		### 후원사연삭제 ##########################################################################
		function set_give_story_delete($argu){
			
			$query = "
				delete from ".TABLE_GIVE_STORY."
				where
					gs_no   = '{$argu['gs_no']}'
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
		function get_give_story_view($argu){
			$query = "
				select
					*
				from
					".TABLE_GIVE_STORY."
				where
					gs_no   = '{$argu['gs_no']}'
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