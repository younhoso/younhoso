export interface EventBanner {
  id: number;
  pcImageUrl: string;
  mobileImageUrl: string;
  startDate: string;
  endDate: string;
  aosUrl?: string;
  iosUrl?: string;
  webUrl?: string;
  isActive: boolean;
  priority: number;
}
