'use client';

import styled from 'styled-components';

export const MobileInquiryDetailPageStyled = styled.div`
  padding: 0 16px;

  .inquiry-detail-header {
    padding: 20px 0;
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};

    .detail-title-status {
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      .detail-title {
        margin-bottom: 6px;
      }

      .detail-status {
        color: ${props => props.theme.colors.gray999};
      }
    }

    .detail-type {
      display: flex;
      align-items: center;
      gap: 8px;
      > div {
        &:first-child {
          border-radius: 12px;
          background-color: ${props => props.theme.colors.gray999};
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 500;
          padding: 5.5px 8px;
        }

        &:last-child {
          font-size: 14px;
          font-weight: 500;
          line-height: 18px;
          color: #a6a6a6;
        }
      }
    }
  }

  .inquiry-detail-message {
    padding: 20px 0;
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};
    word-break: break-all;
    > div {
      gap: 12px;
      display: flex;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;

      .message-icon {
        background-color: ${props => props.theme.colors.red937};
        min-width: 23px;
        height: 23px;
        text-align: center;
        padding: 2px;
        color: white;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 600;
      }

      .message-main {
        color: ${props => props.theme.colors.gray333};
      }

      .message-image-wrapper {
        display: flex;
        gap: 8px;
        margin-top: 20px;
      }

      &.answer {
        margin-top: 20px;

        .writer-info {
          color: ${props => props.theme.colors.gray666};

          margin-top: 12px;
          display: flex;
          gap: 8px;

          > div:first-child {
            display: flex;
            gap: 8px;
            &:after {
              content: '';
              border-right: 1.5px solid ${props => props.theme.colors.graybbb};
              display: block;
              height: 13px;
              margin-top: 4px;
            }
          }
        }
      }
    }
  }

  .detail-button-wrapper {
    display: flex;
    margin-top: 20px;
    padding-bottom: 20px;
    justify-content: space-between;
    gap: 8px;

    > .Button {
      font-size: 15px;
      font-weight: 500;
      padding: 11px;
      width: 70px;

      &.to-list {
        flex: 1 0 auto;
      }
    }
  }
`;
