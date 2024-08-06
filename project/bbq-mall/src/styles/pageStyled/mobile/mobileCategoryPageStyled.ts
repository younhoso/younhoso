'use client';

import styled from 'styled-components';

export const MobileCategoryPageStyled = styled.div`
  .category-button-inner {
    /*scrollbar 숨김처리*/
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .category-button-inner::-webkit-scrollbar {
    /*scrollbar 숨김처리*/
    display: none; /* Chrome , Safari , Opera */
  }

  .category-button-inner {
    margin-top: 32px;
    border-top: 10px solid ${props => props.theme.colors.grayaea};
    padding-top: 34px;
    display: flex;
    gap: 8px;
    padding-left: 20px;
    overflow-x: auto;
    > div {
      width: auto;
      height: 36px;
      display: inherit;
      justify-content: center;
      button {
        padding: 0 20px;
        height: auto;
        display: inline-block;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .count-sortby-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin: 20px 0;
    .sortby-title {
      ${props => props.theme.fontStyle['body02-3']}
    }
    .sortby-inner {
      .select-wrapper {
        padding: 10px 16px 9px 16px;
      }
    }
  }

  .category-page-loading {
    min-height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-error {
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cardslide-error {
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pagination-inner {
    padding: 40px 0 50px 0;
  }
`;
