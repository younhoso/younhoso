'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { pick } from 'lodash';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import ImageUpload from '@/components/ImageUpload';
import RateCheck from '@/components/RateCheck';
import Textarea from '@/components/Textarea';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { MobileMyEditReviewPageStyled } from '@/styles/pageStyled/mobile/mobileMyEditReviewPageStyled';
import { CreateReview, ModifyReview, Reviewed } from '@/types';

const MobileMyEditReview = ({ params: { productNo } }: { params: { productNo: string } }) => {
  const search = useSearchParams();
  const reviewNo = search.get('review');
  const router = useRouter();
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);

  const { mutateAsync } = useMutation({
    mutationFn: (body: CreateReview | ModifyReview) =>
      reviewNo
        ? customAxios(PLATFORMLIST.PC).put(
            `/products/${productNo}/product-reviews/${reviewNo}`,
            body,
          )
        : customAxios(PLATFORMLIST.PC).post(`/products/${productNo}/product-reviews`, body),
  });

  const { handleSubmit, getValues, setValue, watch } = useForm({
    defaultValues: async (): Promise<
      (CreateReview | ModifyReview) & { imageUrls: string[]; productName: string }
    > => {
      const object = {
        imageUrls: [],
        fileUrls: [],
        optionNo: search.get('option_no'),
        orderOptionNo: search.get('order_option_no'),
        rate: 5,
        content: '',
        productName: '',
      };

      const productData = await customAxios(PLATFORMLIST.MOBILE_WEB).get<{
        baseInfo: { imageUrls: string[]; productName: string };
      }>(`/products/${productNo}`);

      Object.assign(object, pick(productData.data.baseInfo, ['imageUrls', 'productName']));

      if (reviewNo) {
        const reviewData = await customAxios(PLATFORMLIST.MOBILE_WEB).get<Reviewed>(
          `/products/${productNo}/product-reviews/${reviewNo}`,
        );

        Object.assign(object, pick(reviewData.data, ['rate', 'fileUrls', 'content']));
      }

      return object;
    },
  });

  return (
    <MobileMyEditReviewPageStyled>
      <div className="review-product-info">
        <div className="info-image-wrapper">
          {getValues('imageUrls') && (
            <Image src={'https:' + getValues('imageUrls')[0]} width={72} height={72} alt="image" />
          )}
        </div>
        <div className="review-info-title">{getValues('productName')}</div>
      </div>
      <form
        onSubmit={handleSubmit(async data => {
          Object.assign(data, { urls: data.fileUrls });
          await mutateAsync(data);

          setConfirmModalOpen({
            content: `${reviewNo ? '수정' : '등록'}되었습니다.${reviewNo ? '' : '\n 작성한 리뷰로 이동하시겠습니까?'}`,
            open: true,
            ...(!reviewNo && {
              onCancel: () => {
                resetOpenConfirm();
                router.replace('/mobile/my/review/available');
              },
            }),
            onOk: () => {
              resetOpenConfirm();
              router.replace(
                reviewNo ? '/mobile/my/review/written' : '/mobile/my/review/available',
              );
            },
          });
        })}
      >
        <div className="rate-check">
          별점을 입력해주세요
          <RateCheck defaultValue={watch('rate')} onChange={e => setValue('rate', e)} />
        </div>
        {getValues('content') !== undefined && (
          <Textarea
            defaultValue={getValues('content')}
            onChange={e => setValue('content', e.target.value)}
            placeholder="상품에 맞는 후기를 작성해주세요(최소 10자 이상)"
            maxLength={1500}
          />
        )}
        {getValues('fileUrls') !== undefined && (
          <ImageUpload.Mobile
            defaultImageList={getValues('fileUrls')}
            onChangeImage={e => setValue('fileUrls', e)}
            additionalMent="상품과 무관하거나 반복되는 동일 단어/문장을 사용하여 리뷰로 볼 수 없는 글, 판매자와 고객의 리뷰 이용을 방해한다고 판단되는 경우, 배송 박스, 구매 상품을 구분할 수 없는 전체 사진, 화면캡쳐, 음란 및 부적절하거나 불법적인 내용은 통보없이 삭제 및 포인트가 회수될 수 있습니다."
          />
        )}
        <div className="review-button-wrapper">
          <Button size="micro" type="button" onClick={() => router.back()}>
            취소
          </Button>
          <Button size="micro" type="submit" styleType="main">
            등록
          </Button>
        </div>
      </form>
    </MobileMyEditReviewPageStyled>
  );
};

export default MobileMyEditReview;
