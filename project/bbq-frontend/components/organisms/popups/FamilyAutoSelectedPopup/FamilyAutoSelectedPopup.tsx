import { Flex, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { COLOR_RED, FONTSIZE_16, FONTSIZE_20, PLANCK } from '@/constants';

export const FamilyAutoSelectedPopup = () => {
  return (
    <Flex.CCC full padding={PLANCK * 3}>
      <Text size={FONTSIZE_16}>‘송파풍납점’에서</Text>
      <Space.H2 />
      <Text size={FONTSIZE_20}>
        ‘
        <Text inline size={FONTSIZE_20} weight={'bold'} color={COLOR_RED}>
          패밀리타운점
        </Text>
        ’으로 변경 되었습니다.
      </Text>
      <Space.H5 />
      <Text color={'#292a56'} align={'center'} lineHeight={`1.4em`}>
        가격변동
        <br />
        배달비: 3,500원 → 4,000원
      </Text>
      <Space.H5 />
      <Flex.RCC full gap={PLANCK}>
        <Button
          full
          fill={false}
          text={'다른 패밀리 직접 선택'}
          color={'#292a56'}
          shape={'round'}
        />
        <Button full fill={true} text={'주문 하기'} color={'red'} shape={'round'} />
      </Flex.RCC>
    </Flex.CCC>
  );
};
