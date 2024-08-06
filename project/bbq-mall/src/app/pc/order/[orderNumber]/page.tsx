'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { debounce } from 'lodash';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import Loading from '@/components/Loading';
import OrderAddress from '@/components/OrderContent/OrderAddress';
import OrderBuyer from '@/components/OrderContent/OrderBuyer';
import OrderCoupon from '@/components/OrderContent/OrderCoupon';
import OrderMethod from '@/components/OrderContent/OrderMethod';
import OrderPoint from '@/components/OrderContent/OrderPoint';
import OrderProduct from '@/components/OrderContent/OrderProduct';
import OrderTerms from '@/components/OrderContent/OrderTerms';
import { _termCheckList } from '@/components/OrderContent/OrderTerms/main/pc/OrderTerms';
import OrderPriceInfo from '@/components/OrderPriceInfo';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { KCP, externalPay } from '@/constant/paymentRelated';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import NCPPayService from '@/libs/NCPPay';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { PcOrderPageStyled } from '@/styles/pageStyled/pc/pcOrderPageStyled';
import {
  AddressList,
  CalculateBody,
  CouponDivided,
  OrderSheet,
  OrderSheetPrice,
  PaymentBody,
  PaymentInfo,
  personalCashReceipt,
} from '@/types';
import { arrangeProductList } from '@/utils/arrangeProducList';

