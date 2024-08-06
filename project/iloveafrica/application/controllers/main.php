<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Main extends MY_Controller {

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
		$this->load->database();
		$this->load->model("Mainbanner_model");
		$this->load->model("Popup_model");
		$this->load->model("Main_model");
        $this->load->model("Relief_model");

		$relList = $this->Relief_model->selectTopList(2);
		$relCount = count($relList);
		if( $relCount < 2 ) {
			$trel = $this->Relief_model->selectRandomList(2 - $relCount);
			$relList = array_merge($relList, $trel);
		}

		$p = array();
		if( $this->agent->is_mobile() ) {
			$p = $this->Popup_model->selectMobilePopup();
		} else {
			$p = $this->Popup_model->selectPopup();		
		}

		$v = $this->Mainbanner_model->selectBannerList();
		$r = $this->Main_model->selectRecentList(MAIN_BOARD_COUNT);

		$data = array(
			"popup"		=> $p,
			"banner"	=> $v,
			"recent"	=> $r,
			"relief"	=> $relList,
		);

		$this->load->Template("main/index", $data);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */