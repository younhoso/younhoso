<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class MY_Controller extends CI_Controller {
    protected $IS_MOBILE = false;
    protected $NATION = "kor";
    protected $NATION_LINK = "/index.php/";

    function __construct() {
        parent::__construct();      

        $uri = $_SERVER['REQUEST_URI'];
        $uriInfos = explode("/", $uri);


        if( count($uriInfos) >= 3) {
            if( $uriInfos[2] == "eng" ) {
                $this->NATION = "eng";
                $this->NATION_LINK .= "eng/";
            }
        } else if( count($uriInfos) >= 2) {
            if( $uriInfos[1] == "eng" ) {
                $this->NATION = "eng";
                $this->NATION_LINK .= "eng/";
            }
        }

        if( $this->NATION == "eng" ) {
            //echo "영문페이지입니다..삭제가 필요할 경우 application/core/MY_Loader.php 파일 25번째줄을 참조하세요";
        } else {
        }

        //$langData = $this->loadLanguage();
        //$this->load->SetTopMenuLang($langData);
        
        $this->load->library("session");
        $this->load->library('user_agent');


        $this->IS_MOBILE = $this->agent->is_mobile();
        if( $this->IS_MOBILE ) {
            $mode = $this->session->userdata("mode");
            if( $mode && $mode == "PC" ) {
                $this->IS_MOBILE = false;
            }
        }
        $this->load->SetMobile($this->IS_MOBILE);
        $this->load->SetNation($this->NATION);

    }

    function loadLanguage() {
        if( $this->NATION == "eng" ) {
            //echo "영문페이지입니다..삭제가 필요할 경우 application/core/MY_Loader.php 파일 25번째줄을 참조하세요";
            $this->lang->load("topmenu","english");
        } else {
            $this->lang->load("topmenu","korean");
        }

        $langData = array(
            "LANG_SUPPORT_JOIN" => $this->lang->line("SUPPORT_JOIN"),
            "LANG_SUPPORT_MY" => $this->lang->line("SUPPORT_MY"),
            "LANG_MENU_ILA_HEAD1" => $this->lang->line("MENU_ILA_HEAD1"),
            "LANG_MENU_ILA_HEAD2" => $this->lang->line("MENU_ILA_HEAD2"),
            "LANG_MENU_ILA_WHAT" => $this->lang->line("MENU_ILA_WHAT"),
            "LANG_MENU_ILA_HISTORY" => $this->lang->line("MENU_ILA_HISTORY"),
            "LANG_MENU_ILA_VISION" => $this->lang->line("MENU_ILA_VISION"),
            "LANG_MENU_ILA_GREETING" => $this->lang->line("MENU_ILA_GREETING"),
            "LANG_MENU_ILA_WAY" => $this->lang->line("MENU_ILA_WAY"),

            "LANG_MENU_BIZ_HEAD" => $this->lang->line("MENU_BIZ_HEAD"),
            "LANG_MENU_BIZ_WATER" => $this->lang->line("MENU_BIZ_WATER"),
            "LANG_MENU_BIZ_SELF" => $this->lang->line("MENU_BIZ_SELF"),
            "LANG_MENU_BIZ_MEDICAL" => $this->lang->line("MENU_BIZ_MEDICAL"),
            "LANG_MENU_BIZ_CHILD" => $this->lang->line("MENU_BIZ_CHILD"),
            "LANG_MENU_BIZ_EDU" => $this->lang->line("MENU_BIZ_EDU"),
            "LANG_MENU_BIZ_CULTURE" => $this->lang->line("MENU_BIZ_CULTURE"),
            "LANG_MENU_BIZ_ENV" => $this->lang->line("MENU_BIZ_ENV"),
        );

        return $langData;
    }

    function SetErrLog() {
        error_reporting(E_ALL);
        ini_set("display_errors", 1);
    }

    function GET($n, $v) {
        $gv = $this->input->get($n);
        if( !$gv ) {
            $gv = $v;
        }

        return $gv;
    }

    function Redirect($u) {
        // 주소에서 index.php가 제거되고 온다는 가정하에 코딩..

        $np = "/";
        if( $this->NATION != "kor" ) {
            $np = "/".$this->NATION."/";
        }

        $url = "/index.php".$np.$u;

        echo "<script>location.href = '$url';</script>";
    }
}