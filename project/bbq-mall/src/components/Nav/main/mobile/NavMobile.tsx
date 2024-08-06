'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { useRecoilValue } from 'recoil';

import hamburger from '@/assets/images/header/hamburger.svg';
import hamburgerActive from '@/assets/images/nav/hamburger-active.svg';
import homeIcon from '@/assets/images/nav/home.svg';
import myIconActive from '@/assets/images/nav/my-active.svg';
import myIcon from '@/assets/images/nav/my.svg';
import paperIconActive from '@/assets/images/nav/paper-active.svg';
import paperIcon from '@/assets/images/nav/paper.svg';
import starIconActive from '@/assets/images/nav/star-active.svg';
import starIcon from '@/assets/images/nav/star.svg';
import { useGetReplacedPathname } from '@/hooks/useGetReplacedPathname';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { isNotWebviewStore } from '@/stores/isNotWebview';

import { NavMobileStyled } from './styled';

export interface NavMobileProps {
  className?: string;
}

const NavMobile = ({ className }: NavMobileProps) => {
  const router = useRouter();
  const replacedPathname = useGetReplacedPathname();
  const { isSignIn } = useHandleIsSignIn();
  const isNotWebview = useRecoilValue(isNotWebviewStore);

  const navItems = [
    {
      label: '카테고리',
      icon: hamburger,
      activeIcon: hamburgerActive,
      onClick: () => router.push('/search/category'),
      // active: replacedPathname.startsWith('/category'),
    },
    {
      label: '이벤트',
      icon: starIcon,
      activeIcon: starIconActive,
      onClick: () => router.push('/event/ing'),
      active: replacedPathname.startsWith('/event'),
    },
    {
      label: 'HOME',
      icon: homeIcon,
      onClick: () => router.push('/'),
      main: true,
    },
    {
      label: '마이페이지',
      icon: myIcon,
      activeIcon: myIconActive,
      onClick: () => (isSignIn ? router.push('/my/info') : router.push('/my/sign')),
      active: ['/my/info', '/my/sign'].includes(replacedPathname),
    },
    {
      label: '주문내역',
      icon: paperIcon,
      activeIcon: paperIconActive,
      onClick: () =>
        isSignIn ? router.push('/my/order-history/list/all') : router.push('/my/sign'),
      active: replacedPathname.startsWith('/my/order-history/list/all'),
    },
  ];

  if (!(navItems.some(v => v.active) || replacedPathname === '')) {
    return null;
  }

  return (
    <NavMobileStyled className={clsx('NavMobile', className, isNotWebview && 'not-webview')}>
      <div className="nav-wrapper">
        {navItems.map(v => (
          <div
            key={v.label}
            className={clsx('nav-item', v.main && 'main', v.active && 'active')}
            onClick={v.onClick}
          >
            <Image
              src={v.active ? v.activeIcon : v.icon}
              alt={`${v.label}-icon`}
              width={28}
              height={28}
            />
            <div className="nav-item-title">{v.label}</div>
          </div>
        ))}
      </div>
    </NavMobileStyled>
  );
};

export default NavMobile;
