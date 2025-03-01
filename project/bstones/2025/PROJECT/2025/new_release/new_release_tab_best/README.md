# 삼성닷컴 런칭 통합페이지 - 메인 (리다이렉트 기능 / 공통 상단 탭 페이지)

#### 담당자

+ 기획
  - 원(박창원)
+ 제작
  - 피터(정성우)

#### 랜덤 페이지

- url : https://www.samsung.com/sec/new-release/
- 작업 번호 : T20220822000025 (08-22)
- 작업 번호 : T20220822000002 (08-22)
- 작업 번호 : T20220401000001
- 작업 번호 : T20220826000014 (08-26)
- 작업 번호 : T20220830000010 (08-30)

- 작업 유의사항 (random.txt)

1) randomUrl 값을 실제 랜덤 라이브 URL으로 변경하여 사용.

<del>1) 라이브 예약시 기획전 페이지와 동일하게, 작업번호 전달 받고 랜덤 페이지의 json 경로 수정해주세요.</del>
<del>2) 랜덤페이지는 QA, 라이브 환경 동일하도록 구성하여 QA 확인 해주세요. live.json 파일 사용하니 QA, 라이브 경우 json 경로 2군데를 live.json 경로 수정 필요합니다.</del>

#### 현재 라이브 버전

<del>- FTP 경로 : /PM_new_release/tab - live.json</del>
- 탭 1개로 JSON 사용 안함!! (최종 - static.json)

#### JSON 히스토리
[2022.08.30 아크 삭제]
- random.txt : 아크 링크 삭제

[2022.08.26 탭 순서 변경 - 제트봇, 그랑데, 하만, 아크]

- tab_json.js
- ramdom.txt : 4개 페이지 url 모두 적용

[2022.08.22 탭 수정 - 하만, 제트봇]

- tab_json.js
- ramdom.txt : 디폴트로 제트봇 url로만 설정, main 파라미터 제거

[2022.08.01 탭 수정 - 하만 탭 날짜 수정]

- static.json


[2022.06.17 탭 수정 - 하만 탭 날짜 수정]

- live_t.json
- staging.json

[2022.05.30 탭 수정 - 하만 탭 날짜 수정]

- live_t.json
- staging.json

[2022.05.09 탭 수정 - 하만 탭 추가]

- live.json
- staging.json


[2022.04.17 탭 수정 - Neo QLED 탭 삭제]

- live.json
- staging.json


[2022.04.13 탭 수정 - Neo QLED 날짜 변경]

- live_t2.json
- staging.json

[2022.04.04 탭 수정 - 인피니트 라인 추가, new 상태 추가]

- live_t2.json
- staging.json

[2022.04.01 탭 날짜수정 - 라이브 예약]

- live_t2.json
- staging.json

[2022.03.21 Neo QLED 문구수정 - 라이브 예약]

- live.json
- staging.json

[2022.03.14 Neo QLED 문구수정 - 라이브 예약]

- live_t.json
- staging.json

[2022.03.13 Neo QLED 문구수정]

- live.json
- staging.json

[2022.03.04 Neo QLED 문구수정]

- live.json
- staging.json

[2022.03.04 Neo 무퐁 냉장고 탭 추가]

- live.json
- staging.json

[2022.03.03 Neo QLED 탭 추가 - 라이브 예약]

- live.json
- staging.json

[2022.02.28 00:00 와인냉장고 탭 추가 - 라이브 예약]

- live_t.json
- staging.json

#### 리다이렉트 기능

- random.txt 파일 등록 (minify 스크립트 파일은 src/js/tab_json.js 과 동일함)

#### 공통 상단 탭 페이지

- tab.html build 후 txt 파일 등록

#### 공통 상단 탭 페이지(bo 등록 시 상단 탭 분리하여 등록)

- 구성순번 1) 탭 영역 - new_release/src/tab.html 빌드 후 txt 파일 등록
- 구성순번 2) 콘텐츠 영역 - 작업 파일 빌드 후 txt 파일 등록

#### 페이지 로드 시 특정 탭 선택

<strike>ex) <main class="sec_project_wrap new_release" data-sec-tab="thefreestyle"> (22/2/23 삭제)</strike>
- <strike>data-sec-tab 속성 추가하여 값 정의 (22/2/23 삭제)</strike>
- <strike>같은 레벨의 아이디 값 정의 (22/2/16 삭제)</strike>

/2022/promo/new_release/src/js/tab_json.js
- line9 : selected: '' // bespoke-jet/ bespoke-wine/ grande-ai/ thefreestyle
- selected 값을 프로젝트에 맞게 변경함. ( 페이지 로딩 시 선택되는 탭 지정)

