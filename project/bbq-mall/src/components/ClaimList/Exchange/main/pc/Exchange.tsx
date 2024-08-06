'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import noImage from '@/assets/images/components/no-image.png';
import AddressAddModal from '@/components/AddressAddModal';
import AddressListModal from '@/components/AddressList/main/pc/AddressListModal';
import Button from '@/components/Button';
import { defaultPrice } from '@/components/ClaimList/CancelOrder/main/pc/CancelOrder';
import RefundInfo from '@/components/ClaimList/RefundInfo';
import { exchangeWayList } from '@/components/ClaimList/Return/main/pc/Return';
import ClaimModal from '@/components/ClaimModal';
import Divider from '@/components/Divider';
import Input from '@/components/Input';
import Radio from '@/components/Radio';
import Select from '@/components/Select';
import Stepper from '@/components/Stepper';
import Textarea from '@/components/Textarea';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { bankList } from '@/constant/bankList';
import { deliveryList } from '@/constant/deliveryList';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { customAxios } from '@/libs/customAxios';
import { theme } from '@/provider/CustomThemeProvider';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { Address, AddressList, ClaimPrice, ExchangeBody } from '@/types';
import { ArrayElement } from '@/types/arrayElement';
import { OrderHistoryDetail, OrderOption } from '@/types/orderHistoryRelated';
import { CombinedProductOption } from '@/types/productOption';
import { GUEST_TOKEN, getSessionStorageItem } from '@/utils/sessionStorage';

import { ExchangeStyled } from './styled';

export interface ExchangeProps {
  className?: string;
  resetClaimType: () => void;
  data: OrderHistoryDetail;
  refetch: () => Promise<unknown>;
  activeOrderOption: OrderOption | undefined;
}

