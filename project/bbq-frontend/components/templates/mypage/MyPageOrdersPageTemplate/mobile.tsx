import { FC, Fragment } from 'react';

import { useRouter } from 'next/router';

import styled, { css } from 'styled-components';

import {
  Box,
  Divider,
  Flex,
  Icon,
  Image,
  Pagination as PaginationComponent,
  Space,
  Text,
} from '@/components/atoms';
import {
  COLOR_BLACK,
  FONTSIZE_12,
  FONTSIZE_13,
  FONTSIZE_14,
  FONTSIZE_16,
  FONTSIZE_20,
  PLANCK,
} from '@/constants';
import { useAuth } from '@/hooks';
import { dayjs } from '@/libs';
import { MealTypeEnum } from '@/types';

import { Template } from '../components';
import { MyPageOrdersPageTemplateComponentProps } from './MyPageOrdersPageTemplate';

export const MyPageOrdersPageTemplateMobile: FC<MyPageOrdersPageTemplateComponentProps> = ({
  page,
  setPage,
  data,
  handleOrderAgainButtonClick,
  handleAddToQuickOrderButtonClick,
}) => {
  const router = useRouter();
  const { member } = useAuth();

  return (
    <Template.Mobile title={member ? '주문 이력 & 퀵오더 등록' : '주문 이력'}>
      <Flex.CSS full gap={PLANCK * 3}>
        {!data.content.length ? (
          <>
            <Space.H20 />
            <Flex.CCC full={true}>
              <Icon src={'loudspeaker-lightgray.svg'} size={45} />
              <Space.H3 />
              <Text color={'#777777'} size={FONTSIZE_14}>
                아직 주문하신 내역이 없습니다.
              </Text>
            </Flex.CCC>
            <Space.H20 />
          </>
        ) : null}
        {data.content.map((order, index) => {
          return (
            <Box full={true} key={index} border="#dddddd">
              <Flex.RBC padding={`${PLANCK * 3}px ${PLANCK * 3}px`}>
                <div>
                  <Text size={FONTSIZE_14}>
                    {order.payedAt
                      ? dayjs(order.payedAt).format('YYYY년 MM월 DD일')
                      : '알 수 없는 시간에 '}{' '}
                    주문
                  </Text>
                  <Space.H1_5 />
                  <Text
                    size={FONTSIZE_16}
                    color={
                      order.orderStatusName.indexOf('취소') >= 0
                        ? '#b92c35'
                        : order.orderStatusName.indexOf('완료') >= 0
                          ? '#3aba65'
                          : COLOR_BLACK
                    }
                  >
                    {order.orderStatusName}
                  </Text>
                </div>
                <Flex.CSS gap={PLANCK}>
                  <MypageButton
                    colorType={'outline'}
                    onClick={() => handleOrderAgainButtonClick({ order })}
                  >
                    다시 주문할게요
                  </MypageButton>
                  <MypageButton onClick={() => handleAddToQuickOrderButtonClick({ order })}>
                    + 퀵오더로 등록
                  </MypageButton>
                </Flex.CSS>
              </Flex.RBC>
              <Divider.H1 />
              <Box padding={PLANCK * 3}>
                <Flex.CCB>
                  {[order.orderMenuList[0]].map((menu, index) => {
                    return (
                      <Fragment key={index}>
                        <Flex.RSC layout={'auto auto 1 auto auto'}>
                          <Image
                            src={menu.menuImageUrl}
                            width={60}
                            height={60}
                            backgroundPosition="center"
                            backgroundSize="cover"
                          />
                          <Space.V2 />
                          <Flex.CCB>
                            <Text size={FONTSIZE_12} lineHeight={'1.3em'}>
                              {`[${order.familyInfo.branchName}] ${menu.menuName}`}
                            </Text>
                            <Space.H1 />
                            <Text size={FONTSIZE_12} lineHeight={'1.3em'} color={'#777'}>
                              {`[${
                                order.mealType.toUpperCase() === MealTypeEnum.Delivery
                                  ? '배달'
                                  : '포장'
                              }] ${order.orderMenuList[0].menuName}${
                                order.orderMenuList.length > 1
                                  ? ` 외 ${order.orderMenuList.length}건`
                                  : ''
                              }`}
                            </Text>
                            <Space.H1 />
                            <OptionTag
                              onClick={() => {
                                router.push(`/mypage/orders/${order.id}`);
                              }}
                            >
                              주문상세
                            </OptionTag>
                          </Flex.CCB>
                          <Space.V2 />
                          <Flex.RSC>
                            <Text size={FONTSIZE_13}>
                              {(order.payAmount ?? 0).toLocaleString()}원
                            </Text>
                          </Flex.RSC>
                        </Flex.RSC>
                      </Fragment>
                    );
                  })}
                </Flex.CCB>
              </Box>
            </Box>
          );
        })}
        {data.content.length ? (
          <>
            <Space.H4 />
            <Flex.RCC full={true}>
              <PaginationComponent.Mobile
                currentPage={page}
                totalPageCount={data.totalPages}
                onPageButtonClick={page => {
                  setPage(page);
                }}
              />
            </Flex.RCC>
          </>
        ) : null}
      </Flex.CSS>
      <Space.H4 />
    </Template.Mobile>
  );
};

const MypageButton = styled.button<{ colorType?: string }>`
  padding: 5px 0;
  width: 90px;
  border-radius: 5px;
  font-size: 11px;

  border: 1px solid #cf1838;
  color: #ffffff;
  background: #e52143;
  cursor: pointer;
  font-weight: 700;

  ${props =>
    props.colorType === 'outline' &&
    css`
      border: 2px solid #e52143;
      color: #000000;
      background: #ffffff;
    `}
`;

const OptionTag = styled.div`
  width: 60px;
  height: auto;
  background: #f9fafb;
  border-radius: 99999px;
  border: 1px solid #e8eaf0;
  font-size: 11px;
  text-align: center;
  padding: 4px 0px;
  font-weight: 600;
  cursor: pointer;
`;
