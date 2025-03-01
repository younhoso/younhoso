# Q6A 전사혜택

## 담당자

+ 기획
    - 데릭(이동근)
+ 제작
    - 제이콥(박성훈)
    - 예니(이예은)

## 일정

+ QA
    - 2024-10-24
+ 라이브
    - 2024-10-25 08시 30분

##  라이브 페이지 URL 정보
+ Web - https://www.samsung.com/sec/event/galaxy-zfoldse/promotion/
+ App - https://www.samsung.com/sec/event/galaxy-zfoldse/promotion/app

## 앵커드 URL

+ APP 상세페이지
  - 정품 보호필름 https://www.samsung.com/sec/event/galaxy-zfoldse/promotion/app/sp
  - YouTube Premium https://www.samsung.com/sec/event/galaxy-zfoldse/promotion/app/ytp
  - 유튜브 https://www.samsung.com/sec/event/galaxy-zfoldse/promotion/app/ytp
  - 윌라 https://www.samsung.com/sec/event/galaxy-zfoldse/promotion/app/welaaa
  - 모아진 https://www.samsung.com/sec/event/galaxy-zfoldse/promotion/app/moazine
  - Microsoft 365 https://www.samsung.com/sec/event/galaxy-zfoldse/promotion/app/m365


##  화면 분기처리 설정 방법
*User agent string에 기기별로 하단 내용추가

- Galaxy Z Fold special edition
Mozilla/5.0 (Linux; Android 13; SAMSUNG SM-F958) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/21.0 Chrome/110.0.5481.154 Mobile Safari/537.36 SECAPP  Edg/126.0.0.0

- APP
Mozilla/5.0 (Linux; Android 13; SAMSUNG sm-f946) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/21.0 Chrome/110.0.5481.154 Mobile Safari/537.36 SECAPP;

## html/css/js 파일 정보

*중요 참고사항*
split/sec_hub.html 파일의 scipt 부분의 리다이렉션 eventTypeCd 끝번호를 수정해야합니다.
// 페이지마다 끝 번호가 달라집니다. 확인 후 수정이 필요합니다. (현재 20)
	if (device.agent.indexOf("secapp") == -1) {
		location.href = "https://www.samsung.com/sec/event/indexExhibitionCollection/?eventTypeCd=20"
	}


#### (라이브파일 / 연동된 파일 / 버전 설명 등 / 중요페이지 정보 작성)

## 이미지 정보
- 이미지명 : q6a_
- FTP 정보 : 
  - images-sec.sftp.upload.akamai.com (B2C)
    - /2025/0101_q6a_promotion/
- 이미지 절대경로 : 
  - //images.samsung.com/kdp/event/sec/2025/0101_q6a_promotion/
- PSD 경로 : 
  - https://cheilworldwide-my.sharepoint.com/personal/ric_jang_pt-korea_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fric%5Fjang%5Fpt%2Dkorea%5Fcom%2FDocuments%2FCPG2%20%EA%B3%B5%EC%9C%A0%ED%8F%B4%EB%8D%94%2F2024%2F01%2E%20%EC%82%BC%EC%84%B1%EB%8B%B7%EC%BB%B4%2FMX%5F%EC%A0%84%EC%82%AC%ED%98%9C%ED%83%9D%20%ED%8E%98%EC%9D%B4%EC%A7%80%5FT3%5FJenny%2F05%2E%20Q6A%20%EC%A0%84%EC%82%AC%ED%98%9C%ED%83%9D%2F05%2E%20%ED%8D%BC%EB%B8%94&ga=1

## 이벤트 번호(BO위치)

## 히스토리 ( 일시, 작업번호, QA URL, 내용, 작업자 순으로 기입)

  - 24/12/11
    [PC/MO]
    - T20241211000048 / 제이콥(박성훈), 예니(이예은)
      - https://www.samsung.com/sec/display/preview/413768/
    [App]
    - T20241111000008 / 제이콥(박성훈), 예니(이예은)
      - https://www.samsung.com/sec/display/preview/409349/
      [상세페이지]
      [정품 보호필름]
      - T20241211000049 / 제이콥(박성훈), 예니(이예은)
      - https://www.samsung.com/sec/display/preview/413769/
      [모아진]
      - T20241211000052 / 제이콥(박성훈), 예니(이예은)
      - https://www.samsung.com/sec/display/preview/413773/
      [MS 365]
      - T20241211000053 / 제이콥(박성훈), 예니(이예은)
      - https://www.samsung.com/sec/display/preview/413775/
      [유튜브]
      - T20241211000050 / 제이콥(박성훈), 예니(이예은)
      - https://www.samsung.com/sec/display/preview/413771/
      [윌라]
      - T20241211000051 / 제이콥(박성훈), 예니(이예은)
      - https://www.samsung.com/sec/display/preview/413772/

  - 24/12/26
    [App]
    - T20241111000008 / 제이콥(박성훈), 예니(이예은)
      - https://www.samsung.com/sec/display/preview/409349/
      - [25/1/1 RC] MS365 배너 삭제 

  - 24/12/27
    [App]
    - T20241111000008 / 제이콥(박성훈), 예니(이예은)
    - https://www.samsung.com/sec/display/preview/409349/
    - [24/12/27 RC] MS365 배너 원복
    - 워치/버즈 hub 탭 삭제
    - T20241227000023 / 제이콥(박성훈), 예니(이예은)
    - https://www.samsung.com/sec/display/preview/415300/
    - [25/1/1 RC] MS365 배너 삭제 
    - T20241227000027 / 제이콥(박성훈), 예니(이예은)
    - https://www.samsung.com/sec/display/preview/415304/
    - [25/1/2 RC] 태블릿 hub 탭 수정

    - 25/01/03
    [상세페이지]
    [정품 보호필름]
    - T20250103000014 / 윤호(소윤호), 유미(이주희)
      - https://www.samsung.com/sec/display/preview/416319/
      - 정품보호필름 시안 교체 및 유의사항 변경