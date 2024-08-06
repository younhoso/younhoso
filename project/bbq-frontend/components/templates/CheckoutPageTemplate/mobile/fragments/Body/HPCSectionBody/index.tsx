import { FC } from 'react';

import { Arrow, Flex, Space, Text } from '@/components/atoms';
import { COLOR_BLACK, COLOR_RED, FONTSIZE_14 } from '@/constants';

import { CheckoutPageTemplateProps } from '../../../../CheckoutPageTemplate';

const mapError = (status: string): string => {
  switch (status) {
    default:
      return status;
  }
};

const HPCSectionBody: FC<CheckoutPageTemplateProps> = ({ hpcPointState, handleHpcButtonClick }) => {
  if (!hpcPointState) return null;

  return (
    <>
      <Flex.RSC
        full={true}
        style={{
          border: '1px solid #e8eaf0',
          borderRadius: '7px',
          height: '35px',
          cursor: 'pointer',
        }}
        onClick={() => handleHpcButtonClick && handleHpcButtonClick()}
        layout="auto 1 auto auto"
      >
        <Space.V2_5 />
        <Text size={FONTSIZE_14} color={COLOR_BLACK}>
          해피포인트
        </Text>
        <Flex.RSC>
          {hpcPointState?.status === 'SUCCESS' ? (
            hpcPointState.usePoints ? (
              <Text size={FONTSIZE_14} color={COLOR_RED}>
                {`-${hpcPointState.usePoints.toLocaleString()}p`}
              </Text>
            ) : (
              <Text size={FONTSIZE_14} color={COLOR_BLACK}>
                등록완료
              </Text>
            )
          ) : hpcPointState?.status === 'CI_REQUIRED' ? (
            <Text size={FONTSIZE_14} color={COLOR_BLACK}>
              미등록
            </Text>
          ) : hpcPointState?.status === 'NOT_HPC_MEMBER' ? (
            <Text size={FONTSIZE_14} color={COLOR_RED}>
              해피포인트 회원이 아님
            </Text>
          ) : (
            <Text size={FONTSIZE_14} color={COLOR_BLACK}>
              {mapError(hpcPointState?.status ?? '알 수 없음')}
            </Text>
          )}
          <Space.V1_5 />
          <Arrow.Right size={3} thickness={1.5} color={COLOR_BLACK} />
        </Flex.RSC>
        <Space.V4 />
      </Flex.RSC>
    </>
  );
};

export default HPCSectionBody;
