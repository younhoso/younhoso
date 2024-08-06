import { FC } from 'react';

import styled from 'styled-components';

import { CheckBox, Flex, Space, Text } from '@/components/atoms';
import { FONTSIZE_12, FONTSIZE_15, PLANCK } from '@/constants';
import { useAuth } from '@/hooks';

import { CheckoutPageTemplateProps } from '../../../../CheckoutPageTemplate';

const MINIMUM_AVAILABLE_POINT = 100;

const cut100 = (value: number) => {
  return Math.floor(value / 100) * 100;
};

const PointSectionBody: FC<CheckoutPageTemplateProps> = ({
  pointState,
  setPointState,
  totalPriceWithoutPoint,
}) => {
  const { pointAmount } = useAuth();
  const availablePointValue = Number(pointAmount ?? 0);

  return (
    <>
      <Flex>
        <Text size={FONTSIZE_15}>포인트</Text>
        <Space.V2 />
        <Text size={FONTSIZE_15} color={'#b92c35'}>
          {availablePointValue.toLocaleString()}p
        </Text>
      </Flex>
      <Space.H2 />
      <Text size={FONTSIZE_12} color={'#777'}>
        *포인트는 100P 단위로 사용 가능합니다
      </Text>
      <Space.H4 />

      <div
        style={
          availablePointValue < MINIMUM_AVAILABLE_POINT
            ? {
                maxWidth: 100,
                pointerEvents: 'none',
                opacity: 0.6,
              }
            : {
                maxWidth: 100,
              }
        }
      >
        <Input>
          <InputField
            placeholder="사용할 포인트 입력"
            value={pointState._point ?? pointState.point}
            onChange={e => {
              const inputValue = e.target.value.replace(/[^0-9]/g, '');
              if (inputValue) {
                const limitedValue = Math.min(
                  Math.max(Number(inputValue ?? 0), 0),
                  availablePointValue,
                  totalPriceWithoutPoint ?? 0,
                );
                setPointState(Object.assign({}, pointState, { _point: limitedValue }));
              } else {
                setPointState(Object.assign({}, pointState, { _point: '' }));
              }
            }}
            onBlur={e => {
              const limitedValue = Math.min(
                Math.max(Number(pointState._point ?? 0), 0),
                availablePointValue,
                totalPriceWithoutPoint ?? 0,
              );
              if (limitedValue > 0 && limitedValue < MINIMUM_AVAILABLE_POINT) {
                setPointState(Object.assign({}, pointState, { point: '', _point: '' }));
              } else {
                setPointState(
                  Object.assign({}, pointState, {
                    point: cut100(limitedValue),
                    _point: cut100(limitedValue),
                  }),
                );
              }
            }}
          />
          <InputTag />
        </Input>
        <Space.H2 />
        <CheckBox.Mobile
          label={`전액사용`}
          checked={
            availablePointValue >= MINIMUM_AVAILABLE_POINT &&
            (cut100(Number(pointState.point)) === cut100(availablePointValue) ||
              (totalPriceWithoutPoint > 0 &&
                cut100(Number(pointState.point)) === cut100(totalPriceWithoutPoint ?? 0)))
          }
          onClick={() => {
            if (availablePointValue >= MINIMUM_AVAILABLE_POINT) {
              if (
                Number(pointState.point) === availablePointValue ||
                (totalPriceWithoutPoint > 0 &&
                  Number(pointState.point) >= (totalPriceWithoutPoint ?? 0))
              ) {
                setPointState(Object.assign({}, pointState, { point: 0, _point: 0 }));
              } else {
                const limitedValue = cut100(
                  Math.min(availablePointValue, totalPriceWithoutPoint ?? 0),
                );
                setPointState(
                  Object.assign({}, pointState, {
                    point: limitedValue,
                    _point: limitedValue,
                  }),
                );
              }
            }
          }}
        />
      </div>
    </>
  );
};

const Input = styled.div`
  display: flex;
  min-width: 220px;
  align-items: center;
  border-radius: 7px;
  border: solid 1px #e8eaf0;
  background-color: #f9fafb;
  height: 36px;
  padding-left: ${PLANCK * 2}px;
`;

const InputField = styled.input`
  width: 165px;
  flex: 1;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 15px;
  font-weight: 500;
  appearance: none;
  box-shadow: none;
  background-color: transparent;
`;

const InputTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-left: 1px solid #e8eaf0;

  &::after {
    content: 'P';
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1em;
    letter-spacing: normal;
    text-align: left;
    color: #8e93ad;
  }
`;

export default PointSectionBody;
