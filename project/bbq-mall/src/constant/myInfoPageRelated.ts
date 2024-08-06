import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import couponIcon from '@/assets/images/my/coupon.png';
import heartIcon from '@/assets/images/my/heart.png';
import pointIcon from '@/assets/images/my/point.png';
import { handleShowPoint } from '@/hooks/useHandleWebview';

interface MyInfoPageInitialDataProps {
  value: number;
  label: string;
  unit: string;
  linkTo: string;
  image: string | StaticImport;
  onClick?: () => void;
}

type MyInfoKey = 'point' | 'coupon' | 'like';

export const myInfoPageInitialData: Record<MyInfoKey, MyInfoPageInitialDataProps> = {
  point: {
    value: 0,
    label: '포인트',
    unit: 'P',
    linkTo: 'https://bbq.co.kr/mypage/points',
    image: pointIcon,
    onClick: handleShowPoint,
  },
  coupon: {
    value: 0,
    label: '쿠폰',
    unit: '장',
    linkTo: '/my/coupon',
    image: couponIcon,
  },
  like: {
    value: 0,
    label: '관심상품',
    unit: '개',
    linkTo: '/my/like',
    image: heartIcon,
  },
};
