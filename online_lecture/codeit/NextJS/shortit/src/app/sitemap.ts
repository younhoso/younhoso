export interface Category {
  title: string;
  href: string;
}

export const defaultSiteMaps: Category[] = [
  {
    title: "주소 줄이기",
    href: "short-links/new",
  },
  {
    title: "QR코드",
    href: "short-links/qr",
  },
];
