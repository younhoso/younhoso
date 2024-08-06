import { FC } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { Box, CheckBox, Divider, Flex, Grid, Image, Space, Text } from '@/components/atoms';
import {
  COLOR_DIVIDER,
  FONTSIZE_13,
  FONTSIZE_14,
  FONTSIZE_15,
  FONTSIZE_17,
  FONTSIZE_20,
  FONTSIZE_24,
  HEADER_HEIGHT,
  PLANCK,
} from '@/constants';

import { MemberJoinCompletePageTemplateComponentProps } from './MemberJoinCompletePageTemplate';

export const MemberJoinCompletePageTemplateMobile: FC<
  MemberJoinCompletePageTemplateComponentProps
> = ({ name, phoneNumber, email, birth, agreeMarketing, setAgreeMarketing, ...rest }) => {
  const router = useRouter();

  return (
    <Wrapper>
      <Flex.CCC>
        <Space.H6 />
        <Text size={FONTSIZE_20}>회원가입 완료</Text>
        <Space.H2 />
        <Text size={FONTSIZE_20}>반가워요, {name ? name : `OOO`}님!</Text>
        <Space.H6 />
        <Divider.H1 />
        <Grid columnCount={2}>
          <Box
            padding={PLANCK * 2}
            style={{
              borderRight: `1px solid ${COLOR_DIVIDER}`,
              borderBottom: `1px solid ${COLOR_DIVIDER}`,
            }}
          >
            <Text color={'#8a816e'} size={FONTSIZE_13}>
              이름
            </Text>
            <Space.H3 />
            <Text align="right" size={FONTSIZE_15}>
              {name ? name : `정보 없음`}
            </Text>
          </Box>
          <Box
            padding={PLANCK * 2}
            style={{
              borderBottom: `1px solid ${COLOR_DIVIDER}`,
            }}
          >
            <Text color={'#8a816e'} size={FONTSIZE_13}>
              연락처
            </Text>
            <Space.H3 />
            <Text align="right" size={FONTSIZE_15}>
              {phoneNumber ? phoneNumber : `정보 없음`}
            </Text>
          </Box>
          <Box
            padding={PLANCK * 2}
            style={{
              borderRight: `1px solid ${COLOR_DIVIDER}`,
            }}
          >
            <Text color={'#8a816e'} size={FONTSIZE_13}>
              이메일
            </Text>
            <Space.H3 />
            <Text align="right" size={FONTSIZE_15}>
              {email ? email : `정보 없음`}
            </Text>
          </Box>
          <Box padding={PLANCK * 2}>
            <Text color={'#8a816e'} size={FONTSIZE_13}>
              생일
            </Text>
            <Space.H3 />
            <Text align="right" size={FONTSIZE_15}>
              {birth ? birth : `정보 없음`}
            </Text>
          </Box>
        </Grid>
        <Divider.H1 />
        <Space.H8 />
        <Text size={FONTSIZE_17} align="center" lineHeight={'1.5em'}>
          웰컴 쿠폰 선물이에요!
          <br />
          따뜻하게 환영해요, 고객님!
        </Text>
        <Space.H3 />
        <Text size={FONTSIZE_14} align="center" lineHeight={'1.5em'} color={'#7a7469'}>
          첫 가입하시는 분들께, 웰컴쿠폰을 선물로 드려요.
          <br />
          맛있는 치킨과 함께 멋진 치킨라이프를 시작해 보세요!
          <br />
          여기, 감사의 마음을 담아 반갑게 맞이할게요!
        </Text>
        <Space.H5 />
        <div style={{ position: 'relative' }}>
          <CouponTicketShadow />
          <Image
            src="member/join/welcome-ticket.png"
            width="90%"
            style={{
              position: 'relative',
              zIndex: 2,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
        </div>
        <Space.H10 />
        <GoToMainButton onClick={() => router.push('/')}>메인으로</GoToMainButton>
        <Space.H8 />
        <Image src="member/join/background.png" width="90%" />
      </Flex.CCC>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #f9f6ef;
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
`;

const AgreeMarketingBox = styled.div`
  height: 36px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CouponTicketShadow = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  width: 85%;
  height: 50px;
  background-color: black;
  filter: blur(20px);
`;

const MyCouponBookButton = styled.div`
  width: 112px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: black;
  font-weight: 500;
  line-height: 1em;
  cursor: pointer;
`;

const GoToMainButton = styled.div`
  width: 320px;
  height: 45px;
  background-color: #e52143;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  color: white;
  font-weight: 500;
  line-height: 1em;
  cursor: pointer;
`;
