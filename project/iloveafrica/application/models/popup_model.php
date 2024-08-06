<?php
/**
 * Created by IntelliJ IDEA.
 * User: real-time
 * Date: 2018. 1. 16.
 * Time: PM 3:42
 */

class Popup_model extends CI_Model {
    function __construct(){
        parent::__construct();
    }

    function selectPopup() {
        $q = "
            SELECT 
                p_idx ,p_title ,p_top  ,p_left ,p_width ,p_height ,p_content
            FROM
                popup
            WHERE
                p_use = 'Y'
            ORDER BY p_regdate ASC
        ";

        $r = $this->db->query($q)->result_array();
        return $r;
    }

    function selectMobilePopup() {
        $q = "
            SELECT 
                p_idx ,p_title ,p_top  ,p_left ,p_width ,p_height ,p_content
            FROM
                popup
            WHERE
                p_use = 'Y'
                AND p_mobile = 'Y'
            ORDER BY p_regdate ASC
        ";

        $r = $this->db->query($q)->result_array();
        return $r;
    }
}
