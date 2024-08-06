import { FC, ReactNode } from 'react';

import { useRouter } from 'next/router';

import { Box, Container, Divider, Flex, Grid, Image, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import {
  COLOR_BLACK,
  COLOR_WHITE,
  FONTSIZE_11,
  FONTSIZE_14,
  FONTSIZE_16,
  FONTSIZE_18,
  FONTSIZE_20,
  FONTSIZE_26,
  PLANCK,
} from '@/constants';
import { ECoupon, MembershipCoupon, PriceCoupon, VoucherCoupon } from '@/types';

import {
  ECouponCard,
  MembershipCouponCard,
  PriceCouponCard,
  VoucherCouponCard,
} from './components';
import { MyPageCouponsPageTemplateMobile } from './mobile';

export interface MyPageCouponsPageTemplateProps {
  selectedTab: 'membership' | 'e';
  selectedMembershipTab: 'sale' | 'jiryu';
  selectedETab: 'change' | 'price';
  membershipCoupons: MembershipCoupon[];
  eCoupons: ECoupon[];
  voucherCoupons: VoucherCoupon[];
  priceCoupons: PriceCoupon[];
  checkedECouponIds: number[];
  setCheckedECouponIds: (ids: number[]) => void;
  handleRegisterCouponButtonClick: () => void;
  handlePurchaseWithECouponsButtonClick: () => void;
}

export interface MyPageCouponsPageTemplateComponentProps extends MyPageCouponsPageTemplateProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const MyPageCouponsPageTemplate: FC<MyPageCouponsPageTemplateComponentProps> & {
  Mobile: FC<MyPageCouponsPageTemplateComponentProps>;
} = ({
  selectedTab,
  selectedMembershipTab,
  selectedETab,
  membershipCoupons,
  eCoupons,
  voucherCoupons,
  priceCoupons,
  checkedECouponIds,
  setCheckedECouponIds,
  handleRegisterCouponButtonClick,
  handlePurchaseWithECouponsButtonClick,
}) => {
  const router = useRouter();

  return (
    <Container>
      <Container.Body>
        <Flex.CCC full={true}>
          <Space.H8 />
          <Text size={FONTSIZE_26}>쿠폰북</Text>
          <Space.H4 />
          <Text size={FONTSIZE_18}>나의 bbq 쿠폰을 한자리에!</Text>
          <Space.H8 />
          <Flex.RSE style={{ position: 'relative', zIndex: 1 }}>
            <Box
              border={selectedTab === 'membership' ? 'black' : 'gray'}
              background={selectedTab === 'membership' ? 'primary' : 'lightgray'}
              thickness={selectedTab === 'membership' ? 2 : 1}
              style={
                selectedTab === 'membership'
                  ? {
                      width: 300,
                      height: 56,
                      borderBottom: 0,
                      cursor: 'pointer',
                    }
                  : {
                      width: 300,
                      height: 48,
                      borderBottom: 0,
                      borderRight: 0,
                      marginBottom: 2,
                      cursor: 'pointer',
                    }
              }
              onClick={() => {
                router.push('/mypage/coupons/1');
              }}
            >
              <Flex.RCC full style={{ height: '100%' }}>
                <Text
                  color={selectedTab === 'membership' ? COLOR_WHITE : '#777777'}
                  size={selectedTab === 'membership' ? FONTSIZE_20 : FONTSIZE_16}
                >
                  멤버십 쿠폰
                </Text>
                <Space.V1 />
                <Text
                  color={selectedTab === 'membership' ? COLOR_WHITE : '#777777'}
                  size={selectedTab === 'membership' ? FONTSIZE_20 : FONTSIZE_16}
                >
                  {membershipCoupons.length + voucherCoupons.length}
                </Text>
              </Flex.RCC>
            </Box>
            <Box
              border={selectedTab === 'e' ? 'black' : 'gray'}
              background={selectedTab === 'e' ? '#fad946' : 'lightgray'}
              thickness={selectedTab === 'e' ? 2 : 1}
              style={
                selectedTab === 'e'
                  ? {
                      width: 300,
                      height: 56,
                      borderBottom: 0,
                      cursor: 'pointer',
                    }
                  : {
                      width: 300,
                      height: 48,
                      borderBottom: 0,
                      borderLeft: 0,
                      marginBottom: 2,
                      cursor: 'pointer',
                    }
              }
              onClick={() => {
                router.push('/mypage/coupons/3');
              }}
            >
              <Flex.RCC full style={{ height: '100%' }}>
                <Text
                  color={selectedTab === 'e' ? COLOR_BLACK : '#777777'}
                  size={selectedTab === 'e' ? FONTSIZE_20 : FONTSIZE_16}
                >
                  e 쿠폰
                </Text>
                <Space.V1 />
                <Text
                  color={selectedTab === 'e' ? COLOR_BLACK : '#777777'}
                  size={selectedTab === 'e' ? FONTSIZE_20 : FONTSIZE_16}
                >
                  {eCoupons.length + priceCoupons.length}
                </Text>
              </Flex.RCC>
            </Box>
          </Flex.RSE>
          <Box
            full={true}
            border="black"
            thickness={2}
            background={selectedTab === 'membership' ? 'primary' : '#fad946'}
            style={{
              position: 'relative',
              height: 100,
              borderBottom: 0,
              marginTop: -2,
            }}
          >
            {selectedTab === 'membership' ? (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: '68%',
                  height: '100%',
                }}
              >
                <Flex.RSC style={{ height: '100%' }}>
                  <div style={{ marginTop: -5 }}>
                    <Text
                      color={COLOR_WHITE}
                      weight={900}
                      align={'right'}
                      lineHeight={'1em'}
                      size={FONTSIZE_20}
                    >
                      membership
                      <br />
                      coupon
                    </Text>
                    <Space.H1 />
                    <Text
                      color={COLOR_WHITE}
                      size={FONTSIZE_11}
                      weight={400}
                      align="right"
                      lineHeight={'1.2em'}
                    >
                      멤버십 쿠폰은 비비큐 본사에서
                      <br />
                      직접 발행한 쿠폰이랍니다.
                    </Text>
                  </div>
                  <Space.V8 />
                  <Image src="coupon/membership-hand.png" height={'100%'} />
                </Flex.RSC>
              </div>
            ) : (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '68%',
                  height: '100%',
                }}
              >
                <Flex.RSC style={{ height: '100%' }}>
                  <Image src="coupon/e-hand.png" height={'100%'} />
                  <Space.V6 />
                  <div style={{ marginTop: -5 }}>
                    <Text color={COLOR_BLACK} weight={900} lineHeight={'1em'} size={FONTSIZE_20}>
                      e-coupon
                    </Text>
                    <Space.H1 />
                    <Text color={COLOR_BLACK} size={FONTSIZE_11} weight={400} lineHeight={'1.2em'}>
                      e-쿠폰은 비비큐외 외부 서비스 플랫폼에서
                      <br />
                      발행되는 쿠폰입니다.
                    </Text>
                  </div>
                </Flex.RSC>
              </div>
            )}
            <Flex.RCC full style={{ height: '100%' }} gap={PLANCK * 3}>
              {selectedTab === 'membership' ? (
                <>
                  <Button
                    onClick={() => {
                      router.push('/mypage/coupons/1');
                    }}
                    text={`할인/증정 쿠폰 ${membershipCoupons.length ?? 0}`}
                    color={selectedMembershipTab === 'sale' ? 'black' : 'white'}
                    shape={9999}
                    size={'big'}
                    style={{
                      height: 51,
                      border: selectedMembershipTab !== 'sale' ? '2px solid black' : 'none',
                    }}
                  />
                  <Button
                    onClick={() => {
                      router.push('/mypage/coupons/2');
                    }}
                    text={`지류 상품권 ${voucherCoupons.length ?? 0}`}
                    outline={true}
                    color={selectedMembershipTab === 'jiryu' ? 'black' : 'white'}
                    shape={9999}
                    size={'big'}
                    style={{
                      height: 51,
                      border: selectedMembershipTab !== 'jiryu' ? '2px solid black' : 'none',
                    }}
                  />
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      router.push('/mypage/coupons/3');
                    }}
                    text={`교환권 ${eCoupons.length ?? 0}`}
                    color={selectedETab === 'change' ? 'black' : 'white'}
                    shape={9999}
                    size={'big'}
                    style={{
                      height: 51,
                      border: selectedETab !== 'change' ? '2px solid black' : 'none',
                    }}
                  />
                  <Button
                    onClick={() => {
                      router.push('/mypage/coupons/4');
                    }}
                    text={`금액권 ${priceCoupons.length}`}
                    outline={true}
                    color={selectedETab === 'price' ? 'black' : 'white'}
                    shape={9999}
                    size={'big'}
                    style={{
                      height: 51,
                      border: selectedETab !== 'price' ? '2px solid black' : 'none',
                    }}
                  />
                </>
              )}
            </Flex.RCC>
          </Box>
          <Space.H5 />
          <Flex.RSC full={true} layout="auto auto auto auto auto auto 1">
            <Space.V3 />
            <Text>
              {selectedTab === 'membership'
                ? selectedMembershipTab === 'sale'
                  ? '할인/증정 쿠폰'
                  : '지류 상품권 쿠폰'
                : selectedETab === 'change'
                  ? '교환권 쿠폰'
                  : '금액권 쿠폰'}{' '}
              {selectedTab === 'membership'
                ? selectedMembershipTab === 'sale'
                  ? membershipCoupons.length
                  : voucherCoupons.length
                : selectedETab === 'change'
                  ? eCoupons.length
                  : priceCoupons.length}
              개
            </Text>
            <Space.V2 />
            <Divider.V1 style={{ height: 16 }} />
            <Space.V2 />
            <Text size={FONTSIZE_14}>
              {selectedTab === 'e' && selectedETab === 'change'
                ? '⚠ 교환권은 중복 사용이 가능합니다.'
                : '⚠ 결제시 사용 가능하세요.'}
            </Text>
            <Flex.RES
              style={
                (selectedTab === 'membership' && selectedMembershipTab === 'jiryu') ||
                selectedTab === 'e'
                  ? {}
                  : { pointerEvents: 'none', opacity: 0 }
              }
            >
              <Button
                onClick={handleRegisterCouponButtonClick}
                text="쿠폰 등록하기"
                fill={true}
                color="black"
                shape="round"
              />
            </Flex.RES>
          </Flex.RSC>
          <Space.H4 />
          <Grid columnCount={1} gap={PLANCK * 4}>
            {selectedTab === 'membership' && selectedMembershipTab === 'sale'
              ? membershipCoupons.map((coupon, index) => (
                  <MembershipCouponCard key={index} coupon={coupon} />
                ))
              : null}
            {selectedTab === 'membership' && selectedMembershipTab === 'jiryu'
              ? voucherCoupons.map((coupon, index) => (
                  <VoucherCouponCard key={index} coupon={coupon} />
                ))
              : null}
            {selectedTab === 'e' && selectedETab === 'change'
              ? eCoupons.map((coupon, index) => (
                  <ECouponCard
                    key={index}
                    coupon={coupon}
                    checked={checkedECouponIds.includes(coupon.id)}
                    handleCheckClick={() => {
                      if (checkedECouponIds.includes(coupon.id)) {
                        setCheckedECouponIds(checkedECouponIds.filter(id => id !== coupon.id));
                      } else {
                        setCheckedECouponIds([...checkedECouponIds, coupon.id]);
                      }
                    }}
                  />
                ))
              : null}
            {selectedTab === 'e' && selectedETab === 'price'
              ? priceCoupons.map((coupon, index) => <PriceCouponCard key={index} coupon={coupon} />)
              : null}
          </Grid>
          <Space.H4 />
          {selectedTab === 'e' &&
          selectedETab === 'change' &&
          eCoupons.filter(coupon => {
            return checkedECouponIds.includes(coupon.id);
          }).length ? (
            <>
              <Box full={true} border="lightgray" padding={PLANCK * 6}>
                <Flex.RSC full={true} layout={'1 auto'}>
                  <Text>
                    {eCoupons
                      .filter(coupon => {
                        return checkedECouponIds.includes(coupon.id);
                      })
                      .map(coupon => coupon.menuName)
                      .join(' / ')}
                  </Text>
                  <Button
                    onClick={handlePurchaseWithECouponsButtonClick}
                    text={`Total ${eCoupons
                      .filter(coupon => {
                        return checkedECouponIds.includes(coupon.id);
                      })
                      .reduce<number>((total, coupon) => {
                        return total + (coupon.menuPrice ?? 0);
                      }, 0)
                      .toLocaleString()}원 - 교환권으로 구매하기`}
                    fill={true}
                    color="black"
                    shape="round"
                  />
                </Flex.RSC>
              </Box>
              <Space.H4 />
            </>
          ) : null}
          {selectedTab === 'e' ? (
            <>
              <Box full={true} background="#f9fafa" padding={PLANCK * 6}>
                <Text size={FONTSIZE_14}>⚠ 쿠폰 사용시 유의사항</Text>
                <Space.H4 />
                <Text
                  size={FONTSIZE_14}
                  color={'#666666'}
                  lineHeight={'1.75em'}
                  style={{ marginLeft: PLANCK * 3 }}
                >
                  • 타 쿠폰과 중복 사용 불가합니다.
                  <br />• 포인트 적립은 불가합니다.
                  <br />• 특화 매장 및 일부 매장은 사용이 불가할 수 있습니다.
                  <br />• 배달료 및 포장비등의 추가 비용이 발생할 수 있으며, 매장 및 거리에 따라
                  비용이 상이할 수 있습니다.
                </Text>
              </Box>
              <Space.H8 />
            </>
          ) : null}
        </Flex.CCC>
      </Container.Body>
    </Container>
  );
};
MyPageCouponsPageTemplate.Mobile = MyPageCouponsPageTemplateMobile;
