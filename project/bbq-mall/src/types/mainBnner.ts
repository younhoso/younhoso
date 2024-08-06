export interface Banner {
  bannerNo: number;
  name: string;
  nameColor: string;
  description: string;
  descriptionColor: string;
  imageUrl: string;
  landingUrlType: string;
  landingUrl: string;
  leftSpaceColor: string;
  rightSpaceColor: string;
  browerTargetType: string;
  mouseOverImageUrl: string;
  displayPeriodType: string;
  displayStartYmdt: string;
  displayEndYmdt: string;
  displayOrder: number;
  videoUrl: string;
  width: number;
  height: number;
}

export interface Account {
  accountNo: number;
  accountName: string;
  displayType: string;
  height: number;
  width: number;
  platformDisplayPcYn: string;
  platformDisplayMobileYn: string;
  platformDisplayMobileWebYn: string;
  banners: Banner[];
}

export interface BannerSection {
  bannerSectionNo: number;
  label: string;
  code: string;
  platformDisplayPcYn: string;
  platformDisplayMobileYn: string;
  platformDisplayMobileWebYn: string;
  accounts: Account[];
}

export interface BannerSections extends Array<BannerSection> {}