const Exchange = ({
  className,
  data,
  refetch,
  resetClaimType,
  activeOrderOption,
}: ExchangeProps) => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const [open, setOpen] = useState(true);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const { isSignIn, isLoading } = useHandleIsSignIn();
  const [confirmClaimModal, setConfirmClaimModal] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState<
    'exchangeAddress' | 'returnAddress' | ''
  >('');
  const { setValue, watch, getValues, handleSubmit, register, reset } = useForm({
    defaultValues: {
      claimReason: data.claimReasonTypes[0].claimReasonType,
      claimReasonDetail: '',
      returnWayType: exchangeWayList[0].value,
      invoiceNo: '',
      deliveryCompanyType: deliveryList[0].value,
      returnAddress: data.shippingAddress,
      productCnt: activeOrderOption?.orderCnt,
      exchangeAddress: data.shippingAddress,
      exchangeOption: undefined as ExchangeBody['exchangeOption'] | undefined,
      depositorName: '',
      bank: '' as ArrayElement<typeof bankList>['value'],
      account: '',
    },
  });
  const { data: product } = useQuery({
    queryKey: [`/products/${activeOrderOption?.productNo}/options`],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<CombinedProductOption>(key),
  });

  const { data: address, refetch: addressRefetch } = useQuery({
    queryKey: ['/profile/shipping-addresses'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<AddressList>(key),
    enabled: false,
  });

  const { data: refundInfo, refetch: refundInfoRefetch } = useQuery({
    queryKey: [
      `/${
        isSignIn ? 'profile' : 'guest'
      }/order-options/${activeOrderOption?.orderOptionNo}/claims/estimate`,
    ],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.PC).get<ClaimPrice>(key, {
        params: {
          claimReasonType: watch('claimReason'),
          claimType: 'EXCHANGE',
          exchangeCnt: watch('exchangeOption')?.orderCnt ?? 1,
          exchangeOptionNo: watch('exchangeOption')?.optionNo ?? 0,
          exchangeProductNo: watch('exchangeOption')?.productNo,
          productCnt: activeOrderOption?.orderCnt ?? 1,
          returnWayType: watch('returnWayType'),
        },
        ...(!isSignIn && { headers: { guestToken: getSessionStorageItem(GUEST_TOKEN) } }),
      }),
    enabled: false,
  });

  const { mutateAsync: exchange } = useMutation({
    mutationFn: (body: ExchangeBody) =>
      isSignIn
        ? customAxios(PLATFORMLIST.PC).post(
            `/profile/order-options/${activeOrderOption?.orderOptionNo}/claims/exchange`,
            body,
          )
        : customAxios(PLATFORMLIST.PC).post(
            `/guest/order-options/${activeOrderOption?.orderOptionNo}/claims/exchange`,
            body,
            {
              headers: {
                guestToken: getSessionStorageItem(GUEST_TOKEN),
              },
            },
          ),
  });

  useEffect(() => {
    if (!watch('exchangeOption') || isLoading) {
      return;
    }
    refundInfoRefetch();
  }, [watch('claimReason'), watch('returnWayType'), watch('exchangeOption'), isLoading]);

  useEffect(() => {
    if (!isSignIn) {
      return;
    }
    addressRefetch();
  }, [isSignIn]);

  const selected = product?.data.multiLevelOptions.find(
    v => v.optionNo === watch('exchangeOption')?.optionNo,
  );

  return (
    <>
      <ExchangeStyled
        open={open}
        onClose={resetClaimType}
        onCancel={resetClaimType}
        title="교환 신청"
        closeOnClickOutside={false}
        onCancelText="취소"
        onOkText="교환 신청하기"
        width="800px"
        maxHeight="1000px"
        className={clsx('Exchange', className)}
        onOk={handleSubmit(async body => {
          setConfirmModalOpen({
            content: '정말 교환 신청하시겠습니까?',
            open: true,
            onCancel: resetOpenConfirm,
            onOk: async () => {
              if (!body.exchangeOption) {
                return setConfirmModalOpen({
                  open: true,
                  content: '교환할 상품을 선택해주세요.',
                  onOk: resetOpenConfirm,
                });
              }
              try {
                await exchange({
                  claimReasonType: body.claimReason,
                  claimReasonDetail: body.claimReasonDetail,
                  returnWayType: body.returnWayType,
                  productCnt: activeOrderOption?.orderCnt ?? 1,
                  exchangeAddress: body.exchangeAddress as unknown as Address,
                  exchangeOption: body.exchangeOption,
                  additionalPayType: 'CASH',
                  additionalPayRemitter: body.depositorName,
                  additionalPayBankAccount: {
                    depositorName: body.depositorName,
                    bank: body.bank,
                    account: body.account,
                    bankName: body.bank,
                  },
                  returnAddress: body.returnAddress as unknown as Address,
                  deliveryCompanyType: body.deliveryCompanyType,
                  invoiceNo: body.invoiceNo,
                });
                await refetch();
                resetOpenConfirm();
                reset();
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
      >
        <div className="order-number-wrapper">
          주문번호 <span>{data.orderNo}</span>
        </div>
        <p className="cancel-label">교환 신청 상품 정보</p>

        <div className="cancel-item">
          <Image
            src={activeOrderOption?.imageUrl ? 'https:' + activeOrderOption?.imageUrl : noImage}
            width={72}
            height={72}
            alt="image"
          />
          <div>
            <p>{activeOrderOption?.productName}</p>
            <div>
              {activeOrderOption?.price.buyAmt.toLocaleString()}원
              <span>
                <span> | </span>
                {activeOrderOption?.orderCnt.toLocaleString()}개
              </span>
            </div>
          </div>
        </div>

        <p className="cancel-label">교환 가능 상품</p>
        <Divider borderColor={theme.colors.gray999} />
        <Select
          placeholder="상품을 선택해주세요."
          optionList={product?.data.multiLevelOptions.map(v => ({
            label: `${v.value}${!!v.addPrice ? ` (+${v.addPrice.toLocaleString()}원)` : ''}`,
            value: v.optionNo,
            disabled: !v.stockCnt,
            ...(!v.stockCnt && { suffix: '(품절)' }),
          }))}
          onChange={e => {
            const d = product?.data.multiLevelOptions.find(v => v.optionNo === e);
            if (!d) {
              return;
            }
            setValue('exchangeOption', {
              additionalProductNo: activeOrderOption?.productNo ?? 0,
              optionNo: d.optionNo,
              orderCnt: watch('exchangeOption')?.orderCnt ?? 1,
              productNo: activeOrderOption?.productNo ?? 0,
              inputTexts: [],
            });
          }}
        />
        {selected && (
          <div className="selected-item">
            <div className="title-label">
              <p>{activeOrderOption?.productName}</p>
              <p>
                {'선택옵션 : ' +
                  (activeOrderOption?.productName === selected.value ? '없음' : selected.value)}
              </p>
            </div>
            <Stepper
              defaultValue={watch('exchangeOption')?.orderCnt}
              onChange={e => {
                setValue('exchangeOption', { ...(watch('exchangeOption') as any), orderCnt: e });
              }}
              max={selected.stockCnt}
            />
            <div className="price-wrapper">
              {(selected.buyPrice * (watch('exchangeOption')?.orderCnt ?? 1)).toLocaleString()} 원
            </div>
          </div>
        )}
        <Divider />

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
            <Button size="micro" onClick={() => setOpenAddressModal('returnAddress')}>
              변경
            </Button>
          </div>
        )}
        <Divider />
        <p className="cancel-label">배송지</p>
        <Divider borderColor={theme.colors.gray999} />
        <div className="collect-address">
          <div className="collect-address-label">배송 요청지</div>
          <div className="collect-address-content">
            <p>
              {watch('exchangeAddress').receiverAddress}{' '}
              {watch('exchangeAddress').receiverDetailAddress}
            </p>
            <p>
              {watch('exchangeAddress').receiverName} / {watch('exchangeAddress').receiverContact1}
            </p>
          </div>
          <Button size="micro" onClick={() => setOpenAddressModal('exchangeAddress')}>
            변경
          </Button>
        </div>
        <Divider />
        <p className="cancel-label">추가결제계좌</p>
        <Divider borderColor={theme.colors.gray999} />
        <Select
          label="은행명"
          className="margin-exist"
          placeholder="은행을 선택해주세요."
          optionList={bankList as any}
          onChange={e => setValue('bank', e as any)}
        />
        <Input
          label="계좌번호"
          placeholder="계좌번호를 입력해주세요."
          {...register('account')}
          className="margin-exist"
        />
        <Input
          label="예금주"
          placeholder="예금주명을 입력해주세요."
          {...register('depositorName')}
          className="margin-exist"
        />

        <Divider />
        <RefundInfo data={refundInfo?.data ? refundInfo.data : (defaultPrice as ClaimPrice)} />
      </ExchangeStyled>
      <AddressListModal
        refetch={addressRefetch}
        onClose={() => setOpenAddressModal('')}
        open={!!openAddressModal && isSignIn}
        addressList={address?.data.bookedAddresses}
        selected={openAddressModal ? (watch(openAddressModal) as unknown as Address) : undefined}
        onChange={e => openAddressModal && setValue(openAddressModal, e as any)}
      />
      <AddressAddModal
        open={!!openAddressModal && !isSignIn}
        hideDefaultSave
        onClose={() => setOpenAddressModal('')}
        onSave={async data => {
          openAddressModal && setValue(openAddressModal, data as any);
        }}
      />
      <ClaimModal
        title="교환"
        open={confirmClaimModal}
        onClose={() => {
          setConfirmClaimModal(false);
          resetClaimType();
        }}
        data={data}
        description={
          <>
            <p>비비큐몰에서 지장한 택배사에서 일주일 이내</p>
            <p>등록한 주소로 방문하여 상품을 수거할 예정입니다.</p>
          </>
        }
      />
    </>
  );
};

export default Exchange;
