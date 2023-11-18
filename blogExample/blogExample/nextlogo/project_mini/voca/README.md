# 토익 영어단어장
해당 프로젝트는 mini-project 입니다.\
👉🏻 기간: 22/08/22 ~ 22/08/26 (5일)

## 🚀 목표
1. React 영어 단어장 미니프로젝트 만들기
2. TypeScript + React 숙련도 높이기

## ✅ 배우게 될 것들
1. module css
2. Hook 사용 useState, useEffect 
3. Rest API를 통신하면서 - 추가, 수정, 삭제를 구현 
4. Custom Hook 
5. json-server, REST API - 적용 
6. TypeScript 적용

## 🎯 프로젝트 기능들
- 단어추가, day 추가, 단어 삭제, 단어 업데이트
- 정의하지 않은 url로 접근시 에러 페이지를 보여주고 3초 후 메인 페이지로 이동
- 느린 인터넷 환경을 생각해서  `Loading…` 처리
- 네트워크 요청 중에는 저장 버튼 중복으로 못 누르게 비활성화 하기

## 👋실행 방법
클리이언트쪽 실행
```
yarn start
```
json-server 실행
```
json-server --watch ./src/db/data.json --port 3001
```