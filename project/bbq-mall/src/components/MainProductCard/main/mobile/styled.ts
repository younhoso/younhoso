'use client';

import Link from 'next/link';

import styled from 'styled-components';

export const MainProductCardMobileStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  row-gap: 12px;
  padding: 20px 20px 0;
`;

export const MaintProducatCardItemMobile = styled(Link)<{
  $backgroundColor: string;
  $borderColor: string;
}>`
  background-color: ${props => props.$backgroundColor};
  border: 1px solid ${props => props.$borderColor};
  text-align: center;
  padding: 30px 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > p {
    font-size: 15px;
    font-weight: 700;
    color: ${props => props.theme.colors.gray333};
    margin-bottom: 6px;
  }

  > div {
    font-size: 13px;
    font-weight: 500;
    color: ${props => props.theme.colors.gray333};
    margin-bottom: 30px;
    word-break: break-word;
  }

  > img {
    -webkit-filter: drop-shadow(8px 8px 8px #999);
    filter: drop-shadow(8px 8px 8px #999);

    @media (max-width: 320px) {
      -webkit-filter: drop-shadow(4px 4px 4px #999);
      filter: drop-shadow(4px 4px 4px #999);
    }
  }
`;
