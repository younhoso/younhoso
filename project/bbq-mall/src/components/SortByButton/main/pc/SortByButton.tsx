'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { SortByButtonStyled } from './styled';

interface SortByButton {
  value: string;
  label: string;
}

export interface SortByButtonProps {
  className?: string;
  data: SortByButton;
  active: boolean;
  onClick: () => void;
}

const SortByButton = ({ className, data, active, onClick }: SortByButtonProps) => {
  return (
    <SortByButtonStyled className={clsx('SortByButton', active && 'active', className)}>
      <p onClick={onClick}>{data.label}</p>
    </SortByButtonStyled>
  );
};

export default SortByButton;
