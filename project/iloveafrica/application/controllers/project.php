<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Project extends MY_Controller {
    public function index() {
        $this->Redirect("news/report");
    }

    public function well() {
        error_reporting(E_ALL);
        ini_set("display_errors", 1);

        $isMobile = $this->agent->is_mobile();
        $page = $this->GET('page', 1);
        $cate = "1";

        $limit = 9;
        $pageLimit = 10;
        if( $isMobile ) {
            $limit = 5;
            $pageLimit = 5;
        }

        $this->load->database();
        $this->load->model("Relief_model");

        $totalCount = $this->Relief_model->selectListCount($cate);
        $r = $this->Relief_model->selectList($cate, $page, $limit);

        $data = $this->load->PageInfo($r, $page, $totalCount, $limit, $pageLimit);
        $data["category"] = $cate;
        $data["listpath"] = "/index.php/news/relief?category=".$cate;
        $data["viewpath"] = "/index.php/news/reliefview?category=".$cate;

        
        if( $this->agent->is_mobile() ) {
             $this->load->Template("project/well", $data);
        } else {
             $this->load->view("project/well/desk/index", $data);
        }
        
    }
}

/* End of file news.php */
/* Location: ./application/controllers/project.php */