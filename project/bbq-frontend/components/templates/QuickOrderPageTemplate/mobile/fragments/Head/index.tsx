import { FC } from 'react';

import { Container, Flex, Image, Space, Text } from '@/components/atoms';
import { COLOR_WHITE, FONTSIZE_15 } from '@/constants';

const Head: FC<{}> = () => {
  return (
    <Image
      src={'quickorder/background.jpg'}
      backgroundPosition="center"
      backgroundSize="cover"
      width={'100%'}
      height={180}
    >
      <Flex.CCS full>
        <Container.Mobile>
          <Container.Mobile.Body>
            <Flex.CSS>
              <Text size={48} weight={900} color={COLOR_WHITE}>
                퀵오더
              </Text>
              <Space.H2 />
              <Text size={FONTSIZE_15} color={COLOR_WHITE} lineHeight={'1.3em'}>
                이제 퀵오더로 빠르게 주문 가능!
                <br />
                주문이력에서 퀵오더만 등록하면
                <br />
                BBQ 주문이 순!식!간!에!
              </Text>
            </Flex.CSS>
          </Container.Mobile.Body>
        </Container.Mobile>
      </Flex.CCS>
    </Image>
  );
};

export default Head;
