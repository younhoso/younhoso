'use client';

import styled from 'styled-components';

export const PageTitleStyled = styled.div`
  padding-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid ${props => props.theme.colors.gray999};
  > h2 {
    ${props => props.theme.fontStyle['title02-2']}
    color:${props => props.theme.colors.gray333};
  }

  .page-title-description {
    flex: 1 0 auto;
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray999};
  }

  &.no-border {
    border-bottom: none;
  }
`;
