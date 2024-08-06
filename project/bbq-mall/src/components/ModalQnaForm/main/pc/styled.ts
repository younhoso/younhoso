'use client';

import styled from 'styled-components';

export const ModalQnaFormStyled = styled.div`
  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .qna-wraper {
    position: fixed;
    width: 800px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${props => props.theme.colors.white};
    z-index: 100;
    padding: 32px;
    border-radius: 1em;

    .qna-header {
      .qna-title-inner {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid ${props => props.theme.colors.gray999};
        padding-bottom: 32px;
        margin-bottom: 20px;
        .qna-title {
          ${props => props.theme.fontStyle['title03-2']}
        }
        img {
          cursor: pointer;
        }
      }
      .qna-product-info {
        display: flex;
        align-items: center;
        gap: 20px;
      }
    }
    .qna-body {
      .form-inner {
        border-top: 1px solid ${props => props.theme.colors.grayada};
        border-bottom: 1px solid ${props => props.theme.colors.grayada};
        padding: 20px 0 24px 0;
        margin: 20px 0 24px 0;
        .qna-product-info-left {
          margin-left: 136px;
        }
      }
      .Input {
        margin-bottom: 16px;
      }
      .Textarea {
        margin-bottom: 16px;
      }
      .qna-footer {
        display: flex;
        gap: 8px;
        > button {
          width: 50%;
        }
      }
    }
  }
`;
