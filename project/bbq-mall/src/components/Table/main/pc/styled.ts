'use client';

import styled from 'styled-components';

import { TableProps } from './Table';

export const TableStyled = styled.div`
  &.fullWidth {
    > table {
      width: 100%;
    }
  }

  > table {
    border-collapse: collapse;

    thead {
      border-top: 1px solid ${props => props.theme.colors.gray999};
      border-bottom: 1px solid ${props => props.theme.colors.grayada};
      tr {
        td {
          ${props => props.theme.fontStyle['body02-4']};
          color: ${props => props.theme.colors.gray333};
          text-align: center;
          padding: 16px;
        }
      }
    }

    tbody {
      tr {
        &.cursor {
          cursor: pointer;
        }
        td {
          position: relative;
          border-bottom: 1px solid ${props => props.theme.colors.grayada};

          &.no-border {
            border-bottom: none;
          }

          .tdContent {
            padding: 24px 0;
            display: flex;
            justify-content: center;
            ${props => props.theme.fontStyle['body02-3']}
            color:${props => props.theme.colors.gray333};

            &.align-start {
              justify-content: start;
            }
          }
        }

        &.table-dropdown {
          display: none;
          width: 100%;

          &.show {
            display: block;
          }
        }
      }
    }
  }

  > .empty,
  > .loading {
    padding: 60px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.colors.gray666};
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
  }
`;
