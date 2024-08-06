'use client';

import styled from 'styled-components';

export const OrderSuccessItemStyled = styled.div`
  display: flex;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  .success-label {
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray666};
  }

  .success-children {
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray333};
  }
`;
