import { FC } from 'react';

import Link from 'next/link';

import classNames from 'classnames';
import styled from 'styled-components';

import { Icon, Space, Text } from '@/components/atoms';
import { COLOR_DIVIDER, FONTSIZE_13 } from '@/constants';
import { useQueryParams } from '@/hooks';

import { CategoryTabComponentProps } from './CategoryTab';

export const CategoryTabMobile: FC<CategoryTabComponentProps> = props => {
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
      <Space.V2 />
      <Icon src={categoryImageUrl} size={24}></Icon>
      {categoryName ? (
        <>
          <Space.V1_5 />
          <Text size={FONTSIZE_13}>{categoryName}</Text>
        </>
      ) : null}
      <Space.V2 />
    </Wrapper>
  );
};

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
