'use client';

import styled from 'styled-components';

export const PcOrderPageStyled = styled.div`
  > h2 {
    ${props => props.theme.fontStyle['title02-2']};
    color: ${props => props.theme.colors.gray333};
    text-align: center;
    margin-bottom: 40px;
  }

  .order-content {
    display: flex;
    gap: 40px;
    overflow: visible;
    position: relative;

    .order-main {
      width: calc(100% - 40px - 400px);
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .order-brief {
      position: sticky;
      position: -webkit-sticky;
      z-index: 10;
      top: calc(40px + ${props => props.theme.sizes.headerHeight});
      height: 660px;
      display: flex;
      flex-direction: column;
      width: 400px;
      gap: 20px;

      .Button {
        &:disabled {
          background-color: ${props => props.theme.colors.red937} !important;
          border: 1px solid ${props => props.theme.colors.red937} !important;
        }
        width: 100%;
      }
    }
  }

  .radio-item {
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};
  }
`;
