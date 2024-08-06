<?
	/*****
	 * 공통 include 파일
	 *
	 * 각 Script 에 include 될 파일이다.
	 * 따라서 모든 페이지에 include 될 부분일 이곳에 적용해준다.
	 *****/

	ini_set('zlib.output_compression', 'On');
	ini_set('zlib.output_compression_level', 5 );

	function callback($buffer)
	{
		global $_DB;
		if(is_object($_DB)){
			### disconnect
			$_DB->disconnect();

			### unset
			unset($_DB);
		}

		if(_ALERT == "1"){
			return _MSG;
		}else{
			//return ob_gzhandler($buffer,5);
			return $buffer;
		}
	  // 모든 apples를 oranges로 치환합니다.
	  //return (str_replace("apples", "oranges", $buffer));
	}

	ob_start("callback"); //출력 버퍼링을 켭니다. 출력 버퍼링을 활성화하면, (헤더를 제외한) 스크립트의 모든 출력을 내부 버퍼에 저장하고, 실제로 전송하지 않습니다.

	# for HTTP/1.1
	header ('Cache-Control: no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0');
	# for HTTP/1.0
	header ('Pragma: no-cache');

	require_once dirname(__file__).'/conf/config.php';		// 기본설정
	require_once dirname(__file__).'/lib/lib.util.php';		// 함수
	require_once dirname(__file__).'/lib/excel.reader.php';		// 엑셀
	require_once dirname(__file__).'/lib/class.user.php';		// 회원
	require_once dirname(__file__).'/lib/class.news.php';		// 뉴스레이터
	require_once dirname(__file__).'/lib/class.board.php';		// 게시판
	require_once dirname(__file__).'/lib/class.webzine.php';		//웹진(레터)
	require_once dirname(__file__).'/lib/class.volunteer.php';		//자원봉사단
	require_once dirname(__file__).'/lib/class.vtclub.php';		//볼론티어클럽
	require_once dirname(__file__).'/lib/class.onsupport.php';		//온라인지지서명
	require_once dirname(__file__).'/lib/class.fixed.php';		// 정기후원
	require_once dirname(__file__).'/lib/class.onespon.php';		// 정기후원
	require_once dirname(__file__).'/lib/class.company.php';		// 기업및단체후원
	require_once dirname(__file__).'/lib/class.campain.php';		// 캠페인후원
	require_once dirname(__file__).'/lib/class.cipher.php';		// 암호화/복호화
	require_once dirname(__file__).'/lib/class.shop.php';		// 쇼핑후원
	require_once dirname(__file__).'/lib/class.payment.php';		// 결제관리
	require_once dirname(__file__).'/lib/class.give_story.php';		// 후원사연관리
	require_once dirname(__file__).'/lib/class.give_photo.php';		// 후원자갤러리관리
	require_once dirname(__file__).'/lib/class.vt_app.php';		// 자원봉사신청관리
	require_once dirname(__file__).'/lib/class.vote.php';		// 추천 class
	require_once dirname(__file__).'/lib/mailer.lib.php';		// 메일 발송
	require_once dirname(__file__).'/lib/class.recruit.php';	//채용공고관리
	require_once dirname(__file__).'/lib/class.info.php';	//사업소개관리
	require_once dirname(__file__).'/lib/class.ainfo.php';	//아프리카대륙정보관리
	require_once dirname(__file__).'/lib/class.afmove.php';	//아이러브아프리카동영상
	require_once dirname(__file__).'/lib/class.afmovel.php';	//이창옥아이러브아프리카동영상
	require_once dirname(__file__).'/lib/class.attendance.php';	//출석도장
	require_once dirname(__file__).'/lib/class.fsupport.php';	//특별후원
	require_once dirname(__file__).'/lib/class.popup.php';		// 팝업
	require_once dirname(__file__).'/lib/class.mainbanner.php';		// 메인배너
	require_once dirname(__file__).'/lib/class.relief.php';		// 구호활동관리
	
	$sessdir = _PDS."sessions";
	ini_set('session.save_path', $sessdir);

	### 정보에 대해 세션을 사용할것이다. 따라서 이곳에서 start 해준다.
	if(!session_id()){
		session_start();
	}
	
	// 1 시간 이상된 세션을 강제로 삭제한다.
	$d = dir(_PDS."sessions");
	while (false !== ($entry = $d->read())) {
		if (substr($entry, 0, 1) != '.' && $entry != 'index.php'){
			$temp = file(_PDS."sessions" . '/' . $entry);
			if( date ("YmdHis", filemtime(_PDS."sessions" . '/' . $entry)) < date("YmdHis",strtotime("-1 hour", strtotime(date ("Y-m-d H:i:s")))) ){
				@unlink(_PDS."sessions" . '/' . $entry);

			}
			//debug($temp);
		}
	}

	// pear 패키지가 기본만 설치되어 있어 더 필요한 부분을 사용할때 이용하기 위한 부분이다.
	ini_set ("include_path",dirname(__file__)."/PEAR/".PATH_SEPARATOR.dirname(__file__)."/lib/".PATH_SEPARATOR.ini_get("include_path"));

	// 0 이면 디버그 메세지 출력 안함, 1일경우 디버깅 메세지 출력
	$_DEBUG = 1;

	require_once "DB.php";

	### DB connect
	$res = $_DB = DB::connect(_DSN);
	if(DB::isError($res)){die($res->getMessage());}

	$res = $_DB->query(" SET NAMES 'utf8' COLLATE 'utf8_general_ci' ");
	if (DB::isError($res)) die($res->getMessage());

	$res = $_DB->query(" SET CHARACTER SET utf8 ");
	if (DB::isError($res)) die($res->getMessage());

	$res = $_DB->query(" set character_set_server = 'utf8' ");
	if (DB::isError($res)) die($res->getMessage());

	$res = $_DB->query(" set character_set_client = 'utf8' ");
	if (DB::isError($res)) die($res->getMessage());

	$res = $_DB->query(" set character_set_results = 'utf8' ");
	if (DB::isError($res)) die($res->getMessage());

	$res = $_DB->query(" set character_set_connection = 'utf8' ");
	if (DB::isError($res)) die($res->getMessage());

	$subPage = $_GET["subpage"];

	// Object 선언
	$obj_User    = new User($_DB);			// 회원 class
	$obj_News    = new News($_DB);			// 뉴스레이터
	$Obj_board   = new Board($_DB);			// 게시판 class
	$Obj_webzine   = new Webzine($_DB);			// 웹진 class
	$Obj_volunteer   = new Volunteer($_DB);			// 자원봉사관리 class
	$Obj_fixed = new Fixed($_DB);		//정기후원 class
	$Obj_onespon = new OneSpon($_DB);		//일시후원 class
	$Obj_company = new Company($_DB);		//기업단체후원 class
	$Obj_campain = new Campain($_DB);		//캠페인후원 class
	$Obj_vtclub = new VtClub($_DB);	//볼론티어클럽 class
	$Obj_shop = new Shop($_DB);	 	//쇼핑후원 class
	$Obj_payment = new Payment($_DB);	 	//결제관련 class
	$Obj_onsupport = new OnSupport($_DB);	//온라인지지서명 class
	$Obj_givestory = new Give_story($_DB);	//후원사연 class
	$Obj_givephoto = new Give_photo($_DB);	//후원갤러리 class
	$Obj_vtapp = new Vt_app($_DB);	//자원봉사신청 class
	$Obj_recruit = new Recruit($_DB);	//채용공고관리 class
	$Obj_votelist = new voteList($_DB);	//추천 class
	$Obj_info = new Info($_DB);	//사업소개 class
	$Obj_ainfo = new Ainfo($_DB);	//아프리카대륙정보 class
	$Obj_afmove = new Afmove($_DB);	//아이러브아프리카동영상관 class
	$Obj_afmovel = new Afmovel($_DB);	//이창옥의아이러브아프리카 class
	$Obj_attendance = new Attendance($_DB);	//출석도장 class
	$Obj_fsupport = new Fsupport($_DB);	//특별후원 class
	$Obj_popup   = new Popup($_DB);			// 팝업관리 class
	$Obj_mainbanner = new MainBanner($_DB);
	$Obj_relief = new ReliefAct($_DB);			// 구호활동관리 class
	
	// 사용자 확인
	$user_info = $obj_User->get_status();

	/// 비회원 아이디 생성
	if($_SESSION['user_id']){
		$_SESSION['guest_id']="";
	}else{
		if(!$_SESSION['guest_id']){
			$_SESSION['guest_id']="G".date("YmdHis");
		}
	}

	$query = "
		select
			*
		from
			basic
	";
	$res = $_basic = $_DB->getRow($query,DB_FETCHMODE_ASSOC);
	if (DB::isError($res)) {
		go_url("","서버 오류입니다.\\n[".$res->getMessage()."]");
		exit;
	}

	# 결제 관련 변수 설정
	$_kcp_site_logo = _BASIC_HOME_URL."/kcp/logo.jpg";	// 로고파일
	$_kcp_currency = "WON";		// 화폐 단위
	$_kcp_module_type = "01";		// 모듈타입(변경금지)
	$_kcp_eng_flag = "N";			// 한영전환 여부
	$_kcp_tax_flag = "";		// 과세구분
	$_kcp_quotaopt = "12";		// 최대할부 개월수(최대 12개월)
	$_kcp_not_used_card = "";		// 사용불가카드


	define("_TITLE",   $_basic['b_title']);   # 타이틀바
	define("_DOCTYPE", $_basic['b_doctype']); # DOCTYPE
	define("_CHARSET", $_basic['b_charset']); # charset
	define("_MASTER_NAME", "아이러브아프리카"); # 메일 발송자
	define("_MASTER_EMAIL", $_basic['b_email']); # 대표이메일

	// 모든 변수 담기
	if (isset ($_GET) && get_magic_quotes_gpc ()) array_walk ($_GET, "StripAllSlashes");
	if (isset ($_POST) && get_magic_quotes_gpc ()) array_walk ($_POST, "StripAllSlashes");
	$argu = array_merge($_GET, $_POST);
	array_walk($argu, "trimvalues");

	//preg_match("/오늘:(.*),어제:(.*),최대:(.*),전체:(.*)/", $_basic['b_visit'], $visit);


	// 서브 메뉴 설정
	list($sub_dir, $sub_1st, $sub_2nd)=explode("_",str_replace("_view","",$argu["s"]));

	$isSubMenu=false;
	$sub_lnb = "include/".$argu["m"]."/".$argu["m"]."_".$sub_dir.".php";

	if(file_exists($sub_lnb)){
		$isSubMenu=true;
	}

	$argu["m"] = ($argu["m"]) ? $argu["m"] : "m01";
	$argu["s"] = ($argu["s"]) ? $argu["s"] : "main";

	$basic_querystring = "m=".$argu["m"]."&s=".$argu["s"];


	require_once dirname(__file__).'/location.php';		// 서브 네이게이션 설정

	if($argu['m']=="m10" && $sub_dir=="s01" && strlen($_SESSION['user_id'])<4){
		go_url("index.php?m=m10&s=s02_02_01","로그인 후에 이용하실 수 있습니다.");
	}

	//현재 페이지 설정
	$_NowPage = _BASIC_HOME_URL.$_SERVER['PHP_SELF']."?".$_SERVER['QUERY_STRING'];
	define("_NowPage",$_NowPage);
?>