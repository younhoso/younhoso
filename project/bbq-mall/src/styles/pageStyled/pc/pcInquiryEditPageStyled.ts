'use client';

import styled from 'styled-components';

export const PcInquiryEditPageStyled = styled.div`
  width: 973px;

  > form {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .flex-wrapper {
      display: flex;
      gap: 24px;
    }
    .Input,
    .Select {
      &.shorten {
        width: 550px;
      }
    }

    .send-button-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 24px;
      > .Button {
        width: 319px;
      }
    }

    .image-upload-wrapper {
      display: flex;

      .image-upload-wrapper-label {
        width: 136px;
        ${props => props.theme.fontStyle['body02-5']};
        color: ${props => props.theme.colors.gray333};
        > p {
          margin-top: 4px;
          color: #b5b5b5;
          ${props => props.theme.fontStyle['body03-3']};
        }
      }

      .ImageUpload {
        flex: 1 0 auto;
        padding-bottom: 24px;
        border-bottom: 1px solid ${props => props.theme.colors.grayaea};
      }
    }
  }
`;
