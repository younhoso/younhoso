'use client';

import { Fragment, ReactNode, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';
import dayjs from 'dayjs';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import A from '@/assets/images/detail/A.svg';
import Q from '@/assets/images/detail/Q.svg';
import lock from '@/assets/images/my/lock.svg';
import ButtonLink from '@/components/ButtonLink';
import Loading from '@/components/Loading';
import { modalOpenMessege } from '@/constant/categoryDetailRelated';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { Item } from '@/types/productDetail';

import { ProductQnaTableMobileStyled } from './styled';

export interface ProductQnaTableMobileProps<T extends Item> {
  className?: string;
  datas: T[];
  dataKey: keyof T;
  fullWidth?: boolean;
  emptyText?: ReactNode;
  loading?: boolean;
  memberNo?: number;
  handleEditClick: ({ inquiryNo }: { inquiryNo: number }) => void;
  handleDeleteClick: ({ inquiryNo }: { inquiryNo: number }) => void;
}

const ProductQnaTableMobile = ({
  className,
  datas,
  dataKey,
  fullWidth = false,
  emptyText = '데이터가 없습니다.',
  loading = false,
  memberNo,
  handleEditClick,
  handleDeleteClick,
}: ProductQnaTableMobileProps<Item>) => {
  const { isSignIn } = useHandleIsSignIn();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRowData, setIsOpenRowData] = useState<string | null>(null);
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);

  const handleRowClick = (data: any) => {
    const dataKeyValue = data[dataKey];
    if (data.myInquiry || !data.secreted) {
      setIsOpenRowData(prev => (prev === dataKeyValue ? '' : dataKeyValue));
      setIsOpen(prev => (prev && isOpenRowData === dataKeyValue ? false : true));
    } else {
      setConfirmModalOpen({
        open: true,
        content: modalOpenMessege.messageQnaSecret,
        onOk: async () => {
          resetOpenConfirm();
        },
      });
    }
  };

  if (loading) {
    return <Loading height="240px" />;
  }

  return (
    <ProductQnaTableMobileStyled className={clsx('ProductQnaTableMobile', className)}>
      {datas?.map((data, index) => {
        const isRowOpen = isOpen && isOpenRowData === data[dataKey];
        return (
          <Fragment key={data[dataKey] + `${index}`}>
            <div className="qna-info-inner" onClick={() => handleRowClick(data)}>
              <div className="qna-info-left">
                <div className="qna-title">{data?.productName}</div>
                <div className="qna-item-info">
                  {data.myInquiry || !data.secreted ? (
                    <div className="nickname-inner">
                      <div className="nickname-title-inner">
                        <p className="qna-content">{data.title}</p>
                        {data.secreted && <Image src={lock} width={12} height={13} alt="lock" />}
                      </div>
                      <div className="qna-footer">
                        {!data.replied ? (
                          <div className="reply-wait">답변대기</div>
                        ) : (
                          <div className="reply-completed">답변완료</div>
                        )}
                        <span className="line"></span>
                        <span>{dayjs(data.registerYmdt).format('YYYY.MM.DD')} 작성</span>
                      </div>
                    </div>
                  ) : (
                    <div className="nickname-inner">
                      <div className="lock-text">
                        <p className="qna-content">비밀글입니다.</p>
                        <Image src={lock} width={12} height={13} alt="lock" />
                      </div>
                      <div className="qna-footer">
                        {!data.replied ? (
                          <div className="reply-wait">답변대기</div>
                        ) : (
                          <div className="reply-completed">답변완료</div>
                        )}
                        <span className="line"></span>
                        <span>{dayjs(data.registerYmdt).format('YYYY.MM.DD')} 작성</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isRowOpen && (
              <div className={clsx('main-text cursor')}>
                <div>
                  <div className="question-inner">
                    <Image src={Q} width={20} height={20} alt="Q" />
                    <p>{data.myInquiry || !data.secreted ? data?.content : '비밀글입니다.'}</p>
                  </div>

                  {data.registerNo === memberNo && (
                    <div className="update-inner">
                      <ButtonLink
                        onClick={() => {
                          if (!isSignIn) {
                            return setConfirmModalOpen({
                              open: true,
                              content: modalOpenMessege.messageLogin,
                              onOk: resetOpenConfirm,
                            });
                          }

                          data.replied
                            ? setConfirmModalOpen({
                                open: true,
                                content: modalOpenMessege.messageQnaRepliedAlreadyUpdate,
                                onOk: async () => {
                                  resetOpenConfirm();
                                },
                              })
                            : handleEditClick({ inquiryNo: data.inquiryNo });
                        }}
                      >
                        수정
                      </ButtonLink>
                      <ButtonLink
                        onClick={() => {
                          if (!isSignIn) {
                            return setConfirmModalOpen({
                              open: true,
                              content: modalOpenMessege.messageLogin,
                              onOk: resetOpenConfirm,
                            });
                          }
                          data.replied
                            ? setConfirmModalOpen({
                                open: true,
                                content: modalOpenMessege.messageQnaRepliedAlreadyDelete,
                                onOk: async () => {
                                  resetOpenConfirm();
                                },
                              })
                            : setConfirmModalOpen({
                                open: true,
                                content: modalOpenMessege.messageQnaDelete,
                                onOk: async () => {
                                  await handleDeleteClick({ inquiryNo: data.inquiryNo });
                                  resetOpenConfirm();
                                },
                                onCancel: resetOpenConfirm,
                              });
                        }}
                      >
                        삭제
                      </ButtonLink>
                    </div>
                  )}

                  {data?.answers &&
                    data?.answers.map((item, index) => (
                      <div key={item + `${index}`} className="answers-inner">
                        <>
                          <div className="answer">
                            <Image src={A} width={20} height={20} alt="A" />
                            <div key={item.content + `${index}`} className="answers">
                              {item?.content}

                              <div className="nickname-inner">
                                <span>{item.nickName}</span>
                                <span className="line"></span>
                                <span>{dayjs(item.registerYmdt).format('YYYY.MM.DD')}</span>
                              </div>
                            </div>
                          </div>
                        </>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
    </ProductQnaTableMobileStyled>
  );
};

export default ProductQnaTableMobile;
