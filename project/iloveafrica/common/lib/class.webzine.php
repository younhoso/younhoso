<?
	class Webzine{
		var $DB;
		var $_LIST_NUM = 10;

		# 생성자
		function Webzine($db) {
			$this->DB = $db;
		}

#####스킨관리 start############################################
		
		#스킨등록
		function set_skin_insert($argu){
			$data = array(
				"ws_title" => $argu["ws_title"],
				"ws_content" => $argu["ws_content"],
			);

			$res = $this->DB->autoExecute(TABLE_WEBZINE_SKIN, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
			    debug($res);
			    die($res->getMessage());
			    exit;
			}
				
			// $ws_idx=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$ws_idx = $this->DB->getOne($q);
			
			$data=array_merge($data,array("ws_idx"=>$ws_idx));
			
			return $data;

		}

		#스킨수정
		function set_skin_modify($argu){
			$data = array(
				"ws_title" => $argu["ws_title"],
				"ws_content" => $argu["ws_content"],
			);

			$res = $this->DB->autoExecute(TABLE_WEBZINE_SKIN, $data, DB_AUTOQUERY_UPDATE, " ws_idx = '{$argu['ws_idx']}'");
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;

		}

		#스킨삭제
		function set_skin_delete($argu){
			$query = "
				delete from ".TABLE_WEBZINE_SKIN."
				where
					ws_idx   = '{$argu['ws_idx']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;
		
		}

		#스킨정보확인
		function get_skin_view($argu){

			$query = "
				select
					*
				from
					".TABLE_WEBZINE_SKIN."
				where
					ws_idx   = '{$argu['ws_idx']}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    //debug($row);
			    die($row->getMessage());
			    exit;
			}

			return $row;
		
		}

		#스킨리스트
		function get_skin_list($argu,&$total,$limit = true){

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			/// 검색 쿼리
			$addwhere = "where (1=1) ";
			if($argu['s_type']=="title"){ $addwhere .= " and (ws_title like '%{$argu['keyword']}%') "; }

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_WEBZINE_SKIN."
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
					".TABLE_WEBZINE_SKIN."
					$addwhere
				order by
					ws_idx desc
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

#####스킨관리 end############################################

#####웹진 start############################################

		#웹진리스트
		function get_webzine_list($argu,&$total,$limit = true){

			$addwhere = "A.w_gubun = '{$argu['type']}' ";
			if($argu['s_type']=="title"){ $addwhere .= " and A.w_title like '%{$argu['keyword']}%' "; }

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select 
						count(* )
				from 
				(select * from ".TABLE_WEBZINE.") as A
				left outer join
				(select ws_idx, ws_title from ".TABLE_WEBZINE_SKIN.") as B
				on A.w_skin = B.ws_idx
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
				(select * from ".TABLE_WEBZINE.") as A
				left outer join
				(select ws_idx, ws_title from ".TABLE_WEBZINE_SKIN.") as B
				on A.w_skin = B.ws_idx
				where 
					$addwhere
				order by 
					A.reg_date desc 
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

		function get_webzine_list_limit($argu,$limit){
			$addwhere = "A.w_gubun = '{$argu['type']}' ";
			$query = "
				select 
					* 
				from 
				(select * from ".TABLE_WEBZINE.") as A
				left outer join
				(select ws_idx, ws_title from ".TABLE_WEBZINE_SKIN.") as B
				on A.w_skin = B.ws_idx
				where 
					$addwhere
				order by 
					A.reg_date desc 
					limit ".$limit;
			
			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($list)) {
				go_url("","목록을 가져올 수 없습니다!\\n[".$list->getMessage()."]");
				exit;
			}
			return $list;

		}
		
		function set_webzine_insert($argu){
			
			$data = array(
				"w_gubun" => $argu["w_gubun"],
				"w_title" => $argu["w_title"],
				"w_content" => $argu["w_content"],
				"w_skin" => $argu["w_skin"],
				"reg_date"    => date("Y-m-d H:i:s")
			);

			$res = $this->DB->autoExecute(TABLE_WEBZINE, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
			    debug($res);
			    die($res->getMessage());
			    exit;
			}
				
			// $w_idx=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$w_idx = $this->DB->getOne($q);
			
			$data=array_merge($data,array("w_idx"=>$w_idx));

			if(count($data) > 0){

				$cnt = $argu["user_email"];
				$cnt = count($argu["user_email"]);

				if($cnt > 0){

					$skin = $this->get_skin_view($argu["w_skin"]);
					if($argu["w_gubun"] == "Y"){
						$title = "뉴스레터";
					}
					else{
						$title = "소식지";
					}
					
					for($i=0;$i<$cnt;$i++){

						$subject = "[I LOVE AFRICA] ".$title;
						$to = $argu["user_email"][$i];
						$mail_content = str_replace("{{content}}",$argu["w_content"],str_replace("{{subject}}",$argu["w_title"],$skin["ws_content"]));
						$content = $mail_content;
						mailer(_MASTER_NAME, _MASTER_EMAIL, $to, $subject, $content, 1, $file="", $cc="", $bcc="");
						
					}
				
				}
			
			}
			
			return $data;
		
		}


		#웹진정보확인
		function get_webzine_view($argu){

		    // 한번 읽은글은 브라우저를 닫기전까지는 카운트를 증가시키지 않음
		    $ss_name = "wz_view_{$argu['type']}_{$argu['w_idx']}";
		    if (!get_session($ss_name))
		    {
				// 조회수 증가
				$query = "
					update ".TABLE_WEBZINE." b
					set
						w_cnt = w_cnt + 1
					where
						w_idx   = '".$argu['w_idx']."'
				";
				$res = $this->DB->query($query);
				if (DB::isError($res)) {
				    go_url("", $res->getMessage());
				  exit;
				}

		        set_session($ss_name, TRUE);
		    }

			$query = "
				select
					*
				from
					".TABLE_WEBZINE."
				where
					w_idx   = '".$argu['w_idx']."'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    //debug($row);
			    die($row->getMessage());
			    exit;
			}

			return $row;
		
		}

		#웹진삭제
		function set_webzine_delete($argu){
			$query = "
				delete from ".TABLE_WEBZINE."
				where
					w_idx   = '{$argu['w_idx']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;
		
		}

		function get_webzine_top($argu){
			$addwhere = "A.w_gubun = '{$argu['type']}' ";
			$query = "
				select 
					* 
				from 
				(select * from ".TABLE_WEBZINE.") as A
				left outer join
				(select ws_idx, ws_title from ".TABLE_WEBZINE_SKIN.") as B
				on A.w_skin = B.ws_idx
				where 
					$addwhere
				order by 
					A.reg_date desc
				limit 0, 1
				";

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				//debug($res);
				die($res->getMessage());
			}

			return $list;

		}

