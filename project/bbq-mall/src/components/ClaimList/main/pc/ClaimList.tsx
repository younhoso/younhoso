'use client';

import { ReactNode } from 'react';

import DeliveryCheck from '@/components/DeliveryCheck';
import { OrderHistoryDetail, OrderOption, ValueOfStaus } from '@/types/orderHistoryRelated';

import CancelOrder from '../../CancelOrder';
import ChangeAddress from '../../ChangeAddress';
import ConfirmOrder from '../../ConfirmOrder';
import DeliveryDone from '../../DeliveryDone';
import Exchange from '../../Exchange';
import Return from '../../Return';
import ViewClaim from '../../ViewClaim';
import WithdrawClaim from '../../WithdrawClaim';
import WriteReview from '../../WriteReview';

export interface ClaimListProps {
  claimType: ValueOfStaus | undefined;
  resetClaimType: () => void;
  data: OrderHistoryDetail | undefined;
  refetch: () => Promise<unknown>;
  activeOrderOption: OrderOption | undefined;
}

type RequiredClaimListProps = {
  [K in keyof ClaimListProps]: NonNullable<ClaimListProps[K]>;
};

export interface GetActiveCanBeUndefined
  extends Omit<RequiredClaimListProps, 'activeOrderOption' | 'claimType'> {
  activeOrderOption: OrderOption | undefined;
}

const claimList: (props: GetActiveCanBeUndefined) => Record<ValueOfStaus, ReactNode> = ({
  resetClaimType,
  data,
  refetch,
  activeOrderOption,
}: GetActiveCanBeUndefined) => ({
  CHANGE_ADDRESS: <ChangeAddress resetClaimType={resetClaimType} data={data} refetch={refetch} />,
  CANCEL_ALL: <CancelOrder resetClaimType={resetClaimType} data={data} refetch={refetch} />,
  EXCHANGE: (
    <Exchange
      resetClaimType={resetClaimType}
      data={data}
      refetch={refetch}
      activeOrderOption={activeOrderOption}
    />
  ),
  CANCEL: <CancelOrder resetClaimType={resetClaimType} data={data} refetch={refetch} />,
  DELIVERY_DONE: (
    <>
      {activeOrderOption && (
        <DeliveryDone
          resetClaimType={resetClaimType}
          refetch={refetch}
          activeOrderOption={activeOrderOption}
        />
      )}
    </>
  ),
  VIEW_DELIVERY: (
    <>
      {activeOrderOption && (
        <DeliveryCheck resetClaimType={resetClaimType} activeOrderOption={activeOrderOption} />
      )}
    </>
  ),

  RETURN: <Return resetClaimType={resetClaimType} data={data} refetch={refetch} />,
  CONFIRM_ORDER: (
    <>
      {activeOrderOption && (
        <ConfirmOrder
          resetClaimType={resetClaimType}
          refetch={refetch}
          activeOrderOption={activeOrderOption}
        />
      )}
    </>
  ),
  WRITE_REVIEW: <WriteReview resetClaimType={resetClaimType} />,
  VIEW_CLAIM: (
    <>
      {activeOrderOption && (
        <ViewClaim
          resetClaimType={resetClaimType}
          activeOrderOption={activeOrderOption}
          data={data}
        />
      )}
    </>
  ),
  WITHDRAW_CANCEL: (
    <>
      {activeOrderOption && (
        <WithdrawClaim
          resetClaimType={resetClaimType}
          refetch={refetch}
          activeOrderOption={activeOrderOption}
        />
      )}
    </>
  ),
  WITHDRAW_EXCHANGE: (
    <>
      {activeOrderOption && (
        <WithdrawClaim
          resetClaimType={resetClaimType}
          refetch={refetch}
          activeOrderOption={activeOrderOption}
        />
      )}
    </>
  ),
  WITHDRAW_RETURN: (
    <>
      {activeOrderOption && (
        <WithdrawClaim
          resetClaimType={resetClaimType}
          refetch={refetch}
          activeOrderOption={activeOrderOption}
        />
      )}
    </>
  ),
});

const ClaimList = ({
  claimType,
  resetClaimType,
  data,
  refetch,
  activeOrderOption,
}: ClaimListProps) => {
  if (!claimType || !data) {
    return null;
  }

  return claimList({ resetClaimType, data, refetch, activeOrderOption })[claimType];
};

export default ClaimList;
