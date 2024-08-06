'use client';

import styled from 'styled-components';

export const MobileMySignPageStyled = styled.div`
  background-color: white;
  .login-needed {
    padding: 24px 16px 0 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};

    .login-needed-info {
      > h3 {
        display: flex;
        gap: 4px;
        align-items: center;
        margin-bottom: 12px;
        font-size: 18px;
        font-weight: 600;
        color: ${props => props.theme.colors.gray333};
      }
      > p {
        font-size: 15px;
        font-weight: 500;
        color: ${props => props.theme.colors.gray666};
        line-height: 20px;
      }

      > div {
        font-size: 14px;
        font-weight: 600;
        color: ${props => props.theme.colors.gray333};
        margin-top: 16px;
        text-decoration: underline;
      }
    }
  }
  .login-needed-item {
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};
  }
`;
