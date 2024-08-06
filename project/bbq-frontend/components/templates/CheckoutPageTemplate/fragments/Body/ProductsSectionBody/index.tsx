import { FC } from 'react';

import styled from 'styled-components';

import { Box, Divider, Flex, Image, Space, Text } from '@/components/atoms';
import { FONTSIZE_14, FONTSIZE_15, FONTSIZE_16, FONTSIZE_18, FONTSIZE_24 } from '@/constants';

import { CheckoutPageTemplateProps } from '../../../CheckoutPageTemplate';

const ProductsSectionBody: FC<CheckoutPageTemplateProps> = ({ selectedCoupons, checkoutData }) => {
  return (
    <>
      <Flex.CSS full>
        {checkoutData?.cartResponseInfo?.responseList.map((item, index) => (
          <Flex.CSS full key={index}>
            <Flex.RSC full layout="1 0.25 auto">
              <Flex.RSS full layout="auto auto 1">
                <Image
                  src={
                    item.isOnlyOrderWithEcoupon
                      ? item.menuImageUrl && item.menuImageUrl.length
                        ? item.menuImageUrl
                        : 'coupon/e-coupon-thumbnail.png'
                      : item.menuImageUrl
                  }
                  backgroundPosition="center"
                  backgroundSize="cover"
                  width={60}
                />
                <Space.V3 />
                <Box>
                  <Text size={FONTSIZE_16}>{`${item.mainMenuName} ${item.quantity}개`}</Text>
                  <Space.H1_5 />
                  <Flex.RSS>
                    <ItemOptionTag />
                    <Space.V1 />
                    <div>
                      <Space length={1.5} />
                      <Text size={FONTSIZE_14} color={'#777'} lineHeight={'1.25em'}>
                        {item.subOptionHeadList?.length
                          ? item.subOptionHeadList
                              ?.map(option => {
                                return `${option.subOptionName} [${option.subOptionDetailList
                                  .map(i => i.subOptionDetailName)
                                  .join(', ')}]`;
                              })
                              .join(', ')
                          : '(없음)'}
                      </Text>
                    </div>
                  </Flex.RSS>
                </Box>
              </Flex.RSS>
              <div></div>
              <Text size={FONTSIZE_18} weight={700}>
                {`${item.totalMenuWithSubOptionAndQuantityPrice.toLocaleString()}원`}
              </Text>
            </Flex.RSC>
            <Space.H3 />
            <Divider />
            <Space.H3 />
          </Flex.CSS>
        ))}
        {selectedCoupons.membership
          .filter(coupon => coupon.benefitType === 'PRODUCT')
          .filter(coupon => !!coupon.benefitMenuInfo)
          .map(coupon => coupon.benefitMenuInfo!)
          .map((item, index) => {
            return (
              <Flex.CSS full key={index}>
                <Flex.RSC full layout="1 0.25 auto">
                  <Flex.RSS full layout="auto auto 1">
                    <Image
                      src={item.menuImage}
                      backgroundPosition="center"
                      backgroundSize="cover"
                      width={60}
                    />
                    <Space.V3 />
                    <Box>
                      <Text size={FONTSIZE_16}>{`${item.menuName}`}</Text>
                      <Space.H1_5 />
                      <Text size={FONTSIZE_15} color={'#777'} lineHeight={'1.25em'}>
                        {'증정상품'}
                      </Text>
                    </Box>
                  </Flex.RSS>
                  <div></div>
                  <Text size={FONTSIZE_18} weight={700}>
                    {`${0}원`}
                  </Text>
                </Flex.RSC>
                <Space.H3 />
                <Divider />
                <Space.H3 />
              </Flex.CSS>
            );
          })}
      </Flex.CSS>
      <Space.H2 />
      <Box>
        <Flex.RBC full>
          <Text size={FONTSIZE_16}>
            총{' '}
            {(checkoutData?.cartResponseInfo?.responseList.length ?? 0) +
              selectedCoupons.membership
                .filter(coupon => coupon.benefitType === 'PRODUCT')
                .filter(coupon => !!coupon.benefitMenuInfo).length}
            건
          </Text>
          <Text size={FONTSIZE_24} weight={700}>
            {checkoutData?.cartResponseInfo?.totalPrice.toLocaleString()}원
          </Text>
        </Flex.RBC>
      </Box>
    </>
  );
};

const ItemOptionTag = styled.button`
  height: 20px;
  padding: 4px 7px;
  border-radius: 9999px;
  box-sizing: border-box;
  border: solid 1px #e8eaf0;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '옵션';
    font-weight: 500;
    font-size: 12px;
    text-align: center;
    color: #000;
    white-space: nowrap;
  }
`;

export default ProductsSectionBody;
