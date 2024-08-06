import { FC } from 'react';

import Link from 'next/link';

import classNames from 'classnames';
import styled from 'styled-components';

import { Box, Image, Space, Text } from '@/components/atoms';
import { COLOR_GRAY, FONTSIZE_14, FONTSIZE_20, PLANCK } from '@/constants';
import { useQueryParams } from '@/hooks';
import { Menu } from '@/types';

import { ProductCardMobile } from './mobile';

export interface ProductCardProps {
  menu: Menu;
  inCart?: boolean;
}

export interface ProductCardComponentProps extends ProductCardProps {
  className?: string;
  [x: string]: any;
}

export const ProductCard: FC<ProductCardComponentProps> & {
  Mobile: FC<ProductCardComponentProps>;
} = props => {
  const { keepParams } = useQueryParams();
  const {
    menu: { id, menuName: name, menuPrice: price, description, menuImageUrl: imageUrl },
    inCart,
    className,
    ...rest
  } = props;

  return (
    <Wrapper
      className={classNames(className)}
      {...rest}
      key={`menu-card-${id}`}
      href={keepParams(`/products/${id}`)}
    >
      <ProductImage
        src={imageUrl}
        height={'66.666666%'}
        backgroundPosition={'center'}
        backgroundSize={'cover'}
      />
      <Space.H3 />
      <Box padding={`0 ${PLANCK * 2}px`}>
        <Text size={FONTSIZE_20}>{name}</Text>
        <Space.H2_5 />
        <Text size={FONTSIZE_14} color={COLOR_GRAY} lineHeight={'1.4em'}>
          {description}
        </Text>
        <Space.H2_5 />
        <Text size={FONTSIZE_20}>{`${price.toLocaleString()}원`}</Text>
      </Box>
      <Space.H5 />
    </Wrapper>
  );
};
ProductCard.Mobile = ProductCardMobile;

const Wrapper = styled(Link)`
  position: relative;
  display: block;
`;

const ProductImage = styled(Image)`
  border-radius: ${PLANCK * 2}px;
  overflow: hidden;
`;
