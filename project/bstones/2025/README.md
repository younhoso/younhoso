# BSTONES Gulp Setting

> 닷컴 기획전 개발을 위한 Gulp 세팅 (sec-setting 포크) --

## 사용법
```bash
# 개발 서버 실행
$ npm run server
$ gulp server
$ gulp s

# 로컬 파일 생성
$ npm run dev
$ gulp dev
$ gulp d

# AEM 파일 생성
$ npm run build
$ gulp build
$ gulp b

# TXT 파일 생성
$ npm run txt
$ gulp txt
$ gulp t

# 로컬 파일 생성 + AEM 파일 생성 + TXT 파일 생성
$ npm run all
$ gulp all
$ gulp a

# 갤럭시 캠퍼스 스토어 개발 서버 실행
$ gulp server2
$ gulp s2

# 프록시 없는 개발 서버 실행
$ gulp server3
$ gulp s3
```

## 설치
```bash
$ npm install --global gulp-cli
```

## 요구사항
- node -v 14.15.1 이상

## 변경내용
- gulp-sass > dart-sass 변경
- postcss-flexibility 삭제
- 개발 서버 프록시 추가
- 축약 명령어 추가
- default 명령어 오류 수정