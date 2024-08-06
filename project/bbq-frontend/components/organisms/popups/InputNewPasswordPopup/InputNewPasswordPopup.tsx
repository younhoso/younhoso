import { useCallback, useMemo, useState } from 'react';

import { Box, Flex, Icon, Input, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { COLOR_RED, FONTSIZE_14, PLANCK } from '@/constants';
import { validatePassword } from '@/utils';

const InputNewPasswordPopup = ({
  setOldPasswordAndNewPassword,
}: {
  setOldPasswordAndNewPassword: (params: { oldPassword: string; newPassword: string }) => void;
}) => {
  const { closeModal } = useModal();

  const [form, setForm] = useState<{
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
  }>({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState<string>('');
  const [newPasswordConfirmErrorMessage, setNewPasswordConfirmErrorMessage] = useState<string>('');

  const submitButtonDisabled = useMemo<boolean>(() => {
    if (!form) return true;
    if (!form.oldPassword || !form.oldPassword.length) return true;
    if (!form.newPassword || !form.newPassword.length) return true;
    if (!form.newPasswordConfirm || !form.newPasswordConfirm.length) return true;
    if (form.newPassword !== form.newPasswordConfirm) return true;
    if (newPasswordErrorMessage && newPasswordErrorMessage.length) return true;
    if (newPasswordConfirmErrorMessage && newPasswordConfirmErrorMessage.length) return true;
    return false;
  }, [form, newPasswordErrorMessage, newPasswordConfirmErrorMessage]);

  const handleSubmitButtonClick = useCallback(() => {
    if (submitButtonDisabled) return;

    closeModal();
    setOldPasswordAndNewPassword({
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
    });
  }, [submitButtonDisabled, form]);

  // password input blur 이벤트
  const handlePasswordConfirmInputBlur = useCallback(async () => {
    if (
      form.newPassword.length &&
      form.newPasswordConfirm.length &&
      form.newPassword !== form.newPasswordConfirm
    ) {
      setNewPasswordConfirmErrorMessage('입력하신 비밀번호와 일치 하지 않습니다.');
    } else {
      setNewPasswordConfirmErrorMessage('');
    }
  }, [form]);

  // password input blur 이벤트
  const handlePasswordInputBlur = useCallback(async () => {
    if (form.newPassword.length && !validatePassword(form.newPassword)) {
      setNewPasswordErrorMessage('영문+특수문자 포함 8자이상 (조건이 맞지 않습니다.)');
    } else if (form.newPassword === form.oldPassword) {
      setNewPasswordErrorMessage('이전 비밀번호와 같은 비밀번호를 사용할 수 없습니다.');
    } else {
      setNewPasswordErrorMessage('');
    }
    handlePasswordConfirmInputBlur();
  }, [form, handlePasswordConfirmInputBlur]);

  return (
    <Box full padding={PLANCK * 2}>
      <Space.H2 />
      <Text lineHeight={'1.25em'} align="center">
        기존 비밀번호 입력 후<br />
        새로운 비밀번호를 입력해 주세요.
      </Text>
      <Space.H6 />
      <Input
        type="password"
        shadow={true}
        prefix={
          <Flex.RCC>
            <Space.V2 />
            <Icon src={'lock-graypurple.svg'} size={24} />
          </Flex.RCC>
        }
        placeholder={'기존 비밀번호'}
        value={form.oldPassword}
        onChange={e => setForm({ ...form, oldPassword: e.target.value })}
      />
      <Space.H3 />
      <Input
        type="password"
        shadow={true}
        prefix={
          <Flex.RCC>
            <Space.V2 />
            <Icon src={'lock-graypurple.svg'} size={24} />
          </Flex.RCC>
        }
        placeholder={'새로운 비밀번호'}
        value={form.newPassword}
        onBlur={handlePasswordInputBlur}
        onChange={e => setForm({ ...form, newPassword: e.target.value })}
      />
      {!newPasswordErrorMessage.length ? (
        <>
          <Space.H1 />
          <Text size={FONTSIZE_14} color={'#8e93ad'}>
            ⚠ 영문+특수문자 포함 8자이상
          </Text>
        </>
      ) : null}
      {newPasswordErrorMessage.length ? (
        <>
          <Space.H1 />
          <Text size={FONTSIZE_14} color={COLOR_RED}>
            ⚠ {newPasswordErrorMessage}
          </Text>
        </>
      ) : null}
      <Space.H3 />
      <Input
        type="password"
        shadow={true}
        prefix={
          <Flex.RCC>
            <Space.V2 />
            <Icon src={'lock-checked-graypurple.svg'} size={24} />
          </Flex.RCC>
        }
        placeholder={'새로운 비밀번호 재입력'}
        value={form.newPasswordConfirm}
        onBlur={handlePasswordConfirmInputBlur}
        onChange={e => setForm({ ...form, newPasswordConfirm: e.target.value })}
      />
      {newPasswordConfirmErrorMessage.length ? (
        <>
          <Space.H1 />
          <Text size={FONTSIZE_14} color={COLOR_RED}>
            ⚠ {newPasswordConfirmErrorMessage}
          </Text>
        </>
      ) : null}
      <Space.H3 />
      <Button
        disabled={submitButtonDisabled}
        full
        color="red"
        shape="round"
        text="확인"
        onClick={handleSubmitButtonClick}
        style={{ height: 50 }}
      />
    </Box>
  );
};

export { InputNewPasswordPopup };
