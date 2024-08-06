<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Changer extends MY_Controller { 
    public function view($mode) {
        $this->load->library("session");
        if( $mode == "PC" )  {
            $this->session->set_userdata("mode", "PC");
        } else {
            $this->session->set_userdata("mode", "MOBILE");
        }
    }
}