import { FC, useEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { Box, Flex, Grid, Space, Text } from '@/components/atoms';
import { CategoryCard, CategoryTab, ProductCard } from '@/components/molecules';
import {
  COLOR_DIVIDER,
  FONTSIZE_15,
  FONTSIZE_18,
  FONTSIZE_26,
  FONTSIZE_30,
  PLANCK,
} from '@/constants';

import { ProductsComponentProps } from './Products';

export const ProductsMobile: FC<ProductsComponentProps> = ({
  selectedCategoryId,
  categories,
  products,
  className,
  children,
  ...rest
}) => {
  const categoryTabsScrollBoxRef = useRef<HTMLDivElement>(null);
  const selectedCategoryTabRef = useRef<HTMLDivElement>(null);

  const [categoryCardsMenuVisible, setCategoryCardsMenuVisible] = useState<boolean>(false);

  const selectedCategory = useMemo(() => {
    return categories.find(category => category.id === selectedCategoryId);
  }, [selectedCategoryId]);

  useEffect(() => {
    if (!categoryTabsScrollBoxRef.current) return;
    if (!selectedCategoryTabRef.current) return;

    const container = categoryTabsScrollBoxRef.current;
    const item = selectedCategoryTabRef.current;

    container.scrollLeft = 0;
    container.scrollLeft = Math.max(
      container.scrollLeft,
      item.getBoundingClientRect().left -
        container.getBoundingClientRect().left -
        container.clientWidth / 2,
    );
  }, [categoryTabsScrollBoxRef.current, selectedCategoryTabRef.current]);

  return (
    <Wrapper className={classNames(className)} {...rest}>
      <div
        style={{
          display: categoryCardsMenuVisible ? `block` : `none`,
          position: 'absolute',
          zIndex: 1,
          width: '100%',
        }}
      >
        <Box
          background={'rgba(255,255,255,0.97)'}
          border="lightgray"
          padding={`${PLANCK * 4}px ${PLANCK * 4}px`}
        >
          <Text size={FONTSIZE_15}>메뉴 전체보기</Text>
          <Space.H4 />
          <Grid columnCount={4} gap={PLANCK * 2}>
            {categories.map((category, index) => {
              return (
                <CategoryCard.Mobile
                  key={index}
                  category={category}
                  selected={category.id === selectedCategory?.id ? true : false}
                  onClick={() => {
                    setCategoryCardsMenuVisible(false);
                  }}
                />
              );
            })}
          </Grid>
        </Box>
        <CategoryTabsArrowUpButton onClick={() => setCategoryCardsMenuVisible(false)} />
      </div>

      <CategoryTabs {...rest}>
        <CategoryTabsScrollBox ref={categoryTabsScrollBoxRef}>
          {categories
            .sort((a, b) => {
              return a.priority - b.priority;
            })
            .map((category, index) => (
              <div
                key={index}
                ref={category.id === selectedCategory?.id ? selectedCategoryTabRef : null}
              >
                <CategoryTab.Mobile
                  category={category}
                  selected={category.id === selectedCategory?.id ? true : false}
                />
              </div>
            ))}
        </CategoryTabsScrollBox>
        <CategoryTabsArrowDownButton onClick={() => setCategoryCardsMenuVisible(true)} />
      </CategoryTabs>

      <Box border="lightgray" padding={`${PLANCK * 4}px ${PLANCK * 3}px`}>
        <Flex.RBC>
          <Flex.RCC>
            <Flex.RCE>
              <Text size={FONTSIZE_26}>{selectedCategory?.categoryName}</Text>
              <Space.V2 />
              <Text size={FONTSIZE_15}>Total {products.length}</Text>
            </Flex.RCE>
          </Flex.RCC>
        </Flex.RBC>
        <Space.H6 />
        <Grid columnCount={2} gap={PLANCK * 3}>
          {products.map((product, index) => {
            return <ProductCard.Mobile key={index} menu={product} />;
          })}
        </Grid>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: block;
  clear: both;
  width: 100%;
`;

const CategoryTabs = styled.div`
  position: relative;
  width: 100%;
  height: 47px;
  background-color: #f8f8f8;
  margin-bottom: -1px;
`;

const CategoryTabsScrollBox = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  border: 1px solid ${COLOR_DIVIDER};
  border-bottom: 0;
  padding-right: 47px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  & > * {
    height: 100%;
    display: inline-flex;
  }
`;

const CategoryTabsArrowDownButton = styled.div`
  position: absolute;
  width: 47px;
  height: 100%;
  right: 0;
  top: 0;
  cursor: pointer;
  background-color: white;
  border: 1px solid ${COLOR_DIVIDER};

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;

    display: block;
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: translate(-50%, -60%) rotate(45deg);
  }
`;

const CategoryTabsArrowUpButton = styled(CategoryTabsArrowDownButton)`
  height: 53px;
  border: none;
  background: none;

  &::after {
    top: 60%;
    transform: translate(-50%, -60%) rotate(225deg);
  }
`;
