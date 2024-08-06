import { FC } from 'react';

import { Container, Space, Text } from '@/components/atoms';
import { SummaryCard } from '@/components/organisms';
import { FONTSIZE_20 } from '@/constants';

import { CheckoutPageTemplateComponentProps } from '../CheckoutPageTemplate';
import Body from './fragments/Body';

export const CheckoutPageTemplateMobile: FC<CheckoutPageTemplateComponentProps> = props => {
  return (
    <Container.Mobile>
      <Container.Mobile.Body>
        <Space.H2 />
        <Text size={FONTSIZE_20}>주문 결제</Text>
        <Space.H6 />
        <Body {...props} />
        <Space.H4 />
        <SummaryCard.Mobile {...props.summary} />
      </Container.Mobile.Body>
    </Container.Mobile>
  );
};
