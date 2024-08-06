'use client';

import styled from 'styled-components';

export const SortByButtonMobileStyled = styled.select`
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  font-size: 1.15rem;
  padding: 0.675em 2em 0.675em 0.8em;
  border: 1px solid #caced1;
  border-radius: 0.25rem;
  cursor: pointer;
  color: ${props => props.theme.colors.gray333};
  background-color: ${props => props.theme.colors.white};
  ${props => props.theme.fontStyle['body02-3']};
`;
