import { Flex, Text, Title } from '@tremor/react';

import CustomButton from '@/app/components/CustomButton';

export default function CouponReject() {
  return (
    <div className="w-[20vw] text-center pb-5">
      <Flex flexDirection="col">
        <Title className="!text-4xl">쿠폰발행 반려</Title>
        <Text className="my-5">
          요청받은 쿠폰발행을 반려합니다.
          <br />
          아래에 반려 사유를 적어주시기 바랍니다.
        </Text>
        <textarea className="border-2 bg-gray-200 p-3 rounded-md w-full" rows={5}></textarea>
        <CustomButton type={'quaternary'} className="mt-5 w-[200px]">
          <Title>쿠폰 반려 완료</Title>
        </CustomButton>
      </Flex>
    </div>
  );
}
