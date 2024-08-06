import { FC } from 'react';

import styled from 'styled-components';

import { Box, Container, Flex, Icon, Space, Text } from '@/components/atoms';
import { SummaryCard, SummaryCardProps } from '@/components/organisms';
import { FONTSIZE_14, FONTSIZE_16, FONTSIZE_20, PLANCK } from '@/constants';
import { QuickOrder } from '@/types';

import Body from './fragments/Body';
import Head from './fragments/Head';
import { QuickOrderPageTemplateMobile } from './mobile';

export interface QuickOrderPageTemplateProps {
  quickOrders: QuickOrder[];
  summary?: SummaryCardProps;
  selectedQuickOrderId?: number;
  setSelectedQuickOrderId: (id?: number) => void;
  refetch?: () => void;
}

export interface QuickOrderPageTemplateComponentProps extends QuickOrderPageTemplateProps {}

export const QuickOrderPageTemplate: FC<QuickOrderPageTemplateComponentProps> & {
  Mobile: FC<QuickOrderPageTemplateComponentProps>;
} = props => {
  return (
    <Wrapper>
      <Head />
      <Space.H6 />
      <Container>
        <ContainerBody>
          <Template>
            <Body {...props} />
          </Template>
        </ContainerBody>
        <ContainerSidebar>
          {props.selectedQuickOrderId && props.summary ? <SummaryCard {...props.summary} /> : null}
          {!props.selectedQuickOrderId ? (
            <Box padding={PLANCK * 6} border="black">
              <Flex.RSC>
                <Text size={FONTSIZE_20}>원하시는 주문을</Text>
                <Space.V2 />
                <Icon inline src="checkbox-fill.svg" size={24} />
                <Space.V1 />
                <Text size={FONTSIZE_20}>체크 하세요.</Text>
              </Flex.RSC>
              <Space.H6 />
              <Text size={FONTSIZE_16} color={'#777777'}>
                자주 시키는 메뉴를 퀵오더에 등록하세요.
              </Text>
              <Space.H7 />
              <Text size={FONTSIZE_14}>퀵오더 등록방법</Text>
              <Space.H1_5 />
              <Text size={FONTSIZE_14} color={'#777777'}>
                ➀ 마이페이지 - 나의 주문내역
              </Text>
              <Space.H1 />
              <Text size={FONTSIZE_14} color={'#777777'}>
                ➁ 주문 내역중 원하는 주문 체크박스 터치
              </Text>
              <Space.H1 />
              <Text size={FONTSIZE_14} color={'#777777'}>
                ➂ 하단 [퀵오더 등록] 버튼 터치후 완료.
              </Text>
            </Box>
          ) : null}
        </ContainerSidebar>
      </Container>
      <Space.H6 />
    </Wrapper>
  );
};
QuickOrderPageTemplate.Mobile = QuickOrderPageTemplateMobile;

const Wrapper = styled.div`
  display: block;
  clear: both;
`;

const Template = styled.div`
  display: block;
`;

const ContainerBody = styled(Container.Body)`
  padding-right: ${PLANCK * 7}px;
`;

const ContainerSidebar = styled(Container.Sidebar)`
  max-width: 468px;
`;
