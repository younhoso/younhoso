'use client';

import styled from 'styled-components';

export const FooterStyled = styled.div`
  width: 100%;
  position: static;
  &.mainFooter {
    position: fixed;
    bottom: 30px;
    .inner {
      color: ${props => props.theme.colors.white};
    }
  }
  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: ${props => props.theme.fontWeight.medium};
    span {
      font-weight: ${props => props.theme.fontWeight.bold};
    }
  }
`;
