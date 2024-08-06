<?php
/**
 * Created by IntelliJ IDEA.
 * User: real-time
 * Date: 2018. 1. 16.
 * Time: PM 3:42
 */

class Report_model extends CI_Model {
    function __construct(){
        parent::__construct();
    }

    function selectListCount($cate) {
        $q = "
            SELECT
                COUNT(*) AS 'CNT'
            FROM
                af_move
            WHERE
                am_cate = $cate
        ";

        $result = $this->db->query($q)->row();

        return $result->CNT;
    }

    function selectList($cate, $page, $limit) {
        $startIndex = ($page - 1) * $limit;

        $q = "
            SELECT
                am_no, am_title, am_url, am_image, am_regdate, am_hit, am_content, am_cate
            FROM
                af_move
            WHERE
                am_cate = $cate
            ORDER BY am_no DESC
            LIMIT $startIndex, $limit
        ";

        $r = $this->db->query($q)->result_array();

        return $r;
    }

    function selectReportContent($idx) {
        $q = "
            SELECT
                *
                , DATE_FORMAT(am_regdate, '%Y-%m-%d') AS 'regist_date'
            FROM
                af_move
            WHERE
                am_no = $idx
        ";

        $r = $this->db->query($q)->row();

        return $r;
    }

    // 이전, 현재, 다음글 목록을 가져옵니다
    function selectReportRangeList($cate, $idx) {
        $q = "
            SELECT
                am_no AS 'IDX', am_title AS 'TITLE'
            FROM
                af_move
            WHERE
                am_cate = $cate
                AND am_no = $idx
                OR am_no = (SELECT am_no FROM af_move WHERE am_no > $idx AND am_cate = $cate ORDER BY am_no ASC LIMIT 0, 1)
                OR am_no = (SELECT am_no FROM af_move WHERE am_no < $idx AND am_cate = $cate ORDER BY am_no DESC LIMIT 0, 1)
            ORDER BY am_no DESC
        ";

        $r = $this->db->query($q)->result_array();
        return $r;
    }

    function updateReadCount($idx) {
        $q = "
            UPDATE
                af_move
            SET
                am_hit = am_hit + 1
            WHERE
                am_no = ?
        ";

        $this->db->query($q, array($idx));
    }

    function selectContentIndex($cate, $idx) {
        $q = "
            SELECT
                COUNT(*) AS 'CNT'
            FROM
                af_move
            WHERE
                am_cate = $cate
                AND am_no >= $idx
        ";

        $result = $this->db->query($q)->row();
        return $result->CNT;
    }
}