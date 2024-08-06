'use client';

import styled from 'styled-components';

export const CardslideMobileStyled = styled.div`
  margin: 32px 0;
  padding-left: 20px;
  .mobile-cart-products {
    overflow-x: scroll;
    display: flex;
    gap: 10px;
    margin-top: 24px;
    padding-bottom: 32px;

    &::-webkit-scrollbar {
      height: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.colors.gray333};
    }
    &::-webkit-scrollbar-track {
      margin-right: 20px;
      background-color: ${props => props.theme.colors.grayaea};
    }

    > div {
      min-width: 156px;
      width: 156px;
    }
  }

  .all-view-inner {
    a {
      color: ${props => props.theme.colors.gray333};
      height: 156px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      justify-content: center;

      > p {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
`;
