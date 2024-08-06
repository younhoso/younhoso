'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';

import clsx from 'clsx';
import { omit } from 'lodash';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import AddressAddModal from '@/components/AddressAddModal';
import AddressListModal from '@/components/AddressList/main/pc/AddressListModal';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import { cashRefundType } from '@/components/ClaimList/CancelOrder/main/mobile/CancelOrderMobile';
import { defaultPrice } from '@/components/ClaimList/CancelOrder/main/pc/CancelOrder';
import RefundInfo from '@/components/ClaimList/RefundInfo';
import ClaimModal from '@/components/ClaimModal';
import Divider from '@/components/Divider';
import Input from '@/components/Input';
import Radio from '@/components/Radio';
import Select from '@/components/Select';
import Textarea from '@/components/Textarea';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { bankList } from '@/constant/bankList';
import { deliveryList } from '@/constant/deliveryList';
import { useHandleCheckbox } from '@/hooks/useHandleCheckbox';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { theme } from '@/provider/CustomThemeProvider';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { Address, AddressList, ClaimPrice, ClaimPriceBody, RefundBody } from '@/types';
import { OrderHistoryDetail } from '@/types/orderHistoryRelated';
import { GUEST_TOKEN, getSessionStorageItem } from '@/utils/sessionStorage';

import { ReturnStyled } from './styled';

export interface ReturnProps {
  className?: string;
  resetClaimType: () => void;
  data: OrderHistoryDetail;
  refetch: () => Promise<unknown>;
}

export const exchangeWayList = [
  { value: 'SELLER_COLLECT', label: '판매자수거요청' },
  { value: 'BUYER_DIRECT_RETURN', label: '구매자직접반품' },
] satisfies { value: 'SELLER_COLLECT' | 'BUYER_DIRECT_RETURN'; label: string }[];

