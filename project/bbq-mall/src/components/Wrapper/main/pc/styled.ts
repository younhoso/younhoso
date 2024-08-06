'use client';

import styled from 'styled-components';

export const WrapperStyled = styled.div`
  min-width: ${props => props.theme.sizes.maxPcWidth};
  max-width: ${props => props.theme.sizes.maxPcWidth};
  margin: 0 auto;
`;
