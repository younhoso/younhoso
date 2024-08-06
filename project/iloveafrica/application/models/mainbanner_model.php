<?php
/**
 * Created by IntelliJ IDEA.
 * User: real-time
 * Date: 2018. 1. 16.
 * Time: PM 3:42
 */

class Mainbanner_model extends CI_Model {
    function __construct(){
        parent::__construct();
    }

    function selectBannerList() {
        $q = "
            SELECT
                campaign_title as 'c_title',
                main_title as 'm_title',
                content,
                banner,
                banner_mo,
                link,
                link_mo,
                link_target
            FROM
                main_banner
            WHERE
                use_state = 'Y'
            ORDER BY orders ASC, idx DESC
        ";

        $r = $this->db->query($q)->result_array();
        return $r;
    }
}
