'use client';

import Link from 'next/link';

import styled from 'styled-components';

export const MainProductCardStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 60px;
`;

export const MainProductCardItemStyled = styled(Link)<{
  $backgroundColor: string;
  $borderColor: string;
}>`
  background-color: ${props => props.$backgroundColor};
  border: 1px solid ${props => props.$borderColor};
  text-align: center;
  padding: 39px 54px 59px 53px;
  color: inherit;
  display: block;
  > p {
    ${props => props.theme.fontStyle['body01-2']}
    color: ${props => props.theme.colors.gray333};
    margin-bottom: 8px;
  }
  > div {
    ${props => props.theme.fontStyle['body02-3']}
    color: ${props => props.theme.colors.gray333};
    margin-bottom: 40px;
  }

  > img {
    -webkit-filter: drop-shadow(8px 8px 8px #999);
    filter: drop-shadow(8px 8px 8px #999);
  }
`;
