'use client';

import styled from 'styled-components';

export const DetailInfoMobileStyled = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.grayada};
  .detailInfo-inner {
    width: 100%;
    padding: 20px;
    background-color: ${props => props.theme.colors.gray5f5};
    .left-info {
      ${props => props.theme.fontStyle['body03-2']}
      color: ${props => props.theme.colors.gray666};
    }
    .rigth-info {
      ${props => props.theme.fontStyle['body03-3']}
      color: ${props => props.theme.colors.gray666};
      white-space: pre-line;
      padding-top: 6px;
    }
  }
`;
