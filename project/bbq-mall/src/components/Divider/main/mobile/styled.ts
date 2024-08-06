'use client';

import styled from 'styled-components';

export const DividerMobileStyled = styled.div<{ $backgroundColor?: string }>`
  width: 100%;
  height: 10px;
  background-color: ${props => props.$backgroundColor ?? '#f6f6f6'};
`;
