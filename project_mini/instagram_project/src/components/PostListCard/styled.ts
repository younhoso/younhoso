"use client";

import styled from "styled-components";

export const PostListCardStyled = styled.section`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  margin-bottom: 40px;
  padding: 10px 0;

  .inner-icon {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding: 0 5px;
  }
  .like-icon {
    font-size: 12px;
    font-weight: 600;
    margin: 10px;
  }
  .username {
    font-weight: 600;
    margin-right: 10px;
  }
  .created-at {
    font-size: 12px;
    color: #555;
    text-transform: uppercase;
  }

  img {
    width: 100%;
    height: auto; /* 세로 크기를 auto로 설정하여 비율에 맞게 자동 조정되도록 함 */
    object-fit: cover;
    aspect-ratio: 1/1; // 가로 세로 비율을 1:1로 설정
  }
`;
