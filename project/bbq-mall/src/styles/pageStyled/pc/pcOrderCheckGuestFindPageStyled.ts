'use client';

import styled from 'styled-components';

export const PcOrderCheckGuestFindPageStyled = styled.div`
  width: 340px;
  margin: 0 auto;
  text-align: center;

  h2 {
    ${props => props.theme.fontStyle['body01-2']};
    color: ${props => props.theme.colors.gray333};
    margin-bottom: 16px;
  }

  p {
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray999};
    > span {
      color: ${props => props.theme.colors.red937};
    }
  }

  .order-number-input {
    margin: 32px 0 20px;
  }
`;
