'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import PageTitle from '@/components/PageTitle';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { PcInquiryDetailPageStyled } from '@/styles/pageStyled/pc/pcInquiryDetailPageStyled';
import { Inquiry } from '@/types';

const PcInquiryDetail = ({ params: { inquiryNo } }: { params: { inquiryNo: string } }) => {
  const router = useRouter();
  const setOpenConfirm = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const { data } = useQuery({
    queryKey: [`/inquiries/${inquiryNo}`],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<Inquiry>(key),
  });
  const { mutateAsync } = useMutation({
    mutationFn: () => customAxios(PLATFORMLIST.PC).delete(`/inquiries/${inquiryNo}`),
  });

  return (
    <PcInquiryDetailPageStyled>
      <PageTitle
        title="1:1 문의"
        description="배송관련, 주문(취소/교환/환불) 관련 문의 및 요청사항을 남겨주세요."
      />

      <div className="inquiry-detail-title">
        <div>
          <div>{data?.data.inquiryTitle}</div>
          {data?.data.answer ? (
            <div className="reply-completed">답변완료</div>
          ) : (
            <div className="reply-wait">답변대기</div>
          )}
        </div>
        <div>
          <div>유형</div>
          <div>{data?.data.inquiryType.inquiryTypeName}</div>
        </div>
      </div>
      <div className="inquiry-detail-message">
        <div>
          <div className="message-icon">Q</div>
          <div className="message-main">
            {data?.data.inquiryContent.split('\n').map((v, i) => <p key={v + i}>{v}</p>)}
            {!!data?.data.originalImageUrls.length && (
              <div className="message-image-wrapper">
                {data?.data.originalImageUrls.map((v, i) => (
                  <Image key={v + i} src={'https:' + v} width={240} height={240} alt="image" />
                ))}
              </div>
            )}
          </div>
        </div>
        {data?.data.answer && (
          <div className="answer">
            <div className="message-icon">A</div>
            <div>
              <div
                className="message-main"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data?.data.answer.answerContent),
                }}
              />
              <div className="writer-info">
                <div>비비큐몰</div>
                <div>
                  {dayjs(new Date(data?.data.answer.answerRegisterYmdt)).format('YYYY.MM.DD')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="inquiry-detail-button-wrapper">
        <Button
          disabled={!!data?.data.answer}
          onClick={() =>
            setOpenConfirm({
              open: true,
              content: '정말 삭제하시겠습니까?',
              onCancel: resetOpenConfirm,
              onOk: async () => {
                await mutateAsync();
                resetOpenConfirm();
                router.replace('/inquiry');
              },
            })
          }
        >
          삭제
        </Button>
        <Button
          disabled={!!data?.data.answer}
          onClick={() => {
            router.push(`/inquiry/edit?inquiry_no=${inquiryNo}`);
          }}
        >
          수정
        </Button>
        <Button onClick={() => router.push('/inquiry')}>목록</Button>
      </div>
    </PcInquiryDetailPageStyled>
  );
};

export default PcInquiryDetail;
