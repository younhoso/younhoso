import { FC } from 'react';

import Link from 'next/link';

import styled from 'styled-components';

import { Arrow, Container, Flex, Image, Space, Text } from '@/components/atoms';
import { COLOR_WHITE, FONTSIZE_15, FONTSIZE_20 } from '@/constants';

import { QuickOrderIntroductionPageTemplateComponentProps } from './QuickOrderIntroductionPageTemplate';

export const QuickOrderIntroductionPageTemplateMobile: FC<
  QuickOrderIntroductionPageTemplateComponentProps
> = ({}) => {
  return (
    <Image
      src={'quickorder/background.jpg'}
      backgroundPosition="42.5%"
      backgroundSize="cover"
      width={'100%'}
      height={'85vh'}
    >
      <Flex.CCS full>
        <Container.Mobile>
          <Container.Mobile.Body>
            <Text size={60} weight={900} color={COLOR_WHITE}>
              퀵오더
            </Text>
            <Space.H4 />
            <Text
              size={FONTSIZE_20}
              color={COLOR_WHITE}
              lineHeight={'1.4em'}
              weight={400}
              style={{
                maxWidth: 360,
                wordBreak: 'keep-all',
              }}
            >
              이제 퀵오더로 빠르게 주문 가능! 주문이력에서 퀵오더만 등록하면 BBQ 주문이 순!식!간!에!
            </Text>
            <Space.H10 />
            <Text size={FONTSIZE_15} color="#f1c2c5" lineHeight={'1.5em'}>
              퀵오더 등록방법
              <br />
              ➀ 마이페이지 - 나의 주문내역
              <br />
              ➁ 주문 내역중 원하는 주문 체크박스 터치
              <br />
              ➂ 하단 [퀵오더 등록] 버튼 터치후 완료.
              <br />
            </Text>
            <Space.H10 />
            <Button href={'/mypage/orders'}>
              <ButtonText>퀵오더 등록하기</ButtonText>
              <Arrow tail color={COLOR_WHITE} size={4} thickness={1} />
            </Button>
          </Container.Mobile.Body>
        </Container.Mobile>
      </Flex.CCS>
    </Image>
  );
};

const Button = styled(Link)`
  position: relative;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  height: 42px;
  width: 190px;
  border-radius: 7px;
  border: solid 1px #fff;
  padding: 0 15px;
`;

const ButtonText = styled.div`
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1em;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
`;
