<?
	class Popup {
		var $DB;
		var $_LIST_NUM = 20;

		# 생성자
		function Popup($db) {
			$this->DB = $db;
		}

		#팝업등록#
		function set_popup_insert($argu){
			$mobile = $argu["p_mobile"];
			if( $mobile == "Y" ) {
				$tdata = array(
					"p_mobile" => "N"
				);

				$res = $result = $this->DB->autoExecute(TABLE_POPUP, $tdata, DB_AUTOQUERY_UPDATE, " p_idx > 0 ");
			}

			$data = array(
				"p_title"	=> $argu['p_title'],
				"p_content"	=> txtParse($argu["p_content"],1),
				"p_use"		=> $argu['p_use'],
				"p_mobile"	=> $argu["p_mobile"],
				"p_top"		=> $argu['p_top'],
				"p_left"	=> $argu['p_left'],
				"p_width"	=> $argu['p_width'],
				"p_height"	=> $argu['p_height'],
				"p_regdate"	=> _NowTime
			);
			
			$sth = $this->DB->autoPrepare(TABLE_POPUP, array_keys($data), DB_AUTOQUERY_INSERT);
			$res = $this->DB->execute($sth, array_values($data));

			if (DB::isError($res)) {
				go_url("", $res->getMessage());
				exit;
			}
			
			// $p_idx=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
            $p_idx = $this->DB->getOne($q);
			
			$data=array_merge($data,array("p_idx"=>$p_idx));

			return $data;

		}


		#팝업수정#
		function set_popup_modify($argu){
			$mobile = $argu["p_mobile"];
			if( $mobile == "Y" ) {
				$tdata = array(
					"p_mobile" => "N"
				);

				$res = $result = $this->DB->autoExecute(TABLE_POPUP, $tdata, DB_AUTOQUERY_UPDATE, " p_idx > 0 ");
			}
			
			$data = array(
				"p_title"	=> $argu['p_title'],
				"p_content"	=> txtParse($argu["p_content"],1),
				"p_use"		=> $argu['p_use'],
				"p_mobile"	=> $argu["p_mobile"],
				"p_top"		=> $argu['p_top'],
				"p_left"	=> $argu['p_left'],
				"p_width"	=> $argu['p_width'],
				"p_height"	=> $argu['p_height']
			);
			
			$res = $result = $this->DB->autoExecute(TABLE_POPUP, $data, DB_AUTOQUERY_UPDATE, " p_idx = '{$argu['p_idx']}' ");

			if (DB::isError($res)) {
				go_url("", $res->getMessage());
				exit;
			}

			return true;
		}


		#팝업삭제#
		function set_popup_delete($p_idx){
			$query = "DELETE FROM ".TABLE_POPUP." WHERE p_idx = '".$p_idx."'";
			
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    go_url("", $res->getMessage());
			    exit;
			}

			return true;
		}


		#팝업리스트삭제#
		function set_popu_delete_list($argu){
			if(count($argu["chk"]) > 0){
				for($i = 0; $i < count($argu["chk"]); $i++){
					$p_idx = $argu["chk"][$i];
					$_list = $this -> set_popup_delete($p_idx);
				}
				return true;
			}
			else{
			    go_url("","삭제할데이터가 없습니다.");
				exit;
			}
		}


		#팝업리스트#
		function get_popup_list($argu,&$total,$limit = true){
			$addwhere = " where (1=1) ";

			/// 검색쿼리
			if($argu['s_type']){	$addwhere .= " and {$argu['s_type']} like '%{$argu['keyword']}%' ";	}

			$query = "
				select
					count(*)
				from
					".TABLE_POPUP."
				".$addwhere;

			$res = $total = $this->DB->getOne($query);
			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}

			$query = "
				select
					*
				from
					".TABLE_POPUP."
				".$addwhere."
				order by
					p_regdate desc
			";
			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_LIST_NUM.",".$this->_LIST_NUM;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}

			return $list;

		}


		#팝업상세보기
		function get_popup_view($p_idx){
			$query = "SELECT 
						* 
					  FROM ".TABLE_POPUP." 
					  where p_idx = '".$p_idx."'";

			$res = $row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}

			return $row;
			
		}

		
		#팝업메인리스트#
		function get_main_popup(){
			$addwhere = "WHERE (p_use = 'Y')";

			$query = "SELECT 
						p_idx
						,p_title
						,p_top 
						,p_left 
						,p_width 
						,p_height
						,p_content
					  FROM ".TABLE_POPUP." 
					  ".$addwhere." 
					  ORDER BY p_regdate asc";
			
			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}

			return $list;
		}

	
	}
?>