'use client';

import styled from 'styled-components';

export const MobileOrderCheckGuestFindPageStyled = styled.div`
  background-color: white;
  padding: 0 24px;

  p {
    &:first-child {
      padding-top: 16px;
    }
    ${props => props.theme.fontStyle['body03-3']};
    color: ${props => props.theme.colors.gray999};
    text-align: center;
    > span {
      color: ${props => props.theme.colors.red937};
    }
  }

  .order-number-input {
    margin: 32px 0 20px;
  }
`;
