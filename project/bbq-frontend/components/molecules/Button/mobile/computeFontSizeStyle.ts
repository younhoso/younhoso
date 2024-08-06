import {
  FONTSIZE_11,
  FONTSIZE_12,
  FONTSIZE_16,
  FONTSIZE_18,
  FONTSIZE_19,
  FONTSIZE_20,
} from '@/constants';
import { addSuffixIfNotString } from '@/utils';

import { ButtonProps } from '../Button';

export const computeFontSizeStyle = ({ size }: ButtonProps) => {
  switch (size) {
    case `small`:
      return `font-size: ${FONTSIZE_11}px;`;
    case `middle`:
      return `font-size: ${FONTSIZE_12}px;`;
    case `big`:
      return `font-size: ${FONTSIZE_16}px;`;
  }
  return `font-size: ${addSuffixIfNotString(size, 'px')};`;
};
