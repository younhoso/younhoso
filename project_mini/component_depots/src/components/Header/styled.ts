'use client';

import styled from 'styled-components';

export const HeaderStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colors.gray7f7};
  border-right: 1px solid ${props => props.theme.colors.gray4e4};
`;
