'use client';

import { Dispatch, SetStateAction } from 'react';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Nodata from '@/components/Nodata';
import Pagination from '@/components/Pagination';
import ProductQnaTable from '@/components/ProductQnaTable';
import { modalOpenMessege } from '@/constant/categoryDetailRelated';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { Item, inquiryData } from '@/types/productDetail';

import { ProductQnaMobileStyled } from './styled';

export interface ProductQnaMobileProps {
  className?: string;
  setIsPopUp: Dispatch<SetStateAction<boolean>>;
  setQnaPage: Dispatch<SetStateAction<number>>;
  handleEditClick: ({ inquiryNo }: { inquiryNo: number }) => void;
  handleDeleteClick: ({ inquiryNo }: { inquiryNo: number }) => void;
  limit: number;
  data?: inquiryData;
  memberNo?: number;
}

const ProductQnaMobile = ({
  className,
  setIsPopUp,
  setQnaPage,
  handleEditClick,
  handleDeleteClick,
  limit,
  data,
  memberNo,
}: ProductQnaMobileProps) => {
  const { isSignIn } = useHandleIsSignIn();
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);

  return (
    <ProductQnaMobileStyled className={clsx('ProductQnaMobile', className)}>
      <div className="qna-header">
        <p className="qna-title">상품문의</p>
        <p className="qna-description">
          상품에 대해 궁굼한 점이 있으신 경우 문의해주세요.
          <br />
          배송관련, 주문(취소/교환/환불)관련
          <br /> 문의 및 요청사항은 1:1 문의에 남겨주세요.
        </p>
      </div>
      <div className="qna-inner">
        <div className="qna-count">
          <p className="qna-totalCount">문의 {data?.totalCount}건</p>
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
          <ProductQnaTable.Mobile
            dataKey="inquiryNo"
            datas={data?.items ?? []}
            loading={false}
            emptyText="작성한 상품 문의가 없습니다."
            memberNo={memberNo}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        ) : (
          <Nodata.Mobile className="qna-nodata">등록된 문의가 없습니다.</Nodata.Mobile>
        )}

        <div className="qna-pagination">
          {data?.totalCount ? (
            <Pagination total={data?.totalCount || 1} limit={limit} onChange={setQnaPage} />
          ) : null}
        </div>
      </div>
    </ProductQnaMobileStyled>
  );
};

export default ProductQnaMobile;
