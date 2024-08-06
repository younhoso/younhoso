interface APIConfig {
  host: string | null;
  prefix: string | null;
}

interface ConfigRoot {
  api: APIConfig;
}

// 프로덕션 환경 설정
export const pro: ConfigRoot = {
  api: {
    host: 'https://api.papkorea.com',
    prefix: '/api',
  },
};

// 개발 환경 설정
export const dev: ConfigRoot = {
  api: {
    host: 'http://127.0.0.1:4000',
    prefix: '/api',
  },
};
