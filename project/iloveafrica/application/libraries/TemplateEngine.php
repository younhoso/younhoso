<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 

class TemplateEngine {

    public function Template()
    {
        $this->load->view('welcome_message');
    }
}

/* End of file Template.php */