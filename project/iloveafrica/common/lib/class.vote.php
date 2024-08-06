<?
	class voteList {
		var $DB;
		var $_listnum = 20;
		var $_user_id;

		# 생성자
		function voteList($db) {
			$this->DB = $db;
			$this->_user_id = ($_SESSION['user_id']) ? $_SESSION['user_id'] : $_SESSION['guest_id'];
		}

		/*****
		 * 추천을 등록한다.
		 *****/
		 function set_vote_insert($argu){

			// 컨텐츠명 받기
			switch($argu["vl_type"]){
				case "1":
					$obj = new Shop($this->DB);
					$_row = $obj -> get_item_view($argu['c_no']);
					$argu['c_name'] = $_row['si_name'];
					$_contents = $_row['si_memo'];
					break;
				case "2":
					$obj = new Campain($this->DB);
					$_row = $obj -> get_campain_conf_view($argu['c_no']);
					$argu['c_name'] = $_row['cc_title'];
					$_contents = $_row['cc_memo'];
					break;
			}

			$_contents = txtParse($_contents,2);
			 
		 	//변수 설정
			$argu['vl_email'] = $argu['vl_email1']."@".$argu['vl_email2'];
			$argu['vl_send_email'] = $argu['vl_send_email1']."@".$argu['vl_send_email2'];
			 
			$data = array(
				"vl_type"    => $argu['vl_type'],
				"c_no"       => $argu['c_no'],
				"c_name"       => $argu['c_name'],
				"user_id"    => $this->_user_id,
				"vl_name"   => $argu['vl_name'],
				"vl_email" => $argu['vl_email'],
				"vl_title"      => $argu['vl_title'],
				"vl_memo"      => txtParse($argu["vl_memo"],1),
				"vl_send_name"      => $argu['vl_send_name'],
				"vl_send_email"      => $argu['vl_send_email'],
				"vl_agree"      => $argu['vl_agree'],
				"vl_ip"      => $_SERVER['REMOTE_ADDR'],
				"vl_regdate"      => _NowTime
			);
			
			$res = $this->DB->autoExecute(TABLE_VOTE_LIST, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
				go_url("","추천이 되지 않았습니다!\\n[".$res->getMessage()."]");
				exit;
			}

			/// 메일 발송 내용 처리
			$_memo = nl2br($argu["vl_memo"]);
			$_memo .= $_contents;
			
			/// 메일 보내기
			return mailer($argu['vl_send_name'], $argu['vl_send_email'], $argu['vl_email'], $argu['vl_title'], $_memo, 1);
		 }

		/*****
		 * 추천 목록을 가져온다.
		 *****/
		function get_vote_list($argu,&$total,$limit = true){

			$addwhere = " where vl_type = '".$argu['vl_type']."' ";

			if($argu['s_string']){ $addwhere .= " and {$argu['s_case']} = '{$argu['s_string']}' "; }

			$query = "
				select
					count(*)
				from
					".TABLE_VOTE_LIST." 
				$addwhere";

			$res = $total = $this->DB->getOne($query,array());

			if (DB::isError($res)) {
				go_url("","목록을 가져올 수 없습니다!\\n[".$res->getMessage()."]");
				exit;
			}

			$query = "
				select
					*
				from
					".TABLE_VOTE_LIST."
				$addwhere
				order by
					vl_regdate desc";
			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_listnum.",".$this->_listnum;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("","목록을 가져올 수 없습니다!\\n[".$res->getMessage()."]");
				exit;
			}
			return $list;
		}
	}
?>