import React, { FC, ReactNode } from 'react';

import classNames from 'classnames';
import styled from 'styled-components';

import { addSuffixIfNotString } from '@/utils';

type DIRECTION = 'row' | 'column';
type ALIGN = 'center' | 'flex-start' | 'flex-end' | 'space-around' | 'space-between';

export interface FlexProps {
  full?: boolean;
  inline?: boolean;
  layout?: string;
  direction?: DIRECTION;
  align?: ALIGN;
  justify?: ALIGN;
  gap?: string | number;
  padding?: string | number;
}

export interface FlexComponentProps extends FlexProps {
  className?: string;
  children?: string | ReactNode | ReactNode[];
  [x: string]: any;
}

export const Flex: FC<FlexComponentProps> & {
  Section: React.FC<{
    className?: string;
    children?: string | ReactNode | ReactNode[];
    [x: string]: any;
  }>;
  CSS: React.FC<FlexComponentProps>;
  CSC: React.FC<FlexComponentProps>;
  CSE: React.FC<FlexComponentProps>;
  CSB: React.FC<FlexComponentProps>;
  CCS: React.FC<FlexComponentProps>;
  CCC: React.FC<FlexComponentProps>;
  CCE: React.FC<FlexComponentProps>;
  CCB: React.FC<FlexComponentProps>;
  CES: React.FC<FlexComponentProps>;
  CEC: React.FC<FlexComponentProps>;
  CEE: React.FC<FlexComponentProps>;
  CEB: React.FC<FlexComponentProps>;
  CBS: React.FC<FlexComponentProps>;
  CBC: React.FC<FlexComponentProps>;
  CBE: React.FC<FlexComponentProps>;
  CBB: React.FC<FlexComponentProps>;
  RSS: React.FC<FlexComponentProps>;
  RSC: React.FC<FlexComponentProps>;
  RSE: React.FC<FlexComponentProps>;
  RSB: React.FC<FlexComponentProps>;
  RCS: React.FC<FlexComponentProps>;
  RCC: React.FC<FlexComponentProps>;
  RCE: React.FC<FlexComponentProps>;
  RCB: React.FC<FlexComponentProps>;
  RES: React.FC<FlexComponentProps>;
  REC: React.FC<FlexComponentProps>;
  REE: React.FC<FlexComponentProps>;
  REB: React.FC<FlexComponentProps>;
  RBS: React.FC<FlexComponentProps>;
  RBC: React.FC<FlexComponentProps>;
  RBE: React.FC<FlexComponentProps>;
  RBB: React.FC<FlexComponentProps>;
} = ({
  full,
  inline,
  layout,
  direction,
  align,
  justify,
  gap,
  padding,
  className,
  children,
  ...rest
}) => {
  return (
    <Wrapper
      full={full ?? false}
      inline={inline ?? false}
      layout={layout}
      direction={direction ?? 'row'}
      align={align ?? 'flex-start'}
      justify={justify ?? 'flex-start'}
      gap={gap ?? 0}
      padding={padding ?? 0}
      className={classNames(className)}
      {...rest}
    >
      {children}
    </Wrapper>
  );
};

Flex.Section = ({ className, children, ...rest }) => {
  return (
    <SectionWrapper className={classNames(className)} {...rest}>
      {children}
    </SectionWrapper>
  );
};

Flex.CSS = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'column'} justify={'flex-start'} align={'flex-start'}></Flex>;
};
Flex.CSC = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'column'} justify={'flex-start'} align={'center'}></Flex>;
};
Flex.CSE = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'column'} justify={'flex-start'} align={'flex-end'}></Flex>;
};
Flex.CSB = ({ direction, align, justify, ...rest }) => {
  return (
    <Flex {...rest} direction={'column'} justify={'flex-start'} align={'space-between'}></Flex>
  );
};
Flex.CCS = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'column'} justify={'center'} align={'flex-start'}></Flex>;
};
Flex.CCC = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'column'} justify={'center'} align={'center'}></Flex>;
};
Flex.CCE = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'column'} justify={'center'} align={'flex-end'}></Flex>;
};
Flex.CCB = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'column'} justify={'center'} align={'space-between'}></Flex>;
};
Flex.CES = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'column'} justify={'flex-end'} align={'flex-start'}></Flex>;
};
Flex.CEC = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'column'} justify={'flex-end'} align={'center'}></Flex>;
};
Flex.CEE = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'column'} justify={'flex-end'} align={'flex-end'}></Flex>;
};
Flex.CEB = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'column'} justify={'flex-end'} align={'space-between'}></Flex>;
};
Flex.CBS = ({ direction, align, justify, ...rest }) => {
  return (
    <Flex {...rest} direction={'column'} justify={'space-between'} align={'flex-start'}></Flex>
  );
};
Flex.CBC = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'column'} justify={'space-between'} align={'center'}></Flex>;
};
Flex.CBE = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'column'} justify={'space-between'} align={'flex-end'}></Flex>;
};
Flex.CBB = ({ direction, align, justify, ...rest }) => {
  return (
    <Flex {...rest} direction={'column'} justify={'space-between'} align={'space-between'}></Flex>
  );
};
Flex.RSS = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'row'} justify={'flex-start'} align={'flex-start'}></Flex>;
};
Flex.RSC = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'row'} justify={'flex-start'} align={'center'}></Flex>;
};
Flex.RSE = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'row'} justify={'flex-start'} align={'flex-end'}></Flex>;
};
Flex.RSB = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'row'} justify={'flex-start'} align={'space-between'}></Flex>;
};
Flex.RCS = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'row'} justify={'center'} align={'flex-start'}></Flex>;
};
Flex.RCC = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'row'} justify={'center'} align={'center'}></Flex>;
};
Flex.RCE = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'row'} justify={'center'} align={'flex-end'}></Flex>;
};
Flex.RCB = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'row'} justify={'center'} align={'space-between'}></Flex>;
};
Flex.RES = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'row'} justify={'flex-end'} align={'flex-start'}></Flex>;
};
Flex.REC = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'row'} justify={'flex-end'} align={'center'}></Flex>;
};
Flex.REE = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'row'} justify={'flex-end'} align={'flex-end'}></Flex>;
};
Flex.REB = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'row'} justify={'flex-end'} align={'space-between'}></Flex>;
};
Flex.RBS = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'row'} justify={'space-between'} align={'flex-start'}></Flex>;
};
Flex.RBC = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'row'} justify={'space-between'} align={'center'}></Flex>;
};
Flex.RBE = ({ direction, align, justify, ...rest }) => {
  return <Flex {...rest} direction={'row'} justify={'space-between'} align={'flex-end'}></Flex>;
};
Flex.RBB = ({ direction, align, justify, ...rest }) => {
  return (
    <Flex {...rest} direction={'row'} justify={'space-between'} align={'space-between'}></Flex>
  );
};

