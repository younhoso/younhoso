'use client';

import { QueryObserverResult } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

import Image from 'next/image';

import clsx from 'clsx';
import dayjs from 'dayjs';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import lock from '@/assets/images/my/lock.svg';
import Nodata from '@/components/Nodata';
import Pagination from '@/components/Pagination';
import ProductQnaTable from '@/components/ProductQnaTable';
import { TableColumn } from '@/components/ProductQnaTable/main/pc/ProductQnaTable';
import { modalOpenMessege } from '@/constant/categoryDetailRelated';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { Item, inquiryData } from '@/types/productDetail';

import { ProductQnaStyled } from './styled';

export interface ProductQnaProps {
  className?: string;
  setIsPopUp: Dispatch<SetStateAction<boolean>>;
  setQnaPage: Dispatch<SetStateAction<number>>;
  handleEditClick: ({ inquiryNo }: { inquiryNo: number }) => void;
  handleDeleteClick: ({ inquiryNo }: { inquiryNo: number }) => void;
  limit: number;
  data?: inquiryData;
  memberNo?: number;
}

const ProductQna = ({
  className,
  setIsPopUp,
  setQnaPage,
  handleEditClick,
  handleDeleteClick,
  limit,
  data,
  memberNo,
}: ProductQnaProps) => {
  const { isSignIn } = useHandleIsSignIn();
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);

  const column: TableColumn<Item>[] = [
    {
      label: '제목',
      field: 'title',
      width: '733px',
      alignStart: true,
      render: data => (
        <div className={clsx(`title-wrapper`, data.secreted && 'secreted')}>
          {data.myInquiry || !data.secreted ? (
            <div>
              <p>{data.inquiryTitle}</p>
              <p>
                {data.title}
                {data.secreted && <Image src={lock} width={12} height={13} alt="lock" />}
              </p>
            </div>
          ) : (
            <div>
              <span>비밀글입니다.</span>
              <Image src={lock} width={12} height={13} alt="lock" />
            </div>
          )}
        </div>
      ),
    },
    {
      label: '작성자',
      field: 'registerName',
    },
    {
      label: '작성일',
      field: 'registerYmdt',
      render: data => dayjs(new Date(data.registerYmdt)).format('YYYY.MM.DD'),
    },
    {
      label: '답변상태',
      field: 'answers',
      render: data =>
        !data.replied ? (
          <div className="reply-wait">답변대기</div>
        ) : (
          <div className="reply-completed">답변완료</div>
        ),
    },
  ];

  return (
    <ProductQnaStyled className={clsx('ProductQna', className)}>
      <div className="qna-header">
        <p className="qna-title">상품문의</p>
        <p className="qna-description">
          구매하시려는 상품에 대해 궁굼한 점이 있으신 경우 문의해주세요.
          <br />
          배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 1:1 문의에 남겨주세요.
        </p>
      </div>
      <div className="qna-inner">
        <div className="review-count">
          <p>문의 {data?.totalCount}건</p>
          <button
            className="qna-button"
            onClick={async () => {
              if (!isSignIn) {
                return setConfirmModalOpen({
                  open: true,
                  content: modalOpenMessege.messageLogin,
                  onOk: resetOpenConfirm,
                });
              }
              setIsPopUp(true);
            }}
          >
            문의하기
          </button>
        </div>

        {data?.totalCount ? (
          <ProductQnaTable
            fullWidth
            columns={column}
            dataKey="inquiryNo"
            datas={data?.items ?? []}
            loading={false}
            emptyText="작성한 상품 문의가 없습니다."
            memberNo={memberNo}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        ) : (
          <Nodata className="qna-nodata">궁금한 점은 언제든 물어보세요.</Nodata>
        )}

        <div className="qna-pagination">
          {data?.totalCount ? (
            <Pagination total={data?.totalCount || 1} limit={limit} onChange={setQnaPage} />
          ) : null}
        </div>
      </div>
    </ProductQnaStyled>
  );
};

export default ProductQna;
