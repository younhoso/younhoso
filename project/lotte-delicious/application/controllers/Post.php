<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Post extends CI_Controller {

    public function index($round='')
    {
        if( $round ) {
            $this->round = $round;
        } else {
            $this->round = CUR_ROUND;
        }
	    $this->contents = $this->load->view('post/'.$this->round.'/index.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function culture($round='')
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->post_sub = true;
	    $this->contents = $this->load->view('post/'.$this->round.'/culture.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function sport($round='')
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->post_sub = true;
	    $this->contents = $this->load->view('post/'.$this->round.'/sport.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function trip($round='')
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->post_sub = true;
	    $this->contents = $this->load->view('post/'.$this->round.'/trip.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function food($round='')
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->post_sub = true;
	    $this->contents = $this->load->view('post/'.$this->round.'/food.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function style($round='')
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->post_sub = true;
	    $this->contents = $this->load->view('post/'.$this->round.'/style.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
}
