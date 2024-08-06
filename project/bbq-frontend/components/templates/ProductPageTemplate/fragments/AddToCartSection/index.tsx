import { FC } from 'react';

import { Arrow, Box, Flex, Space, Text } from '@/components/atoms';
import { COLOR_WHITE, FONTSIZE_16, PLANCK } from '@/constants';
import { getPositionByDocument } from '@/utils';

import { ProductPageTemplateProps } from '../..';

const AddToCartSection: FC<ProductPageTemplateProps> = ({
  needRequiredOptionsSelected,
  handleAddToCartButtonClick,
}) => {
  return (
    <Box>
      <Flex.RSS full layout="1.2 1">
        <div></div>
        <div>
          <Box
            padding={`${PLANCK * 2}px ${PLANCK * 6}px`}
            onClick={() => {
              if (needRequiredOptionsSelected) return;
              handleAddToCartButtonClick();

              // 사이드바 스크롤
              setTimeout(() => {
                if (typeof window !== 'undefined') {
                  const _el = window.document.querySelector(
                    '[data-global-ref="sidebar-order-form-card"]',
                  );
                  if (_el) {
                    window.scrollTo(
                      0,
                      getPositionByDocument(_el).top +
                        _el.getBoundingClientRect().height -
                        window.innerHeight,
                    );
                  }
                }
              }, 200);
            }}
          >
            <Box
              background={'black'}
              shape={'round'}
              style={needRequiredOptionsSelected ? { opacity: 0.25, pointerEvents: 'none' } : {}}
            >
              <Flex.RCC layout={`${PLANCK * 10}px 1 ${PLANCK * 10}px`}>
                <div></div>
                <Flex.CCC full>
                  <Space.H3 />
                  <Text color={COLOR_WHITE} size={FONTSIZE_16}>
                    주문서에 담기
                  </Text>
                  <Space.H3 />
                </Flex.CCC>
                <Flex.CCC>
                  <Arrow.Right size={5} color={COLOR_WHITE} thickness={1.5} tail />
                </Flex.CCC>
              </Flex.RCC>
            </Box>
          </Box>
        </div>
      </Flex.RSS>
    </Box>
  );
};

export default AddToCartSection;
