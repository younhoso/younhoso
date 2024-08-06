import styled from 'styled-components';

import { BorderTypes, DividerProps } from './Divider';

interface DividerStyledProps {
  $hasText?: boolean;
  $borderType?: BorderTypes;
  $borderColor?: string;
  $borderHeight?: string;
  $children?: string;
  $textOrientation?: 'left' | 'center' | 'right';
  $orientationMargin?: string;
  $marginTop: string;
  $marginBottom: string;
}

export const DividerStyled = styled.div<DividerStyledProps>`
  ${props => {
    const width =
      props.$textOrientation === 'center'
        ? '50%'
        : props.$textOrientation === 'left'
          ? props.$orientationMargin
          : `calc(100% - ${props.$orientationMargin})`;
    return props.$hasText
      ? `
        display:flex;
        align-items:center;
        font-size:16px;
        font-weight:700;
        &::before {
          content:'';
          border-bottom: ${props.$borderHeight ?? '1px'} ${props.$borderType ?? 'solid'} ${
            props.$borderColor ?? props.theme.colors.grayada
          };
          width: ${width}
          }
        }
        &::after {
          content:'';
          border-bottom: ${props.$borderHeight ?? '1px'} ${props.$borderType ?? 'solid'} ${
            props.$borderColor ?? props.theme.colors.grayada
          };
          width:calc(100% - ${width})
          }
        }
        > span{
          padding: 0 12px;
        }
        margin: 15px 0;
    `
      : `
        width: 100%;
        border-bottom:${props.$borderHeight ?? '1px'} ${props.$borderType ?? 'solid'} ${
          props.$borderColor ?? props.theme.colors.grayada
        };
        margin-top:${props.$marginTop};
        margin-bottom:${props.$marginBottom};
    `;
  }}
`;
