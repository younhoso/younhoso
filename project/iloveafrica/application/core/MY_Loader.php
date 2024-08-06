<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MY_Loader extends CI_Loader {
    protected $isMobile = false;
    protected $nation = "kor";
    protected $langData = null;
    protected $navigations = array(
        "about" => array(
            "index" => array(
                "parent" => "아이러브아프리카",
                "title" => "ILA는?",
                "uri" => "foundation/about",
                "key" => "foundation/index"
            ),
            "history" => array(
                "parent" => "아이러브아프리카",
                "title" => "연혁",
                "uri" => "foundation/history",
                "key" => "foundation/history"
            ),
            "greetings" => array(
                "parent" => "아이러브아프리카",
                "title" => "인사말",
                "uri" => "foundation/greetings",
                "key" => "foundation/greetings|foundation/follow|foundation/follow_view"
            ),
            "way" => array(
                "parent" => "아이러브아프리카",
                "title" => "찾아오시는길",
                "uri" => "foundation/way",
                "key" => "foundation/way"
            ),
        ),
        "business" => array(
            "water" => array(
                "parent" => "사업소개",
                "title" => "식수개발개선",
                "uri" => "business/water",
                "key" => "business/index|business/water"
            ),
            "selfhelp" => array(
                "parent" => "사업소개",
                "title" => "자활기술개발",
                "uri" => "business/selfhelp",
                "key" => "business/support"
            ),
            "medical" => array(
                "parent" => "사업소개",
                "title" => "의료보건개선",
                "uri" => "business/medical",
                "key" => "business/medical"
            ),
            "child" => array(
                "parent" => "사업소개",
                "title" => "아동복지개선",
                "uri" => "business/child",
                "key" => "business/child"
            ),
            "education" => array(
                "parent" => "사업소개",
                "title" => "교육개발개선",
                "uri" => "business/education",
                "key" => "business/education"
            ),
            "culture" => array(
                "parent" => "사업소개",
                "title" => "문화체육교류",
                "uri" => "business/culture",
                "key" => "business/culture"
            ),
            "environment" => array(
                "parent" => "사업소개",
                "title" => "환경개발개선",
                "uri" => "business/environment",
                "key" => "business/environment"
            ),
        ),
        "news" => array(
            "relief" => array(
                "parent" => "ILA 소식",
                "title" => "구호활동",
                "uri" => "news/relief",
                "key" => "news/relief/list|news/relief/view"
            ),
            "report" => array(
                "parent" => "ILA 소식",
                "title" => "현장소식",
                "uri" => "news/report",
                "key" => "news/report/report|news/report/report_view"
            ),
            "media" => array(
                "parent" => "ILA 소식",
                "title" => "언론보도",
                "uri" => "news/media",
                "key" => "news/media/media|news/media/media_view"
            ),
            "notice" => array(
                "parent" => "ILA 소식",
                "title" => "공지사항",
                "uri" => "news/notice",
                "key" => "news/notice/notice|news/notice/notice_view"
            ),
            "download" => array(
                "parent" => "ILA 소식",
                "title" => "자료실",
                "uri" => "news/download",
                "key" => "news/download"
            ),
        ),
        "support" => array(
            "regular" => array(
                "parent" => "후원하기",
                "title" => "정기후원",
                "uri" => "support/regular",
                "key" => "support/regular"
            ),
            "onece" => array(
                "parent" => "후원하기",
                "title" => "일시후원",
                "uri" => "support/onece",
                "key" => "support/onece"
            ),
            "special" => array(
                "parent" => "후원하기",
                "title" => "기념일기부",
                "uri" => "support/special",
                "key" => "support/special"
            ),
            "legacy" => array(
                "parent" => "후원하기",
                "title" => "유산기부",
                "uri" => "support/legacy",
                "key" => "support/legacy"
            ),
            "group" => array(
                "parent" => "후원하기",
                "title" => "단체기부",
                "uri" => "support/group",
                "key" => "support/group"
            ),
            "enterprise_intro" => array(
                "parent" => "후원하기",
                "title" => "기관&기업후원",
                "uri" => "support/enterprise_intro",
                "key" => "support/enterprise_intro"
            ),
        )
    );

    public function __construct() {
        parent::__construct();
        
    }

    public function SetMobile($m) {
        $this->isMobile = $m;
    }

    public function SetNation($n) {
        $this->nation = $n;
    }

    public function SetTopMenuLang($d) {
        $this->langData = $d;
    }

    public function Template($v, $d = null) {
        $device = "desk";

        if( $this->isMobile ) {
            $device = "mobile";
        }

        $device = $this->nation."/".$device;
        $ld = $this->langData;
        if( $ld == null ) $ld = array();
        
        $d["nation"] = $this->nation;
        $ld["nation"] = $this->nation;

        if( $this->nation != "kor" ) {
            $d["nationlink"] = $this->nation."/";
            $ld["nationlink"] = $this->nation."/";
        } else {
            $d["nationlink"] = "";
            $ld["nationlink"] = "";
        }

        $d["menu"] = '';
        foreach($this->navigations as $key => $menu) {
            foreach($menu as $submenu) {
                if(strpos($submenu["key"], $v) !== false) {
                    $d["menu"] = $key;
                    $d["navs"] = $menu;
                    $d["activemenu"] = $submenu;
                }
            }   
        }

        // echo $v;
        // die;
        
        $this->view($device."/common/v2/_default_header", $d);
        $this->view($device."/common/v2/_default_topmenu", $ld);
        $this->view($device."/".$v, $d);
        $this->view($device."/common/v2/_default_footer", $d);
    }

    function PageInfo($result, $p, $totalCount, $limit, $pageLimit) {
        $totalPage = ceil($totalCount / $limit);

        $startPage = (floor(($p - 1) / $pageLimit) * $pageLimit) + 1;
        $endPage = $startPage + ($pageLimit - 1);
        if( $endPage > $totalPage ) {
            $endPage = $totalPage;
        }

        return array (
            "result" => $result,
            "page" => $p,
            "limit" => $limit,
            "totalCount" => $totalCount,
            "pageLimit" => $pageLimit,
            "totalPage" => $totalPage,
            "startPage" => $startPage,
            "endPage" => $endPage
        );
    }
}

/* Location: ./application/core/My_Loader.php */