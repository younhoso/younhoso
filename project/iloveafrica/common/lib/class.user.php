<?
	class User {

		var $DB;
		var $total = 0;
		var $user_admin_level   = 1;   // admin 의 권한 레벨을 1로 설정하였다 숫자가 낮을수록 높은 권한이다.
		var $user_withdrawal_level   = 9;   // 탈퇴 및 비회원 레벨
		var $user_basic_level   = 7;   // 회원가입시 할당할 기본 레벨을 설정한다.
		var $user_manager_level = 5; // 직원 레벨
		var $_LIST_NUM=20;

		# 생성자
		function User($db) {
			$this->DB = $db;
		}

		/*****
		 * 세션정보로서 관리자 권한을 가지고 있는지 확인 한다.
		 * "user_id" 세션값이 존재하고 "user_level" 세션값이 지정한 값보다 같거나 작은지 확인한다.
		 *****/
		function check_admin($info){
			return ($info['user_no'] != null && $info['user_id'] != null && $info['user_level'] <= $this->user_admin_level)? true:false;
		}
		 
		 /*****
		 * 세션정보로서 직원 권한을 가지고 있는지 확인 한다.
		 * "user_id" 세션값이 존재하고 "user_level" 세션값이 지정한 값보다 같거나 작은지 확인한다.
		 *****/
		function check_staff($info){
			return ($info['user_no'] != null && $info['user_id'] != null && $info['user_level'] <= $this->user_manager_level)? true:false;
		}

		/*****
		 * 세션정보로서 로그인 상태인지 확인 한다.
		 * "user_id" 세션값이 존재하고 "user_level" 세션값이 지정한 값보다 작은지 확인한다.
		 *****/
		function check_login($info){
			return ($info['user_no'] != null && $info['user_id'] != null && $info['user_level'] <= $this->user_login_level)? true:false;
		}

		/*****
		 * 아이디 중복체크
		 * 기본 검사는 javascript 와 php 에서 동시에 처리할 수 도 있으니 기본 검사 방법이 변경이 된다면 두군대를 수정하여야 한다.
		 *****/
		function check_dupleid($str){
			// Rule - 아이디는 4~10 자리 이며 첫자리에는 숫자가 올수없고 영숫자 조합이고 소문자만 사용한다.
			//if(ereg('^[a-z]{1}[a-z0-9]{3,11}$', $str)){
			if(preg_match(_REGEXP, $str)){
				if($this->DB->getOne("select count(*) from ".TABLE_USER." where user_id = '{$str}'") > 0){ // 중복 아이디일 경우
					return array("code" => "D","user_id" => $str);
				}else{ // 중복 아이디가 아닐경우
					return array("code" => "A","user_id" => $str);
				}
			}else{ // 형식에 맞지 않을경우
				return array("code" => "F","user_id" => "");
			}
		}

		/*****
		 * 입력정보를 통해 회원 여부를 확인한다.
		 *****/
		function check_login_info($argu){
			$pwd1=substr(md5($argu["user_pwd"]),0,20);
			$pwd2=substr(md5($argu["user_pwd"]),-20);

			$pwd=$pwd1.$pwd2;
			
			$query = "
				select
					u.user_no,
					u.user_id,
					u.user_name,
					u.user_level,
					u.user_withdrawal
				from
					".TABLE_USER." u
				where
					u.user_id      = /* 1 */ ?
					and u.user_pwd = /* 2 */ ?
			";
			
			$row = $this->DB->getRow($query,array( /* 1 */ $argu['user_id'], /* 2 */ $pwd),DB_FETCHMODE_ASSOC);

			if (DB::isError($row)) {
				debug($row);exit;
				return;
			}else{
				return $row;
			}
		}
			
		/*****
		 * 세션에 저장된 상태를 반환한다.
		 *****/
		function get_status(){
			return array_filter(array(
				'user_no'       => $_SESSION['user_no'],
				'user_id'       => $_SESSION['user_id'],
				'user_name'     => $_SESSION['user_name'],
				'user_level'    => $_SESSION['user_level']
			),'delete_null_array');

		}

		/*****
		 * 회원 내용을 반환한다.
		 *****/
		function get_user_view($user_no){
			$query = "
				select
					*
				from
					".TABLE_USER."
				where
					user_no = '{$user_no}'
				";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
				debug($res);
				return;
			}

			$row = $res->fetchRow(DB_FETCHMODE_ASSOC);

			/// 주민번호 복호화
			$cipher = new zm_Cipher;
			$user_person = $cipher -> decrypt($row["user_person"]);
			$parent_person = $cipher -> decrypt($row["parent_person"]);
			$cipher = new zm_Cipher_Close;

			if($row["user_type"]=='3'){
				$user_person1 = substr($user_person, 0, 3);
				$user_person2 = substr($user_person, 3, 2);
				$user_person3 = substr($user_person, -5);

				$row = array_merge($row, array(
					"user_person1"=>$user_person1,
					"user_person2"=>$user_person2,
					"user_person3"=>$user_person3
				));
			}else{
				$user_person1 = substr($user_person, 0, 6);
				$user_person2 = substr($user_person, -7);

				$row = array_merge($row, array(
					"user_person1"=>$user_person1,
					"user_person2"=>$user_person2
				));
			}

			$parent_person1 = substr($parent_person, 0, 6);
			$parent_person2 = substr($parent_person, -7);

			$row = array_merge($row, array(
				"parent_person1"=>$parent_person1,
				"parent_person2"=>$parent_person2
			));

			return $row;
		}

		function get_total(){
			$query = "select found_rows()";
			$total = $this->DB->getOne($query);

			if (DB::isError($total)) {
				die($total->getMessage());
			}
			return $total;
		}

		/*****
		 * 로그인 상태가 될수 있도록 세션을 생성한다.
		 *****/
		function set_login_session($data){
			$_SESSION['user_no']       = $data['user_no'];
			$_SESSION['user_id']       = $data['user_id'];
			$_SESSION['user_name']     = $data['user_name'];
			$_SESSION['user_level']    = $data['user_level'];
		}
		 
		 /*****
		 * 로그인 정보를 업데이트한다.
		 *****/
		function set_login_update($data){
			$query="
				update 
					".TABLE_USER."
				set
					user_cnt=user_cnt+1,
					user_lastlogin=now()
				where
					user_no='".$data['user_no']."'";

			$result = $this->DB->query($query);

			if (DB::isError($result)) {
				//debug($this->DB);
				die($result->getMessage());
			}
		}

		/*****
		 * 회원을 등록한다.
		 *****/
		function set_user_insert($argu){

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
			
			// 아이디 중복 체크
			$id_chk=$this->check_dupleid($argu["user_id"]);

			$argu['return_url'] = ($argu['return_url']) ? urldecode($argu['return_url']) : "";

			if($id_chk['code'] == "D" || $id_chk['code']=="F"){
				go_url("","이미 가입된 아이디입니다.");
				exit;
			}else{

				/// 빠진 사항 체크
				if(strlen($argu["user_id"])<4){ go_url("","아이디를 입력하지 않으셨거나 형식에 맞지 않습니다."); exit; }
				if(strlen($argu["user_pwd"])<3){ go_url("","비밀번호를 입력하지 않으셨거나 형식에 맞지 않습니다."); exit; }
				if(strlen($argu["user_name"])<2){ go_url("","성명이 입력되지 않았습니다."); exit; }
				
				$data = array(
					"user_id"         => $argu["user_id"],
					"user_type"         => $argu["user_type"],
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
					"parent_auth"      => ($argu["parent_auth"]=="Y") ? "Y" : "N",
					"parent_job"      => $argu["parent_job"],
					"company_hope"      => $argu["company_hope"],
					"company_many"      => $argu["company_many"],
					"vote_id"      => $argu["vote_id"],
					"user_level"        => $argu["user_level"],
					"user_memo"      => $argu["user_memo"],
					"user_withdrawal"   => "N",
					"user_withdrawal_date"       => null,
					"user_withdrawal_case"      => null,
					"user_withdrawal_memo"      => null,
					"user_ip"       => $_SERVER["REMOTE_ADDR"],
					"user_regdate"          => _NowTime,
					"user_cnt"          => 0,
					"user_lastlogin"          => null
				);

				// 패스워드 암호화
				if(strlen($argu["user_pwd"])>3){
					$pwd1=substr(md5($argu["user_pwd"]),0,20);
					$pwd2=substr(md5($argu["user_pwd"]),-20);

					$pwd=$pwd1.$pwd2;
				}

				$data = array_merge($data, array("user_pwd" => $pwd));

				$sth = $this->DB->autoPrepare(TABLE_USER, array_keys($data), DB_AUTOQUERY_INSERT);
				$res = $this->DB->execute($sth, array_values($data));

				if (DB::isError($res)) {
					go_url("","회원 등록이 되지 않았습니다.\\n[".$res->getMessage()."]");
					exit;
				}
			}

			return $argu['return_url'];
		}

		/*****
		 * 회원 리스트를 반환한다.
		 *****/
		function get_user_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = "(1=1)";
			if($argu['s_type']=="id"){ $addwhere .= " and user_id like '%{$argu['keyword']}%' "; }
			if($argu['s_type']=="name"){ $addwhere .= " and user_name like '%{$argu['keyword']}%' "; }
			if($argu['s_type']=="tel"){ $addwhere .= " and user_hp like '%{$argu['keyword']}%' "; }
			if($argu['s_type']=="email"){ $addwhere .= " and user_emaillist = 'Y' and user_email <> '' "; }

			$query = "
				select
					count(*)
				from
					".TABLE_USER."
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
					".TABLE_USER."
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
		 * 나를 추천한 회원 리스트를 반환한다.
		 *****/
		function get_vote_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = " vote_id = '".$_SESSION['user_id']."'";

			$query = "
				select
					count(*)
				from
					".TABLE_USER."
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
					".TABLE_USER."
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