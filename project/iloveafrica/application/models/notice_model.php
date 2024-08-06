<?php
/**
 * Created by IntelliJ IDEA.
 * User: real-time
 * Date: 2018. 1. 16.
 * Time: PM 3:42
 */

class Notice_model extends CI_Model {
    function __construct(){
        parent::__construct();
    }

    function selectAllCount() {
        $q = "
            SELECT
                COUNT(*) AS 'CNT'
            FROM
                board
            WHERE
                b_class = 1
        ";

        $result = $this->db->query($q)->row();

        return $result->CNT;
    }   

    function selectListCount() {
        $q = "
            SELECT
                COUNT(*) AS 'CNT'
            FROM
                board
            WHERE
                b_class = 1
                AND b_notice != 1
        ";

        $row = $this->db->query($q)->row();

        return $row->CNT;
    }

    // 공지사항 목록을 가져옵니다
    function selectList($page, $limit) {
        $startIndex = ($page - 1) * $limit;

        $q = "
            SELECT
                b_no, b_top, b_step, b_notice, b_name, user_id, b_title, b_cnt, b_content,
                DATE_FORMAT(b_regdate, '%Y-%m-%d') AS 'regist_date'
            FROM
                board
            WHERE
                b_class = 1
            ORDER BY b_notice ASC, b_no DESC
            LIMIT $startIndex, $limit
        ";

        $result = $this->db->query($q)->result_array();
        return $result;
    }

    // 선택한 공지사항의 상세정보
    function selectNoticeContent($idx) {
        $q = "
            SELECT
                *
                ,DATE_FORMAT(b_regdate, '%Y-%m-%d') AS 'regist_date'
            FROM
                board
            WHERE
                b_no = $idx
                AND b_class = 1
        ";

        $r = $this->db->query($q)->row();
        return $r;
    }

    // 이전, 현재, 다음글 목록을 가져옵니다
    function selectNoticeRangeList($idx) {
        $q = "
            SELECT
                b_no, b_title, b_class, b_notice
            FROM
                board
            WHERE
                b_class = 1
                AND b_no = $idx
                OR b_no = (SELECT b_no FROM board WHERE b_no > $idx AND b_class = 1 ORDER BY b_no ASC LIMIT 0, 1)
                OR b_no = (SELECT b_no FROM board WHERE b_no < $idx AND b_class = 1 ORDER BY b_no DESC LIMIT 0, 1)
            ORDER BY b_notice ASC, b_no ASC
        ";

        $r = $this->db->query($q)->result_array();
        return $r;
    }

    function updateReadCount($idx) {
        $q = "
            UPDATE
                board
            SET
                b_cnt = b_cnt + 1
            WHERE
                b_no = ?
        ";

        $this->db->query($q, array($idx));
    }

    function selectContentIndex($idx) {
        $q = "
            SELECT
                COUNT(*) AS 'CNT'
            FROM
                board
            WHERE
                b_class = 1
                AND b_no >= $idx
                AND b_notice != 1
        ";

        $result = $this->db->query($q)->row();
        return $result->CNT;
    }
}