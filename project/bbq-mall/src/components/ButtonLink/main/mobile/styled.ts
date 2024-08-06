'use client';

import styled from 'styled-components';

import { ButtonLinkMobileProps } from './ButtonLinkMobile';

export const ButtonLinkMobileStyled = styled.div<ButtonLinkMobileProps>`
  text-align: ${props => props.position};
  a {
    display: inline-block;
    text-decoration: none;
    color: ${props => props.theme.colors.gray666};
  }
  &.benefit-link-inner {
    display: flex;
    justify-content: center;
    gap: 8px;
    a {
      color: ${props => props.theme.colors.gray666};
      padding-bottom: 13px;
      &.active {
        color: ${props => props.theme.colors.red937};
        border-bottom: 1px solid ${props => props.theme.colors.red937};
        padding-bottom: 13px;
        font-weight: ${props => props.theme.fontWeight.semiBold};
      }
    }
  }
`;
