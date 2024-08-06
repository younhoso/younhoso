'use client';

import styled from 'styled-components';

import { ToTopMobileProps } from './ToTopMobile';

export const ToTopMobileStyled = styled.div<Pick<ToTopMobileProps, '$show'>>`
  position: fixed;
  right: 20px;
  bottom: ${props => (props.$show ? `calc(${props.theme.sizes.navHeight} + 20px)` : 0)};
  opacity: ${props => (props.$show ? 1 : 0)};

  width: 45px;
  height: 45px;
  background-color: ${props => props.theme.colors.grayada};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-property: bottom, opacity;
  transition-duration: 0.3s;
`;
