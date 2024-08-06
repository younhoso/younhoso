'use client';

import styled from 'styled-components';

export const HelpCategoriesStyled = styled.div`
  > h2 {
    ${props => props.theme.fontStyle['title02-2']}
    color:${props => props.theme.colors.gray333};
    margin-bottom: 32px;
  }
  .help-items {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray666};

    > div {
      cursor: pointer;
      &.active {
        ${props => props.theme.fontStyle['body02-4']};
        color: ${props => props.theme.colors.red937};
      }
    }
  }
`;