#####웹진 end############################################

#####메일링리스트 start############################################
	
		#리스트
		function get_maillist_list($argu,&$total,$limit = true){
				
				$addwhere = "(1=1) ";
				if($argu['s_type']=="name"){ $addwhere .= " and (wm_name like '%{$argu['keyword']}%') "; }
				if($argu['s_type']=="email"){ $addwhere .= " and (wm_email like '%{$argu['keyword']}%') "; }
				if($argu['s_type']=="tel"){ $addwhere .= " and (wm_tel like '%{$argu['keyword']}%') "; }

				if($limit>1){
					$this->_LIST_NUM = $limit;
				}

				$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
				
				$query = "
					select 
						count(* )
					from 
						".TABLE_WEBZINE_MAILLIST."
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
						".TABLE_WEBZINE_MAILLIST."
					where 
						$addwhere
					order by 
						wm_no desc 
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
		function set_maillist_insert($argu){
			$query = "select wm_no from ".TABLE_WEBZINE_MAILLIST." where wm_email ='".$argu["wm_email"]."' ";

			$res = $wm_no = $this->DB->getOne($query);

			if($wm_no > 0){
				$argu['wm_no'] = $wm_no;
				$this->set_maillist_modify($argu);
			}else{
				$data = array(
					"wm_name" => $argu["wm_name"],
					"user_id" => $argu["user_id"],
					"wm_email" => $argu["wm_email"],
					"wm_tel" => $argu["wm_tel1"]."-".$argu["wm_tel2"]."-".$argu["wm_tel3"],
					"wm_regdate" => _NowTime,
				);

				$res = $this->DB->autoExecute(TABLE_WEBZINE_MAILLIST, $data, DB_AUTOQUERY_INSERT);
				if (DB::isError($res)) {
					//debug($res);
					die($res->getMessage());
					exit;
				}
					
				// $wm_no=mysql_insert_id();
				$q = "
					SELECT LAST_INSERT_ID() AS 'ID';
				";
				$wm_no = $this->DB->getOne($q);
				
				$data=array_merge($data,array("wm_no"=>$wm_no));
			}

			return true;
		}

		#수정
		function set_maillist_modify($argu){
			$data = array(
				"wm_name" => $argu["wm_name"],
				"wm_email" => $argu["wm_email"],
				"wm_tel" => $argu["wm_tel1"]."-".$argu["wm_tel2"]."-".$argu["wm_tel3"],
			);

			$res = $this->DB->autoExecute(TABLE_WEBZINE_MAILLIST, $data, DB_AUTOQUERY_UPDATE, " wm_no = '{$argu['wm_no']}'");
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;

		}

		#삭제
		function set_maillist_delete($argu){
			$query = "
				delete from ".TABLE_WEBZINE_MAILLIST."
				where
					wm_no   = '{$argu['wm_no']}'
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
		function get_maillist_view($argu){

			$query = "
				select
					*
				from
					".TABLE_WEBZINE_MAILLIST."
				where
					wm_no   = '{$argu['wm_no']}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    //debug($row);
			    die($row->getMessage());
			    exit;
			}
			
			if($row["wm_tel"] != ""){
				$wm_tel = explode("-",$row["wm_tel"]);
				$row = array_merge($row, array(
					"wm_tel1"=>$wm_tel[0],
					"wm_tel2"=>$wm_tel[1],
					"wm_tel3"=>$wm_tel[2]
				));
			}

			return $row;
		
		}

		function get_maillist_chk($argu){

			$query = "
				select
					*
				from
					".TABLE_WEBZINE_MAILLIST."
				where
					user_id   = '{$argu['user_id']}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    //debug($row);
			    die($row->getMessage());
			    exit;
			}

			return $row;
		
		}

#####메일링리스트 end############################################

	
		/*****
		 * 다음 게시물 정보를 가져온다.
		 *****/
		function get_webzine_next($argu){

			$query = "
				select
					*
				from
					".TABLE_WEBZINE."
				where
					w_idx < '{$argu['w_idx']}'
					and w_gubun = '{$argu['type']}'
				order by
					w_idx desc
				limit 1
			";

			$res = $row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				go_url("", $res->getMessage());
			    exit;
			}
			return $row;
		}

	}
?>