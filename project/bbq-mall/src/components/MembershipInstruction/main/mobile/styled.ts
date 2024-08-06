'use client';

import styled from 'styled-components';

export const MembershipInstructionMobileStyled = styled.div`
  margin: 16px 16px 40px;
  padding: 20px 16px;
  background-color: #f6f6f6;

  > div {
    color: ${props => props.theme.colors.gray666};
    > h4 {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    > p {
      font-size: 13px;
      font-weight: 500;
      line-height: 18px;

      &::before {
        content: '•';
        margin: 0 4px;
      }
    }

    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
`;
