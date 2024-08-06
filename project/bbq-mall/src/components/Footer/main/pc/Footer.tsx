'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import logoWhite from '@/assets/images/footer/logo-white.svg';
import instagram from '@/assets/images/nav/sns-instagram.svg';
import naver from '@/assets/images/nav/sns-naver.svg';
import youtube from '@/assets/images/nav/sns-youtube.svg';
import { PC_FOOTER_INFO } from '@/constant/footerInfo';
import { handle개인정보처리방침, handle이용안내, handle이용약관 } from '@/hooks/useHandleWebview';
import { MultiLevelCategory } from '@/types';

import { FooterStyled } from './styled';

export interface FooterProps {
  className?: string;
  childrenCategoryList?: MultiLevelCategory[];
}

const icons = [
  { value: instagram, link: 'https://www.instagram.com/bbq_offi' },
  { value: youtube, link: 'https://www.youtube.com/@bbq_offi' },
  { value: naver, link: 'https://blog.naver.com/blogbbq' },
];

const Footer = ({ className, childrenCategoryList }: FooterProps) => {
  const router = useRouter();
  return (
    <FooterStyled className={clsx('Footer', className)}>
      <div className="footer-wrapper">
        <div className="footer-category">
          {childrenCategoryList?.map(v => (
            <div className="footer-category-item" key={v.categoryNo}>
              <div className="footer-category-item-label">{v.label}</div>
              <div className="footer-category-item-sub-wrapper">
                <div className="footer-category-item-sub">
                  <span onClick={() => router.push(`/categories/${v.categoryNo}`)}>전체보기</span>
                </div>
                {v.children.map(k => (
                  <div className="footer-category-item-sub" key={k.categoryNo}>
                    <span onClick={() => router.push(`/categories/${v.categoryNo}`)}>
                      {k.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="divider" />
        <div className="footer-description">
          <div className="footer-description-logo-wrapper">
            <Image
              src={logoWhite}
              alt="logo-white"
              width={88}
              height={40}
              className="footer-logo"
            />
            <div className="footer-description-files">
              <div onClick={handle이용약관}>이용약관</div>
              <div onClick={handle개인정보처리방침}>개인정보처리방침</div>
              <div onClick={handle이용안내}>이용안내</div>
            </div>
          </div>

          {PC_FOOTER_INFO.map(k => (
            <div className="footer-description-info" key={k}>
              {k}
            </div>
          ))}

          <div className="footer-description-bottom">
            <div className="footer-description-bottom-comments">
              <div>COPYRIGHT © 2024 GENESIS BBQ 온라인 공식쇼핑몰. ALL RIGHTS RESERVED.</div>
              <div>
                모든 제작물의 저작권은 당사에 있으며, 무단 복제나 도용은 저작권법(97조 5항)에 의해
                금지되어 있습니다. 이를 위반시 처벌을 받을 수 있습니다.
              </div>
            </div>
            <div className="footer-description-bottom-icons">
              {icons.map(v => (
                <Image
                  key={v.value.src}
                  src={v.value.src}
                  alt={`${v.value.key}`}
                  width={30}
                  height={30}
                  onClick={() => window.open(v.link)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </FooterStyled>
  );
};

export default Footer;
