import { COLOR_BLACK, COLOR_LIGHTGRAY, COLOR_PRIMARY, COLOR_RED, COLOR_WHITE } from '@/constants';

import { ButtonProps } from './Button';

export const computeTextColorStyle = ({ textColor, color, fill }: ButtonProps) => {
  if (textColor) return `color: ${textColor};`;
  if (!color) return ``;
  if (fill) {
    switch (color) {
      case `black`:
      case `red`:
      case `primary`:
        return `color: ${COLOR_WHITE};`;
      case `lightgray`:
        return `color: ${COLOR_BLACK};`;
      case `graypurple`:
        return `color: #8e93ad;`;
    }
  } else {
    switch (color) {
      case `black`:
        return `color: ${COLOR_BLACK};`;
      case `red`:
        return `color: ${COLOR_RED};`;
      case `primary`:
        return `color: ${COLOR_PRIMARY};`;
      case `lightgray`:
        return `color: ${COLOR_LIGHTGRAY};`;
      case `graypurple`:
        return `color: #8e93ad;`;
    }
    return `color: ${color};`;
  }
};
