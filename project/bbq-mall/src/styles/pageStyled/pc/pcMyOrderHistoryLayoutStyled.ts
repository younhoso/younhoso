'use client';

import styled from 'styled-components';

export const PcMyOrderHistoryLayoutStyled = styled.div`
  .PageTitle {
    .Select {
      width: 111px;
    }
  }

  .Pagination {
    margin-top: 40px;
  }

  .go-shopping {
    margin: 0 auto;
    width: 400px;
    margin-top: 20px;
    > img {
      margin-right: 6px;
    }
  }

  .table-product-info {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;

    > div {
      > p {
        &:first-child {
          cursor: pointer;
          ${props => props.theme.fontStyle['body02-4']};
          color: ${props => props.theme.colors.gray333};
          margin-bottom: 4px;
        }
        &:last-child {
          ${props => props.theme.fontStyle['body02-5']};
          color: ${props => props.theme.colors.gray666};
        }
      }
    }
  }

  .table-order-number {
    ${props => props.theme.fontStyle['body03-3']};
    color: ${props => props.theme.colors.gray333};

    > h4 {
      ${props => props.theme.fontStyle['body01-3']};
      margin-bottom: 12px;
    }
    > div {
      color: ${props => props.theme.colors.gray666};
    }

    > button {
      text-decoration-line: underline;
      cursor: pointer;
    }
  }

  .table-order-status {
    ${props => props.theme.fontStyle['body02-4']};
    color: ${props => props.theme.colors.gray333};
  }

  .red-needed {
    color: ${props => props.theme.colors.red937};
  }
`;
