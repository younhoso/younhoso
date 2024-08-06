'use client';

import styled from 'styled-components';

import ContentBox from '@/components/ContentBox';

export const OrderAddressMobileStyled = styled(ContentBox.Mobile)`
  .no-address-exist {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2px;
    ${props => props.theme.fontStyle['body03-3']};
    color: ${props => props.theme.colors.gray333};
  }
  .order-address-flex {
    display: flex;
    margin-bottom: 4px;
    justify-content: space-between;
    gap: 4px;
    > p {
      font-size: 15px;
      color: ${props => props.theme.colors.gray333};
      font-weight: 500;
      line-height: 20px;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      min-width: 0;
    }

    > .Button {
      height: 32px;
      width: 60px;
      min-width: 60px;
    }
  }

  .receiver-info {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    color: ${props => props.theme.colors.gray999};
    margin-bottom: 20px;
  }

  .Input {
    margin-top: 8px;
    height: 48px;
  }

  .wrapper-modal {
    width: 100vw;
    max-width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: white;
    min-height: 100vh;
    max-height: 100%;
    z-index: 100;
    overflow: scroll;

    .wrapper-modal-header {
      z-index: 10;
      display: flex;
      position: sticky;
      background-color: white;
      top: 0;
      left: 0;
      align-items: center;
      padding: 0 16px;
      height: 52px;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      color: ${props => props.theme.colors.gray333};
      border-bottom: 1px solid ${props => props.theme.colors.grayaea};
      > p {
        flex: 1 0 auto;
      }

      > div {
        width: 24px;
        height: 24px;
      }
    }

    .address-list-wrapper {
      padding: 0 16px;
    }
  }

  .address-edit-wrppaer {
    padding: 20px 0;
  }

  .address-change-modal {
    .address-add-button-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 16px;
    }

    .Button {
      right: 20px;
    }

    .no-data {
      text-align: center;
      margin: 30vh auto 0;
      font-size: 15px;
      font-weight: 500;
      color: ${props => props.theme.colors.graybbb};
      img {
        margin-top: 40px;
      }
    }
  }
`;
