import React from 'react';

import styled from 'styled-components';

import { Icon } from '../Icon';
import { PaginationProps } from './Pagination';

export const PaginationMobile: React.FC<PaginationProps> = ({
  currentPage,
  totalPageCount,
  onPageButtonClick,
}) => {
  const MIN_PAGE_NUMBER = 1;
  const PAGE_BUTTONS_COUNT = 6;
  const HALF_WAY = Math.floor(PAGE_BUTTONS_COUNT / 2);

  const startPage =
    currentPage - HALF_WAY < MIN_PAGE_NUMBER ? MIN_PAGE_NUMBER : currentPage - HALF_WAY;

  const endPage =
    startPage + PAGE_BUTTONS_COUNT - 1 > totalPageCount
      ? totalPageCount
      : startPage + PAGE_BUTTONS_COUNT - 1;

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <Wrapper>
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageButtonClick && onPageButtonClick(1)}
      >
        <Icon src="/pagination/arrow-leftest.svg" size={9} />
      </Button>
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageButtonClick && onPageButtonClick(currentPage - 1)}
      >
        <Icon src="/pagination/arrow-left.svg" size={9} />
      </Button>
      {pages.map(page => (
        <Button
          key={page}
          isActive={page === currentPage}
          onClick={() => {
            onPageButtonClick && onPageButtonClick(page);
          }}
        >
          {page}
        </Button>
      ))}
      <Button
        disabled={currentPage === totalPageCount}
        onClick={() => onPageButtonClick && onPageButtonClick(currentPage + 1)}
      >
        <Icon src="/pagination/arrow-right.svg" size={9} />
      </Button>
      <Button
        disabled={currentPage === totalPageCount}
        onClick={() => onPageButtonClick && onPageButtonClick(totalPageCount)}
      >
        <Icon src="/pagination/arrow-rightest.svg" size={9} />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button<{ isActive?: boolean }>`
  width: 34px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${props => (props.isActive ? 'black' : '#777')};

  border: none;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;

  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  background-color: white;

  ${props => props.isActive && 'box-shadow: inset 0 -2px 0px red; font-weight: bold;'}

  border-left: 1px solid #ddd;
  &:last-child {
    border-right: 1px solid #ddd;
  }
`;
