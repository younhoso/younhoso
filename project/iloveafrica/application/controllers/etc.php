<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Etc extends MY_Controller {
    public function index() {
        $this->Redirect("etc/rule");
    }

    public function rule() {
        $this->load->Template($this->NATION."/etc/rule");
    }

    public function privacy() {
        $this->load->Template($this->NATION."/etc/privacy");
    }

    public function sitemap() {
        $this->load->Template($this->NATION."/etc/sitemap");
    }
}
