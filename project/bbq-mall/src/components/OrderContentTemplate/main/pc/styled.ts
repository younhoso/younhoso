'use client';

import styled from 'styled-components';

export const OrderContentTemplateStyled = styled.div`
  border: 1px solid ${props => props.theme.colors.grayada};

  .order-content-template-header {
    padding: 20px 24px;
    border-bottom: 1px solid ${props => props.theme.colors.grayada};
    ${props => props.theme.fontStyle['body02-4']};
    color: ${props => props.theme.colors.gray333};
  }

  .order-content-template-body {
    padding: 24px;
    ${props => props.theme.fontStyle['body02-5']};
    color: ${props => props.theme.colors.gray333};
  }
`;
