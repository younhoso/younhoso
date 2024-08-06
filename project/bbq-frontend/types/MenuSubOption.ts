import { MenuSubOptionItem } from './MenuSubOptionItem';

export interface MenuSubOption {
  id: number;
  subOptionTitle: string;
  requiredSelectCount: number;
  maxSelectCount: number;
  subOptionItemDetailResponseList: MenuSubOptionItem[];
}
