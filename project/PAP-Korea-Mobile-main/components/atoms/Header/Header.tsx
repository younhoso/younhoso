import { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useGet } from '~/apis';
import face from '~/assets/icon/face60.png';
import insta from '~/assets/icon/insta60.png';
import logo from '~/assets/icon/logo.svg';
import search from '~/assets/icon/search.svg';
import tik from '~/assets/icon/tik60.png';
import youtube from '~/assets/icon/youtube60.png';
import SearchBar from '~/components/templates/SearchBar';
import { addClass, removeClass } from '~/utils';
import { numberToRem } from '~/utils/rem';

import Img from '../Img';
import Svg from '../Svg';
import { HeaderStyled } from './styled';

import clsx from 'clsx';

interface HeaderProps {
  className?: string;
  visibility?: any;
}

const menus = [
  { title: 'about', links: '/about' },
  { title: 'contact', links: '/contact' },
  { title: 'business', links: '/business' },
];

const Header = ({ className, visibility }: HeaderProps) => {
  const {
    data: getData,
    isLoading,
    reload,
  } = useGet(`/category/getData`, {
    qs: {
      sort: {
        order: 'DESC',
        createdAt: 'ASC',
      },
    },
  });

  const [menu, setMenu] = useState(false);
  const [snsMenu, setSNSMenu] = useState(false);
  const [opened, setOpened] = useState(false);
  const [searchON, setSearchON] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  const { id }: any = router.query;

  const ChangeMenuOpen = () => {
    const html: any = window.document.querySelector('html');
    if (menu) {
      setMenu(false);
      setSNSMenu(false);
      html.style.overflowY = 'auto';
    } else {
      setMenu(true);
      html.style.overflowY = 'hidden';
    }

    setOpened(true);
  };

  const ChangeSearchOpen = () => {
    setSearchON(!searchON);
  };

  const ChangeSNSMenuOpen = () => {
    setSNSMenu(!snsMenu);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const leftMenusHtml = menus.map((x, i) => (
    <div key={i}>
      <p onClick={ChangeMenuOpen}>
        <Link href={x.links}>{x.title}</Link>
      </p>
    </div>
  ));

  const rightMenusHtml = isLoading
    ? []
    : getData?.map((x: any, i: number) => (
        <div key={i}>
          <p onClick={ChangeMenuOpen}>
            <Link
              href={
                x.customUrl
                  ? `${x.url}`
                  : x.name === 'Film'
                  ? `/filmList`
                  : `/category/${x.name}`
              }
            >
              {x.name}
            </Link>
          </p>
        </div>
      ));

  return (
    <HeaderStyled
      className={clsx(
        'Header',
        opened == true && (menu === true ? 'open' : 'close'),
        id !== undefined && scrollY < 400 && 'transparent',
        router.asPath.includes('/filmList/') && 'importantBlack',
      )}
    >
      <div className="openMenu">
        <div className={clsx('background', menu === true && 'open')} />
        <div className="left">
          <div className={clsx('list', snsMenu && 'open')}>{leftMenusHtml}</div>
          <div className="IconsMenus">
            <div
              className={clsx('menuListsBtn', snsMenu && 'open')}
              onClick={ChangeSNSMenuOpen}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className={clsx('snsList', snsMenu && 'open')}>
              {/* <a
                href="https://www.tiktok.com/@papkorea"
                target="_blank"
                rel="noreferrer"
              >
                <Img src={tik} alt={''} />
              </a> */}
              <a
                href="https://www.youtube.com/channel/UCk4DaLcuFIou28JrZClMhwg"
                target="_blank"
                rel="noreferrer"
              >
                <Img src={youtube} alt={''} />
              </a>
              <a
                href="https://www.facebook.com/PAPMAGAZINEKOREA"
                target="_blank"
                rel="noreferrer"
              >
                <Img src={face} alt={''} />
              </a>
              <a
                href="https://www.instagram.com/pap_korea/"
                target="_blank"
                rel="noreferrer"
              >
                <Img src={insta} alt={''} />
              </a>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="list">{rightMenusHtml}</div>
        </div>
      </div>

      <div className={clsx('bar', searchON && 'SearchOn')}>
        <div className="menu" onClick={ChangeMenuOpen}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div onClick={() => router.push('/')}>
          <Svg
            icon={logo}
            color="white"
            width={numberToRem(120, 1)}
            height={numberToRem(90, 1)}
          />
        </div>

        <div className="search" onClick={ChangeSearchOpen}>
          <Svg
            icon={search}
            color="white"
            width={numberToRem(32, 1)}
            height={numberToRem(32, 1)}
          />
        </div>
      </div>

      {searchON && (
        <SearchBar ChangeSearchOpen={ChangeSearchOpen} searchON={searchON} />
      )}

      <div
        className={clsx('searchBackground', searchON && 'SearchOn')}
        onClick={() => {
          setSearchON(false);
        }}
      ></div>
    </HeaderStyled>
  );
};

export default Header;
