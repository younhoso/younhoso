<?
	class Recruit {
		var $DB;
		var $upload;
		var $_LIST_NUM = 10;
		var $_PDS = _PDS;
		var $_PDS_SUB = "recruit/";

		# 생성자
		function Recruit($db) {
			$this->DB = $db;
			$this->_PDS .= $this->_PDS_SUB;
		}

		/******************************************************************************************

			채용 공고

		******************************************************************************************/

		/*****
		 * 채용공고 목록을 가져온다.
		 *****/
		function get_recruit_list($argu,&$total,$limit = true){
			$query = "
				select
					count(*)
				from
					".TABLE_RECRUIT;

			$total = $this->DB->getOne($query);
			if (DB::isError($list)) {
				die($list->getMessage());
			}

			$query = "
				select
					*
				from
					".TABLE_RECRUIT."
				order by
					appdate desc ";
			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_LIST_NUM.",".$this->_LIST_NUM;

			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($list)) {
				die($list->getMessage());
			}

			return $list;
		}

		function get_recruit_limit($argu,$limit=0){
			$query = "
				select
					*
				from
					".TABLE_RECRUIT."
				order by
					appdate desc
				limit ".$limit;

			$res = $list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);
			if (DB::isError($res)) {
				go_url("","목록을 가져오지 못했습니다.");
				exit;
			}

			return $list;
		}

		/*****
		 * 채용공고를 등록한다.
		 *****/
		function set_recruit_insert($argu){

			//기본 채용 정보 insert
			$appdate=($argu["appdate"]) ? $argu["appdate"]." 00:00:00" : _NowTime;

			/// 태그 제거 및 특문 취환
			$argu["skill"]=removeTags($argu["skill"]);
			$argu["skill"]=txtParse($argu["skill"],1);
			$argu['skill']=parseASCII(1,$argu['skill']);
			
			$data = array_merge(array(
				"subject"    => $argu["subject"],
				"part" => $argu["part"],
				"career"     => $argu["career"],
				"job"    => $argu['job'],
				"skill"    => $argu["skill"],
				"type"   => $argu["type"],
				"form"      => $argu["form"],
				"method" => $argu["method"],
				"step1"    => $argu["step1"],
				"step2"  => $argu["step2"],
				"step3"  => $argu["step3"],
				"appdate"	 => $appdate,
				"regdate"   => _NowTime
			));

			$res = $this->DB->autoExecute(TABLE_RECRUIT, $data, DB_AUTOQUERY_INSERT);

			$q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
			$rno = $this->DB->getOne($q);
			
			// $argu["r_no"]=@mysql_insert_id();
			$argu["r_no"]= $rno;

			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			//채용 상세 정보 insert
			foreach($argu["team"] as $key => $value){
				/// 태그 제거 및 특문 취환
				$argu['tech'][$key]=removeTags($argu['tech'][$key]);
				$argu['tech'][$key]=txtParse($argu['tech'][$key],1);
				$argu['tech'][$key]=parseASCII(1,$argu['tech'][$key]);
				$argu['pay'][$key]=parseASCII(1,$argu['pay'][$key]);

				$data = array_merge(array(
					"r_no"	=> $argu["r_no"],
					"team"    => $argu["team"][$key],
					"devide" => $argu["devide"][$key],
					"pay"     => $argu["pay"][$key],
					"tech"    => $argu['tech'][$key]
				));

				$res = $this->DB->autoExecute(TABLE_RECRUIT_INFO, $data, DB_AUTOQUERY_INSERT);
				if (DB::isError($res)) {
					//debug($res);
					die($res->getMessage());
					exit;
				}
			}

			return true;
		}

		/*****
		 * 채용공고를 수정한다.
		 *****/
		function set_recruit_modify($argu){

			$appdate=($argu["appdate"]) ? $argu["appdate"]." 00:00:00" : _NowTime;

			/// 태그 제거 및 특문 취환
			$argu["skill"]=removeTags($argu["skill"]);
			$argu["skill"]=txtParse($argu["skill"],1);
			$argu['skill']=parseASCII(1,$argu['skill']);
			
			//기본 채용 정보 update
			$data = array_merge(array(
				"subject"    => $argu["subject"],
				"part" => $argu["part"],
				"career"     => $argu["career"],
				"job"    => $argu['job'],
				"skill"    => $argu["skill"],
				"type"   => $argu["type"],
				"form"      => $argu["form"],
				"method" => $argu["method"],
				"step1"    => $argu["step1"],
				"step2"  => $argu["step2"],
				"step3"  => $argu["step3"],
				"appdate"	 => $appdate,
				"regdate"   => _NowTime
			));

			$res = $this->DB->autoExecute(TABLE_RECRUIT, $data, DB_AUTOQUERY_UPDATE, " r_no = '{$argu['r_no']}'");
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			//채용 상세 정보 update
			foreach($argu["team"] as $key => $value){
				
				/// 태그 제거 및 특문 취환
				$argu['tech'][$key]=removeTags($argu['tech'][$key]);
				$argu['tech'][$key]=txtParse($argu['tech'][$key],1);
				$argu['tech'][$key]=parseASCII(1,$argu['tech'][$key]);
				$argu['pay'][$key]=parseASCII(1,$argu['pay'][$key]);

				if($argu['ri_no'][$key]=="new"){
					$data = array_merge(array(
						"r_no"	=> $argu["r_no"],
						"team"    => $argu["team"][$key],
						"devide" => $argu["devide"][$key],
						"pay"     => $argu["pay"][$key],
						"tech"    => $argu['tech'][$key]
					));

					$res = $this->DB->autoExecute(TABLE_RECRUIT_INFO, $data, DB_AUTOQUERY_INSERT);
					if (DB::isError($res)) {
						//debug($res);
						die($res->getMessage());
						exit;
					}
				}else{

					$data = array_merge(array(
						"team"    => $argu["team"][$key],
						"devide" => $argu["devide"][$key],
						"pay"     => $argu["pay"][$key],
						"tech"    => $argu['tech'][$key]
					));

					$res = $this->DB->autoExecute(TABLE_RECRUIT_INFO, $data, DB_AUTOQUERY_UPDATE, " ri_no = '{$argu['ri_no'][$key]}'");
					if (DB::isError($res)) {
						//debug($res);
						die($res->getMessage());
						exit;
					}
				}
			}

			return true;
		}

		/*****
		 * 채용공고를 삭제한다.
		 *****/
		function set_recruit_delete($argu){
			
			//기본 채용 정보 delete
			$query = "
				delete from ".TABLE_RECRUIT."
				where
					r_no  = '{$argu['r_no']}'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			//채용 상세 정보 delete
			$query = "
				delete from ".TABLE_RECRUIT_INFO."
				where
					r_no  = '{$argu['r_no']}'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;
		}

		/*****
		 * 채용공고 모집분야를 삭제한다.
		 *****/
		function set_recruit_info_delete($argu){
			
			//기본 채용 정보 delete
			$query = "
				delete from ".TABLE_RECRUIT_INFO."
				where
					ri_no  = '{$argu['ri_no']}'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;
		}

		/*****
		 * 채용공고 정보를 가져온다.
		 *****/
		function get_recruit_view($r_no){
			
			$query = "
				select
					*
				from
					".TABLE_RECRUIT."
				where
					r_no = '{$r_no}'
			";
			$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				//print_r($row);
				die($row->getMessage());
			}

			return $row;
		}

		/*****
		 * 채용공고 상세정보를 가져온다.
		 *****/
		function get_recruit_info_view($r_no){
			
			$query = "
				select
					*
				from
					".TABLE_RECRUIT_INFO."
				where
					r_no = '{$r_no}'
				order by ri_no asc
			";
			$row = $this->DB->getAll($query,array(),DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				//print_r($row);
				die($row->getMessage());
			}

			return $row;
		}
				
		/*****
		 * 채용공고 상세정보를 가져온다.
		 *****/
		function get_recruit_detail_info($ri_no){
			
			$query = "
				select
					*
				from
					".TABLE_RECRUIT_INFO."
				where
					ri_no = '{$ri_no}'
				order by ri_no desc
				limit 0,1
			";
			$row = $this->DB->getRow($query,array(),DB_FETCHMODE_ASSOC);
			if (DB::isError($row)) {
				//print_r($row);
				die($row->getMessage());
			}

			return $row;
		}

		/*****
		 * 채용공고 지원자 목록을 가져온다.
		 *****/
		function get_recruit_app_list($argu,&$total,$limit = true){
			$query = "
				select
					count(*)
				from
					(".TABLE_RECRUIT_INFO." as a
					inner join 					
					".TABLE_RECRUIT_LIST." as b
					on a.ri_no=b.ri_no)
				where
					a.r_no='{$argu[r_no]}'";

			$total = $this->DB->getOne($query);
			if (DB::isError($list)) {
				die($list->getMessage());
			}

			$query = "
				select
					a.r_no,
					a.ri_no,
					a.team,
					b.rl_no,
					b.name,
					b.tel, 
					b.email,
					b.location,
					b.pic_o,
					b.pic,
					b.document_o,
					b.document,
					b.regdate
				from
					(".TABLE_RECRUIT_INFO." as a
					inner join 					
					".TABLE_RECRUIT_LIST." as b
					on a.ri_no=b.ri_no)
				where
					a.r_no='{$argu[r_no]}'
				order by
					b.regdate asc ";
			if($limit)
			$query .= "
				limit ".($argu['pp']-1)*$this->_LIST_NUM.",".$this->_LIST_NUM;

			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($list)) {
				die($list->getMessage());
			}

			return $list;
		}

		/*****
		 * 파일 업로드
		 *****/
		function set_recruit_fileupload($names){

			$UploadPath = $this->_PDS;

			$uploadFileName = $_FILES[$names]["name"];
			$tmpFileName = $_FILES[$names]["tmp_name"];

			$FileName = time()."_".MakeRandInt(8);
			$FileExt = array_pop(explode(".",$uploadFileName));
			$FileExt = strtolower($FileExt);

			if($uploadFileName){
				
				while(file_exists($UploadPath.$FileName)){
					$FileName=time()."_".MakeRandInt(8);
				}
				
				if(!move_uploaded_file($tmpFileName,$UploadPath.$FileName)){
					go_url("","파일 업로드 오류입니다.");
					exit;
				}

			}else{
				go_url("","업로드 제한 용량을 초과하였습니다.");
				exit;
			}
		 
			$uploaded=array($FileName, $uploadFileName);

			return $uploaded;

		}

		/*****
		 * 채용공고 지원을 등록한다.
		 *****/
		function set_recruit_app_insert($argu){

			/// 파일 업로드
			$pic_files=$this->set_recruit_fileupload("pic");
			$doc_files=$this->set_recruit_fileupload("app_doc");

			$data = array_merge(array(
				"r_no"    => $argu["r_no"],
				"ri_no" => $argu["ri_no"],
				"name"     => $argu["name"],
				"tel"    => $argu['tel'],
				"email"    => $argu["email"],
				"location"   => $argu["local"],
				"pic_o"      => $pic_files[0],
				"pic"      => $pic_files[1],
				"document_o" => $doc_files[0],
				"document" => $doc_files[1],
				"regdate"   => _NowTime
			));

			$res = $this->DB->autoExecute(TABLE_RECRUIT_LIST, $data, DB_AUTOQUERY_INSERT);

			if (DB::isError($res)) {
			    debug($res);
			    die($res->getMessage());
			    exit;
			}

			return $data;
		}

	}
?>