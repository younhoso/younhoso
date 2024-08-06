import { useRouter } from 'next/router';

import { Flex, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { FONTSIZE_18, FONTSIZE_20, PLANCK } from '@/constants';

export const AlreadyRegisteredPopup = ({ username }: { username: string }) => {
  const { closeModal } = useModal();
  const router = useRouter();

  return (
    <Flex.CCC full padding={PLANCK * 2}>
      <Text size={FONTSIZE_18} lineHeight={'1.3em'} align="center">
        이미 가입된 계정이 있어요.
        <br />
        계정을 확인해주세요.
      </Text>
      <Space.H6 />
      <Text size={FONTSIZE_20} decoration="underline">
        {username}
      </Text>
      <Space.H6 />
      <Button
        full
        color="red"
        shape="round"
        text="기존 계정으로 로그인 할래요"
        onClick={() => {
          closeModal();
          router.push('/member/login');
        }}
        style={{ height: 50 }}
      />
      <Space.H2 />
      <Button
        full
        color="lightgray"
        shape="round"
        text="비밀번호를 잊어버렸어요"
        onClick={() => {
          closeModal();
          router.push('/member/find/change-password');
        }}
        style={{ height: 50 }}
      />
    </Flex.CCC>
  );
};
