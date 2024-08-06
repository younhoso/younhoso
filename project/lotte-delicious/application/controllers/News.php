<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class News extends CI_Controller {

    var $news_titles = array(
        '2' => array('사옥이전 1주년','스마트스토어','뉴트로 신제품','스마일 캠페인','시즌빙수 출시','KLPGA 팝업스토어','어린이날 100주년','한우불고기 신제품'),
        '3' => array('떠있는 휴게소','대구 여행 챌린지','ESG경영','캐리비안베이','그린캠페인'),
        '4' => array('디저트 제품 강화','국가고객만족도 12년 연속 1위!','‘반미’출시 인기 폭발','‘MOM’s FESTA 플리마켓’ 운영!','2021 동반성장지수 평가 ‘최우수’ 선정','학교스포츠클럽 야구리그')
    );
    
    
    public function index($round='')
    {
        if( $round ) {
            $this->round = $round;
        } else {
            $this->round = CUR_ROUND;
        }
	    $this->contents = $this->load->view('news/'.$this->round.'/index.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function view($round='',$page=1)
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->story_sub = true;
	    $this->story_sub_title = $this->news_titles[$round][$page-1];
	    $this->contents = $this->load->view('news/'.$this->round.'/view'.$page.'.html',null,true);
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
