import { FC } from 'react';

import Link from 'next/link';

import classNames from 'classnames';
import styled from 'styled-components';

import { Icon, Space, Text } from '@/components/atoms';
import { COLOR_BOX_BACKGROUND_PRIMARY, COLOR_BOX_BORDER_PRIMARY } from '@/constants';
import { useQueryParams } from '@/hooks';
import { MenuCategory } from '@/types';

import { CategoryCardMobile } from './mobile';

export interface CategoryCardProps {
  category: MenuCategory;
  selected?: boolean;
}

export interface CategoryCardComponentProps extends CategoryCardProps {
  className?: string;
  [x: string]: any;
}

export const CategoryCard: FC<CategoryCardComponentProps> & {
  Mobile: FC<CategoryCardComponentProps>;
} = props => {
  const { category, selected, className, ...rest } = props;
  const { keepParams } = useQueryParams();

  return (
    <Wrapper
      className={classNames(className)}
      href={keepParams(`/categories/${category.id}`)}
      selected={selected}
      {...rest}
    >
      <OverlayBox>
        <Icon src={category.categoryImageUrl} size={'50%'} />
        {category.categoryName ? (
          <>
            <Space.H1_5 />
            <Text size={15}>{category.categoryName}</Text>
            <Space.H1_5 />
          </>
        ) : null}
      </OverlayBox>
    </Wrapper>
  );
};

CategoryCard.Mobile = CategoryCardMobile;

const Wrapper = styled(Link)<{ selected?: boolean }>`
  display: block;
  position: relative;
  width: 100%;
  padding-top: 100%;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);

    & > * {
      box-shadow: 0 0 0 2px #b92c35;
    }
  }

  ${({ selected }) => {
    if (selected) {
      return `
        transform: translateY(-3px);

        & > * {
          box-shadow: 0 0 0 2px #b92c35;
        }
      `;
    }
  }}
`;

const OverlayBox = styled.div`
  border: 1px solid ${COLOR_BOX_BORDER_PRIMARY};
  background-color: ${COLOR_BOX_BACKGROUND_PRIMARY};
  border-radius: 7px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.2s;
`;
