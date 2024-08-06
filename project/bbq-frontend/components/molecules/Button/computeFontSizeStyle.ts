import { FONTSIZE_12, FONTSIZE_14, FONTSIZE_24 } from '@/constants';
import { addSuffixIfNotString } from '@/utils';

import { ButtonProps } from './Button';

export const computeFontSizeStyle = ({ size }: ButtonProps) => {
  switch (size) {
    case `small`:
      return `font-size: ${FONTSIZE_12}px;`;
    case `middle`:
      return `font-size: ${FONTSIZE_14}px;`;
    case `big`:
      return `font-size: ${FONTSIZE_24}px;`;
  }
  return `font-size: ${addSuffixIfNotString(size, 'px')};`;
};
