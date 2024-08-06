'use client';

import styled from 'styled-components';

export const PcRootLayoutChildrenWrapper = styled.div`
  max-width: ${props => props.theme.sizes.maxPcWidth};
  min-width: ${props => props.theme.sizes.maxPcWidth};
  margin: 0 auto;
`;
