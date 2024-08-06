'use client';

import { useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import ImageUpload from '@/components/ImageUpload';
import RateCheck from '@/components/RateCheck';
import Textarea from '@/components/Textarea';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { CreateReview, ModifyReview, Reviewable } from '@/types';

import { ReviewWriteModalStyled } from './styled';

export interface ReviewWriteModalProps {
  className?: string;
  open: boolean;
  productData: Pick<Reviewable, 'productName' | 'imageUrl'>;
  reviewData?: ModifyReview;
  mutate: (data: CreateReview | ModifyReview) => Promise<unknown>;
  onClose: () => void;
  refetch?: () => Promise<unknown>;
}

const ReviewWriteModal = ({
  className,
  open,
  mutate,
  onClose,
  productData,
  reviewData,
  refetch,
}: ReviewWriteModalProps) => {
  const router = useRouter();
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const defaultValue = {
    fileUrls: [],
    optionNo: 0,
    orderOptionNo: 0,
    rate: 5,
    content: '',
  };
  const { handleSubmit, getValues, setValue, watch } = useForm({
    defaultValues: async (): Promise<CreateReview | ModifyReview> => ({
      ...defaultValue,
      ...productData,
      ...reviewData,
    }),
  });

  return (
    <ReviewWriteModalStyled
      open={open}
      title="리뷰 작성"
      onOkText="등록"
      onCancelText="취소"
      onCancel={onClose}
      onOk={() => {}}
      footer={null}
      maxHeight="1000px"
      onClose={onClose}
      className={clsx('ReviewWriteModal', className)}
      closeOnClickOutside={false}
    >
      <form
        onSubmit={handleSubmit(async data => {
          setConfirmModalOpen({
            content: `${reviewData ? '수정' : '등록'}하시겠습니까?`,
            open: true,
            onCancel: resetOpenConfirm,
            onOk: async () => {
              Object.assign(data, { urls: data.fileUrls });
              await mutate(data);
              await refetch?.();
              onClose();
              resetOpenConfirm();
              setConfirmModalOpen({
                content: `${reviewData ? '수정' : '등록'}되었습니다.${reviewData ? '' : '\n 작성한 리뷰로 이동하시겠습니까?'}`,
                open: true,
                ...(!reviewData && { onCancel: resetOpenConfirm }),
                onOk: () => {
                  resetOpenConfirm();
                  !reviewData && router.push('/my/review/written');
                },
              });
            },
          });
        })}
      >
        <div className="modal-product-wrapper">
          <Image src={'https:' + productData.imageUrl} width={72} height={72} alt="image" />
          {productData.productName}
        </div>
        <div className="modal-content">
          <div className="rate-wrapper">
            <div className="rate-label">
              별점<span>*</span>
            </div>
            <RateCheck defaultValue={watch('rate')} onChange={e => setValue('rate', e)} />
          </div>
          {getValues('content') !== undefined && (
            <Textarea
              label="내용"
              required
              placeholder="상품 특성에 맞는 후기를 작성해주세요 (최소 10자 이상)"
              maxLength={1500}
              defaultValue={getValues('content')}
              onChange={e => setValue('content', e.target.value)}
            />
          )}
          <div className="modal-wrapper">
            <div className="modal-wrapper-label">
              사진 첨부
              <p>{watch('fileUrls')?.length}/3</p>
            </div>
            {getValues('fileUrls') !== undefined && (
              <ImageUpload
                defaultImageList={getValues('fileUrls')}
                onChangeImage={e => setValue('fileUrls', e)}
              />
            )}
          </div>
        </div>
        <div className="form-button-wrapper">
          <Button type="button" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" styleType="sub">
            {reviewData ? '수정' : '등록'}
          </Button>
        </div>
      </form>
    </ReviewWriteModalStyled>
  );
};

export default ReviewWriteModal;
