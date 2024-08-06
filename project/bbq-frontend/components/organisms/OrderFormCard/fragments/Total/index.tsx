import { FC, ReactNode } from 'react';

import styled from 'styled-components';

import { Box, Flex, Space, Text } from '@/components/atoms';
import { FONTSIZE_11, FONTSIZE_12, FONTSIZE_14, FONTSIZE_20, PLANCK } from '@/constants';
import { useSidebarCart } from '@/stores';

import { OrderFormCardProps } from '../..';

interface TotalProps extends OrderFormCardProps {}

interface TotalComponentProps extends TotalProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

const Total: FC<TotalComponentProps> = props => {
  const { className, children, ...rest } = props;

  const { data: sidebarCart } = useSidebarCart();

  const menusTotalPrice = sidebarCart.items.reduce<number>((total, item) => {
    return (
      total +
      (item.menu.menuPrice +
        item.selectedOptionItemIds.reduce<number>((total, optionItemId) => {
          return (
            total +
            item.options.reduce<number>((total, option) => {
              return (
                total +
                option.subOptionItemDetailResponseList
                  .filter(optionItem => optionItem.id === optionItemId)
                  .reduce<number>((total, optionItem) => {
                    return total + optionItem.addPrice;
                  }, 0)
              );
            }, 0)
          );
        }, 0)) *
        item.quantity
    );
  }, 0);

  const deliveryFee = 3000; // TODO

  return (
    <Wrapper>
      <Box padding={PLANCK * 3}>
        <Flex.RBC>
          <Text size={FONTSIZE_12}>주문 금액</Text>
          <Text size={FONTSIZE_14}>{`${menusTotalPrice.toLocaleString()}원`}</Text>
        </Flex.RBC>
        <Space.H2 />
        <Flex.RBC>
          <Text size={FONTSIZE_12}>배달팁</Text>
          <Text size={FONTSIZE_14}>{`${deliveryFee.toLocaleString()}원`}</Text>
        </Flex.RBC>
      </Box>
      <SpriteBox padding={`${PLANCK * 2}px ${PLANCK * 3}px`}>
        <Text size={FONTSIZE_11}>결제 예정 금액</Text>
        <Space.H2 />
        <Flex.REC>
          <Text size={FONTSIZE_20} weight={700}>
            {`${(menusTotalPrice + deliveryFee).toLocaleString()}원`}
          </Text>
        </Flex.REC>
      </SpriteBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const SpriteBox = styled(Box)`
  position: relative;

  &::before {
    position: absolute;
    left: 0;
    top: 0;
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-image: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      #dddddd 2px,
      #dddddd 4px
    );
  }

  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 5px,
    #f1f2f6 5px,
    #f1f2f6 10px
  );
`;

export default Total;
