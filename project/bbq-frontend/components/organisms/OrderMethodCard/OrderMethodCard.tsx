import { FC, ReactNode, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { Arrow, Box, Divider, Flex, Icon, Space, Text } from '@/components/atoms';
import { useModal } from '@/components/molecules';
import { FONTSIZE_14, FONTSIZE_18, PLANCK } from '@/constants';
import { useAuth } from '@/hooks';
import { MealTypeEnum } from '@/types';

import { InputCouponCodePopup } from '../popups/InputCouponCodePopup';
import { OrderMethodCardMobile } from './mobile';

export interface OrderMethodCardProps {}

export interface OrderMethodCardComponentProps extends OrderMethodCardProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

export const OrderMethodCard: FC<OrderMethodCardComponentProps> & {
  Mobile: FC<OrderMethodCardComponentProps>;
} = props => {
  const { openModal } = useModal();
  const router = useRouter();
  const { defaultAddress } = useAuth();
  const { className, children, ...rest } = props;
  const { member } = useAuth();

  const [registerCouponBoxVisible, setRegisterCouponBoxVisible] = useState<boolean>(false);

  const {
    query: {
      ecouponAction: queryEcouponAction,
      ecouponActionValue: queryEcouponActionValue,
      ecoupons,
    },
  } = useRouter();
  const isActionForECouponChangeMenu = useMemo<boolean>(() => {
    return !!(
      (queryEcouponAction as string) === 'change' && (queryEcouponActionValue as string).length
    );
  }, [queryEcouponAction, queryEcouponActionValue]);

  return (
    <Wrapper>
      <Cards>
        <Card
          selected={
            `${router.query.mealType}`.toUpperCase() === MealTypeEnum.Delivery ? true : false
          }
          onClick={() => {
            let param = '';
            if (isActionForECouponChangeMenu) {
              param = `&ecouponAction=${queryEcouponAction}&ecouponActionValue=${queryEcouponActionValue}&ecoupons=${ecoupons}`;
            }
            const deliveryHref =
              (router.pathname.startsWith('/products/') ||
              router.pathname.startsWith('/categories/')
                ? router.asPath.split('?')[0]
                : `/categories/1`) +
              `?mealType=${MealTypeEnum.Delivery.toLowerCase()}` +
              param;

            router.push(
              defaultAddress
                ? deliveryHref
                : `/address/permission?redirect_to=${encodeURIComponent(deliveryHref)}`,
            );
          }}
        >
          <CardIconWrapper>
            <Icon src={'delivery-bike.svg'} size={52} />
          </CardIconWrapper>
          <CardTitleText>배달</CardTitleText>
          <CardSubtitleText>DELIVERY</CardSubtitleText>
        </Card>
        <Card
          selected={
            `${router.query.mealType}`.toUpperCase() === MealTypeEnum.Takeout ? true : false
          }
          onClick={() => {
            let param = '';

            if (isActionForECouponChangeMenu) {
              param = `?ecouponAction=${queryEcouponAction}&ecouponActionValue=${queryEcouponActionValue}&ecoupons=${ecoupons}`;
            }
            router.push(
              `/stores/map?for=takeout&redirect_to=${encodeURIComponent(
                (router.pathname.startsWith('/products/') ||
                router.pathname.startsWith('/categories/')
                  ? router.asPath.split('?')[0]
                  : `/categories/1`) + param,
              )}`,
            );
          }}
        >
          <CardIconWrapper>
            <Icon src={'chicken-packaging.svg'} size={47} />
          </CardIconWrapper>
          <CardTitleText>포장</CardTitleText>
          <CardSubtitleText>PACKAGING</CardSubtitleText>
        </Card>
      </Cards>

      <Box
        padding={`0 ${PLANCK * 3}px ${PLANCK * 3}px ${PLANCK * 3}px`}
        style={{ position: 'absolute', width: '100%', zIndex: 1 }}
      >
        <RegisterCouponButton>
          <div
            onClick={() => {
              setRegisterCouponBoxVisible(!registerCouponBoxVisible);
            }}
            style={{ cursor: 'pointer' }}
          >
            <Space.H2_5 />
            <Flex.RSC full={true} layout="auto auto auto 1 auto auto">
              <Space.V4 />
              <Icon src={'double-ticket-blue.svg'} size={22} />
              <Space.V2_5 />
              <Text color={'#324266'} size={FONTSIZE_18}>
                쿠폰 등록
              </Text>
              <div>
                {registerCouponBoxVisible ? <Arrow.Up size={4} /> : <Arrow.Down size={4} />}
              </div>
              <Space.V4 />
            </Flex.RSC>
            <Space.H2_5 />
          </div>
          {registerCouponBoxVisible ? (
            <Box padding={`0 ${PLANCK * 2}px ${PLANCK * 3}px ${PLANCK * 2}px`}>
              <Divider.H1 />
              <Space.H1 />
              {[
                {
                  iconSrc: 'ticket-123-blue-line.svg',
                  name: '쿠폰번호 입력',
                  onClick: () =>
                    openModal({
                      title: '쿠폰 번호 입력',
                      body: (
                        <InputCouponCodePopup
                          refetch={() => {
                            router.push('/mypage/coupons');
                          }}
                        />
                      ),
                    }),
                },
                /*
                {
                  iconSrc: "image-blue-line.svg",
                  name: "쿠폰 이미지 (앱전용)",
                  onClick: () =>
                    openModal({
                      title: "쿠폰 불러오기",
                      body: <LoadCouponPopup />,
                    }),
                },
                {
                  iconSrc: "barcode-blue-line.svg",
                  name: "바코드 스캔 (앱전용)",
                  onClick: () =>
                    openModal({
                      title: "바코드 스캔 (앱전용)",
                      body: <QrAndBarcodeScanPopup />,
                    }),
                },
                */
              ].map((item, index) => {
                return (
                  <CouponMenuItem key={index} onClick={item.onClick} style={{ cursor: 'pointer' }}>
                    <Space.H1_5 />
                    <Flex.RSC full={true} layout="auto auto auto 1 auto auto">
                      <Space.V2 />
                      <Icon src={item.iconSrc} size={22} />
                      <Space.V2_5 />
                      <Text color={'#324266'} size={FONTSIZE_14}>
                        {item.name}
                      </Text>
                      <Arrow.Right
                        className="-arrow"
                        size={2.5}
                        thickness={1.5}
                        color={'#324266'}
                      />
                      <Space.V3 />
                    </Flex.RSC>
                    <Space.H1_5 />
                  </CouponMenuItem>
                );
              })}
            </Box>
          ) : null}
        </RegisterCouponButton>
      </Box>
      <div style={{ height: 62 }}></div>
    </Wrapper>
  );
};
OrderMethodCard.Mobile = OrderMethodCardMobile;

const Wrapper = styled.div`
  position: relative;
  background-color: rgb(239, 240, 244);
`;

const Cards = styled.div`
  padding: ${PLANCK * 3}px;
  display: flex;
  & > *:not(:nth-child(1)) {
    margin-left: ${PLANCK * 3}px;
  }
`;

const Card = styled.div<{ selected?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${PLANCK * 3}px 0;
  border-radius: 7px;
  box-shadow: 0px 1px 5px 0 rgba(197, 200, 211, 0.2);
  background-color: #fff;
  box-sizing: border-box;
  cursor: pointer;
  transition: box-shadow 0.2s;

  & > * {
    transition: filter 0.2s;
  }

  &:hover {
    box-shadow: 0 0 0 3px #b92c35;
  }

  ${({ selected }) => (selected ? `box-shadow: 0 0 0 3px #b92c35;` : ``)}
`;

const CardIconWrapper = styled.div`
  width: 52px;
  height: 47px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardTitleText = styled.div`
  margin-top: ${PLANCK * 3 - 3}px;
  font-size: 26px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1em;
  letter-spacing: normal;
  text-align: center;
  color: #281d19;
`;

const CardSubtitleText = styled.div`
  margin-top: ${PLANCK * 2}px;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  font-stretch: normal;
  font-style: normal;
  line-height: 1em;
  letter-spacing: normal;
  text-align: center;
  color: #8e93ad;
`;

const RegisterCouponButton = styled.div`
  width: 100%;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 0 rgba(197, 200, 211, 0.2);
  background-color: #fff;
`;

const CouponMenuItem = styled.div`
  transition: background-color 0.2s;
  border-radius: 5px;

  & .-arrow {
    transition: opacity 0.2s;
    opacity: 0;
  }

  &:hover {
    background-color: #f1f2f6;
    & .-arrow {
      opacity: 1;
    }
  }
`;
