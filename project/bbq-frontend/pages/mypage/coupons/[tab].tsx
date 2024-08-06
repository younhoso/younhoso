import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { CartAPI, CouponAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { useModal } from '@/components/molecules';
import { InputCouponCodePopup } from '@/components/organisms';
import { MyPageCouponsPageTemplate } from '@/components/templates';
import { ECoupon, MembershipCoupon, PriceCoupon, VoucherCoupon } from '@/types';
import { parseApiError } from '@/utils';

export default function MyPageCouponsPage() {
  const router = useRouter();
  const { tab } = router.query;
  const { openModal } = useModal();

  const selectedTab = useMemo<'membership' | 'e'>(() => {
    return tab ? (`${tab}` === '3' || `${tab}` === '4' ? 'e' : 'membership') : 'membership';
  }, [tab]);
  const selectedMembershipTab = useMemo<'sale' | 'jiryu'>(() => {
    return tab ? (`${tab}` === '2' ? 'jiryu' : 'sale') : 'sale';
  }, [tab]);
  const selectedETab = useMemo<'change' | 'price'>(() => {
    return tab ? (`${tab}` === '4' ? 'price' : 'change') : 'change';
  }, [tab]);
  const [membershipCoupons, setMembershipCoupons] = useState<MembershipCoupon[] | undefined>(
    undefined,
  );
  const [eCoupons, setECoupons] = useState<ECoupon[] | undefined>(undefined);
  const [voucherCoupons, setVoucherCoupons] = useState<VoucherCoupon[] | undefined>(undefined);
  const [priceCoupons, setPriceCoupons] = useState<PriceCoupon[] | undefined>(undefined);

  const [checkedECouponIds, setCheckedECouponIds] = useState<number[]>([]);

  const handleRegisterCouponButtonClick = useCallback(() => {
    if (selectedTab === 'e') {
      if (selectedETab === 'change') {
        openModal({
          title: '교환권 등록',
          body: (
            <InputCouponCodePopup
              type={'e'}
              refetch={() => {
                CouponAPI.E.getList()
                  .then(res => {
                    setECoupons(res);
                  })
                  .catch(err => {});
              }}
            />
          ),
        });
      } else if (selectedETab === 'price') {
        openModal({
          title: '금액권 등록',
          body: (
            <InputCouponCodePopup
              type={'price'}
              refetch={() => {
                CouponAPI.Price.getList()
                  .then(res => {
                    setPriceCoupons(res);
                  })
                  .catch(err => {});
              }}
            />
          ),
        });
      }
    } else if (selectedTab === 'membership') {
      if (selectedMembershipTab === 'jiryu') {
        openModal({
          title: '지류권 등록',
          body: (
            <InputCouponCodePopup
              type={'voucher'}
              refetch={() => {
                CouponAPI.Voucher.getList()
                  .then(res => {
                    setVoucherCoupons(res);
                  })
                  .catch(err => {});
              }}
            />
          ),
        });
      }
    }
  }, [selectedTab, selectedETab, selectedMembershipTab]);

  const handlePurchaseWithECouponsButtonClick = useCallback(async () => {
    if (!router.isReady) return;
    if (!eCoupons) return;
    const selectedCoupons = eCoupons.filter(coupon => {
      return checkedECouponIds.includes(coupon.id);
    });
    if (!selectedCoupons || !selectedCoupons.length) return;

    try {
      // 장바구니에 추가
      await Promise.all(
        selectedCoupons.map(coupon => {
          return CartAPI.addMenu({
            mainMenuId: coupon.menuId,
            quantity: 1,
            subOptionItemIdSet: [],
          });
        }),
      );

      // 쿠폰번호와 함께 카트로 이동
      router.push({
        pathname: '/cart',
        query: {
          ecoupons: selectedCoupons.map(coupon => coupon.couponNo).join(','),
        },
      });
    } catch (err) {
      console.error(err);
      alert(parseApiError(err).message);
    }
  }, [eCoupons, checkedECouponIds, router, router.isReady]);

  useEffect(() => {
    CouponAPI.E.getList()
      .then(res => {
        setECoupons(res);
      })
      .catch(err => {});

    CouponAPI.Membership.getList()
      .then(res => {
        setMembershipCoupons(res);
      })
      .catch(err => {
        console.error(err);
      });
    CouponAPI.Voucher.getList()
      .then(res => {
        setVoucherCoupons(res);
      })
      .catch(err => {
        console.error(err);
      });
    CouponAPI.Price.getList()
      .then(res => {
        setPriceCoupons(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  if (!tab || !membershipCoupons || !eCoupons || !voucherCoupons || !priceCoupons) {
    return null;
  }

  const props = {
    selectedTab: selectedTab,
    selectedMembershipTab: selectedMembershipTab,
    selectedETab: selectedETab,
    membershipCoupons: membershipCoupons,
    eCoupons: eCoupons,
    voucherCoupons: voucherCoupons,
    priceCoupons: priceCoupons,
    checkedECouponIds: checkedECouponIds,
    setCheckedECouponIds: setCheckedECouponIds,
    handleRegisterCouponButtonClick: handleRegisterCouponButtonClick,
    handlePurchaseWithECouponsButtonClick: handlePurchaseWithECouponsButtonClick,
  };

  return (
    <>
      <Desktop>
        <MyPageCouponsPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <MyPageCouponsPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
