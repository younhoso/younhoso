import { Flex, Text, Title } from '@tremor/react';
import { useEffect, useState } from 'react';

import axios from 'axios';

import CustomButton from '@/app/components/CustomButton';

export default function RejectedIp({ closeModal }: { closeModal: () => void }) {
  const [ip, setIp] = useState();

  useEffect(() => {
    axios.get('https://geolocation-db.com/json/').then(res => {
      setIp(res.data.IPv4);
    });
  }, []);

  const requestAllowIp = () => {
    closeModal();
  };

  return (
    <Flex className="w-[auto]" flexDirection="col">
      <Title className="mb-5 !text-3xl">허용되지 않은 IP 입니다.</Title>
      <Text>허용된 IP에서만 접속이 가능합니다.</Text>
      <Text>최종관리자의 승인이 필요합니다.</Text>
      <Text className="my-5">IP : {ip}</Text>

      <CustomButton type="secondary" className="w-full mt-5" onClick={requestAllowIp}>
        IP 허용 요청하기
      </CustomButton>
    </Flex>
  );
}
