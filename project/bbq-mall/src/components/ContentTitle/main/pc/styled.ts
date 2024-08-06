'use client';

import styled from 'styled-components';

export const ContentTitleStyled = styled.div`
  padding-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;

  &.border-exist {
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
  }
  > h2 {
    ${props => props.theme.fontStyle['title02-2']};
    color: ${props => props.theme.colors.gray333};
  }
  > div {
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray999};
  }
`;
