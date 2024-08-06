import { FC } from 'react';

import styled from 'styled-components';

import { Container, Divider, Icon, Image, Space, Text } from '@/components/atoms';
import {
  COLOR_FOOTER_BACKGROUND,
  COLOR_FOOTER_CONTENT,
  FONTSIZE_11,
  FONTSIZE_12,
  FONTSIZE_30,
} from '@/constants';

import { FooterMobile } from './mobile';

export interface FooterProps {}

export interface FooterComponentProps extends FooterProps {}

export const Footer: FC<FooterComponentProps> & {
  Mobile: FC<FooterComponentProps>;
} = ({}) => {
  return (
    <Wrapper>
      <Divider direction="h" />
      <Space.H3 />
      <Container>
        <TopMenu>
          <Text.Link
            href="https://static.bbqorder.co.kr/html/terms_of_use.html"
            color={COLOR_FOOTER_CONTENT}
            size={FONTSIZE_12}
          >
            이용약관
          </Text.Link>
          <Space.V6 />
          <Text.Link
            href="https://static.bbqorder.co.kr/html/privacy_policy.html"
            color={COLOR_FOOTER_CONTENT}
            size={FONTSIZE_11}
          >
            개인정보취급방침
          </Text.Link>
          <Space.V6 />
          <Text.Link
            href="https://static.bbqorder.co.kr/html/location.html"
            color={COLOR_FOOTER_CONTENT}
            size={FONTSIZE_12}
          >
            위치기반서비스
          </Text.Link>
          <Space.V6 />
          <Text.Link href="/faq" color={COLOR_FOOTER_CONTENT} size={FONTSIZE_12}>
            고객센터
          </Text.Link>
        </TopMenu>
      </Container>
      <Space.H3 />
      <Divider direction="h" />
      <Container flexDirection="v">
        <Body>
          <Space.H5 />
          <Image src={'symbols/logo-blue.svg'} width={80} />
          <Space.H7 />
          <Text size={FONTSIZE_30} color={'#281d19'} family={'GmarketSans'} weight={500}>
            1588 9282
          </Text>
          <Space.H4 />
          <Text color={COLOR_FOOTER_CONTENT} size={FONTSIZE_12} lineHeight={'1.75em'}>
            주식회사 제너시스비비큐
            <br />
            주문번호 : 1588-9282 고객센터 : 1588-9282 창업문의 : 080-383-9000
            <br />
            대표자 : 윤경주 서울시 송파구 중대로 64(문정동) 통신판매업신고 : 2010-서울송파-1181
            사업자등록번호 : 207-81-43555
          </Text>
        </Body>
        <Space.H4 />
        <Foot>
          <SNSMenu>
            <Icon.Link
              size={20}
              src={'instagram-blue.svg'}
              href="https://www.instagram.com/bbq_offi"
            />
            <Space.V3 />
            <Icon.Link size={20} src={'naverblog-blue.svg'} href="https://blog.naver.com/blogbbq" />
            <Space.V3 />
            <Icon.Link
              size={20}
              src={'youtube-blue.svg'}
              href="https://www.youtube.com/@bbq_offi"
            />
          </SNSMenu>
          <Space.V5 />
          <Text size={FONTSIZE_11} color={COLOR_FOOTER_CONTENT}>
            © 2019 GENESIS BBQ. All rights reserved.
          </Text>
        </Foot>
      </Container>
      <Space.H5 />
    </Wrapper>
  );
};

Footer.Mobile = FooterMobile;

const Wrapper = styled.div`
  display: block;
  clear: both;
  width: 100%;
  height: 100%;
  background-color: ${COLOR_FOOTER_BACKGROUND};
`;

const TopMenu = styled.div`
  display: flex;
`;

const Body = styled.div`
  display: block;
`;

const Foot = styled.div`
  display: flex;
  align-items: center;
`;

const SNSMenu = styled.div`
  display: flex;
  align-items: center;
`;
