<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Support extends MY_Controller {
    public function index() {
        $this->report();
    }

    public function regular() {
        $this->load->Template("support/regular");
    }


    public function onece() {
        $this->load->Template("support/onece");
    }

    public function special() {
        $this->load->Template("support/special");
    }

    public function legacy() {
        $this->load->Template("support/legacy");
    }

    public function group() {
        $this->load->Template("support/group");
    }

    public function enterprise_intro() {
        $data = array();

        if( $this->agent->is_mobile() ) {
            $page = $this->input->get("page");
            $act = true;
            if( !$page ) {
                $page = 1;
                $act = false;
            }
            
            $data = $this->boardListResult("8", $page);
            $data["listpath"] = $this->NATION_LINK."support/enterprise_intro?";
            $data["viewpath"] = $this->NATION_LINK."support/enterprise_activeview?"; 
            $data["active"] = $act;
        } else {
            
        }

        $this->load->Template("support/enterprise", $data);
    }

    public function enterprise_sponsor() {
        $this->load->Template("support/enterprise_support");
    }

    public function enterprise_together() {
        $this->load->Template("support/enterprise_together");
    }

    public function enterprise_active() {
        if( $this->agent->is_mobile() ) {
            $this->Redirect("/support/enterprise_intro");
        } else {
            $page = $this->input->get("page");
            if( !$page ) {
                $page = 1;
            }
            
            $data = $this->boardListResult("8", $page);
            $data["listpath"] = $this->NATION_LINK."support/enterprise_active?";
            $data["viewpath"] = $this->NATION_LINK."support/enterprise_activeview?";

            $this->load->Template("support/enterprise_active_list", $data);
        }
        
    }

    public function enterprise_activeview() {
        $this->SetErrLog();
        $idx = $this->GET("idx", 0);
        $page = $this->GET("page", 1);

        if( $idx != 0 ) {
            $data = $this->boardViewResult("8", $idx, $page);
            if( $this->agent->is_mobile() ) {
                $data["listpath"] = $this->NATION_LINK."support/enterprise_intro?";
            } else {
                $data["listpath"] = $this->NATION_LINK."support/enterprise_active?";
            }
            
            $data["viewpath"] = $this->NATION_LINK."support/enterprise_activeview?";

            $this->load->Template("support/enterprise_active_view", $data);
        } else {
            $this->Redirect("support/enterprise_active");
        }
    }

    function boardListResult($cate, $page) {
        $limit = 9;
        $pageLimit = 10;

        if( $this->IS_MOBILE ) {
            $limit = 5;
            $pageLimit = 5;
        }

        $this->load->database();
        $this->load->model("Report_model");

        $totalCount = $this->Report_model->selectListCount($cate);
        $r = $this->Report_model->selectList($cate, $page, $limit);

        $data = $this->load->PageInfo($r, $page, $totalCount, $limit, $pageLimit);

        return $data;
    }

    function boardViewResult($cate, $idx, $page) {
        $limit = 9;

        $data = array (
            "page" => $page,
            "idx" => $idx
        );

        if( $idx != 0 ) {
            $this->load->database();
            $this->load->model("Report_model");

            $this->Report_model->updateReadCount($idx);

            $r = $this->Report_model->selectReportContent($idx);
            $range = $this->Report_model->selectReportRangeList($cate, $idx);

            $pitem = null;
            $nitem = null;
            $rangeCnt = count($range);

            if( $rangeCnt > 0 ) {
                $item = $range[0];
                if( $item["IDX"] != $idx ) {
                    $nitem = $item;
                }
            }

            if( $rangeCnt > 1 ) {
                $item = $range[$rangeCnt - 1];
                if( $item["IDX"] != $idx ) {
                    $pitem = $item;
                }
            }
            
            $data["result"] = $r;
            $data["pre_content"] = $pitem;
            $data["next_content"] = $nitem;

            // 나보다 많이 갯수
			$upCount = $this->Report_model->selectContentIndex($cate, $idx);
			$listPage = ceil($upCount / $limit);
            $data["listPage"] = $listPage;
        }

        return $data;
    }
}

/* End of file news.php */
/* Location: ./application/controllers/news.php */