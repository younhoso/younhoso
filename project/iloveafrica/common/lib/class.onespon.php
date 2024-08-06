<?
	class OneSpon {

		var $DB;
		var $total = 0;
		var $_LIST_NUM=20;

		# 생성자
		function OneSpon($db){
			$this->DB = $db;
		}
		
		/*****
		 * 주문번호를 생성한다.
		 *****/
		function set_order_idx($argu){

			// 주문번호 생성하기
			if($argu["give_type"]=='re'){
				$ordr_idxx = "RP".date("YmdHis");
			}else{
				$ordr_idxx = ($argu["give_type"]=='1') ? "NO".date("YmdHis") : "HO".date("YmdHis");
			}
			$res = $order_cnt = $this->DB->getOne("select coalesce(count(*),0)+1 from ".TABLE_ONE_LIST." where ordr_idxx like '{$ordr_idxx}%'");
			if (DB::isError($res)) {
			    go_url("","주문번호 생성 오류입니다!\\n[".$res->getMessage()."]");
			    exit;
			}
			
			$ordr_idxx .= $order_cnt;

			return $ordr_idxx;
		}

		/*****
		 * 후원 신청을 등록한다.
		 *****/
		function set_insert($argu){

			global $_adminpage;

			$ordr_idxx = $argu["ordr_idxx"];//$this->set_order_idx($argu);

			// 아이디
			if(!$_adminpage){ $argu["user_id"] = ($_SESSION["user_id"]) ? $_SESSION["user_id"] : $_SESSION["guest_id"]; }

			// 변수 설정
			$argu["ol_give_type"]=$argu["give_type"];
			$argu["ol_give_tel1"]=$argu["ol_give_tel11"]."-".$argu["ol_give_tel12"]."-".$argu["ol_give_tel13"];
			$argu["ol_give_tel2"]=$argu["ol_give_tel21"]."-".$argu["ol_give_tel22"]."-".$argu["ol_give_tel23"];
			
			$argu["ol_give_person"]=$argu["ol_give_person1"].$argu["ol_give_person2"];

			// 주민 등록 번호 및 결제정보 암호화
			$cipher = new zm_Cipher;
			$argu["ol_give_person"] = $cipher -> encrypt($argu["ol_give_person"]);
			$cipher = new zm_Cipher_Close;
			
			$data = array(
				"ordr_idxx"         => $ordr_idxx,
				"ol_give_type"         => $argu["ol_give_type"],
				"user_id"         => $argu["user_id"],
				"ol_give_name"         => $argu["ol_give_name"],
				"ol_give_person"         => $argu["ol_give_person"],
				"ol_give_tel1"         => $argu["ol_give_tel1"],
				"ol_give_tel2"         => $argu["ol_give_tel2"],
				"ol_give_email"         => $argu["ol_give_email"],
				"ol_give_local"         => $argu["ol_give_local"],
				"ol_give_zip"         => $argu["ol_give_zip"],
				"ol_give_add1"         => $argu["ol_give_add1"],
				"ol_give_add2"         => $argu["ol_give_add2"],
				"ol_give_reason"         => $argu["ol_give_reason"],
				"ol_give_one"         => $argu["ol_give_one"],
				"ol_give_en"      => $argu["ol_give_en"],
				"bl_give_type"      => $argu["bl_give_type"],
				"bl_give_birth"      => $argu["bl_give_birth"],
				"bl_give_baby"      => $argu["bl_give_baby"],
				"bl_give_parent"      => $argu["bl_give_parent"],
				"hl_give_type"      => $argu["hl_give_type"],
				"hl_give_target"      => $argu["hl_give_target"],
				"wl_give_type"      => $argu["wl_give_type"],
				"wl_give_target"      => $argu["wl_give_target"],
				"wl_give_man"      => $argu["wl_give_man"],
				"wl_give_woman"        => $argu["wl_give_woman"],
				"fl_give_star"      => $argu["fl_give_star"],
				"ol_give_date"   => $argu["ol_give_date"],
				"ol_give_memo"       => $argu["ol_give_memo"],
				"ol_regdate"          => _NowTime
			);

			$sth = $this->DB->autoPrepare(TABLE_ONE_LIST, array_keys($data), DB_AUTOQUERY_INSERT);
			$res = $this->DB->execute($sth, array_values($data));

			if (DB::isError($res)) {
				go_url("","등록 오류 입니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return $data;
		}

		/*****
		 * 내역을 Update 한다.
		 *****/
		function set_update($argu){
			 
			// 변수 설정
			$argu["ol_give_type"]=$argu["give_type"];
			$argu["ol_give_tel1"]=$argu["ol_give_tel11"]."-".$argu["ol_give_tel12"]."-".$argu["ol_give_tel13"];
			$argu["ol_give_tel2"]=$argu["ol_give_tel21"]."-".$argu["ol_give_tel22"]."-".$argu["ol_give_tel23"];
			
			$argu["ol_give_person"]=$argu["ol_give_person1"].$argu["ol_give_person2"];

			// 주민 등록 번호 및 결제정보 암호화
			$cipher = new zm_Cipher;
			$argu["ol_give_person"] = $cipher -> encrypt($argu["ol_give_person"]);
			$cipher = new zm_Cipher_Close;
			
			$data = array(
				"ol_give_type"         => $argu["ol_give_type"],
				"ol_give_name"         => $argu["ol_give_name"],
				"ol_give_person"         => $argu["ol_give_person"],
				"ol_give_tel1"         => $argu["ol_give_tel1"],
				"ol_give_tel2"         => $argu["ol_give_tel2"],
				"ol_give_email"         => $argu["ol_give_email"],
				"ol_give_local"         => $argu["ol_give_local"],
				"ol_give_zip"         => $argu["ol_give_zip"],
				"ol_give_add1"         => $argu["ol_give_add1"],
				"ol_give_add2"         => $argu["ol_give_add2"],
				"ol_give_reason"         => $argu["ol_give_reason"],
				"ol_give_one"         => $argu["ol_give_one"],
				"ol_give_en"      => $argu["ol_give_en"],
				"bl_give_type"      => $argu["bl_give_type"],
				"bl_give_birth"      => $argu["bl_give_birth"],
				"bl_give_baby"      => $argu["bl_give_baby"],
				"bl_give_parent"      => $argu["bl_give_parent"],
				"hl_give_type"      => $argu["hl_give_type"],
				"hl_give_target"      => $argu["hl_give_target"],
				"wl_give_type"      => $argu["wl_give_type"],
				"wl_give_target"      => $argu["wl_give_target"],
				"wl_give_man"      => $argu["wl_give_man"],
				"wl_give_woman"        => $argu["wl_give_woman"],
				"fl_give_star"      => $argu["fl_give_star"],
				"ol_give_date"   => $argu["ol_give_date"],
				"ol_give_memo"       => $argu["ol_give_memo"],
			);

			$result = $this->DB->autoExecute(TABLE_ONE_LIST, $data, DB_AUTOQUERY_UPDATE, "ol_no = '{$argu['ol_no']}' ");

			if (DB::isError($result)) {
				go_url("","수정 오류 입니다.\\n[".$res->getMessage()."]");
				exit;
			}

			return true;
		}

		/*****
		 * 내역을 삭제 한다.
		 *****/
		function set_delete($argu) {

			$query = "
				delete from ".TABLE_ONE_LIST."
				where  ol_no = '{$argu['ol_no']}'
			";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
			    go_url("","삭제에 오류입니다.\\n[".$res->getMessage()."]");
			    exit;
			}

			return true;
		}


		/*****
		 * 리스트를 반환한다.
		 *****/
		function get_list($argu,&$total,$limit = true){
			
			/// 검색 쿼리
			$addwhere = "ol_give_type='".$argu["give_type"]."'";
			if($argu['s_type']=="id"){ $addwhere .= " and user_id like '%{$argu['keyword']}%' "; }
			if($argu['s_type']=="name"){ $addwhere .= " and ol_give_name like '%{$argu['keyword']}%' "; }
			if($argu['s_type']=="tel"){ $addwhere .= " and (ol_give_tel1 like '%{$argu['keyword']}%' or ol_give_tel2 like '%{$argu['keyword']}%') "; }
			if($argu['s_type']=="email"){ $addwhere .= " and ol_give_email  like '%{$argu['keyword']}%' "; }

			$query = "
				select
					count(*)
				from
					".TABLE_ONE_LIST."
				where
					$addwhere
			";

			$total = $this->DB->getOne($query);
			if (DB::isError($list)) {
				go_url("","목록을 불러올 수 없습니다.\\n[".$res->getMessage()."]");
			    exit;
			}

			$query = "
				select
					*
				from
					".TABLE_ONE_LIST."
				where
					$addwhere
				order by
					ol_regdate desc ";
			if($limit)
			$query .= "
				limit ".($argu['p']-1)*$this->_LIST_NUM.",".$this->_LIST_NUM;

			$list =& $this->DB->getAll($query, array(), DB_FETCHMODE_ASSOC);

			if (DB::isError($list)) {
				go_url("","목록을 불러올 수 없습니다.\\n[".$res->getMessage()."]");
			    exit;
			}

			return $list;
		}
		

		/*****
		 * 신청 내용을 불러온다.
		 *****/
		function get_view($argu){
			$query = "
				select
					*
				from
					".TABLE_ONE_LIST."
				where
					ol_no = '{$argu['ol_no']}'
				";
			$res = $this->DB->query($query);
			if (DB::isError($res)) {
				go_url("","내용을 불러올 수 없습니다.\\n[".$res->getMessage()."]");
			    exit;
			}

			$row = $res->fetchRow(DB_FETCHMODE_ASSOC);

			if(is_array($row)){
				/// 주민번호 및 결제정보 복호화
				$cipher = new zm_Cipher;
				$ol_give_person = $cipher -> decrypt($row["ol_give_person"]);
				$cipher = new zm_Cipher_Close;

				$ol_give_person1 = substr($ol_give_person, 0, 6);
				$ol_give_person2 = substr($ol_give_person, -7);

				$row = array_merge($row, array(
					"ol_give_person1"=>$ol_give_person1,
					"ol_give_person2"=>$ol_give_person2,
				));
			}

			return $row;
		}

	}
?>