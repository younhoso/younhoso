<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Foundation extends MY_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		echo "<script>location.href = '/index.php/foundation/about';</script>";
	}

	public function about() {
		$this->load->Template("foundation/index");
	}

	public function history() {
		$curYear = $this->GET("year", "");
		$data = array("curYear" => $curYear);
		$this->load->Template("foundation/history", $data);
	}

	public function vision() {
		$this->load->Template("foundation/vision");
	}

	public function greetings() {
		$this->load->Template("foundation/greetings");
	}

	public function follow() {
		$page = $this->GET("page", 1);
        $limit = 15;
        $pageLimit = 15;

        $this->load->database();
        $this->load->model("Follow_model");

        $totalCount = $this->Follow_model->selectAllCount();
        $result = $this->Follow_model->selectList($page, $limit);
		$data = $this->load->PageInfo($result, $page, $totalCount, $limit, $pageLimit);
		
		$no = $totalCount - (($page - 1) * $limit);
		$data["start_no"] = $no;

		if($this->agent->is_mobile() && $page > 1) {
			$this->load->view("kor/mobile/include/follow_listview.php", $data);
		} else {
			$this->load->Template("foundation/follow", $data);
		}
	}

	public function followview() {
		$idx = $this->GET("idx", 0);
		$page = $this->GET("page", 1);
		$limit = 10;

        $data = array(
            "page" => $page,
            "idx" => $idx
        );

        if( $idx == 0 ) {
            $this->load->helper("url");
            $this->Redirect("foundation/follow");
        } else {
            $this->load->database();
            $this->load->model("Follow_model");

            $v = $this->Follow_model->selectFollowContent($idx);
			$this->Follow_model->updateReadCount($idx);
			

            // 이전, 다음글 가져오기..
            $range = $this->Follow_model->selectFollowRangeList($idx);

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
			$upCount = $this->Follow_model->selectContentIndex($idx);
			// echo "count : ".$upCount;
			$listPage = ceil($upCount / $limit);
			$data["listPage"] = $listPage;
			
            $this->load->Template("foundation/follow_view", $data);
        }   
	}

	public function way() {
		$this->load->Template("foundation/way");
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */