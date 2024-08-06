<?
	/*****
	 * 설정에 관련된 값들을 정의 한다.
	 *****/

	 /*
	error_reporting(E_ALL);
	ini_set("display_errors", 1);
	*/

	### FTP
	$_FTP_USER = 'iloveafrica';
	
	$_DB_USER = 'iloveafrica';
	$_DB_PASS = '@han92109210';
	$_DB_HOST = 'localhost';
	$_DB_NAME = 'iloveafrica';
	$_DB_PORT = "3306";
	$_DSN     = "mysqli://$_DB_USER:$_DB_PASS@$_DB_HOST:$_DB_PORT/$_DB_NAME";
	
    define("_DSN", $_DSN);
	
	$_tmp = posix_getpwuid ( fileowner ( __file__ ) );
	if($_tmp['name'] != $_FTP_USER){echo "계정을 확인하세요.";exit;}

	//// 현재 시간 설정
	define("_NowTime",date("Y-m-d H:i:s"));

	/**
	* 테이블 목록
	*/

	# 사이트 기본정보
	DEFINE("TABLE_BASIC",        "{$_DB_NAME}.basic"); // 기본정보

	# 회원테이블
	DEFINE("TABLE_USER",           "{$_DB_NAME}.user"); // 회원정보
	DEFINE("TABLE_NEWS",           "{$_DB_NAME}.news"); // 회원정보
	
	# 게시판 테이블
	DEFINE("TABLE_BOARD_CONFIG", "{$_DB_NAME}.board_config"); // 게시판 설정
	DEFINE("TABLE_BOARD",        "{$_DB_NAME}.board"); // 게시판
	DEFINE("TABLE_BOARD_FILE",   "{$_DB_NAME}.board_file"); // 게시판 첨부파일
	DEFINE("TABLE_BOARD_VOTE",   "{$_DB_NAME}.board_vote"); // 게시글 추천

	#웹진테이블
	DEFINE("TABLE_WEBZINE",   "{$_DB_NAME}.webzine"); // 웹진 발송
	DEFINE("TABLE_WEBZINE_SKIN",   "{$_DB_NAME}.webzine_skin"); // 웹진스킨관리
	DEFINE("TABLE_WEBZINE_MAILLIST",   "{$_DB_NAME}.webzine_maillist"); // 웹진메일링리스트관리

	#자원봉사단관리
	DEFINE("TABLE_VOLUNTEER",   "{$_DB_NAME}.volunteer"); // 자원봉사/관심등록 신청관리
	DEFINE("TABLE_VOLUNTEER_LIST",   "{$_DB_NAME}.volunteer_list"); // 자원봉사자명단 관리
	DEFINE("TABLE_VT_CLUB_CONFIG",   "{$_DB_NAME}.vt_club_config"); // 볼론티어클럽 설정관리
	DEFINE("TABLE_VT_CLUB",   "{$_DB_NAME}.vt_club"); // 볼론티어클럽 내역관리
	DEFINE("TABLE_VT_APP",   "{$_DB_NAME}.vt_app"); // 자원봉사신청 내역관리
	DEFINE("TABLE_VT_EX",   "{$_DB_NAME}.vt_ex"); // 자원봉사 신청 상세 내역관리

	#정기후원관리
	DEFINE("TABLE_FIXED_CONFIG",   "{$_DB_NAME}.fixed_config"); // 정기후원설정
	DEFINE("TABLE_FIXED_LIST",   "{$_DB_NAME}.fixed_list"); // 정기후원내역

	#정기후원관리
	DEFINE("TABLE_ONE_LIST",   "{$_DB_NAME}.one_list"); // 일시후원내역

	#기업및단체후원관리
	DEFINE("TABLE_COMPANY_QUESTION",   "{$_DB_NAME}.company_question"); // 문의내역
	DEFINE("TABLE_COMPANY_LIST",   "{$_DB_NAME}.company_list"); // 승인내역

	#캠페인관리
	DEFINE("TABLE_CAMPAIN_CONFIG",   "{$_DB_NAME}.campain_config"); // 캠페인설정
	DEFINE("TABLE_CAMPAIN_LIST",   "{$_DB_NAME}.campain_list"); // 캠페인내역
	DEFINE("TABLE_ONLINE_SUPPORT",   "{$_DB_NAME}.online_support"); // 온라인지지서명

	# 쇼핑 후원 관련 테이블
	DEFINE("TABLE_SHOP_CATEGORY",   "{$_DB_NAME}.shop_category");		 // 카테고리 설정
	DEFINE("TABLE_SHOP_CATEGORY_M", "{$_DB_NAME}.shop_category_m"); //중분류설정
	DEFINE("TABLE_SHOP_ITEM",   "{$_DB_NAME}.shop_item");			// 상품 설정
	DEFINE("TABLE_SHOP_ORDER",   "{$_DB_NAME}.shop_order_list");	 // 주문내역
	DEFINE("TABLE_SHOP_CART",   "{$_DB_NAME}.shop_cart");		// 장바구니
	
	# 결제 관련 테이블
	DEFINE("TABLE_PAYMENT_FIX",   "{$_DB_NAME}.payment_fix");		 // 정기후원 신청 정보
	DEFINE("TABLE_PAYMENT_INFO",   "{$_DB_NAME}.payment_info");			// 결제 정보

	#후원자 게시판
	DEFINE("TABLE_GIVE_STORY",   "{$_DB_NAME}.give_story");		 // 후원사연
	DEFINE("TABLE_GIVE_PHOTO",   "{$_DB_NAME}.give_photo");			// 후원자 갤러리
	DEFINE("TABLE_GIVE_PHOTO_COMMENT",   "{$_DB_NAME}.give_photo_comment");			// 후원자 갤러리 코멘트

	# 채용공고 테이블
	DEFINE("TABLE_RECRUIT", "{$_DB_NAME}.recruit"); // 채용공고
	DEFINE("TABLE_RECRUIT_INFO",  "{$_DB_NAME}.recruit_info"); // 상세공고
	DEFINE("TABLE_RECRUIT_LIST", "{$_DB_NAME}.recruit_list"); // 접수현황

	# 추천내역 테이블
	DEFINE("TABLE_VOTE_LIST",   "{$_DB_NAME}.votelist");	// 추천내역


	# 사업소개 관련 테이블
	DEFINE("TABLE_INFO_CATEGORY",   "{$_DB_NAME}.info_category");		 // 카테고리 설정
	DEFINE("TABLE_INFO_CATEGORY_M", "{$_DB_NAME}.info_category_m"); //중분류설정
	DEFINE("TABLE_INFO_ITEM",   "{$_DB_NAME}.info_item");			// 내용 설정

	# 아프리카대륙정보
	DEFINE("TABLE_AFRICA_INFO",	"{$_DB_NAME}.africa_info");		//아프리카대륙정보 설정

	# 땡큐TV
	DEFINE("TABLE_AF_MOVE",	"{$_DB_NAME}.af_move");		//아이러브아프리카동영상 설정
	DEFINE("TABLE_AFL_MOVE",	"{$_DB_NAME}.af_move_lcy");		//이창옥의아이러브아프리카 설정
	DEFINE("TABLE_ATTENDANCE",	"{$_DB_NAME}.attendance");		//출석도장 설정
	DEFINE("TABLE_RELIEF", "{$_DB_NAME}.relief_board");			// 구호활동관리

	#특별후원
	DEFINE("TABLE_FANCLUB_SUPPORT",	"{$_DB_NAME}.fanclub_support");		//특별후원 설정

	# 팝업관리 테이블
	DEFINE("TABLE_POPUP",   "{$_DB_NAME}.popup");


	$_REGEXP = "/^[a-z]{1}[a-z0-9]{3,19}$/";
	DEFINE("_REGEXP",   $_REGEXP); // 아이디 정규식 (소문자로 시작하는 4~20 자리의 아이디)
	
	/// 보안 키 설정
	$SECURE_KEY = "5NdkaQ4bAx5P8T74SLOvE7z55a5sSOLYBO97934yeYfsRuXSP8";
	
