import { FC } from 'react';

import { CheckBox, Flex, Grid, Input, RadioBox, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { FONTSIZE_12, FONTSIZE_18, PLANCK } from '@/constants';

export const ProductListFilterPopupDesktop: FC<{}> = () => {
  return (
    <Flex.CCS full padding={PLANCK * 3} style={{ maxWidth: 560 }}>
      <Text size={FONTSIZE_18}>정렬 순서</Text>
      <Space.H3 />
      <Grid gap={PLANCK * 5} columnCount={4}>
        <RadioBox label={'판매순'} checked={false} onClick={() => {}} />
        <RadioBox label={'가격낮은순'} checked={true} onClick={() => {}} />
        <RadioBox label={'가격높은순'} checked={false} onClick={() => {}} />
        <RadioBox label={'좋아요순'} checked={false} onClick={() => {}} />
      </Grid>
      <Space.H8 />
      <Text size={FONTSIZE_18}>혜택</Text>
      <Space.H3 />
      <Grid gap={PLANCK * 5} columnCount={4}>
        <CheckBox label={'무료배달'} checked={true} onClick={() => {}} />
        <CheckBox label={'할인행사'} checked={false} onClick={() => {}} />
        <CheckBox label={'쿠폰적용가능'} checked={false} onClick={() => {}} />
      </Grid>
      <Space.H8 />
      <Flex.RSE>
        <Text size={FONTSIZE_18}>키워드</Text>
        <Space.V1 />
        <Text size={FONTSIZE_12}>(제품명, 제품설명등에 있는 키워드를 불러옵니다.)</Text>
      </Flex.RSE>
      <Space.H3 />
      <Input shadow={true} placeholder={'Search'} value={''} onChange={() => {}} />
      <Space.H5 />
      <Flex.RCC full>
        <Button
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
