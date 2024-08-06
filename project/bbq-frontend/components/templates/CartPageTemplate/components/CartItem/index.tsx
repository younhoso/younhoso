import { FC, Fragment } from 'react';

import styled from 'styled-components';

import { Box, CheckBox, Divider, Flex, Image, Space, Stepper, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { COLOR_RED, FONTSIZE_13, FONTSIZE_14, FONTSIZE_16, FONTSIZE_20, PLANCK } from '@/constants';
import { CartItem, ECoupon } from '@/types';

const CartItemCard: FC<
  CartItem & {
    handleItemDeleteButtonClick: (params: { itemId: number }) => void;
    handleItemChangeQuantityChange: (params: { itemId: number; quantity: number }) => void;
    ecoupon?: ECoupon;
    handleECouponMenuChangeButtonClick?: (params: { ecoupon: ECoupon }) => void;
    handleECouponCancelButtonClick?: (params: { ecoupon: ECoupon }) => void;
  }
> = ({
  id,
  isOnlyOrderWithEcoupon,
  isSoldOut,
  price,
  subOptionHeadList,
  menuImageUrl,
  mainMenuName,
  quantity,
  totalMenuWithSubOptionAndQuantityPrice,
  handleItemDeleteButtonClick,
  handleItemChangeQuantityChange,
  ecoupon,
  handleECouponMenuChangeButtonClick,
  handleECouponCancelButtonClick,
}) => {
  return (
    <Box full border="#dddddd" background="#ffffff" padding={PLANCK * 6}>
      <Flex.RBC>
        <Flex.RSC>
          <Text size={FONTSIZE_20}>{mainMenuName}</Text>
        </Flex.RSC>
        <Flex.RSC>
          <Button
            inline={true}
            text="삭제"
            size="small"
            color="graypurple"
            textColor={'#302d46'}
            fill={false}
            shape={'round'}
            onClick={() => {
              handleItemDeleteButtonClick({
                itemId: id,
              });
            }}
          />
        </Flex.RSC>
      </Flex.RBC>
      <Space.H3 />
      <Divider />
      <Space.H4 />
      <Flex.RSS layout={isOnlyOrderWithEcoupon ? '2.5 auto 7' : '3.5 auto 7'}>
        <div>
          <Image
            src={
              isOnlyOrderWithEcoupon
                ? menuImageUrl && menuImageUrl.length
                  ? menuImageUrl
                  : 'coupon/e-coupon-thumbnail.png'
                : menuImageUrl
            }
            backgroundPosition="center"
            backgroundSize="cover"
            width={'100%'}
            height={isOnlyOrderWithEcoupon ? '100%' : '70.1117318436%'}
          >
            {isSoldOut ? (
              <SoldoutImageWrapper>
                <Image src={'cart/soldout-box.svg'} width={'30%'} />
                <Space.H2 />
                <Text size={FONTSIZE_16} weight={700}>
                  다른 패밀리를 선택해주세요.
                </Text>
              </SoldoutImageWrapper>
            ) : null}
          </Image>
        </div>
        <Space.V3 />
        <div>
          <div>
            <Space.H2 />
            <Flex.RBC>
              <Text size={FONTSIZE_14}>{mainMenuName}</Text>
              <Text size={FONTSIZE_14}>{`${price.toLocaleString()}원`}</Text>
            </Flex.RBC>
            <Space.H2 />
            {subOptionHeadList.map((option, index) => {
              return (
                <Fragment key={index}>
                  <Flex.RBS layout="4 1 auto">
                    <Text size={FONTSIZE_14} lineHeight={'1.4em'}>
                      • <span style={{ color: '#999999' }}>{option.subOptionName}</span>{' '}
                      {option.subOptionDetailList
                        .map(optionItem => optionItem.subOptionDetailName)
                        .join(', ')}
                    </Text>
                    <div></div>
                    <Text size={FONTSIZE_14}>{`${option.subOptionDetailList
                      .reduce<number>((total, optionItem) => {
                        return total + optionItem.price;
                      }, 0)
                      .toLocaleString()}원`}</Text>
                  </Flex.RBS>
                  <Space.H1 />
                </Fragment>
              );
            })}
            <Space.H2 />
            <Divider.H1 />
            <Space.H3_5 />
            <Flex.RBC>
              <Stepper
                value={quantity}
                minValue={1}
                maxValue={50}
                onChange={value => {
                  handleItemChangeQuantityChange({
                    itemId: id,
                    quantity: value,
                  });
                }}
              />
              <Text
                size={FONTSIZE_20}
              >{`${totalMenuWithSubOptionAndQuantityPrice.toLocaleString()}원`}</Text>
            </Flex.RBC>
            {isOnlyOrderWithEcoupon ? (
              <>
                <Space.H3_5 />
                <Divider.H1 />
                <Space.H3_5 />
                <Flex.RBC>
                  <Text color={COLOR_RED} size={FONTSIZE_13}>
                    쿠폰금액 이상 메뉴로 변경 가능
                  </Text>
                  <Flex.RSC gap={PLANCK}>
                    <Button
                      color={'black'}
                      shape={'round'}
                      text={'메뉴 변경'}
                      size={'small'}
                      onClick={() => {
                        if (!isOnlyOrderWithEcoupon) return;
                        if (!ecoupon) return;
                        if (!handleECouponMenuChangeButtonClick) return;
                        handleECouponMenuChangeButtonClick({ ecoupon });
                      }}
                    />
                    <Button
                      inline={true}
                      size="small"
                      color="graypurple"
                      textColor={'#302d46'}
                      fill={false}
                      shape={'round'}
                      text={'사용 취소'}
                      onClick={() => {
                        if (!isOnlyOrderWithEcoupon) return;
                        if (!ecoupon) return;
                        if (!handleECouponCancelButtonClick) return;
                        handleECouponCancelButtonClick({ ecoupon });
                      }}
                    />
                  </Flex.RSC>
                </Flex.RBC>
              </>
            ) : null}
          </div>
        </div>
      </Flex.RSS>
    </Box>
  );
};

export default CartItemCard;

const SoldoutImageWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