#### 공통 JSON 파일
* 공통 JSON 파일은 담당자 지정하여 등록 (담당자 : 피터, 윈터)

1) /2022/promo/new_release/src/js/data/staging.json
- 닷컴 QA용 json 파일

2) /2022/promo/new_release/src/js/data/live.json
- 닷컴 라이브용 json 파일 (해당 파일은 FTP등록 시 라이브 서버에 바로 적용됨으로 수정 유의!)

3) JSON 파일 등록 방법
- 이미지 서버 경로 : /PM_new_release/tab/ (파일질라를 통해 업로드, 운영에 바로 적용 됨으로 주의 필요!)
- staging.json 파일 수정을 통해 QA 완료 후 기획자와 협의 후 정해진 시점에 live.json 파일 업로드.

4) JSON 파일 설명
{
"title": "<span class='en'>2022</span> 삼성전자 <br class='m_show'>신상 컬렉션", 
// 탭 타이틀 영역
"description": "올해 새롭게 선보이는 삼성 TV부터 BESPOKE 주방가전, 생활가전까지 <br>모든 신제품을 삼성닷컴 특별 혜택으로 가장 먼저 만나보세요", 
// 탭 description 영역
"selecedTab": "", 
// 페이지 로딩시 선택 탭(모든 페이지에 공통 지정됨으로 사용X)
"isRandom": false, 
// false (탭 위치는 순서에 맞게 고정되며, 탭을 랜덤으로 섞지 않음), true (선택된 탭은 첫번째 지정 후, 탭을 랜덤으로 섞음)
"result": [
{
"id": "bespoke-wine",  
// 탭 고유 값
"type": "default",       
// default (기본값), comingsoon (커밍순 타입)
"step": "pre-order",   
//  pre-order, launching (페이지 상태 값 옴니추어 생성시에만 사용)
"title": "BE<span class='fw_400 vt_top'>SPOKE</span> 1도어<br>와인냉장고 단독 런칭",  
// 탭 타이틀 영역
"date": "22.02.17 <i>~</i> 22.02.27", 
// 탭 날짜 영역
"linkUrl": "https://www.samsung.com/sec/new-release/bespoke-wine/pre-order/",  
// 탭 링크 URL
"status": "", 
// Coming soon (노출되는 텍스트 작성), 현재, statusType 은 comingsoon_txt 유일함.
"statusType": "", 
// comingsoon_txt en (커밍순 타입 유일함, 클래스명 추가 지정)
"tagType": "end", 
// 태그 타입 4가지 : end(종료), soldout(일시품절),soldout_type2(품절), new(신규)
"isHidden": false, 
// false(탭 노출), true(탭 숨김)
"customHtml": "", 
// 해당 탭 영역을 html 로 삽입 가능 (비상용, 되도록 사용X)
"order": 1 
// isRandom 값이 false 인 경우 순서 지정가능, 순번이 낮을 수록 우선하여 노출 됨.
}
]}


#### 라이브 url

https://www.samsung.com/sec/new-release

#### 작업번호

+ STG

+ PRD
    - T20220216000019

#### 페이지 설명

- 이 URL 로 유입될경우 하단 페이지로 랜덤 리다이렉트 됨, 
- 위 기능을 js 파일 하나로 만들어서 별도의 빌드과정없이 js소스 그대로 bo에 업로드

#### 리다이렉트 페이지 목록 (없어지거나 추가될수 있음, 상시 현재상태로 소스관리할것)

- (스테이징) : src/js/data/staging.json
- (라이브) : src/js/data/live.json

#### 히스토리

+ 2022.01.11
    1) T20220216000019 : 산출물 등록

+ 2022.08.24
  - 현재 활성화된 슬라이드 가운데로 보여지게 수정
  - 양쪽 끝 슬라이드는 끝에 붙도록 설정 - 원복해놓으려고 주석처리함
    - 주석확인 : // 현재 활성화된 슬라이드 가운데로 이동
    - 주석확인 : // 활성화된 슬라이드 화면 가운데 정렬
    - 주석확인 : // 활성화된 슬라이드 화면 가운데 정렬 / 처음 슬라이드 , 마지막 슬라이드는 끝에 붙도록 설정
    - 주석처리 : // 활성화된 슬라이드로 이동처리
- ★★★ 공통탭 활성화 슬라이드 가운데로 오게끔 작동 시키려면
  - 주석 풀기 :  (가운데 정렬 시 주석풀기) <- 이 문구 들어간 주석처리 모두 풀기
  - 주석 처리 :  (가운데 정렬 시 주석처리하기) <- 이 문구 들어간 주석 아래 주석처리하기

- 2024.12.26 
  - 15:00 - 이예은
  - 2025 폴더 생성
  - 홈 탭 삭제, 아이콘 변경
