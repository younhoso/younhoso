import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Router, { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';

import { AccountAPI, BranchAPI, CartAPI, CouponAPI, OrderAPI } from '@/apis';
import { DESKTOPWEB, MOBILEWEB, OrderAgent, VISUALARS } from '@/apis/order/init';
import { Flex, Space, Text } from '@/components/atoms';
import { Desktop, Mobile } from '@/components/functions';
import { Button, IframePopup, useModal } from '@/components/molecules';
import { HPCPointForm, SelectCouponsForm, VerifyPhonePopup } from '@/components/organisms';
import {
  CheckoutPageHPCState,
  CheckoutPagePointState,
  CheckoutPageRequestState,
  CheckoutPageSelectedCoupons,
  CheckoutPageTemplate,
} from '@/components/templates';
import { COLOR_RED, FONTSIZE_10, FONTSIZE_12 } from '@/constants';
import { useAuth, useMobile, useQueryParams } from '@/hooks';
import { isArsSessionState } from '@/stores';
import {
  Address,
  Branch,
  CalculateOrderAPIResponse,
  ECoupon,
  GetCartAPIResponse,
  InitOrderAPIResponse,
  MealTypeEnum,
  MembershipCoupon,
  PriceCoupon,
  VoucherCoupon,
} from '@/types';
import { deserializeCart, parseApiError } from '@/utils';

// 두 함수 모두 외부 페이지에서도 사용합니다. (장바구니에서 결제하기 버튼 누를때 사용, 사이드바에서 바로 결제할때 사용)
// initOrder과 initOrderWithItems는 둘다 목적과 코드는 거의 똑같지만, 내용이 약간 다릅니다.
// initOrderWithItems는 어떤 품목으로 init할지 정할 수 있습니다.
// 장바구니에서 결제하기 버튼 누를때 검증용 : initOrder
// 사이드바에서 장바구니를 안거치고 바로 결제할때 사용 : initOrderWithItems
export const initOrder = async ({
  address,
  mealType,
  cart,
  orderAgent,
  orderFlow,
  ecoupons,
}: {
  address?: Address;
  mealType: MealTypeEnum;
  cart: GetCartAPIResponse;
  orderAgent: OrderAgent;
  orderFlow?: 'DIRECT' | 'CART' | 'QUICK_ORDER';
  ecoupons?: string[];
}) => {
  return await OrderAPI.init(
    {
      mealType: mealType.toUpperCase(),
      orderFlow: orderFlow ?? 'DIRECT',
      branchId: cart.familyInfoResponse.branchId,
      deliveryAddress: address?.fullAddress ?? '',
      deliveryAddressDetail: address?.detailAddress ?? '',
      ecouponList: ecoupons ?? [],
      cartList: cart.responseList.map(item => {
        return {
          mainMenuId: item.mainMenuId,
          quantity: item.quantity,
          subOptionItemIdSet: item.subOptionHeadList.reduce<number[]>(
            (arr, item) => [...arr, ...item.subOptionDetailList.map(d => d.subOptionDetailId)],
            [],
          ),
        };
      }),
    },
    orderAgent,
  );
};
export const initOrderWithItems = async ({
  address,
  mealType,
  branchId,
  orderAgent,
  orderFlow,
  ecoupons,
  items,
}: {
  address?: Address;
  mealType: MealTypeEnum;
  branchId: string;
  orderAgent: OrderAgent;
  orderFlow?: 'DIRECT' | 'CART' | 'QUICK_ORDER';
  ecoupons?: string[];
  items: {
    menuId: number;
    quantity: number;
    subOptionIds: number[];
  }[];
}) => {
  return await OrderAPI.init(
    {
      mealType: mealType.toUpperCase(),
      orderFlow: orderFlow ?? 'DIRECT',
      branchId: branchId,
      deliveryAddress: address?.fullAddress ?? '',
      deliveryAddressDetail: address?.detailAddress ?? '',
      ecouponList: ecoupons ?? [],
      cartList: items.map(item => {
        return {
          mainMenuId: item.menuId,
          quantity: item.quantity,
          subOptionItemIdSet: item.subOptionIds,
        };
      }),
    },
    orderAgent,
  );
};

// 페이지가 복합적으로 상태가 변경되다 보니, 에러가 발생했을 상태를 추적하는 것을 global variable으로 넣었습니다.
// NEXT 페이지 특성상 다른 페이지로 이동하면 state가 초기화되기 때문에, global variable로 관리합니다.
// 즉, cart 페이지에서 나갔다가 들어오는 일이 잦아서, 값이 꼬이는 현상을 방지하고, 에러가 발생한 상태면 페이지를 이동시키커나 초기화를 하기 위함입니다.
// 좋은 방식은 아니라고 봅니다.
const handleRouteChangeStartForEcouponCancel = (url: string) => {
  if (Router.pathname === url.split('?')[0]) return;
  if (url.startsWith('/address/permission')) return;
  if (url.startsWith('/address/search')) return;
  if (url.startsWith('/stores/map')) return;
  if (url.startsWith('/cart')) return;
  if (url.startsWith('/checkout')) return;
  if (
    !window.confirm(
      '결제하기를 나가시겠어요?\n현재 결제하기를 벗어나면 교환권 사용이 취소됩니다. 교환권을 사용하여 주문하시려면 다시 쿠폰북에서 교환권을 선택해주세요.',
    )
  ) {
    Router.events.emit('routeChangeError');
    // eslint-disable-next-line no-throw-literal
    throw "Abort route change by user's confirmation.";
  }
};

export default function Checkout() {
  const { keepParams } = useQueryParams();
  const { openModal, closeModal } = useModal();
  const { reloadPointAmount, member } = useAuth();
  const { defaultAddress } = useAuth();
  const isMobile = useMobile();
  const router = useRouter();
  const {
    mealType: queryMealType,
    branchId: queryBranchId,
    ecoupons: queryEcoupons,
    ignoreEcoupons: queryIgnoreEcoupons,
    from,
  } = router.query;

  // HPC 관련 데이터 및 팝업 관련 (팝업은 레거시 형태라서 따로 Modal 컴포넌트로 빼는걸 추천합니다.)
  const [hpcPointState, setHpcPointState] = useState<CheckoutPageHPCState | undefined>(undefined);
  const [hpcVerifyPopupKey, setHpcVerifyPopupKey] = useState<number>(1);
  const [hpcVerifyPopupVisible, setHpcVerifyPopupVisible] = useState<boolean>(false);

  const [buttonLoading, setButtonLoading] = useState(false);
  const isArsSession = useRecoilValue(isArsSessionState);

  // 성인 인증 토큰 및 팝업 관련
  const [adultToken, setAdultToken] = useState<string | undefined>();
  const adultFormRef = useRef<HTMLFormElement>(null);

  // 비회원 인증
  const openGuestVerificationModal = useCallback(() => {
    openModal({
      title: '비회원 인증',
      body: (
        <VerifyPhonePopup
          type={'guest'}
          title={
            <>
              비회원 주문시 안전한 주문을 위해
              <br />
              본인 인증이 필요합니다.
            </>
          }
          name={'비회원'}
          handleSuccess={({ phoneNumber, authCode }) => {
            alert('성공적으로 인증했습니다.');
            window.location.reload();
          }}
        />
      ),
    });
  }, []);

  // 메뉴얼 카트 아이템은 사이드바에서 바로 결제하기 페이지로 넘어왔을때 mc라는 query param값을 통해서 카트 아이템을 파싱합니다.
  // initOrderWithItems와 연관있습니다.
  const manualCartItems = useMemo<
    | {
        menuId: number;
        quantity: number;
        subOptionIds: number[];
      }[]
    | null
    | undefined
  >(() => {
    if (!router.isReady) return undefined;

    if (router.query && router.query.mc) {
      try {
        const items = deserializeCart(`${router.query.mc}`);
        return items;
      } catch (err) {
        console.error(err);
        let q = { ...router.query };
        delete q['mc'];
        router.replace({ pathname: router.pathname, query: q });
      }
    } else {
      return null;
    }
  }, [queryEcoupons, queryIgnoreEcoupons, router.isReady]);

  // ignoreCoupons에는 있는데 ecoupons에는 없는게 있다면 다시 장바구니로 돌려보내야함.
  // TODO: 장바구니에 ignoreCoupons안에 없는데, 메뉴가 없어도 돌려보내야함. -> api에서 처리해주면 굳이 안해도 되긴함. 추후 체크 필요.
  useEffect(() => {
    if (!router.isReady) return;
    if (!queryEcoupons || !(queryEcoupons as string).trim().length) return;
    if (!queryIgnoreEcoupons || !(queryIgnoreEcoupons as string).trim().length) return;
    const ecouponNos = (queryEcoupons as string).split(',').map(v => v.trim());
    const ignoreEcouponNos = (queryIgnoreEcoupons as string).split(',').map(v => v.trim());
    for (let ignoreEcouponNo of ignoreEcouponNos) {
      if (!ecouponNos.includes(ignoreEcouponNo)) {
        router.replace(keepParams('/cart'));
        return;
      }
    }
  }, [queryEcoupons, queryIgnoreEcoupons, router.isReady]);

  // 유틸 func: HPC point 가져오기
  const fetchHpcPoint = useCallback(() => {
    AccountAPI.Point.HPC.get()
      .then(({ currentPoint }) => {
        setHpcPointState({
          status: 'SUCCESS',
          message: null,
          points: currentPoint,
          usePoints: 0,
          applyFor: 'BBQ',
        });
      })
      .catch(err => {
        console.error(err);
        const d = parseApiError(err);
        setHpcPointState({
          status: d.code,
          message: d.message ?? null,
          points: null,
          usePoints: 0,
          applyFor: 'BBQ',
        });
      });
  }, []);
  useEffect(() => {
    fetchHpcPoint();
  }, []);

  // hook: 밀 타입 가져오기
  const [mealType, setMealType] = useState<MealTypeEnum | undefined>(undefined);
  useEffect(() => {
    if (!router.isReady) return;
    if (!queryMealType) {
      goBackToCart();
      return;
    }

    setMealType((`${queryMealType}`.toUpperCase() as MealTypeEnum) ?? MealTypeEnum.Delivery);
  }, [router.isReady, queryMealType]);

  // 브랜치 ID
  const [branch, setBranch] = useState<Branch | undefined>(undefined);

  // util func: 카트로 돌아가기
  const goBackToCart = useCallback(() => {
    router.replace(keepParams('/cart'));
  }, [router.query]);

  // hook: 조건에 따라 브랜치를 분기 지정하고 처리
  useEffect(() => {
    if (!router.isReady) return;
    if (typeof manualCartItems === 'undefined') return;
    if (typeof defaultAddress === 'undefined') return;

    if (queryBranchId) {
      BranchAPI.get({ branchId: `${Number(queryBranchId)}` })
        .then(res => {
          setBranch(res);
        })
        .catch(err => {
          console.error(err);
          alert(parseApiError(err).message);
          goBackToCart();
        });
    }
    // 만약 쿼리 브랜드 ID가 없고, 메뉴얼 아이템들이 있을때 + 기본 주소도 있을때
    else if (manualCartItems && defaultAddress) {
      BranchAPI.District.getDeliveryList({
        address: defaultAddress.fullAddress,
        cartRequestList: manualCartItems.map(item => {
          return {
            mainMenuId: item.menuId,
            quantity: item.quantity,
            subOptionItemIdSet: item.subOptionIds,
          };
        }),
      })
        .then(res => {
          BranchAPI.get({
            branchId: `${Number(
              res.familyInfoForDistrictInfoList.sort((a, b) => a.distance - b.distance)[0].branchId,
            )}`,
          })
            .then(res => {
              // setBranch(res);
              router.replace(
                keepParams(router.pathname, {
                  branchId: res.branchId,
                }),
              );
            })
            .catch(err => {
              console.error(err);
              alert(parseApiError(err).message ?? '현재 주문 가능한 매장이 없습니다.');
              goBackToCart();
            });
        })
        .catch(err => {
          console.error(err);
          alert(parseApiError(err).message ?? '현재 주문 가능한 매장이 없습니다.');
          goBackToCart();
        });
    } else {
      goBackToCart();
    }
  }, [router.pathname, router.isReady, queryBranchId, manualCartItems, defaultAddress]);

  // 쿠폰 가져오기
  const [ecoupons, setEcoupons] = useState<ECoupon[] | undefined>(undefined);
  useEffect(() => {
    if (!router.isReady) return;
    if (queryEcoupons) {
      try {
        const couponNos = `${queryEcoupons}`.split(',').map(value => value.trim());

        CouponAPI.E.getList()
          .then(coupons => {
            setEcoupons(coupons.filter(coupon => couponNos.includes(coupon.couponNo)));
          })
          .catch(err => {
            console.error(err);
            setEcoupons([]);
            alert(parseApiError(err).message);
          });
      } catch (err) {
        setEcoupons([]);
        console.error(err);
      }
    } else {
      setEcoupons([]);
    }
  }, [router.isReady, queryEcoupons]);

  const [cart, setCart] = useState<GetCartAPIResponse | undefined>(undefined);
  const [checkout, setCheckout] = useState<InitOrderAPIResponse | undefined>(undefined);
  const [requestState, setRequestState] = useState<CheckoutPageRequestState>({
    orderMessage: '',
    orderMessageExcludeRadish: false,
    orderMessageExcludeBeverage: false,
    orderMessageExcludeDisposableProducts: false,
    useOrderMessageStateLater: false,
    deliveryMessageSelectValue: undefined,
    deliveryMessage: '',
    useDeliveryMessageStateLater: false,
    deliveryArrivalTime: 30,
  });
  const [selectedCoupons, setSelectedCoupons] = useState<CheckoutPageSelectedCoupons>({
    membership: [],
    voucher: [],
    price: [],
  });
  const [appliedCouponAmounts, setAppliedCouponAmounts] = useState<
    CalculateOrderAPIResponse | undefined
  >();
  const [pointState, setPointState] = useState<CheckoutPagePointState>({
    point: undefined,
    useAllPoint: false,
  });

  const paymentMethod = useMemo<string | undefined>(() => {
    if (!router.isReady) return undefined;
    if (!checkout) return undefined;
    const paymentMethod: string | undefined = router.query.paymentMethod as string;
    if (!paymentMethod || !paymentMethod.trim().length) return undefined;
    if (
      !checkout.availablePaymentMethodList.map(item => item.paymentMethod).includes(paymentMethod)
    )
      return undefined;
    return paymentMethod;
  }, [router.query, checkout]);

  const setPaymentMethod = useCallback(
    (paymentMethod?: string) => {
      if (!router.isReady) return;

      if (paymentMethod) {
        router.replace(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              paymentMethod: paymentMethod,
            },
          },
          undefined,
          { scroll: false },
        );
      } else {
        const q = { ...router.query };
        delete q['paymentMethod'];
        router.replace(
          {
            pathname: router.pathname,
            query: q,
          },
          undefined,
          { scroll: false },
        );
      }
    },
    [router.pathname, router.query, router.isReady],
  );

  // hook: (배송일때) 주소가 없으면 카트로 이동
  useEffect(() => {
    if (!router.isReady) return;
    if (!mealType || mealType === MealTypeEnum.Takeout) return;

    if (defaultAddress === null) {
      goBackToCart();
    }
  }, [mealType, defaultAddress, router.isReady]);

  // util func: 장바구니 데이터 불러오기 fetch api
  const fetchCartData = useCallback(() => {
    return new Promise<GetCartAPIResponse>(async (resolve, reject) => {
      let latitude = mealType === MealTypeEnum.Delivery ? defaultAddress?.latitude ?? 0 : 0;
      let longitude = mealType === MealTypeEnum.Delivery ? defaultAddress?.longitude ?? 0 : 0;

      CartAPI.get({
        branchId: branch!.branchId,
        mealType: mealType!.toUpperCase(),
        latitude: latitude ?? branch!.latitude ?? 0,
        longitude: longitude ?? branch!.longitude ?? 0,
        legalDongId: mealType === MealTypeEnum.Delivery ? defaultAddress?.legalDongId ?? '' : '',
        administrativeDongId:
          mealType === MealTypeEnum.Delivery ? defaultAddress?.administrativeDongId ?? '' : '',
        ecouponList: ecoupons && ecoupons.length ? ecoupons.map(c => c.couponNo) : [],
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  }, [mealType, defaultAddress, branch, ecoupons]);

  // hook: 장바구니 불러옵니다.
  useEffect(() => {
    if (!router.isReady) return;
    if (
      !mealType ||
      !branch ||
      typeof ecoupons === 'undefined' ||
      typeof manualCartItems === 'undefined'
    )
      return;
    if (manualCartItems && manualCartItems.length) return;
    if (mealType === MealTypeEnum.Delivery && !defaultAddress) return;

    fetchCartData()
      .then(cart => {
        if (!cart.responseList.length) {
          goBackToCart();
        } else {
          setCart(cart);
        }
      })
      .catch(err => {
        alert(parseApiError(err).message);
      });
  }, [fetchCartData, manualCartItems, defaultAddress, mealType, branch, ecoupons, router.isReady]);

  // util func: 주문 생성하기 fetch api
  const fetchCheckoutData = useCallback(
    async ({ type }: { type: 'manual' | 'cart' }) => {
      if (
        /* !cart || */
        !mealType ||
        typeof ecoupons === 'undefined' ||
        !branch ||
        typeof manualCartItems === 'undefined'
      )
        return;

      if (mealType === MealTypeEnum.Delivery && !defaultAddress) return;

      try {
        if (type === 'manual' && manualCartItems && manualCartItems.length) {
          const checkoutData = await initOrderWithItems({
            address: defaultAddress ?? undefined,
            branchId: branch.branchId,
            mealType,
            ecoupons: ecoupons && ecoupons.length ? ecoupons.map(c => c.couponNo) : [],
            orderAgent: isArsSession ? VISUALARS : isMobile ? MOBILEWEB : DESKTOPWEB,
            orderFlow:
              `${from}` === 'cart'
                ? 'CART'
                : `${from}` === 'quick_order'
                  ? 'QUICK_ORDER'
                  : 'DIRECT',
            items: manualCartItems,
          });
          setCheckout(checkoutData);
        } else if (cart) {
          const checkoutData = await initOrder({
            address: defaultAddress ?? undefined,
            cart,
            mealType,
            ecoupons: ecoupons && ecoupons.length ? ecoupons.map(c => c.couponNo) : [],
            orderAgent: isArsSession ? VISUALARS : isMobile ? MOBILEWEB : DESKTOPWEB,
            orderFlow:
              `${from}` === 'cart'
                ? 'CART'
                : `${from}` === 'quick_order'
                  ? 'QUICK_ORDER'
                  : 'DIRECT',
          });
          setCheckout(checkoutData);
        }
      } catch (err) {
        const errorData = parseApiError(err);

        if (errorData.code === 'PHONE_VERIFICATION_REQUIRED') {
          alert(errorData.message);
          openGuestVerificationModal();
        } else if (errorData.code === 'ADULT_VERIFICATION_REQUIRED') {
          alert(errorData.message + '\n(팝업창을 허용해주세요.)');

          // 성인인증 토큰 가져오기
          setAdultToken(undefined);
          OrderAPI.Adult.getToken()
            .then(token => {
              setAdultToken(token);

              // 팝업창 띄우기 tweak
              const defer = () => {
                if (!adultFormRef.current) {
                  setTimeout(defer);
                  return;
                }
                adultFormRef.current.submit();
              };
              setTimeout(defer, 200);
            })
            .catch(err => {
              console.error(err);
              alert(parseApiError(err).message);
            });
        } else {
          alert(errorData.message);
          goBackToCart();
        }
      }
    },
    [cart, manualCartItems, mealType, branch, defaultAddress, ecoupons, isMobile, from],
  );

  // hook: 선택된 쿠폰에 따라서 주문 금액 계산
  useEffect(() => {
    if (typeof manualCartItems === 'undefined') return;
    if (!checkout || typeof ecoupons === 'undefined') return;

    OrderAPI.calculate({
      totalCartPrice: checkout.cartResponseInfo.totalPrice,
      deliveryFee: checkout.deliveryInfo.deliveryFee,
      takeoutDiscountAmount: checkout.takeoutDiscountPrice,
      membershipCouponList: (selectedCoupons.membership ?? [])
        .map(coupon => coupon.calculatedDiscountPrice ?? coupon.discountAmount ?? 0)
        .filter(v => !!v),
      ecouponList:
        ecoupons && ecoupons.length ? ecoupons.map(c => c.menuPrice ?? 0).filter(v => !!v) : [],
      voucherList: (selectedCoupons.voucher ?? [])
        .map(coupon => coupon.price ?? 0)
        .filter(v => !!v),
      priceCouponList: (selectedCoupons.price ?? [])
        .map(coupon => coupon.balance ?? 0)
        .filter(v => !!v),
      point: pointState.point ? Number(pointState.point) : 0,
      hpcPoint: hpcPointState?.usePoints ?? 0,
    })
      .then(res => {
        setAppliedCouponAmounts(res);
      })
      .catch(err => {
        console.error(err);
        setSelectedCoupons({
          membership: [],
          voucher: [],
          price: [],
        });
        setPointState({ point: '', useAllPoint: false });
        alert(parseApiError(err).message);
      });
  }, [
    manualCartItems,
    checkout,
    selectedCoupons,
    ecoupons,
    pointState.point,
    hpcPointState?.usePoints,
  ]);

  // hook: 주문 생성하기 (거의 최초로 실행되는 시작이 되는 hook입니다.)
  useEffect(() => {
    if (!router.isReady) return;
    if (typeof manualCartItems === 'undefined') return;

    if (manualCartItems) {
      fetchCheckoutData({ type: 'manual' });
    } else {
      fetchCheckoutData({ type: 'cart' });
    }
  }, [cart, manualCartItems, branch, mealType, router.query, router.isReady]);

  const handleCouponMenuItemButtonClick = useCallback(
    ({ type }: { type: 'membership' | 'voucher' | 'price' }) => {
      if (!checkout) return;

      openModal({
        title: '쿠폰 선택',
        body: (
          <SelectCouponsForm
            type={type}
            defaultSelectedCoupons={selectedCoupons}
            membershipCoupons={checkout?.membershipCouponInfoList ?? []}
            voucherCoupons={checkout?.voucherInfoList ?? []}
            priceCoupons={checkout?.priceCouponInfoList ?? []}
            handleSubmit={async ({
              selectedMembershipCoupons,
              selectedVoucherCoupons,
              selectedPriceCoupons,
            }) => {
              setSelectedCoupons({
                membership: selectedMembershipCoupons ?? [],
                voucher: selectedVoucherCoupons ?? [],
                price: selectedPriceCoupons ?? [],
              });
              closeModal();
            }}
          />
        ),
        maxWidth: 580,
      });
    },
    [checkout, selectedCoupons, pointState],
  );

  const handleHpcButtonClick = useCallback(() => {
    if (!router.isReady) return;
    if (!hpcPointState) return;
    if (!hpcPointState.status) return;
    if (!member) return;

    switch (hpcPointState.status) {
      case 'SUCCESS':
        openModal({
          title: '제휴포인트',
          body: (
            <HPCPointForm
              hpcPointState={hpcPointState}
              handleConfirmButtonClick={(newState: CheckoutPageHPCState) => {
                closeModal();
                setHpcPointState(newState);
              }}
            />
          ),
        });

        return;
      case 'CI_REQUIRED':
        setHpcVerifyPopupKey(prev => prev + 1);
        setHpcVerifyPopupVisible(true);

        return;
      case 'NOT_HPC_MEMBER':
        alert('해피포인트 회원이 아닙니다. 본인 명의로 가입하셨는지 먼저 확인해 주세요.');
        return;
    }
  }, [hpcPointState, member, router.isReady]);

  // ecoupons 사용도중 나가려고 confirm으로 물어보는 역할
  useEffect(() => {
    if (ecoupons?.length) {
      Router.events.on('routeChangeStart', handleRouteChangeStartForEcouponCancel);

      return () => {
        Router.events.off('routeChangeStart', handleRouteChangeStartForEcouponCancel);
      };
    } else {
      Router.events.off('routeChangeStart', handleRouteChangeStartForEcouponCancel);
    }
  }, [ecoupons]);

  // 총 결제 금액
  const totalPrice =
    (checkout?.cartResponseInfo.totalPrice ?? 0) +
    (checkout?.deliveryInfo.deliveryFee ?? 0) -
    // Number(pointState?.point ?? 0) -
    (appliedCouponAmounts?.discountInfoList.reduce(
      (total, discount) => total + discount.amount,
      0,
    ) ?? 0);

  // 총 결제 금액 (포인트 제외)
  const totalPriceWithoutPoint =
    (checkout?.cartResponseInfo.totalPrice ?? 0) +
    (checkout?.deliveryInfo.deliveryFee ?? 0) -
    // Number(pointState?.point ?? 0) -
    (appliedCouponAmounts?.discountInfoList
      .filter(l => l.paymentType !== 'POINT')
      .reduce((total, discount) => total + discount.amount, 0) ?? 0);

  const handleCheckoutButtonClick = async () => {
    if (!checkout || (totalPrice > 0 && !paymentMethod)) return;

    try {
      setButtonLoading(true);
      const { orderId, paymentUrl, paymentRequired } = await OrderAPI.process(
        {
          // TODO: paymentRequired가 아니면 결제 창 안띄워요됨
          mealType: checkout.mealType,
          branchId: checkout.familyInfo.branchId,
          cartList: checkout.cartResponseInfo.responseList.map(item => {
            return {
              mainMenuId: item.mainMenuId,
              quantity: item.quantity,
              subOptionItemIdSet: item.subOptionHeadList.reduce<number[]>(
                (arr, item) => [...arr, ...item.subOptionDetailList.map(d => d.subOptionDetailId)],
                [],
              ),
            };
          }),
          orderFlow:
            `${from}` === 'cart' ? 'CART' : `${from}` === 'quick_order' ? 'QUICK_ORDER' : 'DIRECT',
          orderRequestMessage: `${[
            requestState.orderMessage ? `${requestState.orderMessage} ` : '',
            requestState.orderMessageExcludeRadish ? '[치킨무X]' : '',
            requestState.orderMessageExcludeBeverage ? '[음료X]' : '',
            requestState.orderMessageExcludeDisposableProducts ? '[일회용품X]' : '',
          ]
            .filter(text => text && text.trim().length)
            .join('')}`.trim(),
          deliveryRequestMessage: `${[
            requestState.deliveryMessage,
            requestState.deliveryMessageSelectValue &&
            requestState.deliveryMessageSelectValue !== 'etc'
              ? requestState.deliveryMessageSelectValue
              : '',
          ]
            .filter(text => text && text.trim().length)
            .join(', ')}`.trim(),
          deliveryAddress: checkout.deliveryInfo.deliveryFullAddress,
          deliveryAddressDetail: checkout.deliveryInfo.deliveryDetailAddress,
          takeoutVisitMin:
            checkout.mealType === 'TAKEOUT' ? requestState.deliveryArrivalTime ?? 0 : 0,
          usePoint: pointState.point ? Number(pointState.point) : 0,
          useHpcPoint: hpcPointState?.usePoints ?? 0,
          earnPointType: hpcPointState?.applyFor ?? 'BBQ',
          membershipCouponUsageList: (selectedCoupons.membership ?? []).map(coupon => ({
            couponNo: coupon.couponNo,
            issuanceType: coupon.issuanceType,
          })),
          ecouponList: ecoupons && ecoupons.length ? ecoupons.map(c => c.couponNo) : [] ?? [],
          voucherList: (selectedCoupons.voucher ?? []).map(coupon => coupon.voucherSn),
          priceCouponList: (selectedCoupons.price ?? []).map(coupon => coupon.couponNo),
          paymentMethod: totalPrice <= 0 ? 'NONE' : paymentMethod ?? 'NONE',
        },
        isArsSession ? VISUALARS : isMobile ? MOBILEWEB : DESKTOPWEB,
      );

      if (paymentRequired) {
        window.location.href = paymentUrl;
        //window.open(paymentUrl, "_blank");

        /*const checkCompleteRepeatlyAndRedirectToCompletePage = ({
            orderId,
          }: {
            orderId: number;
          }) => {
            OrderAPI.complete({
              orderId: orderId,
            })
              .then(({ orderId }) => {
                router.push(`/checkout/complete/${orderId}`);
                reloadPointAmount();
              })
              .catch((err) => {
                setTimeout(() => {
                  checkCompleteRepeatlyAndRedirectToCompletePage({ orderId });
                }, 3000);
  
              });
          };
          checkCompleteRepeatlyAndRedirectToCompletePage({ orderId });*/
      } else if (!paymentRequired) {
        router.push(`/checkout/complete/${orderId}`);
        reloadPointAmount();
      }
    } catch (err) {
      setButtonLoading(false);
      console.error(err);
      alert(parseApiError(err).message);
    }
  }; //, [checkout, requestState, pointState, paymentMethod]);

  const summary = {
    disabled: false,
    title: `주문상품 ${checkout?.cartResponseInfo.responseList.length ?? 0}개`,
    body: {
      items: [
        {
          name: '주문 금액',
          value: `${checkout?.cartResponseInfo.responseList
            .reduce<number>((total, item) => {
              return total + item.totalMenuWithSubOptionAndQuantityPrice;
            }, 0)
            .toLocaleString()}원`,
          highlighted: false,
        },
        /*...(Number(pointState?.point ?? 0)
          ? [
              {
                name: "포인트 사용",
                value: `${Number(pointState?.point ?? 0).toLocaleString()}원`,
                highlighted: true,
              },
            ]
          : []),*/
        ...((checkout?.cartResponseInfo.discountPrice ?? 0) +
          (appliedCouponAmounts?.discountInfoList.reduce(
            (total, discount) => total + discount.amount,
            0,
          ) ?? 0) >
        0
          ? [
              {
                name: '할인금액(쿠폰/포인트/이벤트)',
                value: `-${(
                  (checkout?.cartResponseInfo.discountPrice ?? 0) +
                  (appliedCouponAmounts?.discountInfoList.reduce(
                    (total, discount) => total + discount.amount,
                    0,
                  ) ?? 0)
                ).toLocaleString()}원`,
                highlighted: true,
              },
            ]
          : []),
        {
          name: '배달팁(배달/포장 배달비)',
          value: `${(
            checkout?.deliveryInfo.deliveryFee ??
            checkout?.cartResponseInfo.deliveryFee ??
            0
          ).toLocaleString()}원`,
          highlighted: false,
        },
      ],
    },
    bottom: {
      items: [
        {
          name: '총 결제금액',
          value: `${totalPrice.toLocaleString()}원`,
        },
      ],
      ...(member && totalPrice > 0
        ? {
            suffix: (
              <Flex.CSE>
                <Text color={COLOR_RED} size={FONTSIZE_12}>
                  적립예정 포인트 : 결제금액 2%
                </Text>
                <Space.H0_5 />
                <Text color={'#777777'} size={FONTSIZE_10}>
                  ⚠일부품목 제외
                </Text>
              </Flex.CSE>
            ),
          }
        : {}),
    },
    button: {
      disabled: totalPrice > 0 && !paymentMethod,
      onClick: handleCheckoutButtonClick,
      loading: buttonLoading,
    },
  };

  if (!checkout) {
    return (
      <>
        {adultToken ? (
          <>
            <Flex.CCC full={true}>
              <Space.H16 />
              <Text>성인인증을 완료 후 새고로침을 해주세요.</Text>
              <Space.H4 />
              <Button
                text="새로고침"
                color="red"
                shape={'round'}
                onClick={() => {
                  window.location.reload();
                }}
              />
              <Space.H16 />
            </Flex.CCC>
            <div style={{ position: 'fixed', left: -5000 }}>
              <form
                key={adultToken}
                ref={adultFormRef}
                target="_blank"
                action={process.env.NEXT_PUBLIC_ADULT_READY_ENDPOINT}
                method="post"
              >
                <input type="hidden" name="token" defaultValue={adultToken} />
                <button type="submit">전송</button>
              </form>
            </div>
          </>
        ) : null}
      </>
    );
  }

  const props = {
    checkoutData: checkout,
    selectedCoupons: selectedCoupons,
    requestState: requestState,
    setRequestState: setRequestState,
    handleCouponMenuItemButtonClick: handleCouponMenuItemButtonClick,
    appliedCouponAmounts: appliedCouponAmounts,
    pointState: pointState,
    setPointState: setPointState,
    hpcPointState: hpcPointState,
    setHpcPointState: setHpcPointState,
    handleHpcButtonClick: handleHpcButtonClick,
    paymentMethod: paymentMethod,
    setPaymentMethod: setPaymentMethod,
    summary: summary,
    totalPrice: totalPrice,
    totalPriceWithoutPoint: totalPriceWithoutPoint,
  };

  return (
    <>
      <Desktop>
        <CheckoutPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <CheckoutPageTemplate.Mobile {...props} />
      </Mobile>
      {member && hpcVerifyPopupVisible ? (
        <>
          <IframePopup
            key={hpcVerifyPopupKey}
            handleCloseButtonClick={() => setHpcVerifyPopupVisible(false)}
            url={`${
              process.env.NEXT_PUBLIC_CI_READY_ENDPOINT
            }?phoneNumber=${member.phoneNumber.replace(
              /[^0-9]/g,
              '',
            )}&verifyType=EXIST_MEMBER_CI_VERIFY`}
            messageHandler={async (event: MessageEvent<any>) => {
              try {
                if ((window as any).__hpctried) return;
                if (!hpcVerifyPopupVisible) return;
                if (!event.data) return;
                if (typeof event.data !== 'string') return;
                const data: string = event.data;
                if (!data.startsWith('@@cicallback@@$')) return;

                const { token, verifyType } = JSON.parse(data.split('@@cicallback@@$')[1]);
                if (!token || !verifyType) return;

                try {
                  (window as any).__hpctried = true;
                  setHpcVerifyPopupVisible(false);
                  await AccountAPI.Member.CI.set({ ciToken: token });
                  await fetchHpcPoint();
                } catch (err) {
                  console.error(err);
                  alert(parseApiError(err).message);
                  window.location.reload();
                }
              } catch (err) {
                console.error(err);
                // alert((err as any).message);
              }
            }}
          />
        </>
      ) : null}
    </>
  );
}
