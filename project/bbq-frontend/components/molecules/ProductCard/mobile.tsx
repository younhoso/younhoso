import { FC } from 'react';

import Link from 'next/link';

import classNames from 'classnames';
import styled from 'styled-components';

import { Box, Image, Space, Text } from '@/components/atoms';
import { COLOR_GRAY, FONTSIZE_12, FONTSIZE_16, FONTSIZE_18, PLANCK } from '@/constants';
import { useQueryParams } from '@/hooks';

import { ProductCardComponentProps } from './ProductCard';

export const ProductCardMobile: FC<ProductCardComponentProps> = props => {
  const { keepParams } = useQueryParams();
  const {
    menu: { id, menuName: name, menuPrice: price, description, menuImageUrl: imageUrl },
    inCart,
    className,
    ...rest
  } = props;

  return (
    <Wrapper className={classNames(className)} {...rest} key={`product-card-${id}`}>
      <Link href={keepParams(`/products/${id}`)}>
        <ProductImage
          src={imageUrl}
          height={'80%'}
          backgroundPosition={'center'}
          backgroundSize={'cover'}
        />
      </Link>
      <Space.H3 />
      <Box padding={`0 ${PLANCK * 1}px`}>
        <Text size={FONTSIZE_16}>{name}</Text>
        <Space.H1_5 />
        <Text size={FONTSIZE_12} color={COLOR_GRAY} lineHeight={'1.25em'}>
          {description}
        </Text>
        <Space.H2_5 />
        <Text size={FONTSIZE_18}>{`${price.toLocaleString()}원`}</Text>
      </Box>
      <Space.H5 />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: block;
`;

const ProductImage = styled(Image)`
  border-radius: ${PLANCK * 2}px;
  overflow: hidden;
`;
