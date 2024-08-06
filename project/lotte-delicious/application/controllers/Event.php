<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Event extends CI_Controller {

    var $winners;
    var $pages;
    
    public function __construct() {
        parent::__construct();
        
        $this->winners = array();
        $this->winners[1] = 1;
        $this->winners[2] = 1;
        $this->winners[3] = 1;
        $this->winners[4] = 1;
        $this->winners[5] = 1;
				$this->winners[6] = 1;
				$this->winners[7] = 1;
				$this->winners[8] = 1;
				$this->winners[9] = 1;
				$this->winners[10] = 1;
				$this->winners[11] = 1;
				$this->winners[12] = 1;
				$this->winners[13] = 1;
				$this->winners[14] = 0;

        $this->pages = array();
        $this->pages[1] = 1;
        $this->pages[2] = 2;
        $this->pages[3] = 2;
        $this->pages[4] = 1;
				$this->pages[5] = 1;
				$this->pages[6] = 1;
				$this->pages[7] = 1;
				$this->pages[8] = 1;
				$this->pages[9] = 1;
				$this->pages[10] = 1;
				$this->pages[11] = 1;
				$this->pages[12] = 1;
				$this->pages[13] = 1;
				$this->pages[14] = 1;
    }
    
    public function index($round='')
    {
        if( $this->winners[$round] ) {
            $this->winner($round);
            return;
        }
        if( $round ) {
            $this->round = $round;
        } else {
            $this->round = CUR_ROUND;
        }
        $this->index = 1;
        $this->contents = $this->load->view('event/'.$this->round.'/index.html',null,true);
        $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function view($round='',$page=1)
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->index = $page;
	    $this->contents = $this->load->view('event/'.$this->round.'/view'.$page.'.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function winner($round='')
	{
	    if( $round ) {
	        $this->round = $round;
	    } else {
	        $this->round = CUR_ROUND;
	    }
	    $this->contents = $this->load->view('event/'.$this->round.'/winner.html',null,true);
	    $this->load->view('layout/'.$this->round.'/layout.html');
	}
	
	public function apply()
	{
	    $round = $this->input->post('round');
	    $index = $this->input->post('index');
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
	        'round' => $round,
	        'index' => $index,
	        'name' => $name,
	        'department' => $department,
	        'nickname' => $nickname,
	        'hp'   => $hp,
	        'text' => $text
	    );
	    $this->db->insert('tz_event_apply',$data);
	    
	    echo json_encode(array(
	        'result' => 1,
	        'msg' => '응모가 완료되었습니다.'
	    ));
	}
	
	public function apply_with_img()
	{
	    $round = $this->input->post('round');
	    $index = $this->input->post('index');
	    $name = $this->input->post('user_name');
	    $hp = $this->input->post('user_hp');
	    $text = $this->input->post('text');
	    $nickname = $this->input->post('user_nickname');
	    $department = $this->input->post('department');
	    $upload_files = array_filter($_FILES['upload_files']['name']);
	    
	    if( empty($name) ) {
	        echo json_encode(array(
	            'result' => 0,
	            'msg' => '이름을 입력해 주세요.'
	        ), JSON_UNESCAPED_UNICODE);
	        return;
	    }
	    
	    if( empty($nickname) ) {
	        echo json_encode(array(
	            'result' => 0,
	            'msg' => '닉네임을 입력해 주세요.'
	        ), JSON_UNESCAPED_UNICODE);
	        return;
	    }
	    
	    if( empty($department) ) {
	        echo json_encode(array(
	            'result' => 0,
	            'msg' => '부서/지점명을 입력해 주세요.'
	        ), JSON_UNESCAPED_UNICODE);
	        return;
	    }
	    
	    $hp = preg_replace("/[^0-9]/", "", $hp);
	    if( !preg_match("/^01[0-9]{8,9}$/", $hp) ) {
	        echo json_encode(array(
	            'result' => 0,
	            'msg' => '휴대번호를 정확하게 입력해주세요.'
	        ), JSON_UNESCAPED_UNICODE);
	        return;
	    }
	    
	    if( mb_strlen($text, 'utf-8') < 5 ) {
	        echo json_encode(array(
	            'result' => 0,
	            'msg' => '내용을 5자 이상 입력해주세요.'
	        ), JSON_UNESCAPED_UNICODE);
	        return;
	    }
	    
	    if( count($upload_files) == 0 ) {
	        echo json_encode(array(
	            'result' => 0,
	            'msg' => '최소 한장의 사진을 업로드 해주세요.'
	        ), JSON_UNESCAPED_UNICODE);
	        return;
	    }
	    
	    $data = array(
	        'round' => $round,
	        'index' => $index,
	        'name' => $name,
	        'department' => $department,
	        'nickname' => $nickname,
	        'hp'   => $hp,
	        'text' => $text,
	    );
	    $this->db->insert('tz_event_apply',$data);
	    
	    $apply_seq = $this->db->insert_id();
	    
	    $upload_dir = 'uploads/';
	    $saved_files = array();
	    foreach($upload_files as $key=>$file) {
	        $tmp = $_FILES['upload_files']['tmp_name'][$key];
	        $ext = str_replace('image/','',$_FILES['upload_files']['type'][$key]);
	        if( $tmp != '' ) {
	            $new = $upload_dir.time().$key.'.'.$ext;
	            
	            if(move_uploaded_file($tmp, $new)) {
                    $this->db->insert('tz_event_apply_file',array('apply_seq'=>$apply_seq, 'file_path'=>$new));	                
	            }
	        }
	    }
	    
	    echo json_encode(array(
	        'result' => 1,
	        'msg' => '응모가 완료되었습니다.'
	    ), JSON_UNESCAPED_UNICODE);
	}
	
	public function list()
	{
	    $admin = $this->input->get('admin');
	    
	    if( $admin != 'woongq123' ) {
	        echo '<script>alert("잘못된 접근입니다."); location.href = "/";</script>';
	        return;
	    }
	    
	    $from = $this->input->get('from');
	    $to = $this->input->get('to');
	    $round = $this->input->get('round');
	    $index = $this->input->get('index');
	    
	    if( empty($from) ) {
	        $from = date('Y-m-01');
	    }
	    
	    if( empty($to) ) {
	        $to = date('Y-m-t');
	    }
	    
	    $this->db->select();
	    $this->db->from('tz_event_apply');
	    $this->db->where('reg_time >=',$from);
	    $this->db->where('reg_time <=',$to);
	    if( $round ) {
	        $this->db->where('round',$round);
	    }
	    if( $index ) {
	        $this->db->where('index',$index);
	    }
	    $query = $this->db->get();
	    
	    $list = $query->result();
	    
        foreach( $list as $key=>$row ) {
            $this->db->select();
            $this->db->from('tz_event_apply_file');
            $this->db->where('apply_seq',$row->seq);
            $query = $this->db->get();
            
            $row->image_datas = $query->result();
            $list[$key] = $row;
        }
	    
	    $data = array();
	    $data['from'] = $from;
	    $data['to'] = $to;
	    $data['list'] = $list;
	    $data['pages'] = $this->pages;
	    $data['round'] = $round;
	    $data['index'] = $index;
	    
	    $this->contents = $this->load->view('event/list.html',$data,true);
	    $this->load->view('layout_admin.html');
	}
	
	public function get_reply_data()
	{
	    
	    $order = $this->input->post('order');
	    $ignore_seq = $this->input->post('ignore_seq');
	    $round = $this->input->post('round');
	    $index = $this->input->post('index');
	    
	    if( !$round ) $round = $this->round;
	    if( !$index ) $index = 1;
	    
	    $ip = $_SERVER['REMOTE_ADDR'];
	    $useragent = $_SERVER['HTTP_USER_AGENT'];
	    
	    $this->db->select('a.*, l.seq as log_seq');
	    $this->db->from('tz_event_apply a');
	    $this->db->join('tz_event_like_log l','a.seq = l.apply_seq and ip = "'.$ip.'" and useragent = "'.$useragent.'"','left');
        $this->db->where('a.round',$round);
        $this->db->where('a.index',$index);
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
	    
	    foreach( $list as $key=>$row ) {
	        $this->db->select();
	        $this->db->from('tz_event_apply_file');
	        $this->db->where('apply_seq',$row->seq);
	        $query = $this->db->get();
	        
	        $row->date = date('y.m.d', strtotime($row->reg_time));
	        $row->image_datas = $query->result();
	        $list[$key] = $row;
	    }
	    
	    echo json_encode(array(
	        'result' => 1,
	        'list' => $list,
	        'round' => $round,
	        'index' => $index,
	        'order' => $order
	    ));
	    
	}
	
	function like() {
	    $apply_seq = $this->input->get_post('seq');
	    
	    if( empty($apply_seq) ) {
	        echo json_encode(array(
	            'result' => 0,
	            'msg' => '잘못된 요청입니다.'
            ));
	        return;
	    }
	    
	    $ip = $_SERVER['REMOTE_ADDR'];
	    $useragent = $_SERVER['HTTP_USER_AGENT'];
	    
	    $this->db->select();
	    $this->db->from('tz_event_like_log');
	    $this->db->where('apply_seq',$apply_seq);
	    $this->db->where('ip',$ip);
	    $this->db->where('useragent',$useragent);
	    $query = $this->db->get();
	    
	    $log_cnt = $query->num_rows();
	    
	    $this->db->select('like');
	    $this->db->from('tz_event_apply');
	    $this->db->where('seq',$apply_seq);
	    $query = $this->db->get();
	    $before = $query->row()->like;
	    
	    if( $log_cnt == 0 ) { // 추가
	        $this->db->insert('tz_event_like_log',array('apply_seq'=>$apply_seq, 'ip' => $ip, 'useragent' => $useragent));
	        
	        $after = $before+1;
	        
	        $this->db->set('like',$after);
	        $this->db->where('seq',$apply_seq);
	        $this->db->update('tz_event_apply');
	        
	    } else {
	        $this->db->where('apply_seq',$apply_seq);
	        $this->db->delete('tz_event_like_log');
	        
	        $after = $before-1;
	        
	        $this->db->set('like',$after);
	        $this->db->where('seq',$apply_seq);
	        $this->db->update('tz_event_apply');
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
	    $this->db->update('tz_event_apply');
	}
	
	function show() {
	    $seq = $this->input->post('seq');
	    
	    if( empty($seq) ) return;
	    
	    $this->db->set('deleted',0);
	    $this->db->where('seq',$seq);
	    $this->db->update('tz_event_apply');
	}
}
