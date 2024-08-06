import { PLANCK } from '@/constants';
import { addSuffixIfNotString } from '@/utils';

import { ButtonProps } from './Button';

export const computeSizeStyle = ({ size }: ButtonProps) => {
  if (!size) return ``;
  switch (size) {
    case `small`:
      return `
        height: ${PLANCK * 6}px;
        padding-left: ${PLANCK * 3}px;
        padding-right: ${PLANCK * 3}px;
      `;
    case `middle`:
      return `
        height: ${PLANCK * 8}px;
        padding-left: ${PLANCK * 4}px;
        padding-right: ${PLANCK * 4}px;
      `;
    case `big`:
      return `
        height: ${PLANCK * 14}px;
        padding-left: ${PLANCK * 5}px;
        padding-right: ${PLANCK * 5}px;
      `;
  }
  return `height: ${addSuffixIfNotString(size, 'px')};`;
};
