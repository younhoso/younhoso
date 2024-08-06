import { FC, ReactNode } from 'react';

import styled from 'styled-components';

import { Box, Flex, Grid, Icon, Image, Space, Stepper, Text } from '@/components/atoms';
import { COLOR_WHITE, FONTSIZE_12, FONTSIZE_13, FONTSIZE_14, PLANCK } from '@/constants';
import { useSidebarCart } from '@/stores';
import { Menu, MenuSubOption } from '@/types';

import { OrderFormCardProps } from '../..';

type ItemData = {
  // TODO: 굳이 이거 따로ㅓ 쓸 필요 있음? useSidebarCart에서 가져온 데이터를 그대로 쓰면 되는거 아님?
  quantity: number;
  menu: Menu;
  options: MenuSubOption[];
  selectedOptionItemIds: number[];
};

interface ItemsProps extends OrderFormCardProps {}

interface ItemsComponentProps extends ItemsProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

const Items: FC<ItemsComponentProps> = props => {
  const { className, children, ...rest } = props;

  const { data: cart } = useSidebarCart();

  return (
    <Wrapper>
      <Flex.CCC gap={PLANCK * 2}>
        {cart && cart.items.length
          ? cart.items.map((item, index) => {
              return <Item key={index} index={index} {...item} />;
            })
          : null}
      </Flex.CCC>
    </Wrapper>
  );
};

const Item: FC<{ index: number } & ItemData> = ({
  index,
  quantity,
  menu,
  options,
  selectedOptionItemIds,
}) => {
  const { removeItem, changeQuantity } = useSidebarCart();

  const totalPrice =
    (menu.menuPrice +
      selectedOptionItemIds.reduce<number>((total, optionItemId) => {
        return (
          total +
          options.reduce<number>((total, option) => {
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
    quantity;

  return (
    <Box full={true} background="#f1f2f6" padding={PLANCK * 2}>
      <>
        <Flex.RSC full={true} layout="70px auto 1">
          <Image
            src={menu.menuImageUrl}
            backgroundPosition="center"
            backgroundSize="cover"
            height="100%"
            style={{ borderRadius: PLANCK }}
          />
          <Space.V2 />
          <>
            <Flex.CSS full={true}>
              <Flex.RSC full={true} layout="1 auto">
                <Text size={FONTSIZE_14} weight={700}>
                  {menu.menuName}
                </Text>
                <div style={{ cursor: 'pointer' }} onClick={() => removeItem({ index: index })}>
                  <Icon src={'close-circle-black.svg'} size={18} />
                </div>
              </Flex.RSC>
              <Space.H3 />
              <Text size={FONTSIZE_14} weight={700}>{`${menu.menuPrice.toLocaleString()}원`}</Text>
              <Space.H1 />
              <Text
                size={FONTSIZE_12}
                color={'#777777'}
              >{`수량 ${quantity.toLocaleString()}개 • 옵션 ${selectedOptionItemIds.length.toLocaleString()}개`}</Text>
            </Flex.CSS>
          </>
        </Flex.RSC>
      </>
      <Space.H2 />
      <>
        <Grid columnCount={1} gap={PLANCK * 2}>
          {options.map((option, index) => {
            const visible = !!selectedOptionItemIds.filter(
              optionItemId =>
                !!option.subOptionItemDetailResponseList.filter(
                  optionItem => optionItem.id === optionItemId,
                ).length,
            ).length;

            if (!visible) return null;

            return (
              <Box
                key={index}
                background={COLOR_WHITE}
                shape={'round'}
                padding={PLANCK * 2}
                style={{ boxShadow: '0 1px 5px 0 rgba(197, 199, 211, 0.2)' }}
              >
                <Text size={FONTSIZE_13} color={'#777777'}>
                  {option.subOptionTitle}
                </Text>
                <Space.H1_5 />
                <Grid columnCount={1} gap={PLANCK}>
                  {option.subOptionItemDetailResponseList
                    .filter(optionItem => {
                      return selectedOptionItemIds.includes(optionItem.id);
                    })
                    .map((optionItem, index) => {
                      return (
                        <Text key={index} size={FONTSIZE_13}>{`${
                          optionItem.itemTitle
                        } +${optionItem.addPrice.toLocaleString()}원`}</Text>
                      );
                    })}
                </Grid>
              </Box>
            );
          })}
        </Grid>
      </>
      <Space.H3 />
      <Flex.RBC>
        <Stepper
          value={quantity}
          onChange={value => {
            changeQuantity({
              index,
              quantity: value,
            });
          }}
        />
        <Text>{`${totalPrice.toLocaleString()}원`}</Text>
      </Flex.RBC>
    </Box>
  );
};

const Wrapper = styled.div`
  padding: 0;
`;

export default Items;
