<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Video extends CI_Controller {

    public function index($round='',$new='')
    {
        if( $round ) {
            $this->round = $round;
        } else {
            $this->round = CUR_ROUND;
        }

        if( $new ) {
            $this->contents = $this->load->view('video/'.$this->round.'/index'.$new.'.html',null,true);
        } else {
            $this->contents = $this->load->view('video/'.$this->round.'/index.html',null,true);
        }
        
		$this->load->view('layout/'.$this->round.'/layout.html');
	}

    public function apply()
    {
        $video_key = $this->input->post('video_key');
        $name = $this->input->post('user_name');
        $hp = $this->input->post('user_hp');
        $text = $this->input->post('text');
        $nickname = $this->input->post('user_nickname');
        $department = $this->input->post('department');

        if( empty($name) ) {
            echo json_encode(array(
                'result' => 0,
                'msg' => '이름을 입력해 주세요.'
            ));
            return;
        }

        if( empty($nickname) ) {
            echo json_encode(array(
                'result' => 0,
                'msg' => '닉네임을 입력해 주세요.'
            ));
            return;
        }

        if( empty($department) ) {
            echo json_encode(array(
                'result' => 0,
                'msg' => '부서/지점명을 입력해 주세요.'
            ));
            return;
        }

        $hp = preg_replace("/[^0-9]/", "", $hp);
        if( !preg_match("/^01[0-9]{8,9}$/", $hp) ) {
            echo json_encode(array(
                'result' => 0,
                'msg' => '휴대번호를 정확하게 입력해주세요.'
            ));
            return;
        }

        if( mb_strlen($text, 'utf-8') < 5 ) {
            echo json_encode(array(
                'result' => 0,
                'msg' => '내용을 5자 이상 입력해주세요.'
            ));
            return;
        }

        $data = array(
            'video_key' => $video_key,
            'name' => $name,
            'department' => $department,
            'nickname' => $nickname,
            'hp'   => $hp,
            'text' => $text
        );
        $this->db->insert('tz_video_apply',$data);

        echo json_encode(array(
            'result' => 1,
            'msg' => '응모가 완료되었습니다.'
        ));
    }

    public function get_reply_data()
	{
	    $order = $this->input->post('order');
	    $ignore_seq = $this->input->post('ignore_seq');
        $video_key = $this->input->post('video_key');
	    
	    $ip = $_SERVER['REMOTE_ADDR'];
	    $useragent = $_SERVER['HTTP_USER_AGENT'];
	    
	    $this->db->select('a.*, l.seq as log_seq');
	    $this->db->from('tz_video_apply a');
	    $this->db->join('tz_video_like_log l','a.seq = l.apply_seq and ip = "'.$ip.'" and useragent = "'.$useragent.'"','left');
        $this->db->where('a.video_key',$video_key);
        $this->db->where('a.deleted',0);
        if( $ignore_seq ) {
            $this->db->where_not_in('a.seq',$ignore_seq);
        }
	    if( $order == 1 ) {
	        $this->db->order_by('a.like','desc');
	        $this->db->order_by('a.seq','desc');
	    }
	    
	    if( $order == 2 ) {
    	    $this->db->order_by('a.seq','desc');
	    }
	    $this->db->limit(4);
        $query = $this->db->get();
	    $list = $query->result();
	    
	    echo json_encode(array(
	        'result' => 1,
	        'list' => $list,
	        'order' => $order
	    ));
	    
	}
	
	function like() {
	    $apply_seq = $this->input->get_post('seq');
	    
	    if( empty($apply_seq) ) {
	        echo json_encode(array(
	            'result' => 123,
	            'msg' => '잘못된 요청입니다.'
            ));
	        return;
	    }
	    
	    $ip = $_SERVER['REMOTE_ADDR'];
	    $useragent = $_SERVER['HTTP_USER_AGENT'];
	    
	    $this->db->select();
	    $this->db->from('tz_video_like_log');
	    $this->db->where('apply_seq',$apply_seq);
	    $this->db->where('ip',$ip);
	    $this->db->where('useragent',$useragent);
	    $query = $this->db->get();
	    
	    $log_cnt = $query->num_rows();
	    
	    $this->db->select('like');
	    $this->db->from('tz_video_apply');
	    $this->db->where('seq',$apply_seq);
	    $query = $this->db->get();
	    $before = $query->row()->like;
	    
	    if( $log_cnt == 0 ) { // 추가
	        $this->db->insert('tz_video_like_log',array('apply_seq'=>$apply_seq, 'ip' => $ip, 'useragent' => $useragent));
	        
	        $after = $before+1;
	        
	        $this->db->set('like',$after);
	        $this->db->where('seq',$apply_seq);
	        $this->db->update('tz_video_apply');
	        
	    } else {
	        $this->db->where('apply_seq',$apply_seq);
	        $this->db->delete('tz_video_like_log');
	        
	        $after = $before-1;
	        
	        $this->db->set('like',$after);
	        $this->db->where('seq',$apply_seq);
	        $this->db->update('tz_video_apply');
	    }
	    
	    echo json_encode(array(
	        'result' => 1,
	        'after' => $after,
	        'before' => $before
	    ));
	}
	
	function hide() {
	    $seq = $this->input->post('seq');
	    
	    if( empty($seq) ) return;
	    
	    $this->db->set('deleted',1);
	    $this->db->where('seq',$seq);
	    $this->db->update('tz_video_apply');
	}
	
	function show() {
	    $seq = $this->input->post('seq');
	    
	    if( empty($seq) ) return;
	    
	    $this->db->set('deleted',0);
	    $this->db->where('seq',$seq);
	    $this->db->update('tz_video_apply');
	}
}