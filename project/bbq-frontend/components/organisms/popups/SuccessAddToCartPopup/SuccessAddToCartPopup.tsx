import { useRouter } from 'next/router';

import { Flex, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { FONTSIZE_18, PLANCK } from '@/constants';
import { useQueryParams } from '@/hooks';

export const SuccessAddToCartPopup = () => {
  const router = useRouter();
  const { keepParams } = useQueryParams();
  const { closeModal } = useModal();

  return (
    <Flex.CCC full padding={PLANCK * 2}>
      <Text size={FONTSIZE_18} lineHeight={'1.3em'} align="center">
        장바구니에 추가했습니다.
      </Text>
      <Space.H6 />
      <Flex.RSC layout="1 1" gap={PLANCK * 2}>
        <Button
          full
          color="red"
          shape="round"
          text="계속 쇼핑하기"
          onClick={() => closeModal()}
          style={{ height: 50 }}
        />
        <Button
          full
          color="black"
          shape="round"
          text="장바구니로 이동하기"
          onClick={() => {
            closeModal();
            router.push(keepParams('/cart'));
          }}
          style={{ height: 50 }}
        />
      </Flex.RSC>
    </Flex.CCC>
  );
};
