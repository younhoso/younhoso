'use client';

import styled from 'styled-components';

export const HeaderToggleMobileStyled = styled.div`
  width: 144px;
  height: 28px;
  background-color: ${props => props.theme.colors.gray5f5};
  border-radius: 3012px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  font-size: 14px;
  font-weight: 500;

  .toggle-deactive {
    width: 72px;
    color: ${props => props.theme.colors.graybbb};
  }

  .toggle-active {
    width: 72px;
    color: white;
    background-color: ${props => props.theme.colors.red937};
    height: 28px;
    border-radius: 3012px;

    .new-wrapper {
      position: relative;
      line-height: 28px;

      > img {
        position: absolute;
        right: 10px;
        top: 6px;
      }
    }
  }
`;
