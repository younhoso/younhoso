<?
	class ReliefAct {
		var $DB;
		var $_f_no = 0;
		var $_LIST_NUM = 20;
		var $_user_id;

		var $_PDS = _PDS;
		var $_PDS_SUB = "relief/";
		var $_upload_limit;

		# 생성자
		function ReliefAct($db) {
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

							$upRoot = $this->_PDS;
							if(move_uploaded_file($_FILE_VALUE["tmp_name"], $upRoot.$_filename)){
								$_uploaded[$fname] = $_filename;
							}else{
								go_url("","파일 업로드에 실패했습니다.".$upRoot);
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


		### 리스트 ########################################################
		function get_afm_list($argu,&$total,$limit = true){
			
            /// 검색 쿼리
            $code = $argu["c_code"];
            $addwhere = "";

            if( $code != "0" ) {
                $addwhere = "where (am_cate = '{$argu['c_code']}') ";
            }
			
			if($argu['s_type']=="am_title"){ $addwhere .= " and (am_title like '%{$argu['keyword']}%') "; }

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_RELIEF."
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
					".TABLE_RELIEF." 
					$addwhere
				order by
					am_no desc
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
		function set_afm_insert($argu){

			$data = array(
				"am_cate" => $argu["am_cate"],	//카테고리
				"am_title" => $argu["am_title"],		//제목
				"am_content" => $argu["am_content"],			//내용
				"am_url" => "/pds/relief/".$argu["am_url"],			//동영상경로
				"am_use" => $argu["am_use"],				//회원전용체크
				"am_regdate" => _NowTime,			//등록일
				"am_move" => $argu["am_move"],			//유튜브 소스
			);
		
			$res = $this->DB->autoExecute(TABLE_RELIEF, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
			    go_url("","등록되지 않았습니다.");
			    exit;
			}
			
			// $am_no=mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$am_no = $this->DB->getOne($q);
			
			/// 파일 업로드
			$this->_f_no = $am_no;
			$_filename = $this->file_upload($argu);
			
			$data = array(
				"am_image"         => $_filename["am_image"],
			);

			$result = $this->DB->autoExecute(TABLE_RELIEF, $data,
			                        DB_AUTOQUERY_UPDATE, " am_no = ".$am_no);

			if (DB::isError($result)) {
			    go_url("","파일등록에 실패했습니다!\\n[".$result->getMessage()."]");
			    exit;
			}

			$data=array_merge($data,array("am_no"=>$am_no));
			
			return $data;

		}

		### 수정 ####################################################################
		function set_afm_modify($argu){
			
			/// 파일 업로드
			$this->_f_no = $argu["am_no"];
			$_filename = $this->file_upload($argu);

			$fn = $argu["old_image"];
			if( $_filename["am_image"] != "" ) {
				$fn = $_filename["am_image"];
			}

			$data = array(
				"am_title" => $argu["am_title"],		//제목
				"am_content" => $argu["am_content"],			//내용
				"am_url" => $argu["am_url"],			//동영상경로
				"am_image" => $fn,
				"am_use" => $argu["am_use"],				//회원전용체크
				"am_move" => $argu["am_move"],				//유튜브소스
				"am_cate" => $argu["am_cate"],				// 카테고리
			);
			
			$res = $this->DB->autoExecute(TABLE_RELIEF, $data, DB_AUTOQUERY_UPDATE, " am_no = '{$argu['am_no']}'");
				if (DB::isError($res)) {
					go_url("","수정되지 않았습니다.");
					exit;
				}
		
			return true;

			//return false;
		}

		### 삭제 ##########################################################################
		function set_afm_delete($argu){
			
			$query = "
				delete from ".TABLE_RELIEF."
				where
					am_no   = '{$argu['am_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    go_url("", $res->getMessage());
			    exit;
			}

			return true;

		}

		### 상세보기 #########################################################################
		function get_afm_view($argu){

			global $_adminpage;

			if($argu["am_no"]==""){
				$query = "
					select
						*
					from
						".TABLE_RELIEF."
					where
						(am_cate = '{$argu['c_code']}') and (isnull(am_use)) 
					order by am_no desc limit 0,1
				";
			}
			else{
				$query = "
					select
						*
					from
						".TABLE_RELIEF."
					where
						am_no   = '{$argu['am_no']}'
				";
			}

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    go_url("", $res->getMessage());
			    exit;
			}

			$am_no = $row["am_no"];
			$am_cate = $row["am_cate"];

			if(!$_adminpage){
				// 한번 읽은글은 브라우저를 닫기전까지는 카운트를 증가시키지 않음
				$am_name = "am_view_{$am_cate}_{$am_no}";
				if (!get_session($am_name)){
					// 조회수 증가
					$query = "
						update ".TABLE_RELIEF." 
						set
							am_hit = am_hit + 1
						where
							am_no = '$am_no'
					";
					$res = $this->DB->query($query);

					set_session($am_name, TRUE);
				}
			}


			return $row;

		}


		function get_afm_list_all($c_code,&$ctotal){
		 
			/// 검색 쿼리
			$addwhere = "where (am_cate = '{$c_code}') ";

			$query = "
				select
					count(*)
				from
					".TABLE_RELIEF."
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
					".TABLE_RELIEF." 
					$addwhere
				order by
					am_no desc
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