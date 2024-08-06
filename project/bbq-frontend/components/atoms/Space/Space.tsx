import React, { FC, ReactNode } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { PLANCK } from '@/constants';
import { addSuffixIfNotString } from '@/utils';

type Direction = 'vertical' | 'horizontal' | 'v' | 'h';

interface SpaceProps {
  direction?: Direction;
  size?: number;
  length?: number;
}

interface SpaceComponentProps extends SpaceProps {
  className?: string;
  [x: string]: any;
}

export const Space: FC<SpaceComponentProps> & {
  H: React.FC<SpaceProps>;
  H0_5: React.FC<SpaceProps>;
  H1: React.FC<SpaceProps>;
  H1_5: React.FC<SpaceProps>;
  H2: React.FC<SpaceProps>;
  H2_5: React.FC<SpaceProps>;
  H3: React.FC<SpaceProps>;
  H3_5: React.FC<SpaceProps>;
  H4: React.FC<SpaceProps>;
  H5: React.FC<SpaceProps>;
  H6: React.FC<SpaceProps>;
  H7: React.FC<SpaceProps>;
  H8: React.FC<SpaceProps>;
  H9: React.FC<SpaceProps>;
  H10: React.FC<SpaceProps>;
  H11: React.FC<SpaceProps>;
  H12: React.FC<SpaceProps>;
  H13: React.FC<SpaceProps>;
  H14: React.FC<SpaceProps>;
  H15: React.FC<SpaceProps>;
  H16: React.FC<SpaceProps>;
  H17: React.FC<SpaceProps>;
  H18: React.FC<SpaceProps>;
  H19: React.FC<SpaceProps>;
  H20: React.FC<SpaceProps>;
  V: React.FC<SpaceProps>;
  V0_5: React.FC<SpaceProps>;
  V1: React.FC<SpaceProps>;
  V1_5: React.FC<SpaceProps>;
  V2: React.FC<SpaceProps>;
  V2_5: React.FC<SpaceProps>;
  V3: React.FC<SpaceProps>;
  V3_5: React.FC<SpaceProps>;
  V4: React.FC<SpaceProps>;
  V5: React.FC<SpaceProps>;
  V6: React.FC<SpaceProps>;
  V7: React.FC<SpaceProps>;
  V8: React.FC<SpaceProps>;
  V9: React.FC<SpaceProps>;
  V10: React.FC<SpaceProps>;
  V11: React.FC<SpaceProps>;
  V12: React.FC<SpaceProps>;
  V13: React.FC<SpaceProps>;
  V14: React.FC<SpaceProps>;
  V15: React.FC<SpaceProps>;
  V16: React.FC<SpaceProps>;
  V17: React.FC<SpaceProps>;
  V18: React.FC<SpaceProps>;
  V19: React.FC<SpaceProps>;
  V20: React.FC<SpaceProps>;
} = props => {
  const { direction, size, length, className, ...rest } = props;

  return (
    <Wrapper
      direction={direction ?? 'horizontal'}
      length={length ? length : (size ?? 1) * PLANCK}
      className={classNames(className)}
      {...rest}
    >
      &nbsp;
    </Wrapper>
  );
};

