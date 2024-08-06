import { FC } from 'react';

import styled from 'styled-components';

import { Box, Divider, Flex, Image, Space, Text } from '@/components/atoms';
import { FONTSIZE_11, FONTSIZE_12, FONTSIZE_13, FONTSIZE_14, FONTSIZE_17 } from '@/constants';

import { CheckoutPageTemplateProps } from '../../../../CheckoutPageTemplate';

const ProductsSectionBody: FC<CheckoutPageTemplateProps> = ({ selectedCoupons, checkoutData }) => {
  return (
    <>
      <Flex.CSS full>
        {checkoutData?.cartResponseInfo?.responseList.map((item, index) => (
          <Flex.CSS full key={index}>
            <Flex.RSC full layout="1 20px auto">
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
                  width={50}
                />
                <Space.V2 />
                <Box>
                  <Text size={FONTSIZE_14}>{`${item.mainMenuName} ${item.quantity}개`}</Text>
                  <Space.H1_5 />
                  <Flex.RSS>
                    <ItemOptionTag />
                    <Space.V1 />
                    <div>
                      <Space length={1.5} />
                      <Text size={FONTSIZE_11} color={'#777'} lineHeight={'1.4em'}>
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
              <Text size={FONTSIZE_13} weight={700}>
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
                <Flex.RSC full layout="1 20px auto">
                  <Flex.RSS full layout="auto auto 1">
                    <Image
                      src={item.menuImage}
                      backgroundPosition="center"
                      backgroundSize="cover"
                      width={50}
                    />
                    <Space.V2 />
                    <Box>
                      <Text size={FONTSIZE_14}>{`${item.menuName}`}</Text>
                      <Space.H1_5 />
                      <Text size={FONTSIZE_12} color={'#777'} lineHeight={'1.4em'}>
                        {'증정상품'}
                      </Text>
                    </Box>
                  </Flex.RSS>
                  <div></div>
                  <Text size={FONTSIZE_13} weight={700}>
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

      <Box>
        <Flex.RBC full>
          <Text size={FONTSIZE_14}>
            총{' '}
            {(checkoutData?.cartResponseInfo?.responseList.length ?? 0) +
              selectedCoupons.membership
                .filter(coupon => coupon.benefitType === 'PRODUCT')
                .filter(coupon => !!coupon.benefitMenuInfo).length}
            건
          </Text>
          <Text size={FONTSIZE_17} weight={700}>
            {checkoutData?.cartResponseInfo?.totalPrice.toLocaleString()}원
          </Text>
        </Flex.RBC>
      </Box>
    </>
  );
};

const ItemOptionTag = styled.button`
  height: 18px;
  padding: 3px 5px;
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
    font-size: 10px;
    text-align: center;
    color: #000;
    white-space: nowrap;
  }
`;

export default ProductsSectionBody;
