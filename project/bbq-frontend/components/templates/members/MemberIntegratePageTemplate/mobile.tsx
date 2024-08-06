import { FC } from 'react';

import Link from 'next/link';

import { Arrow, CheckBox, Container, Divider, Flex, Image, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { COLOR_GRAY, FONTSIZE_13, FONTSIZE_14, FONTSIZE_20 } from '@/constants';

import { Footer, TabBox, Wrapper } from '../components';
import { MemberIntegratePageTemplateComponentProps } from './MemberIntegratePageTemplate';

export const MemberIntegratePageTemplateMobile: FC<MemberIntegratePageTemplateComponentProps> = ({
  agreed,
  setAgreed,
  handleIntegrateButtonClick,
  ...rest
}) => {
  return (
    <Wrapper.Mobile>
      <Container.Mobile>
        <Container.Mobile.Body>
          <Flex.CSC>
            <TabBox.Mobile>
              <Flex.RBC>
                <Flex.RSC>
                  <Image src={'symbols/logo-red-background.svg'} width={42} />
                  <Space.V2 />
                  <Text size={FONTSIZE_20}>로그인</Text>
                </Flex.RSC>
                <Link href="/member/login">
                  <Arrow tail direction="left" size={4} />
                </Link>
              </Flex.RBC>
              <Space.H6 />
              <Text lineHeight={'1.5em'}>
                앗! 기존 BBQ 고객이시네요.
                <br />
                편리하고 원활한 통합앱 이용을 위해 고객님의 아이디 통합이 필요해요!
              </Text>
              <Space.H3 />
              <Text color={COLOR_GRAY} size={FONTSIZE_13} lineHeight={'1.5em'}>
                통합앱의 모든 기능과 혜택을 편리하게 이용하시려면 반드시 아이디 통합을 완료해 주셔야
                해요.
                <br />
                그래야 기존 포인트, 쿠폰도 원활하게 사용하실 수 있어요.
                <br />
                고객님의 정말로 편리한 서비스 이용을 위해서 꼭! 아이디 통합을 완료해 주시면
                감사하겠습니다!
              </Text>
              <Space.H4 />
              <Divider.H1 color={'#c8cde0'} />
              <Space.H4 />
              <Text lineHeight={'1.5em'}>BBQ 회원만의 특별한 혜택을 놓치지 마세요!</Text>
              <Space.H3 />
              <Text color={COLOR_GRAY} size={FONTSIZE_13} lineHeight={'1.5em'}>
                ➀ BBQ의 다양한 이벤트에서 빠르게 혜택을 받을 수 있어요.
                <br />
                ➁ 주문한 금액에 비례해서 포인트가 적립돼요.
                <br />➂ 생일이나 기념일 같은 특별한 날에는 특별한 쿠폰으로 더 즐겁게 주문할 수
                있어요.
              </Text>
              <Space.H4 />
              <Divider.H1 color={'#c8cde0'} />
              <Space.H4 />
              <Flex.RSC layout="auto 1">
                <CheckBox.Mobile
                  checked={agreed}
                  onClick={() => {
                    setAgreed(!agreed);
                  }}
                />
                <Flex.RSC
                  layout="auto 1 auto"
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <Space.V1_5 />
                  <Link href="https://static.bbqorder.co.kr/html/terms_of_use.html">
                    <Text size={FONTSIZE_14} color={COLOR_GRAY}>
                      ID 통합와 관한 약관 동의 (필수)
                    </Text>
                  </Link>
                  <Arrow direction="right" size={3} color={COLOR_GRAY} />
                </Flex.RSC>
              </Flex.RSC>
              <Space.H4 />
              <Button.Mobile
                disabled={!agreed}
                full
                text="통합하기"
                color="red"
                shape={'round'}
                style={{ height: 51 }}
                onClick={handleIntegrateButtonClick}
              />
            </TabBox.Mobile>
            <Space.H5 />
            <Footer.Mobile />
            <Space.H4 />
          </Flex.CSC>
        </Container.Mobile.Body>
      </Container.Mobile>
    </Wrapper.Mobile>
  );
};
