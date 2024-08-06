import { FC } from 'react';

import { Box, Container, Flex, Icon, Image, RadioBox, Space, Text } from '@/components/atoms';
import { COLOR_WHITE, FONTSIZE_20 } from '@/constants';

const Head: FC<{}> = () => {
  return (
    <Image
      src={'quickorder/background.jpg'}
      backgroundPosition="center"
      backgroundSize="cover"
      width={'100%'}
      height={140}
    >
      <Flex.CCS full>
        <Container>
          <Container.Body>
            <Flex.RSC>
              <Text size={100} weight={900} color={COLOR_WHITE}>
                퀵오더
              </Text>
              <Space.V4 />
              <Text size={FONTSIZE_20} color={COLOR_WHITE} lineHeight={'1.3em'}>
                이제 퀵오더로 빠르게 주문 가능!
                <br />
                주문이력에서 퀵오더만 등록하면
                <br />
                BBQ 주문이 순!식!간!에!
              </Text>
            </Flex.RSC>
          </Container.Body>
        </Container>
      </Flex.CCS>
    </Image>
  );
};

export default Head;
