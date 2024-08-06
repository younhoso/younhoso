'use client';

import styled from 'styled-components';

export const PcMyInquiryDetailPageStyled = styled.div`
  .inquiry-item-info {
    margin-top: 32px;
    padding: 24px 16px;
    border-top: 1px solid ${props => props.theme.colors.gray999};
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    display: flex;
    align-items: center;
    gap: 20px;
    > div {
      flex: 1 0 auto;

      > div {
        display: flex;
        &:first-child {
          justify-content: space-between;
          margin-bottom: 8px;
          ${props => props.theme.fontStyle['body02-3']};
          color: ${props => props.theme.colors.gray999};
          > div.replied {
            color: ${props => props.theme.colors.greena17};
          }
        }

        &:last-child {
          gap: 4px;
          align-items: center;
          ${props => props.theme.fontStyle['body01-3']};
          color: ${props => props.theme.colors.gray333};
        }
      }
    }
  }
  .inquiry-item-content {
    padding: 40px 16px;
    display: flex;
    gap: 40px;
    flex-direction: column;
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    > div {
      display: flex;
      gap: 24px;

      > div {
        &:first-child {
          flex-shrink: 0;
          font-size: 14px;
          font-weight: 600;
          color: white;
          background-color: ${props => props.theme.colors.red937};
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          width: 23px;
          height: 22px;
        }

        &:last-child {
          > p {
            ${props => props.theme.fontStyle['body02-5']};
            color: ${props => props.theme.colors.gray333};
          }

          > div {
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
  }

  .inquiry-button-wrapper {
    margin-top: 24px;
    display: flex;
    gap: 8px;
    justify-content: end;
  }

  > .Modal {
    .modal-item-info {
      padding: 0 0 20px;
      display: flex;
      align-items: center;
      gap: 20px;
      border-bottom: 1px solid ${props => props.theme.colors.grayaea};
      margin-bottom: 20px;
    }

    .modal-input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-left: 10px;
      .label {
        width: 82px;
      }

      .Checkbox {
        margin-left: 82px;
      }
    }
  }
`;
