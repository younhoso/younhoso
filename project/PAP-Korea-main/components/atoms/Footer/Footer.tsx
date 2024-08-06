import { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import Link from 'next/link';

import { FooterStyled } from './styled';

import clsx from 'clsx';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const [hover, setHover] = useState(-1);
  const centerRef = useRef(null);
  const groupRef = useRef(null);
  const aboutRef = useRef(null);
  const businessRef = useRef(null);
  const [leftVal, setLeftVal] = useState(0);
  const space = 40;

  const clearHover = (isInit?: boolean) => {
    if (centerRef.current && groupRef.current) {
      const about: any = aboutRef.current;
      const business: any = businessRef.current;

      if (isInit) {
        const left = (about.offsetWidth - business.offsetWidth) / 2;
        (groupRef.current as any).style.left = `calc(50% - ${left}px)`;
      }

      (groupRef.current as any).style.paddingLeft = '0px';
      (groupRef.current as any).style.paddingRight = '0px';
    }
  };
  // useEffect(() => {
  //   const ele = document.querySelector('.Group');
  //   const Rect: any = ele?.getBoundingClientRect();

  //   // setRectr(Rect?.right - Rect?.x);

  //   console.log(Rect);
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      clearHover(true);
    }, 500);
  }, [aboutRef]);

  return (
    <FooterStyled className={clsx('Footer', className)}>
      <div className="FTop">
        <p>SEARCH</p>
        <div>
          <p>
            <a
              href="https://www.instagram.com/pap_korea/"
              target="_blank"
              rel="noreferrer"
            >
              INSTAGRAM
            </a>
          </p>
          <p>
            <a
              href="https://www.facebook.com/PAPMAGAZINEKOREA"
              target="_blank"
              rel="noreferrer"
            >
              FACEBOOK
            </a>
          </p>
          {/* <p>
            <a
              href="https://www.tiktok.com/@papkorea"
              target="_blank"
              rel="noreferrer"
            >
              TIKTOK
            </a>
          </p> */}
          <p>
            <a
              href="https://www.youtube.com/channel/UCk4DaLcuFIou28JrZClMhwg"
              target="_blank"
              rel="noreferrer"
            >
              YOUTUBE
            </a>
          </p>
        </div>
      </div>
      <div className="FCenter">
        <div className="Group" ref={groupRef}>
          <p
            onMouseOver={() => {
              const about: any = aboutRef.current;
              (groupRef.current as any).style.paddingLeft =
                about.offsetWidth + space + 'px';
            }}
            onMouseOut={() => clearHover()}
            ref={aboutRef}
          >
            <Link scroll={false} href={'/about'}>
              ABOUT
            </Link>
          </p>
          <div />
          <p
            onMouseOver={() => setHover(1)}
            onMouseOut={() => clearHover()}
            ref={centerRef}
          >
            <Link scroll={false} href={'/contact'}>
              CONTACT
            </Link>
          </p>

          <div />

          <p
            onMouseOver={() => {
              const business: any = businessRef.current;
              (groupRef.current as any).style.paddingRight =
                9 * 20 + space + business.offsetWidth + 'px';
            }}
            onMouseOut={() => clearHover()}
            ref={businessRef}
          >
            <Link scroll={false} href={'/business'}>
              BUSINESS
            </Link>
          </p>
        </div>
      </div>
      <div className="FBottom">
        <div className="cpinfo">
          <p>주식회사 알타카파</p>
          <p>
            CEO : 강동민 | 개인정보 관리자: 강동민 | 사업자번호 192-88-02644
          </p>
          <p>
            서울특별시 강남구 도산대로24길 17, 3층, PAP코리아{' '}
            <a href="mailto:contact@papkorea.com">contact@papkorea.com</a>
          </p>
        </div>
        <div className="TOS">
          <p>이용약관</p>
          <p>개인정보처리방침</p>
        </div>
      </div>
    </FooterStyled>
  );
};

export default Footer;
