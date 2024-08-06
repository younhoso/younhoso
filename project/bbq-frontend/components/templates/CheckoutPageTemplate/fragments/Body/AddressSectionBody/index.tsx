import { FC } from 'react';

import { Divider, Flex, Space, Text } from '@/components/atoms';
import { FONTSIZE_14, FONTSIZE_16 } from '@/constants';
import { MealTypeEnum } from '@/types';

import { CheckoutPageTemplateProps } from '../../../CheckoutPageTemplate';

const AddressSectionBody: FC<CheckoutPageTemplateProps> = ({ checkoutData }) => {
  return (
    <>
      <Flex.RSC>
        <Text size={FONTSIZE_16} color={'red'}>
          {checkoutData?.mealType === MealTypeEnum.Delivery ? '출발' : '픽업장소'}
        </Text>
        <Text size={FONTSIZE_16}>&nbsp;:&nbsp;{checkoutData?.familyInfo?.branchName}</Text>
      </Flex.RSC>
      <Space.H2_5 />
      <Text size={FONTSIZE_14} color={'#777777'}>
        {checkoutData?.familyInfo?.branchAddress}
      </Text>
      <Space.H1_5 />
      <Text size={FONTSIZE_14} color={'#777777'}>
        {checkoutData?.familyInfo?.branchTel}
      </Text>
      {checkoutData?.mealType === MealTypeEnum.Delivery ? (
        <>
          <Space.H5 />
          <Flex.RSC>
            <Text size={FONTSIZE_16} color={'#46d586'}>
              도착
            </Text>
            <Text size={FONTSIZE_16}>
              &nbsp;:&nbsp;
              {checkoutData?.deliveryInfo?.deliveryFullAddress +
                ` ` +
                checkoutData?.deliveryInfo?.deliveryDetailAddress}
            </Text>
          </Flex.RSC>
        </>
      ) : null}
      <Space.H3_5 />
      <Divider />
      <Space.H3_5 />
      <Text>전화번호 주문자 연락처 {checkoutData.receiverPhoneNumber}</Text>
    </>
  );
};

export default AddressSectionBody;
