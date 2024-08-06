import { Card, Flex, Text, Title } from '@tremor/react';

export default function ContentAppBoardEventDetail() {
  return (
    <>
      <Card className="mt-5 p-0">
        <Title className="border-b p-5">주문앱 이벤트 게시판</Title>
        <div className="p-5">
          <Card className="p-0">
            <Flex className="bg-gray-100 border-b p-3" justifyContent="start">
              <Text className="w-full">BBQ가 준비한 바삭한 선물! 따뜻한 픽업 프로모션!</Text>
              <Flex justifyContent="end" className="gap-5">
                <Text className="border-r pr-5">2023.09.01</Text>
                <Text className="border-r pr-5">bbq고객만족센터</Text>
                <Text className="pr-2">조회수 58,594</Text>
              </Flex>
            </Flex>
            <div className="h-[500px] bg-white"></div>
          </Card>
        </div>
      </Card>
    </>
  );
}
