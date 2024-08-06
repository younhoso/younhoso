'use client';

import styled from 'styled-components';

export const MyCategoryStyled = styled.div`
  > h2 {
    ${props => props.theme.fontStyle['title02-2']};
    color: ${props => props.theme.colors.gray333};
    margin-bottom: 32px;
  }

  .my-item-list {
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .list-label {
      ${props => props.theme.fontStyle['body02-1']};
      color: ${props => props.theme.colors.gray333};
    }

    .list-child {
      ${props => props.theme.fontStyle['body02-5']};
      color: ${props => props.theme.colors.gray666};
      cursor: pointer;

      &.active {
        ${props => props.theme.fontStyle['body02-4']};
        color: ${props => props.theme.colors.red937};
      }
    }
  }
`;
