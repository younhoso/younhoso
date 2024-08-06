export interface Event {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  thumbnailImageUrl?: string;
  bodyHtml?: string;
  isActive: boolean;
  createdAdminName?: string;
}
