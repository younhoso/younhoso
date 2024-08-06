<?php
class Relief_model extends CI_Model {
    function __construct(){
        parent::__construct();
    }

    function selectListCount($cate) {
        $q = "
            SELECT
                COUNT(*) AS 'CNT'
            FROM
                relief_board
        ";

        if( $cate != "" ) {
            $q .= "
            WHERE
                am_cate = $cate
            ";
        }

        $result = $this->db->query($q)->row();
        return $result->CNT;
    }
    
    function selectList($cate, $page, $limit) {
        $startIndex = ($page - 1) * $limit;

        $q = "
            SELECT
                am_no, am_title, am_url, am_image, am_regdate, am_hit, am_content, am_cate
            FROM
                relief_board
        ";

        if( $cate != "" ) {
            $q .= "
            WHERE
                am_cate = $cate
            ";
        }
        
        $q .= "
            ORDER BY am_no DESC
            LIMIT $startIndex, $limit
        ";

        $r = $this->db->query($q)->result_array();

        return $r;
    }

    function selectContent($idx) {
        $q = "
            SELECT
                *
                , DATE_FORMAT(am_regdate, '%Y-%m-%d') AS 'regist_date'
            FROM
                relief_board
            WHERE
                am_no = $idx
        ";

        $r = $this->db->query($q)->row();

        return $r;
    }

    function selectContentIndex($cate, $idx) {
        $q = "
            SELECT
                COUNT(*) AS 'CNT'
            FROM
                relief_board
            WHERE
                am_no <= $idx
        ";

        if( $cate != "" ) {
            $q .= "
                AND am_cate = $cate
            ";
        }

        $result = $this->db->query($q)->row();
        return $result->CNT;
    }

    function updateReadCount($idx) {
        $q = "
            UPDATE relief_board SET
                am_hit = am_hit + 1
            WHERE
                am_no = $idx
        ";

        $this->db->query($q);
    }

    function selectRangeList($cate, $idx) {
        $q = "
            SELECT
                am_no AS 'IDX', am_title AS 'TITLE'
            FROM
                relief_board
            WHERE
                am_cate = $cate
                AND am_no = $idx
                OR am_no = (SELECT am_no FROM relief_board WHERE am_no > $idx AND am_cate = $cate ORDER BY am_no ASC LIMIT 0, 1)
                OR am_no = (SELECT am_no FROM relief_board WHERE am_no < $idx AND am_cate = $cate ORDER BY am_no DESC LIMIT 0, 1)
            ORDER BY am_no DESC
        ";

        $r = $this->db->query($q)->result_array();
        return $r;
    }

    function selectTopList($count = 2) {
        $q = "
            SELECT
                am_no, am_title, am_regdate, am_content, am_image
            FROM
                relief_board
            WHERE
                am_regdate >= (NOW() - INTERVAL 2 DAY)
            ORDER BY am_no DESC
            LIMIT 0, $count
        ";

        $r = $this->db->query($q)->result_array();
        return $r;
    }

    function selectRandomList($count = 2) {
        $q = "
            SELECT
                am_no, am_title, am_regdate, am_content, am_image
            FROM
                relief_board
            ORDER BY RAND()  DESC
            LIMIT 0, $count
        ";

        $r = $this->db->query($q)->result_array();
        return $r;
    }
}