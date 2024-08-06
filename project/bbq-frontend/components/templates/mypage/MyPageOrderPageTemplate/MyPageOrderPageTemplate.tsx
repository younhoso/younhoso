import { FC, ReactNode } from 'react';

import { Box, Divider, Flex, Grid, Space, Text } from '@/components/atoms';
import { COLOR_PRIMARY, FONTSIZE_18, FONTSIZE_20, PLANCK } from '@/constants';
import { Order } from '@/types';

import { Template } from '../components';
import { MyPageOrderPageTemplateMobile } from './mobile';

export interface MyPageOrderPageTemplateProps {
  order: Order;
}

export interface MyPageOrderPageTemplateComponentProps extends MyPageOrderPageTemplateProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const MyPageOrderPageTemplate: FC<MyPageOrderPageTemplateComponentProps> & {
  Mobile: FC<MyPageOrderPageTemplateComponentProps>;
} = ({ order }) => {
  return (
    <Template title="주문 상세">
      <Grid columnCount={1} gap={PLANCK * 4}>
        <Box border="lightgray">
          <Box padding={`${PLANCK * 4}px ${PLANCK * 6}px`}>
            <Text size={FONTSIZE_20}>주문내역</Text>
          </Box>
          <Divider.H1 />
          <Box padding={PLANCK * 6}>
            <Flex.CSS full gap={PLANCK * 4}>
              <Flex.RSC layout="150px 1">
                <Text color={'#777777'}>패밀리점</Text>
                <Text>{order.familyInfo.branchName}</Text>
              </Flex.RSC>
              <Flex.RSC layout="150px 1">
                <Text color={'#777777'}>주문상태</Text>
                <Text>{order.orderStatusName}</Text>
              </Flex.RSC>
              <Flex.RSC layout="150px 1">
                <Text color={'#777777'}>주문방법</Text>
                <Text>
                  {order.mealType.toUpperCase() === 'DELIVERY'
                    ? '배달'
                    : order.mealType.toUpperCase() === 'TAKEOUT'
                      ? '포장'
                      : order.mealType}
                </Text>
              </Flex.RSC>
              <Flex.RSC layout="150px 1">
                <Text color={'#777777'}>주문일시</Text>
                <Text>{order.createdAt}</Text>
              </Flex.RSC>
              <Flex.RSC layout="150px 1">
                <Text color={'#777777'}>주문번호</Text>
                <Text>{order.id}</Text>
              </Flex.RSC>
            </Flex.CSS>
          </Box>
        </Box>
        <Box border="lightgray">
          <Box padding={`${PLANCK * 4}px ${PLANCK * 6}px`}>
            <Text size={FONTSIZE_20}>주문옵션</Text>
          </Box>
          <Divider.H1 />
          <Box padding={PLANCK * 6}>
            <Flex.CSS full gap={PLANCK * 6}>
              {order.orderMenuList.map((orderMenu, index) => {
                return (
                  <div key={index}>
                    <Text size={FONTSIZE_18} weight={700}>{`${`00${index + 1}`.slice(
                      -2,
                    )}. ${orderMenu.menuName} • ${
                      orderMenu.quantity
                    }개 • ${orderMenu.menuAndSubOptionAndQuantityPrice.toLocaleString()}원`}</Text>
                    <Space.H3 />
                    <Flex.RSS>
                      <Space.V6 />
                      <Grid columnCount={1} gap={PLANCK * 3}>
                        {orderMenu.orderSubOptionList
                          .reduce<any[]>((arr, orderSubOption) => {
                            return [...arr, ...orderSubOption.orderSubOptionItemList];
                          }, [])
                          .map((item, index) => {
                            return (
                              <Flex.RSC key={index}>
                                <Text color={COLOR_PRIMARY}>+</Text>
                                <Space.V2 />
                                <Text>{item.subOptionItemName}</Text>
                                <Space.V2 />
                                <Text>{`+${item.subOptionItemPrice.toLocaleString()}원`}</Text>
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
          <Box padding={`${PLANCK * 4}px ${PLANCK * 6}px`}>
            <Text size={FONTSIZE_20}>결제 금액</Text>
          </Box>
          <Divider.H1 />
          <Box padding={PLANCK * 6}>
            <Flex.CSS full gap={PLANCK * 4}>
              <Flex.RSC layout="150px 1">
                <Text color={'#777777'}>주문금액</Text>
                <Text>{`${order.orderAmount.toLocaleString()}원`}</Text>
              </Flex.RSC>
              <Flex.RSC layout="150px 1">
                <Text color={'#777777'}>할인금액</Text>
                <Text color={COLOR_PRIMARY}>
                  {order.discountAmount > 0 ? `-${order.discountAmount.toLocaleString()}원` : '0원'}
                </Text>
              </Flex.RSC>
              <Flex.RSC layout="150px 1">
                <Text color={'#777777'}>배달팁</Text>
                <Text>{`${order.deliveryFee.toLocaleString()}원`}</Text>
              </Flex.RSC>
              <Divider.H1 />
              <Flex.RSC layout="150px 1">
                <Text size={FONTSIZE_18} weight={700}>
                  총 결제금액
                </Text>
                <Text
                  size={FONTSIZE_18}
                  weight={700}
                >{`${order.payAmount.toLocaleString()}원`}</Text>
              </Flex.RSC>
            </Flex.CSS>
          </Box>
        </Box>
        <Box border="lightgray">
          <Box padding={`${PLANCK * 4}px ${PLANCK * 6}px`}>
            <Text size={FONTSIZE_20}>결제 방법</Text>
          </Box>
          <Divider.H1 />
          <Box padding={PLANCK * 6}>
            <Flex.CSS full gap={PLANCK * 4}>
              <Flex.RSC layout="150px 1">
                <Text color={'#777777'}>결제방법</Text>
                <Text>{order.paymentMethodName}</Text>
              </Flex.RSC>
            </Flex.CSS>
          </Box>
        </Box>
        {order.mealType === 'DELIVERY' ? (
          <Box border="lightgray">
            <Box padding={`${PLANCK * 4}px ${PLANCK * 6}px`}>
              <Text size={FONTSIZE_20}>배달 정보</Text>
            </Box>
            <Divider.H1 />
            <Box padding={PLANCK * 6}>
              <Flex.CSS full gap={PLANCK * 4}>
                <Flex.RSC layout="150px 1">
                  <Text color={'#777777'}>배달주소</Text>
                  <Text>{order.deliveryAddress + ' ' + order.deliveryAddressDetail}</Text>
                </Flex.RSC>
                <Flex.RSC layout="150px 1">
                  <Text color={'#777777'}>전화번호</Text>
                  <Text>{order.mobile}</Text>
                </Flex.RSC>
                <Flex.RSC layout="150px 1">
                  <Text color={'#777777'}>패밀리 요청</Text>
                  <Text>{order.orderMessage}</Text>
                </Flex.RSC>
                <Flex.RSC layout="150px 1">
                  <Text color={'#777777'}>배달기사 요청</Text>
                  <Text>{order.deliveryMessage}</Text>
                </Flex.RSC>
              </Flex.CSS>
            </Box>
          </Box>
        ) : (
          <Box border="lightgray">
            <Box padding={`${PLANCK * 4}px ${PLANCK * 6}px`}>
              <Text size={FONTSIZE_20}>포장 정보</Text>
            </Box>
            <Divider.H1 />
            <Box padding={PLANCK * 6}>
              <Flex.CSS full gap={PLANCK * 4}>
                <Flex.RSC layout="150px 1">
                  <Text color={'#777777'}>전화번호</Text>
                  <Text>{order.mobile}</Text>
                </Flex.RSC>
              </Flex.CSS>
            </Box>
          </Box>
        )}
      </Grid>
    </Template>
  );
};

MyPageOrderPageTemplate.Mobile = MyPageOrderPageTemplateMobile;
