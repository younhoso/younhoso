'use client';

import styled from 'styled-components';

export const FollowingBarStyled = styled.div`
  width: 760px;
  overflow-x: hidden;
  padding: 10px 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.13);
  border-radius: 10px;
  ul {
    display: flex;
    text-align: center;
    gap: 16px;
    .ellipsis {
      width: 70px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .no-data {
    text-align: center;
  }
  .swiper-button-prev, .swiper-button-next {
    color: #fff;
    &::after {
      font-size: 28px;
    }
  }
`;