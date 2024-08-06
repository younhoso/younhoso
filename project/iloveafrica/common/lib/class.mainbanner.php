<?
	class MainBanner {
        var $DB;
        
        var $limit = 100;
        var $pageLimit = 10;
		
		# 생성자
		function MainBanner($db) {
			$this->DB = $db;
        }

        function selectTotalCount() {
            $q = "
                SELECT
                    COUNT(*) AS 'CNT'
                FROM
                    main_banner
            ";

            $totalCount = $this->DB->getOne($q);
            return $totalCount;
        }   
        
        function selectList($page) {
            $p = intval($page);

            if( $p < 0 ) $p = 0;
            $sp = ($p - 1) * $this->limit;

            $totalCount = $this->selectTotalCount();
            $l = $this->limit;

            $q = "
                SELECT
                    idx, title,  use_state, regist_date, IFNULL(orders, 0) as 'orders'
                FROM
                    main_banner
                ORDER BY idx DESC
                LIMIT $sp, $l
            ";

            $list = $this->DB->getAll($q, array(), DB_FETCHMODE_ASSOC);

            $totalPage = ceil($totalCount / $this->limit);
            $startPage = (floor(($p - 1) / $this->limit) * $this->limit) + 1;
            $endPage = $startPage + ($endPage - 1);
            if( $endPage > $totalPage ) {
                $endPage = $totalPage;
            }

            $no = $totalCount - (($p - 1) * $this->limit);

            $data = array(
                "result" => $list,
                "startNo" => $no,
                "page" => $page,
                "limit" => $this->limit,
                "pageLimit" => $this->pageLimit,
                "totalCount" => $totalCount,
                "totalPage" => $totalPage,
                "startPage" => $startPage,
                "endPage" => $endPage,
            );

            return $data;
        }

        function insertMainBanner($a) {
            $totalCount = $this->selectTotalCount();

            $data = array(
                "title" => $a["title"],
                "use_state" => $a["use"],
                "campaign_title" => $a["c_title"],
                "main_title" => $a["c_title"],
                "content" => $a["content"],
                "banner" => $a["banner"],
                "banner_mo" => $a["banner_mo"],
                "link" => $a["link"],
                "link_mo" => $a["link_mo"],
                "link_target" => $a["link_target"],
                "regist_date" => _NowTime,
                "orders" => $a["orders"]
            );

            $sth = $this->DB->autoPrepare("main_banner", array_keys($data), DB_AUTOQUERY_INSERT);
			$res = $this->DB->execute($sth, array_values($data));

			if (DB::isError($res)) {
				go_url("", $res->getMessage());
				exit;
			}
            
            $q = "
				SELECT LAST_INSERT_ID() AS 'ID';
			";
            $lid = $this->DB->getOne($q);
            
            // $data["last_id"] = mysql_insert_id();
            $data["last_id"] = $lid;
            return $data;
        }

        function selectView($idx) {
            $q = "
                SELECT
                    *
                FROM
                    main_banner
                WHERE
                    idx = $idx
            ";

            $view = $this->DB->getRow($q ,DB_FETCHMODE_ASSOC);

            return $view;
        }

        function updateMainBanner($a) {
            $data = array(
                "title" => $a["title"],
                "use_state" => $a["use"],
                "campaign_title" => $a["c_title"],
                "main_title" => $a["m_title"],
                "content" => $a["content"],
                "banner" => $a["banner"],
                "banner_mo" => $a["banner_mo"],
                "link" => $a["link"],
                "link_mo" => $a["link_mo"],
                "link_target" => $a["link_target"],
                "regist_date" => _NowTime,
                "orders" => $a["orders"]
            );

            $idx = $a["idx"];
            $result = $this->DB->autoExecute("main_banner", $data, DB_AUTOQUERY_UPDATE, "idx = '{$idx}'");

            $success = true;
            if (DB::isError($result)) {
				debug($this->DB);
                die($result->getMessage());
                $success = false;
            }
            
            return $success;
        }

        function deleteBanner($idx) {
            $q = "
                DELETE FROM main_banner
				WHERE
					idx = $idx
			";

            $result = true;
			$res = $this->DB->query($q);
			if (DB::isError($res)) {
			    //debug($res);
			    die($res->getMessage());
                $result = false;
			}

			return $result;
        }

        function useStateUpdate($a) {
            $data = array(
                "use_state" => $a["use"],
            );

            $idx = $a["idx"];
            $result = $this->DB->autoExecute("main_banner", $data, DB_AUTOQUERY_UPDATE, "idx = '{$idx}'");

            $success = true;
            if (DB::isError($result)) {
				debug($this->DB);
                die($result->getMessage());
                $success = false;
            }
            
            return $success;
        }

        function orderUpdate($a) {
            $idxlist = explode(",", $a["idxlist"]);
            $orderlist = explode(",", $a["orderlist"]);

            $success = true;
            for($i = 0, $len = count($idxlist) ; $i < $len ; $i++) {
                $idx = $idxlist[$i];
                $order = $orderlist[$i];

                $data = array(
                    "orders" => $order
                );
    
                $result = $this->DB->autoExecute("main_banner", $data, DB_AUTOQUERY_UPDATE, "idx = '{$idx}'");
    
                
                if (DB::isError($result)) {
                    debug($this->DB);
                    die($result->getMessage());
                    $success = false;
                    break;
                }
            }

            return true;
        }
	}
				
?>