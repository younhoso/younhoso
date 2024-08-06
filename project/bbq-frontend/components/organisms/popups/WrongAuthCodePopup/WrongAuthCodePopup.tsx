import { Flex, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { FONTSIZE_18, PLANCK } from '@/constants';

export const WrongAuthCodePopup = () => {
  const { closeModal } = useModal();

  return (
    <Flex.CCC full padding={PLANCK * 2}>
      <Text size={FONTSIZE_18} lineHeight={'1.3em'} align="center">
        잘못된 인증번호를
        <br />
        입력하셨어요.
      </Text>
      <Space.H6 />
      <Button
        full
        color="red"
        shape="round"
        text="다시 입력할게요"
        onClick={() => closeModal()}
        style={{ height: 50 }}
      />
    </Flex.CCC>
  );
};
