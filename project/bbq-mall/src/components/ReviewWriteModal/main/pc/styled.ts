'use client';

import styled from 'styled-components';

import Modal from '@/components/Modal';

export const ReviewWriteModalStyled = styled(Modal)`
  .modal-product-wrapper {
    padding: 0 0 20px 0;
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};
  }

  .modal-content {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};

    .rate-wrapper {
      display: flex;
      gap: 47px;
      align-items: center;
      .rate-label {
        ${props => props.theme.fontStyle['body02-5']};
        color: ${props => props.theme.colors.gray333};
        > span {
          color: ${props => props.theme.colors.red937};
        }
      }
    }

    > .Textarea {
      .label {
        width: 82px;
      }
    }

    .modal-wrapper {
      display: flex;

      .modal-wrapper-label {
        width: 82px;
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
      }
    }
  }
  .form-button-wrapper {
    margin-top: 20px;
    display: flex;
    gap: 8px;
    > .Button {
      flex: 1 0 auto;
    }
  }
`;
