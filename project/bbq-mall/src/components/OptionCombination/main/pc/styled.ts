'use client';

import styled from 'styled-components';

export const OptionCombinationStyled = styled.div`
  .item {
    margin-top: 8px;
    margin-bottom: 8px;
    color: ${props => props.theme.colors.gray333};
    div {
      color: inherit;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
