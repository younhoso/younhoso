<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Eng extends MY_Controller {

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

		$p = $this->Popup_model->selectPopup();
		$data["popup"]= $p;
		
		$v = $this->Mainbanner_model->selectBannerList();
		$data["banner"] = $v;

		$r = $this->Main_model->selectRecentList(MAIN_BOARD_COUNT);
		$data["recent"] = $r;

		$this->load->Template("main/index", $data);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */