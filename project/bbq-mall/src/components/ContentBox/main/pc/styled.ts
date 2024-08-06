'use client';

import styled from 'styled-components';

export const ContentBoxStyled = styled.div`
  border-top: 1px solid ${props => props.theme.colors.gray999};
  .content-box-title {
    padding: 20px 0;
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    ${props => props.theme.fontStyle['body02-4']};
    color: ${props => props.theme.colors.gray333};
  }

  .content-box-children {
    padding: 24px 0;
  }

  &:first-child {
    border-top: 1px solid ${props => props.theme.colors.gray999};
  }
`;
