import { ButtonHTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

import Spinner from '../Spinner';
import { ButtonStyled } from './styled';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  styleType?: 'main' | 'sub';
  isLoading?: boolean;
  size?: 'big' | 'small' | 'micro';
  fullWidth?: boolean;
}

const Button = ({
  className,
  children,
  styleType,
  size = 'big',
  isLoading,
  fullWidth,
  ...props
}: ButtonProps) => {
  return (
    <ButtonStyled
      className={clsx('Button', className, styleType, size)}
      {...props}
      $fullWidth={fullWidth}
    >
      {children}
      <Spinner
        size={!isLoading ? 0 : 19}
        className={clsx('loading-bar', !isLoading && 'not-loading')}
      />
    </ButtonStyled>
  );
};

export default Button;
