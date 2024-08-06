import { useState } from 'react';

import { Flex, Image, RadioBox, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { FONTSIZE_16, PLANCK } from '@/constants';

export const QrAndBarcodeScanPopup = () => {
  const { closeModal } = useModal();
  const [platform, setPlatform] = useState<'PLAYSTORE' | 'APPSTORE'>('PLAYSTORE');

  return (
    <Flex.CCC full padding={PLANCK * 3}>
      <Text size={FONTSIZE_16} color={'#777'} lineHeight={'1.5em'}>
        바코드 스캔 쿠폰 등록은 앱전용 서비스 입니다. 구글플레이, 앱스토어에서 [BBQ]앱을 설치 하신
        후 이용하시기 바랍니다.
      </Text>
      <Space.H6 />
      {platform === 'PLAYSTORE' ? (
        <Image
          src="qr/playstore.png"
          width={140}
          height={140}
          backgroundPosition="center"
          backgroundSize="contain"
        />
      ) : null}
      {platform === 'APPSTORE' ? (
        <Image
          src="qr/appstore.png"
          width={140}
          height={140}
          backgroundPosition="center"
          backgroundSize="contain"
        />
      ) : null}
      <Space.H4 />
      <Flex.RSC gap={PLANCK * 8}>
        <RadioBox
          checked={platform === 'PLAYSTORE'}
          onClick={() => {
            setPlatform('PLAYSTORE');
          }}
          label={'안드로이드'}
        />
        <RadioBox
          checked={platform === 'APPSTORE'}
          onClick={() => {
            setPlatform('APPSTORE');
          }}
          label={'아이폰'}
        />
      </Flex.RSC>
      <Space.H6 />
      <Button full color="red" shape="round" text="확인" onClick={() => closeModal()} />
    </Flex.CCC>
  );
};
