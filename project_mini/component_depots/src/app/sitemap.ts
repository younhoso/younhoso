export interface Category {
  title: string;
  pageUrl: string;
}

export const defaultSiteMaps: Category[] = [
  {
    title: 'Accordion',
    pageUrl: '/accordion',
  },
  {
    title: 'Tab',
    pageUrl: '/tab',
  },
  {
    title: '이미지 파일 업로드 미리보기',
    pageUrl: '/imageFile',
  },
];
