<?

	class Afmovel{
		var $DB;
		var $_f_no = 0;
		var $_LIST_NUM = 20;
		var $_user_id;

		var $_PDS = _PDS;
		var $_PDS_SUB = "afmovel_img/";
		var $_upload_limit;

		# 생성자
		function Afmovel($db) {
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


		### 리스트 ########################################################
		function get_afml_list($argu,&$total,$limit = true){

			/// 검색 쿼리
		//	$addwhere = "where (1=1) ";
			$addwhere = "where (am_cate = '{$argu['c_code']}') ";
	
			if($argu['s_type']=="aml_title"){ $addwhere .= " and (aml_title like '%{$argu['keyword']}%') "; }

			if($limit>1){
				$this->_LIST_NUM = $limit;
			}

			$argu['p'] = ($argu['p']) ? $argu['p'] : 1;
			
			$query = "
				select
					count(*)
				from
					".TABLE_AFL_MOVE."
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
					".TABLE_AFL_MOVE." 
					$addwhere
				order by
					aml_no desc
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
		function set_afml_insert($argu){

			$data = array(
				"am_cate" => $argu["am_cate"],	//카테고리
				"aml_volume" => $argu["aml_volume"],	//편
				"aml_title" => $argu["aml_title"],		//제목
				"aml_content" => $argu["aml_content"],			//내용
				"aml_url" => "/pds/afmovel/".$argu["aml_url"],			//동영상경로
				"aml_use" => $argu["aml_use"],				//회원전용체크
				"aml_regdate" => _NowTime,			//등록일
				"aml_move" => $argu["aml_move"],			//동영상소스
			);
		
			$res = $this->DB->autoExecute(TABLE_AFL_MOVE, $data, DB_AUTOQUERY_INSERT);
			if (DB::isError($res)) {
			    go_url("","등록되지 않았습니다.");
			    exit;
			}

			
			// $aml_no = mysql_insert_id();
			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$aml_no = $this->DB->getOne($q);
			
			/// 파일 업로드
			$this->_f_no = $aml_no;
			$_filename = $this->file_upload($argu);
			
			$data = array(
				"aml_image"         => $_filename["aml_image"],
			);

			$result = $this->DB->autoExecute(TABLE_AFL_MOVE, $data,
			                        DB_AUTOQUERY_UPDATE, " aml_no = ".$aml_no);

			if (DB::isError($result)) {
			    go_url("","파일등록에 실패했습니다!\\n[".$result->getMessage()."]");
			    exit;
			}

			$data=array_merge($data,array("aml_no"=>$aml_no));
			
			return $data;

		}

		### 수정 ####################################################################
		function set_afml_modify($argu){
			
			/// 파일 업로드
			$this->_f_no = $argu["aml_no"];
			$_filename = $this->file_upload($argu);

			$fn = $argu["old_image"];
			if( $_filename["am_image"] != "" ) {
				$fn = $_filename["am_image"];
			}


			$data = array(
				"aml_volume" => $argu["aml_volume"],	//카테고리
				"aml_title" => $argu["aml_title"],		//제목
				"aml_content" => $argu["aml_content"],			//내용
			//	"aml_url" => $argu["aml_url"],			//동영상경로
				"aml_url" => "/pds/afmovel/".$argu["aml_url"],			//동영상경로
				//"aml_image" => $_filename["aml_image"],
				"aml_image" => $fn,
				"aml_use" => $argu["aml_use"],				//회원전용체크
				"aml_move" => $argu["aml_move"],				//회원전용체크
			);

		
			$res = $this->DB->autoExecute(TABLE_AFL_MOVE, $data, DB_AUTOQUERY_UPDATE, " aml_no = '{$argu['aml_no']}'");
				if (DB::isError($res)) {
					go_url("","수정되지 않았습니다.");
					exit;
				}
		
			return true;
		}

		### 삭제 ##########################################################################
		function set_afml_delete($argu){
			
			$query = "
				delete from ".TABLE_AFL_MOVE."
				where
					aml_no   = '{$argu['aml_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    go_url("", $res->getMessage());
			    exit;
			}

			return true;

		}

		### 상세보기 #########################################################################
		function get_afml_view($argu){

			global $_adminpage;


		    // 한번 읽은글은 브라우저를 닫기전까지는 카운트를 증가시키지 않음
		    //$ss_name = "ss_view_{$b_class}_{$b_no}";
		    //if (!get_session($ss_name))
		    //{
				// 조회수 증가
				$query = "
					update ".TABLE_AFL_MOVE." b
					set
						b.aml_hit = b.aml_hit + 1
					where
						b.aml_no = '{$argu['aml_no']}'
				";
				$res = $this->DB->query($query);
				if (DB::isError($res)) {
				    go_url("", $res->getMessage());
				  exit;
				}

		        //set_session($ss_name, TRUE);
		    //}
			
			
		//	$query = "	select	* from 	".TABLE_AFL_MOVE."	where 	aml_no   = '{$argu['aml_no']}'";
			if($argu["aml_no"]==""){
			
$query = "
					select
						*
					from
						".TABLE_AFL_MOVE."
					where
						(am_cate = '{$argu['c_code']}') and (isnull(aml_use)) 
					order by aml_no desc limit 0,1
				";
			}else{
				$query = "
					select
						*
					from
						".TABLE_AFL_MOVE."
					where
						aml_no   = '{$argu['aml_no']}'
				";
			}

			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
			    go_url("", $res->getMessage());
			    exit;
			}


			$aml_no = $row["aml_no"];
			$am_cate = $row["am_cate"];
			$aml_volume = $row["aml_volume"];

			if(!$_adminpage){
				// 한번 읽은글은 브라우저를 닫기전까지는 카운트를 증가시키지 않음
				$aml_name = "am_view_{$aml_volume}_{$aml_no}";
				if (!get_session($aml_name)){
					// 조회수 증가
					$query = "
						update ".TABLE_AFL_MOVE." 
						set
							aml_hit = aml_hit + 1
						where
							aml_no = '$aml_no'
					";
					$res = $this->DB->query($query);

					set_session($aml_name, TRUE);
				}
			}
			
			return $row;

		}


		function get_afml_list_all($c_code,&$ctotal){
		 
			/// 검색 쿼리
			//$addwhere = "where (ai_continent = '{$c_code}') ";
			$addwhere = "where (am_cate = '{$c_code}') ";

			$query = "
				select
					count(*)
				from
					".TABLE_AFL_MOVE."
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
					".TABLE_AFL_MOVE." 
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



		function get_afml_list_limit($c_code){
			//$c_limit = (float)$c_limit;

			//$limit = "limit ".($c_limit-10).",".$c_limit;
			$addwhere = "where (am_cate = '{$c_code}') ";
			echo"$addwhere";
			$query = "
				select
					*
				from
					".TABLE_AFL_MOVE." 
					$addwhere
				order by
					aml_volume asc
				".$limit;

			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($list)) {
				go_url("","목록을 불러올 수 없습니다!\\n[".$list->getMessage()."]");
				exit;
			}

			return $list;
		}



		function get_afml_limit($limit=0){
			global $_adminpage,$_agency;
			
			$addwhere = "where isnull(aml_use) ";

			$query = "
				select
					*
				from
					".TABLE_AFL_MOVE." 
					$addwhere
				order by
					aml_volume desc
				limit ".$limit;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			
			if (DB::isError($res)) {
				go_url("", $res->getMessage());
			    exit;
			}
			return $list;
		}

	}
?>