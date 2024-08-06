import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Router, { useRouter } from 'next/router';

import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';

import { CartAPI, CouponAPI, MenuAPI, OrderAPI } from '@/apis';
import { DESKTOPWEB, MOBILEWEB, VISUALARS } from '@/apis/order/init';
import { Desktop, Mobile } from '@/components/functions';
import { useModal } from '@/components/molecules';
import { VerifyPhonePopup } from '@/components/organisms';
import { CartPageTemplate } from '@/components/templates';
import { COLOR_BLACK, COLOR_WHITE } from '@/constants';
import { useAuth, useMobile, useQueryParams } from '@/hooks';
import { cartCountState, isArsSessionState } from '@/stores';
import {
  ECoupon,
  GetCartAPIResponse,
  GetMenuRecommendListAPIResponse,
  MealTypeEnum,
} from '@/types';
import { parseApiError, serializeCartForMap } from '@/utils';

import { initOrder } from '../checkout';

// e쿠폰 사용한 상태로 장바구니에 접근한뒤, 나갈려고 할때 어디로 나갈지에 따라서 e쿠폰 사용을 취소할지 물어보는 handler입니다.
const handleRouteChangeStartForEcouponCancel = (url: string) => {
  if (Router.pathname === url.split('?')[0]) return;
  if (url.startsWith('/address/permission')) return;
  if (url.startsWith('/address/search')) return;
  if (url.startsWith('/checkout')) return;
  if (url.startsWith('/categories')) return;
  if (url.startsWith('/products')) return;
  if (url.startsWith('/stores/map')) return;
  if (url.startsWith('/cart')) return;
  if (typeof window !== 'undefined' && (window as any).__cart_errored) return;
  if (
    !window.confirm(
      '장바구니를 나가시겠어요?\n현재 장바구니를 벗어나면 교환권 사용이 취소됩니다. 교환권을 사용하여 주문하시려면 다시 쿠폰북에서 교환권을 선택해주세요.',
    )
  ) {
    Router.events.emit('routeChangeError');
    // eslint-disable-next-line no-throw-literal
    throw "Abort route change by user's confirmation.";
  }
};

