import { FC, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { Container, Space, Text } from '@/components/atoms';
import { SummaryCard, SummaryCardProps } from '@/components/organisms';
import { FONTSIZE_26, PLANCK } from '@/constants';
import {
  CalculateOrderAPIResponse,
  InitOrderAPIResponse,
  MembershipCoupon,
  PriceCoupon,
  VoucherCoupon,
} from '@/types';

import Body from './fragments/Body';
import { CheckoutPageTemplateMobile } from './mobile';

const STICKY_Y_OFFSET = 30;

export type CheckoutPageSelectedCoupons = {
  membership: MembershipCoupon[];
  voucher: VoucherCoupon[];
  price: PriceCoupon[];
};

export type CheckoutPageRequestState = {
  orderMessage: string;
  orderMessageExcludeRadish: boolean;
  orderMessageExcludeBeverage: boolean;
  orderMessageExcludeDisposableProducts: boolean;
  useOrderMessageStateLater: boolean;
  deliveryMessageSelectValue?: string;
  deliveryMessage: string;
  useDeliveryMessageStateLater: boolean;
  deliveryArrivalTime?: number;
};

export type CheckoutPagePointState = {
  point?: '';
  useAllPoint: boolean;
  _point?: ''; // NOTE: onChange에서 임시로 저장되는 값
};

export type CheckoutPageHPCState = {
  status: string | null;
  message: string | null;
  points: number | null;
  usePoints: number;
  applyFor: 'BBQ' | 'HPC';
};

export interface CheckoutPageTemplateProps {
  checkoutData: InitOrderAPIResponse;
  selectedCoupons: CheckoutPageSelectedCoupons;
  requestState: CheckoutPageRequestState;
  setRequestState: (state: CheckoutPageRequestState) => void;
  appliedCouponAmounts?: CalculateOrderAPIResponse;
  pointState: CheckoutPagePointState;
  setPointState: (state: CheckoutPagePointState) => void;
  paymentMethod?: string;
  hpcPointState?: CheckoutPageHPCState;
  setHpcPointState?: (state: CheckoutPageHPCState) => void;
  handleHpcButtonClick?: () => void;
  summary: SummaryCardProps;
  setPaymentMethod: (method?: string) => void;
  handleCouponMenuItemButtonClick: (params: { type: 'membership' | 'voucher' | 'price' }) => void;
  totalPrice: number;
  totalPriceWithoutPoint: number;
}

export interface CheckoutPageTemplateComponentProps extends CheckoutPageTemplateProps {}

export const CheckoutPageTemplate: FC<CheckoutPageTemplateComponentProps> & {
  Mobile: FC<CheckoutPageTemplateComponentProps>;
} = props => {
  const fixedSummaryCardVisibleSenserRef = useRef(null);
  const [stickySummaryCardVisible, setFixedSummaryCardVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!fixedSummaryCardVisibleSenserRef.current) return;

      setFixedSummaryCardVisible(
        (fixedSummaryCardVisibleSenserRef.current as any).getBoundingClientRect().top <=
          STICKY_Y_OFFSET,
      );
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      <StickyBox>
        <Container>
          <ContainerBody></ContainerBody>
          <ContainerSidebar>
            <div
              style={
                stickySummaryCardVisible
                  ? { pointerEvents: 'auto' }
                  : { opacity: 0, pointerEvents: 'none' }
              }
            >
              <SummaryCard {...props.summary} />
            </div>
          </ContainerSidebar>
        </Container>
      </StickyBox>
      <Wrapper>
        <Space.H8 />
        <Container>
          <Text size={FONTSIZE_26}>주문 결제</Text>
        </Container>
        <Space.H8 />
        <Container>
          <ContainerBody>
            <Template>
              <Body {...props} />
            </Template>
          </ContainerBody>
          <ContainerSidebar
            style={!stickySummaryCardVisible ? {} : { opacity: 0, pointerEvents: 'none' }}
          >
            <div ref={fixedSummaryCardVisibleSenserRef}></div>
            <SummaryCard {...props.summary} />
          </ContainerSidebar>
        </Container>
        <Space.H8 />
      </Wrapper>
    </>
  );
};
CheckoutPageTemplate.Mobile = CheckoutPageTemplateMobile;

const Wrapper = styled.div`
  display: block;
  clear: both;
`;

const Template = styled.div`
  display: block;
`;

const ContainerBody = styled(Container.Body)`
  padding-right: ${PLANCK * 7}px;
`;

const ContainerSidebar = styled(Container.Sidebar)`
  max-width: 468px;
`;

const StickyBox = styled.div`
  pointer-events: none !important;
  position: fixed;
  z-index: 1;
  width: 100%;
  top: ${STICKY_Y_OFFSET}px;
`;
