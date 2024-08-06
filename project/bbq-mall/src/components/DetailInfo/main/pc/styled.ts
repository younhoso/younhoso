'use client';

import styled from 'styled-components';

export const DetailInfoStyled = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.grayada};
  &:nth-child(1) {
    border-top: 1px solid ${props => props.theme.colors.grayada};
  }
  .detailInfo-inner {
    width: 100%;
    display: flex;

    .left-info {
      ${props => props.theme.fontStyle['body03-2']}
      color: ${props => props.theme.colors.gray666};
      background-color: ${props => props.theme.colors.gray5f5};
      padding: 24px;
      flex: 0.23;
    }
    .rigth-info {
      ${props => props.theme.fontStyle['body03-3']}
      color: ${props => props.theme.colors.gray666};
      padding: 24px;
      flex: 0.77;
      white-space: pre-line;
    }
  }
`;
