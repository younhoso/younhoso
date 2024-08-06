import { FC } from 'react';

import Link from 'next/link';

import classNames from 'classnames';
import styled from 'styled-components';

import { Icon, Space, Text } from '@/components/atoms';
import { COLOR_DIVIDER, FONTSIZE_15 } from '@/constants';
import { useQueryParams } from '@/hooks';

import { CategoryCardProps } from '../CategoryCard';
import { CategoryTabMobile } from './mobile';

export interface CategoryTabProps extends CategoryCardProps {}

export interface CategoryTabComponentProps extends CategoryTabProps {
  className?: string;
  [x: string]: any;
}

export const CategoryTab: FC<CategoryTabComponentProps> & {
  Mobile: FC<CategoryTabComponentProps>;
} = props => {
  const { keepParams } = useQueryParams();
  const {
    selected,
    category: { id, categoryName, categoryImageUrl },
    className,
    ...rest
  } = props;

  return (
    <Wrapper
      className={classNames(className)}
      href={keepParams(`/categories/${id}`)}
      {...rest}
      selected={selected}
    >
      <Space.V3 />
      <Icon src={categoryImageUrl} size={36}></Icon>
      {categoryName ? (
        <>
          <Space.V1 />
          <Text size={FONTSIZE_15}>{categoryName}</Text>
        </>
      ) : null}
      <Space.V3 />
    </Wrapper>
  );
};
CategoryTab.Mobile = CategoryTabMobile;

const Wrapper = styled(Link)<{ selected?: boolean }>`
  display: block;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  ${({ selected }) => {
    if (selected) {
      return `
        background-color: white;
        box-shadow: -1px 0px 0px ${COLOR_DIVIDER}, 1px 0px 0px ${COLOR_DIVIDER};
      `;
    } else {
      return `
        box-shadow: inset 0 -1px 0px ${COLOR_DIVIDER};
      `;
    }
  }}
`;
