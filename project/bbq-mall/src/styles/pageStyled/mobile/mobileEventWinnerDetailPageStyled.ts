'use client';

import styled from 'styled-components';

export const MobileEventWinnerDetailPageStyled = styled.div`
  padding: 20px 16px;
  .winnerdetail-title-inner {
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};
    p {
      color: ${props => props.theme.colors.gray333};
    }
    .winnerdetail-title {
      padding-bottom: 12px;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
    }
    .ymdt {
      padding-left: 10px;
      font-size: 14px;
      font-weight: 500;
    }
  }
  .ymdt-inner {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .label {
      font-size: 12px;
      font-weight: 600;
    }
  }
  .winnerdetail-description {
    margin: 0 auto;
    padding: 20px 0;
    margin-bottom: 20px;
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};
    color: ${props => props.theme.colors.gray333};
  }
  .button-link-inner {
    .ButtonLink {
      height: 40px;
      text-align: center;
      display: block;
      font-size: ${props => props.theme.fontSizes.font15};
      font-weight: ${props => props.theme.fontWeight.medium};
      a {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: block;
      }
    }
  }
`;
