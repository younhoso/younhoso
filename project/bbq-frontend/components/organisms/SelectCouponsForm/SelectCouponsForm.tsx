import { FC, useCallback, useMemo, useState } from 'react';

import styled from 'styled-components';

import { Box, CheckBox, Flex, Grid, Image, RadioBox, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import {
  COLOR_WHITE,
  FONTSIZE_12,
  FONTSIZE_15,
  FONTSIZE_18,
  FONTSIZE_20,
  FONTSIZE_28,
  PLANCK,
} from '@/constants';
import { MembershipCoupon, PriceCoupon, VoucherCoupon } from '@/types';

type Type = 'membership' | 'voucher' | 'price';

export interface SelectCouponsFormProps {
  type: Type;
  defaultSelectedCoupons: {
    membership: MembershipCoupon[];
    voucher: VoucherCoupon[];
    price: PriceCoupon[];
  };
  membershipCoupons?: MembershipCoupon[];
  voucherCoupons?: VoucherCoupon[];
  priceCoupons?: PriceCoupon[];
  handleSubmit: (params: {
    selectedMembershipCoupons?: MembershipCoupon[];
    selectedVoucherCoupons?: VoucherCoupon[];
    selectedPriceCoupons?: PriceCoupon[];
  }) => void;
}

export interface SelectCouponsFormComponentProps extends SelectCouponsFormProps {}

export const SelectCouponsForm: FC<SelectCouponsFormComponentProps> = ({
  type,
  defaultSelectedCoupons,
  membershipCoupons,
  voucherCoupons,
  priceCoupons,
  handleSubmit,
}) => {
  const [selectedMembershipCoupons, setSelectedMembershipCoupons] = useState<MembershipCoupon[]>(
    defaultSelectedCoupons.membership,
  );
  const [selectedVoucherCoupons, setSelectedVoucherCoupons] = useState<VoucherCoupon[]>(
    defaultSelectedCoupons.voucher,
  );
  const [selectedPriceCoupons, setSelectedPriceCoupons] = useState<PriceCoupon[]>(
    defaultSelectedCoupons.price,
  );

  const submitButtonEnabled = useMemo<boolean>(() => {
    return true;
  }, [type, selectedMembershipCoupons, selectedVoucherCoupons, selectedPriceCoupons]);

  const handleSubmitButtonClick = useCallback(() => {
    if (!submitButtonEnabled) return;

    handleSubmit({
      selectedMembershipCoupons,
      selectedVoucherCoupons,
      selectedPriceCoupons,
    });
  }, [
    submitButtonEnabled,
    type,
    selectedMembershipCoupons,
    selectedVoucherCoupons,
    selectedPriceCoupons,
  ]);

  return (
    <div>
      <div style={{ height: 400, overflowY: 'scroll' }}>
        <Grid columnCount={1} gap={PLANCK * 2}>
          {type === 'membership'
            ? (membershipCoupons ?? []).map((membershipCoupon, index) => (
                <CouponCard
                  key={index}
                  coupon={membershipCoupon}
                  checked={
                    selectedMembershipCoupons.filter(c => c.couponNo === membershipCoupon.couponNo)
                      .length > 0
                  }
                  handleCheckClick={() => {
                    if (
                      selectedMembershipCoupons.filter(
                        c => c.couponNo === membershipCoupon.couponNo,
                      ).length > 0
                    ) {
                      setSelectedMembershipCoupons([]);
                    } else {
                      setSelectedMembershipCoupons([membershipCoupon]);
                    }
                  }}
                />
              ))
            : null}
          {type === 'voucher'
            ? (voucherCoupons ?? []).map((voucherCoupon, index) => (
                <CouponCard
                  key={index}
                  coupon={voucherCoupon}
                  checked={selectedVoucherCoupons.filter(c => c.id === voucherCoupon.id).length > 0}
                  handleCheckClick={() => {
                    if (selectedVoucherCoupons.filter(c => c.id === voucherCoupon.id).length > 0) {
                      setSelectedVoucherCoupons(
                        selectedVoucherCoupons.filter(c => c.id !== voucherCoupon.id),
                      );
                    } else {
                      setSelectedVoucherCoupons([...selectedVoucherCoupons, voucherCoupon]);
                    }
                  }}
                />
              ))
            : null}
          {type === 'price'
            ? (priceCoupons ?? []).map((priceCoupon, index) => (
                <CouponCard
                  key={index}
                  coupon={priceCoupon}
                  checked={selectedPriceCoupons.filter(c => c.id === priceCoupon.id).length > 0}
                  handleCheckClick={() => {
                    if (selectedPriceCoupons.filter(c => c.id === priceCoupon.id).length > 0) {
                      setSelectedPriceCoupons(
                        selectedPriceCoupons.filter(c => c.id !== priceCoupon.id),
                      );
                    } else {
                      setSelectedPriceCoupons([...selectedPriceCoupons, priceCoupon]);
                    }
                  }}
                />
              ))
            : null}
        </Grid>
        <Space.H3 />
      </div>
      <Button
        disabled={!submitButtonEnabled}
        full
        color={'red'}
        shape={'round'}
        text="완료"
        onClick={() => handleSubmitButtonClick()}
      />
    </div>
  );
};

const CouponCard: FC<{
  coupon: MembershipCoupon | VoucherCoupon | PriceCoupon;
  checked: boolean;
  handleCheckClick: () => void;
}> = ({ coupon, checked, handleCheckClick }) => {
  const type = useMemo<Type>(() => {
    if ((coupon as any).balance) {
      return 'price';
    } else if ((coupon as any).voucherSn) {
      return 'voucher';
    } else {
      return 'membership';
    }
  }, [coupon]);

  const imageUrl = useMemo<string>(() => {
    switch (type) {
      case 'price':
        return '/coupon/price-coupon-thumbnail.png';
      default:
        return '/coupon/coupon-placeholder-thumbnail.png';
    }
  }, [type]);

  const prefixTitle = useMemo<string>(() => {
    switch (type) {
      case 'voucher':
        return '지류 상품권';
      case 'price':
        return '금액권';
      default:
        return '멤버십 쿠폰';
    }
  }, [type]);

  const title = useMemo<string>(() => {
    switch (type) {
      case 'voucher':
        return 'BBQ 지류 상품권';
      case 'price':
        return 'BBQ 금액권';
      default:
        return (coupon as MembershipCoupon).couponName;
    }
  }, [coupon, type]);

  const price = useMemo<string>(() => {
    switch (type) {
      case 'voucher':
        return `${((coupon as VoucherCoupon).price ?? 0).toLocaleString()}원`;
      case 'price':
        return `${((coupon as PriceCoupon).balance ?? 0).toLocaleString()}원`;
      default:
        switch ((coupon as MembershipCoupon).benefitType) {
          case 'FLAT_DISCOUNT':
            return `${((coupon as MembershipCoupon).discountAmount ?? 0).toLocaleString()}원 할인`;
          case 'RATE_DISCOUNT':
            return `${((coupon as MembershipCoupon).discountRate ?? 0).toLocaleString()}% 할인`;
          case 'PRODUCT':
            return `증정 쿠폰`;
          case 'DELIVERY_FEE':
            return `배달비 최대 ${((coupon as MembershipCoupon).maxDiscountAmount ?? 0).toLocaleString()}원 할인`;
          default:
            return '알 수 없음';
        }
    }
  }, [coupon, type]);

  const no = useMemo<string>(() => {
    switch (type) {
      case 'voucher':
        return `${(coupon as VoucherCoupon).voucherSn}`;
      case 'price':
        return `${(coupon as PriceCoupon).couponNo}`;
      default:
        return `${(coupon as MembershipCoupon).couponNo}`;
    }
  }, [coupon, type]);

  const endDate = useMemo<string>(() => {
    switch (type) {
      case 'voucher':
        return `${(coupon as VoucherCoupon).endDate}`;
      case 'price':
        return `${(coupon as PriceCoupon).endDate}`;
      default:
        return `${(coupon as MembershipCoupon).useEndsAt}`;
    }
  }, [coupon, type]);

  return (
    <Box
      background="#fbfbfb"
      border="#ededed"
      padding={PLANCK * 4}
      style={
        type === 'membership' && !(coupon as MembershipCoupon).isUsable
          ? { opacity: 0.5, pointerEvents: 'none' }
          : {}
      }
    >
      <Flex.RSS full={true} style={{ height: '100%' }}>
        {type === 'membership' ? (
          <RadioBox
            checked={checked}
            onClick={(coupon as MembershipCoupon).isUsable ? handleCheckClick : undefined}
          />
        ) : (
          <CheckBox checked={checked} onClick={handleCheckClick} />
        )}
        <Space.V3 />
        <ImageWrapper>
          <Image
            src={imageUrl}
            width={110}
            height={110}
            backgroundPosition="center"
            backgroundSize="cover"
            style={{
              borderRadius: 15,
              boxShadow: '2px 4px 4px rgba(0,0,0,0.1)',
            }}
          >
            {type === 'membership' ? (
              <Flex.CCC full={true}>
                <Space.H1 />
                <Text
                  color={COLOR_WHITE}
                  size={FONTSIZE_15}
                  weight={700}
                  style={{ textShadow: '0 2px 3px rgba(0,0,0,0.2)' }}
                >
                  COUPON
                </Text>
                <Space.H1 />
                <Text
                  color={COLOR_WHITE}
                  size={27}
                  weight={900}
                  style={{ textShadow: '0 2px 3px rgba(0,0,0,0.2)' }}
                >
                  {(() => {
                    switch ((coupon as MembershipCoupon).benefitType) {
                      case 'FLAT_DISCOUNT':
                        return `${(
                          (coupon as MembershipCoupon).discountAmount ?? 0
                        ).toLocaleString()}`;
                      case 'RATE_DISCOUNT':
                        return `${(
                          (coupon as MembershipCoupon).discountRate ?? 0
                        ).toLocaleString()}%`;
                      case 'PRODUCT':
                        return `추가 증정`;
                    }
                  })()}
                </Text>
              </Flex.CCC>
            ) : null}
            {type === 'voucher' ? (
              <Flex.CCC full={true}>
                <Space.H1_5 />
                <Text
                  color={COLOR_WHITE}
                  size={FONTSIZE_18}
                  weight={700}
                  style={{ textShadow: '0 2px 3px rgba(0,0,0,0.2)' }}
                >
                  GIFTCARD
                </Text>
                <Space.H0_5 />
                <Text
                  color={COLOR_WHITE}
                  size={FONTSIZE_28}
                  weight={900}
                  style={{ textShadow: '0 2px 3px rgba(0,0,0,0.2)' }}
                >
                  {price.replace(/[^0-9]/g, '').toLocaleString()}
                </Text>
              </Flex.CCC>
            ) : null}
          </Image>
        </ImageWrapper>
        <Space.V5 />
        <div>
          <Space.H0_5 />
          <Text size={FONTSIZE_12}>[{prefixTitle}]</Text>
          <Space.H1_5 />
          <Text size={FONTSIZE_20}>{title}</Text>
          <Space.H2 />
          <Text>{price}</Text>
          <Space.H3 />
          <Text size={FONTSIZE_12} color={'#777777'}>
            {no}
          </Text>
          <Space.H1 />
          <Text size={FONTSIZE_12} color={'#777777'}>
            {endDate}까지
          </Text>
          {type === 'membership' && !(coupon as MembershipCoupon).isUsable ? (
            <>
              <Space.H1 />
              <Text size={FONTSIZE_12} color={'#777777'}>
                사용불가: {(coupon as MembershipCoupon).unUsableReason}
              </Text>
            </>
          ) : null}
        </div>
      </Flex.RSS>
    </Box>
  );
};

const ImageWrapper = styled.div`
  flex-basis: 110px;
  flex-grow: 0;
  flex-shrink: 0;
`;