Flex.Section.displayName = 'Flex.Section';
Flex.CSS.displayName = 'Flex.CSS';
Flex.CSC.displayName = 'Flex.CSC';
Flex.CSE.displayName = 'Flex.CSE';
Flex.CSB.displayName = 'Flex.CSB';
Flex.CCS.displayName = 'Flex.CCS';
Flex.CCC.displayName = 'Flex.CCC';
Flex.CCE.displayName = 'Flex.CCE';
Flex.CCB.displayName = 'Flex.CCB';
Flex.CES.displayName = 'Flex.CES';
Flex.CEC.displayName = 'Flex.CEC';
Flex.CEE.displayName = 'Flex.CEE';
Flex.CEB.displayName = 'Flex.CEB';
Flex.CBS.displayName = 'Flex.CBS';
Flex.CBC.displayName = 'Flex.CBC';
Flex.CBE.displayName = 'Flex.CBE';
Flex.CBB.displayName = 'Flex.CBB';
Flex.RSS.displayName = 'Flex.RSS';
Flex.RSC.displayName = 'Flex.RSC';
Flex.RSE.displayName = 'Flex.RSE';
Flex.RSB.displayName = 'Flex.RSB';
Flex.RCS.displayName = 'Flex.RCS';
Flex.RCC.displayName = 'Flex.RCC';
Flex.RCE.displayName = 'Flex.RCE';
Flex.RCB.displayName = 'Flex.RCB';
Flex.RES.displayName = 'Flex.RES';
Flex.REC.displayName = 'Flex.REC';
Flex.REE.displayName = 'Flex.REE';
Flex.REB.displayName = 'Flex.REB';
Flex.RBS.displayName = 'Flex.RBS';
Flex.RBC.displayName = 'Flex.RBC';
Flex.RBE.displayName = 'Flex.RBE';
Flex.RBB.displayName = 'Flex.RBB';

const Wrapper = styled.div<{
  full: boolean;
  inline: boolean;
  layout?: string;
  direction: DIRECTION | string;
  align: ALIGN | string;
  justify: ALIGN | string;
  gap: number | string;
  padding: number | string;
}>`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  ${({ full, direction }) =>
    full ? (direction === 'column' ? 'width: 100%; height: 100%;' : 'width: 100%;') : ''}
  box-sizing: border-box;
  flex-direction: ${({ direction }) => direction};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  padding: ${({ padding }) => addSuffixIfNotString(padding, 'px')};

  ${({ layout, direction }) => {
    if (layout) {
      return layout
        .split(' ')
        .map((_value, index) => {
          const value = _value.trim();

          if (['px', 'rem', '%', 'vw', 'vh'].some(suffix => value.endsWith(suffix))) {
            return `& > *:nth-child(${index + 1}) { ${
              direction === 'row' ? 'width' : 'height'
            }: ${value}; }`;
          }
          if (value === 'auto') {
            // nothing
          } else {
            return `& > *:nth-child(${index + 1}) { flex: ${value}; }`;
          }
        })
        .join('\n');
    }
  }}

  & > *:not(:nth-child(1)) {
    ${({ direction, gap }) => {
      return direction === 'row'
        ? `margin-left: ${addSuffixIfNotString(gap, 'px')};`
        : `margin-top: ${addSuffixIfNotString(gap, 'px')};`;
    }}
  }
`;

const SectionWrapper = styled.div`
  display: block;
`;
