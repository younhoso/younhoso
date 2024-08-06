import { FC, ReactNode } from 'react';

import styled from 'styled-components';

import { Flex, Icon, Space, Text } from '@/components/atoms';
import { FONTSIZE_16, FONTSIZE_18, PLANCK } from '@/constants';
import { useSidebarCart } from '@/stores';

interface TitleProps {}

interface TitleComponentProps extends TitleProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

const Title: FC<TitleComponentProps> = props => {
  const { className, children, ...rest } = props;

  const { reset } = useSidebarCart();

  return (
    <Wrapper>
      <Flex.RSC layout={'auto auto 1 auto'}>
        <Icon src={'orderform-check.svg'} size={28} />
        <Space.V2 />
        <Text size={FONTSIZE_18} weight={700}>
          선택 항목
        </Text>
        <div onClick={() => reset()} style={{ cursor: 'pointer' }}>
          <Icon src={'close-circle-black.svg'} size={24} />
        </div>
      </Flex.RSC>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0;
`;

export default Title;
