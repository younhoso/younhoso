<?php
/**
 * Created by IntelliJ IDEA.
 * User: real-time
 * Date: 2018. 1. 16.
 * Time: PM 3:42
 */

class Main_model extends CI_Model {
    function __construct(){
        parent::__construct();
    }

    function selectRecentList($count) {
        $q = "
            SELECT * FROM (
                SELECT
                    am_no as 'idx', 
                    CASE
                    WHEN am_cate = 3 THEN 'report'
                    WHEN am_cate = 4 THEN 'campaign'
                    WHEN am_cate = 2 THEN 'video'
                    END as 'MENU', 
                    am_title as 'title',
                    am_image as 'img',
                    am_content as 'desc',
                    am_regdate as 'regist_date'
                FROM
                    af_move
                WHERE
                    am_cate IN (3, 4, 2)
            ) AS A
            ORDER BY A.regist_date DESC
            LIMIT 0, $count
        ";

        $result = $this->db->query($q)->result_array();
        return $result;
    }


    function selectRecentListOld($count) {
        $q = "
            SELECT * FROM (
                SELECT
                    am_no as 'idx', 
                    CASE
                    WHEN am_cate = 3 THEN 'report'
                    WHEN am_cate = 4 THEN 'campaign'
                    WHEN am_cate = 2 THEN 'video'
                    END as 'MENU', 
                    am_title as 'title',
                    am_image as 'img',
                    am_regdate as 'regist_date'
                FROM
                    af_move
                WHERE
                    am_cate IN (3, 4, 2)
            
                UNION
            
                SELECT
                    aml_no as 'idx',
                    CASE
                    WHEN am_cate = 2 THEN 'media'
                    WHEN am_cate = 1 THEN 'africa'
                    END as 'MENU',
                    aml_title as 'title',
                    aml_image as 'img',
                    aml_regdate as 'regist_date'
                FROM
                    af_move_lcy
                WHERE
                    am_cate IN (2, 1)
            ) AS A
            ORDER BY A.regist_date DESC
            LIMIT 0, $count
        ";

        $result = $this->db->query($q)->result_array();
        return $result;
    }
}