import { FC, Fragment, useMemo } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import classNames from 'classnames';
import styled from 'styled-components';
import { UrlObject } from 'url';

import { Space } from '@/components/atoms';
import { COLOR_BLACK, COLOR_PRIMARY } from '@/constants';
import { useQueryParams } from '@/hooks';

import { HeaderProps } from '../../Header';

interface HeaderCenterSectionComponentProps extends HeaderProps {
  className?: string;
  [x: string]: any;
}

const HeaderCenterSection: FC<HeaderCenterSectionComponentProps> = ({ className, ...rest }) => {
  const { keepParams } = useQueryParams();
  const router = useRouter();

  const menus = useMemo<{ name: string; href: UrlObject }[]>(() => {
    return [
      {
        name: '메뉴',
        href: keepParams('/categories/1'),
      },
      {
        name: '매장 찾기',
        href: {
          pathname: `/stores/map`,
          query: {
            ...(router.pathname.startsWith('/cart') || router.pathname.startsWith('/checkout')
              ? { redirect_to: router.asPath }
              : {}),
          },
        },
      },
      {
        name: '이벤트',
        href: { pathname: '/events' },
      },
      {
        name: '비비큐 스토리',
        href: { pathname: '/story/videos' },
      },
    ];
  }, [router.pathname, router.asPath]);

  //
  return (
    <Wrapper className={classNames(className)} {...rest}>
      <Menu>
        {menus.map((menu, index, arr) => (
          <Fragment key={`header-menu-${menu.name}--${index}`}>
            <MenuItem
              href={menu.href}
              highlighted={
                router.pathname.startsWith(`/${menu.href.pathname!.split('/')[1]}`)
                  ? 'true'
                  : 'false'
              }
            >
              {menu.name}
            </MenuItem>
            {index < arr.length - 1 && <Space.V12 />}
          </Fragment>
        ))}
      </Menu>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Menu = styled.div`
  display: flex;
`;

const MenuItem = styled(Link)<{ highlighted: 'true' | 'false' }>`
  font-size: 18px;
  font-weight: 700;
  line-height: 1em;
  cursor: pointer;
  color: ${props => (props.highlighted === 'true' ? COLOR_PRIMARY : COLOR_BLACK)};
`;

export default HeaderCenterSection;
