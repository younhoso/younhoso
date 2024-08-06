<?
	//// 서브 네비게이션 설정
	$main_navClass = array(
		"m01" => "sub1_text_r",
		"m02" => "sub2_text_r",
		"m03" => "sub3_text_r",
		"m04" => "sub4_text_r",
		"m10" => "sub10_text_r"
	);

	$conf_location = array();
	$sub_location = array();
	
	/// 아이러브아프리카
	if($argu["m"] == "m01"){
		
		/// 사업소개
		$main_location["s01"] = "사업소개";
		$sub_location["s01"]["01"]["title"] = "아프리카사업";
		$sub_location["s01"]["01"]["01"] = "기초교육사업";
		$sub_location["s01"]["01"]["02"] = "식수개발사업";
		$sub_location["s01"]["01"]["03"] = "아동복지개발사업";
		$sub_location["s01"]["01"]["04"] = "의료보건개발사업";
		$sub_location["s01"]["01"]["05"] = "농업개발사업";
		$sub_location["s01"]["01"]["06"] = "문화개발사업";
		$sub_location["s01"]["01"]["07"] = "기타 개발사업";
		
		$sub_location["s01"]["02"]["title"] = "아시아사업";
		$sub_location["s01"]["02"]["01"] = "코피노 지원사업";

		$sub_location["s01"]["03"]["title"] = "대한민국 사업";
		$sub_location["s01"]["03"]["01"] = "재한아프리카대학생 장학사업";


		/// 아이러브아프리카
		$main_location["s02"] = "아이러브아프리카";
		$sub_location["s02"]["01"]["title"] = "기관소개";
		$sub_location["s02"]["01"]["01"] = "총재 인사말";
		$sub_location["s02"]["01"]["04"] = "명예총재 인사말";
		$sub_location["s02"]["01"]["05"] = "설립자 인사말";
		$sub_location["s02"]["01"]["02"] = "NGO 아이러브아프리카 소개";
		$sub_location["s02"]["01"]["03"] = "CI 소개";

		$sub_location["s02"]["02"]["title"] = "조직";
		$sub_location["s02"]["02"]["01"] = "함께하는 사람들";

		$sub_location["s02"]["03"]["title"] = "홍보대사";
		$sub_location["s02"]["03"]["01"] = "사랑홍보대사";
		$sub_location["s02"]["03"]["02"] = "나눔홍보대사";

		$sub_location["s02"]["04"]["title"] = "국내/해외지부";
		$sub_location["s02"]["04"]["01"] = "국내본부";
		$sub_location["s02"]["04"]["02"] = "해외지부";

		$sub_location["s02"]["05"]["title"] = "아이러브아프리카뉴스";
		$sub_location["s02"]["05"]["01"] = "아이러브아프리카 소식";
		$sub_location["s02"]["05"]["02"] = "보도자료";
		$sub_location["s02"]["05"]["03"] = "언론보도";

		$sub_location["s02"]["06"]["title"] = "찾아 오시는 길";


		/// 채용공고
		$main_location["s03"] = "채용공고";
		$sub_location["s03"]["01"]["title"] = "채용공고";

	}

	
	/// give love
	if($argu["m"] == "m02"){
		
		/// 사업후원
		$main_location["s01"] = "사업후원";
		$sub_location["s01"]["01"]["title"] = "교육사업후원";
		$sub_location["s01"]["02"]["title"] = "아동복지후원";
		$sub_location["s01"]["03"]["title"] = "식수개발후원";
		$sub_location["s01"]["04"]["title"] = "의료진료후원";
		$sub_location["s01"]["05"]["title"] = "농업개발후원";
		$sub_location["s01"]["06"]["title"] = "문화개발후원";


		/// 일시후원
		$main_location["s02"] = "일시후원";
		$sub_location["s02"]["01"]["title"] = "즉시후원하기";

		$sub_location["s02"]["02"]["title"] = "특별한후원";
		$sub_location["s02"]["02"]["01"] = "생일/돌후원";
		$sub_location["s02"]["02"]["02"] = "기념후원";
		$sub_location["s02"]["02"]["03"] = "결혼후원";
		$sub_location["s02"]["02"]["04"] = "팬클럽후원";

		$sub_location["s02"]["03"]["title"] = "유산후원";
		$sub_location["s02"]["03"]["01"] = "유산후원안내";


		/// 기업 및 단체 후원
		$main_location["s03"] = "기업 및 단체후원";
		$sub_location["s03"]["01"]["title"] = "기업후원";
		$sub_location["s03"]["01"]["01"] = "기업후원안내";
		$sub_location["s03"]["01"]["02"] = "후원프로세스";

		$sub_location["s03"]["02"]["title"] = "단체후원";
		$sub_location["s03"]["02"]["01"] = "단체후원안내";
		$sub_location["s03"]["02"]["02"] = "후원프로세스";

		$sub_location["s03"]["03"]["title"] = "후원현황";
		$sub_location["s03"]["03"]["01"] = "후원현황";
		$sub_location["s03"]["03"]["02"] = "볼룬티어클럽";

		$sub_location["s03"]["04"]["title"] = "후원신청";


		/// 쇼핑후원
		$main_location["s04"] = "쇼핑후원";
		$sub_location["s04"]["00"]["title"] = "메인";
		$sub_location["s04"]["cart"]["title"] = "장바구니";
		$sub_location["s04"]["order"]["title"] = "결제하기";
		$sub_location["s04"]["result"]["title"] = "결제결과";
		$sub_location["s04"]["01"]["title"] = "식수개발사업";
		$sub_location["s04"]["02"]["title"] = "교육개발사업";
		$sub_location["s04"]["03"]["title"] = "아동복지개발사업";
		$sub_location["s04"]["04"]["title"] = "의료보건개발사업";
		$sub_location["s04"]["05"]["title"] = "농업개발사업";
		$sub_location["s04"]["06"]["title"] = "문화개발사업";
		$sub_location["s04"]["07"]["title"] = "기타개발사업";


		/// 캠페인후원
		$main_location["s05"] = "캠페인후원";
		$sub_location["s05"]["01"]["title"] = "진행중인 캠페인";
		$sub_location["s05"]["01"]["order"] = "결제하기";
		$sub_location["s05"]["01"]["result"] = "결제결과";

		$sub_location["s05"]["02"]["title"] = "완료된 캠페인";

		$sub_location["s05"]["03"]["title"] = "따뜻한 후원사연";

		$sub_location["s05"]["04"]["title"] = "후원자 갤러리";
		$sub_location["s05"]["04"]["01"] = "돌 잔치";
		$sub_location["s05"]["04"]["02"] = "결혼 기념";
		$sub_location["s05"]["04"]["03"] = "팬클럽 후원";
		$sub_location["s05"]["04"]["04"] = "기념일";

	}


	/// 아프리카정보
	if($argu["m"] == "m03"){
		
		/// 아프리카TV
		$main_location["s01"] = "아프리카TV";
		$sub_location["s01"]["01"]["title"] = "아프리카TV";
		$sub_location["s01"]["02"]["title"] = "다큐멘터리";
		$sub_location["s01"]["03"]["title"] = "캠페인 영상";
		$sub_location["s01"]["04"]["title"] = "홍보 영상";


		/// 아프리카뉴스
		$main_location["s02"] = "아프리카뉴스";
		$sub_location["s02"]["01"]["title"] = "공지사항";
		$sub_location["s02"]["02"]["title"] = "아프리카뉴스";
		$sub_location["s02"]["03"]["title"] = "아프리카정보";
		$sub_location["s02"]["04"]["title"] = "이벤트";

		
		/// 아이러브아프리카 웹진
		$main_location["s03"] = "아이러브아프리카 웹진";
		$sub_location["s03"]["01"]["title"] = "아이러브아프리카 웹진";

	
		/// 아프리카 러브레터
		$main_location["s04"] = "아프리카 러브레터";
		$sub_location["s04"]["01"]["title"] = "아프리카 러브레터";


		/// 캠페인후원
		$main_location["s05"] = "스와힐리어 강좌";
		$sub_location["s05"]["01"]["title"] = "스와힐리어 강좌";

	}


	/// 자원봉사단
	if($argu["m"] == "m04"){
		
		/// 자원봉사단소개
		$main_location["s01"] = "자원봉사단소개";
		$sub_location["s01"]["01"]["title"] = "해외자원봉사단";
		$sub_location["s01"]["02"]["title"] = "온라인자원봉사단";
		$sub_location["s01"]["03"]["title"] = "재능기부봉사단";
		$sub_location["s01"]["04"]["title"] = "행사자원봉사자";
		$sub_location["s01"]["05"]["title"] = "봉사자명단";
		$sub_location["s01"]["06"]["title"] = "자주묻는질문";
		$sub_location["s01"]["07"]["title"] = "묻고 답하기";


		/// 자원봉사단 모집
		$main_location["s02"] = "자원봉사단 모집";
		$sub_location["s02"]["01"]["title"] = "모집공지사항";
		$sub_location["s02"]["02"]["title"] = "자원봉사자 지원";
		$sub_location["s02"]["03"]["title"] = "관심자 등록";
		$sub_location["s02"]["04"]["title"] = "자주묻는질문";
		$sub_location["s02"]["05"]["title"] = "묻고 답하기";

		
		/// 볼론티어클럽
		$main_location["s03"] = "볼론티어클럽";
		$sub_location["s03"]["01"]["title"] = "볼론티어클럽소개";
		$sub_location["s03"]["02"]["title"] = "클럽등록/관리";
		$sub_location["s03"]["03"]["title"] = "자주묻는질문";
		$sub_location["s03"]["04"]["title"] = "묻고 답하기";

	
		/// 커뮤니티
		$main_location["s04"] = "커뮤니티";
		$sub_location["s04"]["01"]["title"] = "전체 공지사항";
		$sub_location["s04"]["02"]["title"] = "해외지부소식";
		$sub_location["s04"]["03"]["title"] = "사랑나눔 이야기";
		$sub_location["s04"]["04"]["title"] = "사진 한 컷";
		$sub_location["s04"]["05"]["title"] = "봉사활동 후기";
		$sub_location["s04"]["06"]["title"] = "자주묻는질문";
		$sub_location["s04"]["07"]["title"] = "묻고 답하기";
		$sub_location["s04"]["08"]["title"] = "온라인서명운동";

	}


	/// 마이페이지
	if($argu["m"] == "m10"){
		
		/// 마이페이지
		$main_location["s01"] = "마이페이지";
		$sub_location["s01"]["01"]["title"] = "개인정보변경";

		$sub_location["s01"]["02"]["title"] = "나의 후원관리";
		$sub_location["s01"]["02"]["01"] = "후원관리";
		$sub_location["s01"]["02"]["02"] = "납부관리";
		$sub_location["s01"]["02"]["03"] = "후원내역조회";
		$sub_location["s01"]["02"]["04"] = "지난후원회비내기";
		
		$sub_location["s01"]["03"]["title"] = "기부금영수증";
		$sub_location["s01"]["03"]["01"] = "기부금영수증";
		$sub_location["s01"]["03"]["02"] = "후원금영수증";
		$sub_location["s01"]["03"]["03"] = "후원활동증명서";

		$sub_location["s01"]["04"]["title"] = "후원가이드";

		$sub_location["s01"]["05"]["title"] = "후원문의";
		$sub_location["s01"]["05"]["01"] = "FAQ";
		$sub_location["s01"]["05"]["02"] = "1:1 문의상담";

		$sub_location["s01"]["06"]["title"] = "나의멘티회원";
		$sub_location["s01"]["07"]["title"] = "회원탈퇴";


		/// 회원가입
		$main_location["s02"] = "회원가입";
		$sub_location["s02"]["01"]["title"] = "회원가입";
		$sub_location["s02"]["02"]["title"] = "로그인";
		$sub_location["s02"]["03"]["title"] = "아이디/비밀번호 찾기";
		$sub_location["s02"]["04"]["title"] = "이용약관";
		$sub_location["s02"]["05"]["title"] = "개인정보보호정책";
		$sub_location["s02"]["06"]["title"] = "이메일 무단수집거부";

	}

	$sub_navTitle = $main_location[$sub_dir]." &lt; ";

	if(strlen($sub_location[$sub_dir][$sub_1st][$sub_2nd])>0){
		$sub_navTitle .= $sub_location[$sub_dir][$sub_1st]["title"]." &lt; ";
		$sub_detailTitle = $sub_location[$sub_dir][$sub_1st][$sub_2nd];
	}else{
		$sub_detailTitle = $sub_location[$sub_dir][$sub_1st]["title"];
	}

	$sub_navTitle .= "<span class=\"".$main_navClass[$argu["m"]]."\">".$sub_detailTitle."</span>";
?>