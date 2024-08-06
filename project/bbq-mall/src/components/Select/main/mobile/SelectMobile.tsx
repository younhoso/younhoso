'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import downArrow from '@/assets/images/components/down-arrow.svg';
import { useHandleClickOutside } from '@/hooks/useHandleClickOutside';
import { selectClose } from '@/utils/selectClose';

import { SelectProps } from '../pc/Select';
import { SelectMobileStyled } from './styled';

const SelectMobile = <T extends unknown>({
  className,
  placeholder,
  disalbed,
  optionList,
  onChange,
  defaultValue,
}: SelectProps<T>) => {
  const [value, setValue] = useState<T | undefined>(defaultValue);
  const [open, setOpen] = useState(false);
  const touchRef = useHandleClickOutside<HTMLDivElement>(() => setOpen(false));
  const closeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = closeRef.current;
    const touch = touchRef.current;

    if (close && touch) {
      const { touchStart, touchMove, touchEnd } = selectClose(touch, () => setOpen(false));
      close.addEventListener('touchstart', touchStart);
      close.addEventListener('touchmove', touchMove);
      close.addEventListener('touchend', touchEnd);
      return () => {
        close.removeEventListener('touchstart', touchStart);
        close.removeEventListener('touchmove', touchMove);
        close.removeEventListener('touchend', touchEnd);
      };
    }
  }, [open]);

  return (
    <SelectMobileStyled className={clsx('SelectMobile', className)}>
      <div
        className={clsx('select-wrapper', disalbed && 'disabled')}
        onClick={() => !disalbed && setOpen(true)}
      >
        <div className={clsx(!value && 'placeholder')}>
          {value
            ? optionList?.find(v => v.value === value)?.label
            : placeholder ?? '값을 입력해주세요.'}
        </div>
        <Image width={16} height={16} src={downArrow} alt="select_arrow" />
      </div>
      {open && !disalbed && (
        <div className="screen-wrapper">
          <div className="mobile-select-option-list" ref={touchRef}>
            <div className="option-close" ref={closeRef}>
              <div />
            </div>
            <div className="option-wrapper">
              {optionList?.map(v => (
                <div
                  key={v.label}
                  onClick={() => {
                    if (v.disabled) {
                      return;
                    }
                    setValue(v.value);
                    onChange?.(v.value);
                    setOpen(false);
                  }}
                  className={clsx(v.disabled && 'disabled')}
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
          </div>
        </div>
      )}
    </SelectMobileStyled>
  );
};

export default SelectMobile;
