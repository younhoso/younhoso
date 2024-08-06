import { FC, useMemo } from 'react';

import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';

import { Arrow, Box, Flex, Space, Text } from '@/components/atoms';
import { COLOR_WHITE, FONTSIZE_14, FONTSIZE_16, PLANCK } from '@/constants';
import { isArsSessionState } from '@/stores';

import { ProductPageTemplateProps } from '../../../';

const AddToCartSection: FC<ProductPageTemplateProps> = ({
  needRequiredOptionsSelected,
  handleAddToCartButtonClick,
}) => {
  const {
    query: { ecouponAction: queryEcouponAction, ecouponActionValue: queryEcouponActionValue },
  } = useRouter();
  const isActionForECouponChangeMenu = useMemo<boolean>(() => {
    return !!(
      (queryEcouponAction as string) === 'change' && (queryEcouponActionValue as string).length
    );
  }, [queryEcouponAction, queryEcouponActionValue]);

  const isArs = useRecoilValue(isArsSessionState);
  const router = useRouter();

  return (
    <Box padding={PLANCK * 2}>
      <Flex.RSC layout="1 1" gap={PLANCK * 2}>
        <Box
          background={'black'}
          shape={'round'}
          style={
            needRequiredOptionsSelected
              ? { position: 'relative', opacity: 0.25, pointerEvents: 'none' }
              : { position: 'relative' }
          }
          onClick={() => {
            if (needRequiredOptionsSelected) return;

            try {
              if (typeof window !== 'undefined') {
                if (window.location.search.slice(1).indexOf('mealType=') < 0) {
                  if (isArs) {
                    router.push('/');
                  } else {
                    (window as any).document
                      .querySelector('[data-global-ref="header-hamburger-menu"]')
                      .click();
                  }

                  setTimeout(() => {
                    alert('배달인지 포장인지 먼저 선택해주세요.');
                  });
                } else {
                  handleAddToCartButtonClick();
                  if (!isActionForECouponChangeMenu) {
                    setTimeout(() => {
                      (window as any).document
                        .querySelector('[data-global-ref="sidebar-cart-add-to-cart-button"]')
                        .click();
                    }, 200);
                  } else {
                    setTimeout(() => {
                      (window as any).document
                        .querySelector(
                          '[data-global-ref="sidebar-cart-change-ecoupon-menu-button"]',
                        )
                        .click();
                    }, 200);
                  }
                }
              }
            } catch (err) {
              console.error(err);
              alert('다시 시도해주세요.');
            }
          }}
        >
          <Flex.RCC>
            <Flex.CCC full>
              <Space.H3 />
              <Text color={COLOR_WHITE} size={FONTSIZE_14}>
                {isActionForECouponChangeMenu ? '이 메뉴로 변경하기' : '장바구니에 추가'}
              </Text>
              <Space.H3 />
            </Flex.CCC>
          </Flex.RCC>
          <div
            style={{
              position: 'absolute',
              right: PLANCK * 3,
              top: '50%',
              transform: 'translateY(-55%)',
            }}
          >
            <Arrow.Right size={3} color={COLOR_WHITE} thickness={1.5} tail />
          </div>
        </Box>
      </Flex.RSC>
    </Box>
  );
};

export default AddToCartSection;
