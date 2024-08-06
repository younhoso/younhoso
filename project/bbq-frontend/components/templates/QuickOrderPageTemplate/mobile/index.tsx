import { FC } from 'react';

import { Box, Container, Flex, Icon, Space, Text } from '@/components/atoms';
import { SummaryCard } from '@/components/organisms';
import { FONTSIZE_13, FONTSIZE_14, FONTSIZE_17, PLANCK } from '@/constants';

import { QuickOrderPageTemplateComponentProps } from '../QuickOrderPageTemplate';
import Body from './fragments/Body';
import Head from './fragments/Head';

export const QuickOrderPageTemplateMobile: FC<QuickOrderPageTemplateComponentProps> = props => {
  return (
    <div>
      <Head />
      <Container.Mobile.Body>
        <Body {...props} />
        <div>
          <Space.H4 />
          {props.selectedQuickOrderId && props.summary ? (
            <SummaryCard.Mobile {...props.summary} />
          ) : null}
          {!props.selectedQuickOrderId ? (
            <Box padding={PLANCK * 4} border="black">
              <Flex.RSC>
                <Text size={FONTSIZE_17}>원하시는 주문을</Text>
                <Space.V2 />
                <Icon inline src="checkbox-fill.svg" size={20} />
                <Space.V1 />
                <Text size={FONTSIZE_17}>체크 하세요.</Text>
              </Flex.RSC>
              <Space.H2 />
              <Text size={FONTSIZE_14} color={'#777777'}>
                자주 시키는 메뉴를 퀵오더에 등록하세요.
              </Text>
              <Space.H6 />
              <Text size={FONTSIZE_14}>퀵오더 등록방법</Text>
              <Space.H2 />
              <Text size={FONTSIZE_13} color={'#777777'}>
                ➀ 마이페이지 - 나의 주문내역
              </Text>
              <Space.H1_5 />
              <Text size={FONTSIZE_13} color={'#777777'}>
                ➁ 주문 내역중 원하는 주문 체크박스 터치
              </Text>
              <Space.H1_5 />
              <Text size={FONTSIZE_13} color={'#777777'}>
                ➂ 하단 [퀵오더 등록] 버튼 터치후 완료.
              </Text>
            </Box>
          ) : null}
        </div>
      </Container.Mobile.Body>
    </div>
  );
};
