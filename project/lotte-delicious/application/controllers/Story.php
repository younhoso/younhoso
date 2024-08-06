<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Story extends CI_Controller {

    public function index($round='')
    {
        if( $round ) {
            $this->round = $round;
        } else {
            $this->round = CUR_ROUND;
        }
	    $this->contents = $this->load->view('story/'.$this->round.'/index.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function store($round='')
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->story_sub = true;
	    $this->story_sub_title = '01 Store';
	    $this->contents = $this->load->view('story/'.$this->round.'/store.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function nature($round='')
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->story_sub = true;
	    $this->story_sub_title = '01 Nature';
	    $this->contents = $this->load->view('story/'.$this->round.'/nature.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function trip($round='')
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->story_sub = true;
	    $this->story_sub_title = '01 Trip';
	    switch( $this->round ) {
	        case 3 : case 4 : 
                $this->story_sub_title = '02 Trip';
	            break;
	        default :
	            $this->story_sub_title = '01 Trip';
	            break;
	    }
	    $this->contents = $this->load->view('story/'.$this->round.'/trip.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function food($round='')
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->story_sub = true;
	    switch( $this->round ) {
	        case 3 : case 4 :
	            $this->story_sub_title = '03 Food';
	            break;
	        default :
	            $this->story_sub_title = '02 Food';
	            break;
	    }
	    $this->contents = $this->load->view('story/'.$this->round.'/food.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function style($round='')
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->story_sub = true;
	    switch( $this->round ) {
	        case 3 : case 4 :
	            $this->story_sub_title = '04 Style';
	            break;
	        default :
	            $this->story_sub_title = '03 Style';
	            break;
	    }
	    $this->contents = $this->load->view('story/'.$this->round.'/style.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function enjoy($round='')
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->story_sub = true;
	    switch( $this->round ) {
	        case 3 : case 4 :
	            $this->story_sub_title = '05 Enjoy';
	            break;
	        default :
	            $this->story_sub_title = '04 Enjoy';
	            break;
	    }
	    $this->contents = $this->load->view('story/'.$this->round.'/enjoy.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function culture($round='')
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->story_sub = true;
	    switch( $this->round ) {
	        case 3 : case 4 :
	            $this->story_sub_title = '06 Culture';
	            break;
	        default :
	            $this->story_sub_title = '05 Culture';
	            break;
	    }
	    $this->contents = $this->load->view('story/'.$this->round.'/culture.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function jaress($round='')
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    
	    $this->story_sub = true;
	    $this->story_sub_title = '06 자레쓰';
	    $this->contents = $this->load->view('story/'.$this->round.'/jaress.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function jaress_like()
	{
	    $jaressid = $this->input->get_post('jaressid'); // 회차 + '_' + 번호
	    $pluscnt = $this->input->get_post('plus') ? 1 : -1;
        
	    $this->db->select();
	    $this->db->from('tz_jaress_like');
	    $this->db->where('jaressid',$jaressid);
	    $query = $this->db->get();
	    
	    if( $query->num_rows() == 0 ) {
	        $this->db->insert('tz_jaress_like',array('jaressid'=>$jaressid));
	    }
	    
	    $this->db->select();
	    $this->db->from('tz_jaress_like');
	    $this->db->where('jaressid',$jaressid);
	    $query = $this->db->get();
	    $cnt = $query->row()->cnt;
	    
        $this->db->set('cnt',$cnt+$pluscnt);
        $this->db->where('jaressid',$jaressid);
        $this->db->update('tz_jaress_like');
        
        echo $cnt+$pluscnt;
	}
	
	public function test($round='')
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->story_sub = true;
	    $this->story_sub_title = '01 Trip';
	    $this->contents = $this->load->view('story/'.$this->round.'/test.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	    //echo '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/710237148?h=aedc57da1f&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="롯데GRS TRIP_choijong (1)"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>';
	}
}
