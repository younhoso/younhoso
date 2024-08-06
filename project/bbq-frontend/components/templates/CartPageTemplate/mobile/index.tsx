import { FC, Fragment, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  Arrow,
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  Icon,
  Image,
  Space,
  Text,
} from '@/components/atoms';
import { Button } from '@/components/molecules';
import { SummaryCard } from '@/components/organisms';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_RED,
  FONTSIZE_12,
  FONTSIZE_13,
  FONTSIZE_14,
  FONTSIZE_15,
  FONTSIZE_16,
  FONTSIZE_18,
  FONTSIZE_20,
  PLANCK,
} from '@/constants';
import { useQueryParams } from '@/hooks';
import { MealTypeEnum } from '@/types';
import { serializeCartForMap } from '@/utils';

import { CartPageTemplateComponentProps } from '../CartPageTemplate';
import CartItemCard from './components/CartItem';

export const CartPageTemplateMobile: FC<CartPageTemplateComponentProps> = ({
  cartData,
  mealType,
  recommendedMenus,
  handleItemDeleteButtonClick,
  handleDeleteAllItemButtonClick,
  handleItemChangeQuantityChange,
  summary,
  ecoupons,
  handleECouponMenuChangeButtonClick,
  handleECouponCancelButtonClick,
}) => {
  const router = useRouter();
  const { keepParams } = useQueryParams();
  const [mealTypeMenuExpanded, setMealTypeMenuExpanded] = useState<boolean>(false);

  return (
    <Container.Mobile>
      <Container.Mobile.Body>
        <div>
          <Space.H2 />
          <Box full={true}>
            <Flex.RBC full>
              <Text size={FONTSIZE_20} color={COLOR_BLACK}>
                장바구니
              </Text>
              <Flex.RSC>
                <Button.Mobile
                  disabled={cartData.responseList.length === 0}
                  inline={true}
                  text="전체 삭제"
                  size="small"
                  color="graypurple"
                  textColor={'#302d46'}
                  fill={false}
                  shape={'round'}
                  onClick={handleDeleteAllItemButtonClick}
                />
              </Flex.RSC>
            </Flex.RBC>
            <Space.H6 />
            <Box full border="#dddddd" background="#ffffff" padding={`0 ${PLANCK * 4}px`}>
              <Space.H3_5 />
              <Flex.RSC
                full
                layout={'1 auto'}
                style={{ cursor: 'pointer' }}
                onClick={() => setMealTypeMenuExpanded(!mealTypeMenuExpanded)}
              >
                <Flex.RSC>
                  <Icon
                    size={PLANCK * 7}
                    src={
                      mealType === MealTypeEnum.Delivery
                        ? `delivery-bike.svg`
                        : `chicken-packaging.svg`
                    }
                  />
                  <Space.V2 />
                  <Text size={FONTSIZE_18}>
                    {mealType === MealTypeEnum.Delivery ? `배달로 받을게요` : `포장할게요`}
                  </Text>
                  <Space.V3 />
                  <Box
                    border="lightgray"
                    shape={'round'}
                    style={{ width: PLANCK * 5, height: PLANCK * 5 }}
                  >
                    <Flex.CCC full>
                      {mealTypeMenuExpanded ? (
                        <Arrow.Up size={2} color={'#324266'} />
                      ) : (
                        <Arrow.Down size={2} color={'#324266'} />
                      )}
                    </Flex.CCC>
                  </Box>
                </Flex.RSC>
              </Flex.RSC>
              <Space.H3 />
              <Divider.H1 />
              {mealTypeMenuExpanded ? (
                <div style={{ position: 'absolute', zIndex: 1 }}>
                  <Space.H2 />
                  <Box
                    border="#dddddd"
                    background="#ffffff"
                    padding={`0 ${PLANCK * 4}px`}
                    shape={'round'}
                    style={{ minWidth: 240 }}
                  >
                    <Space.H2 />
                    <Flex.RSC
                      onClick={() => {
                        router.replace(
                          keepParams('/cart', {
                            mealType: MealTypeEnum.Delivery.toLowerCase(),
                          }),
                        );

                        setMealTypeMenuExpanded(false);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <Icon size={PLANCK * 7} src={'delivery-bike.svg'} />
                      <Space.V3 />
                      <Text size={FONTSIZE_16}>배달로 받을게요</Text>
                    </Flex.RSC>
                    <Space.H2 />
                    <Divider />
                    <Space.H2 />
                    <Flex.RSC
                      onClick={() => {
                        router.replace(
                          keepParams('/cart', {
                            mealType: MealTypeEnum.Takeout.toLowerCase(),
                          }),
                        );

                        setMealTypeMenuExpanded(false);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <Icon size={PLANCK * 7} src={'chicken-packaging.svg'} />
                      <Space.V3 />
                      <Text size={FONTSIZE_16}>포장할게요</Text>
                    </Flex.RSC>
                    <Space.H2 />
                  </Box>
                </div>
              ) : null}
              <Space.H4 />
              <Flex.RSC full layout="auto auto 1">
                <Flex.CCC
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#f0f0f0',
                  }}
                >
                  <Icon src={'bbq-store.svg'} size={'40%'} />
                  <Space.H1 />
                  <Text size={8} color={'#9e9e9e'}>
                    bbq family
                  </Text>
                </Flex.CCC>
                <Space.V3 />
                <Flex.RBC>
                  <Flex.RBC full>
                    <Flex.CSS gap={PLANCK * 2}>
                      <Flex.RSC>
                        {!cartData?.familyInfoResponse?.branchId ? (
                          <div>
                            <Space.V3 />
                            <Text size={FONTSIZE_13} lineHeight={'1.25em'}>
                              ⚠ 배송지를 기반으로 주문 가능한 매장을 찾을 수 없습니다.
                            </Text>
                            <Space.H1_5 />
                            <Flex.RSC>
                              <Text size={FONTSIZE_15} color={COLOR_RED}>
                                다른 패밀리
                              </Text>
                              <Text size={FONTSIZE_15}>를 선택해주세요.</Text>
                            </Flex.RSC>
                          </div>
                        ) : (
                          <>
                            <Text size={FONTSIZE_16}>
                              {cartData?.familyInfoResponse?.branchName}
                            </Text>
                            {cartData?.responseList.filter(item => item.isSoldOut).length ? (
                              <>
                                <Space.V3 />
                                <Text size={FONTSIZE_12}>⚠ 품절 메뉴가 있어요.</Text>
                                <Space.V0_5 />
                                <Text size={FONTSIZE_12} color={COLOR_RED}>
                                  다른 패밀리
                                </Text>
                                <Text size={FONTSIZE_12}>를 선택하세요.</Text>
                              </>
                            ) : null}
                          </>
                        )}
                      </Flex.RSC>
                      <Text size={FONTSIZE_13} color={'#777777'} lineHeight={'1.2em'}>
                        {cartData?.familyInfoResponse?.address}
                      </Text>
                    </Flex.CSS>
                    {mealType === MealTypeEnum.Takeout ||
                    cartData?.familyInfoResponse?.changeable ? (
                      <Flex.RSC>
                        <Space.V2 />
                        <Button.Mobile
                          fill
                          text="변경"
                          color="black"
                          shape={'round'}
                          onClick={() => {
                            router.push(
                              `/stores/map?for=${
                                mealType === MealTypeEnum.Takeout ? 'takeout' : 'change-delivery'
                              }&redirect_to=${encodeURIComponent(router.asPath)}${
                                mealType !== MealTypeEnum.Takeout
                                  ? `&cart=${encodeURIComponent(serializeCartForMap(cartData))}`
                                  : ``
                              }`,
                            );
                          }}
                        />
                      </Flex.RSC>
                    ) : null}
                  </Flex.RBC>
                </Flex.RBC>
              </Flex.RSC>
              <Space.H5 />
            </Box>
            <Space.H4 />
            <Flex.CSS full gap={PLANCK * 3}>
              {cartData?.responseList?.map((item, index) => (
                <CartItemCard
                  key={index}
                  {...item}
                  handleItemDeleteButtonClick={handleItemDeleteButtonClick}
                  handleItemChangeQuantityChange={handleItemChangeQuantityChange}
                  ecoupon={ecoupons.find(ecoupon => ecoupon.menuId === item.mainMenuId)}
                  handleECouponMenuChangeButtonClick={handleECouponMenuChangeButtonClick}
                  handleECouponCancelButtonClick={handleECouponCancelButtonClick}
                />
              ))}
              {cartData?.responseList.length ? (
                <Box
                  full
                  border="#dddddd"
                  background="#ffffff"
                  padding={PLANCK * 3}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    router.push(keepParams('/categories/1'));
                  }}
                >
                  <Flex.RCC>
                    <Text color={COLOR_PRIMARY} size={FONTSIZE_14}>
                      +
                    </Text>
                    <Space.V2 />
                    <Text size={FONTSIZE_14}>더 담으러 갈래요</Text>
                  </Flex.RCC>
                </Box>
              ) : null}
            </Flex.CSS>
            <Space.H4 />
          </Box>
        </div>
        <div>
          {summary ? <SummaryCard.Mobile {...summary} /> : null}
          {recommendedMenus && recommendedMenus.length
            ? recommendedMenus.map((menu, index) => {
                return (
                  <Fragment key={index}>
                    <Space.H4 />
                    <Box full border="#dddddd" background="#ffffff" padding={PLANCK * 4}>
                      <Text size={FONTSIZE_18}>{menu.categoryName}</Text>
                      <Space.H4 />
                      <Grid columnCount={2} gap={PLANCK * 3}>
                        {menu.menuItemList.map((menu, index) => {
                          return (
                            <Link key={index} href={keepParams(`/products/${menu.menuId}`)}>
                              <Flex.CSC>
                                <Image
                                  src={menu.menuImageUrl}
                                  backgroundPosition="center"
                                  backgroundSize="cover"
                                  height="67%"
                                  style={{ border: '1px solid #e5e5e5' }}
                                />
                                <Space.H2 />
                                <Text size={FONTSIZE_13} align="center">
                                  {menu.menuName}
                                </Text>
                                <Space.H1 />
                                <Text
                                  size={FONTSIZE_13}
                                  align="center"
                                >{`${menu.menuPrice.toLocaleString()}원`}</Text>
                              </Flex.CSC>
                            </Link>
                          );
                        })}
                      </Grid>
                    </Box>
                  </Fragment>
                );
              })
            : null}
        </div>
      </Container.Mobile.Body>
    </Container.Mobile>
  );
};
