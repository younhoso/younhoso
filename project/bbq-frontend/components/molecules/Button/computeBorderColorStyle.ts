import { COLOR_BLACK, COLOR_LIGHTGRAY, COLOR_PRIMARY, COLOR_RED } from '@/constants';

import { ButtonProps } from './Button';

export const computeBorderColorStyle = ({
  borderColor,
  borderThickness,
  color,
  fill,
}: ButtonProps) => {
  if (borderColor) return `border: ${borderThickness}px solid ${borderColor};`;
  if (!color || fill) return ``;
  switch (color) {
    case `black`:
      return `border: ${borderThickness}px solid ${COLOR_BLACK};`;
    case `red`:
      return `border: ${borderThickness}px solid ${COLOR_RED};`;
    case `primary`:
      return `border: ${borderThickness}px solid ${COLOR_PRIMARY};`;
    case `lightgray`:
      return `border: ${borderThickness}px solid ${COLOR_LIGHTGRAY};`;
    case `graypurple`:
      return `border: ${borderThickness}px solid #e8eaf0;`;
  }
  return `border: ${borderThickness}px solid ${color};`;
};
