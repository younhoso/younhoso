'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import Textarea from '@/components/Textarea';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { MobileMyInquiryEditPageStyled } from '@/styles/pageStyled/mobile/mobileMyInquiryEditPageStyled';
import { ModifyProductInquiryBody, ProductInquiry } from '@/types';

const MobileMyInquiryDetail = ({
  params: { productNo, inquiryNo },
}: {
  params: { productNo: string; inquiryNo: string };
}) => {
  const router = useRouter();
  const [modifyItem, setModifyItem] = useState<ModifyProductInquiryBody | undefined>(undefined);
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);

  let { data } = useQuery({
    queryKey: [`/products/${productNo}/inquiries/${inquiryNo}`],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.MOBILE_WEB).get<ProductInquiry>(key),
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

  const { mutateAsync: modify } = useMutation({
    mutationFn: (body: ModifyProductInquiryBody & { type: 'PRODUCT' }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).put(`/products/inquiries/${inquiryNo}`, body),
  });
  if (!data?.data) {
    return <Loading.Mobile />;
  }

  return (
    <MobileMyInquiryEditPageStyled>
      <div className="inquiry-edit-item-info">
        {data?.data.imageUrl && (
          <Image src={'https:' + data?.data.imageUrl} width={72} height={72} alt="image" />
        )}
        <div>{data?.data.productName}</div>
      </div>
      {modifyItem && (
        <>
          <Input.Mobile
            placeholder="제목을 입력해주세요"
            defaultValue={modifyItem.title}
            onChange={e => setModifyItem({ ...modifyItem, title: e.target.value })}
          />
          <Textarea.Mobile
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
          <div className="save-button-wrapper">
            <Button
              styleType="main"
              size="small"
              onClick={async () => {
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
                router.push('/my/inquiry');
              }}
            >
              저장하기
            </Button>
          </div>
        </>
      )}
    </MobileMyInquiryEditPageStyled>
  );
};

export default MobileMyInquiryDetail;
