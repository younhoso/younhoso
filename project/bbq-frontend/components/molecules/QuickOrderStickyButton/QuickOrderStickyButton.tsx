import React, { FC, ReactNode } from 'react';

import Link from 'next/link';

import classNames from 'classnames';
import styled from 'styled-components';

import { Container, Image } from '@/components/atoms';
import { HEADER_HEIGHT } from '@/constants';
import { useAuth } from '@/hooks';

export interface QuickOrderStickyButtonProps {}

export interface QuickOrderStickyButtonComponentProps extends QuickOrderStickyButtonProps {
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

const QuickOrderStickyButton: FC<QuickOrderStickyButtonComponentProps> = ({
  items,
  className,
  ...rest
}) => {
  const { member } = useAuth();

  if (!member) return null;

  return (
    <Wrapper className={classNames(className)} {...rest}>
      <CustomContainer>
        <Sticky>
          <StyledLink href="/quickorder">
            <Image src="quickorder/quick-order-button.png" width={113} />
          </StyledLink>
        </Sticky>
      </CustomContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: red;
  z-index: 1;
`;

const CustomContainer = styled(Container)`
  position: relative;
`;

const Sticky = styled.div`
  position: absolute;
  right: 0;
  top: ${HEADER_HEIGHT + 20}px;
  transform: translateX(calc(100% + 20px));
`;

const StyledLink = styled(Link)`
  position: relative;
`;

export default QuickOrderStickyButton;
