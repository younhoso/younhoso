'use client';

import styled from 'styled-components';

export const MembershipItemStyled = styled.div`
  border: 1px solid ${props => props.theme.colors.grayada};
  width: 480px;
  height: 170px;
  padding: 20px 0;
  display: flex;
  align-items: center;

  .membership-item-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    height: 100%;
    justify-content: center;
    > img {
      margin-bottom: 4px;
    }
    ${props => props.theme.fontStyle['body01-1']};
    color: ${props => props.theme.colors.gray333};
    border-right: 1px dashed ${props => props.theme.colors.graybbb};
    margin-right: 32px;
  }

  .membership-item-description {
    > p {
      display: flex;
      align-items: center;
      gap: 8px;
      ${props => props.theme.fontStyle['body02-5']}

      &:first-child {
        color: ${props => props.theme.colors.gray666};

        > span {
          ${props => props.theme.fontStyle['body02-4']}
        }
      }

      &:not(:first-child) {
        color: ${props => props.theme.colors.gray333};
      }

      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }
`;
