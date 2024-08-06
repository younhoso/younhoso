import { FC } from 'react';

import { Box, Divider, Flex, Icon, Space, Text } from '@/components/atoms';
import {
  COLOR_BLACK,
  COLOR_WHITE,
  FONTSIZE_16,
  FONTSIZE_17,
  FONTSIZE_18,
  FONTSIZE_20,
  PLANCK,
} from '@/constants';
import { useAuth } from '@/hooks';
import { MealTypeEnum } from '@/types';

import { CheckoutPageTemplateProps } from '../../../CheckoutPageTemplate';
import AddressSectionBody from './AddressSectionBody';
import CouponSectionBody from './CouponSectionBody';
import HPCSectionBody from './HPCSectionBody';
import PaymentMethodSectionBody from './PaymentMethodSectionBody';
import PointSectionBody from './PointSectionBody';
import ProductsSectionBody from './ProductsSectionBody';
import RequestSectionBody from './RequestSectionBody';

const Body: FC<CheckoutPageTemplateProps> = props => {
  const { member } = useAuth();

  return (
    <Box padding={PLANCK * 3} border={'#dddddd'} background={'#f8f9fa'}>
      <Box>
        <Flex.CSS gap={PLANCK * 3}>
          <Box
            full
            thickness={2}
            border={COLOR_BLACK}
            background={COLOR_WHITE}
            padding={`0 ${PLANCK * 4}px`}
          >
            <Space.H3 />
            <Flex.RSC>
              <Icon
                src={
                  props.checkoutData.mealType === MealTypeEnum.Delivery
                    ? `delivery-bike.svg`
                    : `chicken-packaging.svg`
                }
                size={32}
              />
              <Space.V2_5 />
              <Text size={FONTSIZE_18}>
                {props.checkoutData.mealType === MealTypeEnum.Delivery
                  ? `배달로 받을게요`
                  : `포장할게요`}
              </Text>
            </Flex.RSC>
            <Space.H3 />
          </Box>
          <Box full border={'#dddddd'} background={COLOR_WHITE} padding={`0 ${PLANCK * 3}px`}>
            <Space.H2_5 />
            <Flex.RSC>
              <Icon src="pin-black-line.svg" size={22} />
              <Space.V2 />
              <Text size={FONTSIZE_16}>배송지 설정</Text>
            </Flex.RSC>
            <Space.H2_5 />
            <Divider />
            <Space.H3_5 />
            <AddressSectionBody {...props} />
            <Space.H4 />
          </Box>
          <Box full border={'#dddddd'} background={COLOR_WHITE} padding={`0 ${PLANCK * 3}px`}>
            <Space.H2_5 />
            <Flex.RSC>
              <Icon src="human-talking-black-line.svg" size={22} />
              <Space.V2 />
              <Text size={FONTSIZE_16}>주문 요청 사항</Text>
            </Flex.RSC>
            <Space.H2_5 />
            <Divider />
            <Space.H3_5 />
            <RequestSectionBody {...props} />
            <Space.H4 />
          </Box>
          <Box full border={'#dddddd'} background={COLOR_WHITE} padding={`0 ${PLANCK * 3}px`}>
            <Space.H2_5 />
            <Flex.RSC>
              <Icon src="basket-bbq-black.svg" size={22} />
              <Space.V2 />
              <Text size={FONTSIZE_16}>주문 상품</Text>
            </Flex.RSC>
            <Space.H2_5 />
            <Divider />
            <Space.H3_5 />
            <ProductsSectionBody {...props} />
            <Space.H4 />
          </Box>

          <Box full border={'#dddddd'} background={COLOR_WHITE} padding={`0 ${PLANCK * 3}px`}>
            <Space.H2_5 />
            <Flex.RSC>
              <Icon src="double-ticket-black.svg" size={22} />
              <Space.V2 />
              <Text size={FONTSIZE_16}>할인쿠폰</Text>
            </Flex.RSC>
            <Space.H2_5 />
            <Divider />
            <Space.H3_5 />
            <CouponSectionBody {...props} />
            <Space.H4 />
          </Box>
          {member ? (
            <>
              <Box full border={'#dddddd'} background={COLOR_WHITE} padding={`0 ${PLANCK * 3}px`}>
                <Space.H2_5 />
                <Flex.RSC>
                  <Icon src="folded-point-black.svg" size={22} />
                  <Space.V2 />
                  <Text size={FONTSIZE_16}>포인트</Text>
                </Flex.RSC>
                <Space.H2_5 />
                <Divider />
                <Space.H3_5 />
                <PointSectionBody {...props} />
                <Space.H4 />
              </Box>
            </>
          ) : null}
          {member && props.hpcPointState ? (
            <>
              <Box full border={'#dddddd'} background={COLOR_WHITE} padding={`0 ${PLANCK * 3}px`}>
                <Space.H2_5 />
                <Flex.RSC>
                  <Icon src="folded-point-black.svg" size={22} />
                  <Space.V2 />
                  <Text size={FONTSIZE_16}>포인트</Text>
                </Flex.RSC>
                <Space.H2_5 />
                <Divider />
                <Space.H3_5 />
                <HPCSectionBody {...props} />
                <Space.H4 />
              </Box>
            </>
          ) : null}
          {props.totalPrice > 0 ? (
            <Box full border={'#dddddd'} background={COLOR_WHITE} padding={`0 ${PLANCK * 3}px`}>
              <Space.H2_5 />
              <Flex.RSC>
                <Icon src="card-with-hand-black-line.svg" size={22} />
                <Space.V2 />
                <Text size={FONTSIZE_16}>결제수단</Text>
              </Flex.RSC>
              <Space.H2_5 />
              <Divider />
              <Space.H3_5 />
              <PaymentMethodSectionBody {...props} />
              <Space.H4 />
            </Box>
          ) : null}
        </Flex.CSS>
      </Box>
    </Box>
  );
};

export default Body;
