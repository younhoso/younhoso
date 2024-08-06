export interface Notice {
  id: number;
  title: string;
  bodyHtml: string;
  isActive: boolean;
  isTopFixed?: boolean;
  createdDate: string;
}
