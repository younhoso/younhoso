'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import dayjs from 'dayjs';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import lock from '@/assets/images/my/lock.svg';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import Textarea from '@/components/Textarea';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { PcMyInquiryDetailPageStyled } from '@/styles/pageStyled/pc/pcMyInquiryDetailPageStyled';
import { ModifyProductInquiryBody, ProductInquiry } from '@/types';

const PcMyInquiryDetail = ({
  params: { productNo, inquiryNo },
}: {
  params: { productNo: string; inquiryNo: string };
}) => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);
  const [open, setOpen] = useState(false);
  const [modifyItem, setModifyItem] = useState<ModifyProductInquiryBody | undefined>(undefined);
  const router = useRouter();
  let { data, refetch } = useQuery({
    queryKey: [`/products/${productNo}/inquiries/${inquiryNo}`],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<ProductInquiry>(key),
  });

  const { mutateAsync } = useMutation({
    mutationFn: () => customAxios(PLATFORMLIST.PC).delete(`/products/inquiries/${inquiryNo}`),
  });

  const { mutateAsync: modify } = useMutation({
    mutationFn: (body: ModifyProductInquiryBody & { type: 'PRODUCT' }) =>
      customAxios(PLATFORMLIST.PC).put(`/products/inquiries/${inquiryNo}`, body),
  });

  useEffect(() => {
    if (data) {
      setModifyItem({
        title: data.data.title,
        content: data.data.content,
        secreted: data.data.secreted,
      });
    }
  }, [data]);

  return (
    <PcMyInquiryDetailPageStyled>
      <div className="inquiry-item-info">
        <Image src={'https:' + data?.data.imageUrl} width={84} height={84} alt="image" />
        <div>
          <div>
            <div>{data?.data.productName}</div>
            <div className={clsx(data?.data.replied && 'replied')}>
              {data?.data.replied ? '답변완료' : '답변대기'}
            </div>
          </div>
          <div>
            {data?.data.title}
            {data?.data.secreted && <Image src={lock} width={20} height={20} alt="lock" />}
          </div>
        </div>
      </div>
      <div className="inquiry-item-content">
        <div>
          <div>Q</div>
          <div>
            <p>{data?.data.content}</p>
          </div>
        </div>
        {data?.data.answers?.map(v => (
          <div key={v.inquiryNo}>
            <div>A</div>
            <div>
              <p>{v.content}</p>
              <div>
                <div>{v.memberId ?? '비비큐 몰'}</div>
                <div>{dayjs(new Date(v.registerYmdt)).format('YYYY.MM.DD')}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="inquiry-button-wrapper">
        <Button
          size="small"
          disabled={!!data?.data.answers?.length}
          onClick={async () => {
            setConfirmModalOpen({
              open: true,
              content: '정말 삭제하시겠습니까?',
              onCancel: resetConfirmModalOpen,
              onOk: async () => {
                try {
                  await mutateAsync();
                  resetConfirmModalOpen();
                  router.push('/my/inquiry');
                } catch (e: any) {
                  setConfirmModalOpen({
                    open: true,
                    content: e.response.data.message,
                    onOk: resetConfirmModalOpen,
                  });
                }
              },
            });
          }}
        >
          삭제
        </Button>
        <Button size="small" onClick={() => setOpen(true)} disabled={!!data?.data.answers?.length}>
          수정
        </Button>
        <Button size="small" onClick={() => router.push('/my/inquiry')}>
          목록
        </Button>
      </div>

      {modifyItem && (
        <Modal
          closeOnClickOutside={false}
          open={open}
          onClose={() => setOpen(false)}
          title="상품문의하기"
          onOk={async () => {
            let errorMessage: null | string = null;
            if (!modifyItem.title) {
              errorMessage = '제목을 작성해주세요';
            }

            if (!modifyItem.content || modifyItem.content.length < 10) {
              errorMessage = '내용을 10글자 이상 작성해주세요.';
            }

            if (errorMessage) {
              return setConfirmModalOpen({
                open: true,
                content: errorMessage,
                onOk: resetConfirmModalOpen,
              });
            }

            await modify({ ...modifyItem, type: 'PRODUCT' });
            await refetch();
            setOpen(false);
            setConfirmModalOpen({
              open: true,
              content: '수정이 완료되었습니다.',
              onOk: resetConfirmModalOpen,
            });
          }}
          onCancel={() => setOpen(false)}
          onOkText="수정"
        >
          <div className="modal-item-info">
            <Image src={'https:' + data?.data.imageUrl} width={72} height={72} alt="image" />
            <div>{data?.data.productName}</div>
          </div>
          <div className="modal-input-wrapper">
            <Input
              label="제목"
              required
              placeholder="제목을 입력해주세요"
              defaultValue={modifyItem.title}
              onChange={e => setModifyItem({ ...modifyItem, title: e.target.value })}
            />
            <Textarea
              label="내용"
              required
              placeholder="내용을 입력해주세요 (최소 10자 이상)"
              maxLength={1500}
              defaultValue={modifyItem.content}
              onChange={e => setModifyItem({ ...modifyItem, content: e.target.value })}
            />
            <Checkbox
              label="비밀글로 문의하기"
              defaultChecked={modifyItem.secreted}
              onChange={e => setModifyItem({ ...modifyItem, secreted: e.target.checked })}
            />
          </div>
        </Modal>
      )}
    </PcMyInquiryDetailPageStyled>
  );
};

export default PcMyInquiryDetail;
