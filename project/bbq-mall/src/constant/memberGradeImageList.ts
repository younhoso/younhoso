import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import bback from '@/assets/images/constant/bback.svg';
import bbip from '@/assets/images/constant/bbip.svg';
import bip from '@/assets/images/constant/bip.svg';
import welcome from '@/assets/images/constant/welcome.svg';
import { theme } from '@/provider/CustomThemeProvider';

export interface MemberGradeType {
  backgroundColor: string;
  image: string | StaticImport;
  color: string;
  limit: string;
  nextMonth: string;
  benefit: string;
  coupons: string[];
}

export type MemberGradeList = 'WELCOME' | '치빡이' | 'BIP' | 'BBIP';

export const MEMBER_GRADE_IMAGE_LIST: Record<MemberGradeList, MemberGradeType> = {
  WELCOME: {
    backgroundColor: '#D9D9D9',
    image: welcome,
    color: theme.colors.gray666,
    limit: '2만 5천원 이하',
    nextMonth: '2만 5천원 이상 5만원 이하 구매시 다음달 치빡이 등급으로!',
    benefit: '2% 적립',
    coupons: ['[주문]할인쿠폰 5%할인', '[주문]생일쿠폰 10% 할인'],
  },
  치빡이: {
    backgroundColor: '#979636',
    image: bback,
    color: 'white',
    limit: '2만 5천원 - 5만원',
    nextMonth: '5만원 이상 10만원 이하 구매시 다음 달 BIP 등급으로!',
    benefit: '2% 적립',
    coupons: ['[주문]할인쿠폰 10%할인', '[주문]생일쿠폰 10% 할인'],
  },
  BIP: {
    backgroundColor: '#FBB042',
    image: bip,
    color: 'white',
    limit: '5만원 - 10만원',
    nextMonth: '10만원 이상 구매시 다음 달 BBIP 등급으로!',
    benefit: '2% 적립',
    coupons: ['[주문]할인쿠폰 15%할인', '[주문]생일쿠폰 10% 할인'],
  },
  BBIP: {
    backgroundColor: theme.colors.red937,
    image: bbip,
    color: 'white',
    limit: '10만원 이상',
    nextMonth: '10만원 이상 구매시 다음 달 BBIP 등급 유지!',
    benefit: '2% 적립',
    coupons: ['[주문]할인쿠폰 20%할인', '[주문]생일쿠폰 10% 할인'],
  },
};
