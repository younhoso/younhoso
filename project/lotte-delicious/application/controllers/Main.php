<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends CI_Controller {

	public function index($round='')
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->main = true;
	    $this->contents = $this->load->view('main/'.$this->round.'/index.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
}
