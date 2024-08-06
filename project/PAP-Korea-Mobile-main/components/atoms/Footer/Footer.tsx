import { useState } from 'react';
import { Transition } from 'react-transition-group';

import Link from 'next/link';

import { FooterStyled } from './styled';

import clsx from 'clsx';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const [hover, setHover] = useState(-1);

  const clearHover = () => {
    setHover(-1);
  };

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
        <div
          className="Group"
          // style={
          //   hover == 0 ? { left: '80%' } : hover == 2 ? { left: '10%' } : {}
          // }
        >
          {/* <p onMouseOver={() => setHover(0)} onMouseOut={clearHover}> */}
          <p>
            <Link href={'/about'}>ABOUT</Link>
          </p>
          {/* <div style={{ minWidth: '2.5rem' }} /> */}
          {/* <p onMouseOver={() => setHover(1)} onMouseOut={clearHover}> */}
          <p>
            <Link href={'/contact'}>CONTACT</Link>
          </p>
          {/* <div style={{ minWidth: '2.5rem' }} /> */}
          {/* <p onMouseOver={() => setHover(2)} onMouseOut={clearHover}> */}
          <p>
            <Link href={'/business'}>BUSINESS</Link>
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