export default function Cart() {
  const router = useRouter();
  const { keepParams } = useQueryParams();
  const { defaultAddress } = useAuth();
  const { openModal } = useModal();
  const isMobile = useMobile();
  const isArs = useRecoilValue(isArsSessionState);

  // 페이지가 복합적으로 상태가 변경되다 보니, 에러가 발생했을 상태를 추적하는 것을 global variable으로 넣었습니다.
  // NEXT 페이지 특성상 다른 페이지로 이동하면 state가 초기화되기 때문에, global variable로 관리합니다.
  // 즉, cart 페이지에서 나갔다가 들어오는 일이 잦아서, 값이 꼬이는 현상을 방지하고, 에러가 발생한 상태면 페이지를 이동시키커나 초기화를 하기 위함입니다.
  // 좋은 방식은 아니라고 봅니다.
  useEffect(() => {
    let intervalId: any = undefined;

    const func = () => {
      if (typeof window === 'undefined') return;
      if (intervalId) clearInterval(intervalId);
      (window as any).__cart_errored = undefined;
    };
    func();

    intervalId = setInterval(func);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const refreshCartCountState = useRecoilRefresher_UNSTABLE(cartCountState); // 장바구니 갯수 초기화
  const [branchId, setBranchId] = useState<string | undefined>(); // 브랜치 ID
  const [mealType, setMealType] = useState<MealTypeEnum | undefined>(); // 배달 or 포장
  const [ecoupons, setEcoupons] = useState<ECoupon[] | undefined>(); // e쿠폰
  const [ignoreEcoupons, setIgnoreEcoupons] = useState<ECoupon[] | undefined>(); // e쿠폰을 사용할때 특정 e쿠폰을 무시해야하는 상황이 있습니다. 그것을 관리하기 위한 값입니다.
  const [cart, setCart] = useState<GetCartAPIResponse | undefined>(undefined); // 장바구니 데이터 (from api)
  const [recommendedMenus, setRecommendedMenus] = useState<
    GetMenuRecommendListAPIResponse | undefined
  >(undefined);
  const [adultToken, setAdultToken] = useState<string | undefined>(); // 성인인증 토큰
  const adultFormRef = useRef<HTMLFormElement>(null); // 성인인증을 할때 뜨는 폼을 제어하기 위한 ref입니다.

  // hook: ecoupons 사용도중 나가려고 confirm으로 물어봅니다.
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

  // 최초 hook: 브랜치ID와 mealType와 ecoupons 가져옵니다. (이 함수가 시작입니다. 즉, 시작 순위 1번입니다.)
  // 모두 query params에 있는 값을 기반으로 값을 설정하고, 쿠폰들을 데이터를 서버에서 조회합니다.
  useEffect(() => {
    if (!router.isReady) return;
    const {
      branchId: queryBranchId,
      mealType: queryMealType,
      ecoupons: queryEcoupons,
      ignoreEcoupons: queryIgnoreEcoupons,
    } = router.query;

    if (queryBranchId) {
      setBranchId(queryBranchId as string);
    } else {
      setBranchId('');
    }

    if (queryMealType) {
      setMealType(`${queryMealType}`.toUpperCase() as MealTypeEnum);
    } else {
      setMealType(MealTypeEnum.Delivery);
    }

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

    if (queryIgnoreEcoupons) {
      try {
        const couponNos = `${queryIgnoreEcoupons}`.split(',').map(value => value.trim());

        CouponAPI.E.getList()
          .then(coupons => {
            setIgnoreEcoupons(coupons.filter(coupon => couponNos.includes(coupon.couponNo)));
          })
          .catch(err => {
            console.error(err);
            setIgnoreEcoupons([]);
            alert(parseApiError(err).message);
          });
      } catch (err) {
        setIgnoreEcoupons([]);
        console.error(err);
      }
    } else {
      setIgnoreEcoupons([]);
    }
  }, [router.isReady, router.query]);

  // 유틸 func: 장바구니 데이터를 가져오는 함수입니다.
  // 가장 복잡한 함수입니다.
  const fetchCartData = useCallback(() => {
    return new Promise<GetCartAPIResponse>(async (resolve, reject) => {
      if (typeof branchId === 'undefined') return;
      if (typeof mealType === 'undefined') return;
      if (typeof ecoupons === 'undefined') return;
      if (typeof ignoreEcoupons === 'undefined') return;
      if (typeof defaultAddress === 'undefined') return;

      // 위치 주소
      let latitude = mealType === MealTypeEnum.Delivery ? defaultAddress?.latitude ?? 0 : 0;
      let longitude = mealType === MealTypeEnum.Delivery ? defaultAddress?.longitude ?? 0 : 0;
      let legalDongId = MealTypeEnum.Delivery ? defaultAddress?.legalDongId ?? '' : '';
      let administrativeDongId = MealTypeEnum.Delivery
        ? defaultAddress?.administrativeDongId ?? ''
        : '';

      // 배달인데 기본 주소가 없으면 주소 입력으로 이동
      // 이 함수 안에서 router 변화를 일으키는건 지양해야 합니다.
      if (mealType === MealTypeEnum.Delivery && !defaultAddress) {
        router.replace(`/address/permission?redirect_to=${encodeURIComponent(router.asPath)}`);
        return;
      }

      // 장바구니 가져오기
      CartAPI.get({
        branchId: branchId,
        mealType: mealType.toUpperCase(),
        latitude: latitude,
        longitude: longitude,
        legalDongId: legalDongId,
        administrativeDongId: administrativeDongId,
        ecouponList: ecoupons.map(coupon => coupon.couponNo),
      })
        .then(res => {
          // 1. 만약 주소 쿼리 파라메터에 branchId가 없다면 넣기
          if (!branchId && res.familyInfoResponse.branchId) {
            router.replace({
              pathname: router.pathname,
              query: {
                mealType: mealType.toLocaleLowerCase(),
                branchId: res.familyInfoResponse.branchId,
                ...(ecoupons.length
                  ? {
                      ecoupons: ecoupons.map(coupon => coupon.couponNo).join(','),
                    }
                  : {}),
                ...(ignoreEcoupons.length
                  ? {
                      ignoreEcoupons: ignoreEcoupons.map(coupon => coupon.couponNo).join(','),
                    }
                  : {}),
              },
            });
          }
          // 2. 만약 교환권의 제품이 현재 담은 카트 목록에 없으면 (ignoreECoupons 제외) -> 쿠폰 해지
          else if (
            ecoupons.length &&
            res.ecouponDiscountPrice &&
            ecoupons
              .filter(ecoupon => {
                // ignoreEcoupons에 있는 쿠폰은 제외
                return !ignoreEcoupons.find(
                  ignoreEcoupon => ecoupon.couponNo === ignoreEcoupon.couponNo,
                );
              })
              .filter(ecoupon => {
                // ecoupons에는 있지만 담은 메뉴가 존재하지 않는 것 필터
                return !res.responseList.map(item => item.mainMenuId).includes(ecoupon.menuId);
              }).length > 0
          ) {
            const availableEcoupons = ecoupons.filter(ecoupon => {
              //ignoreEcoupons에 있거나 or 담은 메뉴에 있는것만 쿠폰만 필터링
              return (
                ignoreEcoupons.find(ignoreEcoupon => ecoupon.couponNo === ignoreEcoupon.couponNo) ||
                res.responseList.map(item => item.mainMenuId).includes(ecoupon.menuId)
              );
            });

            const availableIgnoreEcoupons = ignoreEcoupons.filter(ignoreEcoupon => {
              // availableEcoupons에 있는 ignoreECoupon만 필터링 (아예 의미없는 쿠폰은 빼버려야하니까)
              return availableEcoupons.find(
                availableEcoupon => availableEcoupon.couponNo === ignoreEcoupon.couponNo,
              );
            });

            // 재설정 (Router replace)
            router.replace({
              pathname: router.pathname,
              query: {
                mealType: mealType.toLocaleLowerCase(),
                branchId: res.familyInfoResponse.branchId,
                ...(availableEcoupons && availableEcoupons.length
                  ? {
                      ecoupons: availableEcoupons.map(ecoupon => ecoupon.couponNo).join(','),
                    }
                  : {}),
                ...(availableIgnoreEcoupons.length
                  ? {
                      availableIgnoreEcoupons: availableIgnoreEcoupons
                        .map(coupon => coupon.couponNo)
                        .join(','),
                    }
                  : {}),
              },
            });
          }
          // 3. ignoreEcoupons에 있는 메뉴가 현재 담은 메뉴에 존재한다면 -> 없애고 새로고침
          else if (
            res.responseList.filter(item => {
              return ignoreEcoupons
                .map(ignoreEcoupon => ignoreEcoupon.menuId)
                .includes(item.mainMenuId);
            }).length > 0
          ) {
            // TODO: 삭제가 여러번 호출되는데 이유를 정확하게 알 수 없음.
            // 해당 상품 장바구니 비우고 새로고침
            Promise.all(
              res.responseList
                .filter(item => {
                  return ignoreEcoupons
                    .map(ignoreEcoupon => ignoreEcoupon.menuId)
                    .includes(item.mainMenuId);
                })
                .map(item => CartAPI.deleteMenu({ id: item.id })),
            )
              .then(_ => {
                // tweak: 혹시나 새로고침이 안되는 경우를 위해 setTimeout
                if (typeof window !== 'undefined') {
                  window.location.reload();
                } else {
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }
              })
              .catch(err => {
                console.error(err);
                // alert(parseApiError(err).message);
              });
          } else {
            setCart(res);
            resolve(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }, [mealType, branchId, ecoupons, ignoreEcoupons, defaultAddress]);

  // 클릭 handler: 장바구니 아이템 전부 삭제
  const handleDeleteAllItemButtonClick = useCallback(() => {
    CartAPI.deleteAllMenu()
      .then(async res => {
        await fetchCartData();
        refreshCartCountState();
      })
      .catch(err => {
        console.error(err);

        if (typeof window !== 'undefined' && !(window as any).__cart_errored) {
          (window as any).__cart_errored = true;
          router.back();
          alert(parseApiError(err).message);
        }
      });
  }, [fetchCartData, cart]);

  // 클릭 handler: 장바구니 아이템 삭제
  const handleItemDeleteButtonClick = useCallback(
    ({ itemId }: { itemId: number }) => {
      CartAPI.deleteMenu({ id: itemId })
        .then(async res => {
          await fetchCartData();
          refreshCartCountState();
        })
        .catch(err => {
          console.error(err);

          if (typeof window !== 'undefined' && !(window as any).__cart_errored) {
            (window as any).__cart_errored = true;
            router.back();
            alert(parseApiError(err).message);
          }
        });
    },
    [fetchCartData, cart],
  );

  // 클릭 handler: 장바구니 아이템 수량 변경
  const handleItemChangeQuantityChange = useCallback(
    ({ itemId, quantity }: { itemId: number; quantity: number }) => {
      CartAPI.modifyMenuQuantity({ id: itemId, quantity: quantity })
        .then(async res => {
          await fetchCartData();
        })
        .catch(err => {
          console.error(err);

          if (typeof window !== 'undefined' && !(window as any).__cart_errored) {
            (window as any).__cart_errored = true;
            router.back();
            alert(parseApiError(err).message);
          }
        });
    },
    [fetchCartData, cart],
  );

  // 유틸 func: 비회원 인증 모달 띄우기
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

  // 최초 hook: 최초의 전체 init하는 함수 (시작 순위 2번입니다.)
  useEffect(() => {
    if (!router.isReady) return; // 라우터가 준비되지 않았다면 종료
    if (typeof mealType === 'undefined') return; //기본 정보가 없으면 종료
    if (typeof branchId === 'undefined') return; // 기본 정보가 없으면 종료
    if (typeof ecoupons === 'undefined') return; // 기본 정보가 없으면 종료
    if (typeof ignoreEcoupons === 'undefined') return; // 기본 정보가 없으면 종료
    if (typeof defaultAddress === 'undefined') return; // 기본주소가 불러오기가 끝나지 않았다면 종료
    if (fetchCartData) {
      fetchCartData()
        .then(() => {})
        .catch(err => {
          console.error(err);

          if (typeof window !== 'undefined' && !(window as any).__cart_errored) {
            (window as any).__cart_errored = true;
            router.back();
            alert(parseApiError(err).message);
          }
        });
    }
  }, [fetchCartData, router.isReady, defaultAddress, mealType, branchId, ecoupons, ignoreEcoupons]);

  // 최초 hook: 추천 메뉴 불러오기
  useEffect(() => {
    MenuAPI.Recommend.getList({ type: 'recommended' }) // TODO: change type to cart
      .then(res => {
        setRecommendedMenus(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  // memo: 우측 카드 정보
  const summary = useMemo(() => {
    if (!cart || !mealType) return undefined;

    return {
      title: '주문 정보',
      body: {
        items: [
          {
            name: '주문 금액',
            value: `${cart.responseList
              .reduce<number>((total, item) => {
                return total + item.totalMenuWithSubOptionAndQuantityPrice;
              }, 0)
              .toLocaleString()}원`,
            highlighted: false,
          },
          ...(cart.ecouponDiscountPrice
            ? [
                {
                  name: '교환권',
                  value: `-${cart.ecouponDiscountPrice.toLocaleString()}원`,
                  highlighted: true,
                },
              ]
            : []),
          {
            name: '배달팁',
            value: `${cart.deliveryFee.toLocaleString()}원`,
            highlighted: false,
          },
        ],
      },
      bottom: {
        items: [
          {
            name: '총 결제금액',
            value: `${(
              (cart.totalPrice ?? 0) +
              (cart.deliveryFee ?? 0) -
              (cart.ecouponDiscountPrice ?? 0)
            ).toLocaleString()}원`,
          },
        ],
      },
      button:
        !cart.familyInfoResponse.branchId ||
        (cart.responseList || []).filter(item => item.isSoldOut).length > 0
          ? {
              title: '다른 패밀리 선택',
              url: `/stores/map?for=change-${`${mealType}`.toLowerCase()}&redirect_to=${encodeURIComponent(
                router.asPath,
              )}&cart=${encodeURIComponent(serializeCartForMap(cart))}`,
              color: COLOR_BLACK,
              textColor: COLOR_WHITE,
            }
          : {
              title:
                (cart.totalPrice ?? 0) < (cart.ecouponDiscountPrice ?? 0)
                  ? '메뉴를 더 담아주세요'
                  : '결제하기',
              disabled:
                cart.responseList.length === 0 ||
                (cart.totalPrice ?? 0) < (cart.ecouponDiscountPrice ?? 0),
              onClick: async () => {
                try {
                  if (mealType === MealTypeEnum.Delivery && !defaultAddress) {
                    alert('배송지 주소가 존재하지 않습니다.');
                    router.push(
                      `/address/permission?redirect_to=${encodeURIComponent(window.location.href)}`,
                    );
                    return;
                  }

                  await initOrder({
                    cart,
                    mealType,
                    orderAgent: isArs ? VISUALARS : isMobile ? MOBILEWEB : DESKTOPWEB,
                    ecoupons:
                      ecoupons && ecoupons.length ? ecoupons.map(coupon => coupon.couponNo) : [],
                    address: defaultAddress ?? undefined,
                    orderFlow: 'CART',
                  });

                  router.push({
                    pathname: '/checkout',
                    query: {
                      mealType: mealType.toLowerCase(),
                      branchId: cart.familyInfoResponse.branchId,
                      from: 'cart',
                      ...(ecoupons && ecoupons.length
                        ? {
                            ecoupons: ecoupons.map(coupon => coupon.couponNo).join(','),
                          }
                        : {}),
                      ...(ignoreEcoupons && ignoreEcoupons.length
                        ? {
                            ignoreEcoupons: ignoreEcoupons
                              .map(ignoreEcoupon => ignoreEcoupon.couponNo)
                              .join(','),
                          }
                        : {}),
                    },
                  });
                } catch (e) {
                  console.error(e);
                  const { message, code } = parseApiError(e);
                  if (code === 'PHONE_VERIFICATION_REQUIRED') {
                    alert(message);
                    openGuestVerificationModal();
                  } else if (code === 'ADULT_VERIFICATION_REQUIRED') {
                    alert(message + '\n(팝업창을 허용해주세요.)');

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
                    alert(message);
                  }
                }
              },
            },
    };
  }, [cart, mealType, isMobile, defaultAddress]);

  if (!cart || !mealType) {
    return null;
  }

  const props = {
    cartData: cart,
    mealType: mealType,
    recommendedMenus: recommendedMenus,
    handleItemDeleteButtonClick: handleItemDeleteButtonClick,
    handleDeleteAllItemButtonClick: handleDeleteAllItemButtonClick,
    handleItemChangeQuantityChange: handleItemChangeQuantityChange,
    summary: summary,
    ecoupons: ecoupons ?? [],
    // TODO: useCallback으로 옮기기
    handleECouponMenuChangeButtonClick: ({ ecoupon: targetECoupon }: { ecoupon: ECoupon }) => {
      if (
        !ecoupons ||
        !ecoupons.find(ecoupon => {
          return ecoupon.couponNo === targetECoupon.couponNo;
        })
      ) {
        alert('쿠폰을 찾을 수 없습니다.');
        if (typeof window !== 'undefined') {
          (window as any).location.reload();
        }
        return;
      }

      router.push(
        keepParams('/categories/1', {
          ecouponAction: 'change',
          ecouponActionValue: targetECoupon.couponNo,
        }),
      );
    },
    // TODO: useCallback으로 옮기기
    handleECouponCancelButtonClick: ({ ecoupon: targetECoupon }: { ecoupon: ECoupon }) => {
      if (!ecoupons) {
        alert('쿠폰을 찾을 수 없습니다.');
        if (typeof window !== 'undefined') {
          (window as any).location.reload();
        }
        return;
      }
      const queryEcoupons = ecoupons
        .filter(ecoupon => {
          return ecoupon.couponNo !== targetECoupon.couponNo;
        })
        .map(ecoupon => ecoupon.couponNo)
        .join(',');

      router.replace({
        pathname: router.pathname,
        query: {
          mealType: mealType.toLocaleLowerCase(),
          branchId: cart.familyInfoResponse.branchId,
          ...(queryEcoupons && queryEcoupons.length ? { ecoupons: queryEcoupons } : {}),
        },
      });
    },
  };

  return (
    <>
      <Desktop>
        <CartPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <CartPageTemplate.Mobile {...props} />
      </Mobile>
      {adultToken ? (
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
      ) : null}
    </>
  );
}
