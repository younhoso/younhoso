# React 유용한 Custom Hook 모음

노마드 코더의 실전형 리액트 Hooks 강의를 참고하여 만든 레포지토리입니다.

<br>

## 실행

```
$ yarn install
$ yarn start

or

$ npm install
$ npm start
```

- hooks 폴더에 custom hook 위치 <br>
- containers 폴더에 각각의 custom hook이 적용된 예시 컴포넌트들 위치

<br>

---

<br>

## 1. useState를 이용한 Custom Hooks

### 1.1. useInput

input 태그에 사용할 수 있으며, validator 함수를 만들어 useInput Hook에 인자로 넣어줌으로써 원하는 validation을 적용 가능

### 1.2. useTabs

서버로부터 받아온 데이터 중에서 사용자의 인터랙션에 따라 다른 내용을 출력할 수 있도록 하는데 사용 가능

<br>

## 2. useEffect를 이용한 Custom Hooks

### 2.1. useTitle

웹 페이지의 타이틀을 유동적으로 변경할 수 있도록 하는 Hook으로, 타이틀 뿐만이 아니라 목적에 따라 특정 Element의 내용이 유동적으로 바뀌게끔 커스터마이징 가능

### 2.2 useClick

특정 Element를 클릭 했을 때 원하는 함수가 실행되게끔 처리한 Hook으로, useEffect Hook을 통해 click event listener 실행, 제거 처리를 해주었음

### 2.3 useBeforeLeave

사용자의 마우스가 특정 위치를 벗어날 때마다, 원하는 함수를 실행시킬 수 있는 Hook

### 2.4 useFadeIn

특정 Element에 FadeIn 효과를 줄 수 있는 Hook. duration과 delay를 인자로 받으며, 사용할 때 함수의 인자로 각각 원하는 시간을 넘겨주면 된다.

### 2.5 useNetwork

브라우저의 온라인 여부를 판단해 주는 Hook. 온라인 여부에 따라 원하는 작업을 수행하도록 할 수 있다.

### 2.6 useScroll

현재 스크롤 위치에 따라 element의 스타일을 다르게 지정할 수 있도록 하는 Hook.

### 2.7 useAxios

axios를 통한 데이터 요청 코드를 모듈화하여 코드의 중복성을 최소화할 수 있도록 하는 Hook.

<br>

## 3. 기타 Hooks

### 3.1 useConfirm

사용자가 특정 버튼 클릭 시 dialog를 띄워 확인, 취소 버튼 클릭 시 각각 다른 함수를 실행하도록 함

### 3.2 usePreventLeave

사용자가 웹 페이지를 벗어나려고 하거나, 새로고침 할 때 dialog를 띄워 실행 여부를 묻도록 함

### 3.3 useFullScreen

버튼 클릭 시 이미지 등을 전체화면으로 키울 수 있도록 하는 Hook.

### 3.4 useNotification

사용자에게 알림을 띄울 수 있도록 하는 Hook.
