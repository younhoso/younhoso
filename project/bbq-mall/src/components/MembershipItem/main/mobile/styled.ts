'use client';

import styled from 'styled-components';

export const MembershipItemMobileStyled = styled.div`
  border: 1px solid ${props => props.theme.colors.grayada};
  height: 165px;
  padding: 16px 0;
  display: flex;
  align-items: center;

  .membership-item-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 128px;
    height: 100%;
    justify-content: center;
    border-right: 1px solid ${props => props.theme.colors.grayaea};
    color: ${props => props.theme.colors.gray666};
    font-size: 12px;
    font-weight: 600;
    margin-right: 16px;

    > img {
      margin-bottom: 4px;
    }

    > p {
      margin-bottom: 2px;
      color: ${props => props.theme.colors.gray333};
      font-size: 16px;
      font-weight: 800;
    }
  }

  .membership-item-description {
    > p {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 500;

      &:first-child {
        color: ${props => props.theme.colors.gray666};
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
