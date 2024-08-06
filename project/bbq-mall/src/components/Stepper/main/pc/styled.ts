'use client';

import styled from 'styled-components';

export const StepperStyled = styled.div`
  padding: 7px 12px 6px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${props => props.theme.fontStyle['body02-4']};
  border: 1px solid ${props => props.theme.colors.grayada};
  height: 40px;

  > input {
    flex: 1 0 auto;
    text-align: center;
  }

  > img {
    cursor: pointer;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;
