import { useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import leftArrowDisabled from '@/assets/images/components/left-arrow-disabled.svg';
import leftArrow from '@/assets/images/components/left-arrow.svg';
import rightArrowDisabled from '@/assets/images/components/right-arrow-disabled.svg';
import rightArrow from '@/assets/images/components/right-arrow.svg';

import { PaginationStyled } from './styled';

export interface PaginationProps {
  className?: string;
  total?: number;
  limit?: number;
  onChange?: (v: number) => void;
}

const Pagination = ({ className, total = 1, limit = 10, onChange }: PaginationProps) => {
  const [page, setPage] = useState<number>(1);
  const totalPage = Math.ceil(total / limit);
  const isFirstPage = page === 1;
  const isLastPage = page === totalPage;

  const onChangePage = (p: number) => {
    onChange?.(p);
    setPage(p);
  };

  return (
    <PaginationStyled className={clsx('Pagination', className)}>
      <button disabled={isFirstPage} onClick={() => onChangePage(page - 1)}>
        <Image
          src={isFirstPage ? leftArrowDisabled : leftArrow}
          alt="go_left"
          width={20}
          height={20}
        />
      </button>
      <div>
        {page} <span>/ {totalPage}</span>
      </div>
      <button onClick={() => onChangePage(page + 1)} disabled={isLastPage}>
        <Image
          src={isLastPage ? rightArrowDisabled : rightArrow}
          alt="go_right"
          width={20}
          height={20}
        />
      </button>
    </PaginationStyled>
  );
};

export default Pagination;
