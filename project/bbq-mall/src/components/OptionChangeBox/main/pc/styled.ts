'use client';

import styled from 'styled-components';

export const OptionChangeBoxStyled = styled.div`
  &.avtive {
    margin-bottom: 8px;
  }
  position: relative;
  select {
    width: 100%;
    height: 42px;
    padding: 0 10px;
    border: 1px solid ${props => props.theme.colors.grayada};
  }

  .label-wrapper {
    display: flex;
    align-items: center;
    .select-content {
      position: relative;
      flex: 1 0 auto;
      background-color: white;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid ${props => props.theme.colors.grayada};
      cursor: pointer;

      .select-wrapper {
        display: flex;
        padding: 13px 16px 12px 16px;
        ${props => props.theme.fontStyle['body03-3']};
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        color: ${props => props.theme.colors.gray333};
        .placeholder {
          color: ${props => props.theme.colors.grayada};
        }
      }

      &.disabled {
        background-color: ${props => props.theme.colors.gray5f5};
        border: 1px solid ${props => props.theme.colors.grayada};
        color: ${props => props.theme.colors.gray999};
        cursor: not-allowed;
      }
    }

    .select-option-list {
      width: 100%;
      z-index: 100;
      position: absolute;
      top: 44px;
      overflow: auto;
      ${props => props.theme.fontStyle['body03-3']};
      background-color: white;
      color: ${props => props.theme.colors.gray333};
      border-top: 1px solid ${props => props.theme.colors.grayada};
      border-left: 1px solid ${props => props.theme.colors.grayada};
      border-right: 1px solid ${props => props.theme.colors.grayada};

      > div {
        padding: 15px 14px 14px 16px;
        border-bottom: 1px solid ${props => props.theme.colors.grayada};
        cursor: pointer;

        &.sold-out {
          cursor: not-allowed;
          color: ${props => props.theme.colors.graybbb};
        }

        display: flex;
        justify-content: space-between;
        align-items: center;
        .suffix {
          color: ${props => props.theme.colors.gray333};
        }
      }
    }
  }
`;
