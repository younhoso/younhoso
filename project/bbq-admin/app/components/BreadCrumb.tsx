'use client';

import {
  ChevronRightIcon,
  Cog8ToothIcon,
  TruckIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Flex, Text } from '@tremor/react';
import { useEffect, useState } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import dayjs from 'dayjs';

import ContentIcon from '../../public/icons/menu/content.svg';
import CouponIcon from '../../public/icons/menu/coupon.svg';
import DashboardIcon from '../../public/icons/menu/dashboard.svg';
import MallIcon from '../../public/icons/menu/mall.svg';
import MenuIcon from '../../public/icons/menu/menu.svg';
import OrderIcon from '../../public/icons/menu/order.svg';
import PointIcon from '../../public/icons/menu/point.svg';

export default function BreadCrumb() {
  const today = dayjs(new Date()).format('YYYY-MM-DD');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [breadCrumb, setBreadCrumb] = useState<{
    category: string;
    subCategory: string;
    icon: React.ReactNode;
  }>({
    category: '',
    subCategory: '',
    icon: null,
  });
  const iconFilter = {
    filter:
      'brightness(0) saturate(100%) invert(37%) sepia(26%) saturate(708%) hue-rotate(200deg) brightness(91%) contrast(88%)',
  };

  const navigation = [
    {
      name: '대시보드',
      href: '/',
      logo: <DashboardIcon style={iconFilter} width={24} height={24} />,
      active: false,
    },
    {
      name: '주문 관리',
      logo: <OrderIcon style={iconFilter} width={24} height={24} />,
      active: false,
      children: [
        {
          name: '대시보드',
          href: '/order',
          active: false,
        },
        {
          name: '주문 리스트',
          href: '/order/list',
          active: false,
        },
        {
          name: '모바일 쿠폰 조회',
          href: '/coupon/mobile-coupon',
          active: false,
        },
      ],
    },
    {
      name: '매장 관리',
      logo: <MallIcon style={iconFilter} width={24} height={24} />,
      active: false,
      children: [
        {
          name: '대시보드',
          href: '/mall',
          active: false,
        },
        {
          name: '매장 리스트',
          href: '/mall/list',
          active: false,
        },
      ],
    },
    {
      name: '메뉴 관리',
      logo: <MenuIcon style={iconFilter} width={24} height={24} />,
      active: false,
      children: [
        {
          name: '대시보드',
          href: '/menu',
          active: false,
        },
        {
          name: '메뉴 리스트',
          href: '/menu/list',
          active: false,
        },
        {
          name: '메뉴 등록',
          href: '/menu/register',
          active: false,
        },
        {
          name: '메뉴 수정',
          href: '/menu/register/edit',
          active: false,
        },
        {
          name: 'E-쿠폰 메뉴 등록',
          href: '/menu/e-coupon-menu',
          active: false,
        },
        {
          name: 'E-쿠폰 메뉴 수정',
          href: '/menu/e-coupon-menu/edit',
          active: false,
        },
        {
          name: '메뉴 수정',
          href: '/menu/edit',
          active: false,
        },
        {
          name: '카테고리 리스트',
          href: '/menu/category',
          active: false,
        },
        {
          name: '옵션 리스트',
          href: '/menu/option',
          active: false,
        },
      ],
    },
    {
      name: '쿠폰 관리',
      logo: <CouponIcon style={iconFilter} width={24} height={24} />,
      active: false,
      children: [
        {
          name: '대시보드',
          href: '/coupon',
          active: false,
        },
        {
          name: '쿠폰 리스트',
          href: '/coupon/list',
          active: false,
        },
        {
          name: '쿠폰 등록',
          href: '/coupon/register',
          active: false,
        },
        {
          name: '쿠폰 수정',
          href: '/coupon/edit',
          active: false,
        },
      ],
    },
    {
      name: '고객 관리',
      logo: <UserCircleIcon className="text-[#595a88]" width={24} height={24} />,
      active: false,
      children: [
        {
          name: '대시보드',
          href: '/customer',
          active: false,
        },
        {
          name: '고객 리스트',
          href: '/customer/list',
          active: false,
        },
        {
          name: '고객 상세',
          href: '/customer/detail',
          active: false,
        },
        {
          name: '자동 푸시 수정',
          href: '/customer/push/auto',
          active: false,
        },
        {
          name: '수동 푸시 발송',
          href: '/customer/push/manual',
          active: false,
        },
        {
          name: '푸시 발송',
          href: '/customer/push',
          active: false,
        },
        {
          name: '푸시 발송',
          href: '/customer/push/list',
          active: false,
        },
        {
          name: '푸시 발송',
          href: '/customer/push/detail',
          active: false,
        },
        {
          name: '문의하기 리스트',
          href: '/customer/consult',
          active: false,
        },
        {
          name: '고객의소리',
          href: '/customer/voice',
          active: false,
        },
        {
          name: '찾아가는 치킨릴레이 리스트',
          href: '/customer/chicken',
          active: false,
        },
        {
          name: '찾아가는 치킨릴레이 상세',
          href: '/customer/chicken/detail',
          active: false,
        },
      ],
    },
    {
      name: '콘텐츠 관리',
      logo: <ContentIcon width={24} height={24} />,
      active: false,
      children: [
        {
          name: '주문앱 배너 관리',
          href: '/content/app/banner',
          active: false,
        },
        {
          name: '자사몰 배너 관리',
          href: '/content/mall/banner',
          active: false,
        },
        {
          name: '주문앱 게시물 관리',
          href: '/content/app/board',
          active: false,
        },
        {
          name: '자사몰 게시물 관리',
          href: '/content/mall/board',
          active: false,
        },
        {
          name: '주문앱 게시물 관리',
          href: '/content/app/board/write',
          active: false,
        },
        {
          name: '자사몰 게시물 관리',
          href: '/content/mall/board/write',
          active: false,
        },
        {
          name: '자사몰 게시물 관리',
          href: '/content/mall/board',
          active: false,
        },
        {
          name: '주문앱 게시물 관리',
          href: '/content/app/board/detail',
          active: false,
        },
        {
          name: '자사몰 게시물 관리',
          href: '/content/mall/board/detail',
          active: false,
        },
        {
          name: '공지사항 리스트',
          href: '/content/notice',
          active: false,
        },
        {
          name: '공지사항 등록',
          href: '/content/notice/write',
          active: false,
        },
        {
          name: '공지사항 상세',
          href: '/content/notice/detail',
          active: false,
        },
        {
          name: '이벤트 리스트',
          href: '/content/event',
          active: false,
        },
        {
          name: '이벤트 등록',
          href: '/content/event/write',
          active: false,
        },
        {
          name: '이벤트 상세',
          href: '/content/event/detail',
          active: false,
        },
        {
          name: '메인배너',
          href: '/content/mainbanner',
          active: false,
        },
        {
          name: '메인배너 등록',
          href: '/content/mainbanner/register',
          active: false,
        },
        {
          name: '팝업',
          href: '/content/popup',
          active: false,
        },
        {
          name: '팝업 등록',
          href: '/content/popup/register',
          active: false,
        },
        {
          name: '앱 로딩 화면 수정',
          href: '/content/apploading',
          active: false,
        },
      ],
    },
    {
      name: '제휴포인트 관리',
      logo: <PointIcon width={24} height={24} />,
      active: false,
      children: [
        {
          name: '해피포인트',
          href: '/point/happypoint',
          active: false,
        },
      ],
    },
    {
      id: 8,
      name: '관리자 관리',
      logo: (
        <Cog8ToothIcon
          className="group-[&.active]:brightness-200 group-hover:brightness-0"
          width={24}
          height={24}
        />
      ),
      active: false,
      children: [
        {
          name: '관리자 리스트',
          href: '/admin',
          active: false,
        },
        {
          name: '공용 허용 IP',
          href: '/admin/publicIpAdd',
          active: false,
        },
        {
          name: '공용 허용 IP 수정',
          href: '/admin/publicIpAdd/edit',
          active: false,
        },
        {
          name: '관리자 상세',
          href: '/admin/detail',
          active: false,
        },
        {
          name: '관리자 등록',
          href: '/admin/register',
          active: false,
        },
      ],
    },
  ];

  const getBreadCrumb = () => {
    navigation.forEach(item => {
      if (item.href === pathname) {
        setBreadCrumb({
          category: item.name,
          subCategory: '',
          icon: item.logo,
        });
        return;
      }
      if (item.children) {
        item.children.forEach(childItem => {
          if (childItem.href === pathname) {
            setBreadCrumb({
              category: item.name,
              subCategory: childItem.name,
              icon: item.logo,
            });
            return;
          }
        });
      }
    });
  };

  useEffect(() => {
    getBreadCrumb();
  }, [pathname]);

  return (
    <Flex justifyContent="start" className="min-w-[1560px] mb-10">
      <Flex
        alignItems="center"
        justifyContent="center"
        className="w-[50px] h-[50px] bg-[#eef0f5] rounded-2xl mr-3 shadow-xl"
      >
        {breadCrumb.icon}
      </Flex>
      <Text
        className={`${
          breadCrumb.subCategory ? 'text-gray-400' : 'font-bold'
        } !text-lg text-[#8E93AD]`}
      >
        {breadCrumb.category}
      </Text>
      {breadCrumb.subCategory && (
        <>
          <ChevronRightIcon className="text-gray-400 w-[13px] mx-3" />
          <Text className="font-bold text-gray-700 !text-lg text-[#46477A]">
            {searchParams?.get('id')
              ? breadCrumb.subCategory.replace('등록', '수정')
              : breadCrumb.subCategory}
          </Text>
        </>
      )}
      <Text className="ml-auto">Date. {today}</Text>
    </Flex>
  );
}
