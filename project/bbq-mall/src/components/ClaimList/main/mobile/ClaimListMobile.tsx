'use client';

import { ReactNode } from 'react';

import DeliveryCheck from '@/components/DeliveryCheck';
import { ValueOfStaus } from '@/types/orderHistoryRelated';

import CancelOrder from '../../CancelOrder';
import ChangeAddress from '../../ChangeAddress';
import ConfirmOrder from '../../ConfirmOrder';
import DeliveryDone from '../../DeliveryDone';
import Exchange from '../../Exchange';
import Return from '../../Return';
import ViewClaim from '../../ViewClaim';
import WithdrawClaim from '../../WithdrawClaim';
import WriteReview from '../../WriteReview';
import { ClaimListProps, GetActiveCanBeUndefined } from '../pc/ClaimList';

const claimList: (props: GetActiveCanBeUndefined) => Record<ValueOfStaus, ReactNode> = ({
  resetClaimType,
  data,
  refetch,
  activeOrderOption,
}: GetActiveCanBeUndefined) => ({
  CHANGE_ADDRESS: (
    <ChangeAddress.Mobile resetClaimType={resetClaimType} data={data} refetch={refetch} />
  ),
  CANCEL_ALL: <CancelOrder.Mobile resetClaimType={resetClaimType} data={data} refetch={refetch} />,
  EXCHANGE: (
    <Exchange.Mobile
      resetClaimType={resetClaimType}
      data={data}
      refetch={refetch}
      activeOrderOption={activeOrderOption}
    />
  ),
  CANCEL: <CancelOrder.Mobile resetClaimType={resetClaimType} data={data} refetch={refetch} />,
  DELIVERY_DONE: (
    <>
      {activeOrderOption && (
        <DeliveryDone.Mobile
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
        <DeliveryCheck.Mobile
          resetClaimType={resetClaimType}
          activeOrderOption={activeOrderOption}
        />
      )}
    </>
  ),

  RETURN: <Return.Mobile resetClaimType={resetClaimType} data={data} refetch={refetch} />,
  CONFIRM_ORDER: (
    <>
      {activeOrderOption && (
        <ConfirmOrder.Mobile
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
        <ViewClaim.Mobile
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
        <WithdrawClaim.Mobile
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
        <WithdrawClaim.Mobile
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
        <WithdrawClaim.Mobile
          resetClaimType={resetClaimType}
          refetch={refetch}
          activeOrderOption={activeOrderOption}
        />
      )}
    </>
  ),
});

const ClaimListMobile = ({
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

export default ClaimListMobile;
