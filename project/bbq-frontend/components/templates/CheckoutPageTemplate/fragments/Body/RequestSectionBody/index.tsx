import { FC } from 'react';

import styled from 'styled-components';

import { CheckBox, Flex, Grid, Input, RadioBox, Select, Space, Text } from '@/components/atoms';
import { COLOR_GRAY, FONTSIZE_13, FONTSIZE_15, PLANCK } from '@/constants';
import { MealTypeEnum } from '@/types';

import { CheckoutPageTemplateProps } from '../../../CheckoutPageTemplate';

const RequestSectionBody: FC<CheckoutPageTemplateProps> = ({
  checkoutData,
  requestState,
  setRequestState,
}) => {
  return (
    <>
      <Text>• 패밀리 사장님께</Text>
      <Space.H2 />
      <Input
        multiline
        value={requestState.orderMessage}
        placeholder="예) 맛있게 튀겨 주세요"
        height={60}
        onChange={e => {
          setRequestState(
            Object.assign({}, requestState, {
              orderMessage: e.target.value,
            }),
          );
        }}
      />
      <Space.H1 />
      <StyledGrid columnCount={4}>
        <CheckBox
          checked={
            !requestState.orderMessageExcludeRadish &&
            !requestState.orderMessageExcludeBeverage &&
            !requestState.orderMessageExcludeDisposableProducts
          }
          label={
            <>
              <Space.V1_5 />
              <Text size={FONTSIZE_15} color={'#777777'}>
                선택사항 없음
              </Text>
            </>
          }
          onClick={() => {
            setRequestState(
              Object.assign({}, requestState, {
                orderMessageExcludeRadish: false,
                orderMessageExcludeBeverage: false,
                orderMessageExcludeDisposableProducts: false,
              }),
            );
          }}
        />
        <CheckBox
          checked={requestState.orderMessageExcludeRadish}
          label={
            <>
              <Space.V1_5 />
              <Text size={FONTSIZE_15} color={'#777777'}>
                치킨무 빼주세요
              </Text>
            </>
          }
          onClick={() => {
            setRequestState(
              Object.assign({}, requestState, {
                orderMessageExcludeRadish: !requestState.orderMessageExcludeRadish,
              }),
            );
          }}
        />
        <CheckBox
          checked={requestState.orderMessageExcludeBeverage}
          label={
            <>
              <Space.V1_5 />
              <Text size={FONTSIZE_15} color={'#777777'}>
                음료 빼주세요
              </Text>
            </>
          }
          onClick={() => {
            setRequestState(
              Object.assign({}, requestState, {
                orderMessageExcludeBeverage: !requestState.orderMessageExcludeBeverage,
              }),
            );
          }}
        />
        <CheckBox
          checked={requestState.orderMessageExcludeDisposableProducts}
          label={
            <>
              <Space.V1_5 />
              <Text size={FONTSIZE_15} color={'#777777'}>
                일회용품 빼주세요
              </Text>
            </>
          }
          onClick={() => {
            setRequestState(
              Object.assign({}, requestState, {
                orderMessageExcludeDisposableProducts:
                  !requestState.orderMessageExcludeDisposableProducts,
              }),
            );
          }}
        />
      </StyledGrid>
      {false && (
        <>
          <Space.H2 />
          <CheckBox
            checked={requestState.useOrderMessageStateLater}
            label={
              <>
                <Space.V1_5 />
                <Text size={FONTSIZE_15} color={'#777777'}>
                  다음에도 사용하기
                </Text>
              </>
            }
            onClick={() => {
              setRequestState(
                Object.assign({}, requestState, {
                  useOrderMessageStateLater: !requestState.useOrderMessageStateLater,
                }),
              );
            }}
          />
        </>
      )}
      <Space.H8 />
      {checkoutData.mealType === MealTypeEnum.Delivery ? (
        <>
          <Text>• 배달 기사님께</Text>
          <Space.H2 />
          <Select
            options={[
              { value: '', label: '(선택해 주세요)' },
              {
                value: '문 앞에 두고 벨 눌러주세요',
                label: '문 앞에 두고 벨 눌러주세요',
              },
              {
                value: '문 앞에 두고 노크해주세요',
                label: '문 앞에 두고 노크해주세요',
              },
              {
                value: '문 앞에 두면 가져갈게요(벨X, 노크X)',
                label: '문 앞에 두면 가져갈게요(벨X, 노크X)',
              },
              { value: '직접 받을게요', label: '직접 받을게요' },
              {
                value: '전화주시면 마중 나갈게요',
                label: '전화주시면 마중 나갈게요',
              },
              { value: 'etc', label: '직접 입력하기' },
            ]}
            placeholder={'요청사항을 선택해주세요'}
            value={requestState.deliveryMessageSelectValue}
            onChange={value => {
              setRequestState(
                Object.assign({}, requestState, {
                  deliveryMessageSelectValue: value,
                }),
              );
            }}
          />
          {requestState.deliveryMessageSelectValue === 'etc' ? (
            <>
              <Space.H1 />
              <Input
                multiline
                value={requestState.deliveryMessage}
                placeholder="상세 요청 사항을 입력해 주세요."
                height={60}
                onChange={e => {
                  setRequestState(
                    Object.assign({}, requestState, {
                      deliveryMessage: e.target.value,
                    }),
                  );
                }}
              />
            </>
          ) : null}
        </>
      ) : (
        <>
          <Flex.RSE>
            <Text>• 매장 도착 예상 시간</Text>
            <Space.V2 />
            <Text size={FONTSIZE_13} color={COLOR_GRAY}>
              최소 조리시간은 15분 입니다.
            </Text>
          </Flex.RSE>
          <Space.H3_5 />
          <Flex gap={PLANCK * 6}>
            {[20, 30, 45, 60, 90].map((time, index) => {
              return (
                <RadioBox
                  key={index}
                  checked={requestState.deliveryArrivalTime === time}
                  label={
                    <>
                      <Space.V1_5 />
                      <Text size={FONTSIZE_15} color={'#777777'}>
                        {time}분
                      </Text>
                    </>
                  }
                  onClick={() => {
                    setRequestState(
                      Object.assign({}, requestState, {
                        deliveryArrivalTime: time,
                      }),
                    );
                  }}
                />
              );
            })}
          </Flex>
        </>
      )}
    </>
  );
};

const StyledGrid = styled(Grid)`
  border: 1px solid #cccfde;
  background-color: #f9fafb;
  border-radius: 5px;
  padding: ${PLANCK * 3}px ${PLANCK * 4}px;
  box-sizing: border-box;
`;

export default RequestSectionBody;
