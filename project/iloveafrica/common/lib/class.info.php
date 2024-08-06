<?
	class Info {
		var $DB;
		var $_f_no = 0;
		var $_listnum = 12;
		var $_user_id;

		var $_PDS = _PDS;
		var $_PDS_SUB = "info/";
		var $_upload_limit;

		# 생성자
		function Info($db) {
			$this->DB = $db;
			$this->_PDS .= $this->_PDS_SUB;
			$this->_upload_limit = 5*1024*1024;
			$this->_user_id = ($_SESSION['user_id']) ? $_SESSION['user_id'] : $_SESSION['guest_id'];
		}
		
		/*****
		 * 파일을 업로드 한다.
		 *****/
		function file_upload($argu){

			$_uploaded = array();
			
			// 첨부파일 argu 를 정리한다.
			if(is_array($_FILES)){
				foreach($_FILES as $fname => $fileobj){
					$_FILE_VALUE = $_FILES[$fname];

					$tmp_file="tmp_".$fname;
					$del_file="del_".$fname;

					if($_FILE_VALUE !== null && $_FILE_VALUE[error] == 0 && $_FILE_VALUE[size] > 0 ){// 첨부파일이 있을경우

						$_sf_type = array_pop(explode(".",$_FILE_VALUE["name"]));
						$_sf_type = strtolower($_sf_type);
						$_filename = $this->_f_no."_".$fname.".".$_sf_type;

						if($_FILE_VALUE[size]>$this->_upload_limit){// 용량이 클 경우
							go_url("","업로드 제한용량을 초과하였습니다.");
							exit;
						}else{
							if(file_exists($this->_PDS.$_filename)){ // 파일이 존재할 경우
								@unlink($this->_PDS.$_filename);
							}

							if(move_uploaded_file($_FILE_VALUE["tmp_name"], $this->_PDS.$_filename)){
								$_uploaded[$fname] = $_filename;
							}else{
								go_url("","파일 업로드에 실패했습니다.");
								exit;
							}
						}
					}else{
						$_uploaded[$fname] = $argu[$tmp_file];
					}

					if($argu[$del_file]==1){
						@unlink($this->_PDS.$argu[$tmp_file]);
						$_uploaded[$fname] = "";
					}
				}
			}

			return $_uploaded;
		}


		/******************************************************************************************

			카테고리

		******************************************************************************************/
		
		/*****
		 * 카테고리를 등록한다.
		 *****/
		function set_category_insert($argu){
			$res = $ic_num = $this->DB->getOne("select coalesce(max(ic_num),0)+1 from ".TABLE_INFO_CATEGORY);
			if (DB::isError($res)) {
			    go_url("","등록에 실패했습니다!\\n[".$res->getMessage()."]");
			    exit;
			}

			$data = array(
				//"ic_no"         => $ic_no,
				"ic_title"         => $argu["ic_title"],
				"ic_img_off"         => $_filename["ic_img_off"],
				"ic_img_on"         => $_filename["ic_img_on"],
				"ic_img_list"         => $_filename["ic_img_list"],
				"ic_img_title"         => $_filename["ic_img_title"],
				"ic_memo"		=> txtParse($argu["ic_memo"],1),
				"ic_num"		=> $ic_num,
				"ic_status"       => $argu["ic_status"],
				"ic_cntchk"       => $argu["ic_cntchk"]
			);


			$sth = $this->DB->autoPrepare(TABLE_INFO_CATEGORY, array_keys($data), DB_AUTOQUERY_INSERT);
			$res = $this->DB->execute($sth, array_values($data));

			if (DB::isError($res)) {
			    go_url("","등록에 실패했습니다!\\n[".$res->getMessage()."]");
			    exit;
			}

			/// 파일 업로드
			$this->_f_no = $this->DB->getOne("select LAST_INSERT_ID()");
			$_filename = $this->file_upload($argu);
			
			$data = array(
				"ic_img_off"         => $_filename["ic_img_off"],
				"ic_img_on"         => $_filename["ic_img_on"],
				"ic_img_list"         => $_filename["ic_img_list"],
				"ic_img_title"         => $_filename["ic_img_title"]
			);

			$result = $this->DB->autoExecute(TABLE_INFO_CATEGORY, $data,
			                        DB_AUTOQUERY_UPDATE, " ic_no = LAST_INSERT_ID() ");

			if (DB::isError($result)) {
			    go_url("","파일등록에 실패했습니다!\\n[".$result->getMessage()."]");
			    exit;
			}

			return true;
		}

		/*****
		 * 카테고리를 수정한다.
		 *****/
		function set_category_modify($argu){

			/// 파일 업로드
			$this->_f_no = $argu["ic_no"];
			$_filename = $this->file_upload($argu);

			$data = array(
				"ic_title"         => $argu["ic_title"],
				"ic_img_off"         => $_filename["ic_img_off"],
				"ic_img_on"         => $_filename["ic_img_on"],
				"ic_img_list"         => $_filename["ic_img_list"],
				"ic_img_title"         => $_filename["ic_img_title"],
				"ic_memo"		=> txtParse($argu["ic_memo"],1),
				"ic_status"       => $argu["ic_status"],
				"ic_cntchk"       => $argu["ic_cntchk"]
			);

			$result = $this->DB->autoExecute(TABLE_INFO_CATEGORY, $data,
			                        DB_AUTOQUERY_UPDATE, " ic_no = '{$argu['ic_no']}' ");

			if (DB::isError($result)) {
			    go_url("","수정에 실패했습니다!\\n[".$result->getMessage()."]");
			    exit;
			}

			return true;
		}

		/*****
		 * 카테고리 정렬값을 수정한다.
		 *****/
		function set_category_order($argu){

			if($argu["s_mode"] == "up"){

				$res = $ic_no = $this->DB->getOne("select ic_no from ".TABLE_INFO_CATEGORY." where (ic_num < '".$argu["ic_num"]."') order by ic_num desc limit 1");

				if($ic_no){
					
					$query = "
						update ".TABLE_INFO_CATEGORY."
						set
							ic_num = ic_num - 1
						where
							ic_no = '".$argu["ic_no"]."'
					";
					$res = $this->DB->query($query);
					if (DB::isError($res)) {
						go_url("", $res->getMessage());
						exit;
					}
					
					$query1 = "
						update ".TABLE_INFO_CATEGORY."
						set
							ic_num = ic_num + 1
						where
							ic_no = '".$ic_no."'
					";

					$res1 = $this->DB->query($query1);
					if (DB::isError($res1)) {
						go_url("", $res1->getMessage());
						exit;
					}

				}
				else{
					go_url("", "정열값이 최상위 입니다.");
					exit;
				}
			
			}
			else if($argu["s_mode"] == "down"){
				$res = $ic_no = $this->DB->getOne("select ic_no from ".TABLE_INFO_CATEGORY." where (ic_num > '".$argu["ic_num"]."') order by ic_num asc limit 1");

				if($ic_no){
					
					$query = "
						update ".TABLE_INFO_CATEGORY."
						set
							ic_num = ic_num + 1
						where
							ic_no = '".$argu["ic_no"]."'
					";
					$res = $this->DB->query($query);
					if (DB::isError($res)) {
						go_url("", $res->getMessage());
						exit;
					}
					
					$query1 = "
						update ".TABLE_INFO_CATEGORY."
						set
							ic_num = ic_num - 1
						where
							ic_no = '".$ic_no."'
					";

					$res1 = $this->DB->query($query1);
					if (DB::isError($res1)) {
						go_url("", $res1->getMessage());
						exit;
					}

				}
				else{
					go_url("", "정열값이 최하위 입니다.");
					exit;
				}
			}
			
/*			
			if(is_array($argu["ic_no"])){
				foreach($argu["ic_no"] as $key => $ic_no){

					$data = array(
						"ic_num"       => $argu["ic_num"][$key]
					);

					$result = $this->DB->autoExecute(TABLE_INFO_CATEGORY, $data,
											DB_AUTOQUERY_UPDATE, " ic_no = '{$ic_no}' ");
				}
			}else{
				go_url("","수정에 실패했습니다!");
			    exit;
			}
*/
			return true;
		}

		/*****
		 * 카테고리를 삭제한다.
		 *****/
		function set_category_delete($argu){

			$_row = $this->get_category_view($argu["ic_no"]);

			/// 첨부파일을 삭제한다.
			@unlink($this->_PDS.$_row["ic_img_off"]);
			@unlink($this->_PDS.$_row["ic_img_on"]);
			@unlink($this->_PDS.$_row["ic_img_list"]);
			@unlink($this->_PDS.$_row["ic_img_title"]);

			$query = "
				delete from ".TABLE_INFO_CATEGORY."
				where  ic_no = '{$argu['ic_no']}'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
				go_url("","삭제에 실패했습니다!\\n[".$res->getMessage()."]");
				exit;
			}
			return true;
		}

		/*****
		 * 카테고리 목록을 가져온다.
		 *****/
		function get_category_list($argu,&$total,$limit = true){
		 
			$query = "
				select
					count(*)
				from
					".TABLE_INFO_CATEGORY."
			";

			$total = $this->DB->getOne($query);
			if (DB::isError($total)) {
				go_url("","목록을 불러올 수 없습니다!\\n[".$total->getMessage()."]");
			    exit;
			}

			$query = "
				select
					*
				from
					".TABLE_INFO_CATEGORY."
				order by
					ic_num asc,
					ic_no desc ";
			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_listnum.",".$this->_listnum;

			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($list)) {
				go_url("","목록을 불러올 수 없습니다!\\n[".$list->getMessage()."]");
			    exit;
			}

			return $list;
		}
		
		/*****
		 * 카테고리 전체 목록을 가져온다.
		 *****/
		function get_category_all(&$ctotal){
		 
			$addwhere = " where ic_status='Y' ";

			$query = "
				select
					count(*)
				from
					".TABLE_INFO_CATEGORY."
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
					".TABLE_INFO_CATEGORY."
				$addwhere
				order by
					ic_num asc,
					ic_no desc ";

			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($list)) {
				go_url("","목록을 불러올 수 없습니다!\\n[".$list->getMessage()."]");
				exit;
			}

			return $list;
		}

		/*****
		 * 카테고리 설정을 가져온다.
		 *****/
		function get_category_view($ic_no){
			$query = "
				select
					*
				from
					".TABLE_INFO_CATEGORY."
				where
					ic_no = '{$ic_no}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				go_url("","내용을 불러올 수 없습니다!\\n[".$row->getMessage()."]");
				exit;
			}

			return $row;
		}

			
			
		/*****
		 * 중분류를 등록한다.
		 *****/
		function set_category_insert_m($argu){
			$res = $icm_num = $this->DB->getOne("select coalesce(max(icm_num),0)+1 from ".TABLE_INFO_CATEGORY_M." where ic_no = '".$argu["ic_no"]."'");
			if (DB::isError($res)) {
			    go_url("","등록에 실패했습니다!\\n[".$res->getMessage()."]");
			    exit;
			}


			$data = array(
				"ic_no"         => $argu["ic_no"],
				"icm_title"         => $argu["icm_title"],
				"icm_img_off"         => $_filename["icm_img_off"],
				"icm_img_on"         => $_filename["icm_img_on"],
				"icm_img_list"         => $_filename["icm_img_list"],
				"icm_img_title"         => $_filename["icm_img_title"],
				"icm_memo"		=> txtParse($argu["icm_memo"],1),
				"icm_num"		=> $icm_num,
				"icm_status"       => $argu["icm_status"],
				"icm_link"       => $argu["icm_link"]
			);

			$sth = $this->DB->autoPrepare(TABLE_INFO_CATEGORY_M, array_keys($data), DB_AUTOQUERY_INSERT);
			$res = $this->DB->execute($sth, array_values($data));

			if (DB::isError($res)) {
			    go_url("","등록에 실패했습니다!\\n[".$res->getMessage()."]");
			    exit;
			}

			/// 파일 업로드
			$this->_f_no = $this->DB->getOne("select LAST_INSERT_ID()");
			$_filename = $this->file_upload($argu);

			$data = array(
				"icm_img_off"         => $_filename["icm_img_off"],
				"icm_img_on"         => $_filename["icm_img_on"],
				"icm_img_list"         => $_filename["icm_img_list"],
				"icm_img_title"         => $_filename["icm_img_title"]
			);
			
			$result = $this->DB->autoExecute(TABLE_INFO_CATEGORY_M, $data,
			                        DB_AUTOQUERY_UPDATE, " icm_no = LAST_INSERT_ID() ");

			if (DB::isError($result)) {
			    go_url("","파일등록에 실패했습니다!\\n[".$result->getMessage()."]");
			    exit;
			}


			return true;
		}

		/*****
		 * 중분류를 수정한다.
		 *****/
		function set_category_modify_m($argu){

			/// 파일 업로드
			$this->_f_no = $argu["icm_no"];
			$_filename = $this->file_upload($argu);

			$data = array(
				"icm_title"         => $argu["icm_title"],
				"icm_img_off"         => $_filename["icm_img_off"],
				"icm_img_on"         => $_filename["icm_img_on"],
				"icm_img_list"         => $_filename["icm_img_list"],
				"icm_img_title"         => $_filename["icm_img_title"],
				"icm_memo"		=> txtParse($argu["icm_memo"],1),
				"icm_status"       => $argu["icm_status"],
				"icm_link"       => $argu["icm_link"]
			);

			$result = $this->DB->autoExecute(TABLE_INFO_CATEGORY_M, $data,
			                        DB_AUTOQUERY_UPDATE, " icm_no = '{$argu['icm_no']}' ");

			if (DB::isError($result)) {
			    go_url("","수정에 실패했습니다!\\n[".$result->getMessage()."]");
			    exit;
			}

			return true;
		}

		/*****
		 * 중분류 정렬값을 수정한다.
		 *****/
		function set_category_order_m($argu){

			if($argu["s_mode"] == "up"){

				$res = $icm_no = $this->DB->getOne("select icm_no from ".TABLE_INFO_CATEGORY_M." where (icm_num < '".$argu["icm_num"]."') and (ic_no = '".$argu["ic_no"]."') order by icm_num desc limit 1");

				if($icm_no){
					
					$query = "
						update ".TABLE_INFO_CATEGORY_M."
						set
							icm_num = icm_num - 1
						where
							icm_no = '".$argu["icm_no"]."'
					";
					$res = $this->DB->query($query);
					if (DB::isError($res)) {
						go_url("", $res->getMessage());
						exit;
					}
					
					$query1 = "
						update ".TABLE_INFO_CATEGORY_M."
						set
							icm_num = icm_num + 1
						where
							icm_no = '".$icm_no."'
					";

					$res1 = $this->DB->query($query1);
					if (DB::isError($res1)) {
						go_url("", $res1->getMessage());
						exit;
					}

				}
				else{
					go_url("", "정열값이 최상위 입니다.");
					exit;
				}
			
			}
			else if($argu["s_mode"] == "down"){
				$res = $icm_no = $this->DB->getOne("select icm_no from ".TABLE_INFO_CATEGORY_M." where (icm_num > '".$argu["icm_num"]."') and (ic_no = '".$argu["ic_no"]."') order by icm_num asc limit 1");

				if($icm_no){
					
					$query = "
						update ".TABLE_INFO_CATEGORY_M."
						set
							icm_num = icm_num + 1
						where
							icm_no = '".$argu["icm_no"]."'
					";
					$res = $this->DB->query($query);
					if (DB::isError($res)) {
						go_url("", $res->getMessage());
						exit;
					}
					
					$query1 = "
						update ".TABLE_INFO_CATEGORY_M."
						set
							icm_num = icm_num - 1
						where
							icm_no = '".$icm_no."'
					";

					$res1 = $this->DB->query($query1);
					if (DB::isError($res1)) {
						go_url("", $res1->getMessage());
						exit;
					}

				}
				else{
					go_url("", "정열값이 최하위 입니다.");
					exit;
				}
			}
			
/*			
			if(is_array($argu["icm_no"])){
				foreach($argu["icm_no"] as $key => $icm_no){

					$data = array(
						"icm_num"       => $argu["icm_num"][$key]
					);

					$result = $this->DB->autoExecute(TABLE_INFO_CATEGORY_M, $data,
											DB_AUTOQUERY_UPDATE, " icm_no = '{$icm_no}' ");
				}
			}else{
				go_url("","수정에 실패했습니다!");
			    exit;
			}
*/
			return true;
		}

		/*****
		 * 중분류를 삭제한다.
		 *****/
		function set_category_delete_m($argu){

			$_row = $this->get_category_view_m($argu["icm_no"]);

			/// 첨부파일을 삭제한다.
			@unlink($this->_PDS.$_row["icm_img_off"]);
			@unlink($this->_PDS.$_row["icm_img_on"]);
			@unlink($this->_PDS.$_row["icm_img_list"]);
			@unlink($this->_PDS.$_row["icm_img_title"]);

			$query = "
				delete from ".TABLE_INFO_CATEGORY_M."
				where  icm_no = '{$argu['icm_no']}'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
				go_url("","삭제에 실패했습니다!\\n[".$res->getMessage()."]");
				exit;
			}
			return true;
		}

		/*****
		 * 중분류 목록을 가져온다.
		 *****/
		function get_category_list_m($argu,&$total,$limit = true){
		 
			$query = "
				select
					count(*)
				from
					".TABLE_INFO_CATEGORY_M."
				where ic_no = '".$argu['ic_no']."'";

			$total = $this->DB->getOne($query);
			if (DB::isError($total)) {
				go_url("","목록을 불러올 수 없습니다!\\n[".$total->getMessage()."]");
			    exit;
			}

			$query = "
				select
					*, (select ic_title from ".TABLE_INFO_CATEGORY." where ic_no = '".$argu["ic_no"]."') as ic_title
				from
					".TABLE_INFO_CATEGORY_M."
				where ic_no = '".$argu['ic_no']."'
				order by
					icm_num asc,
					icm_no desc ";

			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_listnum.",".$this->_listnum;

			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($list)) {
				go_url("","목록을 불러올 수 없습니다!\\n[".$list->getMessage()."]");
			    exit;
			}

			return $list;
		}
		
		/*****
		 * 중분류 전체 목록을 가져온다.
		 *****/
		function get_category_all_m($ic_no,&$ctotal){
		 
			$addwhere = " where (icm_status='Y') and (ic_no ='".$ic_no."') ";

			$query = "
				select
					count(*)
				from
					".TABLE_INFO_CATEGORY_M."
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
					".TABLE_INFO_CATEGORY_M."
				$addwhere
				order by
					icm_num asc,
					icm_no desc ";

			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($list)) {
				go_url("","목록을 불러올 수 없습니다!\\n[".$list->getMessage()."]");
				exit;
			}

			return $list;
		}

		function get_category_all_m_cart(&$ctotal){
		 
			$addwhere = " where (icm_status='Y') and (icm_title <> '특별♥후원')";

			$query = "
				select
					count(*)
				from
					".TABLE_INFO_CATEGORY_M."
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
					".TABLE_INFO_CATEGORY_M." AS A
				$addwhere
				order by
					(select ic_num from ".TABLE_INFO_CATEGORY." where ic_no = A.ic_no) asc,
					icm_num asc,
					icm_no desc ";

			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($list)) {
				go_url("","목록을 불러올 수 없습니다!\\n[".$list->getMessage()."]");
				exit;
			}

			return $list;
		}


		/*****
		 * 중분류 설정을 가져온다.
		 *****/
		function get_category_view_m($icm_no){
			$query = "
				select
					*, (select ic_title from ".TABLE_INFO_CATEGORY." where ic_no = A.ic_no) as ic_title
				from
					".TABLE_INFO_CATEGORY_M." AS A
				where
					icm_no = '{$icm_no}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				go_url("","내용을 불러올 수 없습니다!\\n[".$row->getMessage()."]");
				exit;
			}

			return $row;
		}
			
			
		/******************************************************************************************

			상품 관련

		******************************************************************************************/

		/*****
		 * 상품을 등록한다.
		 *****/
		function set_item_insert($argu){
			$res = $ii_no = $this->DB->getOne("select coalesce(max(ii_num),0)+1 from ".TABLE_INFO_ITEM." where (ic_no = '".$argu["ic_no"]."') and (icm_no = '".$argu["icm_no"]."')");
			if (DB::isError($res)) {
			    go_url("","등록에 실패했습니다!\\n[".$res->getMessage()."]");
			    exit;
			}


			$data = array(
				//"ii_no"         => $ii_no,
				"ic_no"         => $argu["ic_no"],
				"icm_no"         => $argu["icm_no"],
				"ics_no"         => $argu["ics_no"],
				"ii_num"         => $ii_no,
				"ii_name"         => $argu["ii_name"],
				"ii_subname"         => $argu["ii_subname"],
				"ii_img_list"         => $_filename["ii_img_list"],
				"ii_img_1"         => $_filename["ii_img_1"],
				"ii_img_2"         => $_filename["ii_img_2"],
				"ii_img_3"         => $_filename["ii_img_3"],
				"ii_price"         => $argu["ii_price"],
				"ii_memo"		=> txtParse($argu["ii_memo"],1),
				"ii_order"		=> ($argu["ii_order"]>0) ? $argu["ii_order"] : 0,
				"ii_vote"       => ($argu["ii_vote"]>0) ? $argu["ii_vote"] : 0,
				"ii_cnt"       => ($argu["ii_cnt"]>0) ? $argu["ii_cnt"] : 0,
				"ii_status"       => $argu["ii_status"],
				"ii_regdate"       => _NowTime
			);

			$sth = $this->DB->autoPrepare(TABLE_INFO_ITEM, array_keys($data), DB_AUTOQUERY_INSERT);
			$res = $this->DB->execute($sth, array_values($data));

			if (DB::isError($res)) {
			    go_url("","등록에 실패했습니다!\\n[".$res->getMessage()."]");
			    exit;
			}


			/// 파일 업로드
			$this->_f_no = $this->DB->getOne("select LAST_INSERT_ID()");
			$_filename = $this->file_upload($argu);

			$data = array(
				"ii_img_list"         => $_filename["ii_img_list"],
				"ii_img_1"         => $_filename["ii_img_1"],
				"ii_img_2"         => $_filename["ii_img_2"],
				"ii_img_3"         => $_filename["ii_img_3"],
			);
			
			$result = $this->DB->autoExecute(TABLE_INFO_ITEM, $data,
			                        DB_AUTOQUERY_UPDATE, " ii_no = LAST_INSERT_ID() ");

			if (DB::isError($result)) {
			    go_url("","파일등록에 실패했습니다!\\n[".$result->getMessage()."]");
			    exit;
			}


			return true;
		}

		/*****
		 * 상품을 수정한다.
		 *****/
		function set_item_modify($argu){

			/// 파일 업로드
			$this->_f_no = $argu["ii_no"];
			$_filename = $this->file_upload($argu);

			$data = array(
				"ii_name"         => $argu["ii_name"],
				"ii_subname"         => $argu["ii_subname"],
				"ii_img_list"         => $_filename["ii_img_list"],
				"ii_img_1"         => $_filename["ii_img_1"],
				"ii_img_2"         => $_filename["ii_img_2"],
				"ii_img_3"         => $_filename["ii_img_3"],
				"ii_price"         => $argu["ii_price"],
				"ii_memo"		=> txtParse($argu["ii_memo"],1),
				"ii_order"		=> ($argu["ii_order"]>0) ? $argu["ii_order"] : 0,
				"ii_vote"       => ($argu["ii_vote"]>0) ? $argu["ii_vote"] : 0,
				"ii_cnt"       => ($argu["ii_cnt"]>0) ? $argu["ii_cnt"] : 0,
				"ii_status"       => $argu["ii_status"],
				"ii_updated"       => _NowTime
			);

			$result = $this->DB->autoExecute(TABLE_INFO_ITEM, $data,
			                        DB_AUTOQUERY_UPDATE, " ii_no = '{$argu['ii_no']}' ");

			if (DB::isError($result)) {
				go_url("","수정에 실패했습니다!\\n[".$result->getMessage()."]");
				exit;
			}

			return true;
		}
		
		/*****
		 * 상품 정렬값을 수정한다.
		 *****/
		function set_item_order($argu){
			if($argu["icm_no"] == ""){
				$argu["icm_no"] = 0;
			}
				
			if($argu["s_mode"] == "up"){
				

				$res = $ii_no = $this->DB->getOne("select ii_no from ".TABLE_INFO_ITEM." where (ii_num < '".$argu["ii_num"]."') and (ic_no = '".$argu["ic_no"]."') and (icm_no = '".$argu["icm_no"]."') order by ii_num desc limit 1");

				if($ii_no){
					
					$query = "
						update ".TABLE_INFO_ITEM."
						set
							ii_num = ii_num - 1
						where
							ii_no = '".$argu["ii_no"]."'
					";
					$res = $this->DB->query($query);
					if (DB::isError($res)) {
						go_url("", $res->getMessage());
						exit;
					}
					
					$query1 = "
						update ".TABLE_INFO_ITEM."
						set
							ii_num = ii_num + 1
						where
							ii_no = '".$ii_no."'
					";

					$res1 = $this->DB->query($query1);
					if (DB::isError($res1)) {
						go_url("", $res1->getMessage());
						exit;
					}

				}
				else{
					go_url("", "정열값이 최상위 입니다.");
					exit;
				}
			
			}
			else if($argu["s_mode"] == "down"){
				$res = $ii_no = $this->DB->getOne("select ii_no from ".TABLE_INFO_ITEM." where (ii_num > '".$argu["ii_num"]."') and (ic_no = '".$argu["ic_no"]."') and (icm_no = '".$argu["icm_no"]."') order by ii_num asc limit 1");

				if($ii_no){
					
					$query = "
						update ".TABLE_INFO_ITEM."
						set
							ii_num = ii_num + 1
						where
							ii_no = '".$argu["ii_no"]."'
					";
					$res = $this->DB->query($query);
					if (DB::isError($res)) {
						go_url("", $res->getMessage());
						exit;
					}
					
					$query1 = "
						update ".TABLE_INFO_ITEM."
						set
							ii_num = ii_num - 1
						where
							ii_no = '".$ii_no."'
					";

					$res1 = $this->DB->query($query1);
					if (DB::isError($res1)) {
						go_url("", $res1->getMessage());
						exit;
					}

				}
				else{
					go_url("", "정열값이 최하위 입니다.");
					exit;
				}
			}

			return true;
		}

		/*****
		 * 상품을 삭제한다.
		 *****/
		function set_item_delete($argu){
			$_row = $this->get_item_view($argu["ic_no"], $argu["ii_no"]);

			/// 첨부파일을 삭제한다.
			@unlink($this->_PDS.$_row["ii_img_list"]);
			@unlink($this->_PDS.$_row["ii_img_1"]);
			@unlink($this->_PDS.$_row["ii_img_2"]);
			@unlink($this->_PDS.$_row["ii_img_3"]);

			$query = "
				delete from ".TABLE_INFO_ITEM."
				where
					ic_no   = '{$argu['ic_no']}'
					and ii_no  = '{$argu['ii_no']}'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
				go_url("","삭제에 실패했습니다!\\n[".$res->getMessage()."]");
				exit;
			}
			return true;
		}


		/*****
		 * 상품 목록을 가져온다.
		 *****/
		function get_item_list($argu,&$total,$limit = true){
			 
			global $_adminpage;

			$addwhere = ($argu['ic_no']>0) ? " where (ic_no = '".$argu['ic_no']."') and (icm_no = '".$argu['icm_no']."') " : " where (1=1) ";
			if(!$_adminpage || $argu["subpage"]=="info_list"){ $addwhere .= " and ii_status = 'Y' "; }
			if($argu['s_string']){ $addwhere .= " and ii_name like '%".$argu['s_string']."%' "; }

			$query = "
				select
					count(*)
				from
					".TABLE_INFO_ITEM." 
				$addwhere";

			$res = $total = $this->DB->getOne($query,array());

			if (DB::isError($res)) {
				//echo $query;
				go_url("","목록을 가져올 수 없습니다!\\n[".$res->getMessage()."]");
				exit;
			}

			$query = "
				select
					*
				from
					".TABLE_INFO_ITEM."
				$addwhere
				order by
					ii_num asc,
					ii_regdate desc";
			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_listnum.",".$this->_listnum;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				//debug($res);
				go_url("","목록을 가져올 수 없습니다!\\n[".$res->getMessage()."]");
				exit;
			}
			return $list;
		}

		/*****
		* 상품 모든 목록을 가져온다.
		*****/
		function get_item_all($argu,&$total){
			 
			global $_adminpage;

			$addwhere = ($argu['ic_no']>0) ? " where (ic_no = '".$argu['ic_no']."') and (icm_no ='".$argu['icm_no']."') " : " where (1=1) ";
			if(!$_adminpage || $argu["subpage"]=="info_list"){ $addwhere .= " and ii_status = 'Y' "; }
			if($argu['s_string']){ $addwhere .= " and ii_name like '%".$argu['s_string']."%' "; }

			$query = "
				select
					count(*)
				from
					".TABLE_INFO_ITEM." 
				$addwhere";

			$res = $total = $this->DB->getOne($query,array());

			if (DB::isError($res)) {
				//echo $query;
				go_url("","목록을 가져올 수 없습니다!\\n[".$res->getMessage()."]");
				exit;
			}

			$query = "
				select
					*
				from
					".TABLE_INFO_ITEM."
				$addwhere
				order by
					ii_num asc,
					ii_regdate desc";

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("","목록을 가져올 수 없습니다!\\n[".$res->getMessage()."]");
				exit;
			}
			return $list;
		}

		/*****
		* 상위 일부 상품을 가져온다.
		*****/
		function get_item_limit($argu, $limit){

			$addwhere = ($argu['ic_no']) ? " ic_no = '{$argu['ic_no']}' " : " (1=1) ";
			
			// 다음 상품
			$query = "
				select
					*
				from
					".TABLE_INFO_ITEM."
				where
					$addwhere
				order by
					ii_num asc,
					ii_regdate desc
				limit ".$limit;

			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($list)) {
				go_url("","목록을 가져올 수 없습니다!\\n[".$list->getMessage()."]");
				exit;
			}
			return $list;
		}

		/*****
		* 다음 일부 상품을 가져온다.
		*****/
		function get_item_next($argu, $limit){
			
			// 다음 상품
			$query = "
				select
					*
				from
					".TABLE_INFO_ITEM."
				where
					ic_no = '{$argu['ic_no']}'
					and
					ii_num > {$argu['ii_num']}
				order by
					ii_num asc,
					ii_regdate desc
				limit ".$limit;

			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($list)) {
				go_url("","목록을 가져올 수 없습니다!\\n[".$list->getMessage()."]");
				exit;
			}
			return $list;
		}

		/*****
		* 이전 일부 상품을 가져온다.
		*****/
		function get_item_prev($argu, $limit){
			
			// 다음 상품
			$query = "
				select
					*
				from
					".TABLE_INFO_ITEM."
				where
					ic_no = '{$argu['ic_no']}'
					and
					ii_num < {$argu['ii_num']}
				order by
					ii_num desc,
					ii_regdate asc
				limit ".$limit;

			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($list)) {
				go_url("","목록을 가져올 수 없습니다!\\n[".$list->getMessage()."]");
				exit;
			}
			return $list;
		}

		/*****
		* 상품 정보를 가져온다.
		*****/
		function get_item_view($ii_no){

			global $_adminpage;

			$query = "
				select
					*, (select icm_title from ".TABLE_INFO_CATEGORY_M." where icm_no = A.icm_no) as icm_title
				from
					".TABLE_INFO_ITEM." as A
				where
					ii_no = '{$ii_no}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				go_url("","내용을 불러올 수 없습니다!\\n[".$row->getMessage()."]");
				exit;
			}
			
			$ic_no = $row["ic_no"];
				
			if(!$_adminpage){
				// 한번 읽은글은 브라우저를 닫기전까지는 카운트를 증가시키지 않음
				$ii_name = "ii_view_{$ic_no}_{$ii_no}";
				if (!get_session($ii_name)){
					// 조회수 증가
					$query = "
						update ".TABLE_INFO_ITEM." 
						set
							ii_cnt = ii_cnt + 1
						where
							ii_no = '$ii_no'
					";
					$res = $this->DB->query($query);

					set_session($ii_name, TRUE);
				}
			}

			return $row;
		}

	}
?>