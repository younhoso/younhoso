'use client';

import styled from 'styled-components';

export const FormCommentStyled = styled.div`
 .form-comment {
    display: flex;
    align-items: center;
    border-top: 1px solid #999;
    margin: 10px 0 0 0;
    padding: 10px 10px 0 10px;
    input {
      width: 100%;
      margin-left: 10px;
      padding: 10px;
      outline: none;
    }
    button {
      font-weight: 600;
      padding: 10px;
    }
  }
`;