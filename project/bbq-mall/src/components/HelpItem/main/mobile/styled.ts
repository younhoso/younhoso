'use client';

import styled from 'styled-components';

export const HelpItemMobileStyled = styled.div`
  display: flex;
  background-color: white;
  padding: 20px 0;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.colors.grayaea};
  align-items: center;

  .mobile-help-item-left {
    max-width: 285px;
    word-break: break-all;

    .mobile-help-item-title {
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      color: ${props => props.theme.colors.gray333};
    }

    .mobile-help-item-info {
      display: flex;
      color: #a6a6a6;
      font-size: 14px;
      line-height: 18px;
      font-weight: 500;
      gap: 8px;

      p {
        display: flex;
        &:first-child::after {
          content: '';
          border-right: 1.3px solid #a6a6a6;
          margin-left: 8px;
          height: 12px;
          display: block;
          margin-top: 3px;
        }
      }
    }
  }
`;
