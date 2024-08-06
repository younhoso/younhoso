import clsx from 'clsx';

import { theme } from '@/provider/CustomThemeProvider';

import { DividerStyled } from './styled';

export type BorderTypes =
  | 'solid'
  | 'dashed'
  | 'dotted'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset';

export interface DividerProps {
  className?: string;
  borderType?: BorderTypes;
  borderColor?: string;
  borderHeight?: string;
  children?: string;
  textOrientation?: 'left' | 'center' | 'right';
  orientationMargin?: string;
  marginTop?: string;
  marginBottom?: string;
}

const Divider = ({
  className,
  borderType = 'solid',
  borderColor = theme.colors.grayada,
  borderHeight = '1px',
  textOrientation = 'center',
  orientationMargin = '10%',
  marginTop = '24px',
  marginBottom = '24px',
  children,
}: DividerProps) => {
  return (
    <DividerStyled
      className={clsx('Divider', className)}
      $hasText={!!children}
      $borderColor={borderColor}
      $borderHeight={borderHeight}
      $borderType={borderType}
      $textOrientation={textOrientation}
      $orientationMargin={orientationMargin || '0px'}
      $marginTop={marginTop}
      $marginBottom={marginBottom}
    >
      {children && <span>{children}</span>}
    </DividerStyled>
  );
};

export default Divider;
