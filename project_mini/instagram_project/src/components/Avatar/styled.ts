'use client';

import styled from 'styled-components';

export const AvatarStyled = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  img {
    object-fit: cover;
    border-radius: 50%;
  }
  &.highlight {
    img {
      border-radius: 50%;
      border: 1px solid red;
    }
  }
  &.size-large {
    width: 50px;
  }
  &.sidebar-avatar {
    align-items: center;
  }
  &.following {
    width: 70px;
    height: 70px;
  }
`;