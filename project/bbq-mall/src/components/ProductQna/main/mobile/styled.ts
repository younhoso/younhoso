'use client';

import styled from 'styled-components';

export const ProductQnaMobileStyled = styled.div`
  .qna-header {
    display: none;
    padding: 0 20px;
    .qna-title {
      margin-bottom: 8px;
      ${props => props.theme.fontStyle['body02-4']};
    }
    .qna-description {
      color: ${props => props.theme.colors.gray666};
      ${props => props.theme.fontStyle['body03-3']}
    }
  }
  .qna-inner {
    min-height: 90vh;
    padding: 0 16px;
    .qna-totalCount {
      display: none;
    }
    .qna-count {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 32px 0 32px 0;
      ${props => props.theme.fontStyle['body02-4']};
      .qna-button {
        width: 100%;
        height: 40px;
        color: #fff;
        background-color: ${props => props.theme.colors.gray333};
        cursor: pointer;
      }
    }
  }
  .qna-pagination {
    padding: 28px 0;
  }
`;
