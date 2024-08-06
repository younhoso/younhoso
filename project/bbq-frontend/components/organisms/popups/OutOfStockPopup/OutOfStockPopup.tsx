import { Flex, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { PLANCK } from '@/constants';

export const OutOfStockPopup = () => {
  return (
    <Flex.CCC full padding={PLANCK * 3}>
      <Text align={'center'} lineHeight={`1.4em`}>
        선택하신 제품이
        <br />
        &apos;송파풍납점&apos;에서 품절된 상품입니다.
      </Text>
      <Space.H5 />
      <Text color={'red'}>품절상품 : 크런치 올치팝</Text>
      <Space.H6 />
      <Flex.RCC full gap={PLANCK * 1.5}>
        <Button
          full
          fill={false}
          shape={'round'}
          color={'#292a56'}
          disabled={true}
          text={'메뉴 다시 선택'}
        ></Button>
        <Button
          full
          fill={false}
          shape={'round'}
          color={'#292a56'}
          text={'다른 패밀리 선택'}
        ></Button>
      </Flex.RCC>
      <Space.H1_5 />
      <Flex.RCC full>
        <Button
          full
          color={`red`}
          shape={'round'}
          text={'주문 가능한 패밀리 자동 선택 후 결제'}
        ></Button>
      </Flex.RCC>
    </Flex.CCC>
  );
};
