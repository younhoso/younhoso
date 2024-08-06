'use client';

import styled from 'styled-components';

export const LabelStyled = styled.span`
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.gray999};
  padding: 6px 12px;
  border-radius: 2em;
`;
