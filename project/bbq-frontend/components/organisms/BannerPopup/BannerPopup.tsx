import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Link from 'next/link';

import classNames from 'classnames';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import styled from 'styled-components';
import { Autoplay, Pagination } from 'swiper';

import { CheckBox, Flex, Image, Space, Text } from '@/components/atoms';
import { COLOR_WHITE, FONTSIZE_14 } from '@/constants';
import { PopupBanner } from '@/types';

export interface BannerPopupProps {
  popupBanner: PopupBanner[];
}

export interface BannerPopupComponentProps extends BannerPopupProps {
  className?: string;
}

export const BannerPopup: FC<BannerPopupComponentProps> = ({ popupBanner, className, ...rest }) => {
  const [visible, setVisible] = useState<boolean | undefined>();
  const [noMoreTodayChecked, setNoMoreTodayChecked] = useState<boolean>(false);

  useEffect(() => {
    const nomore = parseCookies()['_hpu'] === '1';
    if (nomore) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <FixedWrapper>
      <Wrapper className={classNames(className)} {...rest}>
        <Swiper
          slidesPerView={1}
          centeredSlides={false}
          slidesPerGroupSkip={1}
          loop
          autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
          modules={[Pagination, Autoplay]}
          pagination={{
            type: 'fraction',
          }}
        >
          {popupBanner.map(v => (
            <SwiperSlide key={v.id}>
              <Link href={v.webUrl}>
                <Image src={v.imageUrl} width={'100%'} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <Foot>
          <Flex.RSC
            onClick={() => {
              setNoMoreTodayChecked(!noMoreTodayChecked);
            }}
            style={{ cursor: 'pointer', padding: 15 }}
          >
            <CheckBox.Mobile theme={'dark'} checked={noMoreTodayChecked} onClick={() => {}} />
            <Space.V0_5 />
            <Text color={COLOR_WHITE} weight={400} size={FONTSIZE_14}>
              오늘 그만보기
            </Text>
          </Flex.RSC>
          <div
            onClick={() => {
              if (noMoreTodayChecked) {
                setCookie(null, '_hpu', '1', {
                  maxAge: 60 * 60 * 24,
                  path: '/',
                });
              } else {
                destroyCookie(null, '_hpu', {
                  path: '/',
                });
              }
              setVisible(false);
            }}
            style={{ cursor: 'pointer', padding: 15 }}
          >
            <Text color={COLOR_WHITE} weight={600} size={FONTSIZE_14}>
              닫기
            </Text>
          </div>
        </Foot>
      </Wrapper>
    </FixedWrapper>
  );
};

const FixedWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  max-width: 100%;
  width: 100vw;
  max-height: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10000;

  .swiper-pagination {
    position: absolute;
    font-size: 12px;
    font-weight: 500;
    z-index: 1;
    color: white;
    bottom: 10px !important;
    border-radius: 20px;
    padding: 4px 8px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const Wrapper = styled.div`
  border-radius: 10px;
  overflow: hidden;
  position: fixed;
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.25);
  left: 50vw;
  top: 50vh;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: calc(100vw - 40px);
  max-width: 650px;
`;

const Foot = styled.div`
  display: flex;

  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  background-color: #221a18;
`;
