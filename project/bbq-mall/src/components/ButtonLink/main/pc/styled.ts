'use client';

import styled from 'styled-components';

import { ButtonLinkProps } from './ButtonLink';

export const ButtonLinkStyled = styled.div<ButtonLinkProps>`
  display: inline-block;
  text-align: center;
  a {
    width: 119px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
  }
  &.bg-red {
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.red937};
  }
  &.border-gray {
    border: 1px solid ${props => props.theme.colors.grayada};
    a {
      color: ${props => props.theme.colors.gray333};
    }
  }
  &.benefit-link-inner {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 20px;
    a {
      width: 314px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      color: ${props => props.theme.colors.gray666};
      background-color: ${props => props.theme.colors.gray5f5};
      border: 1px solid ${props => props.theme.colors.grayada};
      &.active {
        color: ${props => props.theme.colors.white};
        background-color: ${props => props.theme.colors.red937};
      }
    }
  }
  &.event-detail {
    border: 1px solid ${props => props.theme.colors.grayada};
    a {
      color: ${props => props.theme.colors.gray333};
    }
  }
`;
