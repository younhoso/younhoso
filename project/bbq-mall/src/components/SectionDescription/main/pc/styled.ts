'use client';

import styled from 'styled-components';

export const SectionDescriptionStyled = styled.div`
  width: 150px;
  h3 {
    margin-bottom: 12px;
    ${props => props.theme.fontStyle['title02-2']}
    color: ${props => props.theme.colors.gray333};
  }
  p {
    color: ${props => props.theme.colors.gray999};
    line-height: 1.25;
  }
`;
