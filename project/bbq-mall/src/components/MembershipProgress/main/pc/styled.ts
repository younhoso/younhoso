'use client';

import styled from 'styled-components';

export const MembershipProgressStyled = styled.div`
  .membership-info {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;

    > div {
      > p {
        &:first-child {
          margin-bottom: 8px;
          color: ${props => props.theme.colors.gray333};
          ${props => props.theme.fontStyle['title03-3']}
          > span {
            ${props => props.theme.fontStyle['title03-1']};
          }
        }

        &:nth-child(2) {
          color: ${props => props.theme.colors.gray333};
          ${props => props.theme.fontStyle['body02-5']};
          margin-bottom: 4px;
        }

        &:last-child {
          ${props => props.theme.fontStyle['body02-3']};
          color: ${props => props.theme.colors.gray999};
        }
      }
    }
  }

  .MembershipProgressBar {
    padding-bottom: 40px;
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    margin-bottom: 32px;
  }
`;
