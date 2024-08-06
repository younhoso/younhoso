import { FC } from 'react';

import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';

import { Box, Container, Divider, Flex, Grid, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import {
  COLOR_BLACK,
  COLOR_WHITE,
  FONTSIZE_11,
  FONTSIZE_12,
  FONTSIZE_13,
  FONTSIZE_14,
  FONTSIZE_16,
  FONTSIZE_20,
  PLANCK,
} from '@/constants';
import { isArsSessionState } from '@/stores';

import { MyPageCouponsPageTemplateComponentProps } from '../MyPageCouponsPageTemplate';
import {
  ECouponCard,
  MembershipCouponCard,
  PriceCouponCard,
  VoucherCouponCard,
} from './components';

export const MyPageCouponsPageTemplateMobile: FC<MyPageCouponsPageTemplateComponentProps> = ({
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
  const isArs = useRecoilValue(isArsSessionState);

  return (
    <Container.Mobile>
      <Flex.CCC full={true}>
        <Space.H6 />
        <Text size={FONTSIZE_20}>쿠폰북</Text>
        <Space.H2 />
        <Text size={FONTSIZE_14}>나의 bbq 쿠폰을 한자리에!</Text>
        <Space.H6 />
      </Flex.CCC>

      <>
        <Flex.RSE style={{ position: 'relative', zIndex: 1 }}>
          {!isArs && (
            <Box
              border={selectedTab === 'membership' ? 'black' : 'gray'}
              background={selectedTab === 'membership' ? 'primary' : 'lightgray'}
              thickness={selectedTab === 'membership' ? 2 : 1}
              style={
                selectedTab === 'membership'
                  ? {
                      width: '50%',
                      height: 48,
                      borderBottom: 0,
                      cursor: 'pointer',
                    }
                  : {
                      width: '50%',
                      height: 42,
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
                  size={selectedTab === 'membership' ? FONTSIZE_16 : FONTSIZE_14}
                >
                  멤버십 쿠폰
                </Text>
                <Space.V1 />
                <Text
                  color={selectedTab === 'membership' ? COLOR_WHITE : '#777777'}
                  size={selectedTab === 'membership' ? FONTSIZE_16 : FONTSIZE_14}
                >
                  {membershipCoupons.length + voucherCoupons.length}
                </Text>
              </Flex.RCC>
            </Box>
          )}
          <Box
            border={selectedTab === 'e' ? 'black' : 'gray'}
            background={selectedTab === 'e' ? '#fad946' : 'lightgray'}
            thickness={selectedTab === 'e' ? 2 : 1}
            style={
              selectedTab === 'e'
                ? {
                    width: `${isArs ? '100%' : '50%'} `,
                    height: 48,
                    borderBottom: 0,
                    cursor: 'pointer',
                  }
                : {
                    width: '50%',
                    height: 42,
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
                size={selectedTab === 'e' ? FONTSIZE_16 : FONTSIZE_14}
              >
                e 쿠폰
              </Text>
              <Space.V1 />
              <Text
                color={selectedTab === 'e' ? COLOR_BLACK : '#777777'}
                size={selectedTab === 'e' ? FONTSIZE_16 : FONTSIZE_14}
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
            height: 80,
            marginTop: -2,
          }}
        >
          <Flex.RCC full style={{ height: '100%' }} gap={PLANCK * 2}>
            {selectedTab === 'membership' ? (
              <>
                <Button.Mobile
                  onClick={() => {
                    router.push('/mypage/coupons/1');
                  }}
                  text={`할인/증정 쿠폰 ${membershipCoupons.length ?? 0}`}
                  color={selectedMembershipTab === 'sale' ? 'black' : 'white'}
                  shape={9999}
                  size={'big'}
                  style={{
                    height: 43,
                    border: selectedMembershipTab !== 'sale' ? '2px solid black' : 'none',
                  }}
                />
                <Button.Mobile
                  onClick={() => {
                    router.push('/mypage/coupons/2');
                  }}
                  text={`지류 상품권 ${voucherCoupons.length ?? 0}`}
                  outline={true}
                  color={selectedMembershipTab === 'jiryu' ? 'black' : 'white'}
                  shape={9999}
                  size={'big'}
                  style={{
                    height: 43,
                    border: selectedMembershipTab !== 'jiryu' ? '2px solid black' : 'none',
                  }}
                />
              </>
            ) : (
              <>
                <Button.Mobile
                  onClick={() => {
                    router.push('/mypage/coupons/3');
                  }}
                  text={`교환권 ${eCoupons.length ?? 0}`}
                  color={selectedETab === 'change' ? 'black' : 'white'}
                  shape={9999}
                  size={'big'}
                  style={{
                    height: 43,
                    border: selectedETab !== 'change' ? '2px solid black' : 'none',
                  }}
                />
                <Button.Mobile
                  onClick={() => {
                    router.push('/mypage/coupons/4');
                  }}
                  text={`금액권 ${priceCoupons.length}`}
                  outline={true}
                  color={selectedETab === 'price' ? 'black' : 'white'}
                  shape={9999}
                  size={'big'}
                  style={{
                    height: 43,
                    border: selectedETab !== 'price' ? '2px solid black' : 'none',
                  }}
                />
              </>
            )}
          </Flex.RCC>
        </Box>
      </>

      <Container.Mobile.Body>
        <Flex.CCC full={true}>
          <Flex.RBC full={true}>
            <div>
              <Text size={FONTSIZE_14}>
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
              <Space.H1_5 />
              <Text size={FONTSIZE_11}>
                {selectedTab === 'e' && selectedETab === 'change'
                  ? '⚠ 교환권은 중복 사용이 가능합니다.'
                  : '⚠ 결제시 사용 가능하세요.'}
              </Text>
            </div>
            <div
              style={
                (selectedTab === 'membership' && selectedMembershipTab === 'jiryu') ||
                selectedTab === 'e'
                  ? {}
                  : { pointerEvents: 'none', opacity: 0 }
              }
            >
              <Button.Mobile
                onClick={handleRegisterCouponButtonClick}
                text="쿠폰 등록하기"
                fill={true}
                color="black"
                shape="round"
              />
            </div>
          </Flex.RBC>
          <Space.H4 />
          <Grid columnCount={1} gap={PLANCK * 3}>
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
              <Box full={true} border="lightgray" padding={PLANCK * 3}>
                <Flex.CSS full={true} layout={'1 auto'}>
                  <Text full size={FONTSIZE_14}>
                    {eCoupons
                      .filter(coupon => {
                        return checkedECouponIds.includes(coupon.id);
                      })
                      .map(coupon => coupon.menuName)
                      .join(' / ')}
                  </Text>
                  <Space.H3 />
                  <Button.Mobile
                    full={true}
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
                </Flex.CSS>
              </Box>
              <Space.H4 />
            </>
          ) : null}
          {selectedTab === 'e' ? (
            <>
              <Box full={true} background="#f9fafa" padding={PLANCK * 4}>
                <Text size={FONTSIZE_14}>⚠ 쿠폰 사용시 유의사항</Text>
                <Space.H2 />
                <Text
                  size={FONTSIZE_12}
                  color={'#666666'}
                  lineHeight={'1.75em'}
                  style={{ marginLeft: PLANCK * 2 }}
                >
                  • 타 쿠폰과 중복 사용 불가합니다.
                  <br />• 포인트 적립은 불가합니다.
                  <br />• 특화 매장 및 일부 매장은 사용이 불가할 수 있습니다.
                  <br />• 배달료 및 포장비등의 추가 비용이 발생할 수 있으며, 매장 및 거리에 따라
                  비용이 상이할 수 있습니다.
                </Text>
              </Box>
            </>
          ) : null}
        </Flex.CCC>
      </Container.Mobile.Body>
    </Container.Mobile>
  );
};
