'use client';

import styled from 'styled-components';

export const LabelMobileStyled = styled.div`
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.gray999};
  padding: 6px 12px;
  border-radius: 2em;
  ${props => props.theme.fontStyle['body04-3']}
`;
