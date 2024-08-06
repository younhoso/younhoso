<?php
/**
 * Created by IntelliJ IDEA.
 * User: real-time
 * Date: 2018. 1. 16.
 * Time: PM 3:42
 */

class Media_model extends CI_Model {
    function __construct(){
        parent::__construct();
    }

    function selectListCount($cate) {
        $q = "
            SELECT
                COUNT(*) AS 'CNT'
            FROM
                af_move_lcy
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
                aml_no, aml_title, aml_content, aml_image, aml_regdate, aml_hit, am_cate
            FROM
                af_move_lcy
            WHERE
                am_cate = $cate
            ORDER BY aml_no DESC
            LIMIT $startIndex, $limit
        ";

        $r = $this->db->query($q)->result_array();

        return $r;
    }

    function selectMediaContent($idx) {
        $q = "
            SELECT
                *
                , DATE_FORMAT(aml_regdate, '%Y-%m-%d') AS 'regist_date'
            FROM
                af_move_lcy
            WHERE
                aml_no = $idx
        ";

        $r = $this->db->query($q)->row();

        return $r;
    }

    // 이전, 현재, 다음글 목록을 가져옵니다
    function selectMediaRangeList($cate, $idx) {
        $q = "
            SELECT
                aml_no AS 'IDX', aml_title AS 'TITLE'
            FROM
                af_move_lcy
            WHERE
                am_cate = $cate
                AND aml_no = $idx
                OR aml_no = (SELECT aml_no FROM af_move_lcy WHERE aml_no > $idx AND am_cate = $cate ORDER BY aml_no ASC LIMIT 0, 1)
                OR aml_no = (SELECT aml_no FROM af_move_lcy WHERE aml_no < $idx AND am_cate = $cate ORDER BY aml_no DESC LIMIT 0, 1)
            ORDER BY aml_no DESC
        ";

        $r = $this->db->query($q)->result_array();
        return $r;
    }

    function updateReadCount($idx) {
        $q = "
            UPDATE
                af_move_lcy
            SET
                aml_hit = aml_hit + 1
            WHERE
                aml_no = ?
        ";

        $this->db->query($q, array($idx));
    }

    function selectContentIndex($cate, $idx) {
        $q = "
            SELECT
                COUNT(*) AS 'CNT'
            FROM
                af_move_lcy
            WHERE
                am_cate = $cate
                AND aml_no <= $idx
        ";

        $result = $this->db->query($q)->row();
        return $result->CNT;
    }
}
