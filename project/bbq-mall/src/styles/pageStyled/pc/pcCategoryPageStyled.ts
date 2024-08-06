'use client';

import styled from 'styled-components';

export const PcCategoryPageStyled = styled.div`
  min-width: 1280px;
  margin-top: -60px;
  .cardslide-title {
    ${props => props.theme.fontStyle['title02-2']}
  }
  .cardslide-sub-title {
    ${props => props.theme.fontStyle['body02-5']}
    color: ${props => props.theme.colors.gray999}
  }

  .category-title {
    ${props => props.theme.fontStyle['title02-2']}
    text-align: center;
    margin: 0 0 40px 0;
  }
  .category-button-inner {
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: ${props => props.theme.sizes.headerHeight};
    background-color: white;
    z-index: 10;
  }
  .count-sortby-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 24px;
    border-bottom: 1px solid #999;
    margin-bottom: 40px;
  }
  .sortby-inner {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    color: ${props => props.theme.colors.gray999};
    ${props => props.theme.fontStyle['body02-3']}
    li {
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;
      &::after {
        content: '';
        display: inline-block;
        width: 1px;
        height: 14px;
        background-color: ${props => props.theme.colors.gray999};
        margin-left: 10px;
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
    }
  }
  .pagination-inner {
    margin-top: 60px;
  }

  .category-page-loading {
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-error {
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-isloading {
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cardslide-loading {
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cardslide-error {
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
