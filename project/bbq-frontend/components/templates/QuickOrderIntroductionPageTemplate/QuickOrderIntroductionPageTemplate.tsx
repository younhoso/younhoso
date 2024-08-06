import { FC } from 'react';

import Link from 'next/link';

import styled from 'styled-components';

import { Arrow, Container, Flex, Image, Space, Text } from '@/components/atoms';
import { COLOR_WHITE, FONTSIZE_16, FONTSIZE_26 } from '@/constants';

import { QuickOrderIntroductionPageTemplateMobile } from './mobile';

export interface QuickOrderIntroductionPageTemplateProps {}

export interface QuickOrderIntroductionPageTemplateComponentProps
  extends QuickOrderIntroductionPageTemplateProps {}

export const QuickOrderIntroductionPageTemplate: FC<QuickOrderIntroductionPageTemplateComponentProps> & {
  Mobile: FC<QuickOrderIntroductionPageTemplateComponentProps>;
} = ({}) => {
  return (
    <Image
      src={'quickorder/background.jpg'}
      backgroundPosition="center"
      backgroundSize="cover"
      width={'100%'}
      height={'40%'}
    >
      <Flex.CCS full>
        <Container>
          <Container.Body>
            <Text size={100} weight={900} color={COLOR_WHITE}>
              퀵오더
            </Text>
            <Space.H8 />
            <Text
              size={FONTSIZE_26}
              color={COLOR_WHITE}
              lineHeight={'1.4em'}
              weight={200}
              style={{ maxWidth: 360, wordBreak: 'keep-all' }}
            >
              이제 퀵오더로 빠르게 주문 가능! 주문이력에서 퀵오더만 등록하면 BBQ 주문이 순!식!간!에!
            </Text>
            <Space.H10 />
            <Text size={FONTSIZE_16} color="#f1c2c5" lineHeight={'1.5em'}>
              퀵오더 등록방법
              <br />
              ➀ 마이페이지 - 나의 주문내역
              <br />
              ➁ 주문 내역중 원하는 주문 체크박스 터치
              <br />
              ➂ 하단 [퀵오더 등록] 버튼 터치후 완료.
              <br />
            </Text>
            <Space.H6 />
            <Button href={'/mypage/orders'}>
              <ButtonText>퀵오더 등록하기</ButtonText>
              <Arrow tail color={COLOR_WHITE} size={4} thickness={1.5} />
            </Button>
          </Container.Body>
        </Container>
      </Flex.CCS>
    </Image>
  );
};
QuickOrderIntroductionPageTemplate.Mobile = QuickOrderIntroductionPageTemplateMobile;

const Button = styled(Link)`
  position: relative;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  height: 42px;
  width: 190px;
  border-radius: 7px;
  border: solid 2px #fff;
  padding: 0 15px;
`;

const ButtonText = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1em;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
`;
