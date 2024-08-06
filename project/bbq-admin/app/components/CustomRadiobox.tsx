import React, { ChangeEvent, ReactNode, isValidElement } from 'react';

interface CustomRadioboxProps {
  id: number;
  disabled?: boolean;
  className?: string;
  onChange: (v: number) => void;
  checked: boolean;
  children: ReactNode;
}

export default function CustomRadiobox({
  id,
  onChange,
  className,
  disabled,
  checked,
  children,
}: CustomRadioboxProps) {
  return (
    <div className={`flex items-center ${className ? className : ''}`}>
      <label htmlFor={`radio-${id}`} className="flex items-center inline-block">
        <input
          id={`radio-${id}`}
          type="radio"
          className={`hidden radio-${id}`}
          value={id}
          checked={checked}
          disabled={disabled}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
              onChange(Number(e.target.value));
            }
          }}
        />
        <span
          className={`flex w-4 h-4 rounded-full ${
            checked ? 'bg-red-500' : 'bg-gray-300'
          } ${disabled ? '!cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span className="inline-block w-2 h-2 bg-white rounded-full relative left-[4px] top-[4px]"></span>
        </span>

        <div className="pl-2 cursor-pointer whitespace-pre">{children}</div>
      </label>
    </div>
  );
}
