'use client';

import { QueryObserverResult, useMutation, useQuery } from '@tanstack/react-query';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import close from '@/assets/images/components/close.svg';
import gift from '@/assets/images/event/gift.png';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { modalOpenMessege } from '@/constant/categoryDetailRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { ProductInquiry } from '@/types';
import { CombinedProduct, Item, ModifyProductQnaBody } from '@/types/productDetail';

import { ModalQnaFormStyled } from './styled';

export interface ModalQnaFormProps {
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

const ModalQnaForm = ({
  className,
  isPopUp,
  slug,
  data,
  inquiryNo,
  onChange,
  onClose,
  qnaRefetch,
}: ModalQnaFormProps) => {
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
      const { data: productDetailData } = await customAxios(PLATFORMLIST.PC).get<CombinedProduct>(
        `/products/${slug}`,
      );

      return productDetailData;
    },
  });

  const { mutateAsync: qnaDataMutat } = useMutation({
    mutationFn: ({ body }: { body: ModifyProductQnaBody }) =>
      customAxios(PLATFORMLIST.PC).post(`/products/${slug}/inquiries`, body),
  });

  const { mutateAsync: qnaUpdateMutate } = useMutation({
    mutationFn: async ({ body }: { body: ModifyProductQnaBody }) =>
      customAxios(PLATFORMLIST.PC).put(`/products/inquiries/${inquiryNo}`, body),
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
    <ModalQnaFormStyled className={clsx('ModalQnaForm', className)}>
      <div className="qna-wraper">
        <div className="qna-header">
          <div className="qna-title-inner">
            <h4 className="qna-title">{isEditMode ? '상품 문의 수정하기' : '상품문의하기'}</h4>
            <Image width={24} height={24} src={close} alt="닫기" onClick={handClose} />
          </div>
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

              if (errorMessage) {
                return setConfirmModalOpen({
                  open: true,
                  content: errorMessage,
                  onOk: resetOpenConfirm,
                });
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
              <Input
                label="제목"
                required
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
                      label="내용"
                      required
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
                  label="내용"
                  required
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
    </ModalQnaFormStyled>
  );
};

export default ModalQnaForm;
