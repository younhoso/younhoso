'use client';

import styled from 'styled-components';

export const ContentBoxMobileStyled = styled.div`
  padding: 16px 16px 24px;
  border-bottom: 1px solid ${props => props.theme.colors.grayaea};
  background-color: white;

  .content-box-title {
    color: ${props => props.theme.colors.gray333};
    font-weight: 600;
    padding-bottom: 16px;
    border-bottom: 1px solid ${props => props.theme.colors.grayaea};
    font-size: 15px;
  }

  .content-box-children {
    margin-top: 20px;
  }
`;
