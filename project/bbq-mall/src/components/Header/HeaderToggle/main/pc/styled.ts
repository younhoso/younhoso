'use client';

import styled from 'styled-components';

export const HeaderToggleStyled = styled.div`
  width: 155px;
  height: 48px;
  border-radius: 3012px;
  background-color: #f6f6f6;
  border: 1px solid ${props => props.theme.colors.grayaea};

  display: flex;
  align-items: center;
  padding: 2px;
  text-align: center;
  justify-content: space-between;
  font-size: 16px;

  .app {
    width: 62px;
    margin-left: 8px;
    color: #b5b5b5;
    font-weight: 500;
    cursor: pointer;
  }
  .mall {
    width: 73px;
    border-radius: 3012px;
    font-weight: 600;
    height: 44px;
    background-color: ${props => props.theme.colors.red937};
    color: white;
    cursor: pointer;

    .new-wrapper {
      position: relative;
      line-height: 44px;

      > img {
        position: absolute;
        right: 7px;
        top: 13px;
      }
    }
  }
`;
