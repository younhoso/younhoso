'use client';

import { Button } from '@tremor/react';

import classNames from 'classnames';

interface ButtonProps {
  type: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disable?: boolean;
}

export default function CustomButton(props: ButtonProps) {
  const { type, className, children, onClick, disable, ...rest } = props;
  const buttonTypes = (type: string) => {
    switch (type) {
      case 'primary':
        return 'bg-red-600 border-red-500 hover:bg-red-400 hover:border-red-400 text-white';
      case 'secondary':
        return 'bg-blue-950 border-blue-950 hover:bg-blue-950 hover:border-white hover:text-white text-white';
      case 'tertiary':
        return 'bg-white border-gray-400 hover:bg-white hover:border-gray-300 text-gray-600';
      case 'quaternary':
        return 'bg-gray-100 border-gray-200 hover:bg-gray-200 hover:border-gray-300 hover:text-gray-950 text-gray-800 ';
      default:
        return 'bg-red-600 border-red-500 hover:bg-red-400 hover:border-red-400 text-white';
    }
  };

  return (
    <Button
      disabled={disable}
      onClick={onClick}
      className={classNames(className, buttonTypes(type))}
      {...rest}
    >
      {children}
    </Button>
  );
}
