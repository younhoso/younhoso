import { FC } from 'react';

import { Box, Divider, Flex, Grid, Space, Text } from '@/components/atoms';
import {
  COLOR_PRIMARY,
  FONTSIZE_11,
  FONTSIZE_13,
  FONTSIZE_14,
  FONTSIZE_16,
  PLANCK,
} from '@/constants';

import { Template } from '../components';
import { MyPageOrderPageTemplateComponentProps } from './MyPageOrderPageTemplate';

export const MyPageOrderPageTemplateMobile: FC<MyPageOrderPageTemplateComponentProps> = ({
  order,
}) => {
  return (
    <Template.Mobile title="주문 상세">
      <Grid columnCount={1} gap={PLANCK * 3}>
        <Box border="lightgray">
          <Box padding={`${PLANCK * 3}px ${PLANCK * 4}px`}>
            <Text size={FONTSIZE_16}>주문내역</Text>
          </Box>
          <Divider.H1 />
          <Box padding={PLANCK * 4}>
            <Flex.CSS full gap={PLANCK * 3}>
              <Flex.RSC layout="80px 1">
                <Text color={'#777777'} size={FONTSIZE_14}>
                  패밀리점
                </Text>
                <Text size={FONTSIZE_14}>{order.familyInfo.branchName}</Text>
              </Flex.RSC>
              <Flex.RSC layout="80px 1">
                <Text color={'#777777'} size={FONTSIZE_14}>
                  주문상태
                </Text>
                <Text size={FONTSIZE_14}>{order.orderStatusName}</Text>
              </Flex.RSC>
              <Flex.RSC layout="80px 1">
                <Text color={'#777777'} size={FONTSIZE_14}>
                  주문방법
                </Text>
                <Text size={FONTSIZE_14}>
                  {order.mealType.toUpperCase() === 'DELIVERY'
                    ? '배달'
                    : order.mealType.toUpperCase() === 'TAKEOUT'
                      ? '포장'
                      : order.mealType}
                </Text>
              </Flex.RSC>
              <Flex.RSC layout="80px 1">
                <Text color={'#777777'} size={FONTSIZE_14}>
                  주문일시
                </Text>
                <Text size={FONTSIZE_14}>{order.createdAt}</Text>
              </Flex.RSC>
              <Flex.RSC layout="80px 1">
                <Text color={'#777777'} size={FONTSIZE_14}>
                  주문번호
                </Text>
                <Text size={FONTSIZE_14}>{order.id}</Text>
              </Flex.RSC>
            </Flex.CSS>
          </Box>
        </Box>
        <Box border="lightgray">
          <Box padding={`${PLANCK * 3}px ${PLANCK * 4}px`}>
            <Text size={FONTSIZE_16}>주문옵션</Text>
          </Box>
          <Divider.H1 />
          <Box padding={PLANCK * 4}>
            <Flex.CSS full gap={PLANCK * 4}>
              {order.orderMenuList.map((orderMenu, index) => {
                return (
                  <div key={index}>
                    <Text size={FONTSIZE_13} weight={700}>{`${`00${index + 1}`.slice(
                      -2,
                    )}. ${orderMenu.menuName} • ${
                      orderMenu.quantity
                    }개 • ${orderMenu.menuAndSubOptionAndQuantityPrice.toLocaleString()}원`}</Text>
                    <Space.H2_5 />
                    <Flex.RSS>
                      <Space.V4 />
                      <Grid columnCount={1} gap={PLANCK * 2}>
                        {orderMenu.orderSubOptionList
                          .reduce<any[]>((arr, orderSubOption) => {
                            return [...arr, ...orderSubOption.orderSubOptionItemList];
                          }, [])
                          .map((item, index) => {
                            return (
                              <Flex.RSC key={index}>
                                <Text size={FONTSIZE_11} color={COLOR_PRIMARY}>
                                  +
                                </Text>
                                <Space.V2 />
                                <Text size={FONTSIZE_11}>{item.subOptionItemName}</Text>
                                <Space.V2 />
                                <Text
                                  size={FONTSIZE_11}
                                >{`+${item.subOptionItemPrice.toLocaleString()}원`}</Text>
                              </Flex.RSC>
                            );
                          })}
                      </Grid>
                    </Flex.RSS>
                  </div>
                );
              })}
            </Flex.CSS>
          </Box>
        </Box>
        <Box border="lightgray">
          <Box padding={`${PLANCK * 3}px ${PLANCK * 4}px`}>
            <Text size={FONTSIZE_16}>결제 금액</Text>
          </Box>
          <Divider.H1 />
          <Box padding={PLANCK * 4}>
            <Flex.CSS full gap={PLANCK * 3}>
              <Flex.RSC layout="80px 1">
                <Text color={'#777777'} size={FONTSIZE_14}>
                  주문금액
                </Text>
                <Text size={FONTSIZE_14}>{`${order.orderAmount.toLocaleString()}원`}</Text>
              </Flex.RSC>
              <Flex.RSC layout="80px 1">
                <Text color={'#777777'} size={FONTSIZE_14}>
                  할인금액
                </Text>
                <Text color={COLOR_PRIMARY} size={FONTSIZE_14}>
                  {order.discountAmount > 0 ? `-${order.discountAmount.toLocaleString()}원` : '0원'}
                </Text>
              </Flex.RSC>
              <Flex.RSC layout="80px 1">
                <Text color={'#777777'} size={FONTSIZE_14}>
                  배달팁
                </Text>
                <Text size={FONTSIZE_14}>{`${order.deliveryFee.toLocaleString()}원`}</Text>
              </Flex.RSC>
              <Divider.H1 />
              <Flex.RSC layout="80px 1">
                <Text size={FONTSIZE_14} weight={700}>
                  총 결제금액
                </Text>
                <Text
                  size={FONTSIZE_14}
                  weight={700}
                >{`${order.payAmount.toLocaleString()}원`}</Text>
              </Flex.RSC>
            </Flex.CSS>
          </Box>
        </Box>
        <Box border="lightgray">
          <Box padding={`${PLANCK * 3}px ${PLANCK * 4}px`}>
            <Text size={FONTSIZE_16}>결제 방법</Text>
          </Box>
          <Divider.H1 />
          <Box padding={PLANCK * 4}>
            <Flex.CSS full gap={PLANCK * 3}>
              <Flex.RSC layout="80px 1">
                <Text color={'#777777'} size={FONTSIZE_14}>
                  결제방법
                </Text>
                <Text size={FONTSIZE_14}>{order.paymentMethodName}</Text>
              </Flex.RSC>
            </Flex.CSS>
          </Box>
        </Box>
        {order.mealType === 'DELIVERY' ? (
          <Box border="lightgray">
            <Box padding={`${PLANCK * 3}px ${PLANCK * 4}px`}>
              <Text size={FONTSIZE_16}>배달 정보</Text>
            </Box>
            <Divider.H1 />
            <Box padding={PLANCK * 4}>
              <Flex.CSS full gap={PLANCK * 3}>
                <Flex.RSC layout="80px 1">
                  <Text color={'#777777'} size={FONTSIZE_14}>
                    배달주소
                  </Text>
                  <Text size={FONTSIZE_14}>
                    {order.deliveryAddress + ' ' + order.deliveryAddressDetail}
                  </Text>
                </Flex.RSC>
                <Flex.RSC layout="80px 1">
                  <Text color={'#777777'} size={FONTSIZE_14}>
                    전화번호
                  </Text>
                  <Text size={FONTSIZE_14}>{order.mobile}</Text>
                </Flex.RSC>
                <Flex.RSC layout="80px 1">
                  <Text color={'#777777'} size={FONTSIZE_14}>
                    패밀리 요청
                  </Text>
                  <Text size={FONTSIZE_14}>{order.orderMessage}</Text>
                </Flex.RSC>
                <Flex.RSC layout="80px 1">
                  <Text color={'#777777'} size={FONTSIZE_14}>
                    배달기사 요청
                  </Text>
                  <Text size={FONTSIZE_14}>{order.deliveryMessage}</Text>
                </Flex.RSC>
              </Flex.CSS>
            </Box>
          </Box>
        ) : (
          <Box border="lightgray">
            <Box padding={`${PLANCK * 3}px ${PLANCK * 4}px`}>
              <Text size={FONTSIZE_16}>포장 정보</Text>
            </Box>
            <Divider.H1 />
            <Box padding={PLANCK * 6}>
              <Flex.CSS full gap={PLANCK * 4}>
                <Flex.RSC layout="80px 1">
                  <Text color={'#777777'} size={FONTSIZE_14}>
                    전화번호
                  </Text>
                  <Text size={FONTSIZE_14}>{order.mobile}</Text>
                </Flex.RSC>
              </Flex.CSS>
            </Box>
          </Box>
        )}
      </Grid>
    </Template.Mobile>
  );
};
