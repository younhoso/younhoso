import { Button } from '@tremor/react';

import classNames from 'classnames';

interface ButtonProps {
  type: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function CustomButton({ onClick, type, className, children, ...rest }: ButtonProps) {
  const buttonTypes = (type: string) => {
    switch (type) {
      case 'primary':
        return '!rounded-full text-white border-none bg-gradient-to-b from-[#E52143] to-[#CE1E3C]';
      case 'secondary':
        return '!rounded-full text-black border-[#BBBBBB] bg-white hover:bg-white hover:border-[#BBBBBB]';
      case 'tertiary':
        return '!rounded-full text-white bg-[#292A56] border-[#292A56] hover:bg-[#292A56] hover:border-[#292A56]';
      case 'delete':
        return '!rounded-full text-[#CE1E3C] bg-white border-[#CE1E3C] hover:bg-[#CE1E3C] hover:border-[#CE1E3C]';
      default:
        return '!rounded-full text-white border-none bg-gradient-to-b from-[#E52143] to-[#CE1E3C]';
    }
  };

  return (
    <Button onClick={onClick} className={classNames(buttonTypes(type), className)} {...rest}>
      {children}
    </Button>
  );
}
