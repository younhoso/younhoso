import { COLOR_BLACK, COLOR_LIGHTGRAY, COLOR_PRIMARY, COLOR_RED } from '@/constants';

import { ButtonProps } from './Button';

export const computeBackgroundColorStyle = ({ color, fill }: ButtonProps) => {
  if (!color) return ``;
  if (fill) {
    switch (color) {
      case `black`:
        return `background-color: ${COLOR_BLACK};`;
      case `red`:
        return `background-color: ${COLOR_RED};`;
      case `primary`:
        return `background-color: ${COLOR_PRIMARY};`;
      case `lightgray`:
        return `background-color: ${COLOR_LIGHTGRAY};`;
      case `graypurple`:
        return `background-color: #e8eaf0;`;
    }
    return `background-color: ${color};`;
  } else {
    switch (color) {
      case `graypurple`:
        return `background-color: #f5f6f7;`;
    }
    return ``;
  }
};
