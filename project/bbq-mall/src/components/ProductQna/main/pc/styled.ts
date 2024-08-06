'use client';

import styled from 'styled-components';

export const ProductQnaStyled = styled.div`
  p {
    color: ${props => props.theme.colors.gray333};
  }
  .qna-header {
    .qna-title {
      ${props => props.theme.fontStyle['body01-2']}
    }
    .qna-description {
      color: ${props => props.theme.colors.gray666};
      ${props => props.theme.fontStyle['body02-5']};
      margin-top: 16px;
    }
  }
  .review-count {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 32px 0 24px 0;
    ${props => props.theme.fontStyle['body02-4']};
    .qna-button {
      width: 128px;
      height: 40px;
      color: #fff;
      background-color: ${props => props.theme.colors.red937};
      cursor: pointer;
    }
  }

  .Table table tbody tr td .tdContent {
    padding: 24px 20px;
    .reply-wait {
      color: ${props => props.theme.colors.gray999};
    }
    .reply-completed {
      color: ${props => props.theme.colors.greena17};
    }
  }

  .qna-pagination {
    margin-top: 32px;
  }
`;
