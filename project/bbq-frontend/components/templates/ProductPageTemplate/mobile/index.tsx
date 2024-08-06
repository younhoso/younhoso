import { FC } from 'react';

import styled from 'styled-components';

import { Box, Container, Divider } from '@/components/atoms';

import { ProductPageTemplateComponentProps } from '../ProductPageTemplate';
import AddToCartSection from './fragments/AddToCartSection';
import LeftSection from './fragments/LeftSection';
import RightSection from './fragments/RightSection';

export const ProductPageTemplateMobile: FC<ProductPageTemplateComponentProps> = ({ ...rest }) => {
  return (
    <Wrapper>
      <Container.Mobile>
        <Template>
          <LeftSection {...rest} />
          <Divider.H1 />
          <RightSection {...rest} />
        </Template>
      </Container.Mobile>
      <StickyBox full>
        <Box border={'lightgray'} background={'white'}>
          <AddToCartSection {...rest} />
        </Box>
      </StickyBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
  clear: both;
`;

const Template = styled.div`
  display: block;
`;

const StickyBox = styled(Box)`
  position: fixed;
  bottom: -1px;
  z-index: 1;
`;
