'use client';

import styled from 'styled-components';

export const OrderContentItemMobileStyled = styled.div`
  display: flex;
  font-size: 15px;
  color: ${props => props.theme.colors.gray333};
  font-weight: 600;
  line-height: 20px;
  > div {
    &:first-child {
      width: 71px;
      min-width: 71px;
      font-weight: 500;
      color: ${props => props.theme.colors.gray666};
    }
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;
