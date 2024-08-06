'use client';

import styled from 'styled-components';

import check from '@/assets/images/components/check.svg';

export const CheckboxStyled = styled.label`
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
  > input {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border: 1px solid ${props => props.theme.colors.grayada};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: center;
    background-color: ${props => props.theme.colors.grayada};
    background-image: url(${check?.src || check});
    flex-shrink: 0;

    &:checked {
      background-color: ${props => props.theme.colors.red937};
      border: 1px solid ${props => props.theme.colors.red937};
    }

    &.indeterminate {
      background-image: url(${check?.src || check});
    }

    &:checked {
      background-image: url(${check?.src || check});
    }
  }

  &.disabled {
    cursor: not-allowed;
    > input {
      background-color: ${props => props.theme.colors.grayada};
      cursor: not-allowed;
      border: 1px solid ${props => props.theme.colors.grayada};

      &:checked {
        background-image: url(${check?.src || check});
      }
    }
  }

  .checkbox-label {
    color: ${props => props.theme.colors.gray333};
    ${props => props.theme.fontStyle['body02-5']};
  }
`;
