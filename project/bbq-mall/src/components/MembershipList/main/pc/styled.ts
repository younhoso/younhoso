'use client';

import styled from 'styled-components';

export const MembershipListStyled = styled.div`
  > h3 {
    ${props => props.theme.fontStyle['body01-3']};
    color: ${props => props.theme.colors.gray333};
    margin-bottom: 12px;
  }

  .membership-list-description {
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray999};
    margin-bottom: 32px;
  }

  .membership-item-wrppaer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 32px;
  }
`;
