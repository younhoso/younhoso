'use client';

import styled from 'styled-components';

export const ImageUploadStyled = styled.div`
  .image-content-wrapper {
    display: flex;
    gap: 16px;
    > label {
      display: flex;
      background-color: white;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      min-width: 72px;
      cursor: pointer;
      min-height: 72px;
      border: 1px solid ${props => props.theme.colors.grayada};
      input[type='file'] {
        display: none;
      }

      > div {
        font-size: 13px;
        font-weight: 500;
        color: #b5b5b5;
      }
    }

    .image-upload-image-wrapper {
      position: relative;
      height: 72px;

      .image-close-wrapper {
        position: absolute;
        right: 5px;
        top: 5px;
        background-color: rgba(51, 51, 51, 0.8);
        padding: 2px 3px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }

  .image-content-info {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    > p {
      display: flex;
      gap: 6px;
      &::before {
        content: '';
        margin-top: 7px;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        display: block;
        background-color: ${props => props.theme.colors.gray666};
      }
      ${props => props.theme.fontStyle['body03-3']};
      color: ${props => props.theme.colors.gray666};
    }
  }
`;
