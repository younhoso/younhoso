'use client';

import { Disclosure, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styled from 'styled-components';

import ContentIcon from '../public/icons/menu/content.svg';
import CouponIcon from '../public/icons/menu/coupon.svg';
import DashboardIcon from '../public/icons/menu/dashboard.svg';
import MallIcon from '../public/icons/menu/mall.svg';
import MenuIcon from '../public/icons/menu/menu.svg';
import OrderIcon from '../public/icons/menu/order.svg';
import PointIcon from '../public/icons/menu/point.svg';

interface Navigation {
  id: number;
  name: string;
  href?: string;
  logo?: React.ReactNode;
  active?: boolean;
  children?: {
    name: string;
    href: string;
    active: boolean;
  }[];
}

export default function Sidebar() {
  const pathname = usePathname();
  const [openDisclosureIndex, setOpenDisclosureIndex] = useState<number>(-1);
  const [navigation, setNavigation] = useState<Navigation[]>([
    {
      id: 1,
      name: '대시보드',
      href: '/',
      logo: (
        <DashboardIcon
          className="group-[&.active]:brightness-200 group-hover:brightness-0"
          width={24}
          height={24}
        />
      ),
      active: false,
    },
    {
      id: 2,
      name: '주문 관리',
      logo: (
        <OrderIcon
          className="group-[&.active]:brightness-200 group-hover:brightness-0"
          width={24}
          height={24}
        />
      ),
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
      id: 3,
      name: '매장 관리',
      logo: (
        <MallIcon
          className="group-[&.active]:brightness-200 group-hover:brightness-0"
          width={24}
          height={24}
        />
      ),
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
      id: 4,
      name: '메뉴 관리',
      logo: (
        <MenuIcon
          className="group-[&.active]:brightness-200 group-hover:brightness-0"
          width={24}
          height={24}
        />
      ),
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
          name: 'E-쿠폰 메뉴 등록',
          href: '/menu/e-coupon-menu',
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
      id: 5,
      name: '쿠폰 관리',
      logo: (
        <CouponIcon
          className="group-[&.active]:brightness-200 group-hover:brightness-0"
          width={24}
          height={24}
        />
      ),
      active: false,
      children: [
        // {
        //   name: '대시보드',
        //   href: '/coupon',
        //   active: false
        // },
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
      ],
    },
    {
      id: 6,
      name: '고객 관리',
      logo: <UserCircleIcon width={24} height={24} />,
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
        // {
        //   name: '푸시 발송',
        //   href: '/customer/push',
        //   active: false
        // },
        {
          name: '문의하기',
          href: '/customer/consult',
          active: false,
        },
        {
          name: '푸시 발송',
          href: '/customer/push',
          active: false,
        },
        {
          name: '찾아가는 치킨릴레이',
          href: '/customer/chicken',
          active: false,
        },
        // {
        //   name: '고객의소리',
        //   href: '/customer/voice',
        //   active: false
        // }
      ],
    },
    {
      id: 7,
      name: '콘텐츠 관리',
      logo: (
        <ContentIcon
          className="group-[&.active]:brightness-200 group-hover:brightness-0"
          width={24}
          height={24}
        />
      ),
      active: false,
      children: [
        // {
        //   name: '주문앱 배너 관리',
        //   href: '/content/app/banner',
        //   active: false
        // },
        // {
        //   name: '자사몰 배너 관리',
        //   href: '/content/mall/banner',
        //   active: false
        // },
        // {
        //   name: '주문앱 게시물 관리',
        //   href: '/content/app/board',
        //   active: false
        // },
        // {
        //   name: '자사몰 게시물 관리',
        //   href: '/content/mall/board',
        //   active: false
        // }
        {
          name: '공지사항',
          href: '/content/notice',
          active: false,
        },
        {
          name: '이벤트',
          href: '/content/event',
          active: false,
        },
        {
          name: '메인배너',
          href: '/content/mainbanner',
          active: false,
        },
        {
          name: '앱 로딩 화면 수정',
          href: '/content/apploading',
          active: false,
        },
        {
          name: '팝업',
          href: '/content/popup',
          active: false,
        },
      ],
    },
    {
      id: 8,
      name: '제휴포인트 관리',
      logo: (
        <PointIcon
          className="group-[&.active]:brightness-200 group-hover:brightness-0"
          width={24}
          height={24}
        />
      ),
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
      id: 9,
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
          name: '관리자 등록',
          href: '/admin/register',
          active: false,
        },
      ],
    },
  ]);
  const updateActiveTab = () => {
    // 'pathname' 값을 변경할 수 있는 새로운 변수에 복사
    let modifiedPathname = pathname;

    // 'modifiedPathname'이 null이 아닌 경우에만 실행
    if (modifiedPathname) {
      // '/edit'로 끝나는지 확인하고, 그렇다면 제거
      if (modifiedPathname.endsWith('/edit')) {
        modifiedPathname = modifiedPathname.slice(0, -5);
      }
    }

    const updatedNavigation = navigation.map((item, index) => {
      if (item.href && item.href === modifiedPathname) {
        return { ...item, active: true };
      } else if (item.children) {
        const updatedChildren = item.children.map((child, index) => {
          if (child.href && child.href === modifiedPathname) {
            setOpenDisclosureIndex(item.id - 1);
            return { ...child, active: true };
          } else {
            return { ...child, active: false };
          }
        });
        const hasActiveChild = updatedChildren.some(child => child.active);
        return { ...item, active: hasActiveChild, children: updatedChildren };
      } else {
        return { ...item, active: false };
      }
    });
    setNavigation(updatedNavigation);
  };
  const handleDisclosureButtonClick = (index: number) => {
    setOpenDisclosureIndex(prevIndex => (prevIndex === index ? -1 : index));
  };

  useEffect(() => {
    updateActiveTab();
  }, [pathname]);

  return (
    <aside
      id="logo-sidebar"
      className="w-sidebar min-h-[100vh] border-r border-gray-200"
      aria-label="Sidebar"
    >
      <div className="h-full pb-4 overflow-y-auto bg-gray-200">
        <ul className="font-medium">
          {navigation.map((data, index) => {
            return (
              <Disclosure key={index} defaultOpen={data.active}>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className="w-sidebar block"
                      onClick={() => handleDisclosureButtonClick(index)}
                    >
                      <li key={index}>
                        <a
                          className={`${
                            data.active ? 'active bg-[#f8f9fd]' : null
                          } flex items-center text-gray-900 bg-white group border-b pr-3 hover:bg-[#f8f9fd]`}
                          href={data.href}
                        >
                          <div
                            className={`p-5
                            text-gray-500 group-hover:text-black ${
                              data.active
                                ? 'bg-red-500 font-bold text-white group-hover:text-white hover:text-white'
                                : 'group-hover:bg-[#eef0f5]'
                            }`}
                          >
                            {data.logo}
                          </div>
                          <span className="ml-3">{data.name}</span>
                          {data.href ? (
                            <ChevronRightIcon className="ml-auto" width={20} />
                          ) : open ? (
                            <ChevronUpIcon className="ml-auto" width={20} />
                          ) : (
                            <ChevronDownIcon className="ml-auto" width={20} />
                          )}
                        </a>
                      </li>
                    </Disclosure.Button>
                    <Transition
                      show={openDisclosureIndex === index}
                      className="overflow-hidden"
                      enter="transition transition-[max-height] duration-400 ease-in"
                      enterFrom="transform max-h-0"
                      enterTo="transform max-h-screen"
                      leave="transition transition-[max-height] duration-400 ease-out"
                      leaveFrom="transform max-h-screen"
                      leaveTo="transform max-h-0"
                    >
                      <Disclosure.Panel static>
                        {data.children?.map((child, index) => {
                          return (
                            <IsActive key={index} {...(child.active && { className: 'isActive' })}>
                              <a
                                className={`flex items-center text-gray-900 bg-tremor-brand-emphasis border-b pr-3 hover:font-bold ${
                                  child.active ? 'bg-red-500 font-bold' : ''
                                }`}
                                href={child.href}
                              >
                                <span className="p-5 ml-3 flex-1 ml-[70px]">
                                  <span className="bb-l">{child.name}</span>
                                </span>
                              </a>
                            </IsActive>
                          );
                        })}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export const IsActive = styled.li`
  &.isActive {
    .bb-l {
      border-bottom: 2px solid #46477a;
    }
  }
  &:not(.isActive) {
    .bb-l {
      color: #8e93ad;
    }
  }
`;
