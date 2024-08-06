<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class About extends CI_Controller {

    public function index($round='')
    {
        if( $round ) {
            $this->round = $round;
        } else {
            $this->round = CUR_ROUND;
        }
        $this->contents = $this->load->view('about/'.$this->round.'/index.html',null,true);
		$this->load->view('layout/'.$this->round.'/layout.html');
	}
}
