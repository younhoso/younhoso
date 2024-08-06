import { signOut } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { AccountAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { useModal } from '@/components/molecules';
import { InputNewPasswordPopup, SelectBirthPopup, useCIModal } from '@/components/organisms';
import { MyPageInformationPageForm, MyPageInformationPageTemplate } from '@/components/templates';
import { useAuth, useCookie } from '@/hooks';
import { copyDeep, parseApiError } from '@/utils';

export default function MyPageHome() {
  const { openCIModal, closeCIModal } = useCIModal();
  const router = useRouter();
  const { session, member, memberLoadingStatus } = useAuth();
  const { reset } = useCookie();
  const { openModal } = useModal();

  const [form, setForm] = useState<MyPageInformationPageForm>({
    username: '',
    oldPassword: '',
    password: '',
    name: '',
    email: '',
    phoneNumber: '',
    birth: undefined,
    gender: undefined,
    agreeEmail: false,
    agreeSms: false,
  });
  const [previousForm, setPreviousForm] = useState<MyPageInformationPageForm>(copyDeep(form));

  // 세션이 무효가 됐는지 체크
  // useAuth AuthProvider에서 useEffect로 대체 // 240306
  /*
  useEffect(() => {
    if (!router.isReady) return;
    if (typeof session === "undefined") return;
    if (typeof member === "undefined") return;
    if (
      session &&
      session.type === "member" &&
      !member &&
      memberLoadingStatus === "hasError"
    ) {
      signOut()
        .then(() => {
          window.location.href = "/reset";
        })
        .catch((err) => {
          console.error(err);
          alert(parseApiError(err).message);
          window.location.href = "/reset";
        });
    }
  }, [session, member, memberLoadingStatus, router.isReady]);
  */

  // 기본 데이터 설정
  useEffect(() => {
    if (member) {
      const data = {
        username: member.username,
        oldPassword: form.oldPassword,
        password: form.password,
        name: member.name,
        email: member.email ?? '',
        phoneNumber: member.phoneNumber,
        birth: member.birth,
        gender: member.gender,
        agreeEmail: !!member.emailMarketingAgreedAt,
        agreeSms: !!member.smsMarketingAgreedAt,
      };

      setForm(data);
      setPreviousForm(copyDeep(data));
    }
  }, [member]);

  // 비밀번호 변경 버튼 클릭 이벤트
  const handleChangePasswordButtonClick = useCallback(() => {
    openModal({
      title: '비밀번호 변경',
      body: (
        <InputNewPasswordPopup
          setOldPasswordAndNewPassword={({ oldPassword, newPassword }) =>
            setForm({
              ...form,
              password: newPassword,
              oldPassword: oldPassword,
            })
          }
        />
      ),
    });
  }, [form]);

  // 날짜 input 클릭 이벤트
  const handleVerifyPhoneButtonClick = useCallback(() => {
    openCIModal({
      onSuccess: ({ ciToken }) => {
        closeCIModal();
        AccountAPI.Member.CI.set({
          ciToken,
        })
          .then(() => {
            setForm({
              ...form,
              phoneNumber: '본인 인증 완료 (수정 완료시 저장됩니다)',
              ciToken: ciToken,
            });
          })
          .catch(error => {
            console.error(error);
            alert(parseApiError(error).message);
          });
      },
      onCancel: () => {
        closeCIModal();
      },
      onError: ({ error }) => {
        closeCIModal();
        console.error(error);
        alert(parseApiError(error).message);
      },
    });
  }, [form]);

  // 날짜 input 클릭 이벤트
  const handleChangeDateButtonClick = useCallback(() => {
    openModal({
      title: '생일 입력',
      body: (
        <SelectBirthPopup
          birth={form && form.birth && form.birth.length ? form.birth : undefined}
          setBirth={(value: string) => setForm({ ...form, birth: value })}
        />
      ),
    });
  }, [form]);

  const submitButtonDisabled = useMemo<boolean>(() => {
    if (form.username !== previousForm.username) return false;
    if (form.password !== previousForm.password) return false;
    if (form.name !== previousForm.name) return false;
    if (form.email !== previousForm.email) return false;
    if (form.phoneNumber !== previousForm.phoneNumber) return false;
    if (form.birth !== previousForm.birth) return false;
    if (form.gender !== previousForm.gender) return false;
    if (form.agreeEmail !== previousForm.agreeEmail) return false;
    if (form.agreeSms !== previousForm.agreeSms) return false;

    return true;
  }, [form, previousForm]);

  const handleSubmitButtonClick = useCallback(async () => {
    if (submitButtonDisabled || !member) return;

    try {
      // 비밀번호 변경
      if (form.password && form.password.length && form.oldPassword && form.oldPassword.length) {
        await AccountAPI.Member.modifyPassword({
          oldPassword: form.oldPassword,
          newPassword: form.password,
        });
      }

      // 휴대폰 번호 변경
      if (form.ciToken) {
        await AccountAPI.Member.CI.set({
          ciToken: form.ciToken,
        });
      }

      // 다른 정보들 변경
      if (
        (form.birth && form.birth !== previousForm.birth) ||
        (form.gender && form.gender !== previousForm.gender) ||
        (form.email && form.email !== previousForm.email) ||
        form.agreeEmail !== previousForm.agreeEmail ||
        form.agreeSms !== previousForm.agreeSms
      ) {
        await AccountAPI.Member.modify({
          email: form.email && form.email !== previousForm.email ? form.email : member.email!,
          birth: form.birth && form.birth !== previousForm.birth ? form.birth : member.birth!,
          gender: form.gender && form.gender !== previousForm.gender ? form.gender : member.gender!,
          isSmsMarketingAgreed:
            form.agreeSms !== previousForm.agreeSms ? form.agreeSms : !!member.smsMarketingAgreedAt,
          isEmailMarketingAgreed:
            form.agreeEmail !== previousForm.agreeEmail
              ? form.agreeEmail
              : !!member.emailMarketingAgreedAt,
          isPushMarketingAgreed: !!member.pushMarketingAgreedAt,
        });
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(parseApiError(error).message);
    }
  }, [member, form, previousForm, submitButtonDisabled]);

  // 탈퇴 버튼 클릭
  const handleResignButtonClick = useCallback(async () => {
    if (!confirm('정말 탈퇴하시겠습니까?')) return;

    try {
      await AccountAPI.Member.resign();
      reset();
      alert('탈퇴되었습니다.\n이용해주셔서 감사합니다.');
      await signOut();
      window.location.href = '/member/login';
    } catch (err) {
      console.error(err);
      alert(parseApiError(err).message);
    }
  }, []);

  if (!member) {
    return null;
  }

  const props = {
    form: form,
    setForm: setForm,
    handleChangeDateButtonClick: handleChangeDateButtonClick,
    handleVerifyPhoneButtonClick: handleVerifyPhoneButtonClick,
    handleChangePasswordButtonClick: handleChangePasswordButtonClick,
    submitButtonDisabled: submitButtonDisabled,
    handleSubmitButtonClick: handleSubmitButtonClick,
    handleResignButtonClick: handleResignButtonClick,
    memberId: member.memberId,
  };

  return (
    <>
      <Desktop>
        <MyPageInformationPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <MyPageInformationPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
