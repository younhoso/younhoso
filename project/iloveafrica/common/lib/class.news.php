<?
	class News {

		var $DB;
		var $total = 0;
		var $user_admin_level   = 1;   // admin 의 권한 레벨을 1로 설정하였다 숫자가 낮을수록 높은 권한이다.
		var $user_withdrawal_level   = 9;   // 탈퇴 및 비회원 레벨
		var $user_basic_level   = 7;   // 회원가입시 할당할 기본 레벨을 설정한다.
		var $user_manager_level = 5; // 직원 레벨
		var $_LIST_NUM=20;

		# 생성자
		function News($db) {
			$this->DB = $db;
		}


		/*****
		 * 회원을 등록한다.
		 *****/
		function set_user_insert($argu){

		
			
				if(strlen($argu["user_name"])<2){ go_url("","성명이 입력되지 않았습니다."); exit; }
				$argu['user_email'] = $argu['user_email1']."@".$argu['user_email2'];
				$data = array(
					
					"user_name"         => $argu["user_name"],
					
					"user_email"      => $argu["user_email"],
				
					"user_regdate"          => _NowTime


				
				);

				$data = array_merge($data, array("user_no" => $user_no));

				$sth = $this->DB->autoPrepare(TABLE_NEWS, array_keys($data), DB_AUTOQUERY_INSERT);
				$res = $this->DB->execute($sth, array_values($data));

				if (DB::isError($res)) {
					go_url("","회원 등록이 되지 않았습니다.\\n[".$res->getMessage()."]");
					exit;
				}else{
					go_url("/index.php","회원정보가 수정되었습니다.");
				}
			}

		
	
		/*****
		 * 회원 리스트를 반환한다.
		 *****/
		function get_user_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = "(1=1)";
		
			if($argu['s_type']=="name"){ $addwhere .= " and user_name like '%{$argu['keyword']}%' "; }
			
			if($argu['s_type']=="email"){ $addwhere .= " and user_emaillist = 'Y' and user_email <> '' "; }

			$query = "
				select
					count(*)
				from
					".TABLE_NEWS."
				where
					$addwhere
			";

			$total = $this->DB->getOne($query);
			if (DB::isError($list)) {
				die($list->getMessage());
			}

			$query = "
				select
					*
				from
					".TABLE_NEWS."
				where
					$addwhere
				order by
					user_regdate desc ";
					#echo"$query";
			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_LIST_NUM.",".$this->_LIST_NUM;

			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($list)) {
				debug($this->DB);
				die($list->getMessage());
			}

			return $list;
		}

		/*****
		 * 나를 추천한 회원 리스트를 반환한다.
		 *****/
		function get_vote_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = " vote_id = '".$_SESSION['user_id']."'";

			$query = "
				select
					count(*)
				from
					".TABLE_NEWS."
				where
					$addwhere
			";

			$total = $this->DB->getOne($query);
			if (DB::isError($list)) {
				die($list->getMessage());
			}

			$query = "
				select
					*
				from
					".TABLE_NEWS."
				where
					$addwhere
				order by
					user_regdate desc ";
			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_LIST_NUM.",".$this->_LIST_NUM;

			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($list)) {
				debug($this->DB);
				die($list->getMessage());
			}

			return $list;
		}

		/*****
		 * 회원 내용을 Update 한다.
		 * 회원 탈퇴도 Level 만 탈퇴 등급으로 조정하는것으로 처리 하므로 Update Function 에서 처리한다.
		 *****/
		function set_user_update($argu){
			 
			if($argu["mode"]=="DELETE_ACTION"){
				if($_SESSION['user_level']==1){
					$argu["user_withdrawal_case"]="관리자 탈퇴 처리";
					$argu["user_withdrawal_memo"]="관리자 탈퇴 처리";
				}

				$data = array(
					"user_level"       => $this->user_withdrawal_level,	
					"user_withdrawal"       => "Y",
					"user_withdrawal_date"       => _NowTime,
					"user_withdrawal_case"      => $argu["user_withdrawal_case"],
					"user_withdrawal_memo"      => $argu["user_withdrawal_memo"]
				);
			}else{

				// 변수 설정
				$argu["user_hp"]=$argu["user_hp1"]."-".$argu["user_hp2"]."-".$argu["user_hp3"];
				$argu["user_tel"]=$argu["user_tel1"]."-".$argu["user_tel2"]."-".$argu["user_tel3"];
				$argu["parent_hp"]=$argu["parent_hp1"]."-".$argu["parent_hp2"]."-".$argu["parent_hp3"];
				$argu["parent_person"]=$argu["parent_person1"].$argu["parent_person2"];
			
				if($_SESSION['user_level']==1){
					$argu["user_person"] = str_replace("-","",$argu["user_person"]);
				}else{
					$argu["user_person"] = trim($argu["user_person1"]).trim($argu["user_person2"]).trim($argu["user_person3"]);
				}

				/// 기업/단체 후원희망부문
				$company_hope="";

				foreach($argu["company_hope"] as $key => $value){
					$company_hope.=$value."|";
				}

				$argu["company_hope"] = substr($company_hope,0,-1);

				$argu["user_level"]=($argu["user_level"]) ? $argu["user_level"] : $this->user_basic_level;

				// 주민/사업자 등록 번호 암호화
				$cipher = new zm_Cipher;
				$argu["user_person"] = $cipher -> encrypt($argu["user_person"]);
				$argu["parent_person"] = $cipher -> encrypt($argu["parent_person"]);
				$cipher = new zm_Cipher_Close;
				
				$data =  array(
					"user_name"         => $argu["user_name"],
					"user_person"         => $argu["user_person"],
					"user_nickname"         => $argu["user_nickname"],
					"user_company"         => $argu["user_company"],
					"user_man"         => $argu["user_man"],
					"user_hp"         => $argu["user_hp"],
					"user_tel"         => $argu["user_tel"],
					"user_zip"         => $argu["user_zip"],
					"user_add1"         => $argu["user_add1"],
					"user_add2"         => $argu["user_add2"],
					"user_job"         => $argu["user_job"],
					"user_email"      => $argu["user_email"],
					"user_emaillist"      => $argu["user_emaillist"],
					"parent_name"      => $argu["parent_name"],
					"parent_person"      => $argu["parent_person"],
					"parent_email"      => $argu["parent_email"],
					"parent_hp"      => $argu["parent_hp"],
					"parent_auth"      => $argu["parent_auth"],
					"parent_job"      => $argu["parent_job"],
					"company_hope"      => $argu["company_hope"],
					"company_many"      => $argu["company_many"]
				);

				if($_SESSION['user_level']==1){
					$data=array_merge($data, array(
						"user_level" => $argu["user_level"],
						"user_type"         => $argu["user_type"],
						"user_memo"      => $argu["user_memo"]
					));

					if($argu["user_level"]<$this->user_withdrawal_level){
						$data=array_merge($data, array(
							"user_withdrawal"       => "N",
							"user_withdrawal_date"       => null,
							"user_withdrawal_case"      => null,
							"user_withdrawal_memo"      => null
						));
					}
				}

				// 비밀번호를 입력할 경우 비밀번호를 같이 변경한다.
				if(strlen($argu["user_pwd"])>3){
					$pwd1=substr(md5($argu["user_pwd"]),0,20);
					$pwd2=substr(md5($argu["user_pwd"]),-20);

					$pwd=$pwd1.$pwd2;

					$data=array_merge($data, array(
						"user_pwd" => $pwd
					));
				}

				if($_SESSION['user_level']==1){
					$argu = array_merge($argu, array("vote_id" => $argu['vote_id']));
				}
			}

			$result = $this->DB->autoExecute(TABLE_USER, $data, DB_AUTOQUERY_UPDATE, "user_no = '{$argu['user_no']}' ");

			if (DB::isError($result)) {
				debug($this->DB);
				die($result->getMessage());
			}

			return true;
		}
### 삭제 ###
		function set_user_delete($argu){
			


			$query = "
				delete from ".TABLE_NEWS."
				where
					user_no   = '{$argu['user_no']}'
			";

			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
			    exit;
			}

			return true;

		}

		function get_id_search($argu){
				// 주민/사업자 등록 번호 암호화
				$cipher = new zm_Cipher;
				$argu["user_person"] = $cipher -> encrypt($argu["user_person"]);
				$cipher = new zm_Cipher_Close;
			
				$addwhere = "(user_name = '{$argu['user_name']}') and (user_person = '{$argu['user_person']}') ";
				if($argu['user_email'] && $argu['user_id']){$addwhere .= " and (user_email = '{$argu['user_email']}') and (user_id = '{$argu['user_id']}') ";}

				$query = "
					select
						*
					from
						".TABLE_USER."
					where
						$addwhere
					";

				$row = $this->DB->getRow($query,DB_FETCHMODE_ASSOC);
				if (DB::isError($row)) {
					//debug($row);
					die($row->getMessage());
					exit;
				}

				return $row;

		}
				
	}
				
?>