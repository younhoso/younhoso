import { Component } from 'react';

import { Box, Flex, Icon, Input, Space, Text } from '@/components/atoms';
import { Desktop, Mobile } from '@/components/functions';
import { Button } from '@/components/molecules';
import { FONTSIZE_16, FONTSIZE_20, PLANCK } from '@/constants';
import { useMobile } from '@/hooks';

export const ChangeQuickOrderTitlePopup = () => {
  const isMobile = useMobile();

  return (
    <Flex.CSS full>
      <Box full padding={PLANCK * 3}>
        <Flex.CCC full>
          <Text size={FONTSIZE_20}>‘나의불금세트’</Text>
          <Space.H3 />
          <Text size={FONTSIZE_16} color={'#777777'}>
            에서 변경할 이름을 아래에서 입력하세요.
          </Text>
          <Space.H6 />
          <Desktop>
            <Input
              prefix={
                <Flex.RCC>
                  <Space.V2 />
                  <Icon src={'pencil-graypurple.svg'} size={24} />
                </Flex.RCC>
              }
              placeholder={'퀵오더 이름 입력 (예: 나의불금세트)'}
              value={''}
              onChange={() => {}}
            />
          </Desktop>
          <Mobile>
            <Input.Mobile
              prefix={
                <Flex.RCC>
                  <Space.V2 />
                  <Icon src={'pencil-graypurple.svg'} size={24} />
                </Flex.RCC>
              }
              placeholder={'퀵오더 이름 입력 (예: 나의불금세트)'}
              value={''}
              onChange={() => {}}
            />
          </Mobile>
          <Space.H3 />
          <Desktop>
            <Button full text="확인" color="red" shape={'round'} />
          </Desktop>
          <Mobile>
            <Button.Mobile full text="확인" color="red" shape={'round'} />
          </Mobile>
        </Flex.CCC>
      </Box>
    </Flex.CSS>
  );
};
