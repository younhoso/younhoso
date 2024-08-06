import { CheckBox, Flex, Grid, Input, RadioBox, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { FONTSIZE_12, FONTSIZE_16, PLANCK } from '@/constants';

export const ProductListFilterPopupMobile = () => {
  return (
    <Flex.CCS full>
      <Text size={FONTSIZE_16}>정렬 순서</Text>
      <Space.H3 />
      <Grid gap={PLANCK * 2.5} columnCount={2}>
        <RadioBox.Mobile label={'판매순'} checked={false} onClick={() => {}} />
        <RadioBox.Mobile label={'가격낮은순'} checked={true} onClick={() => {}} />
        <RadioBox.Mobile label={'가격높은순'} checked={false} onClick={() => {}} />
        <RadioBox.Mobile label={'좋아요순'} checked={false} onClick={() => {}} />
      </Grid>
      <Space.H6 />
      <Text size={FONTSIZE_16}>혜택</Text>
      <Space.H3 />
      <Grid gap={PLANCK * 2.5} columnCount={2}>
        <CheckBox.Mobile label={'무료배달'} checked={true} onClick={() => {}} />
        <CheckBox.Mobile label={'할인행사'} checked={false} onClick={() => {}} />
        <CheckBox.Mobile label={'쿠폰적용가능'} checked={false} onClick={() => {}} />
      </Grid>
      <Space.H6 />
      <Flex.RSE>
        <Text size={FONTSIZE_16}>키워드</Text>
        <Space.V1 />
        <Text size={FONTSIZE_12}>(제품명, 제품설명등에 있는 키워드를 불러옵니다.)</Text>
      </Flex.RSE>
      <Space.H2 />
      <Input.Mobile shadow={true} placeholder={'Search'} value={''} onChange={() => {}} />
      <Space.H4 />
      <Flex.RCC full>
        <Button.Mobile
          fill={false}
          text={'위 조건으로 정렬'}
          color={'graypurple'}
          textColor={'black'}
          shape={'round'}
        />
      </Flex.RCC>
    </Flex.CCS>
  );
};