Space.H = ({ ...rest }) => <Space direction="horizontal" size={1} {...rest} />;
Space.H0_5 = ({ ...rest }) => <Space direction="horizontal" size={0.5} {...rest} />;
Space.H1 = ({ ...rest }) => <Space direction="horizontal" size={1} {...rest} />;
Space.H1_5 = ({ ...rest }) => <Space direction="horizontal" size={1.5} {...rest} />;
Space.H2 = ({ ...rest }) => <Space direction="horizontal" size={2} {...rest} />;
Space.H2_5 = ({ ...rest }) => <Space direction="horizontal" size={2.5} {...rest} />;
Space.H3 = ({ ...rest }) => <Space direction="horizontal" size={3} {...rest} />;
Space.H3_5 = ({ ...rest }) => <Space direction="horizontal" size={3.5} {...rest} />;
Space.H4 = ({ ...rest }) => <Space direction="horizontal" size={4} {...rest} />;
Space.H5 = ({ ...rest }) => <Space direction="horizontal" size={5} {...rest} />;
Space.H6 = ({ ...rest }) => <Space direction="horizontal" size={6} {...rest} />;
Space.H7 = ({ ...rest }) => <Space direction="horizontal" size={7} {...rest} />;
Space.H8 = ({ ...rest }) => <Space direction="horizontal" size={8} {...rest} />;
Space.H9 = ({ ...rest }) => <Space direction="horizontal" size={9} {...rest} />;
Space.H10 = ({ ...rest }) => <Space direction="horizontal" size={10} {...rest} />;
Space.H11 = ({ ...rest }) => <Space direction="horizontal" size={11} {...rest} />;
Space.H12 = ({ ...rest }) => <Space direction="horizontal" size={12} {...rest} />;
Space.H13 = ({ ...rest }) => <Space direction="horizontal" size={13} {...rest} />;
Space.H14 = ({ ...rest }) => <Space direction="horizontal" size={14} {...rest} />;
Space.H15 = ({ ...rest }) => <Space direction="horizontal" size={15} {...rest} />;
Space.H16 = ({ ...rest }) => <Space direction="horizontal" size={16} {...rest} />;
Space.H17 = ({ ...rest }) => <Space direction="horizontal" size={17} {...rest} />;
Space.H18 = ({ ...rest }) => <Space direction="horizontal" size={18} {...rest} />;
Space.H19 = ({ ...rest }) => <Space direction="horizontal" size={19} {...rest} />;
Space.H20 = ({ ...rest }) => <Space direction="horizontal" size={20} {...rest} />;
Space.V = ({ ...rest }) => <Space direction="vertical" size={1} {...rest} />;
Space.V0_5 = ({ ...rest }) => <Space direction="vertical" size={0.5} {...rest} />;
Space.V1 = ({ ...rest }) => <Space direction="vertical" size={1} {...rest} />;
Space.V1_5 = ({ ...rest }) => <Space direction="vertical" size={1.5} {...rest} />;
Space.V2 = ({ ...rest }) => <Space direction="vertical" size={2} {...rest} />;
Space.V2_5 = ({ ...rest }) => <Space direction="vertical" size={2.5} {...rest} />;
Space.V3 = ({ ...rest }) => <Space direction="vertical" size={3} {...rest} />;
Space.V3_5 = ({ ...rest }) => <Space direction="vertical" size={3.5} {...rest} />;
Space.V4 = ({ ...rest }) => <Space direction="vertical" size={4} {...rest} />;
Space.V5 = ({ ...rest }) => <Space direction="vertical" size={5} {...rest} />;
Space.V6 = ({ ...rest }) => <Space direction="vertical" size={6} {...rest} />;
Space.V7 = ({ ...rest }) => <Space direction="vertical" size={7} {...rest} />;
Space.V8 = ({ ...rest }) => <Space direction="vertical" size={8} {...rest} />;
Space.V9 = ({ ...rest }) => <Space direction="vertical" size={9} {...rest} />;
Space.V10 = ({ ...rest }) => <Space direction="vertical" size={10} {...rest} />;
Space.V11 = ({ ...rest }) => <Space direction="vertical" size={11} {...rest} />;
Space.V12 = ({ ...rest }) => <Space direction="vertical" size={12} {...rest} />;
Space.V13 = ({ ...rest }) => <Space direction="vertical" size={13} {...rest} />;
Space.V14 = ({ ...rest }) => <Space direction="vertical" size={14} {...rest} />;
Space.V15 = ({ ...rest }) => <Space direction="vertical" size={15} {...rest} />;
Space.V16 = ({ ...rest }) => <Space direction="vertical" size={16} {...rest} />;
Space.V17 = ({ ...rest }) => <Space direction="vertical" size={17} {...rest} />;
Space.V18 = ({ ...rest }) => <Space direction="vertical" size={18} {...rest} />;
Space.V19 = ({ ...rest }) => <Space direction="vertical" size={19} {...rest} />;
Space.V20 = ({ ...rest }) => <Space direction="vertical" size={20} {...rest} />;

Space.H.displayName = 'Space.H';
Space.H0_5.displayName = 'Space.H0_5';
Space.H1.displayName = 'Space.H1';
Space.H1_5.displayName = 'Space.H1_5';
Space.H2.displayName = 'Space.H2';
Space.H2_5.displayName = 'Space.H2_5';
Space.H3.displayName = 'Space.H3';
Space.H3_5.displayName = 'Space.H3_5';
Space.H4.displayName = 'Space.H4';
Space.H5.displayName = 'Space.H5';
Space.H6.displayName = 'Space.H6';
Space.H7.displayName = 'Space.H7';
Space.H8.displayName = 'Space.H8';
Space.H9.displayName = 'Space.H9';
Space.H10.displayName = 'Space.H10';
Space.H11.displayName = 'Space.H11';
Space.H12.displayName = 'Space.H12';
Space.H13.displayName = 'Space.H13';
Space.H14.displayName = 'Space.H14';
Space.H15.displayName = 'Space.H15';
Space.H16.displayName = 'Space.H16';
Space.H17.displayName = 'Space.H17';
Space.H18.displayName = 'Space.H18';
Space.H19.displayName = 'Space.H19';
Space.H20.displayName = 'Space.H20';
Space.V.displayName = 'Space.V';
Space.V0_5.displayName = 'Space.V0_5';
Space.V1.displayName = 'Space.V1';
Space.V1_5.displayName = 'Space.V1_5';
Space.V2.displayName = 'Space.V2';
Space.V2_5.displayName = 'Space.V2_5';
Space.V3.displayName = 'Space.V3';
Space.V3_5.displayName = 'Space.V3_5';
Space.V4.displayName = 'Space.V4';
Space.V5.displayName = 'Space.V5';
Space.V6.displayName = 'Space.V6';
Space.V7.displayName = 'Space.V7';
Space.V8.displayName = 'Space.V8';
Space.V9.displayName = 'Space.V9';
Space.V10.displayName = 'Space.V10';
Space.V11.displayName = 'Space.V11';
Space.V12.displayName = 'Space.V12';
Space.V13.displayName = 'Space.V13';
Space.V14.displayName = 'Space.V14';
Space.V15.displayName = 'Space.V15';
Space.V16.displayName = 'Space.V16';
Space.V17.displayName = 'Space.V17';
Space.V18.displayName = 'Space.V18';
Space.V19.displayName = 'Space.V19';
Space.V20.displayName = 'Space.V20';

const Wrapper = styled.div<{ direction: Direction; length: number | string }>`
  display: flex;
  box-sizing: border-box;
  pointer-events: none;
  ${props => (['horizontal', 'h'].includes(props.direction) ? `width: 1px;` : null)}
  ${props =>
    ['horizontal', 'h'].includes(props.direction)
      ? `height: ${addSuffixIfNotString(props.length, 'px')};`
      : null}
  ${props =>
    ['vertical', 'v'].includes(props.direction)
      ? `width: ${addSuffixIfNotString(props.length, 'px')};`
      : null}
  ${props => (['vertical', 'v'].includes(props.direction) ? `height: 1px;` : null)}
`;
