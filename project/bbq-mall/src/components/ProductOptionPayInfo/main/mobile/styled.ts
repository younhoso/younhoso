'use client';

import styled from 'styled-components';

export const ProductOptionPayInfoMobileStyled = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: ${props => props.theme.colors.white};
  border-top: 1px solid ${props => props.theme.colors.grayada};
  padding: 10px 16px;
  z-index: 11;
  &.active {
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }
  }
  .footer-price-inner {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
    background-color: ${props => props.theme.colors.white};
    border-top: 1px solid ${props => props.theme.colors.grayada};
    padding: 36px 20px 20px 20px;
    border-top-right-radius: 1em;
    border-top-left-radius: 1em;
    z-index: 10;
    -webkit-transition: bottom 0.2s ease-in-out;
    transition: bottom 0.2s ease-in-out;
    .close-el {
      width: 100%;
      height: 40px;
      background-color: transparent;
      position: absolute;
      top: 0px;
      left: 50%;
      transform: translateX(-50%);
      .close {
        width: 50px;
        height: 5px;
        background-color: ${props => props.theme.colors.grayada};
        border-radius: 1em;
        position: absolute;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    &.active {
      transform: translateY(0);
    }

    .option-inner {
      .item-inner {
        .item {
          padding: 20px;
          border: 1px solid ${props => props.theme.colors.grayada};
          margin-bottom: 8px;
          .quantityPay-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            ${props => props.theme.fontStyle['body03-3']}
            margin-bottom: 20px;
            color: ${props => props.theme.colors.gray333};
            img {
              cursor: pointer;
            }
          }
          .quantityPay-body {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .quantity {
              width: 100px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid ${props => props.theme.colors.grayada};
              button {
                height: 16px;
              }
              .inputNumber {
                width: 40px;
                text-align: center;
              }
            }
            .buyPrice {
              color: ${props => props.theme.colors.gray333};
              ${props => props.theme.fontStyle['body02-4']}
            }
          }
        }
      }
    }

    .price-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      margin-top: 10px;
      .price {
        ${props => props.theme.fontStyle['title03-2']}
      }
    }

    .point-text-inner {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding-bottom: 16px;
      .title {
        color: ${props => props.theme.colors.red32D};
        ${props => props.theme.fontStyle['body05-1']}
      }
      .desc {
        color: ${props => props.theme.colors.graya6a};
        ${props => props.theme.fontStyle['body04-1']}
        margin-top: 2px;
      }
    }

    .pay-button {
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: space-between;
      button {
        padding: 8px;
        height: 50px;
        color: ${props => props.theme.colors.white};
        ${props => props.theme.fontStyle['body03-1']}
        &:first-child {
          flex-shrink: 0;
          border: 1px solid ${props => props.theme.colors.grayada};
        }
        &:last-child {
          flex-grow: 1;
          background-color: ${props => props.theme.colors.red937};
        }
      }
    }
  }

  .button-inner {
    display: flex;
    gap: 8px;
    button {
      color: ${props => props.theme.colors.white};
      ${props => props.theme.fontStyle['body03-1']}
      &:first-child {
        padding: 8px;
        flex-shrink: 0;
        border: 1px solid ${props => props.theme.colors.grayada};
        height: 50px;
      }
      &:last-child {
        flex-grow: 1;
        background-color: ${props => props.theme.colors.red937};
        height: 50px;
      }
    }
    button:nth-child(3) {
      width: 100%;
      text-align: center;
      ${props => props.theme.fontStyle['body02-2']}
      color: ${props => props.theme.colors.white};
      background-color: ${props => props.theme.colors.red937};
    }
  }

  .npay {
    margin-top: 8px;
    background-color: #00c73c;
    border: 1px solid #00c73c;
    display: flex;
    align-items: center;
    height: 50px;
    gap: 5px;
  }
`;
