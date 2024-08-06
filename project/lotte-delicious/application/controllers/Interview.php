<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Interview extends CI_Controller {

    public function index($round='')
    {
        if( $round ) {
            $this->round = $round;
        } else {
            $this->round = CUR_ROUND;
        }
	    $this->contents = $this->load->view('interview/'.$this->round.'/index.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function test($round='') {
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->contents = $this->load->view('interview/'.$this->round.'/test.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
}
