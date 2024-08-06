'use client';

import styled from 'styled-components';

export const MobileSearchCategoryPageStyled = styled.div`
  background-color: white;
  position: relative;

  .search-header {
    position: sticky;
    top: 0;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 10px 20px 10px 12px;
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    z-index: 10;
    background-color: white;
  }

  .category-list {
    padding: 20px 24px;

    > div {
      font-size: 15px;
      font-weight: 500;
      color: ${props => props.theme.colors.gray333};
      margin-bottom: 16px;
    }
  }

  .mobile-cart-recommend {
    padding: 16px;
    margin-bottom: 20px;
    h3 {
      font-size: 15px;
      font-weight: 600;
      line-height: normal;
      color: ${props => props.theme.colors.gray333};
      margin: 4px 0;
    }

    .mobile-cart-recommend-products {
      overflow-x: scroll;
      display: flex;
      gap: 10px;
      margin-top: 20px;
      padding-bottom: 32px;

      &::-webkit-scrollbar {
        height: 2px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.gray333};
      }
      &::-webkit-scrollbar-track {
        background-color: ${props => props.theme.colors.grayaea};
      }

      > div {
        min-width: 156px;
        width: 156px;
      }
    }
  }
  .recent-keyword-list {
    padding: 20px 20px 0;
    > div {
      display: flex;
      &:first-child {
        justify-content: space-between;
        margin-bottom: 8px;
      }
      > h6 {
        font-size: 15px;
        font-weight: 600;
        color: ${props => props.theme.colors.gray333};
      }

      > button {
        font-size: 12px;
        font-weight: 500;
        color: ${props => props.theme.colors.gray666};
      }

      &.keyword-wrapper {
        gap: 6px;
        > p {
          background-color: ${props => props.theme.colors.red937};
          border-radius: 30px;
          gap: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          padding: 4px 6px;
          font-size: 12px;
          font-weight: 500;
        }
      }
    }
  }
`;

export const CategoryFooterStyled = styled.div`
  position: relative;
  margin-top: 83px;
  > p {
    position: absolute;
    right: 24px;
    bottom: 122px;
    display: flex;
    justify-content: end;
    align-items: center;
  }
  > div {
    padding: 24px 20px;
    background-color: ${props => props.theme.colors.gray333};

    > p {
      margin-top: 24px;
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
      color: ${props => props.theme.colors.gray999};
    }
  }
`;
