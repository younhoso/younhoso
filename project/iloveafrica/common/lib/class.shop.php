<?
	class Shop {
		var $DB;
		var $_f_no = 0;
		var $_listnum = 12;
		var $_user_id;
		var $_PDS = _PDS;
		var $_PDS_SUB = "shop/";
		var $_upload_limit;

		# 생성자
		function Shop($db) {
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
			$res = $sc_num = $this->DB->getOne("select coalesce(max(sc_num),0)+1 from ".TABLE_SHOP_CATEGORY);
			if (DB::isError($res)) {
			    go_url("","등록에 실패했습니다!\\n[".$res->getMessage()."]");
			    exit;
			}

			/// 파일 업로드
//			$this->_f_no = $sc_no;
//			$_filename = $this->file_upload($argu);

			$data = array(
				//"sc_no"         => $sc_no,
				"sc_title"         => $argu["sc_title"],
				"sc_img_off"         => $_filename["sc_img_off"],
				"sc_img_on"         => $_filename["sc_img_on"],
				"sc_img_list"         => $_filename["sc_img_list"],
				"sc_img_title"         => $_filename["sc_img_title"],
				"sc_memo"		=> txtParse($argu["sc_memo"],1),
				"sc_num"		=> $sc_num,
				"sc_status"       => $argu["sc_status"],
				"sc_cntchk"       => $argu["sc_cntchk"]
			);

			$sth = $this->DB->autoPrepare(TABLE_SHOP_CATEGORY, array_keys($data), DB_AUTOQUERY_INSERT);
			$res = $this->DB->execute($sth, array_values($data));

			if (DB::isError($res)) {
			    go_url("","등록에 실패했습니다!\\n[".$res->getMessage()."]");
			    exit;
			}

			/// 파일 업로드
			$this->_f_no = $this->DB->getOne("select LAST_INSERT_ID()");
			$_filename = $this->file_upload($argu);
			
			$data = array(
				"sc_img_off"         => $_filename["sc_img_off"],
				"sc_img_on"         => $_filename["sc_img_on"],
				"sc_img_list"         => $_filename["sc_img_list"],
				"sc_img_title"         => $_filename["sc_img_title"]
			);

			$result = $this->DB->autoExecute(TABLE_SHOP_CATEGORY, $data,
			                        DB_AUTOQUERY_UPDATE, " sc_no = LAST_INSERT_ID() ");

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
			$this->_f_no = $argu["sc_no"];
			$_filename = $this->file_upload($argu);

			$data = array(
				"sc_title"         => $argu["sc_title"],
				"sc_img_off"         => $_filename["sc_img_off"],
				"sc_img_on"         => $_filename["sc_img_on"],
				"sc_img_list"         => $_filename["sc_img_list"],
				"sc_img_title"         => $_filename["sc_img_title"],
				"sc_memo"		=> txtParse($argu["sc_memo"],1),
				"sc_status"       => $argu["sc_status"],
				"sc_cntchk"       => $argu["sc_cntchk"]
			);

			$result = $this->DB->autoExecute(TABLE_SHOP_CATEGORY, $data,
			                        DB_AUTOQUERY_UPDATE, " sc_no = '{$argu['sc_no']}' ");

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

				$res = $sc_no = $this->DB->getOne("select sc_no from ".TABLE_SHOP_CATEGORY." where (sc_num < '".$argu["sc_num"]."') order by sc_num desc limit 1");

				if($sc_no){
					
					$query = "
						update ".TABLE_SHOP_CATEGORY."
						set
							sc_num = sc_num - 1
						where
							sc_no = '".$argu["sc_no"]."'
					";
					$res = $this->DB->query($query);
					if (DB::isError($res)) {
						go_url("", $res->getMessage());
						exit;
					}
					
					$query1 = "
						update ".TABLE_SHOP_CATEGORY."
						set
							sc_num = sc_num + 1
						where
							sc_no = '".$sc_no."'
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
				$res = $sc_no = $this->DB->getOne("select sc_no from ".TABLE_SHOP_CATEGORY." where (sc_num > '".$argu["sc_num"]."') order by sc_num asc limit 1");

				if($sc_no){
					
					$query = "
						update ".TABLE_SHOP_CATEGORY."
						set
							sc_num = sc_num + 1
						where
							sc_no = '".$argu["sc_no"]."'
					";
					$res = $this->DB->query($query);
					if (DB::isError($res)) {
						go_url("", $res->getMessage());
						exit;
					}
					
					$query1 = "
						update ".TABLE_SHOP_CATEGORY."
						set
							sc_num = sc_num - 1
						where
							sc_no = '".$sc_no."'
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
			if(is_array($argu["sc_no"])){
				foreach($argu["sc_no"] as $key => $sc_no){

					$data = array(
						"sc_num"       => $argu["sc_num"][$key]
					);

					$result = $this->DB->autoExecute(TABLE_SHOP_CATEGORY, $data,
											DB_AUTOQUERY_UPDATE, " sc_no = '{$sc_no}' ");
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

			$_row = $this->get_category_view($argu["sc_no"]);

			/// 첨부파일을 삭제한다.
			@unlink($this->_PDS.$_row["sc_img_off"]);
			@unlink($this->_PDS.$_row["sc_img_on"]);
			@unlink($this->_PDS.$_row["sc_img_list"]);
			@unlink($this->_PDS.$_row["sc_img_title"]);

			$query = "
				delete from ".TABLE_SHOP_CATEGORY."
				where  sc_no = '{$argu['sc_no']}'
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
					".TABLE_SHOP_CATEGORY."
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
					".TABLE_SHOP_CATEGORY."
				order by
					sc_num asc,
					sc_no desc ";
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
		 
			$addwhere = " where sc_status='Y' ";

			$query = "
				select
					count(*)
				from
					".TABLE_SHOP_CATEGORY."
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
					".TABLE_SHOP_CATEGORY."
				$addwhere
				order by
					sc_num asc,
					sc_no desc ";

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
		function get_category_view($sc_no){
			$query = "
				select
					*
				from
					".TABLE_SHOP_CATEGORY."
				where
					sc_no = '{$sc_no}'
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
			$res = $scm_num = $this->DB->getOne("select coalesce(max(scm_num),0)+1 from ".TABLE_SHOP_CATEGORY_M." where sc_no = '".$argu["sc_no"]."'");
			if (DB::isError($res)) {
			    go_url("","등록에 실패했습니다!\\n[".$res->getMessage()."]");
			    exit;
			}


			$data = array(
				"sc_no"         => $argu["sc_no"],
				"scm_title"         => $argu["scm_title"],
				"scm_img_off"         => $_filename["scm_img_off"],
				"scm_img_on"         => $_filename["scm_img_on"],
				"scm_img_list"         => $_filename["scm_img_list"],
				"scm_img_title"         => $_filename["scm_img_title"],
				"scm_memo"		=> txtParse($argu["scm_memo"],1),
				"scm_num"		=> $scm_num,
				"scm_status"       => $argu["scm_status"]
			);

			$sth = $this->DB->autoPrepare(TABLE_SHOP_CATEGORY_M, array_keys($data), DB_AUTOQUERY_INSERT);
			$res = $this->DB->execute($sth, array_values($data));

			if (DB::isError($res)) {
			    go_url("","등록에 실패했습니다!\\n[".$res->getMessage()."]");
			    exit;
			}

			/// 파일 업로드
			$this->_f_no = $this->DB->getOne("select LAST_INSERT_ID()");
			$_filename = $this->file_upload($argu);

			$data = array(
				"scm_img_off"         => $_filename["scm_img_off"],
				"scm_img_on"         => $_filename["scm_img_on"],
				"scm_img_list"         => $_filename["scm_img_list"],
				"scm_img_title"         => $_filename["scm_img_title"]
			);
			
			$result = $this->DB->autoExecute(TABLE_SHOP_CATEGORY_M, $data,
			                        DB_AUTOQUERY_UPDATE, " scm_no = LAST_INSERT_ID() ");

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
			$this->_f_no = $argu["scm_no"];
			$_filename = $this->file_upload($argu);

			$data = array(
				"scm_title"         => $argu["scm_title"],
				"scm_img_off"         => $_filename["scm_img_off"],
				"scm_img_on"         => $_filename["scm_img_on"],
				"scm_img_list"         => $_filename["scm_img_list"],
				"scm_img_title"         => $_filename["scm_img_title"],
				"scm_memo"		=> txtParse($argu["scm_memo"],1),
				"scm_status"       => $argu["scm_status"]
			);

			$result = $this->DB->autoExecute(TABLE_SHOP_CATEGORY_M, $data,
			                        DB_AUTOQUERY_UPDATE, " scm_no = '{$argu['scm_no']}' ");

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

				$res = $scm_no = $this->DB->getOne("select scm_no from ".TABLE_SHOP_CATEGORY_M." where (scm_num < '".$argu["scm_num"]."') and (sc_no = '".$argu["sc_no"]."') order by scm_num desc limit 1");

				if($scm_no){
					
					$query = "
						update ".TABLE_SHOP_CATEGORY_M."
						set
							scm_num = scm_num - 1
						where
							scm_no = '".$argu["scm_no"]."'
					";
					$res = $this->DB->query($query);
					if (DB::isError($res)) {
						go_url("", $res->getMessage());
						exit;
					}
					
					$query1 = "
						update ".TABLE_SHOP_CATEGORY_M."
						set
							scm_num = scm_num + 1
						where
							scm_no = '".$scm_no."'
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
				$res = $scm_no = $this->DB->getOne("select scm_no from ".TABLE_SHOP_CATEGORY_M." where (scm_num > '".$argu["scm_num"]."') and (sc_no = '".$argu["sc_no"]."') order by scm_num asc limit 1");

				if($scm_no){
					
					$query = "
						update ".TABLE_SHOP_CATEGORY_M."
						set
							scm_num = scm_num + 1
						where
							scm_no = '".$argu["scm_no"]."'
					";
					$res = $this->DB->query($query);
					if (DB::isError($res)) {
						go_url("", $res->getMessage());
						exit;
					}
					
					$query1 = "
						update ".TABLE_SHOP_CATEGORY_M."
						set
							scm_num = scm_num - 1
						where
							scm_no = '".$scm_no."'
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
			if(is_array($argu["scm_no"])){
				foreach($argu["scm_no"] as $key => $scm_no){

					$data = array(
						"scm_num"       => $argu["scm_num"][$key]
					);

					$result = $this->DB->autoExecute(TABLE_SHOP_CATEGORY_M, $data,
											DB_AUTOQUERY_UPDATE, " scm_no = '{$scm_no}' ");
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

			$_row = $this->get_category_view_m($argu["scm_no"]);

			/// 첨부파일을 삭제한다.
			@unlink($this->_PDS.$_row["scm_img_off"]);
			@unlink($this->_PDS.$_row["scm_img_on"]);
			@unlink($this->_PDS.$_row["scm_img_list"]);
			@unlink($this->_PDS.$_row["scm_img_title"]);

			$query = "
				delete from ".TABLE_SHOP_CATEGORY_M."
				where  scm_no = '{$argu['scm_no']}'
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
					".TABLE_SHOP_CATEGORY_M."
				where sc_no = '".$argu['sc_no']."'";

			$total = $this->DB->getOne($query);
			if (DB::isError($total)) {
				go_url("","목록을 불러올 수 없습니다!\\n[".$total->getMessage()."]");
			    exit;
			}

			$query = "
				select
					*, (select sc_title from ".TABLE_SHOP_CATEGORY." where sc_no = '".$argu["sc_no"]."') as sc_title
				from
					".TABLE_SHOP_CATEGORY_M."
				where sc_no = '".$argu['sc_no']."'
				order by
					scm_num asc,
					scm_no desc ";

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
		function get_category_all_m($sc_no,&$ctotal){
		 
			$addwhere = " where (scm_status='Y') and (sc_no ='".$sc_no."') ";

			$query = "
				select
					count(*)
				from
					".TABLE_SHOP_CATEGORY_M."
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
					".TABLE_SHOP_CATEGORY_M."
				$addwhere
				order by
					scm_num asc,
					scm_no desc ";

			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($list)) {
				go_url("","목록을 불러올 수 없습니다!\\n[".$list->getMessage()."]");
				exit;
			}

			return $list;
		}

		function get_category_all_m_cart(&$ctotal){
		 
			$addwhere = " where (scm_status='Y') and (scm_title <> '특별♥후원')";

			$query = "
				select
					count(*)
				from
					".TABLE_SHOP_CATEGORY_M."
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
					".TABLE_SHOP_CATEGORY_M." AS A
				$addwhere
				order by
					(select sc_num from shop_category where sc_no = A.sc_no) asc,
					scm_num asc,
					scm_no desc ";

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
		function get_category_view_m($scm_no){
			$query = "
				select
					*, (select sc_title from ".TABLE_SHOP_CATEGORY." where sc_no = A.sc_no) as sc_title
				from
					".TABLE_SHOP_CATEGORY_M." AS A
				where
					scm_no = '{$scm_no}'
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
			$res = $si_no = $this->DB->getOne("select coalesce(max(si_num),0)+1 from ".TABLE_SHOP_ITEM." where (sc_no = '".$argu["sc_no"]."') and (scm_no = '".$argu["scm_no"]."')");
			if (DB::isError($res)) {
			    go_url("","등록에 실패했습니다!\\n[".$res->getMessage()."]");
			    exit;
			}


			$data = array(
				//"si_no"         => $si_no,
				"sc_no"         => $argu["sc_no"],
				"scm_no"         => $argu["scm_no"],
				"scs_no"         => $argu["scs_no"],
				"si_num"         => $si_no,
				"si_name"         => $argu["si_name"],
				"si_subname"         => $argu["si_subname"],
				"si_img_list"         => $_filename["si_img_list"],
				"si_img_1"         => $_filename["si_img_1"],
				"si_img_2"         => $_filename["si_img_2"],
				"si_img_3"         => $_filename["si_img_3"],
				"si_price"         => $argu["si_price"],
				"si_memo"		=> txtParse($argu["si_memo"],1),
				"si_order"		=> ($argu["si_order"]>0) ? $argu["si_order"] : 0,
				"si_vote"       => ($argu["si_vote"]>0) ? $argu["si_vote"] : 0,
				"si_cnt"       => ($argu["si_cnt"]>0) ? $argu["si_cnt"] : 0,
				"si_status"       => $argu["si_status"],
				"si_regdate"       => _NowTime
			);

			$sth = $this->DB->autoPrepare(TABLE_SHOP_ITEM, array_keys($data), DB_AUTOQUERY_INSERT);
			$res = $this->DB->execute($sth, array_values($data));

			if (DB::isError($res)) {
			    go_url("","등록에 실패했습니다!\\n[".$res->getMessage()."]");
			    exit;
			}


			/// 파일 업로드
			$this->_f_no = $this->DB->getOne("select LAST_INSERT_ID()");
			$_filename = $this->file_upload($argu);

			$data = array(
				"si_img_list"         => $_filename["si_img_list"],
				"si_img_1"         => $_filename["si_img_1"],
				"si_img_2"         => $_filename["si_img_2"],
				"si_img_3"         => $_filename["si_img_3"],
			);
			
			$result = $this->DB->autoExecute(TABLE_SHOP_ITEM, $data,
			                        DB_AUTOQUERY_UPDATE, " si_no = LAST_INSERT_ID() ");

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
			$this->_f_no = $argu["si_no"];
			$_filename = $this->file_upload($argu);

			$data = array(
				"si_name"         => $argu["si_name"],
				"si_subname"         => $argu["si_subname"],
				"si_img_list"         => $_filename["si_img_list"],
				"si_img_1"         => $_filename["si_img_1"],
				"si_img_2"         => $_filename["si_img_2"],
				"si_img_3"         => $_filename["si_img_3"],
				"si_price"         => $argu["si_price"],
				"si_memo"		=> txtParse($argu["si_memo"],1),
				"si_order"		=> ($argu["si_order"]>0) ? $argu["si_order"] : 0,
				"si_vote"       => ($argu["si_vote"]>0) ? $argu["si_vote"] : 0,
				"si_cnt"       => ($argu["si_cnt"]>0) ? $argu["si_cnt"] : 0,
				"si_status"       => $argu["si_status"],
				"si_updated"       => _NowTime
			);

			$result = $this->DB->autoExecute(TABLE_SHOP_ITEM, $data,
			                        DB_AUTOQUERY_UPDATE, " si_no = '{$argu['si_no']}' ");

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
			if($argu["scm_no"] == ""){
				$argu["scm_no"] = 0;
			}
				
			if($argu["s_mode"] == "up"){
				

				$res = $si_no = $this->DB->getOne("select si_no from ".TABLE_SHOP_ITEM." where (si_num < '".$argu["si_num"]."') and (sc_no = '".$argu["sc_no"]."') and (scm_no = '".$argu["scm_no"]."') order by si_num desc limit 1");

				if($si_no){
					
					$query = "
						update ".TABLE_SHOP_ITEM."
						set
							si_num = si_num - 1
						where
							si_no = '".$argu["si_no"]."'
					";
					$res = $this->DB->query($query);
					if (DB::isError($res)) {
						go_url("", $res->getMessage());
						exit;
					}
					
					$query1 = "
						update ".TABLE_SHOP_ITEM."
						set
							si_num = si_num + 1
						where
							si_no = '".$si_no."'
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
				$res = $si_no = $this->DB->getOne("select si_no from ".TABLE_SHOP_ITEM." where (si_num > '".$argu["si_num"]."') and (sc_no = '".$argu["sc_no"]."') and (scm_no = '".$argu["scm_no"]."') order by si_num asc limit 1");

				if($si_no){
					
					$query = "
						update ".TABLE_SHOP_ITEM."
						set
							si_num = si_num + 1
						where
							si_no = '".$argu["si_no"]."'
					";
					$res = $this->DB->query($query);
					if (DB::isError($res)) {
						go_url("", $res->getMessage());
						exit;
					}
					
					$query1 = "
						update ".TABLE_SHOP_ITEM."
						set
							si_num = si_num - 1
						where
							si_no = '".$si_no."'
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
			$_row = $this->get_item_view($argu["sc_no"], $argu["si_no"]);

			/// 첨부파일을 삭제한다.
			@unlink($this->_PDS.$_row["si_img_list"]);
			@unlink($this->_PDS.$_row["si_img_1"]);
			@unlink($this->_PDS.$_row["si_img_2"]);
			@unlink($this->_PDS.$_row["si_img_3"]);

			$query = "
				delete from ".TABLE_SHOP_ITEM."
				where
					sc_no   = '{$argu['sc_no']}'
					and si_no  = '{$argu['si_no']}'
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

			$addwhere = ($argu['sc_no']>0) ? " where (sc_no = '".$argu['sc_no']."') and (scm_no = '".$argu['scm_no']."') " : " where (1=1) ";
			if(!$_adminpage || $argu["subpage"]=="shop_list"){ $addwhere .= " and si_status = 'Y' "; }
			if($argu['s_string']){ $addwhere .= " and si_name like '%".$argu['s_string']."%' "; }

			$query = "
				select
					count(*)
				from
					".TABLE_SHOP_ITEM." 
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
					".TABLE_SHOP_ITEM."
				$addwhere
				order by
					si_num asc,
					si_regdate desc";
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

			$addwhere = ($argu['sc_no']>0) ? " where (sc_no = '".$argu['sc_no']."') and (scm_no ='".$argu['scm_no']."') " : " where (1=1) ";
			if(!$_adminpage || $argu["subpage"]=="shop_list"){ $addwhere .= " and si_status = 'Y' "; }
			if($argu['s_string']){ $addwhere .= " and si_name like '%".$argu['s_string']."%' "; }

			$query = "
				select
					count(*)
				from
					".TABLE_SHOP_ITEM." 
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
					".TABLE_SHOP_ITEM."
				$addwhere
				order by
					si_num asc,
					si_regdate desc";

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

			$addwhere = ($argu['sc_no']) ? " sc_no = '{$argu['sc_no']}' " : " (1=1) ";
			
			// 다음 상품
			$query = "
				select
					*
				from
					".TABLE_SHOP_ITEM."
				where
					$addwhere
				order by
					si_num asc,
					si_regdate desc
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
					".TABLE_SHOP_ITEM."
				where
					sc_no = '{$argu['sc_no']}'
					and
					si_num > {$argu['si_num']}
				order by
					si_num asc,
					si_regdate desc
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
					".TABLE_SHOP_ITEM."
				where
					sc_no = '{$argu['sc_no']}'
					and
					si_num < {$argu['si_num']}
				order by
					si_num desc,
					si_regdate asc
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
		function get_item_view($si_no){

			global $_adminpage;

			$query = "
				select
					*, (select scm_title from ".TABLE_SHOP_CATEGORY_M." where scm_no = A.scm_no) as scm_title
				from
					".TABLE_SHOP_ITEM." as A
				where
					si_no = '{$si_no}'
			";
			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				go_url("","내용을 불러올 수 없습니다!\\n[".$row->getMessage()."]");
				exit;
			}
			
			$sc_no = $row["sc_no"];
				
			if(!$_adminpage){
				// 한번 읽은글은 브라우저를 닫기전까지는 카운트를 증가시키지 않음
				$si_name = "si_view_{$sc_no}_{$si_no}";
				if (!get_session($si_name)){
					// 조회수 증가
					$query = "
						update ".TABLE_SHOP_ITEM." 
						set
							si_cnt = si_cnt + 1
						where
							si_no = '$si_no'
					";
					$res = $this->DB->query($query);

					set_session($si_name, TRUE);
				}
			}

			return $row;
		}

		 /******************************************************************************************

			장바구니

		******************************************************************************************/
		
		/*****
		 * 해당상품을 장바구니에 넣는다.
		 *****/
		function set_cart_insert($argu){

			// 기존 데이터 확인
			$query = "
				select
					sa_no
				from
					".TABLE_SHOP_CART."
				where
					sc_no='{$argu['sc_no']}'
					and 
					scm_no='{$argu['scm_no']}'
					and 
					si_no='{$argu['si_no']}'
					and
					user_id='".$this->_user_id."'
				order by
					sa_regdate desc
				limit 
					0,1
			";

			$res = $sa_no = $this->DB->getOne($query,array());

			if($sa_no>0){
				$argu['sa_no'] = $sa_no;
				$this->set_cart_modify($argu);
			}else{

				$data = array(
					"sc_no"         => $argu["sc_no"],
					"scm_no"         => $argu["scm_no"],
					"si_no"         => $argu["si_no"],
					"user_id"         => $this->_user_id,
					"sa_num"         => $argu["sa_num"],
					"sa_price"         => $argu["sa_price"],
					"sa_regdate"         => _NowTime
				);

				$sth = $this->DB->autoPrepare(TABLE_SHOP_CART, array_keys($data), DB_AUTOQUERY_INSERT);
				$res = $this->DB->execute($sth, array_values($data));

				if (DB::isError($res)) {
					go_url("","등록에 실패했습니다!\\n[".$res->getMessage()."]");
					exit;
				}

				return true;
			}
		}

		/*****
		 * 장바구니 내용을 수정한다.
		 *****/
		function set_cart_modify($argu){

			$data = array(
				"sc_no"         => $argu["sc_no"],
				"si_no"         => $argu["si_no"],
				"user_id"         => $this->_user_id,
				"sa_num"         => $argu["sa_num"],
				"sa_price"         => $argu["sa_price"],
				"sa_regdate"         => _NowTime
			);

			$result = $this->DB->autoExecute(TABLE_SHOP_CART, $data,
			                        DB_AUTOQUERY_UPDATE, " sa_no = '{$argu['sa_no']}' ");

			if (DB::isError($result)) {
				go_url("","수정에 실패했습니다!\\n[".$result->getMessage()."]");
				exit;
			}

			return true;
		}

		/*****
		 * 장바구니 내용을 삭제한다.
		 *****/
		function set_cart_delete($argu){
			
			$query = "
				delete from ".TABLE_SHOP_CART."
				where
					sc_no   = '{$argu['sc_no']}'
					and
					scm_no   = '{$argu['scm_no']}'
					and
					si_no='{$argu['si_no']}'
					and
					user_id='".$this->_user_id."'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
				go_url("","삭제에 실패했습니다!\\n[".$res->getMessage()."]");
				exit;
			}
			return true;
		}

		/*****
		 * 장바구니를 비운다.
		 *****/
		function set_cart_empty(){

			$addwhere = " where user_id = '".$this->_user_id."' ";

			$query = "
				delete from ".TABLE_SHOP_CART."
				$addwhere
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
				go_url("","장바구니 비우기에 실패했습니다!\\n[".$res->getMessage()."]");
				exit;
			}
			return true;
		}

		/*****
		 * 장바구니 목록을 가져온다.
		 *****/
		function get_cart_list(&$total){
			 
			$addwhere = " where sa.user_id = '".$this->_user_id."' ";

			$query = "
				select
					count(*)
				from
					(".TABLE_SHOP_CART." sa
					inner join ".TABLE_SHOP_ITEM." si
					on sa.si_no = si.si_no)
				$addwhere";

			$res = $total = $this->DB->getOne($query,array());

			if (DB::isError($res)) {
				go_url("","목록을 가져올 수 없습니다!\\n[".$res->getMessage()."]");
				exit;
			}

			$query = "
				select
					sa.sc_no,
					sa.si_no,
					si.si_name,
					si.si_img_list,
					sa.sa_num,
					sa.sa_price
				from
					(".TABLE_SHOP_CART." sa
					inner join ".TABLE_SHOP_ITEM." si
					on sa.si_no = si.si_no)
				$addwhere
				order by
					sa.sc_no asc,
					sa.si_no asc";

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("","목록을 가져올 수 없습니다!\\n[".$res->getMessage()."]");
				exit;
			}
			return $list;
		}

		/*****
		 * 장바구니 내용을 가져온다.
		 *****/
		function get_cart_view($sa_no){

			$query = "
				select
					*
				from
					".TABLE_SHOP_CART." 
				where
					sa_no = '{$sa_no}'
			";
			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				go_url("","내용을 불러올 수 없습니다!\\n[".$row->getMessage()."]");
				exit;
			}

			return $row;
		}

		 /******************************************************************************************

			상품 신청 관련

		******************************************************************************************/

		/*****
		 * 주문번호를 생성한다.
		 *****/
		function set_order_idx(){

			// 주문번호 생성하기
			$order_idx = "SH".date("YmdHis");
			$res = $order_cnt = $this->DB->getOne("select coalesce(count(*),0)+1 from ".TABLE_SHOP_ORDER." where ordr_idxx like '{$order_idx}%'");
			if (DB::isError($res)) {
			    go_url("","주문번호 생성 오류입니다.\\n[".$res->getMessage()."]");
			    exit;
			}
			
			$order_idx .= $order_cnt;

			return $order_idx;
		}
		
		/*****
		 * 상품을 구입한다.
		 *****/
		function set_buy_insert($argu){

			global $_adminpage;

			// 주문번호 생성하기
			//$order_idx = $this->set_order_idx();

			// 주문 상품 정리
			$_sc_nos = "";
			$_si_nos = "";
			$_si_nums = "";
			
			if(!$_adminpage){
				$_si_nos = $argu["si_nos"];
				$_si_names = $argu["si_names"];
				$_si_nums = $argu["si_nums"];
			}

			// 변수 설정
			$argu["so_give_tel"]=$argu["so_give_tel1"]."-".$argu["so_give_tel2"]."-".$argu["so_give_tel3"];
			$argu["so_give_person"]=$argu["so_give_person1"].$argu["so_give_person2"];
	
			// 주민 등록 번호 및 결제정보 암호화
			$cipher = new zm_Cipher;
			$argu["so_give_person"] = $cipher -> encrypt($argu["so_give_person"]);
			$cipher = new zm_Cipher_Close;

			$data = array(
				"ordr_idxx"         => $argu['ordr_idxx'],
				"si_nos"         => $_si_nos,
				"si_names"         => $_si_names,
				"si_nums"         => $_si_nums,
				"user_id"         => $this->_user_id,
				"so_give_name"       => $argu["so_give_name"],
				"so_give_person"       => $argu["so_give_person"],
				"so_give_tel"       => $argu["so_give_tel"],
				"so_give_email"       => $argu["so_give_email"],
				"so_give_local"       => $argu["so_give_local"],
				"so_give_zip"       => $argu["so_give_zip"],
				"so_give_add1"       => $argu["so_give_add1"],
				"so_give_add2"       => $argu["so_give_add2"],
				"so_give_reason"       => $argu["so_give_reason"],
				"so_regdate"       => _NowTime
			);

			$sth = $this->DB->autoPrepare(TABLE_SHOP_ORDER, array_keys($data), DB_AUTOQUERY_INSERT);
			$res = $this->DB->execute($sth, array_values($data));

			if (DB::isError($res)) {
			    go_url("","등록에 실패했습니다!\\n[".$res->getMessage()."]");
			    exit;
			}

			return true;
		}

		/*****
		 * 상품을 구입 내역을 수정한다.
		 *****/
		function set_buy_modify($argu){

			// 변수 설정
			$argu["so_give_tel"]=$argu["so_give_tel1"]."-".$argu["so_give_tel2"]."-".$argu["so_give_tel3"];
			$argu["so_give_person"]=$argu["so_give_person1"].$argu["so_give_person2"];

			// 주민 등록 번호 및 결제정보 암호화
			$cipher = new zm_Cipher;
			$argu["so_give_person"] = $cipher -> encrypt($argu["so_give_person"]);
			$cipher = new zm_Cipher_Close;

			$data = array(
				"so_give_name"       => $argu["so_give_name"],
				"so_give_person"       => $argu["so_give_person"],
				"so_give_tel"       => $argu["so_give_tel"],
				"so_give_email"       => $argu["so_give_email"],
				"so_give_local"       => $argu["so_give_local"],
				"so_give_zip"       => $argu["so_give_zip"],
				"so_give_add1"       => $argu["so_give_add1"],
				"so_give_add2"       => $argu["so_give_add2"]
			);

			$result = $this->DB->autoExecute(TABLE_SHOP_ORDER, $data,
			                        DB_AUTOQUERY_UPDATE, " so_no = '{$argu['so_no']}' ");

			if (DB::isError($result)) {
				go_url("","수정에 실패했습니다!\\n[".$result->getMessage()."]");
				exit;
			}

			return true;
		}
		
		/*****
		 * 상품 구입 내역을 삭제한다.
		 *****/
		function set_buy_delete($argu){
			$query = "
				delete from ".TABLE_SHOP_ORDER."
				where
					so_no   = '{$argu['so_no']}'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
				go_url("","삭제에 실패했습니다!\\n[".$res->getMessage()."]");
				exit;
			}
			return true;
		}


		/*****
		 * 상품 구입 내역을 가져온다.
		 *****/
		function get_buy_list($argu,&$total,$limit = true){
			 
			global $_adminpage;

			if($_adminpage){
				$addwhere = " where (1=1) ";
			}else{
				$addwhere = " where user_id = '".$this->_user_id."' ";
			}
			if($argu['s_case']=="id"){ $addwhere .= " and user_id like '%".$argu['s_string']."%' "; }
			if($argu['s_case']=="name"){ $addwhere .= " and so_give_name like '%".$argu['s_string']."%' "; }
			if($argu['s_case']=="tel"){ $addwhere .= " and so_give_tel like '%".$argu['s_string']."%' "; }
			if($argu['s_case']=="email"){ $addwhere .= " and so_give_email like '%".$argu['s_string']."%' "; }

			$query = "
				select
					count(*)
				from
					".TABLE_SHOP_ORDER." 
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
					".TABLE_SHOP_ORDER."
				$addwhere
				order by
					so_regdate desc";
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

		/*****
		 * 주문 내용을 가져온다.
		 *****/
		function get_buy_view($so_no){

			$query = "
				select
					*
				from
					".TABLE_SHOP_ORDER." 
				where
					so_no = '{$so_no}'
			";
			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				go_url("","내용을 불러올 수 없습니다!\\n[".$row->getMessage()."]");
				exit;
			}

			/// 주민번호 및 결제정보 복호화
			$cipher = new zm_Cipher;
			$so_give_person = $cipher -> decrypt($row["so_give_person"]);
			$cipher = new zm_Cipher_Close;

			$so_give_person1 = substr($so_give_person, 0, 6);
			$so_give_person2 = substr($so_give_person, -7);
			
			$row = array_merge($row, array(
				"so_give_person1"=>$so_give_person1,
				"so_give_person2"=>$so_give_person2,
			));

			return $row;
		}

		function get_fl_list($argu,&$total,$limit = true){
			 
			global $_adminpage;

			if($_adminpage){
				$addwhere = " where (1=1) ";
			}else{
				$addwhere = " where user_id = '".$this->_user_id."' ";
			}
			if($argu['s_case']=="name"){ $addwhere .= " and fl_give_name like '%".$argu['s_string']."%' "; }
			if($argu['s_case']=="tel"){ $addwhere .= " and fl_give_tel like '%".$argu['s_string']."%' "; }
			if($argu['s_case']=="email"){ $addwhere .= " and fl_give_email like '%".$argu['s_string']."%' "; }

			$query = "
				select
					count(*)
				from
					fixed_spon_list 
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
					fixed_spon_list
				$addwhere
				order by
					fl_regdate desc";
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

		/*****
		 * 주문 내용을 가져온다.
		 *****/
		function get_fl_view($fl_no){

			$query = "
				select
					*
				from
					fixed_spon_list
				where
					fl_no = '{$fl_no}'
			";
			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				go_url("","내용을 불러올 수 없습니다!\\n[".$row->getMessage()."]");
				exit;
			}

			return $row;
		}

		function set_fl_delete($argu){
			$query = "
				delete from fixed_spon_list
				where
					fl_no   = '{$argu['fl_no']}'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
				go_url("","삭제에 실패했습니다!\\n[".$res->getMessage()."]");
				exit;
			}
			return true;
		}
		
	}
?>