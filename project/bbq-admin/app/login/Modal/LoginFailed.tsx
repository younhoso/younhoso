import { Flex, Text, Title } from '@tremor/react';
import { useEffect, useState } from 'react';

import axios from 'axios';

import CustomButton from '@/app/components/CustomButton';

export default function LoginFailed({ closeModal }: { closeModal: () => void }) {
  const [ip, setIp] = useState();

  useEffect(() => {
    axios.get('https://geolocation-db.com/json/').then(res => {
      setIp(res.data.IPv4);
    });
  }, []);

  return (
    <Flex className="w-[auto]" flexDirection="col">
      <Title className="mb-5 !text-3xl">존재하지 않는 아이디</Title>
      <Text>입력하신 아이디는 존재하지 않습니다.</Text>
      <Text>오타확인 또는 관리자에게 문의 하시기 바랍니다.</Text>
      <Text className="my-5">ottaaccount</Text>

      <CustomButton type="secondary" className="w-full mt-5" onClick={closeModal}>
        확인
      </CustomButton>
    </Flex>
  );
}
