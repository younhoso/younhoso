<?
	class Board {
		var $DB;
		var $_LIST_NUM = 20;
		var $_b_class;
		var $_bc_class;
		var $_bc_name;
		var $_b_role_w;
		var $_b_role_r;
		var $_b_role_category;
		var $_b_role_hp;
		var $_b_role_em;
		var $_b_role_mms;
		var $_b_role_md;
		var $_b_role_secret;
		var $_b_role_fn;
		var $_b_type;
		var $_b_category;
		var $_b_category_print;
		var $_b_listnum = 20;
		var $_b_bgcolor;
		var $_user_id;
		var $_b_status;
		var $_PDS = _PDS;
		var $_PDS_SUB = "board/";
		var $_default_b_type = 1;

		# 생성자
		function Board($db) {
			$this->DB = $db;
			$this->_PDS .= $this->_PDS_SUB;
		}

		/******************************************************************************************

			Board_config

		******************************************************************************************/

		/*****
		 * 게시판을 등록한다.
		 *****/
		function set_boardconf_insert($argu){
			$res = $b_class = $this->DB->getOne("select coalesce(max(b_class),0)+1 from ".TABLE_BOARD_CONFIG);
			if (DB::isError($res)) {
			    go_url("", $res->getMessage());
			    exit;
			}

			if(!$argu["b_type"]) $argu["b_type"] = $this->_default_b_type;

			$data = array(
				"b_class"         => $b_class,
				"bc_class"         => $argu["bc_class"],
				"bc_name"         => $argu["bc_name"],
				"b_role_w"        => $argu["b_role_w"],
				"b_role_r"        => $argu["b_role_r"],
				"b_role_l"        => $argu["b_role_l"],
				"b_role_rp"        => $argu["b_role_rp"],
				"b_role_cm"        => $argu["b_role_cm"],
				"b_role_category" => ($argu["b_role_category"]=="Y")?"Y":"N",
				"b_role_hp"       => ($argu["b_role_hp"]=="Y")?"Y":"N",
				"b_role_em"       => ($argu["b_role_em"]=="Y")?"Y":"N",
				"b_role_mms"      => ($argu["b_role_mms"]=="Y")?"Y":"N",
				"b_role_md"       => ($argu["b_role_md"]=="Y")?"Y":"N",
				"b_role_cmt"       => ($argu["b_role_cmt"]=="Y")?"Y":"N",
				"b_role_secret"   => ($argu["b_role_secret"]=="Y")?"Y":"N",
				"b_role_fn"       => ($argu["b_role_fn"]=="")? 0:$argu["b_role_fn"],
				"b_category"      => $argu["b_category"],
				"b_category_print"      => $argu["b_category_print"],
				"b_listnum"       => $argu["b_listnum"],
				"b_type"          => $argu["b_type"],
				"b_header_file"          => $argu["b_header_file"],
				"b_header"          => $argu["b_header"],
				"b_footer_file"          => $argu["b_footer_file"],
				"b_footer"          => $argu["b_footer"],
				"b_size"          => $argu["b_size"],
				"b_align"          => $argu["b_align"],
				"b_status"          => $argu["b_status"],
				"user_id"          => $argu["user_id"]
			);

			$sth = $this->DB->autoPrepare(TABLE_BOARD_CONFIG, array_keys($data), DB_AUTOQUERY_INSERT);
			$res = $this->DB->execute($sth, array_values($data));

			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}

			return true;
		}

		/*****
		 * 게시판을 수정한다.
		 *****/
		function set_boardconf_modify($argu){

			if(!$argu["b_type"]) $argu["b_type"] = $this->_default_b_type;

			$data = array(
				"bc_name"         => $argu["bc_name"],
				"bc_class"         => $argu["bc_class"],
				"b_role_w"        => $argu["b_role_w"],
				"b_role_r"        => $argu["b_role_r"],
				"b_role_l"        => $argu["b_role_l"],
				"b_role_rp"        => $argu["b_role_rp"],
				"b_role_cm"        => $argu["b_role_cm"],
				"b_role_category" => ($argu["b_role_category"]=="Y")?"Y":"N",
				"b_role_hp"       => ($argu["b_role_hp"]=="Y")?"Y":"N",
				"b_role_em"       => ($argu["b_role_em"]=="Y")?"Y":"N",
				"b_role_mms"      => ($argu["b_role_mms"]=="Y")?"Y":"N",
				"b_role_md"       => ($argu["b_role_md"]=="Y")?"Y":"N",
				"b_role_cmt"       => ($argu["b_role_cmt"]=="Y")?"Y":"N",
				"b_role_secret"   => ($argu["b_role_secret"]=="Y")?"Y":"N",
				"b_role_fn"       => ($argu["b_role_fn"]=="")? 0:$argu["b_role_fn"],
				"b_category"      => $argu["b_category"],
				"b_category_print"      => $argu["b_category_print"],
				"b_listnum"       => $argu["b_listnum"],
				"b_type"          => $argu["b_type"],
				"b_header_file"          => $argu["b_header_file"],
				"b_header"          => $argu["b_header"],
				"b_footer_file"          => $argu["b_footer_file"],
				"b_footer"          => $argu["b_footer"],
				"b_size"          => $argu["b_size"],
				"b_align"          => $argu["b_align"],
				"b_status"          => $argu["b_status"],
				"user_id"          => $argu["user_id"]
			);

			$res = $result = $this->DB->autoExecute(TABLE_BOARD_CONFIG, $data,
			                        DB_AUTOQUERY_UPDATE, " b_class = '{$argu['b_class']}' ");

			if (DB::isError($res)) {
			    go_url("", $res->getMessage());
			    exit;
			}

			return true;
		}

		/*****
		 * 게시판을 삭제한다.
		 *****/
		function set_boardconf_delete($argu){

			$query = "
				delete from ".TABLE_BOARD."
				where  b_class = '{$argu['b_class']}'
			";
			$res = $this->DB->query($query);

			// 게시판을 삭제한다.
			$query = "
				delete from ".TABLE_BOARD_CONFIG."
				where  b_class = '{$argu['b_class']}'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    go_url("", $res->getMessage());
			    exit;
			}
			return true;
		}

		/*****
		 * 게시판 목록을 가져온다.
		 *****/
		function get_boardconf_list($argu,&$total,$limit = true){
			/// 분류
			$addwhere = ($argu['bconf_class']>0) ? " where bc.bc_class='".$argu['bconf_class']."'" : "";
		 
			$query = "
				select
					count(*)
				from
					".TABLE_BOARD_CONFIG." bc
			".$addwhere;

			$res = $total = $this->DB->getOne($query);
			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}

			$query = "
				select
					bc.b_class,
					bc.bc_class,
					bc.bc_name,
					bc.b_role_w,
					bc.b_role_r,
					bc.b_role_category,
					bc.b_role_hp,
					bc.b_role_em,
					bc.b_role_mms,
					bc.b_role_md,
					bc.b_role_secret,
					bc.b_role_fn,
					bc.b_category,
					bc.b_category_print,
					bc.b_listnum,
					bc.b_type,
					bc.b_status,
					bc.user_id
				from
					".TABLE_BOARD_CONFIG." bc
				".$addwhere."
				order by
					bc.bc_class asc,
					bc.b_class asc ";
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

		/*****
		 * 게시판 설정을 가져온다.
		 *****/
		function get_boardconf_view($b_class){
			$query = "
				select
					bc.b_class,
					bc.bc_class,
					bc.bc_name,
					bc.b_role_w,
					bc.b_role_r,
					bc.b_role_l,
					bc.b_role_rp,
					bc.b_role_cm,
					bc.b_role_category,
					bc.b_role_hp,
					bc.b_role_em,
					bc.b_role_mms,
					bc.b_role_md,
					bc.b_role_secret,
					bc.b_role_cmt,
					ifnull(bc.b_role_fn,0) as b_role_fn,
					bc.b_category,
					bc.b_category_print,
					bc.b_listnum,
					bc.b_type,
					bc.b_header_file,
					bc.b_header,
					bc.b_footer_file,
					bc.b_footer,
					bc.b_size,
					bc.b_align,
					bc.b_status,
					bc.user_id
				from
					".TABLE_BOARD_CONFIG." bc
				where
					bc.b_class = '{$b_class}'
			";

			$res = $row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}
			$this->_b_class         = $row['b_class'];
			$this->_bc_class         = $row['bc_class'];
			$this->_bc_name         = $row['bc_name'];
			$this->_b_role_w        = $row['b_role_w'];
			$this->_b_role_r        = $row['b_role_r'];
			$this->_b_role_l        = $row['b_role_l'];
			$this->_b_role_rp        = $row['b_role_rp'];
			$this->_b_role_cm        = $row['b_role_cm'];
			$this->_b_role_category = $row['b_role_category'];
			$this->_b_role_hp       = $row['b_role_hp'];
			$this->_b_role_em       = $row['b_role_em'];
			$this->_b_role_mms      = $row['b_role_mms'];
			$this->_b_role_md       = $row['b_role_md'];
			$this->_b_role_fn       = $row['b_role_fn'];
			$this->_b_role_secret   = $row['b_role_secret'];
			$this->_b_role_cmt      = $row['b_role_cmt'];
			$this->_b_type          = $row['b_type'];
			$this->_b_header_file          = $row['b_header_file'];
			$this->_b_header          = $row['b_header'];
			$this->_b_footer_file          = $row['b_footer_file'];
			$this->_b_footer          = $row['b_footer'];
			$this->_b_size          = $row['b_size'];
			$this->_b_align          = $row['b_align'];
			$this->_b_category      = $row['b_category'];
			$this->_b_category_print      = $row['b_category_print'];
			$this->_b_bgcolor       = $row['b_bgcolor'];
			$this->_b_listnum       = $row['b_listnum'];
			$this->_b_status        = $row['b_status'];
			$this->_user_id         = $row['user_id'];
			$this->_PDS            .= $this->_b_class."/";

			return $row;
		}

		/******************************************************************************************

			Board

		******************************************************************************************/

		/*****
		 * 게시판을 등록한다.
		 *****/
		function set_board_insert($argu){

			global $_ADMIM_PWD;
			// 첨부파일 argu 를 정리한다.
			if(is_array($_FILES['bf_file']['tmp_name'])){
				foreach($_FILES['bf_file'] as $_FILE_KEY => $tmp){
					foreach($tmp as $_FILE_NO => $_FILE_VALUE){
						$_FILE[$_FILE_NO][$_FILE_KEY] = $_FILE_VALUE;
					}
				}
			}

			//$data['b_no'] = $this->DB->getOne("select ifnull(max(b_no),0)+1 from ".TABLE_BOARD." where b_class = '{$argu['b_class']}'");
			$res = $data['b_no'] = $this->DB->getOne("select ifnull(max(b_no),0)+1 from ".TABLE_BOARD." ");
			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}

			if($argu['b_no'] != ""){//답글일경우
				$query = "
					select
						b_top,
						b_step,
						case b_step
							when '00' then 0
							else length(b_step)/2
						end as b_depth
					from
						".TABLE_BOARD."
					where
						b_class = '{$argu['b_class']}'
						and b_no = '{$argu['b_no']}'
				";
				$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);

				if($row['b_depth'] >= 49){
					go_url("","더이상 하위 답글을 쓰실수 없습니다!");
					exit;
				}

				$query = "
					select
						max(
							case
								when length(substring(b.b_step,1,({$row['b_depth']}+1)*2)) < ({$row['b_depth']}+1)*2 then concat(substring(b.b_step,1,({$row['b_depth']}+1)*2), '00')
								else substring(b.b_step,1,({$row['b_depth']}+1)*2)
							end
						) + 1
					from
						".TABLE_BOARD." b
					where
						b.b_class   = '{$argu['b_class']}'
						and b.b_top = '{$row['b_top']}'
						and
							case
								when {$row['b_depth']} > 0 then substring(b.b_step,1,({$row['b_depth']})*2) = substring('{$row['b_step']}',1,({$row['b_depth']})*2)
								else 1 = 1
							end
				";
				$data['b_step'] = $this->DB->getOne($query);
				if(strlen($data['b_step'])%2 == 1) $data['b_step'] = '0'.$data['b_step'];

				$data['b_top']  = $row['b_top'];

				if(substr($data['b_step'], -2) == "00"){// 답글의 제한은 99개 까지이다.
					go_url("","더이상 답글을 쓰실수 없습니다!");
					exit;
				}
					
				/***********************
				 문의상담 답글시 메일 발송
				************************/
				/*if($argu['b_class'] == "6"){

					$mquery = "
						select
							b_name,
							b_email
						from
							".TABLE_BOARD."
						where
							b_class = '{$argu['b_class']}'
							and b_no = '{$argu['b_no']}'
					";
					$mrow = $this->DB->getRow($mquery,DB_FETCHMODE_ASSOC);

					if($mrow["b_email"] != ""){
						
						$query = "
							select
								*
							from
								basic
						";
						$_row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
						if (DB::isError($_row)) {
							//debug($row);
							die($_row->getMessage());
						}

						$subject = "케이에스 차량 탁송에서 ".$mrow["b_name"]. "님이 문의하신 내용의 답변이 도착했습니다.";
						include "../www/mail.html";
						// type : text=0, html=1, text+html=2
						mailer($_row["b_title"], $_row["b_email"], $mrow["b_email"], $subject, $mail_content, 1, $file="", $cc="", $bcc="");
					}
				}*/

			}else{//답글이 아닐경우
				$data['b_top']  = $data['b_no'];
				$data['b_step'] = "00";
			}

			$data['b_pwd'] = ($argu['b_pwd'] == "" && $_SESSION['user_level'] > 1)? $_ADMIM_PWD:$argu['b_pwd'];

			if(isset($argu["b_mms"]))     $data["b_mms"]     = $argu["b_mms"];
			if(isset($argu["b_link"]))    $data["b_link"]    = $argu["b_link"];
			if(isset($argu["b_summary"])) $data["b_summary"] = $argu["b_summary"];
			if(isset($argu["b_status"]))  $data["b_status"]  = $argu["b_status"];

			if(isset($argu["a_id"]))      $data["a_id"]      = $argu["a_id"];

			$data = array_merge($data,array(
				"b_class"    => $argu["b_class"],
				"b_category" => $argu["b_category"],
				"b_name"     => $argu["b_name"],
				"user_id"    => $_SESSION['user_id'],
				"b_title"    => $argu["b_title"],
				"b_notice"   => ($argu["b_notice"]==1)?1:9,
				"b_tag"      => $argu["b_tag"],
				"b_homepage" => $argu["b_homepage"],
				"b_email"    => $argu["b_email"],
				"b_content"  => ($argu["b_tag"] == "Y")? txtParse($argu["b_content"],1):strip_tags($argu["b_content"]),
				"b_regdate"  => date("Y-m-d H:i:s"),
				"b_ip"		 => $_SERVER['REMOTE_ADDR'],
				"b_secert"   => ($argu["b_secert"]=="Y")?"Y":"N",
				"b_front"    => ($argu["b_front"]=="Y")?"Y":"N",
				"b_tel"    => $argu["b_tel1"]."-".$argu["b_tel2"]."-".$argu["b_tel3"],
				"b_sdate" => $argu["b_sdate"],
				"b_edate" => $argu["b_edate"],
				"b_etc1" => $argu["b_etc1"],
				"b_etc2" => $argu["b_etc2"],
				"b_etc3" => $argu["b_etc3"],
				"b_etc4" => $argu["b_etc4"],
				"b_etc5" => $argu["b_etc5"],
				"b_etc6" => $argu["b_etc6"],
				"b_etc7" => $argu["b_etc7"],
				"b_etc8" => $argu["b_etc8"],
				"b_etc9" => $argu["b_etc9"],
				"b_etc10" => $argu["b_etc10"],
			));

			$res = $this->DB->autoExecute(TABLE_BOARD, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
			    go_url("", $res->getMessage());
			    exit;
			}

			// 첨부파일 저장
			// TODO : board_config 의 media 여부에 따라 허용 파일 타입을 필터링 해주는 부분이 필요하다.
			if(is_array($_FILE)){
				foreach($_FILE as $_FILE_NO => $_FILE_VALUE){
					//$data['bf_name'] = upload_($this->_PDS, $_FILE_VALUE,  $data['b_no']."_".$_FILE_NO, "U", &$M);
					if($_FILE_VALUE !== null && $_FILE_VALUE[error] == 0 && $_FILE_VALUE[size] > 0 ){// 첨부파일이 있을경우

						if(upload($this->_PDS, $_FILE_VALUE,$data['b_no']."_".$_FILE_NO,"U")){ // 첨부파일 업로드에 성공했을경우
							$data["bf_name"] = $_FILE_VALUE[name];
							$data["bf_type"] = array_pop(explode(".",$data["bf_name"]));
						}else{ // 첨부파일 업로드에 실패했을경우 alert 과 동시에 작업을 중단하고 이전페이지로 돌아간다.
							go_url("","파일 업로드에 실패했습니다.");
							exit;
						}

						$data_file = array(
							"b_class" => $data['b_class'],
							"b_no"    => $data['b_no'],
							"bf_no"   => $_FILE_NO,
							"bf_type" => strtolower($data["bf_type"]),
							"bf_name" => $data["bf_name"]
						);

						$res = $this->DB->autoExecute(TABLE_BOARD_FILE, $data_file, DB_AUTOQUERY_INSERT);
						if (DB::isError($res)) {
							go_url("","파일 업로드에 실패했습니다.");
							exit;
						}
					}
				}
			}

			// 비밀글이라면 세션에 비밀글의 아이디를 저장한다. 자신의 글은 다시 패스워드를 묻지 않기 위함
			if ($argu["b_secert"]=="Y")
			    set_session("ss_secret_{$argu['b_class']}_{$data['b_no']}", TRUE);

			return true;
		}

		/*****
		 * 게시판을 수정한다.
		 *****/
		function set_board_modify($argu){
			global $_ADMIM_PWD;
			// 첨부파일 argu 를 정리한다.
			if(is_array($_FILES['bf_file']['tmp_name'])){
				foreach($_FILES['bf_file'] as $_FILE_KEY => $tmp){
					foreach($tmp as $_FILE_NO => $_FILE_VALUE){
						$_FILE[$_FILE_NO][$_FILE_KEY] = $_FILE_VALUE;
					}
				}
			}

			$data['b_pwd'] = ($argu['b_pwd'] == "" && $_SESSION['user_level'] > 1)? $_ADMIM_PWD:$argu['b_pwd'];
			if(isset($argu["b_front"]))    $data['b_front']    = $argu["b_front"];
			if(isset($argu["b_category"])) $data["b_category"] = $argu["b_category"];
			if(isset($argu["b_name"]))     $data["b_name"]     = $argu["b_name"];
			if(isset($argu["b_mms"]))      $data["b_mms"]      = $argu["b_mms"];
			if(isset($argu["b_link"]))     $data["b_link"]     = $argu["b_link"];
			if(isset($argu["b_summary"]))  $data["b_summary"]  = $argu["b_summary"];
			if(isset($argu["b_status"]))   $data["b_status"]   = $argu["b_status"];


			$data = array_merge($data,array(
				"b_title"    => $argu["b_title"],
				"b_notice"   => ($argu["b_notice"]==1)? 1:9,
				"b_secert"   => ($argu["b_secert"]=="Y")?"Y":"N",
				"b_tag"      => $argu["b_tag"],
				"b_homepage" => $argu["b_homepage"],
				"b_email"    => $argu["b_email"],
				"b_content"  => ($argu["b_tag"] == "Y")? txtParse($argu["b_content"],1):strip_tags($argu["b_content"]),
				"b_sdate" => $argu["b_sdate"],
				"b_edate" => $argu["b_edate"],
				"b_etc1" => $argu["b_etc1"],
				"b_etc2" => $argu["b_etc2"],
				"b_etc3" => $argu["b_etc3"],
				"b_etc4" => $argu["b_etc4"],
				"b_etc5" => $argu["b_etc5"],
				"b_etc6" => $argu["b_etc6"],
				"b_etc7" => $argu["b_etc7"],
				"b_etc8" => $argu["b_etc8"],
				"b_etc9" => $argu["b_etc9"],
				"b_etc10" => $argu["b_etc10"],
			));


			// 관리자에서 조회수 수정 가능하게 해달란 요청에의한 추가 2006-03-27 1:28오후
			//if($argu["b_cnt"] !== null) $data = array_merge($data,array("b_cnt" => $argu["b_cnt"]));

			$res = $this->DB->autoExecute(TABLE_BOARD, $data, DB_AUTOQUERY_UPDATE, " b_class = '{$argu['b_class']}' and b_no = '{$argu['b_no']}'");
			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}


			// 첨부파일 저장
			// TODO : board_config 의 media 여부에 따라 허용 파일 타입을 필터링 해주는 부분이 필요하다.
			if(is_array($_FILE)){
				foreach($_FILE as $_FILE_NO => $_FILE_VALUE){
					if($_FILE_VALUE !== null && $_FILE_VALUE[error] == 0 && $_FILE_VALUE[size] > 0 ){// 첨부파일이 있을경우
						$this->set_boardfile_delete(array("b_class"=>$argu['b_class'],"b_no"=>$argu['b_no'],"bf_no"=>$_FILE_NO));

						if(upload($this->_PDS, $_FILE_VALUE,$argu['b_no']."_".$_FILE_NO,"U")){ // 첨부파일 업로드에 성공했을경우
							$data["bf_name"] = $_FILE_VALUE[name];
							$data["bf_type"] = array_pop(explode(".",$data["bf_name"]));
						}else{ // 첨부파일 업로드에 실패했을경우 alert 과 동시에 작업을 중단하고 이전페이지로 돌아간다.
							go_url("","파일 업로드에 실패했습니다.");
							exit;
						}

						$data_file = array(
							"b_class" => $argu['b_class'],
							"b_no"    => $argu['b_no'],
							"bf_no"   => $_FILE_NO,
							"bf_type" => strtolower($data["bf_type"]),
							"bf_name" => $data["bf_name"]
						);
						$res = $this->DB->autoExecute(TABLE_BOARD_FILE, $data_file, DB_AUTOQUERY_INSERT);
						if (DB::isError($res)) {
						    go_url("","파일 업로드에 실패했습니다.");
							exit;
						}
					}
				}
			}

			for($i=0;$i<count($argu['del_file']);$i++){
				$this->set_boardfile_delete(array( "b_class" => $argu['b_class'] , "b_no" => $argu['b_no'] , "bf_no" => $argu['del_file'][$i] ));
			}
			return true;
		}

		/*****
		 * 게시물을 삭제한다.
		 *****/
		function set_board_delete($argu){
			$file_list = $this->get_boardfile_list($argu['b_class'],$argu['b_no']);
			if(is_array($file_list)){
				foreach($file_list as $key => $value){
					$this->set_boardfile_delete($value);
				}
			}

			$query = "
				delete from ".TABLE_BOARD."
				where
					b_class   = '{$argu['b_class']}'
					and b_no  = '{$argu['b_no']}'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    go_url("", $res->getMessage());
			    exit;
			}
			return true;
		}

		/*****
		 * 해당 게시판 첨부파일을 삭제 한다.
		 *****/
		function set_boardfile_delete($argu){
			if(upload($this->_PDS, "",$argu['b_no']."_".$argu['bf_no'],"D")){ // 첨부파일 업로드에 성공했을경우
				$query = "
					delete from ".TABLE_BOARD_FILE."
					where
						b_class   = '{$argu['b_class']}'
						and b_no  = '{$argu['b_no']}'
						and bf_no = '{$argu['bf_no']}'
				";
				$res = $this->DB->query($query);
				if (DB::isError($res)) {
				    go_url("", $res->getMessage());
				    exit;
				}
				return true;
			}else{
				return false;
			}
		}

		/*****
		 * 해당 게시판 목록을 가져온다.
		 *****/
		function get_board_list($argu,&$total,$limit = true){
			global $_adminpage,$_agency;

			$addwhere = "";
			if(!$_adminpage) $addwhere .= " and b.b_status = 'C' ";
			if($argu['b_category']) $addwhere .= " and b.b_category = '{$argu['b_category']}' ";
			if($argu['b_class']==3 && $_agency['a_id']) $addwhere .= " and b.a_id = '{$_agency['a_id']}' ";
			if($argu['s_case'] && $argu['s_string']) $addwhere .= " and b.{$argu['s_case']} like '%{$argu['s_string']}%' ";
			if($argu["privacy"] == "Y") $addwhere .= " and b.user_id = '{$argu['user_id']}' ";

			$query = "
				select
					count(*)
				from
					".TABLE_BOARD." b
				where
					b.b_class = '{$argu['b_class']}'
					and
						case
							when length(trim('$argu[s_case]')) = 0 then true
							else
								case '$argu[s_case]'
									when 'b_title'   then b.b_title
									when 'b_content' then b.b_content
									when 'b_name'    then b.b_name
								end
								like ?
						end
					$addwhere
			";

			$res = $total = $this->DB->getOne($query,array("%{$argu[s_string]}%"));

			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}

			$query = "
				select
					b.b_class,
					b.b_no,
					b.b_top,
					b.b_step,
					case b.b_step
						when '00' then 0
						else length(b.b_step)/2
					end as b_depth,
					b.b_category,
					b.b_name,
					b.b_pwd,
					b.b_secert,
					b.user_id,
					if(date_add(b.b_regdate, interval 3 day) > now(),'Y','N') as new,
					date_format(b.b_regdate,'%Y-%m-%d') as b_date,
					b.b_regdate,
					b.b_title,
					b.b_notice,
					b.b_tag,
					b.b_homepage,
					b.b_mms,
					b.b_link,
					b.b_summary,
					b.b_email,
					b.b_content,
					b.b_ip,
					b.b_cnt,
					b.b_status,
					b.a_id,
					b.b_sdate,
					b.b_edate,
					b.b_etc1,
					b.b_etc2,
					b.b_etc3,
					b.b_etc4,
					b.b_etc5,
					b.b_etc6,
					b.b_etc7,
					b.b_etc8,
					b.b_etc9,
					b.b_etc10,
					bf.bf_name,
					(select count(*) from board_comment where b_no = b.b_no) AS cmt_cnt
					-- ifnull(count(bf.bf_no),0) as bf_cnt
				from
					".TABLE_BOARD_CONFIG." bc,
					".TABLE_BOARD." b
					left outer join ".TABLE_BOARD_FILE." bf
						on b.b_class = bf.b_class and b.b_no = bf.b_no and bf.bf_no = 0
				where
					b.b_class = '{$argu['b_class']}'
					and b.b_class= bc.b_class
					and
						case
							when length(trim('$argu[s_case]')) = 0 then 1
							else
								case '$argu[s_case]'
									when 'b_title'   then b.b_title
									when 'b_content' then b.b_content
									when 'b_name'    then b.b_name
								end
								like ?
						end
					$addwhere
				group by
					b.b_class,
					b.b_no
				order by
					b.b_notice asc, b.b_top desc, b.b_step asc ";
			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_b_listnum.",".$this->_b_listnum;

			$res = $list =& $this->DB->getAll($query, array("%{$argu[s_string]}%"), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}
			return $list;
		}

		/*****
		 * 관련글을 가져온다.
		 *****/
		function get_with_list($b_class,$b_top){
			global $_adminpage,$_agency;
			$addwhere = "";
			if(!$_adminpage) $addwhere .= " and b.b_status = 'C' ";
			if($argu['b_class']==3 && $_agency['a_id']) $addwhere .= " and b.a_id = '{$_agency['a_id']}' ";

			$query = "
				select
					b.b_class,
					b.b_no,
					b.b_top,
					b.b_step,
					case b.b_step
						when '00' then 0
						else length(b.b_step)/2
					end as b_depth,
					b.b_category,
					b.b_name,
					u.user_name,
					b.b_pwd,
					b.b_secert,
					b.user_id,
					if(date_add(b.b_regdate, interval 3 day) > now(),'Y','N') as new,
					date_format(b.b_regdate,'%Y-%m-%d') as b_date,
					b.b_title,
					b.b_tag,
					b.b_homepage,
					b.b_email,
					b.b_mms,
					b.b_link,
					b.b_summary,
					b.b_content,
					b.b_ip,
					b.b_cnt,
					b.a_id,
					b.b_status
				from
					".TABLE_BOARD_CONFIG." bc,
					".TABLE_BOARD." b
					left outer join ".TABLE_USER." u
						on b.user_id = u.user_id
				where
					b.b_class = '{$b_class}'
					and b.b_top = '{$b_top}'
					and b.b_class= bc.b_class
					$addwhere
				order by
					b.b_top desc, b_step asc
			";

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}
			return $list;
		}

		/*****
		 * 상위 일부 게시물을 가져온다.
		 *****/
		function get_board_limit($b_class,$limit=0,$b_category=''){
			global $_adminpage,$_agency;
			$addwhere = "";
			if(!$_adminpage) $addwhere .= " and b.b_status = 'C' ";
			if($b_category) $addwhere .= " and b.b_category = '{$b_category}' ";
			if($argu['b_class']==3 && $_agency['a_id']) $addwhere .= " and b.a_id = '{$_agency['a_id']}' ";

			$query = "
				select
					b.b_class,
					b.b_no,
					b.b_notice,
					b.b_top,
					b.b_step,
					case b.b_step
						when '00' then 0
						else length(b.b_step)/2
					end as b_depth,
					b.b_category,
					b.b_name,
					u.user_name,
					b.b_pwd,
					b.b_secert,
					b.user_id,
					if(date_add(b.b_regdate, interval 3 day) > now(),'Y','N') as new,
					date_format(b.b_regdate,'%Y-%m-%d') as b_date,
					concat('[',date_format(b.b_regdate,'%y-%m-%d'),']') as b_date2,
					b.b_title,
					b.b_tag,
					b.b_homepage,
					b.b_email,
					b.b_mms,
					b.b_link,
					b.b_summary,
					b.b_content,
					b.b_ip,
					b.b_cnt,
					b.a_id,
					b.b_status
				from
					".TABLE_BOARD_CONFIG." bc,
					".TABLE_BOARD." b
					left outer join ".TABLE_USER." u
						on b.user_id = u.user_id
				where
					b.b_class = '{$b_class}'
					and b.b_class= bc.b_class
					$addwhere
				order by
					b.b_notice asc,b.b_top desc, b_step asc
				limit ".$limit;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}
			return $list;
		}



		function get_board_limit_c($b_class,$limit=0,$b_category=''){
			global $_adminpage,$_agency;
			$addwhere = "";
			if(!$_adminpage) $addwhere .= " and b.b_status = 'C' ";
			if($b_category) $addwhere .= " and b.b_category = '{$b_category}' ";
			if($argu['b_class']==3 && $_agency['a_id']) $addwhere .= " and b.a_id = '{$_agency['a_id']}' ";

			$query = "
				select
					b.b_class,
					b.b_no,
					b.b_notice,
					b.b_top,
					b.b_step,
					case b.b_step
						when '00' then 0
						else length(b.b_step)/2
					end as b_depth,
					b.b_category,
					b.b_name,
					u.user_name,
					b.b_pwd,
					b.b_secert,
					b.user_id,
					if(date_add(b.b_regdate, interval 3 day) > now(),'Y','N') as new,
					date_format(b.b_regdate,'%Y-%m-%d') as b_date,
					concat('[',date_format(b.b_regdate,'%y-%m-%d'),']') as b_date2,
					b.b_title,
					b.b_tag,
					b.b_homepage,
					b.b_email,
					b.b_mms,
					b.b_link,
					b.b_summary,
					b.b_content,
					b.b_ip,
					b.b_cnt,
					b.a_id,
					b.b_status
				from
					".TABLE_BOARD_CONFIG." bc,
					".TABLE_BOARD." b
					left outer join ".TABLE_USER." u
						on b.user_id = u.user_id
				where
					b.b_class = '{$b_class}'
					and b.b_class= bc.b_class
					$addwhere
				order by
					b.b_notice asc,b.b_top desc, b_step asc
				limit ".$limit.",1";

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}
			return $list;
		}


		function set_board_cnt($b_class,$b_no){
			global $_adminpage,$_agency;
			$addwhere = "";
			if(!$_adminpage) $addwhere .= " and b.b_status = 'C' ";
			if($argu['b_class']==3 && $_agency['a_id']) $addwhere .= " and b.a_id = '{$_agency['a_id']}' ";

		    // 한번 읽은글은 브라우저를 닫기전까지는 카운트를 증가시키지 않음
		    $ss_name = "ss_view_{$b_class}_{$b_no}";
		    if (!get_session($ss_name))
		    {
				// 조회수 증가
				$query = "
					update ".TABLE_BOARD." b
					set
						b.b_cnt = b.b_cnt + 1
					where
						b.b_class = '{$b_class}'
						and b.b_no = '{$b_no}'
						$addwhere
				";
				$res = $this->DB->query($query);
				if (DB::isError($res)) {
				    go_url("", $res->getMessage());
				    exit;
				}

		        set_session($ss_name, TRUE);
		    }
		}

		/*****
		 * 게시물 정보를 가져온다.
		 *****/
		function get_board_view($b_class,$b_no){
			global $_adminpage,$_agency;
			$addwhere = "";
			if(!$_adminpage) $addwhere .= " and b.b_status = 'C' ";
			if($argu['b_class']==3 && $_agency['a_id']) $addwhere .= " and b.a_id = '{$_agency['a_id']}' ";

		    // 한번 읽은글은 브라우저를 닫기전까지는 카운트를 증가시키지 않음
		    $ss_name = "ss_view_{$b_class}_{$b_no}";
		    if (!get_session($ss_name))
		    {
				// 조회수 증가
				$query = "
					update ".TABLE_BOARD." b
					set
						b.b_cnt = b.b_cnt + 1
					where
						b.b_class = '{$b_class}'
						and b.b_no = '{$b_no}'
						$addwhere
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
					b.b_class,
					b.b_no,
					b.b_top,
					b.b_step,
					b.b_category,
					b.b_name,
					b.b_pwd,
					b.b_secert,
					b.user_id,
					u.user_name,
					date_format(b.b_regdate,'%Y-%m-%d') as b_date,
					b.b_regdate,
					b.b_title,
					b.b_notice,
					b.b_tag,
					b.b_homepage,
					b.b_email,
					b.b_mms,
					b.b_link,
					b.b_summary,
					b.b_content,
					b.b_ip,
					b.b_cnt,
					b.a_id,
					b.b_status,
					b.b_sdate,
					b.b_edate,
					b.b_etc1,
					b.b_etc2,
					b.b_etc3,
					b.b_etc4,
					b.b_etc5,
					b.b_etc6,
					b.b_etc7,
					b.b_etc8,
					b.b_etc9,
					b.b_etc10
				from
					".TABLE_BOARD_CONFIG." bc,
					".TABLE_BOARD." b
					left outer join ".TABLE_USER." u
						on b.user_id = u.user_id
				where
					b.b_class = '{$b_class}'
					and b.b_no = '{$b_no}'
					and b.b_class= bc.b_class
					$addwhere
			";
			$res = $row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}

			return $row;
		}

		/*****
		 * 이전 게시물 정보를 가져온다.
		 *****/
		function get_board_prev($b_class,$b_no){
			// TODO : 답변형의 경우 정확한 이전정보 가져오는 방법을 생각해보자
			global $_adminpage,$_agency;
			$addwhere = "";
			if(!$_adminpage) $addwhere .= " and b.b_status = 'C' ";
			if($argu['b_class']==3 && $_agency['a_id']) $addwhere .= " and b.a_id = '{$_agency['a_id']}' ";

			$query = "
				select
					b.b_class,
					b.b_no,
					b.b_category,
					b.b_title,
					b.a_id,
					b.b_secert
				from
					".TABLE_BOARD_CONFIG." bc,
					".TABLE_BOARD." b
				where
					b.b_class = '{$b_class}'
					and b.b_no > '{$b_no}'
					and b.b_class= bc.b_class
					$addwhere
				order by
					b.b_top asc, b_step desc
				limit 1
			";

			$res = $row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}
			return $row;
		}

		/*****
		 * 다음 게시물 정보를 가져온다.
		 *****/
		function get_board_next($b_class,$b_no){
			// TODO : 답변형의 경우 정확한 다음정보 가져오는 방법을 생각해보자
			global $_adminpage,$_agency;
			$addwhere = "";
			if(!$_adminpage) $addwhere .= " and b.b_status = 'C' ";
			if($argu['b_class']==3 && $_agency['a_id']) $addwhere .= " and b.a_id = '{$_agency['a_id']}' ";

			$query = "
				select
					b.b_class,
					b.b_no,
					b.b_category,
					b.b_title,
					b.a_id,
					b.b_secert
				from
					".TABLE_BOARD_CONFIG." bc,
					".TABLE_BOARD." b
				where
					b.b_class = '{$b_class}'
					and b.b_no < '{$b_no}'
					and b.b_class= bc.b_class
					$addwhere
				order by
					b.b_top desc, b_step asc
				limit 1
			";

			$res = $row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				go_url("", $res->getMessage());
			    exit;
			}
			return $row;
		}

		/*****
		 * 게시물 첨부파일 정보를 가져온다.
		 *****/
		function get_boardfile_list($b_class,$b_no){
			$query = "
				select
					b_class,
					b_no,
					bf_no,
					bf_type,
					bf_name
				from
					".TABLE_BOARD_FILE." bf
				where
					bf.b_class  = '{$b_class}'
					and bf.b_no = '{$b_no}'
			";

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}
			return $list;
		}

		/******************************************************************************************

			Board Vote

		******************************************************************************************/

		/*****
		 * 추천을 등록한다.
		 *****/
		 function set_board_vote($b_class,$b_no,$user_id,$bv_score){
		 	if( $b_class && $b_no && $user_id &&$bv_score ){
		 		if(!$this->check_board_vote($b_class,$b_no,$user_id)){
					$data = array(
						"b_class"    => $b_class,
						"b_no"       => $b_no,
						"user_id"    => $user_id,
						"bv_score"   => $bv_score,
						"bv_regdate" => date("Y-m-d H:i:s"),
						"bv_ip"      => $_SERVER['REMOTE_ADDR'],
					);
					$res = $this->DB->autoExecute("board_vote", $data, DB_AUTOQUERY_INSERT);
					if (DB::isError($res)) {
					    go_url("", $res->getMessage());
					    exit;
					}
					return true;
		 		}
		 	}
		 }

		/*****
		 * 추천정보를 가져온다.
		 *****/
		 function get_board_vote($b_class,$b_no){
			$query = "
				select
					count(bv.user_id) as cnt,
					sum(bv.bv_score) as sum,
					format(avg(bv.bv_score),0) as avg
				from
					".TABLE_BOARD_VOTE." bv
				where
					bv.b_class = ?
					and bv.b_no = ?
			";
			$res = $row = $this->DB->getRow($query,array($b_class,$b_no),DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}

			return $row;
		 }

		/*****
		 * 추천을 했는지 확인한다.
		 *****/
		 function check_board_vote($b_class,$b_no,$user_id){
		 	if( $b_class && $b_no && $user_id ){
		 		$res = $check = $this->DB->getOne("select count(*) from board_vote where b_class = ? and b_no = ? and user_id = ? ",array($b_class,$b_no,$user_id));
				if (DB::isError($res)) {
				    go_url("", $res->getMessage());
					exit;
				}

				if( $check > 0 ) return true;
				else return false;
		 	}
		 	return false;
		 }

		/******************************************************************************************

			Board Comment

		******************************************************************************************/

		/*****
		 * 댓글을 등록한다.
		 *****/
		function set_commemt_insert($argu){
			$data['bcm_no'] = $this->DB->getOne("select ifnull(max(bcm_no),0)+1 from board_comment
				where bcm_gubun   = '{$argu['bcm_gubun']}' and b_class = '{$argu['b_class']}' and b_no = '{$argu['b_no']}'");

			if($argu["bcm_name"] == ""){
				$argu["bcm_name"] = $_SESSION['user_name'];
			}

			$argu["bcm_pwd"] = substr(md5($argu["bcm_pwd"]),0,10);

			$data = array_merge($data,array(
				"bcm_gubun"   => $argu['bcm_gubun'],
				"b_class"     => $argu['b_class'],
				"b_no"        => $argu["b_no"],
				"bcm_no"      => $data['bcm_no'],
				"bcm_name"    => $argu["bcm_name"],
				"bcm_pwd"     => $argu["bcm_pwd"],
				"bcm_comment" => $argu["bcm_comment"],
				"bcm_date"    => date("Y-m-d H:i:s"),
				"user_id"     => $_SESSION['user_id'],
				"user_no"     => $_SESSION['user_no'],
				"bcm_ip"      => $_SERVER['REMOTE_ADDR'],
			));

			$res = $this->DB->autoExecute("board_comment", $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
			    go_url("","등록에 실패했습니다!\\n[".$res->getMessage()."]");
			    exit;
			}
			return true;
		}

		/*****
		 * 댓글내용을 가져온다.
		 *****/
		function get_comment_view($bcm_gubun,$b_class,$b_no,$bcm_no){
			$query = "
				select
					*
				from
					board_comment
				where
					bcm_gubun   = '{$bcm_gubun}'
					and b_class = '{$b_class}'
					and b_no    = '{$b_no}'
					and bcm_no  = '{$bcm_no}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				go_url("","댓글 내용을 가져오지 못했습니다.");
				exit;
			}
			return $row;
		}

		/*****
		 * 댓글목록을 가져온다.
		 *****/
		function get_comment_list($b_class,$b_no,$bcm_gubun = 'BD'){
			$query = "
				select
					bc.b_class,
					bc.b_no,
					bc.bcm_gubun,
					bc.user_id,
					bc.bcm_name,
					u.user_name,
					bc.bcm_pwd,
					bc.bcm_comment,
					bc.bcm_date,
					date_format(bc.bcm_date,'%Y.%m.%d') as bcm_date_name,
					bc.bcm_ip,
					bc.bcm_no
				from
					board_comment bc
					left outer join ".TABLE_USER." u
						on bc.user_id = u.user_id
				where
					bc.bcm_gubun = '{$bcm_gubun}'
					and bc.b_class  = '{$b_class}'
					and bc.b_no = '{$b_no}'
				order by bc.bcm_date desc
			";

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("","댓글을 가져오지 못했습니다.");
				exit;
			}
			return $list;
		}

		/*****
		 * 댓글을 삭제 한다.
		 *****/
		function set_comment_delete($argu,$all = false){
			$query = "
				delete from board_comment
				where
					bcm_gubun   = '{$argu['bcm_gubun']}'
					and b_class = '{$argu['b_class']}'
					and b_no    = '{$argu['b_no']}' ";
			if(!$all)
			$query .= "
					and bcm_no  = '{$argu['bcm_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    go_url("","댓글이 삭제되지 않았습니다.");
				exit;
			}
			return true;
		}


		/*****
		 * 게시판 권한 받기
		 *****/
		function set_board_auth($mode){
			global $_SESSION;
			$ses=$_SESSION;

			$isAuth=false;

			if($mode=="view"){
				if($ses['user_level']<=$this->_b_role_r && strlen($ses['user_id'])>3){ //사용자레벨이 게시판 권한설정값보다 작거나 같을시
					$isAuth=true;
				}
				else{
					if($this->_b_role_r >= 10){	//게시판 권한설정값이 비회원일시
						$isAuth=true;
					}
					else{
						$isAuth=false;
					}
				}

			}

			if($mode=="write"){
				if($ses['user_level']<=$this->_b_role_w && strlen($ses['user_id'])>3){ //사용자레벨이 게시판 권한설정값보다 작거나 같을시
					$isAuth=true;
				}
				else{
					if($this->_b_role_w >= 10){	//게시판 권한설정값이 비회원일시
						$isAuth=true;
					}
					else{
						$isAuth=false;
					}
				}
			}

			if($mode=="replay"){

				if($ses['user_level']<=$this->_b_role_rp && strlen($ses['user_id'])>3){ //사용자레벨이 게시판 권한설정값보다 작거나 같을시
					$isAuth=true;
				}
				else{
					if($this->_b_role_rp >= 10){	//게시판 권한설정값이 비회원일시
						$isAuth=true;
					}
					else{
						$isAuth=false;
					}
				}
			}

			if($mode=="list"){
				
				if($ses['user_level']<=$this->_b_role_l && strlen($ses['user_id'])>3){ //사용자레벨이 게시판 권한설정값보다 작거나 같을시
					$isAuth=true;
				}
				else{
					if($this->_b_role_l >= 10){	//게시판 권한설정값이 비회원일시
						$isAuth=true;
					}
					else{
						$isAuth=false;
					}
				}
			}

			if($mode=="cm"){
				if($ses['user_level']<=$this->_b_role_cm && strlen($ses['user_id'])>3){ //사용자레벨이 게시판 권한설정값보다 작거나 같을시
					$isAuth=true;
				}
				else{
					if($this->_b_role_cm >= 10){	//게시판 권한설정값이 비회원일시
						$isAuth=true;
					}
					else{
						$isAuth=false;
					}
				}
			}

			return $isAuth;
		}
		 
		 /*****
		 * 게시글 권한 받기
		 *****/
		function get_board_auth($argu){
			global $_SESSION;
			$ses=$_SESSION;

			$isAuth="E";

			$data = $this->get_board_view($argu["b_class"], $argu["b_no"]);

			//본인이 쓴 글이나 관리자일 경우
			if(($ses["user_id"]==$data["user_id"] || $ses['user_level']==1 || $ses["user_id"]==$this->_user_id) && isset($ses["user_id"])){
				$isAuth="A";
			}
			else{
				if(strlen($argu["board_pwd"])>0){
					if($data["b_pwd"]==$argu["board_pwd"] || $data["user_pwd"]==$argu["board_pwd"]){
						$isAuth="A";
					}else{
						$isAuth="F";
					}
				}else{
					$isAuth="E";
				}				
			}

			return $isAuth;
		}

		function get_comment_auth($argu,$bcm_gubun,$bcm_no){
			global $_SESSION;
			$ses=$_SESSION;
			$data = $this->get_comment_view($bcm_gubun,$argu["b_class"], $argu["b_no"],$bcm_no);
			
			$isAuth="E";
			if(($ses["user_id"] == $data["user_id"] || $ses['user_level']==1 || $ses["user_id"]==$this->_user_id) && isset($ses["user_id"])){
				$isAuth = "A";
			}
			else{
				if(strlen($argu["cmt_pwd"])>0){
					if($data["bcm_pwd"]==substr(md5($argu["cmt_pwd"]),0,10)){
						$isAuth="A";
					}else{
						$isAuth="F";
					}
				}else{
					$isAuth="E";
				}				
			}
			return $isAuth;
		}

	}
			
?>