const PcOrder = ({ params: { orderNumber } }: { params: { orderNumber: string } }) => {
  const router = useRouter();
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const [usedPoint, setUsedPoint] = useState(0);
  const [priceReserve, setPriceReserve] = useState<PaymentInfo | undefined>(undefined);
  const { isSignIn, isLoading } = useHandleIsSignIn();
  const [password, setPassword] = useState({ password: '', confirm: '' });
  const [hasEmail, setHasEmail] = useState(false);

  const [checkTermsAgree, setCheckTermsAgree] = useState(false);
  const { setValue, handleSubmit, watch } = useForm<PaymentBody>({
    defaultValues: {
      orderSheetNo: orderNumber,
      shippingAddress: {} as any,
      orderMemo: '',
      deliveryMemo: '',
      orderer: {} as any,
      coupons: {} as any,
      subPayAmt: 0,
      orderTitle: '',
      pgType: KCP,
      payType: 'CREDIT_CARD',
      tempPassword: '',
      applyCashReceipt: false,
      cashReceipt: undefined,
      remitter: undefined,
      bankAccountToDeposit: undefined,
    },
  });

  const {
    data,
    isPending: productPending,
    error,
  } = useQuery({
    queryKey: [`/order-sheets/${orderNumber}`],
    queryFn: async ({ queryKey: [key] }) => {
      const res = await customAxios(PLATFORMLIST.PC).get<OrderSheet>(key);

      res.data.availablePayTypes.sort((a, b) => {
        if (a.payType === 'CREDIT_CARD' && b.payType !== 'CREDIT_CARD') {
          return -1;
        } else if (a.payType !== 'CREDIT_CARD' && b.payType === 'CREDIT_CARD') {
          return 1;
        }
        return 0;
      });

      setValue('orderer', res.data.ordererContact);
      setHasEmail(!!res?.data?.ordererContact?.ordererEmail);
      setValue('payType', res.data.availablePayTypes[0].payType);
      setPriceReserve(res?.data.paymentInfo);

      return res;
    },
  });

  const productsList = arrangeProductList(data?.data.deliveryGroups);

  const {
    data: address,
    isPending,
    refetch: addressRefetch,
    isRefetching,
  } = useQuery({
    queryKey: ['/profile/shipping-addresses'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<AddressList>(key),
    enabled: false,
  });

  const {
    data: coupon,
    refetch: couponRefetch,
    isPending: couponPending,
  } = useQuery({
    queryKey: [`/order-sheets/${orderNumber}/coupons`],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<CouponDivided>(key),
    enabled: false,
  });

  const {
    data: point,
    refetch: pointRefetch,
    isPending: pointPending,
  } = useQuery({
    queryKey: [`/profile/accumulations/summary`],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.PC).get<{ totalAvailableAmt: number; totalExpireAmt: number }>(key),
    enabled: false,
  });

  useEffect(() => {
    if (isSignIn) {
      addressRefetch();
      couponRefetch();
      pointRefetch();
    }
  }, [isSignIn]);

  const { mutateAsync, isPending: pricePending } = useMutation({
    mutationFn: (body: CalculateBody) =>
      customAxios(PLATFORMLIST.PC).post<OrderSheetPrice>(
        `/order-sheets/${orderNumber}/calculate`,
        body,
      ),
  });

  const { mutateAsync: accountPayment } = useMutation({
    mutationFn: (body: PaymentBody) =>
      customAxios(PLATFORMLIST.PC).post<{ confirmUrl: string }>(`/payments/reserve`, body),
  });

  const NCPPay = new NCPPayService();
  const shippingAddress = watch('shippingAddress');
  const couponRequest = watch('coupons');

  const debouncedSetPrice = useCallback(
    debounce(async ({ _usedPoint, _shippingAddress, _productsList, _couponRequest }) => {
      try {
        const res = await mutateAsync({
          accumulationUseAmt: _usedPoint,
          addressRequest: _shippingAddress,
          couponRequest: _couponRequest,
          shippingAddresses: [
            {
              ..._shippingAddress,
              shippingAddress: _shippingAddress,
              payProductParams: _productsList as any,
            },
          ],
        });

        setValue('subPayAmt', res.data.paymentInfo.usedAccumulationAmt);
        setPriceReserve(res.data.paymentInfo);
      } catch (e: any) {
        if (e.response.data.code === 'ODSH0010') {
          setUsedPoint(0);
        }
        setConfirmModalOpen({
          open: true,
          content: e.response.data.message,
          onOk: resetOpenConfirm,
        });
      }
    }, 300),
    [],
  );

  useEffect(() => {
    if (!productPending && Object.keys(shippingAddress ?? {}).length) {
      debouncedSetPrice({
        _usedPoint: usedPoint,
        _shippingAddress: shippingAddress,
        _productsList: productsList,
        _couponRequest: couponRequest,
      });
    }
  }, [productPending, shippingAddress, usedPoint, couponRequest]);

  if (error) {
    setConfirmModalOpen({
      content: (error as any).response.data.message,
      open: true,
      onOk: () => {
        resetOpenConfirm();
        router.replace('/');
      },
    });
    return <Loading />;
  }

  const isPointHundread = (watch('subPayAmt') ?? 0) % 100 === 0;

  const loading =
    isLoading ||
    productPending ||
    (!isLoading && isSignIn && (isPending || couponPending || pointPending));

  return (
    <PcOrderPageStyled>
      <h2>주문서</h2>
      {loading ? (
        <Loading differ="34px" />
      ) : (
        <div className="order-content">
          <div className="order-main">
            <OrderAddress
              addressList={address?.data}
              isLoading={isPending}
              refetch={addressRefetch}
              isRefetching={isRefetching}
              onChange={d => {
                const k = d && { ...d, usesShippingInfoLaterInput: false };
                setValue('shippingAddress', k);
              }}
              onChangeRequest={e => {
                setValue('orderMemo', e);
                setValue('deliveryMemo', e);
              }}
              isSignIn={isSignIn}
            />
            {!isLoading && !productPending && (
              <OrderBuyer
                contact={watch('orderer')}
                isSignIn={isSignIn}
                onChange={v => setValue('orderer', { ...watch('orderer'), ...v })}
                onChangePassword={v => setPassword({ ...password, ...v })}
                hasEmail={hasEmail}
              />
            )}
            <OrderProduct products={productsList} />
            {isSignIn && (
              <>
                <OrderCoupon
                  appliedCoupon={watch('coupons')}
                  couponList={coupon?.data}
                  onChange={async v => {
                    try {
                      const couponRequest = { ...watch('coupons')!, ...v };
                      await mutateAsync({
                        accumulationUseAmt: usedPoint,
                        addressRequest: shippingAddress,
                        couponRequest: couponRequest,
                        shippingAddresses: [
                          {
                            ...shippingAddress,
                            shippingAddress: shippingAddress,
                            payProductParams: productsList as any,
                          },
                        ],
                      });
                      setValue('coupons', couponRequest);

                      return true;
                    } catch (e: any) {
                      setConfirmModalOpen({
                        open: true,
                        content: e.response.data.message,
                        onOk: resetOpenConfirm,
                      });
                      return false;
                    }
                  }}
                  products={productsList}
                />
                <OrderPoint
                  point={point?.data.totalAvailableAmt}
                  usedPoint={usedPoint}
                  onChangeUsed={setUsedPoint}
                  max={priceReserve?.availableMaxAccumulationAmt}
                />
              </>
            )}
            {data && (
              <OrderMethod
                types={data.data.availablePayTypes}
                onChange={e => {
                  setValue('payType', e);
                }}
                onChangeValue={v => {
                  v.cashReceipt && setValue('cashReceipt', v.cashReceipt);
                  v.payType && setValue('payType', v.payType);
                  v.remitter && setValue('remitter', v.remitter);
                  v.bankAccountToDeposit &&
                    setValue('bankAccountToDeposit', v.bankAccountToDeposit);
                }}
                tradeBank={data.data.tradeBankAccountInfos}
              />
            )}
          </div>
          <div className="order-brief">
            <OrderPriceInfo
              price={{
                standardAmt: priceReserve?.totalStandardAmt ?? 0,
                discountAmt:
                  (priceReserve?.totalStandardAmt ?? 0) +
                  (priceReserve?.deliveryAmt ?? 0) -
                  (priceReserve?.paymentAmt ?? 0),

                totalDeliveryAmt: priceReserve?.deliveryAmt ?? 0,
                totalAmt: priceReserve?.paymentAmt ?? 0,
              }}
              discountItemList={[
                ...((!!priceReserve?.totalImmediateDiscountAmt && [
                  {
                    label: '상품할인금액',
                    value: priceReserve?.totalImmediateDiscountAmt,
                  },
                ]) ||
                  []),
                ...((!!priceReserve?.usedAccumulationAmt && [
                  {
                    label: '포인트 할인',
                    value: priceReserve?.usedAccumulationAmt,
                  },
                ]) ||
                  []),
                ...((!!priceReserve?.cartCouponAmt && [
                  {
                    label: '주문 쿠폰 할인',
                    value: priceReserve?.cartCouponAmt,
                  },
                ]) ||
                  []),
                ...((!!priceReserve?.productCouponAmt && [
                  {
                    label: '상품 쿠폰 할인',
                    value: priceReserve?.productCouponAmt,
                  },
                ]) ||
                  []),
              ]}
            />
            <OrderTerms onChangeCheckAll={setCheckTermsAgree} />
            <form
              onSubmit={handleSubmit(
                async body => {
                  let errorMessage = '';
                  if (!checkTermsAgree) {
                    errorMessage = '모든 필수항목에 동의해주세요.';
                  }

                  if (!Object.keys(shippingAddress ?? {}).length) {
                    errorMessage = '배송지 등록이 필요합니다.';
                  }

                  if (!isSignIn) {
                    if (!password.password.length || !password.confirm.length) {
                      errorMessage = '주문 비밀번호 입력이 필요합니다.';
                    }

                    if (password.password !== password.confirm) {
                      errorMessage = '주문 비밀번호가 상이합니다. 다시 한 번 확인해주세요.';
                    }

                    body.tempPassword = password.password;
                  }

                  if (Object.values(watch('orderer') ?? {}).filter(v => v).length < 3) {
                    errorMessage = '주문자 정보를 전부 입력해주세요.';
                  }

                  if (body.cashReceipt?.cashReceiptIssuePurposeType === '') {
                    body.applyCashReceipt = false;
                    body.cashReceipt = undefined;
                  } else {
                    body.applyCashReceipt = true;
                  }

                  if (
                    body.cashReceipt?.cashReceiptIssuePurposeType &&
                    !body.cashReceipt.cashReceiptKey
                  ) {
                    errorMessage =
                      body.cashReceipt?.cashReceiptIssuePurposeType === personalCashReceipt
                        ? '휴대폰 번호를 입력해주세요.'
                        : '사업자 번호를 입력해주세요.';
                  }

                  if (!((body.subPayAmt ?? 0) % 100 === 0)) {
                    errorMessage = '포인트는 100단위로만 사용 가능합니다.';
                  }

                  if (errorMessage) {
                    return setConfirmModalOpen({
                      open: true,
                      content: errorMessage,
                      onOk: resetOpenConfirm,
                    });
                  }
                  if (body.payType === 'ACCOUNT') {
                    if (!body.remitter) {
                      return setConfirmModalOpen({
                        open: true,
                        content: '입금자명을 입력해주세요.',
                        onOk: resetOpenConfirm,
                      });
                    }

                    return setConfirmModalOpen({
                      open: true,
                      content: '확인을 누르시면 즉시 주문이 완료됩니다.\n 진행하시겠습니까?',
                      onOkText: '확인',
                      onCancelText: '취소',
                      onCancel: resetOpenConfirm,
                      onOk: async () => {
                        try {
                          const res = await accountPayment({
                            ...body,
                            pgType: 'NONE',
                            clientReturnUrl: `${process.env.NEXT_PUBLIC_KCP_CONFIRM_URL}/pc/order`,
                          });
                          router.replace(res?.data.confirmUrl);
                          resetOpenConfirm();
                        } catch (e: any) {
                          setConfirmModalOpen({
                            open: true,
                            content: e.response.data.message,
                            onOk: resetOpenConfirm,
                          });
                        }
                      },
                    });
                  }
                  if (
                    body.payType === 'CREDIT_CARD' &&
                    (priceReserve?.paymentAmt ?? 0) < 100 &&
                    priceReserve?.paymentAmt !== 0
                  ) {
                    return setConfirmModalOpen({
                      open: true,
                      content: '신용카드 결제 최소 결제 금액은 100원입니다.',
                      onOk: resetOpenConfirm,
                    });
                  }

                  if (externalPay.includes(body.payType as any)) {
                    body.pgType = body.payType as any;
                  }

                  const pay = () => {
                    NCPPay.reservation(body);
                  };

                  if (priceReserve?.paymentAmt === 0) {
                    return setConfirmModalOpen({
                      open: true,
                      content: '확인을 누르시면 즉시 주문이 완료됩니다.\n 진행하시겠습니까?',
                      onOk: () => {
                        pay();
                        resetOpenConfirm();
                      },
                      onCancel: resetOpenConfirm,
                    });
                  }

                  pay();
                },
                error => console.error(error),
              )}
            >
              <Button styleType="main" type="submit" disabled={pricePending || !isPointHundread}>
                {priceReserve?.paymentAmt.toLocaleString() ?? 0}원 결제하기
              </Button>
            </form>
          </div>
        </div>
      )}
    </PcOrderPageStyled>
  );
};

export default PcOrder;
