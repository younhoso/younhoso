import { addSuffixIfNotString } from '@/utils';

import { ButtonProps } from './Button';

export const computeShapeStyle = ({ shape, size }: ButtonProps) => {
  if (!shape) return ``;
  switch (shape) {
    case 'circle':
      return `border-radius: 50%;`;
    case 'round':
      if (size === 'big') {
        return `border-radius: 10px;`;
      }
      return `border-radius: 7px;`;
    case 'semi-round':
      return `border-radius: 5px;`;
    default:
      if (typeof shape === 'string' || typeof shape === 'number') {
        return `border-radius: ${addSuffixIfNotString(shape, 'px')};`;
      } else {
        return `border-radius: 0;`;
      }
  }
};
