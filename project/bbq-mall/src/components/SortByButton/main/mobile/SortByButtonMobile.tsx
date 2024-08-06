'use client';

import clsx from 'clsx';

import { SortByButtonMobileStyled } from './styled';

interface SortByButton {
  value: string;
  direction?: string;
  label: string;
}

export interface SortByButtonMobileProps {
  className?: string;
  data: SortByButton[];
  onChange: ({
    value,
    direction,
    label,
  }: {
    value: string;
    direction: string;
    label: string;
  }) => void;
}

const SortByButtonMobile = ({ className, data, onChange }: SortByButtonMobileProps) => {
  return (
    <SortByButtonMobileStyled
      className={clsx('SortByButton', className)}
      onChange={e => onChange(JSON.parse(e.target.value))}
    >
      {data &&
        data.map(v => (
          <option
            key={v.label}
            value={JSON.stringify({
              value: v.value,
              direction: v.direction,
              label: v.label,
            })}
          >
            {v.label}
          </option>
        ))}
    </SortByButtonMobileStyled>
  );
};

export default SortByButtonMobile;
