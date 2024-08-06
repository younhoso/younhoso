'use client';

import styled from 'styled-components';

export const SortByButtonStyled = styled.li`
  &.active {
    color: ${props => props.theme.colors.gray333};
  }
`;
