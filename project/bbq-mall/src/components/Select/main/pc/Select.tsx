import { ReactNode, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import downArrow from '@/assets/images/components/down-arrow.svg';
import { useHandleClickOutside } from '@/hooks/useHandleClickOutside';

import { SelectStyled } from './styled';

export interface OptionProps<T> {
  label: string;
  value: T;
  suffix?: string | ReactNode;
  disabled?: boolean;
}

export interface SelectProps<T> {
  className?: string;
  placeholder?: string;
  disalbed?: boolean;
  optionList: OptionProps<T>[] | undefined;
  defaultValue?: T;
  onChange?: (v?: T) => void;
  label?: string;
  required?: boolean;
  removeItem?: boolean;
  maxHeight?: string;
}

const Select = <T extends unknown>({
  className,
  placeholder,
  disalbed,
  optionList,
  onChange,
  label,
  required,
  defaultValue,
  removeItem,
  maxHeight = '300px',
}: SelectProps<T>) => {
  const [value, setValue] = useState<T | undefined>(defaultValue);
  const [open, setOpen] = useState(false);
  const selectRef = useHandleClickOutside<HTMLDivElement>(() => setOpen(false));

  const onClickItem = (v?: T) => {
    setValue(v);
    onChange?.(v);
    setOpen(false);
  };

  return (
    <SelectStyled className={clsx('Select', className)} ref={selectRef} $maxHeight={maxHeight}>
      <div className="label-wrapper">
        {(label || required) && (
          <div className="label">
            {label}
            {required && <span>*</span>}
          </div>
        )}
        <div className={clsx(disalbed && 'disabled', 'select-content')}>
          <div className="select-wrapper" onClick={() => setOpen(!open)}>
            <div className={clsx(value === undefined && 'placeholder')}>
              {value !== undefined
                ? optionList?.find(v => v.value === value)?.label
                : placeholder ?? '값을 입력해주세요.'}
            </div>
            <Image width={16} height={16} src={downArrow} alt="select_arrow" />
          </div>
          {open && !disalbed && (
            <div className="select-option-list">
              {removeItem && <div onClick={() => onClickItem(undefined)}>선택안함</div>}
              {optionList?.map(v => (
                <div
                  key={v.label}
                  onClick={() => !v.disabled && onClickItem(v.value)}
                  className={clsx(value === v.value && 'active', v.disabled && 'disabled')}
                >
                  <div>{v.label}</div>
                  {v.suffix && typeof v.suffix === 'string' ? (
                    <div className="suffix">{v.suffix}</div>
                  ) : (
                    <>{v.suffix}</>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SelectStyled>
  );
};

export default Select;
