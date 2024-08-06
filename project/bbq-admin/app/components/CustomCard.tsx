import { Card } from '@tremor/react';
import React from 'react';

interface CustomCardProps {
  color: string;
  className?: string;
  children: React.ReactNode;
}

const CustomCard = (props: CustomCardProps) => {
  const { color, className, children } = props;

  return (
    <Card
      className={className}
      style={{ borderBottom: `3px solid ${color}`, backgroundColor: '#FFFFFF' }}
    >
      {children}
    </Card>
  );
};

export default CustomCard;
