'use client';

import styled from 'styled-components';

export const MembershipListMobileStyled = styled.div`
  margin: 24px 16px 0;
  > h3 {
    color: ${props => props.theme.colors.gray333};
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .membership-list-description {
    color: ${props => props.theme.colors.gray999};
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
    margin-bottom: 24px;
  }

  .membership-item-wrppaer {
    .MembershipItemMobile {
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }
`;
