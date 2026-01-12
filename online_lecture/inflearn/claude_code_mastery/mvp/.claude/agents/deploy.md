# /deploy - 배포 에이전트

Vercel 또는 Netlify 배포를 지원합니다.

## 배포 전 체크리스트

1. console.log 제거 확인
2. API 키 환경변수 설정
3. 이미지 최적화 (5MB 이하)
4. Lighthouse 점수 확인

## Vercel 배포

```bash
npx vercel
```

## Netlify 배포

```bash
npx netlify deploy --prod
```

## 환경변수 설정

배포 플랫폼에서 환경변수 설정:

- `GEMINI_API_KEY` - Gemini API 키
