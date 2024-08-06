'use client';

import styled from 'styled-components';

export const EventRenderMobileStyled = styled.div`
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
  img {
    vertical-align: middle;
  }
  .event-end {
    &::after {
      content: '';
      display: flex;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
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
      font-size: 14px;
      .title {
        margin-bottom: 4px;
        font-size: 16px;
        font-weight: 700;
      }
      .end-data {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
`;
