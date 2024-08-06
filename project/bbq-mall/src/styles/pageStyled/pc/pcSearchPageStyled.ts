'use client';

import styled from 'styled-components';

export const PcSearchPageStyled = styled.div`
  > h2 {
    ${props => props.theme.fontStyle['title02-2']};
    text-align: center;
    color: ${props => props.theme.colors.gray333};
    margin-bottom: 80px;
    > span {
      color: ${props => props.theme.colors.red937};
    }
  }

  > .no-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400px;

    > img {
      margin-bottom: 8px;
    }

    > p {
      ${props => props.theme.fontStyle['body02-5']};
      color: ${props => props.theme.colors.gray999};
    }
  }

  .search-info {
    display: flex;
    justify-content: space-between;
    padding-bottom: 24px;
    border-bottom: 1px solid ${props => props.theme.colors.gray999};

    > div {
      &:first-child {
        ${props => props.theme.fontStyle['body02-3']};
        color: ${props => props.theme.colors.gray333};
      }

      &:last-child {
        display: flex;
        gap: 8px;
        ${props => props.theme.fontStyle['body02-5']};
        color: ${props => props.theme.colors.gray999};

        > div {
          cursor: pointer;
          display: flex;
          gap: 8px;

          &.active {
            color: ${props => props.theme.colors.gray333};
          }

          &:not(:last-child) {
            &::after {
              cursor: auto;
              content: '';
              display: block;
              border-right: 1px solid ${props => props.theme.colors.gray999};
              height: 70%;
              margin-top: 3px;
            }
          }
        }
      }
    }
  }

  .search-item-list-wrapper {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 40px;

    .ProductCard {
      width: 243px;
      height: 473px;
    }

    .Pagination {
      margin: 0 auto;
    }
  }
`;
