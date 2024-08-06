import { FC } from 'react';

import Link from 'next/link';

import classNames from 'classnames';
import styled from 'styled-components';

import { Icon, Space, Text } from '@/components/atoms';
import { COLOR_BOX_BACKGROUND_PRIMARY, COLOR_BOX_BORDER_PRIMARY, FONTSIZE_13 } from '@/constants';
import { useQueryParams } from '@/hooks';

import { CategoryCardComponentProps } from './CategoryCard';

export const CategoryCardMobile: FC<CategoryCardComponentProps> = props => {
  const { keepParams } = useQueryParams();
  const { category, selected, className, ...rest } = props;

  return (
    <Wrapper
      className={classNames(className)}
      href={keepParams(`/categories/${category.id}`)}
      selected={selected}
      {...rest}
    >
      <OverlayBox>
        <Icon src={category.categoryImageUrl} size={40} />
        {category.categoryName ? (
          <>
            <Space.H1 />
            <Text size={FONTSIZE_13}>{category.categoryName}</Text>
          </>
        ) : null}
      </OverlayBox>
    </Wrapper>
  );
};

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