define("SECURE_KEY", $SECURE_KEY);

	if (phpversion () < "5"){ // define PHP5 functions if server uses PHP4
		function array_combine($arr1, $arr2) {
			$out = array();

			$arr1 = array_values($arr1);
			$arr2 = array_values($arr2);

			foreach($arr1 as $key1 => $value1) {
				$out[(string)$value1] = $arr2[$key1];
			}

			return $out;
		}
	}

	$_CODE = array(
		"1" => array( // 회원 등급
			"1" => "관리자",
			"5" => "직원",
			"7" => "일반회원",
			"9" => "탈퇴회원",
			"10" => "비회원"
		),
		"2" => array(
			"Y" => "예",
			"N" => "아니요"
		),
		"3" => array(
			"0" => "출력안함",
			"1" => "셀렉트박스",
			"2" => "이미지",
			"3" => "텍스트"
		),
		"4" => array(		// 회원구분
			"1" => "내국인/재한외국인",
			"2" => "어린이(14세미만)",
			"3" => "기업",
			"4" => "단체"
		),
		"5" => array(		// 후원희망부문
			"1" => "아동후원",
			"2" => "특별분야사업후원",
			"3" => "함께걸어요♥사업후원",
			"4" => "특별♥후원",
			"5" => "사회공헌기업협력후원"
		),
		"6" => array(		// 직원/회원수
			"1" => "50명이하",
			"2" => "100명이하",
			"3" => "300명이하",
			"4" => "500명이상"
		),
		"7" => array(		// 직업
			"00" => "서비스업",
			"01" => "공무원",
			"02" => "사무직",
			"03" => "건설업",
			"04" => "컴퓨터/인터넷",
			"05" => "법률",
			"06" => "세무/회계",
			"07" => "금융/증권/보험업",
			"08" => "의료",
			"09" => "교육",
			"10" => "종료",
			"11" => "언론",
			"12" => "복지",
			"13" => "군인",
			"14" => "예술",
			"15" => "제조업",
			"16" => "유통업",
			"17" => "운송업",
			"18" => "농/수/임/광산업",
			"19" => "부동산업",
			"20" => "자영업",
			"21" => "학생",
			"22" => "가사",
			"23" => "아동",
			"24" => "노인",
			"25" => "무직",
			"99" => "기타"
		),
		"8" => array( //아프리카대륙정보
			"1" => "동부아프리카",
			"2" => "서부아프리카",
			"3" => "남부아프리카",
			"4" => "중앙아프리카",
			"5" => "북부아프리카"
		),
		"9" => array(	//아이러브아프리카동영상관
			"3" => "아프리카사업현지영상",
			"4" => "사업별캠페인영상",
			"2" => "두루두루모두모아영상",
			"5" => "TV컨텐츠동영상",
			"6" => "봉사단동영상",
			"1" => "TV뉴스동영상",
		),
		"10" => array(	//아이러브아프리카동영상관
			"2" => "ILA보도자료",
			"1" => "이창옥의 아이러브아프리카",
		),
		"11" => array( //[2019.02/신규] 기업활동 - 아이러브아프리카 동영상관 테이블과 같이 사용..
			"8" => "기업활동관리"
		),
		"12" => array (
			// 구호활동관리 
			"0" => "전체보기",
			"1" => "식수개발개선",
			"2" => "자활기술개발",
			"3" => "의료보건개선",
			"4" => "아동복지개선",
			"5" => "교육개발개선",
			"6" => "문화체육교류",
			"7" => "환경개발개선",
 		)
	);

	// 게시판 분류 코드 설정
	$_BOARD_CODE = array(
		"17" => "사업소개",
		"1" => "한마음편지나눔",
		"2" => "후원자게시판",
		"3" => "후원자이벤트",
		"4" => "탄자니아-아프리카사업장방문",
		"16" => "케냐-아프리카사업장방문",
		"5" => "아이러브아프리카뉴스",
		"10" => "특별봉사위원회-특별대사",
		"11" => "특별봉사위원회-친선대사",
		"12" => "특별봉사위원회-홍보대사",
		"6" => "아이러브아프리카-인재채용",
		"7" => "후원하기",
		"8" => "자료나눔실",
		"9" => "마이페이지",
		"13" => "땡큐Radio",
		"14" => "국내-봉사단카페",
		"15" => "아프리카-봉사단카페",
	);

	//게시판 정렬코드
	$_BOARD_ALIGN_CODE = array(
		"1" => "가운데",
		"2" => "왼쪽",
		"3" => "오른쪽"
	);

	// 봉사종류 코드 설정
	$_VOLUNTEER_CODE = array(
		"1" => "해외자원봉사",
		"2" => "온라인자원봉사",
		"3" => "재능기부봉사",
		"4" => "행사자원봉사",
	);

	//######### 정기후원 항목 코드 설정 start ##########//
	$_FL_CODE = array(
		//결제방법
		"1" => array(
			"1" => "신용카드",
			"2" => "실시간계좌이체",
			"3" => "휴대전화"
		),
		
		//카드사/은행/입금은행
		"2" => array(
			"1" => array(
				"1" => "국민카드",
				"2" => "BC카드",
				"3" => "VISA카드",
				"4" => "신한카드"
			),
			"2" => array(
				"1" => "국민은행",
				"2" => "신한은행",
				"3" => "기업은행",
				"4" => "우리은행",
				"5" => "농협",
				"6" => "새마을금고"
			),
			"3" => array(
				"1" => "SKT",
				"2" => "KTF",
				"3" => "LGT"
			)
		),

		//가입동기
		"3" => array(
			"1" => "인터넷",
			"2" => "TV",
			"3" => "우편물",
			"4" => "라디오",
			"5" => "주변 권유",
			"6" => "자원봉사자 권유",
			"7" => "기타"
		),

		//이메일
		"4" => array(
			"1" => "naver.com",
			"2" => "nate.com",
			"3" => "hanmail.net",
			"4" => "gmail.com",
			"5" => "paran.com",
			"6" => "freechal.com",
			"7" => "hotmail.com",
			"8" => "lycos.com",
			"9" => "netsgo.com",
			"10" => "empas.com",
			"11" => "empal.com",
			"12" => "yahoo.co.kr",
			"13" => "dreamwiz.co.kr",
			"15" => "직접입력"
		),

		//연락처
		"5" => array(
			"1" => array(
				"1" => "010",
				"2" => "011",
				"3" => "016",
				"4" => "017",
				"5" => "018",
				"6" => "019"
			),
			"2" => array(
				"1" => "010",
				"2" => "011",
				"3" => "016",
				"4" => "017",
				"5" => "018",
				"6" => "019",
				"7" => "070",
				"8" => "02",
				"9" => "031",
				"10" => "032",
				"11" => "033",
				"12" => "041",
				"13" => "042",
				"14" => "043",
				"15" => "051",
				"16" => "052",
				"17" => "053",
				"18" => "054",
				"19" => "055",
				"20" => "061",
				"21" => "062",
				"22" => "063",
				"23" => "064"
			)
		),

		//이체일
		"6" => array(
			"05" => "5",
			"15" => "15",
			"25" => "25"
		),

		//기부자주소지 구분
		"7" => array(
			"1" => "자택",
			"2" => "직장",
		),

		//후원방법
		"8" => array(
			"1" => "정기후원",
			"2" => "일시후원"
		)
		
	);

	//######### 정기후원 항목 코드 설정 end ##########//

	### 일시 후원 항목 코드
	$_CODE_ONE_GIVE=array(
		1 => array(	// 후원 항목
			1=>"즉시후원",
			2=>"생일/돌후원",
			3=>"기념후원",
			4=>"결혼후원",
			5=>"팬클럽후원"
		),
		2 => array(	// 결제방법
			1=>"신용카드",
			2=>"실시간 계좌이체",
			3=>"휴대폰 결제",
			4=>"무통장 입금"
		),
		3 => array(	// 기념후원 코드
			1=>"출생",
			2=>"백일",
			3=>"승진",
			4=>"수상",
			5=>"회갑",
			6=>"좋은일",
			7=>"기타"
		),
		4 => array(	// 가입동기 코드
			1=>"검색엔진/포털",
			2=>"TV/라디오",
			3=>"우편물",
			4=>"SNS",
			5=>"주변 권유",
			6=>"자원봉사자 권유",
			7=>"기타"
		),
		5 => array(	// 일시후원항목 코드
			1=>"항목1",
			2=>"항목2",
			3=>"항목3"
		),
		6 => array(	// 긴급구호항목 코드
			1=>"긴급항목1",
			2=>"긴급항목2",
			3=>"긴급항목3"
		),
		7 => array(	// 기념 후원종류 코드
			1=>"출생",
			2=>"백일",
			3=>"승진",
			4=>"수상",
			5=>"회갑",
			6=>"좋은일",
			7=>"기타"
		)
	);

	### 기업/단체 후원 신청 항목 코드
	$_CODE_COM_GIVE = array(
		1 => "기업사회공헌",
		2 => "후원금기부",
		3 => "공동캠페인",
		4 => "물품후원",
		5 => "기타"
	);
	
	### 기업/단체 후원 승인 항목 코드
	$_CODE_COM_GIVE_TYPE = array(
		1 => "일반후원",
		2 => "볼룬티어클럽"
	);

	### 후원코드
	$_SPONSOR_CODE = array(
		"BU" => "사업후원",
		"NO" => "즉시후원",
		"HO" => "특별한후원",
		"SH" => "쇼핑후원",
		"CF" => "캠페인후원(정기)",
		"CN" => "캠페인후원(일시)"
	);

	### 결제코드
	$_PAYMENT_CODE = array(
		"status" => array(
			"1" => "결제완료",
			"2" => "결제실패",
			"3" => "승인대기",
			"4" => "결제취소"
		),
		"fmethod" => array(
			"CMS" => "CMS 자동이체",
			"MOB" => "휴대폰 결제"
		),
		"nmethod" => array(
			"100000000000" => "신용카드",
			"010000000000" => "실시간 계좌이체",
			"000010000000" => "휴대폰 결제"
		),
		"hmethod" => array(
			"100000000000" => "신용카드",
			"000010000000" => "휴대폰 결제",
			"bank" => "무통장 입금"
		)
	);

	$_DEPOSIT_CODE = array(
		"1" => array(
			"bank" => "국민은행",
			"no" => "816901-04-172086",
			"owner" => "아이러브아프리카"
		),
		"2" => array(
			"bank" => "외환은행",
			"no" => "630-007527-201",
			"owner" => "아이러브아프리카"
		),
		"3" => array(
			"bank" => "우리은행",
			"no" => "1005-501-811319",
			"owner" => "아이러브아프리카"
		),
		"4" => array(
			"bank" => "하나은행",
			"no" => "357-910008-93405",
			"owner" => "아이러브아프리카"
		),
		"5" => array(
			"bank" => "기업은행",
			"no" => "140-085132-04-018",
			"owner" => "아이러브아프리카"
		),
		"6" => array(
			"bank" => "농협",
			"no" => "351-0325-0051-33",
			"owner" => "아이러브아프리카"
		),
		"7" => array(
			"bank" => "신한은행",
			"no" => "140-009-197323",
			"owner" => "아이러브아프리카"
		),
		"8" => array(
			"bank" => "우체국",
			"no" => "014027-01-006229",
			"owner" => "아이러브아프리카"
		)
	);

	$_CODE_COM_GIVE_BOARD = array(
		1 => "생일/돌잔치",
		2 => "기념",
		3 => "결혼",
		4 => "팬클럽"
	);

	$_CODE_RECRUIT = array(
		0 => "신입",
		1 => "경력",
		2 => "신입/경력"
	);


	# URL 및 경로 설정
	$_ServerRoot = $_SERVER["DOCUMENT_ROOT"];
	$_BASE_PATH
 = $_SERVER["DOCUMENT_ROOT"]."/";
	$_PDS = $_BASE_PATH."pds/";
	$_BASIC_HOME_URL = "www.iloveafrica.or.kr";

	define("_BASE_PATH", $_BASE_PATH);
	define("_PDS", $_PDS);

	# URL 설정
	define("_BASIC_HOME_URL", "http://".$_BASIC_HOME_URL); # homepage URL
	define("_MAIL_IMG_URL", _BASIC_HOME_URL."/img"); # 메일 이미지 URL

	$_ADMIM_NAME = "관리자";
	$_ADMIM_PWD = "";
	define("_ADMIM_NAME", $_ADMIM_NAME);
	define("_ADMIM_PWD", $_ADMIM_PWD);
	
	# 문자나라 설정값
	$_SMS_ID = "miraehost";
	$_SMS_PW = "dkxmzhfldk";
	$_SMS_HP = "01098541589";
	define("_SMS_ID", $_SMS_ID);
	define("_SMS_PW", $_SMS_PW);
	define("_SMS_HP", $_SMS_HP);

	# 게시물 목록수
	DEFINE("BOARD_LIST_NUM", 20);

	# 게시판 페이징 버튼

	DEFINE("BOARD_FIRST_IMG","./images/start.gif"); // 처음으로
	DEFINE("BOARD_LAST_IMG", "./images/end.gif"); // 끝으로
	DEFINE("BOARD_PREV_IMG", "./images/pre.gif"); // 이전
	DEFINE("BOARD_NEXT_IMG", "./images/next.gif"); // 다음
?>