const Return = ({ className, resetClaimType, data, refetch }: ReturnProps) => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const [confirmClaimModal, setConfirmClaimModal] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [open, setOpen] = useState(true);
  const { isSignIn, isLoading } = useHandleIsSignIn();
  const [refundAccount, setRefundAccout] = useState({
    bankAccount: '',
    bankDepositorName: '',
    bank: '',
  });
  const isCashRefundType = cashRefundType.includes(data.refundType);

  const { setValue, watch, getValues, handleSubmit, register } = useForm({
    defaultValues: {
      claimReason: data.claimReasonTypes[0].claimReasonType,
      claimReasonDetail: '',
      returnWayType: exchangeWayList[0].value,
      invoiceNo: '',
      deliveryCompanyType: deliveryList[0].value,
      returnAddress: data.shippingAddress,
    },
  });
  const returnable = data.orderOptionsGroupByPartner.flatMap(v =>
    v.orderOptionsGroupByDelivery
      .flatMap(k => k.orderOptions)
      .filter(k => data.escrow || k.nextActions.some(j => j.nextActionType === 'RETURN')),
  );

  const { indeterminate, checkAll, onClickCheckAll, onChangeCheckbox, checkedList } =
    useHandleCheckbox(
      returnable.map(k => ({ label: k.optionName, value: k.orderOptionNo })),
      true,
    );

  const { mutateAsync, data: refundInfo } = useMutation({
    mutationFn: (body: ClaimPriceBody) =>
      customAxios(PLATFORMLIST.PC).post<ClaimPrice>(
        `/${isSignIn ? 'profile' : 'guest'}/claims/estimate`,
        body,
        {
          headers: {
            ...(!isSignIn && { guestToken: getSessionStorageItem(GUEST_TOKEN) }),
          },
        },
      ),
  });

  const { mutateAsync: refund } = useMutation({
    mutationFn: (body: RefundBody) =>
      customAxios(PLATFORMLIST.PC).post<ClaimPrice>(
        `/${isSignIn ? 'profile' : 'guest'}/claims/return`,
        body,
        {
          headers: {
            ...(!isSignIn && { guestToken: getSessionStorageItem(GUEST_TOKEN) }),
          },
        },
      ),
  });

  const { data: address, refetch: addressRefetch } = useQuery({
    queryKey: ['/profile/shipping-addresses'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<AddressList>(key),
    enabled: false,
  });

  useEffect(() => {
    if (!isSignIn) {
      return;
    }
    addressRefetch();
  }, [isSignIn]);

  useEffect(() => {
    if (!checkedList.length || isLoading) {
      return;
    }
    mutateAsync({
      claimType: 'RETURN',
      productCnt: checkedList.length,
      claimReasonType: watch('claimReason'),
      returnWayType: watch('returnWayType'),
      claimedProductOptions: returnable
        .filter(v => checkedList.includes(v.orderOptionNo))
        .map(v => ({ orderProductOptionNo: v.orderOptionNo, productCnt: v.orderCnt })),
    });
  }, [checkedList, watch('claimReason'), watch('returnWayType'), isLoading]);

  return (
    <>
      <ReturnStyled
        open={open}
        onOk={handleSubmit(async body => {
          if (!checkedList.length) {
            return setConfirmModalOpen({
              content: '환불할 상품을 한 개 이상 선택해주세요.',
              open: true,
              onOk: resetOpenConfirm,
            });
          }

          setConfirmModalOpen({
            content: '정말 환불 신청하시겠습니까?',
            open: true,
            onCancel: resetOpenConfirm,
            onOk: async () => {
              try {
                if (isCashRefundType) {
                  const hasNoValue = Object.values(refundAccount).some(v => !v);
                  if (hasNoValue) {
                    throw {
                      response: { data: { message: '환불계좌정보를 전부 입력해주세요.' } },
                    };
                  }
                }
                if (body.returnWayType === 'BUYER_DIRECT_RETURN' && !body.invoiceNo) {
                  throw {
                    response: { data: { message: '송장번호를 입력해주세요.' } },
                  };
                }
                await refund({
                  claimType: 'RETURN',
                  claimReasonType: body.claimReason,
                  claimReasonDetail: body.claimReasonDetail,
                  claimedProductOptions: returnable
                    .filter(v => checkedList.includes(v.orderOptionNo))
                    .map(v => ({ orderProductOptionNo: v.orderOptionNo, productCnt: v.orderCnt })),
                  returnAddress: body.returnAddress as unknown as Address,
                  returnWayType: body.returnWayType,
                  deliveryCompanyType: body.deliveryCompanyType,
                  invoiceNo: body.invoiceNo,
                  ...(isCashRefundType && {
                    bankAccountInfo: {
                      ...refundAccount,
                      bankName: bankList.find(v => v.value === refundAccount.bank)?.label ?? '',
                    },
                  }),
                });
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
        })}
        onClose={resetClaimType}
        className={clsx('Return', className)}
        title="환불 신청"
        onCancel={resetClaimType}
        closeOnClickOutside={false}
        onCancelText="취소"
        onOkText="환불 신청하기"
        width="800px"
        maxHeight="1000px"
      >
        <div className="order-number-wrapper">
          주문번호 <span>{data.orderNo}</span>
        </div>
        <p className="cancel-label">환불 신청할 상품을 선택해주세요.</p>
        <Checkbox
          className="check-cancel-all"
          indeterminate={indeterminate}
          onChange={onClickCheckAll}
          checked={checkAll}
          label={`전체 (${checkedList.length}/${returnable.length})`}
        />
        <div className="cancel-item-wrapper">
          {returnable.map(j => (
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
        <Select
          defaultValue={watch('claimReason')}
          label="취소사유구분"
          onChange={e => setValue('claimReason', e!)}
          required
          className="cancel-select"
          optionList={data.claimReasonTypes.map(v => ({
            label: v.label,
            value: v.claimReasonType,
          }))}
        />
        <Textarea
          maxLength={50}
          label="취소상세사유"
          onChange={e => setValue('claimReasonDetail', e.target.value)}
        />
        <p className="cancel-label">교환방법</p>
        <Radio
          radioList={exchangeWayList}
          className="refund-radio-wrpper"
          defaultValue={getValues('returnWayType')}
          onChange={e => {
            if (!e) {
              return;
            }
            setValue('returnWayType', e);
          }}
        />
        {watch('returnWayType') === 'BUYER_DIRECT_RETURN' ? (
          <>
            <Select
              optionList={deliveryList}
              placeholder="택배사를 선택해주세요."
              defaultValue={watch('deliveryCompanyType')}
              onChange={e => setValue('deliveryCompanyType', e!)}
            />
            <Input
              {...register('invoiceNo')}
              placeholder="반품 송장 번호를 입력해주세요."
              className="invoice-input"
            />
          </>
        ) : (
          <div className="collect-address">
            <div className="collect-address-label">반품 수거지</div>
            <div className="collect-address-content">
              <p>
                {watch('returnAddress').receiverAddress}{' '}
                {watch('returnAddress').receiverDetailAddress}
              </p>
              <p>
                {watch('returnAddress').receiverName} / {watch('returnAddress').receiverContact1}
              </p>
            </div>
            <Button size="micro" onClick={() => setOpenAddressModal(true)}>
              변경
            </Button>
          </div>
        )}
        <Divider />
        {isCashRefundType && (
          <div className="refund-account-info">
            <p className="cancel-label">환불계좌 정보</p>
            <Divider borderColor={theme.colors.gray999} />
            <Select
              required
              label="은행명"
              optionList={bankList.map(v => omit(v, 'code'))}
              onChange={e => setRefundAccout({ ...refundAccount, bank: e! })}
              placeholder="은행을 선택해주세요."
            />
            <Input
              required
              label="계좌번호"
              value={refundAccount.bankAccount}
              onChange={e => setRefundAccout({ ...refundAccount, bankAccount: e.target.value })}
              placeholder="계좌번호를 입력해주세요."
            />
            <Input
              required
              label="예금주"
              value={refundAccount.bankDepositorName}
              onChange={e =>
                setRefundAccout({ ...refundAccount, bankDepositorName: e.target.value })
              }
              placeholder="예금주명을 입력해주세요."
            />
            <Divider />
          </div>
        )}

        <RefundInfo
          data={
            refundInfo?.data && checkedList.length ? refundInfo.data : (defaultPrice as ClaimPrice)
          }
        />
      </ReturnStyled>
      <AddressListModal
        refetch={addressRefetch}
        onClose={() => setOpenAddressModal(false)}
        open={!!openAddressModal && isSignIn}
        addressList={address?.data.bookedAddresses}
        selected={watch('returnAddress') as unknown as Address}
        onChange={e => setValue('returnAddress', e as any)}
      />
      <AddressAddModal
        open={!!openAddressModal && !isSignIn}
        hideDefaultSave
        onClose={() => setOpenAddressModal(false)}
        onSave={async data => {
          setValue('returnAddress', data as any);
        }}
      />
      <ClaimModal
        title="환불"
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

export default Return;
