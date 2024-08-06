# bbq-mall

비비큐 자사몰

## Getting started

- Compiler: [`swc`](https://nextjs.org/docs/architecture/nextjs-compiler)
- Frontend framework: `nextjs` + `react` + `typescript`
- CSS: [`styled-components`](https://styled-components.com/)
- State management library: [`recoil`](https://recoiljs.org/)
- Testing tool: [`React testing library`](https://testing-library.com/docs/react-testing-library/intro/) + [`jest`](https://jestjs.io/)
- CI: [`husky`](https://typicode.github.io/husky/) + [`github actions`](https://github.com/features/actions)

## Install yarn

```bash
npm i -g yarn
```

## Custom Generator

컴포넌트, page, feature 등을 손쉽게 만들 수 있도록 커스텀 제너레이터를 작성했습니다.

```bash
$ yarn g
```

## Before Getting Started

### Install dependency

```bash
$ yarn install
```

### Install husky

```bash
$ yarn postinstall
```

## CI

허스키가 설치되어 있다는 가정 하에, 다음과 같은 CI가 실행됩니다.

### pre commit by husky

[You can check detail here](./.husky/pre-commit)

### pre push by husky

[You can check detail here](./.husky/pre-push)

### pre merge by github actions

PR 생성 시에, 자동으로 build 체크를 진행하나, merge 자체를 막으려면 teams 또는 enterprise 계정으로 업그레이드가 요구됨.
[You can check detail here](./.github/workflows/main.yml)

## Getting Started

### dev

```bash
$ yarn dev
```

### storybook

```bash
$ yarn storybook
```

### 환경변수

.example.env 안의 key 값에 따라 .env 파일을 생성해 value를 넣어 작업해주셔야합니다.

## Folder Structure

```bash
.
├── .github # github 관련 파일 (github action included)
├── .husky # Git hook 테스팅
├── .storybook # 스토리북 설정
├── public # 퍼블릭 폴다
├── fonts # font 폴더
├── generator.mjs # 제네레이터
├── index.html # 대표 html 파일
├── package.json # dependency manage
├── public # 퍼블릭 폴더
│   └── fonts # 폰트
├── src
│   ├── [`app`](https://nextjs.org/docs/app)
│   │   └── [`api`](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
│   ├── assets # 이미지, 비디오 등
│   ├── components # 컴포넌트
│   ├── libs # libraries
│   ├── provider # 커스텀 프로바이더
│   ├── hooks # 커스텀 훅
│   ├── stores # Recoil 전역 변수
│   ├── styles # style 관련
│   └── utils # 유틸 함수
├── .eslintrc.json # lint 설정
├── .example.env # env format
├── .gitignore # git ignore
├── .swcrc # swc 컴파일러 관련 설정
├── generator.mjs # 제너레이터
├── jest.config.ts # jest 환경 설정
├── jest.setup.ts # jest 기본 셋업
├── next.config.js # next 설정
├── package.json # deps 관리
└── tsconfig.json # typescript 설정
```
