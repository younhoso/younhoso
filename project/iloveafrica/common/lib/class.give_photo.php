<?
	class Give_photo{
		var $DB;
		var $_LIST_NUM = 9;
		var $_PDS = _PDS;
		var $_PDS_SUB = "give_photo/";

		# 생성자
		function Give_photo($db) {
			$this->DB = $db;
			$this->_PDS .= $this->_PDS_SUB;
		}
	
		### 후원자갤러리리스트 ########################################################
		function get_give_photo_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = "where (1=1) ";
			if($argu['s_case']=="title"){ $addwhere .= " and gp_target like '%{$argu['s_string']}%' "; }
			if($argu['s_case']=="content"){ $addwhere .= " and gp_memo like '%{$argu['s_string']}%' "; }
			if($argu['gp_category']){ $addwhere .= " and gp_category = '{$argu['gp_category']}' "; }

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_GIVE_PHOTO."
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
					".TABLE_GIVE_PHOTO." 
					$addwhere
				order by
					gp_no desc
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

		### 후원자갤러리등록 #########################################################
		function set_give_photo_insert($argu){

			// 첨부파일 argu 를 정리한다.
			if(is_array($_FILES['gp_img']['tmp_name'])){
				foreach($_FILES['gp_img'] as $_FILE_KEY => $tmp){
					foreach($tmp as $_FILE_NO => $_FILE_VALUE){
						$_FILE[$_FILE_NO][$_FILE_KEY] = $_FILE_VALUE;
					}
				}
			}

			$data = array(
				"gp_category" => $argu["gp_category"],
				"gp_title" => $argu["gp_title"],
				"gp_name" => $argu["gp_name"],
				"gp_target" => $argu["gp_target"],
				"gp_date" => $argu["gp_date"],
				"gp_memo" => $argu["gp_memo"],
				"gp_regdate" =>_NowTime,
			);
		
			$res = $this->DB->autoExecute(TABLE_GIVE_PHOTO, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
				//debug($res);
			    die($res->getMessage());
			    exit;
			}
			
			// $gp_no=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$gp_no = $this->DB->getOne($q);
			
			$data=array_merge($data,array("gp_no"=>$gp_no));
			
			// 첨부파일 저장
			// TODO : board_config 의 media 여부에 따라 허용 파일 타입을 필터링 해주는 부분이 필요하다.
			if(is_array($_FILE)){
				foreach($_FILE as $_FILE_NO => $_FILE_VALUE){
					//$data['bf_name'] = upload_($this->_PDS, $_FILE_VALUE,  $data['b_no']."_".$_FILE_NO, "U", &$M);
					if($_FILE_VALUE !== null && $_FILE_VALUE[error] == 0 && $_FILE_VALUE[size] > 0 ){// 첨부파일이 있을경우

						if(upload($this->_PDS, $_FILE_VALUE,$data['gp_no']."_".$_FILE_NO,"U")){ // 첨부파일 업로드에 성공했을경우
							if($_FILE_NO == 0){
								$data["gp_img_list"] = $_FILE_VALUE[name];
							}
							else{
								$data["gp_img_meeo"] = $_FILE_VALUE[name];
							}
							
						}else{ // 첨부파일 업로드에 실패했을경우 alert 과 동시에 작업을 중단하고 이전페이지로 돌아간다.
							go_url("","파일 업로드에 실패했습니다.");
							exit;
						}

						if($_FILE_NO == 0){
							$data_file = array(
								"gp_img_list" => $data['gp_img_list'],
							);
						}
						else{
							$data_file = array(
								"gp_img_meeo" => $data['gp_img_meeo'],
							);
						}

						$res = $this->DB->autoExecute(TABLE_GIVE_PHOTO, $data_file, DB_AUTOQUERY_UPDATE, " gp_no = '{$data['gp_no']}'");
						if (DB::isError($res)) {
						    //debug($res);
						    die($res->getMessage());
						    exit;
						}
					}
				}
			}
			
			return $data;

		}

		### 후원자갤러리수정 ####################################################################
		function set_give_photo_modify($argu){
			
			// 첨부파일 argu 를 정리한다.
			if(is_array($_FILES['gp_img']['tmp_name'])){
				foreach($_FILES['gp_img'] as $_FILE_KEY => $tmp){
					foreach($tmp as $_FILE_NO => $_FILE_VALUE){
						$_FILE[$_FILE_NO][$_FILE_KEY] = $_FILE_VALUE;
					}
				}
			}

			$data = array(
				"gp_category" => $argu["gp_category"],
				"gp_title" => $argu["gp_title"],
				"gp_name" => $argu["gp_name"],
				"gp_target" => $argu["gp_target"],
				"gp_date" => $argu["gp_date"],
				"gp_memo" => $argu["gp_memo"],
			);
			
			$res = $this->DB->autoExecute(TABLE_GIVE_PHOTO, $data, DB_AUTOQUERY_UPDATE, " gp_no = '{$argu['gp_no']}'");
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			// 첨부파일 저장
			// TODO : board_config 의 media 여부에 따라 허용 파일 타입을 필터링 해주는 부분이 필요하다.
			if(is_array($_FILE)){
				foreach($_FILE as $_FILE_NO => $_FILE_VALUE){
					//$data['bf_name'] = upload_($this->_PDS, $_FILE_VALUE,  $data['b_no']."_".$_FILE_NO, "U", &$M);
					if($_FILE_VALUE !== null && $_FILE_VALUE[error] == 0 && $_FILE_VALUE[size] > 0 ){// 첨부파일이 있을경우
						upload($this->_PDS, "",$argu['gp_no']."_".$_FILE_NO,"D");

						if(upload($this->_PDS, $_FILE_VALUE,$argu['gp_no']."_".$_FILE_NO,"U")){ // 첨부파일 업로드에 성공했을경우
							if($_FILE_NO == 0){
								$data["gp_img_list"] = $_FILE_VALUE[name];
							}
							else{
								$data["gp_img_meeo"] = $_FILE_VALUE[name];
							}
						}else{ // 첨부파일 업로드에 실패했을경우 alert 과 동시에 작업을 중단하고 이전페이지로 돌아간다.
							go_url("","파일 업로드에 실패했습니다.");
							exit;
						}

						if($_FILE_NO == 0){
							$data_file = array(
								"gp_img_list" => $data['gp_img_list'],
							);
						}
						else{
							$data_file = array(
								"gp_img_meeo" => $data['gp_img_meeo'],
							);
						}

						$res = $this->DB->autoExecute(TABLE_GIVE_PHOTO, $data_file, DB_AUTOQUERY_UPDATE, " gp_no = '{$argu['gp_no']}'");
						if (DB::isError($res)) {
						    //debug($res);
						    die($res->getMessage());
						    exit;
						}
					}
				}
			}
			
			return true;
		}

		### 후원자갤러리삭제 ##########################################################################
		function set_give_photo_delete($argu){
			
			$file_list = $this->get_give_photo_view($argu);
			if($file_list['gp_img_list'] != ""){
				upload($this->_PDS, "",$argu['gp_no']."_0","D");
			}
			if($file_list['gp_img_meeo'] != ""){
				upload($this->_PDS, "",$argu['gp_no']."_1","D");
			}

			$query = "
				delete from ".TABLE_GIVE_PHOTO."
				where
					gp_no   = '{$argu['gp_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;

		}

		### 후원자갤러리상세보기 #########################################################################
		function get_give_photo_view($argu){
			$query = "
				select
					*
				from
					".TABLE_GIVE_PHOTO."
				where
					gp_no   = '{$argu['gp_no']}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    //debug($row);
			    die($row->getMessage());
			    exit;
			}

			return $row;

		}

	
		/*****
		 * 이전 게시물 정보를 가져온다.
		 *****/
		function get_give_photo_prev($gp_no){

			$query = "
				select
					*
				from
					".TABLE_GIVE_PHOTO."
				where
					gp_no > '{$gp_no}'
				order by
					gp_no asc
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
		function get_give_photo_next($gp_no){

			$query = "
				select
					*
				from
					".TABLE_GIVE_PHOTO."
				where
					gp_no < '{$gp_no}'
				order by
					gp_no desc
				limit 1
			";

			$res = $row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				go_url("", $res->getMessage());
			    exit;
			}
			return $row;
		}

	### 후원자갤러리 댓글 리스트 #########################################################################
		function get_givephoto_comment_list($argu, $gp_no=true){

			if($gp_no == false){
				$addwhere = "";
				$_limit = "limit 0, 10";
			}
			else{
				$addwhere = "where A.gp_no = '{$argu['gp_no']}'";
				$_limit = "";
			}

			$query = "
				select * from 
				(select * from ".TABLE_GIVE_PHOTO_COMMENT.") as A
				left outer join 
				(select user_id, user_name from ".TABLE_USER.") as B
				on A.user_id = B.user_id 
				left outer join
				(select gp_no, gp_target from ".TABLE_GIVE_PHOTO.") as C
				on A.gp_no = C.gp_no
				$addwhere
				order by A.gpc_no desc
				$_limit
			";

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("","댓글을 가져오지 못했습니다.");
				exit;
			}
			return $list;
		}

	### 후원자갤러리 댓글 등록 #########################################################################
		function set_givephoto_comment_linsert($argu){

			$data = array(
				"gp_no"   => $argu['gp_no'],
				"user_id"     => $_SESSION['user_id'],
				"gpc_name"      => $data['gpc_name'],
				"gpc_memo"    => $argu["gpc_memo"],
				"gpc_regdate"      => _NowTime,
			);

			$res = $this->DB->autoExecute(TABLE_GIVE_PHOTO_COMMENT, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
			    go_url("","등록에 실패했습니다!\\n[".$res->getMessage()."]");
			    exit;
			}
			return true;
		}

	### 후원자갤러리 댓글 삭제 #########################################################################
		function get_givephoto_comment_delete($argu){
			$query = "
				delete from ".TABLE_GIVE_PHOTO_COMMENT."
				where
					gpc_no   = '{$argu['gpc_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;
		}

	### 후원자갤러리 댓글 상세내용 #########################################################################
		function get_givephoto_comment_view($argu){
			$query = "
				select
					*
				from
					".TABLE_GIVE_PHOTO_COMMENT."
				where
					gpc_no   = '{$argu['gpc_no']}'
			";

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				go_url("","댓글 내용을 가져오지 못했습니다.");
				exit;
			}
			return $row;
		}

		function get_comment_auth($argu){
			global $_SESSION;
			$ses=$_SESSION;
			$data = $this->get_givephoto_comment_view($argu);
			
			$isAuth="E";
			if(($ses["user_id"] == $data["user_id"] || $ses['user_level']==1) && isset($ses["user_id"])){
				$isAuth = "A";
			}
			else{
//				if(strlen($argu["cmt_pwd"])>0){
//					if($data["bcm_pwd"]==substr(md5($argu["cmt_pwd"]),0,10)){
//						$isAuth="A";
//					}else{
//						$isAuth="F";
//					}
//				}else{
					$isAuth="E";
//				}				
			}
			return $isAuth;
		}

	}
?>