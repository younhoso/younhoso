import { PLANCK } from '@/constants';
import { addSuffixIfNotString } from '@/utils';

import { ButtonProps } from '../Button';

export const computeSizeStyle = ({ size }: ButtonProps) => {
  if (!size) return ``;
  switch (size) {
    case `small`:
      return `
        height: ${PLANCK * 5.5}px;
        padding-left: ${PLANCK * 2.5}px;
        padding-right: ${PLANCK * 2.5}px;
      `;
    case `middle`:
      return `
        height: ${PLANCK * 7}px;
        padding-left: ${PLANCK * 3}px;
        padding-right: ${PLANCK * 3}px;
      `;
    case `big`:
      return `
        height: ${PLANCK * 12}px;
        padding-left: ${PLANCK * 3.5}px;
        padding-right: ${PLANCK * 3.5}px;
      `;
  }
  return `height: ${addSuffixIfNotString(size, 'px')};`;
};
