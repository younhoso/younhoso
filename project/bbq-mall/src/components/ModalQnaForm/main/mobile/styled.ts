'use client';

import styled from 'styled-components';

export const ModalQnaFormMobileStyled = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.colors.white};
  z-index: 11;
  .header-title-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0 20px 0;
    > img {
      align-self: flex-start;
      position: absolute;
      left: 10px;
    }
    h2 {
      margin: 0 auto;
      ${props => props.theme.fontStyle['body02-4']}
    }
  }
  .qna-wraper {
    padding: 16px;
    .qna-header {
      .qna-product-info {
        display: flex;
        align-items: center;
        gap: 10px;
        .productname {
          font-size: ${props => props.theme.fontSizes.font15};
          font-weight: ${props => props.theme.fontWeight.medium};
          line-height: 20px;
          color: ${props => props.theme.colors.gray333};
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-word;

          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    .qna-body {
      .form-inner {
        .Input {
          border-top: 1px solid ${props => props.theme.colors.grayada};
          padding: 16px 0 12px 0;
          margin-top: 16px;
        }
        .qna-product-info-left {
          padding: 20px 0 24px 0;
        }
      }
      .qna-footer {
        height: 40px;
        display: flex;
        gap: 10px;
        > button {
          font-size: 15px;
          flex: 1;
        }
      }
    }
  }
`;
