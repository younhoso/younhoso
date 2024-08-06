'use client';

import styled from 'styled-components';

export const OrderContentItemStyled = styled.div<{ $labelWidth: string }>`
  display: flex;
  gap: 20px;

  > div:first-child {
    width: calc(${props => props.$labelWidth} - 20px);
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray666};
  }

  &.align-center {
    > div:first-child {
      line-height: 46px;
    }
  }

  > div:last-child {
    flex: 1 0 auto;
    ${props => props.theme.fontStyle['body02-4']};
    color: ${props => props.theme.colors.gray333};
  }

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
