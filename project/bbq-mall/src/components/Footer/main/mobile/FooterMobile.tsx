'use client';

import Image from 'next/image';

import clsx from 'clsx';

import logoWhite from '@/assets/images/footer/logo-white.svg';
import { MOBILE_FOOTER_INFO } from '@/constant/footerInfo';
import { handle개인정보처리방침, handle이용안내, handle이용약관 } from '@/hooks/useHandleWebview';

import { FooterMobileStyled } from './styled';

export interface FooterMobileProps {
  className?: string;
}

const FooterMobile = ({ className }: FooterMobileProps) => {
  return (
    <FooterMobileStyled className={clsx('FooterMobile', className)}>
      <div className="footer-mobile-files">
        <div onClick={handle이용약관}>이용약관</div>
        <div onClick={handle개인정보처리방침}>개인정보처리방침</div>
        <div onClick={handle이용안내}>이용안내</div>
      </div>
      <Image
        src={logoWhite}
        alt="footer-logo"
        width={63}
        height={28}
        className="footer-mobile-logo"
      />

      <div className="footer-mobile-description">
        {MOBILE_FOOTER_INFO.map(v => (
          <div key={v}>{v}</div>
        ))}
      </div>

      <div className="footer-mobile-comments">
        <div>COPYRIGHT © 2024 GENESIS BBQ 온라인 공식쇼핑몰</div>
        <div>
          모든 제작물의 저작권은 당사에 있으며, 무단 복제나 도용은 저작권법(97조 5항)에 의해
          금지되어 있습니다. 이를 위반시 처벌을 받을 수 있습니다.
        </div>
      </div>
    </FooterMobileStyled>
  );
};

export default FooterMobile;
