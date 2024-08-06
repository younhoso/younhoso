'use client';

import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import { useGetReplacedPathname } from '@/hooks/useGetReplacedPathname';
import { handleGoMypage, handleShowPoint } from '@/hooks/useHandleWebview';

import { MyCategoryStyled } from './styled';

export interface MyCategoryProps {
  className?: string;
}

export const signItemList = [
  { label: '주문/배송조회', linkTo: '/order/check/guest' },
  { label: '취소/교환/반품', linkTo: '/order/check/guest' },
];

export interface MyItemChildren {
  label: string;
  linkTo: string;
  hasBack: boolean;
  inVisible?: boolean;
  onClickInMobile?: () => void;
  backRoute?: string;
  tailRoute?: string;
}
interface MyItemList {
  label: string;
  children: MyItemChildren[];
}

export const myItemList: MyItemList[] = [
  {
    label: '나의 정보',
    children: [
      {
        label: '내 정보',
        linkTo: '/my/info',
        hasBack: true,
        onClickInMobile: handleGoMypage,
        backRoute: '/',
      },
      {
        label: '주문 내역',
        linkTo: '/my/order-history/list/all',
        hasBack: true,
        tailRoute: 'completed',
      },
      {
        label: '주문 내역 상세',
        linkTo: '/my/order-history/detail',
        hasBack: true,
        inVisible: true,
        backRoute: '/my/order-history/list/all',
      },
      {
        label: '취소/교환/반품',
        linkTo: '/my/order-history/list/canceled',
        hasBack: true,
        tailRoute: 'canceled',
      },
      // { label: '개인 결제', linkTo: '/my/3', hasBack: true },
      { label: '관심 상품', linkTo: '/my/like', hasBack: true },
      { label: '배송지 관리', linkTo: '/my/address', hasBack: true },
      {
        label: '배송지 수정',
        linkTo: '/my/address/edit',
        hasBack: true,
        inVisible: true,
        backRoute: '/my/address',
      },
      {
        label: '배송지 추가',
        linkTo: '/my/address/edit/add',
        hasBack: true,
        inVisible: true,
        backRoute: '/my/address',
      },
      {
        label: '주소 검색',
        linkTo: '/my/address/search',
        hasBack: true,
        inVisible: true,
        backRoute: '/my/address',
      },
    ],
  },
  {
    label: '나의 활동',
    children: [
      { label: '상품 리뷰', linkTo: '/my/review', hasBack: true },
      { label: '상품 문의', linkTo: '/my/inquiry', hasBack: true },
      {
        label: '상품 문의 수정',
        linkTo: '/my/inquiry/edit',
        hasBack: true,
        inVisible: true,
        backRoute: '/my/inquiry',
      },
    ],
  },
  {
    label: '나의 혜택',
    children: [
      { label: '멤버십 등급', linkTo: '/my/membership', hasBack: true },
      {
        label: '포인트',
        linkTo: 'https://bbq.co.kr/mypage/points',
        hasBack: true,
        onClickInMobile: handleShowPoint,
      },
      { label: '쿠폰', linkTo: '/my/coupon', hasBack: true },
      {
        label: '쿠폰 등록',
        linkTo: '/my/edit/coupon',
        hasBack: true,
        backRoute: '/my/coupon',
        inVisible: true,
      },
    ],
  },
];

const MyCategory = ({ className }: MyCategoryProps) => {
  const router = useRouter();
  const replacedPathname = useGetReplacedPathname();

  return (
    <MyCategoryStyled className={clsx('MyCategory', className)}>
      <h2>마이페이지</h2>
      {myItemList.map(v => (
        <div className="my-item-list" key={v.label}>
          <div className="list-label">{v.label}</div>
          {v.children
            .filter(v => !v.inVisible)
            .map(k => (
              <div
                className={clsx(
                  'list-child',
                  (replacedPathname.startsWith(k.linkTo) ||
                    (replacedPathname.includes('/my/order-history') &&
                      k.tailRoute &&
                      replacedPathname.includes(k.tailRoute))) &&
                    'active',
                )}
                key={k.label}
                onClick={() => router.push(k.linkTo)}
              >
                {k.label}
              </div>
            ))}
        </div>
      ))}
    </MyCategoryStyled>
  );
};

export default MyCategory;
