'use client';

import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';
import { omit } from 'lodash';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import RefundInfo from '@/components/ClaimList/RefundInfo';
import ClaimModal from '@/components/ClaimModal';
import Divider from '@/components/Divider';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Textarea from '@/components/Textarea';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { bankList } from '@/constant/bankList';
import { useHandleCheckbox } from '@/hooks/useHandleCheckbox';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { theme } from '@/provider/CustomThemeProvider';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { ClaimBody, ClaimPrice, ClaimPriceBody } from '@/types';
import { GUEST_TOKEN, getSessionStorageItem } from '@/utils/sessionStorage';

import { CancelOrderProps, defaultPrice } from '../pc/CancelOrder';
import { CancelOrderMobileStyled } from './styled';

export const cashRefundType = ['CASH', 'ACCOUNT'];

const CancelOrderMobile = ({ className, resetClaimType, data, refetch }: CancelOrderProps) => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const [confirmClaimModal, setConfirmClaimModal] = useState(false);
  const [open, setOpen] = useState(true);
  const [refundAccount, setRefundAccout] = useState({
    bankAccount: '',
    bankDepositorName: '',
    bank: '',
  });
  const [claimReason, setClaimReason] = useState(data.claimReasonTypes[0].claimReasonType);
  const [claimReasonDetail, setClaimReasonDetail] = useState('');
  const { isSignIn, isLoading } = useHandleIsSignIn();
  const isCashRefundType = cashRefundType.includes(data.refundType);
  const cancelable = data.orderOptionsGroupByPartner.flatMap(v =>
    v.orderOptionsGroupByDelivery
      .flatMap(k => k.orderOptions)
      .filter(
        k =>
          data.escrow ||
          k.nextActions.some(
            j => j.nextActionType === 'CANCEL' || j.nextActionType === 'CANCEL_ALL',
          ),
      ),
  );

  const { indeterminate, checkAll, onClickCheckAll, onChangeCheckbox, checkedList } =
    useHandleCheckbox(
      cancelable.map(k => ({ label: k.optionName, value: k.orderOptionNo })),
      true,
    );

  const isDepositWait = cancelable
    .filter(v => checkedList.includes(v.orderOptionNo))
    .every(v => v.orderStatusType === 'DEPOSIT_WAIT');

  const { mutateAsync, data: refundInfo } = useMutation({
    mutationFn: (body: ClaimPriceBody) =>
      isSignIn
        ? customAxios(PLATFORMLIST.MOBILE_WEB).post<ClaimPrice>('/profile/claims/estimate', body)
        : customAxios(PLATFORMLIST.MOBILE_WEB).post<ClaimPrice>('/guest/claims/estimate', body, {
            headers: {
              guestToken: getSessionStorageItem(GUEST_TOKEN),
            },
          }),
  });

  const { mutateAsync: refund } = useMutation({
    mutationFn: (body: ClaimBody) =>
      isSignIn
        ? customAxios(PLATFORMLIST.MOBILE_WEB).post<ClaimPrice>('/profile/claims/cancel', body)
        : customAxios(PLATFORMLIST.MOBILE_WEB).post<ClaimPrice>('/guest/claims/cancel', body, {
            headers: {
              guestToken: getSessionStorageItem(GUEST_TOKEN),
            },
          }),
  });
  const { mutateAsync: refundAll } = useMutation({
    mutationFn: (body: ClaimBody) =>
      isSignIn
        ? customAxios(PLATFORMLIST.MOBILE_WEB).post<ClaimPrice>(
            `/profile/orders/${data.orderNo}/claims/cancel`,
            body,
          )
        : customAxios(PLATFORMLIST.MOBILE_WEB).post<ClaimPrice>(
            `/guest/orders/${data.orderNo}/claims/cancel`,
            body,
            {
              headers: {
                guestToken: getSessionStorageItem(GUEST_TOKEN),
              },
            },
          ),
  });

  useEffect(() => {
    if (!checkedList.length || isLoading) {
      return;
    }
    mutateAsync({
      claimType: 'CANCEL',
      productCnt: checkedList.length,
      claimReasonType: claimReason,
      claimedProductOptions: cancelable
        .filter(v => checkedList.includes(v.orderOptionNo))
        .map(v => ({ orderProductOptionNo: v.orderOptionNo, productCnt: v.orderCnt })),
    });
  }, [checkedList, claimReason, isLoading]);

  return (
    <>
      <CancelOrderMobileStyled
        open={open}
        onClose={resetClaimType}
        title="주문취소 신청"
        className={clsx('CancelOrderMobile', className)}
        hideHeaderDivider
        footer={null}
      >
        <div className="order-number-wrapper">
          주문번호 <span>{data.orderNo}</span>
        </div>
        <p className="cancel-label">취소 신청할 상품을 선택해주세요.</p>
        <Checkbox
          className="check-cancel-all"
          indeterminate={indeterminate}
          onChange={onClickCheckAll}
          checked={checkAll}
          label={`전체 (${checkedList.length}/${cancelable.length})`}
        />
        <div className="cancel-item-wrapper">
          {cancelable.map(j => (
            <div key={j.orderOptionNo}>
              <Checkbox
                onChange={() => onChangeCheckbox(j.orderOptionNo)}
                checked={checkedList.includes(j.orderOptionNo)}
              />
              <Image src={'https:' + j.imageUrl} width={72} height={72} alt="image" />
              <div>
                <p>{j.productName}</p>
                <div>
                  {j.price.buyAmt.toLocaleString()}원
                  <span>
                    <span> | </span>
                    {j.orderCnt.toLocaleString()}개
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="cancel-label">취소 사유를 선택해주세요.</p>
        <Select.Mobile
          defaultValue={claimReason}
          onChange={e => setClaimReason(e!)}
          required
          className="cancel-select"
          optionList={data.claimReasonTypes.map(v => ({
            label: v.label,
            value: v.claimReasonType,
          }))}
        />
        <Textarea.Mobile
          placeholder="취소 상세사유를 입력해주세요(선택)"
          maxLength={50}
          onChange={e => setClaimReasonDetail(e.target.value)}
        />
        <Divider />
        {isCashRefundType && !isDepositWait && (
          <div className="refund-account-info">
            <p className="cancel-label">환불계좌 정보</p>
            <Divider borderColor={theme.colors.gray999} />
            <Select
              optionList={bankList.map(v => omit(v, 'code'))}
              onChange={e => setRefundAccout({ ...refundAccount, bank: e! })}
              placeholder="은행을 선택해주세요."
            />
            <Input.Mobile
              value={refundAccount.bankAccount}
              onChange={e => setRefundAccout({ ...refundAccount, bankAccount: e.target.value })}
              placeholder="계좌번호를 입력해주세요."
            />
            <Input.Mobile
              value={refundAccount.bankDepositorName}
              onChange={e =>
                setRefundAccout({ ...refundAccount, bankDepositorName: e.target.value })
              }
              placeholder="예금주명을 입력해주세요."
            />
            <Divider />
          </div>
        )}
        <RefundInfo.Mobile
          data={
            refundInfo?.data && checkedList.length ? refundInfo.data : (defaultPrice as ClaimPrice)
          }
        />
        <div className="footer-button-wrapper">
          <Button size="micro" onClick={resetClaimType}>
            취소
          </Button>
          <Button
            size="micro"
            styleType="main"
            onClick={() => {
              if (!checkedList.length) {
                return setConfirmModalOpen({
                  content: '취소할 상품을 한 개 이상 선택해주세요.',
                  open: true,
                  onOk: resetOpenConfirm,
                });
              }
              setConfirmModalOpen({
                content: '정말 취소 신청하시겠습니까?',
                open: true,
                onCancel: resetOpenConfirm,
                onOk: async () => {
                  try {
                    if (isCashRefundType && !isDepositWait) {
                      const hasNoValue = Object.values(refundAccount).some(v => !v);
                      if (hasNoValue) {
                        throw {
                          response: { data: { message: '환불계좌정보를 전부 입력해주세요.' } },
                        };
                      }
                    }
                    const cancelObjet = {
                      claimType: 'CANCEL',
                      claimReasonType: claimReason,
                      claimReasonDetail,
                      claimedProductOptions: cancelable
                        .filter(v => checkedList.includes(v.orderOptionNo))
                        .map(v => ({
                          orderProductOptionNo: v.orderOptionNo,
                          productCnt: v.orderCnt,
                        })),
                      refundsImmediately: true,
                      ...(isCashRefundType &&
                        !isDepositWait && {
                          bankAccountInfo: {
                            ...refundAccount,
                            bankName:
                              bankList.find(v => v.value === refundAccount.bank)?.label ?? '',
                          },
                        }),
                    } as const;
                    const originalLength = data.orderOptionsGroupByPartner.flatMap(v =>
                      v.orderOptionsGroupByDelivery.flatMap(k => k.orderOptions),
                    ).length;

                    if (originalLength === checkedList.length) {
                      await refundAll(cancelObjet);
                    } else {
                      await refund(cancelObjet);
                    }

                    await refetch();
                    resetOpenConfirm();
                    setOpen(false);

                    setConfirmClaimModal(true);
                  } catch (e: any) {
                    setConfirmModalOpen({
                      open: true,
                      content: e.response.data.message,
                      onOk: resetOpenConfirm,
                    });
                  }
                },
              });
            }}
          >
            취소 신청
          </Button>
        </div>
      </CancelOrderMobileStyled>
      <ClaimModal.Mobile
        title="취소"
        open={confirmClaimModal}
        onClose={() => {
          setConfirmClaimModal(false);
          resetClaimType();
        }}
        data={data}
        description={
          <>
            결제수단에 따라 <span>환불은 최대 7일 정도 소요</span>될 수 있습니다.
          </>
        }
      />
    </>
  );
};

export default CancelOrderMobile;
