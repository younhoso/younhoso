import { FC, ReactNode, useCallback, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { CartAPI } from '@/apis';
import { Box, Flex, Grid, Icon, Space, Text } from '@/components/atoms';
import { useModal } from '@/components/molecules';
import { SuccessAddToCartPopup } from '@/components/organisms/popups/SuccessAddToCartPopup';
import { COLOR_RED, COLOR_WHITE, FONTSIZE_16, PLANCK } from '@/constants';
import { useAuth, useQueryParams } from '@/hooks';
import { useSidebarCart } from '@/stores';
import { MealTypeEnum } from '@/types';
import { parseApiError, serializeCart } from '@/utils';

interface ButtonsProps {}

interface ButtonsComponentProps extends ButtonsProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

const Buttons: FC<ButtonsComponentProps> = props => {
  const { className, children, ...rest } = props;

  const router = useRouter();
  const { keepParams } = useQueryParams();
  const { openModal } = useModal();
  const { reloadCartCount } = useAuth();
  const { data: sidebarCart, reset: resetSidebarCart } = useSidebarCart();
  const {
    query: { ecouponAction: queryEcouponAction, ecouponActionValue: queryEcouponActionValue },
  } = useRouter();
  const isActionForECouponChangeMenu = useMemo<boolean>(() => {
    return !!(
      (queryEcouponAction as string) === 'change' && (queryEcouponActionValue as string).length
    );
  }, [queryEcouponAction, queryEcouponActionValue]);

  const methodSelected = useMemo<boolean>(() => {
    return [MealTypeEnum.Delivery as string, MealTypeEnum.Takeout as string].includes(
      `${router.query.mealType}`.toUpperCase(),
    );
  }, [router.query]);

  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);

  const addToCart = useCallback(
    async (params: { showOkModal: boolean } = { showOkModal: true }) => {
      setButtonsDisabled(true);

      Promise.all(
        sidebarCart.items.map(item => {
          return CartAPI.addMenu({
            mainMenuId: Number(item.menu.id),
            quantity: item.quantity,
            subOptionItemIdSet: item.selectedOptionItemIds,
          });
        }),
      )
        .then(res => {
          if (params.showOkModal) {
            openModal({
              title: '알림',
              body: <SuccessAddToCartPopup />,
            });
          }
          reloadCartCount();
          resetSidebarCart();

          return Promise.resolve();
        })
        .catch(err => {
          console.error(err);
          alert(parseApiError(err).message);
          setButtonsDisabled(false);

          return Promise.reject(err);
        });
    },
    [sidebarCart, router.query],
  );

  const checkout = useCallback(async () => {
    setButtonsDisabled(true);

    try {
      router.push(
        keepParams('/checkout', {
          mc: serializeCart(
            sidebarCart.items.map(item => {
              return {
                menuId: Number(item.menu.id),
                quantity: item.quantity,
                subOptionIds: item.selectedOptionItemIds,
              };
            }),
          ),
        }),
      );
      reloadCartCount();
      resetSidebarCart();
    } catch (err) {
      console.error(err);
      alert(parseApiError(err).message);
    }
  }, [addToCart, router.query]);

  return (
    <Wrapper>
      <Grid columnCount={!isActionForECouponChangeMenu ? 2 : 1} gap={PLANCK * 2}>
        {!isActionForECouponChangeMenu ? (
          <>
            <ActionButton
              data-global-ref="sidebar-cart-add-to-cart-button"
              border={'red'}
              thickness={2}
              shape={'round'}
              onClick={
                methodSelected
                  ? () => addToCart({ showOkModal: true })
                  : () => alert('배달인지 포장인지 먼저 선택해주세요.')
              }
              disabled={buttonsDisabled}
            >
              <Flex.CCC>
                <Space.H2 />
                <Icon src={'basket-bbq-red.svg'} width={26} height={26} />
                <Space.H2 />
                <Text color={COLOR_RED} size={FONTSIZE_16}>
                  장바구니 담기
                </Text>
                <Space.H2 />
              </Flex.CCC>
            </ActionButton>
            <ActionButton
              background={'red'}
              shape={'round'}
              onClick={
                methodSelected
                  ? () => checkout()
                  : () => alert('배달인지 포장인지 먼저 선택해주세요.')
              }
              disabled={buttonsDisabled}
            >
              <Flex.CCC>
                <Space.H2 />
                <Icon src={'paying-hand-white.svg'} width={29} height={26} />
                <Space.H2 />
                <Text color={COLOR_WHITE} size={FONTSIZE_16}>
                  결제하기
                </Text>
                <Space.H2 />
              </Flex.CCC>
            </ActionButton>
          </>
        ) : (
          <ActionButton
            data-global-ref="sidebar-cart-change-ecoupon-menu-button"
            border={'red'}
            thickness={2}
            shape={'round'}
            onClick={
              methodSelected
                ? async () => {
                    try {
                      await addToCart({ showOkModal: false });

                      const existingIgnoreEcoupons = (
                        router.query.ignoreEcoupons ? `${router.query.ignoreEcoupons}` : ''
                      )
                        .trim()
                        .split(',')
                        .filter(v => v && v.trim().length);

                      router.push(
                        keepParams('/cart', {
                          ignoreEcoupons: [
                            ...existingIgnoreEcoupons,
                            queryEcouponActionValue as string,
                          ].join(','),
                        }),
                      );
                    } catch (_) {
                      // TODO: 여기서 또 에러를 출력할 필요는 없지만, 그냥 함수 구조를 바꿔야할듯 혹은 클릭 이벤트 이런걸로 한번 더 감싸는 함수를 하던가
                    }
                  }
                : () => alert('배달인지 포장인지 먼저 선택해주세요.')
            }
            disabled={buttonsDisabled}
          >
            <Flex.CCC>
              <Space.H2 />
              <Icon src={'basket-bbq-red.svg'} width={26} height={26} />
              <Space.H2 />
              <Text color={COLOR_RED} size={FONTSIZE_16}>
                이 메뉴로 변경하기
              </Text>
              <Space.H2 />
            </Flex.CCC>
          </ActionButton>
        )}
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0;
`;

const ActionButton = styled(Box)<{ disabled: boolean }>`
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }

  ${({ disabled }) => (disabled ? `opacity:0.4; pointer-events:none;` : ``)}
`;

export default Buttons;
