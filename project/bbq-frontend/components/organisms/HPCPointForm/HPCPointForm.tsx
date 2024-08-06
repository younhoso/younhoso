import { useState } from 'react';

import styled from 'styled-components';

import { CheckBox, Divider, Flex, Image, RadioBox, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { CheckoutPageHPCState } from '@/components/templates';
import { COLOR_BLACK, COLOR_RED, FONTSIZE_14, FONTSIZE_16, FONTSIZE_18, PLANCK } from '@/constants';
import { copyDeep } from '@/utils';

const MINIMUM_PERMITED_OWN_POINT = 1000;
const MINIMUM_AVAILABLE_POINT = 100;

const cut100 = (value: number) => {
  return Math.floor(value / 100) * 100;
};

export const HPCPointForm = ({
  hpcPointState,
  handleConfirmButtonClick,
}: {
  hpcPointState: CheckoutPageHPCState;
  handleConfirmButtonClick: (newState: CheckoutPageHPCState) => void;
}) => {
  const [state, setState] = useState<CheckoutPageHPCState>(
    copyDeep<CheckoutPageHPCState>(hpcPointState),
  );

  const availablePointValue: number = state.points ?? 0;

  return (
    <Flex.CCC full padding={PLANCK * 3}>
      <Image src={'checkout/happy-point-logo.svg'} width={'60px'} />
      <Space.H4 />
      <Flex.RSC>
        <Text size={FONTSIZE_18} color={COLOR_BLACK} weight={700}>
          해피 포인트&nbsp;:&nbsp;
        </Text>
        <Text size={FONTSIZE_18} color={COLOR_RED} weight={700}>
          {state.points?.toLocaleString() ?? 0} P 보유
        </Text>
      </Flex.RSC>
      <Space.H5 />
      <Flex.RSC
        full={true}
        style={
          availablePointValue < MINIMUM_AVAILABLE_POINT ||
          availablePointValue < MINIMUM_PERMITED_OWN_POINT
            ? {
                pointerEvents: 'none',
                opacity: 0.6,
              }
            : {}
        }
      >
        <Input>
          <InputField
            placeholder="사용할 포인트 입력"
            value={state.usePoints}
            onChange={e => {
              const inputValue = e.target.value.replace(/[^0-9]/g, '');
              if (inputValue) {
                const limitedValue = Math.min(
                  Math.max(Number(inputValue ?? 0), 0),
                  availablePointValue,
                );
                setState(Object.assign({}, state, { usePoints: limitedValue }));
              } else {
                setState(Object.assign({}, state, { usePoints: 0 }));
              }
            }}
            onBlur={e => {
              const inputValue = e.target.value.replace(/[^0-9]/g, '');

              const limitedValue = Math.min(
                Math.max(Number(inputValue ?? 0), 0),
                availablePointValue,
              );

              if (limitedValue > 0 && limitedValue < MINIMUM_AVAILABLE_POINT) {
                alert('100P 이상 사용 가능합니다');
                setState(Object.assign({}, state, { usePoints: 0 }));
              } else {
                setState(Object.assign({}, state, { usePoints: cut100(limitedValue) }));
              }
            }}
          />
          <InputTag />
        </Input>
        <Space.V2 />
        <CheckBox
          label={`전액사용`}
          checked={
            availablePointValue >= MINIMUM_AVAILABLE_POINT &&
            cut100(Number(state.usePoints)) === cut100(availablePointValue)
          }
          onClick={() => {
            if (availablePointValue >= MINIMUM_AVAILABLE_POINT) {
              if (Number(state.usePoints) === availablePointValue) {
                setState(Object.assign({}, state, { usePoints: 0 }));
              } else {
                setState(
                  Object.assign({}, state, {
                    usePoints: cut100(availablePointValue),
                  }),
                );
              }
            }
          }}
        />
      </Flex.RSC>
      <Space.H3 />
      <Text full={true} size={FONTSIZE_14} lineHeight={'1.6em'} color={'#777777'}>
        ㆍ1,000P 이상 보유한 회원만 사용 가능합니다.
        <br />
        ㆍ최소 100P부터 사용 가능합니다.
        <br />
        ㆍ100P 단위로 사용 가능합니다.
      </Text>
      <Space.H3 />
      <Divider.H1 />
      <Space.H4 />
      <Flex.RSC gap={PLANCK * 8}>
        <RadioBox
          checked={state.applyFor === 'BBQ'}
          onClick={() => {
            let data = copyDeep<CheckoutPageHPCState>(state);
            data.applyFor = 'BBQ';
            setState(data);
          }}
          label={'비비큐포인트 적립'}
        />
        <RadioBox
          checked={state.applyFor === 'HPC'}
          onClick={() => {
            let data = copyDeep<CheckoutPageHPCState>(state);
            data.applyFor = 'HPC';
            setState(data);
          }}
          label={'해피포인트 적립'}
        />
      </Flex.RSC>
      <Space.H5 />
      <Button
        full
        color="red"
        shape="round"
        text="확인"
        onClick={() => handleConfirmButtonClick(state)}
      />
    </Flex.CCC>
  );
};

const Input = styled.div`
  display: flex;

  align-items: center;
  border-radius: 7px;
  border: solid 1px #e8eaf0;
  background-color: #f9fafb;
  height: 36px;
  padding-left: ${PLANCK * 2}px;
`;

const InputField = styled.input`
  flex: 1;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 15px;
  font-weight: 500;
  appearance: none;
  box-shadow: none;
  background-color: transparent;
  text-align: right;
`;

const InputTag = styled.div`
  margin-left: ${PLANCK * 2}px;
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
