'use client';

import styled from 'styled-components';

export const EventRenderStyled = styled.div`
  margin-bottom: 20px;
  img {
    vertical-align: middle;
  }

  .event-end {
    position: relative;
    &::after {
      content: '';
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      backdrop-filter: blur(1px);
    }
    .event-end-txt {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      z-index: 1;
      color: ${props => props.theme.colors.white};

      .title {
        ${props => props.theme.fontStyle.title01}
        margin-bottom: 6px;
      }
      .end-data {
        ${props => props.theme.fontStyle['body01-3']}
      }
    }
  }
`;
