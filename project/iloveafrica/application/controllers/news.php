<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class News extends MY_Controller {
    public function index() {
        $this->Redirect("news/report");
    }

    function reportListResult($cate, $page) {
        $limit = 9;
        $pageLimit = 10;

        if( $this->IS_MOBILE ) {
            $limit = 15;
            $pageLimit = 15;
        }

        $this->load->database();
        $this->load->model("Report_model");

        $totalCount = $this->Report_model->selectListCount($cate);
        $r = $this->Report_model->selectList($cate, $page, $limit);

        $data = $this->load->PageInfo($r, $page, $totalCount, $limit, $pageLimit);

        return $data;
    }

    function reportViewResult($cate, $idx, $page) {
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

    public function report() {
        $page = $this->input->get("page");
        if( !$page ) {
            $page = 1;
        }
        
        $data = $this->reportListResult("3", $page);
        $data["category"] = "3";
        $data["listpath"] =  $this->NATION_LINK."news/report?";
        $data["viewpath"] = $this->NATION_LINK."news/reportview?";

        if($this->agent->is_mobile() && $page > 1) {
			$this->load->view("kor/mobile/include/report_listview.php", $data);
		} else {
			$this->load->Template("news/report/report", $data);
		}
    }

    public function reportview() {
        $idx = $this->GET("idx", 0);
        $page = $this->GET("page", 1);

        if( $idx != 0 ) {
            $data = $this->reportViewResult("3", $idx, $page);
            $data["category"] = "3";
            $data["listpath"] = $this->NATION_LINK."news/report?";
            $data["viewpath"] = $this->NATION_LINK."news/reportview?";

            $this->load->Template("news/report/report_view", $data);
        } else {
            $this->Redirect("news/report");
        }
    }

    public function campaign() {
        $page = $this->input->get("page");
        if( !$page ) {
            $page = 1;
        }
        
        $data = $this->reportListResult("4", $page);
        $data["category"] = "4";
        $data["listpath"] = $this->NATION_LINK."news/campaign?";
        $data["viewpath"] = $this->NATION_LINK."news/campaignview?";

        if($this->agent->is_mobile() && $page > 1) {
			$this->load->view("kor/mobile/include/report_listview.php", $data);
		} else {
			$this->load->Template("news/report/report", $data);
		}
    }

    public function campaignview() {
        $idx = $this->GET("idx", 0);
        $page = $this->GET("page", 1);

        if( $idx != 0 ) {
            $data = $this->reportViewResult("4", $idx, $page);
            $data["category"] = "4";
            $data["listpath"] = $this->NATION_LINK."news/campaign?";
            $data["viewpath"] = $this->NATION_LINK."news/campaignview?";
            $this->load->Template("news/report/report_view", $data);
        } else {
            $this->Redirect("news/campaign");
        }
    }
 
    public function videos() {
        $page = $this->input->get("page");
        if( !$page ) {
            $page = 1;
        }
        
        $data = $this->reportListResult("2", $page);
        $data["category"] = "2";
        $data["listpath"] = $this->NATION_LINK."news/videos?";
        $data["viewpath"] = $this->NATION_LINK."news/videosview?";

        if($this->agent->is_mobile() && $page > 1) {
			$this->load->view("kor/mobile/include/report_listview.php", $data);
		} else {
			$this->load->Template("news/report/report", $data);
		}
    }

    public function videosview() {
        $idx = $this->GET("idx", 0);
        $page = $this->GET("page", 1);

        if( $idx != 0 ) {
            $data = $this->reportViewResult("2", $idx, $page);
            $data["category"] = "2";
            $data["listpath"] = $this->NATION_LINK."news/videos?";
            $data["viewpath"] = $this->NATION_LINK."news/videosview?";

            $this->load->Template("news/report/report_view", $data);
        } else {
            $this->Redirect("news/videos");
        }
    }

    function mediaListResult($cate, $page) {
        $limit = 9;
        $pageLimit = 10;
        if( $this->IS_MOBILE ) {
            $limit = 15;
            $pageLimit = 15;
        }

        $this->load->database();
        $this->load->model("Media_model");

        $totalCount = $this->Media_model->selectListCount($cate);
        $r = $this->Media_model->selectList($cate, $page, $limit);

        $data = $this->load->PageInfo($r, $page, $totalCount, $limit, $pageLimit);

        return $data;
    }

    function mediaViewResult($cate, $idx, $page) {
        $limit = 9;

        $data = array (
            "page" => $page,
            "idx" => $idx
        );

        if( $idx != 0 ) {
            $this->load->database();
            $this->load->model("Media_model");

            $this->Media_model->updateReadCount($idx);

            $r = $this->Media_model->selectMediaContent($idx);
            $range = $this->Media_model->selectMediaRangeList($cate, $idx);

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
			$upCount = $this->Media_model->selectContentIndex($cate, $idx);
			$listPage = ceil($upCount / $limit);
            $data["listPage"] = $listPage;
        }

        return $data;
    }

    public function media() {
        $page = $this->GET("page", 1);

        $data = $this->mediaListResult("2", $page);
        $data["category"] = "2";
        $data["listpath"] = $this->NATION_LINK."news/media?";
        $data["viewpath"] = $this->NATION_LINK."news/mediaview?";

        if($this->agent->is_mobile() && $page > 1) {
			$this->load->view("kor/mobile/include/media_listview.php", $data);
		} else {
			$this->load->Template("news/media/media", $data);
		}
    }

    public function mediaview() {
        $page = $this->GET("page", 1);
        $idx = $this->GET("idx", 0);

        if( $idx != 0 ) {
            $data = $this->mediaViewResult("2", $idx, $page);
            $data["category"] = "2";
            $data["listpath"] = $this->NATION_LINK."news/media?";
            $data["viewpath"] = $this->NATION_LINK."news/mediaview?";
            $this->load->Template("news/media/media_view", $data);
        } else {
            $this->Redirect("news/media");
        }
    }

    public function iluvafrica() {
        $page = $this->GET("page", 1);

        $data = $this->mediaListResult("1", $page);
        $data["category"] = "1";
        $data["listpath"] = $this->NATION_LINK."news/iluvafrica?";
        $data["viewpath"] = $this->NATION_LINK."news/iluvafricaview?";

        if($this->agent->is_mobile() && $page > 1) {
			$this->load->view("kor/mobile/include/media_listview.php", $data);
		} else {
			$this->load->Template("news/media/media", $data);
		}
    }

    public function iluvafricaview() {
        $page = $this->GET("page", 1);
        $idx = $this->GET("idx", 0);

        if( $idx != 0 ) {
            $data = $this->mediaViewResult("1", $idx, $page);
            $data["category"] = "1";
            $data["listpath"] = $this->NATION_LINK."news/iluvafrica?";
            $data["viewpath"] = $this->NATION_LINK."news/iluvafricaview?";

            $this->load->Template("news/media/media_view", $data);
        } else {
            $this->Redirect("news/iluvafrica");
        }
    }


    public function notice() {
        $page = $this->GET('page', 1);
        $limit = 10;
        $pageLimit = 10;
        
        if( $this->IS_MOBILE ) {
            $limit = 15;
            $pageLimit = 15;
        }

        $this->load->database();
        $this->load->model("Notice_model");

        $totalCount = $this->Notice_model->selectListCount();
        $result = $this->Notice_model->selectList($page, $limit);
        $data = $this->load->PageInfo($result, $page, $totalCount, $limit, $pageLimit);

        $no = $totalCount - (($page - 1) * $limit);
        $data["start_no"] = $no;
        $data["listpath"] = "/index.php/news/notice?";
        $data["viewpath"] = "/index.php/news/noticedetail?";

        if($this->agent->is_mobile() && $page > 1) {
			$this->load->view("kor/mobile/include/notice_listview.php", $data);
		} else {
			$this->load->Template("news/notice/notice", $data);
		}
    }

    public function noticedetail() {
        // if( $this->IS_MOBILE ) {
        //     $this->Redirect("news/notice");
        // } else {
            $idx = $this->GET("idx", 0);
            $page = $this->GET("page", 1);
            $limit = 10;

            $data = array(
                "page" => $page,
                "idx" => $idx
            );


            if( $idx == 0 ) {
                $this->load->helper("url");
                $this->Redirect("news/notice");
            } else {
                $this->load->database();
                $this->load->model("Notice_model");

                $v = $this->Notice_model->selectNoticeContent($idx);
                $this->Notice_model->updateReadCount($idx);

                // 이전, 다음글 가져오기..
                $range = $this->Notice_model->selectNoticeRangeList($idx);

                $pitem = null;
                $nitem = null;
                $rangeCnt = count($range);

                if( $rangeCnt > 0 ) {
                    $item = $range[0];
                    if( $item["b_no"] != $idx ) {
                        $pitem = $item;
                    }
                }

                if( $rangeCnt > 1 ) {
                    $item = $range[$rangeCnt - 1];
                    if( $item["b_no"] != $idx ) {
                        $nitem = $item;
                    }
                }
                
                $data["result"] = $v;
                $data["pre_content"] = $pitem;
                $data["next_content"] = $nitem;

                // 나보다 많이 갯수
                $upCount = $this->Notice_model->selectContentIndex($idx);
                $listPage = ceil($upCount / $limit);
                $data["listPage"] = $listPage;

                $this->load->Template("news/notice/notice_view", $data);
            }        
        // }
    }

    public function download() {
        $this->load->Template("news/download");
    }


    public function relief() {
        $page = $this->GET('page', 1);
        $cate = $this->GET("category", "");

        $limit = 9;
        $pageLimit = 10;

        if( $this->IS_MOBILE ) {
            $limit = 15;
            $pageLimit = 15;
        }

        $this->load->database();
        $this->load->model("Relief_model");

        $totalCount = $this->Relief_model->selectListCount($cate);
        $r = $this->Relief_model->selectList($cate, $page, $limit);

        $data = $this->load->PageInfo($r, $page, $totalCount, $limit, $pageLimit);
        $data["category"] = $cate;
        $data["listpath"] = "/index.php/news/relief?category=".$cate;
        $data["viewpath"] = "/index.php/news/reliefview?category=".$cate;

        $data["icon"] = array(
            "1" => "<div class='lb ty1'>식수개발개선</div>",
            "2" => "<div class='lb ty2'>자활기술개발</div>",
            "3" => "<div class='lb ty3'>의료보건개선</div>",
            "4" => "<div class='lb ty4'>아동복지개선</div>",
            "5" => "<div class='lb ty5'>교육개발개선</div>",
            "6" => "<div class='lb ty6'>문화체육교류</div>",
            "7" => "<div class='lb ty7'>환경개발개선</div>",
        );

        if($this->agent->is_mobile() && $page > 1) {
			$this->load->view("kor/mobile/include/relief_listview.php", $data);
		} else {
			$this->load->Template("news/relief/list", $data);
		}
    }

    public function reliefview() {
        $page = $this->GET('page', 1);
        $cate = $this->GET("category", "");
        $idx = $this->GET("idx", "0");

        $limit = 9;
        $pageLimit = 10;

        if( $this->IS_MOBILE ) {
            $limit = 5;
            $pageLimit = 5;
        }
        
        if( $idx != 0 ) {
            $this->load->database();
            $this->load->model("Relief_model");


            $this->Relief_model->updateReadCount($idx);

            $r = $this->Relief_model->selectContent($idx);
            $pitem = null;
            $nitem = null;
            
            $idx = $r->am_no;
            $cate = $r->am_cate;
            $range = $this->Relief_model->selectRangeList($cate, $idx);
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
            $upCount = $this->Relief_model->selectContentIndex($cate, $idx);
            $listPage = 1;
            if( $upCount > 0 ) {
                $listPage = ceil($upCount / $limit);
                    
                if( $listPage <= 0 ) {
                    $listPage = 1;
                }
            }
            
            $data["listPage"] = $listPage;

            $data["category"] = $cate;
            $data["listpath"] = "/index.php/news/relief?category=".$cate;
            $data["viewpath"] = "/index.php/news/reliefview?category=".$cate;

            $data["icon"] = array(
                "1" => "<div class='lb ty1'>식수개발개선</div>",
                "2" => "<div class='lb ty2'>자활기술개발</div>",
                "3" => "<div class='lb ty3'>의료보건개선</div>",
                "4" => "<div class='lb ty4'>아동복지개선</div>",
                "5" => "<div class='lb ty5'>교육개발개선</div>",
                "6" => "<div class='lb ty6'>문화체육교류</div>",
                "7" => "<div class='lb ty7'>환경개발개선</div>",
            );

            $this->load->Template("news/relief/view", $data);
        } else {

        }

    }

    function logoDownload() {
        $this->load->helper('url');
        $this->load->helper('file'); 
        $this->load->helper('download');

        $fn = "FIN_ILA-logo.jpg";
        $path = file_get_contents(base_url()."assets/res/".$fn); // get file name
        force_download($fn, $path); // start download`
    }
}

/* End of file news.php */
/* Location: ./application/controllers/news.php */