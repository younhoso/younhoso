<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ImageUpload extends CI_Controller {
    
    public function __construct() {
        parent::__construct();
    }
    
    public function index() {
        $this->load->view('image_upload_test.html');
    }
    
    public function do_upload() {
        $config = array();
        $config['upload_path'] = '/uploads/';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size'] = '1024000';
        $config['max_width'] = '1024';
        $config['max_height'] = '768';
        
        $this->load->library('upload', $config);
        $this->load->helper(array('form', 'url'));
        
        if( $this->upload->do_upload() ) {
            $data = array(
                'upload_data' => $this->upload->data()
            );
        }
    }
    
    
}
    