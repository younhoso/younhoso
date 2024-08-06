import { FC } from 'react';

import styled from 'styled-components';

import { Container, Space } from '@/components/atoms';
import { Products, Sidebar } from '@/components/organisms';
import { Menu, MenuCategory } from '@/types';

import { ProductsPageTemplateMobile } from './mobile';

export interface ProductsPageTemplateProps {
  selectedCategoryId: number;
  categories: MenuCategory[];
  products: Menu[];
}

export interface ProductsPageTemplateComponentProps extends ProductsPageTemplateProps {}

export const ProductsPageTemplate: FC<ProductsPageTemplateComponentProps> & {
  Mobile: FC<ProductsPageTemplateComponentProps>;
} = ({ selectedCategoryId, categories, products }) => {
  return (
    <Wrapper>
      <Container>
        <Container.Body>
          <Template>
            <Space.H3 />
            <Products
              selectedCategoryId={selectedCategoryId}
              categories={categories}
              products={products}
            />
          </Template>
        </Container.Body>
        <Container.Sidebar>
          <Sidebar />
        </Container.Sidebar>
      </Container>
    </Wrapper>
  );
};
ProductsPageTemplate.Mobile = ProductsPageTemplateMobile;

const Wrapper = styled.div`
  display: block;
  clear: both;
`;

const Template = styled.div`
  display: block;
`;
