'use client';

import { Fragment, ReactNode, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';
import dayjs from 'dayjs';
import { pick } from 'dot-object';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import A from '@/assets/images/detail/A.svg';
import Q from '@/assets/images/detail/Q.svg';
import ButtonLink from '@/components/ButtonLink';
import Loading from '@/components/Loading';
import { modalOpenMessege } from '@/constant/categoryDetailRelated';
import { useHandleIsSignIn } from '@/hooks/useHandleIsSignIn';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { Item } from '@/types/productDetail';

import { ProductQnaTableStyled } from './styled';

export interface TableColumn<T = unknown> {
  label?: ReactNode;
  field: string;
  render?: (data: T, i: number) => ReactNode;
  alignStart?: boolean;
  width?: string;
}

export interface ProductQnaTableProps<T extends Item> {
  className?: string;
  columns: TableColumn<T>[];
  datas: T[];
  dataKey: keyof T;
  fullWidth?: boolean;
  emptyText?: ReactNode;
  loading?: boolean;
  memberNo?: number;
  handleEditClick: ({ inquiryNo }: { inquiryNo: number }) => void;
  handleDeleteClick: ({ inquiryNo }: { inquiryNo: number }) => void;
}

function ProductQnaTable({
  className,
  columns,
  datas,
  dataKey,
  fullWidth = false,
  emptyText = '데이터가 없습니다.',
  loading = false,
  memberNo,
  handleEditClick,
  handleDeleteClick,
}: ProductQnaTableProps<Item>) {
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

  if (!loading) {
    return <Loading height="440px" />;
  }

  return (
    <ProductQnaTableStyled className={clsx('ProductQnaTable', fullWidth && 'fullWidth', className)}>
      {datas?.length ? (
        <table>
          <thead>
            <tr>
              {columns.map((column, i) => (
                <td key={`${column.field}${i}`}>{column.label}</td>
              ))}
            </tr>
          </thead>

          <tbody>
            {datas.map((data, index) => {
              const isRowOpen = isOpen && isOpenRowData === data[dataKey];
              return (
                <Fragment key={data[dataKey] + `${index}`}>
                  <tr onClick={() => handleRowClick(data)}>
                    {columns.map((column, i) => (
                      <td
                        key={data[dataKey] + `${column.field}${i}`}
                        {...(column.width && { style: { width: column.width } })}
                      >
                        <div className={clsx('tdContent', column.alignStart && 'align-start')}>
                          {column.render ? column.render(data, index) : pick(column.field, data)}
                        </div>
                      </td>
                    ))}
                  </tr>
                  {isRowOpen && (
                    <tr className={clsx('main-text')}>
                      <td colSpan={columns.length}>
                        <p>
                          <Image src={Q} width={20} height={20} alt="Q" />
                          {data.myInquiry || !data.secreted ? data?.content : '비밀글입니다.'}
                        </p>

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
                                if (data.replied) {
                                  return setConfirmModalOpen({
                                    open: true,
                                    content: modalOpenMessege.messageQnaRepliedAlreadyDelete,
                                    onOk: () => {
                                      resetOpenConfirm();
                                    },
                                  });
                                }
                                setConfirmModalOpen({
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
                          ))}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="empty">{emptyText}</div>
      )}
    </ProductQnaTableStyled>
  );
}

export default ProductQnaTable;
