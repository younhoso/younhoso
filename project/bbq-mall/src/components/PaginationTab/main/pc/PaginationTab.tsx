'use client';

import Image from 'next/image';

import clsx from 'clsx';

import leftArrowDisabled from '@/assets/images/components/left-arrow-disabled.svg';
import leftArrow from '@/assets/images/components/left-arrow.svg';
import rightArrowDisabled from '@/assets/images/components/right-arrow-disabled.svg';
import rightArrow from '@/assets/images/components/right-arrow.svg';

import { PaginationTabStyled } from './styled';

export interface PaginationTabProps {
  className?: string;
  total?: number;
  limit?: number;
  page?: number;
  onChange?: (v: number) => void;
  srollTopRef?: () => void;
}

const PaginationTab = ({
  className,
  total = 1,
  limit = 10,
  page = 1,
  onChange,
  srollTopRef,
}: PaginationTabProps) => {
  const totalPage = Math.ceil(total / limit);
  const isFirstPage = page === 1;
  const isLastPage = page === totalPage;

  const onChangePage = (p: number) => {
    onChange?.(p);
    srollTopRef && srollTopRef();
  };

  return (
    <PaginationTabStyled className={clsx('PaginationTab', className)}>
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
    </PaginationTabStyled>
  );
};

export default PaginationTab;
