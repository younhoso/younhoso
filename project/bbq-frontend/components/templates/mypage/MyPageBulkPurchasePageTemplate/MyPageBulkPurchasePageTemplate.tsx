import { FC, ReactNode } from 'react';

import { Text } from '@/components/atoms';
import { COLOR_PRIMARY, FONTSIZE_16 } from '@/constants';

import { Template } from '../components';
import { MyPageBulkPurchasePageTemplateMobile } from './mobile';

export interface MyPageBulkPurchasePageTemplateProps {}

export interface MyPageBulkPurchasePageTemplateComponentProps
  extends MyPageBulkPurchasePageTemplateProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const MyPageBulkPurchasePageTemplate: FC<MyPageBulkPurchasePageTemplateComponentProps> & {
  Mobile: FC<MyPageBulkPurchasePageTemplateComponentProps>;
} = ({}) => {
  return (
    <Template title="대량구매 문의">
      <Text size={FONTSIZE_16}>
        대량 구매 문의는 고객센터{' '}
        <a href="tel:1588-9282" style={{ color: COLOR_PRIMARY, textDecoration: 'underline' }}>
          1588-9282
        </a>
        를 통해 부탁드립니다.
      </Text>
    </Template>
  );
};
MyPageBulkPurchasePageTemplate.Mobile = MyPageBulkPurchasePageTemplateMobile;
