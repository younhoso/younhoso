'use client';

import styled from 'styled-components';

export const PcInquiryDetailPageStyled = styled.div`
  width: 973px;

  .inquiry-detail-title {
    padding: 24px 16px;
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    > div:first-child {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      > div:first-child {
        ${props => props.theme.fontStyle['body01-2']};
        color: ${props => props.theme.colors.gray333};
      }

      > div:last-child {
        ${props => props.theme.fontStyle['body02-3']};
        &.reply-wait {
          color: ${props => props.theme.colors.gray999};
        }

        &.reply-completed {
          color: ${props => props.theme.colors.greena17};
        }
      }
    }

    > div:last-child {
      display: flex;
      align-items: center;
      gap: 8px;

      > div:first-child {
        padding: 6px 12px;
        text-align: center;
        background-color: ${props => props.theme.colors.gray999};
        color: white;
        border-radius: 20px;
      }

      > div:last-child {
        color: ${props => props.theme.colors.gray333};
        ${props => props.theme.fontStyle['body02-3']};
      }
    }
  }

  .inquiry-detail-message {
    padding: 40px 16px;

    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    > div {
      display: flex;
      gap: 24px;

      .message-icon {
        height: 23px;
        border-radius: 4px;
        padding: 6px;
        background-color: ${props => props.theme.colors.red937};
        color: white;
        font-size: 14px;
        font-weight: 600;
        line-height: 10px;
      }

      .message-main {
        ${props => props.theme.fontStyle['body02-5']};
        color: ${props => props.theme.colors.gray333};

        .message-image-wrapper {
          display: flex;
          gap: 8px;
          margin-top: 40px;
        }
      }

      &.answer {
        margin-top: 40px;

        .writer-info {
          color: ${props => props.theme.colors.gray666};
          ${props => props.theme.fontStyle['body02-3']};

          margin-top: 16px;
          display: flex;
          gap: 8px;
          > div:first-child {
            display: flex;
            gap: 8px;
            &:after {
              content: '';
              border-right: 2px solid ${props => props.theme.colors.graybbb};
              display: block;
              height: 13px;
              margin-top: 3px;
            }
          }
        }
      }
    }
  }

  .inquiry-detail-button-wrapper {
    margin-top: 24px;
    display: flex;
    justify-content: end;
    gap: 8px;

    > .Button {
      ${props => props.theme.fontStyle['body02-3']};
      padding: 15px 0 14px;
    }
  }
`;
