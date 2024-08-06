'use client';

import { Dispatch, SetStateAction } from 'react';

import clsx from 'clsx';

import Loading from '@/components/Loading';
import Nodata from '@/components/Nodata';
import Pagination from '@/components/Pagination';
import ReviewDetailItem from '@/components/ReviewDetailItem';
import Select from '@/components/Select';
import { Reviewed } from '@/types';

import { ProductReviewStyled } from './styled';

export interface ProductReviewProps {
  className?: string;
  optionList: { label: string; value: number; orderBy: string; orderDirection: string }[];
  datailReviewData: { textReview: number; photoReview: number };
  setOrderByKey: Dispatch<
    SetStateAction<{ label: string; value: number; orderBy: string; orderDirection: string }>
  >;
  setReviewPage: Dispatch<SetStateAction<number>>;
  limit: number;
  data?: { items: Reviewed[]; totalCount: number };
  orderBy?: string;
  isLoadingReview: boolean;
}

const ProductReview = ({
  className,
  optionList,
  datailReviewData,
  setOrderByKey,
  setReviewPage,
  limit,
  data,
  orderBy,
  isLoadingReview,
}: ProductReviewProps) => {
  return (
    <ProductReviewStyled className={clsx('ProductReview', className)}>
      <div className="review-header">
        <p className="review-title">상품리뷰</p>
        <p className="review-description">
          상품을 구매하신 분들이 작성한 리뷰입니다. 리뷰 작성시 아래 금액만큼 포인트가 적립됩니다.
          <br />
          텍스트 리뷰 :<span>{datailReviewData.textReview} 포인트</span>
          <i className="line"></i> 포토 리뷰 :<span>{datailReviewData.photoReview} 포인트</span>
        </p>
      </div>

      <div className="review-inner">
        <div className="review-count">
          <p>리뷰 {data?.totalCount}건</p>

          <Select
            optionList={optionList}
            defaultValue={optionList[0].value}
            onChange={e => {
              const selectedOption = optionList.find(option => option.value === e);
              selectedOption && setOrderByKey(selectedOption);
            }}
          />
        </div>

        {isLoadingReview ? (
          <Loading height="440px" />
        ) : !!data?.totalCount ? (
          <>
            <div className="review-item-wrapper">
              {data?.items.map((v: Reviewed, index: number) => (
                <ReviewDetailItem data={v} key={index} orderBy={orderBy} />
              ))}
            </div>
            <div className="reviews-pagination">
              <Pagination total={data?.totalCount || 1} limit={limit} onChange={setReviewPage} />
            </div>
          </>
        ) : (
          <Nodata className="review-nodata">
            이 상품의 첫번째 리뷰를 작성해보세요.
            <br />
            리뷰 작성시 최대 {datailReviewData.photoReview}포인트를 드립니다.
          </Nodata>
        )}
      </div>
    </ProductReviewStyled>
  );
};

export default ProductReview;
