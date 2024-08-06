'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Header from '@/components/Header';
import ImageUpload from '@/components/ImageUpload';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Textarea from '@/components/Textarea';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { MobileInquiryEditPageStyled } from '@/styles/pageStyled/mobile/mobileInquiryEditPageStyled';
import { Inquiry, InquiryBody, InquiryType, MyData } from '@/types';

const MobileInquiryEdit = () => {
  const router = useRouter();
  const params = useSearchParams();
  const setOpenConfirm = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const inquiryNo = params.get('inquiry_no');
  const { register, handleSubmit, getValues, setValue, watch } = useForm({
    defaultValues: async (): Promise<InquiryBody> => {
      const { data } = await customAxios(PLATFORMLIST.MOBILE_WEB).get<MyData>('/profile');
      const {
        data: { inquiryType },
      } = await customAxios(PLATFORMLIST.MOBILE_WEB).get<{
        inquiryType: InquiryType[];
      }>('/malls');

      // if (!data.email) {
      //   setOpenConfirm({
      //     open: true,
      //     content: '이메일 등록 이후 문의 작성 가능합니다.\n 등록하러 가시겠습니까?',
      //     onOk: () => {
      //       handleGoMypage();
      //       resetOpenConfirm();
      //       setOpenConfirm({
      //         open: true,
      //         content: '이메일 등록 후 확인버튼을 눌러주세요.',
      //         onOk: () => {
      //           window.location.reload();
      //           resetOpenConfirm();
      //         },
      //       });
      //     },
      //     onCancel: () => {
      //       router.replace('/inquiry');
      //       resetOpenConfirm();
      //     },
      //   });
      // }

      const object = {
        memberName: data.memberName,
        mobileNo: data.mobileNo,
        email: data.email,
        // answerSmsSendYn: true,
        answerEmailSendYn: data.email ? true : false,
        inquiryTypeNo: inquiryType[0].inquiryTypeNo,
        inquiryTitle: '',
        inquiryContent: '',
        fileList: [],
        inquiryList: inquiryType,
      };

      if (inquiryNo) {
        try {
          const { data: inquiryData } = await customAxios(PLATFORMLIST.MOBILE_WEB).get<Inquiry>(
            `/inquiries/${inquiryNo}`,
          );
          Object.assign(object, {
            answerEmailSendYn: inquiryData.answerEmailSend,
            // answerSmsSendYn: inquiryData.answerSmsSend,
            inquiryTypeNo: inquiryData.inquiryType.inquiryTypeNo,
            inquiryTitle: inquiryData.inquiryTitle,
            inquiryContent: inquiryData.inquiryContent,
            fileList: inquiryData.originalImageUrls,
          });
        } catch (e) {
          router.replace('/inquiry');
          setOpenConfirm({
            open: true,
            content: '접근할 수 없습니다.',
            onOk: resetOpenConfirm,
          });
        }
      }

      return object;
    },
  });

  const inquiryTypeList = getValues('inquiryList')?.map(v => ({
    value: v.inquiryTypeNo,
    label: v.inquiryTypeName,
  }));

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (body: InquiryBody) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).post('/inquiries', body),
  });
  const { mutateAsync: modify, isPending: modifyPending } = useMutation({
    mutationFn: (body: InquiryBody) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).patch(`/inquiries/${inquiryNo}`, body),
  });

  return (
    <>
      <Header.Mobile title="1:1 문의" />
      <MobileInquiryEditPageStyled>
        <form
          onSubmit={handleSubmit(
            async body => {
              if (!body.inquiryContent || body.inquiryContent.length < 10) {
                return setOpenConfirm({
                  open: true,
                  content: '내용을 10자 이상 작성해주세요.',
                  onOk: resetOpenConfirm,
                });
              }
              try {
                Object.assign(
                  body,
                  inquiryNo
                    ? {
                        uploadedFileNames: body.fileList,
                        originalFileNames: body.fileList,
                      }
                    : {
                        uploadedFileName: body.fileList,
                        originalFileName: body.fileList,
                      },
                );
                if (inquiryNo) {
                  await modify(body);
                  router.replace(`/inquiry/detail/${inquiryNo}`);
                } else {
                  const res = await mutateAsync(body);
                  setOpenConfirm({
                    open: true,
                    content: '문의 작성이 완료되었습니다.\n 지금 확인하시겠습니까?',
                    onOk: () => {
                      router.replace(`/inquiry/detail/${res.data.inquiryNo}`);
                      resetOpenConfirm();
                    },
                    onCancel: () => {
                      router.replace('/inquiry');
                      resetOpenConfirm();
                    },
                  });
                }
              } catch (e: any) {
                return setOpenConfirm({
                  open: true,
                  content: e.response.data.message,
                  onOk: resetOpenConfirm,
                });
              }
            },
            error => console.error(error),
          )}
        >
          <Input.Mobile disabled {...register('memberName')} />
          <Input.Mobile disabled {...register('mobileNo')} />
          {/* {getValues('answerSmsSendYn') !== undefined && (
            <Checkbox
              label="SMS 알림 수신"
              onChange={e => setValue('answerSmsSendYn', e.target.checked)}
              defaultChecked={getValues('answerSmsSendYn')}
            />
          )} */}
          {getValues('email') && (
            <>
              <Input.Mobile
                disabled
                {...register('email', { required: true })}
                placeholder="이메일 주소를 입력해주세요"
              />
              {getValues('answerEmailSendYn') !== undefined && (
                <Checkbox
                  label="메일 알림 수신"
                  onChange={e => setValue('answerEmailSendYn', e.target.checked)}
                  defaultChecked={getValues('answerEmailSendYn')}
                />
              )}
            </>
          )}
          <div className="divider" />
          {inquiryTypeList && (
            <Select.Mobile
              disalbed={!!inquiryNo}
              optionList={inquiryTypeList}
              defaultValue={watch('inquiryTypeNo') ?? inquiryTypeList?.[0].value}
              onChange={e => setValue('inquiryTypeNo', e as number)}
              label="문의유형 선택"
            />
          )}
          <Input.Mobile
            {...register('inquiryTitle', { required: true })}
            placeholder="제목을 입력해주세요"
          />
          {getValues('inquiryContent') !== undefined && (
            <Textarea
              defaultValue={getValues('inquiryContent')}
              onChange={e => setValue('inquiryContent', e.target.value)}
              placeholder="문의하실 내용을 입력해주세요 (최소 10자 이상)"
              maxLength={1500}
            />
          )}
          {getValues('fileList') !== undefined && (
            <ImageUpload.Mobile
              defaultImageList={getValues('fileList')}
              onChangeImage={e => setValue('fileList', e)}
            />
          )}
          <div className="footer">
            <Button
              size="small"
              type="button"
              onClick={() => router.push(inquiryNo ? `/inquiry/detail/${inquiryNo}` : '/inquiry')}
            >
              취소
            </Button>
            <Button
              styleType="main"
              type="submit"
              size="small"
              disabled={isPending || modifyPending}
              isLoading={isPending || modifyPending}
            >
              {inquiryNo ? '수정' : '등록'}
            </Button>
          </div>
        </form>
      </MobileInquiryEditPageStyled>
    </>
  );
};

export default MobileInquiryEdit;
