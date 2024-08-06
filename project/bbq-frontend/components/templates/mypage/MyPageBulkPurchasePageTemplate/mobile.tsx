import { FC } from 'react';

import { Text } from '@/components/atoms';
import { COLOR_PRIMARY, FONTSIZE_15 } from '@/constants';

import { Template } from '../components';
import { MyPageBulkPurchasePageTemplateProps } from './';

export const MyPageBulkPurchasePageTemplateMobile: FC<
  MyPageBulkPurchasePageTemplateProps
> = ({}) => {
  return (
    <Template.Mobile title="대량구매 문의">
      <Text size={FONTSIZE_15}>
        대량 구매 문의는 고객센터{' '}
        <a href="tel:1588-9282" style={{ color: COLOR_PRIMARY, textDecoration: 'underline' }}>
          1588-9282
        </a>
        를 통해 부탁드립니다.
      </Text>
    </Template.Mobile>
  );
};
