'use client';

import styled from 'styled-components';

export const FooterMobileStyled = styled.div`
  background-color: ${props => props.theme.colors.gray333};
  min-height: 396px;
  margin: 0 auto;
  padding: 24px 16px 65px;

  .footer-mobile-files {
    display: flex;
    gap: 10px;
    margin-bottom: 24px;
    > div {
      font-size: 14px;
      font-weight: 500;
      color: ${props => props.theme.colors.gray999};

      &:not(:last-child) {
        display: flex;
        align-items: center;
        &:after {
          content: '';
          margin-left: 10px;
          border-right: 1px solid ${props => props.theme.colors.gray999};
          height: 13px;
        }
      }

      &:nth-child(2) {
        color: white;
      }
    }
  }

  .footer-mobile-logo {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .footer-mobile-description {
    margin-bottom: 20px;
    > div {
      font-size: 12px;
      font-weight: 500;
      color: ${props => props.theme.colors.gray999};
      line-height: 18px;
    }
  }

  .footer-mobile-comments {
    font-size: 12px;
    font-weight: 500;
    color: ${props => props.theme.colors.gray999};
    line-height: 18px;

    > div:last-child {
      font-size: 11px;
      color: ${props => props.theme.colors.gray666};
      margin-top: 8px;
      line-height: 16px;
    }
  }
`;
