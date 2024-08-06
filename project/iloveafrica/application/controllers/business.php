<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Business extends MY_Controller {
    public function index() {
      $this->load->Template("business/index");
    }

    // 식수개발개선
    public function water() {
      $this->load->Template("business/water");
    }

    // 자활기술개발
    public function selfhelp() {
      $this->load->Template("business/support");
    }

    // 의료보건개선
    public function medical() { 
      $this->load->Template("business/medical");
    } 
    
    // 아동복지개선
    public function child() {
      $this->load->Template("business/child");
    }

    // 교육개발개선
    public function education() {
      $this->load->Template("business/education");
    }

    // 문화체육개선
    public function culture() {
      $this->load->Template("business/culture");
    }

    // 환경개발개선
    public function environment() {
      $this->load->Template("business/environment");
    }
}



/* End of file vision.php */
/* Location: ./application/controllers/vision.php */