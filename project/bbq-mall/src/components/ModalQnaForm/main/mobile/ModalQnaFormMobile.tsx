'use client';

import { QueryObserverResult, useMutation, useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import leftArrow from '@/assets/images/components/left-arrow-gray.svg';
import gift from '@/assets/images/event/gift.png';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Divider from '@/components/Divider';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { modalOpenMessege } from '@/constant/categoryDetailRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { ProductInquiry } from '@/types';
import { CombinedProduct, Item, ModifyProductQnaBody } from '@/types/productDetail';

import { ModalQnaFormMobileStyled } from './styled';

export interface ModalQnaFormMobileProps {
  className?: string;
  isPopUp: boolean;
  slug: string;
  children?: ReactNode;
  open?: boolean;
  data?: ProductInquiry;
  inquiryNo: number;
  onChange: (v: number) => void;
  onClose: (v: boolean) => void;
  qnaRefetch: () => Promise<QueryObserverResult<{ items: Item[]; totalCount: number }, Error>>;
}

const ModalQnaFormMobile = ({
  className,
  isPopUp,
  slug,
  data,
  inquiryNo,
  onChange,
  onClose,
  qnaRefetch,
}: ModalQnaFormMobileProps) => {
  const isEditMode = !!inquiryNo;
  const [hasContent, setHasContent] = useState<{
    title: string | undefined;
    content: string | undefined;
  }>({
    title: undefined,
    content: undefined,
  });

  const { handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: data?.title || '',
      content: data?.content || '',
      secreted: data?.secreted || false,
    },
  });
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);

  const { data: productsData } = useQuery({
    queryKey: [`/products/${slug}`],
    queryFn: async () => {
      const { data: productDetailData } = await customAxios(
        PLATFORMLIST.MOBILE_WEB,
      ).get<CombinedProduct>(`/products/${slug}`);

      return productDetailData;
    },
  });

  const { mutateAsync: qnaDataMutat } = useMutation({
    mutationFn: ({ body }: { body: ModifyProductQnaBody }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).post(`/products/${slug}/inquiries`, body),
  });

  const { mutateAsync: qnaUpdateMutate } = useMutation({
    mutationFn: async ({ body }: { body: ModifyProductQnaBody }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).put(`/products/inquiries/${inquiryNo}`, body),
  });

  const handClose = () => {
    onClose(true);
    onChange(0);
  };

  const titleValue = watch('title');
  const contentValue = watch('content');
  const contenSecreted = watch('secreted');

  useEffect(() => {
    if (isPopUp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isPopUp]);

  if (!isPopUp) {
    return null;
  }
  return (
    <ModalQnaFormMobileStyled className={clsx('ModalQnaFormMobile', className)}>
      <div className="header-title-inner">
        <Image
          src={leftArrow}
          alt="left-arrow"
          width={24}
          height={24}
          onClick={() => {
            handClose();
          }}
        />
        <h2>{isEditMode ? '상품 문의 수정하기' : '상품문의하기'}</h2>
      </div>
      <Divider.Mobile />
      <div className="qna-wraper">
        <div className="qna-header">
          <div className="qna-product-info">
            <Image
              width={72}
              height={72}
              src={productsData?.baseInfo ? 'https:' + productsData?.baseInfo?.imageUrls[0] : gift}
              alt={productsData?.baseInfo ? productsData?.baseInfo?.productName : '상품 이름'}
            />
            <p className="productname">{productsData?.baseInfo.productName}</p>
          </div>
        </div>
        <div className="qna-body">
          <form
            onSubmit={handleSubmit(async data => {
              const body = {
                title: data.title,
                content: data.content,
                productNo: Number(slug),
                secreted: data.secreted,
                type: 'PRODUCT',
              };

              let errorMessage: null | string = null;
              if (!body.title) {
                errorMessage = '제목을 작성해주세요';
              }

              if (!body.content || body.content.length < 10) {
                errorMessage = '내용을 10글자 이상 작성해주세요.';
              }

              isEditMode ? await qnaUpdateMutate({ body }) : await qnaDataMutat({ body });
              await qnaRefetch();

              setConfirmModalOpen({
                open: true,
                content: modalOpenMessege.messageQnaRegistration,
                onOk: async () => {
                  resetOpenConfirm();
                  handClose();
                },
              });
            })}
          >
            <div className="form-inner">
              <Input.Mobile
                maxLength={50}
                placeholder="제목을 입력해주세요"
                value={titleValue}
                onChange={e => {
                  setValue('title', e.target.value);
                  setHasContent(prevState => ({ ...prevState, title: e.target.value }));
                }}
              />

              {isEditMode ? (
                data?.content !== undefined && (
                  <>
                    <Textarea
                      placeholder="내용을 입력해주세요 (최소 10자 이상)"
                      maxLength={1500}
                      defaultValue={contentValue}
                      onChange={e => {
                        setValue('content', e.target.value);
                        setHasContent(prevState => ({ ...prevState, content: e.target.value }));
                      }}
                    />
                  </>
                )
              ) : (
                <Textarea
                  placeholder="내용을 입력해주세요 (최소 10자 이상)"
                  maxLength={1500}
                  defaultValue={contentValue}
                  onChange={e => {
                    setValue('content', e.target.value);
                    setHasContent(prevState => ({ ...prevState, content: e.target.value }));
                  }}
                />
              )}

              <div className="qna-product-info-left">
                <Checkbox
                  label="비밀글로 문의하기"
                  onChange={e => setValue('secreted', e.target.checked)}
                  checked={contenSecreted ?? false}
                />
              </div>
            </div>

            <div className="qna-footer">
              <Button
                className="qna-cancel"
                size="big"
                type="button"
                onClick={() => {
                  resetOpenConfirm();
                  handClose();
                }}
              >
                취소
              </Button>

              {isEditMode ? (
                <Button
                  disabled={!hasContent.title || (hasContent.content?.length ?? 0) < 10}
                  className="qna-registration"
                  styleType="main"
                  size="big"
                >
                  수정
                </Button>
              ) : (
                <Button
                  disabled={!hasContent.title || (hasContent.content?.length ?? 0) < 10}
                  className="qna-registration"
                  styleType="main"
                  size="big"
                >
                  등록
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </ModalQnaFormMobileStyled>
  );
};

export default ModalQnaFormMobile;
