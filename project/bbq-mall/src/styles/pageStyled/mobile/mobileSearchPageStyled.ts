'use client';

import styled from 'styled-components';

export const MobileSearchPageStyled = styled.div`
  background-color: white;

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

  .no-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 53px - 10px - 40px);

    > img {
      margin-bottom: 8px;
    }

    > p {
      ${props => props.theme.fontStyle['body02-5']};
      color: ${props => props.theme.colors.gray999};
    }
  }

  .search-content-wrapper {
    padding: 20px;
  }

  .search-info {
    display: flex;
    justify-content: space-between;
    padding-bottom: 24px;
    align-items: center;

    > div {
      &:first-child {
        font-size: 14px;
        font-weight: 500;
        color: ${props => props.theme.colors.gray333};
      }
    }

    .SelectMobile {
      .select-wrapper {
        padding: 10px 10px 9px 12px;
        > div {
          font-size: 14px;
          line-height: normal;
        }
      }
    }
  }

  .search-item-list-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 11px;
  }
`;
