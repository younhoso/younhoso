import { FC } from 'react';

import { Container } from '@/components/atoms';
import { Products } from '@/components/organisms';

import { ProductsPageTemplateComponentProps } from './ProductsPageTemplate';

export const ProductsPageTemplateMobile: FC<ProductsPageTemplateComponentProps> = ({
  selectedCategoryId,
  categories,
  products,
}) => {
  return (
    <Container.Mobile>
      <Products.Mobile
        selectedCategoryId={selectedCategoryId}
        categories={categories}
        products={products}
      />
    </Container.Mobile>
  );
};
