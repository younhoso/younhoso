'use client';

import styled from 'styled-components';

export const MembershipInstructionStyled = styled.div`
  padding: 32px 24px;
  background-color: #f6f6f6;

  > div {
    color: ${props => props.theme.colors.gray666};
    > h4 {
      ${props => props.theme.fontStyle['body03-1']};
      margin-bottom: 10px;
    }

    > p {
      ${props => props.theme.fontStyle['body03-3']};

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
